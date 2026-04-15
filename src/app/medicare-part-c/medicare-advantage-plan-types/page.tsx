import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Advantage Plan Types",
  description: "Learn about the different types of Medicare Advantage plans including HMO, PPO, PFFS, and SNP plans.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
