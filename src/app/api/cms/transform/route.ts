import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

const TRANSFORM_SYSTEM_PROMPT = `You are a content structuring assistant for MedicareFAQ.com. Your job is to take raw article content (HTML, markdown, or plain text) and convert it into a structured JSON array of BlogSectionContent objects.

RULES FOR SECTION TYPE SELECTION:

1. HEADINGS: Every major topic shift becomes a { type: "heading", level: 2 } section. Sub-topics within a section become level 3. Generate a URL-friendly "id" from the heading text (lowercase, hyphens, no special chars).

2. PARAGRAPHS: Regular explanatory text. Support inline markdown: **bold**, *italic*, [link text](/url). Use for 1-3 sentence explanations between other elements.

3. CALLOUTS - Use these generously to break up walls of text:
   - "warning": Deadlines, penalties, things that cost money if missed, irreversible decisions
   - "info": Key facts, important numbers, definitions, official rules
   - "success": Good news, benefits, positive outcomes, money saved
   - "tip": Practical advice, insider knowledge, recommendations, "pro tips"

4. TABLES: Use for ANY comparison, cost breakdown, timeline, or side-by-side data. Tables should have:
   - A descriptive title (can be empty string if heading precedes it)
   - Clear column headers
   - 3+ rows of data
   - Optional footnote for caveats

5. LISTS:
   - ordered: true for steps, sequences, ranked items, processes
   - ordered: false for features, options, bullet points, non-sequential items
   - Each item can contain **bold** and [links](/url)

6. FAQ: Use for Q&A pairs. Group related questions together. Place at the end of major sections or at the article end. Each FAQ needs a clear question and a 2-4 sentence answer.

7. IMAGES: Only include if the source content has image URLs. Never invent image URLs.

CONTENT GUIDELINES:
- Never use em dashes. Use commas, semicolons, or "to" for ranges.
- Convert date ranges like "Jan 1-Mar 31" to "January 1 to March 31"
- Keep paragraphs to 2-4 sentences max. Break up long paragraphs.
- Add a callout every 2-3 paragraphs to maintain visual variety.
- If content mentions costs or comparisons, ALWAYS use a table.
- If content has a list of 3+ items, use a list section (not inline in a paragraph).
- Convert any "Note:", "Important:", "Warning:", "Tip:" prefixed text into callouts.
- Internal links should use relative paths: /blog/slug/, /faqs/slug/, /medicare-supplements/plan-g/
- External links use full URLs.

OUTPUT FORMAT:
Return ONLY a valid JSON array of BlogSectionContent objects. No markdown code fences, no explanation, just the JSON array.

Example output:
[
  { "type": "heading", "level": 2, "text": "Understanding Medicare Part B Costs", "id": "part-b-costs" },
  { "type": "paragraph", "content": "Medicare Part B covers outpatient services, doctor visits, and preventive care. In 2026, the standard monthly premium is **$202.90** for most beneficiaries." },
  { "type": "callout", "calloutType": "info", "calloutTitle": "2026 Part B Costs", "calloutText": "The standard Part B premium is $202.90 per month with a $283 annual deductible. After meeting your deductible, you pay 20% of Medicare-approved amounts." },
  { "type": "table", "title": "", "headers": ["Cost Type", "2026 Amount"], "rows": [["Monthly Premium", "$202.90"], ["Annual Deductible", "$283"], ["Coinsurance", "20%"]], "footnote": "Higher-income beneficiaries pay more through IRMAA surcharges." },
  { "type": "list", "ordered": false, "items": ["Doctor office visits", "Outpatient surgery", "Durable medical equipment", "Preventive services (many at $0)"] },
  { "type": "faq", "faqs": [{ "question": "What does Medicare Part B cover?", "answer": "Part B covers medically necessary outpatient services including doctor visits, lab tests, preventive screenings, durable medical equipment, and mental health services." }] }
]`;

const META_SYSTEM_PROMPT = `You are a Medicare content strategist. Return only valid JSON, no markdown fences.`;

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { rawContent, title, generateMeta } = body;

    if (!rawContent?.trim()) {
      return NextResponse.json({ error: "rawContent is required" }, { status: 400 });
    }

    if (!FORGE_API_URL || !FORGE_API_KEY) {
      return NextResponse.json({ error: "LLM service not configured" }, { status: 503 });
    }

    // Step 1: Transform content to sections
    const userPrompt = `Transform the following article content into structured BlogSectionContent JSON.

Article title: ${title || "Untitled"}

Raw content:
${rawContent}`;

    const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FORGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 8192,
        messages: [
          { role: "system", content: TRANSFORM_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`LLM API error (${response.status}): ${err}`);
    }

    const data = await response.json();
    const rawOutput = data?.choices?.[0]?.message?.content ?? "";

    // Parse the JSON output
    let sections;
    try {
      // Handle potential markdown code fences
      const cleaned = rawOutput.replace(/^```json?\n?/m, "").replace(/\n?```$/m, "").trim();
      sections = JSON.parse(cleaned);
    } catch (parseErr) {
      return NextResponse.json({
        error: "Failed to parse LLM output as JSON",
        rawOutput,
      }, { status: 422 });
    }

    // Validate sections array
    if (!Array.isArray(sections)) {
      return NextResponse.json({
        error: "LLM output is not an array",
        rawOutput,
      }, { status: 422 });
    }

    // Generate table of contents from h2 headings
    const tableOfContents = sections
      .filter((s: any) => s.type === "heading" && s.level === 2)
      .map((s: any) => ({ id: s.id, title: s.text }));

    // Optionally generate metadata (title, excerpt, keyTakeaways)
    let meta = null;
    if (generateMeta) {
      meta = await generateArticleMeta(rawContent, title || "Untitled", FORGE_API_URL, FORGE_API_KEY);
    }

    return NextResponse.json({
      sections,
      tableOfContents,
      meta,
    });
  } catch (err) {
    console.error("[CMS transform]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Helper: Generate article metadata
async function generateArticleMeta(
  rawContent: string,
  title: string,
  apiUrl: string,
  apiKey: string
) {
  const metaPrompt = `Given this article titled "${title}", generate:
1. excerpt: A 1-2 sentence summary (max 200 chars)
2. keyTakeaways: 3-5 bullet points of the most important facts
3. seoTitle: SEO-optimized title (max 60 chars, include "MedicareFAQ" if space allows)
4. seoDescription: Meta description (max 160 chars)
5. suggestedCategory: One of: Medicare News, Medicare Supplement, Medicare Plans, Getting Started, Enrollment, Senior Living, Medicare Coverage, Healthcare, Medicare Costs, Medicare Basics, Medicare Advantage, General, Eligibility, Benefits

Return as JSON object with these exact keys. Do not use em dashes anywhere.

Article content:
${rawContent.slice(0, 3000)}`;

  try {
    const response = await fetch(`${apiUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        messages: [
          { role: "system", content: META_SYSTEM_PROMPT },
          { role: "user", content: metaPrompt },
        ],
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";
    try {
      const cleaned = raw.replace(/^```json?\n?/m, "").replace(/\n?```$/m, "").trim();
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
