import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Enrollment Windows & Deadlines | Medicare 101 Course - Lesson 3 | MedicareFAQ",
  description:
    "Know exactly when to enroll in Medicare and what happens if you miss a deadline. Lesson 3 of the free Medicare 101 Course from MedicareFAQ.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/enrollment-windows/" },
  openGraph: {
    title: "Enrollment Windows & Deadlines | Medicare 101 Course - Lesson 3",
    description: "Know exactly when to enroll in Medicare and what happens if you miss a deadline.",
    url: "https://www.medicarefaq.com/medicare-101-course/enrollment-windows/",
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
