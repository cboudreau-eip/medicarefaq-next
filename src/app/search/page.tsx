import type { Metadata } from "next";
import { Suspense } from "react";
import SiteLayout from "@/components/SiteLayout";
import SearchResults from "./PageContent";

export const metadata: Metadata = {
  title: "Search Medicare Topics | MedicareFAQ",
  description: "Search MedicareFAQ for answers to your Medicare questions. Find articles, guides, and FAQs on Medicare plans, enrollment, costs, and more.",
  alternates: { canonical: "https://www.medicarefaq.com/search/" },
  openGraph: {
    title: "Search Medicare Topics | MedicareFAQ",
    description: "Search MedicareFAQ for answers to your Medicare questions. Find articles, guides, and FAQs on Medicare plans, enrollment, costs, and more.",
    url: "https://www.medicarefaq.com/search/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Suspense fallback={<div className="container py-20 text-center text-gray-500">Loading search...</div>}>
        <SearchResults />
      </Suspense>
    </SiteLayout>
  );
}
