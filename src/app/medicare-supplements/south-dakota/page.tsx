import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import SouthDakotaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in South Dakota 2026 | MedicareFAQ",
  description: "Compare the best Medicare Supplement plans in South Dakota. See 2026 rates, carrier rankings, and state-specific rules from MedicareFAQ.",
};

export default function SouthDakotaPage() {
  return (
    <SiteLayout>
      <SouthDakotaPageContent />
    </SiteLayout>
  );
}
