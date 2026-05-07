import { NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
import { blogArticles } from "@/lib/blog-articles-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

type ArticleListItem = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  type: "coverage" | "blog" | "faq";
  url: string;
};

/**
 * GET /api/articles-list
 *
 * Returns a lightweight list of all articles (coverage + blog + simple FAQ)
 * for use in the admin video-scripts page article picker.
 */
export async function GET() {
  const coverage: ArticleListItem[] = coverageArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: a.dateUpdated,
    author: a.author.name,
    excerpt: a.quickAnswer?.text ?? a.subtitle ?? "",
    type: "coverage",
    url: `/faqs/${a.slug}/`,
  }));

  const blog: ArticleListItem[] = blogArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: a.date,
    author: a.author,
    excerpt: a.excerpt ?? "",
    type: "blog",
    url: `/blog/${a.slug}/`,
  }));

  const faq: ArticleListItem[] = simpleFAQArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: a.dateUpdated ?? "",
    author: a.author,
    excerpt: a.summary ?? "",
    type: "faq",
    url: `/faqs/${a.slug}/`,
  }));

  // Deduplicate by slug (coverage takes priority over faq for same slug)
  const slugsSeen = new Set<string>();
  const all: ArticleListItem[] = [];
  for (const article of [...coverage, ...blog, ...faq]) {
    if (!slugsSeen.has(article.slug)) {
      slugsSeen.add(article.slug);
      all.push(article);
    }
  }

  all.sort((a, b) => a.title.localeCompare(b.title));

  return NextResponse.json({ articles: all, total: all.length });
}
