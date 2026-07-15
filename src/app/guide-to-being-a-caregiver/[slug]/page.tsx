import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaregiverPageContent from "../CaregiverPageContent";
import { CAREGIVER_PAGES } from "@/lib/caregiver-guide-data";

export async function generateStaticParams() {
  return CAREGIVER_PAGES
    .filter((p) => p.slug !== "") // exclude index page
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = CAREGIVER_PAGES.find((p) => p.slug === slug);
  return {
    title: page ? page.title : "Caregiver Guide",
    description: page?.heroDescription ?? "",
    alternates: {
      canonical: `https://www.medicarefaq.com/guide-to-being-a-caregiver/${slug}/`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = CAREGIVER_PAGES.find((p) => p.slug === slug)!;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page?.title ?? "Caregiver Guide",
    description: page?.heroDescription ?? "",
    url: `https://www.medicarefaq.com/guide-to-being-a-caregiver/${slug}/`,
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
        { "@type": "ListItem", position: 2, name: "Guide to Being a Caregiver", item: "https://www.medicarefaq.com/guide-to-being-a-caregiver/" },
        { "@type": "ListItem", position: 3, name: page?.title ?? slug, item: `https://www.medicarefaq.com/guide-to-being-a-caregiver/${slug}/` },
      ],
    },
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CaregiverPageContent page={page} slug={slug} />
    </SiteLayout>
  );
}
