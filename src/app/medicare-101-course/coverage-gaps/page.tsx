import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "The Coverage Gap: What Medicare Does NOT Cover | Medicare 101 Course - Lesson 4 | MedicareFAQ",
  description:
    "See the real dollar amounts Medicare leaves uncovered and why supplemental coverage is essential. Lesson 4 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/coverage-gaps/" },
  openGraph: {
    title: "The Coverage Gap | Medicare 101 Course - Lesson 4",
    description: "See the real dollar amounts Medicare leaves uncovered and why supplemental coverage is essential.",
    url: "https://www.medicarefaq.com/medicare-101-course/coverage-gaps/",
    type: "article",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Coverage Gap: What Medicare Does NOT Cover — Lesson 4",
    "description": "See the real dollar amounts Medicare leaves uncovered and why supplemental coverage is essential. Lesson 4 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/coverage-gaps/",
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
      "name": "Medicare 101 Course",
      "item": "https://www.medicarefaq.com/medicare-101-course/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Coverage Gaps",
      "item": "https://www.medicarefaq.com/medicare-101-course/coverage-gaps/"
    }
    ]
  }
          ])
        }}
      />

      <PageContent />
    </SiteLayout>
  );
}
