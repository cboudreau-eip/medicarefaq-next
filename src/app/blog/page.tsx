import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Blog from "./PageContent";

export const metadata: Metadata = {
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

export default async function Page({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const requestedPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number.parseInt(requestedPage ?? "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Blog currentPage={currentPage} />
    </SiteLayout>
  );
}
