/**
 * Texas Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (Feb 2026), TDI.texas.gov
 * Sample premiums: 65-year-old female nonsmoker in Dallas, TX (with available discounts)
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface TexasCarrier {
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

export const TEXAS_CARRIERS: TexasCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$160",
    planNMonthly: "$112",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Multi-policy discount available",
    pros: [
      "Highest financial strength rating (A++) in the industry",
      "Competitive Plan G and Plan N premiums in Texas",
      "Excellent complaint record with regulators",
      "Wide plan selection (6 plan types)",
    ],
    cons: [
      "Limited premium discount options compared to competitors",
      "No online quote tool — must work through a local agent",
      "Not available in all Texas zip codes",
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
    planGMonthly: "$159",
    planNMonthly: "$136",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in Texas (8 plan types)",
      "Strong household and loyalty discounts",
      "Largest Medicare Supplement insurer nationwide",
      "Excellent complaint record",
    ],
    cons: [
      "Plan N premiums higher than some competitors",
      "AARP membership required ($15–$20/year)",
      "Rate increases can be above average in some areas",
    ],
    yearFounded: 1977,
    headquartersState: "Minnesota",
  },
  {
    id: "cigna-healthspring",
    name: "HealthSpring (Cigna)",
    displayName: "HealthSpring (formerly Cigna)",
    badge: "Best for Low Premiums",
    medicareFaqScore: 4.5,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$145",
    planNMonthly: "$106",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Higher than expected",
    discounts: "Up to 25% (20% premium + 5% online enrollment)",
    pros: [
      "Lowest Plan G and Plan N premiums among top-rated carriers in Texas",
      "Up to 25% discount (20% premium + 5% online)",
      "Strong digital tools and member portal",
      "Available in 48 states + DC",
    ],
    cons: [
      "Higher-than-expected complaint rate",
      "Fewer plan options (4 plan types)",
      "Brand transitioning from Cigna to HealthSpring under HCSC",
    ],
    yearFounded: 1982,
    headquartersState: "Illinois",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.4,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$152",
    planNMonthly: "$115",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12% — among the highest in the industry)",
      "Strong financial rating (A+)",
      "Excellent complaint record",
      "Competitive Plan G and Plan N pricing in Texas",
    ],
    cons: [
      "Fewer plan options (4 plan types)",
      "Base premiums can be 20–30% higher than lowest-cost carriers before discounts",
      "No multi-policy discount",
    ],
    yearFounded: 1909,
    headquartersState: "Nebraska",
  },
  {
    id: "wellabe",
    name: "Wellabe",
    displayName: "Wellabe (formerly Medico)",
    badge: "Best Budget Option",
    medicareFaqScore: 4.2,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$154",
    planNMonthly: "$113",
    plansOffered: ["A", "F", "HD-F", "G", "HD-G", "N"],
    complaintRecord: "Fewer than expected",
    discounts: "Household discount available in select states",
    pros: [
      "Competitive Plan G and Plan N premiums in Texas",
      "Offers High-Deductible Plan G (HD-G) — a low-premium option",
      "A (Excellent) AM Best rating affirmed May 2025",
      "Good complaint record",
    ],
    cons: [
      "Only available in 28 states (not nationwide)",
      "Fewer plan options than some larger carriers",
      "Less brand recognition than top-tier carriers",
    ],
    yearFounded: 1930,
    headquartersState: "Iowa",
  },
];

/**
 * MedicareFAQ Scoring Methodology
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
        "Plan G and Plan N premiums compared to the Texas state average for a 65-year-old.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in Texas.",
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
  lastUpdated: "February 2026",
  dataSource: "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet",
};

export const TEXAS_STATS = {
  totalMedicareEnrollees: "4.5 million",
  medigapEnrollees: "~950,000",
  averagePlanGPremium: "$175/mo",
  averagePlanNPremium: "$130/mo",
  lowestPlanGPremium: "$105/mo",
  lowestPlanNPremium: "$80/mo",
  numberOfCarriers: "30+",
  hasBirthdayRule: false,
  ratingType: "Attained-age (most carriers)",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
};

export const TEXAS_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Texas?",
    answer:
      "Plan G is the most popular and recommended Medicare Supplement plan in Texas for anyone who became eligible for Medicare after January 1, 2020. It covers all out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan N is a strong alternative if you want lower premiums and don't mind small copays for office and ER visits.",
  },
  {
    question: "How much does Medigap Plan G cost in Texas?",
    answer:
      "Plan G premiums in Texas range from approximately $105 to $250 per month for a 65-year-old female nonsmoker in Dallas, depending on the carrier, your city, gender, and tobacco use. The statewide average is around $175 per month. HealthSpring (formerly Cigna) and State Farm tend to offer the lowest rates in many Texas markets.",
  },
  {
    question: "Does Texas have a Medigap birthday rule?",
    answer:
      "No, Texas does not have a birthday rule for Medicare Supplement plans. Unlike states such as California, Oregon, and Illinois, Texas does not offer an annual guaranteed-issue window to switch Medigap carriers without medical underwriting. Your best opportunity to enroll without health questions is during your initial 6-month Medigap Open Enrollment Period when you first turn 65 and enroll in Part B.",
  },
  {
    question: "Can I switch Medigap plans in Texas after my open enrollment ends?",
    answer:
      "Yes, but you will likely need to pass medical underwriting (health questions). Texas does not provide a guaranteed-issue period for switching outside of your initial enrollment window. Some carriers may decline your application or charge higher rates based on pre-existing conditions. This is why choosing the right carrier during your initial enrollment is especially important in Texas.",
  },
  {
    question: "How many companies sell Medicare Supplement plans in Texas?",
    answer:
      "Over 30 insurance companies offer Medicare Supplement plans in Texas, making it one of the largest and most competitive Medigap markets in the country. This competition benefits consumers through lower premiums and more plan options. Top carriers include State Farm, AARP/UnitedHealthcare, HealthSpring (formerly Cigna), Mutual of Omaha, and Wellabe.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Texas?",
    answer:
      "Both Plan G and Plan N cover Part A hospital costs, Part B coinsurance, skilled nursing coinsurance, and the Part A deductible. The key differences: Plan G also covers Part B excess charges and has no copays. Plan N has lower premiums but charges up to $20 for office visits and up to $50 for ER visits that do not result in admission. Plan N also does not cover Part B excess charges, though these are rare in Texas since most doctors accept Medicare assignment.",
  },
  {
    question: "When is the best time to buy a Medigap plan in Texas?",
    answer:
      "The best time is during your 6-month Medigap Open Enrollment Period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, insurance companies regulated by the Texas Department of Insurance (TDI) cannot deny you coverage or charge higher premiums due to health conditions. After this period, you may face medical underwriting.",
  },
  {
    question: "Does Texas regulate Medicare Supplement insurance?",
    answer:
      "Yes. Medicare Supplement plans in Texas are regulated by the Texas Department of Insurance (TDI). Texas follows federal standardization rules, meaning Plan G from any carrier covers the same benefits. TDI also enforces a 30-day free look period, allowing you to return a new policy for a full refund if you are not satisfied.",
  },
];
