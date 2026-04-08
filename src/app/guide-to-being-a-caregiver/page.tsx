import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaregiverPageContent from "./CaregiverPageContent";
import { CAREGIVER_PAGES } from "@/lib/caregiver-guide-data";

export const metadata: Metadata = {
  title: "Guide to Being a Caregiver | MedicareFAQ",
  description:
    "A comprehensive resource for family caregivers navigating Medicare, home health benefits, and the practical realities of caring for an aging loved one.",
  alternates: {
    canonical: "https://www.medicarefaq.com/guide-to-being-a-caregiver",
  },
};

export default function Page() {
  const page = CAREGIVER_PAGES.find((p) => p.slug === "")!;
  return (
    <SiteLayout>
      <CaregiverPageContent page={page} slug="" />
    </SiteLayout>
  );
}
