import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_API_BASE =
  process.env.OPENAI_API_BASE || "https://api.openai.com/v1";

export async function POST(req: NextRequest) {
  try {
    const { article } = await req.json();

    if (!article) {
      return NextResponse.json(
        { error: "Article data is required" },
        { status: 400 }
      );
    }

    // PipelineItem uses prefixed field names (sourceTitle, sourceUrl, etc.)
    // Fall back to raw S3 field names for backwards compatibility
    const title = article.sourceTitle || article.title || "";
    const url = article.sourceUrl || article.url || "";
    const category = article.sourceCategory || article.category || "";
    const snippet = article.sourceSnippet || article.snippet || "";
    const topic = article.topic || "";
    const importanceScore = article.importanceScore || "N/A";

    // sourceSeo is the nested SEO object from S3
    const seo = article.sourceSeo || article.seo || {};
    const primaryKeyword = seo.primaryKeyword || topic || "";
    const semanticKeywords: string[] = seo.semanticKeywords || [];
    const contentAngle = seo.contentAngle || "";
    const suggestedTitle = seo.suggestedTitle || title;
    const metaDescription = seo.metaDescription || snippet;

    const prompt = `You are a content strategist for MedicareFAQ.com, a Medicare education website for seniors and caregivers.

Given the following source article data, generate a content brief for a new ORIGINAL article we will write for our site.

SOURCE DATA:
- Topic: ${topic}
- Title: ${title}
- Source URL: ${url}
- Category: ${category}
- Snippet: ${snippet}
- Suggested Title: ${suggestedTitle}
- Meta Description: ${metaDescription}
- Primary Keyword: ${primaryKeyword}
- Semantic Keywords: ${semanticKeywords.join(", ")}
- Content Angle: ${contentAngle}
- Importance Score: ${importanceScore}

Generate a JSON object with these fields:
{
  "title": "Working title for our article (compelling, SEO-friendly, max 70 chars — must be specific to the topic above)",
  "keyword": "Primary target keyword (must match the topic above)",
  "secondaryKeywords": ["array of 5-8 secondary/semantic keywords relevant to this specific topic"],
  "wordCount": 1200,
  "linkCount": 8,
  "description": "2-3 sentence editorial brief describing the specific angle, audience, and unique value our article will provide — must be specific to the topic: ${topic}",
  "category": "One of: medicare_advantage, medicare_supplement, medicare_part_d, original_medicare, enrollment, costs, eligibility, general"
}

RULES:
- Our article must be ORIGINAL — not a rewrite of the source
- The content MUST be specifically about: ${topic}
- Focus on actionable advice for Medicare beneficiaries
- The title should be different from the source title but cover the same topic
- Word count should be 1000-1500 based on topic complexity
- Link count should be 6-10 internal links
- Do NOT generate generic Medicare content — stay tightly focused on the specific topic

Return ONLY the JSON object, no markdown fences or explanation.`;

    const resp = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json(
        { error: `LLM request failed: ${errText}` },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const rawOutput = data.choices?.[0]?.message?.content || "";

    // Clean and parse
    const cleaned = rawOutput
      .replace(/```json?\n?/g, "")
      .replace(/```/g, "")
      .trim();

    let brief: any;
    try {
      brief = JSON.parse(cleaned);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        brief = JSON.parse(jsonMatch[0]);
      } else {
        return NextResponse.json(
          { error: "Failed to parse brief from LLM", rawOutput },
          { status: 422 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      brief: {
        title: brief.title || "",
        keyword: brief.keyword || "",
        secondaryKeywords: brief.secondaryKeywords || [],
        wordCount: brief.wordCount || 1200,
        linkCount: brief.linkCount || 8,
        description: brief.description || "",
        category: brief.category || category || "",
      },
    });
  } catch (error: any) {
    console.error("Generate brief error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate brief" },
      { status: 500 }
    );
  }
}
