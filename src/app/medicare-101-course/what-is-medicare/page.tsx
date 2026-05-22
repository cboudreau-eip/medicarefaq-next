import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "What Is Medicare? | Medicare 101 Course - Lesson 1 | MedicareFAQ",
  description:
    "Learn what Medicare is, what it costs, and the two paths to coverage. Lesson 1 of the free Medicare 101 Course from MedicareFAQ.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/what-is-medicare/" },
  openGraph: {
    title: "What Is Medicare? | Medicare 101 Course - Lesson 1",
    description: "Learn what Medicare is, what it costs, and the two paths to coverage.",
    url: "https://www.medicarefaq.com/medicare-101-course/what-is-medicare/",
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
