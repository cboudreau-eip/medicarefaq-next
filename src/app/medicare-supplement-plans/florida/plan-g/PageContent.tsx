"use client";
/**
 * Florida Plan G Rate Comparison Page
 * Route: /medicare-supplement-plans/florida/plan-g/
 * Template for state-specific Plan G pages — data-driven, reusable pattern.
 */
import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
  ArrowRight,
  CheckCircle2,
  XCircle,
  DollarSign,
  Users,
  TrendingDown,
  Award,
  Info,
  MapPin,
  Calendar,
  HelpCircle,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { FLORIDA_CARRIERS, FLORIDA_STATS, type FloridaCarrier } from "@/lib/florida-medigap-data";
import { trackPhoneClick } from "@/lib/analytics";

/* ─── Constants ─── */
const STATE_NAME = "Florida";
const STATE_ABBR = "FL";
const PART_B_DEDUCTIBLE = "$257";
const PART_A_DEDUCTIBLE = "$1,676";
const PLAN_SLUG = "plan-g";

/* ─── Carrier sorted by Plan G premium ─── */
const carriersByPlanG = [...FLORIDA_CARRIERS].sort((a, b) => {
  const aPrice = parseInt(a.planGMonthly.replace(/[$,]/g, ""));
  const bPrice = parseInt(b.planGMonthly.replace(/[$,]/g, ""));
  return aPrice - bPrice;
});

/* ─── Benefits Data ─── */
const PLAN_G_BENEFITS = [
  { benefit: "Part A hospital coinsurance and costs (up to 365 days after Medicare benefits are used)", covered: true },
  { benefit: "Part B coinsurance or copayment", covered: true },
  { benefit: "Part A hospice care coinsurance or copayment", covered: true },
  { benefit: `Part A deductible (${PART_A_DEDUCTIBLE} in 2026)`, covered: true },
  { benefit: `Part B deductible (${PART_B_DEDUCTIBLE} in 2026)`, covered: false },
  { benefit: "Part B excess charges", covered: true },
  { benefit: "Blood (first 3 pints)", covered: true },
  { benefit: "Skilled nursing facility coinsurance", covered: true },
  { benefit: "Foreign travel emergency (80%, up to plan limits)", covered: true },
];

/* ─── Plan G vs Plan N Comparison ─── */
const PLAN_COMPARISON = [
  { feature: "Part B deductible", planG: "Not covered", planN: "Not covered" },
  { feature: "Part B coinsurance", planG: "100% covered", planN: "100% covered (with copays)" },
  { feature: "Office visit copay", planG: "None", planN: "Up to $20" },
  { feature: "ER copay (not admitted)", planG: "None", planN: "Up to $50" },
  { feature: "Part B excess charges", planG: "100% covered", planN: "Not covered" },
  { feature: "Avg. monthly premium (FL)", planG: FLORIDA_STATS.averagePlanGPremium, planN: FLORIDA_STATS.averagePlanNPremium },
  { feature: "Best for", planG: "Predictable costs, no surprises", planN: "Lower premiums, fewer doctor visits" },
];

