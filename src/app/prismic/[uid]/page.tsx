import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices/components";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();

  const page = await client
    .getByUID("test_page", uid)
    .catch(() => notFound());

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();

  const page = await client
    .getByUID("test_page", uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title || "MedicareFAQ",
    description: page.data.meta_description || "",
    openGraph: {
      images: page.data.meta_image?.url
        ? [{ url: page.data.meta_image.url }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("test_page");

  return pages.map((page) => ({ uid: page.uid }));
}
