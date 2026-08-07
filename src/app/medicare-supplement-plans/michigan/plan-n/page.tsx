import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MichiganPlanNContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan N Rates in Michigan (2026) | MedicareFAQ",
  description:
    "Compare Plan N rates from 30+ carriers in Michigan. See the cheapest Plan N premiums starting at $72/mo, carrier ratings, and discounts for 2026.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/plan-n/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan N Rates in Michigan (2026) | MedicareFAQ",
    description: "Compare Plan N rates from 30+ carriers in Michigan. Cheapest premiums, carrier ratings, and discounts for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/plan-n/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan N Rates in Michigan (2026)",
    description: "Compare Plan N rates from 30+ carriers in Michigan for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/plan-n/",
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
      { "@type": "ListItem", position: 3, name: "Michigan", item: "https://www.medicarefaq.com/medicare-supplement-plans/michigan/" },
      { "@type": "ListItem", position: 4, name: "Plan N" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MichiganPlanNContent />
    </SiteLayout>
  );
}
