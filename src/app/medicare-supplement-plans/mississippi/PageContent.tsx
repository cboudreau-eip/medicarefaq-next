"use client";

/**
 * Mississippi Medicare Supplement Comparison Page
 * Route: /medicare-supplement-plans/mississippi/
 * Key differentiators: No birthday rule,
 *                      LifeShield National lowest Plan G at $123/mo (saves $101/mo vs. avg),
 *                      New Era lowest Plan N at $83/mo,
 *                      MedMutual Protect lowest Plan F at $142/mo with issue-age pricing,
 *                      Blue Cross Blue Shield of Mississippi local carrier,
 *                      Transamerica all 10 plan types + issue-age pricing,
 *                      Mississippi SHIP at (844) 822-4622
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
  AlertCircle,
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
} from "@/lib/mississippi-medigap-data";
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
                <p className="text-sm font-bold text-slate-900">{carrier.planGMonthly}</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan N</p>
                <p className="text-sm font-bold text-slate-900">{carrier.planNMonthly}</p>
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
              pageSection="mississippi_carrier_card"
              triggerId={`mississippi-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Mississippi`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Mississippi.`}
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
                  page_section: "mississippi_carrier_card",
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

export default function MississippiPageContent() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
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
            <span className="text-teal-400">Mississippi</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">MS</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-100 text-slate-800 border-slate-200">
              No Birthday Rule
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Mississippi 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Mississippi has 38 carriers competing for Medigap business, keeping Plan G rates
            among the lowest in the South. LifeShield National offers Plan G from{" "}
            {STATE_STATS.lowestPlanG}, saving $101/mo vs. the state average. New Era offers
            Plan N from {STATE_STATS.lowestPlanN}. Mississippi does not have a birthday rule.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> Mississippi seniors with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> (LifeShield National)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>
                Plan N from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanN}</strong> (New Era)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>
                MedMutual Protect <strong className="text-white">A+</strong> rated with issue-age pricing
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="mississippi_hero"
              triggerId="mississippi-hero-compare"
              coverageType="ms"
              title="Compare Mississippi Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Mississippi."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare MS Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"
              
              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "mississippi_hero",
                })
              }
              className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* No Birthday Rule Alert */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-700" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-sm mb-1">
                Mississippi Does Not Have a Birthday Rule
              </p>
              <p className="text-sm text-amber-800">
                Mississippi does not give policyholders an annual window to switch Medigap
                plans without medical underwriting. Your initial Open Enrollment Period (the
                6 months after you turn 65 and enroll in Part B) is the most important window
                for securing coverage. After that window closes, carriers can use medical
                underwriting to approve or deny your application. Enroll in the best plan you
                can afford during your initial Open Enrollment Period.
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
              <Shield className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span><strong>{CARRIERS.length}</strong> top carriers analyzed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-teal-600" aria-hidden="true" />
              <span>LifeShield National Plan G from {STATE_STATS.lowestPlanG}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>MedMutual Protect A+ with issue-age pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 150,000 Mississippi residents have Medicare Supplement Insurance, also
            called Medigap. Mississippi has 38 carriers licensed to sell Medigap plans, one
            of the larger markets in the South. This competition keeps Plan G rates among the
            lowest in the country, with LifeShield National at $123/mo, saving $101/mo vs.
            the state average of $224/mo.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Plan G is the most popular choice for new enrollees, covering nearly all Medicare
            out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan G
            premiums in Jackson range from $123/mo (LifeShield National) to over $188/mo
            (Transamerica) for a 65-year-old. Mississippi does not have a birthday rule, so
            your initial Open Enrollment Period is the most important window for securing
            coverage without medical underwriting.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            LifeShield National is the standout carrier for Plan G value at $123/mo. MedMutual
            Protect offers the lowest Plan F ($142/mo) and uses issue-age pricing, which locks
            your premium at your enrollment age. New Era offers the lowest Plan N ($83/mo),
            Plan A ($95/mo), and Plan M ($84/mo). Blue Cross Blue Shield of Mississippi is the
            local carrier with the strongest provider network across Jackson, Gulfport, and
            rural Mississippi. Transamerica is the only carrier offering all 10 plan types
            with issue-age pricing.
          </p>
        </div>
      </section>

      {/* Carrier Cards */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Compare the Best Medicare Supplement Plans in Mississippi
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Mississippi, ranked by the MedicareFAQ Score.
            Rates shown are for a 65-year-old in the Jackson area and are updated for 2026.
          </p>

          <div className="space-y-4">
            {CARRIERS.map((carrier, i) => (
              <CarrierCard key={carrier.rank} carrier={carrier} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Table */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Mississippi Medigap Premium Comparison
          </h2>
          <p className="text-slate-600 mb-6">
            Monthly premiums for a 65-year-old in Jackson, Mississippi. Rates are for standard
            Plan G, Plan N, and Plan F. Premiums vary by ZIP code, age, gender, and tobacco use.
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
                Rates are for a 65-year-old in Jackson, Mississippi. N/A indicates the plan is
                not offered by that carrier in Mississippi. Plan F is only available to Medicare
                beneficiaries who became eligible before January 1, 2020. Source: carrier rate
                filings, updated 2026.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="mississippi_premium_table"
              triggerId="mississippi-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Mississippi ZIP Code"
              subtitle="Enter your ZIP code to see exact rates from all available carriers in your area of Mississippi."
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
            Plan G vs. Plan N in Mississippi
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medigap plans for new enrollees in
            Mississippi. Here is how they compare.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Feature</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly premium (lowest MS rate)", g: "$123/mo (LifeShield National)", n: "$83/mo (New Era)" },
                    { feature: "Part A hospital coinsurance", g: "Covered", n: "Covered" },
                    { feature: "Part B coinsurance (20%)", g: "Covered", n: "Covered (with copays)" },
                    { feature: "Part B deductible ($283)", g: "Not covered", n: "Not covered" },
                    { feature: "Part B excess charges", g: "Covered", n: "Not covered" },
                    { feature: "Office visit copay", g: "None", n: "Up to $20" },
                    { feature: "ER visit copay (no admission)", g: "None", n: "Up to $50" },
                    { feature: "Switching without underwriting", g: "Only during OEP or qualifying event", n: "Only during OEP or qualifying event" },
                    { feature: "Best for", g: "Frequent care, excess charge protection", n: "Healthy seniors, lowest monthly cost" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 text-slate-700">{row.feature}</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-900">{row.g}</td>
                      <td className="px-5 py-3 text-center font-semibold text-teal-700">{row.n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  Mississippi has no birthday rule, so your initial Open Enrollment Period is
                  your most important window. Choose wisely.
                </strong>{" "}
                LifeShield National at $123/mo is the lowest Plan G in Mississippi, saving
                $101/mo vs. the state average. If you want long-term rate stability, MedMutual
                Protect at $128/mo uses issue-age pricing, which locks your premium at your
                enrollment age. For the lowest Plan N, New Era at $83/mo saves $94/mo vs. the
                average. If you want all 10 plan types with issue-age pricing, Transamerica is
                the only option in Mississippi. Call Mississippi SHIP at (844) 822-4622 for
                free help comparing plans during your Open Enrollment Period.
              </>
            }
          />
        </div>
      </section>

      {/* Mississippi Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Mississippi Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [AlertCircle, BarChart3, Shield, Users, Info, Clock];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-amber-200",
                "border-blue-200",
                "border-blue-200",
                "border-slate-200",
                "border-slate-200",
                "border-teal-200",
              ];
              const iconColors = [
                "text-amber-600",
                "text-blue-600",
                "text-blue-600",
                "text-slate-600",
                "text-slate-600",
                "text-teal-600",
              ];
              return (
                <div
                  key={i}
                  className={`p-5 bg-white border ${borderColors[i % borderColors.length]} rounded-xl flex items-start gap-3`}
                >
                  <Icon
                    className={`w-5 h-5 ${iconColors[i % iconColors.length]} shrink-0 mt-0.5`} aria-hidden="true" />
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
            The MedicareFAQ Score rates Medicare Supplement carriers on a scale of 1.0 to 5.0
            based on five key factors. Our ratings are independent and not influenced by
            advertising relationships.
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
                carrier rate filings, CMS Medicare Plan Finder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              Mississippi Has No Birthday Rule: Enroll Right During Your Open Enrollment Period
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              LifeShield National offers Plan G from $123/mo, saving $101/mo vs. the state
              average. MedMutual Protect uses issue-age pricing to lock in your rate at
              enrollment. Call Mississippi SHIP at (844) 822-4622 for free help.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="mississippi_bottom_cta"
                triggerId="mississippi-bottom-cta-compare"
                coverageType="ms"
                title="Compare Mississippi Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of Mississippi."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare MS Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                }
              />
              <a
                href="tel:+18883358996"
                
                data-invoca-phone-number="18883358996"
                onClick={() =>
                  trackPhoneClick({
                    phone_number: "(888) 335-8996",
                    page_section: "mississippi_bottom_cta",
                  })
                }
                className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
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
