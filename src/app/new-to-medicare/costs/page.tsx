import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How Much Does Medicare Cost in 2026? Premiums, Deductibles & Total Costs",
  description: "Medicare costs in 2026: Part B premium is $202.90/month, Part A hospital deductible is $1,736, and Part D has a $2,000 out-of-pocket cap. Full breakdown of every premium, deductible, and coinsurance.",
  openGraph: {
    title: "How Much Does Medicare Cost in 2026? Premiums, Deductibles & Total Costs",
    description: "Medicare costs in 2026: Part B premium is $202.90/month, Part A hospital deductible is $1,736, and Part D has a $2,000 out-of-pocket cap. Full breakdown of every premium, deductible, and coinsurance.",
    url: "https://www.medicarefaq.com/new-to-medicare/costs/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/new-to-medicare/costs/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does Medicare Cost in 2026? Premiums, Deductibles & Total Costs",
    description: "Medicare costs in 2026: Part B premium is $202.90/month, Part A hospital deductible is $1,736, and Part D has a $2,000 out-of-pocket cap. Full breakdown of every premium, deductible, and coinsurance.",
    url: "https://www.medicarefaq.com/new-to-medicare/costs/",
    dateModified: "2026-08-07",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "New to Medicare", item: "https://www.medicarefaq.com/new-to-medicare/" },
      { "@type": "ListItem", position: 3, name: "Medicare Costs" },
    ],
  };


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is Medicare Free?", acceptedAnswer: { "@type": "Answer", text: "Part A is premium-free for most people who worked 10+ years. Part B costs $202.90/month in 2026. You also pay deductibles, coinsurance, and copays." } },
      { "@type": "Question", name: "How much does Medicare Part B cost in 2026?", acceptedAnswer: { "@type": "Answer", text: "The standard Medicare Part B premium is $202.90 per month in 2026. The annual deductible is $283. After the deductible, you pay 20% coinsurance on Medicare-approved services." } },
      { "@type": "Question", name: "What is the maximum out-of-pocket cost for Medicare?", acceptedAnswer: { "@type": "Answer", text: "Original Medicare has no out-of-pocket maximum. Medicare Advantage plans cap costs at $9,250 in-network for 2026. Medigap Plan G limits your costs to the $283 Part B deductible." } },
      { "@type": "Question", name: "What is IRMAA and will it affect me?", acceptedAnswer: { "@type": "Answer", text: "IRMAA is a surcharge on Part B and Part D premiums for individuals earning above $109,000 or couples above $218,000. It is based on your tax return from 2 years prior." } },
      { "@type": "Question", name: "How much does a Medigap plan cost?", acceptedAnswer: { "@type": "Answer", text: "Medigap Plan G typically costs $100-$300/month depending on age, location, and carrier. Plans are standardized by letter so benefits are identical regardless of insurance company." } },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageContent />
    </SiteLayout>
  );
}
