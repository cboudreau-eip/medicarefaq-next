"use client";
/**
 * Medigap Plans — Standalone Landing Page
 * Targets keywords: "medigap plans" (9,900/mo), "medigap" (9,900/mo)
 * Design: Dark navy hero + stat cards + plan type cards + coverage chart
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
  FileCheck,
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
    a: "The best time is during your Medigap Open Enrollment Period \u2014 the 6-month window that starts when you turn 65 and are enrolled in Medicare Part B. During this period, insurance companies cannot deny you coverage or charge more due to health conditions.",
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
    q: "What\u2019s the difference between Medigap Plan G and Plan N?",
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
    <div className="min-h-screen bg-white">
      {/* Dark Navy Hero */}
      <section className="relative bg-gradient-to-br from-[#1a2b4a] to-[#0f1e38] pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplements</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Medigap Plans</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Medicare Supplement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medigap Plans: Compare All 10 Medicare Supplement Plans{" "}
            <span className="text-teal-400">(2026)</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Fill the gaps in Original Medicare with standardized supplement plans that cover deductibles, copays, and coinsurance — see any Medicare doctor nationwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <ZipFormModal
              pageSection="medigap-plans-hero"
              coverageType="ms"
              title="Compare Medigap Plans"
              subtitle="Enter your ZIP code to see rates from top carriers in your area."
              buttonLabel="Compare Rates"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare Rates in Your Area <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medigap-plans-hero" })}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "10", label: "standardized plan types" },
            { value: "Plan G", label: "most popular in 2026" },
            { value: "$100\u2013$250", label: "typical monthly premium (Plan G)" },
            { value: "Any Doctor", label: "see any Medicare provider nationwide" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 text-center shadow-md">
              <div className="text-2xl font-bold text-teal-600 mb-1">{stat.value}</div>
              <p className="text-xs text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row-reverse gap-10">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >{item.label}</a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Compare Medigap Rates</p>
                  <p className="text-xs text-blue-700 mb-3">Rates vary by ZIP code, age, and gender</p>
                  <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
                    onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medigap-plans-sidebar" })}
                    className="flex items-center gap-2 text-sm font-bold text-blue-700">
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Key Takeaways */}
              <div className="mb-12 bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-teal-700" />
                  <h3 className="font-bold text-teal-900 text-sm uppercase tracking-wider">Key Takeaways</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    (<>Medigap (Medicare Supplement) plans help cover the out-of-pocket costs that <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> doesn&apos;t pay — like deductibles, copays, and coinsurance</>),
                    "There are 10 standardized plan types (A, B, C, D, F, G, K, L, M, N) \u2014 benefits are identical regardless of which company sells the plan",
                    "Plan G is the most popular Medigap plan in 2026, covering everything except the annual Part B deductible ($257)",
                    "The best time to enroll is during your 6-month Medigap Open Enrollment Period (starting at age 65 + Part B enrollment) when no medical underwriting applies",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Is Medigap? */}
              <section id="what-is" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Is Medigap (Medicare Supplement Insurance)?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Medigap plans — officially called Medicare Supplement Insurance — are private health insurance policies designed to fill the &quot;gaps&quot; in{" "}
                  <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link>{" "}
                  coverage. While Original Medicare (Parts A and B) covers most medical services, it leaves you responsible for deductibles, copayments, and coinsurance that can add up to thousands of dollars per year.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A Medigap policy works alongside Original Medicare: Medicare pays its share first, then your Medigap plan pays some or all of the remaining costs depending on which plan you choose. This gives you predictable healthcare expenses and protection against large, unexpected medical bills.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Medigap plans are sold by private insurance companies but are standardized by the federal government. This means{" "}
                  <strong>Plan G from one company offers the exact same benefits as Plan G from another company</strong> — the only differences are price and customer service. This standardization makes it easy to comparison shop.
                </p>
              </section>

              {/* The 10 Medigap Plans */}
              <section id="plans" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  The 10 Standardized Medigap Plans
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Each lettered plan offers a different level of coverage. Here&apos;s a quick overview:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { letter: "A", desc: "Basic benefits only. Covers Part A coinsurance and hospital costs.", level: "Basic" },
                    { letter: "B", desc: "Plan A benefits + Part A deductible.", level: "Basic+" },
                    { letter: "C", desc: "Full coverage including Part B deductible. Only for those eligible before 2020.", level: "Full*" },
                    { letter: "D", desc: "Similar to Plan C but without Part B deductible coverage.", level: "High" },
                    { letter: "F", desc: "Most comprehensive. Covers everything. Only for those eligible before 2020.", level: "Full*" },
                    { letter: "G", desc: "Covers everything except the Part B deductible ($257/year). Most popular plan.", level: "Near-Full", popular: true },
                    { letter: "K", desc: "Covers 50% of costs. Lower premiums with an annual out-of-pocket limit.", level: "Partial" },
                    { letter: "L", desc: "Covers 75% of costs. Moderate premiums with an annual out-of-pocket limit.", level: "Partial+" },
                    { letter: "M", desc: "Covers 50% of Part A deductible. Less common plan.", level: "Mid" },
                    { letter: "N", desc: "Similar to Plan G but with small copays for office/ER visits. Lower premiums.", level: "High", popular: true },
                  ].map((plan) => (
                    <div key={plan.letter} className={`flex items-start gap-3 p-4 rounded-xl border ${(plan as { popular?: boolean }).popular ? "border-teal-200 bg-teal-50/30" : "border-slate-200 bg-white"}`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${(plan as { popular?: boolean }).popular ? "bg-teal-600" : "bg-slate-600"}`}>
                        <span className="text-white font-bold text-lg">{plan.letter}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          Plan {plan.letter}{" "}
                          <span className="text-xs font-normal text-slate-500">({plan.level})</span>
                          {(plan as { popular?: boolean }).popular && <span className="ml-2 text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Popular</span>}
                        </p>
                        <p className="text-slate-600 text-xs mt-0.5">{plan.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-3">*Plans C and F are only available to those who became eligible for Medicare before January 1, 2020.</p>
              </section>

              {/* Coverage Comparison Chart */}
              <section id="coverage-chart" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medigap Coverage Comparison Chart (2026)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This chart shows what each plan covers. All plans are standardized, so benefits are the same regardless of which insurance company you buy from.
                </p>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-3 py-3 font-semibold text-slate-900 sticky left-0 bg-slate-50">Benefit</th>
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
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { benefit: "Part A coinsurance & hospital", values: ["\u2713","\u2713","\u2713","\u2713","\u2713","\u2713","50%","75%","\u2713","\u2713"] },
                        { benefit: "Part B coinsurance/copay", values: ["\u2713","\u2713","\u2713","\u2713","\u2713","\u2713","50%","75%","\u2713","\u2713\u2020"] },
                        { benefit: "Blood (first 3 pints)", values: ["\u2713","\u2713","\u2713","\u2713","\u2713","\u2713","50%","75%","\u2713","\u2713"] },
                        { benefit: "Part A hospice coinsurance", values: ["\u2713","\u2713","\u2713","\u2713","\u2713","\u2713","50%","75%","\u2713","\u2713"] },
                        { benefit: "Skilled nursing coinsurance", values: ["\u2717","\u2717","\u2713","\u2713","\u2713","\u2713","50%","75%","\u2713","\u2713"] },
                        { benefit: "Part A deductible", values: ["\u2717","\u2713","\u2713","\u2713","\u2713","\u2713","50%","75%","50%","\u2713"] },
                        { benefit: "Part B deductible", values: ["\u2717","\u2717","\u2713","\u2717","\u2713","\u2717","\u2717","\u2717","\u2717","\u2717"] },
                        { benefit: "Part B excess charges", values: ["\u2717","\u2717","\u2717","\u2717","\u2713","\u2713","\u2717","\u2717","\u2717","\u2717"] },
                        { benefit: "Foreign travel emergency", values: ["\u2717","\u2717","80%","80%","80%","80%","\u2717","\u2717","80%","80%"] },
                      ].map((row) => (
                        <tr key={row.benefit}>
                          <td className="px-3 py-2 text-slate-700 font-medium sticky left-0 bg-white">{row.benefit}</td>
                          {row.values.map((val, i) => (
                            <td key={i} className={`px-2 py-2 text-center ${i === 5 || i === 9 ? "bg-teal-50" : ""} ${val === "\u2713" || val === "\u2713\u2020" ? "text-green-600 font-bold" : val === "\u2717" ? "text-red-400" : "text-slate-600"}`}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-500 text-xs mt-3">
                  *Plans C and F only available to those Medicare-eligible before 1/1/2020. \u2020Plan N copays: up to $20 for office visits, up to $50 for ER (if not admitted).
                </p>
                <p className="text-slate-600 text-sm mt-4">
                  For a more detailed breakdown, visit our{" "}
                  <Link href="/medicare-supplements/medigap-plans-comparison-chart" className="text-teal-700 underline hover:text-teal-900">
                    full Medigap comparison chart
                  </Link>.
                </p>
              </section>

              {/* Costs & Pricing */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How Much Do Medigap Plans Cost?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Unlike Medicare Advantage, Medigap plans have a monthly premium that varies by plan type, your age, location, gender, and tobacco use. Here are typical monthly ranges for the most popular plans:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Plan</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Typical Monthly Premium</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Plan G", "$100\u2013$250/mo", "Most comprehensive coverage available"],
                        ["Plan N", "$80\u2013$200/mo", "Lower premiums with small copays"],
                        ["Plan F*", "$150\u2013$350/mo", "Full coverage (pre-2020 eligible only)"],
                        ["High-Deductible G", "$30\u2013$70/mo", "Lowest premiums, $2,870 deductible first"],
                      ].map(([plan, premium, best], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="p-4 text-sm text-slate-700 border border-slate-200 font-medium">{plan}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{premium}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <p className="text-sm text-slate-700">
                    <strong className="text-amber-800">Important:</strong> Medigap premiums are in addition to your Medicare Part B premium ($185/month in 2026). Your total monthly cost is the Medigap premium + Part B premium + a separate Part D drug plan premium if you want prescription coverage.
                  </p>
                </div>
              </section>

              {/* Eligibility & Enrollment */}
              <section id="eligibility" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medigap Eligibility &amp; When to Enroll
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  To purchase a Medigap plan, you must be enrolled in{" "}
                  <Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-teal-700 underline hover:text-teal-900">Medicare Part A</Link>{" "}
                  and{" "}
                  <Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-teal-700 underline hover:text-teal-900">Part B</Link>. The timing of your enrollment matters significantly:
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Medigap Open Enrollment Period (Best Time)", desc: "6-month window starting when you turn 65 AND are enrolled in Part B. During this period, companies cannot deny you or charge more due to pre-existing conditions. This is your guaranteed-issue right.", icon: Star, color: "green" },
                    { title: "Outside Open Enrollment", desc: "You can apply anytime, but companies can use medical underwriting \u2014 meaning they may deny coverage or charge higher premiums based on your health history.", icon: Clock, color: "slate" },
                    { title: "Guaranteed Issue Rights", desc: "Certain life events (like losing employer coverage or your MA plan leaving your area) give you a guaranteed right to buy a Medigap plan without medical underwriting.", icon: Shield, color: "slate" },
                  ].map((item) => {
                    const isHighlight = item.color === "green";
                    return (
                      <div key={item.title} className={`p-5 rounded-xl border ${isHighlight ? "border-green-200 bg-green-50/50" : "border-slate-200 bg-white"}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isHighlight ? "bg-green-100" : "bg-slate-100"}`}>
                            <item.icon className={`w-5 h-5 ${isHighlight ? "text-green-600" : "text-slate-600"}`} />
                          </div>
                          <span className={`font-bold ${isHighlight ? "text-green-800" : "text-slate-900"}`}>{item.title}</span>
                        </div>
                        <p className="text-sm text-slate-600 ml-[52px]">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Most Popular Plans */}
              <section id="popular" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Most Popular Medigap Plans in 2026
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-teal-200 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">#1 Most Popular</div>
                    <h3 className="font-bold text-slate-900 text-lg mt-2 mb-2">
                      <Link href="/medicare-supplements/medicare-plan-g" className="hover:text-teal-700">Plan G</Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-3">Covers everything except the annual Part B deductible ($257 in 2026). The go-to choice for new Medicare beneficiaries who want comprehensive, predictable coverage.</p>
                    <ul className="text-sm text-slate-600 space-y-1.5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> All Part A &amp; B cost-sharing</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Skilled nursing coinsurance</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Part B excess charges</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Foreign travel emergency</li>
                    </ul>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">#2 Best Value</div>
                    <h3 className="font-bold text-slate-900 text-lg mt-2 mb-2">
                      <Link href="/medicare-supplements/medicare-plan-n" className="hover:text-teal-700">Plan N</Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-3">Similar to Plan G but with small copays ($20 office / $50 ER). Premiums are typically 15-25% lower, making it ideal for healthy beneficiaries who want to save on monthly costs.</p>
                    <ul className="text-sm text-slate-600 space-y-1.5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> All Part A &amp; B cost-sharing</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Skilled nursing coinsurance</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> No Part B excess charges</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Foreign travel emergency</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Medigap vs. Medicare Advantage */}
              <section id="vs-ma" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medigap vs. Medicare Advantage
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This is one of the most important decisions in Medicare. Here&apos;s how the two paths compare:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Feature</th>
                        <th className="text-left p-4 text-sm font-semibold text-teal-700 border border-slate-200 bg-teal-50/50">Medigap + Original Medicare</th>
                        <th className="text-left p-4 text-sm font-semibold text-blue-700 border border-slate-200 bg-blue-50/50">Medicare Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Monthly cost", "Higher (Part B + Medigap + Part D)", "Lower (often $0 plan premium)"],
                        ["Out-of-pocket when sick", "Very low or $0", "Copays/coinsurance up to MOOP"],
                        ["Provider choice", "Any Medicare provider nationwide", "Network-based (HMO/PPO)"],
                        ["Drug coverage", "Separate Part D plan", "Usually included"],
                        ["Dental/vision/hearing", "Not included", "Often included"],
                        ["Referrals needed", "Never", "Often (HMO plans)"],
                      ].map(([feature, medigap, ma], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="p-4 text-sm text-slate-700 border border-slate-200 font-medium">{feature}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{medigap}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{ma}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
                    <p className="font-bold text-teal-900 text-sm mb-2">Choose Medigap if you:</p>
                    <ul className="space-y-1.5 text-sm text-teal-800">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Want predictable, low out-of-pocket costs</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Want freedom to see any doctor nationwide</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Travel frequently or split time between states</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Can afford higher monthly premiums</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <p className="font-bold text-blue-900 text-sm mb-2">Choose Medicare Advantage if you:</p>
                    <ul className="space-y-1.5 text-sm text-blue-800">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Want lower monthly premiums</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Want dental, vision, and drugs in one plan</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Don&apos;t mind using a provider network</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Prefer an all-in-one plan</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Frequently Asked Questions About Medigap
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                  Ready to Compare Medigap Plans &amp; Rates?
                </h2>
                <p className="text-teal-100 mb-6 max-w-lg mx-auto">
                  Our licensed agents specialize in Medicare Supplement plans. Get personalized quotes from top carriers — no obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <ZipFormModal
                    coverageType="ms"
                    title="Compare Medigap Rates"
                    subtitle="Enter your ZIP code to see rates from top carriers in your area."
                    triggerLabel="Compare Rates"
                    triggerClassName="inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors"
                    pageSection="medigap-plans-cta"
                  />
                  <a
                    href="tel:+18008452484"
                    onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "medigap-plans-cta" })}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> (800) 845-2484
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
