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

  return (
    <SiteLayout>
      <PageContent planSlug={planSlug} />
    </SiteLayout>
  );
}
