import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";
import { buildWritingPrompt } from "@/lib/writing-config";
import type { ValidationIssue } from "@/lib/content-validator";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

const FIX_SYSTEM_PROMPT = `You are a content quality editor for MedicareFAQ.com. You will receive a structured article (as a JSON array of BlogSectionContent objects) along with a list of specific quality issues that need to be fixed.

Your job is to return the SAME article with ONLY the identified issues corrected. Do not rewrite sections that have no issues. Preserve all content, structure, and meaning — only fix what is flagged.

EXACT JSON FORMATS FOR EACH SECTION TYPE (use these EXACTLY):

1. HEADING:
{ "type": "heading", "level": 2, "id": "url-friendly-id", "text": "Section Title" }

2. PARAGRAPH:
{ "type": "paragraph", "content": "Text here. Supports **bold**, *italic*, and [link text](/url)." }

3. CALLOUT:
{ "type": "callout", "calloutType": "warning", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "callout", "calloutType": "info", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "callout", "calloutType": "success", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "callout", "calloutType": "tip", "calloutText": "Text here.", "calloutTitle": "Optional title" }

4. TABLE:
{ "type": "table", "title": "Table Title", "headers": ["Col1", "Col2"], "rows": [["val", "val"]], "footnote": "Optional note" }

5. LIST:
{ "type": "list", "ordered": false, "items": ["Item 1", "Item 2"] }

6. FAQ:
{ "type": "faq", "faqs": [ { "question": "Question?", "answer": "Answer. Keep to 40-80 words max." } ] }

7. EDDIE'S PRO TIP (required — exactly one per article):
{ "type": "eddie-pro-tip", "content": "Tip text here. Written in first person. 2-4 sentences." }

OUTPUT FORMAT:
Return ONLY a valid JSON array of BlogSectionContent objects. No markdown code fences, no explanation, just the JSON array.`;

/**
 * Builds a targeted fix prompt from the list of validation issues.
 * Groups issues by category and provides specific, actionable instructions.
 */
