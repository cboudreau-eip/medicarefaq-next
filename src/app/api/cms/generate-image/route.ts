import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";
const UPLOAD_PATH = "public/images/generated";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

/**
 * Category-specific image style hints for better prompt generation.
 */
const CATEGORY_STYLE_HINTS: Record<string, string> = {
  "Costs & Premiums": "financial planning, calculator, budget documents, or a senior reviewing bills at a desk",
  "Eligibility": "a welcoming doctor's office, enrollment forms, or a senior meeting with a healthcare advisor",
  "Plan Comparisons": "side-by-side comparison, decision-making, or a senior weighing options at a table",
  "Coverage & Benefits": "medical care, hospital setting, prescription medications, or a doctor with a patient",
  "Enrollment": "paperwork, calendar, deadlines, or a senior at a computer signing up",
  "Supplemental Coverage": "insurance documents, protection concept, or a senior with a safety net metaphor",
  "Medicare News": "newspaper, healthcare news, or a senior reading about Medicare updates",
  "Medicare Supplement": "supplemental insurance documents, Medigap policy, or a senior with additional coverage",
  "Medicare Plans": "plan comparison charts, Medicare cards, or a senior choosing between options",
  "Getting Started": "a friendly introduction, welcome setting, or a new Medicare beneficiary learning",
  "Senior Living": "comfortable home, active seniors, community living, or retirement lifestyle",
  "Medicare Coverage": "medical services, hospital visit, covered procedures, or healthcare access",
  "Healthcare": "doctor consultation, medical office, stethoscope, or healthcare professionals",
  "Medicare Costs": "bills, premiums, out-of-pocket costs, or a senior budgeting for healthcare",
  "Medicare Basics": "Medicare card, introductory materials, or a simple educational setting",
  "Medicare Advantage": "Medicare Advantage plan documents, HMO/PPO, or additional benefits like dental and vision",
};

/**
 * Build an image generation prompt from article metadata.
 */
function buildImagePrompt(title: string, category?: string, customPrompt?: string): string {
  if (customPrompt) {
    return customPrompt;
  }

  const styleHint = category ? CATEGORY_STYLE_HINTS[category] || "" : "";
  const sceneContext = styleHint
    ? `Scene suggestion: ${styleHint}.`
    : "Scene: a professional healthcare or insurance setting.";

  return `Professional editorial photograph for a Medicare insurance article titled "${title}". ${sceneContext} The image should be photorealistic, high-quality, with soft natural lighting. Feature diverse seniors (65+) in a warm, trustworthy setting. No text, no watermarks, no logos, no overlays. Clean composition suitable for a blog hero image.`;
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured. Add OPENAI_API_KEY to environment variables." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { title, category, slug, customPrompt } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const prompt = buildImagePrompt(title, category, customPrompt);

    // Call OpenAI Image Generation API directly
    const imageRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json",
      }),
    });

    if (!imageRes.ok) {
      const errText = await imageRes.text().catch(() => "");
      console.error("OpenAI Image API error:", imageRes.status, errText);
      return NextResponse.json(
        { error: `Image generation failed: ${imageRes.status}`, details: errText },
        { status: 500 }
      );
    }

    const imageData = await imageRes.json();

    // Extract base64 image data
    let base64Content: string;

    if (imageData.data?.[0]?.b64_json) {
      base64Content = imageData.data[0].b64_json;
    } else if (imageData.data?.[0]?.url) {
      // Fallback: fetch from URL if returned instead of base64
      const imgUrl = imageData.data[0].url as string;
      const imgFetch = await fetch(imgUrl);
      const imgBuffer = await imgFetch.arrayBuffer();
      base64Content = Buffer.from(imgBuffer).toString("base64");
    } else {
      return NextResponse.json(
        { error: "Unexpected response format from OpenAI", data: imageData },
        { status: 500 }
      );
    }

    // Generate filename from slug or title
    const baseName = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50);
    const timestamp = Date.now();
    const fileName = `${baseName}-${timestamp}.png`;
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
          message: `cms: AI-generated featured image for ${baseName}`,
          content: base64Content,
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

    // Return the public URL path
    const publicUrl = `/images/generated/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      prompt,
      fileName,
    });
  } catch (err) {
    console.error("Generate image error:", err);
    return NextResponse.json(
      { error: `Image generation failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