/* ─── FAQ Data ─── */
const FAQS = [
  {
    q: "What is the cheapest Plan G in Florida?",
    a: `State Farm currently offers the lowest Plan G premium in ${STATE_NAME} at approximately $210 per month for a 65-year-old. However, rates vary by age, gender, zip code, and tobacco use. Comparing quotes from multiple carriers is the best way to find the lowest rate in your area.`,
  },
  {
    q: "Is Plan G worth it in Florida?",
    a: `Plan G is widely considered the best value Medigap plan for anyone who became eligible for Medicare after January 1, 2020. After paying the ${PART_B_DEDUCTIBLE} annual Part B deductible, Plan G covers 100% of Medicare-approved costs. For most ${STATE_NAME} residents, the comprehensive coverage and predictable costs make Plan G worth the premium.`,
  },
  {
    q: "Can I switch from Plan N to Plan G in Florida?",
    a: `Yes, but you will likely need to pass medical underwriting unless you have a guaranteed issue right. ${STATE_NAME} does not have a birthday rule, so switching outside of your initial open enrollment period requires answering health questions. Some carriers are more lenient than others with underwriting.`,
  },
  {
    q: "Do all Plan G policies cover the same things?",
    a: "Yes. All Medigap plans are federally standardized, meaning a Plan G from State Farm covers exactly the same benefits as a Plan G from Mutual of Omaha or any other carrier. The only difference between carriers is the monthly premium, customer service, and available discounts.",
  },
  {
    q: "What is the Part B deductible for 2026?",
    a: `The Medicare Part B deductible for 2026 is ${PART_B_DEDUCTIBLE}. This is the only cost you pay out of pocket with Plan G. Once you meet this deductible each calendar year, Plan G and Medicare together cover 100% of Medicare-approved costs.`,
  },
  {
    q: "Does Plan G cover prescription drugs?",
    a: "No. Plan G, like all Medigap plans, does not cover prescription drugs. You need a separate Medicare Part D prescription drug plan for medication coverage. You cannot have both a Medigap plan and a Medicare Advantage plan at the same time.",
  },
  {
    q: "Can I use Plan G with any doctor in Florida?",
    a: `Yes. Plan G works with any doctor or hospital in the United States that accepts Medicare. There are no networks, no referrals, and no prior authorizations. You can see any Medicare-participating provider in any state, not just ${STATE_NAME}.`,
  },
  {
    q: "When is the best time to buy Plan G in Florida?",
    a: `The best time is during your 6-month Medigap open enrollment period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, carriers cannot deny you coverage or charge higher premiums based on health conditions. After this period, you may face medical underwriting.`,
  },
  {
    q: "What happens if I miss my Medigap open enrollment in Florida?",
    a: `If you miss your 6-month open enrollment window, you can still apply for Plan G, but carriers can use medical underwriting to decide whether to accept you and what premium to charge. ${STATE_NAME} does not have a birthday rule that provides an annual switching window, so your initial enrollment period is your best opportunity for guaranteed acceptance.`,
  },
  {
    q: "Is there a birthday rule in Florida?",
    a: `No. ${STATE_NAME} does not have a Medigap birthday rule. Unlike states such as California, Oregon, and Louisiana, ${STATE_NAME} does not provide an annual window to switch Medigap plans without medical underwriting. Your best opportunity for guaranteed acceptance is during your initial 6-month open enrollment period.`,
  },
];

