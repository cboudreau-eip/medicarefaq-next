import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Enrollment Timeline Calculator | MedicareFAQ",
  description: "Use our free Medicare enrollment timeline calculator to find your Initial Enrollment Period, Special Enrollment Period, and key Medicare deadlines based on your birthday.",
  openGraph: {
    title: "Medicare Enrollment Timeline Calculator | MedicareFAQ",
    description: "Find your Medicare enrollment windows and key deadlines.",
    url: "https://www.medicarefaq.com/tools/enrollment-timeline",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/tools/enrollment-timeline" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
