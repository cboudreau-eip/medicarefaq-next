import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Your Course Results | Medicare 101 Course | MedicareFAQ",
  description:
    "See your final score and grade for the Medicare 101 Course. Find out how well you understand Medicare.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/results/" },
  robots: { index: false, follow: true },
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
    "@type": "WebPage",
    "name": "Your Course Results — Medicare 101 Course",
    "description": "Your personalized Medicare 101 Course results and recommendations based on your answers.",
    "url": "https://www.medicarefaq.com/medicare-101-course/results/",
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com"
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
      "name": "Results",
      "item": "https://www.medicarefaq.com/medicare-101-course/results/"
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
