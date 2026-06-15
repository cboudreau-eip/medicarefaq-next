"use client";
/**
 * Oregon Medicare Supplement Comparison Page
 * Route: /medicare-supplement-plans/oregon/
 * Key differentiators: Birthday rule (one of the original states, since 2009), 30-day window,
 *                      equal or lesser plan allowed, Plan G from $151/mo (USAA, military only)
 *                      or $170/mo (Mutual of Omaha) for civilians,
 *                      Regence BCBS of Oregon dominant local carrier,
 *                      SHIBA free counseling at (800) 722-4134
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
  Gift,
  CalendarDays,
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
} from "@/lib/oregon-medigap-data";
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
          {/* Right: CTA */}
          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="oregon_carrier_card"
              triggerId={`oregon-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in Oregon`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of Oregon.`}
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
                  page_section: "oregon_carrier_card",
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wider">Pros</p>
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
              <p className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wider">Cons</p>
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
export default function OregonPageContent() {
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
            <Link href="/medicare-supplement-plans" className="hover:text-white transition-colors">
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Oregon</span>
          </div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">OR</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated May 2026
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-200">
              Birthday Rule State
            </span>
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Best Medicare Supplement Plans in Oregon 2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Oregon has over {STATE_STATS.enrollees} Medigap enrollees. Plan G starts at{" "}
            {STATE_STATS.lowestPlanG} in Portland and averages {STATE_STATS.avgPlanG} statewide.
            Oregon was one of the first states to enact a{" "}
            <strong className="text-white">birthday rule in 2009</strong>, giving enrollees an
            annual window to switch carriers or downgrade to a lesser plan without underwriting.
            We compared {STATE_STATS.carriers} carriers to find the best coverage in the Beaver State.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span>
                <strong className="text-white">{STATE_STATS.enrollees}</strong> Oregonians with Medigap
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-teal-400" />
              <span>
                Plan G from{" "}
                <strong className="text-white">{STATE_STATS.lowestPlanG}</strong> in Portland
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <TrendingDown className="w-4 h-4 text-teal-400" />
              <span>
                Plan N from <strong className="text-white">$107/mo</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white">{STATE_STATS.carriers}</strong> carriers licensed in Oregon
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="oregon_hero"
              triggerId="oregon-hero-compare"
              coverageType="ms"
              title="Compare Oregon Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of Oregon."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare OR Rates <ArrowRight className="w-4 h-4" />
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
                  page_section: "oregon_hero",
                })
              }
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>
      {/* Oregon Birthday Rule Spotlight Banner */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="container py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-amber-900 text-base mb-1">
                Oregon Birthday Rule: Switch or Downgrade Medigap Every Year Without Underwriting
              </p>
              <p className="text-sm text-amber-800">
                Oregon has had a Medigap birthday rule since <strong>2009</strong>, making it one
                of the original birthday rule states. Each year, you get a{" "}
                <strong>30-day window starting on your birthday</strong> to switch to any carrier
                offering the same or a lesser plan letter without answering health questions.
                Unlike Virginia, Oregon allows you to <strong>downgrade to a lesser plan</strong>{" "}
                (for example, from Plan G to Plan N) during your birthday window. This gives
                Oregon seniors more flexibility than most other birthday rule states.
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
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span>Birthday rule: annual switching window since 2009</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Regence BCBS of Oregon dominant local carrier</span>
            </div>
          </div>
        </div>
      </section>
      {/* Intro */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            More than 200,000 Oregonians have Medicare Supplement Insurance, also called Medigap.
            Oregon follows standard federal Medigap rules, offering plans A through N with one
            major state-specific advantage: the birthday rule. Plan G is the most popular choice
            for new enrollees, covering nearly all Medicare out-of-pocket costs except the annual
            Part B deductible ($257 in 2026).
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            USAA offers the lowest Plan G in Oregon at $151/mo (military members and families only).
            For civilians, Mutual of Omaha offers Plan G at $170/mo with an A+ AM Best rating.
            Regence Blue Cross Blue Shield of Oregon is the dominant local carrier with the largest
            provider network in the state. Transamerica is the only carrier offering all 10
            standardized plan types with issue-age pricing.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            Oregon&apos;s birthday rule means you can shop for a better rate every year. Use your
            30-day window each birthday to compare carriers and switch if you find a lower premium
            on the same or a lesser plan letter.
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
            Compare the Best Medicare Supplement Plans in Oregon
          </h2>
          <p className="text-slate-600 mb-8">
            Our top-rated Medigap carriers in Oregon, ranked by the MedicareFAQ Score. Premiums
            shown are for a 65-year-old female nonsmoker in Portland. Rates in Eugene, Salem, and
            rural Oregon may vary slightly.
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
            Medicare Supplement Prices in Oregon
          </h2>
          <p className="text-slate-600 mb-6">
            Sample monthly premiums from top carriers in Portland for a 65-year-old female
            nonsmoker. Rates may include available household discounts. Oregon uses attained-age
            rating for most carriers, so premiums will increase as you age.
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
                Lowest Plan G for the general public: $170/mo (Mutual of Omaha).
                Source: Oregon Insurance Division, FairSquare Medicare, MoneyGeek, May 2026.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="oregon_premium_table"
              triggerId="oregon-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your Oregon ZIP Code"
              subtitle="Premiums vary by city in Oregon. Enter your ZIP code to see exact rates from all available carriers in your area."
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
            Plan G vs. Plan N in Oregon
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N are the two most popular Medicare Supplement plans for new enrollees
            in Oregon. Oregon&apos;s birthday rule lets you switch between them each year without
            underwriting, as long as you are switching to an equal or lesser plan.
          </p>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Benefit</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Part A hospital coinsurance", g: true, n: true },
                    { feature: "Part B coinsurance (20%)", g: true, n: true, nNote: "*" },
                    { feature: "Part A deductible ($1,676)", g: true, n: true },
                    { feature: "Part B deductible ($257)", g: false, n: false },
                    { feature: "Part B excess charges", g: true, n: false },
                    { feature: "Skilled nursing coinsurance", g: true, n: true },
                    { feature: "Foreign travel emergency", g: true, n: true },
                    { feature: "Office visit copay", g: "$0", n: "Up to $20" },
                    { feature: "ER copay (no admission)", g: "$0", n: "Up to $50" },
                    { feature: "Birthday rule: can switch to", g: "Plan G or lesser", n: "Plan N or lesser", bold: true },
                    { feature: "Avg. monthly premium (Portland)", g: "$170-$198", n: "$107-$145", bold: true },
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
                and up to $50 for ER visits that do not result in inpatient admission. Oregon
                allows excess charges, so Plan N enrollees should confirm their doctors accept
                Medicare assignment. Oregon&apos;s birthday rule lets you switch from Plan G to
                Plan N (a lesser plan) during your 30-day birthday window each year.
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
                  Oregon&apos;s birthday rule is one of the most flexible in the country because
                  it lets you downgrade to a lesser plan.
                </strong>{" "}
                Start with Plan G for comprehensive coverage, then use your birthday window each
                year to shop for a lower rate on Plan G. If your health stays good and you want
                to lower your premium, you can even downgrade to Plan N during your birthday
                window without underwriting. Mutual of Omaha at $170/mo is the best overall value
                for civilians: A+ rated, low complaint ratio, and a 7% household discount. If you
                or your spouse served in the military, USAA at $151/mo with an A++ rating is the
                clear winner. Use Oregon&apos;s birthday rule every year to make sure you are
                getting the best rate available.
              </>
            }
          />
        </div>
      </section>
      {/* Oregon Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Oregon Medigap Rules You Should Know
          </h2>
          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Gift, CalendarDays, Info, Clock, Shield, Users];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-amber-200",
                "border-amber-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
              ];
              const iconColors = [
                "text-amber-600",
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
                CMS Medicare Plan Finder, Oregon Insurance Division, FairSquare Medicare
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
              Find the Best Medigap Rate in Your Oregon ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Oregon&apos;s birthday rule means you can shop for a better rate every year. Plan G
              starts at $151/mo for military members and $170/mo for civilians in Portland. Compare
              all available carriers in your area before enrolling or at your next birthday window.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="oregon_bottom_cta"
                triggerId="oregon-bottom-cta-compare"
                coverageType="ms"
                title="Compare Oregon Medigap Rates"
                subtitle="Enter your ZIP code to get personalized Medigap rates from all available carriers in your area of Oregon."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare OR Rates <ArrowRight className="w-4 h-4" />
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
                    page_section: "oregon_bottom_cta",
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
