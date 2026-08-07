import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import TexasPlanNContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan N Rates in Texas (2026) | MedicareFAQ",
  description:
    "Compare Plan N rates from 30+ carriers in Texas. See the cheapest Plan N premiums starting at $106/mo, carrier ratings, and discounts for 2026.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/texas/plan-n/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan N Rates in Texas (2026) | MedicareFAQ",
    description: "Compare Plan N rates from 30+ carriers in Texas. Cheapest premiums, carrier ratings, and discounts for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/texas/plan-n/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan N Rates in Texas (2026)",
    description: "Compare Plan N rates from 30+ carriers in Texas for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/texas/plan-n/",
    dateModified: "2026-08-07",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: { "@type": "Organization", name: "MedicareFAQ", logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" } },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "Texas", item: "https://www.medicarefaq.com/medicare-supplement-plans/texas/" },
      { "@type": "ListItem", position: 4, name: "Plan N" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TexasPlanNContent />
    </SiteLayout>
  );
}
