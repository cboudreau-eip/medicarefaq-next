import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Costs by Plan Type: 2026 Premiums, Deductibles & Out-of-Pocket",
  description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
  openGraph: {
    title: "Medicare Costs by Plan Type: 2026 Premiums, Deductibles & Out-of-Pocket",
    description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/costs/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/costs/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
