import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Layers, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ZipFormModal from "@/components/ZipFormModal";

const url = "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/plan-n/";
const title = "Medicare Supplement Plan N in Minnesota: Costs & Coverage";
const description = "Learn how Minnesota Plan N works, what the $20 and $50 copayments mean, and how to compare premiums and enrollment options for 2026–2027.";
const sources = {
  medicare: "https://www.medicare.gov/health-drug-plans/medigap/basics/compare-plan-benefits/minnesota",
  commerce: "https://mn.gov/commerce/insurance/health/medicare/",
  bulletin: "https://mn.gov/commerce-stat/insurance/industry/bulletins/2026/administrative_bulletin_2026-3.pdf",
  carrier: "https://www.healthpartners.com/insurance/medicare/minnesota/medicare-supplement-medigap/plan-n/",
  outline: "https://www.healthpartners.com/content/dam/plan/d2c/aep/plan-year-2027/outline-of-coverage-plan-with-20-50-copay-plan-n-outline-of-coverage.pdf",
};
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", siteName: "MedicareFAQ" },
};
const benefits = [
  ["Part A hospital deductible and coinsurance", "Covered, subject to policy benefits and limits"],
  ["Part B coinsurance", "Covered except for applicable office and emergency-room copayments"],
  ["Office visits", "Up to $20 per applicable visit after the Part B deductible"],
  ["Emergency-room visits", "Up to $50; waived if admitted as an inpatient"],
  ["Annual Part B deductible", "You pay"],
  ["Part B excess charges", "Not covered"],
  ["Skilled nursing facility coinsurance", "Covered for qualifying care; this is not long-term custodial care coverage"],
  ["Foreign travel emergency care", "80% of eligible costs, subject to deductible and policy limits"],
];
const faqs = [
  { question: "Is Plan N available in Minnesota?", answer: "Yes. Medicare.gov confirms that Minnesota versions of Plan N are available. An insurer may describe this option as a Medicare Supplement plan with $20 and $50 copayments. Ask for the Minnesota outline of coverage when comparing policies." },
  { question: "Does Minnesota Plan N cover the Part B deductible?", answer: "No. You pay the annual Medicare Part B deductible as well as applicable Plan N copayments. Part B excess charges are also excluded. Use the deductible for your coverage year when estimating expenses." },
  { question: "Can I see doctors outside Minnesota?", answer: "A regular Medigap policy works with Original Medicare. Confirm that a provider accepts Medicare and will see you. If considering a Medicare SELECT policy, check its provider restrictions before enrolling." },
  { question: "Is Plan N always the cheapest Minnesota Medigap option?", answer: "No. Compare current quotes for your circumstances and requested effective date. Include copayments, deductibles, any applicable surcharge, and available discounts in your comparison. A lower premium does not automatically mean a lower total annual cost." },
];
function QuoteButton({ section }: { section: string }) {
  return <ZipFormModal coverageType="ms" pageSection={`mn_plan_n_${section}`} triggerId={`mn-plan-n-${section}`} title="Compare Minnesota Medicare Supplement Options" subtitle="Enter your ZIP code to start comparing Medicare Supplement options in your area." trigger={<button id={`mn-plan-n-${section}`} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600">Compare My Options <ArrowRight className="w-4 h-4" aria-hidden="true" /></button>} />;
}

export default function MinnesotaPlanNPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, description, url, datePublished: "2026-11-04", dateModified: "2026-11-04", author: { "@type": "Organization", name: "MedicareFAQ" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Minnesota Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/" },
      { "@type": "ListItem", position: 3, name: "Minnesota Plan N", item: url },
    ] },
  ];
  return <SiteLayout>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="min-h-screen bg-white">
      <header className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link href="/medicare-supplement-plans/" className="hover:text-white transition-colors">Medicare Supplement</Link><ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link href="/medicare-supplement-plans/minnesota/" className="hover:text-white transition-colors">Minnesota</Link><ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" /><span className="text-teal-400">Plan N</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center"><span className="text-2xl font-black text-white">MN</span></div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">Reviewed November 2026</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200">Minnesota Plan N</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-purple-100 text-purple-800 border-purple-200">$20 / $50 Copayments</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>Medicare Supplement Plan N in Minnesota</h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">Understand the plan with $20 and $50 copayments, compare your costs, and check your enrollment options before choosing coverage.</p>
          <p className="mb-8 text-sm text-slate-300">By MedicareFAQ · Reviewed November 4, 2026</p>
          <QuoteButton section="hero" />
        </div>
      </header>
      <div className="text-slate-700 leading-relaxed [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-6 [&_h3]:font-bold [&_h3]:text-slate-900 [&_p]:mb-4 [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2">
        <aside className="bg-blue-50 border-b border-blue-200" aria-label="Quick answer"><div className="container py-5"><div className="flex items-start gap-4 max-w-4xl"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><Layers className="w-5 h-5 text-blue-700" aria-hidden="true" /></div><div className="text-sm text-blue-800 [&_p]:mb-2">
          <h2 className="!text-base !text-blue-900 !mb-1">Does Minnesota have Plan N?</h2>
          <p>Yes. Minnesota standardizes Medigap differently from most states, but a Minnesota version of Plan N is available alongside Basic and Extended Basic coverage. You may see it called the <strong>plan with $20 and $50 copayments</strong>. Compare the Minnesota policy documents rather than assuming every benefit matches another state’s plan.</p>
          <a href={sources.medicare}>Medicare.gov: Medigap in Minnesota</a>
        </div></div></div></aside>
        <section className="py-12"><div className="container max-w-4xl">
          <h2 style={{ fontFamily: "'Merriweather', serif" }}>What does Minnesota Plan N cover?</h2>
          <p>Plan N supplements Original Medicare. The table below summarizes key features in the HealthPartners Minnesota Plan N outline of coverage. Review the actual policy for complete benefits, exclusions, and limits.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Minnesota Plan N coverage and member costs</caption>
              <thead className="bg-blue-900 text-white"><tr><th scope="col" className="px-5 py-3">Benefit or expense</th><th scope="col" className="px-5 py-3">How Plan N handles it</th></tr></thead>
              <tbody>{benefits.map(([benefit, coverage]) => <tr key={benefit} className="border-t border-slate-200 odd:bg-slate-50"><th scope="row" className="px-5 py-3 font-medium text-slate-900 w-2/5">{benefit}</th><td className="px-5 py-3">{coverage}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">Source: <a href={sources.outline}>HealthPartners Minnesota Plan N outline of coverage (PDF)</a>.</p>
          <p>HealthPartners describes its Plan N as available statewide, with access to U.S. doctors who accept Medicare and are willing to see you. Confirm provider arrangements when comparing policies. <a href={sources.carrier}>Read the carrier’s plan description</a>.</p>
        </div></section>
        <section className="py-12 bg-slate-50"><div className="container max-w-4xl">
          <h2 style={{ fontFamily: "'Merriweather', serif" }}>How much does Plan N cost in Minnesota?</h2>
          <p>There is no single statewide price that applies to everyone. Request a current premium for your ZIP code, tobacco status, eligibility, and intended coverage date. Confirm whether the quote includes any required enrollment surcharge and whether discounts apply.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[["Monthly budget", "Add the Medigap premium to your Medicare premiums and any separate prescription drug plan premium."], ["Care costs", "Budget for the Part B deductible, applicable copayments, and expenses the policy excludes."], ["Future costs", "Ask about premium changes and discount conditions. Today’s quote is not a promise of future rates."]].map(([heading, text]) => <div key={heading} className="rounded-xl bg-slate-50 border border-slate-200 p-5"><h3 className="mb-2">{heading}</h3><p className="text-sm">{text}</p></div>)}
          </div>
          <p className="mt-4">For a useful comparison, request quotes for the same effective date and compare Plan N with Minnesota Basic coverage, including any riders, and Extended Basic. Our <Link href="/medicare-supplement-plans/minnesota/">Minnesota Medigap overview</Link> explains the state’s broader plan choices.</p>
        </div></section>
        <section className="py-12"><div className="container max-w-4xl">
          <h2 style={{ fontFamily: "'Merriweather', serif" }}>When can you enroll in Minnesota Plan N?</h2>
          <p>Minnesota’s initial Medigap enrollment protection lasts six months beginning with the first month you are enrolled in Part B, including for people under 65. Verify the start and end dates of your personal window. <a href={sources.commerce}>Minnesota Commerce explains enrollment protections</a>.</p>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="mb-3">New protection for certain first-time Medigap buyers</h3>
            <p>Minnesota’s new annual guaranteed-issue protection applies to people ages <strong>65–70 buying Medigap for the first time</strong>. Applications from October 15–December 7 take effect January 1. A January 1–March 31 window has coverage beginning the next month; confirm eligibility for that window.</p>
            <p>Outside initial Part B enrollment, this pathway carries a lifetime premium surcharge: <strong>15% for enrollment in 2026 or 20% for enrollment in 2027</strong>. Fall 2026 enrollment for January 2027 coverage uses 15%.</p>
            <p>This is not a blanket right to switch an existing Medigap policy without health questions. Other guaranteed-issue rights may apply; otherwise, underwriting may be required.</p>
            <a className="text-sm" href={sources.bulletin}>Minnesota Commerce Bulletin 2026-3 (PDF)</a>
          </div>
        </div></section>
        <section className="py-12"><div className="container max-w-4xl">
          <h2 style={{ fontFamily: "'Merriweather', serif" }}>Before you choose a policy</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Request the Minnesota outline of coverage and confirm that the quote is for the $20/$50 copayment plan.</li>
            <li>Compare annual premiums plus likely care costs, not just the monthly price.</li>
            <li>Check your prescription coverage separately. Medigap supplements Original Medicare; it is different from Medicare Advantage.</li>
            <li>Confirm acceptance and the effective date before canceling existing coverage. Coordinate any Medicare Advantage disenrollment and drug plan enrollment.</li>
          </ul>
          <p className="mt-4 text-sm">For independent state guidance, visit <a href={sources.commerce}>Minnesota Commerce’s Medicare insurance resources</a>.</p>
        </div></section>
        <section className="py-12 bg-slate-50"><div className="container max-w-4xl">
          <h2 style={{ fontFamily: "'Merriweather', serif" }}>Frequently asked questions</h2>
          <div className="space-y-3">{faqs.map(faq => <details key={faq.question} className="group border border-slate-200 rounded-lg overflow-hidden"><summary className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden"><span className="font-semibold text-slate-900 text-sm pr-4">{faq.question}</span><ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></summary><div className="px-4 pb-4"><p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p></div></details>)}</div>
        </div></section>
        <section className="py-12"><div className="container max-w-4xl"><div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
          <h2 className="!text-white !mb-3" style={{ fontFamily: "'Merriweather', serif" }}>Compare Minnesota Medicare Supplement options</h2>
          <p className="text-slate-300 mb-6 max-w-2xl">Start with your ZIP code, then review premiums, benefits, and your enrollment situation with a licensed agent.</p>
          <QuoteButton section="bottom" />
        </div></div></section>
      </div>
    </article>
  </SiteLayout>;
}
