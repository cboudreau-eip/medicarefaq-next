"use client";

/**
 * New Jersey Medicare Supplement Comparison Page
 * Route: /medicare-supplement-plans/new-jersey/
 * Key differentiators: No birthday rule, attained-age rating, Horizon BCBS is dominant local carrier,
 *                      Plan G from $142/mo in Newark, ~400,000 enrollees, no special switching rules,
 *                      SHIP free counseling at 1-800-792-8820, DOBI regulation
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
  CARRIERS,
  STATE_STATS,
  FAQS,
  SCORING_FACTORS,
  STATE_RULES,
  PREMIUM_TABLE,
  type Carrier,
} from "@/lib/new-jersey-medigap-data";
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
          }`} aria-hidden="true" />
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
                <Building2 className="w-6 h-6 text-white" aria-hidden="true" />
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
                <p className="text-xs text-slate-500 mb-0.5">Plan G</p>
                <p className="text-sm font-bold text-slate-900">{carrier.planGMonthly}/mo</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan N</p>
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
              pageSection="new_jersey_carrier_card"
              triggerId={`new-jersey-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in New Jersey`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of New Jersey.`}
              buttonLabel="Get a Quote"
              trigger={
                <button className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
                  Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"
              
              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "new_jersey_carrier_card",
                })
              }
              className="invoca-phone w-full inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-400 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> (888) 335-8996
            </a>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {expanded ? "Hide details" : "Show pros and cons"}
          {expanded ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Pros</p>
              <ul className="space-y-1.5">
                {carrier.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
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
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
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

export default function NewJerseyPageContent() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link href="/medicare-supplement-plans" className="hover:text-white transition-colors">
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-teal-400">New Jersey</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">NJ</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in New Jersey 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            New Jersey has over {STATE_STATS.enrollees} Medigap enrollees. Plan G coverage starts
            at just {STATE_STATS.lowestPlanG} in Newark. We compared {STATE_STATS.carriers} carriers
            to find the best coverage for New Jersey retirees.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> NJ residents with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                Plan G from <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> in Newark
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                Plan N from <strong className="text-white">$108/mo</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers licensed in NJ
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="new_jersey_hero"
              triggerId="new-jersey-hero-compare"
              coverageType="ms"
              title="Compare New Jersey Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of New Jersey."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare NJ Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"
              
              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "new_jersey_hero",
                })
              }
              className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
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
              <span><strong>{CARRIERS.length}</strong> carriers analyzed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Plan G from {STATE_STATS.lowestPlanG} in Newark</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Attained-age rating state</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 400,000 people in New Jersey have Medicare Supplement Insurance, or Medigap.
            New Jersey uses attained-age rating, which means premiums increase as you get older.
            This makes it especially important to shop carefully during your 6-month Open Enrollment
            Period at age 65, when you have guaranteed-issue rights and cannot be denied coverage
            or charged higher premiums based on your health history.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Horizon Blue Cross Blue Shield of New Jersey is the dominant local carrier with a
            significant share of the state market. National carriers like AARP/UnitedHealthcare,
            Mutual of Omaha, and Cigna also compete actively in New Jersey. Plan G is the most
            popular plan, covering all Medicare cost-sharing except the Part B deductible ($283 in
            2026). Plan N offers lower premiums in exchange for small copays at doctor visits and
            emergency rooms.
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
            Compare the Best Medicare Supplement Plans in New Jersey
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in New Jersey, ranked by the MedicareFAQ Score.
            Premiums shown are for a 65-year-old female nonsmoker in Newark. Rates in Jersey City,
            Trenton, and other regions may vary.
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
            Medicare Supplement Prices in New Jersey
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from top carriers in Newark for a 65-year-old female nonsmoker.
            Rates in Jersey City, Trenton, and other areas may differ. Premiums shown may include
            available household discounts.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Insurance Company</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan F Monthly</th>
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
                <strong>Lowest available in New Jersey (Newark):</strong> Plan G from{" "}
                {STATE_STATS.lowestPlanG} | Plan N from $108/mo | Source: FairSquare Medicare,
                CMS Medicare Plan Finder, May 2026
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="new_jersey_premium_table"
              triggerId="new-jersey-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your New Jersey ZIP Code"
              subtitle="Premiums vary by city in New Jersey. Enter your ZIP code to see exact rates from all available carriers in your area."
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

      {/* Plan G vs Plan N */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Plan G vs. Plan N in New Jersey
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medigap plans for new enrollees in New Jersey.
            Here is how they compare on coverage and cost.
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
                      feature: "Part A deductible ($1,736 in 2026)",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Part B deductible ($283 in 2026)",
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
                      feature: "Avg. monthly premium (Newark, age 65F)",
                      g: { text: "$142-$195", bold: true },
                      n: { text: "$108-$155", bold: true },
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
                            <CheckCircle2 className="w-4 h-4 inline" aria-hidden="true" /> Covered
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" aria-hidden="true" /> Not covered
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
                            <CheckCircle2 className="w-4 h-4 inline" aria-hidden="true" /> Covered
                            {"note" in row.n ? row.n.note : ""}
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
                *Plan N covers Part B coinsurance but requires a copay of up to $20 at doctor
                visits and up to $50 at emergency rooms (waived if admitted). Part B excess charges
                are not covered by Plan N, so choose providers who accept Medicare assignment.
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
                  New Jersey uses attained-age rating, which means your premium increases every year
                  as you get older.
                </strong>{" "}
                This makes your 6-month Open Enrollment Period at age 65 the most important window
                to lock in coverage. Horizon BCBS is the dominant local carrier and worth getting a
                quote from, but national carriers like Mutual of Omaha and AARP/UnitedHealthcare
                often come in lower. Cigna is cheapest at $142/mo but has a higher complaint ratio
                than most competitors. New Jersey has no birthday rule or anniversary rule, so once
                your OEP closes, switching carriers requires passing medical underwriting.
              </>
            }
          />
        </div>
      </section>

      {/* New Jersey-Specific Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            New Jersey Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Clock, AlertTriangle, Info, Shield, Award];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-slate-200",
                "border-amber-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
              ];
              const iconColors = [
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
                  <Icon className={`w-5 h-5 ${iconColors[i % iconColors.length]} shrink-0 mt-0.5`} aria-hidden="true" />
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
              Find the Best Medigap Rate in Your New Jersey ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              New Jersey has a competitive Medigap market with over 30 carriers and Plan G starting
              at just {STATE_STATS.lowestPlanG} in Newark. Enter your ZIP code to see exact rates
              from all available carriers in your area. Your Open Enrollment Period is the best time
              to lock in coverage without medical underwriting.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="new_jersey_bottom_cta"
                triggerId="new-jersey-bottom-cta-compare"
                coverageType="ms"
                title="Compare New Jersey Medigap Rates"
                subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of New Jersey."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare NJ Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                }
              />
              <a
                href="tel:+18883358996"
                
                data-invoca-phone-number="18883358996"
                onClick={() =>
                  trackPhoneClick({
                    phone_number: "(888) 335-8996",
                    page_section: "new_jersey_bottom_cta",
                  })
                }
                className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
