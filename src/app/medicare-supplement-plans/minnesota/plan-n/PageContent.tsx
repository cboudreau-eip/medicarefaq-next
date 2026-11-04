"use client";
/**
 * Minnesota Plan N Rate Comparison Page
 * Route: /medicare-supplement-plans/minnesota/plan-n/
 * Template for state-specific Plan N pages — data-driven, reusable pattern.
 */
import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  ChevronDown,
  ChevronUp,
  Phone,
  ArrowRight,
  CheckCircle2,
  XCircle,
  DollarSign,
  Users,
  TrendingDown,
  Award,
  Info,
  MapPin,
  Calendar,
  HelpCircle,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

// Minnesota data rendered through the Minnesota Plan N page structure.
const STATE_NAME = "Minnesota";
const FAQS = [
 {q:"Is Plan N available in Minnesota?",a:"Yes. Minnesota standardizes Medigap differently from most states, but a Minnesota version of Plan N is available. Insurers may call it the plan with $20 and $50 copayments."},
 {q:"What is the cheapest Plan N in Minnesota?",a:"There is no single lowest premium for every applicant. Compare current quotes for your ZIP code, tobacco status, enrollment eligibility, and effective date. The published rate example on this page is not a statewide lowest-rate claim."},
 {q:"What costs do I pay with Plan N?",a:"You pay the Part B deductible, up to $20 for applicable office visits, and up to $50 for emergency-room visits that do not result in inpatient admission. Part B excess charges and services excluded by the policy remain your responsibility."},
 {q:"Can I switch an existing Medigap policy without health questions?",a:"Minnesota’s new annual protection for ages 65–70 applies to first-time Medigap buyers, not automatically to people switching existing policies. Unless another guaranteed-issue right applies, medical underwriting may be required."},
 {q:"Does Plan N include prescription drug coverage?",a:"Medigap is separate from Part D prescription drug insurance. Review your drug coverage when moving to Original Medicare and a supplement, and coordinate effective dates before canceling existing coverage."},
 {q:"Can I use Plan N outside Minnesota?",a:"A regular Medigap policy supplements Original Medicare. Confirm that your doctor accepts Medicare and is willing to see you. Medicare SELECT policies can have provider restrictions, so check the policy before enrolling."},
];
const PLAN_N_BENEFITS = [
 {benefit:"Part A hospital coinsurance and additional hospital days, within policy limits",covered:true},
 {benefit:"Part B coinsurance, except applicable office and ER copayments",covered:true},
 {benefit:"Part A hospice care coinsurance or copayment",covered:true},
 {benefit:"Part A hospital deductible",covered:true},
 {benefit:"Annual Part B deductible",covered:false},
 {benefit:"Part B excess charges",covered:false},
 {benefit:"Blood (first 3 pints)",covered:true},
 {benefit:"Skilled nursing facility coinsurance for qualifying care",covered:true},
 {benefit:"Foreign travel emergency (80%, subject to deductible and policy limits)",covered:true},
];
const PLAN_COMPARISON = [
 {feature:"Plan structure",basic:"Basic benefits with optional riders",planN:"Minnesota $20/$50 copayment plan"},
 {feature:"Part A deductible",basic:"Optional rider",planN:"Covered"},
 {feature:"Part B coinsurance",basic:"Covered",planN:"Covered except applicable copayments"},
 {feature:"Office / ER copayments",basic:"No Plan N-style copayments",planN:"Up to $20 / $50"},
 {feature:"Part B deductible",basic:"Rider restricted to people Medicare-eligible before 2020",planN:"Not covered"},
 {feature:"Part B excess charges",basic:"Optional rider",planN:"Not covered"},
];
const RATE_EXAMPLES = [
 {type:"Standard",premium:"$209.70",note:"Published base premium"},
 {type:"Tobacco",premium:"$241.20",note:"Published tobacco premium"},
];
const SOURCE = "https://www.healthpartners.com/content/dam/plan/d2c/aep/plan-year-2027/outline-of-coverage-plan-with-20-50-copay-plan-n-outline-of-coverage.pdf";
const COMMERCE = "https://mn.gov/commerce/insurance/health/medicare/";
const BULLETIN = "https://mn.gov/commerce-stat/insurance/industry/bulletins/2026/administrative_bulletin_2026-3.pdf";

