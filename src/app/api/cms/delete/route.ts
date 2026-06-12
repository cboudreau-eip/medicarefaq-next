import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
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
 * Remove an article object from the source file by slug.
 * Finds the object containing `slug: "the-slug"` and removes it from the array.
 */
function removeArticleFromSource(src: string, slug: string): string {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const slugPattern = new RegExp(`slug:\\s*["']${escapedSlug}["']`);
  const slugIdx = src.search(slugPattern);
  if (slugIdx === -1) throw new Error(`Slug "${slug}" not found in source`);

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
  const blockEnd = i + 1;

  // Remove the object and any trailing comma + whitespace
  let removeEnd = blockEnd;
  // Skip trailing comma and whitespace/newlines
  while (removeEnd < src.length && (src[removeEnd] === "," || src[removeEnd] === " " || src[removeEnd] === "\n" || src[removeEnd] === "\r")) {
    removeEnd++;
  }

  // Also remove leading whitespace/newlines before the opening brace
  let removeStart = braceStart;
  while (removeStart > 0 && (src[removeStart - 1] === " " || src[removeStart - 1] === "\n" || src[removeStart - 1] === "\r")) {
    removeStart--;
  }

  const newSrc = src.slice(0, removeStart) + "\n" + src.slice(removeEnd);
  return newSrc;
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, type } = body;

    if (!slug || !type) {
      return NextResponse.json({ error: "slug and type are required" }, { status: 400 });
    }

    const filePath =
      type === "blog"
        ? "src/lib/blog-articles-data.ts"
        : "src/lib/coverage-data.ts";

    // Get current file content and SHA
    const { content: currentSrc, sha: fileSha } = await githubGetFileContent(filePath);

    // Check if slug exists
    if (!currentSrc.includes(`slug: "${slug}"`) && !currentSrc.includes(`slug: '${slug}'`)) {
      return NextResponse.json({ error: `Article with slug "${slug}" not found.` }, { status: 404 });
    }

    // Remove the article
    const newSrc = removeArticleFromSource(currentSrc, slug);

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
          message: `cms: delete article "${slug}"`,
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
      message: `Deleted "${slug}" successfully. Vercel deploy triggered.`,
    });
  } catch (err) {
    console.error("[CMS delete]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
