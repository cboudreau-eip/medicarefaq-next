import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How Much Does Medicare Cost in 2026? | Medicare Premiums & Deductibles",
  description: "See the 2026 Medicare costs for Parts A, B, C, and D — including premiums, deductibles, coinsurance, and out-of-pocket limits. Updated for 2026.",
  openGraph: {
    title: "How Much Does Medicare Cost in 2026? | Medicare Premiums & Deductibles",
    description: "See the 2026 Medicare costs for Parts A, B, C, and D — including premiums, deductibles, coinsurance, and out-of-pocket limits. Updated for 2026.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-costs/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-costs/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
