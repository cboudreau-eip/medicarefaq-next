import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Iowa 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Iowa for 2026. MedMutual Protect offers Plan G from $128/mo. State Farm A++ rated. No birthday rule. Free quotes from 30+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/iowa/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Iowa 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Iowa for 2026. MedMutual Protect offers Plan G from $128/mo. State Farm A++ rated. No birthday rule.",
    url: "https://www.medicarefaq.com/medicare-supplements/iowa/",
    type: "website",
  },
};

export default function IowaPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
