/**
 * New York Medicare Supplement Carrier Data
 * Source: CMS Medicare Plan Finder, AM Best, NAIC, NerdWallet (2026),
 *         NY Department of Financial Services (DFS) May 2026 Rate Tables,
 *         Medicare Interactive (medicareinteractive.org)
 * Sample premiums: 65-year-old female nonsmoker in New York City (NYC region)
 * NOTE: New York uses community rating - premiums are the same regardless of age or health.
 *       Premiums vary by region, not by individual characteristics.
 * MedicareFAQ Score methodology: weighted composite of financial strength,
 * pricing competitiveness, plan availability, complaint record, and discounts.
 */

export interface NewYorkCarrier {
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

export const NEW_YORK_CARRIERS: NewYorkCarrier[] = [
  {
    id: "aarp-unitedhealthcare",
    name: "AARP/UnitedHealthcare",
    displayName: "AARP/UnitedHealthcare",
    badge: "Best Overall",
    medicareFaqScore: 4.7,
    amBestRating: "A+",
    amBestOutlook: "Stable",
    planGMonthly: "$395",
    planNMonthly: "$290",
    plansOffered: ["A", "B", "C", "F", "G", "K", "L", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household, payment mode, and loyalty discounts",
    pros: [
      "Most plan options available in New York (8 plan types)",
      "Excellent complaint record - far fewer than expected",
      "Largest Medicare Supplement insurer nationwide",
      "Strong household and loyalty discounts",
    ],
    cons: [
      "AARP membership required ($15–$20/year)",
      "Plan G and Plan N premiums higher than some competitors",
      "Rate increases can be above average in some NY regions",
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
    planGMonthly: "$380",
    planNMonthly: "$275",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Far fewer than expected",
    discounts: "Household discount (up to 12%), annual payment discount",
    pros: [
      "Generous household discount (up to 12%) - among the highest available",
      "Strong financial rating (A+)",
      "Excellent complaint record",
      "Competitive Plan G pricing in New York",
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
    id: "anthem-empire",
    name: "Anthem/Empire BCBS",
    displayName: "Anthem / Empire BlueCross BlueShield",
    badge: "Best for New York Residents",
    medicareFaqScore: 4.3,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$420",
    planNMonthly: "$310",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "Deep New York roots - Empire BCBS is one of the most recognized brands in NY",
      "Accepted by a wide network of New York doctors and hospitals",
      "Strong brand recognition among New York seniors",
      "Solid financial backing (Elevance Health)",
    ],
    cons: [
      "Premiums higher than some competitors in New York",
      "Complaint rate close to expected (not best in class)",
      "Fewer plan options (4 plan types)",
    ],
    yearFounded: 1934,
    headquartersState: "New York",
  },
  {
    id: "humana",
    name: "Humana",
    displayName: "Humana",
    badge: "Best for Lower Premiums",
    medicareFaqScore: 4.1,
    amBestRating: "A-",
    amBestOutlook: "Stable",
    planGMonthly: "$370",
    planNMonthly: "$264",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Close to expected",
    discounts: "Household discount available",
    pros: [
      "Among the most competitive Plan G and Plan N premiums in NYC",
      "Strong national presence and member resources",
      "Solid digital tools and online account management",
      "Available across all NY regions",
    ],
    cons: [
      "AM Best rating slightly lower than top-tier carriers (A-)",
      "Complaint rate close to expected",
      "Fewer plan options (4 plan types)",
    ],
    yearFounded: 1961,
    headquartersState: "Kentucky",
  },
  {
    id: "transamerica",
    name: "Transamerica",
    displayName: "Transamerica",
    badge: "Budget-Friendly Option",
    medicareFaqScore: 3.9,
    amBestRating: "A",
    amBestOutlook: "Stable",
    planGMonthly: "$360",
    planNMonthly: "$260",
    plansOffered: ["A", "F", "G", "N"],
    complaintRecord: "Higher than expected",
    discounts: "Household discount available",
    pros: [
      "Competitive premiums - among the lowest Plan G rates in New York",
      "Solid AM Best rating (A)",
      "Available statewide in New York",
      "Straightforward plan options",
    ],
    cons: [
      "Higher-than-expected complaint rate",
      "Fewer plan options (4 plan types)",
      "Less name recognition than top carriers",
    ],
    yearFounded: 1928,
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
        "Plan G and Plan N premiums compared to the New York state average for a 65-year-old in the NYC region.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of standardized Medigap plan letters offered in New York.",
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
    "CMS Medicare Plan Finder, AM Best, NAIC Complaint Database, NerdWallet, NY DFS May 2026 Rate Tables",
};

export const NEW_YORK_STATS = {
  totalMedicareEnrollees: "~4.2 million",
  medigapEnrollees: "~465,000",
  averagePlanGPremium: "$395/mo",
  averagePlanNPremium: "$285/mo",
  lowestPlanGPremium: "$362/mo",
  lowestPlanNPremium: "$264/mo",
  numberOfCarriers: "15+",
  hasCommunityRating: true,
  hasGuaranteedIssueYearRound: true,
  hasBirthdayRule: false,
  ratingType: "Community-rated (no-age-rated) - premiums same regardless of age or health",
  freeLookPeriod: "30 days",
  partBDeductible2026: "$283",
  partADeductible2026: "$1,736",
};

export const NEW_YORK_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in New York?",
    answer:
      "Plan G is the most comprehensive Medicare Supplement plan available to new Medicare enrollees in New York. It covers all out-of-pocket costs except the annual Part B deductible ($283 in 2026). Plan N is a strong alternative if you want lower premiums and don't mind small copays for office and ER visits. Because New York uses community rating, premiums are the same for everyone in your region regardless of age or health - making it especially important to compare rates across carriers.",
  },
  {
    question: "How much does Medigap Plan G cost in New York?",
    answer:
      "Plan G premiums in New York are significantly higher than most states because of New York's community rating and guaranteed issue rules. In New York City, Plan G premiums range from approximately $362 to $500+ per month, depending on the carrier and your region. Upstate New York regions tend to have lower premiums than NYC. The statewide average for Plan G is around $395 per month.",
  },
  {
    question: "Why are Medigap premiums so high in New York?",
    answer:
      "New York's community rating and guaranteed issue rules - which are among the most consumer-friendly in the country - result in higher premiums than most states. Because insurers must sell Medigap to anyone with Medicare at any time, regardless of health status, and cannot charge more based on age or pre-existing conditions, they spread the risk across all enrollees. This means younger, healthier people pay more than they would in other states, while older or sicker people pay less. The tradeoff is that you can switch plans any time without medical underwriting.",
  },
  {
    question: "Does New York have a birthday rule?",
    answer:
      "No. New York does not have a birthday rule because it does not need one. New York has guaranteed issue year-round - meaning you can switch Medigap plans at any time, any month of the year, without answering health questions or passing medical underwriting. This is a far stronger protection than the birthday rule offered in California and a few other states.",
  },
  {
    question: "Can I switch Medigap plans in New York at any time?",
    answer:
      "Yes. New York is one of only a handful of states that requires insurers to offer guaranteed issue Medigap coverage year-round. This means you can switch carriers, switch plan types, or enroll in Medigap for the first time at any point during the year - no open enrollment window required, no medical underwriting, no health questions. This is one of the most significant consumer protections in the country for Medicare beneficiaries.",
  },
  {
    question: "What is community rating in New York?",
    answer:
      "Community rating (also called no-age-rated pricing) means that Medigap premiums in New York are the same for everyone in the same geographic region, regardless of age, gender, or health status. A 65-year-old and an 85-year-old in the same region pay the same monthly premium for the same plan. This is very different from most states, where premiums increase as you age (attained-age rating) or are set based on your age when you first enroll (issue-age rating).",
  },
  {
    question: "Does New York require Medigap coverage for people under 65?",
    answer:
      "Yes. Unlike most states, New York requires Medigap carriers to sell plans to Medicare beneficiaries under 65 who qualify for Medicare due to disability. In most states, carriers are not required to offer Medigap to people under 65, and those who can find coverage often pay much higher premiums. New York's law provides important protections for younger Medicare beneficiaries.",
  },
  {
    question: "How many companies sell Medicare Supplement plans in New York?",
    answer:
      "Over 15 insurance companies are licensed to offer Medicare Supplement plans in New York, according to the New York Department of Financial Services (DFS). Top carriers include AARP/UnitedHealthcare, Anthem/Empire BlueCross BlueShield, Mutual of Omaha, Humana, and Transamerica. The DFS publishes official monthly rate tables for all licensed carriers at dfs.ny.gov.",
  },
];
