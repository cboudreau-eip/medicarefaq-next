/**
 * Michigan Medicare Supplement (Medigap) Data
 * Sources: FairSquare Medicare (Grand Rapids premiums), AARP/UHC Medigap Report Dec 2024,
 *          Mark Farrah Associates, CMS Medicare Plan Finder
 * Last updated: February 2026
 */

export interface MICarrier {
  id: string;
  name: string;
  displayName: string;
  badge: string;
  medicareFaqScore: number;
  amBestRating: string;
  planGMonthly: string;
  planNMonthly: string;
  plansOffered: string[];
  pros: string[];
  cons: string[];
  discounts: string;
  complaintRecord: string;
}

export const MI_CARRIERS: MICarrier[] = [
  {
    id: "state-farm",
    name: "State Farm",
    displayName: "State Farm",
    badge: "Best Overall",
    medicareFaqScore: 4.9,
    amBestRating: "A++",
    planGMonthly: "$128",
    planNMonthly: "$96",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    pros: [
      "Highest financial strength rating (A++) in the industry",
      "Exceptional local agent network across Michigan",
      "Far-fewer-than-expected complaints with NAIC",
      "Strong customer service reputation in Midwest markets",
      "Competitive premiums for Plan G in Detroit and Grand Rapids",
    ],
    cons: [
      "Fewer plan types than some national carriers",
      "Must work through a local agent (no direct online enrollment)",
      "Premiums may be slightly higher than budget options",
    ],
    discounts: "Household discount available in most Michigan ZIP codes",
    complaintRecord: "Far fewer than expected (NAIC)",
  },
  {
    id: "aarp-uhc",
    name: "AARP/UnitedHealthcare",
    displayName: "AARP/UnitedHealthcare",
    badge: "Best Plan Availability",
    medicareFaqScore: 4.7,
    amBestRating: "A",
    planGMonthly: "$143",
    planNMonthly: "$108",
    plansOffered: ["A", "B", "C", "D", "F", "G", "K", "L", "N"],
    pros: [
      "Largest Medigap insurer in Michigan by enrollment",
      "Most plan types available (9 options)",
      "Gym membership (Renew Active) included with most plans",
      "Strong brand recognition and nationwide network",
      "Household discount of up to 7%",
    ],
    cons: [
      "Requires AARP membership ($16/year) to enroll",
      "Premiums are higher than budget carriers",
      "Slightly more complaints than State Farm",
    ],
    discounts: "Household discount up to 7%; AARP membership required",
    complaintRecord: "Slightly more than expected (NAIC)",
  },
  {
    id: "healthspring",
    name: "HealthSpring",
    displayName: "HealthSpring (Cigna)",
    badge: "Best for Low Premiums",
    medicareFaqScore: 4.5,
    amBestRating: "A",
    planGMonthly: "$99",
    planNMonthly: "$72",
    plansOffered: ["A", "F", "G", "N"],
    pros: [
      "Lowest Plan G premium in Michigan at $99/mo (Grand Rapids)",
      "Strong financial backing from Cigna parent company",
      "A rating from AM Best",
      "Good option for budget-conscious enrollees",
    ],
    cons: [
      "Far-higher-than-expected complaint rate with NAIC",
      "Fewer plan types (4 options)",
      "Customer service quality concerns reported",
      "Limited local agent presence in Michigan",
    ],
    discounts: "Household discount available",
    complaintRecord: "Far higher than expected (NAIC) - use with caution",
  },
  {
    id: "mutual-of-omaha",
    name: "Mutual of Omaha",
    displayName: "Mutual of Omaha",
    badge: "Best Discounts",
    medicareFaqScore: 4.4,
    amBestRating: "A+",
    planGMonthly: "$138",
    planNMonthly: "$104",
    plansOffered: ["A", "C", "D", "F", "G", "N"],
    pros: [
      "Industry-leading household discount (up to 12%)",
      "A+ AM Best rating for financial strength",
      "Excellent customer service - U.S.-based call centers",
      "Strong reputation for claims processing",
      "High-Deductible Plan G available",
    ],
    cons: [
      "Premiums are mid-range, not the lowest in Michigan",
      "Slightly more complaints than State Farm",
    ],
    discounts: "Household discount up to 12% - best in class",
    complaintRecord: "Slightly more than expected (NAIC)",
  },
  {
    id: "wellabe",
    name: "Wellabe",
    displayName: "Wellabe",
    badge: "Best Budget Option",
    medicareFaqScore: 4.2,
    amBestRating: "A-",
    planGMonthly: "$113",
    planNMonthly: "$84",
    plansOffered: ["A", "F", "G", "N"],
    pros: [
      "Second-lowest Plan G premium among top-rated carriers",
      "Better complaint record than HealthSpring",
      "Good value for price-sensitive enrollees",
      "A- AM Best rating",
    ],
    cons: [
      "Smaller company with less brand recognition",
      "Fewer plan types (4 options)",
      "Limited local agent presence in Michigan",
    ],
    discounts: "Household discount available in Michigan",
    complaintRecord: "Average (NAIC)",
  },
];

