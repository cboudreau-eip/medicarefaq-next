import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaliforniaPlanGContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan G Rates in California (2026) | MedicareFAQ",
  description:
    "Compare Plan G rates from 21+ carriers in California. See the cheapest Plan G premiums starting at $166/mo, carrier ratings, and discounts for 2026. California's birthday rule lets you switch annually.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/california/plan-g/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan G Rates in California (2026) | MedicareFAQ",
    description:
      "Compare Plan G rates from 21+ carriers in California. Cheapest premiums, carrier ratings, and discounts for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/california/plan-g/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan G Rates in California (2026)",
    description:
      "Compare Plan G rates from 21+ carriers in California for 2026. Find the cheapest premiums, carrier ratings, and available discounts.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/california/plan-g/",
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
      { "@type": "ListItem", position: 3, name: "California", item: "https://www.medicarefaq.com/medicare-supplement-plans/california/" },
      { "@type": "ListItem", position: 4, name: "Plan G" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the cheapest Plan G in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HealthSpring (formerly Cigna) currently offers the lowest Plan G premium in California at approximately $166 per month for a 65-year-old. However, rates vary by age, gender, zip code, and tobacco use. Comparing quotes from multiple carriers is the best way to find the lowest rate in your area.",
        },
      },
      {
        "@type": "Question",
        name: "Is Plan G worth it in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Plan G is widely considered the best value Medigap plan for anyone who became eligible for Medicare after January 1, 2020. After paying the $257 annual Part B deductible, Plan G covers 100% of Medicare-approved costs. California's birthday rule also makes Plan G especially attractive because you can switch carriers annually to find the lowest rate.",
        },
      },
      {
        "@type": "Question",
        name: "How does the California birthday rule work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "California's birthday rule gives you 60 days starting on your birthday each year to switch to any Medigap plan with equal or lesser benefits from any carrier, without medical underwriting. This means you can shop for the cheapest Plan G every year and switch without health questions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I switch from Plan N to Plan G in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Switching from Plan N to Plan G is considered an upgrade (greater benefits), so the birthday rule does not apply for this switch. You would need to pass medical underwriting. However, switching from Plan G to a cheaper Plan G with a different carrier is covered by the birthday rule since the benefits are equal.",
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
        name: "When is the best time to buy Plan G in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best time is during your 6-month Medigap open enrollment period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, carriers cannot deny you coverage or charge higher premiums based on health conditions. After this period, California's birthday rule gives you an annual 60-day window to switch carriers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use Plan G with any doctor in California?",
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
      <CaliforniaPlanGContent />
    </SiteLayout>
  );
}
