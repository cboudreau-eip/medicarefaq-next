/**
 * Writing Config — RankPilot Article Generation Rules
 * 
 * This file contains all the writing rules, brand voice, ICP, banned phrases,
 * and citation sources used by the Transform API to produce high-quality articles.
 * 
 * To update these settings, edit this file directly.
 */

export const writingConfig = {
  // ─── BRAND VOICE ───────────────────────────────────────────────────────────
  brandVoice: {
    name: "Primary Voice",
    primaryTone: ["Educational", "Trustworthy"],
    supportingTone: ["Professional", "Supportive", "Calm"],
    perspective: "Second person (address reader as 'you', 'your')",
    sentenceStyle: "Mixed (Varied and Natural Rhythm)",
    avoid: [
      "Overly technical jargon",
      "Sales-heavy language",
      "Unverified statistics",
      "Exaggerated claims",
      "Rhetorical questions",
    ],
    writingStyleSample: `Medicare can feel confusing at first, but you are not alone. If you are 65 and older or reviewing your current coverage, the process gets easier when you break it into clear steps.

Start by looking at what matters most to you, like your doctors, prescriptions, and monthly budget. Then compare your Medicare options based on coverage and costs, not just the monthly premium. A lower premium can look good at first, but your total cost may be higher when you use care.

The goal is to help you make a confident decision with clear information and licensed support. If you want help reviewing your options, you can speak with a licensed Medicare agent and compare plans available in your area.`,
  },

  // ─── ICP (IDEAL CUSTOMER PROFILE) ─────────────────────────────────────────
  icp: {
    name: "Main ICP",
    description:
      "Adults age 65 and older who are enrolling in Medicare or reviewing their coverage and want clear, trustworthy guidance before choosing a plan. Many feel overwhelmed by the number of options and worry about making the wrong decision. They are looking for a simple way to compare costs, coverage, doctors, and prescriptions so they can choose a plan with confidence.",
    painPoints: [
      "Medicare terms and plan types feel confusing and hard to compare",
      "Fear of choosing the wrong plan and getting stuck with bad coverage",
      "Uncertainty about costs, including premiums, copays, deductibles, and out-of-pocket expenses",
      "Concern about whether preferred doctors and prescriptions will be covered",
      "Anxiety about enrollment deadlines, penalties, and missing the right time to act",
    ],
    goals: [
      "Understand Medicare basics in plain language",
      "Compare plan options based on personal needs and budget",
      "Choose coverage that fits doctors, prescriptions, and expected care needs",
      "Avoid mistakes, penalties, and surprise costs",
      "Feel confident before enrolling",
    ],
    objections: [
      "I need more time before I talk to anyone",
      "I do not want a pushy sales call",
      "I can figure this out myself, I just need to read more first",
      "I am not sure who to trust online",
      "I do not want to choose a plan and regret it later",
    ],
    decisionTriggers: [
      "Turning 65 is coming up soon",
      "Receiving Medicare enrollment information and realizing they need to choose",
      "Confusion after trying to compare plans alone",
      "Concerns about doctor or prescription coverage",
      "Finding a clear, trustworthy source that explains options and offers licensed help",
    ],
    trustSignals: [
      "Clear explanations in plain language without jargon",
      "Licensed Medicare agents who explain options without pressure",
      "Transparent wording about plan availability and how help works",
      "Reviews and testimonials from real clients",
      "A clear comparison process focused on needs, budget, doctors, and prescriptions",
    ],
  },

  // ─── BANNED PHRASES ────────────────────────────────────────────────────────
  bannedPhrases: [
    "Dive in",
    "Dive into",
    "It's important to note that",
    "In today's digital landscape",
    "Navigate the complexities",
    "Delve into",
    "Leverage",
    "Comprehensive guide",
    "Game-changer",
    "Unlock the power of",
    "In conclusion",
    "Whether you're a beginner or an expert",
    "Seamlessly",
    "Robust",
    "Cutting-edge",
    "Empower",
    "At the end of the day",
    "Look no further",
    "Without further ado",
    "Rest assured",
    "A myriad of",
    "In this guide",
  ],

  // ─── CITATION SOURCES ──────────────────────────────────────────────────────
  citationSources: [
    { name: "Medicare Resources", url: "https://www.medicareresources.org/" },
    { name: "AARP", url: "https://www.aarp.org/medicare/" },
    { name: "SHIP", url: "https://www.shiphelp.org/" },
    { name: "CMS", url: "https://www.cms.gov/" },
    { name: "Florida Shine", url: "https://www.floridashine.org/" },
    { name: "OIG", url: "https://oig.hhs.gov/" },
    { name: "ACL", url: "https://acl.gov/" },
    { name: "KFF", url: "https://www.kff.org/topic/medicare/" },
    { name: "MedPac", url: "https://www.medpac.gov/" },
    { name: "SSA", url: "https://www.ssa.gov/medicare" },
    { name: "Data CMS", url: "https://data.cms.gov/" },
  ],

  // ─── MEDICARE REFERENCE DATA (Cross-Reference) ─────────────────────────────
  // The AI MUST use these exact figures when mentioning costs, premiums, or thresholds.
  referenceData: {
    generalYear: {
      currentYear: 2026,
      previousYear: 2025,
      irmaaLookBackYear: 2024,
    },
    partA: {
      "2026 Full Premium": "$565",
      "2025 Full Premium": "$518",
      "2026 Reduced Premium (30+ credits)": "$311",
      "2025 Reduced Premium (30+ credits)": "$285",
      "2026 Deductible": "$1,736",
      "2025 Deductible": "$1,676",
      "2026 Coinsurance Days 61-90": "$434",
      "2025 Coinsurance Days 61-90": "$419",
      "2026 Coinsurance Reserve Days": "$868",
      "2025 Coinsurance Reserve Days": "$838",
      "2026 SNF Coinsurance": "$217",
      "2025 SNF Coinsurance": "$209.50",
    },
    partB: {
      "2026 Standard Premium": "$202.90",
      "2025 Standard Premium": "$185",
      "2026 Deductible": "$283",
      "2025 Deductible": "$257",
    },
    partD: {
      "2026 Average Premium": "$34.50",
      "2026 Maximum Deductible": "$615",
      "2025 Maximum Deductible": "$590",
      "2026 Catastrophic Phase Threshold": "$2,100.00",
      "2025 Catastrophic Phase Threshold": "$2,000.00",
      "Late Enrollment Penalty Base Premium": "$38.99",
    },
    partC: {
      "2026 Maximum MOOP": "$9,250",
    },
    irmaaIndividual: {
      "Level 1 (no surcharge)": "$109,000 or less",
      "Level 2": "> $109,000 and < $137,000",
      "Level 3": "> $137,000 and < $171,000",
      "Level 4": "> $171,000 and < $205,000",
      "Level 5": "> $205,000 and < $500,000",
      "Level 6": "> $500,000",
    },
    irmaaJoint: {
      "Level 1 (no surcharge)": "$218,000 or less",
      "Level 2": "> $218,000 and < $274,000",
      "Level 3": "> $274,000 and < $342,000",
      "Level 4": "> $342,000 and < $410,000",
      "Level 5": "> $410,000 and < $750,000",
      "Level 6": "> $750,000",
    },
    irmaaSeparate: {
      "Level 1 (no surcharge)": "$109,000 or less",
      "Level 2": "> $109,000 and < $391,000",
      "Level 3": "> $391,000",
    },
    irmaaPartBPremiums: {
      "Level 1": "$202.90",
      "Level 2": "$284.10",
      "Level 3": "$405.80",
      "Level 4": "$527.50",
      "Level 5": "$649.20",
      "Level 6": "$689.90",
    },
    irmaaPartDSurcharges: {
      "Level 2": "$14.50",
      "Level 3": "$37.50",
      "Level 4": "$60.40",
      "Level 5": "$83.30",
      "Level 6": "$91.00",
      "Range": "$14.50 - $91.00",
    },
    medigap: {
      "2026 High-Deductible Plan F Deductible": "$2,950.00",
      "2025 High-Deductible Plan F Deductible": "$2,870.00",
      "2026 High-Deductible Plan G Deductible": "$2,950.00",
      "2025 High-Deductible Plan G Deductible": "$2,870.00",
      "2026 Plan K Maximum Out-of-Pocket": "$8,000",
      "2026 Plan L Maximum Out-of-Pocket": "$4,000",
    },
    extraHelp: {
      "2025 Income Limit Individual": "$23,475",
      "2025 Income Limit Married Couple": "$31,725",
      "2025 Resource Limit Individual": "$17,600",
      "2025 Resource Limit Married Couple": "$35,130",
    },
    therapyLimits: {
      "2026 Speech Therapy Cap": "$2,480",
    },
    irsDeductions: {
      "2025 Standard Deduction Single": "$15,750",
      "2025 Standard Deduction Married Filing Jointly": "$31,500",
      "2025 Additional Deduction Single 65+": "$2,000",
      "2025 Additional Deduction Couples 65+": "$1,600",
      "2026 Standard Deduction Single": "$16,100",
      "2026 Standard Deduction Married Filing Jointly": "$32,200",
      "2026 Additional Deduction Single 65+": "$2,050",
      "2026 Additional Deduction Couples 65+": "$1,650",
    },
  },

  // ─── HARDCODED WRITING RULES ───────────────────────────────────────────────
  hardcodedRules: {
    targetWordCount: 2000,
    numSections: "7-8",
    numFaqs: "4-5",
    introRules: [
      "Include a compelling introduction that hooks the reader.",
      "NEVER start with 'If you are...', 'Whether you are...', 'As a...', or any direct audience-addressing formula.",
      "Rotate opening strategies: surprising facts, bold claims, mini-stories, provocative questions, or recent trends.",
      "The reader's context should emerge naturally, not be stated upfront.",
    ],
    statisticsRules: [
      "Include relevant statistics and examples — but NEVER reuse generic or overused statistics.",
      "Do NOT use the phrase 'More than 33 million Americans' or any variation.",
      "Do NOT recycle the same statistics across articles.",
      "Prefer specific, niche statistics over broad national figures.",
      "Vary the framing: percentages vs. absolute numbers vs. comparisons vs. ratios.",
    ],
    faqRules: [
      "Each FAQ answer MUST be 2-4 sentences maximum (40-80 words).",
      "Lead directly with the answer — no preamble, no 'Short Answer:' prefix, no 'Great question' openers.",
      "Give one supporting detail if needed, then stop.",
      "FAQ answers must be scannable and conversational, NOT essay-length.",
    ],
    anchorTextRules: [
      "Anchor text MUST be 2-7 words. NEVER wrap an entire sentence as a link.",
      "The linked phrase should be a natural keyword or key concept, NOT a full sentence.",
      "NEVER use generic anchor text like 'Learn more at', 'Click here', 'Visit', or just the source name.",
      "The anchor text MUST be the actual claim or fact being cited, kept to 2-7 words.",
      "NEVER link to a homepage URL — always use the most specific deep page URL.",
      "The ENTIRE href value MUST be on a single line with NO line breaks or spaces inside the URL.",
    ],
    paragraphRules: [
      "Vary sentence length: short for emphasis, medium for clarity, longer for explanation.",
      "Paragraphs MUST be 2-5 sentences maximum. NEVER write a paragraph longer than 5 sentences.",
      "If a paragraph exceeds 5 sentences, split it into two separate paragraphs.",
      "Create natural rhythm by alternating short and medium sentences.",
      "Each paragraph should cover one idea or sub-point before starting a new paragraph.",
    ],
    tableRules: [
      "Output proper HTML tables using <table>, <thead>, <tbody>, <tr>, <th>, and <td> tags.",
      "NEVER use markdown table syntax (pipes |).",
      "Always include at least 3 data rows.",
    ],
    htmlFormatRules: [
      "Use proper HTML formatting: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <table> tags.",
      "For links use <a href=\"URL\">anchor text</a> format.",
      "Return ONLY the HTML content of the article body (no <html>, <head>, or <body> tags).",
      "Start with the first <h2> section.",
      "Each section should flow naturally into the next.",
      "End with a strong conclusion and call to action.",
      "Include bullet points and numbered lists where appropriate.",
    ],
  },
};

