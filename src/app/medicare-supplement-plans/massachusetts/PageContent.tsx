"use client";

/**
 * Massachusetts Medicare Supplement Comparison Page
 * Route: /medicare-supplement-plans/massachusetts/
 * Key differentiators: Unique plan system (Core Plan, Supplement 1A - not federal A-N),
 *                      community rating (same premium for all ages),
 *                      continuous year-round open enrollment (no underwriting ever),
 *                      no Medicare excess charges allowed,
 *                      BCBS MA dominates with 70.9% market share,
 *                      SHINE free counseling at 1-800-243-4636
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
  DollarSign,
  Layers,
  CalendarCheck,
  Equal,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  CARRIERS,
  STATE_STATS,
  FAQS,
  SCORING_FACTORS,
  STATE_RULES,
  PREMIUM_TABLE,
  type Carrier,
} from "@/lib/massachusetts-medigap-data";
import { trackPhoneClick } from "@/lib/analytics";

/* Score Badge Color */
function getScoreColor(score: number) {
  if (score >= 4.5) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 4.0) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 3.5) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

/* Star Rating Display */
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

/* Carrier Card */
function CarrierCard({ carrier, rank }: { carrier: Carrier; rank: number }) {
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
                  {carrier.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating score={carrier.score} />
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreColor(
                      carrier.score
                    )}`}
                  >
                    {carrier.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">MedicareFAQ Score</span>
                </div>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Supplement 1A</p>
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
                  {carrier.amBest}
                </p>
              </div>
            </div>

            {/* Highlight */}
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {carrier.highlight}
            </p>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="massachusetts_carrier_card"
              triggerId={`massachusetts-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Massachusetts`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Massachusetts.`}
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
                  page_section: "massachusetts_carrier_card",
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
          {expanded ? "Hide details" : "Show pros and cons"}
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
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
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
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* FAQ Accordion */
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

