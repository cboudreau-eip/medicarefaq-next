"use client";

/**
 * New York Medicare Supplement Comparison Page
 * Route: /medicare-supplements/new-york/
 * Key differentiators: Community rating (no-age-rated) + Guaranteed issue year-round
 */

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  ArrowRight,
  Shield,
  Star,
  Users,
  TrendingDown,
  Award,
  Building2,
  CheckCircle2,
  XCircle,
  Info,
  MapPin,
  BarChart3,
  ShieldCheck,
  Equal,
  CalendarCheck,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  NEW_YORK_CARRIERS,
  NEW_YORK_STATS,
  NEW_YORK_FAQS,
  SCORING_METHODOLOGY,
  type NewYorkCarrier,
} from "@/lib/new-york-medigap-data";
import { trackPhoneClick } from "@/lib/analytics";

/* ─── Score Badge Color ─── */
function getScoreColor(score: number) {
  if (score >= 4.5) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 4.0) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 3.5) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

/* ─── Star Rating Display ─── */
function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "fill-amber-400 text-amber-400"
              : i === fullStars && hasHalf
              ? "fill-amber-400/50 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Carrier Card ─── */
function CarrierCard({ carrier, rank }: { carrier: NewYorkCarrier; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all">
      {/* Badge header */}
      <div className="bg-slate-50 px-5 py-2 border-b border-slate-200 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {carrier.badge}
        </span>
        <span className="text-xs text-slate-400">#{rank}</span>
      </div>

      {/* Main content */}
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          {/* Left: Name + Score */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {carrier.displayName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating score={carrier.medicareFaqScore} />
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreColor(
                      carrier.medicareFaqScore
                    )}`}
                  >
                    {carrier.medicareFaqScore.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">MedicareFAQ Score</span>
                </div>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan G</p>
                <p className="text-sm font-bold text-slate-900">{carrier.planGMonthly}/mo</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan N</p>
                <p className="text-sm font-bold text-slate-900">{carrier.planNMonthly}/mo</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">AM Best</p>
                <p className="text-sm font-bold text-slate-900">{carrier.amBestRating}</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plans</p>
                <p className="text-sm font-bold text-slate-900">
                  {carrier.plansOffered.length} types
                </p>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="new_york_carrier_card"
              triggerId={`new-york-carrier-${carrier.id}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in New York`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of New York.`}
              buttonLabel="Get a Quote"
              trigger={
                <button className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"
              id="callInNum"
              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "new_york_carrier_card",
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-400 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-3.5 h-3.5" /> (888) 335-8996
            </a>
          </div>
        </div>

        {/* Expand/collapse for pros/cons */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {expanded ? "Hide details" : "Show pros & cons"}
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                Pros
              </p>
              <ul className="space-y-1.5">
                {carrier.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
                Cons
              </p>
              <ul className="space-y-1.5">
                {carrier.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 mt-2">
              <p className="text-xs text-slate-500">
                <strong>Plans offered in New York:</strong>{" "}
                {carrier.plansOffered.map((p) => `Plan ${p}`).join(", ")}
                {" | "}
                <strong>Discounts:</strong> {carrier.discounts}
                {" | "}
                <strong>Complaints:</strong> {carrier.complaintRecord}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 text-sm pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page Content ─── */
export default function NewYorkPageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link
              href="/medicare-supplements"
              className="hover:text-white transition-colors"
            >
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">New York</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">NY</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated February 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-green-100 text-green-800 border-green-200">
              Guaranteed Issue Year-Round
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in New York 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            We compared {NEW_YORK_STATS.numberOfCarriers} Medigap carriers in New York based on
            pricing, financial strength, and complaint records — including New York&apos;s unique
            community rating and guaranteed issue rules that let you switch plans any time of year.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{NEW_YORK_STATS.medigapEnrollees}</strong>{" "}
                New Yorkers with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{NEW_YORK_STATS.lowestPlanGPremium}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CalendarCheck className="w-4 h-4 text-green-400" />
              <span>
                <strong className="text-white">Switch any time</strong> — no underwriting
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="new_york_hero"
              triggerId="new-york-hero-compare"
              coverageType="ms"
              title="Compare New York Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of New York."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare New York Rates <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"
              id="callInNum"
              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "new_york_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>
                <strong>{NEW_YORK_CARRIERS.length}</strong> carriers analyzed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-green-600" />
              <span>Guaranteed issue — switch any month</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Equal className="w-4 h-4 text-blue-600" />
              <span>Community-rated — same price regardless of age</span>
            </div>
          </div>
        </div>
      </section>

      {/* NY Community Rating + Guaranteed Issue Spotlight */}
      <section className="py-8 bg-green-50 border-b border-green-200">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Community Rating */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <Equal className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-green-900">Community Rating</h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-200 text-green-800">
                    NY Law
                  </span>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">
                  New York uses <strong>no-age-rated (community) pricing</strong> — your
                  Medigap premium is the same regardless of your age, gender, or health
                  status. A 65-year-old and an 85-year-old in the same region pay the same
                  rate. Premiums vary by region, not by individual characteristics.
                </p>
              </div>
            </div>

            {/* Guaranteed Issue */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-green-900">
                    Guaranteed Issue Year-Round
                  </h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-200 text-green-800">
                    NY Law
                  </span>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">
                  New York requires insurers to sell Medigap to <strong>any Medicare
                  beneficiary at any time</strong> — no open enrollment window, no medical
                  underwriting, no health questions. You can switch carriers or plans any
                  month of the year. This is stronger than any birthday rule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Over 465,000 people in New York have Medicare Supplement Insurance, or Medigap.
            Medigap plans help cover certain out-of-pocket expenses like copays, coinsurance,
            and deductibles left over after Medicare pays for covered services.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            New York has some of the strongest consumer protections for Medigap enrollees in
            the country. Community rating means your premium is the same regardless of your
            age or health, and guaranteed issue year-round means you can switch plans or
            carriers at any time without medical underwriting. The tradeoff is that premiums
            in New York are significantly higher than most states — but you are never locked
            into a plan you cannot change.
          </p>
        </div>
      </section>

      {/* Carrier Cards Section */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Compare the Best Medicare Supplement Plans in New York
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in New York, ranked by the MedicareFAQ Score.
            Premiums shown are for a 65-year-old female nonsmoker in New York City.
            Because New York uses community rating, these premiums are the same for all
            ages in the NYC region.
          </p>

          <div className="space-y-4">
            {NEW_YORK_CARRIERS.map((carrier, i) => (
              <CarrierCard key={carrier.id} carrier={carrier} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Comparison Table */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Medicare Supplement Prices in New York
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from our top-scoring carriers. Rates shown are for a
            65-year-old female nonsmoker in New York City and include available household
            discounts. Because New York uses community rating, these rates apply to all ages
            in the NYC region. Premiums vary by region — upstate NY rates are typically lower.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Insurance Company</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">MedicareFAQ Score</th>
                  </tr>
                </thead>
                <tbody>
                  {NEW_YORK_CARRIERS.map((carrier, i) => (
                    <tr
                      key={carrier.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-5 py-3 font-medium text-slate-900">
                        {carrier.displayName}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {carrier.planGMonthly}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {carrier.planNMonthly}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreColor(
                            carrier.medicareFaqScore
                          )}`}
                        >
                          {carrier.medicareFaqScore.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                <strong>Lowest available in New York (NYC region):</strong> Plan G from{" "}
                {NEW_YORK_STATS.lowestPlanGPremium} | Plan N from{" "}
                {NEW_YORK_STATS.lowestPlanNPremium} | Source: CMS Medicare Plan Finder,
                NY DFS May 2026 Rate Tables
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="new_york_premium_table"
              triggerId="new-york-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your New York ZIP Code"
              subtitle="Premiums vary by region in New York. Enter your ZIP code to see exact rates from all available carriers in your area."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  <MapPin className="w-4 h-4" /> See Rates in Your ZIP Code
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* Plan G vs Plan N Breakdown */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Plan G vs. Plan N in New York
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new
            enrollees in New York. Here is how they compare.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Coverage Feature</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Part A hospital coinsurance",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Part B coinsurance (20%)",
                      g: { covered: true },
                      n: { covered: true, note: "*" },
                    },
                    {
                      feature: "Part A deductible ($1,736)",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Part B deductible ($283)",
                      g: { covered: false },
                      n: { covered: false },
                    },
                    {
                      feature: "Part B excess charges",
                      g: { covered: true },
                      n: { covered: false },
                    },
                    {
                      feature: "Skilled nursing coinsurance",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Foreign travel emergency",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Office visit copay",
                      g: { text: "$0" },
                      n: { text: "Up to $20" },
                    },
                    {
                      feature: "ER copay (no admission)",
                      g: { text: "$0" },
                      n: { text: "Up to $50" },
                    },
                    {
                      feature: "Avg. monthly premium (NYC)",
                      g: { text: NEW_YORK_STATS.averagePlanGPremium, bold: true },
                      n: { text: NEW_YORK_STATS.averagePlanNPremium, bold: true },
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td
                        className={`px-5 py-3 text-slate-700 ${
                          row.g.bold ? "font-semibold" : ""
                        }`}
                      >
                        {row.feature}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {row.g.text ? (
                          <span
                            className={`font-${row.g.bold ? "bold" : "semibold"} text-slate-900`}
                          >
                            {row.g.text}
                          </span>
                        ) : row.g.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" /> Covered
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" /> Not covered
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {row.n.text ? (
                          <span
                            className={`font-${row.n.bold ? "bold" : "semibold"} ${
                              row.n.text.startsWith("Up to")
                                ? "text-amber-600"
                                : "text-slate-900"
                            }`}
                          >
                            {row.n.text}
                          </span>
                        ) : row.n.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" /> Covered
                            {row.n.note}
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" /> Not covered
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                *Plan N covers Part B coinsurance but may charge up to $20 for some office
                visits and up to $50 for ER visits that do not result in inpatient admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eddie Pro Tip */}
      <section className="py-0 pb-2">
        <div className="container max-w-4xl">
          <EddieProTip
            tip={
              <>
                <strong>New York&apos;s guaranteed issue rule is the most powerful Medigap
                protection in the country.</strong> Unlike California&apos;s birthday rule
                (which only lets you switch to equal or lesser plans once a year), New York
                lets you switch Medigap carriers or plan types <em>any month of the year</em>{" "}
                — with no health questions and no medical underwriting. If you find a lower
                rate at a different carrier, you can switch immediately. The catch: because
                everyone is guaranteed coverage, New York premiums are significantly higher
                than most states. Shop rates regularly and switch when you find a better deal.
              </>
            }
          />
        </div>
      </section>

      {/* New York-Specific Notes */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            New York Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-green-200 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Guaranteed Issue Year-Round
                </p>
                <p className="text-sm text-slate-600">
                  New York law requires all Medigap carriers to sell coverage to any Medicare
                  beneficiary at any time, regardless of age or health status. There is no
                  open enrollment window and no medical underwriting — ever. You can enroll
                  in, switch, or change Medigap plans any month of the year. This is the
                  strongest Medigap consumer protection in the country.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-green-200 rounded-xl flex items-start gap-3">
              <Equal className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Community Rating (No-Age-Rated Pricing)
                </p>
                <p className="text-sm text-slate-600">
                  New York uses community rating, meaning Medigap premiums are the same for
                  everyone in the same geographic region, regardless of age, gender, or health
                  status. A 65-year-old and an 85-year-old pay the same monthly premium for
                  the same plan in the same region. Premiums do vary by region — New York City
                  rates are typically higher than upstate New York rates.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Coverage for Medicare Beneficiaries Under 65
                </p>
                <p className="text-sm text-slate-600">
                  Unlike most states, New York requires Medigap carriers to sell plans to
                  Medicare beneficiaries under 65 who qualify for Medicare due to disability.
                  In most states, people under 65 cannot purchase Medigap or face very high
                  premiums. New York&apos;s law provides important protections for younger
                  Medicare beneficiaries.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Regulated by the NY Department of Financial Services (DFS)
                </p>
                <p className="text-sm text-slate-600">
                  All Medigap plans in New York are regulated by the NY Department of
                  Financial Services (DFS). DFS publishes official monthly rate tables for
                  all licensed carriers at dfs.ny.gov, making it easy to compare exact
                  premiums. New York also enforces a 30-day free-look period, allowing you
                  to return a new policy for a full refund if you are not satisfied.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Why Are New York Premiums Higher?
                </p>
                <p className="text-sm text-slate-600">
                  New York&apos;s community rating and guaranteed issue rules result in
                  significantly higher premiums than most states. Because insurers must
                  accept everyone regardless of health and cannot charge more for older or
                  sicker enrollees, they spread the risk across all policyholders. The
                  tradeoff is that you are never locked into a plan you cannot change, and
                  your premium will not increase simply because you age or develop a
                  health condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Methodology */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            MedicareFAQ Scoring Methodology
          </h2>
          <p className="text-slate-600 mb-6">
            The MedicareFAQ Score rates Medicare Supplement carriers on a scale of 1.0 to 5.0
            based on five key factors. Our ratings are independent and not influenced by
            advertising relationships.
          </p>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {SCORING_METHODOLOGY.factors.map((factor, i) => (
              <div
                key={factor.name}
                className={`flex items-start gap-4 p-4 ${
                  i < SCORING_METHODOLOGY.factors.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="w-16 shrink-0">
                  <span className="text-sm font-bold text-blue-600">{factor.weight}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{factor.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{factor.description}</p>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Last updated: {SCORING_METHODOLOGY.lastUpdated} | Data sources:{" "}
                {SCORING_METHODOLOGY.dataSource}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {NEW_YORK_FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">
              Find the Best Medigap Rate in Your New York Region
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Medigap premiums vary by region in New York. Enter your ZIP code to see exact
              rates from all available carriers in your area — and remember, in New York you
              can switch plans any time of year if you find a better rate.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="new_york_bottom_cta"
                triggerId="new-york-bottom-cta-compare"
                coverageType="ms"
                title="Compare New York Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of New York."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare New York Rates <ArrowRight className="w-4 h-4" />
                  </button>
                }
              />
              <a
                href="tel:+18883358996"
                id="callInNum"
                data-invoca-phone-number="18883358996"
                onClick={() =>
                  trackPhoneClick({
                    phone_number: "(888) 335-8996",
                    page_section: "new_york_bottom_cta",
                  })
                }
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