/**
 * Builds the complete system prompt for article transformation
 * by combining all writing config layers.
 */
export function buildWritingPrompt(): string {
  const config = writingConfig;
  const now = new Date();
  const currentMonth = now.toLocaleString("en-US", { month: "long" });
  const currentYear = now.getFullYear();

  return `
=== DATE & YEAR AWARENESS ===
IMPORTANT — CURRENT DATE CONTEXT: Today's date is ${currentMonth} ${currentYear}. You MUST treat ${currentYear} as the current year. All references to dates, years, statistics, regulations, and time-sensitive information MUST reflect ${currentYear} as the present year. Do NOT reference ${currentYear - 1} or any prior year as "current" or "this year." If citing statistics or data, prefer the most recent available and clearly label the year of the data.

=== WORD COUNT & STRUCTURE ===
- Target approximately ${config.hardcodedRules.targetWordCount} words total.
- Create ${config.hardcodedRules.numSections} main H2 sections.
- Include a FAQ section with ${config.hardcodedRules.numFaqs} questions.
- PER-SECTION WORD TARGETS: Each section may include a [TARGET: ~N words] directive. Respect these per-section word counts. Do NOT significantly exceed any section's target.

=== INTRODUCTION RULES ===
${config.hardcodedRules.introRules.map((r) => `- ${r}`).join("\n")}

=== STATISTICS & CONTENT UNIQUENESS ===
${config.hardcodedRules.statisticsRules.map((r) => `- ${r}`).join("\n")}
- CONTENT UNIQUENESS: Every article must feel distinct. Avoid formulaic phrases, recycled openings, and boilerplate sentences. Write as if the reader has already read 10 other articles on this subject.

=== FAQ ANSWER RULES (CRITICAL) ===
${config.hardcodedRules.faqRules.map((r) => `- ${r}`).join("\n")}

=== HTML FORMATTING RULES ===
${config.hardcodedRules.htmlFormatRules.map((r) => `- ${r}`).join("\n")}

=== ANCHOR TEXT & LINK RULES ===
${config.hardcodedRules.anchorTextRules.map((r) => `- ${r}`).join("\n")}

=== TABLE FORMAT RULES ===
${config.hardcodedRules.tableRules.map((r) => `- ${r}`).join("\n")}

=== PARAGRAPH & SENTENCE STRUCTURE RULES (MANDATORY) ===
${config.hardcodedRules.paragraphRules.map((r) => `- ${r}`).join("\n")}
CRITICAL: These paragraph length rules are NON-NEGOTIABLE. After writing each section, review it and break up any paragraph that violates the sentence count limit above.

=== BRAND VOICE GUIDELINES ===
Voice Name: ${config.brandVoice.name}
PRIMARY TONE (emphasize these most): ${config.brandVoice.primaryTone.join(", ")}
SUPPORTING TONE (subtle undertones): ${config.brandVoice.supportingTone.join(", ")}
PERSPECTIVE: ${config.brandVoice.perspective}
SENTENCE STYLE: ${config.brandVoice.sentenceStyle}

THINGS TO STRICTLY AVOID:
${config.brandVoice.avoid.map((a) => `- DO NOT use ${a}`).join("\n")}

Writing Style Example (learn the STYLE, not the content):
"""
${config.brandVoice.writingStyleSample}
"""
CRITICAL - DO NOT COPY from the example above:
- Do NOT reuse any specific phrases, sentences, statistics, or openings from this sample.
- Do NOT start your article with the same hook or premise as this sample.
- The sample demonstrates TONE and STYLE patterns only — extract the rhythm, word choice tendencies, and structural approach.

=== IDEAL CUSTOMER PROFILE (ICP) ===
ICP Name: ${config.icp.name}
Who They Are: ${config.icp.description}

PAIN POINTS (emphasize these problems):
${config.icp.painPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

GOALS (what they want to achieve):
${config.icp.goals.map((g, i) => `${i + 1}. ${g}`).join("\n")}

COMMON OBJECTIONS (address these concerns):
${config.icp.objections.map((o, i) => `${i + 1}. ${o}`).join("\n")}

DECISION TRIGGERS (what prompts action):
${config.icp.decisionTriggers.map((t, i) => `${i + 1}. ${t}`).join("\n")}

TRUST SIGNALS (what builds confidence):
${config.icp.trustSignals.map((s, i) => `${i + 1}. ${s}`).join("\n")}

ICP ENFORCEMENT RULES:
- INTRO: The introduction must resonate with the ICP audience, but VARY the opening approach each time.
- HEADINGS: At least 30% of H2/H3 headings must reflect ICP pain points or intent language.
- FAQs: At least 60% of FAQ questions must be derived from the ICP's objections and decision triggers.
- EXAMPLES: Include at least 2 examples or scenarios consistent with the ICP description.
- TRUST: Naturally incorporate at least 2 trust signals into the content.
- COMPLIANCE: Avoid guarantees, exaggerated claims, or fear-based messaging.

=== BANNED PHRASES (ABSOLUTE HARD CONSTRAINT) ===
The following phrases MUST NEVER appear in the generated content under any circumstances:
${config.bannedPhrases.map((p) => `- "${p}"`).join("\n")}
If you find yourself about to write any of these phrases, stop and rephrase using completely different wording.

=== PREFERRED CITATION SOURCES ===
When linking to external sources, prefer these authoritative sites:
${config.citationSources.map((s) => `- ${s.name}: ${s.url}`).join("\n")}
Always link to the most specific deep page URL relevant to the claim, not the homepage.

=== MEDICARE REFERENCE DATA (CROSS-REFERENCE — USE EXACT FIGURES) ===
When the article mentions any Medicare costs, premiums, deductibles, IRMAA brackets, or thresholds, you MUST use the exact figures below. Do NOT guess, round, or use outdated numbers. If a figure is not listed here, do not invent one — omit it or state it is subject to change.

${buildReferenceDataBlock()}
`.trim();
}

