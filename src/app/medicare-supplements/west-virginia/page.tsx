import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in West Virginia (2026) | MedicareFAQ",
  description: "Compare the best Medicare Supplement (Medigap) plans in West Virginia for 2026.",
};

export default function WestVirginiaPageContentPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
