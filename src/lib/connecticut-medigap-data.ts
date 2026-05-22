/**
 * Connecticut Medicare Supplement Data
 * Sources: Connecticut Insurance Department (DOI) rate chart 3/25/2026,
 *          CMS Medicare Plan Finder, CHOICES program, Senior65, KFF - May 2026
 *
 * Key facts:
 * - ~130,000 Connecticut Medigap enrollees
 * - Community-rated AND guaranteed-issue year-round (one of only 2 states with both)
 * - No medical underwriting allowed at any time in Connecticut
 * - Plan G avg $333/mo statewide (community rating means higher base premiums)
 * - First Health Life & Health: lowest Plan G at $330/mo (DOI approved)
 * - United American: lowest Plan N at $242/mo, lowest Plan K at $135/mo
 * - Omaha HDG Plan G: $59.27/mo (lowest HDG in state)
 * - AARP/UHC group plan: Plan G $333/mo, Plan N $247/mo
 * - CHOICES free counseling: 1-800-994-9422
 * - Connecticut DOI: portal.ct.gov/cid
 * - Rates are the same regardless of age, gender, or health status
 */

export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  amBest: string;
  planGMonthly: string;
  planNMonthly: string;
  highlight: string;
  pros: string[];
  cons: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PremiumRow {
  carrier: string;
  planG: string;
  planN: string;
  planF: string;
}

export interface StateRule {
  title: string;
  description: string;
}

export interface ScoringFactor {
  factor: string;
  weight: string;
  description: string;
}

