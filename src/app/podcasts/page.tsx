import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Podcast from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Podcasts | Listen & Learn About Medicare",
  description: "Listen to the MedicareFAQ podcast — short, expert-led audio episodes covering Medicare plans, enrollment, costs, and common questions. Free to stream.",
  alternates: { canonical: "https://www.medicarefaq.com/podcasts/" },
  openGraph: {
    title: "Medicare Podcasts | Listen & Learn About Medicare",
    description: "Listen to the MedicareFAQ podcast — short, expert-led audio episodes covering Medicare plans, enrollment, costs, and common questions. Free to stream.",
    url: "https://www.medicarefaq.com/podcasts/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Podcast />
    </SiteLayout>
  );
}
