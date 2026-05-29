import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";
const UPLOAD_PATH = "public/images/uploaded";

export async function POST(req: NextRequest) {
  // Auth check
  const pw = req.headers.get("x-cms-password");
  const expected = process.env.CMS_ADMIN_PASSWORD ?? "";
  if (!pw || pw !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, SVG` },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 5MB` },
        { status: 400 }
      );
    }

    // Generate a clean filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    const timestamp = Date.now();
    const fileName = `${baseName}-${timestamp}.${ext}`;
    const filePath = `${UPLOAD_PATH}/${fileName}`;

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Content = Buffer.from(arrayBuffer).toString("base64");

    // Commit to GitHub via API
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
          message: `cms: upload image ${fileName}`,
          content: base64Content,
          branch: "main",
        }),
      }
    );

    if (!commitRes.ok) {
      const errData = await commitRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: `GitHub upload failed: ${commitRes.status} ${errData.message || ""}` },
        { status: 500 }
      );
    }

    // Return the public URL path
    const publicUrl = `/images/uploaded/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Upload failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
