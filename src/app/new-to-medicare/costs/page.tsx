import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How Much Does Medicare Cost? 2026 Premiums && Out-of-Pocket",
  description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
  openGraph: {
    title: "How Much Does Medicare Cost? 2026 Premiums && Out-of-Pocket",
    description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
    url: "https://www.medicarefaq.com/original-medicare/costs/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/costs/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
