import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import BlogPostContent from "./BlogPostContent";
import { blogArticles } from "@/lib/blog-articles-data";

/**
 * Generates static params for all blog article slugs.
 * Enables full SSG at build time for all blog posts.
 */
export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

/**
 * Dynamic metadata for each blog post page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Not Found | MedicareFAQ" };

  return {
    title: article.seo?.title || `${article.title} | MedicareFAQ`,
    description: article.seo?.description || article.excerpt,
    alternates: {
      canonical: article.seo?.canonical || `https://www.medicarefaq.com/blog/${slug}/`,
    },
    openGraph: {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      type: "article",
      url: article.seo?.canonical || `https://www.medicarefaq.com/blog/${slug}/`,
      ...(article.seo?.ogImage
        ? { images: [{ url: article.seo.ogImage }] }
        : article.image
        ? { images: [{ url: article.image }] }
        : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <SiteLayout>
      <BlogPostContent article={article} />
    </SiteLayout>
  );
}