function buildFixPrompt(
  sections: any[],
  issues: ValidationIssue[],
  title: string,
  targetKeyword?: string
): string {
  const writingRules = buildWritingPrompt();

  // Group issues by category
  const byCategory: Record<string, ValidationIssue[]> = {};
  for (const issue of issues) {
    if (!byCategory[issue.category]) byCategory[issue.category] = [];
    byCategory[issue.category].push(issue);
  }

  // Build specific fix instructions per category
  const fixInstructions: string[] = [];

  if (byCategory["Banned Phrase"]) {
    const phrases = byCategory["Banned Phrase"]
      .map((i) => {
        const match = i.message.match(/"([^"]+)"/);
        return match ? match[1] : i.message;
      })
      .filter(Boolean);
    const uniquePhrases = [...new Set(phrases)];
    fixInstructions.push(
      `BANNED PHRASES — Remove or replace these phrases throughout the article:\n` +
        uniquePhrases.map((p) => `  - "${p}" → use plain, direct language instead`).join("\n") +
        `\n  Common replacements: "navigate" → "use" or "find"; "leverage" → "use"; "comprehensive" → remove or be specific; "seamless" → remove; "ensure" → "make sure"; "utilize" → "use"; "in today's world" → remove; "it's important to note" → remove; "game-changer" → be specific about the benefit.`
    );
  }

  if (byCategory["FAQ Length"]) {
    const errors = byCategory["FAQ Length"].filter((i) => i.severity === "error");
    if (errors.length > 0) {
      fixInstructions.push(
        `FAQ ANSWERS TOO LONG — Trim these FAQ answers to 40-80 words (hard max: 80 words):\n` +
          errors
            .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.detail || i.message}`)
            .join("\n") +
          `\n  Keep the core answer. Remove examples or elaboration that can go in the main article body.`
      );
    }
  }

  if (byCategory["Paragraph Length"]) {
    fixInstructions.push(
      `PARAGRAPHS TOO LONG — Split these paragraphs (max 5 sentences each, target 2-4):\n` +
        byCategory["Paragraph Length"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.message}`)
          .join("\n") +
        `\n  Split at natural topic breaks. Each paragraph should cover one idea.`
    );
  }

  if (byCategory["Anchor Text"]) {
    fixInstructions.push(
      `ANCHOR TEXT TOO LONG — Shorten these link texts to 7 words or fewer:\n` +
        byCategory["Anchor Text"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.detail || i.message}`)
          .join("\n") +
        `\n  Use the most descriptive 3-6 words as the anchor. Example: "learn how to compare Medicare Supplement plans" → "compare Medicare Supplement plans".`
    );
  }

  if (byCategory["Generic Link"]) {
    fixInstructions.push(
      `GENERIC ANCHOR TEXT — Replace these generic link texts with descriptive keywords:\n` +
        byCategory["Generic Link"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.message}`)
          .join("\n") +
        `\n  Replace "click here", "learn more", "read more", "find out more" with the topic being linked to.`
    );
  }

  if (byCategory["Missing Section"]) {
    const missingEddie = byCategory["Missing Section"].find((i) =>
      i.message.includes("Eddie")
    );
    const missingFaq = byCategory["Missing Section"].find((i) =>
      i.message.includes("FAQ")
    );

    if (missingEddie) {
      fixInstructions.push(
        `MISSING EDDIE'S PRO TIP — Add exactly one Eddie's Pro Tip section:\n` +
          `  - Insert after the most impactful decision point in the article\n` +
          `  - Written in first person ("I always tell people...", "Here's what most people miss...")\n` +
          `  - 2-4 sentences of practical insider advice\n` +
          `  - Format: { "type": "eddie-pro-tip", "content": "..." }`
      );
    }

    if (missingFaq) {
      fixInstructions.push(
        `MISSING FAQ SECTION — Add a FAQ section near the end of the article:\n` +
          `  - Include 3-5 questions that readers commonly ask about ${targetKeyword || title}\n` +
          `  - Each answer: 40-80 words\n` +
          `  - Format: { "type": "faq", "faqs": [{ "question": "...", "answer": "..." }] }`
      );
    }
  }

  if (byCategory["Visual Variety"]) {
    const needsCallouts = byCategory["Visual Variety"].find((i) =>
      i.message.includes("callout")
    );
    if (needsCallouts) {
      fixInstructions.push(
        `NEEDS MORE CALLOUTS — Add callout sections to break up the text:\n` +
          `  - Add at least 2 callouts distributed throughout the article\n` +
          `  - Use "warning" for deadlines/penalties, "info" for key facts/numbers, "success" for benefits, "tip" for advice\n` +
          `  - Insert after paragraphs that contain important facts or actionable advice`
      );
    }
  }

  if (byCategory["Outdated Data"]) {
    fixInstructions.push(
      `OUTDATED DATA REFERENCES — Update or clarify these year references:\n` +
        byCategory["Outdated Data"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.message}`)
          .join("\n") +
        `\n  Use 2026 data where available. If referencing historical data, make it clear it's historical.`
    );
  }

  const fixList = fixInstructions.join("\n\n");

  return `Fix the quality issues in this article and return the corrected JSON array.

=== WRITING QUALITY RULES (MAINTAIN THROUGHOUT) ===
${writingRules}
=== END WRITING QUALITY RULES ===

Article title: ${title}
${targetKeyword ? `Target keyword: ${targetKeyword}` : ""}

=== QUALITY ISSUES TO FIX ===
${fixList}
=== END ISSUES ===

=== CURRENT ARTICLE SECTIONS (JSON) ===
${JSON.stringify(sections, null, 2)}
=== END ARTICLE SECTIONS ===

IMPORTANT INSTRUCTIONS:
1. Fix ONLY the issues listed above. Do not rewrite sections that have no issues.
2. Preserve all factual content, internal links, and article structure.
3. Do not add new sections unless specifically instructed (e.g., missing Eddie's Pro Tip or FAQ).
4. Return the complete corrected article as a JSON array — include ALL sections, not just the fixed ones.
5. Do not use em dashes anywhere in the output.`;
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!FORGE_API_URL || !FORGE_API_KEY) {
    return NextResponse.json({ error: "LLM API not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { sections, issues, title, targetKeyword } = body as {
      sections: any[];
      issues: ValidationIssue[];
      title: string;
      targetKeyword?: string;
    };

    if (!Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json({ error: "sections array is required" }, { status: 400 });
    }

    if (!Array.isArray(issues) || issues.length === 0) {
      return NextResponse.json({ error: "issues array is required" }, { status: 400 });
    }

    // Only fix auto-fixable issues (skip manual-only ones)
    const fixableCategories = [
      "Banned Phrase",
      "FAQ Length",
      "Paragraph Length",
      "Anchor Text",
      "Generic Link",
      "Missing Section",
      "Visual Variety",
      "Outdated Data",
    ];

    const fixableIssues = issues.filter((i) => fixableCategories.includes(i.category));

    if (fixableIssues.length === 0) {
      // Nothing auto-fixable — return original sections unchanged
      return NextResponse.json({
        success: true,
        sections,
        fixedCount: 0,
        message: "No auto-fixable issues found",
      });
    }

    const userPrompt = buildFixPrompt(sections, fixableIssues, title, targetKeyword);

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
          { role: "system", content: FIX_SYSTEM_PROMPT },
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
    let fixedSections;
    try {
      const cleaned = rawOutput
        .replace(/^```json?\n?/m, "")
        .replace(/\n?```$/m, "")
        .trim();
      fixedSections = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse fix output as JSON", rawOutput },
        { status: 422 }
      );
    }

    if (!Array.isArray(fixedSections)) {
      return NextResponse.json(
        { error: "Fix output is not an array", rawOutput },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      sections: fixedSections,
      fixedCount: fixableIssues.length,
    });
  } catch (err) {
    console.error("[CMS quality-fix]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
