"use client";
/**
 * Medicare Eligibility Page
 * URL: /original-medicare/medicare-eligibility
 * Covers: age eligibility, disability eligibility, ESRD, premium-free Part A, income limits
 */
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Phone, AlertTriangle, Users, Clock, Heart } from "lucide-react";
import { FAQSchema, BreadcrumbSchema, ArticleSchema } from "@/components/schema";

const tableOfContents = [
  { id: "overview", label: "Who Qualifies for Medicare?" },
  { id: "age-eligibility", label: "Age Eligibility (65+)" },
  { id: "disability-eligibility", label: "Disability Eligibility" },
  { id: "part-a-eligibility", label: "Part A Eligibility" },
  { id: "part-b-eligibility", label: "Part B Eligibility" },
  { id: "income", label: "Income & Medicare" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const faqs = [
  {
    q: "At what age do you become eligible for Medicare?",
    a: "Most people become eligible for Medicare at age 65. If you are already receiving Social Security or Railroad Retirement Board benefits, you will be automatically enrolled in Medicare Parts A and B the month you turn 65. If not, you need to sign up during your Initial Enrollment Period, which begins 3 months before your 65th birthday month.",
  },
  {
    q: "Can you get Medicare before age 65?",
    a: "Yes. You can qualify for Medicare before age 65 if you have received Social Security Disability Insurance (SSDI) for 24 months, have ALS (Lou Gehrig's disease — Medicare begins immediately upon SSDI approval), or have End-Stage Renal Disease (ESRD) requiring dialysis or a kidney transplant.",
  },
  {
    q: "What is the maximum income to qualify for Medicare?",
    a: "There is no income limit to qualify for Medicare — eligibility is based on age or disability status, not income. However, higher-income beneficiaries pay more for Parts B and D through Income-Related Monthly Adjustment Amounts (IRMAA). In 2026, IRMAA surcharges begin for individuals with income above $103,000 (or $206,000 for married couples filing jointly).",
  },
  {
    q: "Do you have to have worked to qualify for Medicare?",
    a: "Not necessarily. You qualify for premium-free Medicare Part A if you or your spouse worked and paid Medicare taxes for at least 10 years (40 quarters). If you haven't, you can still enroll in Medicare Part A by paying a monthly premium (up to $518/month in 2026). Part B is available to anyone who is eligible for Part A.",
  },
  {
    q: "Can a non-citizen get Medicare?",
    a: "Yes, but with conditions. Non-citizens who are lawful permanent residents (green card holders) and have lived in the U.S. continuously for at least 5 years may qualify for Medicare at age 65. The same work history requirements for premium-free Part A apply.",
  },
  {
    q: "How do I check if I am eligible for Medicare?",
    a: "You can check your Medicare eligibility online at Medicare.gov, by calling 1-800-MEDICARE (1-800-633-4227), or by contacting your local Social Security office. You can also use the Social Security Administration's Benefit Eligibility Screening Tool (BEST) at ssa.gov.",
  },
];

export default function MedicareEligibility() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs}  />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.medicarefaq.com/" },
          { name: "Original Medicare", url: "https://www.medicarefaq.com/original-medicare/" },
          { name: "Medicare Eligibility", url: "https://www.medicarefaq.com/original-medicare/medicare-eligibility/" },
        ]}
      />
      <ArticleSchema
        title="Medicare Eligibility Requirements 2026 | Who Qualifies for Medicare?"
        description="Learn who qualifies for Medicare in 2026. Understand age eligibility (65+), disability eligibility, ESRD, and how to check if you qualify for premium-free Part A."
        url="https://www.medicarefaq.com/original-medicare/medicare-eligibility/"
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
            <span className="text-white">Medicare Eligibility</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Medicare Eligibility</h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            Most people qualify for Medicare at age 65, but you may be eligible earlier due to disability or certain medical conditions. Learn exactly who qualifies and how to enroll.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Table of Contents */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h2 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">On This Page</h2>
            <ul className="space-y-2">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-[#0D9488] hover:underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Article Body */}
        <article className="flex-1 min-w-0 prose prose-gray max-w-none">
          <section id="overview">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Who Qualifies for Medicare?</h2>
            <p className="text-gray-700 mb-4">
              Medicare is the federal health insurance program primarily for people age 65 and older. However, younger people with certain disabilities or medical conditions can also qualify. There are three main pathways to Medicare eligibility:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { icon: <Clock className="w-6 h-6 text-[#0D9488]" />, title: "Age 65+", desc: "The most common pathway — available to U.S. citizens and qualifying permanent residents." },
                { icon: <Users className="w-6 h-6 text-[#D97706]" />, title: "Disability (SSDI)", desc: "After receiving Social Security Disability Insurance for 24 months. ALS qualifies immediately." },
                { icon: <Heart className="w-6 h-6 text-[#DC2626]" />, title: "ESRD / Kidney Failure", desc: "End-Stage Renal Disease requiring dialysis or a kidney transplant, at any age." },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-[#1B2A4A] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="age-eligibility" className="mt-8">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Medicare Age Eligibility</h2>
            <p className="text-gray-700 mb-4">
              The standard Medicare eligibility age is <strong>65 years old</strong>. To enroll, you must be a U.S. citizen or a lawful permanent resident who has lived in the U.S. for at least 5 consecutive years. Your <Link href="/enrollment/turning-65" className="text-[#0D9488] hover:underline">Initial Enrollment Period (IEP)</Link> begins 3 months before your 65th birthday month and extends 3 months after — a 7-month window total.
            </p>
            <div className="bg-teal-50 border-l-4 border-[#0D9488] rounded-r-xl p-5 mb-4">
              <p className="text-sm text-teal-800">
                <strong>Tip:</strong> If you are already receiving Social Security or Railroad Retirement Board benefits when you turn 65, you will be <strong>automatically enrolled</strong> in Medicare Parts A and B. Your Medicare card will arrive in the mail about 3 months before your 65th birthday.
              </p>
            </div>
            <p className="text-gray-700">
              If you are not receiving Social Security benefits at 65, you must actively sign up. Failing to enroll during your IEP can result in a <Link href="/enrollment/late-penalties" className="text-[#0D9488] hover:underline">late enrollment penalty</Link> for Part B and Part D.
            </p>
          </section>

          <section id="disability-eligibility" className="mt-8">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Medicare Disability Eligibility</h2>
            <p className="text-gray-700 mb-4">
              If you are under 65 and have been receiving <strong>Social Security Disability Insurance (SSDI)</strong> for 24 months, you will be automatically enrolled in <Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-[#0D9488] hover:underline">Medicare Part A</Link> and <Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-[#0D9488] hover:underline">Part B</Link>. The 24-month waiting period begins with your first SSDI payment.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800 mb-1">ALS Exception</p>
                  <p className="text-sm text-amber-700">
                    If you have ALS (Amyotrophic Lateral Sclerosis / Lou Gehrig's disease), the 24-month waiting period is waived. Medicare coverage begins the same month your SSDI benefits start.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              People under 65 with Medicare due to disability can add a <Link href="/medicare-supplements" className="text-[#0D9488] hover:underline">Medicare Supplement (Medigap) plan</Link>, though federal law does not require insurers to sell Medigap to people under 65. Some states have additional protections — check your state's rules.
            </p>
          </section>

          <section id="part-a-eligibility" className="mt-8">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Medicare Part A Eligibility Requirements</h2>
            <p className="text-gray-700 mb-4">
              Most people qualify for <strong>premium-free Part A</strong> if they or their spouse worked and paid Medicare taxes for at least <strong>10 years (40 quarters)</strong>. If you don't meet the work history requirement, you can still enroll in Part A by paying a monthly premium.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B2A4A] text-white">
                    <th className="text-left p-3 rounded-tl-lg">Work History</th>
                    <th className="text-left p-3 rounded-tr-lg">2026 Part A Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3">40+ quarters (10+ years)</td>
                    <td className="p-3 text-green-700 font-semibold">$0/month (premium-free)</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-3">30–39 quarters</td>
                    <td className="p-3">$285/month</td>
                  </tr>
                  <tr>
                    <td className="p-3">Fewer than 30 quarters</td>
                    <td className="p-3">$518/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="part-b-eligibility" className="mt-8">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Medicare Part B Eligibility Requirements</h2>
            <p className="text-gray-700 mb-4">
              Anyone who is eligible for <Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-[#0D9488] hover:underline">Medicare Part A</Link> is also eligible for <Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-[#0D9488] hover:underline">Part B</Link>. Unlike Part A, Part B always requires a monthly premium. The standard 2026 Part B premium is <strong>$185.00/month</strong>, though higher-income beneficiaries pay more through IRMAA surcharges.
            </p>
            <p className="text-gray-700">
              If you are still working and have employer coverage, you may be able to <Link href="/enrollment/working-past-65" className="text-[#0D9488] hover:underline">delay Part B enrollment</Link> without penalty. Once your employer coverage ends, you have an 8-month Special Enrollment Period to sign up.
            </p>
          </section>

          <section id="income" className="mt-8">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">What Is the Maximum Income to Qualify for Medicare?</h2>
            <p className="text-gray-700 mb-4">
              There is <strong>no income limit</strong> to qualify for Medicare. Eligibility is based on age or disability status, not income or assets. However, your income does affect how much you pay for Medicare. Higher-income beneficiaries pay more for Parts B and D through <strong>Income-Related Monthly Adjustment Amounts (IRMAA)</strong>.
            </p>
            <p className="text-gray-700">
              If you have limited income and resources, you may qualify for programs that help pay Medicare costs, including <strong>Medicaid</strong>, the <strong>Medicare Savings Programs</strong>, and <strong>Extra Help</strong> (Low Income Subsidy) for Part D drug costs.
            </p>
          </section>

          {/* FAQ Section */}
          <section id="faqs" className="mt-10">
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

          <section className="mt-10 mb-8">
            <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">Related Medicare Topics</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/original-medicare/medicare-coverage" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Coverage</h3>
                <p className="text-xs text-slate-500">What Original Medicare covers</p>
              </a>
              <a href="/original-medicare/medicare-costs" className="group p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm mb-1">Medicare Costs</h3>
                <p className="text-xs text-slate-500">Premiums, deductibles, and copays</p>
              </a>
            </div>
          </section>
          {/* CTA */}
          <section className="mt-10 bg-[#1B2A4A] text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Enroll in Medicare?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Our licensed Medicare agents can help you understand your options and find the right plan for your needs and budget.
            </p>
            <a href="tel:+18005551234" className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
              <Phone className="w-5 h-5" />
              Speak with a Licensed Agent
            </a>
          </section>
        </article>
      </div>
    </div>
  );
}
