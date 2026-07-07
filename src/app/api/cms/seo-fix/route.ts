import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { verifySessionToken } from "@/lib/cms-auth";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

async function callLLM(systemPrompt: string, userPrompt: string, maxTokens = 600): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("LLM API not configured");
  }
  const anthropic = new Anthropic({ apiKey });
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });
  const text = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
  return text.trim();
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      action,
      keyword,
      description,
      introHtml,
      articleTitle,
      metaTitle,
      bodyHtml,
      h1Title,
    } = body as {
      action: string;
      keyword?: string;
      description?: string;
      introHtml?: string;
      articleTitle?: string;
      metaTitle?: string;
      bodyHtml?: string;
      h1Title?: string;
    };

    // ── 1. Rewrite intro to include keyword ──────────────────────────────────
    if (action === "rewrite-intro") {
      if (!introHtml || !keyword) {
        return NextResponse.json({ error: "introHtml and keyword are required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO content editor for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to rewrite ONLY the opening paragraph of an article so that the target keyword appears naturally within the first 100 words.
Rules:
- Keep the same meaning and tone as the original
- Do NOT use em dashes
- Do NOT add new sections or headings
- Return ONLY the rewritten paragraph as plain HTML (a single <p> tag)
- The keyword must appear naturally — do not keyword-stuff`;

      const userPrompt = `Article title: ${articleTitle || ""}
Target keyword: ${keyword}

Current opening paragraph (HTML):
${introHtml}

Rewrite this paragraph so the keyword "${keyword}" appears naturally within the first 100 words. Return only the rewritten <p> tag.`;

      const result = await callLLM(systemPrompt, userPrompt);
      const cleaned = result.startsWith("<p") ? result : `<p>${result}</p>`;
      return NextResponse.json({ success: true, result: cleaned });
    }

    // ── 2. Expand meta description to 150-160 chars ──────────────────────────
    if (action === "expand-description") {
      if (!description) {
        return NextResponse.json({ error: "description is required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO meta description writer for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to expand a meta description to be between 150 and 160 characters.
Rules:
- Keep the same core message and tone
- Include the keyword naturally if provided
- Do NOT use em dashes
- Return ONLY the expanded description as plain text — no quotes, no HTML, no explanation
- Must be between 150 and 160 characters`;

      const kw = keyword ? `\nTarget keyword: ${keyword}` : "";
      const userPrompt = `Current meta description (${description.length} chars):
${description}${kw}

Expand this to 150-160 characters. Return only the new description text.`;

      const result = await callLLM(systemPrompt, userPrompt);
      const cleaned = result.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ success: true, result: cleaned });
    }

    // ── 3. Fix meta title length (trim or expand to 50-60 chars) ─────────────
    if (action === "fix-title-length") {
      if (!metaTitle) {
        return NextResponse.json({ error: "metaTitle is required" }, { status: 400 });
      }
      const currentLen = metaTitle.length;
      const direction = currentLen > 60 ? "shorten" : "expand";
      const systemPrompt = `You are an SEO title writer for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to ${direction} a meta title to be between 50 and 60 characters.
Rules:
- Keep the same core meaning and include the primary keyword if provided
- Do NOT use em dashes
- Do NOT add pipe characters or site name suffixes
- Return ONLY the new title as plain text — no quotes, no explanation
- Must be between 50 and 60 characters`;

      const kw = keyword ? `\nPrimary keyword: ${keyword}` : "";
      const userPrompt = `Current meta title (${currentLen} chars): ${metaTitle}${kw}

${direction === "shorten" ? "Shorten" : "Expand"} this to 50-60 characters. Return only the new title.`;

      const result = await callLLM(systemPrompt, userPrompt);
      const cleaned = result.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ success: true, result: cleaned });
    }

    // ── 4. Add keyword to meta title ─────────────────────────────────────────
    if (action === "add-keyword-to-title") {
      if (!metaTitle || !keyword) {
        return NextResponse.json({ error: "metaTitle and keyword are required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO title writer for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to rewrite a meta title so it naturally includes the target keyword while staying between 50 and 60 characters.
Rules:
- The keyword must appear in the title
- Keep the same topic and intent
- Do NOT use em dashes
- Do NOT add pipe characters or site name suffixes
- Return ONLY the new title as plain text — no quotes, no explanation
- Must be between 50 and 60 characters`;

      const userPrompt = `Current meta title: ${metaTitle}
Target keyword: ${keyword}

Rewrite the title to include "${keyword}" and stay between 50-60 characters. Return only the new title.`;

      const result = await callLLM(systemPrompt, userPrompt);
      const cleaned = result.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ success: true, result: cleaned });
    }

    // ── 5. Add keyword to H1 / article title ─────────────────────────────────
    if (action === "add-keyword-to-h1") {
      if (!h1Title || !keyword) {
        return NextResponse.json({ error: "h1Title and keyword are required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO content editor for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to rewrite an article's H1 title so it naturally includes the target keyword.
Rules:
- The keyword must appear in the title
- Keep the same topic and intent
- Do NOT use em dashes
- Keep it concise (under 70 characters ideally)
- Return ONLY the new title as plain text — no quotes, no HTML, no explanation`;

      const userPrompt = `Current article title (H1): ${h1Title}
Target keyword: ${keyword}

Rewrite the title to include "${keyword}" naturally. Return only the new title.`;

      const result = await callLLM(systemPrompt, userPrompt);
      const cleaned = result.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ success: true, result: cleaned });
    }

    // ── 6. Add keyword to meta description ───────────────────────────────────
    if (action === "add-keyword-to-desc") {
      if (!description || !keyword) {
        return NextResponse.json({ error: "description and keyword are required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO meta description writer for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to rewrite a meta description so it naturally includes the target keyword while staying between 150 and 160 characters.
Rules:
- The keyword must appear in the description
- Keep the same core message and tone
- Do NOT use em dashes
- Return ONLY the new description as plain text — no quotes, no HTML, no explanation
- Must be between 150 and 160 characters`;

      const userPrompt = `Current meta description (${description.length} chars): ${description}
Target keyword: ${keyword}

Rewrite to include "${keyword}" and stay between 150-160 characters. Return only the new description.`;

      const result = await callLLM(systemPrompt, userPrompt);
      const cleaned = result.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ success: true, result: cleaned });
    }

    // ── 7. Boost keyword density in body ─────────────────────────────────────
    if (action === "boost-keyword-density") {
      if (!bodyHtml || !keyword) {
        return NextResponse.json({ error: "bodyHtml and keyword are required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO content editor for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to add 2-3 natural uses of a target keyword into existing article body HTML.
Rules:
- Add the keyword naturally into existing sentences — do NOT add new paragraphs or sections
- Do NOT change the meaning, structure, or headings of the content
- Do NOT keyword-stuff — additions must read naturally
- Do NOT use em dashes
- Return ONLY the updated full HTML — no explanation, no markdown fences`;

      const userPrompt = `Target keyword: ${keyword}
Article title: ${articleTitle || ""}

Current article body HTML:
${bodyHtml}

Add 2-3 natural uses of "${keyword}" into the existing content. Return only the updated HTML.`;

      const result = await callLLM(systemPrompt, userPrompt, 4000);
      return NextResponse.json({ success: true, result: result });
    }

    // ── 8. Fix image alt text ─────────────────────────────────────────────────
    if (action === "fix-image-alt-text") {
      if (!bodyHtml) {
        return NextResponse.json({ error: "bodyHtml is required" }, { status: 400 });
      }
      const systemPrompt = `You are an SEO content editor for MedicareFAQ.com, a Medicare information site for US seniors.
Your task is to add descriptive alt text to any <img> tags that are missing it or have empty alt attributes.
Rules:
- Only modify <img> tags that have no alt attribute or alt=""
- Write descriptive alt text based on the src filename and surrounding context
- Keep alt text concise (under 125 characters)
- Do NOT change anything else in the HTML
- Return ONLY the updated full HTML — no explanation, no markdown fences`;

      const userPrompt = `Article title: ${articleTitle || ""}
${keyword ? `Primary keyword: ${keyword}` : ""}

Article body HTML:
${bodyHtml}

Add descriptive alt text to any images missing it. Return only the updated HTML.`;

      const result = await callLLM(systemPrompt, userPrompt, 4000);
      return NextResponse.json({ success: true, result: result });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("seo-fix error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
