import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Your Next Steps | Medicare 101 Course - Lesson 7 | MedicareFAQ",
  description:
    "Your personalized action plan based on where you are in the Medicare journey. Lesson 7 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/next-steps/" },
  openGraph: {
    title: "Your Next Steps | Medicare 101 Course - Lesson 7",
    description: "Your personalized action plan based on where you are in the Medicare journey.",
    url: "https://www.medicarefaq.com/medicare-101-course/next-steps/",
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
    "headline": "Your Next Steps — Medicare 101 Course Lesson 7",
    "description": "Your personalized action plan based on where you are in the Medicare journey. Lesson 7 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/next-steps/",
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
      "name": "Next Steps",
      "item": "https://www.medicarefaq.com/medicare-101-course/next-steps/"
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
