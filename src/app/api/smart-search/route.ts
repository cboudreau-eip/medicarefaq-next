import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/**
 * POST /api/smart-search
 * AI-powered Medicare search using Claude + sitemap context.
 * Accepts { query: string } and returns { answer, url, relatedLinks[] }.
 */

const SITE_PAGES = [
  { url: "/", title: "Home", description: "MedicareFAQ - Your Supplemental Medicare Resource Center" },
  { url: "/medicare-101", title: "Medicare 101 Guide", description: "Everything you need to know about Medicare basics" },
  { url: "/new-to-medicare/eligibility", title: "Am I Eligible?", description: "Find out if you qualify for Medicare coverage" },
  { url: "/new-to-medicare/turning-65", title: "Turning 65 Timeline", description: "Key dates and deadlines as you approach 65" },
  { url: "/new-to-medicare/costs", title: "What Does Medicare Cost?", description: "Understand premiums, deductibles, and out-of-pocket costs" },
  { url: "/new-to-medicare/checklist", title: "Getting Started Checklist", description: "Step-by-step checklist for new Medicare enrollees" },
  { url: "/medicare-supplements", title: "Medicare Supplement Plans", description: "Fill the gaps in Original Medicare coverage with Medigap" },
  { url: "/medicare-supplements/compare", title: "Compare Medigap Plans", description: "Side-by-side comparison of Medigap plans A through N" },
  { url: "/medicare-supplements/medigap-eligibility", title: "Medigap Eligibility", description: "Who qualifies for Medicare Supplement insurance" },
  { url: "/medicare-supplements/medicare-supplement-plans-2026", title: "Medicare Supplement Plans 2026", description: "Updated rates and plan details for 2026" },
  { url: "/medicare-supplements/medigap-by-carrier", title: "Medigap by Carrier", description: "Compare Medicare Supplement plans by insurance company" },
  { url: "/medicare-supplements/medigap-by-state", title: "Medigap by State", description: "Find Medicare Supplement plans available in your state" },
  { url: "/medicare-plans", title: "All Medicare Plans", description: "Overview of every Medicare plan type" },
  { url: "/medicare-plans/costs", title: "Medicare Plans Costs", description: "What you'll pay for each Medicare plan type" },
  { url: "/medicare-plans/supplement-vs-advantage", title: "Supplement vs. Advantage", description: "Pros, cons, and costs of Medigap vs Medicare Advantage" },
  { url: "/medicare-plans/best-supplement-plans", title: "Best Medicare Supplement Plans", description: "Plan F, G, and N compared with current rates" },
  { url: "/medicare-part-c/medicare-advantage-plans", title: "Medicare Advantage Plans (Part C)", description: "All-in-one alternative to Original Medicare" },
  { url: "/medicare-part-c/medicare-advantage-plan-types", title: "Medicare Advantage Plan Types", description: "HMO, PPO, PFFS, and SNP plans explained" },
  { url: "/original-medicare", title: "Original Medicare", description: "Hospital and medical insurance basics (Parts A & B)" },
  { url: "/original-medicare/medicare-parts/medicare-part-d", title: "Medicare Part D", description: "Prescription drug coverage options and plans" },
  { url: "/enrollment/turning-65", title: "Turning 65 Enrollment", description: "How to enroll when you first become eligible for Medicare" },
  { url: "/enrollment/working-past-65", title: "Working Past 65", description: "Medicare and employer coverage coordination" },
  { url: "/enrollment/annual-changes", title: "Annual Changes", description: "What changes each year and how it affects your Medicare" },
  { url: "/enrollment/late-penalties", title: "Late Enrollment Penalties", description: "Avoid costly late enrollment penalties" },
  { url: "/enrollment/how-to-enroll", title: "How to Enroll in Medicare", description: "Step-by-step enrollment process guide" },
  { url: "/faqs", title: "Coverage FAQs", description: "Browse all Medicare coverage questions and answers" },
  { url: "/faqs/does-medicare-cover-dental-implants", title: "Does Medicare Cover Dental Implants?", description: "Coverage for dental implants under Medicare" },
  { url: "/faqs/does-medicare-cover-hearing-aids", title: "Does Medicare Cover Hearing Aids?", description: "Hearing aid coverage under Medicare plans" },
  { url: "/faqs/does-medicare-cover-pre-existing-conditions", title: "Pre-Existing Conditions", description: "How Medicare handles pre-existing conditions" },
  { url: "/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes", title: "Medicare Costs in 2026", description: "Premiums, deductibles, and key changes for 2026" },
  { url: "/faqs/medicare-advantage-extra-benefits-explained-whats-really-included", title: "Medicare Advantage Extra Benefits", description: "What's really included in MA extra benefits" },
  { url: "/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling", title: "Medigap vs Medicare Advantage", description: "Crucial questions to ask before enrolling" },
  { url: "/faqs/when-should-you-enroll-in-medicare-if-still-working", title: "Enrolling While Working", description: "When to enroll if you're still employed past 65" },
  { url: "/faqs/medicare-supplement-vs-medicare-advantage-for-veterans-choosing-the-right-coverage", title: "Veterans Coverage Guide", description: "Choosing the right coverage for veterans" },
  { url: "/blog", title: "Blog", description: "Latest Medicare news, tips, and analysis" },
  { url: "/library", title: "Medicare Library", description: "In-depth guides and resources on Medicare topics" },
  { url: "/library/guides", title: "Guides", description: "In-depth guides on Medicare topics" },
  { url: "/podcasts", title: "Podcast", description: "Medicare explained in audio format" },
  { url: "/videos", title: "Videos", description: "Visual explanations of Medicare concepts" },
  { url: "/compare-rates", title: "Compare Rates", description: "Compare Medicare plan rates in your area" },
  { url: "/contact", title: "Contact Us", description: "Get in touch with our licensed Medicare agents" },
  { url: "/testimonials", title: "Testimonials", description: "What our clients say about MedicareFAQ" },
  { url: "/about-us", title: "About Us", description: "Learn about MedicareFAQ and Elite Insurance Partners" },
  { url: "/guide-to-being-a-caregiver", title: "Caregiver Guide", description: "Guide to being a Medicare caregiver" },
  { url: "/seniors-guide-to-medicare-gov/tools-and-resources", title: "Medicare.gov Tools & Resources", description: "Guide to using Medicare.gov tools and resources" },
];

