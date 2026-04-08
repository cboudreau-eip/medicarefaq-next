import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareCosts from "./PageContent";

export const metadata: Metadata = {
  title: "How Much Does Medicare Cost? 2026 Premiums & Out-of-Pocket | MedicareFAQ",
  description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/costs/" },
  openGraph: {
    title: "How Much Does Medicare Cost? 2026 Premiums & Out-of-Pocket | MedicareFAQ",
    description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
    url: "https://www.medicarefaq.com/original-medicare/costs/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <MedicareCosts />
    </SiteLayout>
  );
}
