import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Scholarship Opportunities",
  description: "Learn about scholarship opportunities offered by MedicareFAQ to support students pursuing healthcare and insurance-related education.",
  openGraph: {
    title: "Scholarship Opportunities",
    description: "Learn about scholarship opportunities offered by MedicareFAQ.",
    url: "https://www.medicarefaq.com/scholarship-opportunities",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/scholarship-opportunities" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
