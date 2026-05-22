import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Nevada 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Nevada for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/nevada/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Nevada 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Nevada for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplements/nevada/",
    siteName: "MedicareFAQ",
    type: "website",
  },
};

export default function NevadaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
