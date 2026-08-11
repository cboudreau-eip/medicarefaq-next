import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import BlogPostContent from "./BlogPostContent";
import { blogArticles } from "@/lib/blog-articles-data";

const BASE_URL = "https://www.medicarefaq.com";

/* ─── Author URL lookup ─── */
const AUTHOR_URLS: Record<string, string> = {
  "David Haass": `${BASE_URL}/about-us/david-haass`,
  "Jagger Esch": `${BASE_URL}/about-us/jagger-esch`,
  "Ashlee Zareczny": `${BASE_URL}/meet-the-editorial-team`,
};

const AUTHOR_TITLES: Record<string, string> = {
  "David Haass": "CTO & Co-Founder, MedicareFAQ",
  "Jagger Esch": "Licensed Insurance Agent",
  "Ashlee Zareczny": "Compliance & Editorial Manager",
};

/* ─── Author sameAs links for standalone Person schema (E-E-A-T) ─── */
const AUTHOR_SAME_AS: Record<string, string[]> = {
  "David Haass": [
    "https://councils.forbes.com/profile/David-Haass-CTO-Co-Founder-MedicareFAQ/f8a1c2d3",
    "https://www.linkedin.com/in/david-haass/",
  ],
  "Jagger Esch": [
    "https://www.linkedin.com/in/jagger-esch/",
  ],
};

/* ─── Parse human-readable date to ISO 8601 ─── */
function toISO(dateStr: string): string {
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
 * Generates static params for all blog article slugs.
 * Enables full SSG at build time for all blog posts.
 */
export function generateStaticParams() {
  return blogArticles.filter((a) => !a.draft).map((a) => ({ slug: a.slug }));
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
  if (!article || article.draft) return { title: "Not Found" };

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    alternates: {
      canonical: article.seo?.canonical || `${BASE_URL}/blog/${slug}/`,
    },
    openGraph: {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      type: "article",
      url: article.seo?.canonical || `${BASE_URL}/blog/${slug}/`,
      ...(article.seo?.ogImage
        ? { images: [{ url: article.seo.ogImage }] }
        : article.image
        ? { images: [{ url: article.image }] }
        : {}),
    },
  };
}

/**
 * Build a single @graph JSON-LD for a blog article.
 * Includes MedicalWebPage, Article, BreadcrumbList, FAQPage, Organization.
 */
function buildBlogSchema(article: (typeof blogArticles)[0], slug: string) {
  const pageUrl = article.seo?.canonical || `${BASE_URL}/blog/${slug}/`;
  const datePublished = toISO(article.date);
  const dateModified = toISO(article.dateUpdated || article.date);
  const imageUrl = article.seo?.ogImage || article.image || DEFAULT_IMAGE;

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
      description: article.seo?.description || article.excerpt,
      url: pageUrl,
      datePublished,
      dateModified,
      image: { "@type": "ImageObject", url: imageUrl },
      author: {
        "@type": "Person",
        name: article.author,
        url: AUTHOR_URLS[article.author] || `${BASE_URL}/about-us`,
        jobTitle: AUTHOR_TITLES[article.author] || "Medicare Expert",
      },
      ...(article.reviewer
        ? {
            reviewedBy: {
              "@type": "Person",
              name: article.reviewer,
              url: AUTHOR_URLS[article.reviewer] || `${BASE_URL}/meet-the-editorial-team`,
              jobTitle: AUTHOR_TITLES[article.reviewer] || "Compliance Manager",
            },
          }
        : {}),
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog/` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  // Add FAQPage schema if the article has FAQ items
  // Collect FAQs from top-level faqs property OR from sections with type "faq"
  const allFaqs = article.faqs && article.faqs.length > 0
    ? article.faqs
    : article.sections
        .filter((s) => s.type === "faq" && s.faqs && s.faqs.length > 0)
        .flatMap((s) => s.faqs || []);

  if (allFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  // Add standalone Person schema for the author (E-E-A-T signal)
  if (article.author) {
    const authorSlug = article.author.toLowerCase().replace(/\s+/g, "-");
    graph.push({
      "@type": "Person",
      "@id": `${BASE_URL}/about-us/${authorSlug}#person`,
      name: article.author,
      url: AUTHOR_URLS[article.author] || `${BASE_URL}/about-us`,
      jobTitle: AUTHOR_TITLES[article.author] || "Medicare Expert",
      worksFor: { "@id": `${BASE_URL}/#organization` },
      ...(AUTHOR_SAME_AS[article.author] ? { sameAs: AUTHOR_SAME_AS[article.author] } : {}),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article || article.draft) notFound();

  const schema = buildBlogSchema(article, slug);

  // Combine auto-generated @graph with any custom schema (additive, separate scripts)
  const customSchemas = article.customSchema || [];

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {customSchemas.map((cs: object, i: number) => (
        <script
          key={`custom-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cs) }}
        />
      ))}
      <BlogPostContent article={article} />
    </SiteLayout>
  );
}
