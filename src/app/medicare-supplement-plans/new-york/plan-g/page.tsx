import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import NewYorkPlanGContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan G Rates in New York (2026) | MedicareFAQ",
  description:
    "Compare Plan G rates from 15+ carriers in New York. Community-rated pricing means the same rate at any age. Year-round guaranteed issue lets you switch anytime.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/plan-g/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan G Rates in New York (2026) | MedicareFAQ",
    description:
      "Compare Plan G rates from 15+ carriers in New York. Community-rated pricing, year-round guaranteed issue, no health questions.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/plan-g/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan G Rates in New York (2026)",
    description:
      "Compare Plan G rates from 15+ carriers in New York for 2026. Community-rated pricing and year-round guaranteed issue.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/plan-g/",
    dateModified: "2026-08-07",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: {
        "@type": "ImageObject",
        url: "https://www.medicarefaq.com/images/medicarefaq-logo.png",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "New York", item: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/" },
      { "@type": "ListItem", position: 4, name: "Plan G" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the cheapest Plan G in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Transamerica currently offers the lowest Plan G premium in New York at approximately $360 per month. Because New York requires community-rated pricing, this rate is the same regardless of your age. Comparing quotes from multiple carriers is the best way to find the lowest rate.",
        },
      },
      {
        "@type": "Question",
        name: "Why is Plan G more expensive in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "New York requires community-rated pricing, meaning everyone pays the same premium regardless of age. This makes rates higher at age 65 compared to attained-age states, but the tradeoff is that your premium will not increase as you age. Over a lifetime, New York residents often pay less total than those in attained-age states.",
        },
      },
      {
        "@type": "Question",
        name: "Can I switch Plan G carriers anytime in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. New York guarantees year-round open enrollment for Medigap plans. You can switch carriers at any time without medical underwriting. No health questions, no waiting periods. This is the strongest consumer protection of any state.",
        },
      },
      {
        "@type": "Question",
        name: "Do all Plan G policies cover the same things in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All Medigap plans are federally standardized. A Plan G from Transamerica covers exactly the same benefits as a Plan G from AARP/UnitedHealthcare or any other carrier. The only difference is the monthly premium and customer service.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a birthday rule in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "New York does not need a birthday rule because it offers something better: year-round guaranteed issue. You can switch Medigap plans at any time without medical underwriting. No health questions, no waiting periods, no restrictions.",
        },
      },
      {
        "@type": "Question",
        name: "Does Plan G cover prescription drugs in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Plan G does not cover prescription drugs in any state. You need a separate Medicare Part D plan for medication coverage.",
        },
      },
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
      <NewYorkPlanGContent />
    </SiteLayout>
  );
}
