import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";

/**
 * Fetch file content and SHA from GitHub. Handles large files (>1MB)
 * by falling back to the raw download URL.
 */
async function githubGetFileContent(path: string): Promise<{ content: string; sha: string }> {
  const metaRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (!metaRes.ok) throw new Error(`GitHub API error: ${metaRes.status} for ${path}`);
  const meta = await metaRes.json();
  const sha = meta.sha;

  // If content is available (small files), decode base64
  if (meta.content && meta.encoding === "base64") {
    const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    return { content, sha };
  }

  // For large files, use the raw download URL
  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      cache: "no-store",
    });
    if (!rawRes.ok) throw new Error(`GitHub raw download error: ${rawRes.status} for ${path}`);
    const content = await rawRes.text();
    return { content, sha };
  }

  throw new Error(`Cannot retrieve content for ${path} (encoding: ${meta.encoding})`);
}

/**
 * Extract a single article object from the TS source by slug.
 * Returns the raw source block and the sha of the file.
 */
function extractArticleBlock(src: string, slug: string): string | null {
  // Find the slug entry
  const slugPattern = new RegExp(`slug:\\s*["']${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "");
  const slugIdx = src.search(slugPattern);
  if (slugIdx === -1) return null;

  // Walk back to find the opening brace of this object
  let braceStart = slugIdx;
  while (braceStart > 0 && src[braceStart] !== "{") braceStart--;

  // Walk forward to find the matching closing brace
  let depth = 0;
  let i = braceStart;
  while (i < src.length) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }

  return src.slice(braceStart, i + 1);
}

/**
 * Parse SEO fields from a raw TS object block using regex.
 */
function parseSEO(block: string) {
  const titleMatch = block.match(/seo:\s*\{[\s\S]*?title:\s*"((?:[^"\\]|\\.)*)"/);
  const descMatch = block.match(/seo:\s*\{[\s\S]*?description:\s*"((?:[^"\\]|\\.)*)"/);
  const ogMatch = block.match(/seo:\s*\{[\s\S]*?ogImage:\s*"((?:[^"\\]|\\.)*)"/);
  const canonicalMatch = block.match(/seo:\s*\{[\s\S]*?canonical:\s*"((?:[^"\\]|\\.)*)"/);
  return {
    title: titleMatch ? titleMatch[1] : "",
    description: descMatch ? descMatch[1] : "",
    ogImage: ogMatch ? ogMatch[1] : "",
    canonical: canonicalMatch ? canonicalMatch[1] : "",
  };
}

function parseTitle(block: string): string {
  const m = block.match(/(?:^|,|\{)\s*title:\s*"((?:[^"\\]|\\.)*)"/);
  return m ? m[1] : "";
}

function parseImage(block: string): string {
  const m = block.match(/(?:^|,|\s)image:\s*"((?:[^"\\]|\\.)*)"/);
  return m ? m[1] : "";
}

function parseImageAlt(block: string): string {
  const m = block.match(/imageAlt:\s*"((?:[^"\\]|\\.)*)"/);
  return m ? m[1] : "";
}

/**
 * Extract customSchema array as raw string.
 */
function parseCustomSchema(block: string): string {
  const idx = block.indexOf("customSchema:");
  if (idx === -1) return "";
  const arrStart = block.indexOf("[", idx);
  if (arrStart === -1) return "";

  let depth = 0;
  let i = arrStart;
  while (i < block.length) {
    if (block[i] === "[") depth++;
    else if (block[i] === "]") {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  return block.slice(arrStart, i + 1);
}

/**
 * Extract sections array as raw JSON-parseable string.
 * We find "sections: [" and extract the full array.
 */
function parseSectionsRaw(block: string): string {
  const sectionsIdx = block.indexOf("sections:");
  if (sectionsIdx === -1) return "[]";
  const arrStart = block.indexOf("[", sectionsIdx);
  if (arrStart === -1) return "[]";

  let depth = 0;
  let i = arrStart;
  while (i < block.length) {
    if (block[i] === "[") depth++;
    else if (block[i] === "]") {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  return block.slice(arrStart, i + 1);
}

export async function GET(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") as "blog" | "coverage" | null;

  if (!slug || !type) {
    return NextResponse.json({ error: "slug and type required" }, { status: 400 });
  }

  const filePath =
    type === "blog"
      ? "src/lib/blog-articles-data.ts"
      : "src/lib/coverage-data.ts";

  try {
    const { content: src, sha } = await githubGetFileContent(filePath);

    const block = extractArticleBlock(src, slug);
    if (!block) {
      return NextResponse.json({ error: `Article "${slug}" not found` }, { status: 404 });
    }

    const seo = parseSEO(block);
    const title = parseTitle(block);
    const image = parseImage(block);
    const imageAlt = parseImageAlt(block);
    const sectionsRaw = parseSectionsRaw(block);
    const customSchemaRaw = parseCustomSchema(block);

    // Try to parse sections as JSON (they're stored as JS object literals - attempt best-effort)
    let sections: unknown[] = [];
    try {
      // Replace unquoted keys with quoted keys for JSON compatibility
      const jsonified = sectionsRaw
        .replace(/(\w+):/g, '"$1":')
        .replace(/'/g, '"');
      sections = JSON.parse(jsonified);
    } catch {
      // Return raw string if parsing fails - editor will show raw mode
      sections = [];
    }

    return NextResponse.json({
      slug,
      type,
      title,
      image,
      imageAlt,
      seo,
      sections,
      sectionsRaw,
      customSchemaRaw,
      fileSha: sha,
      filePath,
    });
  } catch (err) {
    console.error("[CMS article GET]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
