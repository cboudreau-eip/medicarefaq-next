/**
 * Pennsylvania Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (2026),
 *         Pennsylvania Insurance Department, AHIP State of Medicare Supplement Coverage 2026
 * Sample premiums: 65-year-old female nonsmoker in Pittsburgh, PA
 * NOTE: Pennsylvania uses attained-age rating - premiums increase as you age.
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface PennsylvaniaCarrier {
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

export const PENNSYLVANIA_CARRIERS: PennsylvaniaCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$145",
    planNMonthly: "$105",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount available",
    pros: [
      "Highest AM Best financial rating (A++) - superior financial strength",
      "Excellent complaint record - far fewer than expected",
      "Broad plan selection (6 plan types including Plan D)",
      "Trusted national brand with strong local agent network in Pennsylvania",
    ],
    cons: [
      "Premiums slightly above the lowest available in Pennsylvania",
      "Below-average premium discounts compared to some competitors",
      "Must work through a State Farm agent - no direct online enrollment",
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
    planGMonthly: "$165",
    planNMonthly: "$120",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in Pennsylvania (8 plan types)",
      "Excellent complaint record - far fewer than expected",
      "Largest Medicare Supplement insurer nationwide",
      "Strong household and loyalty discounts",
    ],
    cons: [
      "AARP membership required ($15–$20/year)",
      "Plan G and Plan N premiums higher than some competitors in Pennsylvania",
      "Rate increases can be above average over time",
    ],
    yearFounded: 1977,
    headquartersState: "Minnesota",
  },
  {
    id: "healthspring-cigna",
    name: "HealthSpring (Cigna)",
    displayName: "HealthSpring (formerly Cigna)",
    badge: "Best for Low Premiums",
    medicareFaqScore: 4.5,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$133",
    planNMonthly: "$95",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far more than expected",
    discounts: "Household discount, annual payment discount",
    pros: [
      "Lowest Plan G and Plan N premiums among top-rated carriers in Pennsylvania",
      "Strong parent company (Cigna/Evernorth) financial backing",
      "Competitive pricing makes it a strong value pick",
      "Available statewide in Pennsylvania",
    ],
    cons: [
      "Far more complaints than expected - highest complaint rate among our top picks",
      "Fewer plan options (4 plan types)",
      "Customer service quality concerns reflected in complaint data",
    ],
    yearFounded: 1981,
    headquartersState: "Tennessee",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.4,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$150",
    planNMonthly: "$108",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12%) - among the highest available",
      "Strong financial rating (A+)",
      "Excellent complaint record",
      "Competitive Plan G pricing in Pennsylvania",
    ],
    cons: [
      "Fewer plan options (4 plan types)",
      "Base premiums before discounts can be higher than lowest-cost carriers",
      "No multi-policy discount",
    ],
    yearFounded: 1909,
    headquartersState: "Nebraska",
  },
  {
    id: "wellabe",
    name: "Wellabe",
    displayName: "Wellabe",
    badge: "Budget-Friendly Option",
    medicareFaqScore: 4.2,
    amBestRating: "A-",
    amBestOutlook: "Stable",
    planGMonthly: "$138",
    planNMonthly: "$98",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "Competitive premiums - among the lowest Plan G rates in Pennsylvania",
      "Solid AM Best rating (A-)",
      "Available statewide in Pennsylvania",
      "Good value for budget-conscious enrollees",
    ],
    cons: [
      "Less name recognition than top carriers",
      "Fewer plan options (4 plan types)",
      "AM Best rating slightly lower than top-tier carriers",
    ],
    yearFounded: 1939,
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
        "Plan G and Plan N premiums compared to the Pennsylvania state average for a 65-year-old female nonsmoker in Pittsburgh.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in Pennsylvania.",
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
  dataSource:
    "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet, Pennsylvania Insurance Department",
};

export const PENNSYLVANIA_STATS = {
  totalMedicareEnrollees: "~2.8 million",
  medigapEnrollees: "~680,000",
  averagePlanGPremium: "$148/mo",
  averagePlanNPremium: "$107/mo",
  lowestPlanGPremium: "$133/mo",
  lowestPlanNPremium: "$95/mo",
  numberOfCarriers: "30+",
  hasCommunityRating: false,
  hasGuaranteedIssueYearRound: false,
  hasBirthdayRule: false,
  ratingType: "Attained-age - premiums increase as you age",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
  mostPopularPlan: "Plan G (37% of enrollees)",
};

export const PENNSYLVANIA_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Pennsylvania?",
    answer:
      "Plan G is the most popular Medicare Supplement plan in Pennsylvania, held by 37% of Medigap enrollees. It covers all out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan N is a strong alternative with lower premiums but small copays for office and ER visits. State Farm, AARP/UnitedHealthcare, and HealthSpring are consistently top-rated carriers in Pennsylvania.",
  },
  {
    question: "How much does Medigap Plan G cost in Pennsylvania?",
    answer:
      "Plan G premiums in Pennsylvania are among the most affordable in the country. In Pittsburgh, Plan G starts at approximately $133 per month for a 65-year-old female nonsmoker. Rates vary by city - Philadelphia rates tend to be slightly higher. Pennsylvania uses attained-age rating, so premiums will increase as you age.",
  },
  {
    question: "Does Pennsylvania have a birthday rule?",
    answer:
      "No. Pennsylvania does not currently have a birthday rule. A bill was proposed in the Pennsylvania House in September 2025, but it had not been passed into law as of early 2026. This means you can only switch Medigap plans without medical underwriting during your initial 6-month Open Enrollment Period or other qualifying guaranteed issue periods.",
  },
  {
    question: "When is the best time to enroll in Medigap in Pennsylvania?",
    answer:
      "The best time to enroll is during your 6-month Medigap Open Enrollment Period (OEP), which begins the month you turn 65 and enroll in Medicare Part B. During this window, carriers cannot deny you coverage or charge more due to health conditions. Once your OEP ends, you may face medical underwriting if you want to change plans.",
  },
  {
    question: "What is attained-age rating in Pennsylvania?",
    answer:
      "Pennsylvania uses attained-age rating, which means your Medigap premium increases as you get older. Premiums are based on your current age and rise each year. This is the most common rating method in the U.S. It means locking in a plan during your OEP at age 65 is important - you'll start at the lowest possible rate.",
  },
  {
    question: "Can I switch Medigap plans in Pennsylvania?",
    answer:
      "After your initial Open Enrollment Period, switching Medigap plans in Pennsylvania typically requires passing medical underwriting - meaning carriers can deny you or charge more based on health conditions. Exceptions include guaranteed issue periods (such as losing employer coverage or moving out of a plan's service area). Pennsylvania does not have a birthday rule, so there is no annual guaranteed switch window.",
  },
  {
    question: "What is PA MEDI and how can it help me?",
    answer:
      "PA MEDI (Pennsylvania Medicare Education and Decision Insight) is Pennsylvania's State Health Insurance Assistance Program (SHIP). It provides free, unbiased Medicare counseling from trained volunteers. PA MEDI counselors can help you compare Medigap plans, understand your options, and enroll in the right coverage. Contact them through the Pennsylvania Insurance Department.",
  },
  {
    question: "How many companies sell Medicare Supplement plans in Pennsylvania?",
    answer:
      "Over 30 insurance companies are licensed to sell Medicare Supplement plans in Pennsylvania. Top carriers include State Farm, AARP/UnitedHealthcare, HealthSpring (formerly Cigna), Mutual of Omaha, and Wellabe. The Pennsylvania Insurance Department maintains an official listing of all licensed Medigap carriers.",
  },
];
