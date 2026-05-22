import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Kansas 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Kansas for 2026. Farm Bureau Insurance offers Plan G from $141/mo and Plan N from $103/mo. No birthday rule. Free quotes from 35+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/kansas/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Kansas 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Kansas for 2026. Farm Bureau Insurance offers Plan G from $141/mo. BCBS Kansas Plan K at $85/mo. No birthday rule.",
    url: "https://www.medicarefaq.com/medicare-supplements/kansas/",
    type: "website",
  },
};

export default function KansasPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
