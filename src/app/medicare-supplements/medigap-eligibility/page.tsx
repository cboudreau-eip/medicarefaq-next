import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Enrolled in Medicare Part A and Part B",
  description: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
  openGraph: {
    title: "Enrolled in Medicare Part A and Part B",
    description: "Learn who is eligible for Medigap, when to enroll, and how medical underwriting works. Find out about your Medigap Open Enrollment Period and guaranteed issue rights.",
    url: "https://www.medicarefaq.com/medicare-supplements/medigap-eligibility/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-eligibility/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
