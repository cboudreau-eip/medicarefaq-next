import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Supplement vs. Medicare Advantage | Which Is Better? | MedicareFAQ",
  description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
  openGraph: {
    title: "Medicare Supplement vs. Medicare Advantage | Which Is Better? | MedicareFAQ",
    description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
