import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Vermont (2026) | MedicareFAQ",
  description: "Compare the best Medicare Supplement (Medigap) plans in Vermont for 2026.",
};

export default function VermontPageContentPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