export const STATE_STATS = {
  enrollees: "130,000+",
  carriers: "10+",
  lowestPlanG: "$330/mo",
  avgPlanG: "$333/mo",
  shipPhone: "1-800-994-9422",
  doiWebsite: "portal.ct.gov/cid",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "First Health Life and Health Insurance",
    badge: "Lowest Plan G in Connecticut",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$330",
    planNMonthly: "$174",
    highlight:
      "First Health Life and Health Insurance offers the lowest Plan G in Connecticut at $330/mo per the Connecticut DOI rate chart, with an A AM Best rating. Their Plan N at $174/mo is also among the lowest in the state. Because Connecticut requires community rating and guaranteed issue, First Health is an excellent choice for any Connecticut senior regardless of age or health history.",
    pros: [
      "Lowest Plan G in Connecticut at $330/mo (DOI approved)",
      "Competitive Plan N at $174/mo",
      "A AM Best rating",
      "Guaranteed issue: no medical underwriting in Connecticut",
      "Community-rated: same premium at age 65 or 85",
    ],
    cons: [
      "Smaller national brand recognition",
      "Limited plan types compared to some carriers",
    ],
  },
  {
    rank: 2,
    name: "Transamerica Life Insurance",
    badge: "Best Overall Value",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$294",
    planNMonthly: "$239",
    highlight:
      "Transamerica offers a competitive Plan G at $294/mo in Connecticut with an A AM Best rating. They also offer Plans K ($127/mo) and L ($207/mo) for cost-sharing options, plus Plan M at $255/mo. Transamerica is the best overall value for Connecticut seniors who want a strong carrier with a broad range of plan types.",
    pros: [
      "Competitive Plan G at $294/mo",
      "A AM Best rating",
      "Offers Plans K, L, and M for cost-sharing options",
      "Guaranteed issue: no medical underwriting in Connecticut",
      "Community-rated: same premium at age 65 or 85",
    ],
    cons: [
      "Plan N at $239/mo is above the state average",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "United American Insurance",
    badge: "Best for Plan N and Plan K",
    score: 4.9,
    amBest: "A",
    planGMonthly: "$248",
    planNMonthly: "$242",
    highlight:
      "United American Insurance offers the lowest Plan N in Connecticut at $242/mo and the lowest Plan K at $135/mo per the Connecticut DOI rate chart. Their Plan G at $248/mo is also competitive. United American carries an A AM Best rating and offers 9 plan types including high-deductible Plans F and G. They are the top pick for Connecticut seniors who want the widest plan selection.",
    pros: [
      "Lowest Plan N in Connecticut at $242/mo (DOI approved)",
      "Lowest Plan K in Connecticut at $135/mo",
      "Competitive Plan G at $248/mo",
      "A AM Best rating",
      "9 plan types including HDG options",
      "Guaranteed issue: no medical underwriting in Connecticut",
    ],
    cons: [
      "Less well-known brand than AARP/UHC or Transamerica",
      "Plan F at $452/mo is above average",
    ],
  },
  {
    rank: 4,
    name: "AARP / UnitedHealthcare",
    badge: "Best Brand Recognition",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$333",
    planNMonthly: "$247",
    highlight:
      "AARP/UnitedHealthcare offers Plan G at $333/mo and Plan N at $247/mo in Connecticut through their group plan structure. The AARP brand is the most recognized in Medicare nationwide, and UHC carries an A AM Best rating. While not the lowest-priced option in Connecticut, AARP/UHC is a strong choice for seniors who value brand recognition and a large national network.",
    pros: [
      "Most recognized Medicare Supplement brand nationwide",
      "A AM Best rating",
      "Group plan structure with additional benefits",
      "Guaranteed issue: no medical underwriting in Connecticut",
      "Community-rated: same premium at age 65 or 85",
    ],
    cons: [
      "Plan G at $333/mo is above the state average",
      "Plan N at $247/mo is above the state average",
      "Requires AARP membership",
    ],
  },
  {
    rank: 5,
    name: "Omaha Insurance Company",
    badge: "Best High-Deductible Plan G",
    score: 4.2,
    amBest: "A+",
    planGMonthly: "$462",
    planNMonthly: "$317",
    highlight:
      "Omaha Insurance Company (a Mutual of Omaha subsidiary) offers the lowest High-Deductible Plan G in Connecticut at $59.27/mo per the DOI rate chart. Their standard Plan G at $462/mo is the highest in the state, but the HDG option is a standout for healthy Connecticut seniors who want to minimize monthly premiums. Omaha carries an A+ AM Best rating.",
    pros: [
      "Lowest High-Deductible Plan G in Connecticut at $59.27/mo (DOI approved)",
      "A+ AM Best rating",
      "Guaranteed issue: no medical underwriting in Connecticut",
      "Community-rated: same premium at age 65 or 85",
    ],
    cons: [
      "Standard Plan G at $462/mo is the highest in Connecticut",
      "HDG requires meeting a $2,950 deductible before benefits pay",
      "Standard Plan N at $317/mo is above average",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "First Health Life and Health", planG: "$330", planN: "$174", planF: "$295" },
  { carrier: "Transamerica Life", planG: "$294", planN: "$239", planF: "$467" },
  { carrier: "United American", planG: "$248", planN: "$242", planF: "$452" },
  { carrier: "AARP / UnitedHealthcare (group)", planG: "$333", planN: "$247", planF: "$566" },
  { carrier: "Medco Containment (Cigna)", planG: "$363", planN: "$260", planF: "$420" },
  { carrier: "Washington National", planG: "$430", planN: "$312", planF: "$377" },
  { carrier: "Omaha Insurance (HDG)", planG: "$59*", planN: "$317", planF: "N/A" },
  { carrier: "USAA Life", planG: "$558", planN: "$237", planF: "$367" },
  { carrier: "Anthem Blue Cross Blue Shield", planG: "$332", planN: "$239", planF: "$366" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "Community Rating: Your Age Does Not Affect Your Premium",
    description:
      "Connecticut requires all Medigap plans to be community-rated, meaning every enrollee pays the same premium for the same plan regardless of age, gender, or health status. A 65-year-old and an 85-year-old pay the same monthly rate. This is one of the most consumer-friendly Medigap rules in the country and is one of only a handful of states with this requirement.",
  },
  {
    title: "Guaranteed Issue Year-Round: No Medical Underwriting Allowed",
    description:
      "Connecticut is one of only two states (along with New York) that requires Medigap plans to be available on a guaranteed-issue basis at all times. Carriers cannot deny you coverage, charge higher premiums, or impose waiting periods based on your health history, at any time of year. This means you can switch Medigap plans at any time without fear of being denied.",
  },
  {
    title: "You Can Switch Medigap Plans Any Time of Year",
    description:
      "Because Connecticut requires guaranteed issue year-round, you can switch from one Medigap plan to another at any time without going through medical underwriting. This is a significant advantage over most states, where switching outside of your Open Enrollment Period requires health questions and can result in denial. Connecticut seniors should shop their rates annually.",
  },
  {
    title: "Premiums Are Higher Due to Community Rating",
    description:
      "The trade-off for community rating and guaranteed issue is that Connecticut Medigap premiums are among the highest in the country. Plan G averages around $333/mo in Connecticut compared to $168/mo in Arkansas or $137/mo in Alaska. This is because carriers must accept all applicants regardless of health, so they spread the risk across all enrollees.",
  },
  {
    title: "High-Deductible Plan G Is Available and Very Affordable",
    description:
      "Connecticut carriers offer High-Deductible Plan G (HDG) at community-rated premiums. Omaha Insurance offers HDG at just $59.27/mo, making it one of the most affordable Medigap options in the state. HDG requires you to pay a $2,950 deductible (2026) before benefits kick in, but the monthly savings can be substantial for healthy seniors.",
  },
  {
    title: "Free Help via Connecticut CHOICES Program",
    description:
      "Connecticut's CHOICES program (Connecticut's program for Health insurance assistance, Outreach, Information and referral, Counseling, Eligibility Screening) provides free, unbiased Medicare counseling. Call 1-800-994-9422 to speak with a trained counselor. There is no cost and counselors do not sell insurance. You can also visit the Connecticut Insurance Department at portal.ct.gov/cid.",
  },
];

export const SCORING_FACTORS: ScoringFactor[] = [
  {
    factor: "Financial Strength (AM Best)",
    weight: "25%",
    description: "Claims-paying ability and long-term stability",
  },
  {
    factor: "Customer Satisfaction",
    weight: "25%",
    description: "NAIC complaint ratios and member satisfaction surveys",
  },
  {
    factor: "Premium Competitiveness",
    weight: "20%",
    description: "Plan G and Plan N rates vs. Connecticut DOI-approved rates",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Connecticut",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "HDG options, group plan benefits, and added value",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Connecticut for 2026?",
    answer:
      "Plan G is the most popular Medigap plan for new enrollees in Connecticut. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the lowest Plan G premium, First Health Life and Health offers $330/mo per the Connecticut DOI rate chart. For the widest plan selection, United American offers 9 plan types including a competitive Plan G at $248/mo. For the lowest overall monthly cost, Omaha's High-Deductible Plan G starts at $59.27/mo.",
  },
  {
    question: "Does Connecticut have guaranteed issue for Medigap year-round?",
    answer:
      "Yes. Connecticut is one of only two states (along with New York) that requires Medigap plans to be available on a guaranteed-issue basis at all times of year. Carriers cannot deny you coverage, charge higher premiums, or impose waiting periods based on your health history. This means you can switch Medigap plans at any time without fear of being denied, which is a major advantage for Connecticut residents.",
  },
  {
    question: "What is community rating and why does it make Connecticut premiums higher?",
    answer:
      "Community rating means all enrollees pay the same premium for the same plan regardless of age, gender, or health status. Connecticut requires this for all Medigap plans. The trade-off is that premiums are among the highest in the country because carriers must accept all applicants and spread the risk across everyone. Plan G averages $333/mo in Connecticut vs. $168/mo in Arkansas. However, your premium will not increase just because you get older.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Connecticut?",
    answer:
      "Yes, you can switch Medigap plans at any time of year in Connecticut. Because the state requires guaranteed issue year-round, carriers cannot deny your application or charge higher premiums based on your health. This means Connecticut seniors should shop their rates annually and switch if they find a better price, since coverage is identical across carriers for the same plan letter.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Connecticut?",
    answer:
      "Plan G premiums in Connecticut range from $248/mo (United American) to $558/mo (USAA) per the Connecticut DOI rate chart. First Health Life and Health offers the lowest standard Plan G at $330/mo. Omaha Insurance offers a High-Deductible Plan G at $59.27/mo. All rates are community-rated, meaning they are the same regardless of your age.",
  },
  {
    question: "What is the Connecticut CHOICES program?",
    answer:
      "CHOICES (Connecticut's program for Health insurance assistance, Outreach, Information and referral, Counseling, Eligibility Screening) is Connecticut's free Medicare counseling program. Trained counselors can help you compare Medigap plans, understand your rights, and enroll. Call 1-800-994-9422. There is no cost and counselors do not sell insurance.",
  },
  {
    question: "Is High-Deductible Plan G a good option in Connecticut?",
    answer:
      "High-Deductible Plan G (HDG) can be an excellent option for healthy Connecticut seniors who want to minimize monthly premiums. Omaha Insurance offers HDG at $59.27/mo per the DOI rate chart, compared to $330 to $462/mo for standard Plan G. The trade-off is a $2,950 deductible (2026) before benefits kick in. Because Connecticut requires guaranteed issue year-round, you can always switch from HDG to standard Plan G later if your health needs change.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Connecticut?",
    answer:
      "Connecticut's CHOICES program provides free, unbiased Medicare counseling. Call 1-800-994-9422 to speak with a trained counselor. There is no cost and counselors do not sell insurance. You can also visit the Connecticut Insurance Department at portal.ct.gov/cid for the official DOI rate chart showing all approved premiums from every carrier in the state.",
  },
];
