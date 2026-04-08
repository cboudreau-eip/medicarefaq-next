import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";
import { CARRIER_DATA, getCarrierBySlug } from "@/lib/medigap-carrier-data";

// Generate all 15 carrier pages at build time (SSG)
export function generateStaticParams() {
  return CARRIER_DATA.map((carrier) => ({
    carrierSlug: carrier.slug,
  }));
}

// Dynamic metadata per carrier
export async function generateMetadata({
  params,
}: {
  params: Promise<{ carrierSlug: string }>;
}): Promise<Metadata> {
  const { carrierSlug } = await params;
  const carrier = getCarrierBySlug(carrierSlug);
  if (!carrier) return {};

  return {
    title: carrier.metaTitle,
    description: carrier.metaDescription,
    openGraph: {
      title: carrier.metaTitle,
      description: carrier.metaDescription,
      url: carrier.canonical,
      type: "article",
      images: carrier.ogImage ? [{ url: carrier.ogImage }] : undefined,
    },
    alternates: {
      canonical: carrier.canonical,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ carrierSlug: string }>;
}) {
  const { carrierSlug } = await params;
  const carrier = getCarrierBySlug(carrierSlug);
  if (!carrier) notFound();

  return (
    <SiteLayout>
      <PageContent carrierSlug={carrierSlug} />
    </SiteLayout>
  );
}
