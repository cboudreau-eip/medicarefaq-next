import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "The 4 Parts of Medicare | Medicare 101 Course - Lesson 2 | MedicareFAQ",
  description:
    "Understand Medicare Parts A, B, C, and D — what each covers, what it costs, and what it leaves out. Lesson 2 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/parts-of-medicare/" },
  openGraph: {
    title: "The 4 Parts of Medicare | Medicare 101 Course - Lesson 2",
    description: "Understand Medicare Parts A, B, C, and D — what each covers, what it costs, and what it leaves out.",
    url: "https://www.medicarefaq.com/medicare-101-course/parts-of-medicare/",
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