/**
 * Formats the reference data into a readable block for the AI prompt.
 */
function buildReferenceDataBlock(): string {
  const ref = writingConfig.referenceData;
  const sections: string[] = [];

  sections.push(`Current Year: ${ref.generalYear.currentYear}`);
  sections.push(`Previous Year: ${ref.generalYear.previousYear}`);
  sections.push(`IRMAA Look-Back Year: ${ref.generalYear.irmaaLookBackYear}`);
  sections.push("");

  const formatSection = (title: string, data: Record<string, string>) => {
    const lines = [`--- ${title} ---`];
    for (const [key, value] of Object.entries(data)) {
      lines.push(`${key}: ${value}`);
    }
    return lines.join("\n");
  };

  sections.push(formatSection("Part A Premiums & Costs", ref.partA));
  sections.push(formatSection("Part B Premiums & Costs", ref.partB));
  sections.push(formatSection("Part D Costs", ref.partD));
  sections.push(formatSection("Part C (Medicare Advantage)", ref.partC));
  sections.push(formatSection("IRMAA Individual Income Thresholds", ref.irmaaIndividual));
  sections.push(formatSection("IRMAA Joint Income Thresholds", ref.irmaaJoint));
  sections.push(formatSection("IRMAA Married Filing Separately", ref.irmaaSeparate));
  sections.push(formatSection("IRMAA Part B Premium Surcharges (Total Monthly)", ref.irmaaPartBPremiums));
  sections.push(formatSection("IRMAA Part D Surcharges (Additional Monthly)", ref.irmaaPartDSurcharges));
  sections.push(formatSection("Medigap Plans", ref.medigap));
  sections.push(formatSection("Extra Help (Low-Income Subsidy)", ref.extraHelp));
  sections.push(formatSection("Therapy & Other Limits", ref.therapyLimits));
  sections.push(formatSection("IRS Standard Deductions", ref.irsDeductions));

  return sections.join("\n\n");
}
