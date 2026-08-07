import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PennsylvaniaPlanGContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plan G Rates in Pennsylvania (2026) | MedicareFAQ",
  description:
    "Compare Plan G rates from 30+ carriers in Pennsylvania. See the cheapest Plan G premiums starting at $133/mo, carrier ratings, and discounts for 2026.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/pennsylvania/plan-g/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plan G Rates in Pennsylvania (2026) | MedicareFAQ",
    description:
      "Compare Plan G rates from 30+ carriers in Pennsylvania. Cheapest premiums, carrier ratings, and discounts for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/pennsylvania/plan-g/",
    type: "article",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plan G Rates in Pennsylvania (2026)",
    description: "Compare Plan G rates from 30+ carriers in Pennsylvania for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/pennsylvania/plan-g/",
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
      { "@type": "ListItem", position: 3, name: "Pennsylvania", item: "https://www.medicarefaq.com/medicare-supplement-plans/pennsylvania/" },
      { "@type": "ListItem", position: 4, name: "Plan G" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is the cheapest Plan G in Pennsylvania?", acceptedAnswer: { "@type": "Answer", text: "HealthSpring (formerly Cigna) currently offers the lowest Plan G premium in Pennsylvania at approximately $133 per month for a 65-year-old. Rates vary by age, gender, zip code, and tobacco use." } },
      { "@type": "Question", name: "Is Plan G worth it in Pennsylvania?", acceptedAnswer: { "@type": "Answer", text: "Plan G is widely considered the best value Medigap plan for anyone eligible after January 1, 2020. After paying the $257 annual Part B deductible, Plan G covers 100% of Medicare-approved costs." } },
      { "@type": "Question", name: "Can I switch Plan G carriers in Pennsylvania?", acceptedAnswer: { "@type": "Answer", text: "Yes, but you will likely need to pass medical underwriting. Pennsylvania does not have a birthday rule, so switching outside of your initial open enrollment period requires answering health questions." } },
      { "@type": "Question", name: "Is there a birthday rule in Pennsylvania?", acceptedAnswer: { "@type": "Answer", text: "No. Pennsylvania does not have a Medigap birthday rule. Your best opportunity for guaranteed acceptance is during your initial 6-month open enrollment period starting when you turn 65 and enroll in Part B." } },
      { "@type": "Question", name: "Does Plan G cover prescription drugs?", acceptedAnswer: { "@type": "Answer", text: "No. Plan G does not cover prescription drugs. You need a separate Medicare Part D plan for medication coverage." } },
      { "@type": "Question", name: "Can I use Plan G with any doctor in Pennsylvania?", acceptedAnswer: { "@type": "Answer", text: "Yes. Plan G works with any doctor or hospital in the United States that accepts Medicare. There are no networks, no referrals, and no prior authorizations." } },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PennsylvaniaPlanGContent />
    </SiteLayout>
  );
}
