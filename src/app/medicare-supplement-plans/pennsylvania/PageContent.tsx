"use client";

/**
 * Pennsylvania Medicare Supplement Comparison Page
 * Route: /medicare-supplement-plans/pennsylvania/
 * Key differentiators: State Farm #1 (5.0 stars), 680K enrollees, Plan G from $133/mo,
 *                      attained-age rating, no birthday rule, PA MEDI free counseling
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
  Clock,
  AlertTriangle,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  PENNSYLVANIA_CARRIERS,
  PENNSYLVANIA_STATS,
  PENNSYLVANIA_FAQS,
  SCORING_METHODOLOGY,
  type PennsylvaniaCarrier,
} from "@/lib/pennsylvania-medigap-data";
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
          }`} aria-hidden="true" />
      ))}
    </div>
  );
}

/* ─── Carrier Card ─── */
function CarrierCard({
  carrier,
  rank,
}: {
  carrier: PennsylvaniaCarrier;
  rank: number;
}) {
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
                <Building2 className="w-6 h-6 text-white" aria-hidden="true" />
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
                <p className="text-sm font-bold text-slate-900">
                  {carrier.planGMonthly}/mo
                </p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan N</p>
                <p className="text-sm font-bold text-slate-900">
                  {carrier.planNMonthly}/mo
                </p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">AM Best</p>
                <p className="text-sm font-bold text-slate-900">
                  {carrier.amBestRating}
                </p>
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
              pageSection="pennsylvania_carrier_card"
              triggerId={`pennsylvania-carrier-${carrier.id}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Pennsylvania`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Pennsylvania.`}
              buttonLabel="Get a Quote"
              trigger={
                <button className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
                  Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                  page_section: "pennsylvania_carrier_card",
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-400 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> (888) 335-8996
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
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
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
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
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
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 mt-2">
              <p className="text-xs text-slate-500">
                <strong>Plans offered in Pennsylvania:</strong>{" "}
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
        <span className="font-semibold text-slate-900 text-sm pr-4">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
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
export default function PennsylvaniaPageContent() {
  return (
    <article className="min-h-screen bg-white">
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
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link
              href="/medicare-supplement-plans"
              className="hover:text-white transition-colors"
            >
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-teal-400">Pennsylvania</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">PA</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated February 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200">
              {PENNSYLVANIA_STATS.numberOfCarriers} Carriers Analyzed
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Pennsylvania 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            We compared {PENNSYLVANIA_STATS.numberOfCarriers} Medigap carriers in
            Pennsylvania based on pricing, financial strength, and complaint records to
            find the best coverage for Pennsylvania&apos;s{" "}
            {PENNSYLVANIA_STATS.medigapEnrollees} Medigap enrollees.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                <strong className="text-white">
                  {PENNSYLVANIA_STATS.medigapEnrollees}
                </strong>{" "}
                Pennsylvanians with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                Plan G from{" "}
                <strong className="text-white">
                  {PENNSYLVANIA_STATS.lowestPlanGPremium}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>
                <strong className="text-white">State Farm</strong> rated #1 in PA
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="pennsylvania_hero"
              triggerId="pennsylvania-hero-compare"
              coverageType="ms"
              title="Compare Pennsylvania Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Pennsylvania."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare Pennsylvania Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                  page_section: "pennsylvania_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>
                <strong>{PENNSYLVANIA_CARRIERS.length}</strong> carriers analyzed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Enroll during your 6-month OEP for best rates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>State Farm rated #1 overall in Pennsylvania</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 680,000 people in Pennsylvania have Medicare Supplement Insurance,
            or Medigap. Medigap plans help cover certain out-of-pocket expenses like
            copays, coinsurance, and deductibles left over after Medicare pays for covered
            services.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Pennsylvania is a standard attained-age rating state, meaning premiums
            increase as you age. The most important time to enroll is during your
            6-month Open Enrollment Period when you turn 65 and sign up for Part B -
            during this window, carriers cannot deny you coverage or charge more due to
            health conditions. Plan G is the most popular plan in Pennsylvania, held by
            37% of Medigap enrollees, and premiums start as low as $133 per month.
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
            Compare the Best Medicare Supplement Plans in Pennsylvania
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Pennsylvania, ranked by the MedicareFAQ
            Score. Premiums shown are for a 65-year-old female nonsmoker in Pittsburgh.
            Rates in Philadelphia and other regions may vary.
          </p>

          <div className="space-y-4">
            {PENNSYLVANIA_CARRIERS.map((carrier, i) => (
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
            Medicare Supplement Prices in Pennsylvania
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from our top-scoring carriers. Rates shown are for a
            65-year-old female nonsmoker in Pittsburgh and include available household
            discounts. Pennsylvania uses attained-age rating - premiums will increase as
            you age. Philadelphia and other regions may have different rates.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">
                      Insurance Company
                    </th>
                    <th className="text-center px-5 py-3 font-semibold">
                      Plan G Monthly
                    </th>
                    <th className="text-center px-5 py-3 font-semibold">
                      Plan N Monthly
                    </th>
                    <th className="text-center px-5 py-3 font-semibold">
                      MedicareFAQ Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PENNSYLVANIA_CARRIERS.map((carrier, i) => (
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
                <strong>Lowest available in Pennsylvania (Pittsburgh):</strong> Plan G
                from {PENNSYLVANIA_STATS.lowestPlanGPremium} | Plan N from{" "}
                {PENNSYLVANIA_STATS.lowestPlanNPremium} | Source: CMS Medicare Plan
                Finder, NerdWallet Feb 2026
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="pennsylvania_premium_table"
              triggerId="pennsylvania-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Pennsylvania ZIP Code"
              subtitle="Premiums vary by city in Pennsylvania. Enter your ZIP code to see exact rates from all available carriers in your area."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  <MapPin className="w-4 h-4" aria-hidden="true" /> See Rates in Your ZIP Code
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
            Plan G vs. Plan N in Pennsylvania
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new
            enrollees in Pennsylvania. Here is how they compare.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">
                      Coverage Feature
                    </th>
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
                      feature: "Avg. monthly premium (Pittsburgh)",
                      g: {
                        text: PENNSYLVANIA_STATS.averagePlanGPremium,
                        bold: true,
                      },
                      n: {
                        text: PENNSYLVANIA_STATS.averagePlanNPremium,
                        bold: true,
                      },
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
                            className={`font-${
                              row.g.bold ? "bold" : "semibold"
                            } text-slate-900`}
                          >
                            {row.g.text}
                          </span>
                        ) : row.g.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" aria-hidden="true" /> Covered
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" aria-hidden="true" /> Not covered
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {row.n.text ? (
                          <span
                            className={`font-${
                              row.n.bold ? "bold" : "semibold"
                            } ${
                              row.n.text.startsWith("Up to")
                                ? "text-amber-600"
                                : "text-slate-900"
                            }`}
                          >
                            {row.n.text}
                          </span>
                        ) : row.n.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" aria-hidden="true" /> Covered
                            {row.n.note}
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" aria-hidden="true" /> Not covered
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
                *Plan N covers Part B coinsurance but may charge up to $20 for some
                office visits and up to $50 for ER visits that do not result in inpatient
                admission.
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
                <strong>
                  Your 6-month Open Enrollment Period is the most important window you
                  have.
                </strong>{" "}
                Pennsylvania does not have a birthday rule - once your OEP ends, carriers
                can use medical underwriting to deny coverage or charge more if you want
                to switch plans. Lock in your Medigap coverage during your OEP at age 65
                to get the best rate and guaranteed acceptance. Also note: HealthSpring
                offers the lowest premiums in Pennsylvania, but has a higher-than-expected
                complaint rate. If customer service matters to you, State Farm or Mutual
                of Omaha may be worth the slightly higher premium.
              </>
            }
          />
        </div>
      </section>

      {/* Pennsylvania-Specific Notes */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Pennsylvania Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  6-Month Open Enrollment Period
                </p>
                <p className="text-sm text-slate-600">
                  Your Medigap Open Enrollment Period is a one-time 6-month window that
                  starts the first month you are 65 or older and enrolled in Medicare
                  Part B. During this period, carriers cannot deny you coverage or charge
                  more due to pre-existing health conditions. This is the best time to
                  enroll in Medigap in Pennsylvania.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  No Birthday Rule in Pennsylvania
                </p>
                <p className="text-sm text-slate-600">
                  Pennsylvania does not have a birthday rule. A bill was proposed in the
                  Pennsylvania House in September 2025 that would create a 60-day annual
                  enrollment window, but it had not been passed into law as of early 2026.
                  Without a birthday rule, switching Medigap plans after your OEP
                  typically requires passing medical underwriting.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Attained-Age Rating
                </p>
                <p className="text-sm text-slate-600">
                  Pennsylvania uses attained-age rating, which means your Medigap premium
                  increases as you get older. Premiums are based on your current age and
                  rise each year. This makes enrolling during your OEP at age 65
                  especially important - you will start at the lowest possible rate and
                  lock in coverage before any health issues arise.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  PA MEDI - Free Medicare Counseling
                </p>
                <p className="text-sm text-slate-600">
                  PA MEDI (Pennsylvania Medicare Education and Decision Insight) is
                  Pennsylvania&apos;s State Health Insurance Assistance Program (SHIP).
                  It provides free, unbiased Medicare counseling from trained volunteers.
                  PA MEDI counselors can help you compare Medigap plans, understand your
                  options, and navigate enrollment. Contact them through the Pennsylvania
                  Insurance Department.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Regulated by the Pennsylvania Insurance Department
                </p>
                <p className="text-sm text-slate-600">
                  All Medigap plans in Pennsylvania are regulated by the Pennsylvania
                  Insurance Department (PID). The PID maintains an official listing of
                  all licensed Medigap carriers and provides consumer resources for
                  comparing plans. Pennsylvania also enforces a 30-day free-look period,
                  allowing you to return a new policy for a full refund if you are not
                  satisfied.
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
            The MedicareFAQ Score rates Medicare Supplement carriers on a scale of 1.0 to
            5.0 based on five key factors. Our ratings are independent and not influenced
            by advertising relationships.
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
                  <span className="text-sm font-bold text-blue-600">
                    {factor.weight}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {factor.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {factor.description}
                  </p>
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
            {PENNSYLVANIA_FAQS.map((faq, i) => (
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
              Find the Best Medigap Rate in Your Pennsylvania ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Medigap premiums vary by city in Pennsylvania. Enter your ZIP code to see
              exact rates from all available carriers in your area - and remember, your
              Open Enrollment Period is the best time to lock in coverage.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="pennsylvania_bottom_cta"
                triggerId="pennsylvania-bottom-cta-compare"
                coverageType="ms"
                title="Compare Pennsylvania Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of Pennsylvania."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare Pennsylvania Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                    page_section: "pennsylvania_bottom_cta",
                  })
                }
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> Call (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
