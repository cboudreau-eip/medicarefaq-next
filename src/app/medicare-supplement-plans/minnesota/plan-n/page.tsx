import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MinnesotaPlanNContent from "./PageContent";

const url = "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/plan-n/";
const title = "Medicare Supplement Plan N in Minnesota: Costs & Coverage";
const description = "Learn how Minnesota Plan N works, what the $20 and $50 copayments mean, and how to compare premiums and enrollment options for 2026–2027.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", siteName: "MedicareFAQ" },
};

export default function MinnesotaPlanNPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, description, url, datePublished: "2026-11-04", dateModified: "2026-11-04", author: { "@type": "Organization", name: "MedicareFAQ" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Minnesota Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/" },
      { "@type": "ListItem", position: 3, name: "Minnesota Plan N", item: url },
    ] },
  ];
  return <SiteLayout><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><MinnesotaPlanNContent /></SiteLayout>;
}
