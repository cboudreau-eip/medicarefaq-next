/**
 * North Carolina Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (2026),
 *         NC Department of Insurance, AHIP State of Medicare Supplement Coverage 2026
 * Sample premiums: 65-year-old female nonsmoker in Greensboro, NC
 * NOTE: North Carolina uses attained-age rating - premiums increase as you age.
 * Key differentiators: Highest Plan G adoption (49%), USAA in top 5 (military presence),
 *                      Wellabe is cheapest at $113/mo, fast-growing retirement destination.
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface NCCarrier {
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

export const NC_CARRIERS: NCCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$153",
    planNMonthly: "$116",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount available",
    pros: [
      "Highest AM Best financial rating (A++) - superior financial strength",
      "Excellent complaint record - far fewer than expected",
      "Broad plan selection (6 plan types including Plan D)",
      "Strong local agent network throughout North Carolina",
    ],
    cons: [
      "Plan G ($153/mo) and Plan N ($116/mo) are the highest premiums among our top NC picks",
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
    planGMonthly: "$117",
    planNMonthly: "$84",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in NC (8 plan types)",
      "Excellent complaint record - far fewer than expected",
      "Second-largest Medigap insurer in North Carolina (25.5% market share)",
      "Competitive Plan G pricing at $117/mo - strong value vs. service quality",
    ],
    cons: [
      "AARP membership required ($15–$20/year)",
      "Plan N premium ($84/mo) is mid-range - not the absolute lowest",
      "Rate increases can be above average over time",
    ],
    yearFounded: 1977,
    headquartersState: "Minnesota",
  },
  {
    id: "wellabe",
    name: "Wellabe",
    displayName: "Wellabe",
    badge: "Best for Low Premiums",
    medicareFaqScore: 4.5,
    amBestRating: "A-",
    amBestOutlook: "Stable",
    planGMonthly: "$113",
    planNMonthly: "$83",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "Lowest Plan G ($113/mo) and Plan N ($83/mo) among our top NC picks",
      "Better complaint record than HealthSpring - close to expected",
      "Good balance of price and quality for cost-conscious enrollees",
      "Available statewide in North Carolina",
    ],
    cons: [
      "Lower AM Best rating (A-) compared to top picks",
      "Fewer plan options (4 plan types)",
      "Less name recognition than larger national carriers",
    ],
    yearFounded: 1939,
    headquartersState: "Iowa",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.4,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$135",
    planNMonthly: "$87",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12%) - among the highest available",
      "Strong financial rating (A+)",
      "Excellent complaint record - far fewer than expected",
      "Third-largest Medigap insurer in North Carolina (15.3% market share)",
    ],
    cons: [
      "Plan G ($135/mo) is mid-range - not the cheapest option",
      "Fewer plan options (4 plan types)",
      "No multi-policy discount",
    ],
    yearFounded: 1909,
    headquartersState: "Nebraska",
  },
  {
    id: "healthspring-cigna",
    name: "HealthSpring (Cigna)",
    displayName: "HealthSpring (formerly Cigna)",
    badge: "Budget Option",
    medicareFaqScore: 4.2,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$130",
    planNMonthly: "$97",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far more than expected",
    discounts: "Household discount, annual payment discount",
    pros: [
      "Competitive Plan G pricing at $130/mo",
      "Strong parent company (Cigna/Evernorth) financial backing",
      "Available statewide in North Carolina",
      "Above-average discounts available",
    ],
    cons: [
      "Far more complaints than expected - highest complaint rate among our top NC picks",
      "Fewer plan options (4 plan types)",
      "Customer service quality concerns reflected in complaint data",
    ],
    yearFounded: 1981,
    headquartersState: "Tennessee",
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
        "Plan G and Plan N premiums compared to the North Carolina state average for a 65-year-old female nonsmoker in Greensboro.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in North Carolina.",
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
    "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet, NC Department of Insurance",
};

export const NC_STATS = {
  totalMedicareEnrollees: "~2.1 million",
  medigapEnrollees: "~460,000",
  averagePlanGPremium: "$130/mo",
  averagePlanNPremium: "$93/mo",
  lowestPlanGPremium: "$95/mo",
  lowestPlanNPremium: "$73/mo",
  numberOfCarriers: "30+",
  hasCommunityRating: false,
  hasGuaranteedIssueYearRound: false,
  hasBirthdayRule: false,
  ratingType: "Attained-age - premiums increase as you age",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
  mostPopularPlan: "Plan G (49%) - highest Plan G adoption of any state we've reviewed",
  shipName: "SHIIP (Medicare and Seniors' Health Insurance Information Program)",
  militaryNote: "Large military/veteran community - Fort Liberty (Bragg), Camp Lejeune, Seymour Johnson AFB",
};

export const NC_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in North Carolina?",
    answer:
      "Plan G is the most popular Medicare Supplement plan in North Carolina, with 49% of Medigap enrollees choosing it - the highest Plan G adoption rate of any state we've reviewed. Plan G covers all out-of-pocket costs except the annual Part B deductible ($283 in 2026). State Farm, AARP/UnitedHealthcare, and Wellabe are consistently top-rated carriers in NC.",
  },
  {
    question: "How much does Medigap Plan G cost in North Carolina?",
    answer:
      "In Greensboro, Plan G starts at approximately $95 per month for a 65-year-old female nonsmoker. Among our top-rated carriers, Wellabe offers Plan G at $113/mo with a reasonable complaint record. AARP/UnitedHealthcare offers Plan G at $117/mo with an excellent complaint record. North Carolina uses attained-age rating, so premiums increase as you age.",
  },
  {
    question: "Does North Carolina have a birthday rule?",
    answer:
      "No. North Carolina does not have a birthday rule. You can only switch Medigap plans without medical underwriting during your initial 6-month Open Enrollment Period or other qualifying guaranteed issue periods. After your OEP ends, carriers can use medical underwriting to deny coverage or charge more based on health conditions.",
  },
  {
    question: "Is USAA a good option for Medicare Supplement in North Carolina?",
    answer:
      "USAA is the 5th-largest Medigap insurer in North Carolina with 1.5% market share, reflecting the state's large military and veteran community (Fort Liberty, Camp Lejeune, Seymour Johnson AFB). USAA Medigap is available only to military members, veterans, and their families. If you qualify, USAA is worth comparing alongside national carriers.",
  },
  {
    question: "What is SHIIP in North Carolina?",
    answer:
      "SHIIP stands for Medicare and Seniors' Health Insurance Information Program - North Carolina's version of the federal SHIP program. SHIIP provides free, unbiased Medicare counseling from trained volunteers. Counselors can help you compare Medigap plans, understand your options, and navigate enrollment at no cost.",
  },
  {
    question: "Why does North Carolina have such high Plan G adoption?",
    answer:
      "North Carolina has the highest Plan G adoption rate of any state we've reviewed at 49%. This reflects the state's large and growing retirement population - Charlotte, Raleigh, and Asheville are among the most popular retirement destinations in the Southeast. Plan G is the most comprehensive Medigap option available to new enrollees, and NC's competitive pricing makes it an attractive choice.",
  },
  {
    question: "What is the difference between Plan G and Plan N in North Carolina?",
    answer:
      "Both plans cover the Part A deductible ($1,736 in 2026) and most coinsurance costs. Plan G covers everything except the Part B deductible ($283/year) with no copays. Plan N also skips the Part B deductible but adds up to $20 copays for some office visits and up to $50 for ER visits that do not result in admission. In Greensboro, Plan G averages about $130/mo vs. Plan N at $93/mo.",
  },
  {
    question: "When is the best time to enroll in Medigap in North Carolina?",
    answer:
      "The best time to enroll is during your 6-month Medigap Open Enrollment Period (OEP), which begins the first month you are 65 or older and enrolled in Medicare Part B. During this window, carriers cannot deny you coverage or charge more due to health conditions. North Carolina uses attained-age rating, so enrolling at 65 locks in the lowest possible starting premium.",
  },
];
