import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in New Mexico 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in New Mexico for 2026. See top-rated carriers, Plan G and Plan N rates, and state-specific rules.",
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
