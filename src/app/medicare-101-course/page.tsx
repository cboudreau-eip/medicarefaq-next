import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare 101 Course: Understand Medicare in 7 Simple Lessons | MedicareFAQ",
  description:
    "Free Medicare course for beginners. Learn what Medicare covers, enrollment deadlines, coverage gaps, Medigap vs Advantage, and how to choose the right plan — in 7 short lessons.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/" },
  openGraph: {
    title: "Medicare 101 Course: Understand Medicare in 7 Simple Lessons",
    description:
      "Free Medicare course for beginners. Learn what Medicare covers, enrollment deadlines, coverage gaps, and how to choose the right plan.",
    url: "https://www.medicarefaq.com/medicare-101-course/",
    type: "website",
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
    "@type": "Course",
    "name": "Medicare 101 Course: Understand Medicare in 7 Simple Lessons",
    "description": "A free 7-lesson Medicare course covering everything from what Medicare is to choosing the right supplemental coverage. Built for people turning 65 or newly eligible.",
    "url": "https://www.medicarefaq.com/medicare-101-course/",
    "provider": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com"
    },
    "educationalLevel": "Beginner",
    "numberOfCredits": 7,
    "inLanguage": "en-US"
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
