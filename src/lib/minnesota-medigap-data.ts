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

export const STATE_NAME = "Minnesota";
export const STATE_ABBR = "MN";
export const SAMPLE_CITY = "Minneapolis";

export const STATE_STATS = {
  enrollees: "200,000+",
  lowestPlanG: "$250/mo",
  carriers: "15+",
  medicareTotal: "1.1M",
};

// Note: Minnesota uses "Extended Basic" instead of Plan G, and "Basic" instead of Plan A.
// planGMonthly = Extended Basic monthly premium
// planNMonthly = Plan N monthly premium (Plan N is available in MN)

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Blue Cross Blue Shield of Minnesota",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$268",
    planNMonthly: "$210",
    pros: [
      "Largest Medicare Supplement insurer in Minnesota",
      "A+ AM Best financial strength rating",
      "Deep local provider network across all 87 counties",
      "Strong customer service with local Minnesota offices",
      "Community-rated pricing provides long-term premium stability",
    ],
    cons: [
      "Higher starting premium than some competitors",
      "Community rating means no age-based savings at 65",
    ],
    highlight:
      "Blue Cross Blue Shield of Minnesota is the dominant local carrier, covering more Minnesotans than any other Medigap insurer. Their A+ financial rating, statewide provider network, and deep roots in Minnesota healthcare make them the top choice for enrollees who want a carrier with proven local staying power.",
  },
  {
    rank: 2,
    name: "HealthPartners",
    badge: "Best Local Network",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$255",
    planNMonthly: "$198",
    pros: [
      "Strong Twin Cities and Greater Minnesota network",
      "Integrated care model with HealthPartners clinics",
      "Competitive Extended Basic premium",
      "A AM Best financial rating",
      "Well-regarded member satisfaction scores",
    ],
    cons: [
      "Network strongest in metro areas",
      "Fewer plan options than national carriers",
    ],
    highlight:
      "HealthPartners is a Minnesota-based nonprofit insurer with an integrated care model that pairs well with their Medigap coverage. Their strong Twin Cities network and competitive Extended Basic premiums make them a top pick for enrollees in the Minneapolis-St. Paul metro area.",
  },
  {
    rank: 3,
    name: "Medica",
    badge: "Best for Rural Minnesota",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$250",
    planNMonthly: "$192",
    pros: [
      "Lowest Extended Basic premium among top carriers",
      "Strong rural Minnesota coverage",
      "A- AM Best financial rating",
      "Minnesota-based nonprofit with local focus",
      "Competitive Plan N pricing",
    ],
    cons: [
      "Smaller national footprint if you travel frequently",
      "Fewer supplemental benefits than national carriers",
    ],
    highlight:
      "Medica offers the most competitive Extended Basic premium among Minnesota's top carriers at $250/mo, and their rural Minnesota network is the strongest of any local insurer. For enrollees outside the Twin Cities metro, Medica is often the best combination of price and local coverage.",
  },
  {
    rank: 4,
    name: "Mutual of Omaha",
    badge: "Best for Travelers",
    score: 4.4,
    amBest: "A+",
    planGMonthly: "$285",
    planNMonthly: "$220",
    pros: [
      "A+ AM Best financial strength rating",
      "Strong foreign travel emergency coverage",
      "Nationwide acceptance at any Medicare provider",
      "U.S.-based customer service team",
      "Household discount of 7% available",
    ],
    cons: [
      "Higher premium than local MN carriers",
      "Less familiar with Minnesota-specific plan structure",
    ],
    highlight:
      "Mutual of Omaha is the top nationally-rated carrier available in Minnesota. Their A+ financial rating and 7% household discount make them worth considering, especially for enrollees who travel frequently and want a carrier with strong claims support outside Minnesota.",
  },
  {
    rank: 5,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.2,
    amBest: "A",
    planGMonthly: "$295",
    planNMonthly: "$230",
    pros: [
      "Largest Medicare Supplement enrollment nationally",
      "AARP member benefits and brand recognition",
      "Broad plan selection including Plans K, L, M, N",
      "24/7 nurse hotline included",
      "Strong national provider network",
    ],
    cons: [
      "Highest premium among top Minnesota carriers",
      "AARP membership required ($16/year)",
      "Less competitive than local carriers in MN",
    ],
    highlight:
      "AARP/UnitedHealthcare offers the broadest plan selection in Minnesota including Plans K, L, M, and N in addition to Basic and Extended Basic. Their national brand and 24/7 nurse hotline add value, though their premiums run higher than local carriers like BCBS MN, HealthPartners, and Medica.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Medica", planG: "$250", planN: "$192", planF: "N/A" },
  { carrier: "HealthPartners", planG: "$255", planN: "$198", planF: "N/A" },
  { carrier: "Blue Cross Blue Shield MN", planG: "$268", planN: "$210", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$285", planN: "$220", planF: "$310" },
  { carrier: "AARP / UnitedHealthcare", planG: "$295", planN: "$230", planF: "$325" },
  { carrier: "Aetna", planG: "$272", planN: "$212", planF: "N/A" },
  { carrier: "Cigna", planG: "$260", planN: "$200", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "Community Rating: Same Premium for All Ages",
    description:
      "Minnesota requires all Medigap carriers to use community rating, meaning everyone with the same plan pays the same monthly premium regardless of age. A 65-year-old and an 85-year-old pay identical rates. While this means higher starting premiums than age-rated states like Iowa or Wisconsin, your premium will not increase simply because you get older. This provides significant long-term financial stability.",
  },
  {
    title: "Basic and Extended Basic Plans Instead of Lettered Plans",
    description:
      "Minnesota uses its own standardized plan system instead of the federal lettered plans (A through N). The Basic Plan covers core benefits including hospital costs, medical costs, blood, and hospice care. The Extended Basic Plan adds coverage for the Part A deductible, skilled nursing facility care, foreign travel emergency, and usual and customary fees. Plans K, L, M, and N are also available in Minnesota.",
  },
  {
    title: "Riders Available to Customize the Basic Plan",
    description:
      "Minnesota allows enrollees to add optional riders to the Basic Plan for additional coverage. Available riders include the Part A deductible, usual and customary fee coverage, and non-Medicare preventive care. The Part B deductible rider is only available to those who became Medicare-eligible before January 1, 2020. This a la carte approach lets you tailor coverage to your specific needs.",
  },
  {
    title: "No Part B Excess Charges in Minnesota",
    description:
      "Minnesota state law prohibits doctors from billing Medicare patients for Part B excess charges, which in other states can add up to 15% above the Medicare-approved amount. This means you do not need to worry about excess charge coverage when choosing a Medigap plan in Minnesota, though you may face excess charges if you travel to other states.",
  },
  {
    title: "New 2026 Guaranteed Issue Rule for Ages 65 to 70",
    description:
      "Effective August 1, 2026, Minnesotans ages 65 to 70 have a one-time opportunity to enroll in or switch to a Medigap policy outside of their initial Open Enrollment Period without medical underwriting. A premium penalty applies, starting at 15% in 2026 and increasing by 5% per year up to a maximum of 35% starting in 2029. This is a significant new protection for early Medicare enrollees.",
  },
  {
    title: "Free Counseling via Minnesota Senior LinkAge Line",
    description:
      "The Minnesota Senior LinkAge Line (1-800-333-2433) provides free, unbiased Medicare counseling through the Minnesota Board on Aging. Trained counselors can help you compare Basic vs. Extended Basic plans, understand riders, and navigate the unique Minnesota Medigap system. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Extended Basic and Plan N rates vs. Minnesota market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Minnesota" },
  { factor: "Local Network Strength", weight: "15%", description: "Provider network depth across Minnesota counties" },
];