const SITEMAP_CONTEXT = SITE_PAGES.map(
  (p) => `- ${p.title}: ${p.description} (${p.url})`
).join("\n");

const SYSTEM_PROMPT = `You are a helpful Medicare expert assistant for MedicareFAQ.com. You answer questions about Medicare only.

RULES:
- Only answer Medicare-related questions. For non-Medicare questions, respond with: {"answer": "I can only help with Medicare-related questions. Please try a Medicare topic like enrollment, costs, or coverage.", "url": null, "relatedLinks": []}
- Keep answers concise: 2-3 sentences maximum
- Always recommend the most relevant page from the sitemap when possible
- Include 1-3 related page links when relevant
- Do not use em dashes in your responses
- Be helpful, clear, and conversational
- If you're unsure, suggest calling (888) 335-8996 to speak with a licensed agent

SITEMAP (available pages on MedicareFAQ.com):
${SITEMAP_CONTEXT}

Respond ONLY with valid JSON in this exact format:
{
  "answer": "Your concise 2-3 sentence answer here.",
  "url": "/most-relevant-page-path",
  "urlTitle": "Page Title",
  "relatedLinks": [
    {"title": "Related Page Title", "url": "/page-path"},
    {"title": "Another Related Page", "url": "/page-path"}
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a search query." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set. Available env keys:", Object.keys(process.env).filter(k => k.includes('ANTHRO') || k.includes('API')));
      return NextResponse.json(
        { error: "Search is temporarily unavailable.", debug: "API key not found in environment" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: query.trim(),
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Unable to generate a response." },
        { status: 500 }
      );
    }

    // Parse the JSON response from Claude
    const parsed = JSON.parse(textBlock.text);

    return NextResponse.json({
      answer: parsed.answer ?? "I couldn't find a specific answer. Please call (888) 335-8996 to speak with a licensed agent.",
      url: parsed.url ?? null,
      urlTitle: parsed.urlTitle ?? null,
      relatedLinks: parsed.relatedLinks ?? [],
    });
  } catch (error: any) {
    console.error("Smart search error:", error?.message || error);
    return NextResponse.json(
      {
        answer: "I'm having trouble processing your question right now. Please call (888) 335-8996 to speak with a licensed Medicare agent who can help.",
        url: "/contact",
        urlTitle: "Contact Us",
        relatedLinks: [],
      },
      { status: 200 }
    );
  }
}
