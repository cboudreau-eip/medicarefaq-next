"use client";
/**
 * Medicare Advantage Plans — Standalone Landing Page
 * Targets keyword: "medicare advantage plans" (40,500/mo)
 * Design: Concise, action-oriented overview with links to deeper Part C content
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
        <Link href="/enrollment/annual-enrollment-period" className="text-teal-700 underline hover:text-teal-900">
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
        <Link href="/medicare-supplements" className="text-teal-700 underline hover:text-teal-900">
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
    <>

      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
            <li>/</li>
            <li><Link href="/medicare-part-c" className="hover:text-teal-700">Medicare Plans</Link></li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Medicare Advantage Plans</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-[#1a2b4a] leading-tight mb-6">
          Medicare Advantage Plans: What They Are, How They Work &amp; How to Enroll{" "}
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
              <span>Medicare Advantage plans are private insurance alternatives to Original Medicare that often include prescription drug coverage and extra benefits like dental and vision</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <span>Most plans have $0 monthly premiums, but you&apos;ll still pay Medicare Part B premiums plus copays and deductibles when you use services</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <span>Plans operate through provider networks (HMO, PPO) and may require referrals for specialists depending on the plan type</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <span>You can only enroll during specific periods: October 15 – December 7 (Annual Enrollment) or when you first get Medicare</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <span>Medicare Advantage caps your annual out-of-pocket costs, unlike Original Medicare which has no limit</span>
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
                <p className="font-bold text-sm mb-2">Compare Plans in Your Area</p>
                <p className="text-xs text-teal-100 mb-3">Find $0 premium Medicare Advantage plans available near you.</p>
                <ZipFormModal
                  coverageType="ma"
                  title="Compare Medicare Advantage Plans"
                  subtitle="Enter your ZIP code to see plans available in your area."
                  triggerLabel="Enter ZIP Code"
                  triggerClassName="w-full bg-white text-teal-700 font-semibold text-sm py-2 rounded-lg hover:bg-teal-50 transition-colors"
                  pageSection="ma-plans-sidebar"
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* What Are Medicare Advantage Plans? */}
            <section id="what-are" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">What Are Medicare Advantage Plans?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Medicare Advantage plans are private health insurance plans approved by Medicare that provide all the benefits of{" "}
                <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link>{" "}
                (Parts A and B) plus additional coverage in a single plan. Also known as Medicare Part C, these plans are offered by private insurance companies like Humana, Anthem, and UnitedHealthcare.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike Original Medicare, which allows you to see any doctor who accepts Medicare, Medicare Advantage plans typically use provider networks. This means you&apos;ll generally pay less when you see doctors and visit hospitals within your plan&apos;s network. Most plans also include prescription drug coverage (Medicare Part D) and extra benefits like dental, vision, hearing aids, and wellness programs that Original Medicare doesn&apos;t cover.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The key difference is that with Medicare Advantage, you&apos;re getting your Medicare benefits through a private insurer rather than directly from the federal government. These companies receive payments from Medicare to provide your coverage and often add extra benefits to attract members. For a comprehensive overview of how these plans work, see our detailed guide on{" "}
                <Link href="/medicare-part-c/medicare-advantage-plans" className="text-teal-700 underline hover:text-teal-900">Medicare Part C (Medicare Advantage)</Link>.
              </p>
            </section>

            {/* What Do Medicare Advantage Plans Cover? */}
            <section id="coverage" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">What Do Medicare Advantage Plans Cover?</h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                All Medicare Advantage plans must cover everything that Original Medicare covers. Beyond the required benefits, most plans include valuable extras:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#1a2b4a] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-600" /> Required Benefits
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Hospital stays (Part A)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Doctor visits &amp; outpatient services (Part B)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Preventive care (annual wellness visits, screenings)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" /> Emergency &amp; urgent care (nationwide)</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#1a2b4a] mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" /> Common Extras
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><Pill className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Prescription drug coverage (96% of plans)</li>
                    <li className="flex items-start gap-2"><Eye className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Dental, vision &amp; hearing coverage</li>
                    <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> Fitness memberships &amp; wellness programs</li>
                    <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> OTC allowances, telehealth, transportation</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Some plans offer special benefits like the{" "}
                <Link href="/medicare-part-c/medicare-advantage-give-back-benefit" className="text-teal-700 underline hover:text-teal-900">Give Back Benefit</Link>{" "}
                that reduces your Medicare Part B premium, or grocery allowances for members with chronic conditions. Benefits vary significantly between plans, so it&apos;s important to compare what&apos;s included in plans available in your area.
              </p>
            </section>

            {/* Types of Medicare Advantage Plans */}
            <section id="types" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Types of Medicare Advantage Plans</h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                There are several types of Medicare Advantage plans, each with different rules for accessing care:
              </p>
              <div className="space-y-3">
                {[
                  { name: "HMO", full: "Health Maintenance Organization", desc: "You must choose a primary care doctor and get referrals to see specialists. Lowest costs but least flexibility.", icon: Users },
                  { name: "PPO", full: "Preferred Provider Organization", desc: "You can see any provider but pay less for in-network care. No referrals needed for specialists.", icon: Stethoscope },
                  { name: "PFFS", full: "Private Fee-for-Service", desc: "The plan sets payment rates for providers. You can see any doctor who accepts the plan's terms.", icon: DollarSign },
                  { name: "SNP", full: "Special Needs Plans", desc: "Designed for people with chronic conditions, institutional care needs, or dual Medicare/Medicaid eligibility.", icon: Heart },
                ].map((plan) => (
                  <div key={plan.name} className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                      <plan.icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a2b4a]">{plan.name} <span className="font-normal text-gray-500 text-sm">— {plan.full}</span></p>
                      <p className="text-gray-600 text-sm mt-0.5">{plan.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 text-sm mt-4">
                For detailed information about each plan type and which might work best for your situation, visit our{" "}
                <Link href="/medicare-part-c/medicare-advantage-plan-types" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage plan types guide</Link>.
              </p>
            </section>

            {/* How Much Do Medicare Advantage Plans Cost? */}
            <section id="costs" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">How Much Do Medicare Advantage Plans Cost?</h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Medicare Advantage plans often have attractive pricing, but costs come in several forms:
              </p>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-5">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Cost Type</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Typical Amount (2026)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-4 py-3 text-gray-700">Monthly Premium</td><td className="px-4 py-3 text-gray-700">$0 for most plans (85%+)</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Part B Premium (required)</td><td className="px-4 py-3 text-gray-700">$185/month</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Primary Care Visit</td><td className="px-4 py-3 text-gray-700">$0–$25 copay</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Specialist Visit</td><td className="px-4 py-3 text-gray-700">$35–$50 copay</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Hospital Stay</td><td className="px-4 py-3 text-gray-700">$200–$400/day (first few days)</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Out-of-Pocket Maximum</td><td className="px-4 py-3 text-gray-700">$8,850 or less</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                While the $0 premium is appealing, your total costs depend on how much care you use. Compare the total estimated costs, not just premiums. For a detailed cost breakdown, see our{" "}
                <Link href="/medicare-part-c/medicare-advantage-costs" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage costs guide</Link>.
              </p>
            </section>

            {/* Pros and Cons */}
            <section id="pros-cons" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Pros and Cons of Medicare Advantage</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Advantages
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Lower monthly premiums (often $0)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Annual out-of-pocket maximum provides cost protection</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Extra benefits like dental, vision, drugs included</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Coordinated care through provider networks</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Many plans offer additional perks and wellness programs</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> Disadvantages
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Limited to provider networks (except emergencies)</li>
                    <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> May need referrals to see specialists</li>
                    <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Plan networks and benefits can change annually</li>
                    <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Less flexibility than Original Medicare + <Link href="/medicare-supplements" className="text-teal-700 underline hover:text-teal-900">Medigap</Link></li>
                    <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Prior authorization may be required for some services</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-800">Bottom Line:</strong> Medicare Advantage works best for people who want predictable costs, don&apos;t mind using provider networks, and value the extra benefits. Those who want maximum flexibility to see any Medicare provider might prefer{" "}
                  <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> with a supplement plan.
                </p>
              </div>
            </section>

            {/* How to Enroll */}
            <section id="enrollment" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">How to Enroll in a Medicare Advantage Plan</h2>
              <p className="text-gray-700 leading-relaxed mb-5">You can enroll in Medicare Advantage during these periods:</p>
              <div className="space-y-3 mb-5">
                {[
                  { period: "Annual Open Enrollment", dates: "October 15 – December 7", desc: "Change plans or switch between Medicare Advantage and Original Medicare for coverage starting January 1.", icon: Clock },
                  { period: "Initial Enrollment", dates: "Around your 65th birthday", desc: "When you first become eligible for Medicare (typically at age 65).", icon: Star },
                  { period: "Special Enrollment Periods", dates: "Varies", desc: "If you move, lose employer coverage, or qualify for extra help with costs.", icon: Shield },
                ].map((item) => (
                  <div key={item.period} className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a2b4a]">{item.period} <span className="text-sm font-normal text-teal-600">({item.dates})</span></p>
                      <p className="text-gray-600 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-[#1a2b4a] mb-3">Enrollment Steps:</h3>
                <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                  <li>Check which plans are available in your ZIP code</li>
                  <li>Compare benefits, costs, and provider networks</li>
                  <li>Enroll online at Medicare.gov, by phone, or through the insurance company</li>
                  <li>Receive your new member materials before coverage begins</li>
                </ol>
              </div>
              <p className="text-gray-700 text-sm mt-4">
                Learn more about specific enrollment windows and rules in our{" "}
                <Link href="/medicare-part-c/medicare-advantage-enrollment-periods" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage enrollment periods guide</Link>.
              </p>
            </section>

            {/* Medicare Advantage vs. Original Medicare */}
            <section id="comparison" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Medicare Advantage vs. Original Medicare</h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-5">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Feature</th>
                      <th className="text-left px-4 py-3 font-semibold text-teal-700">Medicare Advantage</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-700">Original Medicare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="px-4 py-3 text-gray-700 font-medium">Administered by</td><td className="px-4 py-3 text-gray-700">Private insurers</td><td className="px-4 py-3 text-gray-700">Federal government</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700 font-medium">Provider choice</td><td className="px-4 py-3 text-gray-700">Network-based</td><td className="px-4 py-3 text-gray-700">Any Medicare provider</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700 font-medium">Out-of-pocket limit</td><td className="px-4 py-3 text-gray-700">Yes ($8,850 max in 2026)</td><td className="px-4 py-3 text-gray-700">No limit without Medigap</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700 font-medium">Drug coverage</td><td className="px-4 py-3 text-gray-700">Usually included</td><td className="px-4 py-3 text-gray-700">Separate Part D plan needed</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700 font-medium">Dental/vision/hearing</td><td className="px-4 py-3 text-gray-700">Often included</td><td className="px-4 py-3 text-gray-700">Not covered</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700 font-medium">Monthly premium</td><td className="px-4 py-3 text-gray-700">Often $0 (+ Part B)</td><td className="px-4 py-3 text-gray-700">Part B only (+ Medigap optional)</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="font-bold text-teal-800 text-sm mb-1">Choose Medicare Advantage if you:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Want lower premiums and extra benefits</li>
                    <li>• Don&apos;t mind network restrictions</li>
                    <li>• Want cost predictability with an out-of-pocket cap</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-bold text-blue-800 text-sm mb-1">Choose Original Medicare if you:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Want maximum flexibility to see any provider</li>
                    <li>• Travel frequently or live in multiple states</li>
                    <li>• Are willing to pay for <Link href="/medicare-supplements" className="text-teal-700 underline hover:text-teal-900">Medigap</Link></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a2b4a] mb-5">Frequently Asked Questions</h2>
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
              <h2 className="text-2xl font-bold mb-3">Ready to Compare Medicare Advantage Plans?</h2>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                Our licensed agents can help you find the best Medicare Advantage plan for your needs and budget. No obligation, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <ZipFormModal
                  coverageType="ma"
                  title="Compare Medicare Advantage Plans"
                  subtitle="Enter your ZIP code to see plans available in your area."
                  triggerLabel="Compare Plans"
                  triggerClassName="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  pageSection="ma-plans-cta"
                />
                <a
                  href="tel:+18008452484"
                  onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "ma-plans-cta" })}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4" /> (800) 845-2484
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
