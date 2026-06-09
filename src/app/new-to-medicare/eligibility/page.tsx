import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Eligibility from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Eligibility | Who Qualifies for Medicare?",
  description: "Find out if you qualify for Medicare. Learn about age requirements, disability eligibility, and how to enroll when you become eligible.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/eligibility/" },
  openGraph: {
    title: "Medicare Eligibility | Who Qualifies for Medicare?",
    description: "Find out if you qualify for Medicare. Learn about age requirements, disability eligibility, and how to enroll when you become eligible.",
    url: "https://www.medicarefaq.com/original-medicare/eligibility/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Eligibility | Who Qualifies for Medicare?",
    description: "Find out if you qualify for Medicare. Learn about age requirements, disability eligibility, and how to enroll when you become eligible.",
    url: "https://www.medicarefaq.com/new-to-medicare/eligibility/",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "New to Medicare", item: "https://www.medicarefaq.com/new-to-medicare/" },
      { "@type": "ListItem", position: 3, name: "Eligibility" },
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
      <Eligibility />
    </SiteLayout>
  );
}
