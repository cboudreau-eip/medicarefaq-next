"use client";
/**
 * South Dakota Medicare Supplement Comparison Page
 * Route: /medicare-supplements/south-dakota/
 * Key differentiators: No birthday rule, LifeShield National lowest Plan G at $145/mo,
 *                      MedMutual Protect lowest Plan N at $102/mo and Plan F at $165/mo,
 *                      Avera Health Plans dominant local carrier, Transamerica all 10 plan types,
 *                      SD SHIP free counseling at 1-833-663-9673
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
} from "@/lib/south-dakota-medigap-data";
import { trackPhoneClick } from "@/lib/analytics";

function getScoreColor(score: number) {
  if (score >= 4.5) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 4.0) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 3.5) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      )}
    </div>
  );
}

function CarrierCard({ carrier, index }: { carrier: Carrier; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              {carrier.rank}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">{carrier.name}</h3>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                {carrier.badge}
              </span>
            </div>
          </div>
          <div
            className={`shrink-0 px-3 py-1.5 rounded-lg border text-sm font-bold ${getScoreColor(carrier.score)}`}
          >
            {carrier.score.toFixed(1)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Plan G/mo</p>
            <p className="font-bold text-slate-900">{carrier.planGMonthly}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Plan N/mo</p>
            <p className="font-bold text-slate-900">{carrier.planNMonthly}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">AM Best</p>
            <p className="font-bold text-slate-900 text-xs">{carrier.amBest}</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{carrier.highlight}</p>
        <button
          className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide details" : "Show pros and cons"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">
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
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Cons</p>
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
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex gap-3">
        <ZipFormModal
          pageSection={`sd_carrier_${carrier.name.toLowerCase().replace(/\s+/g, "_")}`}
          triggerId={`sd-carrier-${index}-compare`}
          coverageType="ms"
          title={`Compare ${carrier.name} Rates in South Dakota`}
          subtitle={`Enter your ZIP code to see ${carrier.name} rates alongside other top Medigap carriers in your area of South Dakota.`}
          buttonLabel="Compare Plans"
          trigger={
            <button className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1">
              Compare Rates <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        />
      </div>
    </div>
  );
}

export default function SouthDakotaPageContent() {
  const iconColors = [
    "text-blue-500",
    "text-teal-500",
    "text-purple-500",
    "text-amber-500",
    "text-emerald-500",
    "text-rose-500",
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-12 pb-14">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/medicare-supplements/" className="text-slate-400 hover:text-white text-sm">
              Medicare Supplements
            </Link>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300 text-sm">South Dakota</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
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
            Best Medicare Supplement Plans in South Dakota 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            South Dakota has over {STATE_STATS.enrollees} Medigap enrollees. Plan G starts at{" "}
            {STATE_STATS.lowestPlanG} in Sioux Falls and averages {STATE_STATS.avgPlanG}{" "}
            statewide. We compared {STATE_STATS.carriers} carriers to find the best coverage in
            the Mount Rushmore State.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> South Dakotans
                with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> in Sioux Falls
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan N from <strong className="text-white">{STATE_STATS.lowestPlanN}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers licensed in
                South Dakota
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="sd_hero"
              triggerId="sd-hero-compare"
              coverageType="ms"
              title="Compare South Dakota Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of South Dakota."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare SD Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "sd_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* No Birthday Rule Alert */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-base mb-1">
                South Dakota Has No Birthday Rule: Your Initial Plan Choice Matters
              </p>
              <p className="text-sm text-amber-800">
                Unlike California, Oregon, and other states with birthday rules, South Dakota does{" "}
                <strong>not</strong> give you an annual window to switch Medigap carriers without
                underwriting. Once your 6-month Open Enrollment Period ends, you will face health
                questions if you try to change plans. Compare carriers carefully before you enroll
                and consider long-term rate stability, not just today&apos;s lowest premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container py-4">
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Independent, unbiased ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Based on CMS, NAIC, and AM Best data</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Updated May 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Rates based on Sioux Falls, SD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Carrier Rankings */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Companies in South Dakota
          </h2>
          <p className="text-slate-600 mb-8">
            Ranked by the MedicareFAQ Score, which weighs affordability (50%), financial strength
            (20%), customer satisfaction (15%), plan availability (10%), and pricing method (5%).
            Rates shown for a 65-year-old female nonsmoker in Sioux Falls, SD.
          </p>
          <div className="grid gap-5">
            {CARRIERS.map((carrier, i) => (
              <CarrierCard key={carrier.name} carrier={carrier} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Comparison Table */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container max-w-5xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            South Dakota Medigap Premium Comparison
          </h2>
          <p className="text-slate-600 mb-6">
            Monthly premiums for Plan G, Plan N, and Plan F for a 65-year-old female nonsmoker in
            Sioux Falls, SD. Rates vary by age, gender, tobacco use, and ZIP code.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left px-5 py-3 font-semibold">Carrier</th>
                  <th className="text-center px-5 py-3 font-semibold">Plan G/mo</th>
                  <th className="text-center px-5 py-3 font-semibold">Plan N/mo</th>
                  <th className="text-center px-5 py-3 font-semibold">Plan F/mo</th>
                </tr>
              </thead>
              <tbody>
                {PREMIUM_TABLE.map((row, i) => (
                  <tr
                    key={row.carrier}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} ${i === 0 ? "font-semibold" : ""}`}
                  >
                    <td className="px-5 py-3 text-slate-800">{row.carrier}</td>
                    <td className="px-5 py-3 text-center text-slate-800">{row.planG}</td>
                    <td className="px-5 py-3 text-center text-slate-800">{row.planN}</td>
                    <td className="px-5 py-3 text-center text-slate-800">{row.planF}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Rates as of May 2026 for a 65-year-old female nonsmoker in Sioux Falls, SD. Actual
            rates vary by age, gender, tobacco use, and ZIP code. N/A indicates the carrier does
            not offer that plan type in South Dakota.
          </p>
        </div>
      </section>

      {/* Plan G vs Plan N Comparison */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Plan G vs. Plan N in South Dakota
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medigap plans for new enrollees in South
            Dakota. LifeShield National offers the lowest Plan G and MedMutual Protect the lowest
            Plan N.
          </p>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="text-left px-5 py-3 font-semibold text-slate-700">Coverage</th>
                  <th className="text-center px-5 py-3 font-semibold">Plan G</th>
                  <th className="text-center px-5 py-3 font-semibold">Plan N</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Part A hospital coinsurance", g: true, n: true },
                  { feature: "Part B coinsurance (20%)", g: true, n: true, nNote: "*" },
                  { feature: "Part A deductible ($1,736)", g: true, n: true },
                  { feature: "Part B deductible ($257)", g: false, n: false },
                  { feature: "Part B excess charges", g: true, n: false },
                  { feature: "Skilled nursing coinsurance", g: true, n: true },
                  { feature: "Foreign travel emergency", g: true, n: true },
                  { feature: "Office visit copay", g: "$0", n: "Up to $20" },
                  { feature: "ER copay (no admission)", g: "$0", n: "Up to $50" },
                  {
                    feature: "Avg. monthly premium (Sioux Falls)",
                    g: "$145-$163",
                    n: "$102-$121",
                    bold: true,
                  },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-5 py-3 text-slate-700">{row.feature}</td>
                    <td className="px-5 py-3 text-center">
                      {typeof row.g === "boolean" ? (
                        row.g ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" /> Covered
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" /> Not covered
                          </span>
                        )
                      ) : (
                        <span
                          className={`font-${(row as { bold?: boolean }).bold ? "bold" : "semibold"} text-slate-900`}
                        >
                          {row.g}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {typeof row.n === "boolean" ? (
                        row.n ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" /> Covered
                            {(row as { nNote?: string }).nNote ?? ""}
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" /> Not covered
                          </span>
                        )
                      ) : (
                        <span
                          className={`font-${(row as { bold?: boolean }).bold ? "bold" : "semibold"} ${
                            typeof row.n === "string" && row.n.startsWith("Up to")
                              ? "text-amber-600"
                              : "text-slate-900"
                          }`}
                        >
                          {row.n}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                *Plan N covers Part B coinsurance but may charge up to $20 for some office visits
                and up to $50 for ER visits that do not result in inpatient admission. South
                Dakota allows excess charges, so Plan N enrollees should confirm their doctors
                accept Medicare assignment.
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
                  South Dakota has no birthday rule, so your initial enrollment decision is the
                  most important one you will make.
                </strong>{" "}
                LifeShield National at $145/mo is the lowest Plan G in the state and a solid
                budget choice. If you want the lowest Plan N, MedMutual Protect at $102/mo is
                the clear winner. For the best combination of local roots and competitive pricing,
                Avera Health Plans at $151/mo is integrated with the dominant hospital network in
                eastern South Dakota. If you want all 10 plan types or issue-age pricing that
                locks in your rate at enrollment, Transamerica is the right long-term pick. Call
                the SD SHIP at 1-833-663-9673 for free, unbiased counseling before you enroll.
              </>
            }
          />
        </div>
      </section>

      {/* SHIP Callout */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-base mb-1">
                Free Medicare Counseling: South Dakota SHIP
              </p>
              <p className="text-sm text-blue-800 mb-3">
                South Dakota&apos;s State Health Insurance Assistance Program and Aging and
                Disability Resource Center offer free, unbiased Medicare counseling. Trained
                resource specialists can help you compare Medigap plans, understand enrollment
                rules, and connect you with local services. There is no sales pressure and no cost
                to you.
              </p>
              <a
                href="tel:18336639673"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <Phone className="w-4 h-4" /> Call SD SHIP: 1-833-663-9673
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* State Rules */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            South Dakota Medigap Rules and Regulations
          </h2>
          <div className="grid gap-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [AlertTriangle, Clock, BarChart3, Users, Shield, Phone];
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={rule.title}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
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
                CMS Medicare Plan Finder, South Dakota Division of Insurance, FairSquare Medicare
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
              Find the Best Medigap Rate in Your South Dakota ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              South Dakota has no birthday rule, so your Open Enrollment Period is your best
              chance to lock in coverage without health questions. Plan G starts at $145/mo through
              LifeShield National in Sioux Falls. Compare all available carriers in your area
              before enrolling.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="sd_bottom_cta"
                triggerId="sd-bottom-cta-compare"
                coverageType="ms"
                title="Compare South Dakota Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of South Dakota."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare SD Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "sd_bottom_cta",
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
