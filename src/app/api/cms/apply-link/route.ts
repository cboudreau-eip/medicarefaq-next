import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "cboudreau-eip/medicarefaq-next";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw =
    request.headers.get("x-cms-password") ??
    request.headers.get("authorization")?.replace("Bearer ", "") ??
    "";
  return pw === CMS_PASSWORD;
}

// Determine which data file an article lives in based on its type/slug
function getDataFilePath(sourceSlug: string, sourcePath: string): string {
  if (sourcePath.startsWith("/blog/")) {
    return "src/lib/blog-articles-data.ts";
  }
  // For FAQ/coverage articles, we need to check which file they're in
  // Coverage articles are in coverage-data.ts, FAQ articles in simple-faq-data batches
  return "src/lib/blog-articles-data.ts"; // Default, will be overridden
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { sourceSlug, sourcePath, anchorText, targetPath } = body as {
      sourceSlug: string;
      sourcePath: string;
      anchorText: string;
      targetPath: string;
    };

    if (!sourceSlug || !anchorText || !targetPath) {
      return NextResponse.json(
        { error: "Missing required fields: sourceSlug, anchorText, targetPath" },
        { status: 400 }
      );
    }

    // Determine which file to edit
    let filePath: string;
    if (sourcePath.startsWith("/blog/")) {
      filePath = "src/lib/blog-articles-data.ts";
    } else {
      // Check coverage-data and simple-faq-data files
      // Try to find the slug in each file
      const filesToCheck = [
        "src/lib/coverage-data.ts",
        "src/lib/simple-faq-data-batch1.ts",
        "src/lib/simple-faq-data-batch2.ts",
        "src/lib/simple-faq-data-batch3.ts",
      ];

      filePath = ""; // Will be set below

      for (const f of filesToCheck) {
        const checkRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${f}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        if (!checkRes.ok) continue;
        const checkData = await checkRes.json();
        const content = Buffer.from(checkData.content, "base64").toString("utf-8");
        if (content.includes(`slug: "${sourceSlug}"`) || content.includes(`slug: '${sourceSlug}'`)) {
          filePath = f;
          break;
        }
      }

      if (!filePath) {
        return NextResponse.json(
          { error: `Could not find article "${sourceSlug}" in any data file` },
          { status: 404 }
        );
      }
    }

    // Fetch the file from GitHub
    const fileRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!fileRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch file: ${fileRes.status}` },
        { status: 502 }
      );
    }

    const fileData = await fileRes.json();
    const fileContent = Buffer.from(fileData.content, "base64").toString("utf-8");
    const fileSha = fileData.sha;

    // Find the anchor text in the article's content and wrap it with a link
    // We need to find the text within the article's sections
    const linkHtml = `<a href="${targetPath}">${anchorText}</a>`;

    // Strategy: find the first occurrence of the anchor text that is NOT already inside a link
    // We'll look for the text that's not already wrapped in <a> tags
    const escapedAnchor = anchorText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Match the anchor text that is NOT inside an existing <a> tag
    // Simple approach: replace the first occurrence that isn't already linked
    const alreadyLinkedPattern = new RegExp(
      `<a[^>]*>[^<]*${escapedAnchor}[^<]*</a>`,
      "i"
    );
    
    // Check if it's already linked
    if (alreadyLinkedPattern.test(fileContent)) {
      return NextResponse.json(
        { error: "This text is already linked in the article" },
        { status: 409 }
      );
    }

    // Find and replace the first occurrence of the anchor text within the article's section
    // We need to be careful to only replace within the correct article's content
    const slugPattern = new RegExp(
      `slug:\\s*["']${sourceSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`
    );
    const slugMatch = fileContent.match(slugPattern);
    
    if (!slugMatch || slugMatch.index === undefined) {
      return NextResponse.json(
        { error: `Could not locate article "${sourceSlug}" in file` },
        { status: 404 }
      );
    }

    // Find the article block (from slug to the next article or end)
    const articleStart = slugMatch.index;
    // Look for the next article entry (next "slug:" or end of array)
    const nextSlugMatch = fileContent.slice(articleStart + 10).match(/slug:\s*["']/);
    const articleEnd = nextSlugMatch && nextSlugMatch.index !== undefined
      ? articleStart + 10 + nextSlugMatch.index
      : fileContent.length;

    const articleBlock = fileContent.slice(articleStart, articleEnd);

    // Replace the first occurrence of anchor text in the article block
    const textPattern = new RegExp(escapedAnchor, "i");
    const textMatch = articleBlock.match(textPattern);

    if (!textMatch) {
      return NextResponse.json(
        { error: `Could not find "${anchorText}" in the article content` },
        { status: 404 }
      );
    }

    const updatedBlock = articleBlock.replace(textPattern, linkHtml);
    const updatedContent = fileContent.slice(0, articleStart) + updatedBlock + fileContent.slice(articleEnd);

    // Push the updated file to GitHub
    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: add internal link in "${sourceSlug}" → ${targetPath}`,
          content: Buffer.from(updatedContent).toString("base64"),
          sha: fileSha,
        }),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      return NextResponse.json(
        { error: `GitHub update failed: ${updateRes.status}`, details: errText },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Added link: "${anchorText}" → ${targetPath} in ${sourceSlug}`,
      file: filePath,
    });
  } catch (err) {
    console.error("apply-link error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
