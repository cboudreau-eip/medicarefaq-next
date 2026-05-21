import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Alabama 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Alabama for 2026. Plan G starts at $133/mo in Birmingham. We ranked 5 top carriers by price, financial strength, and complaints.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/alabama/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Alabama 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Alabama for 2026. Plan G starts at $133/mo in Birmingham. We ranked 5 top carriers by price, financial strength, and complaints.",
    url: "https://www.medicarefaq.com/medicare-supplements/alabama/",
    type: "article",
  },
};

export default function AlabamaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
