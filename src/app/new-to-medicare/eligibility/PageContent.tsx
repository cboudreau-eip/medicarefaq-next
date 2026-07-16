"use client";

/**
 * Medicare Eligibility Requirements (Pillar Page)
 * Target keywords: qualify for medicare, medicare requirements,
 * requirements for medicare, medicare qualifications
 * Hub-and-spoke architecture with internal links to all spoke articles.
 * No em dashes.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackPhoneClick } from "@/lib/analytics";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  Phone,
  ArrowRight,
  HelpCircle,
  Calendar,
  Shield,
  Heart,
  Users,
  Clock,
  AlertTriangle,
  FileText,
  Briefcase,
  Star,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tableOfContents = [
  { id: "overview", label: "Eligibility Overview" },
  { id: "age-65", label: "Age 65+ Requirements" },
  { id: "under-65", label: "Under 65 (Disability)" },
  { id: "als-esrd", label: "ALS & ESRD" },
  { id: "citizenship", label: "Citizenship & Residency" },
  { id: "work-history", label: "Work History & Premiums" },
  { id: "enrollment-windows", label: "Enrollment Windows" },
  { id: "special-situations", label: "Special Situations" },
  { id: "penalties", label: "Late Enrollment Penalties" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "related-topics", label: "Related Topics" },
  { id: "next-steps", label: "Next Steps" },
];

const eligibilityPaths = [
  {
    title: "Age 65 or Older",
    icon: Calendar,
    color: "bg-teal-600",
    lightBg: "bg-teal-50",
    borderColor: "border-teal-200",
    description:
      "The most common path to Medicare. You qualify at age 65 regardless of whether you are still working or retired.",
    requirements: [
      "U.S. citizen or permanent legal resident for 5+ continuous years",
      "Age 65 or approaching 65",
      "You or your spouse paid Medicare taxes for at least 10 years (40 quarters)",
    ],
    note: "If you are already receiving Social Security benefits, you will be automatically enrolled in Medicare Parts A and B when you turn 65.",
    link: "/faqs/how-old-to-get-medicare/",
    linkText: "Learn more about age requirements",
  },
  {
    title: "Disability (Under 65)",
    icon: Heart,
    color: "bg-blue-600",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200",
    description:
      "Younger individuals with qualifying disabilities can receive Medicare after a 24-month waiting period on Social Security Disability Insurance (SSDI).",
    requirements: [
      "Receiving SSDI benefits for 24 consecutive months",
      "U.S. citizen or permanent legal resident",
      "Disability approved by the Social Security Administration",
    ],
    note: "The 24-month waiting period begins from the date you first receive SSDI benefits, not from when you applied.",
    link: "/faqs/medicare-coverage-for-disabled-under-65/",
    linkText: "Read the full disability eligibility guide",
  },
  {
    title: "ALS (Lou Gehrig's Disease)",
    icon: Shield,
    color: "bg-purple-600",
    lightBg: "bg-purple-50",
    borderColor: "border-purple-200",
    description:
      "If you have been diagnosed with ALS, you qualify for Medicare immediately with no waiting period required.",
    requirements: [
      "Diagnosed with Amyotrophic Lateral Sclerosis (ALS)",
      "Eligible for Social Security disability benefits",
      "No 24-month waiting period required",
    ],
    note: "Medicare coverage begins the same month your SSDI benefits start. ALS is the only condition that waives the standard 24-month waiting period.",
    link: null,
    linkText: null,
  },
  {
    title: "End-Stage Renal Disease (ESRD)",
    icon: Users,
    color: "bg-amber-600",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-200",
    description:
      "Permanent kidney failure requiring dialysis or a kidney transplant qualifies you for Medicare at any age.",
    requirements: [
      "Diagnosed with End-Stage Renal Disease (ESRD)",
      "Need regular dialysis or have had a kidney transplant",
      "You, your spouse, or your parent has paid Medicare taxes sufficiently",
    ],
    note: "Coverage typically begins the 4th month of dialysis treatments, though it can begin sooner with a kidney transplant or home dialysis training.",
    link: "/faqs/does-medicare-cover-end-stage-renal-disease/",
    linkText: "Learn about Medicare ESRD coverage",
  },
];

const citizenshipRequirements = [
  {
    requirement: "U.S. citizen",
    eligible: true,
    detail: "Born in the U.S. or naturalized",
  },
  {
    requirement: "Permanent legal resident (5+ years)",
    eligible: true,
    detail:
      "Must have lived in the U.S. continuously for at least 5 years",
  },
  {
    requirement: "Permanent legal resident (under 5 years)",
    eligible: false,
    detail:
      "Must wait until you have been a permanent resident for 5 continuous years",
  },
  {
    requirement: "Temporary visa holder",
    eligible: false,
    detail: "Not eligible for Medicare",
  },
  {
    requirement: "Undocumented resident",
    eligible: false,
    detail: "Not eligible for Medicare",
  },
];

const workHistoryTiers = [
  {
    quarters: "40+ quarters (10+ years)",
    partAPremium: "$0/month",
    description:
      "You or your spouse paid Medicare taxes for 10 or more years",
    highlight: true,
  },
  {
    quarters: "30 to 39 quarters (7.5 to 9.75 years)",
    partAPremium: "$285/month (2025)",
    description:
      "Reduced premium for those close to the 40-quarter threshold",
    highlight: false,
  },
  {
    quarters: "Under 30 quarters",
    partAPremium: "$518/month (2025)",
    description:
      "Full premium required for fewer than 30 quarters of Medicare tax payments",
    highlight: false,
  },
];

const enrollmentWindows = [
  {
    name: "Initial Enrollment Period (IEP)",
    timing: "7 months around your 65th birthday",
    detail:
      "Starts 3 months before the month you turn 65, includes your birthday month, and ends 3 months after. This is your primary window to enroll without penalties.",
    link: "/faqs/medicare-initial-enrollment-period/",
  },
  {
    name: "General Enrollment Period (GEP)",
    timing: "January 1 through March 31 each year",
    detail:
      "If you missed your IEP and do not qualify for a Special Enrollment Period, you can sign up during the GEP. Coverage begins July 1. Late penalties may apply.",
    link: "/faqs/medicare-general-enrollment-period/",
  },
  {
    name: "Special Enrollment Period (SEP)",
    timing: "8 months after losing employer coverage",
    detail:
      "Available if you delayed Medicare because you had creditable employer coverage. No late penalty applies when you use an SEP.",
    link: "/faqs/medicare-special-enrollment-periods/",
  },
  {
    name: "Annual Enrollment Period (AEP)",
    timing: "October 15 through December 7 each year",
    detail:
      "For those already enrolled in Medicare who want to switch Medicare Advantage plans or Part D drug plans. Changes take effect January 1.",
    link: "/faqs/medicare-annual-enrollment-period/",
  },
];

const specialSituations = [
  {
    title: "Working Past 65",
    description:
      "If you are still working at 65 and have employer coverage through a company with 20+ employees, you may delay Medicare enrollment without penalty. Your employer plan is considered creditable coverage.",
    action:
      "You have a Special Enrollment Period (SEP) of 8 months after you or your spouse stops working or loses employer coverage.",
    link: "/faqs/when-should-you-enroll-in-medicare-if-still-working/",
  },
  {
    title: "Veterans with VA Benefits",
    description:
      "VA benefits and Medicare are separate programs. You can have both, and many veterans choose to enroll in Medicare Part A (which is usually free) as a backup.",
    action:
      "Enrolling in at least Part A is recommended even if you primarily use VA healthcare.",
    link: null,
  },
  {
    title: "Federal Employees (FEHB)",
    description:
      "Federal Employee Health Benefits (FEHB) and Medicare can work together. FEHB continues into retirement, and adding Medicare can reduce your out-of-pocket costs.",
    action:
      "Most federal retirees benefit from enrolling in both Part A and Part B alongside FEHB.",
    link: "/faqs/medicare-and-employer-coverage/",
  },
  {
    title: "COBRA Coverage",
    description:
      "COBRA is not considered creditable coverage for Medicare purposes. If you are 65+ and on COBRA, you should enroll in Medicare during your Initial Enrollment Period to avoid late penalties.",
    action:
      "Do not delay Medicare enrollment because of COBRA. You may face permanent late enrollment penalties.",
    link: "/faqs/what-is-medicare-creditable-coverage/",
  },
  {
    title: "Spouse's Work Record",
    description:
      "If you have not worked enough quarters on your own, you may qualify for premium-free Part A based on your current spouse's, ex-spouse's (if married 10+ years), or deceased spouse's work record.",
    action:
      "Contact Social Security to verify your eligibility based on a spouse's record.",
    link: null,
  },
  {
    title: "Green Card Holders",
    description:
      "Permanent residents (green card holders) qualify for Medicare once they have lived in the United States continuously for at least 5 years and meet age or disability requirements.",
    action:
      "The 5-year residency clock starts from the date your green card was issued.",
    link: "/faqs/medicare-for-green-card-holders/",
  },
];

const faqs = [
  {
    question: "What are the basic requirements to qualify for Medicare?",
    answer:
      "You must be a U.S. citizen or permanent legal resident (5+ years) and either be age 65 or older, have received SSDI for 24 months, or have ALS or End-Stage Renal Disease. You or your spouse must also have paid Medicare taxes for at least 10 years (40 quarters) to receive premium-free Part A.",
  },
  {
    question: "Can I get Medicare if I have never worked?",
    answer:
      "Yes, but you may need to pay a premium for Part A. If your spouse has worked and paid Medicare taxes for at least 10 years (40 quarters), you can qualify for premium-free Part A based on their work record. Otherwise, you can purchase Part A at the full premium rate.",
  },
  {
    question: "Do I need to be a U.S. citizen to get Medicare?",
    answer:
      "You do not need to be a citizen, but you must be a permanent legal resident (green card holder) who has lived in the United States continuously for at least 5 years. Temporary visa holders and undocumented residents are not eligible.",
  },
  {
    question: "What happens if I miss my enrollment window?",
    answer:
      "If you miss your Initial Enrollment Period and do not qualify for a Special Enrollment Period, you will have to wait for the General Enrollment Period (January 1 through March 31 each year, with coverage starting July 1). You may also face a late enrollment penalty of 10% added to your Part B premiums for each 12-month period you were eligible but did not enroll.",
  },
  {
    question: "Am I automatically enrolled in Medicare at 65?",
    answer:
      "If you are already receiving Social Security benefits when you turn 65, you will be automatically enrolled in Medicare Parts A and B. Your Medicare card will arrive about 3 months before your 65th birthday. If you are not receiving Social Security, you need to actively enroll during your Initial Enrollment Period.",
  },
  {
    question:
      "Can I qualify for Medicare under my spouse's work record?",
    answer:
      "Yes. If your spouse has worked and paid Medicare taxes for at least 40 quarters (10 years), you can qualify for premium-free Part A at age 65 based on their work record, even if you have never worked yourself. This applies to current spouses, divorced spouses (if married 10+ years), and surviving spouses.",
  },
  {
    question:
      "I am under 65 with a disability. When does my Medicare start?",
    answer:
      "Medicare begins after you have received Social Security Disability Insurance (SSDI) benefits for 24 consecutive months. The exception is ALS (Lou Gehrig's disease), which qualifies you for Medicare immediately without a waiting period.",
  },
  {
    question:
      "Is there a penalty for not signing up for Medicare when I am first eligible?",
    answer:
      "Yes. For Part B, you will pay a 10% premium surcharge for each full 12-month period you could have had Part B but did not sign up. For Part D, the penalty is 1% of the national base beneficiary premium multiplied by the number of months you went without creditable drug coverage. These penalties are permanent and added to your monthly premiums for as long as you have Medicare.",
  },
];

const relatedTopics = [
  {
    title: "Medicare Initial Enrollment Period",
    description: "The 7-month window to sign up when you first become eligible",
    slug: "/faqs/medicare-initial-enrollment-period/",
  },
  {
    title: "Medicare Special Enrollment Periods",
    description: "When and how to use an SEP after losing employer coverage",
    slug: "/faqs/medicare-special-enrollment-periods/",
  },
  {
    title: "Medicare Part B Late Enrollment Penalty",
    description: "How the Part B penalty is calculated and how to avoid it",
    slug: "/faqs/medicare-part-b-late-enrollment-penalty/",
  },
  {
    title: "Medicare Part D Late Enrollment Penalty",
    description: "Understanding the Part D penalty and creditable coverage",
    slug: "/faqs/medicare-part-d-late-enrollment-penalty/",
  },
  {
    title: "Turning 65: Common Medicare Questions",
    description: "Everything you need to know as you approach Medicare eligibility",
    slug: "/faqs/turning-65-these-are-the-most-common-medicare-questions-answered/",
  },
  {
    title: "Medicare Enrollment Checklist",
    description: "Step-by-step checklist to prepare before you turn 65",
    slug: "/faqs/medicare-enrollment-checklist/",
  },
  {
    title: "When to Enroll if Still Working",
    description: "Enrollment rules for those with employer coverage past 65",
    slug: "/faqs/when-should-you-enroll-in-medicare-if-still-working/",
  },
  {
    title: "Medicare and Employer Coverage",
    description: "How Medicare coordinates with employer health insurance",
    slug: "/faqs/medicare-and-employer-coverage/",
  },
  {
    title: "What Is Medicare Creditable Coverage?",
    description: "Which coverage counts to avoid late enrollment penalties",
    slug: "/faqs/what-is-medicare-creditable-coverage/",
  },
  {
    title: "Medigap Open Enrollment Period",
    description: "Your best window to enroll in a Medicare Supplement plan",
    slug: "/faqs/medicare-supplement-open-enrollment/",
  },
  {
    title: "Can I Delay Medicare?",
    description: "When it makes sense to postpone Medicare enrollment",
    slug: "/faqs/delay-medicare/",
  },
  {
    title: "Medicare for Green Card Holders",
    description: "Eligibility rules for permanent residents",
    slug: "/faqs/medicare-for-green-card-holders/",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Eligibility() {
  const [activeSection, setActiveSection] = useState("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-300 mb-8 list-none">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                />
              </li>
              <li>
                <Link
                  href="/medicare-101"
                  className="hover:text-white transition-colors"
                >
                  New to Medicare
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                />
              </li>
              <li aria-current="page">
                <span className="text-teal-300">
                  Medicare Eligibility Requirements
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <HelpCircle
                className="w-6 h-6 text-teal-300"
                aria-hidden="true"
              />
            </div>
            <span className="text-sm font-semibold text-teal-300 uppercase tracking-wider">
              Eligibility Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            Medicare Eligibility Requirements: Who Qualifies in 2025
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Find out if you qualify for Medicare based on your age, work
            history, disability status, or medical condition. This guide
            covers every pathway to eligibility and what to do once you
            qualify.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#overview"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Check Requirements{" "}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="tel:+18883358996"
              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "eligibility",
                })
              }
              className="invoca-phone inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an
              Agent
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex gap-12">
          {/* Sticky TOC Sidebar (right) */}
          <aside className="hidden lg:block w-56 shrink-0 order-last">
            <div className="sticky top-24">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                In This Guide
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-1 list-none">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm py-1.5 pl-3 border-l-2 transition-colors ${
                          activeSection === item.id
                            ? "border-teal-500 text-teal-700 font-medium"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-100">
                <p className="text-sm font-semibold text-teal-800 mb-2">
                  Need Help?
                </p>
                <p className="text-xs text-teal-700 mb-3">
                  Our licensed agents can help determine your eligibility.
                </p>
                <a
                  href="tel:+18883358996"
                  data-invoca-phone-number="18883358996"
                  onClick={() =>
                    trackPhoneClick({
                      phone_number: "(888) 335-8996",
                      page_section: "eligibility",
                    })
                  }
                  className="invoca-phone flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> (888)
                  335-8996
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 order-first">
            {/* Overview */}
            <section id="overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Medicare Eligibility Overview
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Medicare eligibility is determined by three primary factors:{" "}
                <strong>age</strong>, <strong>disability status</strong>,
                and <strong>specific medical conditions</strong>. Most
                Americans become eligible when they turn 65, but there are
                pathways to qualify earlier. Understanding which category
                applies to you is the first step toward getting the
                coverage you need.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                In addition to meeting one of the eligibility pathways
                below, you must also satisfy{" "}
                <strong>citizenship or residency requirements</strong> and
                may need a certain amount of{" "}
                <strong>work history</strong> (or your spouse's) to receive
                premium-free Part A coverage.
              </p>

              {/* Quick eligibility summary cards */}
              <ul className="grid md:grid-cols-2 gap-4 mb-8 list-none">
                {[
                  {
                    label: "Age 65+",
                    value: "Most common path",
                    icon: Calendar,
                    color: "text-teal-600",
                  },
                  {
                    label: "Under 65 with Disability",
                    value: "After 24-month SSDI wait",
                    icon: Heart,
                    color: "text-blue-600",
                  },
                  {
                    label: "ALS Diagnosis",
                    value: "Immediate eligibility",
                    icon: Shield,
                    color: "text-purple-600",
                  },
                  {
                    label: "End-Stage Renal Disease",
                    value: "Kidney failure at any age",
                    icon: Users,
                    color: "text-amber-600",
                  },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                      <item.icon
                        className={`w-5 h-5 ${item.color}`}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-500">
                        {item.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Age 65+ */}
            <section id="age-65" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Age 65+ Medicare Requirements
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The most common way to qualify for Medicare is by turning
                65. If you are a U.S. citizen or permanent legal resident
                who has lived in the country for at least 5 continuous
                years, you are eligible for Medicare at age 65, regardless
                of your health status or whether you are still working. For
                a deeper look at age-based eligibility, see our guide on{" "}
                <Link
                  href="/faqs/how-old-to-get-medicare/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  how old you have to be to get Medicare
                </Link>
                .
              </p>

              <aside
                aria-label="Automatic Enrollment"
                className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-6"
              >
                <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <CheckCircle2
                    className="w-5 h-5 text-teal-600"
                    aria-hidden="true"
                  />{" "}
                  Automatic Enrollment
                </h3>
                <p className="text-teal-800 mb-4">
                  If you are already receiving Social Security benefits when
                  you turn 65, you will be{" "}
                  <strong>automatically enrolled</strong> in{" "}
                  <strong>Medicare Parts A and B</strong>. Your Medicare
                  card will arrive in the mail approximately 3 months before
                  your 65th birthday.
                </p>
                <p className="text-sm text-teal-700">
                  <strong>Important:</strong> If you do not want Part B
                  (perhaps because you have employer coverage), you will
                  need to actively opt out. Otherwise, Part B premiums will
                  be deducted from your Social Security check. Learn more
                  about{" "}
                  <Link
                    href="/blog/navigating-your-coverage-medicare-automatic-enrollment-vs-manual-enrollment-explained/"
                    className="underline hover:text-teal-900"
                  >
                    automatic vs. manual enrollment
                  </Link>
                  .
                </p>
              </aside>

              <aside
                aria-label="Not Receiving Social Security"
                className="bg-amber-50 border border-amber-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <AlertTriangle
                    className="w-5 h-5 text-amber-600"
                    aria-hidden="true"
                  />{" "}
                  Not Receiving Social Security?
                </h3>
                <p className="text-amber-800">
                  If you have not started collecting Social Security
                  benefits, you will need to{" "}
                  <strong>actively sign up</strong> for Medicare during your{" "}
                  <Link
                    href="/faqs/medicare-initial-enrollment-period/"
                    className="underline font-semibold hover:text-amber-900"
                  >
                    Initial Enrollment Period (IEP)
                  </Link>{" "}
                  , the 7-month window that starts 3 months before your 65th
                  birthday and ends 3 months after.
                </p>
              </aside>
            </section>

            {/* Under 65 */}
            <section id="under-65" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Under 65: Disability-Based Eligibility
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                You do not have to be 65 to qualify for Medicare. Younger
                individuals with qualifying disabilities or certain medical
                conditions can receive Medicare coverage. Here are the main
                pathways for those{" "}
                <Link
                  href="/faqs/medicare-coverage-for-disabled-under-65/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  under 65 with a disability
                </Link>
                :
              </p>

              <ul className="space-y-6 list-none">
                {eligibilityPaths.map((path) => (
                  <li key={path.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`${path.lightBg} ${path.borderColor} border rounded-xl p-6`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${path.color} flex items-center justify-center shrink-0`}
                        >
                          <path.icon
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {path.title}
                          </h3>
                          <p className="text-slate-600 mt-1">
                            {path.description}
                          </p>
                        </div>
                      </div>

                      <div className="ml-16">
                        <p className="text-sm font-semibold text-slate-700 mb-2">
                          Requirements:
                        </p>
                        <ul className="space-y-2 mb-4 list-none">
                          {path.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-700"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                                aria-hidden="true"
                              />
                              {req}
                            </li>
                          ))}
                        </ul>

                        <div className="bg-white/60 rounded-lg p-3 border border-white/80">
                          <p className="text-sm text-slate-600">
                            <strong className="text-slate-800">
                              Note:
                            </strong>{" "}
                            {path.note}
                          </p>
                        </div>

                        {path.link && (
                          <Link
                            href={path.link}
                            className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-teal-700 hover:text-teal-900 underline"
                          >
                            {path.linkText}{" "}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ALS & ESRD combined section */}
            <section id="als-esrd" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                ALS and ESRD: Immediate Eligibility
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Two medical conditions provide a direct path to Medicare
                regardless of age and without the standard 24-month
                disability waiting period:
              </p>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  ESRD: When Does Coverage Begin?
                </h3>
                <dl className="space-y-4">
                  {[
                    {
                      scenario: "Regular dialysis",
                      timing: "4th month of dialysis treatments",
                      detail:
                        "Coverage begins on the first day of the 4th month after you start dialysis.",
                    },
                    {
                      scenario: "Home dialysis training",
                      timing: "1st month of training",
                      detail:
                        "If you start a home dialysis training program, coverage can begin the month training starts.",
                    },
                    {
                      scenario: "Kidney transplant",
                      timing: "Month of transplant",
                      detail:
                        "If you receive a kidney transplant, coverage can begin the month of the transplant or up to 2 months before if hospitalized for the transplant.",
                    },
                  ].map((item) => (
                    <div
                      key={item.scenario}
                      className="flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock
                          className="w-4 h-4 text-amber-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">
                          {item.scenario}:{" "}
                          <span className="text-amber-700">
                            {item.timing}
                          </span>
                        </dt>
                        <dd className="text-sm text-slate-600">
                          {item.detail}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="text-sm text-slate-500">
                For more details, read our guide on{" "}
                <Link
                  href="/faqs/does-medicare-cover-end-stage-renal-disease/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  Medicare coverage for End-Stage Renal Disease
                </Link>
                .
              </p>
            </section>

            {/* Citizenship */}
            <section id="citizenship" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Citizenship and Residency Requirements
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                In addition to meeting age or disability requirements, you
                must also meet citizenship or residency criteria to qualify
                for Medicare. If you hold a green card, see our dedicated
                guide on{" "}
                <Link
                  href="/faqs/medicare-for-green-card-holders/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  Medicare eligibility for green card holders
                </Link>
                .
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Status
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-700">
                        Eligible?
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {citizenshipRequirements.map((item) => (
                      <tr
                        key={item.requirement}
                        className="border-t border-slate-100"
                      >
                        <td className="p-4 font-medium text-slate-900">
                          {item.requirement}
                        </td>
                        <td className="p-4 text-center">
                          {item.eligible ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-xs bg-green-50 px-2.5 py-1 rounded-full">
                              <CheckCircle2
                                className="w-3.5 h-3.5"
                                aria-hidden="true"
                              />{" "}
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-600 font-semibold text-xs bg-red-50 px-2.5 py-1 rounded-full">
                              <XCircle
                                className="w-3.5 h-3.5"
                                aria-hidden="true"
                              />{" "}
                              No
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-slate-600">
                          {item.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Work History */}
            <section id="work-history" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Work History and Part A Premiums
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Your work history (or your spouse's) determines whether you
                receive <strong>premium-free Part A</strong>. Medicare taxes
                are paid through payroll deductions (FICA), and the number
                of "quarters" you have worked determines your premium tier.
              </p>

              <ul className="space-y-4 list-none">
                {workHistoryTiers.map((tier) => (
                  <li
                    key={tier.quarters}
                    className={`rounded-xl border p-6 ${
                      tier.highlight
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {tier.highlight && (
                            <Star
                              className="w-4 h-4 text-green-600"
                              aria-hidden="true"
                            />
                          )}
                          <h3 className="font-bold text-slate-900">
                            {tier.quarters}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-600">
                          {tier.description}
                        </p>
                      </div>
                      <div
                        className={`text-2xl font-bold shrink-0 ${
                          tier.highlight
                            ? "text-green-700"
                            : "text-slate-900"
                        }`}
                      >
                        {tier.partAPremium}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside
                aria-label="Spouse's Work Record"
                className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5"
              >
                <p className="text-sm text-blue-800">
                  <strong>Spouse's Work Record:</strong> If you do not have
                  enough work credits on your own, you may qualify for
                  premium-free Part A based on your current spouse's,
                  ex-spouse's (if married 10+ years), or deceased spouse's
                  work record.
                </p>
              </aside>

              <p className="mt-4 text-sm text-slate-500">
                For a complete breakdown of all Medicare costs, see our{" "}
                <Link
                  href="/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  2026 Medicare costs guide
                </Link>
                .
              </p>
            </section>

            {/* Enrollment Windows */}
            <section id="enrollment-windows" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Medicare Enrollment Windows
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Once you qualify for Medicare, you must enroll during a
                specific window. Missing your enrollment period can result
                in gaps in coverage and permanent late enrollment penalties.
                For a complete overview, see our{" "}
                <Link
                  href="/blog/your-guide-to-medicare-enrollment-periods-when-to-sign-up/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  guide to Medicare enrollment periods
                </Link>
                .
              </p>

              <ul className="space-y-4 list-none">
                {enrollmentWindows.map((window) => (
                  <li
                    key={window.name}
                    className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        <Calendar
                          className="w-5 h-5 text-teal-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">
                          {window.name}
                        </h3>
                        <p className="text-sm font-medium text-teal-700 mb-2">
                          {window.timing}
                        </p>
                        <p className="text-sm text-slate-600">
                          {window.detail}
                        </p>
                        <Link
                          href={window.link}
                          className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-teal-700 hover:text-teal-900 underline"
                        >
                          Learn more{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Special Situations */}
            <section id="special-situations" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Special Situations
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Several common life situations can affect your Medicare
                eligibility and enrollment timing. Here is what you need to
                know:
              </p>

              <ul className="grid md:grid-cols-2 gap-4 list-none">
                {specialSituations.map((situation) => (
                  <li
                    key={situation.title}
                    className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase
                        className="w-5 h-5 text-slate-400"
                        aria-hidden="true"
                      />
                      <h3 className="font-bold text-slate-900">
                        {situation.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {situation.description}
                    </p>
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                      <p className="text-xs font-semibold text-teal-800 mb-1">
                        What to Do:
                      </p>
                      <p className="text-xs text-teal-700">
                        {situation.action}
                      </p>
                    </div>
                    {situation.link && (
                      <Link
                        href={situation.link}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-teal-700 hover:text-teal-900 underline"
                      >
                        Read more{" "}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Penalties */}
            <section id="penalties" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Late Enrollment Penalties
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                If you do not sign up for Medicare when you are first
                eligible and you do not have{" "}
                <Link
                  href="/faqs/what-is-medicare-creditable-coverage/"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  creditable coverage
                </Link>
                , you may face permanent penalties added to your monthly
                premiums:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Part
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Penalty Calculation
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-100">
                      <td className="p-4 font-medium text-slate-900">
                        Part B
                      </td>
                      <td className="p-4 text-slate-600">
                        10% added to your premium for each full 12-month
                        period you were eligible but did not enroll
                      </td>
                      <td className="p-4 text-red-600 font-medium">
                        Permanent
                      </td>
                    </tr>
                    <tr className="border-t border-slate-100">
                      <td className="p-4 font-medium text-slate-900">
                        Part D
                      </td>
                      <td className="p-4 text-slate-600">
                        1% of the national base beneficiary premium
                        multiplied by the number of months without
                        creditable drug coverage
                      </td>
                      <td className="p-4 text-red-600 font-medium">
                        Permanent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/faqs/medicare-part-b-late-enrollment-penalty/"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 underline"
                >
                  Part B penalty details{" "}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/faqs/medicare-part-d-late-enrollment-penalty/"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 underline"
                >
                  Part D penalty details{" "}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      aria-expanded={openFaq === index}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-slate-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Related Topics (Hub-and-Spoke Links) */}
            <section id="related-topics" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Related Medicare Eligibility Topics
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Explore these related guides for more detail on specific
                eligibility scenarios, enrollment periods, and coverage
                decisions:
              </p>

              <ul className="grid md:grid-cols-2 gap-3 list-none">
                {relatedTopics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={topic.slug}
                      className="block p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-teal-50 hover:border-teal-200 transition-colors group"
                    >
                      <h3 className="font-semibold text-slate-900 group-hover:text-teal-800 mb-1 flex items-center gap-2">
                        <FileText
                          className="w-4 h-4 text-slate-400 group-hover:text-teal-600"
                          aria-hidden="true"
                        />
                        {topic.title}
                      </h3>
                      <p className="text-sm text-slate-500 group-hover:text-teal-700">
                        {topic.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Next Steps CTA */}
            <section id="next-steps" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-slate-900 to-teal-900 rounded-2xl p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-slate-300 mb-8 max-w-xl">
                  Now that you understand the requirements for Medicare, the
                  next step is determining when and how to enroll. Our
                  licensed agents can walk you through the entire process
                  and help you choose the right plan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+18883358996"
                    data-invoca-phone-number="18883358996"
                    onClick={() =>
                      trackPhoneClick({
                        phone_number: "(888) 335-8996",
                        page_section: "eligibility",
                      })
                    }
                    className="invoca-phone inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Call (888) 335-8996
                  </a>
                  <Link
                    href="/new-to-medicare/turning-65"
                    className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Turning 65 Timeline{" "}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/faqs/medicare-enrollment-checklist/"
                    className="inline-flex items-center gap-2 border border-slate-500 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Enrollment Checklist{" "}
                    <FileText className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </article>
  );
}
