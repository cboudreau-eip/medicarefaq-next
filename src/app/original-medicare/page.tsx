import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import OriginalMedicare from "./PageContent";

export const metadata: Metadata = {
  title: "Original Medicare | What Is Original Medicare?",
  description: "Original Medicare is the traditional fee-for-service health insurance program offered by the federal government. Learn about Parts A and B, what they cover, and how they work.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/" },
  openGraph: {
    title: "Original Medicare | What Is Original Medicare?",
    description: "Original Medicare is the traditional fee-for-service health insurance program offered by the federal government. Learn about Parts A and B, what they cover, and how they work.",
    url: "https://www.medicarefaq.com/original-medicare/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <OriginalMedicare />
    </SiteLayout>
  );
}
