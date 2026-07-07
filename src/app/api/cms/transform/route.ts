import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { verifySessionToken } from "@/lib/cms-auth";
import { buildWritingPrompt } from "@/lib/writing-config";
import { validateContent } from "@/lib/content-validator";
import type { ValidationIssue } from "@/lib/content-validator";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

function extractText(message: Anthropic.Message): string {
  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}

const MIN_QUALITY_SCORE = 87;
const MAX_RETRIES = 3;

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
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
- Internal links should use relative paths: /blog/slug/, /faqs/slug/, /medicare-supplement-plans/plan-g/
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

const FIX_SYSTEM_PROMPT = `You are a content quality editor for MedicareFAQ.com. You will receive a structured article (as a JSON array of BlogSectionContent objects) along with a list of specific quality issues that need to be fixed.

Your job is to return the SAME article with ONLY the identified issues corrected. Do not rewrite sections that have no issues. Preserve all content, structure, and meaning — only fix what is flagged.

Use the EXACT same JSON formats as the original article. Do not change section types or add new fields.

OUTPUT FORMAT:
Return ONLY a valid JSON array of BlogSectionContent objects. No markdown code fences, no explanation, just the JSON array.`;

const META_SYSTEM_PROMPT = `You are a Medicare content strategist. Return only valid JSON, no markdown fences.`;

/**
 * Robustly clean LLM JSON output before parsing.
 * Handles: code fences, trailing commas, control chars, BOM, etc.
 */
function cleanLLMJson(raw: string): string {
  let s = raw;
  // Remove BOM
  s = s.replace(/^\uFEFF/, "");
  // Remove markdown code fences (various formats)
  s = s.replace(/^\s*```(?:json|JSON)?\s*\n?/, "");
  s = s.replace(/\n?\s*```\s*$/, "");
  // If there's still text before the first [ or {, strip it
  const firstBracket = Math.min(
    s.indexOf("[") === -1 ? Infinity : s.indexOf("["),
    s.indexOf("{") === -1 ? Infinity : s.indexOf("{")
  );
  if (firstBracket !== Infinity && firstBracket > 0) {
    s = s.slice(firstBracket);
  }
  // If there's text after the last ] or }, strip it
  const lastClose = Math.max(s.lastIndexOf("]"), s.lastIndexOf("}"));
  if (lastClose !== -1 && lastClose < s.length - 1) {
    s = s.slice(0, lastClose + 1);
  }
  // Remove trailing commas before } or ]
  s = s.replace(/,\s*([}\]])/g, "$1");
  // Remove control characters (except newline, tab) that break JSON
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  return s.trim();
}

/**
 * Builds a targeted fix prompt from the list of validation issues.
 */
