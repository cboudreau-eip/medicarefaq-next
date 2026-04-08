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
    title: page ? `${page.title} | MedicareFAQ` : "Caregiver Guide | MedicareFAQ",
    description: page?.heroDescription ?? "",
    alternates: {
      canonical: `https://www.medicarefaq.com/guide-to-being-a-caregiver/${slug}`,
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
  return (
    <SiteLayout>
      <CaregiverPageContent page={page} slug={slug} />
    </SiteLayout>
  );
}
