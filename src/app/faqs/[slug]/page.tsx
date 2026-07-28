import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import CoverageArticleContent from "./CoverageArticleContent";
import SimpleFAQContent from "./SimpleFAQContent";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";
import { blogArticles } from "@/lib/blog-articles-data";

/* Blog slug set computed server-side at build time — zero client bundle cost */
const blogSlugs = new Set(blogArticles.map((a) => a.slug));

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
      title: coverageArticle.seo?.title || coverageArticle.title,
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
      title: simpleFAQ.seo?.title || simpleFAQ.title,
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
    title: "Article not Found",
  };
}

/* ─── Author URL lookup ─── */
const AUTHOR_URLS: Record<string, string> = {
  "David Haass": `${BASE_URL}/about-us`,
  "Jagger Esch": `${BASE_URL}/about-us/jagger-esch`,
  "Ashlee Zareczny": `${BASE_URL}/meet-the-editorial-team`,
};

const AUTHOR_TITLES: Record<string, string> = {
  "David Haass": "Licensed Medicare Expert",
  "Jagger Esch": "Licensed Insurance Agent",
  "Ashlee Zareczny": "Compliance & Editorial Manager",
};

/* ─── Parse human-readable date to ISO 8601 ─── */
function toISO(dateStr: string): string {
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr.slice(0, 10);
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toISOString().slice(0, 10);
}

/* ─── Shared Organization entity ─── */
const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "MedicareFAQ",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/medicarefaq-logo.png`,
    width: 600,
    height: 60,
  },
  sameAs: [
    "https://www.facebook.com/MedicareFAQ",
    "https://www.youtube.com/@MedicareFAQ",
    "https://www.linkedin.com/company/medicarefaq",
  ],
};

/* ─── Default fallback image ─── */
const DEFAULT_IMAGE = `${BASE_URL}/images/medicarefaq-cover.jpg`;

/**
 * Build a single @graph JSON-LD for a coverage article.
 * Includes MedicalWebPage, Article, BreadcrumbList, FAQPage, Organization.
 */
function buildCoverageArticleSchema(article: (typeof coverageArticles)[0], slug: string) {
  const pageUrl = `${BASE_URL}/faqs/${slug}/`;
  const datePublished = toISO(article.dateUpdated);
  const dateModified = toISO(article.lastReviewed || article.dateUpdated);
  const imageUrl = article.seo?.ogImage || DEFAULT_IMAGE;

  const graph: object[] = [
    ORGANIZATION,
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "MedicareFAQ",
      url: BASE_URL,
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "MedicalWebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: article.seo?.title || article.title,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      lastReviewed: dateModified,
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      mainEntityOfPage: { "@id": pageUrl },
      headline: article.seo?.title || article.title,
      description: article.seo?.description || article.subtitle,
      url: pageUrl,
      datePublished,
      dateModified,
      image: { "@type": "ImageObject", url: imageUrl },
      author: {
        "@type": "Person",
        name: article.author.name,
        url: AUTHOR_URLS[article.author.name] || `${BASE_URL}/about-us`,
        jobTitle: AUTHOR_TITLES[article.author.name] || "Medicare Expert",
      },
      reviewedBy: {
        "@type": "Person",
        name: article.reviewer.name,
        url: AUTHOR_URLS[article.reviewer.name] || `${BASE_URL}/meet-the-editorial-team`,
        jobTitle: AUTHOR_TITLES[article.reviewer.name] || "Compliance Manager",
      },
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "FAQs", item: `${BASE_URL}/faqs/` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  if (article.faqs && article.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
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

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * Build a single @graph JSON-LD for a simple FAQ article.
 */
function buildSimpleFAQSchema(article: (typeof simpleFAQArticles)[0], slug: string) {
  const pageUrl = `${BASE_URL}/faqs/${slug}/`;
  const datePublished = toISO(article.datePublished || article.dateUpdated);
  const dateModified = toISO(article.dateUpdated);
  const imageUrl = article.seo?.ogImage || DEFAULT_IMAGE;

  const authorName = article.author;
  const reviewerName = article.reviewer;

  const faqItems =
    article.richSections
      ?.filter((s) => s.type === "faq")
      .flatMap((s) => s.faqs || []) ?? [];

  const graph: object[] = [
    ORGANIZATION,
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "MedicareFAQ",
      url: BASE_URL,
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "MedicalWebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: article.seo?.title || article.title,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      lastReviewed: dateModified,
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      mainEntityOfPage: { "@id": pageUrl },
      headline: article.seo?.title || article.title,
      description: article.seo?.description || article.summary,
      url: pageUrl,
      datePublished,
      dateModified,
      image: { "@type": "ImageObject", url: imageUrl },
      author: {
        "@type": "Person",
        name: authorName,
        url: article.authorUrl ? `${BASE_URL}${article.authorUrl}` : (AUTHOR_URLS[authorName] || `${BASE_URL}/about-us`),
        jobTitle: article.authorTitle || AUTHOR_TITLES[authorName] || "Medicare Expert",
      },
      reviewedBy: {
        "@type": "Person",
        name: reviewerName,
        url: article.reviewerUrl ? `${BASE_URL}${article.reviewerUrl}` : (AUTHOR_URLS[reviewerName] || `${BASE_URL}/meet-the-editorial-team`),
        jobTitle: article.reviewerTitle || AUTHOR_TITLES[reviewerName] || "Compliance Manager",
      },
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "FAQs", item: `${BASE_URL}/faqs/` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
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

  return { "@context": "https://schema.org", "@graph": graph };
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
    const schema = buildCoverageArticleSchema(coverageArticle, slug);
    return (
      <SiteLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <CoverageArticleContent article={coverageArticle} />
      </SiteLayout>
    );
  }

  // Check simple FAQ articles
  const simpleFAQ = simpleFAQArticles.find((a) => a.slug === slug);
  if (simpleFAQ) {
    const schema = buildSimpleFAQSchema(simpleFAQ, slug);
    return (
      <SiteLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SimpleFAQContent article={simpleFAQ} blogSlugs={blogSlugs} />
      </SiteLayout>
    );
  }

  // No article found
  notFound();
}
