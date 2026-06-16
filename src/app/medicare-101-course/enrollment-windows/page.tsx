import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Enrollment Windows & Deadlines | Medicare 101 Course - Lesson 3 | MedicareFAQ",
  description:
    "Know exactly when to enroll in Medicare and what happens if you miss a deadline. Lesson 3 of the free Medicare 101 Course from MedicareFAQ.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/enrollment-windows/" },
  openGraph: {
    title: "Enrollment Windows & Deadlines | Medicare 101 Course - Lesson 3",
    description: "Know exactly when to enroll in Medicare and what happens if you miss a deadline.",
    url: "https://www.medicarefaq.com/medicare-101-course/enrollment-windows/",
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
    "headline": "Enrollment Windows & Deadlines — Medicare 101 Course Lesson 3",
    "description": "Know exactly when to enroll in Medicare and what happens if you miss a deadline. Lesson 3 of the MedicareFAQ Medicare 101 Course.",
    "url": "https://www.medicarefaq.com/medicare-101-course/enrollment-windows/",
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
      "name": "Enrollment Windows",
      "item": "https://www.medicarefaq.com/medicare-101-course/enrollment-windows/"
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
