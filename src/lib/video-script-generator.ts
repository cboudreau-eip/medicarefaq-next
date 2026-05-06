/**
 * video-script-generator.ts
 *
 * Server-side utility that takes a structured article object and uses the
 * Manus Forge LLM API (OpenAI-compatible) to generate a 2-minute HeyGen video script.
 *
 * The script follows this structure:
 *   Hook       (~15 sec)  — attention-grabbing opening question/statement
 *   Key Facts  (~75 sec)  — 3–4 main points from the article
 *   Next Steps (~20 sec)  — practical action the viewer should take
 *   CTA        (~10 sec)  — call to action: visit MedicareFAQ.com or call
 *
 * Total target: ~250–280 words (reads at ~130 wpm = ~2 minutes)
 */

export interface ArticleSummaryInput {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  /** Plain-text body content extracted from the article sections */
  bodyText: string;
}

export interface VideoScriptResult {
  script: string;
  wordCount: number;
  estimatedDurationSeconds: number;
  sections: {
    hook: string;
    keyFacts: string;
    nextSteps: string;
    cta: string;
  };
}

const SYSTEM_PROMPT = `You are a professional video scriptwriter specializing in Medicare education content for MedicareFAQ.com.

Your job is to write clear, conversational 2-minute video scripts for a talking-head presenter (Alyssa, a licensed Medicare specialist).

Script rules:
- Target 250-280 words total (reads at approximately 130 words per minute, which equals about 2 minutes)
- Write in plain, conversational English, as if speaking directly to a Medicare beneficiary or someone turning 65
- Avoid jargon; when a term is necessary, briefly define it
- Do NOT use em dashes; use commas or periods instead
- Do NOT use bullet points or lists in the script; write in flowing sentences
- Avoid overly formal or academic language
- The tone should be warm, trustworthy, and helpful, like advice from a knowledgeable friend
- Do not include stage directions, camera notes, or PAUSE markers
- Do not include section headers in the output script

Structure the script in exactly four parts, clearly labeled with XML tags:
<hook>15-second attention-grabbing opening, a question or surprising fact</hook>
<key_facts>75-second section covering 3 to 4 main points from the article</key_facts>
<next_steps>20-second practical action the viewer should take</next_steps>
<cta>10-second call to action ending with: "Visit MedicareFAQ.com or call us at 1-888-335-8996 for a free consultation."</cta>`;

/**
 * Extracts plain text from article body content for use as context.
 * Strips HTML tags and normalizes whitespace.
 */
export function extractPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 4000); // Cap at 4000 chars to stay within token limits
}

/**
 * Generates a 2-minute video script for the given article using the Manus Forge LLM API.
 */
export async function generateVideoScript(
  article: ArticleSummaryInput
): Promise<VideoScriptResult> {
  const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
  const apiKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error(
      "BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY is not configured"
    );
  }

  const userPrompt = `Write a 2-minute video script for the following Medicare article:

Title: ${article.title}
Category: ${article.category}
Summary: ${article.excerpt}

Article content:
${article.bodyText}

Remember: 250-280 words total, four labeled sections (hook, key_facts, next_steps, cta), no em dashes, conversational tone.`;

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
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM API request failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  const rawText: string =
    data?.choices?.[0]?.message?.content ?? "";

  if (!rawText) {
    throw new Error("LLM returned an empty response");
  }

  // Parse the four labeled sections
  const hookMatch = rawText.match(/<hook>([\s\S]*?)<\/hook>/);
  const keyFactsMatch = rawText.match(/<key_facts>([\s\S]*?)<\/key_facts>/);
  const nextStepsMatch = rawText.match(/<next_steps>([\s\S]*?)<\/next_steps>/);
  const ctaMatch = rawText.match(/<cta>([\s\S]*?)<\/cta>/);

  const hook = hookMatch?.[1]?.trim() ?? "";
  const keyFacts = keyFactsMatch?.[1]?.trim() ?? "";
  const nextSteps = nextStepsMatch?.[1]?.trim() ?? "";
  const cta = ctaMatch?.[1]?.trim() ?? "";

  // Build the clean script (no XML tags)
  const script = [hook, keyFacts, nextSteps, cta]
    .filter(Boolean)
    .join("\n\n");

  if (!script) {
    throw new Error(
      "Could not parse script sections from LLM response. Raw output: " +
        rawText.slice(0, 300)
    );
  }

  const wordCount = script.split(/\s+/).filter(Boolean).length;
  const estimatedDurationSeconds = Math.round((wordCount / 130) * 60);

  return {
    script,
    wordCount,
    estimatedDurationSeconds,
    sections: { hook, keyFacts, nextSteps, cta },
  };
}
