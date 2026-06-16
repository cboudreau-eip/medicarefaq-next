import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Checklist from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Enrollment Checklist | Steps to Enroll in Medicare",
  description: "Use our Medicare enrollment checklist to make sure you don",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/checklist/" },
  openGraph: {
    title: "Medicare Enrollment Checklist | Steps to Enroll in Medicare",
    description: "Use our Medicare enrollment checklist to make sure you don",
    url: "https://www.medicarefaq.com/medicare-enrollment/checklist/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Enrollment Checklist | Steps to Enroll in Medicare",
    description: "Use our Medicare enrollment checklist to make sure you don",
    url: "https://www.medicarefaq.com/medicare-enrollment/checklist/",
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
      { "@type": "ListItem", position: 3, name: "Enrollment Checklist" },
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
      <Checklist />
    </SiteLayout>
  );
}
