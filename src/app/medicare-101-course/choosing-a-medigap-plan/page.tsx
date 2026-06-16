import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How to Choose a Medigap Plan | Medicare 101 Course - Lesson 6 | MedicareFAQ",
  description:
    "Plan G vs Plan N, how to evaluate carriers, and what to look for in a Medigap policy. Lesson 6 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/choosing-a-medigap-plan/" },
  openGraph: {
    title: "How to Choose a Medigap Plan | Medicare 101 Course - Lesson 6",
    description: "Plan G vs Plan N, how to evaluate carriers, and what to look for in a Medigap policy.",
    url: "https://www.medicarefaq.com/medicare-101-course/choosing-a-medigap-plan/",
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
    "headline": "How to Choose a Medigap Plan — Medicare 101 Course Lesson 6",
    "description": "Plan G vs Plan N, how to evaluate carriers, and what to look for in a Medigap policy. Lesson 6 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/choosing-a-medigap-plan/",
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
      "name": "Choosing a Medigap Plan",
      "item": "https://www.medicarefaq.com/medicare-101-course/choosing-a-medigap-plan/"
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
