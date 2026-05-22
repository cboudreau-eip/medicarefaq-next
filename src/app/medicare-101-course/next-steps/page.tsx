import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Your Next Steps | Medicare 101 Course - Lesson 7 | MedicareFAQ",
  description:
    "Your personalized action plan based on where you are in the Medicare journey. Lesson 7 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/next-steps/" },
  openGraph: {
    title: "Your Next Steps | Medicare 101 Course - Lesson 7",
    description: "Your personalized action plan based on where you are in the Medicare journey.",
    url: "https://www.medicarefaq.com/medicare-101-course/next-steps/",
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
