import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Arkansas 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Arkansas for 2026. All carriers use community pricing. Plan G from $118/mo. Ranked by MedicareFAQ Score. Free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/arkansas/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Arkansas 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Arkansas for 2026. All carriers use community pricing. Plan G from $118/mo.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/arkansas/",
    type: "website",
  },
};

export default function ArkansasPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Arkansas 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Arkansas for 2026. All carriers use community pricing. Plan G from $118/mo. Ranked by MedicareFAQ Score. Free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/arkansas/",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "Arkansas" },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageContent />
    </SiteLayout>
  );
}
