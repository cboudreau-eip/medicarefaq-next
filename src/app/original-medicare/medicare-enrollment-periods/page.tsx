import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

const title = "AEP vs OEP: Medicare Enrollment Periods Explained";
const description = "Compare AEP vs OEP dates, eligibility, allowed plan changes, and coverage start dates. Understand how Medicare Advantage and Medigap enrollment windows differ.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Enrollment Periods: AEP vs OEP",
    description,
    url: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
    datePublished: "2024-01-15T00:00:00+00:00",
    dateModified: "2026-09-18",
    author: { "@type": "Person", name: "David Haass", url: "https://www.medicarefaq.com/about-us/david-haass/" },
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
      { "@type": "ListItem", position: 3, name: "Enrollment Periods" },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageContent />
    </SiteLayout>
  );
}
