/**
 * New Hampshire Medicare Supplement Data
 * Source: MoneyGeek, NH Insurance Department, FairSquare Medicare, May 2026
 * Key facts: No birthday rule, community rating NOT required, issue-age pricing dominant,
 *            Anthem lowest Plan G at $180/mo, First Health lowest Plan N at $129/mo,
 *            State Farm A++ at $186/mo Plan G, SHIP: (800) 852-3416
 */

export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  planGMonthly: string;
  planNMonthly: string;
  amBest: string;
  highlight: string;
  pros: string[];
  cons: string[];
}

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Anthem Blue Cross Blue Shield",
    badge: "Best Plan G in New Hampshire",
    score: 4.7,
    planGMonthly: "$180",
    planNMonthly: "$N/A",
    amBest: "A (Excellent)",
    highlight:
      "Anthem offers the lowest Plan G rate in New Hampshire at $180/mo, which is 27% below the state average of $246. Anthem uses issue-age pricing, locking your premium at your enrollment age. Available plans include A, F, G, and N.",
    pros: [
      "Lowest Plan G in New Hampshire at $180/mo",
      "Issue-age pricing: rate locked at enrollment age",
      "A (Excellent) AM Best financial strength rating",
      "Wide network of healthcare providers statewide",
    ],
    cons: [
      "Does not offer Plans B, C, D, K, L, or M",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best for Local Agents and Financial Strength",
    score: 4.6,
    planGMonthly: "$186",
    planNMonthly: "$144",
    amBest: "A++ (Superior)",
    highlight:
      "State Farm earns the highest possible AM Best rating (A++) and offers local agents across Manchester, Concord, Nashua, and rural New Hampshire. Plan G at $186/mo is only $6 more than Anthem but comes with in-person service and the best financial strength rating in the industry.",
    pros: [
      "A++ (Superior) AM Best rating, highest in the industry",
      "Local agents across New Hampshire for in-person service",
      "Lowest Plan C at $255/mo and Plan D at $185/mo in the state",
      "Issue-age pricing locks your rate at enrollment age",
    ],
    cons: [
      "Does not offer Plans B, K, L, or M",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "First Health Life and Health",
    badge: "Best Plan N and Plan F",
    score: 4.2,
    planGMonthly: "$258",
    planNMonthly: "$129",
    amBest: "A- (Excellent)",
    highlight:
      "First Health offers the lowest Plan N in New Hampshire at $129/mo (31% below average) and the lowest Plan F at $250/mo. If you want Plan N to save on premiums or are eligible for Plan F, First Health is the price leader. Issue-age pricing keeps rates stable over time.",
    pros: [
      "Lowest Plan N in New Hampshire at $129/mo",
      "Lowest Plan F in New Hampshire at $250/mo",
      "Issue-age pricing: rate locked at enrollment age",
      "Competitive Plan B at $211/mo",
    ],
    cons: [
      "Does not offer Plans K or L",
      "Plan G at $258/mo is above average",
    ],
  },
  {
    rank: 4,
    name: "Mutual of Omaha",
    badge: "Best for Rate Stability",
    score: 4.3,
    planGMonthly: "$191",
    planNMonthly: "$140",
    amBest: "A+ (Superior)",
    highlight:
      "Mutual of Omaha is the most widely recognized Medigap brand in the country. Plan G at $191/mo is competitive, and the company is known for consistent rate increases and strong customer service. A+ AM Best rating provides excellent financial security.",
    pros: [
      "A+ (Superior) AM Best financial strength rating",
      "Nationally recognized brand with strong customer service",
      "Competitive Plan N at $140/mo",
      "HDG Plan G available for budget-conscious enrollees",
    ],
    cons: [
      "Plan G at $191/mo is $11 more than Anthem",
      "Uses attained-age pricing in some markets",
    ],
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.1,
    planGMonthly: "$244",
    planNMonthly: "N/A",
    amBest: "A (Excellent)",
    highlight:
      "Transamerica is the only carrier in New Hampshire offering all 10 standardized Medigap plan types. It offers the lowest Plan L at $161/mo and Plan M at $199/mo in the state. Issue-age pricing keeps rates stable over time.",
    pros: [
      "Only carrier with all 10 Medigap plan types in New Hampshire",
      "Lowest Plan L at $161/mo and Plan M at $199/mo",
      "Issue-age pricing: rate locked at enrollment age",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Plan G at $244/mo is above average",
      "No high-deductible Plan G option",
    ],
  },
];

export const STATE_STATS = {
  enrollees: "130,000+",
  carriers: "15+",
  lowestPlanG: "$180/mo",
  avgPlanG: "$246/mo",
  stateAvgPlanN: "$191/mo",
  lowestPlanN: "$129/mo",
  shipPhone: "(800) 852-3416",
};

