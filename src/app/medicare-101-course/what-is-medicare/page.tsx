import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "What Is Medicare? | Medicare 101 Course - Lesson 1 | MedicareFAQ",
  description:
    "Learn what Medicare is, what it costs, and the two paths to coverage. Lesson 1 of the free Medicare 101 Course from MedicareFAQ.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/what-is-medicare/" },
  openGraph: {
    title: "What Is Medicare? | Medicare 101 Course - Lesson 1",
    description: "Learn what Medicare is, what it costs, and the two paths to coverage.",
    url: "https://www.medicarefaq.com/medicare-101-course/what-is-medicare/",
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
    "headline": "What Is Medicare? — Medicare 101 Course Lesson 1",
    "description": "Learn what Medicare is, what it costs, and the two paths to coverage. Lesson 1 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/what-is-medicare/",
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
      "name": "What Is Medicare",
      "item": "https://www.medicarefaq.com/medicare-101-course/what-is-medicare/"
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
