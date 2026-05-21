import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Alaska 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Alaska for 2026. No Medicare Advantage available in Alaska. Plan G starts at $137/mo in Anchorage. We ranked 5 top carriers including Premera BCBS of Alaska.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/alaska/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Alaska 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Alaska for 2026. No Medicare Advantage available in Alaska. Plan G starts at $137/mo in Anchorage.",
    url: "https://www.medicarefaq.com/medicare-supplements/alaska/",
    type: "article",
  },
};

export default function AlaskaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
