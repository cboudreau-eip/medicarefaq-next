/**
 * California Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (2026), CDI (April 2026)
 * Sample premiums: 65-year-old female nonsmoker in Los Angeles, CA (with available discounts)
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface CaliforniaCarrier {
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

export const CALIFORNIA_CARRIERS: CaliforniaCarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    amBestOutlook: "Stable",
    planGMonthly: "$170",
    planNMonthly: "$130",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Multi-policy discount available",
    pros: [
      "Highest financial strength rating (A++) in the industry",
      "Lowest Plan G and Plan N premiums among top-rated carriers in California",
      "Excellent complaint record - far fewer complaints than expected",
      "Wide plan selection (6 plan types)",
    ],
    cons: [
      "No online quote tool - must work through a local agent",
      "Limited premium discount options compared to some competitors",
      "Not available in all California zip codes",
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
    planGMonthly: "$185",
    planNMonthly: "$155",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in California (8 plan types)",
      "Strong household and loyalty discounts",
      "Largest Medicare Supplement insurer nationwide",
      "Excellent complaint record",
    ],
    cons: [
      "Plan G and Plan N premiums higher than some competitors",
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
    planGMonthly: "$166",
    planNMonthly: "$127",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Higher than expected",
    discounts: "Up to 25% (20% premium + 5% online enrollment)",
    pros: [
      "Lowest Plan G and Plan N premiums among top-rated carriers in California",
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
    id: "anthem",
    name: "Anthem Blue Cross",
    displayName: "Anthem Blue Cross",
    badge: "Best for California Residents",
    medicareFaqScore: 4.3,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$195",
    planNMonthly: "$160",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "California-based carrier with deep local roots",
      "Accepted by a wide network of California doctors",
      "Strong brand recognition among California seniors",
      "Solid financial backing (Elevance Health)",
    ],
    cons: [
      "Premiums higher than some competitors",
      "Complaint rate close to expected (not best in class)",
      "Fewer plan options (4 plan types)",
    ],
    yearFounded: 1944,
    headquartersState: "California",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.2,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$178",
    planNMonthly: "$140",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12% - among the highest in the industry)",
      "Strong financial rating (A+)",
      "Excellent complaint record",
      "Competitive Plan N pricing in California",
    ],
    cons: [
      "Fewer plan options (4 plan types)",
      "Base premiums can be higher than lowest-cost carriers before discounts",
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
        "Plan G and Plan N premiums compared to the California state average for a 65-year-old.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in California.",
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
  dataSource: "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet, CDI",
};

export const CALIFORNIA_STATS = {
  totalMedicareEnrollees: "7 million",
  medigapEnrollees: "~600,000",
  averagePlanGPremium: "$185/mo",
  averagePlanNPremium: "$145/mo",
  lowestPlanGPremium: "$166/mo",
  lowestPlanNPremium: "$127/mo",
  numberOfCarriers: "21+",
  hasBirthdayRule: true,
  birthdayRuleWindow: "60 days starting on your birthday",
  ratingType: "Attained-age and community-rated options available",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
};

export const CALIFORNIA_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in California?",
    answer:
      "Plan G is the most popular and recommended Medicare Supplement plan in California for anyone who became eligible for Medicare after January 1, 2020. It covers all out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan N is a strong alternative if you want lower premiums and don't mind small copays for office and ER visits. Note that Plan F is still available to those who became eligible before January 1, 2020.",
  },
  {
    question: "How much does Medigap Plan G cost in California?",
    answer:
      "Plan G premiums in California range from approximately $166 to $300+ per month for a 65-year-old female nonsmoker in Los Angeles, depending on the carrier, your city, gender, and tobacco use. The statewide average is around $185 per month. HealthSpring (formerly Cigna) and State Farm tend to offer the lowest rates in many California markets.",
  },
  {
    question: "What is California's Medigap birthday rule?",
    answer:
      "California's birthday rule, effective July 1, 2020, gives you a 60-day window starting on your birthday each year to switch your Medigap plan to a different carrier without medical underwriting. You must already be enrolled in a Medigap plan to use the birthday rule. The key limitation: you can only switch to a plan with equal or lesser benefits - for example, you can switch from Plan G at one carrier to Plan G at another (same benefits, potentially lower premium), or from Plan G to Plan N (lesser benefits). You cannot upgrade from Plan N to Plan G using the birthday rule.",
  },
  {
    question: "Can I use the birthday rule to get a lower premium?",
    answer:
      "Yes - that is the primary purpose of the birthday rule for most California beneficiaries. If you are on Plan G and find a carrier offering the same Plan G at a lower premium, you can switch during your 60-day birthday window without answering health questions. This is a significant advantage over states like Texas and Florida, where switching Medigap carriers after your initial enrollment period requires medical underwriting.",
  },
  {
    question: "Can I switch Medigap plans in California outside of my birthday window?",
    answer:
      "Outside of your birthday window and your initial 6-month Open Enrollment Period, you will generally need to pass medical underwriting to switch Medigap plans in California. Some carriers may decline your application or charge higher rates based on pre-existing conditions. The birthday rule is your annual guaranteed-issue opportunity to shop for a better rate.",
  },
  {
    question: "How many companies sell Medicare Supplement plans in California?",
    answer:
      "Over 21 insurance companies are licensed to offer Medicare Supplement plans in California, according to the California Department of Insurance (CDI). Top carriers include State Farm, AARP/UnitedHealthcare, HealthSpring (formerly Cigna), Anthem Blue Cross, Blue Shield of California, and Mutual of Omaha.",
  },
  {
    question: "What is the difference between Plan G and Plan N in California?",
    answer:
      "Both Plan G and Plan N cover Part A hospital costs, Part B coinsurance, skilled nursing coinsurance, and the Part A deductible. The key differences: Plan G also covers Part B excess charges and has no copays. Plan N has lower premiums but charges up to $20 for office visits and up to $50 for ER visits that do not result in admission. Plan N also does not cover Part B excess charges, though these are rare in California since most doctors accept Medicare assignment.",
  },
  {
    question: "Does California regulate Medicare Supplement insurance?",
    answer:
      "Yes. Medicare Supplement plans in California are regulated by the California Department of Insurance (CDI). California follows federal standardization rules, meaning Plan G from any carrier covers the same benefits. CDI also enforces a 30-day free-look period and the birthday rule, making California one of the most consumer-friendly Medigap states in the country.",
  },
];
