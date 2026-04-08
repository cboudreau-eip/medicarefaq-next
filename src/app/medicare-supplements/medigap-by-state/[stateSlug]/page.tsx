import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";
import { STATE_DATA, getStateBySlug } from "@/lib/medigap-state-data";

// Generate all 23 state pages at build time (SSG)
export function generateStaticParams() {
  return STATE_DATA.map((state) => ({
    stateSlug: state.slug,
  }));
}

// Dynamic metadata per state
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return {};

  return {
    title: state.metaTitle,
    description: state.metaDescription,
    openGraph: {
      title: state.metaTitle,
      description: state.metaDescription,
      url: state.canonical,
      type: "article",
      images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg" }],
    },
    alternates: {
      canonical: state.canonical,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  return (
    <SiteLayout>
      <PageContent stateSlug={stateSlug} />
    </SiteLayout>
  );
}
