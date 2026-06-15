import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Eligibility 2026 | Who Can Enroll in Medicare Supplement?",
  description: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
  openGraph: {
    title: "Medigap Eligibility 2026 | Who Can Enroll in Medicare Supplement?",
    description: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-eligibility/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-eligibility/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medigap Eligibility 2026 | Who Can Enroll in Medicare Supplement?",
    description: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-eligibility/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "Medigap Eligibility" },
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
