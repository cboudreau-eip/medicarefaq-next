import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Delaware 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Delaware for 2026. Delaware adopted the birthday rule on January 1, 2026. Plan G starts at $161/mo. 40+ carriers analyzed.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/delaware/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Delaware 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Delaware for 2026. Delaware adopted the birthday rule on January 1, 2026. Plan G starts at $161/mo.",
    url: "https://www.medicarefaq.com/medicare-supplements/delaware/",
    type: "website",
  },
};

export default function DelawarePage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
