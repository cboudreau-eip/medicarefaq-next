import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import {
  githubGetFileContent,
  githubCommitFile,
  hasGithubToken,
} from "@/lib/cms-github";
import {
  parsePageMeta,
  applyPageMetaEdits,
  applyRobotsEdit,
  replaceNamedSchema,
  insertSchema,
  extractNamedSchemas,
  jsonToObjectLiteral,
  type PageMetaEdit,
} from "@/lib/cms-page-meta";
import manifest from "@/lib/cms-pages-manifest.json";

type ManifestPage = (typeof manifest.pages)[number];

/** Resolve and validate a file path against the manifest (prevents traversal). */
function resolvePage(params: URLSearchParams): ManifestPage | null {
  const file = params.get("file");
  const route = params.get("route");
  const pages = manifest.pages as ManifestPage[];
  if (file) return pages.find((p) => p.file === file) ?? null;
  if (route) return pages.find((p) => p.route === route) ?? null;
  return null;
}

/**
 * GET /api/cms/page-meta?file=src/app/.../page.tsx  (or ?route=/...)
 * Reads the page's current SEO metadata + JSON-LD schema(s) live from GitHub.
 */
export async function GET(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasGithubToken()) {
    return NextResponse.json(
      { error: "GitHub token not configured on server" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = resolvePage(searchParams);
  if (!page) {
    return NextResponse.json(
      { error: "Unknown page. Provide a valid ?file= or ?route= from the inventory." },
      { status: 404 }
    );
  }

  try {
    const { content, sha } = await githubGetFileContent(page.file);
    const meta = parsePageMeta(content);
    const named = extractNamedSchemas(content);
    return NextResponse.json({
      route: page.route,
      file: page.file,
      sha,
      seoEditable: page.seoEditable,
      contentEditable: page.contentEditable,
      meta: {
        title: meta.title,
        description: meta.description,
        canonical: meta.canonical,
        ogTitle: meta.ogTitle,
        ogDescription: meta.ogDescription,
        ogUrl: meta.ogUrl,
        ogType: meta.ogType,
        ogImage: meta.ogImage,
        robotsIndex: meta.robotsIndex,
        robotsFollow: meta.robotsFollow,
        hasMetadata: meta.hasMetadata,
      },
      schemas: named.map((s) => ({ name: s.name, type: s.type, raw: s.raw })),
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to read page: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}

interface SchemaEditInput {
  /** Existing schema variable name to replace; omit/empty for a new schema. */
  name?: string;
  /** Match an existing schema by @type when the name is unknown. */
  matchType?: string;
  /** New schema variable name (used when inserting a new schema). */
  newName?: string;
  /** The schema as a JSON string (will be validated by JSON.parse). */
  json: string;
}

interface PageMetaPutBody {
  file?: string;
  route?: string;
  meta?: PageMetaEdit;
  robots?: { index: boolean; follow: boolean } | null;
  schemaEdits?: SchemaEditInput[];
}

function sanitizeVarName(raw: string, fallback: string): string {
  const cleaned = (raw || "").replace(/[^A-Za-z0-9_]/g, "");
  if (!cleaned || /^[0-9]/.test(cleaned)) return fallback;
  return cleaned;
}

/**
 * PUT /api/cms/page-meta
 * Body: { file|route, meta?, robots?, schemaEdits? }
 * Applies SEO metadata edits, optional robots directive, and schema
 * replace/insert operations, then commits the result back to GitHub.
 *
 * Safety:
 *  - Validates the target against the manifest (no path traversal).
 *  - Each submitted schema must be valid JSON.
 *  - Metadata edits are surgical string replacements; if no metadata block is
 *    present, metadata edits are skipped (schema edits may still apply).
 *  - Returns 422 if nothing actually changed.
 */
export async function PUT(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasGithubToken()) {
    return NextResponse.json(
      { error: "GitHub token not configured on server" },
      { status: 500 }
    );
  }

  let body: PageMetaPutBody;
  try {
    body = (await req.json()) as PageMetaPutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const params = new URLSearchParams();
  if (body.file) params.set("file", body.file);
  if (body.route) params.set("route", body.route);
  const page = resolvePage(params);
  if (!page) {
    return NextResponse.json(
      { error: "Unknown page. Provide a valid file or route from the inventory." },
      { status: 404 }
    );
  }

  // Validate schema edits up front.
  const schemaEdits = body.schemaEdits ?? [];
  for (const se of schemaEdits) {
    try {
      const parsed = JSON.parse(se.json);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error("schema must be a JSON object");
      }
    } catch (e) {
      return NextResponse.json(
        { error: `Invalid schema JSON: ${(e as Error).message}` },
        { status: 400 }
      );
    }
  }

  try {
    const { content, sha } = await githubGetFileContent(page.file);
    let next = content;
    const applied: string[] = [];

    // 1) Metadata edits (only if a metadata block exists).
    if (body.meta && Object.keys(body.meta).length > 0) {
      const before = next;
      next = applyPageMetaEdits(next, body.meta);
      if (next !== before) applied.push("metadata");
    }

    // 2) Robots directive.
    if (body.robots && typeof body.robots.index === "boolean") {
      const before = next;
      next = applyRobotsEdit(next, body.robots.index, body.robots.follow);
      if (next !== before) applied.push("robots");
    }

    // 3) Schema edits: replace existing by name (or by @type), or insert new.
    // Track which existing schema names have already been used as a target so
    // multiple same-typed schemas map to distinct vars.
    const usedTargets = new Set<string>();
    for (const se of schemaEdits) {
      const literal = jsonToObjectLiteral(JSON.parse(se.json));
      const current = extractNamedSchemas(next);
      const byName = se.name ? current.find((s) => s.name === se.name) : undefined;
      const byType =
        !byName && se.matchType
          ? current.find((s) => s.type === se.matchType && !usedTargets.has(s.name))
          : undefined;
      const target = byName || byType;
      if (target) {
        usedTargets.add(target.name);
        const before = next;
        next = replaceNamedSchema(next, target.name, literal);
        if (next !== before) applied.push(`schema:${target.name}`);
      } else {
        const varName = sanitizeVarName(
          se.newName || se.name || "pageSchema",
          "pageSchema"
        );
        // Avoid name collisions.
        let unique = varName;
        let n = 2;
        const used = new Set(extractNamedSchemas(next).map((s) => s.name));
        while (used.has(unique)) unique = `${varName}${n++}`;
        const res = insertSchema(next, unique, literal);
        if (res.inserted) {
          next = res.src;
          applied.push(`schema+:${unique}`);
        } else {
          return NextResponse.json(
            {
              error:
                "Could not insert a new schema into this page (no recognizable component/SiteLayout structure). Editing existing schemas is still supported.",
            },
            { status: 422 }
          );
        }
      }
    }

    if (next === content || applied.length === 0) {
      return NextResponse.json(
        { error: "No changes detected.", applied: [] },
        { status: 422 }
      );
    }

    const message = `CMS: update SEO/schema for ${page.route} (${applied.join(", ")})`;
    const { commitSha } = await githubCommitFile({
      path: page.file,
      content: next,
      sha,
      message,
    });

    return NextResponse.json({
      ok: true,
      route: page.route,
      file: page.file,
      applied,
      commitSha,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to publish: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
