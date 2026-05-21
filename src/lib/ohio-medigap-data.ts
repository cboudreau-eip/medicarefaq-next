/**
 * Ohio Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (2026),
 *         Ohio Department of Insurance, AHIP State of Medicare Supplement Coverage 2026
 * Sample premiums: 65-year-old female nonsmoker in Columbus, OH
 * NOTE: Ohio uses attained-age rating - premiums increase as you age.
 * Ohio has some of the lowest Medigap premiums in the country.
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface OhioCarrier {
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

export const OHIO_CARRIERS: OhioCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$155",
    planNMonthly: "$118",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount available",
    pros: [
      "Highest AM Best financial rating (A++) - superior financial strength",
      "Excellent complaint record - far fewer than expected",
      "Broad plan selection (6 plan types including Plan D)",
      "Strong local agent network across Ohio - Columbus, Cleveland, Cincinnati",
    ],
    cons: [
      "Plan G premiums are the highest among our top Ohio picks",
      "Below-average premium discounts compared to competitors",
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
    planGMonthly: "$127",
    planNMonthly: "$89",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in Ohio (8 plan types)",
      "Excellent complaint record - far fewer than expected",
      "#1 largest Medigap insurer in Ohio (38% market share)",
      "Competitive Plan G pricing at $127/mo - strong value vs. service quality",
    ],
    cons: [
      "AARP membership required ($15–$20/year)",
      "Plan N premium ($89/mo) is competitive but not the absolute lowest",
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
    planGMonthly: "$106",
    planNMonthly: "$77",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far more than expected",
    discounts: "Household discount, annual payment discount",
    pros: [
      "Lowest Plan G ($106/mo) and Plan N ($77/mo) in Ohio - among cheapest in the country",
      "Strong parent company (Cigna/Evernorth) financial backing",
      "Exceptional value for budget-conscious enrollees",
      "Available statewide in Ohio",
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
    id: "anthem",
    name: "Anthem",
    displayName: "Anthem Blue Cross Blue Shield",
    badge: "Best Local Coverage",
    medicareFaqScore: 4.4,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$138",
    planNMonthly: "$128",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "Third-largest Medigap insurer in Ohio (11.2% market share) - strong local presence",
      "Anthem Blue Cross Blue Shield brand well-recognized in Ohio",
      "Solid AM Best rating (A)",
      "Complaint record close to expected - reasonable customer service",
    ],
    cons: [
      "Plan N premium ($128/mo) is the highest among our top Ohio picks",
      "Fewer plan options (4 plan types)",
      "Plan G premium ($138/mo) is mid-range - not the most competitive",
    ],
    yearFounded: 1944,
    headquartersState: "Indiana",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.3,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$134",
    planNMonthly: "$89",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12%) - among the highest available",
      "Strong financial rating (A+)",
      "Excellent complaint record",
      "Plan N tied for lowest at $89/mo - matches AARP/UHC",
    ],
    cons: [
      "Fewer plan options (4 plan types)",
      "Plan G base premium ($134/mo) before discounts is mid-range",
      "No multi-policy discount",
    ],
    yearFounded: 1909,
    headquartersState: "Nebraska",
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
        "Plan G and Plan N premiums compared to the Ohio state average for a 65-year-old female nonsmoker in Columbus.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in Ohio.",
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
    "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet, Ohio Department of Insurance",
};

export const OHIO_STATS = {
  totalMedicareEnrollees: "~2.4 million",
  medigapEnrollees: "~600,000",
  averagePlanGPremium: "$132/mo",
  averagePlanNPremium: "$97/mo",
  lowestPlanGPremium: "$106/mo",
  lowestPlanNPremium: "$77/mo",
  numberOfCarriers: "30+",
  hasCommunityRating: false,
  hasGuaranteedIssueYearRound: false,
  hasBirthdayRule: false,
  ratingType: "Attained-age - premiums increase as you age",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
  mostPopularPlan: "Plan G (49% of enrollees - highest adoption rate in the Midwest)",
};

export const OHIO_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Ohio?",
    answer:
      "Plan G is the most popular Medicare Supplement plan in Ohio, held by 49% of Medigap enrollees - one of the highest Plan G adoption rates in the country. It covers all out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan N is a strong alternative with lower premiums but small copays for office and ER visits. State Farm, AARP/UnitedHealthcare, and HealthSpring are consistently top-rated carriers in Ohio.",
  },
  {
    question: "How much does Medigap Plan G cost in Ohio?",
    answer:
      "Ohio has some of the lowest Medigap premiums in the country. In Columbus, Plan G starts at approximately $106 per month for a 65-year-old female nonsmoker - offered by HealthSpring. AARP/UnitedHealthcare offers Plan G at $127/mo with a better complaint record. Rates in Cleveland and Cincinnati may vary slightly. Ohio uses attained-age rating, so premiums will increase as you age.",
  },
  {
    question: "Does Ohio have a birthday rule?",
    answer:
      "No. Ohio does not have a birthday rule. This means you can only switch Medigap plans without medical underwriting during your initial 6-month Open Enrollment Period or other qualifying guaranteed issue periods. After your OEP ends, carriers can use medical underwriting to deny coverage or charge more based on health conditions.",
  },
  {
    question: "What is OSHIIP and how can it help me?",
    answer:
      "OSHIIP (Ohio Senior Health Insurance Information Program) is Ohio's State Health Insurance Assistance Program (SHIP). It provides free, unbiased Medicare counseling from trained volunteers. OSHIIP counselors can help you compare Medigap plans, understand your options, and navigate enrollment. The program is available to all Ohio Medicare beneficiaries and their families.",
  },
  {
    question: "Why are Ohio Medigap premiums so low?",
    answer:
      "Ohio consistently has some of the lowest Medigap premiums in the country, particularly in Columbus. Lower healthcare costs in Ohio compared to coastal states, a competitive insurance market with many carriers, and Ohio's attained-age rating structure all contribute to lower premiums. Plan G starting at $106/mo in Columbus is exceptional value compared to states like New York ($362/mo) or California ($166/mo).",
  },
  {
    question: "What is the difference between Plan G and Plan N in Ohio?",
    answer:
      "Both plans cover the Part A deductible ($1,736 in 2026) and most coinsurance costs. Plan G covers everything except the Part B deductible ($283/year) and has no copays. Plan N also skips the Part B deductible but adds up to $20 copays for some office visits and up to $50 for ER visits that do not result in admission. In Columbus, Plan G averages about $132/mo vs. Plan N at $97/mo - a $35/mo difference.",
  },
  {
    question: "Who are the largest Medicare Supplement carriers in Ohio?",
    answer:
      "The five largest Medigap carriers in Ohio by membership are: AARP/UnitedHealthcare (38%), Medical Mutual of Ohio (19.3%), Anthem Blue Cross Blue Shield (11.2%), Humana (5.7%), and Mutual of Omaha (5.4%). Medical Mutual of Ohio is a notable local carrier with strong Ohio roots that is worth comparing alongside national carriers.",
  },
  {
    question: "When is the best time to enroll in Medigap in Ohio?",
    answer:
      "The best time to enroll is during your 6-month Medigap Open Enrollment Period (OEP), which begins the month you turn 65 and enroll in Medicare Part B. During this window, carriers cannot deny you coverage or charge more due to health conditions. Ohio uses attained-age rating, so enrolling at 65 locks in the lowest possible starting premium.",
  },
];
