import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import BlogPostContent from "./BlogPostContent";
import { blogArticles } from "@/lib/blog-articles-data";

const BASE_URL = "https://medicarefaq-next-nine.vercel.app";

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
  if (!article) return { title: "Not Found" };

  return {
    title: article.seo?.title || article.title,
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

/**
 * Build JSON-LD schemas for a blog article.
 * Injects Article, BreadcrumbList, and FAQPage (if FAQs present) schemas
 * into the static HTML so AI agents and crawlers can read them without JS.
 */
function buildBlogSchema(article: (typeof blogArticles)[0], slug: string) {
  const pageUrl = `${BASE_URL}/blog/${slug}/`;

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      url: pageUrl,
      datePublished: article.date,
      dateModified: article.date,
      author: {
        "@type": "Person",
        name: article.author,
      },
      ...(article.reviewer
        ? {
            reviewedBy: {
              "@type": "Person",
              name: article.reviewer,
            },
          }
        : {}),
      publisher: {
        "@type": "Organization",
        name: "MedicareFAQ",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/wp-content/uploads/medicarefaq-logo.png`,
        },
      },
      ...(article.seo?.ogImage || article.image
        ? {
            image: {
              "@type": "ImageObject",
              url: article.seo?.ogImage || article.image,
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog/` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  ];

  // Add FAQPage schema if the article has FAQ items
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const schemas = buildBlogSchema(article, slug);

  // Combine auto-generated schema with any custom schema (additive)
  const allSchemas = [...schemas, ...(article.customSchema || [])];

  return (
    <SiteLayout>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogPostContent article={article} />
    </SiteLayout>
  );
}
