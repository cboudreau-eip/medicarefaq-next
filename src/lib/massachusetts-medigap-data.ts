export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  amBest: string;
  planGMonthly: string;
  planNMonthly: string;
  pros: string[];
  cons: string[];
  highlight: string;
}

export interface PremiumRow {
  carrier: string;
  planG: string;
  planN: string;
  planF: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const STATE_NAME = "Massachusetts";
export const STATE_ABBR = "MA";
export const SAMPLE_CITY = "Boston";

export const STATE_STATS = {
  enrollees: "340,000+",
  lowestPlanG: "$123/mo (Core Plan)",
  carriers: "8+",
  medicareTotal: "1.4M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Blue Cross Blue Shield of Massachusetts",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A",
    planGMonthly: "$233",
    planNMonthly: "N/A",
    pros: [
      "Largest Medigap insurer in Massachusetts with 70.9% market share",
      "Community-rated premiums same for all ages",
      "Continuous open enrollment year-round",
      "No pre-existing condition waiting periods",
      "Broad provider network across Massachusetts",
    ],
    cons: [
      "Supplement 1A premium is the highest among major carriers",
      "No Plan N equivalent available",
    ],
    highlight:
      "Blue Cross Blue Shield of Massachusetts dominates the state Medigap market with nearly 71% market share. Their community-rated pricing means a 75-year-old pays the same as a 65-year-old, and their continuous open enrollment lets you enroll or switch any month of the year without health questions.",
  },
  {
    rank: 2,
    name: "Harvard Pilgrim Health Care",
    badge: "Best Local Option",
    score: 4.7,
    amBest: "A-",
    planGMonthly: "$216",
    planNMonthly: "N/A",
    pros: [
      "Strong Massachusetts-based carrier with 15% market share",
      "Community-rated pricing",
      "Continuous open enrollment",
      "Competitive Supplement 1A pricing",
      "Excellent local provider relationships",
    ],
    cons: [
      "Primarily a Massachusetts carrier with limited national reach",
      "No Plan N equivalent",
    ],
    highlight:
      "Harvard Pilgrim Health Care is the second-largest Medigap insurer in Massachusetts with about 15% market share. As a Massachusetts-based carrier, they have deep relationships with local providers and hospitals, making them a strong choice for enrollees who prefer a local insurer over a national brand.",
  },
  {
    rank: 3,
    name: "AARP / UnitedHealthcare",
    badge: "Best National Brand",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$196",
    planNMonthly: "N/A",
    pros: [
      "National brand recognition with 10.4% MA market share",
      "AARP member benefits included",
      "Community-rated pricing",
      "Continuous open enrollment",
      "24/7 nurse hotline",
    ],
    cons: [
      "AARP membership required ($16/year)",
      "Supplement 1A premium higher than Humana",
    ],
    highlight:
      "AARP/UnitedHealthcare holds about 10.4% of the Massachusetts Medigap market. Their national brand, AARP member perks, and 24/7 nurse hotline make them a familiar choice for enrollees who want the backing of the largest Medicare Supplement insurer in the country.",
  },
  {
    rank: 4,
    name: "Humana",
    badge: "Best for Low Premiums",
    score: 4.4,
    amBest: "A-",
    planGMonthly: "$176",
    planNMonthly: "N/A",
    pros: [
      "Lowest Supplement 1A premium in Boston at $176/mo",
      "SilverSneakers fitness benefit included",
      "Community-rated pricing",
      "Continuous open enrollment",
    ],
    cons: [
      "Smaller Massachusetts market share",
      "Announced exit from MA Medigap market April 2026 (existing members may stay)",
    ],
    highlight:
      "Humana offers the lowest Supplement 1A premium in Boston at $176/mo and includes the SilverSneakers fitness benefit. Note: Humana announced it will stop selling new Medicare Supplement policies in Massachusetts beginning April 1, 2026. Existing members may remain enrolled, but new enrollees should consider other carriers.",
  },
  {
    rank: 5,
    name: "Health New England",
    badge: "Best for Western MA",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$254",
    planNMonthly: "N/A",
    pros: [
      "Strong regional carrier in western Massachusetts",
      "Community-rated pricing",
      "Continuous open enrollment",
      "Local provider relationships in Springfield and Pittsfield",
    ],
    cons: [
      "Highest Supplement 1A premium among top carriers",
      "Limited presence in eastern Massachusetts",
    ],
    highlight:
      "Health New England is a strong regional option for Medicare beneficiaries in western Massachusetts, particularly in the Springfield and Pittsfield areas. Their local provider relationships and community-rated pricing make them worth considering for enrollees in the Pioneer Valley region.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Humana (Core Plan)", planG: "$123", planN: "N/A", planF: "N/A" },
  { carrier: "AARP / UHC (Core Plan)", planG: "$139", planN: "N/A", planF: "N/A" },
  { carrier: "BCBS MA (Core Plan)", planG: "$143", planN: "N/A", planF: "N/A" },
  { carrier: "Humana (Supplement 1A)", planG: "$176", planN: "N/A", planF: "N/A" },
  { carrier: "AARP / UHC (Supplement 1A)", planG: "$196", planN: "N/A", planF: "N/A" },
  { carrier: "Harvard Pilgrim (Supplement 1A)", planG: "$216", planN: "N/A", planF: "N/A" },
  { carrier: "BCBS MA (Supplement 1A)", planG: "$233", planN: "N/A", planF: "N/A" },
  { carrier: "Health New England (Supplement 1A)", planG: "$254", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "Massachusetts Uses a Unique Plan System",
    description:
      "Massachusetts does not use the standard federal Medigap plan letters (A through N). Instead, Massachusetts offers three plan types: Core Plan (basic hospital and coinsurance coverage), Supplement 1 (available only to those eligible for Medicare before January 1, 2020), and Supplement 1A (the most comprehensive plan, equivalent to Plan G in other states). When comparing Massachusetts plans to other states, Supplement 1A is the closest equivalent to Plan G.",
  },
  {
    title: "Community Rating Required Statewide",
    description:
      "Massachusetts requires all Medigap insurers to use community rating, meaning premiums are the same for all enrollees regardless of age or gender. A 75-year-old pays the same premium as a 65-year-old for the same plan from the same carrier. This is a major advantage over attained-age states where premiums rise significantly with age.",
  },
  {
    title: "Continuous Open Enrollment Year-Round",
    description:
      "Massachusetts requires Medigap insurers to offer continuous open enrollment, meaning you can enroll in, switch, or cancel a Medigap plan any month of the year without medical underwriting. Insurers cannot deny coverage, exclude pre-existing conditions, or require a waiting period. This is the most consumer-friendly Medigap enrollment rule in the country.",
  },
  {
    title: "No Medicare Excess Charges in Massachusetts",
    description:
      "Massachusetts law prohibits Medicare excess charges, meaning providers cannot bill more than the Medicare-approved amount. This eliminates one of the key differences between Plan G and Plan N in other states, since Plan N's lack of excess charge coverage is irrelevant in Massachusetts.",
  },
  {
    title: "Free Counseling via SHINE Program",
    description:
      "Massachusetts' Serving the Health Insurance Needs of Everyone (SHINE) program provides free, unbiased Medicare counseling. Call 1-800-243-4636 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Supplement 1A rates vs. Massachusetts market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Massachusetts" },
  { factor: "Discounts and Value", weight: "15%", description: "Enrollment discounts, autopay discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What Medicare Supplement plans are available in Massachusetts?",
    answer:
      "Massachusetts does not use the standard federal Medigap plan letters. Instead, Massachusetts offers three plan types: Core Plan (basic coverage), Supplement 1 (only available to those eligible for Medicare before January 1, 2020), and Supplement 1A (the most comprehensive plan, equivalent to Plan G in other states). Most new enrollees choose Supplement 1A for the most complete coverage.",
  },
  {
    question: "What is the Massachusetts Supplement 1A plan?",
    answer:
      "Supplement 1A is the most comprehensive Medigap plan available in Massachusetts. It covers Medicare Part A coinsurance and hospital costs, Part B coinsurance, the first three pints of blood, Part A hospice coinsurance, skilled nursing facility coinsurance, Part A deductible, and foreign travel emergency coverage. It is the closest equivalent to Plan G in other states. Premiums range from $176/mo (Humana) to $254/mo (Health New England) in Boston.",
  },
  {
    question: "Does Massachusetts have community rating for Medigap?",
    answer:
      "Yes. Massachusetts requires all Medigap insurers to use community rating, meaning premiums are the same for all enrollees regardless of age or gender. A 75-year-old pays the same as a 65-year-old for the same plan from the same carrier. This is a major advantage over attained-age states where premiums can double or triple as you age.",
  },
  {
    question: "Can I enroll in Medigap at any time in Massachusetts?",
    answer:
      "Yes. Massachusetts requires continuous open enrollment, meaning you can enroll in, switch, or cancel a Medigap plan any month of the year without medical underwriting. Insurers cannot deny coverage or require a waiting period based on pre-existing conditions. This is the most consumer-friendly Medigap enrollment rule in the country.",
  },
  {
    question: "Who is the largest Medigap insurer in Massachusetts?",
    answer:
      "Blue Cross Blue Shield of Massachusetts is the dominant Medigap insurer in the state with approximately 70.9% market share. Harvard Pilgrim Health Care is second with about 15%, followed by AARP/UnitedHealthcare at 10.4%. The Massachusetts market is highly concentrated compared to most other states.",
  },
  {
    question: "What is the difference between the Core Plan and Supplement 1A in Massachusetts?",
    answer:
      "The Core Plan covers basic Medicare Part A coinsurance and hospital costs, Part B coinsurance, the first three pints of blood, and Part A hospice coinsurance. Supplement 1A adds coverage for skilled nursing facility coinsurance, the Part A deductible, and foreign travel emergency care. Supplement 1A is the more comprehensive plan and is recommended for most enrollees. Core Plan premiums start at $123/mo vs. $176/mo for Supplement 1A.",
  },
  {
    question: "Are there Medicare excess charges in Massachusetts?",
    answer:
      "No. Massachusetts law prohibits Medicare excess charges, meaning providers cannot bill more than the Medicare-approved amount. This eliminates one of the key differences between comprehensive and basic plans in other states, since excess charge coverage is irrelevant in Massachusetts.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Massachusetts?",
    answer:
      "Massachusetts' SHINE (Serving the Health Insurance Needs of Everyone) program offers free, unbiased Medicare counseling. Call 1-800-243-4636 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
