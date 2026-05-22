import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "The Coverage Gap: What Medicare Does NOT Cover | Medicare 101 Course - Lesson 4 | MedicareFAQ",
  description:
    "See the real dollar amounts Medicare leaves uncovered and why supplemental coverage is essential. Lesson 4 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/coverage-gaps/" },
  openGraph: {
    title: "The Coverage Gap | Medicare 101 Course - Lesson 4",
    description: "See the real dollar amounts Medicare leaves uncovered and why supplemental coverage is essential.",
    url: "https://www.medicarefaq.com/medicare-101-course/coverage-gaps/",
    type: "article",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
