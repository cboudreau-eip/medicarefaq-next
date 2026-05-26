import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Your Course Results | Medicare 101 Course | MedicareFAQ",
  description:
    "See your final score and grade for the Medicare 101 Course. Find out how well you understand Medicare.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/results/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
