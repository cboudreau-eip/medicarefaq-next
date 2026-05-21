/**
 * Illinois Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (2026),
 *         Illinois Department of Insurance, AHIP State of Medicare Supplement Coverage 2026
 * Sample premiums: 65-year-old female nonsmoker in Chicago, IL
 * NOTE: Illinois uses attained-age rating — premiums increase as you age.
 * Key differentiator: BCBS of Illinois dominates with 48.2% market share.
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface IllinoisCarrier {
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

export const ILLINOIS_CARRIERS: IllinoisCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$197",
    planNMonthly: "$149",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount available",
    pros: [
      "Highest AM Best financial rating (A++) — superior financial strength",
      "Excellent complaint record — far fewer than expected",
      "Broad plan selection (6 plan types including Plan D)",
      "State Farm is headquartered in Bloomington, IL — strong Illinois roots and agent network",
    ],
    cons: [
      "Plan G ($197/mo) and Plan N ($149/mo) are the highest premiums among our top Illinois picks",
      "Below-average premium discounts compared to competitors",
      "Must work through a State Farm agent — no direct online enrollment",
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
    planGMonthly: "$138",
    planNMonthly: "$93",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in Illinois (8 plan types)",
      "Excellent complaint record — far fewer than expected",
      "Second-largest Medigap insurer in Illinois (14.1% market share)",
      "Competitive Plan G pricing at $138/mo — strong value vs. service quality",
    ],
    cons: [
      "AARP membership required ($15–$20/year)",
      "Plan N premium ($93/mo) is mid-range — not the absolute lowest",
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
    planGMonthly: "$118",
    planNMonthly: "$78",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far more than expected",
    discounts: "Household discount, annual payment discount",
    pros: [
      "Lowest Plan G ($118/mo) and Plan N ($78/mo) in Chicago — strong budget value",
      "Strong parent company (Cigna/Evernorth) financial backing",
      "Available statewide in Illinois",
      "Above-average discounts available",
    ],
    cons: [
      "Far more complaints than expected — highest complaint rate among our top picks",
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
    planGMonthly: "$177",
    planNMonthly: "$121",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12%) — among the highest available",
      "Strong financial rating (A+)",
      "Excellent complaint record — far fewer than expected",
      "Third-largest Medigap insurer in Illinois (13.3% market share)",
    ],
    cons: [
      "Plan G ($177/mo) is the second-highest premium among our top picks",
      "Fewer plan options (4 plan types)",
      "No multi-policy discount",
    ],
    yearFounded: 1909,
    headquartersState: "Nebraska",
  },
  {
    id: "wellabe",
    name: "Wellabe",
    displayName: "Wellabe",
    badge: "Best Budget Option",
    medicareFaqScore: 4.2,
    amBestRating: "A-",
    amBestOutlook: "Stable",
    planGMonthly: "$124",
    planNMonthly: "$94",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "Second-lowest Plan G ($124/mo) — strong budget value with reasonable service",
      "Better complaint record than HealthSpring — close to expected",
      "Good balance of price and quality for cost-conscious enrollees",
      "Available statewide in Illinois",
    ],
    cons: [
      "Lower AM Best rating (A-) compared to top picks",
      "Fewer plan options (4 plan types)",
      "Less name recognition than larger national carriers",
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
        "Plan G and Plan N premiums compared to the Illinois state average for a 65-year-old female nonsmoker in Chicago.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in Illinois.",
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
    "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet, Illinois Department of Insurance",
};

export const ILLINOIS_STATS = {
  totalMedicareEnrollees: "~2.2 million",
  medigapEnrollees: "~750,000",
  averagePlanGPremium: "$151/mo",
  averagePlanNPremium: "$107/mo",
  lowestPlanGPremium: "$113/mo",
  lowestPlanNPremium: "$78/mo",
  numberOfCarriers: "30+",
  hasCommunityRating: false,
  hasGuaranteedIssueYearRound: false,
  hasBirthdayRule: false,
  ratingType: "Attained-age — premiums increase as you age",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
  mostPopularPlan: "Plan G (45%) and Plan F (44%) — unusually high Plan F legacy adoption",
  dominantLocalCarrier: "Blue Cross Blue Shield of Illinois (48.2% market share)",
};

export const ILLINOIS_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Illinois?",
    answer:
      "Plan G is the most popular Medicare Supplement plan for new enrollees in Illinois, covering all out-of-pocket costs except the annual Part B deductible ($283 in 2026). Illinois also has unusually high Plan F adoption (44%) among legacy enrollees. State Farm, AARP/UnitedHealthcare, and HealthSpring are consistently top-rated carriers in Illinois.",
  },
  {
    question: "How much does Medigap Plan G cost in Illinois?",
    answer:
      "In Chicago, Plan G starts at approximately $113 per month for a 65-year-old female nonsmoker — offered by HealthSpring. AARP/UnitedHealthcare offers Plan G at $138/mo with a better complaint record. Wellabe offers a middle ground at $124/mo. Illinois uses attained-age rating, so premiums increase as you age.",
  },
  {
    question: "Why does Blue Cross Blue Shield of Illinois have such a large market share?",
    answer:
      "Blue Cross Blue Shield of Illinois holds 48.2% of the state's Medigap market — the largest share of any carrier in any state we've reviewed. BCBS of Illinois has deep roots in the state, strong brand recognition, and a broad provider network. While not in NerdWallet's national top-rated list, it is a major carrier worth comparing when shopping for Medigap in Illinois.",
  },
  {
    question: "Does Illinois have a birthday rule?",
    answer:
      "No. Illinois does not have a birthday rule. You can only switch Medigap plans without medical underwriting during your initial 6-month Open Enrollment Period or other qualifying guaranteed issue periods. After your OEP ends, carriers can use medical underwriting to deny coverage or charge more based on health conditions.",
  },
  {
    question: "What is the Illinois SHIP program?",
    answer:
      "Illinois has a Senior Health Insurance Program (SHIP) that provides free, unbiased Medicare counseling from trained volunteers. SHIP counselors can help you compare Medigap plans, understand your options, and navigate enrollment. The program is available to all Illinois Medicare beneficiaries and their families at no cost.",
  },
  {
    question: "Why is Plan F still so popular in Illinois?",
    answer:
      "Illinois has one of the highest Plan F adoption rates in the country at 44%. Plan F covers the Part B deductible in addition to all other out-of-pocket costs, making it the most comprehensive Medigap plan. However, Plan F is no longer available to new Medicare enrollees who became eligible on or after January 1, 2020. Existing Plan F enrollees can keep their coverage, but new enrollees must choose Plan G as the closest alternative.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Illinois?",
    answer:
      "Both plans cover the Part A deductible ($1,736 in 2026) and most coinsurance costs. Plan G covers everything except the Part B deductible ($283/year) with no copays. Plan N also skips the Part B deductible but adds up to $20 copays for some office visits and up to $50 for ER visits that do not result in admission. In Chicago, Plan G averages about $151/mo vs. Plan N at $107/mo.",
  },
  {
    question: "When is the best time to enroll in Medigap in Illinois?",
    answer:
      "The best time to enroll is during your 6-month Medigap Open Enrollment Period (OEP), which begins the first month you are 65 or older and enrolled in Medicare Part B. During this window, carriers cannot deny you coverage or charge more due to health conditions. Illinois uses attained-age rating, so enrolling at 65 locks in the lowest possible starting premium.",
  },
];
