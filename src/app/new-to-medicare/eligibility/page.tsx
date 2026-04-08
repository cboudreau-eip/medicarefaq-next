import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Eligibility from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Eligibility | Who Qualifies for Medicare? | MedicareFAQ",
  description: "Find out if you qualify for Medicare. Learn about age requirements, disability eligibility, and how to enroll when you become eligible.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/eligibility/" },
  openGraph: {
    title: "Medicare Eligibility | Who Qualifies for Medicare? | MedicareFAQ",
    description: "Find out if you qualify for Medicare. Learn about age requirements, disability eligibility, and how to enroll when you become eligible.",
    url: "https://www.medicarefaq.com/original-medicare/eligibility/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Eligibility />
    </SiteLayout>
  );
}
