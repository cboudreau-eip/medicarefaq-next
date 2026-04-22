"use client";
/**
 * Medicare Costs Page
 * URL: /original-medicare/medicare-costs
 * Covers: 2026 Part A/B/C/D premiums, deductibles, coinsurance, IRMAA
 */
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, DollarSign, AlertTriangle } from "lucide-react";
import { FAQSchema, BreadcrumbSchema, ArticleSchema } from "@/components/schema";
import { trackCtaClick } from "@/lib/analytics";
import ZipFormModal from "@/components/ZipFormModal";

const faqs = [
  {
    q: "How much does Medicare cost per month in 2026?",
    a: "The standard Medicare Part B premium in 2026 is $185.00/month. Most people pay $0 for Part A if they or their spouse worked at least 10 years. Medicare Advantage (Part C) plans have varying premiums — some are $0/month beyond Part B. Part D drug plan premiums average around $35–$55/month depending on the plan.",
  },
  {
    q: "What is the Medicare Part B deductible for 2026?",
    a: "The Medicare Part B deductible for 2026 is $257/year. After meeting this deductible, Medicare typically pays 80% of covered services and you pay the remaining 20% coinsurance — with no out-of-pocket maximum under Original Medicare.",
  },
  {
    q: "What is the Medicare Part A deductible for 2026?",
    a: "The Medicare Part A deductible for 2026 is $1,676 per benefit period. This is not an annual deductible — it applies per benefit period (a hospital stay plus 60 days after discharge). If you are hospitalized more than once in a year and each stay begins a new benefit period, you could pay the deductible multiple times.",
  },
  {
    q: "Do higher-income people pay more for Medicare?",
    a: "Yes. Beneficiaries with higher incomes pay more for Parts B and D through Income-Related Monthly Adjustment Amounts (IRMAA). In 2026, IRMAA surcharges begin for individuals with modified adjusted gross income above $103,000 (or $206,000 for married couples filing jointly). The surcharges are based on income from 2 years prior.",
  },
  {
    q: "Is there an out-of-pocket maximum with Original Medicare?",
    a: "No. Original Medicare (Parts A and B) has no annual out-of-pocket maximum. Your costs could be unlimited in a serious illness. This is one of the primary reasons many beneficiaries add a Medicare Supplement (Medigap) plan, which can cap or eliminate most out-of-pocket costs.",
  },
];

export default function MedicareCosts() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs}  />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.medicarefaq.com/" },
          { name: "Original Medicare", url: "https://www.medicarefaq.com/original-medicare/" },
          { name: "Medicare Costs", url: "https://www.medicarefaq.com/original-medicare/medicare-costs/" },
        ]}
      />
      <ArticleSchema
        title="How Much Does Medicare Cost in 2026? | Medicare Premiums & Deductibles"
        description="See the 2026 Medicare costs for Parts A, B, C, and D — including premiums, deductibles, coinsurance, and out-of-pocket limits."
        url="https://www.medicarefaq.com/original-medicare/medicare-costs/"
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
            <span className="text-white">Medicare Costs</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How Much Does Medicare Cost in 2026?</h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            Medicare costs include premiums, deductibles, and coinsurance across Parts A, B, C, and D. Here are the official 2026 figures and what they mean for your budget.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* 2026 Cost Summary Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">2026 Medicare Premium Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1B2A4A] text-white">
                  <th className="text-left p-3">Medicare Part</th>
                  <th className="text-left p-3">Monthly Premium</th>
                  <th className="text-left p-3">Deductible</th>
                  <th className="text-left p-3">Coinsurance / Copay</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold"><Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-[#0D9488] hover:underline">Part A (Hospital)</Link></td>
                  <td className="p-3">$0 (most people)</td>
                  <td className="p-3">$1,676/benefit period</td>
                  <td className="p-3">Days 61–90: $419/day; Days 91+: $838/day</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3 font-semibold"><Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-[#0D9488] hover:underline">Part B (Medical)</Link></td>
                  <td className="p-3">$185.00/month</td>
                  <td className="p-3">$257/year</td>
                  <td className="p-3">20% of Medicare-approved amount</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold"><Link href="/medicare-part-c/medicare-advantage-plans" className="text-[#0D9488] hover:underline">Part C (Medicare Advantage)</Link></td>
                  <td className="p-3">Varies ($0–$100+)</td>
                  <td className="p-3">Varies by plan</td>
                  <td className="p-3">Varies; annual OOP max required</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 font-semibold"><Link href="/original-medicare/medicare-parts/medicare-part-d" className="text-[#0D9488] hover:underline">Part D (Drugs)</Link></td>
                  <td className="p-3">Avg ~$35–$55/month</td>
                  <td className="p-3">Up to $590/year</td>
                  <td className="p-3">$2,000 OOP cap (2025+)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Part A Costs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">
            <Link href="/original-medicare/medicare-parts/medicare-part-a" className="hover:underline">Medicare Part A Cost</Link>
          </h2>
          <p className="text-gray-700 mb-4">
            Most people pay <strong>$0/month for Part A</strong> if they or their spouse worked and paid Medicare taxes for at least 10 years (40 quarters). If you don't meet the work requirement, you can still enroll but will pay up to <strong>$518/month</strong> in 2026.
          </p>
          <p className="text-gray-700">
            The Part A deductible is <strong>$1,676 per benefit period</strong> — not per year. A benefit period begins when you're admitted to a hospital and ends 60 days after discharge. If you're readmitted after 60 days, a new benefit period begins and you owe the deductible again.
          </p>
        </section>

        {/* Part B Costs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">
            <Link href="/original-medicare/medicare-parts/medicare-part-b" className="hover:underline">Medicare Part B Cost</Link>
          </h2>
          <p className="text-gray-700 mb-4">
            The standard 2026 Part B premium is <strong>$185.00/month</strong>. After meeting the <strong>$257 annual deductible</strong>, Medicare pays 80% of covered services and you pay 20% — with no out-of-pocket cap. This 20% coinsurance is unlimited, which is why many beneficiaries add a <Link href="/medicare-supplements" className="text-[#0D9488] hover:underline">Medigap supplement plan</Link>.
          </p>
        </section>

        {/* IRMAA */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Medicare Costs and IRMAA (Higher-Income Surcharges)</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                If your income was above <strong>$103,000</strong> (individual) or <strong>$206,000</strong> (married filing jointly) in 2024, you will pay higher Part B and Part D premiums in 2026 through IRMAA surcharges. IRMAA is based on your tax return from 2 years prior.
              </p>
            </div>
          </div>
        </section>

        {/* Medigap CTA */}
        <section className="mb-10">
          <div className="bg-[#1B2A4A] text-white rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-3">Lower Your Medicare Out-of-Pocket Costs</h2>
            <p className="text-blue-100 mb-4">
              A <Link href="/medicare-supplements" className="text-teal-300 hover:text-white underline">Medicare Supplement (Medigap) plan</Link> can cover most or all of Medicare's cost-sharing, giving you predictable costs for a monthly premium. <Link href="/medicare-supplements/plan-g" className="text-teal-300 hover:text-white underline">Plan G</Link> is the most popular choice in 2026.
            </p>
            <ZipFormModal
              coverageType="ms"
              triggerLabel="Compare Medigap Rates"
              triggerClassName="inline-block bg-[#0D9488] hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              pageSection="medicare_costs"
            />
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs">
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
            <a href="/original-medicare/medicare-coverage" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Coverage</h3>
              <p className="text-xs text-slate-500">What Original Medicare covers</p>
            </a>
          </div>
        </section>
        </section>
      </div>
    </div>
  );
}
