/**
 * Medicare Cost Constants — 2026
 *
 * Single source of truth for all Medicare cost figures used across the site.
 * Update this file each year when CMS releases new rates.
 *
 * Source: CMS Fact Sheet — 2026 Medicare Parts A & B Premiums and Deductibles
 * Published: November 14, 2025
 * Shortcode reference: ListofShortcodes.docx
 */

export const MEDICARE_COSTS = {
  // ─── Years ───────────────────────────────────────────────────────────────
  currentYear: "2026",
  previousYear: "2025",
  twoYearsAgoForIRMAA: "2024",

  // ─── Part B ───────────────────────────────────────────────────────────────
  partB: {
    /** Standard monthly premium (current year) */
    monthlyPremium: "$202.90",
    /** Standard monthly premium (previous year) */
    previousYearMonthlyPremium: "$185",
    /** Annual deductible (current year) */
    annualDeductible: "$283",
    /** Annual deductible (previous year) */
    previousYearAnnualDeductible: "$257",
  },

  // ─── Part A ───────────────────────────────────────────────────────────────
  partA: {
    /** Full Part A premium for those who must buy in (current year) */
    fullPremium: "$565",
    /** Full Part A premium (previous year) */
    previousYearFullPremium: "$518",
    /** Half Part A premium (current year) */
    halfPremium: "$311",
    /** Half Part A premium (previous year) */
    previousYearHalfPremium: "$285",
    /** Inpatient hospital deductible per benefit period (current year) */
    inpatientDeductible: "$1,736",
    /** Inpatient hospital deductible per benefit period (previous year) */
    previousYearInpatientDeductible: "$1,676",
    /** Coinsurance for days 61–90 (current year) */
    coinsuranceDays61to90: "$434",
    /** Coinsurance for days 61–90 (previous year) */
    previousYearCoinsuranceDays61to90: "$419",
    /** Lifetime reserve day coinsurance (current year) */
    coinsuranceReserveDays: "$868",
    /** Lifetime reserve day coinsurance (previous year) */
    previousYearCoinsuranceReserveDays: "$838",
    /** SNF coinsurance days 21–100 (current year) */
    snfCoinsurance: "$217",
    /** SNF coinsurance days 21–100 (previous year) */
    previousYearSnfCoinsurance: "$209.50",
  },

  // ─── Part C (Medicare Advantage) ─────────────────────────────────────────
  partC: {
    /** Maximum out-of-pocket limit (current year) */
    maxMOOP: "$9,250",
  },

  // ─── Part D ───────────────────────────────────────────────────────────────
  partD: {
    /** Maximum annual deductible (current year) */
    maxDeductible: "$615",
    /** Maximum annual deductible (previous year) */
    previousYearMaxDeductible: "$590",
    /** Average monthly premium (current year) */
    avgMonthlyPremium: "$34.50",
    /** Catastrophic phase threshold (current year) */
    catastrophicPhase: "$2,100.00",
    /** Catastrophic phase threshold (previous year) */
    previousYearCatastrophicPhase: "$2,000.00",
    /** Late enrollment penalty base premium */
    lateEnrollmentPenaltyBasePremium: "$38.99",
    /** IRMAA additional cost range */
    irmaaCostRange: "$14.50 - $91.00",
  },

  // ─── IRMAA ────────────────────────────────────────────────────────────────
  irmaa: {
    /** Individual income threshold — Level 1 */
    individualLevel1: "$109,000",
    /** Joint income threshold — Level 1 */
    jointLevel1: "$218,000",
    /** Maximum IRMAA surcharge */
    maxLevel: "$689.90",

    /** Individual income ranges */
    individualLevel2: "> $109,000 and < $137,000",
    individualLevel3: "> $137,000 and < $171,000",
    individualLevel4: "> $171,000 and < $205,000",
    individualLevel5: "> $205,000 and < $500,000",
    individualLevel6: "> $500,000",

    /** Joint income ranges */
    jointLevel2: "> $218,000 and < $274,000",
    jointLevel3: "> $274,000 and < $342,000",
    jointLevel4: "> $342,000 and < $410,000",
    jointLevel5: "> $410,000 and < $750,000",
    jointLevel6: "> $750,000",

    /** Married filing separately income ranges */
    separateLevel1: "$109,000",
    separateLevel2: "> $109,000 and < $391,000",
    separateLevel3: "> $391,000",

    /** Part B premium with IRMAA surcharge by level */
    partBWithLevel2: "$284.10",
    partBWithLevel3: "$405.80",
    partBWithLevel4: "$527.50",
    partBWithLevel5: "$649.20",
    partBWithLevel6: "$689.90",

    /** Part D IRMAA additions by level */
    partDAdditionLevel2: "$14.50",
    partDAdditionLevel3: "$37.50",
    partDAdditionLevel4: "$60.40",
    partDAdditionLevel5: "$83.30",
    partDAdditionLevel6: "$91.00",
  },

  // ─── Medigap / Medicare Supplement ───────────────────────────────────────
  medigap: {
    /** HD Plan F deductible (current year) */
    hdPlanFDeductible: "$2,950.00",
    /** HD Plan F deductible (previous year) */
    previousYearHdPlanFDeductible: "$2,870.00",
    /** HD Plan G deductible (current year) */
    hdPlanGDeductible: "$2,950.00",
    /** HD Plan G deductible (previous year) */
    previousYearHdPlanGDeductible: "$2,870.00",
    /** Plan K max out-of-pocket (current year) */
    planKMaxOOP: "$8,000",
    /** Plan L max out-of-pocket (current year) */
    planLMaxOOP: "$4,000",
  },

  // ─── Extra Help / LIS ────────────────────────────────────────────────────
  extraHelp: {
    /** Income limit — individual (previous year) */
    previousYearIncomeLimitIndividual: "$23,475",
    /** Income limit — married couple (previous year) */
    previousYearIncomeLimitMarried: "$31,725",
    /** Resource limit — individual (previous year) */
    previousYearResourceLimitIndividual: "$17,600",
    /** Resource limit — married couple (previous year) */
    previousYearResourceLimitMarried: "$35,130",
  },

  // ─── Therapy Cap ─────────────────────────────────────────────────────────
  therapy: {
    /** Speech therapy cap (current year) */
    speechTherapyCap: "$2,480",
  },

  // ─── IRS Standard Deductions ─────────────────────────────────────────────
  irs: {
    /** Standard deduction — single (current year) */
    currentYearDeductionSingle: "$16,100",
    /** Standard deduction — married filing jointly (current year) */
    currentYearDeductionMarried: "$32,200",
    /** Additional deduction — single 65+ (current year) */
    currentYearDeductionSingle65: "$2,050",
    /** Additional deduction — couples 65+ (current year) */
    currentYearDeductionCouples65: "$1,650",
    /** Standard deduction — single (previous year) */
    previousYearDeductionSingle: "$15,750",
    /** Standard deduction — married filing jointly (previous year) */
    previousYearDeductionMarried: "$31,500",
    /** Additional deduction — single 65+ (previous year) */
    previousYearDeductionSingle65: "$2,000",
    /** Additional deduction — couples 65+ (previous year) */
    previousYearDeductionCouples65: "$1,600",
  },
} as const;

// ─── Convenience aliases for the most commonly used values ──────────────────
export const PART_B_PREMIUM = MEDICARE_COSTS.partB.monthlyPremium;
export const PART_B_DEDUCTIBLE = MEDICARE_COSTS.partB.annualDeductible;
export const PART_A_DEDUCTIBLE = MEDICARE_COSTS.partA.inpatientDeductible;
export const CURRENT_YEAR = MEDICARE_COSTS.currentYear;
export const PREVIOUS_YEAR = MEDICARE_COSTS.previousYear;
