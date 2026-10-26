import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Blog from "./PageContent";
import { getBlogListing } from "@/lib/blog-listing";
import { effectiveBlogPage, blogPageHref } from "@/lib/blog-pagination";

const baseMetadata: Metadata = {
  title: "Blog",
  description: "Check out our Medicare blog where we answer the most frequently asked questions regarding everything Medicare!",
  alternates: { canonical: "https://www.medicarefaq.com/blog/" },
  openGraph: {
    title: "Blog",
    description: "Check out our Medicare blog where we answer the most frequently asked questions regarding everything Medicare!",
    url: "https://www.medicarefaq.com/blog/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "MedicareFAQ Blog",
  description: "Check out our Medicare blog where we answer the most frequently asked questions regarding everything Medicare!",
  url: "https://www.medicarefaq.com/blog/",
  publisher: {
    "@type": "Organization",
    name: "MedicareFAQ",
    url: "https://www.medicarefaq.com",
    logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
  },
};

type BlogPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = effectiveBlogPage(params.page, getBlogListing().totalPages);
  const canonical = `https://www.medicarefaq.com${blogPageHref(page)}`;
  return {
    ...baseMetadata,
    alternates: { ...baseMetadata.alternates, canonical },
    openGraph: { ...baseMetadata.openGraph, url: canonical },
  };
}

export default async function Page({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = effectiveBlogPage(params.page, getBlogListing().totalPages);

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Blog currentPage={currentPage} />
    </SiteLayout>
  );
}
