import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part B Late Enrollment Penalty Calculator | MedicareFAQ",
  description:
    "Calculate your Medicare Part B late enrollment penalty instantly. Enter when you became eligible and when you enrolled to see your permanent monthly penalty amount and lifetime cost.",
  openGraph: {
    title: "Medicare Part B Late Enrollment Penalty Calculator",
    description:
      "Find out exactly how much your Part B late enrollment penalty will cost you — monthly and over your lifetime.",
    url: "https://www.medicarefaq.com/tools/part-b-penalty-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/tools/part-b-penalty-calculator",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
