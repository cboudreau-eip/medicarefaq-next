import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import SouthCarolinaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in South Carolina 2026 | MedicareFAQ",
  description: "Compare the best Medicare Supplement plans in South Carolina. See 2026 rates, carrier rankings, and state-specific rules from MedicareFAQ.",
};

export default function SouthCarolinaPage() {
  return (
    <SiteLayout>
      <SouthCarolinaPageContent />
    </SiteLayout>
  );
}