export const MI_STATS = {
  state: "Michigan",
  stateAbbr: "MI",
  medigapEnrollees: "~375,000",
  numberOfCarriers: "30+",
  lowestPlanGPremium: "$99/mo",
  lowestPlanNPremium: "$72/mo",
  averagePlanGPremium: "$128/mo",
  averagePlanNPremium: "$96/mo",
  planGAdoptionRate: "47%",
  ratingType: "Attained-age",
  birthdayRule: false,
  guaranteedIssue: "OEP only",
  shipProgram: "MMAP",
  regulator: "Michigan Department of Insurance and Financial Services (DIFS)",
  sampleCity: "Grand Rapids",
  partBDeductible: "$283",
  partADeductible: "$1,736",
};

export const MI_FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Michigan?",
    answer:
      "Plan G is the best Medicare Supplement plan for most Michigan residents enrolling in 2026. It covers all out-of-pocket Medicare costs except the annual Part B deductible ($283), giving you predictable costs with no copays or coinsurance. State Farm is our top-rated carrier in Michigan for its exceptional financial strength (A++ AM Best) and low complaint record.",
  },
  {
    question: "How much does Plan G cost in Michigan?",
    answer:
      "Plan G premiums in Michigan start at $99/mo for a 65-year-old female nonsmoker in Grand Rapids (HealthSpring/Cigna). The average across top-rated carriers is around $128/mo. Premiums vary by city - Detroit and Ann Arbor tend to be slightly higher than Grand Rapids or Lansing. Michigan uses attained-age rating, so premiums increase as you age.",
  },
  {
    question: "Does Michigan have a birthday rule?",
    answer:
      "No. Michigan does not have a birthday rule. Unlike California, which allows Medigap enrollees to switch to an equal or lesser plan during a 60-day window around their birthday each year, Michigan enrollees can only switch plans after their Open Enrollment Period by passing medical underwriting. This makes your initial enrollment decision especially important.",
  },
  {
    question: "What is the cheapest Medicare Supplement plan in Michigan?",
    answer:
      "HealthSpring (Cigna) offers the lowest Plan G premium in Michigan at $99/mo in Grand Rapids. However, HealthSpring has a far-higher-than-expected complaint rate. Wellabe at $113/mo offers a better balance of low cost and service quality. High-Deductible Plan G is another budget option - it has a lower monthly premium but requires you to pay a $2,870 deductible in 2026 before full coverage kicks in.",
  },
  {
    question: "Can I switch Medigap plans in Michigan?",
    answer:
      "After your 6-month Open Enrollment Period, you can apply to switch Medigap plans, but carriers can deny coverage or charge more based on your health history. Michigan does not have a birthday rule or guaranteed issue outside of specific qualifying events. This is why enrolling during your OEP at 65 is so important - it is the only time carriers cannot deny you coverage.",
  },
  {
    question: "What is MMAP and how can it help me?",
    answer:
      "MMAP (Medicare/Medicaid Assistance Program) is Michigan's State Health Insurance Assistance Program (SHIP). It provides free, unbiased Medicare counseling from trained volunteers. MMAP counselors can help you compare Medigap plans, understand your options, and navigate enrollment at no cost. Call 1-800-803-7174 to reach MMAP.",
  },
  {
    question: "Is BCBS Michigan a good choice for Medigap?",
    answer:
      "Blue Cross Blue Shield of Michigan is the dominant health insurer in the state with about 50% of the overall health insurance market. While not included in our top 5 nationally-rated picks, BCBS Michigan is a well-recognized local option worth getting a quote from when shopping for Medigap. Their local presence and brand recognition make them a trusted choice for many Michigan residents.",
  },
  {
    question: "What is High-Deductible Plan G and is it worth it in Michigan?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G, but you pay a $2,870 deductible in 2026 before the plan pays anything. In exchange, the monthly premium is significantly lower - often $40-60/mo in Michigan. HDG is worth considering if you are generally healthy, have savings to cover the deductible, and want to minimize monthly costs. Mutual of Omaha offers HDG in Michigan.",
  },
];

export const SCORING_METHODOLOGY = {
  lastUpdated: "February 2026",
  dataSource: "NAIC, AM Best, CMS Medicare Plan Finder, NerdWallet",
  factors: [
    {
      name: "Financial Strength (AM Best Rating)",
      weight: "30%",
      description:
        "AM Best financial strength rating, indicating the carrier's ability to pay claims.",
    },
    {
      name: "Customer Complaints (NAIC Complaint Index)",
      weight: "25%",
      description:
        "NAIC complaint index compared to industry average. Lower is better.",
    },
    {
      name: "Premium Competitiveness",
      weight: "20%",
      description:
        "Plan G and Plan N premiums relative to market average for a 65-year-old female nonsmoker.",
    },
    {
      name: "Plan Availability",
      weight: "15%",
      description:
        "Number of Medigap plan types offered in Michigan.",
    },
    {
      name: "Discounts & Extra Benefits",
      weight: "10%",
      description:
        "Household discounts, gym memberships, and other value-add benefits.",
    },
  ],
};
