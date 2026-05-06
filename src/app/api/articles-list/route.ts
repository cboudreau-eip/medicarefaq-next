import { NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
import { blogArticles } from "@/lib/blog-articles-data";

/**
 * GET /api/articles-list
 *
 * Returns a lightweight list of all articles (coverage + blog) for use in
 * the admin video-scripts page article picker.
 */
export async function GET() {
  const coverage = coverageArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: a.dateUpdated,
    author: a.author.name,
    excerpt: a.quickAnswer?.text ?? a.subtitle ?? "",
    type: "coverage" as const,
    url: `/faqs/${a.slug}/`,
  }));

  const blog = blogArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: a.date,
    author: a.author,
    excerpt: a.excerpt ?? "",
    type: "blog" as const,
    url: `/blog/${a.slug}/`,
  }));

  const all = [...coverage, ...blog].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return NextResponse.json({ articles: all, total: all.length });
}
