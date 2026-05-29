import { NextRequest, NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
import { blogArticles } from "@/lib/blog-articles-data";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

type CMSArticleListItem = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  image: string;
  excerpt: string;
  date: string;
  category: string;
  type: "blog" | "coverage";
  url: string;
};

export async function GET(request: NextRequest) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blog: CMSArticleListItem[] = blogArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      seoTitle: a.seo?.title ?? "",
      seoDescription: a.seo?.description ?? "",
      ogImage: a.seo?.ogImage ?? "",
      image: a.image ?? a.seo?.ogImage ?? "",
      excerpt: a.excerpt ?? a.seo?.description ?? "",
      date: a.date ?? "",
      category: a.category ?? "",
      type: "blog" as const,
      url: `/blog/${a.slug}/`,
    }));

    const coverage: CMSArticleListItem[] = coverageArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      seoTitle: a.seo?.title ?? "",
      seoDescription: a.seo?.description ?? "",
      ogImage: a.seo?.ogImage ?? "",
      image: a.seo?.ogImage ?? "",
      excerpt: a.subtitle ?? a.quickAnswer?.text ?? a.seo?.description ?? "",
      date: a.dateUpdated ?? "",
      category: a.category ?? "",
      type: "coverage" as const,
      url: `/faqs/${a.slug}/`,
    }));

    // Sort by date (most recent first), fall back to alphabetical for articles without dates
    const all = [...blog, ...coverage].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      if (dateA && dateB) return dateB - dateA;
      if (dateA) return -1;
      if (dateB) return 1;
      return a.title.localeCompare(b.title);
    });

    return NextResponse.json({ articles: all, total: all.length });
  } catch (err) {
    console.error("[CMS articles]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
