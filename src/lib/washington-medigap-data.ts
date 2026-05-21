// Washington State Medigap Data
// Key differentiator: Year-round plan switching rule (more powerful than a birthday rule)
// Regence BlueShield dramatically cheaper than competitors

export interface Carrier {
  rank: number;
  name: string;
  score: number;
  badge: string;
  amBest: string;
  planGMonthly: string;
  planNMonthly: string;
  highlight: string;
  pros: string[];
  cons: string[];
}

export interface PremiumRow {
  carrier: string;
  planG: string;
  planN: string;
  amBest: string;
  notes: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const STATE_NAME = "Washington";
export const STATE_ABBR = "WA";
export const SAMPLE_CITY = "Seattle";

export const STATE_STATS = {
  enrollees: "200,000+",
  lowestPlanG: "$115",
  lowestPlanN: "$82",
  carriers: "25+",
  planGAdoption: "47%",
  specialRule: "Year-Round Switching",
  regulator: "Washington OIC",
  shipName: "SHIBA",
  shipPhone: "800-562-6900",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Premera Blue Cross",
    score: 4.9,
    badge: "Best Overall",
    amBest: "A",
    planGMonthly: "$138",
    planNMonthly: "$99",
    highlight:
      "Premera Blue Cross is Washington's largest Medigap insurer with the deepest local agent network in the state. Issue-age rating is available, meaning your premium is set at enrollment and does not rise simply because you get older.",
    pros: [
      "Largest market share in WA - most agents are familiar with their plans",
      "Issue-age rating available - premiums do not rise with age",
      "Strong financial stability with A AM Best rating",
      "Excellent local customer service reputation across Washington",
    ],
    cons: [
      "Not the cheapest option in most WA markets",
      "Premium increases have been above average in recent years",
    ],
  },
  {
    rank: 2,
    name: "Regence BlueShield",
    score: 4.7,
    badge: "Best Value",
    amBest: "A-",
    planGMonthly: "$115",
    planNMonthly: "$82",
    highlight:
      "Regence BlueShield offers the lowest Plan G premiums in most Washington markets at around $115/mo - dramatically cheaper than most competitors at $200 or more. As the Pacific Northwest BCBS affiliate, Regence has strong provider relationships throughout the state.",
    pros: [
      "Lowest Plan G at $115/mo - dramatically cheaper than most WA competitors",
      "Pacific Northwest BCBS brand recognition and provider trust",
      "Wide acceptance among Washington providers",
      "Solid financial backing through the BCBS network",
    ],
    cons: [
      "Attained-age rating - premiums rise as you get older",
      "Customer service can be slower than smaller regional carriers",
    ],
  },
  {
    rank: 3,
    name: "AARP/UnitedHealthcare",
    score: 4.5,
    badge: "Best Plan Availability",
    amBest: "A",
    planGMonthly: "$189",
    planNMonthly: "$141",
    highlight:
      "AARP/UnitedHealthcare offers the widest plan selection in Washington and is the top choice for residents who travel frequently or spend winters in other states. Household discounts are available for couples.",
    pros: [
      "Widest plan selection including all letters A through N",
      "Nationwide coverage - ideal for WA residents who travel or winter elsewhere",
      "Household discount (7%) for couples enrolling together",
      "Strong financial stability with A AM Best rating",
    ],
    cons: [
      "Among the most expensive options in Washington",
      "AARP membership required ($16/year)",
      "Complaint ratio slightly above average for WA",
    ],
  },
  {
    rank: 4,
    name: "Mutual of Omaha",
    score: 4.4,
    badge: "Best Discounts",
    amBest: "A+",
    planGMonthly: "$172",
    planNMonthly: "$128",
    highlight:
      "Mutual of Omaha holds the highest financial strength rating (A+) of any top Washington carrier and is well-known for US-based customer service. Multiple discount options make it a strong value for couples and non-tobacco users.",
    pros: [
      "A+ AM Best rating - strongest financial stability of any top WA carrier",
      "Household discount, non-tobacco discount, and annual pay discount available",
      "Best-in-class customer service with US-based call centers",
      "Strong High-Deductible Plan G option at lower premiums",
    ],
    cons: [
      "Not the cheapest option in Washington",
      "Premiums have increased faster than inflation in recent years",
    ],
  },
  {
    rank: 5,
    name: "Cigna Healthcare",
    score: 4.1,
    badge: "Budget Option",
    amBest: "A",
    planGMonthly: "$225",
    planNMonthly: "$168",
    highlight:
      "Cigna offers dental and vision bundle discounts that can offset the higher premium cost. A solid choice for Washington residents who want to combine Medigap with supplemental dental coverage under one carrier.",
    pros: [
      "Dental and vision bundle discounts available",
      "Nationwide coverage for Washington travelers",
      "Multiple plan letter options",
      "Strong financial backing",
    ],
    cons: [
      "Higher premiums than BCBS options in most WA markets",
      "Complaint ratio above average for Washington",
      "Customer service inconsistency reported by some enrollees",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Regence BlueShield", planG: "$115", planN: "$82", amBest: "A-", notes: "Lowest in WA" },
  { carrier: "Premera Blue Cross", planG: "$138", planN: "$99", amBest: "A", notes: "Largest WA insurer" },
  { carrier: "Mutual of Omaha", planG: "$172", planN: "$128", amBest: "A+", notes: "Best discounts" },
  { carrier: "AARP/UnitedHealthcare", planG: "$189", planN: "$141", amBest: "A", notes: "Best plan variety" },
  { carrier: "Cigna Healthcare", planG: "$225", planN: "$168", amBest: "A", notes: "Dental bundles" },
];

export const STATE_RULES = [
  {
    title: "Year-Round Plan Switching",
    description:
      "Washington's most powerful Medigap rule: if enrolled in any Plan B through N, you can switch to any other Plan B through N at any time of year with no health screening questionnaire. This is more flexible than a birthday rule, which only provides a 60-day window once per year.",
  },
  {
    title: "Open Enrollment Period (OEP)",
    description:
      "Your 6-month guaranteed-issue window begins when you are both age 65 or older and enrolled in Medicare Part B. During OEP, no carrier can deny coverage or charge higher premiums based on health history.",
  },
  {
    title: "Issue-Age Rating Available",
    description:
      "Some Washington carriers, including Premera Blue Cross, offer issue-age rating where your premium is set at your enrollment age and does not increase simply because you get older. This can save significant money over a 20-year retirement.",
  },
  {
    title: "Washington OIC Regulation",
    description:
      "The Washington Office of the Insurance Commissioner (OIC) regulates all Medigap carriers. Carriers must file rate increases with the OIC before implementing them. Contact SHIBA at 800-562-6900 for free, unbiased help.",
  },
];

export const SCORING_FACTORS = [
  { name: "Financial Stability", weight: 25, description: "AM Best rating and claims-paying ability" },
  { name: "Premium Competitiveness", weight: 25, description: "Plan G and Plan N rates vs. WA market average" },
  { name: "Customer Satisfaction", weight: 20, description: "NAIC complaint ratio and member reviews" },
  { name: "Plan Availability", weight: 15, description: "Range of plan letters offered in Washington" },
  { name: "Discount Options", weight: 15, description: "Household, non-tobacco, and other available discounts" },
];

export const FAQS: FaqItem[] = [
  {
    q: "Does Washington state have a Medigap birthday rule?",
    a: "No. Washington does not have a traditional birthday rule. Instead, Washington has something better: a year-round switching rule. If you are enrolled in any Medigap plan B through N, you can switch to any other plan B through N at any time of year with no health screening required. This gives you far more flexibility than a birthday rule, which only provides a 60-day window once per year.",
  },
  {
    q: "Can I switch Medigap plans in Washington without medical underwriting?",
    a: "Yes, in many cases. Washington's year-round switching rule allows you to switch between Plans B through N without a health screening questionnaire. However, if you are switching from a Medicare Advantage plan or from no coverage to a Medigap plan outside of your Open Enrollment Period, underwriting may apply. Call SHIBA at 800-562-6900 if you are unsure.",
  },
  {
    q: "Why is Regence BlueShield so much cheaper than other carriers in Washington?",
    a: "Regence BlueShield, a BCBS affiliate, has a large market share in Washington and can spread risk across a larger pool of enrollees, which helps keep premiums lower. Their Plan G at around $115/mo is dramatically cheaper than most competitors at $200 or more. The tradeoff is attained-age rating, meaning premiums will increase as you get older.",
  },
  {
    q: "What is issue-age rating and is it available in Washington?",
    a: "Issue-age rating means your premium is locked in based on your age when you first enroll, and does not increase simply because you get older. In Washington, some carriers including Premera Blue Cross offer issue-age plans. These plans cost more upfront but can be cheaper over time compared to attained-age plans that rise with age.",
  },
  {
    q: "What is the best Medigap plan in Washington for 2026?",
    a: "For most Washingtonians, Plan G offers the best overall value. It covers nearly everything except the Part B deductible ($257 in 2026) and is available from as low as $115/mo through Regence BlueShield. Plan N is a good budget option at $82/mo but requires copays of $20 to $50 per doctor visit and does not cover Part B excess charges.",
  },
  {
    q: "What is SHIBA and how can it help me in Washington?",
    a: "SHIBA stands for Statewide Health Insurance Benefits Advisors. It is Washington's free Medicare counseling program, staffed by trained volunteers who provide unbiased help with Medicare decisions including Medigap plan comparisons. You can reach SHIBA at 800-562-6900 or find a local advisor through the Washington OIC website.",
  },
  {
    q: "Can I keep my Medigap plan if I move to another state?",
    a: "Generally yes. Your Medigap plan is portable and will continue to cover you if you move to another state, as long as you continue paying premiums. However, your premium may change based on your new state's rating rules. If you move, it is worth comparing rates in your new state. Washington's year-round switching rule applies only while you are a Washington resident.",
  },
  {
    q: "Does Washington require Medigap coverage for Medicare beneficiaries under 65?",
    a: "No. Washington does not require Medigap carriers to sell plans to Medicare beneficiaries under age 65 who qualify due to disability or ESRD. If you are under 65 and on Medicare in Washington, you may have limited Medigap options. Contact SHIBA at 800-562-6900 for guidance on your specific situation.",
  },
];