export const PREMIUM_TABLE = [
  { carrier: "Anthem BCBS", planG: "$180", planN: "$N/A", planF: "$254" },
  { carrier: "State Farm", planG: "$186", planN: "$144", planF: "$258" },
  { carrier: "Mutual of Omaha", planG: "$191", planN: "$140", planF: "$291" },
  { carrier: "AFLAC", planG: "$200", planN: "$154", planF: "$251" },
  { carrier: "Harvard Pilgrim", planG: "$201", planN: "N/A", planF: "N/A" },
  { carrier: "SilverScript", planG: "$216", planN: "$145", planF: "$252" },
  { carrier: "Transamerica", planG: "$244", planN: "N/A", planF: "N/A" },
  { carrier: "First Health", planG: "$258", planN: "$129", planF: "$250" },
  { carrier: "AARP / UHC", planG: "$267", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in New Hampshire",
    description:
      "New Hampshire does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face medical underwriting if you try to switch carriers or plans. Your initial enrollment decision is the most important one you will make.",
  },
  {
    title: "Issue-Age Pricing is the Dominant Pricing Method",
    description:
      "Most New Hampshire carriers use issue-age pricing, which locks your premium at your enrollment age. This is more favorable than attained-age pricing, which increases as you get older. Enrolling at 65 locks in the lowest possible rate.",
  },
  {
    title: "Open Enrollment Period: 6 Months Starting at 65",
    description:
      "Your Medigap Open Enrollment Period begins the month you turn 65 and enroll in Medicare Part B. During this 6-month window, no carrier can deny you coverage or charge higher rates due to health conditions.",
  },
  {
    title: "Guaranteed Issue Rights Apply in Specific Situations",
    description:
      "Outside of Open Enrollment, you may still have guaranteed issue rights if you lose employer coverage, move out of a Medicare Advantage service area, or your current plan leaves the market. These rights allow you to enroll without underwriting.",
  },
  {
    title: "Plan F Closed to New Enrollees Since 2020",
    description:
      "Plan F is only available if you were eligible for Medicare before January 1, 2020. New enrollees must choose Plan G (which covers everything except the Part B deductible) or another available plan.",
  },
  {
    title: "NH Insurance Department Rate Dashboard Available",
    description:
      "The New Hampshire Insurance Department publishes an interactive rate comparison dashboard at insurance.nh.gov. You can filter by plan type, carrier, and ZIP code to compare official DOI-approved rates before enrolling.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Financial Strength (AM Best Rating)",
    weight: "30%",
    description:
      "AM Best ratings from A++ to A- indicate the carrier's ability to pay claims. We weight this heavily because Medigap is a long-term product.",
  },
  {
    factor: "Premium Competitiveness",
    weight: "25%",
    description:
      "Plan G and Plan N rates compared to the New Hampshire state average. Lower premiums relative to the market earn higher scores.",
  },
  {
    factor: "Customer Satisfaction and Complaint Ratio",
    weight: "20%",
    description:
      "NAIC complaint index scores and J.D. Power ratings. Lower complaint ratios indicate better claims handling and customer service.",
  },
  {
    factor: "Pricing Method Stability",
    weight: "15%",
    description:
      "Issue-age and community-rated plans score higher than attained-age plans because premiums are more predictable over time.",
  },
  {
    factor: "Plan Availability and Discounts",
    weight: "10%",
    description:
      "Carriers offering more plan types and household discounts (typically 5-7% for two people in the same household) score higher.",
  },
];

export const FAQS = [
  {
    question: "What is the cheapest Medicare Supplement plan in New Hampshire?",
    answer:
      "Plan K is the cheapest plan type in New Hampshire at $120/mo on average. For comprehensive coverage, Plan G starts at $180/mo (Anthem) and Plan N starts at $129/mo (First Health). The right plan depends on your health needs and budget.",
  },
  {
    question: "Does New Hampshire have a birthday rule for Medigap?",
    answer:
      "No. New Hampshire does not have a birthday rule. Unlike California, Oregon, and other states that give you an annual window to switch carriers without underwriting, New Hampshire follows standard federal rules. Once your Open Enrollment Period ends, you will face health questions if you try to change plans.",
  },
  {
    question: "What is the best Medicare Supplement carrier in New Hampshire?",
    answer:
      "For the lowest Plan G premium, Anthem at $180/mo is the best choice. For the highest financial strength with local agents, State Farm at $186/mo with an A++ rating is the top pick. For Plan N, First Health at $129/mo is the price leader. The best carrier depends on your priorities.",
  },
  {
    question: "Can I use the NH Insurance Department rate dashboard?",
    answer:
      "Yes. The New Hampshire Insurance Department publishes an interactive rate comparison dashboard at insurance.nh.gov. You can filter by plan type, carrier, and ZIP code to compare official DOI-approved rates. This is a free, unbiased resource.",
  },
  {
    question: "What is issue-age pricing and why does it matter in New Hampshire?",
    answer:
      "Issue-age pricing locks your Medigap premium at the age you enroll. Most New Hampshire carriers use this method. This means enrolling at 65 gives you the lowest possible rate, and your premium will only increase due to general inflation, not because you are getting older.",
  },
  {
    question: "What does Plan G cover in New Hampshire?",
    answer:
      "Plan G covers nearly all Medicare out-of-pocket costs: the Part A hospital deductible ($1,736 in 2026), Part A coinsurance, Part B coinsurance (20%), skilled nursing facility coinsurance, and foreign travel emergency coverage. The only cost not covered is the annual Part B deductible ($283 in 2026).",
  },
  {
    question: "Is Harvard Pilgrim a good Medigap option in New Hampshire?",
    answer:
      "Harvard Pilgrim is a regional carrier with strong name recognition in New England. Plan G at $201/mo is competitive, and the company has a solid reputation for customer service in New Hampshire. It is a good option if you prefer a regional carrier over a national brand.",
  },
  {
    question: "How do I get free Medicare counseling in New Hampshire?",
    answer:
      "Contact the New Hampshire SHIP (State Health Insurance Assistance Program) at (800) 852-3416. SHIP counselors are certified, unbiased, and free. They can help you compare plans, understand your enrollment rights, and navigate the Medicare system.",
  },
];
