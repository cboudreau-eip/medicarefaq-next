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

export const STATE_NAME = "Wisconsin";
export const STATE_ABBR = "WI";
export const SAMPLE_CITY = "Milwaukee";

export const STATE_STATS = {
  enrollees: "300,000+",
  lowestPlanG: "$102/mo",
  carriers: "20+",
  medicareTotal: "1.3M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Wisconsin Physicians Service (WPS)",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A",
    planGMonthly: "$118",
    planNMonthly: "$89",
    pros: [
      "Largest Medigap insurer in Wisconsin with 23.5% market share",
      "Wisconsin-based company with deep local roots since 1946",
      "Strong customer service and claims processing",
      "Broad plan availability including Basic Plan and all riders",
      "Competitive pricing for Wisconsin retirees",
    ],
    cons: [
      "Not available in all other states if you relocate",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Wisconsin Physicians Service (WPS) is the dominant Medigap insurer in Wisconsin, holding nearly a quarter of the market. Founded in 1946 and headquartered in Madison, WPS understands Wisconsin's unique plan system better than any national carrier. Their local expertise and strong claims record make them the top pick for Wisconsin retirees.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$134",
    planNMonthly: "$98",
    pros: [
      "18.5% Wisconsin market share",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Basic Plan with all riders",
      "Nurse hotline and wellness programs included",
      "Strong presence in Milwaukee, Madison, and Green Bay",
    ],
    cons: [
      "Higher premiums than WPS and budget options",
      "AARP membership required ($16/year)",
    ],
    highlight:
      "AARP/UnitedHealthcare is the second-largest Medigap insurer in Wisconsin. Their national scale means strong financial backing and added member benefits like a 24/7 nurse hotline. Premiums run higher than WPS, but the AARP brand and member perks attract many Wisconsin enrollees.",
  },
  {
    rank: 3,
    name: "Physicians Mutual",
    badge: "Best for Low Premiums",
    score: 4.5,
    amBest: "A+",
    planGMonthly: "$102",
    planNMonthly: "$76",
    pros: [
      "Lowest Basic Plan premium in Milwaukee at $102/mo",
      "A+ AM Best financial rating",
      "11.6% Wisconsin market share",
      "Household discount available",
      "Strong Midwest presence and agent network",
    ],
    cons: [
      "Complaint ratio slightly above average",
      "Rate increases can be steeper than WPS",
    ],
    highlight:
      "Physicians Mutual offers the lowest Basic Plan premium in the Milwaukee market at $102/mo, backed by an A+ AM Best rating. Their Midwest roots and 11.6% Wisconsin market share reflect strong local trust. Best for budget-conscious enrollees who still want solid financial backing.",
  },
  {
    rank: 4,
    name: "Anthem Blue Cross Blue Shield",
    badge: "Best for Riders",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$126",
    planNMonthly: "$93",
    pros: [
      "6.7% Wisconsin market share",
      "Strong rider availability including Part B excess charges",
      "A AM Best financial rating",
      "Competitive pricing for comprehensive coverage",
      "Household discount available",
    ],
    cons: [
      "Not the cheapest option in Wisconsin",
      "Customer service can vary by region",
    ],
    highlight:
      "Anthem Blue Cross Blue Shield offers strong rider availability in Wisconsin, making it easy to build a comprehensive plan that covers Part B excess charges and extended home health care. Their 6.7% market share reflects solid Wisconsin presence, and their pricing is competitive for enrollees who want more complete coverage.",
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$113",
    planNMonthly: "$83",
    pros: [
      "5.3% Wisconsin market share",
      "Better complaint record than Physicians Mutual",
      "A- AM Best financial rating",
      "Household discount available",
      "Strong middle-ground pricing",
    ],
    cons: [
      "Smaller brand recognition than WPS or AARP/UHC",
      "Fewer supplemental benefits",
    ],
    highlight:
      "Wellabe (formerly Medico) offers a solid middle-ground option in Wisconsin: cheaper than AARP/UHC and Anthem, with a better complaint record than the cheapest carriers. For Wisconsin enrollees who want to save money without sacrificing service quality, Wellabe is a strong alternative worth comparing.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Physicians Mutual", planG: "$102", planN: "$76", planF: "N/A" },
  { carrier: "Wellabe", planG: "$113", planN: "$83", planF: "N/A" },
  { carrier: "Wisconsin Physicians Service", planG: "$118", planN: "$89", planF: "$138" },
  { carrier: "Anthem Blue Cross Blue Shield", planG: "$126", planN: "$93", planF: "$149" },
  { carrier: "AARP / UnitedHealthcare", planG: "$134", planN: "$98", planF: "$158" },
  { carrier: "Mutual of Omaha", planG: "$129", planN: "$95", planF: "$152" },
  { carrier: "Humana", planG: "$131", planN: "$96", planF: "$155" },
  { carrier: "State Farm", planG: "$136", planN: "$99", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "Wisconsin Uses a Unique Plan System",
    description:
      "Wisconsin does not use the standard federal Medigap plan letters (A through N). Instead, Wisconsin has its own standardized system built around a core Basic Plan that can be customized with optional riders. The Basic Plan covers Part A hospital coinsurance, Part A skilled nursing facility coinsurance, Part B coinsurance, blood transfusions, inpatient mental health, home health care, non-Medicare chiropractic care, and non-Medicare hospital charges. Optional riders include the Part A deductible (50% or 100%), Part B excess charges, extended home health care, and foreign travel emergency coverage.",
  },
  {
    title: "High-Deductible and Cost-Sharing Plans Available",
    description:
      "Wisconsin offers a high-deductible plan with a $2,950 deductible in 2026, similar to High-Deductible Plan G in other states. Wisconsin also offers a 50% cost-sharing plan (similar to Plan K, with an $8,000 out-of-pocket maximum in 2026) and a 25% cost-sharing plan (similar to Plan L, with a $4,000 out-of-pocket maximum). These options give Wisconsin enrollees more flexibility than the standard federal plan menu.",
  },
  {
    title: "Under-65 Coverage Required",
    description:
      "Wisconsin law requires Medigap insurers to offer coverage to Medicare beneficiaries under age 65, including those who qualify due to disability or end-stage renal disease. This is a stronger protection than most states, where under-65 coverage is optional. Premiums for under-65 enrollees may be higher than for those who enroll at 65.",
  },
  {
    title: "No Birthday Rule or Anniversary Rule",
    description:
      "Wisconsin does not have a birthday rule or anniversary rule. Your guaranteed-issue window is your 6-month Open Enrollment Period when you first enroll in Medicare Part B. After that window closes, insurers can apply medical underwriting and deny coverage or charge higher premiums based on health conditions.",
  },
  {
    title: "Wisconsin OCI Regulates Medigap",
    description:
      "The Wisconsin Office of the Commissioner of Insurance (OCI) oversees all Medigap policies sold in the state. Carriers must file rate changes and receive approval before implementing increases. You can verify carrier licenses and file complaints at oci.wi.gov or by calling 1-800-236-8517.",
  },
  {
    title: "Free Counseling via Wisconsin SHIP",
    description:
      "Wisconsin's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-242-1060 to speak with a trained counselor who can help you understand Wisconsin's unique plan system, compare carriers, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Basic Plan rates vs. Wisconsin market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types and riders offered in Wisconsin" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "Does Wisconsin use the standard Medicare Supplement plan letters?",
    answer:
      "No. Wisconsin uses its own standardized Medigap plan system instead of the federal lettered plans (A through N). Wisconsin's system is built around a core Basic Plan that covers most Medicare cost-sharing, with optional riders you can add for the Part A deductible, Part B excess charges, extended home health care, and foreign travel emergencies. The result is more flexibility but also more complexity when comparing plans.",
  },
  {
    question: "What is the best Medicare Supplement plan in Wisconsin for 2026?",
    answer:
      "For most Wisconsin enrollees, the Basic Plan with the Part A deductible rider provides the most comprehensive coverage, similar to Plan G in other states. Wisconsin Physicians Service (WPS) consistently ranks highest for financial strength and customer satisfaction among Wisconsin-based carriers. Physicians Mutual offers the lowest premium at $102/mo in Milwaukee but carries a slightly higher complaint ratio.",
  },
  {
    question: "How much does Medicare Supplement cost in Wisconsin?",
    answer:
      "Basic Plan premiums in Wisconsin range from approximately $102/mo to $134/mo for a 65-year-old female nonsmoker in Milwaukee. Premiums vary by carrier, ZIP code, age, gender, tobacco use, and which riders you add. Adding the Part A deductible rider typically adds $15 to $25/mo. The cheapest option is Physicians Mutual at $102/mo, though Wisconsin Physicians Service at $118/mo offers better value with stronger local service.",
  },
  {
    question: "What is the Wisconsin Basic Plan and how does it compare to Plan G?",
    answer:
      "Wisconsin's Basic Plan covers Part A hospital coinsurance, Part A skilled nursing facility coinsurance, Part B coinsurance, blood transfusions, inpatient mental health, and home health care. Adding the Part A deductible rider (100%) makes it functionally equivalent to Plan G in other states, covering everything except the annual Part B deductible ($283 in 2026). The main difference is that Wisconsin's system lets you customize coverage by adding only the riders you need.",
  },
  {
    question: "Does Wisconsin have a birthday rule for Medigap?",
    answer:
      "No. Wisconsin does not have a birthday rule or anniversary rule. Your guaranteed-issue window is your 6-month Open Enrollment Period when you first enroll in Medicare Part B at age 65. After that window closes, insurers can apply medical underwriting. Wisconsin does require insurers to offer coverage to under-65 Medicare beneficiaries, which is a stronger protection than most states.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Wisconsin?",
    answer:
      "Yes, you can apply to switch Medigap plans at any time in Wisconsin, but outside of your Open Enrollment Period you will face medical underwriting. The new carrier will ask health questions and can deny coverage or charge higher premiums based on pre-existing conditions. Wisconsin has no birthday rule or other special switching protections, so your OEP is the best time to lock in the right plan and riders.",
  },
  {
    question: "What is the Wisconsin high-deductible Medigap plan?",
    answer:
      "Wisconsin's high-deductible plan works similarly to High-Deductible Plan G in other states. You pay a deductible of $2,950 (2026) before benefits kick in, but monthly premiums drop to roughly $40 to $55/mo. This is a strong option for healthy Wisconsin retirees who rarely use medical services and want to minimize monthly costs. Wisconsin also offers 50% and 25% cost-sharing plans for enrollees who want partial coverage at lower premiums.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Wisconsin?",
    answer:
      "Wisconsin's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-242-1060 to speak with a trained counselor who can help you understand Wisconsin's unique plan system, compare carriers, and enroll. There is no cost and counselors do not sell insurance. The Wisconsin Office of the Commissioner of Insurance (OCI) also maintains a consumer helpline at 1-800-236-8517.",
  },
];
