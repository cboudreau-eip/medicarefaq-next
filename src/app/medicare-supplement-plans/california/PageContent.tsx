"use client";

/**
 * California Medicare Supplement Comparison Page
 * Route: /medicare-supplement-plans/california/
 * NerdWallet-style state comparison page with carrier cards, MedicareFAQ scoring,
 * premium comparison table, California birthday rule callout, and CTA buttons.
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
  Gift,
  BarChart3,
  CalendarDays,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  CALIFORNIA_CARRIERS,
  CALIFORNIA_STATS,
  CALIFORNIA_FAQS,
  SCORING_METHODOLOGY,
  type CaliforniaCarrier,
} from "@/lib/california-medigap-data";
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
function CarrierCard({ carrier, rank }: { carrier: CaliforniaCarrier; rank: number }) {
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
                <p className="text-sm font-bold text-slate-900">{carrier.plansOffered.length} types</p>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="california_carrier_card"
              triggerId={`california-carrier-${carrier.id}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in California`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of California.`}
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
                  page_section: "california_carrier_card",
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
                <strong>Plans offered in California:</strong>{" "}
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
export default function CaliforniaPageContent() {
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
            <span className="text-teal-400">California</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">CA</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated February 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-200">
              Birthday Rule State
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in California 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            We compared {CALIFORNIA_STATS.numberOfCarriers} Medigap carriers in California based on
            pricing, financial strength, complaint records, and more - including California&apos;s
            unique birthday rule that lets you switch carriers every year.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{CALIFORNIA_STATS.medigapEnrollees}</strong>{" "}
                Californians with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{CALIFORNIA_STATS.lowestPlanGPremium}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">Birthday rule</strong> - switch carriers annually
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="california_hero"
              triggerId="california-hero-compare"
              coverageType="ms"
              title="Compare California Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of California."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare California Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "california_hero",
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
                <strong>{CALIFORNIA_CARRIERS.length}</strong> carriers analyzed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-600" />
              <span>Birthday rule: switch carriers annually</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Independent, unbiased ratings</span>
            </div>
          </div>
        </div>
      </section>

      {/* California Birthday Rule Spotlight */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="container max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-amber-900">
                  California Has the Birthday Rule
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
                  Key Advantage
                </span>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed max-w-3xl">
                California&apos;s birthday rule (effective July 1, 2020) gives you a{" "}
                <strong>60-day window starting on your birthday each year</strong> to switch
                your Medigap plan to a different carrier - no health questions, no medical
                underwriting. You can switch to any carrier offering a plan with{" "}
                <strong>equal or lesser benefits</strong> (e.g., Plan G to Plan G at a lower
                premium, or Plan G to Plan N). This is a major advantage over most states,
                where switching carriers after your initial enrollment requires passing medical
                underwriting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="text-slate-700 text-base leading-relaxed mb-4">
                Nearly 600,000 Californians have Medicare Supplement Insurance, or Medigap.
                Medigap plans help cover certain out-of-pocket expenses like copays, coinsurance,
                and deductibles left over after Medicare pays for covered services. With over
                7 million Medicare beneficiaries - the largest Medicare population in the country -
                California is one of the most competitive Medigap markets in the United States.
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                Many companies offer Medigap plans in California, but only a few earn top marks
                on our data-driven ratings. We compared companies based on prices, financial
                strength, complaint rates, plan availability, and discount options to find the
                best Medigap plans in California for 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carrier Cards Section */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Compare the Best Medicare Supplement Plans in California
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in California, ranked by the MedicareFAQ Score.
            Premiums shown are for a 65-year-old female nonsmoker in Los Angeles, CA.
          </p>

          <div className="space-y-4">
            {CALIFORNIA_CARRIERS.map((carrier, i) => (
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
            Medicare Supplement Prices in California
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from our top-scoring carriers. Rates shown are for a
            65-year-old female nonsmoker in Los Angeles, CA and include available household
            discounts. Actual rates vary by ZIP code, age, gender, and health status.
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
                  {CALIFORNIA_CARRIERS.map((carrier, i) => (
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
                <strong>Lowest available in California:</strong> Plan G from{" "}
                {CALIFORNIA_STATS.lowestPlanGPremium} | Plan N from{" "}
                {CALIFORNIA_STATS.lowestPlanNPremium}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="california_premium_table"
              triggerId="california-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your ZIP Code"
              subtitle="Premiums vary by location. Enter your California ZIP code to see exact rates from all available carriers."
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
            Plan G vs. Plan N in California
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new
            enrollees in California. Here is how they compare.
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
                  <tr className="bg-white">
                    <td className="px-5 py-3 text-slate-700">Part A hospital coinsurance</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3 text-slate-700">Part B coinsurance (20%)</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered*
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3 text-slate-700">Part A deductible ($1,736)</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3 text-slate-700">Part B deductible ($283)</td>
                    <td className="px-5 py-3 text-center text-red-500 font-semibold">
                      <XCircle className="w-4 h-4 inline" /> Not covered
                    </td>
                    <td className="px-5 py-3 text-center text-red-500 font-semibold">
                      <XCircle className="w-4 h-4 inline" /> Not covered
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3 text-slate-700">Part B excess charges</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                    <td className="px-5 py-3 text-center text-red-500 font-semibold">
                      <XCircle className="w-4 h-4 inline" /> Not covered
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3 text-slate-700">Skilled nursing coinsurance</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3 text-slate-700">Foreign travel emergency</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4 inline" /> Covered
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3 text-slate-700">Office visit copay</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      $0
                    </td>
                    <td className="px-5 py-3 text-center text-amber-600 font-semibold">
                      Up to $20
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3 text-slate-700">ER copay (no admission)</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-semibold">
                      $0
                    </td>
                    <td className="px-5 py-3 text-center text-amber-600 font-semibold">
                      Up to $50
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3 text-slate-700 font-semibold">
                      Avg. monthly premium (CA)
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-slate-900">
                      {CALIFORNIA_STATS.averagePlanGPremium}
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-slate-900">
                      {CALIFORNIA_STATS.averagePlanNPremium}
                    </td>
                  </tr>
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

      {/* Eddie Pro Tip - placed between Plan G vs N table and California Rules */}
      <section className="py-0 pb-2">
        <div className="container max-w-4xl">
          <EddieProTip
            tip={
              <>
                <strong>California&apos;s birthday rule is your annual rate-shopping window.</strong>{" "}
                Every year, starting on your birthday, you have 60 days to switch your Medigap
                plan to a different carrier - no health questions asked. The catch: you can only
                switch to a plan with equal or lesser benefits. That means you can move from
                Plan G at one carrier to Plan G at another (same coverage, potentially lower
                premium), but you cannot use the birthday rule to upgrade from Plan N to Plan G.
                Mark your birthday on your calendar and shop rates every year.
              </>
            }
            variant="amber"
          />
        </div>
      </section>

      {/* California-Specific Notes */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            California Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-amber-200 rounded-xl flex items-start gap-3">
              <Gift className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  California Birthday Rule (Effective July 1, 2020)
                </p>
                <p className="text-sm text-slate-600">
                  California law gives current Medigap policyholders a 60-day window starting
                  on their birthday each year to switch to any carrier offering a plan with
                  equal or lesser benefits - without medical underwriting. You can switch
                  from Plan G at one carrier to Plan G at a lower-priced carrier, or from
                  Plan G to Plan N. You cannot use the birthday rule to upgrade to a more
                  comprehensive plan. This rule applies only to those already enrolled in a
                  Medigap plan.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Regulated by the California Department of Insurance (CDI)
                </p>
                <p className="text-sm text-slate-600">
                  All Medicare Supplement plans sold in California are regulated by the
                  California Department of Insurance. CDI enforces federal standardization
                  rules, meaning Plan G from any carrier covers the same benefits. CDI also
                  enforces a 30-day free-look period, allowing you to return a new policy
                  for a full refund if you are not satisfied.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Rating Methods in California
                </p>
                <p className="text-sm text-slate-600">
                  California Medigap carriers may use attained-age rating (premiums increase
                  as you age) or community rating (everyone pays the same rate regardless of
                  age). Community-rated plans typically start higher but increase more slowly
                  over time. Ask about rating type when comparing quotes, as it significantly
                  affects long-term costs.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Largest Medicare Market in the Country
                </p>
                <p className="text-sm text-slate-600">
                  With {CALIFORNIA_STATS.totalMedicareEnrollees} Medicare beneficiaries -
                  the most of any state - California is the largest Medigap market in the
                  country. This means more than {CALIFORNIA_STATS.numberOfCarriers} carriers
                  compete for your business, resulting in competitive premiums and more plan
                  options than most states.
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
            {CALIFORNIA_FAQS.map((faq, i) => (
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
              Find the Best Medigap Rate in Your Area
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Medigap premiums vary significantly by ZIP code in California. Enter yours to see
              exact rates from all available carriers, compare plans side by side, and find
              the best value for your coverage needs - especially before your birthday window opens.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="california_bottom_cta"
                triggerId="california-bottom-cta-compare"
                coverageType="ms"
                title="Compare California Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare California Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "california_bottom_cta",
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
