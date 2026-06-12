import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

function getFilePath(type: string): string {
  return type === "blog"
    ? "src/lib/blog-articles-data.ts"
    : "src/lib/coverage-data.ts";
}

/**
 * Extract a single article object from the TS source by slug.
 * Returns the start index, end index, and the block content.
 */
function extractArticleBlockWithPosition(
  src: string,
  slug: string
): { block: string; start: number; end: number } | null {
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
        return {
          block: src.slice(objStart, i + 1),
          start: objStart,
          end: i + 1,
        };
      }
    }
  }

  return null;
}

/**
 * Fetch file content and SHA from GitHub at a specific ref.
 */
async function githubGetFileContent(
  path: string,
  ref: string = BRANCH
): Promise<{ content: string; sha: string }> {
  const metaRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${ref}`,
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

  if (meta.content && meta.encoding === "base64") {
    const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    return { content, sha };
  }

  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      cache: "no-store",
    });
    if (!rawRes.ok) throw new Error(`GitHub raw download error: ${rawRes.status}`);
    const content = await rawRes.text();
    return { content, sha };
  }

  throw new Error(`Cannot retrieve content for ${path}`);
}

/**
 * POST /api/cms/article-revert
 * Body: { slug, type, sha }
 * Reverts the article to its state at the given commit SHA.
 * This replaces the article block in the current file with the block from the old commit.
 */
export async function POST(request: Request) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, type, sha } = body;

  if (!slug || !type || !sha) {
    return NextResponse.json({ error: "slug, type, and sha required" }, { status: 400 });
  }

  const filePath = getFilePath(type);

  try {
    // 1. Get the article block from the old commit
    const { content: oldContent } = await githubGetFileContent(filePath, sha);
    const oldBlock = extractArticleBlockWithPosition(oldContent, slug);
    if (!oldBlock) {
      return NextResponse.json(
        { error: "Article not found at the specified revision" },
        { status: 404 }
      );
    }

    // 2. Get the current file content (HEAD)
    const { content: currentContent, sha: currentFileSha } = await githubGetFileContent(
      filePath,
      BRANCH
    );
    const currentBlock = extractArticleBlockWithPosition(currentContent, slug);
    if (!currentBlock) {
      return NextResponse.json(
        { error: "Article not found in current file" },
        { status: 404 }
      );
    }

    // 3. Replace the current block with the old block
    const updatedContent =
      currentContent.slice(0, currentBlock.start) +
      oldBlock.block +
      currentContent.slice(currentBlock.end);

    // 4. Commit the updated file to GitHub
    const commitMessage = `cms: revert "${slug}" to revision ${sha.slice(0, 7)}`;
    const putRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: Buffer.from(updatedContent).toString("base64"),
          sha: currentFileSha,
          branch: BRANCH,
        }),
      }
    );

    if (!putRes.ok) {
      const errData = await putRes.json();
      throw new Error(`GitHub commit failed: ${putRes.status} — ${JSON.stringify(errData)}`);
    }

    return NextResponse.json({
      success: true,
      message: `Reverted "${slug}" to revision ${sha.slice(0, 7)}`,
    });
  } catch (err) {
    console.error("[CMS article-revert]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
