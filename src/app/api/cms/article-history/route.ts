import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";

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
  // Find the article by its slug field
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

  // Walk backwards to find the opening brace of this article object
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

  // Walk forward from objStart to find the matching closing brace
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

interface CommitInfo {
  sha: string;
  message: string;
  date: string;
  author: string;
}

/**
 * GET /api/cms/article-history
 * Query params: slug, type
 * Returns commit history for the file containing this article,
 * filtered to only commits that actually changed this article's content.
 */
export async function GET(request: Request) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  if (!slug || !type) {
    return NextResponse.json({ error: "slug and type required" }, { status: 400 });
  }

  const filePath = getFilePath(type);

  try {
    // Get commit history for this file from GitHub
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(filePath)}&sha=${BRANCH}&per_page=50`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const commits = await res.json();

    // Map to a clean format
    const history: CommitInfo[] = commits.map((c: { sha: string; commit: { message: string; author: { date: string; name: string } }; author?: { login: string } }) => ({
      sha: c.sha,
      message: c.commit.message,
      date: c.commit.author.date,
      author: c.author?.login || c.commit.author.name || "unknown",
    }));

    // Now filter: for each commit, check if the article block was actually changed
    // We'll do this by comparing the article block at each commit vs the next one
    // To keep it fast, we'll check up to 20 commits and fetch content for filtering
    const relevantHistory: CommitInfo[] = [];
    let previousBlock: string | null = null;

    // Check the first few commits to see which ones actually changed this article
    const commitsToCheck = history.slice(0, 30);

    for (let i = 0; i < commitsToCheck.length; i++) {
      const commit = commitsToCheck[i];

      try {
        // Fetch the file at this commit
        const fileRes = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${commit.sha}`,
          {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
            cache: "no-store",
          }
        );

        if (!fileRes.ok) {
          // File might not exist at this commit (article was created later)
          break;
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
          break;
        }

        const block = extractArticleBlock(content, slug);

        if (block === null) {
          // Article doesn't exist at this commit — this is the creation boundary
          if (previousBlock !== null) {
            // The previous commit was when it was created
            relevantHistory.push(commitsToCheck[i - 1]);
          }
          break;
        }

        // Compare with previous block
        if (previousBlock === null) {
          // First commit (most recent) — always include
          relevantHistory.push(commit);
        } else if (block !== previousBlock) {
          // Content changed — include this commit
          relevantHistory.push(commit);
        }

        previousBlock = block;
      } catch {
        // Skip commits we can't fetch
        continue;
      }
    }

    return NextResponse.json({
      history: relevantHistory,
      filePath,
      totalFileCommits: history.length,
    });
  } catch (err) {
    console.error("[CMS article-history]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
