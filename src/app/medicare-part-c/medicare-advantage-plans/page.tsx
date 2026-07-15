import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareAdvantage from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part C (Medicare Advantage) Explained 2026 | MedicareFAQ",
  description: "Learn what Medicare Part C (Medicare Advantage) covers, costs, plan types, pros & cons, and how to enroll. Compare plans in your area for 2026.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-part-c/" },
  openGraph: {
    title: "Medicare Part C (Medicare Advantage) Explained 2026 | MedicareFAQ",
    description: "Learn what Medicare Part C (Medicare Advantage) covers, costs, plan types, pros & cons, and how to enroll. Compare plans in your area for 2026.",
    url: "https://www.medicarefaq.com/medicare-part-c/",
    type: "article",
    images: [{ url: "/images/medicarefaq-cover.jpg" }],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Medicare Part C (Medicare Advantage) Explained 2026",
  description: "Learn what Medicare Part C (Medicare Advantage) covers, costs, plan types, pros & cons, and how to enroll. Compare plans in your area for 2026.",
  url: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plans/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Advantage Plans", item: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plans/" },
    ],
  },
  publisher: { "@type": "Organization", name: "MedicareFAQ", url: "https://www.medicarefaq.com" },
};

export default function Page() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <MedicareAdvantage />
    </SiteLayout>
  );
}
