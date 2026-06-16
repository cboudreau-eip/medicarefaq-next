import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Mutual of Omaha Medicare Part D Plans 2026 | Prescription Drug Coverage",
  description: "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026: formulary, costs, enrollment, and how to compare with other Part D options.",
  openGraph: {
    title: "Mutual of Omaha Medicare Part D Plans 2026",
    description: "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Mutual of Omaha Medicare Part D Plans 2026 | Prescription Drug Coverage",
    description: "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026: formulary, costs, enrollment, and how to compare with other Part D options.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Original Medicare", item: "https://www.medicarefaq.com/original-medicare/" },
      { "@type": "ListItem", position: 3, name: "Part D", item: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d" },
      { "@type": "ListItem", position: 4, name: "Mutual of Omaha" },
    ],
  };

  return <SiteLayout><PageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Mutual of Omaha Medicare Part D Plans 2026",
    "description": "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026: formulary, costs, enrollment, and how to compare with other Part D options.",
    "url": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha/",
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "MedicareFAQ Editorial Team"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.medicarefaq.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Original Medicare",
      "item": "https://www.medicarefaq.com/original-medicare/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Medicare Part D",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Mutual of Omaha Part D",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha/"
    }
    ]
  }
          ])
        }}
      />
      </SiteLayout>;
}
