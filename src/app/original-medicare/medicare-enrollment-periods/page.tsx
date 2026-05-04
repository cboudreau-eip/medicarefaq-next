import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Enrollment Periods 2026 || IEP, SEP, GEP, AEP Explained",
  description: "Understand all Medicare enrollment periods in 2026 — Initial Enrollment Period (IEP), Special Enrollment Period (SEP), General Enrollment Period (GEP), and Annual Enrollment Period (AEP).",
  openGraph: {
    title: "Medicare Enrollment Periods 2026 || IEP, SEP, GEP, AEP Explained",
    description: "Understand all Medicare enrollment periods in 2026 — Initial Enrollment Period (IEP), Special Enrollment Period (SEP), General Enrollment Period (GEP), and Annual Enrollment Period (AEP).",
    url: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
