import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/cms-auth";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  if (verifySessionToken(pw)) return true;
  return pw === CMS_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, excerpt, category, keyTakeaways, candidates } = body;

    // candidates: array of { slug, title, excerpt } from the articles API
    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ relatedSlugs: [] });
    }

    if (!OPENAI_API_KEY) {
      // Fallback: return first 4 candidates from same category or just first 4
      return NextResponse.json({ relatedSlugs: candidates.slice(0, 4).map((c: { slug: string }) => c.slug) });
    }

    // Build context about the new article
    const articleContext = [
      `Title: "${title}"`,
      category ? `Category: ${category}` : "",
      excerpt ? `Excerpt: ${excerpt}` : "",
      keyTakeaways?.length > 0 ? `Key points: ${keyTakeaways.slice(0, 3).join("; ")}` : "",
    ].filter(Boolean).join("\n");

    // Build the candidate list (limit to 60 to keep prompt manageable)
    const candidateList = candidates
      .slice(0, 60)
      .map((c: { slug: string; title: string; excerpt?: string }, i: number) =>
        `${i + 1}. slug: "${c.slug}" | title: "${c.title}"${c.excerpt ? ` | excerpt: "${c.excerpt.slice(0, 100)}"` : ""}`
      )
      .join("\n");

    const prompt = `You are helping select related articles for a Medicare/healthcare blog.

New article being published:
${articleContext}

Available articles to choose from:
${candidateList}

Select exactly 4 articles that are most topically relevant and useful to readers of the new article. Prioritize articles that:
- Cover related Medicare topics (same plan type, same enrollment period, complementary coverage areas)
- Would naturally be the "next thing to read" after this article
- Are NOT about the exact same topic (avoid duplicates)

Return ONLY a JSON array of exactly 4 slug strings, nothing else. Example: ["slug-one", "slug-two", "slug-three", "slug-four"]`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      // Fallback to first 4
      return NextResponse.json({ relatedSlugs: candidates.slice(0, 4).map((c: { slug: string }) => c.slug) });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim() ?? "";

    // Parse the JSON array from the response
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) {
      return NextResponse.json({ relatedSlugs: candidates.slice(0, 4).map((c: { slug: string }) => c.slug) });
    }

    const slugs: string[] = JSON.parse(match[0]);
    // Validate that returned slugs exist in candidates
    const validSlugs = candidates.map((c: { slug: string }) => c.slug);
    const filtered = slugs.filter((s) => validSlugs.includes(s)).slice(0, 4);

    return NextResponse.json({ relatedSlugs: filtered });
  } catch (err) {
    console.error("suggest-related error:", err);
    return NextResponse.json({ relatedSlugs: [] });
  }
}
