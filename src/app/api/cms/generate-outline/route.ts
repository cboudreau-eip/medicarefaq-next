import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { verifySessionToken } from "@/lib/cms-auth";
import { writingConfig } from "@/lib/writing-config";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

export interface OutlineSection {
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

export interface GeneratedOutline {
  title: string;
  sections: OutlineSection[];
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "LLM API not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const {
      topic,
      targetKeyword,
      contentType = "blog",
      tone = "professional",
      targetWordCount = 2000,
      numSections = 7,
      numFaqs = 4,
      targetLocation = "",
      additionalInstructions = "",
    } = body as {
      topic: string;
      targetKeyword?: string;
      contentType?: string;
      tone?: string;
      targetWordCount?: number;
      numSections?: number;
      numFaqs?: number;
      targetLocation?: string;
      additionalInstructions?: string;
    };

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Topic or title is required" },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const { brandVoice, icp } = writingConfig;

    // ─── BLOCK 1: Role + Date Context ───
    const block1 = `You are an expert SEO content strategist for MedicareFAQ.com. Generate a detailed article outline for the given topic/keyword.

IMPORTANT — CURRENT DATE CONTEXT: The current year is ${currentYear}. All references to dates, years, regulations, trends, and time-sensitive topics MUST treat ${currentYear} as the present year. Do NOT reference ${currentYear - 1} or any prior year as "current."`;

    // ─── BLOCK 2: Output Format Instructions ───
    const block2 = `Return a JSON object with:
- "title": A compelling, SEO-optimized article title
- "sections": An array of sections, each with:
  - "id": A unique string ID (use format "s1", "s2", etc.)
  - "heading": The section heading text
  - "type": "h2" for main sections
  - "points": Array of 2-4 key points to cover in this section
  - "targetWordCount": Estimated word count for this section (integer).
    Distribute the total target word count across sections proportionally:
    - Introduction: ~100-150 words
    - Conclusion: ~100-150 words
    - FAQ: ~50-80 words per question
    - Main body sections: split the remainder evenly
    The sum of all section targetWordCounts should approximately equal the total target.
  - "subSections": Array of sub-sections (same structure but type "h3").
    Sub-sections do NOT need a targetWordCount.

Return ONLY valid JSON, no markdown code blocks.`;

    // ─── BLOCK 3: Guidelines ───
    let block3 = `Guidelines:
- Create ${numSections} main sections
- Include an introduction section first
- Include a FAQ section with ${numFaqs} questions as sub-sections
- Include a conclusion section last
- Content type: ${contentType}
- Tone: ${tone}
- Target word count: ${targetWordCount} words
- UNIQUENESS: Plan section points that are specific and fresh — avoid generic talking points that appear in every article on this topic. Each outline should feel like a unique angle, not a template.`;

    if (additionalInstructions.trim()) {
      block3 += `\n- Additional instructions: ${additionalInstructions}`;
    }
    if (targetLocation.trim()) {
      block3 += `\n- Target location: ${targetLocation} — tailor the outline to be relevant for this geographic area`;
    }

    // ─── BLOCK 4: ICP Section ───
    const block4 = `=== IDEAL CUSTOMER PROFILE (ICP) - CRITICAL ===
The outline MUST be structured to serve this specific audience:

TARGET AUDIENCE: ${icp.name}
Who They Are: ${icp.description}

PAIN POINTS (structure H2 headings around these):
${icp.painPoints.map((p, i) => `  ${i + 1}. ${p}`).join("\n")}

GOALS (address these in content sections):
${icp.goals.map((g, i) => `  ${i + 1}. ${g}`).join("\n")}

OBJECTIONS (create FAQ questions from these):
${icp.objections.map((o, i) => `  ${i + 1}. ${o}`).join("\n")}

DECISION TRIGGERS (weave into content flow):
${icp.decisionTriggers.map((t, i) => `  ${i + 1}. ${t}`).join("\n")}

TRUST SIGNALS (incorporate in relevant sections):
${icp.trustSignals.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}

ICP OUTLINE REQUIREMENTS:
1. At least 30% of H2 headings MUST directly reflect the pain points listed above
2. FAQ section MUST include questions that address the objections listed above
3. Include sections that speak to the decision triggers
4. Structure content to move the reader toward their goals
5. Use language and examples that resonate with the target audience`;