export default function MinnesotaPlanNContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* ─── SECTION 1: Hero ─── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-blue-200 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-blue-400">&gt;</span>
            <Link href="/medicare-supplement-plans" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <span className="text-blue-400">&gt;</span>
            <Link href="/medicare-supplement-plans/minnesota" className="hover:text-white transition-colors">{STATE_NAME}</Link>
            <span className="text-blue-400">&gt;</span>
            <span className="text-teal-400">Plan N</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-teal-400" aria-hidden="true" />
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Minnesota Plan N
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Compare Medicare Supplement{" "}
            <span className="text-teal-400">Plan N</span> Rates in{" "}
            <span className="text-teal-400">{STATE_NAME}</span>{" "}
            <span className="text-blue-300">(2026–2027)</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl">
            Compare Minnesota’s plan with $20 and $50 copayments. Review premiums, coverage, and enrollment protections before choosing a policy.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm text-blue-200">Office Copay</p>
              <p className="text-2xl md:text-3xl font-bold text-teal-400">Up to $20</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm text-blue-200">ER Copay</p>
              <p className="text-2xl md:text-3xl font-bold text-white">Up to $50</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm text-blue-200">Medigap Plan</p>
              <p className="text-2xl md:text-3xl font-bold text-white">N</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <ZipFormModal
              coverageType="ms"
              pageSection="minnesota_plan_n_hero"
              triggerId="mn-plan-n-hero-compare"
              buttonLabel={`Compare ${STATE_NAME} Plan N Rates`}
              title={`Compare Plan N Rates in ${STATE_NAME}`}
              subtitle="Enter your ZIP code to see personalized Plan N rates from top carriers in your area."
              trigger={
                <span className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors cursor-pointer shadow-lg shadow-teal-500/25">
                  Compare {STATE_NAME} Plan N Rates <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
              }
            />
            <a
              href="tel:+18883358996"  data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "minnesota_plan_n_hero" })}
              className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-4 rounded-xl text-lg transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: What Plan N Covers ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What Does Plan N Cover?</h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Minnesota has its own Medigap standardization. Its Plan N version helps cover Original Medicare cost sharing, with a Part B deductible, applicable copayments, and other exclusions.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-[1fr_auto] divide-y divide-slate-100">
              <div className="col-span-2 grid grid-cols-[1fr_auto] bg-slate-800 text-white px-6 py-3 font-semibold text-sm">
                <span>Benefit</span>
                <span>Plan N</span>
              </div>
              {PLAN_N_BENEFITS.map((item, i) => (
                <div key={i} className="col-span-2 grid grid-cols-[1fr_auto] px-6 py-3.5 items-center hover:bg-slate-50 transition-colors">
                  <span className="text-sm text-slate-700">{item.benefit}</span>
                  <span className="flex items-center justify-center">
                    {item.covered ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" aria-label="Covered" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" aria-label="Not covered" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout */}
          <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-5 flex gap-3">
            <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-teal-900">
              <strong>Know your share:</strong> You pay the Part B deductible and applicable copayments. The ER copayment is waived when you are admitted as an inpatient. Excess charges are not covered. See the <a href={SOURCE} className="underline">Minnesota Plan N outline of coverage</a> for benefits and limits.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Rate Comparison Table ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Plan N Rates in {STATE_NAME}: Published Example</h2>
          <p className="text-slate-600 mb-8">
            HealthPartners publishes the following Minnesota Plan N base premiums for January 1–December 31, 2027. This is one carrier example, not a market ranking or a personalized quote.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-800 text-white">
                {['Carrier','Rate category','Plan N Monthly','Basis'].map(label=><th scope="col" key={label} className="text-left px-5 py-3.5 font-semibold">{label}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-slate-100">{RATE_EXAMPLES.map(row=><tr key={row.type} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-semibold text-slate-900">HealthPartners</td><td className="px-5 py-4 text-slate-600">{row.type}</td><td className="px-5 py-4"><span className="font-bold text-lg text-teal-700">{row.premium}</span><span className="text-slate-500 text-xs">/mo</span></td><td className="px-5 py-4 text-slate-600">{row.note}</td>
              </tr>)}</tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Source: <a href={SOURCE} className="underline">HealthPartners 2027 outline of coverage</a>. Enrollment surcharges can apply; these are base rates. Confirm your eligibility, effective date, and final premium with the insurer.
          </p>
        </div>
      </section>

      {/* ─── MID-ARTICLE CTA ─── */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <ZipFormModal
           coverageType="ms"
              pageSection="minnesota_plan_n_mid"
           triggerId="mn-plan-n-mid-compare"
           buttonLabel="Compare Plan N Rates"
           title={`Compare Plan N Rates in ${STATE_NAME}`}
           subtitle="Enter your ZIP code to see personalized Plan N rates from top carriers in your area."
            trigger={
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-10 text-center cursor-pointer hover:shadow-xl transition-shadow group border-l-4 border-teal-500">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  See Plan N Rates in Your ZIP Code
                </h3>
                <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                  Enter your ZIP code to start comparing Plan N options in {STATE_NAME}. Confirm your premium and enrollment eligibility with a licensed agent.
                </p>
                <span className="inline-flex items-center gap-2 bg-teal-500 group-hover:bg-teal-400 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-lg shadow-teal-500/25">
                  Compare Plan N Rates <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
            }
          />
        </div>
      </section>

      {/* ─── SECTION 4: How to Choose the Cheapest Plan N ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Find the Cheapest Plan N in {STATE_NAME}</h2>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Compare the Minnesota policy benefits, total annual costs, premium history, and any applicable discounts. Ask for quotes with the same effective date and verify whether an enrollment surcharge is included.
            </p>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-teal-600" aria-hidden="true" />
                Pricing Methods in {STATE_NAME}
              </h3>
              <p className="mb-4">
                Review the insurer’s Minnesota rating rules and your final quoted premium. Your enrollment pathway, tobacco status, and geographic area can affect what you pay.
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Ask whether your quote includes all applicable surcharges</li>
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Ask about previous rate changes and future renewal pricing</li>
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Compare total annual costs, including your expected copayments</li>
                <li className="flex gap-2"><span className="text-teal-600 font-bold">-</span> Do not assume the lowest starting premium stays lowest</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-teal-600" aria-hidden="true" />
                Discounts That Lower Your Premium
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Household discount:</strong> Ask whether the insurer offers a household discount in Minnesota and who must qualify.
                  </div>
                </div>
                <div className="flex gap-3">
                  <DollarSign className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Payment mode discount:</strong> Ask whether payment frequency or automatic payments change your quoted premium.
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Loyalty discount:</strong> Ask whether any available discount expires or changes at renewal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Plan N vs Plan N ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Plan N vs. Basic in {STATE_NAME}: Compare Benefits</h2>
          <p className="text-slate-600 mb-8">
            Minnesota Basic can be customized with riders. Compare its complete benefits and rider costs with the $20/$50 copayment plan using the actual outlines of coverage.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Feature</th>
                  <th className="text-left px-5 py-3.5 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-teal-400" aria-hidden="true" /> Basic
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-blue-400" aria-hidden="true" /> Plan N
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PLAN_COMPARISON.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-700">{row.feature}</td>
                    <td className="px-5 py-3.5 text-slate-900">{row.basic}</td>
                    <td className="px-5 py-3.5 text-slate-900">{row.planN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-blue-900">
              <strong>Compare the full policy:</strong> Include any Basic riders in the premium comparison. Plan N’s copayments may change your total cost depending on how you use care. The <a href={SOURCE} className="underline">carrier’s benefit comparison</a> lists the differences; confirm the policy available to you.
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Minnesota-Specific Rules ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{STATE_NAME} Medigap Rules You Need to Know</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">Initial Enrollment Protection</h3>
              </div>
              <p className="text-sm text-slate-700">
                Minnesota’s initial protection lasts six months beginning with your first month of Part B, including for people under 65. Confirm your personal dates before applying.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">First-Time Buyer Protection</h3>
              </div>
              <p className="text-sm text-slate-700">
                Ages 65–70 buying Medigap for the first time may qualify for the new annual guaranteed-issue protection. Fall applications run October 15–December 7 for January 1 coverage. Confirm eligibility for the January–March window.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">Enrollment Surcharges</h3>
              </div>
              <p className="text-sm text-slate-700">
                Outside initial Part B enrollment, the new first-time buyer pathway carries a lifetime surcharge: 15% for enrollment in 2026 or 20% in 2027. Fall 2026 enrollment for January 2027 coverage uses 15%.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-teal-600" aria-hidden="true" />
                <h3 className="font-bold text-slate-900">Switching an Existing Policy</h3>
              </div>
              <p className="text-sm text-slate-700">
                The new protection is for first-time Medigap buyers. Switching existing Medigap coverage generally requires underwriting unless another protection applies. Confirm which plans your specific guaranteed-issue right permits.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600">Sources: <a href={COMMERCE} className="underline">Minnesota Commerce</a> and <a href={BULLETIN} className="underline">Bulletin 2026-3</a>.</p>
        </div>
      </section>

      {/* ─── SECTION 7: How to Enroll ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">How to Enroll in Plan N in {STATE_NAME}</h2>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Confirm you have Medicare Part A and Part B",
                desc: "You must be enrolled in both Medicare Part A and Part B before you can purchase a Medigap plan. If you are turning 65, make sure your Part B enrollment is active.",
              },
              {
                step: 2,
                title: "Compare rates from multiple carriers",
                desc: `Compare current Minnesota quotes, discounts, and complete policy benefits. Use the same coverage date for each quote.`,
              },
              {
                step: 3,
                title: "Apply during your open enrollment period",
                desc: "Check your initial enrollment window or other guaranteed-issue protection. Confirm whether underwriting or an enrollment surcharge applies.",
              },
              {
                step: 4,
                title: "Coordinate your coverage dates",
                desc: "Confirm policy acceptance and the effective date before canceling existing coverage. Coordinate any Medicare Advantage disenrollment and separate Part D enrollment.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-10">
            <ZipFormModal
             coverageType="ms"
              pageSection="minnesota_plan_n_enroll"
             triggerId="mn-plan-n-enroll-compare"
             buttonLabel="Compare Plan N Rates"
             title={`Compare Plan N Rates in ${STATE_NAME}`}
             subtitle="Enter your ZIP code to see personalized Plan N rates from top carriers in your area."
              trigger={
                <span className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3.5 rounded-xl transition-colors cursor-pointer">
                  Compare Plan N Rates in {STATE_NAME} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQs ─── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions: Plan N in {STATE_NAME}
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: Bottom CTA ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <ZipFormModal
           coverageType="ms"
              pageSection="minnesota_plan_n_bottom"
           triggerId="mn-plan-n-bottom-compare"
           buttonLabel="Compare Plan N Rates"
           title={`Compare Plan N Rates in ${STATE_NAME}`}
           subtitle="Enter your ZIP code to see personalized Plan N rates from top carriers in your area."
            trigger={
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-10 md:p-14 text-center cursor-pointer hover:shadow-2xl transition-shadow group border-l-4 border-teal-500">
                <Shield className="w-12 h-12 text-teal-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Compare Plan N Options in Your Area
                </h3>
                <p className="text-blue-200 mb-8 max-w-xl mx-auto">
                  Compare your available Minnesota Plan N options, review the final premium, and confirm your enrollment rights before making a choice.
                </p>
                <span className="inline-flex items-center gap-2 bg-teal-500 group-hover:bg-teal-400 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-teal-500/25">
                  Compare Plan N Rates <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
                <p className="text-blue-300 text-sm mt-4">
                  Or call{" "}
                  <a
                    href="tel:+18883358996"  data-invoca-phone-number="18883358996"
                    onClick={(e) => { e.stopPropagation(); trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "minnesota_plan_n_bottom" }); }}
                    className="invoca-phone text-teal-400 hover:text-teal-300 font-semibold underline"
                  >
                    (888) 335-8996
                  </a>{" "}
                  to speak with a licensed agent
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* ─── SECTION 10: Related Pages ─── */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/medicare-supplement-plans/minnesota" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> All {STATE_NAME} Medigap Plans
            </Link>
            <Link href="/medicare-supplement-plans/plan-n" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Plan N National Overview
            </Link>
            <Link href="/medicare-supplement-plans/medigap-eligibility" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Medigap Eligibility Guide
            </Link>
            <Link href="/medicare-supplement-plans/compare/" className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Compare Medigap Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
