import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Idaho 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Idaho for 2026. Idaho birthday rule: 63-day annual switch window since 2022. Plan G starts at $201/mo. 29+ carriers analyzed.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/idaho/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Idaho 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Idaho for 2026. Idaho birthday rule: 63-day annual switch window since 2022. Plan G starts at $201/mo.",
    url: "https://www.medicarefaq.com/medicare-supplements/idaho/",
    type: "website",
  },
};

export default function IdahoPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
