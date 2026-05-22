import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Nebraska 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Nebraska for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/nebraska/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Nebraska 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Nebraska for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplements/nebraska/",
    siteName: "MedicareFAQ",
    type: "website",
  },
};

export default function NebraskaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
