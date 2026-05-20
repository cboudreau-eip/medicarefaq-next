/**
 * Florida Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, carrier filings (2026)
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface FloridaCarrier {
  id: string;
  name: string;
  displayName: string;
  badge: string;
  medicareFaqScore: number;
  amBestRating: string;
  amBestOutlook: string;
  planGMonthly: string;
  planNMonthly: string;
  plansOffered: string[];
  complaintRecord: string;
  discounts: string;
  pros: string[];
  cons: string[];
  yearFounded: number;
  headquartersState: string;
}

export const FLORIDA_CARRIERS: FloridaCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$210",
    planNMonthly: "$160",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Multi-policy discount available",
    pros: [
      "Lowest Plan G and Plan N premiums in Florida",
      "Highest financial strength rating (A++)",
      "Excellent complaint record with regulators",
      "Wide plan selection (6 plan types)",
    ],
    cons: [
      "Limited premium discount options",
      "No online quote tool available",
      "Must work through a local agent",
    ],
    yearFounded: 1922,
    headquartersState: "Illinois",
  },
  {
    id: "aarp-unitedhealthcare",
    name: "AARP/UnitedHealthcare",
    displayName: "AARP/UnitedHealthcare",
    badge: "Best Plan Availability",
    medicareFaqScore: 4.7,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$228",
    planNMonthly: "$195",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available (8 plan types)",
      "Strong household and loyalty discounts",
      "Largest Medicare Supplement insurer nationwide",
      "Excellent complaint record",
    ],
    cons: [
      "Premiums slightly higher than some competitors",
      "AARP membership required ($16/year)",
      "Rate increases can be above average in some areas",
    ],
    yearFounded: 1977,
    headquartersState: "Minnesota",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.5,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$243",
    planNMonthly: "$177",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12%)",
      "Strong financial rating (A+)",
      "Excellent complaint record",
      "Competitive Plan N pricing",
    ],
    cons: [
      "Fewer plan options (4 plan types)",
      "Plan G premiums higher than average",
      "No multi-policy discount",
    ],
    yearFounded: 1909,
    headquartersState: "Nebraska",
  },
  {
    id: "cigna-healthspring",
    name: "HealthSpring (Cigna)",
    displayName: "HealthSpring (formerly Cigna)",
    badge: "Best for Low Premiums",
    medicareFaqScore: 4.3,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$259",
    planNMonthly: "$193",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Higher than expected",
    discounts: "Household and annual payment discounts",
    pros: [
      "Historically competitive rate increases",
      "Strong digital tools and member portal",
      "Above-average discount options",
      "Well-known national brand",
    ],
    cons: [
      "Higher-than-expected complaint rate",
      "Fewer plan options (4 plan types)",
      "Initial premiums not the lowest",
    ],
    yearFounded: 1982,
    headquartersState: "Connecticut",
  },
  {
    id: "aetna",
    name: "Aetna",
    displayName: "Aetna (CVS Health)",
    badge: "Best for Stability",
    medicareFaqScore: 4.2,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$248",
    planNMonthly: "$185",
    plansOffered: ["A", "B", "F", "G", "N"],
    complaintRecord: "Fewer than expected",
    discounts: "Household discount, electronic funds transfer discount",
    pros: [
      "Backed by CVS Health (pharmacy integration)",
      "Stable rate increase history",
      "Good plan variety (5 plan types)",
      "Strong financial backing",
    ],
    cons: [
      "Mid-range pricing (not cheapest)",
      "Limited digital self-service tools",
      "Discount options below some competitors",
    ],
    yearFounded: 1853,
    headquartersState: "Connecticut",
  },
];

/**
 * MedicareFAQ Scoring Methodology
 *
 * The MedicareFAQ Score is a proprietary rating from 1.0 to 5.0 based on
 * five equally weighted factors:
 *
 * 1. Financial Strength (20%) - AM Best rating and outlook
 * 2. Pricing Competitiveness (25%) - Plan G and Plan N premiums relative to state average
 * 3. Plan Availability (15%) - Number of standardized plan types offered
 * 4. Consumer Satisfaction (25%) - NAIC complaint ratio and customer reviews
 * 5. Discounts & Value (15%) - Available premium discounts and member benefits
 *
 * Scores are updated annually based on the latest available data from CMS,
 * AM Best, and the NAIC.
 */
