import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Montana 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Montana for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/montana/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Montana 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Montana for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplements/montana/",
    siteName: "MedicareFAQ",
    type: "website",
  },
};

export default function MontanaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
