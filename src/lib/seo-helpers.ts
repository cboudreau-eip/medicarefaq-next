import type { Metadata } from "next";

interface SEOInput {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function buildMetadata(input: SEOInput): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: input.canonical ? { canonical: input.canonical } : undefined,
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.canonical,
      type: input.ogType || "website",
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
