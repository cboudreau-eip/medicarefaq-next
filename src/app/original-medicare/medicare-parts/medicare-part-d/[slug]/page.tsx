import type { Metadata } from "next";
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
  return (
    <SiteLayout>
      <PageContent slug={slug} />
    </SiteLayout>
  );
}
