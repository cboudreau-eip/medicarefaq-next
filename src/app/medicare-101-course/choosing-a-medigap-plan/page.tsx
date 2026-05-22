import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How to Choose a Medigap Plan | Medicare 101 Course - Lesson 6 | MedicareFAQ",
  description:
    "Plan G vs Plan N, how to evaluate carriers, and what to look for in a Medigap policy. Lesson 6 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/choosing-a-medigap-plan/" },
  openGraph: {
    title: "How to Choose a Medigap Plan | Medicare 101 Course - Lesson 6",
    description: "Plan G vs Plan N, how to evaluate carriers, and what to look for in a Medigap policy.",
    url: "https://www.medicarefaq.com/medicare-101-course/choosing-a-medigap-plan/",
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
