import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";
import { partDSubPages } from "@/lib/part-d-sub-data";

export async function generateStaticParams() {
  return partDSubPages
    .filter((p) => p.slug !== "mutual-of-omaha") // has its own dedicated page
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = partDSubPages.find((p) => p.slug === slug);
  return {
    title: page?.metaTitle ?? "Medicare Part D",
    description:
      page?.metaDescription ??
      "Learn about Medicare Part D prescription drug coverage.",
    alternates: {
      canonical: `https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = partDSubPages.find((p) => p.slug === slug);
  if (!page) {
    notFound();
  }

  const pageUrl = `https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/${slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.metaTitle,
    "description": page.metaDescription,
    "url": pageUrl,
    "dateModified": "2026-06-15",
    "author": { "@type": "Organization", "name": "MedicareFAQ" },
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png" }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "Original Medicare", "item": "https://www.medicarefaq.com/original-medicare/" },
        { "@type": "ListItem", "position": 3, "name": "Medicare Part D", "item": "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/" },
        { "@type": "ListItem", "position": 4, "name": page.title, "item": pageUrl }
      ]
    }
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageContent page={page} />
    </SiteLayout>
  );
}
