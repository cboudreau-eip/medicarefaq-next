import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Arizona 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Arizona for 2026. See Plan G rates from $106/mo, top carrier reviews, and expert tips for Arizona retirees in Phoenix, Tucson, and Scottsdale.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/arizona/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Arizona 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Arizona for 2026. See Plan G rates from $106/mo, top carrier reviews, and expert tips for Arizona retirees.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/arizona/",
    type: "article",
  },
};

export default function ArizonaMedicareSupplementPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Arizona 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Arizona for 2026. See Plan G rates from $106/mo, top carrier reviews, and expert tips for Arizona retirees in Phoenix, Tucson, and Scottsdale.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/arizona/",
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
      { "@type": "ListItem", position: 3, name: "Arizona" },
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
