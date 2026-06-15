import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MichiganPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Michigan 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Michigan for 2026. Plan G starts at $99/mo in Grand Rapids. We ranked 5 top carriers by price, financial strength, and complaints.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Michigan 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Michigan for 2026. Plan G starts at $99/mo in Grand Rapids. We ranked 5 top carriers by price, financial strength, and complaints.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/",
    type: "article",
  },
};

export default function MichiganPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Michigan 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Michigan for 2026. Plan G starts at $99/mo in Grand Rapids. We ranked 5 top carriers by price, financial strength, and complaints.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/",
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
      { "@type": "ListItem", position: 3, name: "Michigan" },
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
      <MichiganPageContent />
    </SiteLayout>
  );
}
