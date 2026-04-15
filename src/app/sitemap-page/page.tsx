import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse all pages on MedicareFAQ.com — find Medicare supplement, Part D, enrollment, and coverage information.",
  alternates: {
    canonical: "https://www.medicarefaq.com/sitemap",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