    // ─── BLOCK 5: Brand Voice Section ───
    const block5 = `=== BRAND VOICE GUIDELINES - APPLY TO ALL CONTENT ===
Voice Name: ${brandVoice.name}

TONE TRAITS: PRIMARY: ${brandVoice.primaryTone.join(", ")} | SUPPORTING: ${brandVoice.supportingTone.join(", ")}

WRITING PERSPECTIVE: ${brandVoice.perspective}

SENTENCE STYLE: ${brandVoice.sentenceStyle}

AVOID:
${brandVoice.avoid.map((a) => `- ${a}`).join("\n")}

STYLE EXAMPLE (for tone reference only — do NOT copy phrases):
"${brandVoice.writingStyleSample.slice(0, 500)}"

BRAND VOICE REQUIREMENTS FOR OUTLINE:
1. Craft all section headings using the specified tone traits
2. Key points should reflect the writing perspective
3. Hook and quick answer sections must match the brand tone
4. FAQ questions should be phrased in a way that matches the voice
5. Avoid anything listed in the "AVOID" section above
6. Plan section key points to be granular enough that each paragraph in the final article stays within the sentence style limits`;

    // ─── Assemble system prompt ───
    const systemPrompt = [block1, block2, block3, block4, block5].join("\n\n");

    // ─── User message ───
    const keyword = targetKeyword?.trim() || topic.trim();
    const userMessage = `Generate a detailed article outline for the ${targetKeyword ? `keyword: "${keyword}"\n\nTopic/Title context: "${topic}"` : `topic: "${topic}"`}`;

    // ─── Call LLM ───
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const rawOutput = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    // Parse JSON output — robust parser that handles markdown fences, extra text, etc.
    let outline: GeneratedOutline;
    try {
      // Strip markdown code fences (```json ... ``` or ``` ... ```)
      let cleaned = rawOutput
        .replace(/^```(?:json)?\s*/im, "")
        .replace(/\s*```\s*$/im, "")
        .trim();

      // If there's still non-JSON text before the first '{', strip it
      const firstBrace = cleaned.indexOf("{");
      if (firstBrace > 0) {
        cleaned = cleaned.slice(firstBrace);
      }

      // If there's trailing text after the last '}', strip it
      const lastBrace = cleaned.lastIndexOf("}");
      if (lastBrace !== -1 && lastBrace < cleaned.length - 1) {
        cleaned = cleaned.slice(0, lastBrace + 1);
      }

      outline = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("[CMS generate-outline] JSON parse error:", parseErr);
      console.error("[CMS generate-outline] Raw output:", rawOutput.slice(0, 500));
      return NextResponse.json(
        { error: "Failed to parse outline JSON", rawOutput },
        { status: 422 }
      );
    }

    if (!outline.title || !Array.isArray(outline.sections)) {
      return NextResponse.json(
        { error: "Invalid outline structure", rawOutput },
        { status: 422 }
      );
    }

    // Normalize sections to ensure all required fields exist
    outline.sections = outline.sections.map((s, i) => ({
      id: s.id ?? `s${i + 1}`,
      heading: s.heading ?? "Untitled Section",
      type: s.type ?? "h2",
      points: Array.isArray(s.points) ? s.points : [],
      targetWordCount: typeof s.targetWordCount === "number" ? s.targetWordCount : 200,
      subSections: Array.isArray(s.subSections)
        ? s.subSections.map((sub, j) => ({
            id: sub.id ?? `${s.id ?? `s${i + 1}`}-sub${j + 1}`,
            heading: sub.heading ?? "Sub-section",
            type: "h3" as const,
            points: Array.isArray(sub.points) ? sub.points : [],
          }))
        : [],
    }));

    return NextResponse.json({
      success: true,
      outline,
      settings: {
        topic,
        targetKeyword: keyword,
        contentType,
        tone,
        targetWordCount,
        numSections,
        numFaqs,
        targetLocation,
        additionalInstructions,
      },
    });
  } catch (err) {
    console.error("[CMS generate-outline]", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