function buildFixInstructions(
  issues: ValidationIssue[],
  title: string,
  targetKeyword?: string
): string {
  const byCategory: Record<string, ValidationIssue[]> = {};
  for (const issue of issues) {
    if (!byCategory[issue.category]) byCategory[issue.category] = [];
    byCategory[issue.category].push(issue);
  }

  const fixInstructions: string[] = [];

  if (byCategory["Banned Phrase"]) {
    const phrases = byCategory["Banned Phrase"]
      .map((i) => {
        const match = i.message.match(/"([^"]+)"/);
        return match ? match[1] : null;
      })
      .filter(Boolean);
    const uniquePhrases = [...new Set(phrases)];
    fixInstructions.push(
      `BANNED PHRASES — Remove or replace these phrases:\n` +
        uniquePhrases.map((p) => `  - "${p}" -> use plain, direct language instead`).join("\n") +
        `\n  Common replacements: "navigate" -> "use"; "leverage" -> "use"; "comprehensive" -> be specific; "seamless" -> remove; "ensure" -> "make sure"; "utilize" -> "use"; "in today's world" -> remove; "it's important to note" -> remove.`
    );
  }

  if (byCategory["FAQ Length"]) {
    const errors = byCategory["FAQ Length"].filter((i) => i.severity === "error");
    if (errors.length > 0) {
      fixInstructions.push(
        `FAQ ANSWERS TOO LONG — Trim these FAQ answers to 40-80 words max:\n` +
          errors
            .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.detail || i.message}`)
            .join("\n")
      );
    }
  }

  if (byCategory["Paragraph Length"]) {
    fixInstructions.push(
      `PARAGRAPHS TOO LONG — Split these (max 5 sentences, target 2-4):\n` +
        byCategory["Paragraph Length"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.message}`)
          .join("\n")
    );
  }

  if (byCategory["Anchor Text"]) {
    fixInstructions.push(
      `ANCHOR TEXT TOO LONG — Shorten to 7 words or fewer:\n` +
        byCategory["Anchor Text"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.detail || i.message}`)
          .join("\n")
    );
  }

  if (byCategory["Generic Link"]) {
    fixInstructions.push(
      `GENERIC ANCHOR TEXT — Replace with descriptive keywords:\n` +
        byCategory["Generic Link"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.message}`)
          .join("\n")
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
        `MISSING EDDIE'S PRO TIP — Add exactly one:\n` +
          `  - Insert after the most impactful decision point\n` +
          `  - First person, 2-4 sentences of practical insider advice\n` +
          `  - Format: { "type": "eddie-pro-tip", "content": "..." }`
      );
    }

    if (missingFaq) {
      fixInstructions.push(
        `MISSING FAQ SECTION — Add near the end:\n` +
          `  - 3-5 questions about ${targetKeyword || title}\n` +
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
        `NEEDS MORE CALLOUTS — Add at least 2 callouts distributed throughout:\n` +
          `  - Use "warning" for deadlines/penalties, "info" for key facts, "success" for benefits, "tip" for advice\n` +
          `  - Insert after paragraphs containing important facts or actionable advice`
      );
    }
  }

  if (byCategory["Outdated Data"]) {
    fixInstructions.push(
      `OUTDATED DATA — Update or clarify year references:\n` +
        byCategory["Outdated Data"]
          .map((i) => `  - Section ${(i.sectionIndex ?? 0) + 1}: ${i.message}`)
          .join("\n") +
        `\n  Use 2026 data. If historical, make it clear.`
    );
  }

  const writingRules = buildWritingPrompt();

  return `Fix the quality issues in this article and return the corrected JSON array.

=== WRITING QUALITY RULES (MAINTAIN THROUGHOUT) ===
${writingRules}
=== END WRITING QUALITY RULES ===

Article title: ${title}
${targetKeyword ? `Target keyword: ${targetKeyword}` : ""}

=== QUALITY ISSUES TO FIX ===
${fixInstructions.join("\n\n")}
=== END ISSUES ===

IMPORTANT:
1. Fix ONLY the issues listed above. Do not rewrite sections that have no issues.
2. Preserve all factual content, internal links, and article structure.
3. Return the COMPLETE corrected article as a JSON array — include ALL sections.
4. Do not use em dashes anywhere.`;
}

/**
 * Calls the LLM to fix quality issues in an existing article.
 */
