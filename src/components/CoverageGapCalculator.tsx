"use client";
import { useState, useMemo } from "react";
import { Calculator, DollarSign, Shield, ShieldCheck, AlertTriangle } from "lucide-react";

/**
 * Interactive Cost Calculator for Lesson 4 (Coverage Gaps)
 *
 * User enters estimated annual medical costs → sees out-of-pocket comparison:
 * - Original Medicare alone
 * - Original Medicare + Plan G
 * - Original Medicare + Plan N
 */

// 2025 values (update annually)
const PART_B_DEDUCTIBLE = 283;
const PART_A_DEDUCTIBLE = 1736;
const PLAN_G_AVG_MONTHLY = 175; // national average
const PLAN_N_AVG_MONTHLY = 130; // national average
const PLAN_N_OFFICE_COPAY = 20; // up to $20 per office visit
const PLAN_N_ER_COPAY = 50; // $50 ER copay if not admitted

// Assumptions for the calculator
const ESTIMATED_OFFICE_VISITS_PER_YEAR = 6;

export default function CoverageGapCalculator() {
  const [inputValue, setInputValue] = useState("");
  const [medicalCosts, setMedicalCosts] = useState<number | null>(null);

  const handleCalculate = () => {
    const cleaned = inputValue.replace(/[,$\s]/g, "");
    const num = parseFloat(cleaned);
    if (!isNaN(num) && num > 0) {
      setMedicalCosts(num);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  };

  const results = useMemo(() => {
    if (medicalCosts === null) return null;

    // Original Medicare: You pay Part B deductible + 20% of remaining
    // For simplicity, we assume all costs are Part B (outpatient/doctor)
    // Part A deductible applies separately for hospital stays
    const isLikelyHospital = medicalCosts > 30000;
    const partADeductible = isLikelyHospital ? PART_A_DEDUCTIBLE : 0;

    // Part B: deductible + 20% of the rest
    const afterDeductible = Math.max(0, medicalCosts - PART_B_DEDUCTIBLE);
    const coinsurance20 = afterDeductible * 0.2;
    const originalMedicareOOP = PART_B_DEDUCTIBLE + coinsurance20 + partADeductible;

    // Plan G: You only pay the Part B deductible ($283). Plan G covers everything else.
    const planGPremiumAnnual = PLAN_G_AVG_MONTHLY * 12;
    const planGOOP = PART_B_DEDUCTIBLE + planGPremiumAnnual;

    // Plan N: You pay Part B deductible + up to $20 copay per office visit + $50 ER copay
    // Plan N does NOT cover Part B excess charges (rare)
    const planNPremiumAnnual = PLAN_N_AVG_MONTHLY * 12;
    const planNCopays = Math.min(ESTIMATED_OFFICE_VISITS_PER_YEAR, Math.ceil(medicalCosts / 500)) * PLAN_N_OFFICE_COPAY;
    const planNOOP = PART_B_DEDUCTIBLE + planNCopays + planNPremiumAnnual;

    return {
      originalMedicare: Math.round(originalMedicareOOP),
      planG: Math.round(planGOOP),
      planN: Math.round(planNOOP),
      savings: Math.round(originalMedicareOOP - planGOOP),
      medicalCosts: Math.round(medicalCosts),
    };
  }, [medicalCosts]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const presets = [
    { label: "Healthy year", value: 5000 },
    { label: "Moderate care", value: 25000 },
    { label: "Surgery", value: 75000 },
    { label: "Major illness", value: 200000 },
  ];

  return (
    <div className="my-10 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h3
          className="text-xl font-bold text-slate-900"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          Your Coverage Gap Calculator
        </h3>
      </div>
      <p className="text-slate-600 text-sm mb-6 ml-[52px]">
        Enter your estimated annual medical costs to see what you would pay out-of-pocket under three scenarios.
      </p>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Estimated Annual Medical Costs
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 50,000"
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-lg font-semibold text-slate-900 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleCalculate}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors shrink-0"
          >
            Calculate
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs text-slate-500 self-center">Quick pick:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setInputValue(preset.value.toLocaleString());
                setMedicalCosts(preset.value);
              }}
              className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-600 hover:text-blue-700"
            >
              {preset.label} ({formatCurrency(preset.value)})
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="animate-in fade-in duration-300">
          <div className="text-sm text-slate-500 mb-3 font-medium">
            If your medical bills total {formatCurrency(results.medicalCosts)} this year:
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-5">
            {/* Original Medicare */}
            <div className="bg-white border-2 border-red-200 rounded-xl p-5 relative">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                HIGHEST RISK
              </div>
              <div className="flex items-center gap-2 mb-3 mt-1">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-slate-800 text-sm">Original Medicare Only</span>
              </div>
              <div className="text-3xl font-black text-red-700 mb-1">
                {formatCurrency(results.originalMedicare)}
              </div>
              <p className="text-xs text-slate-500">Your out-of-pocket cost</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div>Part B deductible: {formatCurrency(PART_B_DEDUCTIBLE)}</div>
                <div>20% coinsurance: {formatCurrency(results.originalMedicare - PART_B_DEDUCTIBLE - (results.medicalCosts > 30000 ? PART_A_DEDUCTIBLE : 0))}</div>
                {results.medicalCosts > 30000 && (
                  <div>Part A deductible: {formatCurrency(PART_A_DEDUCTIBLE)}</div>
                )}
              </div>
            </div>

            {/* Plan G */}
            <div className="bg-white border-2 border-green-200 rounded-xl p-5 relative">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                MOST PROTECTION
              </div>
              <div className="flex items-center gap-2 mb-3 mt-1">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-slate-800 text-sm">With Plan G</span>
              </div>
              <div className="text-3xl font-black text-green-700 mb-1">
                {formatCurrency(results.planG)}
              </div>
              <p className="text-xs text-slate-500">Total annual cost (premiums + OOP)</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div>Part B deductible: {formatCurrency(PART_B_DEDUCTIBLE)}</div>
                <div>Monthly premium: ~${PLAN_G_AVG_MONTHLY}/mo</div>
                <div>Everything else: $0</div>
              </div>
            </div>

            {/* Plan N */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5 relative">
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                LOWER PREMIUM
              </div>
              <div className="flex items-center gap-2 mb-3 mt-1">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-800 text-sm">With Plan N</span>
              </div>
              <div className="text-3xl font-black text-blue-700 mb-1">
                {formatCurrency(results.planN)}
              </div>
              <p className="text-xs text-slate-500">Total annual cost (premiums + OOP)</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div>Part B deductible: {formatCurrency(PART_B_DEDUCTIBLE)}</div>
                <div>Monthly premium: ~${PLAN_N_AVG_MONTHLY}/mo</div>
                <div>Office copays: ~{formatCurrency(Math.min(ESTIMATED_OFFICE_VISITS_PER_YEAR, Math.ceil(results.medicalCosts / 500)) * PLAN_N_OFFICE_COPAY)}/yr</div>
              </div>
            </div>
          </div>

          {/* Savings callout */}
          {results.savings > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-green-900">
                  Plan G would save you {formatCurrency(results.savings)} this year
                </p>
                <p className="text-sm text-green-700">
                  Even after paying premiums, Medigap coverage protects you from the uncapped 20% coinsurance.
                  {results.medicalCosts >= 50000 && " For high medical costs, the savings are dramatic."}
                </p>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            * This calculator uses national average Medigap premiums (Plan G: ~${PLAN_G_AVG_MONTHLY}/mo, Plan N: ~${PLAN_N_AVG_MONTHLY}/mo).
            Actual premiums vary by ZIP code, age, gender, and tobacco use. Assumes all costs are Medicare-approved charges.
            Plan N includes estimated copays for {ESTIMATED_OFFICE_VISITS_PER_YEAR} office visits/year.
          </p>
        </div>
      )}
    </div>
  );
}
