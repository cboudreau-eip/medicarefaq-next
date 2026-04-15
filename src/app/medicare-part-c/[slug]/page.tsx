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
      canonical: `https://www.medicarefaq.com/medicare-part-c/${slug}`,
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
  return (
    <SiteLayout>
      <MedicareAdvantagePageContent page={page} slug={slug} />
    </SiteLayout>
  );
}
