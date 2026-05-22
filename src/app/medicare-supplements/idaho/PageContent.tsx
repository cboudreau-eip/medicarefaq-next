"use client";

/**
 * Idaho Medicare Supplement Comparison Page
 * Route: /medicare-supplements/idaho/
 * Key differentiators: Birthday rule (effective 2022, 63-day window),
 *                      Plan G from $201/mo (Globe Life),
 *                      State Farm A++ lowest Plan N at $141/mo,
 *                      Blue Cross of Idaho local carrier,
 *                      rural coverage advantage, SHIBA at 1-800-247-4422
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
  Gift,
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
} from "@/lib/idaho-medigap-data";
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
              pageSection="idaho_carrier_card"
              triggerId={`idaho-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Idaho`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Idaho.`}
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
                  page_section: "idaho_carrier_card",
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

export default function IdahoPageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
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
            <span className="text-teal-400">Idaho</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">ID</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-200">
              Birthday Rule: 63-Day Annual Window
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Idaho 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Idaho has had a birthday rule since 2022, giving current policyholders a 63-day
            window each year to switch plans without medical underwriting. Plan G starts at{" "}
            {STATE_STATS.lowestPlanG} (Globe Life). State Farm offers the lowest Plan N at
            $141/mo with an A++ rating. Over {STATE_STATS.carriers} carriers serve Idaho.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> Idaho seniors with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> (Globe Life)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                State Farm Plan N: <strong className="text-white">$141/mo</strong> (A++)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white">Birthday rule:</strong> 63-day annual switch window
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="idaho_hero"
              triggerId="idaho-hero-compare"
              coverageType="ms"
              title="Compare Idaho Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Idaho."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare ID Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "idaho_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Birthday Rule Spotlight */}
      <section className="bg-emerald-50 border-b border-emerald-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="font-bold text-emerald-900 text-base mb-1">
                Idaho Birthday Rule (Since 2022): Switch Plans Without Medical Underwriting
              </p>
              <p className="text-sm text-emerald-800">
                Idaho has had a birthday rule since 2022. Current Medigap policyholders have a
                63-day window starting on their birthday each year to switch to an equal or lesser
                plan with any carrier without answering health questions. No denial based on
                pre-existing conditions. Idaho seniors should shop their Medigap premiums every
                year during this window to find lower rates.
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
              <span><strong>{CARRIERS.length}</strong> top carriers analyzed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-driven MedicareFAQ Scores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-emerald-600" />
              <span>Birthday rule: 63-day annual switch window</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>State Farm A++ lowest Plan N at $141/mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 105,000 Idaho residents have Medicare Supplement Insurance, also called
            Medigap. Idaho follows standard federal Medigap rules, offering plans A through N,
            with one important state-specific protection: the birthday rule, which has been in
            effect since 2022.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Plan G is the most popular choice for new enrollees, covering nearly all Medicare
            out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan G
            premiums in Boise range from $201/mo (Globe Life) to $262/mo (Transamerica) for a
            65-year-old. The state average is $242/mo, so shopping carefully can save $40/mo
            or more.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Medigap is especially valuable for rural Idaho residents because it works with any
            Medicare-accepting provider nationwide. If you live in a rural area and need to
            travel to Boise or another city for specialty care, Medigap covers your costs
            without network restrictions. State Farm stands out with an A++ AM Best rating,
            the lowest Plan N in Idaho at $141/mo, and a large local agent network across Boise,
            Coeur d&apos;Alene, and rural communities.
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
            Compare the Best Medicare Supplement Plans in Idaho
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Idaho, ranked by the MedicareFAQ Score. Rates
            shown are for a 65-year-old in the Boise area and are updated for 2026.
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
            Idaho Medigap Premium Comparison
          </h2>
          <p className="text-slate-600 mb-6">
            Monthly premiums for a 65-year-old in Boise, Idaho. Rates are for standard Plan G,
            Plan N, and Plan F. Premiums vary by ZIP code, age, gender, and tobacco use.
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
                Rates are for a 65-year-old in Boise, Idaho. N/A indicates the plan is not
                offered by that carrier in Idaho. Plan F is only available to Medicare
                beneficiaries who became eligible before January 1, 2020. Source: carrier rate
                filings, updated 2026.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="idaho_premium_table"
              triggerId="idaho-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Idaho ZIP Code"
              subtitle="Enter your ZIP code to see exact rates from all available carriers in your area of Idaho."
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

      {/* Plan G vs Plan N */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Plan G vs. Plan N in Idaho
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medigap plans for new enrollees in
            Idaho. Here is how they compare.
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
                    { feature: "Monthly premium (lowest ID rate)", g: "$201/mo (Globe Life)", n: "$141/mo (State Farm)" },
                    { feature: "Part A hospital coinsurance", g: "Covered", n: "Covered" },
                    { feature: "Part B coinsurance (20%)", g: "Covered", n: "Covered (with copays)" },
                    { feature: "Part B deductible ($283)", g: "Not covered", n: "Not covered" },
                    { feature: "Part B excess charges", g: "Covered", n: "Not covered" },
                    { feature: "Office visit copay", g: "None", n: "Up to $20" },
                    { feature: "ER visit copay (no admission)", g: "None", n: "Up to $50" },
                    { feature: "Best for", g: "Frequent care, predictable costs", n: "Healthy seniors, low monthly costs" },
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
                  Idaho has had a birthday rule since 2022, which means you have an annual
                  opportunity to shop your Medigap premium without medical underwriting.
                </strong>{" "}
                Use this 63-day window every year starting on your birthday. For Plan G, Globe
                Life at $201/mo is the cheapest, but State Farm at $207/mo gives you A++
                financial strength for only $6/mo more. For Plan N, State Farm at $141/mo is
                the clear winner. If you live in a rural area, Medigap is especially valuable
                because it works with any Medicare-accepting provider nationwide, unlike Medicare
                Advantage plans with network restrictions. Blue Cross of Idaho is the top local
                option if you prefer a carrier with deep Idaho roots.
              </>
            }
          />
        </div>
      </section>

      {/* Idaho Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Idaho Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Gift, Clock, Info, Shield, Users, MapPin];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-emerald-200",
                "border-blue-200",
                "border-amber-200",
                "border-blue-200",
                "border-slate-200",
                "border-teal-200",
              ];
              const iconColors = [
                "text-emerald-600",
                "text-blue-600",
                "text-amber-600",
                "text-blue-600",
                "text-blue-600",
                "text-teal-600",
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
              Compare Idaho Medigap Rates and Use Your Birthday Rule
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Idaho has had a birthday rule since 2022. Plan G starts at $201/mo (Globe Life).
              State Farm offers A++ financial strength at $207/mo for Plan G and $141/mo for
              Plan N. Use your 63-day birthday window every year to shop for lower premiums.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="idaho_bottom_cta"
                triggerId="idaho-bottom-cta-compare"
                coverageType="ms"
                title="Compare Idaho Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of Idaho."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare ID Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "idaho_bottom_cta",
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
