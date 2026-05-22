import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap vs. Medicare Advantage | Medicare 101 Course - Lesson 5 | MedicareFAQ",
  description:
    "Compare Medicare Supplement and Medicare Advantage — understand why this decision follows you for life. Lesson 5 of the free Medicare 101 Course.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101-course/medigap-vs-advantage/" },
  openGraph: {
    title: "Medigap vs. Medicare Advantage | Medicare 101 Course - Lesson 5",
    description: "Compare Medicare Supplement and Medicare Advantage — understand why this decision follows you for life.",
    url: "https://www.medicarefaq.com/medicare-101-course/medigap-vs-advantage/",
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
