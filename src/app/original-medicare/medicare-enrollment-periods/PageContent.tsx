"use client";
/**
 * Medicare Enrollment Periods Page
 * URL: /original-medicare/medicare-enrollment-periods
 * Covers: IEP, SEP, GEP, AEP, Medigap OEP, MA OEP
 */
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, AlertTriangle, Calendar } from "lucide-react";
import { FAQSchema, BreadcrumbSchema, ArticleSchema } from "@/components/schema";

const faqs = [
  {
    q: "What is the Initial Enrollment Period (IEP) for Medicare?",
    a: "The Initial Enrollment Period (IEP) is a 7-month window centered around your 65th birthday. It begins 3 months before your birthday month, includes your birthday month, and extends 3 months after. This is your first opportunity to enroll in Medicare Parts A and B. Enrolling early in the IEP (before your birthday month) ensures coverage starts on time.",
  },
  {
    q: "What is a Special Enrollment Period (SEP) for Medicare?",
    a: "A Special Enrollment Period (SEP) allows you to enroll in Medicare outside of your Initial Enrollment Period without a late enrollment penalty. The most common SEP is for people who delayed Medicare because they had employer-sponsored health coverage. When that coverage ends, you have an 8-month SEP to sign up for Part B.",
  },
  {
    q: "What is the General Enrollment Period (GEP)?",
    a: "The General Enrollment Period runs from January 1 through March 31 each year. It's for people who missed their Initial Enrollment Period and don't qualify for a Special Enrollment Period. Coverage begins July 1 of the enrollment year. Enrolling during the GEP instead of your IEP may result in a late enrollment penalty.",
  },
  {
    q: "What is the Annual Enrollment Period (AEP) for Medicare?",
    a: "The Annual Enrollment Period (AEP) runs from October 15 through December 7 each year. During AEP, you can switch between Original Medicare and Medicare Advantage, change Medicare Advantage plans, or change your Part D drug plan. Changes made during AEP take effect January 1 of the following year.",
  },
  {
    q: "Is there an open enrollment period for Medicare Supplement (Medigap) plans?",
    a: "Yes. Your Medigap Open Enrollment Period is a 6-month window that begins when you are both age 65 or older AND enrolled in Medicare Part B. During this period, insurers must sell you any Medigap plan they offer at standard rates, regardless of your health. Outside this window, you may face medical underwriting.",
  },
  {
    q: "What happens if I miss my Medicare enrollment period?",
    a: "If you miss your Initial Enrollment Period and don't qualify for a Special Enrollment Period, you'll need to wait for the General Enrollment Period (January–March). You may also face permanent late enrollment penalties for Part B (10% per 12-month period delayed) and Part D (1% per month delayed). These penalties are added to your monthly premium for as long as you have Medicare.",
  },
];

