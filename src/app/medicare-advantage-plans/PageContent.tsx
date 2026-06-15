"use client";
/**
 * Medicare Advantage Plans — Standalone Landing Page
 * Targets keyword: "medicare advantage plans" (40,500/mo)
 * Design: Dark navy hero + stat cards + plan type cards + icon benefit cards
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
  Users,
  Stethoscope,
  Pill,
  Eye,
  Activity,
  Lightbulb,
  Heart,
  MapPin,
  FileCheck,
  Zap,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const tableOfContents = [
  { id: "what-are", label: "What Are MA Plans?" },
  { id: "coverage", label: "What They Cover" },
  { id: "types", label: "Types of Plans" },
  { id: "costs", label: "Costs" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "enrollment", label: "How to Enroll" },
  { id: "comparison", label: "MA vs. Original Medicare" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    q: "Can I change my Medicare Advantage plan annually?",
    a: (
      <>
        Yes, during the{" "}
        <Link href="/faqs/medicare-annual-enrollment-period/" className="text-teal-700 underline hover:text-teal-900">
          Annual Enrollment Period
        </Link>{" "}
        (October 15 – December 7), you can switch Medicare Advantage plans, move from Medicare Advantage to Original Medicare, or add/drop prescription drug coverage.
      </>
    ),
  },
  {
    q: "Will my Medicare Advantage plan cover me if I travel?",
    a: "All plans cover emergency care nationwide. For routine care, coverage depends on your plan type — most HMOs only cover routine care in your local area, while PPOs may offer some out-of-network coverage nationwide.",
  },
  {
    q: "Can I keep seeing my doctor if they leave my plan's network?",
    a: "You can continue seeing them but will pay higher out-of-network costs. Alternatively, you can switch to a plan that includes your doctor during the next enrollment period or find a new doctor within your current plan's network.",
  },
  {
    q: "Is there a catch with $0 premium Medicare Advantage plans?",
    a: "While many plans have $0 monthly premiums, you still pay your Medicare Part B premium ($185/month in 2026) plus copays and deductibles when you receive care. The \"$0 premium\" refers only to the additional plan premium.",
  },
  {
    q: "What are the requirements to enroll in Medicare Advantage?",
    a: (
      <>
        You must be enrolled in Medicare Part A and Part B, live in the plan&apos;s service area, and not have End-Stage Renal Disease (with some exceptions). You cannot have both Medicare Advantage and{" "}
        <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">
          Medigap
        </Link>{" "}
        coverage simultaneously. For complete eligibility details, see our{" "}
        <Link href="/medicare-part-c/medicare-advantage-eligibility" className="text-teal-700 underline hover:text-teal-900">
          Medicare Advantage eligibility guide
        </Link>.
      </>
    ),
  },
];

export default function PageContent() {
  const [activeSection, setActiveSection] = useState("what-are");
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
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Medicare Advantage Plans</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600/20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Medicare Advantage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Advantage Plans: What They Are &amp; How to Enroll{" "}
            <span className="text-teal-400">(2026)</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            An all-in-one alternative to Original Medicare with extra benefits like dental, vision, and prescription drugs — often at $0 monthly premium.
          </p>
          <div className="flex flex-wrap gap-4">
            <ZipFormModal
              pageSection="ma-plans-hero"
              coverageType="ma"
              title="Find Medicare Advantage Plans"
              subtitle="Enter your ZIP code to compare Medicare Advantage plans available in your area — free, no obligation."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Find Plans in Your Area <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "ma-plans-hero" })}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="container -mt-8 relative z-20 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "51%", label: "of Medicare beneficiaries choose MA" },
            { value: "$0", label: "premium for most MA plans" },
            { value: "$8,850", label: "max out-of-pocket (in-network) 2026" },
            { value: "4,000+", label: "MA plans available nationwide" },
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
        <div className="container">
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
                  <p className="text-sm font-semibold text-blue-900 mb-1">Compare Plans in Your Area</p>
                  <p className="text-xs text-blue-700 mb-3">Speak with a licensed Medicare agent</p>
                  <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
                    onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "ma-plans-sidebar" })}
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
                    (<>Medicare Advantage plans are private insurance alternatives to <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> that often include prescription drug coverage and extra benefits like dental and vision</>),
                    "Most plans have $0 monthly premiums, but you\u2019ll still pay Medicare Part B premiums plus copays and deductibles when you use services",
                    "Plans operate through provider networks (HMO, PPO) and may require referrals for specialists depending on the plan type",
                    "You can only enroll during specific periods: October 15 \u2013 December 7 (Annual Enrollment) or when you first get Medicare",
                    "Medicare Advantage caps your annual out-of-pocket costs, unlike Original Medicare which has no limit",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Are Medicare Advantage Plans? */}
              <section id="what-are" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Are Medicare Advantage Plans?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Medicare Advantage plans are private health insurance plans approved by Medicare that provide all the benefits of{" "}
                  <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link>{" "}
                  (Parts A and B) plus additional coverage in a single plan. Also known as Medicare Part C, these plans are offered by private insurance companies like Humana, Anthem, and UnitedHealthcare.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Unlike Original Medicare, which allows you to see any doctor who accepts Medicare, Medicare Advantage plans typically use provider networks. This means you&apos;ll generally pay less when you see doctors and visit hospitals within your plan&apos;s network. Most plans also include prescription drug coverage (Medicare Part D) and extra benefits like dental, vision, hearing aids, and wellness programs that Original Medicare doesn&apos;t cover.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The key difference is that with Medicare Advantage, you&apos;re getting your Medicare benefits through a private insurer rather than directly from the federal government. These companies receive payments from Medicare to provide your coverage and often add extra benefits to attract members. For a comprehensive overview of how these plans work, see our detailed guide on{" "}
                  <Link href="/medicare-part-c/medicare-advantage-plans" className="text-teal-700 underline hover:text-teal-900">Medicare Part C (Medicare Advantage)</Link>.
                </p>
              </section>

              {/* What Do Medicare Advantage Plans Cover? */}
              <section id="coverage" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Do Medicare Advantage Plans Cover?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  All Medicare Advantage plans must cover everything Original Medicare covers. Most plans go further by including valuable extras:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-teal-600" /> Required Benefits
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Hospital stays (Part A)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Doctor visits &amp; outpatient services (Part B)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Preventive care (annual wellness visits, screenings)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Emergency &amp; urgent care (nationwide)</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" /> Common Extras
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2"><Pill className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Prescription drug coverage (96% of plans)</li>
                      <li className="flex items-start gap-2"><Eye className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Dental, vision &amp; hearing coverage</li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Fitness memberships &amp; wellness programs</li>
                      <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> OTC allowances, telehealth, transportation</li>
                    </ul>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Some plans offer special benefits like the{" "}
                  <Link href="/medicare-part-c/medicare-advantage-give-back-benefit" className="text-teal-700 underline hover:text-teal-900">Give Back Benefit</Link>{" "}
                  that reduces your Medicare Part B premium, or grocery allowances for members with chronic conditions. Benefits vary significantly between plans, so it&apos;s important to compare what&apos;s included in plans available in your area.
                </p>
              </section>

              {/* Types of Medicare Advantage Plans */}
              <section id="types" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Types of Medicare Advantage Plans
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  There are several types of Medicare Advantage plans, each with different rules for accessing care:
                </p>
                <div className="space-y-4">
                  {[
                    { name: "HMO", full: "Health Maintenance Organization", desc: "You must choose a primary care doctor and get referrals to see specialists. Lowest costs but least flexibility.", icon: Users, popular: true },
                    { name: "PPO", full: "Preferred Provider Organization", desc: "You can see any provider but pay less for in-network care. No referrals needed for specialists.", icon: Stethoscope, popular: true },
                    { name: "PFFS", full: "Private Fee-for-Service", desc: "The plan sets payment rates for providers. You can see any doctor who accepts the plan\u2019s terms.", icon: DollarSign, popular: false },
                    { name: "SNP", full: "Special Needs Plans", desc: "Designed for people with chronic conditions, institutional care needs, or dual Medicare/Medicaid eligibility.", icon: Heart, popular: false },
                  ].map((plan) => (
                    <div key={plan.name} className={`p-5 rounded-xl border ${plan.popular ? "border-teal-200 bg-teal-50/30" : "border-slate-200 bg-white"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${plan.popular ? "bg-teal-100" : "bg-slate-100"}`}>
                          <plan.icon className={`w-5 h-5 ${plan.popular ? "text-teal-600" : "text-slate-600"}`} />
                        </div>
                        <span className={`text-lg font-bold ${plan.popular ? "text-teal-700" : "text-slate-700"}`}>{plan.name}</span>
                        <span className="text-sm text-slate-500">({plan.full})</span>
                        {plan.popular && <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Popular</span>}
                      </div>
                      <p className="text-sm text-slate-600 ml-[52px]">{plan.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-sm mt-4">
                  For detailed information about each plan type and which might work best for your situation, visit our{" "}
                  <Link href="/medicare-part-c/medicare-advantage-plan-types" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage plan types guide</Link>,
                  or explore individual plan types:{" "}
                  <Link href="/medicare-part-c/medicare-advantage-plan-hmo" className="text-teal-700 underline hover:text-teal-900">HMO plans</Link>,{" "}
                  <Link href="/medicare-part-c/medicare-advantage-plan-ppo" className="text-teal-700 underline hover:text-teal-900">PPO plans</Link>,{" "}
                  <Link href="/medicare-part-c/medicare-advantage-plan-pffs" className="text-teal-700 underline hover:text-teal-900">PFFS plans</Link>, and{" "}
                  <Link href="/medicare-part-c/medicare-advantage-plan-snp" className="text-teal-700 underline hover:text-teal-900">Special Needs Plans (SNP)</Link>.
                </p>
              </section>

              {/* How Much Do Medicare Advantage Plans Cost? */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How Much Do Medicare Advantage Plans Cost?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Advantage plans often have attractive pricing, but costs come in several forms:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Cost Type</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Typical Amount (2026)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Monthly Premium", "$0 for most plans (85%+)"],
                        ["Part B Premium (required)", "$185/month"],
                        ["Primary Care Visit", "$0\u2013$25 copay"],
                        ["Specialist Visit", "$35\u2013$50 copay"],
                        ["Hospital Stay", "$200\u2013$400/day (first few days)"],
                        ["Out-of-Pocket Maximum", "$8,850 or less (in-network)"],
                      ].map(([type, amount], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="p-4 text-sm text-slate-700 border border-slate-200 font-medium">{type}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  While the $0 premium is appealing, your total costs depend on how much care you use. Compare the total estimated costs, not just premiums. For a detailed cost breakdown, see our{" "}
                  <Link href="/medicare-part-c/medicare-advantage-costs" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage costs guide</Link>.
                </p>
              </section>

              {/* Pros and Cons */}
              <section id="pros-cons" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Pros and Cons of Medicare Advantage
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" /> Advantages
                    </h3>
                    <ul className="space-y-3 text-sm text-green-800">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Lower monthly premiums (often $0)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Annual out-of-pocket maximum provides cost protection</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Extra benefits like dental, vision, drugs included</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Coordinated care through provider networks</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Many plans offer additional perks and wellness programs</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" /> Disadvantages
                    </h3>
                    <ul className="space-y-3 text-sm text-red-800">
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Limited to provider networks (except emergencies)</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> May need referrals to see specialists</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Plan networks and benefits can change annually</li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Less flexibility than Original Medicare + <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">Medigap</Link></li>
                      <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Prior authorization may be required for some services</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <p className="text-sm text-slate-700">
                    <strong>Bottom Line:</strong> Medicare Advantage works best for people who want predictable costs, don&apos;t mind using provider networks, and value the extra benefits. Those who want maximum flexibility to see any Medicare provider might prefer{" "}
                    <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> with a supplement plan.
                  </p>
                </div>
              </section>

              {/* How to Enroll */}
              <section id="enrollment" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Enroll in a Medicare Advantage Plan
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">You can enroll in Medicare Advantage during these periods:</p>
                <div className="space-y-4 mb-6">
                  {[
                    { period: "Annual Open Enrollment", dates: "October 15 \u2013 December 7", desc: "Change plans or switch between Medicare Advantage and Original Medicare for coverage starting January 1.", icon: Clock, color: "teal" },
                    { period: "Initial Enrollment", dates: "Around your 65th birthday", desc: "When you first become eligible for Medicare (typically at age 65).", icon: Star, color: "blue" },
                    { period: "MA Open Enrollment", dates: "January 1 \u2013 March 31", desc: "Switch to a different MA plan or return to Original Medicare (+ Part D).", icon: FileCheck, color: "indigo" },
                    { period: "Special Enrollment Periods", dates: "Varies", desc: "If you move, lose employer coverage, or qualify for extra help with costs.", icon: Shield, color: "amber" },
                  ].map((item) => {
                    const colorMap: Record<string, { border: string; bg: string; icon: string }> = {
                      teal: { border: "border-teal-200", bg: "bg-teal-50/30", icon: "text-teal-600" },
                      blue: { border: "border-blue-200", bg: "bg-blue-50/30", icon: "text-blue-600" },
                      indigo: { border: "border-indigo-200", bg: "bg-indigo-50/30", icon: "text-indigo-600" },
                      amber: { border: "border-amber-200", bg: "bg-amber-50/30", icon: "text-amber-600" },
                    };
                    const c = colorMap[item.color];
                    return (
                      <div key={item.period} className={`p-5 rounded-xl border ${c.border} ${c.bg}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className={`w-5 h-5 ${c.icon}`} />
                          <span className="font-bold text-slate-900">{item.period}</span>
                          <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">{item.dates}</span>
                        </div>
                        <p className="text-sm text-slate-600 ml-8">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 mb-3">Enrollment Steps</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                    <li>Check which plans are available in your ZIP code</li>
                    <li>Compare benefits, costs, and provider networks</li>
                    <li>Enroll online at Medicare.gov, by phone, or through the insurance company</li>
                    <li>Receive your new member materials before coverage begins</li>
                  </ol>
                </div>
                <p className="text-slate-600 text-sm mt-4">
                  Learn more about specific enrollment windows and rules in our{" "}
                  <Link href="/medicare-part-c/medicare-advantage-enrollment-periods" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage enrollment periods guide</Link>.
                </p>
              </section>

              {/* Medicare Advantage vs. Original Medicare */}
              <section id="comparison" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage vs. Original Medicare
                </h2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Feature</th>
                        <th className="text-left p-4 text-sm font-semibold text-teal-700 border border-slate-200 bg-teal-50/50">Medicare Advantage</th>
                        <th className="text-left p-4 text-sm font-semibold text-blue-700 border border-slate-200 bg-blue-50/50">Original Medicare</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Administered by", "Private insurers", "Federal government"],
                        ["Provider choice", "Network-based", "Any Medicare provider"],
                        ["Out-of-pocket limit", "Yes ($8,850 max in 2026)", "No limit without Medigap"],
                        ["Drug coverage", "Usually included", "Separate Part D plan needed"],
                        ["Dental/vision/hearing", "Often included", "Not covered"],
                        ["Monthly premium", "Often $0 (+ Part B)", "Part B only (+ Medigap optional)"],
                        ["Referrals needed", "Often (HMOs)", "Never"],
                        ["Works nationwide", "Network area only", "Yes \u2014 any Medicare provider"],
                      ].map(([feature, ma, om], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="p-4 text-sm text-slate-700 border border-slate-200 font-medium">{feature}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{ma}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{om}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
                    <p className="font-bold text-teal-900 text-sm mb-2">Choose Medicare Advantage if you:</p>
                    <ul className="space-y-1.5 text-sm text-teal-800">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Want lower premiums and extra benefits</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Don&apos;t mind network restrictions</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" /> Want cost predictability with an out-of-pocket cap</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <p className="font-bold text-blue-900 text-sm mb-2">Choose Original Medicare if you:</p>
                    <ul className="space-y-1.5 text-sm text-blue-800">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Want maximum flexibility to see any provider</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Travel frequently or live in multiple states</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" /> Are willing to pay for <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">Medigap</Link></li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Frequently Asked Questions
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
                  Ready to Compare Medicare Advantage Plans?
                </h2>
                <p className="text-teal-100 mb-6 max-w-lg mx-auto">
                  Our licensed agents can help you find the best Medicare Advantage plan for your needs and budget. No obligation, no pressure.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <ZipFormModal
                    coverageType="ma"
                    title="Compare Medicare Advantage Plans"
                    subtitle="Enter your ZIP code to see plans available in your area."
                    triggerLabel="Compare Plans"
                    triggerClassName="inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors"
                    pageSection="ma-plans-cta"
                  />
                  <a
                    href="tel:+18008452484"
                    onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "ma-plans-cta" })}
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
