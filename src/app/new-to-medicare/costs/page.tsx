import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PlanCosts from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Plan Costs 2026 | Premiums, Deductibles & More | MedicareFAQ",
  description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-supplement-plans/costs/" },
  openGraph: {
    title: "Medicare Plan Costs 2026 | Premiums, Deductibles & More | MedicareFAQ",
    description: "Understand Medicare costs for 2026 including Part A and Part B premiums, deductibles, and out-of-pocket expenses for Supplement and Advantage plans.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/costs/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PlanCosts />
    </SiteLayout>
  );
}
