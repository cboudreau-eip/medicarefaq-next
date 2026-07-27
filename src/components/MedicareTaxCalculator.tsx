"use client";
import { useState, useMemo } from "react";
import { Calculator, DollarSign, Briefcase, Users, TrendingUp } from "lucide-react";

/**
 * Interactive Medicare Tax Calculator for 2026
 *
 * User inputs:
 * - Annual earned income (wages/self-employment)
 * - Employment status (employee, self-employed, employer)
 * - Filing status (single, married filing jointly, married filing separately)
 *
 * Outputs:
 * - Standard Medicare tax (1.45% or 2.9%)
 * - Additional Medicare Tax (0.9% above threshold)
 * - Total annual Medicare tax liability
 */

// 2026 thresholds (unchanged since 2013)
const THRESHOLDS = {
  single: 200000,
  "married-jointly": 250000,
  "married-separately": 125000,
};

const STANDARD_RATE = 0.0145; // 1.45% employee/employer each
const SELF_EMPLOYED_RATE = 0.029; // 2.9% total
const ADDITIONAL_RATE = 0.009; // 0.9% above threshold

type FilingStatus = "single" | "married-jointly" | "married-separately";
type EmploymentType = "employee" | "self-employed";

export default function MedicareTaxCalculator() {
  const [incomeInput, setIncomeInput] = useState("");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("employee");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [calculated, setCalculated] = useState(false);

  const income = useMemo(() => {
    const cleaned = incomeInput.replace(/[,$\s]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) || num < 0 ? 0 : num;
  }, [incomeInput]);

  const results = useMemo(() => {
    if (!calculated || income === 0) return null;

    const threshold = THRESHOLDS[filingStatus];
    const isAboveThreshold = income > threshold;
    const excessIncome = Math.max(0, income - threshold);

    // Standard Medicare tax
    let standardTax: number;
    let employerPortion: number;
    let yourPortion: number;

    if (employmentType === "self-employed") {
      standardTax = income * SELF_EMPLOYED_RATE;
      employerPortion = income * STANDARD_RATE; // deductible half
      yourPortion = income * STANDARD_RATE;
    } else {
      standardTax = income * STANDARD_RATE;
      employerPortion = income * STANDARD_RATE; // employer matches
      yourPortion = standardTax;
    }

    // Additional Medicare Tax (employee-only, no employer match)
    const additionalTax = isAboveThreshold ? excessIncome * ADDITIONAL_RATE : 0;

    // Total you pay
    const totalYouPay = yourPortion + additionalTax;
    // Total combined (including employer portion for employees)
    const totalCombined = employmentType === "employee"
      ? standardTax + employerPortion + additionalTax
      : standardTax + additionalTax;

    // Monthly breakdown
    const monthlyYouPay = totalYouPay / 12;

    // Per-paycheck (biweekly, 26 pay periods)
    const perPaycheck = totalYouPay / 26;

    return {
      income,
      threshold,
      excessIncome,
      isAboveThreshold,
      standardTax,
      employerPortion,
      yourPortion,
      additionalTax,
      totalYouPay,
      totalCombined,
      monthlyYouPay,
      perPaycheck,
    };
  }, [calculated, income, employmentType, filingStatus]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const formatCurrencyPrecise = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n);

  const handleCalculate = () => {
    if (income > 0) {
      setCalculated(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  };

  const presets = [
    { label: "$50K", value: "50000" },
    { label: "$100K", value: "100000" },
    { label: "$200K", value: "200000" },
    { label: "$350K", value: "350000" },
  ];

  return (
    <div className="my-10 bg-gradient-to-br from-slate-50 to-teal-50 border-2 border-teal-200 rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-[#1B2A4A] rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h3
          className="text-xl font-bold text-slate-900"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          2026 Medicare Tax Calculator
        </h3>
      </div>
      <p className="text-slate-600 text-sm mb-6 ml-[52px]">
        Enter your annual income and employment status to see your estimated Medicare tax for 2026.
      </p>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        {/* Income Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Annual Earned Income (W-2 wages or self-employment income)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={incomeInput}
                onChange={(e) => {
                  setIncomeInput(e.target.value);
                  setCalculated(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your annual income"
                className="w-full pl-9 pr-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-semibold text-slate-800 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleCalculate}
              className="px-6 py-3 bg-[#1B2A4A] text-white font-bold rounded-xl hover:bg-[#2a3d66] transition-colors shadow-md"
            >
              Calculate
            </button>
          </div>
          {/* Presets */}
          <div className="flex gap-2 mt-2">
            {presets.map((p) => (
              <button
                key={p.value}
                onClick={() => {
                  setIncomeInput(p.value);
                  setCalculated(false);
                }}
                className="px-3 py-1 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors text-slate-600"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Employment Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setEmploymentType("employee"); setCalculated(false); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                employmentType === "employee"
                  ? "border-teal-400 bg-teal-50 text-teal-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <Users className="w-4 h-4" />
              Employee (W-2)
            </button>
            <button
              onClick={() => { setEmploymentType("self-employed"); setCalculated(false); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                employmentType === "self-employed"
                  ? "border-teal-400 bg-teal-50 text-teal-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Self-Employed
            </button>
          </div>
        </div>

        {/* Filing Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tax Filing Status
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { value: "single" as FilingStatus, label: "Single" },
              { value: "married-jointly" as FilingStatus, label: "Married Filing Jointly" },
              { value: "married-separately" as FilingStatus, label: "Married Filing Separately" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setFilingStatus(opt.value); setCalculated(false); }}
                className={`px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${
                  filingStatus === opt.value
                    ? "border-teal-400 bg-teal-50 text-teal-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Summary Card */}
          <div className="bg-white border-2 border-teal-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span className="font-bold text-slate-800">Your 2026 Medicare Tax Breakdown</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Your Total */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">You Pay</p>
                <p className="text-2xl font-black text-teal-800">{formatCurrency(results.totalYouPay)}</p>
                <p className="text-xs text-teal-600 mt-1">{formatCurrencyPrecise(results.monthlyYouPay)}/month</p>
              </div>

              {/* Per Paycheck */}
              {employmentType === "employee" && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Per Paycheck (Biweekly)</p>
                  <p className="text-2xl font-black text-slate-800">{formatCurrencyPrecise(results.perPaycheck)}</p>
                  <p className="text-xs text-slate-500 mt-1">Withheld from each check</p>
                </div>
              )}

              {/* Employer or Deductible */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                {employmentType === "employee" ? (
                  <>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Employer Pays</p>
                    <p className="text-2xl font-black text-blue-800">{formatCurrency(results.employerPortion)}</p>
                    <p className="text-xs text-blue-600 mt-1">Matching 1.45%</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Deductible Half</p>
                    <p className="text-2xl font-black text-blue-800">{formatCurrency(results.employerPortion)}</p>
                    <p className="text-xs text-blue-600 mt-1">Deduct 1.45% on Schedule SE</p>
                  </>
                )}
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Standard Medicare tax ({employmentType === "self-employed" ? "2.9%" : "1.45%"})
                </span>
                <span className="font-semibold text-slate-800">{formatCurrency(results.yourPortion)}</span>
              </div>

              {results.isAboveThreshold ? (
                <div className="flex justify-between text-sm">
                  <span className="text-amber-700 font-medium">
                    Additional Medicare Tax (0.9% on income above {formatCurrency(results.threshold)})
                  </span>
                  <span className="font-semibold text-amber-800">{formatCurrency(results.additionalTax)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Additional Medicare Tax (0.9%)
                  </span>
                  <span className="font-semibold text-green-600">$0 (below {formatCurrency(results.threshold)} threshold)</span>
                </div>
              )}

              <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800">Total You Pay</span>
                <span className="font-black text-teal-700">{formatCurrency(results.totalYouPay)}</span>
              </div>
            </div>
          </div>

          {/* Additional Tax Warning */}
          {results.isAboveThreshold && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 text-sm">
                  Additional Medicare Tax applies
                </p>
                <p className="text-sm text-amber-800 mt-1">
                  Your income exceeds the {formatCurrency(results.threshold)} threshold for{" "}
                  {filingStatus === "single" ? "single filers" : filingStatus === "married-jointly" ? "married filing jointly" : "married filing separately"}.
                  You owe an extra 0.9% on {formatCurrency(results.excessIncome)} of income above the threshold.
                  {employmentType === "employee" && " Your employer does not match this additional tax."}
                </p>
              </div>
            </div>
          )}

          {/* Self-employed note */}
          {employmentType === "self-employed" && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 text-sm">Self-Employment Tax Note</p>
                <p className="text-sm text-blue-800 mt-1">
                  As self-employed, you pay both the employee and employer portions (2.9% total).
                  You can deduct the employer-equivalent half ({formatCurrency(results.employerPortion)}) as an adjustment to income on your tax return.
                  The Additional Medicare Tax (0.9%) is not deductible.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 mt-5 leading-relaxed">
        This calculator provides estimates for 2026 based on standard Medicare tax rates (1.45% employee, 1.45% employer, 0.9% Additional Medicare Tax above threshold).
        It does not account for pre-tax deductions, multiple income sources, or investment income subject to the Net Investment Income Tax (3.8%).
        Consult a tax professional for your specific situation.
      </p>
    </div>
  );
}
