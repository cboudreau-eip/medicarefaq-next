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
 * Fetch file content and SHA from GitHub.
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
  if (!metaRes.ok) throw new Error(`GitHub GET error: ${metaRes.status} for ${path}`);
  const meta = await metaRes.json();
  const sha = meta.sha;

  if (meta.content && meta.encoding === "base64") {
    const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    return { content, sha };
  }

  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      cache: "no-store",
    });
    if (!rawRes.ok) throw new Error(`GitHub raw download error: ${rawRes.status} for ${path}`);
    const content = await rawRes.text();
    return { content, sha };
  }

  throw new Error(`Cannot retrieve content for ${path} (encoding: ${meta.encoding})`);
}

function encodeBase64(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

/**
 * Escape a string for safe inclusion in a TypeScript string literal.
 */
function escapeTS(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}

/**
 * Build a new BlogArticleData object as a TypeScript string.
 */
function buildArticleObject(data: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  sectionsRaw: string;
}): string {
  const sections = data.sectionsRaw.trim() || `[
      { type: "paragraph", content: "Article content coming soon." },
    ]`;

  return `  {
    slug: "${escapeTS(data.slug)}",
    seo: {
      title: "${escapeTS(data.seoTitle || data.title)}",
      description: "${escapeTS(data.seoDescription || data.excerpt)}",
      canonical: "https://www.medicarefaq.com/blog/${escapeTS(data.slug)}/",
      ogImage: "${escapeTS(data.ogImage || data.image)}",
    },
    title: "${escapeTS(data.title)}",
    excerpt: "${escapeTS(data.excerpt)}",
    category: "${escapeTS(data.category)}",
    categoryColor: "#0D9488",
    date: "${escapeTS(data.date)}",
    author: "${escapeTS(data.author)}",
    reviewer: "Ashlee Zareczny",
    readTime: "5 min read",
    featured: false,
    image: "${escapeTS(data.image)}",
    imageAlt: "${escapeTS(data.imageAlt || data.title)}",
    tableOfContents: [],
    sections: ${sections},
  }`;
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, title, excerpt, category, date, author, image, imageAlt, seoTitle, seoDescription, ogImage, sectionsRaw } = body;

    // Validate required fields
    if (!slug || !title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    // Validate slug format
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, { status: 400 });
    }

    const filePath = "src/lib/blog-articles-data.ts";

    // Get current file content and SHA
    const { content: currentSrc, sha: fileSha } = await githubGetFileContent(filePath);

    // Check if slug already exists
    if (currentSrc.includes(`slug: "${slug}"`)) {
      return NextResponse.json({ error: `Article with slug "${slug}" already exists.` }, { status: 409 });
    }

    // Build the new article object
    const articleObj = buildArticleObject({
      slug,
      title,
      excerpt: excerpt ?? "",
      category: category ?? "General",
      date: date ?? new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: author ?? "David Haass",
      image: image ?? "",
      imageAlt: imageAlt ?? "",
      seoTitle: seoTitle ?? "",
      seoDescription: seoDescription ?? "",
      ogImage: ogImage ?? "",
      sectionsRaw: sectionsRaw ?? "",
    });

    // Insert the new article at the beginning of the array (after the opening bracket)
    // Find the opening bracket of the array: `export const blogArticles: BlogArticleData[] = [`
    const arrayStartRegex = /export\s+const\s+blogArticles[^=]*=\s*\[/;
    const arrayStartMatch = currentSrc.match(arrayStartRegex);
    if (!arrayStartMatch || arrayStartMatch.index === undefined) {
      throw new Error("Could not find blogArticles array in source file");
    }

    const insertPos = arrayStartMatch.index + arrayStartMatch[0].length;
    const newSrc = currentSrc.slice(0, insertPos) + "\n" + articleObj + ",\n" + currentSrc.slice(insertPos);

    // Commit to GitHub
    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: create new blog article "${slug}"`,
          content: encodeBase64(newSrc),
          sha: fileSha,
          branch: BRANCH,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.text();
      throw new Error(`GitHub commit failed: ${commitRes.status} - ${err}`);
    }

    const commitData = await commitRes.json();

    return NextResponse.json({
      committed: true,
      commitSha: commitData.commit?.sha,
      slug,
      url: `/blog/${slug}/`,
      message: `Created "${title}" successfully. Vercel deploy triggered.`,
    });
  } catch (err) {
    console.error("[CMS create]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
