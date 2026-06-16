import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import About from "./PageContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
  alternates: { canonical: "https://www.medicarefaq.com/about-us/" },
  openGraph: {
    title: "About Us",
    description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
    url: "https://www.medicarefaq.com/about-us/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/xxbdybfbexe.jpg" }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About MedicareFAQ",
  description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
  url: "https://www.medicarefaq.com/about-us/",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <About />
    </SiteLayout>
  );
}
