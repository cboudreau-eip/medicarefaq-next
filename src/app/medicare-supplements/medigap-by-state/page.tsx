import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Plans by State 2026 | Medicare Supplement State Guide",
  description: "Compare Medicare Supplement (Medigap) plans by state. Find state-specific rules, top carriers, and average premiums for Plan G and other plans in your state.",
  openGraph: {
    title: "Medigap Plans by State 2026 | Medicare Supplement State Guide",
    description: "Compare Medicare Supplement (Medigap) plans by state. Find state-specific rules, top carriers, and average premiums for Plan G and other plans in your state.",
    url: "https://www.medicarefaq.com/medicare-supplements/medigap-by-state/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-by-state/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
