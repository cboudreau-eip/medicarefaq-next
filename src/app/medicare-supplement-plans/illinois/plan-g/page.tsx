import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import IllinoisPlanGContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan G Rates in Illinois (2026) | MedicareFAQ",
  description:
    "Compare Plan G rates from 30+ carriers in Illinois. Cheapest Plan G premiums starting at $118/mo. Illinois birthday rule lets policyholders ages 65-75 switch annually.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/illinois/plan-g/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan G Rates in Illinois (2026) | MedicareFAQ",
    description: "Compare Plan G rates from 30+ carriers in Illinois. Cheapest premiums, carrier ratings, and discounts for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/illinois/plan-g/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan G Rates in Illinois (2026)",
    description: "Compare Plan G rates from 30+ carriers in Illinois for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/illinois/plan-g/",
    dateModified: "2026-08-07",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: { "@type": "Organization", name: "MedicareFAQ", logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" } },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "Illinois", item: "https://www.medicarefaq.com/medicare-supplement-plans/illinois/" },
      { "@type": "ListItem", position: 4, name: "Plan G" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is the cheapest Plan G in Illinois?", acceptedAnswer: { "@type": "Answer", text: "HealthSpring (formerly Cigna) currently offers the lowest Plan G premium in Illinois at approximately $118 per month for a 65-year-old. Rates vary by age, gender, zip code, and tobacco use." } },
      { "@type": "Question", name: "Does Illinois have a Medigap birthday rule?", acceptedAnswer: { "@type": "Answer", text: "Yes, but with important limitations. Illinois has a birthday rule for policyholders aged 65-75 that gives you 45 days starting on your birthday to switch to a plan with equal or lesser benefits from your current insurer or its authorized affiliates. Unlike California, you cannot switch to a completely different carrier using this rule, and it ends at age 75." } },
      { "@type": "Question", name: "Can I switch Plan G carriers in Illinois?", acceptedAnswer: { "@type": "Answer", text: "Switching to a completely different carrier requires passing medical underwriting in Illinois. The birthday rule only allows switching within your current insurer or its affiliates. Your best opportunity to choose any carrier freely is during your initial 6-month open enrollment period." } },
      { "@type": "Question", name: "Is Plan G worth it in Illinois?", acceptedAnswer: { "@type": "Answer", text: "Plan G is widely considered the best value Medigap plan for anyone eligible after January 1, 2020. After paying the $257 annual Part B deductible, Plan G covers 100% of Medicare-approved costs." } },
      { "@type": "Question", name: "Does Plan G cover prescription drugs?", acceptedAnswer: { "@type": "Answer", text: "No. Plan G does not cover prescription drugs. You need a separate Medicare Part D plan for medication coverage." } },
      { "@type": "Question", name: "Can I use Plan G with any doctor in Illinois?", acceptedAnswer: { "@type": "Answer", text: "Yes. Plan G works with any doctor or hospital in the United States that accepts Medicare. There are no networks, no referrals, and no prior authorizations." } },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <IllinoisPlanGContent />
    </SiteLayout>
  );
}
