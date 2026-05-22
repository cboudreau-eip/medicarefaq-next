import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Mississippi 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Mississippi for 2026. LifeShield National offers Plan G from $123/mo, saving $101/mo vs. the state average. Free quotes from 38 carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/mississippi/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Mississippi 2026 | MedicareFAQ",
    description:
      "Mississippi has 38 carriers competing for Medigap business. LifeShield National Plan G from $123/mo. MedMutual Protect issue-age pricing. New Era Plan N from $83/mo.",
    url: "https://www.medicarefaq.com/medicare-supplements/mississippi/",
    type: "website",
  },
};

export default function MississippiPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
