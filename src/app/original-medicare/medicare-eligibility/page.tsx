import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Eligibility Requirements 2026 | Who Qualifies for Medicare?",
  description: "Learn who qualifies for Medicare in 2026. Understand age eligibility (65+), disability eligibility, ESRD, and how to check if you qualify for premium-free Part A.",
  openGraph: {
    title: "Medicare Eligibility Requirements 2026 | Who Qualifies for Medicare?",
    description: "Learn who qualifies for Medicare in 2026. Understand age eligibility (65+), disability eligibility, ESRD, and how to check if you qualify for premium-free Part A.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-eligibility/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-eligibility/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