async function fixArticleQuality(
  sections: any[],
  issues: ValidationIssue[],
  title: string,
  targetKeyword?: string
): Promise<any[]> {
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
    return sections;
  }

  const fixPrompt = buildFixInstructions(fixableIssues, title, targetKeyword);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 12000,
    system: FIX_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `${fixPrompt}\n\n=== CURRENT ARTICLE SECTIONS (JSON) ===\n${JSON.stringify(sections, null, 2)}\n=== END ARTICLE SECTIONS ===\n\nReturn the complete corrected JSON array now.`,
      },
    ],
  });

  const rawOutput = extractText(message);

  const cleaned = cleanLLMJson(rawOutput);
  const fixedSections = JSON.parse(cleaned);

  if (!Array.isArray(fixedSections)) {
    throw new Error("Fix output is not an array");
  }

  return fixedSections;
}

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

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "LLM service not configured" }, { status: 503 });
    }

    // ─── STEP 1: Transform content to sections ────────────────────────────────
    const writingRules = buildWritingPrompt();

    const userPrompt = `Transform the following article content into structured BlogSectionContent JSON.

=== WRITING QUALITY RULES (APPLY TO ALL CONTENT) ===
${writingRules}
=== END WRITING QUALITY RULES ===

Article title: ${title || "Untitled"}

Raw content:
${rawContent}`;

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8192,
      system: TRANSFORM_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawOutput = extractText(message);

    // Parse the JSON output
    let sections;
    try {
      const cleaned = cleanLLMJson(rawOutput);
      sections = JSON.parse(cleaned);
    } catch (parseErr) {
      return NextResponse.json({
        error: `Failed to parse LLM output as JSON: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`,
        rawOutput: rawOutput.slice(0, 500),
      }, { status: 422 });
    }

    if (!Array.isArray(sections)) {
      return NextResponse.json({
        error: "LLM output is not an array",
        rawOutput,
      }, { status: 422 });
    }

    // ─── STEP 2: Self-healing quality loop ───────────────────────────────────
    let validation = validateContent(sections);
    const qualityHistory: Array<{ attempt: number; score: number; issues: number }> = [
      { attempt: 0, score: validation.score, issues: validation.issues.length },
    ];

    let bestSections = sections;
    let bestScore = validation.score;
    let bestValidation = validation;
    let attemptsMade = 0;

    while (validation.score < MIN_QUALITY_SCORE && attemptsMade < MAX_RETRIES) {
      attemptsMade++;

      try {
        const fixedSections = await fixArticleQuality(
          sections,
          validation.issues,
          title || "Untitled"
        );

        const fixedValidation = validateContent(fixedSections);

        qualityHistory.push({
          attempt: attemptsMade,
          score: fixedValidation.score,
          issues: fixedValidation.issues.length,
        });

        // Track best version across all attempts
        if (fixedValidation.score > bestScore) {
          bestSections = fixedSections;
          bestScore = fixedValidation.score;
          bestValidation = fixedValidation;
        }

        // Update for next iteration
        sections = fixedSections;
        validation = fixedValidation;

        // Stop early if we've passed the threshold
        if (validation.score >= MIN_QUALITY_SCORE) {
          break;
        }
      } catch (fixErr) {
        console.error(`[CMS transform] Fix attempt ${attemptsMade} failed:`, fixErr);
        break;
      }
    }

    // Use the best version found
    const finalSections = bestSections;
    const finalValidation = bestValidation;

    // ─── STEP 3: Build table of contents ─────────────────────────────────────
    const tableOfContents = finalSections
      .filter((s: any) => s.type === "heading" && s.level === 2)
      .map((s: any) => ({ id: s.id, title: s.text }));

    // ─── STEP 4: Optionally generate metadata ────────────────────────────────
    let meta = null;
    if (generateMeta) {
      meta = await generateArticleMeta(rawContent, title || "Untitled");
    }

    return NextResponse.json({
      sections: finalSections,
      tableOfContents,
      meta,
      quality: {
        score: finalValidation.score,
        passed: finalValidation.passed,
        issues: finalValidation.issues,
        summary: finalValidation.summary,
        attemptsUsed: attemptsMade,
        qualityHistory,
        acceptedBestVersion: bestScore < MIN_QUALITY_SCORE,
      },
    });
  } catch (err) {
    console.error("[CMS transform]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Helper: Generate article metadata
async function generateArticleMeta(
  rawContent: string,
  title: string
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
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;
    const anthropic = new Anthropic({ apiKey });
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: META_SYSTEM_PROMPT,
      messages: [{ role: "user", content: metaPrompt }],
    });

    const raw = extractText(message);
    try {
      const cleaned = cleanLLMJson(raw);
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
