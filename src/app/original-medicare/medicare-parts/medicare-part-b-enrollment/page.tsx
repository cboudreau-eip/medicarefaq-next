import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part B Enrollment: How and When to Sign up (2026)",
  description: "Learn when and how to enroll in Medicare Part B in 2026. Understand the Initial Enrollment Period, Special Enrollment Period, late penalties, and step-by-step application instructions.",
  openGraph: {
    title: "Medicare Part B Enrollment: How and When to Sign up (2026)",
    description: "Learn when and how to enroll in Medicare Part B in 2026. Understand the Initial Enrollment Period, Special Enrollment Period, late penalties, and step-by-step application instructions.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment" },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Part B Enrollment: How and When to Sign up (2026)",
    description: "Learn when and how to enroll in Medicare Part B in 2026. Understand the Initial Enrollment Period, Special Enrollment Period, late penalties, and step-by-step application instructions.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment",
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
      { "@type": "ListItem", position: 4, name: "Part B Enrollment" },
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
    "headline": "Medicare Part B Enrollment: When and How to Sign Up",
    "description": "Learn when and how to enroll in Medicare Part B, including enrollment periods, deadlines, and how to avoid late enrollment penalties.",
    "url": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment/",
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
      "name": "Part B Enrollment",
      "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment/"
    }
    ]
  }
          ])
        }}
      />
      </SiteLayout>;
}
