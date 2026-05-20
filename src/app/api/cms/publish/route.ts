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

async function githubGetFile(path: string) {
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
  if (!res.ok) throw new Error(`GitHub GET error: ${res.status} for ${path}`);
  return res.json();
}

function decodeBase64(b64: string): string {
  return Buffer.from(b64.replace(/\n/g, ""), "base64").toString("utf-8");
}

function encodeBase64(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

/**
 * Replace the SEO block and title in the source for a given slug.
 */
function patchArticleInSource(
  src: string,
  slug: string,
  updates: {
    title?: string;
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    sectionsRaw?: string;
  }
): string {
  // Find the slug entry
  const slugPattern = new RegExp(`slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "");
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
  let block = src.slice(braceStart, blockEnd);

  // Patch title
  if (updates.title !== undefined) {
    block = block.replace(
      /(\btitle:\s*)"(?:[^"\\]|\\.)*"/,
      `$1"${updates.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
    );
  }

  // Patch seo fields
  if (updates.seoTitle !== undefined || updates.seoDescription !== undefined || updates.ogImage !== undefined) {
    // Find seo block within the article block
    const seoStart = block.indexOf("seo:");
    if (seoStart !== -1) {
      const seoOpenBrace = block.indexOf("{", seoStart);
      let seoDepth = 0;
      let j = seoOpenBrace;
      while (j < block.length) {
        if (block[j] === "{") seoDepth++;
        else if (block[j] === "}") {
          seoDepth--;
          if (seoDepth === 0) break;
        }
        j++;
      }
      let seoBlock = block.slice(seoOpenBrace, j + 1);

      if (updates.seoTitle !== undefined) {
        seoBlock = seoBlock.replace(
          /(\btitle:\s*)"(?:[^"\\]|\\.)*"/,
          `$1"${updates.seoTitle.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
        );
      }
      if (updates.seoDescription !== undefined) {
        seoBlock = seoBlock.replace(
          /(\bdescription:\s*)"(?:[^"\\]|\\.)*"/,
          `$1"${updates.seoDescription.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
        );
      }
      if (updates.ogImage !== undefined) {
        seoBlock = seoBlock.replace(
          /(\bogImage:\s*)"(?:[^"\\]|\\.)*"/,
          `$1"${updates.ogImage.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
        );
      }

      block = block.slice(0, seoOpenBrace) + seoBlock + block.slice(j + 1);
    }
  }

  // Patch sections if provided
  if (updates.sectionsRaw !== undefined) {
    const sectionsIdx = block.indexOf("sections:");
    if (sectionsIdx !== -1) {
      const arrStart = block.indexOf("[", sectionsIdx);
      if (arrStart !== -1) {
        let depth2 = 0;
        let k = arrStart;
        while (k < block.length) {
          if (block[k] === "[") depth2++;
          else if (block[k] === "]") {
            depth2--;
            if (depth2 === 0) break;
          }
          k++;
        }
        block = block.slice(0, arrStart) + updates.sectionsRaw + block.slice(k + 1);
      }
    }
  }

  return src.slice(0, braceStart) + block + src.slice(blockEnd);
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, type, title, seoTitle, seoDescription, ogImage, sectionsRaw } = body;

    if (!slug || !type) {
      return NextResponse.json({ error: "slug and type required" }, { status: 400 });
    }

    const filePath =
      type === "blog"
        ? "src/lib/blog-articles-data.ts"
        : "src/lib/coverage-data.ts";

    // Get current file
    const fileData = await githubGetFile(filePath);
    const currentSrc = decodeBase64(fileData.content);
    const fileSha = fileData.sha;

    // Apply patches
    const patchedSrc = patchArticleInSource(currentSrc, slug, {
      title,
      seoTitle,
      seoDescription,
      ogImage,
      sectionsRaw,
    });

    if (patchedSrc === currentSrc) {
      return NextResponse.json({ message: "No changes detected", committed: false });
    }

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
          message: `cms: update "${slug}" — title, SEO, and content`,
          content: encodeBase64(patchedSrc),
          sha: fileSha,
          branch: BRANCH,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.text();
      throw new Error(`GitHub commit failed: ${commitRes.status} — ${err}`);
    }

    const commitData = await commitRes.json();

    return NextResponse.json({
      committed: true,
      commitSha: commitData.commit?.sha,
      message: `Published "${slug}" successfully. Vercel deploy triggered.`,
    });
  } catch (err) {
    console.error("[CMS publish]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
