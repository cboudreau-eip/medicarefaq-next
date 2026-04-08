import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Coverage from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare FAQs | Answers to Common Medicare Questions | MedicareFAQ",
  description: "Browse hundreds of Medicare FAQs covering plans, enrollment, costs, and coverage. Get clear, unbiased answers to your Medicare questions.",
  alternates: { canonical: "https://www.medicarefaq.com/faqs/" },
  openGraph: {
    title: "Medicare FAQs | Answers to Common Medicare Questions | MedicareFAQ",
    description: "Browse hundreds of Medicare FAQs covering plans, enrollment, costs, and coverage. Get clear, unbiased answers to your Medicare questions.",
    url: "https://www.medicarefaq.com/faqs/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Coverage />
    </SiteLayout>
  );
}
