import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Massachusetts 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Massachusetts for 2026. Massachusetts uses a unique plan system (Core, Supplement 1A) with community rating and year-round open enrollment. Compare rates from $123/mo in Boston from top carriers including BCBS MA, Harvard Pilgrim, and AARP/UHC.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/massachusetts/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Massachusetts 2026",
    description:
      "Massachusetts has community rating and year-round open enrollment. Compare Supplement 1A rates from $176/mo in Boston from top-rated carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/massachusetts/",
    type: "article",
  },
};

export default function MassachusettsPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
