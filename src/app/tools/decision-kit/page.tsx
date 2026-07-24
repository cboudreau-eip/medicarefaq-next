import type { Metadata } from "next";
import DecisionKitPage from "./PageContent";

export const metadata: Metadata = {
  title: "Free Medicare Decision Kit | Personalized Enrollment Workbook | MedicareFAQ",
  description:
    "Get a free personalized Medicare Decision Kit PDF with your exact enrollment dates, IEP window, coverage comparison chart, and action checklist. Enter your birthday to generate your kit.",
  openGraph: {
    title: "Free Medicare Decision Kit | Personalized Enrollment Workbook",
    description:
      "Enter your birthday and get a personalized PDF with your exact enrollment dates, key deadlines, coverage comparison, and action checklist.",
    url: "https://www.medicarefaq.com/tools/decision-kit/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/tools/decision-kit/",
  },
};

export default function Page() {
  return <DecisionKitPage />;
}
