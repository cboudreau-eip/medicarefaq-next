import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import WorkingPast65 from "./PageContent";

export const metadata: Metadata = {
  title: "Working past 65 and Medicare | What You Need to Know",
  description: "If you",
  alternates: { canonical: "https://www.medicarefaq.com/faqs/when-should-you-enroll-in-medicare-if-still-working/" },
  openGraph: {
    title: "Working past 65 and Medicare | What You Need to Know",
    description: "If you",
    url: "https://www.medicarefaq.com/faqs/when-should-you-enroll-in-medicare-if-still-working/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <WorkingPast65 />
    </SiteLayout>
  );
}
