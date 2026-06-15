import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import LatePenalties from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Late Enrollment Penalties: What They are & How to Avoid Them",
  description: "Missing your Medicare enrollment window can result in permanent late penalties on Part A, Part B, and Part D. Learn how the penalties work and how to avoid them.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/late-enrollment-penalty/" },
  openGraph: {
    title: "Medicare Late Enrollment Penalties: What They are & How to Avoid Them",
    description: "Missing your Medicare enrollment window can result in permanent late penalties on Part A, Part B, and Part D. Learn how the penalties work and how to avoid them.",
    url: "https://www.medicarefaq.com/medicare-enrollment/late-enrollment-penalty/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <LatePenalties />
    </SiteLayout>
  );
}
