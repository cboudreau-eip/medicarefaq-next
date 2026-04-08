import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import AnnualChanges from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Annual Enrollment Period | AEP Dates & Changes | MedicareFAQ",
  description: "The Medicare Annual Enrollment Period runs October 15 – December 7 each year. Learn what changes you can make and how to review your coverage for the coming year.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/annual-enrollment-period/" },
  openGraph: {
    title: "Medicare Annual Enrollment Period | AEP Dates & Changes | MedicareFAQ",
    description: "The Medicare Annual Enrollment Period runs October 15 – December 7 each year. Learn what changes you can make and how to review your coverage for the coming year.",
    url: "https://www.medicarefaq.com/medicare-enrollment/annual-enrollment-period/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <AnnualChanges />
    </SiteLayout>
  );
}
