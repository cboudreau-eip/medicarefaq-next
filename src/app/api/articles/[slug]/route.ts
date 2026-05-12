import { NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
import { blogArticles } from "@/lib/blog-articles-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicarefaq.com";

/**
 * GET /api/articles/[slug]
 *
 * Returns a structured, machine-readable JSON representation of any article
 * (coverage, blog, or FAQ) identified by its slug.
 *
 * Designed for AI agents, crawlers, and programmatic consumers that need
 * clean structured data without parsing HTML or executing JavaScript.
 *
 * Response shape:
 * {
 *   type: "coverage" | "blog" | "faq",
 *   slug: string,
 *   url: string,
 *   title: string,
 *   description: string,
 *   author: string,
 *   reviewer: string,
 *   dates: { published: string, modified: string },
 *   category: string,
 *   readTime: string,
 *   image: string | null,
 *   summary: string,
 *   faqs: { question: string, answer: string }[],
 *   relatedSlugs: string[],
 *   relatedUrls: string[],
 * }
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1. Check coverage articles
  const coverage = coverageArticles.find((a) => a.slug === slug);
  if (coverage) {
    return NextResponse.json({
      type: "coverage",
      slug: coverage.slug,
      url: `${BASE_URL}/faqs/${coverage.slug}/`,
      title: coverage.title,
      description: coverage.seo?.description || coverage.subtitle || "",
      author: coverage.author?.name || "",
      reviewer: coverage.reviewer?.name || "",
      dates: {
        published: coverage.dateUpdated || "",
        modified: coverage.dateUpdated || "",
      },
      category: coverage.category,
      readTime: coverage.readTime || "",
      image: coverage.seo?.ogImage || null,
      summary: coverage.quickAnswer?.text || coverage.subtitle || "",
      faqs: (coverage.faqs || []).map((f) => ({
        question: f.question,
        answer: f.answer,
      })),
      relatedSlugs: coverage.relatedTopics?.map((t) => t.slug) || [],
      relatedUrls:
        coverage.relatedTopics?.map((t) => `${BASE_URL}/faqs/${t.slug}/`) || [],
    });
  }

  // 2. Check blog articles
  const blog = blogArticles.find((a) => a.slug === slug);
  if (blog) {
    return NextResponse.json({
      type: "blog",
      slug: blog.slug,
      url: `${BASE_URL}/blog/${blog.slug}/`,
      title: blog.title,
      description: blog.seo?.description || blog.excerpt || "",
      author: blog.author || "",
      reviewer: blog.reviewer || "",
      dates: {
        published: blog.date || "",
        modified: blog.date || "",
      },
      category: blog.category,
      readTime: blog.readTime || "",
      image: blog.seo?.ogImage || blog.image || null,
      summary: blog.excerpt || "",
      faqs: (blog.faqs || []).map((f) => ({
        question: f.question,
        answer: f.answer,
      })),
      relatedSlugs: blog.relatedSlugs || [],
      relatedUrls: (blog.relatedSlugs || []).map(
        (s) => `${BASE_URL}/faqs/${s}/`
      ),
    });
  }

  // 3. Check simple FAQ articles
  const faq = simpleFAQArticles.find((a) => a.slug === slug);
  if (faq) {
    // Extract FAQ items from richSections if present
    const faqItems =
      faq.richSections
        ?.filter((s) => s.type === "faq")
        .flatMap((s) => ("faqs" in s ? s.faqs || [] : [])) ?? [];

    return NextResponse.json({
      type: "faq",
      slug: faq.slug,
      url: `${BASE_URL}/faqs/${faq.slug}/`,
      title: faq.title,
      description: faq.seo?.description || faq.summary || "",
      author: faq.author || "",
      reviewer: faq.reviewer || "",
      dates: {
        published: faq.datePublished || faq.dateUpdated || "",
        modified: faq.dateUpdated || "",
      },
      category: faq.category,
      readTime: faq.readTime || "",
      image: faq.seo?.ogImage || null,
      summary: faq.summary || "",
      faqs: faqItems.map((f) => ({
        question: f.question,
        answer: f.answer,
      })),
      relatedSlugs: faq.relatedSlugs || [],
      relatedUrls: (faq.relatedSlugs || []).map(
        (s) => `${BASE_URL}/faqs/${s}/`
      ),
    });
  }

  // Not found
  return NextResponse.json(
    { error: "Article not found", slug },
    { status: 404 }
  );
}
