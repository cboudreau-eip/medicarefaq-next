import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

/**
 * Convert structured article sections into readable plain text for the image prompt.
 */
function sectionsToText(sections: Array<Record<string, unknown>>): string {
  const parts: string[] = [];
  for (const section of sections) {
    switch (section.type) {
      case "heading":
        parts.push(`\n## ${section.text || ""}\n`);
        break;
      case "paragraph":
        parts.push(String(section.content || ""));
        break;
      case "list":
        if (Array.isArray(section.items)) {
          parts.push(section.items.map((item: string) => `- ${item}`).join("\n"));
        }
        break;
      case "callout":
      case "warning":
      case "info":
      case "tip":
      case "success":
      case "note":
      case "error":
        if (section.calloutTitle) parts.push(`**${section.calloutTitle}**`);
        if (section.calloutText) parts.push(String(section.calloutText));
        break;
      case "table":
        if (section.title) parts.push(`Table: ${section.title}`);
        break;
      case "faq":
        if (Array.isArray(section.faqs)) {
          for (const faq of section.faqs as Array<{ question?: string; answer?: string }>) {
            parts.push(`Q: ${faq.question || ""}\nA: ${faq.answer || ""}`);
          }
        }
        break;
      default:
        break;
    }
  }
  return parts.join("\n\n");
}

/**
 * Generate an image prompt by giving GPT-4o the full article context.
 * Mimics the approach of pasting the full article into ChatGPT and asking for a hero image.
 */
async function generatePromptFromFullArticle(
  title: string,
  fullArticleText: string,
  category?: string,
): Promise<string> {
  const systemPrompt = `You are an expert at creating image generation prompts for blog hero images. The user will give you a full article. Your job is to write a single image generation prompt that produces a beautiful, photorealistic hero image to complement the article.

Rules:
- Output ONLY the image prompt, nothing else. No explanation, no quotes, no prefix.
- The image must be photorealistic, editorial-quality photography
- The image MUST NOT contain any text, words, letters, numbers, watermarks, logos, or overlays of any kind
- Read the full article and understand its core topic, then envision a natural, realistic scene that a viewer would associate with the subject matter
- Think about what a professional stock photographer would shoot to illustrate this topic
- Be specific about lighting, composition, setting, and any people or objects in the scene
- The prompt should be 2-4 sentences`;

  const userMessage = `Give me a hero image to complement this article. Image should not contain any text of any kind.\n\nTitle: ${title}\nCategory: ${category || "Medicare"}\n\n---\n\n${fullArticleText}`;

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
        temperature: 0.8,
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
 * Fallback prompt if GPT-4o-mini is unavailable.
 */
function buildFallbackPrompt(title: string, category?: string): string {
  return `Professional editorial photograph for a Medicare article titled "${title}". Photorealistic, high-quality, soft natural lighting. No text, no watermarks, no logos. Clean composition suitable for a blog hero image. Category: ${category || "Medicare"}.`;
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
    const { title, category, slug, customPrompt, fullArticle } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Determine the prompt to use
    let prompt: string;
    if (customPrompt) {
      // User provided a custom prompt — use it directly
      prompt = customPrompt;
    } else if (fullArticle && Array.isArray(fullArticle) && fullArticle.length > 0) {
      // Full article available — build context and use fixed prompt
      const articleText = sectionsToText(fullArticle);
      const truncated = articleText.slice(0, 8000);
      prompt = `Create an appropriate hero image to go with this blog article. No text should be present in the image.\n\nTitle: ${title}\n\n${truncated}`;
    } else {
      // No full article — use title only
      prompt = `Create an appropriate hero image to go with this blog article titled "${title}". No text should be present in the image.`;
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
        quality: "high",
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

    // Generate a short, clean filename (no timestamps, max ~30 chars)
    const baseName = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .split("-")
      .slice(0, 4)
      .join("-");
    const fileName = `${baseName}.png`;

    // Return the base64 image as a data URL for preview — NO GitHub commit.
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
