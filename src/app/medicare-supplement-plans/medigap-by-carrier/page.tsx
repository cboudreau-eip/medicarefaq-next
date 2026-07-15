import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Plans by Carrier: Compare Top Medicare Supplement Insurers",
  description: "Compare Medicare Supplement plans from top-rated carriers. See financial strength ratings, plan availability, pricing methods, and find the best Medigap carrier for your needs.",
  openGraph: {
    title: "Medigap Plans by Carrier: Compare Top Medicare Supplement Insurers",
    description: "Compare Medicare Supplement plans from top-rated carriers. See financial strength ratings, plan availability, pricing methods, and find the best Medigap carrier for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-carrier/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-carrier/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medigap Plans by Carrier: Compare Top Medicare Supplement Insurers",
    description: "Compare Medicare Supplement plans from top-rated carriers. See financial strength ratings, plan availability, pricing methods, and find the best Medigap carrier for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-carrier/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "By Carrier" },
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
