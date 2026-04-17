"use client";
/**
 * Medicare Coverage Page
 * URL: /original-medicare/medicare-coverage
 * Covers: what Medicare covers, Part A/B/C/D coverage, what's not covered
 */
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ChevronDown, Phone, AlertTriangle } from "lucide-react";
import { FAQSchema, BreadcrumbSchema, ArticleSchema } from "@/components/schema";

const faqs = [
  {
    q: "What does Original Medicare cover?",
    a: "Original Medicare (Parts A and B) covers hospital care, skilled nursing facility care, hospice care, home health care, doctor visits, outpatient services, preventive care, durable medical equipment, and mental health services. It does not cover most prescription drugs, dental, vision, or hearing.",
  },
  {
    q: "Does Medicare cover dental, vision, and hearing?",
    a: "Original Medicare (Parts A and B) does not cover routine dental care, routine eye exams, eyeglasses, or hearing aids. Medicare Advantage (Part C) plans often include these benefits, though coverage varies by plan. Some standalone dental and vision plans are also available to Medicare beneficiaries.",
  },
  {
    q: "Does Medicare cover prescription drugs?",
    a: "Original Medicare does not cover most prescription drugs taken at home. To get drug coverage, you need to enroll in a standalone Medicare Part D plan or choose a Medicare Advantage plan that includes drug coverage (MAPD). Failing to enroll in Part D when first eligible can result in a permanent late enrollment penalty.",
  },
  {
    q: "At what age does Medicare coverage start?",
    a: "Medicare coverage typically starts at age 65. If you are automatically enrolled (because you receive Social Security benefits), your coverage begins the first day of your birthday month — or the first day of the prior month if your birthday falls on the 1st. If you sign up during your Initial Enrollment Period, your start date depends on when you enroll.",
  },
  {
    q: "What does Medicare not cover?",
    a: "Medicare does not cover long-term custodial care (nursing home care for daily activities), routine dental, vision, and hearing, cosmetic surgery, acupuncture (except for chronic low back pain), most care received outside the U.S., and most prescription drugs. A Medigap plan can help cover Medicare's cost-sharing gaps, but it doesn't add these excluded benefits.",
  },
];

const coveredServices = [
  "Hospital inpatient stays (Part A)",
  "Skilled nursing facility care (Part A)",
  "Hospice care (Part A)",
  "Home health care (Parts A & B)",
  "Doctor visits and specialist care (Part B)",
  "Outpatient surgery and procedures (Part B)",
  "Preventive screenings and vaccines (Part B)",
  "Durable medical equipment (Part B)",
  "Mental health services (Part B)",
  "Ambulance services (Part B)",
  "Prescription drugs — with Part D plan",
  "Chronic care management (Part B)",
];

const notCoveredServices = [
  "Routine dental care and dentures",
  "Routine vision exams and eyeglasses",
  "Hearing aids and exams",
  "Long-term custodial nursing home care",
  "Most care outside the United States",
  "Cosmetic surgery",
  "Most prescription drugs (without Part D)",
  "Acupuncture (except chronic low back pain)",
  "Foot care (routine)",
];

export default function MedicareCoverage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs}  />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.medicarefaq.com/" },
          { name: "Original Medicare", url: "https://www.medicarefaq.com/original-medicare/" },
          { name: "Medicare Coverage", url: "https://www.medicarefaq.com/original-medicare/medicare-coverage/" },
        ]}
      />
      <ArticleSchema
        title="What Does Medicare Cover in 2026? | Medicare Coverage Guide"
        description="Learn what Medicare covers in 2026 — from hospital stays and doctor visits to prescription drugs and preventive care."
        url="https://www.medicarefaq.com/original-medicare/medicare-coverage/"
        datePublished="2024-01-15T00:00:00+00:00"
        dateModified="2026-01-10T00:00:00+00:00"
        authorName="David Haass"
        authorUrl="https://www.medicarefaq.com/about/"
        imageUrl="https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg"
      />

      {/* Hero */}
      <section className="bg-[#1B2A4A] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Medicare Coverage</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Medicare Coverage</h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            Medicare covers a wide range of medical services, but there are important gaps. Understanding what Medicare does and doesn't cover helps you choose the right supplemental coverage.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* What Medicare Covers / Doesn't Cover */}
        <section id="what-covered" className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">What Does Medicare Cover?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Covered by Medicare
              </h3>
              <ul className="space-y-2">
                {coveredServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Not Covered by Medicare
              </h3>
              <ul className="space-y-2">
                {notCoveredServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Coverage by Part */}
        <section id="coverage-by-part" className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Medicare Coverage by Part</h2>
          <div className="space-y-4">
            {[
              {
                part: "Part A — Hospital Insurance",
                color: "bg-blue-50 border-blue-200",
                titleColor: "text-blue-800",
                href: "/original-medicare/medicare-parts/medicare-part-a",
                items: ["Inpatient hospital care", "Skilled nursing facility care (after qualifying hospital stay)", "Hospice care", "Home health care (limited)"],
              },
              {
                part: "Part B — Medical Insurance",
                color: "bg-teal-50 border-teal-200",
                titleColor: "text-teal-800",
                href: "/original-medicare/medicare-parts/medicare-part-b",
                items: ["Doctor visits and specialist care", "Outpatient procedures and surgery", "Preventive screenings and vaccines", "Durable medical equipment", "Mental health services"],
              },
              {
                part: "Part C — Medicare Advantage",
                color: "bg-purple-50 border-purple-200",
                titleColor: "text-purple-800",
                href: "/medicare-part-c/medicare-advantage-plans",
                items: ["All Part A and B benefits (through private insurer)", "Often includes Part D drug coverage", "May include dental, vision, hearing", "Annual out-of-pocket maximum"],
              },
              {
                part: "Part D — Prescription Drug Coverage",
                color: "bg-amber-50 border-amber-200",
                titleColor: "text-amber-800",
                href: "/original-medicare/medicare-parts/medicare-part-d",
                items: ["Prescription drugs at retail pharmacies", "Mail-order pharmacy options", "Formulary (drug list) varies by plan", "$2,000 out-of-pocket cap in 2025+"],
              },
            ].map((section, i) => (
              <div key={i} className={`border rounded-xl p-5 ${section.color}`}>
                <Link href={section.href} className={`font-bold text-lg hover:underline ${section.titleColor}`}>{section.part}</Link>
                <ul className="mt-3 grid sm:grid-cols-2 gap-1">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage gaps callout */}
        <section className="mb-10">
          <div className="bg-[#1B2A4A] text-white rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-3">Filling the Gaps in Medicare Coverage</h2>
            <p className="text-blue-100 mb-4">
              Original Medicare has no out-of-pocket maximum, meaning your costs could be unlimited in a serious illness. A <Link href="/medicare-supplements" className="text-teal-300 hover:text-white underline">Medicare Supplement (Medigap) plan</Link> can cover most or all of Medicare's cost-sharing — deductibles, coinsurance, and copays — for a predictable monthly premium.
            </p>
            <Link href="/compare-rates" className="inline-block bg-[#0D9488] hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">
              Compare Medigap Rates
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#1B2A4A] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">Related Medicare Topics</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/original-medicare/medicare-eligibility" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Eligibility</h3>
              <p className="text-xs text-slate-500">Who qualifies for Medicare</p>
            </a>
            <a href="/original-medicare/medicare-costs" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Costs</h3>
              <p className="text-xs text-slate-500">Premiums, deductibles, and copays</p>
            </a>
          </div>
        </section>
        </section>
      </div>
    </div>
  );
}
