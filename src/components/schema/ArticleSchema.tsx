/**
 * Article Schema Component
 * Renders JSON-LD structured data for editorial/informational articles.
 * Signals to Google that the page is authoritative content with
 * a known author, publisher, and publication date.
 *
 * Usage:
 *   <ArticleSchema
 *     title="Medicare Annual Changes for 2026"
 *     description="A comprehensive guide to Medicare cost and coverage changes."
 *     url="https://www.medicarefaq.com/enrollment/annual-changes"
 *     datePublished="2025-10-15"
 *     dateModified="2026-01-10"
 *     authorName="David Haass"
 *     authorUrl="https://www.medicarefaq.com/about"
 *     imageUrl="https://www.medicarefaq.com/og-image.jpg"  // optional
 *   />
 */

import React from "react";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  imageUrl?: string;
}

export default function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  imageUrl,
}: ArticleSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      url: "https://www.medicarefaq.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png",
      },
    },
    ...(imageUrl
      ? {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
