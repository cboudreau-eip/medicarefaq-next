import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Birthday Rule by State 2026 | Which States Allow Plan Switching?",
  description:
    "See which states have a Medigap birthday rule that lets you switch Medicare Supplement plans without medical underwriting. Interactive map with state-by-state details.",
  openGraph: {
    title: "Medigap Birthday Rule by State 2026 | Which States Allow Plan Switching?",
    description:
      "See which states have a Medigap birthday rule that lets you switch Medicare Supplement plans without medical underwriting. Interactive map with state-by-state details.",
    url: "https://www.medicarefaq.com/medicare-by-state/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-by-state/",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Medigap Birthday Rule by State 2026 | Which States Allow Plan Switching?",
  url: "https://www.medicarefaq.com/medicare-by-state/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare by State", item: "https://www.medicarefaq.com/medicare-by-state/" },
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
