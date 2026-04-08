import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part B (Medical Insurance) 2026 | Premiums, Coverage & Enrollment",
  description: "Complete guide to Medicare Part B: 2026 premium of $185/month, what it covers, IRMAA surcharges, enrollment periods, and the late enrollment penalty.",
  openGraph: {
    title: "Medicare Part B (Medical Insurance) 2026 | Premiums, Coverage & Enrollment",
    description: "Complete guide to Medicare Part B: 2026 premium of $185/month, what it covers, IRMAA surcharges, enrollment periods, and the late enrollment penalty.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