export const FAQS: FaqItem[] = [
  {
    question: "Why are Medicare Supplement premiums so much higher in Minnesota than other states?",
    answer:
      "Minnesota uses community rating, which means everyone with the same plan pays the same premium regardless of age. A 65-year-old pays the same as an 85-year-old. In age-rated states like Iowa or Wisconsin, premiums start low at 65 but increase significantly with age. Minnesota's higher starting premium is the trade-off for long-term stability and no age-based increases.",
  },
  {
    question: "What is the difference between the Basic Plan and Extended Basic Plan in Minnesota?",
    answer:
      "The Basic Plan covers core benefits including hospital costs, medical costs, blood, and hospice care. The Extended Basic Plan adds coverage for the Part A deductible, skilled nursing facility care beyond 100 days, 80% foreign travel emergency coverage, and usual and customary fees. The Extended Basic is the closest equivalent to Plan G in other states.",
  },
  {
    question: "Does Minnesota have Plan G?",
    answer:
      "No. Minnesota does not offer the standard federal lettered plans like Plan G or Plan F for new enrollees. Instead, Minnesota uses its own system with a Basic Plan and an Extended Basic Plan. The Extended Basic Plan provides similar coverage to Plan G in other states. Plans K, L, M, and N are also available in Minnesota.",
  },
  {
    question: "Can I add riders to my Minnesota Medigap plan?",
    answer:
      "Yes. Minnesota allows you to add optional riders to the Basic Plan. Available riders include the Part A deductible rider, usual and customary fee coverage, and non-Medicare preventive care. The Part B deductible rider is only available to those who became Medicare-eligible before January 1, 2020.",
  },
  {
    question: "What is the new 2026 guaranteed issue rule in Minnesota?",
    answer:
      "Effective August 1, 2026, Minnesotans ages 65 to 70 have a one-time opportunity to enroll in or switch to a Medigap policy outside of their initial Open Enrollment Period without medical underwriting. A premium penalty applies starting at 15% and increasing by 5% per year up to a maximum of 35%. This is a new protection that did not exist before 2026.",
  },
  {
    question: "Which carrier has the lowest Medigap premium in Minnesota?",
    answer:
      "Medica offers the lowest Extended Basic premium among top carriers at approximately $250/mo for a Minneapolis-area enrollee. HealthPartners is close at $255/mo. Premiums vary by ZIP code, with rural Minnesota typically lower than the Twin Cities metro. Community rating means age does not affect your premium.",
  },
  {
    question: "Can I see any doctor with a Minnesota Medigap plan?",
    answer:
      "Yes. Minnesota Medigap plans work with any doctor or hospital in the United States that accepts Medicare. You do not need a referral and are not restricted to a network. This is one of the key advantages of Medigap over Medicare Advantage plans, which typically require you to use in-network providers.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Minnesota?",
    answer:
      "The Minnesota Senior LinkAge Line (1-800-333-2433) provides free, unbiased Medicare counseling through the Minnesota Board on Aging. Counselors can help you compare Basic vs. Extended Basic plans, understand riders, and navigate the unique Minnesota Medigap system. There is no cost and counselors do not sell insurance.",
  },
];
