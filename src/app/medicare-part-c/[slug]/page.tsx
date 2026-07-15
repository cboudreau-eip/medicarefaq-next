import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareAdvantagePageContent from "../MedicareAdvantagePageContent";
import { MEDICARE_ADVANTAGE_PAGES } from "@/lib/medicare-advantage-sub-data";

export async function generateStaticParams() {
  return MEDICARE_ADVANTAGE_PAGES
    .filter((p) => p.slug !== "") // exclude index page (handled by /medicare-part-c/medicare-advantage-plans)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = MEDICARE_ADVANTAGE_PAGES.find((p) => p.slug === slug);
  return {
    title: page ? page.title : "Medicare Advantage",
    description: page?.heroDescription ?? "",
    alternates: {
      canonical: `https://www.medicarefaq.com/medicare-part-c/${slug}/`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = MEDICARE_ADVANTAGE_PAGES.find((p) => p.slug === slug)!;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page?.title ?? "Medicare Advantage",
    description: page?.heroDescription ?? "",
    url: `https://www.medicarefaq.com/medicare-part-c/${slug}/`,
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
        { "@type": "ListItem", position: 2, name: "Medicare Advantage Plans", item: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plans/" },
        { "@type": "ListItem", position: 3, name: page?.title ?? slug, item: `https://www.medicarefaq.com/medicare-part-c/${slug}/` },
      ],
    },
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <MedicareAdvantagePageContent page={page} slug={slug} />
    </SiteLayout>
  );
}
