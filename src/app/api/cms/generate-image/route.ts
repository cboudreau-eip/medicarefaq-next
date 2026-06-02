import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

/**
 * Use GPT-4o-mini to generate a creative, unique image prompt based on article context.
 * This produces much better and more varied images than a static template.
 * Uses the same OPENAI_API_KEY already configured for image generation.
 */
async function generateSmartPrompt(
  title: string,
  category?: string,
  excerpt?: string,
  keyTakeaways?: string[]
): Promise<string> {
  const contextParts: string[] = [];
  contextParts.push(`Article title: "${title}"`);
  if (category) contextParts.push(`Category: ${category}`);
  if (excerpt) contextParts.push(`Excerpt: ${excerpt}`);
  if (keyTakeaways && keyTakeaways.length > 0) {
    contextParts.push(`Key points: ${keyTakeaways.slice(0, 3).join("; ")}`);
  }

  const systemPrompt = `You are an expert at writing image generation prompts for blog article featured images. Your job is to create a single, detailed image prompt that will produce a unique, contextually relevant photograph for the given article.

Rules:
- Output ONLY the image prompt text, nothing else. No explanation, no quotes, no prefix.
- The image must be photorealistic, editorial-quality photography
- NEVER include text, watermarks, logos, or overlays in the image
- Vary your visual approaches: sometimes close-up details, sometimes environmental scenes, sometimes overhead/flat-lay, sometimes portraits, sometimes abstract conceptual shots
- Make the image specific to THIS article's angle, not generic stock photography
- Include specific details about lighting, composition, color palette, and mood
- Feature diverse subjects when people are included (vary age, ethnicity, gender)
- Keep it appropriate for a professional Medicare/healthcare insurance website
- Aim for images that evoke trust, clarity, and helpfulness
- The prompt should be 2-4 sentences maximum`;

  const userMessage = `Write a unique image generation prompt for this article:\n\n${contextParts.join("\n")}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.9,
      }),
    });

    if (!res.ok) {
      console.error("GPT-4o-mini prompt generation failed:", res.status);
      return buildFallbackPrompt(title, category);
    }

    const data = await res.json();
    const prompt = data.choices?.[0]?.message?.content?.trim();
    if (!prompt) {
      return buildFallbackPrompt(title, category);
    }
    return prompt;
  } catch (err) {
    console.error("Smart prompt generation error:", err);
    return buildFallbackPrompt(title, category);
  }
}

/**
 * Fallback prompt if GPT-4o-mini is unavailable — basic template approach.
 */
function buildFallbackPrompt(title: string, category?: string): string {
  const scenes = [
    "a warm kitchen table with Medicare paperwork and reading glasses",
    "a bright doctor's office with a friendly physician and senior patient",
    "a cozy home office with a laptop showing healthcare information",
    "a pharmacy counter with a pharmacist helping a senior customer",
    "a park bench where two seniors are having a conversation",
    "a community center meeting room with informational materials",
    "an overhead view of a desk with insurance documents and a cup of coffee",
    "a close-up of hands reviewing important medical documents",
  ];
  const scene = scenes[Math.floor(Math.random() * scenes.length)];

  return `Professional editorial photograph for a Medicare article titled "${title}". Scene: ${scene}. Photorealistic, high-quality, soft natural lighting. No text, no watermarks, no logos. Clean composition suitable for a blog hero image. Category context: ${category || "Medicare"}.`;
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
    const { title, category, slug, customPrompt, excerpt, keyTakeaways } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Use custom prompt if provided, otherwise use GPT-4o-mini to generate a smart prompt
    let prompt: string;
    if (customPrompt) {
      prompt = customPrompt;
    } else {
      prompt = await generateSmartPrompt(title, category, excerpt, keyTakeaways);
    }

    // Call OpenAI Image Generation API
    const imageRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "medium",
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

    // Generate the intended filename (used later at publish time)
    const baseName = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50);
    const timestamp = Date.now();
    const fileName = `${baseName}-${timestamp}.png`;

    // Return the base64 image as a data URL for preview — NO GitHub commit.
    // The image will only be committed to GitHub when the article is published/created.
    const dataUrl = `data:image/png;base64,${base64Content}`;

    return NextResponse.json({
      success: true,
      dataUrl,
      base64: base64Content,
      fileName,
      prompt,
    });
  } catch (err) {
    console.error("Generate image error:", err);
    return NextResponse.json(
      { error: `Image generation failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
