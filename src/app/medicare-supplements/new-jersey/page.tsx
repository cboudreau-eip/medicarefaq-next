import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in New Jersey 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in New Jersey for 2026. AARP/UHC holds 47% market share. See top carriers, premiums from $139/mo, under-65 coverage rules, and state regulations.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/new-jersey/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in New Jersey 2026",
    description:
      "Compare top Medigap carriers in New Jersey. AARP/UHC dominates with 47% market share. See premiums from $139/mo, Horizon BCBS NJ, and under-65 coverage requirements.",
    url: "https://www.medicarefaq.com/medicare-supplements/new-jersey/",
    type: "article",
  },
};

export default function NewJerseyPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
