import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";
import OepCostsPreview from "@/components/oep/OepCostsPreview";

const isOepPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";

export const metadata: Metadata = isOepPreview ? {
  title: "Medicare Costs by Plan Type: Compare Your Total Spending",
  description: "Compare premiums, medical cost sharing, prescription costs, and spending limits with a worked example and the OEP Plan Comparison Worksheet.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.medicarefaq.com/medicare-plans/costs/" },
} : {
  title: "Medicare Costs by Plan Type: 2026 Premiums, Deductibles & Out-of-Pocket",
  description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
  openGraph: {
    title: "Medicare Costs by Plan Type: 2026 Premiums, Deductibles & Out-of-Pocket",
    description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
    url: "https://www.medicarefaq.com/medicare-plans/costs/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-plans/costs/",
  },
};

export default function Page() {
  if (isOepPreview) return <SiteLayout><OepCostsPreview /></SiteLayout>;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Medicare Costs by Plan Type: 2026 Premiums, Deductibles & Out-of-Pocket",
    "description": "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
    "url": "https://www.medicarefaq.com/medicare-plans/costs/",
    "dateModified": "2026-06-15",
    "author": { "@type": "Organization", "name": "MedicareFAQ" },
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png" }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "Medicare Plans", "item": "https://www.medicarefaq.com/medicare-plans/" },
        { "@type": "ListItem", "position": 3, "name": "Medicare Costs", "item": "https://www.medicarefaq.com/medicare-plans/costs/" }
      ]
    }
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageContent />
    </SiteLayout>
  );
}
