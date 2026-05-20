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

async function githubGet(path: string) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${path}`);
  return res.json();
}

function decodeBase64(b64: string): string {
  return Buffer.from(b64.replace(/\n/g, ""), "base64").toString("utf-8");
}

// Extract slug+title+seo from a TS data file using regex (no eval)
function extractBlogArticles(src: string) {
  const articles: { slug: string; title: string; seoTitle: string; seoDescription: string; ogImage: string }[] = [];
  // Match each top-level object in the array
  const objectRegex = /\{\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?(?:seo:\s*\{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?ogImage:\s*"([^"]*)"[\s\S]*?\})?/g;
  let m;
  while ((m = objectRegex.exec(src)) !== null) {
    articles.push({
      slug: m[1],
      title: m[2],
      seoTitle: m[3] ?? "",
      seoDescription: m[4] ?? "",
      ogImage: m[5] ?? "",
    });
    if (articles.length > 500) break;
  }
  return articles;
}

function extractCoverageArticles(src: string) {
  const articles: { slug: string; title: string; seoTitle: string; seoDescription: string; ogImage: string }[] = [];
  const objectRegex = /\{\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?(?:seo:\s*\{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?ogImage:\s*"([^"]*)"[\s\S]*?\})?/g;
  let m;
  while ((m = objectRegex.exec(src)) !== null) {
    articles.push({
      slug: m[1],
      title: m[2],
      seoTitle: m[3] ?? "",
      seoDescription: m[4] ?? "",
      ogImage: m[5] ?? "",
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
    const [blogFile, coverageFile] = await Promise.all([
      githubGet("src/lib/blog-articles-data.ts"),
      githubGet("src/lib/coverage-data.ts"),
    ]);

    const blogSrc = decodeBase64(blogFile.content);
    const coverageSrc = decodeBase64(coverageFile.content);

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

    const all = [...blogArticles, ...coverageArticles].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    return NextResponse.json({ articles: all, total: all.length });
  } catch (err) {
    console.error("[CMS articles]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
