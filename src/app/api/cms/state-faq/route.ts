import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import {
  githubGetFileContent,
  githubCommitFile,
  hasGithubToken,
} from "@/lib/cms-github";
import {
  extractFaqArray,
  replaceFaqArray,
  type FaqEntry,
} from "@/lib/cms-state-faq";
import manifest from "@/lib/cms-pages-manifest.json";

type ManifestPage = (typeof manifest.pages)[number];

function resolvePage(params: URLSearchParams): ManifestPage | null {
  const file = params.get("file");
  const route = params.get("route");
  const pages = manifest.pages as ManifestPage[];
  if (file) return pages.find((p) => p.file === file) ?? null;
  if (route) return pages.find((p) => p.route === route) ?? null;
  return null;
}

/**
 * Resolve the data-lib file that backs a state page by reading its
 * PageContent.tsx import line: `from "@/lib/<x>-medigap-data"`.
 * Returns a repo-relative path under src/lib, or null if not found.
 */
async function resolveDataFile(pageFile: string): Promise<string | null> {
  // PageContent.tsx lives next to page.tsx.
  const contentPath = pageFile.replace(/page\.tsx$/, "PageContent.tsx");
  let content: string;
  try {
    ({ content } = await githubGetFileContent(contentPath));
  } catch {
    return null;
  }
  const m = content.match(/from\s+["']@\/lib\/([\w-]+-medigap-data)["']/);
  if (!m) return null;
  const candidate = `src/lib/${m[1]}.ts`;
  // Safety: only allow files within src/lib that match the medigap-data suffix.
  if (!/^src\/lib\/[\w-]+-medigap-data\.ts$/.test(candidate)) return null;
  return candidate;
}

/**
 * GET /api/cms/state-faq?file=...&route=...
 * Returns the parsed FAQ entries for a content-editable state page.
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
    return NextResponse.json({ error: "Unknown page." }, { status: 404 });
  }
  if (!page.contentEditable) {
    return NextResponse.json(
      { error: "This page does not support FAQ content editing." },
      { status: 400 }
    );
  }

  const dataFile = await resolveDataFile(page.file);
  if (!dataFile) {
    return NextResponse.json(
      { error: "Could not locate this page's data file." },
      { status: 404 }
    );
  }

  try {
    const { content } = await githubGetFileContent(dataFile);
    const faq = extractFaqArray(content);
    if (!faq) {
      return NextResponse.json(
        { error: "No FAQ array found in the data file." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      route: page.route,
      dataFile,
      faqName: faq.name,
      keyStyle: faq.keyStyle,
      entries: faq.entries,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to read FAQ data: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}

interface StateFaqPutBody {
  file?: string;
  route?: string;
  entries?: FaqEntry[];
}

/**
 * PUT /api/cms/state-faq
 * Body: { file|route, entries: [{question, answer}, ...] }
 * Rewrites the FAQ array in the page's data file and commits to GitHub.
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

  let body: StateFaqPutBody;
  try {
    body = (await req.json()) as StateFaqPutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const params = new URLSearchParams();
  if (body.file) params.set("file", body.file);
  if (body.route) params.set("route", body.route);
  const page = resolvePage(params);
  if (!page) {
    return NextResponse.json({ error: "Unknown page." }, { status: 404 });
  }
  if (!page.contentEditable) {
    return NextResponse.json(
      { error: "This page does not support FAQ content editing." },
      { status: 400 }
    );
  }

  // Validate entries.
  const entries = body.entries;
  if (!Array.isArray(entries) || entries.length === 0) {
    return NextResponse.json(
      { error: "At least one FAQ entry is required." },
      { status: 400 }
    );
  }
  for (const e of entries) {
    if (
      !e ||
      typeof e.question !== "string" ||
      typeof e.answer !== "string" ||
      !e.question.trim() ||
      !e.answer.trim()
    ) {
      return NextResponse.json(
        { error: "Every FAQ entry must have a non-empty question and answer." },
        { status: 400 }
      );
    }
  }

  const dataFile = await resolveDataFile(page.file);
  if (!dataFile) {
    return NextResponse.json(
      { error: "Could not locate this page's data file." },
      { status: 404 }
    );
  }

  try {
    const { content, sha } = await githubGetFileContent(dataFile);
    const before = extractFaqArray(content);
    if (!before) {
      return NextResponse.json(
        { error: "No FAQ array found in the data file." },
        { status: 404 }
      );
    }
    const next = replaceFaqArray(content, entries);
    if (next === content) {
      return NextResponse.json(
        { error: "No changes detected.", applied: [] },
        { status: 422 }
      );
    }
    // Sanity: re-extract to confirm the result is still parseable and the
    // count matches what we intended to write.
    const verify = extractFaqArray(next);
    if (!verify || verify.entries.length !== entries.length) {
      return NextResponse.json(
        { error: "Internal validation failed; aborting to avoid corrupting the file." },
        { status: 500 }
      );
    }

    const message = `CMS: update FAQ content for ${page.route} (${entries.length} entries)`;
    const { commitSha } = await githubCommitFile({
      path: dataFile,
      content: next,
      sha,
      message,
    });

    return NextResponse.json({
      ok: true,
      route: page.route,
      dataFile,
      count: entries.length,
      commitSha,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to publish FAQ data: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
