import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How to Apply for Medicare Part B | Step-by-Step Guide",
  description: "Learn how to apply for Medicare Part B: online, by phone, or in person. Understand enrollment periods, required documents, and what to do if you missed your window.",
  openGraph: {
    title: "How to Apply for Medicare Part B | Step-by-Step Guide",
    description: "Learn how to apply for Medicare Part B: online, by phone, or in person.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Apply for Medicare Part B | Step-by-Step Guide",
    description: "Learn how to apply for Medicare Part B: online, by phone, or in person. Understand enrollment periods, required documents, and what to do if you missed your window.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Original Medicare", item: "https://www.medicarefaq.com/original-medicare/" },
      { "@type": "ListItem", position: 3, name: "Medicare Parts", item: "https://www.medicarefaq.com/original-medicare/medicare-parts/" },
      { "@type": "ListItem", position: 4, name: "Apply for Part B" },
    ],
  };

  return <SiteLayout><PageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Apply for Medicare Part B",
    "description": "Learn how to apply for Medicare Part B: online, by phone, or in person. Step-by-step instructions for new applicants and those adding Part B after employer coverage.",
    "url": "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b/",
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png"
      }
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
      "name": "Medicare Parts",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Apply for Part B",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b/"
    }
    ]
  }
          ])
        }}
      />
      </SiteLayout>;
}
