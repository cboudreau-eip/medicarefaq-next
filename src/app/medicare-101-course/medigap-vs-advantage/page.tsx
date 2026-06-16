import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap vs. Medicare Advantage | Medicare 101 Course - Lesson 5 | MedicareFAQ",
  description:
    "Compare Medicare Supplement and Medicare Advantage — understand why this decision follows you for life. Lesson 5 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/medigap-vs-advantage/" },
  openGraph: {
    title: "Medigap vs. Medicare Advantage | Medicare 101 Course - Lesson 5",
    description: "Compare Medicare Supplement and Medicare Advantage — understand why this decision follows you for life.",
    url: "https://www.medicarefaq.com/medicare-101-course/medigap-vs-advantage/",
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
    "headline": "Medigap vs. Medicare Advantage — Medicare 101 Course Lesson 5",
    "description": "Compare Medicare Supplement and Medicare Advantage — understand why this decision follows you for life. Lesson 5 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/medigap-vs-advantage/",
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
      "name": "Medigap vs Advantage",
      "item": "https://www.medicarefaq.com/medicare-101-course/medigap-vs-advantage/"
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
