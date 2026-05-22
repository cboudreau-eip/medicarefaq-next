import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare 101 Course: Understand Medicare in 7 Simple Lessons | MedicareFAQ",
  description:
    "Free Medicare course for beginners. Learn what Medicare covers, enrollment deadlines, coverage gaps, Medigap vs Advantage, and how to choose the right plan — in 7 short lessons.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/" },
  openGraph: {
    title: "Medicare 101 Course: Understand Medicare in 7 Simple Lessons",
    description:
      "Free Medicare course for beginners. Learn what Medicare covers, enrollment deadlines, coverage gaps, and how to choose the right plan.",
    url: "https://www.medicarefaq.com/medicare-101-course/",
    type: "website",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
