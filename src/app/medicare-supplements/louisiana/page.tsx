import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Louisiana 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Louisiana for 2026. Louisiana has a birthday rule letting you switch plans annually. Compare Plan G rates from $111/mo in New Orleans from top carriers including Mutual of Omaha, State Farm, AARP/UHC, and more.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/louisiana/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Louisiana 2026",
    description:
      "Louisiana's birthday rule lets you switch Medigap plans every year. Compare Plan G rates from $111/mo in New Orleans from top-rated carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/louisiana/",
    type: "article",
  },
};

export default function LouisianaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
