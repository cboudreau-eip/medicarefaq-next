import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT;
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}
const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";

/**
 * Fetch file content from GitHub. For files >1MB, the Contents API
 * returns encoding:"none" with no content, so we fall back to the
 * raw download URL.
 */
async function githubGetContent(path: string): Promise<string> {
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
  if (!metaRes.ok) throw new Error(`GitHub API error: ${metaRes.status} ${path}`);
  const meta = await metaRes.json();

  // If content is available (small files), decode base64
  if (meta.content && meta.encoding === "base64") {
    return Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
  }

  // For large files, use the raw download URL
  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      cache: "no-store",
    });
    if (!rawRes.ok) throw new Error(`GitHub raw download error: ${rawRes.status} ${path}`);
    return rawRes.text();
  }

  throw new Error(`Cannot retrieve content for ${path} (encoding: ${meta.encoding})`);
}

/**
 * Split the source into individual article blocks by finding top-level objects
 * in the exported array. This is more reliable than a single greedy regex.
 */
function splitArticleBlocks(src: string): string[] {
  const blocks: string[] = [];
  // Find the start of the array (after the export)
  const arrayStart = src.indexOf("[");
  if (arrayStart === -1) return blocks;

  let depth = 0;
  let blockStart = -1;

  for (let i = arrayStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") {
      if (depth === 1) blockStart = i; // top-level object inside array
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 1 && blockStart !== -1) {
        blocks.push(src.slice(blockStart, i + 1));
        blockStart = -1;
      }
    }
  }
  return blocks;
}

/**
 * Extract a string field value from a block using a simple regex.
 * Handles both single and double quotes.
 */
function extractField(block: string, fieldName: string): string {
  // Match field: "value" or field: 'value'
  const regex = new RegExp(`(?:^|[\\s,{])${fieldName}:\\s*["']([^"']*?)["']`, "m");
  const match = block.match(regex);
  return match?.[1] ?? "";
}

/**
 * Extract ogImage specifically from the seo block to avoid matching
 * ogImage in nested objects like relatedArticles
 */
function extractOgImage(block: string): string {
  // Find the seo: { ... } block
  const seoStart = block.indexOf("seo:");
  if (seoStart === -1) return "";

  // Find the opening brace of the seo object
  const braceStart = block.indexOf("{", seoStart);
  if (braceStart === -1) return "";

  // Find the matching closing brace
  let depth = 0;
  let seoEnd = braceStart;
  for (let i = braceStart; i < block.length; i++) {
    if (block[i] === "{") depth++;
    else if (block[i] === "}") {
      depth--;
      if (depth === 0) {
        seoEnd = i;
        break;
      }
    }
  }

  const seoBlock = block.slice(braceStart, seoEnd + 1);
  const ogMatch = seoBlock.match(/ogImage:\s*["']([^"']*?)["']/);
  return ogMatch?.[1] ?? "";
}

/**
 * Extract seo description from the seo block
 */
function extractSeoDescription(block: string): string {
  const seoStart = block.indexOf("seo:");
  if (seoStart === -1) return "";

  const braceStart = block.indexOf("{", seoStart);
  if (braceStart === -1) return "";

  let depth = 0;
  let seoEnd = braceStart;
  for (let i = braceStart; i < block.length; i++) {
    if (block[i] === "{") depth++;
    else if (block[i] === "}") {
      depth--;
      if (depth === 0) {
        seoEnd = i;
        break;
      }
    }
  }

  const seoBlock = block.slice(braceStart, seoEnd + 1);
  const descMatch = seoBlock.match(/description:\s*["']([^"']*?)["']/);
  return descMatch?.[1] ?? "";
}

/**
 * Extract seo title from the seo block
 */
function extractSeoTitle(block: string): string {
  const seoStart = block.indexOf("seo:");
  if (seoStart === -1) return "";

  const braceStart = block.indexOf("{", seoStart);
  if (braceStart === -1) return "";

  let depth = 0;
  let seoEnd = braceStart;
  for (let i = braceStart; i < block.length; i++) {
    if (block[i] === "{") depth++;
    else if (block[i] === "}") {
      depth--;
      if (depth === 0) {
        seoEnd = i;
        break;
      }
    }
  }

  const seoBlock = block.slice(braceStart, seoEnd + 1);
  const titleMatch = seoBlock.match(/title:\s*["']([^"']*?)["']/);
  return titleMatch?.[1] ?? "";
}

// Extract articles from blog data TS file
function extractBlogArticles(src: string) {
  const blocks = splitArticleBlocks(src);
  const articles: {
    slug: string;
    title: string;
    seoTitle: string;
    seoDescription: string;
    ogImage: string;
    image: string;
    excerpt: string;
    date: string;
    category: string;
  }[] = [];

  for (const block of blocks) {
    const slug = extractField(block, "slug");
    if (!slug) continue;

    // For blog articles, the top-level "image" field is the featured image
    // Also get ogImage from seo block as fallback
    const image = extractField(block, "image");
    const ogImage = extractOgImage(block);

    articles.push({
      slug,
      title: extractField(block, "title"),
      seoTitle: extractSeoTitle(block),
      seoDescription: extractSeoDescription(block),
      ogImage,
      image: image || ogImage, // prefer top-level image, fallback to ogImage
      excerpt: extractField(block, "excerpt"),
      date: extractField(block, "date"),
      category: extractField(block, "category"),
    });
    if (articles.length > 500) break;
  }
  return articles;
}

function extractCoverageArticles(src: string) {
  const blocks = splitArticleBlocks(src);
  const articles: {
    slug: string;
    title: string;
    seoTitle: string;
    seoDescription: string;
    ogImage: string;
    image: string;
    excerpt: string;
    date: string;
    category: string;
  }[] = [];

  for (const block of blocks) {
    const slug = extractField(block, "slug");
    if (!slug) continue;

    const ogImage = extractOgImage(block);
    const subtitle = extractField(block, "subtitle");
    const dateUpdated = extractField(block, "dateUpdated");

    articles.push({
      slug,
      title: extractField(block, "title"),
      seoTitle: extractSeoTitle(block),
      seoDescription: extractSeoDescription(block),
      ogImage,
      image: ogImage, // Coverage articles use ogImage as thumbnail
      excerpt: subtitle || extractSeoDescription(block),
      date: dateUpdated,
      category: extractField(block, "category"),
    });
    if (articles.length > 1000) break;
  }
  return articles;
}

export async function GET(request: NextRequest) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const [blogSrc, coverageSrc] = await Promise.all([
      githubGetContent("src/lib/blog-articles-data.ts"),
      githubGetContent("src/lib/coverage-data.ts"),
    ]);

    const blogArticles = extractBlogArticles(blogSrc).map((a) => ({
      ...a,
      type: "blog" as const,
      url: `/blog/${a.slug}/`,
    }));

    const coverageArticles = extractCoverageArticles(coverageSrc).map((a) => ({
      ...a,
      type: "coverage" as const,
      url: `/faqs/${a.slug}/`,
    }));

    // Sort by date (most recent first), fall back to alphabetical for articles without dates
    const all = [...blogArticles, ...coverageArticles].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      if (dateA && dateB) return dateB - dateA;
      if (dateA) return -1;
      if (dateB) return 1;
      return a.title.localeCompare(b.title);
    });

    return NextResponse.json({ articles: all, total: all.length });
  } catch (err) {
    console.error("[CMS articles]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
