"use client";

/**
 * Wisconsin Medicare Supplement Comparison Page
 * Route: /medicare-supplements/wisconsin/
 * Key differentiators: Wisconsin uses a unique Basic Plan + rider system instead of federal lettered plans,
 *                      community rating required, under-65 coverage required, WPS Health Insurance is the
 *                      dominant local carrier, Basic Plan from $102/mo in Milwaukee,
 *                      no birthday rule, OCI regulation, SHIP free counseling at 1-800-242-1060
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
  Layers,
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
} from "@/lib/wisconsin-medigap-data";
import { trackPhoneClick } from "@/lib/analytics";

function getScoreColor(score: number) {
  if (score >= 4.5) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 4.0) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 3.5) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

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

function CarrierCard({ carrier, rank }: { carrier: Carrier; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all">
      <div className="bg-slate-50 px-5 py-2 border-b border-slate-200 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {carrier.badge}
        </span>
        <span className="text-xs text-slate-400">#{rank}</span>
      </div>

      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{carrier.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating score={carrier.score} />
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getScoreColor(carrier.score)}`}
                  >
                    {carrier.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">MedicareFAQ Score</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Basic Plan</p>
                <p className="text-sm font-bold text-slate-900">{carrier.planGMonthly}/mo</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan N equiv.</p>
                <p className="text-sm font-bold text-slate-900">{carrier.planNMonthly}/mo</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">AM Best</p>
                <p className="text-sm font-bold text-slate-900">{carrier.amBest}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">{carrier.highlight}</p>
          </div>

          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="wisconsin_carrier_card"
              triggerId={`wisconsin-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Wisconsin`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Wisconsin.`}
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
                  page_section: "wisconsin_carrier_card",
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-400 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-3.5 h-3.5" /> (888) 335-8996
            </a>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {expanded ? "Hide details" : "Show pros and cons"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Pros</p>
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
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">Cons</p>
              <ul className="space-y-1.5">
                {carrier.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
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

export default function WisconsinPageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Wisconsin</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">WI</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200">
              Unique Plan System
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Wisconsin 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Wisconsin has over {STATE_STATS.enrollees} Medigap enrollees. Wisconsin uses its own
            unique plan system instead of the standard federal lettered plans. Basic Plan coverage
            starts at just {STATE_STATS.lowestPlanG} in Milwaukee. We compared{" "}
            {STATE_STATS.carriers} carriers to find the best coverage for Wisconsin retirees.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> Wisconsinites with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Basic Plan from <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> in Milwaukee
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan N equiv. from <strong className="text-white">$78/mo</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers licensed in Wisconsin
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="wisconsin_hero"
              triggerId="wisconsin-hero-compare"
              coverageType="ms"
              title="Compare Wisconsin Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Wisconsin."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare WI Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "wisconsin_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Unique Plan System Spotlight Banner */}
      <section className="bg-blue-50 border-b border-blue-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-base mb-1">
                Wisconsin Uses a Unique Medigap Plan System
              </p>
              <p className="text-sm text-blue-800">
                Unlike the other 47 states that use the standard federal lettered plans (A through N),
                Wisconsin has its own standardized plan structure. Instead of Plan G or Plan N, Wisconsin
                offers a <strong>Basic Plan</strong> with optional riders that let you customize your
                coverage. Wisconsin also requires <strong>community rating</strong>, meaning carriers
                cannot charge higher premiums based on your age. This makes Wisconsin one of the most
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
              <span><strong>{CARRIERS.length}</strong> carriers analyzed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Basic Plan from {STATE_STATS.lowestPlanG} in Milwaukee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Community rating required statewide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 340,000 people in Wisconsin have Medicare Supplement Insurance, or Medigap.
            Wisconsin is one of only three states (along with Minnesota and Massachusetts) that use
            a unique standardized plan system instead of the federal lettered plans used in all other
            states. Instead of choosing between Plan G and Plan N, Wisconsin residents choose a
            Basic Plan and then add optional riders for additional coverage.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Wisconsin also requires community rating, meaning carriers must charge the same premium
            to all enrollees regardless of age. This is a major advantage over attained-age states
            where premiums rise every year as you get older. Wisconsin also requires insurers to offer
            coverage to Medicare beneficiaries under age 65, which is stronger protection than most
            states. WPS Health Insurance is the dominant local carrier with roughly 35% of the
            Wisconsin Medigap market.
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
            Compare the Best Medicare Supplement Plans in Wisconsin
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Wisconsin, ranked by the MedicareFAQ Score.
            Premiums shown are for a 65-year-old female nonsmoker in Milwaukee. Because Wisconsin
            uses community rating, these premiums apply to enrollees of all ages. Rates in Madison,
            Green Bay, and other regions may vary slightly.
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
            Medicare Supplement Prices in Wisconsin
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from top carriers in Milwaukee. Because Wisconsin uses community
            rating, these premiums apply to enrollees of all ages. Rates shown may include available
            household discounts. Madison and Green Bay rates may differ slightly.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Insurance Company</th>
                    <th className="text-center px-5 py-3 font-semibold">Basic Plan Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N equiv. Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Basic + Riders Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {PREMIUM_TABLE.map((row, i) => (
                    <tr key={row.carrier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 font-medium text-slate-900">{row.carrier}</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">{row.planG}</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">{row.planN}</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">{row.planF}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                <strong>Lowest available in Wisconsin (Milwaukee):</strong> Basic Plan from{" "}
                {STATE_STATS.lowestPlanG} | Plan N equiv. from $78/mo | Source: FairSquare
                Medicare, CMS Medicare Plan Finder, May 2026
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="wisconsin_premium_table"
              triggerId="wisconsin-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Wisconsin ZIP Code"
              subtitle="Premiums vary by city in Wisconsin. Enter your ZIP code to see exact rates from all available carriers in your area."
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

      {/* Basic Plan vs Plan N Equivalent Breakdown */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Wisconsin Basic Plan vs. Plan N Equivalent
          </h2>
          <p className="text-slate-600 mb-6">
            Wisconsin&apos;s Basic Plan is the most comprehensive standard option, comparable to Plan G
            in other states. Here is how it compares to the lower-cost Plan N equivalent.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Coverage Feature</th>
                    <th className="text-center px-5 py-3 font-semibold">Basic Plan</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N equiv.</th>
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
                      g: { text: "Prohibited in WI" },
                      n: { text: "Prohibited in WI" },
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
                      feature: "Community rating",
                      g: { text: "Yes" },
                      n: { text: "Yes" },
                    },
                    {
                      feature: "Avg. monthly premium (Milwaukee)",
                      g: { text: "$102-$145", bold: true },
                      n: { text: "$78-$110", bold: true },
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 text-slate-700">{row.feature}</td>
                      <td className="px-5 py-3 text-center">
                        {"text" in row.g && row.g.text ? (
                          <span className={`${"bold" in row.g && row.g.bold ? "font-bold" : "font-semibold"} text-slate-900`}>
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
                              row.n.text.startsWith("Up to") ? "text-amber-600" : "text-slate-900"
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
                *Wisconsin prohibits Part B excess charges, so both plans provide the same protection
                against balance billing. Wisconsin&apos;s community rating means premiums are the same
                for all enrollees regardless of age.
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
                  Wisconsin&apos;s community rating is a major advantage, but it does not mean all
                  carriers charge the same price.
                </strong>{" "}
                WPS Health Insurance is the dominant local carrier with roughly 35% of the market and
                strong Wisconsin roots, but their premiums run higher than some national competitors.
                Mutual of Omaha at $118/mo offers the best combination of price, financial strength
                (A+ AM Best), and customer service. Wisconsin also prohibits Part B excess charges
                statewide, so you do not need to worry about balance billing regardless of which
                plan you choose. Your 6-month Open Enrollment Period at age 65 is your best window
                to lock in coverage without medical underwriting. Wisconsin has no birthday rule.
              </>
            }
          />
        </div>
      </section>

      {/* Wisconsin-Specific Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Wisconsin Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Layers, Clock, AlertTriangle, Info, Shield, Award];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-blue-200",
                "border-slate-200",
                "border-amber-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
              ];
              const iconColors = [
                "text-blue-600",
                "text-blue-600",
                "text-amber-600",
                "text-blue-600",
                "text-blue-600",
                "text-blue-600",
              ];
              return (
                <div
                  key={i}
                  className={`p-5 bg-white border ${borderColors[i % borderColors.length]} rounded-xl flex items-start gap-3`}
                >
                  <Icon className={`w-5 h-5 ${iconColors[i % iconColors.length]} shrink-0 mt-0.5`} />
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
            The MedicareFAQ Score rates Medicare Supplement carriers on a scale of 1.0 to 5.0 based
            on five key factors. Our ratings are independent and not influenced by advertising
            relationships.
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
                  <span className="text-sm font-bold text-blue-600">{factor.weight}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{factor.factor}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{factor.description}</p>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Last updated: May 2026 | Data sources: NAIC complaint ratios, AM Best ratings,
                CMS Medicare Plan Finder, FairSquare Medicare, NerdWallet
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
              Find the Best Medigap Rate in Your Wisconsin ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Wisconsin&apos;s community rating means premiums are the same for all ages, giving you
              more flexibility than most states. With Basic Plan coverage starting at just{" "}
              {STATE_STATS.lowestPlanG}/mo in Milwaukee, Wisconsin offers competitive rates and strong
              consumer protections. Enter your ZIP code to see exact rates from all available carriers
              in your area.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="wisconsin_bottom_cta"
                triggerId="wisconsin-bottom-cta-compare"
                coverageType="ms"
                title="Compare Wisconsin Medigap Rates"
                subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Wisconsin."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare WI Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "wisconsin_bottom_cta",
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