export default function FloridaPlanGContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* ─── SECTION 1: Hero ─── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-blue-400">&gt;</span>
            <Link href="/medicare-supplement-plans" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <span className="text-blue-400">&gt;</span>
            <Link href="/medicare-supplement-plans/florida" className="hover:text-white transition-colors">{STATE_NAME}</Link>
            <span className="text-blue-400">&gt;</span>
            <span className="text-teal-400">Plan G</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-teal-400" aria-hidden="true" />
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular Plan
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Best Medicare Supplement{" "}
            <span className="text-teal-400">Plan G</span> Rates in{" "}
            <span className="text-teal-400">{STATE_NAME}</span>{" "}
            <span className="text-blue-300">(2026)</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl">
            Plan G covers everything except the {PART_B_DEDUCTIBLE} Part B deductible.
            Compare rates from {FLORIDA_STATS.numberOfCarriers} carriers in {STATE_NAME} to find the lowest premium.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm text-blue-200">Lowest Rate</p>
              <p className="text-2xl md:text-3xl font-bold text-teal-400">{FLORIDA_STATS.lowestPlanGPremium}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm text-blue-200">Average Rate</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{FLORIDA_STATS.averagePlanGPremium}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm text-blue-200">Carriers</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{FLORIDA_STATS.numberOfCarriers}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <ZipFormModal
              coverageType="ms"
              pageSection="florida_plan_g_hero"
              triggerId="fl-plan-g-hero-compare"
              buttonLabel={`Compare ${STATE_NAME} Plan G Rates`}
              title={`Compare Plan G Rates in ${STATE_NAME}`}
              subtitle="Enter your ZIP code to see personalized Plan G rates from top carriers in your area."
              trigger={
                <span className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors cursor-pointer shadow-lg shadow-teal-500/25">
                  Compare {STATE_NAME} Plan G Rates <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
              }
            />
            <a
              href="tel:+18884410465"
              onClick={() => trackPhoneClick({ phone_number: "(888) 441-0465", page_section: "florida_plan_g_hero" })}
              className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-4 rounded-xl text-lg transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: What Plan G Covers ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What Does Plan G Cover?</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Plan G is federally standardized, meaning every carrier offers identical coverage. The only out-of-pocket cost is the annual Part B deductible.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-[1fr_auto] divide-y divide-slate-100">
              <div className="col-span-2 grid grid-cols-[1fr_auto] bg-slate-800 text-white px-6 py-3 font-semibold text-sm">
                <span>Benefit</span>
                <span>Plan G</span>
              </div>
              {PLAN_G_BENEFITS.map((item, i) => (
                <div key={i} className="col-span-2 grid grid-cols-[1fr_auto] px-6 py-3.5 items-center hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-700">{item.benefit}</span>
                  <span className="flex items-center justify-center">
                    {item.covered ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" aria-label="Covered" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" aria-label="Not covered" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout */}
          <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-5 flex gap-3">
            <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-teal-900">
              <strong>Bottom line:</strong> After paying the {PART_B_DEDUCTIBLE} Part B deductible once per year, Plan G and Medicare together cover 100% of Medicare-approved costs for the rest of the year. No copays, no coinsurance, no surprise bills.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Rate Comparison Table ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Plan G Rate Comparison - {STATE_NAME} Carriers</h2>
          <p className="text-slate-600 mb-8">
            Rates shown are typical monthly premiums for a 65-year-old female non-smoker. Your rate may vary by age, gender, zip code, and tobacco use.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">#</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Carrier</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Plan G Monthly</th>
                  <th className="text-left px-5 py-3.5 font-semibold">AM Best</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Discounts</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {carriersByPlanG.map((carrier, i) => (
                  <tr key={carrier.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-slate-400 font-medium">{i + 1}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{carrier.displayName}</div>
                      {i === 0 && (
                        <span className="inline-block mt-1 text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-medium">
                          Lowest Rate
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-bold text-lg ${i === 0 ? "text-teal-700" : "text-slate-900"}`}>
                        {carrier.planGMonthly}
                      </span>
                      <span className="text-slate-500 text-xs">/mo</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
                        <span className="font-medium text-slate-700">{carrier.amBestRating}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 max-w-[200px]">{carrier.discounts}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg font-bold text-sm">
                        {carrier.medicareFaqScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Premiums are based on publicly available rate filings and may not reflect the exact rate in your zip code.
            Always request a personalized quote for accurate pricing.
          </p>
        </div>
      </section>

      {/* ─── MID-ARTICLE CTA ─── */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <ZipFormModal
           coverageType="ms"
              pageSection="florida_plan_g_mid"
           triggerId="fl-plan-g-mid-compare"
           buttonLabel="Compare Plan G Rates"
           title={`Compare Plan G Rates in ${STATE_NAME}`}
           subtitle="Enter your ZIP code to see personalized Plan G rates from top carriers in your area."
            trigger={
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-10 text-center cursor-pointer hover:shadow-xl transition-shadow group border-l-4 border-teal-500">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  See Plan G Rates in Your ZIP Code
                </h3>
                <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                  Rates vary significantly by location. Enter your zip code to see what carriers charge for Plan G in your area of {STATE_NAME}.
                </p>
                <span className="inline-flex items-center gap-2 bg-teal-500 group-hover:bg-teal-400 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-lg shadow-teal-500/25">
                  Compare Plan G Rates <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
            }
          />
        </div>
      </section>

      {/* ─── SECTION 4: How to Choose the Cheapest Plan G ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Find the Cheapest Plan G in {STATE_NAME}</h2>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Because every Plan G policy covers the same benefits regardless of the carrier, the only variable that matters when choosing a plan is the premium. Finding the lowest rate requires understanding how carriers price their policies and which discounts are available.
            </p>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-teal-600" aria-hidden="true" />
                Pricing Methods in {STATE_NAME}
              </h3>
              <p className="mb-4">
                Most carriers in {STATE_NAME} use <strong>attained-age pricing</strong>, which means your premium increases as you get older. This is the most common method nationwide. A few key things to know:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Premiums are lowest when you first enroll (typically at age 65)</li>
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Rates increase annually based on your age plus medical inflation</li>
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> The carrier with the lowest rate at 65 may not be the lowest at 75</li>
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Rate increase history matters more than the starting premium</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-teal-600" aria-hidden="true" />
                Discounts That Lower Your Premium
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Household discount:</strong> If you and your spouse both have Medigap policies with the same carrier, many companies offer 5-12% off each premium. Mutual of Omaha offers up to 12%.
                  </div>
                </div>
                <div className="flex gap-3">
                  <DollarSign className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Payment mode discount:</strong> Paying annually or quarterly instead of monthly can save 2-5% per year with some carriers.
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Loyalty discount:</strong> AARP/UnitedHealthcare offers loyalty discounts for long-term policyholders.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Plan G vs Plan N ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Plan G vs. Plan N in {STATE_NAME}: Which Saves You More?</h2>
          <p className="text-slate-600 mb-8">
            Plan N is the most common alternative to Plan G. It has lower premiums but introduces copays and does not cover Part B excess charges.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Feature</th>
                  <th className="text-left px-5 py-3.5 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-teal-400" aria-hidden="true" /> Plan G
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-blue-400" aria-hidden="true" /> Plan N
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PLAN_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-700">{row.feature}</td>
                    <td className="px-5 py-3.5 text-slate-900">{row.planG}</td>
                    <td className="px-5 py-3.5 text-slate-900">{row.planN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-blue-900">
              <strong>When to choose Plan N over Plan G:</strong> If you visit the doctor fewer than 3-4 times per year, rarely go to the ER, and your doctors all accept Medicare assignment (no excess charges), Plan N can save you $50-60 per month in {STATE_NAME}. If you see specialists frequently or want zero out-of-pocket costs after the deductible, Plan G is the safer choice.
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Florida-Specific Rules ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{STATE_NAME} Medigap Rules You Need to Know</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">Open Enrollment Period</h3>
              </div>
              <p className="text-sm text-slate-700">
                Your Medigap open enrollment period lasts 6 months, starting the month you turn 65 and are enrolled in Medicare Part B. During this window, no carrier can deny you or charge more based on health conditions. This is your best opportunity to lock in coverage.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">No Birthday Rule</h3>
              </div>
              <p className="text-sm text-slate-700">
                Unlike California, Oregon, and Louisiana, {STATE_NAME} does not have a Medigap birthday rule. There is no annual window to switch plans without medical underwriting. If you want to change carriers after your initial enrollment, you will need to qualify through underwriting.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">Guaranteed Issue Rights</h3>
              </div>
              <p className="text-sm text-slate-700">
                Federal law provides guaranteed issue rights in specific situations, such as when your Medicare Advantage plan leaves your area, your employer group coverage ends, or your current Medigap carrier goes bankrupt. In these cases, carriers must accept you without health questions.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-teal-600" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">Free Look Period & SHINE</h3>
              </div>
              <p className="text-sm text-slate-700">
                {STATE_NAME} provides a {FLORIDA_STATS.freeLookPeriod} free look period after purchasing a Medigap policy. If you are not satisfied, you can cancel for a full refund. {STATE_NAME} also offers the SHINE program (Serving Health Insurance Needs of Elders), which provides free, unbiased Medicare counseling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: How to Enroll ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">How to Enroll in Plan G in {STATE_NAME}</h2>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Confirm you have Medicare Part A and Part B",
                desc: "You must be enrolled in both Medicare Part A and Part B before you can purchase a Medigap plan. If you are turning 65, make sure your Part B enrollment is active.",
              },
              {
                step: 2,
                title: "Compare rates from multiple carriers",
                desc: `Since every Plan G covers the same benefits, the only difference is the premium. Compare quotes from at least 3-5 carriers in your ${STATE_NAME} zip code to find the best rate.`,
              },
              {
                step: 3,
                title: "Apply during your open enrollment period",
                desc: "Your 6-month Medigap open enrollment period is your best window. During this time, carriers must accept you at standard rates regardless of health conditions.",
              },
              {
                step: 4,
                title: `Review your policy during the ${FLORIDA_STATS.freeLookPeriod} free look period`,
                desc: `After your policy starts, you have ${FLORIDA_STATS.freeLookPeriod} to review it. If you are not satisfied for any reason, you can cancel for a full refund of premiums paid.`,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-10">
            <ZipFormModal
             coverageType="ms"
              pageSection="florida_plan_g_enroll"
             triggerId="fl-plan-g-enroll-compare"
             buttonLabel="Compare Plan G Rates"
             title={`Compare Plan G Rates in ${STATE_NAME}`}
             subtitle="Enter your ZIP code to see personalized Plan G rates from top carriers in your area."
              trigger={
                <span className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3.5 rounded-xl transition-colors cursor-pointer">
                  Compare Plan G Rates in {STATE_NAME} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQs ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions: Plan G in {STATE_NAME}
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: Bottom CTA ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <ZipFormModal
           coverageType="ms"
              pageSection="florida_plan_g_bottom"
           triggerId="fl-plan-g-bottom-compare"
           buttonLabel="Compare Plan G Rates"
           title={`Compare Plan G Rates in ${STATE_NAME}`}
           subtitle="Enter your ZIP code to see personalized Plan G rates from top carriers in your area."
            trigger={
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-10 md:p-14 text-center cursor-pointer hover:shadow-2xl transition-shadow group border-l-4 border-teal-500">
                <Shield className="w-12 h-12 text-teal-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Find the Lowest Plan G Rate in Your Area
                </h3>
                <p className="text-blue-200 mb-8 max-w-xl mx-auto">
                  The same Plan G can cost 50% more from one carrier to another in the same zip code.
                  Compare rates from {FLORIDA_STATS.numberOfCarriers} carriers in {STATE_NAME} to make sure you are not overpaying.
                </p>
                <span className="inline-flex items-center gap-2 bg-teal-500 group-hover:bg-teal-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-teal-500/25">
                  Compare Plan G Rates <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
                <p className="text-blue-300 text-sm mt-4">
                  Or call{" "}
                  <a
                    href="tel:+18884410465"
                    onClick={(e) => { e.stopPropagation(); trackPhoneClick({ phone_number: "(888) 441-0465", page_section: "florida_plan_g_bottom" }); }}
                    className="invoca-phone text-teal-400 hover:text-teal-300 font-semibold underline"
                  >
                    (888) 441-0465
                  </a>{" "}
                  to speak with a licensed agent
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* ─── SECTION 10: Related Pages ─── */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/medicare-supplement-plans/florida" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> All {STATE_NAME} Medigap Plans
            </Link>
            <Link href="/medicare-supplement-plans/plan-g" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Plan G National Overview
            </Link>
            <Link href="/medicare-supplement-plans/medigap-eligibility" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Medigap Eligibility Guide
            </Link>
            <Link href="/medicare-supplement-plans/plan-n" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Plan N Overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
