/**
 * BreadcrumbList Schema Component
 * Renders JSON-LD structured data for breadcrumb navigation.
 * Google uses this to display breadcrumb trails in SERPs
 * instead of raw URLs.
 *
 * Usage:
 *   <BreadcrumbSchema
 *     items={[
 *       { name: "Home", url: "https://www.medicarefaq.com/" },
 *       { name: "Enrollment", url: "https://www.medicarefaq.com/enrollment" },
 *       { name: "Annual Changes" },  // last item has no url (current page)
 *     ]}
 *   />
 */

import React from "react";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
