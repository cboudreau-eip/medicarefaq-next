import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in RhodeIsland 2026 | MedicareFAQ",
  description: "Compare the best Medicare Supplement plans in RhodeIsland for 2026. See top carriers, rates, and state-specific rules.",
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
