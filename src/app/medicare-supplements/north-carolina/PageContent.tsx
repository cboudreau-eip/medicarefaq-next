"use client";

/**
 * North Carolina Medicare Supplement Comparison Page
 * Route: /medicare-supplements/north-carolina/
 * Key differentiators: Highest Plan G adoption (49%), USAA in top 5 (large military presence),
 *                      Wellabe is cheapest at $113/mo, fast-growing retirement destination,
 *                      BCBS NC holds 32.7% market share, SHIIP free counseling
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
  DollarSign,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  NC_CARRIERS,
  NC_STATS,
  NC_FAQS,
  SCORING_METHODOLOGY,
  type NCCarrier,
} from "@/lib/north-carolina-medigap-data";
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
function CarrierCard({ carrier, rank }: { carrier: NCCarrier; rank: number }) {
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
              pageSection="nc_carrier_card"
              triggerId={`nc-carrier-${carrier.id}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in North Carolina`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of North Carolina.`}
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
                  page_section: "nc_carrier_card",
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
            <div className="md:col-span-2 mt-2">
              <p className="text-xs text-slate-500">
                <strong>Plans offered in North Carolina:</strong>{" "}
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
export default function NorthCarolinaPageContent() {
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
            <span className="text-teal-400">North Carolina</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">NC</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated February 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-200">
              Highest Plan G Adoption in Southeast
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in North Carolina 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            North Carolina is one of the fastest-growing retirement states in the
            country — Plan G starts at just {NC_STATS.lowestPlanGPremium} in
            Greensboro. We compared {NC_STATS.numberOfCarriers} carriers to find the
            best coverage for North Carolina&apos;s {NC_STATS.medigapEnrollees} Medigap
            enrollees.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{NC_STATS.medigapEnrollees}</strong>{" "}
                North Carolinians with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">
                  {NC_STATS.lowestPlanGPremium}
                </strong>{" "}
                in Greensboro
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan N from{" "}
                <strong className="text-white">
                  {NC_STATS.lowestPlanNPremium}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">49%</strong> of NC enrollees choose
                Plan G
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="nc_hero"
              triggerId="nc-hero-compare"
              coverageType="ms"
              title="Compare North Carolina Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of North Carolina."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare NC Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "nc_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Plan G Adoption Spotlight Banner */}
      <section className="bg-emerald-50 border-b border-emerald-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-bold text-emerald-900 text-base mb-1">
                North Carolina Has the Highest Plan G Adoption Rate in the Southeast
              </p>
              <p className="text-sm text-emerald-800">
                49% of North Carolina Medigap enrollees choose Plan G — the highest
                adoption rate of any state we&apos;ve reviewed. This reflects NC&apos;s
                large and growing retirement population: Charlotte, Raleigh, and Asheville
                are among the most popular retirement destinations in the country. Plan G
                starts at just{" "}
                <strong>{NC_STATS.lowestPlanGPremium}/mo</strong> in Greensboro, making
                it an excellent value for comprehensive coverage.
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
                <strong>{NC_CARRIERS.length}</strong> carriers analyzed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Plan G from {NC_STATS.lowestPlanGPremium} in Greensboro</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>State Farm rated #1 overall in North Carolina</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 460,000 people in North Carolina have Medicare Supplement
            Insurance, or Medigap. North Carolina is one of the fastest-growing
            retirement states in the country — Charlotte, Raleigh, and Asheville
            consistently rank among the top retirement destinations in the Southeast.
            Plan G starts at just $95 per month in Greensboro, and the state&apos;s
            competitive insurance market with over 30 licensed carriers keeps premiums
            affordable.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Plan G is the most popular Medicare Supplement plan in North Carolina,
            chosen by 49% of Medigap enrollees — the highest Plan G adoption rate of
            any state we&apos;ve reviewed. It covers all out-of-pocket costs except the
            annual Part B deductible ($283 in 2026). North Carolina uses attained-age
            rating, meaning premiums increase as you age, so enrolling during your
            6-month Open Enrollment Period at age 65 is the best way to lock in the
            lowest possible rate.
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
            Compare the Best Medicare Supplement Plans in North Carolina
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in North Carolina, ranked by the MedicareFAQ
            Score. Premiums shown are for a 65-year-old female nonsmoker in Greensboro.
            Rates in Charlotte, Raleigh, Asheville, and other regions may vary.
          </p>

          <div className="space-y-4">
            {NC_CARRIERS.map((carrier, i) => (
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
            Medicare Supplement Prices in North Carolina
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from our top-scoring carriers. Rates shown are for a
            65-year-old female nonsmoker in Greensboro and include available household
            discounts. North Carolina uses attained-age rating — premiums will increase
            as you age. Charlotte, Raleigh, and Asheville rates may differ slightly.
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
                  {NC_CARRIERS.map((carrier, i) => (
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
                <strong>Lowest available in North Carolina (Greensboro):</strong> Plan G
                from {NC_STATS.lowestPlanGPremium} | Plan N from{" "}
                {NC_STATS.lowestPlanNPremium} | Source: CMS Medicare Plan Finder,
                NerdWallet Feb 2026
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="nc_premium_table"
              triggerId="nc-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your North Carolina ZIP Code"
              subtitle="Premiums vary by city in North Carolina. Enter your ZIP code to see exact rates from all available carriers in your area."
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
            Plan G vs. Plan N in North Carolina
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new
            enrollees in North Carolina. Here is how they compare.
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
                      feature: "Avg. monthly premium (Greensboro)",
                      g: { text: NC_STATS.averagePlanGPremium, bold: true },
                      n: { text: NC_STATS.averagePlanNPremium, bold: true },
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
                        {"text" in row.g ? (
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
                        {"text" in row.n ? (
                          <span
                            className={`${"bold" in row.n && row.n.bold ? "font-bold" : "font-semibold"} ${
                              "text" in row.n && typeof row.n.text === "string" && row.n.text.startsWith("Up to")
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
      <section className="py-0 pb-2">
        <div className="container max-w-4xl">
          <EddieProTip
            tip={
              <>
                <strong>
                  In North Carolina, Wellabe is actually the cheapest top-rated option —
                  not HealthSpring.
                </strong>{" "}
                Wellabe offers Plan G at $113/mo with a reasonable complaint record, while
                HealthSpring at $130/mo has a far-higher-than-expected complaint rate.
                Also worth noting: BCBS North Carolina (not in our top 5) holds 32.7% of
                the state&apos;s Medigap market — it&apos;s worth getting a quote from
                them as well. If you are a veteran or military family member, USAA is the
                5th-largest Medigap insurer in NC and is worth comparing. Always get at
                least 3 quotes before enrolling.
              </>
            }
          />
        </div>
      </section>

      {/* NC-Specific Notes */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            North Carolina Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  6-Month Open Enrollment Period
                </p>
                <p className="text-sm text-slate-600">
                  Your Medigap Open Enrollment Period is a one-time 6-month window that
                  starts the first month you are 65 or older and enrolled in Medicare
                  Part B. During this period, carriers cannot deny you coverage or charge
                  more due to pre-existing health conditions. This is the best time to
                  enroll in Medigap in North Carolina.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  No Birthday Rule in North Carolina
                </p>
                <p className="text-sm text-slate-600">
                  North Carolina does not have a birthday rule. Unlike California, which
                  allows enrollees to switch to an equal or lesser plan during a 60-day
                  window each year around their birthday, North Carolina enrollees can
                  only switch Medigap plans after their OEP by passing medical
                  underwriting. This makes your initial enrollment decision especially
                  important.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Attained-Age Rating
                </p>
                <p className="text-sm text-slate-600">
                  North Carolina uses attained-age rating, which means your Medigap
                  premium increases as you get older. Premiums are based on your current
                  age and rise each year. Enrolling during your OEP at age 65 is the best
                  strategy to lock in the lowest possible starting rate.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  SHIIP — Free Medicare Counseling
                </p>
                <p className="text-sm text-slate-600">
                  SHIIP (Medicare and Seniors&apos; Health Insurance Information Program)
                  is North Carolina&apos;s State Health Insurance Assistance Program
                  (SHIP). It provides free, unbiased Medicare counseling from trained
                  volunteers. SHIIP counselors can help you compare Medigap plans,
                  understand your options, and navigate enrollment at no cost to you.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  BCBS North Carolina — The Dominant Local Carrier
                </p>
                <p className="text-sm text-slate-600">
                  Blue Cross and Blue Shield of North Carolina is the largest Medigap
                  insurer in the state with 32.7% market share. As an NC-based insurer
                  with deep local roots, it is widely recognized and trusted by North
                  Carolina residents. While not included in our top 5 rated picks, BCBS
                  NC is worth getting a quote from when shopping for Medigap coverage.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Military &amp; Veteran Community — USAA Is Worth Comparing
                </p>
                <p className="text-sm text-slate-600">
                  North Carolina has one of the largest military and veteran populations
                  in the country, home to Fort Liberty (formerly Fort Bragg), Camp
                  Lejeune, and Seymour Johnson Air Force Base. USAA is the 5th-largest
                  Medigap insurer in NC with 1.5% market share. If you are a veteran,
                  active duty service member, or military family member, USAA Medigap is
                  exclusively available to you and is worth comparing alongside national
                  carriers.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Regulated by the NC Department of Insurance
                </p>
                <p className="text-sm text-slate-600">
                  All Medigap plans in North Carolina are regulated by the North Carolina
                  Department of Insurance (NCDOI). The NCDOI maintains consumer resources
                  for comparing plans and handles complaints against carriers. North
                  Carolina also enforces a 30-day free-look period, allowing you to return
                  a new policy for a full refund if you are not satisfied.
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
            {NC_FAQS.map((faq, i) => (
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
              Find the Best Medigap Rate in Your North Carolina ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              North Carolina has competitive Medigap premiums and one of the highest Plan
              G adoption rates in the Southeast. Enter your ZIP code to see exact rates
              from all available carriers in your area — and remember, your Open
              Enrollment Period is the best time to lock in coverage without medical
              underwriting.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="nc_bottom_cta"
                triggerId="nc-bottom-cta-compare"
                coverageType="ms"
                title="Compare North Carolina Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of North Carolina."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare NC Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "nc_bottom_cta",
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
