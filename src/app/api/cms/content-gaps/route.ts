import { NextRequest, NextResponse } from "next/server";
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
  return pw === CMS_PASSWORD;
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
    const focusArea = (body as { focusArea?: string }).focusArea || "all";

    // Gather all existing article titles and slugs grouped by category
    const allArticles: { title: string; slug: string; category: string; type: string }[] = [];

    blogArticles.forEach((a) => {
      allArticles.push({ title: a.title, slug: a.slug, category: a.category || "General", type: "blog" });
    });

    coverageArticles.forEach((a) => {
      allArticles.push({ title: a.title, slug: a.slug, category: a.category || "Coverage", type: "coverage" });
    });

    simpleFAQArticles.forEach((a) => {
      allArticles.push({ title: a.title, slug: a.slug, category: a.category || "FAQ", type: "faq" });
    });

    // Group by category for the AI prompt
    const byCategory: Record<string, string[]> = {};
    allArticles.forEach((a) => {
      const cat = a.category || "Uncategorized";
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(a.title);
    });

    const categoryBreakdown = Object.entries(byCategory)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([cat, titles]) => `${cat} (${titles.length} articles): ${titles.slice(0, 8).join(", ")}${titles.length > 8 ? "..." : ""}`)
      .join("\n");

    const focusInstruction = focusArea !== "all"
      ? `\n\nFocus specifically on gaps in the "${focusArea}" area.`
      : "";

    const prompt = `You are a Medicare content strategist analyzing a website's content library to find gaps and opportunities.

The site currently has ${allArticles.length} articles across these categories:
${categoryBreakdown}

Full list of all ${allArticles.length} article titles:
${allArticles.map((a) => `- ${a.title}`).join("\n")}
${focusInstruction}

Based on this content audit, identify 10 high-value content gaps — Medicare topics that are commonly searched by seniors, caregivers, and beneficiaries but are NOT adequately covered by the existing articles above.

For each gap, provide:
1. A suggested article title (SEO-optimized, clear, specific)
2. The primary keyword to target
3. A brief rationale (1-2 sentences explaining why this topic matters and what searchers want)
4. Priority level: "high" (high search volume, directly relevant), "medium" (moderate volume, good fit), or "low" (niche but valuable)
5. Suggested category for the article

Return ONLY valid JSON in this exact format:
[
  {
    "title": "Article Title Here",
    "primaryKeyword": "target keyword",
    "rationale": "Why this matters...",
    "priority": "high",
    "category": "Category Name"
  }
]

Prioritize topics that:
- Have clear search intent (people actively searching for answers)
- Are underserved by the current library
- Are timely or evergreen (2025-2026 relevant)
- Would drive organic traffic from seniors or their caregivers
- Cover practical, actionable information (not just definitions)`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `OpenAI API error: ${res.status}`, details: errText },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim() ?? "";

    // Parse the JSON array
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) {
      return NextResponse.json(
        { error: "Failed to parse AI response", rawOutput: content },
        { status: 422 }
      );
    }

    const suggestions = JSON.parse(match[0]);

    return NextResponse.json({
      success: true,
      totalArticles: allArticles.length,
      categories: Object.keys(byCategory).length,
      suggestions,
    });
  } catch (err) {
    console.error("content-gaps error:", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
