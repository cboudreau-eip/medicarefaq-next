import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";
import { blogArticles } from "@/lib/blog-articles-data";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw =
    request.headers.get("x-cms-password") ??
    request.headers.get("authorization")?.replace("Bearer ", "") ??
    "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

interface ArticleInfo {
  title: string;
  slug: string;
  path: string;
  type: string;
  category: string;
  sections?: { content?: string }[];
}

function getAllArticles(): ArticleInfo[] {
  const all: ArticleInfo[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blogArticles.forEach((a: any) => {
    all.push({
      title: a.title as string,
      slug: a.slug as string,
      path: `/blog/${a.slug}`,
      type: "blog",
      category: (a.category as string) || "General",
      sections: a.sections as { content?: string }[] | undefined,
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverageArticles.forEach((a: any) => {
    all.push({
      title: a.title as string,
      slug: a.slug as string,
      path: `/faqs/${a.slug}`,
      type: "coverage",
      category: (a.category as string) || "Coverage",
      sections: a.sections as { content?: string }[] | undefined,
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  simpleFAQArticles.forEach((a: any) => {
    all.push({
      title: a.title as string,
      slug: a.slug as string,
      path: `/faqs/${a.slug}`,
      type: "faq",
      category: (a.category as string) || "FAQ",
      sections: a.sections as { content?: string }[] | undefined,
    });
  });

  return all;
}

function getArticleText(article: ArticleInfo): string {
  if (!article.sections || !Array.isArray(article.sections)) return "";
  return article.sections
    .map((s) => s.content || "")
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExistingLinks(article: ArticleInfo): string[] {
  if (!article.sections || !Array.isArray(article.sections)) return [];
  const html = article.sections.map((s) => s.content || "").join(" ");
  const hrefMatches = html.match(/href="([^"]+)"/g) || [];
  return hrefMatches.map((m) => m.replace('href="', "").replace('"', ""));
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { articleSlug, batchSize = 5 } = body as { articleSlug?: string; batchSize?: number };

    const allArticles = getAllArticles();

    // Build a lookup of all available link targets
    const linkTargets = allArticles
      .map((a) => `${a.title} → ${a.path}`)
      .join("\n");

    // If a specific article is provided, scan just that one
    // Otherwise, pick a batch of articles that have content
    let articlesToScan: ArticleInfo[];
    if (articleSlug) {
      const found = allArticles.find((a) => a.slug === articleSlug);
      if (!found) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }
      articlesToScan = [found];
    } else {
      // Pick articles with content, randomized for variety
      const withContent = allArticles.filter(
        (a) => a.sections && a.sections.length > 0
      );
      const shuffled = withContent.sort(() => Math.random() - 0.5);
      articlesToScan = shuffled.slice(0, Math.min(batchSize, 10));
    }

    const opportunities: {
      sourceTitle: string;
      sourceSlug: string;
      sourcePath: string;
      anchorText: string;
      targetTitle: string;
      targetPath: string;
      reason: string;
    }[] = [];

    // Process each article
    for (const article of articlesToScan) {
      const text = getArticleText(article);
      if (!text || text.length < 100) continue;

      const existingLinks = getExistingLinks(article);
      const existingPaths = existingLinks.filter((l) => l.startsWith("/"));

      // Truncate text to avoid token limits
      const truncatedText = text.slice(0, 3000);

      const prompt = `You are an SEO internal linking specialist. Analyze this article and find opportunities to add internal links to other pages on the same website.

SOURCE ARTICLE: "${article.title}" (${article.path})
ARTICLE CONTENT (excerpt):
${truncatedText}

EXISTING INTERNAL LINKS IN THIS ARTICLE:
${existingPaths.length > 0 ? existingPaths.join("\n") : "(none)"}

AVAILABLE PAGES TO LINK TO:
${linkTargets}

Find 2-4 places in the article where a phrase or concept naturally mentions a topic covered by another page, but does NOT already link to it. The anchor text should be a natural phrase that already exists (or could naturally exist) in the article content.

Rules:
- Do NOT suggest linking to pages that are already linked in the article
- Do NOT suggest linking to the article itself
- The anchor text must be a natural phrase, not forced
- Prioritize high-value links (topically relevant, helpful for readers)

Return ONLY valid JSON array:
[
  {
    "anchorText": "natural phrase from the article",
    "targetTitle": "Title of the page to link to",
    "targetPath": "/path/to/target",
    "reason": "Brief reason this link adds value"
  }
]

If no good opportunities exist, return an empty array: []`;

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1500,
            temperature: 0.3,
          }),
        });

        if (!res.ok) continue;

        const data = await res.json();
        const content = data.choices?.[0]?.message?.content?.trim() ?? "";
        const match = content.match(/\[[\s\S]*\]/);
        if (!match) continue;

        const suggestions = JSON.parse(match[0]);
        for (const s of suggestions) {
          // Verify the target path actually exists
          const targetExists = allArticles.some((a) => a.path === s.targetPath);
          if (!targetExists) continue;
          // Verify it's not already linked
          if (existingPaths.includes(s.targetPath)) continue;

          opportunities.push({
            sourceTitle: article.title,
            sourceSlug: article.slug,
            sourcePath: article.path,
            anchorText: s.anchorText,
            targetTitle: s.targetTitle,
            targetPath: s.targetPath,
            reason: s.reason,
          });
        }
      } catch {
        // Skip this article if AI call fails
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      scannedCount: articlesToScan.length,
      totalArticles: allArticles.length,
      opportunities,
    });
  } catch (err) {
    console.error("link-scanner error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
