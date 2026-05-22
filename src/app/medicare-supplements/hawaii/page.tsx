import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Hawaii 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Hawaii for 2026. No birthday rule in Hawaii. Plan G starts at $134/mo (USAA) or $151/mo for the general public. 20+ carriers analyzed.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/hawaii/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Hawaii 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Hawaii for 2026. No birthday rule in Hawaii. Plan G starts at $134/mo (USAA) or $151/mo for the general public.",
    url: "https://www.medicarefaq.com/medicare-supplements/hawaii/",
    type: "website",
  },
};

export default function HawaiiPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
