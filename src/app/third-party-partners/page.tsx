import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Third-Party Partners",
  description: "Learn about MedicareFAQ's third-party partners and how we work with trusted organizations.",
  alternates: {
    canonical: "https://www.medicarefaq.com/third-party-partners",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
