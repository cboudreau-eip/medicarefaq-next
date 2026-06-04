import { NextRequest, NextResponse } from "next/server";
import { blogArticles } from "@/lib/blog-articles-data";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

type LinkableArticle = {
  slug: string;
  title: string;
  url: string;
  type: "blog" | "faq" | "coverage";
};

function getAllLinkableArticles(): LinkableArticle[] {
  const articles: LinkableArticle[] = [];

  for (const a of blogArticles) {
    articles.push({
      slug: a.slug,
      title: a.title,
      url: `/blog/${a.slug}/`,
      type: "blog",
    });
  }

  for (const a of coverageArticles) {
    articles.push({
      slug: a.slug,
      title: a.title,
      url: `/faqs/${a.slug}/`,
      type: "coverage",
    });
  }

  for (const a of simpleFAQArticles) {
    articles.push({
      slug: a.slug,
      title: a.title,
      url: `/faqs/${a.slug}/`,
      type: "faq",
    });
  }

  return articles;
}

export async function POST(request: NextRequest) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { articleContent, currentSlug } = body;

    if (!articleContent) {
      return NextResponse.json(
        { error: "articleContent is required" },
        { status: 400 }
      );
    }

    // Get all linkable articles, excluding the current one
    const allArticles = getAllLinkableArticles().filter(
      (a) => a.slug !== currentSlug
    );

    // Find links already present in the article content
    const existingLinks = new Set<string>();
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(articleContent)) !== null) {
      existingLinks.add(match[2].replace(/\/$/, ""));
    }

    // Filter out articles that are already linked
    const availableArticles = allArticles.filter(
      (a) => !existingLinks.has(a.url.replace(/\/$/, ""))
    );

    // Build a compact catalog for GPT (title + url + type)
    // Limit to keep token count reasonable
    const catalog = availableArticles
      .map((a) => `${a.title} | ${a.url} | ${a.type}`)
      .join("\n");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `You are an SEO internal linking specialist for a Medicare information website. Your job is to analyze article content and suggest where internal links should be added.

Rules:
- Suggest 5-10 internal links that would genuinely help the reader
- Each suggestion must include: the exact phrase in the article to turn into a link, the URL to link to, and a brief reason why
- Only suggest links where the phrase naturally exists in the article text (do not suggest adding new text)
- Prioritize links that provide additional context or deeper information on a topic mentioned in passing
- Do NOT suggest links to the article itself
- The phrase should be 2-6 words that naturally appear in the content
- Prefer linking to FAQ/coverage pages over blog posts when both are relevant

Respond in JSON format:
{
  "suggestions": [
    {
      "phrase": "exact text from the article",
      "url": "/faqs/slug-here/",
      "title": "Title of the target article",
      "reason": "Brief explanation of why this link adds value"
    }
  ]
}`,
          },
          {
            role: "user",
            content: `Here is the article content to analyze:\n\n${articleContent}\n\n---\n\nHere is the catalog of available pages to link to:\n\n${catalog}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[suggest-links] OpenAI error:", errText);
      return NextResponse.json(
        { error: "Failed to generate link suggestions" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    // Parse JSON from the response
    let suggestions = [];
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        suggestions = parsed.suggestions || [];
      }
    } catch (parseErr) {
      console.error("[suggest-links] JSON parse error:", parseErr);
      return NextResponse.json(
        { error: "Failed to parse suggestions" },
        { status: 500 }
      );
    }

    // Validate suggestions - ensure the phrase actually exists in the content
    const validSuggestions = suggestions.filter(
      (s: { phrase: string; url: string; title: string; reason: string }) =>
        s.phrase &&
        s.url &&
        articleContent.toLowerCase().includes(s.phrase.toLowerCase())
    );

    return NextResponse.json({
      suggestions: validSuggestions,
      existingLinkCount: existingLinks.size,
      totalAvailablePages: availableArticles.length,
    });
  } catch (err) {
    console.error("[suggest-links]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
