import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in North Carolina 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in North Carolina for 2026. Plan G starts at $95/mo in Greensboro. NC has the highest Plan G adoption rate in the Southeast. Get expert guidance from MedicareFAQ.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/north-carolina/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in North Carolina 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in North Carolina for 2026. Plan G starts at $95/mo. Expert guidance from MedicareFAQ.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/north-carolina/",
    type: "website",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Best Medicare Supplement Plans in North Carolina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Medicare Supplement Plans in North Carolina 2026",
    description:
      "Plan G from $95/mo in NC. Compare top-rated carriers and find the best Medigap plan for your needs.",
  },
};

export default function NorthCarolinaMedicareSupplementPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in North Carolina 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in North Carolina for 2026. Plan G starts at $95/mo in Greensboro. NC has the highest Plan G adoption rate in the Southeast. Get expert guidance from MedicareFAQ.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/north-carolina/",
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
      { "@type": "ListItem", position: 3, name: "North Carolina" },
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
