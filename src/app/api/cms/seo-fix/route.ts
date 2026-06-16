import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

async function callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!FORGE_API_URL || !FORGE_API_KEY) {
    throw new Error("LLM API not configured");
  }
  const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FORGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 600,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`LLM API error (${response.status}): ${err}`);
  }
  const data = await response.json();
  return (data?.choices?.[0]?.message?.content ?? "").trim();
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, keyword, description, introHtml, articleTitle } = body as {
      action: "rewrite-intro" | "expand-description";
      keyword?: string;
      description?: string;
      introHtml?: string;
      articleTitle?: string;
    };

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
      // Ensure it's wrapped in a <p> tag
      const cleaned = result.startsWith("<p") ? result : `<p>${result}</p>`;
      return NextResponse.json({ success: true, result: cleaned });
    }

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
      // Strip any surrounding quotes the model might add
      const cleaned = result.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ success: true, result: cleaned });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("seo-fix error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
