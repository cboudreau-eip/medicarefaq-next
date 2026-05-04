import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part B Enrollment: How and When to Sign up (2026)",
  description: "Learn when and how to enroll in Medicare Part B in 2026. Understand the Initial Enrollment Period, Special Enrollment Period, late penalties, and step-by-step application instructions.",
  openGraph: {
    title: "Medicare Part B Enrollment: How and When to Sign up (2026)",
    description: "Learn when and how to enroll in Medicare Part B in 2026. Understand the Initial Enrollment Period, Special Enrollment Period, late penalties, and step-by-step application instructions.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-b-enrollment" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
