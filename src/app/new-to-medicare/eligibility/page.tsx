import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Eligibility from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Eligibility Requirements (2025) | Who Qualifies for Medicare?",
  description: "Learn the requirements to qualify for Medicare. Covers age 65+, disability, ALS, ESRD eligibility, citizenship rules, and enrollment windows.",
  alternates: { canonical: "https://www.medicarefaq.com/new-to-medicare/eligibility/" },
  openGraph: {
    title: "Medicare Eligibility Requirements | Who Qualifies for Medicare?",
    description: "Learn the requirements to qualify for Medicare. Covers age 65+, disability, ALS, ESRD eligibility, citizenship rules, and enrollment windows.",
    url: "https://www.medicarefaq.com/new-to-medicare/eligibility/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Eligibility Requirements: Who Qualifies for Medicare in 2025",
    description: "Comprehensive guide to Medicare eligibility requirements including age, disability, ALS, ESRD pathways, citizenship rules, work history, and enrollment windows.",
    url: "https://www.medicarefaq.com/new-to-medicare/eligibility/",
    datePublished: "2024-06-15",
    dateModified: "2025-07-16",
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
      { "@type": "ListItem", position: 3, name: "Eligibility Requirements" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the basic requirements to qualify for Medicare?",
        acceptedAnswer: { "@type": "Answer", text: "You must be a U.S. citizen or permanent legal resident (5+ years) and either be age 65 or older, have received SSDI for 24 months, or have ALS or End-Stage Renal Disease. You or your spouse must also have paid Medicare taxes for at least 10 years (40 quarters) to receive premium-free Part A." },
      },
      {
        "@type": "Question",
        name: "Can I get Medicare if I have never worked?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, but you may need to pay a premium for Part A. If your spouse has worked and paid Medicare taxes for at least 10 years (40 quarters), you can qualify for premium-free Part A based on their work record. Otherwise, you can purchase Part A at the full premium rate." },
      },
      {
        "@type": "Question",
        name: "Do I need to be a U.S. citizen to get Medicare?",
        acceptedAnswer: { "@type": "Answer", text: "You do not need to be a citizen, but you must be a permanent legal resident (green card holder) who has lived in the United States continuously for at least 5 years. Temporary visa holders and undocumented residents are not eligible." },
      },
      {
        "@type": "Question",
        name: "What happens if I miss my enrollment window?",
        acceptedAnswer: { "@type": "Answer", text: "If you miss your Initial Enrollment Period and do not qualify for a Special Enrollment Period, you will have to wait for the General Enrollment Period (January 1 through March 31 each year, with coverage starting July 1). You may also face a late enrollment penalty of 10% added to your Part B premiums for each 12-month period you were eligible but did not enroll." },
      },
      {
        "@type": "Question",
        name: "Am I automatically enrolled in Medicare at 65?",
        acceptedAnswer: { "@type": "Answer", text: "If you are already receiving Social Security benefits when you turn 65, you will be automatically enrolled in Medicare Parts A and B. Your Medicare card will arrive about 3 months before your 65th birthday. If you are not receiving Social Security, you need to actively enroll during your Initial Enrollment Period." },
      },
      {
        "@type": "Question",
        name: "Can I qualify for Medicare under my spouse's work record?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. If your spouse has worked and paid Medicare taxes for at least 40 quarters (10 years), you can qualify for premium-free Part A at age 65 based on their work record, even if you have never worked yourself. This applies to current spouses, divorced spouses (if married 10+ years), and surviving spouses." },
      },
      {
        "@type": "Question",
        name: "I am under 65 with a disability. When does my Medicare start?",
        acceptedAnswer: { "@type": "Answer", text: "Medicare begins after you have received Social Security Disability Insurance (SSDI) benefits for 24 consecutive months. The exception is ALS (Lou Gehrig's disease), which qualifies you for Medicare immediately without a waiting period." },
      },
      {
        "@type": "Question",
        name: "Is there a penalty for not signing up for Medicare when I am first eligible?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. For Part B, you will pay a 10% premium surcharge for each full 12-month period you could have had Part B but did not sign up. For Part D, the penalty is 1% of the national base beneficiary premium multiplied by the number of months you went without creditable drug coverage. These penalties are permanent." },
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
      <Eligibility />
    </SiteLayout>
  );
}
