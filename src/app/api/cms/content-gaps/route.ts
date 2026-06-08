import { NextRequest, NextResponse } from "next/server";
import { blogArticles } from "@/lib/blog-articles-data";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";
import { writingConfig } from "@/lib/writing-config";

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

=== IDEAL CUSTOMER PROFILE (ICP) — USE THIS TO GUIDE PRIORITIES ===
Who They Are: ${writingConfig.icp.description}

PAIN POINTS (topics addressing these get HIGHER priority):
${writingConfig.icp.painPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

GOALS (what they want to achieve):
${writingConfig.icp.goals.map((g, i) => `${i + 1}. ${g}`).join("\n")}

COMMON OBJECTIONS (address these concerns):
${writingConfig.icp.objections.map((o, i) => `${i + 1}. ${o}`).join("\n")}

DECISION TRIGGERS (what prompts them to act):
${writingConfig.icp.decisionTriggers.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Based on this content audit AND the ICP above, identify 10 high-value content gaps — Medicare topics that directly address the ICP's pain points, goals, objections, or decision triggers, AND are NOT adequately covered by the existing articles above.

For each gap, provide:
1. A suggested article title (SEO-optimized, clear, specific)
2. The primary keyword to target
3. A brief rationale (1-2 sentences explaining why this topic matters and what searchers want)
4. Priority level: "high" (directly addresses ICP pain point or decision trigger, high search volume), "medium" (moderate alignment, good fit), or "low" (niche but valuable)
5. Suggested category for the article
6. Which ICP element it addresses — one of: "pain_point", "goal", "objection", or "decision_trigger"
7. The specific ICP item it maps to (quote the exact pain point, goal, objection, or trigger)

Return ONLY valid JSON in this exact format:
[
  {
    "title": "Article Title Here",
    "primaryKeyword": "target keyword",
    "rationale": "Why this matters...",
    "priority": "high",
    "category": "Category Name",
    "icpAlignment": "pain_point",
    "icpDetail": "The specific pain point or goal this addresses"
  }
]

Prioritize topics that:
- DIRECTLY address the ICP's pain points, objections, or decision triggers
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
