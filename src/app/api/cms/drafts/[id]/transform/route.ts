import { NextRequest, NextResponse } from "next/server";
import { buildWritingPrompt } from "@/lib/writing-config";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;
const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";
const DRAFTS_DIR = "drafts";

// --- Auth ---

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  // Support both x-cms-password header and Bearer token
  const headerPw = request.headers.get("x-cms-password") ?? "";
  if (headerPw === CMS_PASSWORD) return true;
  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token === CMS_PASSWORD) return true;
  }
  return false;
}

// --- GitHub helpers ---

async function githubGetFile(path: string): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET error: ${res.status} for ${path}`);
  const meta = await res.json();
  const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
  return { content, sha: meta.sha };
}

async function githubPutFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT error ${res.status}: ${err}`);
  }
}

// --- Transform prompts (same as /api/cms/transform) ---

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

8. EDDIE'S PRO TIP: REQUIRED in every article. Include exactly ONE section with type "eddie-pro-tip". This is a personal expert tip from Eddie (a Medicare insurance specialist) written in first person. It should:
   - Be placed after a key decision point, common mistake, or important concept in the article
   - Offer practical insider advice that goes beyond the obvious
   - Be written conversationally in first person ("I always tell people...", "Here is what most people get wrong...", "In my experience...")
   - Be 2-4 sentences long
   - Format: { "type": "eddie-pro-tip", "content": "Your tip text here." }

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
  { "type": "eddie-pro-tip", "content": "I always tell people to check their Part B premium notice carefully each November. If your income dropped due to retirement or a life event, you can appeal the IRMAA surcharge with Form SSA-44 and potentially save hundreds per month." },
  { "type": "faq", "faqs": [{ "question": "What does Medicare Part B cover?", "answer": "Part B covers medically necessary outpatient services including doctor visits, lab tests, preventive screenings, durable medical equipment, and mental health services." }] }
]`;

const META_SYSTEM_PROMPT = `You are a Medicare content strategist. Return only valid JSON, no markdown fences.`;

// --- Helper: Generate article metadata ---

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
4. seoDescription: Meta description (MUST be 150 characters or fewer, aim for 120-145 characters)
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

// --- Main endpoint ---

/**
 * POST /api/cms/drafts/[id]/transform
 *
 * Reads the draft by ID, runs the AI transformation on its rawContent,
 * saves the resulting sections/metadata back to the draft, and returns the updated draft.
 *
 * Auth: x-cms-password header OR Authorization: Bearer <CMS_PASSWORD>
 *
 * Response: { success: true, draft: { ...updatedDraft } }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Draft ID is required" }, { status: 400 });
  }

  if (!FORGE_API_URL || !FORGE_API_KEY) {
    return NextResponse.json({ error: "LLM service not configured" }, { status: 503 });
  }

  try {
    // 1. Fetch the draft from GitHub
    const filePath = `${DRAFTS_DIR}/${id}.json`;
    const file = await githubGetFile(filePath);
    if (!file) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 });
    }

    const draft = JSON.parse(file.content);
    const rawContent = draft.rawContent;
    const title = draft.title || "Untitled";

    if (!rawContent?.trim()) {
      return NextResponse.json(
        { error: "Draft has no rawContent to transform" },
        { status: 400 }
      );
    }

    // 2. Run AI transformation (same logic as /api/cms/transform)
    const writingRules = buildWritingPrompt();

    const userPrompt = `Transform the following article content into structured BlogSectionContent JSON.

=== WRITING QUALITY RULES (APPLY TO ALL CONTENT) ===
${writingRules}
=== END WRITING QUALITY RULES ===

Article title: ${title}

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
      const cleaned = rawOutput.replace(/^```json?\n?/m, "").replace(/\n?```$/m, "").trim();
      sections = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse LLM output as JSON", rawOutput },
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
      .filter((s: Record<string, unknown>) => s.type === "heading" && s.level === 2)
      .map((s: Record<string, unknown>) => ({ id: s.id, title: s.text }));

    // 3. Generate metadata
    const meta = await generateArticleMeta(rawContent, title, FORGE_API_URL, FORGE_API_KEY);

    // 4. Update the draft with transformed data
    const now = new Date().toISOString();
    const updatedDraft = {
      ...draft,
      sections,
      tableOfContents,
      updatedAt: now,
      ...(meta?.excerpt && !draft.excerpt ? { excerpt: meta.excerpt } : {}),
      ...(meta?.keyTakeaways ? { keyTakeaways: meta.keyTakeaways } : {}),
      ...(meta?.seoTitle ? { seoTitle: meta.seoTitle } : {}),
      ...(meta?.seoDescription ? { seoDescription: meta.seoDescription } : {}),
      ...(meta?.suggestedCategory && !draft.category ? { category: meta.suggestedCategory } : {}),
    };

    // 5. Save back to GitHub
    const updatedContent = JSON.stringify(updatedDraft, null, 2);
    await githubPutFile(
      filePath,
      updatedContent,
      `Transform draft: ${title}`,
      file.sha
    );

    return NextResponse.json({
      success: true,
      draft: updatedDraft,
    });
  } catch (err) {
    console.error("[CMS drafts/[id]/transform]", err);
    return NextResponse.json(
      { error: `Transform failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
