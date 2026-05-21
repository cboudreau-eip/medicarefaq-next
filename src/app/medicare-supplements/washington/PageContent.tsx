"use client";

/**
 * Washington Medicare Supplement Comparison Page
 * Route: /medicare-supplements/washington/
 * Key differentiators: Year-round plan switching rule (no birthday rule needed),
 *                      Regence BlueShield cheapest at $115/mo (vs $200+ for competitors),
 *                      Issue-age rating available from Premera Blue Cross,
 *                      SHIBA free counseling program (800-562-6900),
 *                      1.1M+ Medicare enrollees, Evergreen State
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
  BarChart3,
  MapPin,
  DollarSign,
  RefreshCw,
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
} from "@/lib/washington-medigap-data";
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
              pageSection="washington_carrier_card"
              triggerId={`washington-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Washington`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Washington.`}
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
                  page_section: "washington_carrier_card",
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
export default function WashingtonPageContent() {
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
            <span className="text-teal-400">Washington</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">WA</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200">
              Year-Round Switching State
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Washington State 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Washington has over {STATE_STATS.enrollees} Medigap enrollees - Plan G starts
            at just {STATE_STATS.lowestPlanG} in Seattle. Washington&apos;s year-round
            switching rule lets you compare and switch plans any month with no health
            screening. We compared {STATE_STATS.carriers} carriers to find the best
            coverage for the Evergreen State.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong>{" "}
                Washingtonians with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong>{" "}
                in Seattle
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan N from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanN}</strong>/mo
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers
                licensed in Washington
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="washington_hero"
              triggerId="washington-hero-compare"
              coverageType="ms"
              title="Compare Washington Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Washington."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare WA Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "washington_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Year-Round Switching Spotlight Banner */}
      <section className="bg-blue-50 border-b border-blue-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-base mb-1">
                Washington Has a Year-Round Medigap Switching Rule - Better Than a Birthday Rule
              </p>
              <p className="text-sm text-blue-800">
                Unlike most states where you are locked into your Medigap plan unless you pass medical
                underwriting, Washington allows enrollees in Plans B through N to switch to any other
                Plan B through N <strong>at any time of year</strong> with no health screening
                questionnaire. This is more powerful than a birthday rule (which only gives a 60-day
                window once per year). Use this rule to shop rates annually and switch to a lower-cost
                carrier whenever you find a better deal.
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
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Plan G from {STATE_STATS.lowestPlanG} in Seattle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Year-round switching - no birthday rule needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 200,000 people in Washington state have Medicare Supplement Insurance, or
            Medigap. Washington is home to over 1.1 million Medicare beneficiaries across Seattle,
            Spokane, Tacoma, Bellevue, and the broader Puget Sound region. With over 25 carriers
            licensed in the state, Washington offers a competitive Medigap market where Plan G
            starts at just $115 per month in Seattle through Regence BlueShield - dramatically
            cheaper than most other carriers in the state.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Plan G is the most popular Medicare Supplement plan for new enrollees in Washington.
            It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible
            ($257 in 2026). Washington uses attained-age rating for most carriers, meaning premiums
            increase as you age - but Premera Blue Cross offers issue-age rating, where your premium
            is locked in at enrollment. Washington&apos;s year-round switching rule means you can
            compare rates and switch carriers any month, giving you ongoing flexibility that most
            states do not offer.
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
            Compare the Best Medicare Supplement Plans in Washington
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Washington, ranked by the MedicareFAQ Score.
            Premiums shown are for a 65-year-old female nonsmoker in Seattle. Rates in
            Spokane, Tacoma, Bellevue, and other regions may vary.
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
            Medicare Supplement Prices in Washington State
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from top carriers in Seattle. Rates shown are for a
            65-year-old female nonsmoker and may include available household discounts.
            Most Washington carriers use attained-age rating - premiums will increase as
            you age. Spokane, Tacoma, and Bellevue rates may differ slightly.
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
                      AM Best
                    </th>
                    <th className="text-left px-5 py-3 font-semibold">
                      Notes
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
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {row.planN}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {row.amBest}
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                <strong>Lowest available in Washington (Seattle):</strong> Plan G from{" "}
                {STATE_STATS.lowestPlanG} | Plan N from {STATE_STATS.lowestPlanN}/mo |
                Source: FairSquare Medicare, CMS Medicare Plan Finder, May 2026
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="washington_premium_table"
              triggerId="washington-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Washington ZIP Code"
              subtitle="Premiums vary by city in Washington. Enter your ZIP code to see exact rates from all available carriers in your area."
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
            Plan G vs. Plan N in Washington
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new
            enrollees in Washington. Here is how they compare.
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
                      feature: "Part B deductible ($257)",
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
                      feature: "Avg. monthly premium (Seattle)",
                      g: { text: "$115-$189", bold: true },
                      n: { text: "$82-$141", bold: true },
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td
                        className={`px-5 py-3 text-slate-700 ${
                          "bold" in row.g && row.g.bold ? "font-semibold" : ""
                        }`}
                      >
                        {row.feature}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {"text" in row.g && row.g.text ? (
                          <span
                            className={`${"bold" in row.g && row.g.bold ? "font-bold" : "font-semibold"} text-slate-900`}
                          >
                            {row.g.text}
                          </span>
                        ) : "covered" in row.g && row.g.covered ? (
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
                        {"text" in row.n && row.n.text ? (
                          <span
                            className={`${"bold" in row.n && row.n.bold ? "font-bold" : "font-semibold"} ${
                              row.n.text.startsWith("Up to")
                                ? "text-amber-600"
                                : "text-slate-900"
                            }`}
                          >
                            {row.n.text}
                          </span>
                        ) : "covered" in row.n && row.n.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" /> Covered
                            {"note" in row.n ? row.n.note : ""}
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
                *Plan N covers Part B coinsurance but may charge up to $20 for some
                office visits and up to $50 for ER visits that do not result in inpatient
                admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eddie Pro Tip */}
      <section className="py-8 bg-slate-50">
        <div className="container max-w-4xl">
          <EddieProTip
            tip={
              <>
                <strong>
                  Washington&apos;s year-round switching rule is one of the best Medigap
                  protections in the country.
                </strong>{" "}
                You can switch from any Plan B through N to any other Plan B through N at
                any time - no birthday window, no annual deadline. Use this rule to shop
                rates every year and switch to a lower-cost carrier whenever you find a
                better deal. The biggest opportunity right now: Regence BlueShield at
                $115/mo vs. most competitors at $200 or more. If you are currently paying
                over $150/mo for Plan G, call us and we can check whether Regence or
                Premera is available in your ZIP code.
              </>
            }
          />
        </div>
      </section>

      {/* Washington State Rules */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Washington Medigap Rules You Should Know
          </h2>
          <p className="text-slate-600 mb-8">
            Washington has some of the most consumer-friendly Medigap rules in the country.
            Here is what you need to know before enrolling.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {STATE_RULES.map((rule, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-2 text-sm">
                  {rule.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring Methodology */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            How We Score Washington Medigap Carriers
          </h2>
          <p className="text-slate-600 mb-6">
            The MedicareFAQ Score is a weighted composite of five factors. No carrier
            paid for placement. Scores are updated quarterly.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Factor</th>
                    <th className="text-center px-5 py-3 font-semibold">Weight</th>
                    <th className="text-left px-5 py-3 font-semibold">What We Measure</th>
                  </tr>
                </thead>
                <tbody>
                  {SCORING_FACTORS.map((factor, i) => (
                    <tr
                      key={factor.name}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-5 py-3 font-medium text-slate-900">
                        {factor.name}
                      </td>
                      <td className="px-5 py-3 text-center font-bold text-blue-700">
                        {factor.weight}%
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {factor.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Washington Medicare Supplement FAQ
          </h2>
          <p className="text-slate-600 mb-8">
            Common questions about Medigap plans in Washington state.
          </p>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="container max-w-3xl text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Ready to Compare Washington Medigap Rates?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Washington&apos;s year-round switching rule means you can compare and switch
            plans any time. Enter your ZIP code to see all available rates in your area,
            or call us to speak with a licensed Washington Medicare agent.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <ZipFormModal
              pageSection="washington_bottom_cta"
              triggerId="washington-bottom-cta"
              coverageType="ms"
              title="Compare Washington Medigap Rates"
              subtitle="Enter your ZIP code to see all available Medigap rates from top carriers in your area of Washington."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg">
                  Compare WA Rates <ArrowRight className="w-5 h-5" />
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
                  page_section: "washington_bottom_cta",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition-colors border border-white/20 text-lg"
            >
              <Phone className="w-5 h-5" /> (888) 335-8996
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-6">
            Free, no-obligation quotes. Licensed Washington Medicare agents available
            Mon-Fri 8am-8pm PT.
          </p>
        </div>
      </section>
    </div>
  );
}