export const SCORING_METHODOLOGY = {
  factors: [
    {
      name: "Financial Strength",
      weight: "20%",
      description:
        "AM Best rating and outlook stability. A++ carriers score highest.",
    },
    {
      name: "Pricing Competitiveness",
      weight: "25%",
      description:
        "Plan G and Plan N premiums compared to the Florida state average for a 65-year-old.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in Florida.",
    },
    {
      name: "Consumer Satisfaction",
      weight: "25%",
      description:
        "NAIC complaint ratio relative to market share and customer review sentiment.",
    },
    {
      name: "Discounts & Value",
      weight: "15%",
      description:
        "Household, loyalty, payment mode, and other available premium discounts.",
    },
  ],
  lastUpdated: "January 2026",
  dataSource: "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database",
};

export const FLORIDA_STATS = {
  totalMedicareEnrollees: "4.8 million",
  medigapEnrollees: "930,000+",
  averagePlanGPremium: "$237/mo",
  averagePlanNPremium: "$180/mo",
  lowestPlanGPremium: "$194/mo",
  lowestPlanNPremium: "$144/mo",
  numberOfCarriers: "28+",
  hasBirthdayRule: false,
  ratingType: "Attained-age (most carriers)",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$257",
  partADeductible2026: "$1,676",
};

export const FLORIDA_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Florida?",
    answer:
      "Plan G is the most popular and recommended Medicare Supplement plan in Florida for anyone who became eligible for Medicare after January 1, 2020. It covers all out-of-pocket costs except the annual Part B deductible ($257 in 2026). Plan N is a strong alternative if you want lower premiums and do not mind small copays for office and ER visits.",
  },
  {
    question: "How much does Medigap Plan G cost in Florida?",
    answer:
      "Plan G premiums in Florida range from approximately $194 to $400 per month for a 65-year-old, depending on the carrier, your county, gender, and tobacco use. The statewide average is around $237 per month. Carriers like State Farm and Wellabe tend to offer the lowest rates in many Florida counties.",
  },
  {
    question: "Does Florida have a Medigap birthday rule?",
    answer:
      "No, Florida does not have a birthday rule for Medicare Supplement plans. Unlike states such as California, Oregon, and Illinois, Florida does not offer an annual guaranteed-issue window to switch Medigap carriers without medical underwriting. Your best opportunity to enroll without health questions is during your initial 6-month Medigap Open Enrollment Period when you first turn 65 and enroll in Part B.",
  },
  {
    question: "Can I switch Medigap plans in Florida after my open enrollment ends?",
    answer:
      "Yes, but you will likely need to pass medical underwriting (health questions). Florida does not provide a guaranteed-issue period for switching outside of your initial enrollment. Some carriers may decline your application or charge higher rates based on pre-existing conditions. This is why choosing the right carrier during your initial enrollment is especially important in Florida.",
  },
  {
    question: "How many companies sell Medicare Supplement plans in Florida?",
    answer:
      "Over 28 insurance companies offer Medicare Supplement plans in Florida, making it one of the most competitive Medigap markets in the country. This competition benefits consumers through lower premiums and more plan options. Top carriers include State Farm, AARP/UnitedHealthcare, Mutual of Omaha, Cigna (HealthSpring), and Aetna.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Florida?",
    answer:
      "Both Plan G and Plan N cover Part A hospital costs, Part B coinsurance, skilled nursing coinsurance, and the Part A deductible. The key differences: Plan G also covers Part B excess charges and has no copays. Plan N has lower premiums but charges up to $20 for office visits and up to $50 for ER visits that do not result in admission. Plan N also does not cover Part B excess charges (though these are rare in Florida since most doctors accept Medicare assignment).",
  },
  {
    question: "When is the best time to buy a Medigap plan in Florida?",
    answer:
      "The best time is during your 6-month Medigap Open Enrollment Period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, insurance companies cannot deny you coverage or charge higher premiums due to health conditions. After this period, you may face medical underwriting in Florida.",
  },
  {
    question:
      "Are Medicare Supplement premiums tax-deductible in Florida?",
    answer:
      "Medicare Supplement premiums may be tax-deductible as a medical expense on your federal income tax return if your total medical expenses exceed 7.5% of your adjusted gross income. Florida has no state income tax, so there is no additional state deduction to consider. Consult a tax professional for guidance specific to your situation.",
  },
];
