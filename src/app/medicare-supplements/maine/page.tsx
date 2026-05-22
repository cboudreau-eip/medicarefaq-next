import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Maine 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Maine for 2026. Maine requires community rating and year-round guaranteed issue. Medco Containment offers Plan G from $235/mo. Free quotes from 30+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/maine/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Maine 2026 | MedicareFAQ",
    description:
      "Maine requires community rating (same premium at any age) and year-round guaranteed issue. Compare top carriers including Medco Containment, State Farm, and Mutual of Omaha.",
    url: "https://www.medicarefaq.com/medicare-supplements/maine/",
    type: "website",
  },
};

export default function MainePage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
