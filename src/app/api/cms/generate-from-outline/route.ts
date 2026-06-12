import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";
import { buildWritingPrompt } from "@/lib/writing-config";
import { validateContent } from "@/lib/content-validator";
import type { ValidationIssue } from "@/lib/content-validator";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

const MIN_QUALITY_SCORE = 87;
const MAX_RETRIES = 3;

/**
 * Robustly clean LLM JSON output before parsing.
 */
function cleanLLMJson(raw: string): string {
  let s = raw;
  s = s.replace(/^\uFEFF/, "");
  s = s.replace(/^\s*```(?:json|JSON)?\s*\n?/, "");
  s = s.replace(/\n?\s*```\s*$/, "");
  const firstBracket = Math.min(
    s.indexOf("[") === -1 ? Infinity : s.indexOf("["),
    s.indexOf("{") === -1 ? Infinity : s.indexOf("{")
  );
  if (firstBracket !== Infinity && firstBracket > 0) {
    s = s.slice(firstBracket);
  }
  const lastClose = Math.max(s.lastIndexOf("]"), s.lastIndexOf("}"));
  if (lastClose !== -1 && lastClose < s.length - 1) {
    s = s.slice(0, lastClose + 1);
  }
  s = s.replace(/,\s*([}\]])/g, "$1");
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  return s.trim();
}

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
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
{ "type": "callout", "calloutType": "warning", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "callout", "calloutType": "info", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "callout", "calloutType": "success", "calloutText": "Text here.", "calloutTitle": "Optional title" }
{ "type": "callout", "calloutType": "tip", "calloutText": "Text here.", "calloutTitle": "Optional title" }
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

const FIX_SYSTEM_PROMPT = `You are a content quality editor for MedicareFAQ.com. You will receive a structured article (as a JSON array of BlogSectionContent objects) along with a list of specific quality issues that need to be fixed.

Your job is to return the SAME article with ONLY the identified issues corrected. Do not rewrite sections that have no issues. Preserve all content, structure, and meaning — only fix what is flagged.

Use the EXACT same JSON formats as the original article. Do not change section types or add new fields.

OUTPUT FORMAT:
Return ONLY a valid JSON array of BlogSectionContent objects. No markdown code fences, no explanation, just the JSON array.`;

/**
 * Calls the LLM to generate a full article from an outline.
 */
async function generateArticle(
  outline: ApprovedOutline,
  settings: {
    targetKeyword?: string;
    contentType?: string;
    tone?: string;
    targetWordCount?: number;
  }
): Promise<any[]> {
  const writingRules = buildWritingPrompt();

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

  const cleaned = cleanLLMJson(rawOutput);
  const sections = JSON.parse(cleaned);

  if (!Array.isArray(sections)) {
    throw new Error("LLM output is not an array");
  }

  return sections;
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
  // Only fix auto-fixable issues
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
    return sections; // Nothing to fix
  }

  const fixPrompt = buildFixInstructions(fixableIssues, title, targetKeyword);

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
        {
          role: "user",
          content: `${fixPrompt}\n\n=== CURRENT ARTICLE SECTIONS (JSON) ===\n${JSON.stringify(sections, null, 2)}\n=== END ARTICLE SECTIONS ===\n\nReturn the complete corrected JSON array now.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`LLM fix API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  const rawOutput = data?.choices?.[0]?.message?.content ?? "";

  const cleaned = cleanLLMJson(rawOutput);
  const fixedSections = JSON.parse(cleaned);

  if (!Array.isArray(fixedSections)) {
    throw new Error("Fix output is not an array");
  }

  return fixedSections;
}

const META_SYSTEM_PROMPT = `You are a Medicare content strategist. Return only valid JSON, no markdown fences.`;

/**
 * Generates SEO metadata from the final article sections.
 */
async function generateArticleMeta(
  sections: any[],
  title: string,
  targetKeyword?: string
): Promise<{ excerpt: string; keyTakeaways: string[]; seoTitle: string; seoDescription: string; suggestedCategory: string } | null> {
  // Build a plain-text summary of the article from paragraphs
  const plainText = sections
    .filter((s: any) => s.type === "paragraph" || s.type === "callout")
    .map((s: any) => s.content || s.calloutText || "")
    .join(" ")
    .slice(0, 3000);

  const metaPrompt = `Given this Medicare article titled "${title}"${
    targetKeyword ? ` targeting the keyword "${targetKeyword}"` : ""
  }, generate:
1. excerpt: A 1-2 sentence summary (max 200 chars)
2. keyTakeaways: 3-5 bullet points of the most important facts
3. seoTitle: SEO-optimized title (max 60 chars, include target keyword if it fits naturally)
4. seoDescription: Meta description (MUST be 150 characters or fewer, aim for 120-145 characters, include target keyword)
5. suggestedCategory: One of: Medicare News, Medicare Supplement, Medicare Plans, Getting Started, Enrollment, Senior Living, Medicare Coverage, Healthcare, Medicare Costs, Medicare Basics, Medicare Advantage, General, Eligibility, Benefits

Return as JSON object with these exact keys. Do not use em dashes anywhere.

Article content:
${plainText}`;

  try {
    const response = await fetch(`${FORGE_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FORGE_API_KEY}`,
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
    const cleaned = cleanLLMJson(raw);
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

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

    // ─── STEP 1: Generate initial article ────────────────────────────────────
    let sections = await generateArticle(outline, settings ?? {});

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
          outline.title,
          settings?.targetKeyword
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
        console.error(`[CMS generate-from-outline] Fix attempt ${attemptsMade} failed:`, fixErr);
        // Continue with best version found so far
        break;
      }
    }

    // Use the best version found across all attempts
    const finalSections = bestSections;
    const finalValidation = bestValidation;

    // ─── STEP 3: Build table of contents ─────────────────────────────────────
    const tableOfContents = finalSections
      .filter((s: any) => s.type === "heading" && s.level === 2)
      .map((s: any) => ({ id: s.id, title: s.text }));

    // ─── STEP 4: Generate SEO metadata ───────────────────────────────────────
    const meta = await generateArticleMeta(
      finalSections,
      outline.title,
      settings?.targetKeyword
    );

    // ─── STEP 5: Return result with quality metadata and SEO meta ─────────────
    return NextResponse.json({
      success: true,
      sections: finalSections,
      tableOfContents,
      title: outline.title,
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
    console.error("[CMS generate-from-outline]", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
