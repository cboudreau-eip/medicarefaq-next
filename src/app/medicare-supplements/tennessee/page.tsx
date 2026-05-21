import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Tennessee 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Tennessee for 2026. See Plan G rates from $87/mo in Nashville, top carrier rankings, and Tennessee Medigap rules. Independent, unbiased reviews.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/tennessee/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Tennessee 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Tennessee for 2026. Plan G from $87/mo in Nashville. Top carrier rankings and Tennessee Medigap rules explained.",
    url: "https://www.medicarefaq.com/medicare-supplements/tennessee/",
    type: "article",
  },
};

export default function TennesseePage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
