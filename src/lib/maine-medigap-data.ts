/**
 * Maine Medicare Supplement Data
 * Key facts:
 * - Community rating: same premium regardless of age or gender
 * - Year-round guaranteed issue: insurers cannot deny coverage or charge more for pre-existing conditions
 * - Maine extends Medicare Advantage trial period to 3 years (vs. 1 year federally)
 * - No birthday rule
 * - Medco Containment: lowest Plan G at $235/mo, lowest Plan N at $189/mo
 * - State Farm: A++ rated, lowest Plan D at $260/mo
 * - SHIP: Maine Aging & Disability Resource Centers at (877) 353-3771
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

export const STATE_STATS = {
  enrollees: "200,000+",
  carriers: "30+",
  lowestPlanG: "$235/mo",
  lowestPlanN: "$189/mo",
  avgPlanG: "$291/mo",
  shipPhone: "(877) 353-3771",
  shipName: "Maine SHIP (Aging & Disability Resource Centers)",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Medco Containment",
    badge: "Best Plan G and Plan N",
    score: 4.6,
    planGMonthly: "$235/mo",
    planNMonthly: "$189/mo",
    amBest: "Not Rated",
    highlight:
      "Medco Containment offers the lowest Plan G ($235/mo) and Plan N ($189/mo) in Maine, saving seniors $56 and $27 per month compared to the state average. The carrier focuses on Plans A, F, G, and N with straightforward pricing.",
    pros: [
      "Lowest Plan G in Maine at $235/mo",
      "Lowest Plan N in Maine at $189/mo",
      "Competitive rates across all four offered plans",
      "Focused plan selection keeps pricing simple",
    ],
    cons: [
      "Does not offer Plans B, C, D, K, L, or M",
      "No AM Best public rating",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.5,
    planGMonthly: "$261/mo",
    planNMonthly: "$N/A",
    amBest: "A++",
    highlight:
      "State Farm carries the highest financial strength rating (A++) in Maine's Medigap market and offers the lowest Plan D at $260/mo. A large network of local agents across Portland, Bangor, and rural Maine provides personalized service.",
    pros: [
      "A++ AM Best rating, highest in Maine",
      "Lowest Plan D in Maine at $260/mo",
      "Extensive local agent network statewide",
      "Six plan types including A, C, D, F, G, and N",
    ],
    cons: [
      "No cost-sharing plans (K or L) or Plan M",
      "No high-deductible Plan G",
      "Plan G at $261/mo is above the state lowest",
    ],
  },
  {
    rank: 3,
    name: "Anthem",
    badge: "Best Plan F",
    score: 4.4,
    planGMonthly: "$275/mo",
    planNMonthly: "$N/A",
    amBest: "A",
    highlight:
      "Anthem offers the lowest Plan F in Maine at $258/mo, saving $65/mo vs. the state average. The carrier has a broad provider network and competitive pricing on Plans A, F, G, and N.",
    pros: [
      "Lowest Plan F in Maine at $258/mo",
      "Strong provider network across Maine",
      "A AM Best rating for financial stability",
      "Competitive Plan G at $275/mo",
    ],
    cons: [
      "Only offers 4 of 10 standard plan types",
      "No cost-sharing plans (K, L) or high-deductible options",
      "Plan G not the lowest in the state",
    ],
  },
  {
    rank: 4,
    name: "United American",
    badge: "Best Plans A, B, and L",
    score: 4.2,
    planGMonthly: "$250/mo",
    planNMonthly: "$N/A",
    amBest: "A+",
    highlight:
      "United American offers the lowest Plan A ($174/mo), Plan B ($246/mo), and Plan L ($175/mo) in Maine. The carrier has served Medigap enrollees since 1966 and uses issue-age pricing, which locks your premium at your enrollment age.",
    pros: [
      "Lowest Plan A in Maine at $174/mo",
      "Lowest Plan B in Maine at $246/mo",
      "Lowest Plan L in Maine at $175/mo",
      "Issue-age pricing locks in rates at enrollment",
      "A+ AM Best rating",
    ],
    cons: [
      "Plan G at $250/mo is not the lowest",
      "Does not offer Plans C, M",
    ],
  },
  {
    rank: 5,
    name: "Mutual of Omaha",
    badge: "Best Plan M + Community Pricing",
    score: 4.1,
    planGMonthly: "$252/mo",
    planNMonthly: "$N/A",
    amBest: "A+",
    highlight:
      "Mutual of Omaha offers the lowest Plan M in Maine at $186/mo and is one of the few carriers using community pricing in Maine, meaning your premium stays the same regardless of age. HDG Plan G is available from $58/mo.",
    pros: [
      "Lowest Plan M in Maine at $186/mo",
      "Community pricing: same rate at any age",
      "HDG Plan G from $58/mo",
      "A+ AM Best rating",
    ],
    cons: [
      "Limited plan selection (A, F, G, M)",
      "No Plans B, C, D, K, L, or N",
    ],
  },
];

export const PREMIUM_TABLE = [
  { carrier: "Medco Containment", planG: "$235/mo", planN: "$189/mo", planF: "$N/A" },
  { carrier: "United American", planG: "$250/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "Mutual of Omaha", planG: "$252/mo", planN: "$N/A", planF: "$338/mo" },
  { carrier: "USAA (military only)", planG: "$256/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "State Farm", planG: "$261/mo", planN: "$N/A", planF: "$318/mo" },
  { carrier: "Anthem", planG: "$275/mo", planN: "$N/A", planF: "$258/mo" },
  { carrier: "AARP / UnitedHealthcare", planG: "$268/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "Transamerica", planG: "$264/mo", planN: "$N/A", planF: "$N/A" },
];

export const STATE_RULES = [
  {
    title: "Community Rating Required",
    description:
      "Maine law requires all Medigap carriers to use community rating, meaning every enrollee pays the same premium regardless of age or gender. Your premium will not increase simply because you get older. Premiums can still rise due to inflation and medical cost trends, but age alone is never a factor.",
  },
  {
    title: "Year-Round Guaranteed Issue",
    description:
      "Maine is one of a small number of states that requires carriers to offer guaranteed issue Medigap coverage year-round. Insurers cannot deny your application or charge a higher premium based on pre-existing conditions at any time of year, not just during your initial Open Enrollment Period.",
  },
  {
    title: "Extended Medicare Advantage Trial Period",
    description:
      "Federal law gives you one year to try Medicare Advantage and return to Original Medicare with guaranteed Medigap rights. Maine extends this trial period to three years. If you enrolled in an MA plan and want to switch back to Medigap, you have up to three years to do so with full guaranteed issue protections.",
  },
  {
    title: "No Birthday Rule",
    description:
      "Maine does not have a birthday rule. However, because Maine already requires year-round guaranteed issue, a birthday rule is unnecessary. You can switch Medigap plans at any time of year without medical underwriting.",
  },
  {
    title: "Attained-Age vs. Community Pricing",
    description:
      "While Maine law requires community rating, some carriers use attained-age pricing structures in their filings. Always confirm the pricing method with the carrier before enrolling. Community-rated plans are generally the better long-term value because your premium does not increase as you age.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Maine does not require carriers to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. If you are under 65 and on Medicare, contact the Maine Bureau of Insurance at (800) 300-5000 to learn which carriers voluntarily offer coverage.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Affordability",
    weight: "50%",
    description: "Monthly premium for Plan G at age 65 compared to the Maine state average of $291/mo.",
  },
  {
    factor: "Financial Strength",
    weight: "20%",
    description: "AM Best rating: A++ (Superior), A+ (Superior), A (Excellent), A- (Excellent), or lower.",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Maine, with extra weight for Plans G, N, and F.",
  },
  {
    factor: "Pricing Method",
    weight: "10%",
    description: "Community pricing scores highest, then issue-age, then attained-age.",
  },
  {
    factor: "Customer Satisfaction",
    weight: "5%",
    description: "NAIC complaint ratio and J.D. Power scores where available.",
  },
];

export const FAQS = [
  {
    question: "Does Maine have a birthday rule for Medigap?",
    answer:
      "No, Maine does not have a birthday rule. However, Maine already provides year-round guaranteed issue, which is a stronger protection than a birthday rule. You can switch Medigap plans at any time without medical underwriting.",
  },
  {
    question: "Can I be denied Medigap coverage in Maine?",
    answer:
      "No. Maine law requires carriers to offer guaranteed issue Medigap coverage year-round. Insurers cannot deny your application or charge higher premiums based on pre-existing conditions at any time of year.",
  },
  {
    question: "What is community rating and how does it benefit Maine residents?",
    answer:
      "Community rating means all enrollees pay the same premium regardless of age or gender. A 65-year-old and a 78-year-old pay the same monthly rate for the same plan. This protects you from premium increases driven solely by aging.",
  },
  {
    question: "What is the cheapest Plan G in Maine?",
    answer:
      "Medco Containment offers the lowest Plan G in Maine at $235/mo for a 65-year-old, which is $56/mo below the state average of $291/mo. United American ($250/mo) and Mutual of Omaha ($252/mo) are also competitive.",
  },
  {
    question: "What is Maine's extended Medicare Advantage trial period?",
    answer:
      "Federal law gives you one year to try Medicare Advantage and return to Original Medicare with guaranteed Medigap rights. Maine extends this to three years. If you enrolled in a Medicare Advantage plan and want to switch back to Medigap, you have up to three years to do so without medical underwriting.",
  },
  {
    question: "Is Medigap available to Medicare beneficiaries under 65 in Maine?",
    answer:
      "Maine does not require carriers to offer Medigap to under-65 Medicare beneficiaries. However, some carriers voluntarily offer coverage. Contact the Maine Bureau of Insurance at (800) 300-5000 or Maine SHIP at (877) 353-3771 for a list of carriers that do.",
  },
  {
    question: "What is the best Medigap carrier in Maine for financial strength?",
    answer:
      "State Farm carries the highest AM Best rating (A++) in Maine's Medigap market. AARP/UnitedHealthcare and United American both carry A+ ratings. Anthem and Transamerica carry A ratings.",
  },
  {
    question: "How do I get free help choosing a Medigap plan in Maine?",
    answer:
      "Maine SHIP counselors at the Aging and Disability Resource Centers provide free, unbiased help comparing Medigap plans. Call (877) 353-3771 Monday through Friday. Counselors can also help you understand your guaranteed issue rights and the extended MA trial period.",
  },
];
