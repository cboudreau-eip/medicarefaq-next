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

    const prompt = `You are a content strategist for MedicareFAQ.com, a Medicare education website for seniors and caregivers.

Given the following source article data, generate a content brief for a new original article we will write.

SOURCE DATA:
- Title: ${article.title}
- Source URL: ${article.url}
- Category: ${article.category}
- Snippet: ${article.snippet}
- Primary Keyword: ${article.seo?.primaryKeyword || article.topic || ""}
- Semantic Keywords: ${(article.seo?.semanticKeywords || []).join(", ")}
- Content Angle: ${article.seo?.contentAngle || ""}
- Importance Score: ${article.importanceScore || "N/A"}

Generate a JSON object with these fields:
{
  "title": "Working title for our article (compelling, SEO-friendly, max 70 chars)",
  "keyword": "Primary target keyword",
  "secondaryKeywords": ["array of 5-8 secondary/semantic keywords"],
  "wordCount": 1200,
  "linkCount": 8,
  "description": "2-3 sentence editorial brief describing the angle, audience, and unique value our article will provide vs the source",
  "category": "One of: medicare_advantage, medicare_supplement, medicare_part_d, original_medicare, enrollment, costs, eligibility, general"
}

RULES:
- Our article must be ORIGINAL — not a rewrite of the source
- Focus on actionable advice for Medicare beneficiaries
- The title should be different from the source title
- Word count should be 1000-1500 based on topic complexity
- Link count should be 6-10 internal links

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
        category: brief.category || article.category || "",
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
