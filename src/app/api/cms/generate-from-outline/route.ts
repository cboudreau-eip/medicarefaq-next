import { NextRequest, NextResponse } from "next/server";
import { buildWritingPrompt } from "@/lib/writing-config";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

interface OutlineSection {
  id: string;
  heading: string;
  type: "h2" | "h3";
  points: string[];
  targetWordCount: number;
  subSections: {
    id: string;
    heading: string;
    type: "h3";
    points: string[];
  }[];
}

interface ApprovedOutline {
  title: string;
  sections: OutlineSection[];
}

const ARTICLE_SYSTEM_PROMPT = `You are a content writer for MedicareFAQ.com. Your job is to take an approved article outline and write the full article as a structured JSON array of BlogSectionContent objects.

You will receive an outline with section headings, key points to cover, and per-section word count targets. Write the full article following the outline EXACTLY — do not skip sections, do not add sections not in the outline, and hit the word count targets as closely as possible.

EXACT JSON FORMATS FOR EACH SECTION TYPE (use these EXACTLY — do not invent field names):

1. HEADING:
{ "type": "heading", "level": 2, "id": "url-friendly-id", "text": "Section Title" }
{ "type": "heading", "level": 3, "id": "url-friendly-id", "text": "Sub-section Title" }

2. PARAGRAPH:
{ "type": "paragraph", "content": "Text here. Supports **bold**, *italic*, and [link text](/url)." }

3. CALLOUT (use generously — every 2-3 paragraphs):
{ "type": "warning", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "info", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "success", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "tip", "calloutText": "Text here.", "calloutTitle": "Optional title" }
Use "warning" for deadlines/penalties, "info" for key facts/numbers, "success" for good news/benefits, "tip" for practical advice.

4. TABLE:
{ "type": "table", "title": "Table Title", "headers": ["Col1", "Col2", "Col3"], "rows": [["val", "val", "val"]], "footnote": "Optional note" }
Use for ANY comparison, cost breakdown, timeline, or side-by-side data.

5. LIST:
{ "type": "list", "ordered": false, "items": ["Item 1", "Item 2", "Item 3"] }
Use ordered: true for steps/sequences, ordered: false for features/options.

6. FAQ:
{ "type": "faq", "faqs": [ { "question": "Question text?", "answer": "Answer text. Keep to 40-80 words max." } ] }
Group ALL FAQ questions into a single faq section with multiple faqs in the array.

7. EDDIE'S PRO TIP (REQUIRED — exactly one per article):
{ "type": "eddie-pro-tip", "content": "Tip text here. Written in first person. 2-4 sentences." }
Place after the most impactful decision point in the article.

8. IMAGES: Only include if explicitly referenced. Never invent image URLs.
{ "type": "image", "src": "/path/to/image.jpg", "alt": "Description" }

CONTENT GUIDELINES:
- Never use em dashes. Use commas, semicolons, or "to" for ranges.
- Convert date ranges like "Jan 1-Mar 31" to "January 1 to March 31"
- Keep paragraphs to 2-4 sentences max. Break up long paragraphs.
- Add a callout every 2-3 paragraphs to maintain visual variety.
- If content mentions costs or comparisons, ALWAYS use a table.
- If content has a list of 3+ items, use a list section (not inline in a paragraph).
- Internal links should use relative paths: /blog/slug/, /faqs/slug/, /medicare-supplements/plan-g/
- External links use full URLs.

OUTPUT FORMAT:
Return ONLY a valid JSON array of BlogSectionContent objects. No markdown code fences, no explanation, just the JSON array.`;

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!FORGE_API_URL || !FORGE_API_KEY) {
    return NextResponse.json(
      { error: "LLM API not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { outline, settings } = body as {
      outline: ApprovedOutline;
      settings?: {
        targetKeyword?: string;
        contentType?: string;
        tone?: string;
        targetWordCount?: number;
      };
    };

    if (!outline || !outline.title || !Array.isArray(outline.sections)) {
      return NextResponse.json(
        { error: "Valid outline with title and sections is required" },
        { status: 400 }
      );
    }

    const writingRules = buildWritingPrompt();

    // Build the outline description for the writer
    const outlineDescription = outline.sections
      .map((section) => {
        let desc = `## ${section.heading} (~${section.targetWordCount} words)\n`;
        desc += `Key points:\n${section.points.map((p) => `  - ${p}`).join("\n")}`;
        if (section.subSections && section.subSections.length > 0) {
          desc += `\nSub-sections:\n`;
          desc += section.subSections
            .map((sub) => `  ### ${sub.heading}\n    Points: ${sub.points.join("; ")}`)
            .join("\n");
        }
        return desc;
      })
      .join("\n\n");

    const totalWordCount =
      settings?.targetWordCount ||
      outline.sections.reduce((sum, s) => sum + (s.targetWordCount || 0), 0);

    const userPrompt = `Write the full article based on this approved outline.

=== WRITING QUALITY RULES (APPLY TO ALL CONTENT) ===
${writingRules}
=== END WRITING QUALITY RULES ===

Article title: ${outline.title}
${settings?.targetKeyword ? `Target keyword: ${settings.targetKeyword}` : ""}
${settings?.contentType ? `Content type: ${settings.contentType}` : ""}
${settings?.tone ? `Tone: ${settings.tone}` : ""}
Total target word count: ~${totalWordCount} words

=== APPROVED OUTLINE ===
${outlineDescription}
=== END OUTLINE ===

IMPORTANT:
- Follow the outline section by section. Do NOT skip any section.
- Hit the per-section word count targets as closely as possible.
- Include all key points listed for each section.
- Place the Eddie's Pro Tip after the most impactful decision point in the article.
- The FAQ section should use the sub-section headings as the questions.
- Write the full article now as a JSON array of BlogSectionContent objects.`;

    const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FORGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 12000,
        messages: [
          { role: "system", content: ARTICLE_SYSTEM_PROMPT },
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

    // Parse JSON output
    let sections;
    try {
      const cleaned = rawOutput
        .replace(/^```json?\n?/m, "")
        .replace(/\n?```$/m, "")
        .trim();
      sections = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse article JSON", rawOutput },
        { status: 422 }
      );
    }

    if (!Array.isArray(sections)) {
      return NextResponse.json(
        { error: "LLM output is not an array", rawOutput },
        { status: 422 }
      );
    }

    // Generate table of contents from h2 headings
    const tableOfContents = sections
      .filter((s: any) => s.type === "heading" && s.level === 2)
      .map((s: any) => ({ id: s.id, title: s.text }));

    return NextResponse.json({
      success: true,
      sections,
      tableOfContents,
      title: outline.title,
    });
  } catch (err) {
    console.error("[CMS generate-from-outline]", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
