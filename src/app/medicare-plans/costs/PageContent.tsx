"use client";
import Link from "next/link";

/**
 * Medicare Plan Costs Page (under Medicare Plans section)
 * Design: Focused on plan-specific cost comparisons — what you pay
 * with each plan type and how to minimize costs.
 */

import { useState, useEffect } from "react";
import { trackCtaClick, trackPhoneClick } from "@/lib/analytics";
import { MEDICARE_COSTS } from "@/lib/medicare-costs";
import {
  ChevronDown,
  Phone,
  ArrowRight,
  DollarSign,
  Heart,
  TrendingDown,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";

const costScenarios = [
  {
    title: "Original Medicare Only",
    subtitle: "No Supplemental Coverage",
    monthly: "$202.90",
    monthlyLabel: "Part B premium only",
    annual: "No limit",
    annualLabel: "Out-of-pocket maximum",
    risk: "high",
    items: [
      { label: "Part a Premium", value: "$0 (most people)" },
      { label: "Part B Premium", value: "$202.90/month" },
      { label: "Part a Deductible", value: "$1,736/benefit period" },
      { label: "Part B Deductible", value: "$283/year" },
      { label: "Part B Coinsurance", value: "20% with no limit" },
      { label: "Hospital Days 61-90", value: "$434/day" },
      { label: "Prescription Drugs", value: "Not covered" },
    ],
    color: "border-red-200 bg-red-50",
  },
  {
    title: "Original Medicare ++ Medigap G ++ Part D",
    subtitle: "Most Comprehensive Option",
    monthly: "$361 – $481",
    monthlyLabel: "Part B + Medigap + Part D",
    annual: "~$283",
    annualLabel: "Part B deductible only",
    risk: "low",
    items: [
      { label: "Part B Premium", value: "$202.90/month" },
      { label: "Medigap Plan G Premium", value: "$130 – $250/month" },
      { label: "Part D Premium", value: "~$46/month" },
      { label: "Part B Deductible", value: "$283/year" },
      { label: "Everything Else", value: "$0 (covered by Medigap)" },
      { label: "Drug Out-of-Pocket Cap", value: "$2,000/year" },
    ],
    color: "border-green-200 bg-green-50",
  },
  {
    title: "Medicare Advantage (Part C)",
    subtitle: "All-in-one Alternative",
    monthly: "$202.90 – $335",
    monthlyLabel: "Part B + MA premium",
    annual: "$9,250",
    annualLabel: "In-network OOP max",
    risk: "medium",
    items: [
      { label: "Part B Premium", value: "$202.90/month" },
      { label: "MA Plan Premium", value: "$0 – $150+/month" },
      { label: "PCP Copay", value: "$0 – $30/visit" },
      { label: "Specialist Copay", value: "$20 – $50/visit" },
      { label: "Hospital Stay", value: "$200 – $400/day" },
      { label: "Drug Coverage", value: "Usually included" },
      { label: "Dental/Vision/Hearing", value: "Often included" },
    ],
    color: "border-blue-200 bg-blue-50",
  },
];

const savingsTips = [
  {
    title: "Compare Medigap Rates Annually",
    desc: "The same Plan G can cost 40% more from one company vs. another. Always compare at least 3-5 carriers. Rates vary by company, age, gender, and ZIP code.",
    icon: TrendingDown,
  },
  {
    title: "Consider High-Deductible Plan G",
    desc: "If you're healthy, HD Plan G costs $40-80/month vs. $130-250 for regular Plan G. You'll pay a $2,950 deductible, but the premium savings often exceed the deductible risk.",
    icon: Heart,
  },
];

const faqs = [
  {
    q: "What is the total cost of Medicare per month?",
    a: "It depends on your coverage choice. Original Medicare alone is $202.90/month (Part B). With Medigap Plan G + Part D, expect $361-481/month total. With Medicare Advantage, expect $185-335/month total. These are 2026 figures and don't include IRMAA surcharges for higher-income beneficiaries.",
  },
  {
    q: "Is Medicare Advantage really free?",
    a: "No. Even $0-premium MA plans require you to pay the Part B premium ($202.90/month). The '$0 premium' means no additional premium beyond Part B. You'll also pay copays, coinsurance, and deductibles when you use services — which can add up to $9,250/year in-network.",
  },
  {
    q: "Which option costs less if I'm sick?",
    a: "Medigap (especially Plan G) almost always costs less if you have significant medical needs. Your out-of-pocket is capped at ~$283/year regardless of how much care you need. With Medicare Advantage, a major illness or surgery could cost you thousands in copays up to the $9,250 max.",
  },
];

export default function PageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <article className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-teal-400">Medicare Costs</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Cost Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Costs by Plan Type
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            See exactly what you'll pay with each Medicare option in 2026. Compare premiums, deductibles, copays, and total out-of-pocket costs side by side.
          </p>
        </div>
      </section>

      {/* Cost Scenarios */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            What You'll Pay: Three Scenarios
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            Your total Medicare costs depend on which coverage path you choose. Here's a realistic breakdown of each option:
          </p>
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {costScenarios.map((scenario, i) => (
              <div key={i} className={`rounded-2xl border-2 ${scenario.color} overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">{scenario.title}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      scenario.risk === "low" ? "bg-green-200 text-green-800" :
                      scenario.risk === "medium" ? "bg-amber-200 text-amber-800" :
                      "bg-red-200 text-red-800"
                    }`}>
                      {scenario.risk === "low" ? "Low Risk" : scenario.risk === "medium" ? "Medium Risk" : "High Risk"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">{scenario.subtitle}</p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">{scenario.monthlyLabel}</p>
                      <p className="text-xl font-bold text-slate-900">{scenario.monthly}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">{scenario.annualLabel}</p>
                      <p className="text-xl font-bold text-slate-900">{scenario.annual}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {scenario.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-medium text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Savings Tips */}
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Ways to Lower Your Costs Within Your Chosen Path
          </h2>
          <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
            Once you've picked a coverage path, these two strategies matter most:
          </p>
          <div className="grid md:grid-cols-2 gap-5 mb-6 max-w-3xl mx-auto">
            {savingsTips.map((tip, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 hover:border-teal-200 hover:shadow-md transition-all">
                <tip.icon className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mb-16">
            Looking for income-based assistance programs like Medicare Savings Programs or Extra Help?{" "}
            <a href="/new-to-medicare/costs#savings" className="text-teal-700 font-medium hover:underline">
              See all ways to save on Medicare costs
            </a>.
          </p>

          {/* IRMAA Summary */}
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            IRMAA Applies to Every Path Above
          </h2>
          <div className="max-w-2xl mx-auto mb-16 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-slate-700">
              Every coverage path above assumes the standard Part B premium. If your modified adjusted gross income exceeds{" "}
              <span className="font-semibold text-slate-900">{MEDICARE_COSTS.irmaa.individualLevel1}</span> (single) or{" "}
              <span className="font-semibold text-slate-900">{MEDICARE_COSTS.irmaa.jointLevel1}</span> (married), you'll pay a surcharge
              on top of every scenario shown, regardless of which path you choose.
            </p>
            <a
              href="/new-to-medicare/costs#irmaa"
              className="inline-flex items-center gap-1 mt-4 text-teal-700 font-semibold hover:underline"
            >
              See the full 2026 IRMAA bracket table <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center" style={{ fontFamily: "'Merriweather', serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3 mb-16">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
              Get a Personalized Cost Estimate
            </h2>
            <p className="text-green-100 mb-6 max-w-xl mx-auto">
              Your actual Medicare costs depend on your location, health, medications, and income. Our licensed agents can give you a personalized cost breakdown at no charge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+18883358996"  data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "costs" })} className="invoca-phone inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" /> Call (888) 335-8996
              </a>
              <ZipFormModal
                coverageType="ms"
                triggerLabel="Compare All Plans"
                triggerClassName="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30"
                pageSection="costs"
                triggerId="compare-all-plans-costs"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">Related Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/medicare-plans/best-supplement-plans" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Best Medicare Supplement Plans</h3>
              <p className="text-xs text-slate-500">Top-rated Medigap plans compared</p>
            </a>
            <a href="/new-to-medicare/costs" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Complete Medicare Cost Guide</h3>
              <p className="text-xs text-slate-500">Full Part A, B, D, and IRMAA cost breakdown</p>
            </a>
          </div>
        </div>
      </section>
      </article>
  );
}