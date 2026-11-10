"use client";



import { EligibilityGuide, PracticalGuide } from "./GuideSections";
import Link from "next/link";
import {
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  Award,
  Building2,
  CheckCircle2,
  XCircle,
  Info,
  MapPin,
  Clock,
  AlertTriangle,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import EddieProTip from "@/components/EddieProTip";
import {
  CARRIERS,
  FAQS,
  STATE_RULES,
  PREMIUM_TABLE,
  type Carrier,
} from "@/lib/new-jersey-medigap-data";
import { trackPhoneClick } from "@/lib/analytics";

function CarrierCard({ carrier, rank }: { carrier: Carrier; rank: number }) {


  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all">
      <div className="bg-slate-50 px-5 py-2 border-b border-slate-200 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Compare coverage and costs
        </span>

      </div>

      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{carrier.name}</h3>

              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan G</p>
                <p className="text-sm font-bold text-slate-900">Request a quote</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Plan N</p>
                <p className="text-sm font-bold text-slate-900">Request a quote</p>
              </div>
              <div className="text-center p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-0.5">Availability</p>
                <p className="text-sm font-bold text-slate-900">Confirm by ZIP</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">Ask for current plan availability, premiums, discounts, and underwriting requirements for your ZIP code. Compare the same plan letter and effective date across insurers.</p>
          </div>

          <div className="flex flex-col gap-2 md:w-48 shrink-0">
            <ZipFormModal
              pageSection="new_jersey_carrier_card"
              triggerId={`new-jersey-carrier-${rank}`}
              coverageType="ms"
              title={`Compare ${carrier.name} Rates in New Jersey`}
              subtitle={`Enter your ZIP code to see personalized ${carrier.name} Medigap rates in your area of New Jersey.`}
              buttonLabel="Get a Quote"
              trigger={
                <button className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
                  Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"

              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "new_jersey_carrier_card",
                })
              }
              className="invoca-phone w-full inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-400 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> (888) 335-8996
            </a>
          </div>
        </div>


      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-slate-200 rounded-lg overflow-hidden">
      <summary className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-slate-900 text-sm pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-4 pb-4">
        <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

