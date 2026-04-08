import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Tools & Resources on Medicare.gov | MedicareFAQ",
  description: "A senior's guide to the tools and resources available on Medicare.gov.",
  alternates: {
    canonical: "https://www.medicarefaq.com/seniors-guide-to-medicare-gov/tools-and-resources",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
