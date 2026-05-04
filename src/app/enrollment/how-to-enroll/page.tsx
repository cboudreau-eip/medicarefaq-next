import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import HowToEnroll from "./PageContent";

export const metadata: Metadata = {
  title: "How to Enroll in Medicare || Step-by-Step Guide",
  description: "Learn how to enroll in Medicare step by step. Find out when to sign up, how to apply online or by phone, and what to do if you missed your enrollment window.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/how-to-enroll/" },
  openGraph: {
    title: "How to Enroll in Medicare || Step-by-Step Guide",
    description: "Learn how to enroll in Medicare step by step. Find out when to sign up, how to apply online or by phone, and what to do if you missed your enrollment window.",
    url: "https://www.medicarefaq.com/medicare-enrollment/how-to-enroll/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <HowToEnroll />
    </SiteLayout>
  );
}
