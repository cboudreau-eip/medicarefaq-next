"use client";

/**
 * Alaska Medicare Supplement Comparison Page
 * Route: /medicare-supplements/alaska/
 * Key differentiators: No Medicare Advantage available (unique to Alaska),
 *                      No birthday rule, Plan G from $137/mo (State Farm),
 *                      Premera BCBS of Alaska dominant local carrier at $197/mo,
 *                      Moda Health HDG from $51/mo, USAA A++ military only,
 *                      No ZIP-code rating for most carriers,
 *                      ADRC free counseling at 1-800-478-6065
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
  Snowflake,
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
} from "@/lib/alaska-medigap-data";
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
              pageSection="alaska_carrier_card"
              triggerId={`alaska-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Alaska`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Alaska.`}
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
                  page_section: "alaska_carrier_card",
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

export default function AlaskaPageContent() {
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
            <span className="text-teal-400">Alaska</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">AK</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-200">
              No Medicare Advantage Available
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-100 text-slate-800 border-slate-200">
              No Birthday Rule
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Alaska 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Alaska is one of the only states with no Medicare Advantage plans, making Medigap the
            essential coverage path for all Alaska seniors. Plan G starts at {STATE_STATS.lowestPlanG}{" "}
            in Anchorage and averages {STATE_STATS.avgPlanG} statewide. We compared{" "}
            {STATE_STATS.carriers} carriers to find the best coverage in the Last Frontier.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> Alaskans with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> in Anchorage
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                HDG Plan G from <strong className="text-white">$51/mo</strong> (Moda Health)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers licensed in Alaska
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="alaska_hero"
              triggerId="alaska-hero-compare"
              coverageType="ms"
              title="Compare Alaska Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Alaska."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare AK Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "alaska_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* No Medicare Advantage Spotlight */}
      <section className="bg-blue-50 border-b border-blue-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Snowflake className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-base mb-1">
                Alaska Has No Medicare Advantage Plans: Medigap Is Your Primary Option
              </p>
              <p className="text-sm text-blue-800">
                Alaska is one of the only states in the country where Medicare Advantage (Part C)
                plans are not available. This means Original Medicare plus a Medigap supplement is
                the standard coverage path for all Alaska seniors. If you are moving to Alaska from
                another state, you cannot keep a Medicare Advantage plan. Choosing the right Medigap
                plan is especially important here.
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
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>No Medicare Advantage available in Alaska</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>State Farm and USAA both A++ rated in Alaska</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Alaska is unique among all 50 states: Medicare Advantage plans are not available here.
            That means Original Medicare plus a Medigap supplement is the primary way for Alaska
            seniors to manage their healthcare costs. With over {STATE_STATS.enrollees} Alaskans
            enrolled in Medigap, the market is smaller than most states, but the coverage options
            are solid.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Plan G is the most popular choice for new enrollees, covering nearly all Medicare
            out-of-pocket costs except the annual Part B deductible ($283 in 2026). State Farm
            offers the lowest Plan G in Alaska at $137/mo in Anchorage, with an A++ AM Best rating.
            Premera Blue Cross Blue Shield of Alaska is the dominant local carrier at $197/mo, with
            strong provider relationships and a $5/mo discount for automatic payment enrollment.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Alaska does not have a birthday rule, so your 6-month Open Enrollment Period when you
            first turn 65 and enroll in Part B is your most important enrollment opportunity. After
            that window closes, carriers can use medical underwriting to deny your application or
            charge higher premiums. Compare carefully before you enroll.
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
            Compare the Best Medicare Supplement Plans in Alaska
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Alaska, ranked by the MedicareFAQ Score. Premiums
            shown are for a 65-year-old female nonsmoker in Anchorage. Rates in Fairbanks, Juneau,
            and rural Alaska may vary.
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
            Medicare Supplement Prices in Alaska
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from top carriers in Anchorage for a 65-year-old female
            nonsmoker. Most Alaska carriers use statewide flat rates rather than ZIP-code-based
            pricing. Rates effective April 2026.
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
                *USAA is only available to military members, veterans, and eligible family members.
                Premera BCBS of Alaska rates are set statewide by the Alaska Division of Insurance.
                Premera offers a $5/mo discount for AFT enrollment.
                Source: Alaska DOI, Premera, Moda Health, MoneyGeek, May 2026.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="alaska_premium_table"
              triggerId="alaska-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Alaska ZIP Code"
              subtitle="Enter your ZIP code to see exact rates from all available carriers in your area of Alaska."
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
            Plan G vs. Plan N in Alaska
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new enrollees
            in Alaska. Here is how they compare.
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
                    { feature: "Part A hospital coinsurance", g: true, n: true },
                    { feature: "Part B coinsurance (20%)", g: true, n: true, nNote: "*" },
                    { feature: "Part A deductible ($1,736)", g: true, n: true },
                    { feature: "Part B deductible ($283)", g: false, n: false },
                    { feature: "Part B excess charges", g: true, n: false },
                    { feature: "Skilled nursing coinsurance", g: true, n: true },
                    { feature: "Foreign travel emergency", g: true, n: true },
                    { feature: "Office visit copay", g: "$0", n: "Up to $20" },
                    { feature: "ER copay (no admission)", g: "$0", n: "Up to $50" },
                    { feature: "Avg. monthly premium (Anchorage)", g: "$137-$197", n: "$106-$216", bold: true },
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
                          <span className={`font-${row.bold ? "bold" : "semibold"} text-slate-900`}>
                            {row.g}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {typeof row.n === "boolean" ? (
                          row.n ? (
                            <span className="text-emerald-600 font-semibold">
                              <CheckCircle2 className="w-4 h-4 inline" /> Covered{row.nNote ?? ""}
                            </span>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              <XCircle className="w-4 h-4 inline" /> Not covered
                            </span>
                          )
                        ) : (
                          <span
                            className={`font-${row.bold ? "bold" : "semibold"} ${
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
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                *Plan N covers Part B coinsurance but may charge up to $20 for some office visits
                and up to $50 for ER visits that do not result in inpatient admission. Alaska allows
                excess charges, so Plan N enrollees should confirm their doctors accept Medicare
                assignment, especially in rural areas.
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
                  Alaska is the only state in the country with no Medicare Advantage plans, which
                  makes your Medigap decision more important than anywhere else.
                </strong>{" "}
                For most Alaska seniors, State Farm at $137/mo is the best value: lowest Plan G in
                the state, A++ rated, and a strong local agent network. If you qualify for USAA
                (military or veteran), their $144/mo Plan G with A++ rating is the runner-up. If
                you want a local carrier with Alaska-specific provider relationships, Premera BCBS
                of Alaska at $197/mo is worth the premium difference, especially if you enroll in
                AFT to save $5/mo. For healthy seniors who rarely use medical services, Moda
                Health&apos;s High-Deductible Plan G at $51/mo is the most aggressive way to
                minimize monthly costs.
              </>
            }
          />
        </div>
      </section>

      {/* Alaska Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Alaska Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Snowflake, AlertTriangle, Clock, Info, Shield, Users];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-blue-200",
                "border-amber-200",
                "border-slate-200",
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
                CMS Medicare Plan Finder, Alaska Division of Insurance, Premera, Moda Health
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
              Find the Best Medigap Rate in Your Alaska ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              With no Medicare Advantage available in Alaska, Medigap is your most important
              coverage decision. Plan G starts at $137/mo in Anchorage. Compare all available
              carriers in your area before enrolling.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="alaska_bottom_cta"
                triggerId="alaska-bottom-cta-compare"
                coverageType="ms"
                title="Compare Alaska Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of Alaska."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare AK Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "alaska_bottom_cta",
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
