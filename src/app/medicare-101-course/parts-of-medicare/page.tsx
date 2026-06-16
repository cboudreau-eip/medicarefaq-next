import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "The 4 Parts of Medicare | Medicare 101 Course - Lesson 2 | MedicareFAQ",
  description:
    "Understand Medicare Parts A, B, C, and D — what each covers, what it costs, and what it leaves out. Lesson 2 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/parts-of-medicare/" },
  openGraph: {
    title: "The 4 Parts of Medicare | Medicare 101 Course - Lesson 2",
    description: "Understand Medicare Parts A, B, C, and D — what each covers, what it costs, and what it leaves out.",
    url: "https://www.medicarefaq.com/medicare-101-course/parts-of-medicare/",
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
    "headline": "The 4 Parts of Medicare — Medicare 101 Course Lesson 2",
    "description": "Understand Medicare Parts A, B, C, and D — what each covers, what it costs, and what it leaves out. Lesson 2 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/parts-of-medicare/",
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
      "name": "Parts of Medicare",
      "item": "https://www.medicarefaq.com/medicare-101-course/parts-of-medicare/"
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
