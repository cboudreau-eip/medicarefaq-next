import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Kentucky 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Kentucky for 2026. Birthday rule active since January 2024. LifeShield National Plan G from $148/mo. State Farm A++ rated. Free quotes from 40+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/kentucky/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Kentucky 2026 | MedicareFAQ",
    description:
      "Kentucky birthday rule active since January 2024. LifeShield National offers Plan G from $148/mo. State Farm A++ rated. Compare 40+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/kentucky/",
    type: "website",
  },
};

export default function KentuckyPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
