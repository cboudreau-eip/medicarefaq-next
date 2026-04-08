import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import SupplementVsAdvantage from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Supplement vs. Medicare Advantage | Which Is Better? | MedicareFAQ",
  description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/" },
  openGraph: {
    title: "Medicare Supplement vs. Medicare Advantage | Which Is Better? | MedicareFAQ",
    description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <SupplementVsAdvantage />
    </SiteLayout>
  );
}
