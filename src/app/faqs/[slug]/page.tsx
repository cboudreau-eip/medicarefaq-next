import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import CoverageArticleContent from "./CoverageArticleContent";
import SimpleFAQContent from "./SimpleFAQContent";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

/**
 * Generates static params for all FAQ article slugs (coverage + simple FAQ).
 * This enables full SSG at build time for all ~402 articles.
 */
export function generateStaticParams() {
  const coverageSlugs = coverageArticles.map((a) => ({ slug: a.slug }));
  const simpleSlugs = simpleFAQArticles.map((a) => ({ slug: a.slug }));
  return [...coverageSlugs, ...simpleSlugs];
}

/**
 * Dynamic metadata for each FAQ article page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check coverage articles first
  const coverageArticle = coverageArticles.find((a) => a.slug === slug);
  if (coverageArticle) {
    return {
      title: `${coverageArticle.seo?.title || coverageArticle.title} | MedicareFAQ`,
      description: coverageArticle.seo?.description || coverageArticle.subtitle,
      alternates: {
        canonical: `https://www.medicarefaq.com/faqs/${slug}/`,
      },
      openGraph: {
        title: coverageArticle.seo?.title || coverageArticle.title,
        description: coverageArticle.seo?.description || coverageArticle.subtitle,
        type: "article",
        url: `https://www.medicarefaq.com/faqs/${slug}/`,
        ...(coverageArticle.seo?.ogImage && { images: [coverageArticle.seo.ogImage] }),
      },
    };
  }

  // Check simple FAQ articles
  const simpleFAQ = simpleFAQArticles.find((a) => a.slug === slug);
  if (simpleFAQ) {
    return {
      title: `${simpleFAQ.seo?.title || simpleFAQ.title} | MedicareFAQ`,
      description: simpleFAQ.seo?.description || simpleFAQ.summary,
      alternates: {
        canonical: `https://www.medicarefaq.com/faqs/${slug}/`,
      },
      openGraph: {
        title: simpleFAQ.seo?.title || simpleFAQ.title,
        description: simpleFAQ.seo?.description || simpleFAQ.summary,
        type: "article",
        url: `https://www.medicarefaq.com/faqs/${slug}/`,
        ...(simpleFAQ.seo?.ogImage && { images: [simpleFAQ.seo.ogImage] }),
      },
    };
  }

  return {
    title: "Article Not Found | MedicareFAQ",
  };
}

/**
 * FAQ Article Page
 * Routes to the correct template based on whether the slug matches
 * a coverage article or a simple FAQ article.
 */
export default async function FAQArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check coverage articles first
  const coverageArticle = coverageArticles.find((a) => a.slug === slug);
  if (coverageArticle) {
    return (
      <SiteLayout>
        <CoverageArticleContent article={coverageArticle} />
      </SiteLayout>
    );
  }

  // Check simple FAQ articles
  const simpleFAQ = simpleFAQArticles.find((a) => a.slug === slug);
  if (simpleFAQ) {
    return (
      <SiteLayout>
        <SimpleFAQContent article={simpleFAQ} />
      </SiteLayout>
    );
  }

  // No article found
  notFound();
}