const enrollmentPeriods = [
  {
    name: "Initial Enrollment Period (IEP)",
    dates: "7 months around your 65th birthday",
    color: "border-teal-400 bg-teal-50",
    titleColor: "text-teal-800",
    description: "Your first opportunity to enroll in Medicare Parts A and B. Begins 3 months before your birthday month and ends 3 months after.",
    link: "/enrollment/turning-65",
    linkText: "Turning 65 Guide",
  },
  {
    name: "Special Enrollment Period (SEP)",
    dates: "8 months after losing employer coverage",
    color: "border-blue-400 bg-blue-50",
    titleColor: "text-blue-800",
    description: "For people who delayed Medicare because they had employer coverage. Triggered when employer coverage ends.",
    link: "/enrollment/working-past-65",
    linkText: "Working Past 65 Guide",
  },
  {
    name: "General Enrollment Period (GEP)",
    dates: "January 1 – March 31 annually",
    color: "border-amber-400 bg-amber-50",
    titleColor: "text-amber-800",
    description: "For those who missed their IEP and don't qualify for an SEP. Coverage begins July 1. Late penalties may apply.",
    link: "/enrollment/late-penalties",
    linkText: "Late Enrollment Penalties",
  },
  {
    name: "Annual Enrollment Period (AEP)",
    dates: "October 15 – December 7 annually",
    color: "border-purple-400 bg-purple-50",
    titleColor: "text-purple-800",
    description: "Switch between Original Medicare and Medicare Advantage, or change your Part D plan. Changes effective January 1.",
    link: "/enrollment/annual-changes",
    linkText: "Annual Changes Guide",
  },
  {
    name: "Medigap Open Enrollment Period",
    dates: "6 months starting when you enroll in Part B at 65+",
    color: "border-green-400 bg-green-50",
    titleColor: "text-green-800",
    description: "Guaranteed issue rights for any Medigap plan — no medical underwriting. This window only occurs once.",
    link: "/faqs/medicare-supplement-open-enrollment",
    linkText: "Medigap Open Enrollment",
  },
  {
    name: "Medicare Advantage OEP",
    dates: "January 1 – March 31 annually",
    color: "border-indigo-400 bg-indigo-50",
    titleColor: "text-indigo-800",
    description: "If you're already enrolled in a Medicare Advantage plan, you can switch to another MA plan or return to Original Medicare.",
    link: "/medicare-part-c/medicare-advantage-enrollment-periods",
    linkText: "MA Enrollment Periods",
  },
];

export default function MedicareEnrollmentPeriods() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs}  />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.medicarefaq.com/" },
          { name: "Original Medicare", url: "https://www.medicarefaq.com/original-medicare/" },
          { name: "Medicare Enrollment Periods", url: "https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/" },
        ]}
      />
      <ArticleSchema
        title="Medicare Enrollment Periods 2026 | IEP, SEP, GEP, AEP Explained"
        description="Understand all Medicare enrollment periods in 2026 — Initial Enrollment Period (IEP), Special Enrollment Period (SEP), General Enrollment Period (GEP), and Annual Enrollment Period (AEP)."
        url="https://www.medicarefaq.com/original-medicare/medicare-enrollment-periods/"
        datePublished="2024-01-15T00:00:00+00:00"
        dateModified="2026-01-10T00:00:00+00:00"
        authorName="David Haass"
        authorUrl="https://www.medicarefaq.com/about/"
        imageUrl="https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg"
      />

      {/* Hero */}
      <section className="bg-[#1B2A4A] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Medicare Enrollment Periods</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Medicare Enrollment Periods</h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            Knowing when you can enroll in Medicare — and what happens if you miss a window — is critical to avoiding permanent late enrollment penalties.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Enrollment Period Cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Medicare Enrollment Period Chart</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {enrollmentPeriods.map((period, i) => (
              <div key={i} className={`border-l-4 rounded-xl p-5 ${period.color}`}>
                <h3 className={`font-bold text-lg mb-1 ${period.titleColor}`}>{period.name}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {period.dates}
                </p>
                <p className="text-sm text-gray-700 mb-3">{period.description}</p>
                <Link href={period.link} className="text-sm text-[#0D9488] hover:underline font-medium">
                  {period.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Late Penalty Warning */}
        <section className="mb-10">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Missing Your Enrollment Window Has Permanent Consequences</h3>
                <p className="text-sm text-red-700 mb-3">
                  If you miss your Initial Enrollment Period without a qualifying Special Enrollment Period, you may face permanent late enrollment penalties:
                </p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• <strong>Part B penalty:</strong> 10% added to your premium for each 12-month period you were eligible but didn't enroll</li>
                  <li>• <strong>Part D penalty:</strong> 1% of the national base beneficiary premium for each month without creditable coverage</li>
                </ul>
                <Link href="/enrollment/late-penalties" className="inline-block mt-3 text-sm text-red-800 font-semibold hover:underline">
                  Learn more about late enrollment penalties →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#1B2A4A] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
