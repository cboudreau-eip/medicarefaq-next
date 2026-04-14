import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import CoverageArticleContent from "./CoverageArticleContent";
import SimpleFAQContent from "./SimpleFAQContent";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

const BASE_URL = "https://www.medicarefaq.com";

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
        canonical: `${BASE_URL}/faqs/${slug}/`,
      },
      openGraph: {
        title: coverageArticle.seo?.title || coverageArticle.title,
        description: coverageArticle.seo?.description || coverageArticle.subtitle,
        type: "article",
        url: `${BASE_URL}/faqs/${slug}/`,
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
        canonical: `${BASE_URL}/faqs/${slug}/`,
      },
      openGraph: {
        title: simpleFAQ.seo?.title || simpleFAQ.title,
        description: simpleFAQ.seo?.description || simpleFAQ.summary,
        type: "article",
        url: `${BASE_URL}/faqs/${slug}/`,
        ...(simpleFAQ.seo?.ogImage && { images: [simpleFAQ.seo.ogImage] }),
      },
    };
  }

  return {
    title: "Article Not Found | MedicareFAQ",
  };
}

/**
 * Build Article JSON-LD for a coverage article
 */
function buildCoverageArticleSchema(article: (typeof coverageArticles)[0], slug: string) {
  const pageUrl = `${BASE_URL}/faqs/${slug}/`;
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.seo?.title || article.title,
      description: article.seo?.description || article.subtitle,
      url: pageUrl,
      datePublished: article.dateUpdated,
      dateModified: article.dateUpdated,
      author: {
        "@type": "Person",
        name: article.author.name,
      },
      publisher: {
        "@type": "Organization",
        name: "MedicareFAQ",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/wp-content/uploads/medicarefaq-logo.png`,
        },
      },
      ...(article.seo?.ogImage
        ? { image: { "@type": "ImageObject", url: article.seo.ogImage } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "FAQs", item: `${BASE_URL}/faqs/` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  // Add FAQPage schema if there are FAQ items
  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}

/**
 * Build Article JSON-LD for a simple FAQ article
 */
function buildSimpleFAQSchema(article: (typeof simpleFAQArticles)[0], slug: string) {
  const pageUrl = `${BASE_URL}/faqs/${slug}/`;

  // Extract FAQ items from richSections if present
  const faqItems =
    article.richSections
      ?.filter((s) => s.type === "faq")
      .flatMap((s) => s.faqs || []) ?? [];

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.seo?.title || article.title,
      description: article.seo?.description || article.summary,
      url: pageUrl,
      datePublished: article.datePublished || article.dateUpdated,
      dateModified: article.dateUpdated,
      author: {
        "@type": "Person",
        name: article.author,
        ...(article.authorUrl ? { url: `${BASE_URL}${article.authorUrl}` } : {}),
      },
      publisher: {
        "@type": "Organization",
        name: "MedicareFAQ",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/wp-content/uploads/medicarefaq-logo.png`,
        },
      },
      ...(article.seo?.ogImage
        ? { image: { "@type": "ImageObject", url: article.seo.ogImage } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "FAQs", item: `${BASE_URL}/faqs/` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  if (faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}

/**
 * FAQ Article Page
 * Routes to the correct template based on whether the slug matches
 * a coverage article or a simple FAQ article.
 * Schema is injected server-side so crawlers can read it in the static HTML.
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
    const schemas = buildCoverageArticleSchema(coverageArticle, slug);
    return (
      <SiteLayout>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <CoverageArticleContent article={coverageArticle} />
      </SiteLayout>
    );
  }

  // Check simple FAQ articles
  const simpleFAQ = simpleFAQArticles.find((a) => a.slug === slug);
  if (simpleFAQ) {
    const schemas = buildSimpleFAQSchema(simpleFAQ, slug);
    return (
      <SiteLayout>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <SimpleFAQContent article={simpleFAQ} />
      </SiteLayout>
    );
  }

  // No article found
  notFound();
}
