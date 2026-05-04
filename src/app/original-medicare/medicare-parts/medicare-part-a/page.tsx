import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part a (Hospital Insurance) 2026 || Coverage, Costs && Eligibility",
  description: "Understand Medicare Part A hospital insurance: what it covers, 2026 deductibles and coinsurance, eligibility requirements, and how to enroll.",
  openGraph: {
    title: "Medicare Part a (Hospital Insurance) 2026 || Coverage, Costs && Eligibility",
    description: "Understand Medicare Part A hospital insurance: what it covers, 2026 deductibles and coinsurance, eligibility requirements, and how to enroll.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-a",
    type: "article",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-a",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
