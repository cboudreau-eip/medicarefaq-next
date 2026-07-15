import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Enrollment Periods 2026 | IEP, SEP, GEP, AEP Explained",
  description: "Understand all Medicare enrollment periods in 2026 — Initial Enrollment Period (IEP), Special Enrollment Period (SEP), General Enrollment Period (GEP), and Annual Enrollment Period (AEP).",
  openGraph: {
    title: "Medicare Enrollment Periods 2026 | IEP, SEP, GEP, AEP Explained",
    description: "Understand all Medicare enrollment periods in 2026 — Initial Enrollment Period (IEP), Special Enrollment Period (SEP), General Enrollment Period (GEP), and Annual Enrollment Period (AEP).",
    url: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Enrollment Periods 2026 | IEP, SEP, GEP, AEP Explained",
    description: "Understand all Medicare enrollment periods in 2026 — Initial Enrollment Period (IEP), Special Enrollment Period (SEP), General Enrollment Period (GEP), and Annual Enrollment Period (AEP).",
    url: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
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
