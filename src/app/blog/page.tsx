import type { Metadata } from "next";
import { Suspense } from "react";
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
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
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
    logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png" },
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#F5F7FA]" />}>
        <Blog />
      </Suspense>
    </SiteLayout>
  );
}