export default function NewJerseyPageContent() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link href="/medicare-supplement-plans" className="hover:text-white transition-colors">
              Medicare Supplement
            </Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-teal-400">New Jersey</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">NJ</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
              Updated November 2026
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Medicare Supplement (Medigap) Plans in New Jersey
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Understand your coverage choices, compare costs, and learn when you can enroll or switch Medigap policies in New Jersey.
          </p>

          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="new_jersey_hero"
              triggerId="new-jersey-hero-compare"
              coverageType="ms"
              title="Compare New Jersey Medigap Rates"
              subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of New Jersey."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare NJ Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"

              data-invoca-phone-number="18883358996"
              onClick={() =>
                trackPhoneClick({
                  phone_number: "(888) 335-8996",
                  page_section: "new_jersey_hero",
                })
              }
              className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      <section className="py-10"><div className="container max-w-4xl text-slate-700 leading-relaxed space-y-4"><p>Medigap helps pay some of the deductibles, coinsurance, and copayments left by Original Medicare. Choosing a policy means comparing both benefits and the rules that determine when an insurer must accept your application.</p><p>This guide walks through New Jersey’s enrollment protections and practical shopping steps, alongside the existing carrier comparisons. Medigap is different from Medicare Advantage and does not include prescription coverage in policies sold today.</p></div></section>
      <EligibilityGuide />

      {/* Carrier Cards Section */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Compare Medicare Supplement Carriers in New Jersey
          </h2>
          <p className="text-slate-600 mb-8">
            Use these carriers as a starting point for comparing policies. Availability and underwriting vary. Request a current quote rather than relying on a statewide starting price.
          </p>

          <div className="space-y-4">
            {CARRIERS.map((carrier, i) => (
              <CarrierCard key={carrier.rank} carrier={carrier} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Comparison Table */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Medicare Supplement Prices in New Jersey
          </h2>
          <p className="text-slate-600 mb-6">
            Premiums depend on the applicant, policy, location, effective date, and discounts. Compare personalized quotes using the same details for each insurer.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Insurance Company</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N Monthly</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan F Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {PREMIUM_TABLE.map((row, i) => (
                    <tr key={row.carrier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 font-medium text-slate-900">{row.carrier}</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">Request a quote</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">Request a quote</td>
                      <td className="px-5 py-3 text-center font-semibold text-slate-700">Check eligibility and quote</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Plan F is generally available only if you were first eligible for Medicare before January 1, 2020. Confirm each insurer’s current offerings.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <ZipFormModal
              pageSection="new_jersey_premium_table"
              triggerId="new-jersey-premium-table-cta"
              coverageType="ms"
              title="See Rates in Your New Jersey ZIP Code"
              subtitle="Premiums vary by city in New Jersey. Enter your ZIP code to see exact rates from all available carriers in your area."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  <MapPin className="w-4 h-4" aria-hidden="true" /> See Rates in Your ZIP Code
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* Plan G vs Plan N */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Plan G vs. Plan N in New Jersey
          </h2>
          <p className="text-slate-600 mb-6">
            Plan G and Plan N offer different balances of premiums and out-of-pocket costs.
            Here is how they compare on coverage and cost.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Coverage Feature</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan G</th>
                    <th className="text-center px-5 py-3 font-semibold">Plan N</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Part A hospital coinsurance",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Part B coinsurance (20%)",
                      g: { covered: true },
                      n: { covered: true, note: "*" },
                    },
                    {
                      feature: "Part A deductible ($1,736 in 2026)",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Part B deductible ($283 in 2026)",
                      g: { covered: false },
                      n: { covered: false },
                    },
                    {
                      feature: "Part B excess charges",
                      g: { covered: true },
                      n: { covered: false },
                    },
                    {
                      feature: "Skilled nursing coinsurance",
                      g: { covered: true },
                      n: { covered: true },
                    },
                    {
                      feature: "Foreign travel emergency (subject to policy limits)",
                      g: { text: "80% after deductible" },
                      n: { text: "80% after deductible" },
                    },
                    {
                      feature: "Office visit copay",
                      g: { text: "$0" },
                      n: { text: "Up to $20" },
                    },
                    {
                      feature: "ER copay (no admission)",
                      g: { text: "$0" },
                      n: { text: "Up to $50" },
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3 text-slate-700">{row.feature}</td>
                      <td className="px-5 py-3 text-center">
                        {"text" in row.g && row.g.text ? (
                          <span className={`${"bold" in row.g && row.g.bold ? "font-bold" : "font-semibold"} text-slate-900`}>
                            {row.g.text}
                          </span>
                        ) : "covered" in row.g && row.g.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" aria-hidden="true" /> Covered
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" aria-hidden="true" /> Not covered
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {"text" in row.n && row.n.text ? (
                          <span
                            className={`${"bold" in row.n && row.n.bold ? "font-bold" : "font-semibold"} ${
                              row.n.text.startsWith("Up to") ? "text-amber-600" : "text-slate-900"
                            }`}
                          >
                            {row.n.text}
                          </span>
                        ) : "covered" in row.n && row.n.covered ? (
                          <span className="text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4 inline" aria-hidden="true" /> Covered
                            {"note" in row.n ? row.n.note : ""}
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            <XCircle className="w-4 h-4 inline" aria-hidden="true" /> Not covered
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                *Plan N covers Part B coinsurance but requires a copay of up to $20 at some doctor
                visits and up to $50 at emergency rooms (waived if admitted). Part B excess charges
                are not covered by Plan N, so choose providers who accept Medicare assignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eddie Pro Tip */}
      <section className="py-0 pb-2">
        <div className="container max-w-4xl">
          <EddieProTip
            tip={
              <>
                <strong>Check your enrollment rights before shopping on price.</strong>{" "} A lower quote does not guarantee acceptance. Confirm underwriting requirements and an approved start date before replacing your current policy.
              </>
            }
          />
        </div>
      </section>

      <PracticalGuide />

      {/* New Jersey-Specific Rules */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            New Jersey Medigap Rules You Should Know
          </h2>

          <div className="space-y-4">
            {STATE_RULES.map((rule, i) => {
              const icons = [Clock, AlertTriangle, Info, Shield, Award];
              const Icon = icons[i % icons.length];
              const borderColors = [
                "border-slate-200",
                "border-amber-200",
                "border-slate-200",
                "border-slate-200",
                "border-slate-200",
              ];
              const iconColors = [
                "text-blue-600",
                "text-amber-600",
                "text-blue-600",
                "text-blue-600",
                "text-blue-600",
              ];
              return (
                <div
                  key={i}
                  className={`p-5 bg-white border ${borderColors[i % borderColors.length]} rounded-xl flex items-start gap-3`}
                >
                  <Icon className={`w-5 h-5 ${iconColors[i % iconColors.length]} shrink-0 mt-0.5`} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{rule.title}</p>
                    <p className="text-sm text-slate-600">{rule.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-slate-50">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">
              Find the Best Medigap Rate in Your New Jersey ZIP Code
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Compare personalized quotes for your plan letter and ZIP code. Ask about enrollment protections, health questions, and discounts before choosing a policy.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                pageSection="new_jersey_bottom_cta"
                triggerId="new-jersey-bottom-cta-compare"
                coverageType="ms"
                title="Compare New Jersey Medigap Rates"
                subtitle="Enter your ZIP code to see personalized rates from top Medigap carriers in your area of New Jersey."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare NJ Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                }
              />
              <a
                href="tel:+18883358996"

                data-invoca-phone-number="18883358996"
                onClick={() =>
                  trackPhoneClick({
                    phone_number: "(888) 335-8996",
                    page_section: "new_jersey_bottom_cta",
                  })
                }
                className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
