"use client";
/**
 * Medigap Plans — Standalone Landing Page
 * Targets keywords: "medigap plans" (9,900/mo), "medigap" (9,900/mo)
 * Design: Comprehensive comparison of all 10 Medigap plan types
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  DollarSign,
  Shield,
  Star,
  Clock,
  Lightbulb,
  Heart,
  Users,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const tableOfContents = [
  { id: "what-is", label: "What Is Medigap?" },
  { id: "plans", label: "The 10 Medigap Plans" },
  { id: "coverage-chart", label: "Coverage Comparison" },
  { id: "costs", label: "Costs & Pricing" },
  { id: "eligibility", label: "Eligibility & Enrollment" },
  { id: "popular", label: "Most Popular Plans" },
  { id: "vs-ma", label: "Medigap vs. Medicare Advantage" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    q: "Can I buy a Medigap plan if I have Medicare Advantage?",
    a: (
      <>
        No, you cannot have both a Medigap policy and a{" "}
        <Link href="/medicare-advantage-plans" className="text-teal-700 underline hover:text-teal-900">
          Medicare Advantage plan
        </Link>{" "}
        at the same time. You must disenroll from Medicare Advantage and return to Original Medicare before purchasing a Medigap policy.
      </>
    ),
  },
  {
    q: "When is the best time to buy a Medigap plan?",
    a: "The best time is during your Medigap Open Enrollment Period — the 6-month window that starts when you turn 65 and are enrolled in Medicare Part B. During this period, insurance companies cannot deny you coverage or charge more due to health conditions.",
  },
  {
    q: "Do Medigap plans cover prescription drugs?",
    a: (
      <>
        No. Medigap plans do not cover prescription drugs. You&apos;ll need a separate{" "}
        <Link href="/original-medicare/medicare-parts/medicare-part-d" className="text-teal-700 underline hover:text-teal-900">
          Medicare Part D plan
        </Link>{" "}
        for drug coverage if you choose Original Medicare with a Medigap supplement.
      </>
    ),
  },
  {
    q: "What's the difference between Medigap Plan G and Plan N?",
    a: (
      <>
        Plan G covers all out-of-pocket costs except the Part B deductible ($257 in 2026). Plan N also covers most costs but requires small copays for office visits ($20) and ER visits ($50 if not admitted). Plan N premiums are typically 15-25% lower than Plan G. See our detailed{" "}
        <Link href="/medicare-supplements/medicare-plan-g" className="text-teal-700 underline hover:text-teal-900">
          Plan G
        </Link>{" "}
        and{" "}
        <Link href="/medicare-supplements/medicare-plan-n" className="text-teal-700 underline hover:text-teal-900">
          Plan N
        </Link>{" "}
        guides for more.
      </>
    ),
  },
  {
    q: "Can I switch Medigap plans later?",
    a: "You can apply to switch Medigap plans at any time, but outside of your initial Open Enrollment Period, insurance companies can use medical underwriting. This means they may deny coverage or charge higher premiums based on your health status. Some states have additional protections.",
  },
];

export default function PageContent() {
  const [activeSection, setActiveSection] = useState("what-is");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
          <li>/</li>
          <li><Link href="/medicare-supplements" className="hover:text-teal-700">Medicare Supplements</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">Medigap Plans</li>
        </ol>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-[#1a2b4a] leading-tight mb-6">
        Medigap Plans: Compare All 10 Medicare Supplement Plans{" "}
        <span className="text-teal-600">(2026)</span>
      </h1>

      {/* Key Takeaways */}
      <div className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-5 mb-10">
        <h2 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Key Takeaways
        </h2>
        <ul className="space-y-2 text-gray-700 text-[15px]">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>Medigap (Medicare Supplement) plans help cover the out-of-pocket costs that Original Medicare doesn&apos;t pay — like deductibles, copays, and coinsurance</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>There are 10 standardized plan types (A, B, C, D, F, G, K, L, M, N) — benefits are identical regardless of which company sells the plan</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>Plan G is the most popular Medigap plan in 2026, covering everything except the annual Part B deductible ($257)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>The best time to enroll is during your 6-month Medigap Open Enrollment Period (starting at age 65 + Part B enrollment) when no medical underwriting applies</span>
          </li>
        </ul>
      </div>

      {/* Layout: Content + Sidebar */}
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-28">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">In This Guide</p>
            <ul className="space-y-1.5 text-sm border-l-2 border-gray-200 pl-4">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-1 transition-colors ${
                      activeSection === item.id
                        ? "text-teal-700 font-semibold border-l-2 border-teal-600 -ml-[18px] pl-4"
                        : "text-gray-600 hover:text-teal-700"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* CTA */}
            <div className="mt-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-5 text-white">
              <p className="font-bold text-sm mb-2">Compare Medigap Rates</p>
              <p className="text-xs text-teal-100 mb-3">Rates vary by ZIP code, age, and gender. Get personalized quotes.</p>
              <ZipFormModal
                coverageType="ms"
                title="Compare Medigap Plans"
                subtitle="Enter your ZIP code to see rates from top carriers in your area."
                triggerLabel="Get My Rates"
                triggerClassName="w-full bg-white text-teal-700 font-semibold text-sm py-2 rounded-lg hover:bg-teal-50 transition-colors"
                pageSection="medigap-plans-sidebar"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* What Is Medigap? */}
          <section id="what-is" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">What Is Medigap (Medicare Supplement Insurance)?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Medigap plans — officially called Medicare Supplement Insurance — are private health insurance policies designed to fill the &quot;gaps&quot; in{" "}
              <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link>{" "}
              coverage. While Original Medicare (Parts A and B) covers most medical services, it leaves you responsible for deductibles, copayments, and coinsurance that can add up to thousands of dollars per year.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Medigap policy works alongside Original Medicare: Medicare pays its share first, then your Medigap plan pays some or all of the remaining costs depending on which plan you choose. This gives you predictable healthcare expenses and protection against large, unexpected medical bills.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Medigap plans are sold by private insurance companies but are standardized by the federal government. This means{" "}
              <strong>Plan G from one company offers the exact same benefits as Plan G from another company</strong> — the only differences are price and customer service. This standardization makes it easy to comparison shop.
            </p>
          </section>

          {/* The 10 Medigap Plans */}
          <section id="plans" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">The 10 Standardized Medigap Plans</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Each lettered plan offers a different level of coverage. Here&apos;s a quick overview:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { letter: "A", desc: "Basic benefits only. Covers Part A coinsurance and hospital costs.", level: "Basic" },
                { letter: "B", desc: "Plan A benefits + Part A deductible.", level: "Basic+" },
                { letter: "C", desc: "Full coverage including Part B deductible. Only for those eligible before 2020.", level: "Full*" },
                { letter: "D", desc: "Similar to Plan C but without Part B deductible coverage.", level: "High" },
                { letter: "F", desc: "Most comprehensive. Covers everything. Only for those eligible before 2020.", level: "Full*" },
                { letter: "G", desc: "Covers everything except the Part B deductible ($257/year). Most popular plan.", level: "Near-Full" },
                { letter: "K", desc: "Covers 50% of costs. Lower premiums with an annual out-of-pocket limit.", level: "Partial" },
                { letter: "L", desc: "Covers 75% of costs. Moderate premiums with an annual out-of-pocket limit.", level: "Partial+" },
                { letter: "M", desc: "Covers 50% of Part A deductible. Less common plan.", level: "Mid" },
                { letter: "N", desc: "Similar to Plan G but with small copays for office/ER visits. Lower premiums.", level: "High" },
              ].map((plan) => (
                <div key={plan.letter} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">{plan.letter}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2b4a] text-sm">Plan {plan.letter} <span className="text-xs font-normal text-gray-500">({plan.level})</span></p>
                    <p className="text-gray-600 text-xs mt-0.5">{plan.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3">*Plans C and F are only available to those who became eligible for Medicare before January 1, 2020.</p>
          </section>

          {/* Coverage Comparison Chart */}
          <section id="coverage-chart" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Medigap Coverage Comparison Chart (2026)</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              This chart shows what each plan covers. All plans are standardized, so benefits are the same regardless of which insurance company you buy from.
            </p>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-3 font-semibold text-[#1a2b4a] sticky left-0 bg-gray-50">Benefit</th>
                    <th className="px-2 py-3 font-semibold text-center">A</th>
                    <th className="px-2 py-3 font-semibold text-center">B</th>
                    <th className="px-2 py-3 font-semibold text-center">C*</th>
                    <th className="px-2 py-3 font-semibold text-center">D</th>
                    <th className="px-2 py-3 font-semibold text-center">F*</th>
                    <th className="px-2 py-3 font-semibold text-center bg-teal-50">G</th>
                    <th className="px-2 py-3 font-semibold text-center">K</th>
                    <th className="px-2 py-3 font-semibold text-center">L</th>
                    <th className="px-2 py-3 font-semibold text-center">M</th>
                    <th className="px-2 py-3 font-semibold text-center bg-teal-50">N</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { benefit: "Part A coinsurance & hospital", values: ["✓","✓","✓","✓","✓","✓","50%","75%","✓","✓"] },
                    { benefit: "Part B coinsurance/copay", values: ["✓","✓","✓","✓","✓","✓","50%","75%","✓","✓†"] },
                    { benefit: "Blood (first 3 pints)", values: ["✓","✓","✓","✓","✓","✓","50%","75%","✓","✓"] },
                    { benefit: "Part A hospice coinsurance", values: ["✓","✓","✓","✓","✓","✓","50%","75%","✓","✓"] },
                    { benefit: "Skilled nursing coinsurance", values: ["✗","✗","✓","✓","✓","✓","50%","75%","✓","✓"] },
                    { benefit: "Part A deductible", values: ["✗","✓","✓","✓","✓","✓","50%","75%","50%","✓"] },
                    { benefit: "Part B deductible", values: ["✗","✗","✓","✗","✓","✗","✗","✗","✗","✗"] },
                    { benefit: "Part B excess charges", values: ["✗","✗","✗","✗","✓","✓","✗","✗","✗","✗"] },
                    { benefit: "Foreign travel emergency", values: ["✗","✗","80%","80%","80%","80%","✗","✗","80%","80%"] },
                  ].map((row) => (
                    <tr key={row.benefit}>
                      <td className="px-3 py-2 text-gray-700 font-medium sticky left-0 bg-white">{row.benefit}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className={`px-2 py-2 text-center ${i === 5 || i === 9 ? "bg-teal-50" : ""} ${val === "✓" ? "text-green-600 font-bold" : val === "✗" ? "text-red-400" : "text-gray-600"}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              *Plans C and F only available to those Medicare-eligible before 1/1/2020. †Plan N copays: up to $20 for office visits, up to $50 for ER (if not admitted).
            </p>
            <p className="text-gray-700 text-sm mt-4">
              For a more detailed breakdown, visit our{" "}
              <Link href="/medicare-supplements/medigap-plans-comparison-chart" className="text-teal-700 underline hover:text-teal-900">
                full Medigap comparison chart
              </Link>.
            </p>
          </section>

          {/* Costs & Pricing */}
          <section id="costs" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">How Much Do Medigap Plans Cost?</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Unlike Medicare Advantage, Medigap plans have a monthly premium that varies by plan type, your age, location, gender, and tobacco use. Here are typical monthly ranges for the most popular plans:
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-5">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Plan</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Typical Monthly Premium</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Plan G</td><td className="px-4 py-3 text-gray-700">$100–$250/mo</td><td className="px-4 py-3 text-gray-700">Most comprehensive coverage available</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Plan N</td><td className="px-4 py-3 text-gray-700">$80–$200/mo</td><td className="px-4 py-3 text-gray-700">Lower premiums with small copays</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Plan F*</td><td className="px-4 py-3 text-gray-700">$150–$350/mo</td><td className="px-4 py-3 text-gray-700">Full coverage (pre-2020 eligible only)</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">High-Deductible G</td><td className="px-4 py-3 text-gray-700">$30–$70/mo</td><td className="px-4 py-3 text-gray-700">Lowest premiums, $2,870 deductible first</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-amber-800">Important:</strong> Medigap premiums are in addition to your Medicare Part B premium ($185/month in 2026). Your total monthly cost is the Medigap premium + Part B premium + a separate Part D drug plan premium if you want prescription coverage.
              </p>
            </div>
          </section>

          {/* Eligibility & Enrollment */}
          <section id="eligibility" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Medigap Eligibility &amp; When to Enroll</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              To purchase a Medigap plan, you must be enrolled in{" "}
              <Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-teal-700 underline hover:text-teal-900">Medicare Part A</Link>{" "}
              and{" "}
              <Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-teal-700 underline hover:text-teal-900">Part B</Link>. The timing of your enrollment matters significantly:
            </p>
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-green-800">Medigap Open Enrollment Period (Best Time)</p>
                  <p className="text-gray-700 text-sm mt-1">6-month window starting when you turn 65 AND are enrolled in Part B. During this period, companies <strong>cannot deny you</strong> or charge more due to pre-existing conditions. This is your guaranteed-issue right.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-[#1a2b4a]">Outside Open Enrollment</p>
                  <p className="text-gray-700 text-sm mt-1">You can apply anytime, but companies can use medical underwriting — meaning they may deny coverage or charge higher premiums based on your health history.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-[#1a2b4a]">Guaranteed Issue Rights</p>
                  <p className="text-gray-700 text-sm mt-1">Certain life events (like losing employer coverage or your MA plan leaving your area) give you a guaranteed right to buy a Medigap plan without medical underwriting.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Most Popular Plans */}
          <section id="popular" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Most Popular Medigap Plans in 2026</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-teal-200 rounded-xl p-5 shadow-sm relative">
                <div className="absolute -top-3 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">#1 Most Popular</div>
                <h3 className="font-bold text-[#1a2b4a] text-lg mt-2 mb-2">
                  <Link href="/medicare-supplements/medicare-plan-g" className="hover:text-teal-700">Plan G</Link>
                </h3>
                <p className="text-gray-700 text-sm mb-3">Covers everything except the annual Part B deductible ($257 in 2026). The go-to choice for new Medicare beneficiaries who want comprehensive, predictable coverage.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> All Part A &amp; B cost-sharing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Skilled nursing coinsurance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Part B excess charges</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Foreign travel emergency</li>
                </ul>
              </div>
              <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm relative">
                <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">#2 Best Value</div>
                <h3 className="font-bold text-[#1a2b4a] text-lg mt-2 mb-2">
                  <Link href="/medicare-supplements/medicare-plan-n" className="hover:text-teal-700">Plan N</Link>
                </h3>
                <p className="text-gray-700 text-sm mb-3">Similar to Plan G but with small copays ($20 office / $50 ER). Premiums are typically 15-25% lower, making it ideal for healthy beneficiaries who want to save on monthly costs.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> All Part A &amp; B cost-sharing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Skilled nursing coinsurance</li>
                  <li className="flex items-center gap-2"><XCircle className="w-3.5 h-3.5 text-red-400" /> No Part B excess charges</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Foreign travel emergency</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Medigap vs. Medicare Advantage */}
          <section id="vs-ma" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Medigap vs. Medicare Advantage</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              This is one of the most important decisions in Medicare. Here&apos;s how the two paths compare:
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-5">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-teal-700">Medigap + Original Medicare</th>
                    <th className="text-left px-4 py-3 font-semibold text-blue-700">Medicare Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Monthly cost</td><td className="px-4 py-3 text-gray-700">Higher (Part B + Medigap + Part D)</td><td className="px-4 py-3 text-gray-700">Lower (often $0 plan premium)</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Out-of-pocket when sick</td><td className="px-4 py-3 text-gray-700">Very low or $0</td><td className="px-4 py-3 text-gray-700">Copays/coinsurance up to MOOP</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Provider choice</td><td className="px-4 py-3 text-gray-700">Any Medicare provider nationwide</td><td className="px-4 py-3 text-gray-700">Network-based (HMO/PPO)</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Drug coverage</td><td className="px-4 py-3 text-gray-700">Separate Part D plan</td><td className="px-4 py-3 text-gray-700">Usually included</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Dental/vision/hearing</td><td className="px-4 py-3 text-gray-700">Not included</td><td className="px-4 py-3 text-gray-700">Often included</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Referrals needed</td><td className="px-4 py-3 text-gray-700">Never</td><td className="px-4 py-3 text-gray-700">Often (HMO plans)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="font-bold text-teal-800 text-sm mb-1">Choose Medigap if you:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Want predictable, low out-of-pocket costs</li>
                  <li>• Want freedom to see any doctor nationwide</li>
                  <li>• Travel frequently or split time between states</li>
                  <li>• Can afford higher monthly premiums</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-bold text-blue-800 text-sm mb-1">Choose Medicare Advantage if you:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Want lower monthly premiums</li>
                  <li>• Want dental, vision, and drugs in one plan</li>
                  <li>• Don&apos;t mind using a provider network</li>
                  <li>• Prefer an all-in-one plan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-5">Frequently Asked Questions About Medigap</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#1a2b4a] text-[15px] pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-[#1a2b4a] to-[#2a4a7a] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Compare Medigap Plans &amp; Rates?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Our licensed agents specialize in Medicare Supplement plans. Get personalized quotes from top carriers — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ZipFormModal
                coverageType="ms"
                title="Compare Medigap Rates"
                subtitle="Enter your ZIP code to see rates from top carriers in your area."
                triggerLabel="Compare Rates"
                triggerClassName="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                pageSection="medigap-plans-cta"
              />
              <a
                href="tel:+18008452484"
                onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "medigap-plans-cta" })}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" /> (800) 845-2484
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
