/**
 * FAQPage Schema Component
 * Renders JSON-LD structured data for FAQ sections.
 * Google uses this to display FAQ rich results in SERPs.
 *
 * Usage:
 *   <FAQSchema faqs={[{ q: "Question?", a: "Answer." }]} />
 *
 * Note: The `a` field must be a plain string (no JSX).
 * If your FAQ answers contain JSX/ReactNode, pass a separate
 * plain-text version for schema purposes.
 */

import React from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
