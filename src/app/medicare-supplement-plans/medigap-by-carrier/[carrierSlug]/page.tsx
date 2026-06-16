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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": carrier.metaTitle,
    "description": carrier.metaDescription,
    "url": carrier.canonical,
    "dateModified": "2026-06-15",
    "author": { "@type": "Organization", "name": "MedicareFAQ" },
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png" }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "Medicare Supplement Plans", "item": "https://www.medicarefaq.com/medicare-supplement-plans/" },
        { "@type": "ListItem", "position": 3, "name": "Medigap by Carrier", "item": "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-carrier/" },
        { "@type": "ListItem", "position": 4, "name": carrier.name, "item": carrier.canonical }
      ]
    }
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageContent carrierSlug={carrierSlug} />
    </SiteLayout>
  );
}
