import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";
const UPLOAD_PATH = "public/images/generated";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

/**
 * Commit a base64-encoded image to GitHub.
 * Called at publish/create time — NOT during image generation preview.
 * 
 * Expects: { base64: string, fileName: string }
 * Returns: { success: true, url: string (site-relative path) }
 */
export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { base64, fileName } = body;

    if (!base64 || !fileName) {
      return NextResponse.json(
        { error: "base64 and fileName are required" },
        { status: 400 }
      );
    }

    const filePath = `${UPLOAD_PATH}/${fileName}`;

    // Commit the image to GitHub
    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `cms: AI-generated featured image for ${fileName.replace(/-\d+\.png$/, "")}`,
          content: base64,
          branch: "main",
        }),
      }
    );

    if (!commitRes.ok) {
      const errData = await commitRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: `GitHub upload failed: ${commitRes.status} ${(errData as Record<string, string>).message || ""}` },
        { status: 500 }
      );
    }

    // Return the site-relative URL for use in the article data
    const publicUrl = `/images/generated/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (err) {
    console.error("Commit image error:", err);
    return NextResponse.json(
      { error: `Image commit failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
