import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Checklist from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Enrollment Checklist || Steps to Enroll in Medicare",
  description: "Use our Medicare enrollment checklist to make sure you don",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/checklist/" },
  openGraph: {
    title: "Medicare Enrollment Checklist || Steps to Enroll in Medicare",
    description: "Use our Medicare enrollment checklist to make sure you don",
    url: "https://www.medicarefaq.com/medicare-enrollment/checklist/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Checklist />
    </SiteLayout>
  );
}
