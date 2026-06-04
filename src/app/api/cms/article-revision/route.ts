import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

function getFilePath(type: string): string {
  return type === "blog"
    ? "src/lib/blog-articles-data.ts"
    : "src/lib/coverage-data.ts";
}

/**
 * Extract a single article object from the TS source by slug.
 */
function extractArticleBlock(src: string, slug: string): string | null {
  const slugPatterns = [
    `slug: "${slug}"`,
    `slug: '${slug}'`,
    `slug: \`${slug}\``,
  ];

  let startIdx = -1;
  for (const pattern of slugPatterns) {
    startIdx = src.indexOf(pattern);
    if (startIdx !== -1) break;
  }
  if (startIdx === -1) return null;

  let braceCount = 0;
  let objStart = startIdx;
  for (let i = startIdx; i >= 0; i--) {
    if (src[i] === "{") {
      braceCount++;
      if (braceCount === 1) {
        objStart = i;
        break;
      }
    } else if (src[i] === "}") {
      braceCount--;
    }
  }

  braceCount = 0;
  for (let i = objStart; i < src.length; i++) {
    if (src[i] === "{") braceCount++;
    else if (src[i] === "}") {
      braceCount--;
      if (braceCount === 0) {
        return src.slice(objStart, i + 1);
      }
    }
  }

  return null;
}

// Parse fields from article block
function parseField(block: string, field: string): string {
  const patterns = [
    new RegExp(`${field}:\\s*"([^"]*)"`, "s"),
    new RegExp(`${field}:\\s*'([^']*)'`, "s"),
    new RegExp(`${field}:\\s*\`([^\`]*)\``, "s"),
  ];
  for (const p of patterns) {
    const m = block.match(p);
    if (m) return m[1];
  }
  return "";
}

function parseSectionsRaw(block: string): string {
  const idx = block.indexOf("sections:");
  if (idx === -1) return "";
  // Find the opening bracket
  const bracketStart = block.indexOf("[", idx);
  if (bracketStart === -1) return "";
  // Find the matching closing bracket
  let depth = 0;
  for (let i = bracketStart; i < block.length; i++) {
    if (block[i] === "[") depth++;
    else if (block[i] === "]") {
      depth--;
      if (depth === 0) {
        return block.slice(bracketStart, i + 1);
      }
    }
  }
  return "";
}

function parseSEO(block: string): { title: string; description: string; ogImage: string } {
  const seoIdx = block.indexOf("seo:");
  if (seoIdx === -1) return { title: "", description: "", ogImage: "" };
  // Extract the seo object
  const braceStart = block.indexOf("{", seoIdx);
  if (braceStart === -1) return { title: "", description: "", ogImage: "" };
  let depth = 0;
  let seoBlock = "";
  for (let i = braceStart; i < block.length; i++) {
    if (block[i] === "{") depth++;
    else if (block[i] === "}") {
      depth--;
      if (depth === 0) {
        seoBlock = block.slice(braceStart, i + 1);
        break;
      }
    }
  }
  return {
    title: parseField(seoBlock, "title"),
    description: parseField(seoBlock, "description"),
    ogImage: parseField(seoBlock, "ogImage"),
  };
}

/**
 * GET /api/cms/article-revision
 * Query params: slug, type, sha
 * Returns the article content at a specific commit SHA.
 */
export async function GET(request: Request) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");
  const sha = searchParams.get("sha");

  if (!slug || !type || !sha) {
    return NextResponse.json({ error: "slug, type, and sha required" }, { status: 400 });
  }

  const filePath = getFilePath(type);

  try {
    // Fetch the file at the specific commit
    const fileRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${sha}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!fileRes.ok) {
      throw new Error(`GitHub API error: ${fileRes.status}`);
    }

    const fileMeta = await fileRes.json();
    let content: string;

    if (fileMeta.content && fileMeta.encoding === "base64") {
      content = Buffer.from(fileMeta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    } else if (fileMeta.download_url) {
      const rawRes = await fetch(fileMeta.download_url, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        cache: "no-store",
      });
      content = await rawRes.text();
    } else {
      throw new Error("Cannot retrieve file content");
    }

    const block = extractArticleBlock(content, slug);
    if (!block) {
      return NextResponse.json({ error: "Article not found at this revision" }, { status: 404 });
    }

    // Parse fields
    const title = parseField(block, "title");
    const image = parseField(block, "image");
    const imageAlt = parseField(block, "imageAlt");
    const seo = parseSEO(block);
    const sectionsRaw = parseSectionsRaw(block);

    return NextResponse.json({
      slug,
      type,
      sha,
      title,
      image,
      imageAlt,
      seo,
      sectionsRaw,
      rawBlock: block,
    });
  } catch (err) {
    console.error("[CMS article-revision]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
