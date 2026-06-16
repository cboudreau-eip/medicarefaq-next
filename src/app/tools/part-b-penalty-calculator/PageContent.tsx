"use client";

/**
 * Medicare Part B Late Enrollment Penalty Calculator
 * Design: Clean, light, authoritative — matching the enrollment tools family
 * Colors: Amber (#D97706) for enrollment/penalty identity, navy (#1B2A4A) headers
 *
 * Logic:
 *  - Penalty = 10% of standard Part B premium × number of full 12-month periods delayed
 *  - "Full 12-month period" = consecutive months you were eligible but not enrolled
 *    (months with creditable employer coverage don't count)
 *  - Penalty is permanent — added to monthly premium for life
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Calculator,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  ArrowRight,
  Info,
  Shield,
  RefreshCw,
} from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";
import EddieProTip from "@/components/EddieProTip";

// 2026 standard Part B premium
const STANDARD_PREMIUM = 185.0;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
// Eligible year range: people who became eligible between 1990 and current year
const ELIGIBLE_YEARS = Array.from({ length: currentYear - 1989 }, (_, i) => 1990 + i);
// Enrollment year: from 1990 to current year + 5
const ENROLLMENT_YEARS = Array.from({ length: currentYear - 1989 + 6 }, (_, i) => 1990 + i);

interface CalcResult {
  delayedMonths: number;
  fullPeriods: number;
  penaltyPercent: number;
  monthlyPenalty: number;
  totalMonthlyPremium: number;
  lifetimeCost10yr: number;
  lifetimeCost20yr: number;
  annualExtraCost: number;
}

function calculatePenalty(
  eligibleMonth: number,
  eligibleYear: number,
  enrolledMonth: number,
  enrolledYear: number
): CalcResult | null {
  // Total months delayed (from first eligible month to enrollment month, exclusive)
  const eligibleDate = new Date(eligibleYear, eligibleMonth - 1, 1);
  const enrolledDate = new Date(enrolledYear, enrolledMonth - 1, 1);

  if (enrolledDate <= eligibleDate) return null;

  const totalMonths =
    (enrolledYear - eligibleYear) * 12 + (enrolledMonth - eligibleMonth);

  // Full 12-month periods
  const fullPeriods = Math.floor(totalMonths / 12);

  if (fullPeriods === 0) {
    // Less than 12 months — no penalty
    return {
      delayedMonths: totalMonths,
      fullPeriods: 0,
      penaltyPercent: 0,
      monthlyPenalty: 0,
      totalMonthlyPremium: STANDARD_PREMIUM,
      lifetimeCost10yr: 0,
      lifetimeCost20yr: 0,
      annualExtraCost: 0,
    };
  }

  const penaltyPercent = fullPeriods * 10;
  const monthlyPenalty = Math.round(STANDARD_PREMIUM * (penaltyPercent / 100) * 100) / 100;
  const totalMonthlyPremium = STANDARD_PREMIUM + monthlyPenalty;
  const annualExtraCost = Math.round(monthlyPenalty * 12 * 100) / 100;
  const lifetimeCost10yr = Math.round(monthlyPenalty * 12 * 10 * 100) / 100;
  const lifetimeCost20yr = Math.round(monthlyPenalty * 12 * 20 * 100) / 100;

  return {
    delayedMonths: totalMonths,
    fullPeriods,
    penaltyPercent,
    monthlyPenalty,
    totalMonthlyPremium,
    lifetimeCost10yr,
    lifetimeCost20yr,
    annualExtraCost,
  };
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

const faqs = [
  {
    q: "How is the Part B late enrollment penalty calculated?",
    a: "The penalty is 10% of the standard Part B premium for each full 12-month period you were eligible for Part B but didn't enroll and didn't have creditable coverage. For example, if you delayed 25 months, that's 2 full 12-month periods, so your penalty is 20% of the standard premium — permanently.",
  },
  {
    q: "Is the Part B penalty really permanent?",
    a: "Yes. Unlike some other financial penalties, the Medicare Part B late enrollment penalty never goes away. It's added to your monthly Part B premium for as long as you have Medicare — which could be 20, 30, or more years.",
  },
  {
    q: "Does employer coverage protect me from the penalty?",
    a: "Yes, if your employer coverage is creditable — meaning it's at least as good as Medicare. If you have creditable coverage through your own employer or your spouse's employer (with 20+ employees), months covered by that insurance don't count toward your delay period. Ask your HR department for a creditable coverage letter.",
  },
  {
    q: "What about COBRA coverage?",
    a: "COBRA is NOT considered creditable coverage for Medicare purposes. If you relied on COBRA after losing employer coverage instead of enrolling in Medicare, those months count toward your penalty period. Always enroll in Medicare during your Initial Enrollment Period if COBRA is your only option.",
  },
  {
    q: "Can I appeal a Part B late enrollment penalty?",
    a: "In some cases, yes. If you believe you were incorrectly assessed a penalty — for example, if you had creditable coverage that wasn't properly documented — you can request a reconsideration from Medicare. You'll need to provide documentation proving your prior creditable coverage.",
  },
  {
    q: "Does the penalty amount change over time?",
    a: "The penalty percentage stays fixed, but the dollar amount can change each year because it's calculated as a percentage of the current standard premium. If the standard premium increases (which it typically does), your penalty dollar amount increases proportionally.",
  },
];

export default function PartBPenaltyCalculator() {
  const [eligibleMonth, setEligibleMonth] = useState<number>(0);
  const [eligibleYear, setEligibleYear] = useState<number>(0);
  const [enrolledMonth, setEnrolledMonth] = useState<number>(0);
  const [enrolledYear, setEnrolledYear] = useState<number>(0);
  const [calculated, setCalculated] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  const result = useMemo<CalcResult | null>(() => {
    if (!calculated) return null;
    if (!eligibleMonth || !eligibleYear || !enrolledMonth || !enrolledYear) return null;
    return calculatePenalty(eligibleMonth, eligibleYear, enrolledMonth, enrolledYear);
  }, [calculated, eligibleMonth, eligibleYear, enrolledMonth, enrolledYear]);

  const isFormValid =
    eligibleMonth > 0 && eligibleYear > 0 && enrolledMonth > 0 && enrolledYear > 0;

  const enrolledDateAfterEligible =
    isFormValid &&
    new Date(enrolledYear, enrolledMonth - 1) > new Date(eligibleYear, eligibleMonth - 1);

  const canCalculate = isFormValid && enrolledDateAfterEligible;

  function handleCalculate() {
    if (canCalculate) setCalculated(true);
  }

  function handleReset() {
    setEligibleMonth(0);
    setEligibleYear(0);
    setEnrolledMonth(0);
    setEnrolledYear(0);
    setCalculated(false);
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-[#1B2A4A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold mb-4 uppercase tracking-wider">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            <span>Free Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Medicare Part B Late Enrollment<br className="hidden sm:block" /> Penalty Calculator
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Find out exactly how much your Part B late enrollment penalty will cost you — every month, every year, for the rest of your life.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-blue-200">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" /> Free to use</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" /> No sign-up required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" /> Instant results</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Calculator Panel ── */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-amber-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[#1B2A4A] text-base">Calculate Your Penalty</p>
                  <p className="text-sm text-gray-500">Enter your eligibility and enrollment dates below</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <p className="font-semibold text-[#1B2A4A]">When did you first become eligible for Part B?</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 ml-8">
                    This is typically the month you turned 65. If you became eligible due to disability, use that date.
                  </p>
                  <div className="grid grid-cols-2 gap-3 ml-8">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Month</label>
                      <select
                        value={eligibleMonth}
                        onChange={(e) => { setEligibleMonth(Number(e.target.value)); setCalculated(false); }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                      >
                        <option value={0}>Select month</option>
                        {MONTHS.map((m, i) => (
                          <option key={m} value={i + 1}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Year</label>
                      <select
                        value={eligibleYear}
                        onChange={(e) => { setEligibleYear(Number(e.target.value)); setCalculated(false); }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                      >
                        <option value={0}>Select year</option>
                        {ELIGIBLE_YEARS.slice().reverse().map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#1B2A4A] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <p className="font-semibold text-[#1B2A4A]">When did you (or will you) enroll in Part B?</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 ml-8">
                    If you haven't enrolled yet, enter your planned enrollment date to estimate your future penalty.
                  </p>
                  <div className="grid grid-cols-2 gap-3 ml-8">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Month</label>
                      <select
                        value={enrolledMonth}
                        onChange={(e) => { setEnrolledMonth(Number(e.target.value)); setCalculated(false); }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                      >
                        <option value={0}>Select month</option>
                        {MONTHS.map((m, i) => (
                          <option key={m} value={i + 1}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Year</label>
                      <select
                        value={enrolledYear}
                        onChange={(e) => { setEnrolledYear(Number(e.target.value)); setCalculated(false); }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                      >
                        <option value={0}>Select year</option>
                        {ENROLLMENT_YEARS.slice().reverse().map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {isFormValid && !enrolledDateAfterEligible && (
                    <p className="ml-8 mt-2 text-sm text-red-600 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                      Enrollment date must be after your eligibility date.
                    </p>
                  )}
                </div>

                {/* Creditable Coverage Note */}
                <div className="ml-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800 mb-1">Had creditable employer coverage?</p>
                    <p className="text-sm text-blue-700">
                      If you delayed Part B because you had creditable coverage through an employer (yours or your spouse's), those months don't count toward your penalty. Use your <strong>coverage end date</strong> as your eligibility start date instead of your 65th birthday.
                    </p>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="flex gap-3">
                  <button
                    id="part-b-penalty-calculate"
                    onClick={handleCalculate}
                    disabled={!canCalculate}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" aria-hidden="true" />
                    Calculate My Penalty
                  </button>
                  {calculated && (
                    <button
                      onClick={handleReset}
                      className="px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <RefreshCw className="w-4 h-4" aria-hidden="true" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Results Panel ── */}
            {calculated && result && (
              <div className="mt-6 space-y-4">
                {result.fullPeriods === 0 ? (
                  /* No penalty */
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-green-800 mb-1">No Penalty!</h2>
                        <p className="text-green-700 text-base">
                          You delayed <strong>{result.delayedMonths} month{result.delayedMonths !== 1 ? "s" : ""}</strong> — less than one full 12-month period. The Part B penalty only applies after a full year of delay, so <strong>you owe $0 in penalties</strong>.
                        </p>
                        <p className="text-green-600 text-sm mt-2">
                          Your standard monthly Part B premium will be <strong>{fmt(STANDARD_PREMIUM)}/month</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Has penalty */
                  <>
                    {/* Summary Card */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl overflow-hidden">
                      <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                        <p className="font-bold text-lg">Your Penalty Results</p>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                          <div className="bg-white rounded-xl border border-red-100 p-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delay Period</p>
                            <p className="text-2xl font-extrabold text-[#1B2A4A]">{result.delayedMonths}</p>
                            <p className="text-xs text-gray-500">months</p>
                          </div>
                          <div className="bg-white rounded-xl border border-red-100 p-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Penalty</p>
                            <p className="text-2xl font-extrabold text-red-600">{result.penaltyPercent}%</p>
                            <p className="text-xs text-gray-500">permanent</p>
                          </div>
                          <div className="bg-white rounded-xl border border-red-100 p-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Monthly Add-On</p>
                            <p className="text-2xl font-extrabold text-red-600">{fmt(result.monthlyPenalty)}</p>
                            <p className="text-xs text-gray-500">per month</p>
                          </div>
                          <div className="bg-white rounded-xl border border-red-100 p-4 text-center">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">New Premium</p>
                            <p className="text-2xl font-extrabold text-[#1B2A4A]">{fmt(result.totalMonthlyPremium)}</p>
                            <p className="text-xs text-gray-500">per month</p>
                          </div>
                        </div>

                        {/* Penalty Breakdown */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                          <h3 className="font-bold text-[#1B2A4A] mb-3 flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-amber-500" aria-hidden="true" />
                            How This Was Calculated
                          </h3>
                          <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                              <span>Months delayed without creditable coverage</span>
                              <span className="font-semibold">{result.delayedMonths} months</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                              <span>Full 12-month periods (penalty periods)</span>
                              <span className="font-semibold">{result.fullPeriods} × 12-month period{result.fullPeriods !== 1 ? "s" : ""}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                              <span>Penalty rate</span>
                              <span className="font-semibold">{result.fullPeriods} × 10% = <span className="text-red-600">{result.penaltyPercent}%</span></span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                              <span>2026 standard Part B premium</span>
                              <span className="font-semibold">{fmt(STANDARD_PREMIUM)}/mo</span>
                            </div>
                            <div className="flex justify-between py-1.5 font-bold text-base">
                              <span>Monthly penalty amount</span>
                              <span className="text-red-600">{fmt(result.monthlyPenalty)}/mo</span>
                            </div>
                          </div>
                        </div>

                        {/* Lifetime Cost */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                          <h3 className="font-bold text-[#1B2A4A] mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-600" aria-hidden="true" />
                            Lifetime Cost of This Penalty
                          </h3>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Per Year</p>
                              <p className="text-xl font-extrabold text-amber-700">{fmt(result.annualExtraCost)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Over 10 Years</p>
                              <p className="text-xl font-extrabold text-amber-700">{fmt(result.lifetimeCost10yr)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Over 20 Years</p>
                              <p className="text-xl font-extrabold text-amber-700">{fmt(result.lifetimeCost20yr)}</p>
                            </div>
                          </div>
                          <p className="text-xs text-amber-700 mt-3 text-center">
                            * Estimates based on 2026 standard premium of {fmt(STANDARD_PREMIUM)}/mo. Actual amounts may vary as the standard premium changes each year.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Eddie Pro Tip */}
                    <EddieProTip
                      variant="amber"
                      tip={`A ${result.penaltyPercent}% penalty means you'll pay an extra ${fmt(result.monthlyPenalty)} every single month — forever. Over 20 years, that's ${fmt(result.lifetimeCost20yr)} in extra premiums. The good news: if you haven't enrolled yet, call us now. We can walk you through your options and make sure you enroll at the right time to minimize or avoid any additional penalty.`}
                    />

                    {/* CTA */}
                    <div className="bg-[#1B2A4A] rounded-2xl p-6 text-white">
                      <h3 className="text-lg font-bold mb-2">Want to minimize the damage?</h3>
                      <p className="text-blue-200 text-sm mb-4">
                        Our licensed Medicare agents can review your situation, confirm whether your delay qualifies for any exceptions, and help you enroll correctly.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href="tel:18883358996"
                          onClick={() => trackPhoneClick({ phone_number: "18883358996", page_section: "part-b-penalty-results" })}
                          className="flex items-center justify-center gap-2 bg-white text-[#1B2A4A] font-bold py-3 px-5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
                        >
                          <Phone className="w-4 h-4" aria-hidden="true" />
                          Call (888) 335-8996
                        </a>
                        <button
                          id="part-b-penalty-compare-rates"
                          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
                        >
                          Compare Plans
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── How the Penalty Works ── */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">How the Part B Late Enrollment Penalty Works</h2>
              <div className="prose prose-slate max-w-none text-gray-700 space-y-4 text-base leading-relaxed">
                <p>
                  Medicare Part B covers outpatient services — doctor visits, preventive care, lab tests, and medical equipment. Most people are first eligible for Part B when they turn 65. If you don't enroll during your <Link href="/medicare-enrollment/turning-65" className="text-[#0066CC] underline hover:text-blue-800">Initial Enrollment Period (IEP)</Link> and don't have creditable employer coverage, you'll face a permanent late enrollment penalty.
                </p>
                <p>
                  The penalty is calculated as <strong>10% of the standard Part B premium for each full 12-month period</strong> you were eligible but didn't enroll. In 2026, the standard premium is {fmt(STANDARD_PREMIUM)}/month. So if you delayed 2 full years, your penalty is 20% — an extra {fmt(STANDARD_PREMIUM * 0.2)}/month added to your premium for life.
                </p>
                <p>
                  The penalty is permanent. It doesn't expire after a few years, and it doesn't get forgiven when you turn a certain age. It follows you for as long as you have Medicare Part B.
                </p>
              </div>

              {/* Visual penalty scale */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#1B2A4A] mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  Penalty by Delay Length (2026 Rates)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1B2A4A] text-white">
                        <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">Delay Period</th>
                        <th className="px-4 py-3 text-left font-semibold">Penalty %</th>
                        <th className="px-4 py-3 text-left font-semibold">Monthly Add-On</th>
                        <th className="px-4 py-3 text-left font-semibold">New Monthly Premium</th>
                        <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">10-Year Extra Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Less than 12 months", periods: 0 },
                        { label: "1–2 years (1 period)", periods: 1 },
                        { label: "2–3 years (2 periods)", periods: 2 },
                        { label: "3–4 years (3 periods)", periods: 3 },
                        { label: "5–6 years (5 periods)", periods: 5 },
                        { label: "10+ years (10 periods)", periods: 10 },
                      ].map((row, i) => {
                        const pct = row.periods * 10;
                        const addon = Math.round(STANDARD_PREMIUM * pct / 100 * 100) / 100;
                        const total = STANDARD_PREMIUM + addon;
                        const tenYr = Math.round(addon * 12 * 10 * 100) / 100;
                        return (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-3 text-gray-800 font-medium border-t border-gray-100">{row.label}</td>
                            <td className="px-4 py-3 border-t border-gray-100">
                              {pct === 0 ? (
                                <span className="text-green-600 font-semibold">No penalty</span>
                              ) : (
                                <span className="text-red-600 font-semibold">{pct}%</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-700 border-t border-gray-100">
                              {addon === 0 ? "—" : <span className="text-red-600 font-medium">+{fmt(addon)}</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-800 font-semibold border-t border-gray-100">{fmt(total)}</td>
                            <td className="px-4 py-3 border-t border-gray-100">
                              {tenYr === 0 ? (
                                <span className="text-green-600 font-semibold">$0</span>
                              ) : (
                                <span className="text-red-600 font-semibold">{fmt(tenYr)}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">Based on 2026 standard Part B premium of {fmt(STANDARD_PREMIUM)}/month. Actual amounts vary as the standard premium adjusts annually.</p>
              </div>
            </div>

            {/* ── How to Avoid the Penalty ── */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">How to Avoid the Part B Penalty</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Calendar,
                    color: "teal",
                    title: "Enroll During Your IEP",
                    desc: "Your Initial Enrollment Period is a 7-month window centered on your 65th birthday. Enrolling during this window guarantees no penalty.",
                    link: "/medicare-enrollment/turning-65",
                    linkText: "Learn about the IEP",
                  },
                  {
                    icon: Shield,
                    color: "blue",
                    title: "Maintain Creditable Coverage",
                    desc: "If you're still working with employer coverage (20+ employees), you can delay Part B penalty-free. Get a creditable coverage letter from your HR department.",
                    link: "/medicare-enrollment/working-past-65",
                    linkText: "Working past 65 guide",
                  },
                  {
                    icon: Clock,
                    color: "amber",
                    title: "Use Your Special Enrollment Period",
                    desc: "When your employer coverage ends, you get an 8-month Special Enrollment Period to sign up for Part B without penalty.",
                    link: "/faqs/medicare-special-enrollment-periods",
                    linkText: "About Special Enrollment",
                  },
                  {
                    icon: DollarSign,
                    color: "green",
                    title: "Don't Wait for the GEP",
                    desc: "The General Enrollment Period (Jan 1–Mar 31) is a fallback, but coverage doesn't start until July 1 and you'll still face the penalty. Avoid it if possible.",
                    link: "/faqs/medicare-general-enrollment-period",
                    linkText: "About the GEP",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const colorMap: Record<string, string> = {
                    teal: "bg-teal-50 border-teal-200 text-teal-700",
                    blue: "bg-blue-50 border-blue-200 text-blue-700",
                    amber: "bg-amber-50 border-amber-200 text-amber-700",
                    green: "bg-green-50 border-green-200 text-green-700",
                  };
                  const iconBg: Record<string, string> = {
                    teal: "bg-teal-100 text-teal-600",
                    blue: "bg-blue-100 text-blue-600",
                    amber: "bg-amber-100 text-amber-600",
                    green: "bg-green-100 text-green-600",
                  };
                  return (
                    <div key={i} className={`border rounded-xl p-5 ${colorMap[item.color].split(" ").slice(0, 2).join(" ")} border-opacity-60`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${iconBg[item.color]}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-[#1B2A4A] mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.desc}</p>
                      <Link href={item.link} className="text-sm font-semibold text-[#0066CC] hover:underline flex items-center gap-1">
                        {item.linkText} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── FAQ ── */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[#1B2A4A] text-sm pr-4">{faq.q}</span>
                      {openFaq === i ? (
                        <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Related Tools */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-[#1B2A4A] mb-4 text-sm uppercase tracking-wide">Related Tools</h3>
              <div className="space-y-3">
                <Link
                  href="/tools/enrollment-timeline"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-teal-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1B2A4A] group-hover:text-teal-700 transition-colors">Enrollment Timeline Calculator</p>
                    <p className="text-xs text-gray-500 mt-0.5">Find your IEP, SEP, and key Medicare deadlines</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-bold text-[#1B2A4A] mb-4 text-sm uppercase tracking-wide">Part B Penalty Quick Facts</h3>
              <ul className="space-y-3">
                {[
                  { icon: AlertTriangle, text: "10% penalty per full 12-month period of delay", color: "text-red-500" },
                  { icon: Clock, text: "Penalty is permanent — lasts your entire Medicare lifetime", color: "text-amber-600" },
                  { icon: DollarSign, text: `2026 standard premium: ${fmt(STANDARD_PREMIUM)}/month`, color: "text-blue-600" },
                  { icon: Shield, text: "Creditable employer coverage protects you from penalties", color: "text-green-600" },
                  { icon: Calendar, text: "GEP runs Jan 1–Mar 31; coverage starts July 1", color: "text-purple-600" },
                ].map((fact, i) => {
                  const Icon = fact.icon;
                  return (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${fact.color}`} aria-hidden="true" />
                      <span>{fact.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Help CTA */}
            <div className="bg-[#1B2A4A] rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">Free Medicare Help</h3>
              <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                Speak with a licensed agent who can review your specific situation and help you avoid or minimize penalties.
              </p>
              <a
                href="tel:18883358996"
                onClick={() => trackPhoneClick({ phone_number: "18883358996", page_section: "part-b-penalty-sidebar" })}
                className="flex items-center justify-center gap-2 bg-white text-[#1B2A4A] font-bold py-2.5 px-4 rounded-xl hover:bg-blue-50 transition-colors text-sm w-full mb-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                (888) 335-8996
              </a>
              <button
                id="part-b-penalty-sidebar-compare"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm w-full"
              >
                Compare Plans
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Related Articles */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-[#1B2A4A] mb-4 text-sm uppercase tracking-wide">Related Articles</h3>
              <div className="space-y-3">
                {[
                  { href: "/medicare-enrollment/late-penalties", label: "Understanding All Medicare Late Penalties" },
                  { href: "/medicare-enrollment/turning-65", label: "Medicare Enrollment at 65: Complete Guide" },
                  { href: "/medicare-enrollment/working-past-65", label: "Working Past 65 Without Penalty" },
                  { href: "/faqs/medicare-general-enrollment-period", label: "The General Enrollment Period Explained" },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-start gap-2 text-sm text-[#0066CC] hover:underline leading-snug"
                  >
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </article>
  );
}
