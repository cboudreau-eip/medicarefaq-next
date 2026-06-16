import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part B (Medical Insurance) 2026 | Premiums, Coverage & Enrollment",
  description: "Complete guide to Medicare Part B: 2026 premium of $202.90/month, what it covers, IRMAA surcharges, enrollment periods, and the late enrollment penalty.",
  openGraph: {
    title: "Medicare Part B (Medical Insurance) 2026 | Premiums, Coverage & Enrollment",
    description: "Complete guide to Medicare Part B: 2026 premium of $202.90/month, what it covers, IRMAA surcharges, enrollment periods, and the late enrollment penalty.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Part B (Medical Insurance) 2026 | Premiums, Coverage & Enrollment",
    description: "Complete guide to Medicare Part B: 2026 premium of $202.90/month, what it covers, IRMAA surcharges, enrollment periods, and the late enrollment penalty.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b",
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
      { "@type": "ListItem", position: 3, name: "Medicare Parts", item: "https://www.medicarefaq.com/original-medicare/medicare-parts/" },
      { "@type": "ListItem", position: 4, name: "Part B" },
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
    "headline": "What Is Medicare Part B? Medical Insurance Coverage & Costs 2026",
    "description": "Medicare Part B covers doctor visits, outpatient care, preventive services, and medical equipment. Learn what Part B covers, what it costs, and how to enroll.",
    "url": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b/",
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
      "name": "Medicare Parts",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Medicare Part B",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b/"
    }
    ]
  }
          ])
        }}
      />
      </SiteLayout>;
}
