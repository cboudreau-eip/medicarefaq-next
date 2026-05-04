import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Client Testimonials || MedicareFAQ Reviews",
  description: "Read real testimonials from MedicareFAQ clients about their experience with our licensed Medicare agents and the enrollment process.",
  openGraph: {
    title: "Client Testimonials || MedicareFAQ Reviews",
    description: "Read real testimonials from MedicareFAQ clients.",
    url: "https://www.medicarefaq.com/testimonials",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/testimonials" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