/* Main Page Content */
export default function MassachusettsPageContent() {
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
              href="/medicare-supplement-plans"
              className="hover:text-white transition-colors"
            >
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Massachusetts</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">MA</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200">
              Unique Plan System
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-purple-100 text-purple-800 border-purple-200">
              Community Rated
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-green-100 text-green-800 border-green-200">
              Year-Round Enrollment
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Massachusetts 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Massachusetts uses its own Medigap plan system with community rating and
            year-round open enrollment. Over {STATE_STATS.enrollees} Massachusetts
            residents have Medigap coverage. We compared {STATE_STATS.carriers} carriers
            to find the best Core Plan and Supplement 1A options in the Bay State.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong>{" "}
                Massachusetts residents with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Core Plan from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong>{" "}
                in Boston
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Supplement 1A from <strong className="text-white">$176/mo</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers
                licensed in Massachusetts
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="massachusetts_hero"
              triggerId="massachusetts-hero-compare"
              coverageType="ms"
              title="Compare Massachusetts Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Massachusetts."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare MA Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "massachusetts_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Community Rating + Unique Plan System Spotlight Banner */}
      <section className="bg-blue-50 border-b border-blue-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-base mb-1">
                Massachusetts Uses Its Own Medigap Plan System with Community Rating and
                Year-Round Open Enrollment
              </p>
              <p className="text-sm text-blue-800">
                Unlike most states that use federal Plan A through Plan N, Massachusetts
                has its own standardized plans: the <strong>Core Plan</strong> (basic
                coverage) and <strong>Supplement 1A</strong> (the most comprehensive plan,
                equivalent to Plan G in other states). Massachusetts also requires{" "}
                <strong>community rating</strong> - a 65-year-old and an 85-year-old pay
                the same monthly premium - and{" "}
                <strong>continuous year-round open enrollment</strong>, meaning you can
                enroll or switch any month without health questions. Massachusetts also
                prohibits Medicare excess charges, making it one of the most
                consumer-friendly Medigap markets in the country.
              </p>
            </div>
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
                <strong>{CARRIERS.length}</strong> carriers analyzed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Equal className="w-4 h-4 text-purple-600" />
              <span>Community rating: same premium for all ages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-emerald-600" />
              <span>Year-round open enrollment, no underwriting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 340,000 Massachusetts residents have Medicare Supplement Insurance,
            also called Medigap. Massachusetts is one of only three states that uses its
            own standardized Medigap plan system instead of the federal lettered plans
            used in most of the country. Rather than Plan G or Plan N, Massachusetts
            enrollees choose between a Core Plan and Supplement 1A, with the Core Plan
            providing basic coverage and Supplement 1A providing the most comprehensive
            coverage available.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Massachusetts requires all Medigap carriers to use community rating, which
            means everyone with the same plan pays the same monthly premium regardless of
            age. A 65-year-old and an 85-year-old pay identical rates. While this results
            in higher starting premiums than most other states, your premium will not
            increase simply because you get older. For long-term budgeting, this is a
            significant advantage.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Massachusetts also requires continuous year-round open enrollment, meaning you
            can enroll in, switch, or cancel a Medigap plan any month of the year without
            medical underwriting. Insurers cannot deny coverage or require a waiting
            period based on pre-existing conditions. Additionally, Massachusetts law
            prohibits Medicare excess charges, so providers cannot bill you more than the
            Medicare-approved amount. Blue Cross Blue Shield of Massachusetts dominates
            the market with approximately 70.9% market share.
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
            Compare the Best Medicare Supplement Plans in Massachusetts
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Massachusetts, ranked by the MedicareFAQ
            Score. Premiums shown are for a 65-year-old in Boston. Because Massachusetts
            uses community rating, your premium will be the same regardless of age. Rates
            in Worcester, Springfield, and other regions may vary slightly.
          </p>

          <div className="space-y-4">
            {CARRIERS.map((carrier, i) => (
              <CarrierCard key={carrier.rank} carrier={carrier} rank={i + 1} />
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
            Medicare Supplement Prices in Massachusetts
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from top carriers in Boston. Massachusetts uses
            community rating, so premiums are the same for all ages. Rates shown are for
            both the Core Plan (basic coverage) and Supplement 1A (comprehensive
            coverage). Rates in western Massachusetts may be lower than Boston.
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
                      Monthly Premium
                    </th>
                    <th className="text-center px-5 py-3 font-semibold">
                      Plan Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PREMIUM_TABLE.map((row, i) => (
                    <tr
                      key={row.carrier}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-5 py-3 font-medium text-slate-900">
                        {row.carrier}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {row.planG}
                      </td>
                      <td className="px-5 py-3 text-center text-slate-500 text-xs">
                        {row.carrier.includes("Core") ? "Core Plan" : "Supplement 1A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                <strong>Lowest available in Massachusetts (Boston):</strong> Core Plan
                from {STATE_STATS.lowestPlanG} | Supplement 1A from $176/mo | Source:
                CMS Medicare Plan Finder, FairSquare Medicare, May 2026
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="massachusetts_premium_table"
              triggerId="massachusetts-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Massachusetts ZIP Code"
              subtitle="Premiums vary by region in Massachusetts. Enter your ZIP code to see exact rates from all available carriers in your area."
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

      {/* Core Plan vs Supplement 1A Breakdown */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Core Plan vs. Supplement 1A in Massachusetts
          </h2>
          <p className="text-slate-600 mb-6">
            Massachusetts offers two main Medigap plan types. Supplement 1A is the most
            comprehensive and is the equivalent of Plan G in other states. Here is how
            they compare.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">
                      Coverage Feature
                    </th>
                    <th className="text-center px-5 py-3 font-semibold">Core Plan</th>
                    <th className="text-center px-5 py-3 font-semibold">Supplement 1A</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Part A hospital coinsurance",
                      core: { covered: true },
                      s1a: { covered: true },
                    },
                    {
                      feature: "Part B coinsurance (20%)",
                      core: { covered: true },
                      s1a: { covered: true },
                    },
                    {
                      feature: "First 3 pints of blood",
                      core: { covered: true },
                      s1a: { covered: true },
                    },
                    {
                      feature: "Part A hospice coinsurance",
                      core: { covered: true },
                      s1a: { covered: true },
                    },
                    {
                      feature: "Skilled nursing coinsurance",
                      core: { covered: false },
                      s1a: { covered: true },
                    },
                    {
                      feature: "Part A deductible ($1,736)",
                      core: { covered: false },
                      s1a: { covered: true },
                    },
                    {
                      feature: "Foreign travel emergency",
                      core: { covered: false },
                      s1a: { covered: true },
                    },
                    {
                      feature: "Medicare excess charges",
                      core: { text: "N/A (prohibited in MA)" },
                      s1a: { text: "N/A (prohibited in MA)" },
                    },
                    {
                      feature: "Avg. monthly premium (Boston)",
                      core: { text: "$123-$143", bold: true },
                      s1a: { text: "$176-$254", bold: true },
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 text-slate-700">{row.feature}</td>
                      <td className="px-5 py-3 text-center">
                        {"text" in row.core && row.core.text ? (
                          <span
                            className={`${"bold" in row.core && row.core.bold ? "font-bold" : "font-semibold"} text-slate-900`}
                          >
                            {row.core.text}
                          </span>
                        ) : "covered" in row.core && row.core.covered ? (
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
                        {"text" in row.s1a && row.s1a.text ? (
                          <span
                            className={`${"bold" in row.s1a && row.s1a.bold ? "font-bold" : "font-semibold"} text-slate-900`}
                          >
                            {row.s1a.text}
                          </span>
                        ) : "covered" in row.s1a && row.s1a.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" /> Covered
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
                Massachusetts prohibits Medicare excess charges, so neither plan needs
                excess charge coverage. Supplement 1 (available only to those eligible
                for Medicare before January 1, 2020) also covers the Part B deductible.
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
                  Massachusetts&apos; community rating and year-round open enrollment are
                  genuinely the most consumer-friendly Medigap rules in the country.
                </strong>{" "}
                Unlike most states where you can be denied coverage after your initial
                Open Enrollment Period, Massachusetts lets you switch carriers any month
                of the year without health questions. This means you can always shop for a
                lower premium if a carrier raises rates. Among the major carriers, AARP/UHC
                at $196/mo for Supplement 1A offers the best balance of price, brand
                recognition, and AARP member perks. BCBS Massachusetts at $233/mo is the
                most trusted local option with 71% market share. If you want the lowest
                Supplement 1A premium, Humana was at $176/mo - but note that Humana
                stopped accepting new MA Medigap enrollees in April 2026. Existing Humana
                members may stay enrolled.
              </>
            }
          />
        </div>
      </section>

      {/* Massachusetts-Specific Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Massachusetts Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Layers, Equal, CalendarCheck, Info, Clock, Shield];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-blue-200",
                "border-purple-200",
                "border-green-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
              ];
              const iconColors = [
                "text-blue-600",
                "text-purple-600",
                "text-emerald-600",
                "text-blue-600",
                "text-blue-600",
                "text-blue-600",
              ];
              return (
                <div
                  key={i}
                  className={`p-5 bg-white border ${borderColors[i % borderColors.length]} rounded-xl flex items-start gap-3`}
                >
                  <Icon
                    className={`w-5 h-5 ${iconColors[i % iconColors.length]} shrink-0 mt-0.5`}
                  />
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{rule.title}</p>
                    <p className="text-sm text-slate-600">{rule.description}</p>
                  </div>
                </div>
              );
            })}
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
            {SCORING_FACTORS.map((factor, i) => (
              <div
                key={factor.factor}
                className={`flex items-start gap-4 p-4 ${
                  i < SCORING_FACTORS.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <div className="w-16 shrink-0">
                  <span className="text-sm font-bold text-blue-600">
                    {factor.weight}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {factor.factor}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{factor.description}</p>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Last updated: May 2026 | Data sources: NAIC complaint ratios, AM Best
                ratings, CMS Medicare Plan Finder, Massachusetts Division of Insurance,
                FairSquare Medicare
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
            {FAQS.map((faq, i) => (
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
              Find the Best Medigap Rate in Your Massachusetts ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Massachusetts has the most consumer-friendly Medigap rules in the country:
              community rating, year-round open enrollment, and no excess charges.
              Supplement 1A starts at $176/mo in Boston. Because you can switch any month
              without underwriting, you can always shop for a better rate. Enter your ZIP
              code to compare rates from all available carriers in your area.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="massachusetts_bottom_cta"
                triggerId="massachusetts-bottom-cta-compare"
                coverageType="ms"
                title="Compare Massachusetts Medigap Rates"
                subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Massachusetts."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare MA Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "massachusetts_bottom_cta",
                  })
                }
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" /> (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
