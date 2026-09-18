"use client";
/**
 * Medicare Enrollment Periods Page
 * URL: /original-medicare/medicare-enrollment-periods
 * Covers: IEP, SEP, GEP, AEP, Medigap OEP, MA OEP
 */
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, AlertTriangle, Calendar } from "lucide-react";
import { FAQSchema } from "@/components/schema";

const faqs = [
  {
    q: "What is the difference between AEP and OEP?",
    a: "AEP is the fall window for Medicare Advantage and Part D changes. In an AEP-versus-OEP comparison, OEP usually means the January through March Medicare Advantage window, which is only for people already enrolled in Medicare Advantage. Medicare also calls the fall AEP its Open Enrollment Period, so always check the full name and dates.",
  },
  {
    q: "Can I change a standalone Part D plan during Medicare Advantage OEP?",
    a: "Not if you already have Original Medicare and a standalone drug plan, unless you qualify for another enrollment period. If you leave Medicare Advantage for Original Medicare during MA OEP, you can join a separate Part D plan as part of that change.",
  },
  {
    q: "Does AEP or Medicare Advantage OEP guarantee a Medigap policy?",
    a: "No. Medigap has separate purchase protections. Your federal Medigap Open Enrollment Period lasts six months starting the first month you are at least 65 and enrolled in Part B. Outside that window, check guaranteed-issue rights and state protections before leaving Medicare Advantage or assuming an insurer will accept your application.",
  },
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
    a: "The General Enrollment Period runs from January 1 to March 31 each year for people who need to enroll in Part B or premium-Part A after missing their initial window and who do not qualify for a Special Enrollment Period. Coverage starts the month after you sign up. Late enrollment penalties may apply.",
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
    link: "/medicare-enrollment/turning-65",
    linkText: "Turning 65 Guide",
  },
  {
    name: "Special Enrollment Period (SEP)",
    dates: "8 months after losing employer coverage",
    color: "border-blue-400 bg-blue-50",
    titleColor: "text-blue-800",
    description: "For people who delayed Medicare because they had employer coverage. Triggered when employer coverage ends.",
    link: "/medicare-enrollment/working-past-65",
    linkText: "Working Past 65 Guide",
  },
  {
    name: "General Enrollment Period (GEP)",
    dates: "January 1 – March 31 annually",
    color: "border-amber-400 bg-amber-50",
    titleColor: "text-amber-800",
    description: "For those who missed their IEP and don't qualify for an SEP. Coverage starts the month after you sign up. Late penalties may apply.",
    link: "/medicare-enrollment/late-penalties",
    linkText: "Late Enrollment Penalties",
  },
  {
    name: "Annual Enrollment Period (AEP)",
    dates: "October 15 – December 7 annually",
    color: "border-purple-400 bg-purple-50",
    titleColor: "text-purple-800",
    description: "Switch between Original Medicare and Medicare Advantage, or change your Part D plan. Changes effective January 1.",
    link: "/medicare-enrollment/annual-changes",
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
    <article className="min-h-screen bg-white">
      <FAQSchema faqs={faqs}  />

      {/* Hero */}
      <section className="bg-[#1B2A4A] text-white py-12 px-4">
        <div className="container max-w-5xl">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Medicare Enrollment Periods</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Medicare Enrollment Periods: AEP vs OEP</h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            Compare the fall Annual Enrollment Period with Medicare Advantage Open Enrollment, then find the rules for first-time enrollment and Medigap.
          </p>
          <p className="text-sm text-blue-200 mt-4">Updated September 18, 2026</p>
        </div>
      </section>

      <div className="container max-w-5xl py-10">

        <section id="aep-vs-oep" aria-labelledby="aep-vs-oep-heading" className="mb-10 scroll-mt-44">
          <h2 id="aep-vs-oep-heading" className="text-2xl font-bold text-[#1B2A4A] mb-4">AEP vs OEP: Dates, Eligibility, and Allowed Changes</h2>
          <p className="text-gray-700 mb-5">AEP runs October 15 to December 7. Medicare Advantage OEP runs January 1 to March 31 and is limited to people already in Medicare Advantage. The key difference is who can use each window and which changes it permits.</p>
          <div role="region" aria-label="Scrollable AEP versus OEP comparison" tabIndex={0} className="overflow-x-auto rounded-xl border border-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600">
            <table className="w-full min-w-[600px] text-sm text-left">
              <caption className="sr-only">Annual Enrollment versus Medicare Advantage Open Enrollment</caption>
              <thead className="bg-[#1B2A4A] text-white"><tr>
                <th scope="col" className="p-4">Compare</th>
                <th scope="col" className="p-4">Annual Enrollment (AEP)</th>
                <th scope="col" className="p-4">Medicare Advantage OEP</th>
              </tr></thead>
              <tbody className="text-gray-700">
                {[
                  ["Dates each year", "October 15 to December 7", "January 1 to March 31"],
                  ["Who can use it", "Medicare beneficiaries eligible for the plan they want", "Current Medicare Advantage members"],
                  ["Medicare Advantage", "Join, switch, or leave a plan", "Switch plans once, or return to Original Medicare"],
                  ["Standalone Part D", "Join, switch, or drop a drug plan with Original Medicare", "Join a drug plan when returning to Original Medicare; not a general Part D switching window"],
                  ["Coverage starts", "January 1 of the next year", "First of the month after the plan receives your request"],
                ].map(([label, aep, oep]) => <tr key={label} className="border-t border-gray-200 even:bg-gray-50">
                  <th scope="row" className="p-4 font-semibold text-[#1B2A4A]">{label}</th><td className="p-4">{aep}</td><td className="p-4">{oep}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">Sources: <a className="text-teal-700 underline" href="https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan">Medicare plan enrollment rules</a> and the <a className="text-teal-700 underline" href="https://www.medicare.gov/publications/10050-medicare-and-you.pdf">Medicare &amp; You handbook</a>.</p>
          <aside className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5 mt-5">
            <h3 className="font-bold text-[#1B2A4A] mb-2">Why “open enrollment” can be confusing</h3>
            <p className="text-gray-700">Medicare calls the fall AEP “Open Enrollment,” too. Confirm whether someone means fall enrollment, Medicare Advantage OEP, or your separate six-month Medigap window. Neither AEP nor MA OEP automatically guarantees acceptance into Medigap.</p>
            <Link className="inline-block text-teal-700 underline mt-3" href="/faqs/medicare-supplement-open-enrollment/">Check Medigap enrollment protections</Link>
          </aside>
        </section>

        <section aria-labelledby="which-window" className="mb-10">
          <h2 id="which-window" className="text-2xl font-bold text-[#1B2A4A] mb-4">Which Enrollment Window Fits Your Situation?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-5"><h3 className="font-bold text-[#1B2A4A] mb-2">You want a different drug plan for next year</h3><p className="text-gray-700">With Original Medicare, compare Part D options during fall AEP. A change submitted in November 2026 takes effect January 1, 2027.</p><Link className="inline-block text-teal-700 underline mt-3" href="/faqs/medicare-annual-enrollment-period/">Review AEP rules</Link></div>
            <div className="border border-gray-200 rounded-xl p-5"><h3 className="font-bold text-[#1B2A4A] mb-2">Your Medicare Advantage plan is not working for you</h3><p className="text-gray-700">During MA OEP, use your one change to switch plans or return to Original Medicare. A request received in February generally takes effect March 1.</p><Link className="inline-block text-teal-700 underline mt-3" href="/faqs/medicare-advantage-open-enrollment-period/">Review MA OEP rules</Link></div>
          </div>
          <p className="text-gray-700 mt-4">Outside these windows, check whether a <Link className="text-teal-700 underline" href="/faqs/medicare-special-enrollment-period/">Special Enrollment Period</Link> applies. If you need Part A or Part B for the first time, use the enrollment chart below.</p>
        </section>

        {/* Enrollment Period Cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Medicare Enrollment Period Chart</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {enrollmentPeriods.map((period, i) => (
              <div key={i} className={`border-l-4 rounded-xl p-5 ${period.color}`}>
                <h3 className={`font-bold text-lg mb-1 ${period.titleColor}`}>{period.name}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" aria-hidden="true" /> {period.dates}
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
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Missing Your Enrollment Window Has Permanent Consequences</h3>
                <p className="text-sm text-red-700 mb-3">
                  If you miss your Initial Enrollment Period without a qualifying Special Enrollment Period, you may face permanent late enrollment penalties:
                </p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• <strong>Part B penalty:</strong> 10% added to your premium for each 12-month period you were eligible but didn't enroll</li>
                  <li>• <strong>Part D penalty:</strong> 1% of the national base beneficiary premium for each month without creditable coverage</li>
                </ul>
                <Link href="/medicare-enrollment/late-penalties" className="inline-block mt-3 text-sm text-red-800 font-semibold hover:underline">
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
                  aria-expanded={openFaq === i}
                  aria-controls={`enrollment-faq-${i}`}
                >
                  <span className="font-semibold text-[#1B2A4A] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div id={`enrollment-faq-${i}`} className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <p className="mt-6 text-sm text-gray-600">Also reviewed: Medicare.gov guidance on <a className="text-teal-700 underline" href="https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start">coverage start dates</a> and <a className="text-teal-700 underline" href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when">when you can buy Medigap</a>.</p>
      </div>
    </article>
  );
}
