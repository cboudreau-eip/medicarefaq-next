"use client";

/**
 * Missouri Medicare Supplement Comparison Page
 * Route: /medicare-supplements/missouri/
 * Key differentiator: Anniversary Rule (tied to policy enrollment date, NOT birthday)
 * NerdWallet-style state comparison page with carrier cards, MedicareFAQ scoring,
 * premium comparison table, Anniversary Rule callout, and CTA buttons.
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
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  missouriCarriers,
  missouriStats,
  missouriFAQs,
  missouriScoringMethodology,
  missouriPremiumTable,
  missouriStateRules,
  type MoCarrier,
} from "@/lib/missouri-medigap-data";
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
function CarrierCard({ carrier, rank }: { carrier: MoCarrier; rank: number }) {
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
                <h3 className="text-lg font-bold text-slate-900">{carrier.name}</h3>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
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
                <p className="text-sm font-bold text-slate-900">{carrier.amBestRating}</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Complaints</p>
                <p
                  className={`text-sm font-bold ${
                    carrier.complaintRatio === "Low"
                      ? "text-emerald-600"
                      : carrier.complaintRatio === "High"
                      ? "text-red-500"
                      : "text-amber-600"
                  }`}
                >
                  {carrier.complaintRatio}
                </p>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="missouri_carrier_card"
              triggerId={`missouri-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Missouri`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Missouri.`}
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
                  page_section: "missouri_carrier_card",
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
                <strong>Highlight:</strong> {carrier.highlight}
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
export default function MissouriPageContent() {
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
            <span className="text-teal-400">Missouri</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">MO</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated February 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200">
              Anniversary Rule State
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Missouri 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            We compared {missouriStats.totalCarriers} Medigap carriers in Missouri based on
            pricing, financial strength, complaint records, and more — including Missouri&apos;s
            Anniversary Rule that lets you switch carriers every year without underwriting.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{missouriStats.medigapEnrollees}</strong>{" "}
                Missourians with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{missouriStats.lowestPlanG}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <RefreshCw className="w-4 h-4 text-blue-300" />
              <span>
                <strong className="text-white">Anniversary Rule</strong> — switch carriers annually
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="missouri_hero"
              triggerId="missouri-hero-compare"
              coverageType="ms"
              title="Compare Missouri Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Missouri."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare Missouri Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "missouri_hero",
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
                <strong>{missouriCarriers.length}</strong> carriers analyzed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Anniversary Rule: switch carriers annually</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Independent, unbiased ratings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Missouri Anniversary Rule Spotlight */}
      <section className="py-8 bg-blue-50 border-b border-blue-200">
        <div className="container max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-blue-900">
                  Missouri Has the Anniversary Rule — Not the Birthday Rule
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">
                  Key Advantage
                </span>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed max-w-3xl">
                Missouri&apos;s Anniversary Rule gives you a{" "}
                <strong>60-day window (30 days before and 30 days after)</strong> your Medigap
                policy&apos;s annual enrollment anniversary date to switch to a different carrier
                — no health questions, no medical underwriting. Unlike California&apos;s birthday
                rule (which is tied to your birthday), Missouri&apos;s rule is tied to the{" "}
                <strong>date you first enrolled in your Medigap plan</strong>. You can switch
                to any carrier offering a plan with <strong>equal benefits</strong> (e.g., Plan G
                to Plan G at a lower premium). This makes Missouri one of the most
                consumer-friendly states for annual Medigap rate shopping.
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
                More than 350,000 Missourians have Medicare Supplement Insurance, or Medigap.
                Medigap plans help cover certain out-of-pocket expenses like copays, coinsurance,
                and deductibles left over after Medicare pays for covered services. With over
                1.3 million Medicare beneficiaries across the state, Missouri is a competitive
                Medigap market with more than 25 licensed carriers competing for your business.
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                Many companies offer Medigap plans in Missouri, but only a few earn top marks
                on our data-driven ratings. We compared companies based on prices, financial
                strength, complaint rates, plan availability, and customer service to find the
                best Medigap plans in Missouri for 2026.
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
            Compare the Best Medicare Supplement Plans in Missouri
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Missouri, ranked by the MedicareFAQ Score.
            Premiums shown are for a 65-year-old female nonsmoker in Kansas City, MO.
          </p>

          <div className="space-y-4">
            {missouriCarriers.map((carrier, i) => (
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
            Medicare Supplement Prices in Missouri
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from our top-scoring carriers. Rates shown are for a
            65-year-old female nonsmoker in {missouriPremiumTable.city}, MO. Actual rates
            vary by ZIP code, age, gender, and tobacco use.
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
                  {missouriPremiumTable.rows.map((row, i) => (
                    <tr key={row.carrier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 font-medium text-slate-900">{row.carrier}</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {row.planG}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">
                        {row.planN}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-500">
                        {row.planF}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">{missouriPremiumTable.note}</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="missouri_premium_table"
              triggerId="missouri-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your ZIP Code"
              subtitle="Premiums vary by location. Enter your Missouri ZIP code to see exact rates from all available carriers."
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
            Plan G vs. Plan N in Missouri
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new
            enrollees in Missouri. Here is how they compare for 2026.
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
                    <td className="px-5 py-3 text-slate-700">Part B deductible ($257)</td>
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
                      Avg. monthly premium (MO)
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-slate-900">
                      $108–$139
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-slate-900">
                      $79–$103
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                *Plan N covers Part B coinsurance but may charge up to $20 for some office
                visits and up to $50 for ER visits that do not result in inpatient admission.
                2026 deductibles: Part A $1,736 | Part B $257.
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
                <strong>Missouri&apos;s Anniversary Rule is your annual rate-shopping window.</strong>{" "}
                Mark your Medigap policy start date on your calendar. Each year, 30 days before
                and 30 days after that anniversary, you can switch to the same plan type at a
                lower-priced carrier — no health questions asked. Unlike California&apos;s birthday
                rule, the window is tied to when you <em>enrolled</em>, not when you were born.
                The catch: you can only switch to a plan with equal benefits (Plan G → Plan G).
                Use this window every year to make sure you&apos;re not overpaying.
              </>
            }
          />
        </div>
      </section>

      {/* Missouri-Specific Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Missouri Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {missouriStateRules.map((rule, i) => {
              const icons = [RefreshCw, Shield, Info, CheckCircle2, Users];
              const IconComponent = icons[i % icons.length];
              const borderColors = [
                "border-blue-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
              ];
              const iconColors = [
                "text-blue-600",
                "text-blue-600",
                "text-blue-600",
                "text-emerald-600",
                "text-blue-600",
              ];
              return (
                <div
                  key={rule.title}
                  className={`p-5 bg-white border ${borderColors[i]} rounded-xl flex items-start gap-3`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${iconColors[i]} shrink-0 mt-0.5`}
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
            The MedicareFAQ Score rates Medicare Supplement carriers on a scale of 1.0 to 5.0
            based on five key factors. Our ratings are independent and not influenced by
            advertising relationships.
          </p>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {missouriScoringMethodology.factors.map((factor, i) => (
              <div
                key={factor.name}
                className={`flex items-start gap-4 p-4 ${
                  i < missouriScoringMethodology.factors.length - 1
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
                Last updated: February 2026 | Data sources: NAIC complaint index, AM Best
                financial strength ratings, carrier rate filings with MDCI
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
            {missouriFAQs.map((faq, i) => (
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
              Medigap premiums vary significantly by ZIP code in Missouri. Enter yours to see
              exact rates from all available carriers, compare plans side by side, and find
              the best value — especially before your Anniversary Rule window opens.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="missouri_bottom_cta"
                triggerId="missouri-bottom-cta-compare"
                coverageType="ms"
                title="Compare Missouri Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare Missouri Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "missouri_bottom_cta",
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
