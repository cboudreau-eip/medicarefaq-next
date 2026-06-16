import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Advantage Plan Types",
  description: "Learn about the different types of Medicare Advantage plans including HMO, PPO, PFFS, and SNP plans.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Medicare Advantage Plan Types",
  description: "Learn about the different types of Medicare Advantage plans including HMO, PPO, PFFS, and SNP plans.",
  url: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Advantage Plans", item: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plans/" },
      { "@type": "ListItem", position: 3, name: "Plan Types", item: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types/" },
    ],
  },
  publisher: { "@type": "Organization", name: "MedicareFAQ", url: "https://www.medicarefaq.com" },
};

export default function Page() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PageContent />
    </SiteLayout>
  );
}
