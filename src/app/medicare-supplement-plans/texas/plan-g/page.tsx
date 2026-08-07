import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import TexasPlanGContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan G Rates in Texas (2026) | MedicareFAQ",
  description:
    "Compare Plan G rates from 30+ carriers in Texas. See the cheapest Plan G premiums starting at $145/mo, carrier ratings, and discounts for 2026.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/texas/plan-g/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan G Rates in Texas (2026) | MedicareFAQ",
    description:
      "Compare Plan G rates from 30+ carriers in Texas. See the cheapest Plan G premiums, carrier ratings, and discounts for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/texas/plan-g/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan G Rates in Texas (2026)",
    description:
      "Compare Plan G rates from 30+ carriers in Texas for 2026. Find the cheapest premiums, carrier ratings, and available discounts.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/texas/plan-g/",
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
      { "@type": "ListItem", position: 3, name: "Texas", item: "https://www.medicarefaq.com/medicare-supplement-plans/texas/" },
      { "@type": "ListItem", position: 4, name: "Plan G" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the cheapest Plan G in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HealthSpring (formerly Cigna) currently offers the lowest Plan G premium in Texas at approximately $145 per month for a 65-year-old. However, rates vary by age, gender, zip code, and tobacco use. Comparing quotes from multiple carriers is the best way to find the lowest rate in your area.",
        },
      },
      {
        "@type": "Question",
        name: "Is Plan G worth it in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Plan G is widely considered the best value Medigap plan for anyone who became eligible for Medicare after January 1, 2020. After paying the $257 annual Part B deductible, Plan G covers 100% of Medicare-approved costs. For most Texas residents, the comprehensive coverage and predictable costs make Plan G worth the premium.",
        },
      },
      {
        "@type": "Question",
        name: "Can I switch from Plan N to Plan G in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but you will likely need to pass medical underwriting unless you have a guaranteed issue right. Texas does not have a birthday rule, so switching outside of your initial open enrollment period requires answering health questions. Some carriers are more lenient than others with underwriting.",
        },
      },
      {
        "@type": "Question",
        name: "Do all Plan G policies cover the same things?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All Medigap plans are federally standardized, meaning a Plan G from HealthSpring covers exactly the same benefits as a Plan G from Mutual of Omaha or any other carrier. The only difference between carriers is the monthly premium, customer service, and available discounts.",
        },
      },
      {
        "@type": "Question",
        name: "Does Plan G cover prescription drugs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Plan G, like all Medigap plans, does not cover prescription drugs. You need a separate Medicare Part D prescription drug plan for medication coverage. You cannot have both a Medigap plan and a Medicare Advantage plan at the same time.",
        },
      },
      {
        "@type": "Question",
        name: "When is the best time to buy Plan G in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best time is during your 6-month Medigap open enrollment period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, carriers cannot deny you coverage or charge higher premiums based on health conditions. After this period, you may face medical underwriting.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a birthday rule in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Texas does not have a Medigap birthday rule. Unlike states such as California, Oregon, and Louisiana, Texas does not provide an annual window to switch Medigap plans without medical underwriting. Your best opportunity for guaranteed acceptance is during your initial 6-month open enrollment period.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use Plan G with any doctor in Texas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Plan G works with any doctor or hospital in the United States that accepts Medicare. There are no networks, no referrals, and no prior authorizations. You can see any Medicare-participating provider in any state.",
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
      <TexasPlanGContent />
    </SiteLayout>
  );
}
