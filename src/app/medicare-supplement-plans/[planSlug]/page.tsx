import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";
import { MEDIGAP_PLANS } from "@/lib/medigap-plan-data";

// Generate all 12 plan pages at build time (SSG)
export function generateStaticParams() {
  return Object.keys(MEDIGAP_PLANS).map((planSlug) => ({
    planSlug,
  }));
}

// Dynamic metadata per plan
export async function generateMetadata({
  params,
}: {
  params: Promise<{ planSlug: string }>;
}): Promise<Metadata> {
  const { planSlug } = await params;
  const plan = MEDIGAP_PLANS[planSlug];
  if (!plan) return {};

  return {
    title: plan.metaTitle,
    description: plan.metaDescription,
    openGraph: {
      title: plan.metaTitle,
      description: plan.metaDescription,
      url: plan.canonical,
      type: "article",
      images: plan.ogImage ? [{ url: plan.ogImage }] : undefined,
    },
    alternates: {
      canonical: plan.canonical,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ planSlug: string }>;
}) {
  const { planSlug } = await params;
  const plan = MEDIGAP_PLANS[planSlug];
  if (!plan) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: plan.metaTitle,
    description: plan.metaDescription,
    url: plan.canonical,
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplement Plans", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: plan.metaTitle },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageContent planSlug={planSlug} />
    </SiteLayout>
  );
}
