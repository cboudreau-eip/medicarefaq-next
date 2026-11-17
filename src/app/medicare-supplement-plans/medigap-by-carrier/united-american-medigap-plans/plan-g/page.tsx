import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Shield, ArrowRight, Info } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ZipFormModal from "@/components/ZipFormModal";
import GuideCta from "@/components/GuideCta";

const parent = "/medicare-supplement-plans/medigap-by-carrier/united-american-medigap-plans/";
const path = `${parent}plan-g/`;
const canonical = `https://www.medicarefaq.com${path}`;
const title = "United American Plan G: Coverage, Costs & Enrollment";
const description = "Explore United American Plan G benefits, costs, discounts, high-deductible options, underwriting, and how to compare quotes or switch Medigap coverage.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: ["/images/medicarefaq-cover.jpg"] },
};

const sources = {
  carrier: "https://www2.unitedamerican.com/medicare-supplement-policies",
  productNotes: "https://www2.unitedamerican.com/about",
  productHub: "https://www2.unitedamerican.com/medicare-supplement-policies/texas",
  availability: "https://www2.unitedamerican.com/medicare-supplement-policies",
  benefits: "https://www.medicare.gov/health-drug-plans/medigap/basics/compare-plan-benefits",
  exclusions: "https://www.medicare.gov/health-drug-plans/medigap/basics/coverage",
  costs: "https://www.medicare.gov/health-drug-plans/medigap/basics/costs",
  enrollment: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when",
  switching: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/change-policies/switch-drop",
  deductible: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
  highDeductible: "https://www.cms.gov/medicare/health-drug-plans/medigap/f-g-j-deductible-announcements",
};

const faqs = [
  { q: "Is United American the same as UnitedHealthcare?", a: "No. United American Insurance Company is a Globe Life subsidiary. UnitedHealthcare is a different insurer associated with AARP-branded Medicare Supplement coverage. Check the legal insurer on your application; pricing, reviews, and discounts from one company do not apply to the other." },
  { q: "Is United American Plan G the same as Medicare Advantage?", a: "No. Plan G supplements Original Medicare. Medicare Advantage is a different type of coverage. Medigap does not pay Medicare Advantage copayments or deductibles." },
  { q: "Does United American Plan G have a household discount?", a: "Ask for the current state-specific rate sheet and written quote. Do not assume a household discount or percentage applies to every policy. Confirm eligibility, whether another household member needs coverage, and the premium if you stop qualifying." },
  { q: "Is United American Plan G better than another company's Plan G?", a: "The standardized core benefits are the same. Compare the actual premium, legal insurer, discounts, service, and rate history for your state and policy. Brand recognition alone does not establish better value." },
  { q: "Does United American Plan G cover dental, hearing aids, or prescriptions?", a: "These are not standard Plan G benefits. Review separate dental, vision, or hearing coverage if needed, and a Part D plan for outpatient prescriptions. Plan G can help with cost sharing for drugs covered by Medicare Part B." },
  { q: "Can I get United American Plan G if I have a health condition?", a: "During your federal Medigap Open Enrollment Period, an insurer cannot reject your application or charge more because of health. Outside a protected enrollment right, medical underwriting may affect acceptance or price. State rules may provide additional protections." },
  { q: "Does United American offer high-deductible Plan G everywhere?", a: "United American lists high-deductible G in its official Medicare Supplement materials. Confirm current availability for your state and ZIP code. Compare its deductible and annual premium with standard Plan G before applying." },
  { q: "Do I need to wait for fall enrollment to apply?", a: "You can apply for Medigap throughout the year. The October 15–December 7 Medicare enrollment period does not itself guarantee acceptance into Plan G. Your Medigap enrollment rights and any Medicare Advantage disenrollment window must be considered separately." },
  { q: "Can my premium increase after I buy Plan G?", a: "Yes. A policy being renewable does not freeze its premium. Ask how the policy is rated and request the rate-change history for the same legal insurer, state, and policy form." },
];

const sections = [
  ["coverage", "Coverage & exclusions"], ["cost", "Premiums & discounts"],
  ["compare", "G vs. N vs. high-deductible G"], ["doctors", "Doctors & claims"],
  ["enroll", "Eligibility & enrollment"], ["switch", "Switching safely"], ["faq", "FAQs"],
];

function Section({ id, title, shaded = false, children }: { id: string; title: string; shaded?: boolean; children: ReactNode }) {
  return <section id={id} className={`py-12 scroll-mt-48 ${shaded ? "bg-slate-50" : "bg-white"}`}><div className="max-w-4xl mx-auto px-4"><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">{title}</h2><div className="space-y-5 text-slate-600 leading-relaxed">{children}</div></div></section>;
}
function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="text-teal-700 underline underline-offset-2 hover:text-teal-900">{children}</a>;
}
function Table({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return <div>{headers.length > 2 && <p className="text-xs mb-2 sm:hidden">Swipe the table to compare all three options.</p>}<div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className={`w-full text-sm text-left ${headers.length > 2 ? "min-w-[600px]" : ""}`}><caption className="sr-only">{caption}</caption><thead className="bg-slate-800 text-white"><tr>{headers.map(h => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]} className="border-t border-slate-100 even:bg-slate-50"><th scope="row" className="px-4 py-3 font-medium text-slate-800">{row[0]}</th>{row.slice(1).map((cell, i) => <td key={i} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
function Quote({ label = "Compare Plan G Rates", id }: { label?: string; id: string }) {
  return <ZipFormModal coverageType="ms" trackingId={id} triggerLabel={label} triggerClassName="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 !text-white font-semibold px-6 py-3 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600" />;
}
function Tip({ children }: { children: ReactNode }) {
  return <aside className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-5 text-teal-950"><Info className="w-5 h-5 shrink-0 mt-1" aria-hidden="true" /><div>{children}</div></aside>;
}

export default function UnitedAmericanPlanGPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: canonical, datePublished: "2026-11-17", dateModified: "2026-11-17", author: { "@type": "Organization", name: "MedicareFAQ" }, publisher: { "@type": "Organization", name: "MedicareFAQ" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["Home", "/"], ["Medicare Supplement", "/medicare-supplement-plans/"], ["United American", parent], ["Plan G", path]].map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: `https://www.medicarefaq.com${url}` })) },
  ];
  return <SiteLayout><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><article className="bg-white">
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-blue-100 mb-7"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/medicare-supplement-plans/">Medicare Supplement</Link><span aria-hidden="true">›</span><Link href={parent}>United American</Link><span aria-hidden="true">›</span><span>Plan G</span></nav>
        <div className="flex items-center gap-3 mb-4"><Shield className="w-8 h-8 text-teal-300" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 px-3 py-1">Medicare Supplement Guide</span></div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl mb-5">United American Medicare Supplement <span className="text-teal-300">Plan G</span></h1>
        <p className="text-lg text-blue-100 max-w-3xl mb-6">Understand your benefits, compare the full cost, and check your enrollment rights before choosing United American Plan G.</p>
        <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mb-7">{[["Coverage", "Works with Original Medicare"], ["2026 Part B deductible", "$283 — you pay"], ["Your premium", "Personalized quote needed"]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/10 px-5 py-4"><p className="text-sm text-blue-100">{label}</p><p className="font-bold text-lg">{value}</p></div>)}</div>
        <Quote label="Compare United American Plan G Rates" id="united-american-plan-g-hero" />
        <p className="text-sm text-blue-100 mt-5">By MedicareFAQ · Updated November 17, 2026 · Availability varies by location</p>
      </div>
    </section>
    <div className="bg-slate-50 border-b border-slate-200"><nav aria-label="On this page" className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="text-blue-900 underline underline-offset-4">{label}</a>)}</nav></div>

    <Section id="overview" title="What is United American Plan G?">
      <p>United American Plan G is Medicare Supplement insurance, also called Medigap. It helps pay eligible expenses left after Original Medicare pays. It is not Medicare Advantage, and it does not replace your Medicare Part A and Part B coverage.</p>
      <p>The core benefits of standard Plan G are standardized. Choosing United American instead of another insurer does not give you a different set of standard Plan G medical benefits. The practical decision is whether the policy available to you offers a suitable price and service.</p>
      <p>United American Insurance Company is a wholly owned subsidiary of Globe Life Inc. Its <Source href={sources.productNotes}>company history</Source> dates its Medicare Supplement program to 1966. It is not UnitedHealthcare or the AARP Medicare Supplement program. Check the full legal insurer name and policy form on your application rather than relying on the word “United.”</p>
      <p>Check <Source href={sources.availability}>current state availability with United American</Source>. Its state selector and policy materials identify available options, but current acceptance of new applications must be confirmed. A company being licensed in your state does not by itself establish that Plan G is open to new applicants.</p>
      <Tip><strong>Quick answer:</strong> Standard Plan G covers most Original Medicare cost sharing, but not the Part B deductible. You also pay premiums and expenses outside the policy’s benefits. The <Source href={sources.deductible}>2026 Part B deductible is $283</Source>; it is not a cap on all your health spending.</Tip>
    </Section>

    <Section id="coverage" title="What does United American Plan G cover?" shaded>
      <p>For standard Plan G, the following benefits apply to eligible services and policy limits. Medicare’s coverage requirements still matter.</p>
      <Table caption="Standard Plan G benefits" headers={["Benefit", "Standard Plan G"]} rows={[
        ["Part A hospital coinsurance", "Covered; up to 365 additional hospital days after Medicare benefits are used"],
        ["Part A deductible", "Covered"], ["Part B coinsurance or copayments", "Covered after the Part B deductible"],
        ["Part B deductible", "Not covered"], ["Part B excess charges", "Covered"],
        ["Skilled nursing facility coinsurance", "Covered for Medicare-covered care"], ["Hospice coinsurance or copayments", "Covered"],
        ["Blood", "First 3 pints"], ["Foreign travel emergencies", "80% of eligible charges, subject to deductible and policy limits"],
      ]} />
      <p className="text-sm">Source: <Source href={sources.benefits}>Medicare’s Medigap benefit comparison</Source>. Massachusetts, Minnesota, and Wisconsin use different standardization rules; check state-specific coverage.</p>
      <h3 className="text-xl font-bold text-slate-900">What you still pay for</h3>
      <p>Budget for the Plan G premium, your Medicare premiums, the Part B deductible, and any separate drug coverage. Standard Plan G generally excludes routine dental and vision care, hearing aids, custodial long-term care, and private-duty nursing.</p>
      <p>It does not include Part D prescription coverage. However, if Medicare Part B covers a medication, Plan G may help pay the associated Part B cost sharing. Read <Source href={sources.exclusions}>Medicare’s coverage and exclusions</Source> before assuming “no drug coverage” means all medications are excluded from Medicare.</p>
    </Section>

    <Section id="cost" title="How much does United American Plan G cost?">
      <p>There is no single national United American Plan G price. Request a quote for your ZIP code, effective date, age, and applicable rating category. Ask whether underwriting, tobacco status, or discounts affect the amount you are shown.</p>
      <h3 className="text-xl font-bold text-slate-900">Compare your actual offer, not a national starting price</h3>
      <p>Request the standard Plan G premium before and after discounts, any policy fee, and the payment schedule. A rate advertised for another age or location is not your quote. Keep the legal insurer and policy form alongside each price so that you can compare future rate changes for the same product.</p>
      <p>We do not list an estimated United American premium as if it were a personal offer. Use the <Source href={sources.availability}>official availability tool</Source> or request a written comparison for your location.</p>
      <Table caption="Items to verify in a Plan G quote" headers={["Ask for", "Why it matters"]} rows={[
        ["Legal insurer and policy form", "A brand-level comparison may combine different products"],
        ["Premium before and after discounts", "Shows the real savings and conditions"],
        ["Rating method and rate history", "Helps assess future affordability; past increases do not predict future rates"],
        ["Payment frequency and policy fees", "The first-year total may differ from 12 times the quoted premium"],
      ]} />
      <h3 className="text-xl font-bold text-slate-900">Verify discounts on your written quote</h3>
      <p>Ask whether a household discount, payment-method savings, or a non-tobacco rate applies to the policy offered to you. Request the current state-specific rate sheet and the premium before and after any adjustment. We have not verified a single nationwide discount percentage for United American Plan G.</p>
      <p>If a household discount is offered, confirm who must live with you, whether that person must also be insured, and what happens if your household changes. Check whether discounts can be combined and whether an application or policy fee changes the first-year total.</p>
      <p>Also ask whether the policy uses attained-age, issue-age, or community rating. A policy without age-based increases can still have other premium increases. <Source href={sources.costs}>Medicare explains the factors affecting Medigap costs</Source>.</p>
      <Tip><strong>Comparison tip:</strong> Write down the discounted monthly premium, first-year fees, discount conditions, and effective date for each quote. Compare the same Plan G type before deciding which price is better.</Tip>
      <GuideCta variant="medigap" description="Considering United American Plan G? Enter your ZIP code to compare Medicare Supplement options in your area. Availability and enrollment requirements apply." />
    </Section>

    <Section id="compare" title="Plan G vs. Plan N vs. high-deductible Plan G" shaded>
      <Table caption="Comparing Medigap options" headers={["Feature", "Standard G", "Plan N", "High-deductible G"]} rows={[
        ["Part B deductible", "You pay", "You pay", "You pay; counts toward high deductible"],
        ["Office / ER copays", "No Plan N-style copays", "Up to $20 / $50; ER copay waived with inpatient admission", "Eligible costs paid by you until deductible is met"],
        ["Part B excess charges", "Covered", "Not covered", "Covered after high deductible"],
        ["Upfront cost exposure", "Part B deductible for eligible Part B care", "Deductible plus applicable copays and excess charges", "Higher deductible before policy benefits begin"],
      ]} />
      <p>High-deductible G uses a <strong>$2,950 deductible in 2026</strong> and <strong>$3,050 in 2027</strong>. These are high-deductible policy amounts, not standard Plan G deductibles. The Part B deductible counts toward the high deductible but is not itself covered. <Source href={sources.highDeductible}>CMS publishes these annual amounts</Source>.</p>
      <p>United American’s <Source href={sources.productHub}>Texas coverage page lists standard and high-deductible Plan G</Source>. That state example does not establish availability everywhere. Verify the policy offered in your state and request its Outline of Coverage. See our <Link className="text-teal-700 underline" href="/medicare-supplement-plans/plan-n/">Plan N guide</Link> and <Link className="text-teal-700 underline" href="/medicare-supplement-plans/plan-g/">national Plan G overview</Link>.</p>
    </Section>

    <Section id="high-deductible-budget" title="How to compare United American’s high-deductible option">
      <p>Ask for two quotes with the same effective date: standard G and high-deductible G. A much lower monthly premium is only part of the decision. Original Medicare still pays its covered share first; with high-deductible G, you pay qualifying remaining costs until the policy deductible is met.</p>
      <ol className="list-decimal pl-6 space-y-3"><li><strong>Calculate annual premium savings.</strong> Subtract the high-deductible monthly quote from the standard G quote and multiply by 12.</li><li><strong>Check your cash reserve.</strong> Could you comfortably pay the high deductible early in the year? Premiums and services outside the policy’s benefits are additional costs.</li><li><strong>Compare more than one care scenario.</strong> Consider both a year with few visits and a year with substantial Medicare-covered care. Premium savings are not guaranteed total-cost savings.</li><li><strong>Confirm how claims count.</strong> Ask how deductible progress is tracked and whether you need to submit Medicare notices or other records.</li></ol>
      <Tip><strong>Keep the two deductibles separate:</strong> Standard Plan G leaves you responsible for the Part B deductible. High-deductible G has a larger, separate policy threshold; your Part B deductible payment counts toward that threshold. Neither option covers every health expense.</Tip>
    </Section>

    <Section id="doctors" title="Doctors, travel, and claims">
      <p>With a standard, non-SELECT Medigap policy, your provider access follows Original Medicare rather than a Medicare Advantage network. Ask whether the doctor accepts Original Medicare and is accepting new patients. Medicare SELECT policies have different network rules.</p>
      <p>Show your Medicare and supplement cards. Medicare processes its covered portion first; confirm with the insurer whether claims cross over automatically and how to submit any that do not. Compare your Medicare Summary Notice with the insurer’s explanation of benefits before paying an unexpected bill.</p>
      <h3 className="text-xl font-bold text-slate-900">Keep supplement and prescription coverage separate</h3>
      <p>Plan G works alongside Original Medicare; it is not a Medicare Advantage plan. Compare a separate Part D plan using your prescriptions and pharmacies. A supplement quote does not establish whether your medications are covered by a drug plan.</p>
      <p>Plan G does not turn a service Medicare excludes into a covered service, except for specific supplemental benefits such as qualifying foreign emergency care. Review <Source href={sources.carrier}>United American’s supplement coverage information</Source> and your own policy, especially before overseas travel.</p>
    </Section>

    <Section id="enroll" title="Eligibility, underwriting, and how to enroll" shaded>
      <p>You generally need Medicare Parts A and B. Your federal Medigap Open Enrollment Period lasts six months beginning with the first month you are both 65 or older and enrolled in Part B. During that window, health cannot be used to deny an available policy or raise its price.</p>
      <p>Outside that window, an application may involve health questions and medical underwriting unless you have a guaranteed issue right or other state protection. Access under age 65 varies by state. Ask whether a pre-existing-condition waiting period applies and how prior creditable coverage affects it. <Source href={sources.enrollment}>Check Medicare’s enrollment guidance</Source>.</p>
      <ol className="space-y-4 list-decimal pl-6">
        <li><strong>Confirm your enrollment right.</strong> Have your Part B start date and any loss-of-coverage notices ready.</li>
        <li><strong>Compare written quotes.</strong> Use the same effective date and policy type. Include another insurer’s Plan G quote for context.</li>
        <li><strong>Read the policy details.</strong> Confirm the insurer, discounts, underwriting requirements, and any waiting period.</li>
        <li><strong>Coordinate the start date.</strong> Obtain written acceptance and arrange separate prescription coverage where needed.</li>
      </ol>
    </Section>

    <Section id="switch" title="Switching to United American Plan G without a coverage gap">
      <p>If you already have Medigap, do not cancel it just because you submitted a new application. First confirm approval, the premium, and the replacement effective date. Medicare describes a 30-day free-look period when replacing a Medigap policy; you pay both premiums during the overlap. <Source href={sources.switching}>Review Medicare’s switching rules</Source>.</p>
      <Tip><strong>Leaving Medicare Advantage?</strong> An opportunity to leave that plan does not automatically create a right to buy Plan G without underwriting. Confirm supplement eligibility first, then coordinate your return to Original Medicare and any Part D enrollment.</Tip>
      <p>Our <Link href="/faqs/switch-medicare-advantage-to-medicare-supplement/" className="text-teal-700 underline">Medicare Advantage-to-Medigap switching guide</Link> explains the separate decisions involved.</p>
      <h3 className="text-xl font-bold text-slate-900">Is United American the right Plan G company for you?</h3>
      <p>Check the legal issuer’s latest financial-strength rating and any outlook or review status, including the date. Our <Link href={parent} className="text-teal-700 underline">United American carrier review</Link> explains dated rating evidence and how to research the insurer. A financial rating is not a customer-service score or a guarantee of future premiums.</p>
      <p>Shortlist it if the actual local offer fits your budget and coverage needs. Ask about customer support and request rate history for the exact policy. Compare other carriers if the discount is temporary, the total price is higher, or another company better fits your enrollment circumstances. We have not assigned a nationwide “best” rating or projected future savings.</p>
    </Section>

    <Section id="faq" title="Frequently asked questions about United American Plan G" shaded>
      <div className="space-y-3">{faqs.map(({ q, a }) => <details key={q} className="group rounded-xl border border-slate-200 bg-white"><summary className="cursor-pointer p-5 font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-700">{q}</summary><p className="px-5 pb-5">{a}</p></details>)}</div>
    </Section>

    <section className="py-12"><div className="max-w-4xl mx-auto px-4"><div className="rounded-xl border-l-4 border-teal-500 bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-center text-white"><Shield className="mx-auto mb-4 text-teal-300 w-9 h-9" aria-hidden="true" /><h2 className="text-2xl font-bold mb-3">Compare United American Plan G with your local options</h2><p className="text-blue-100 max-w-xl mx-auto mb-6">Start with your ZIP code to connect with help comparing premiums, available policies, and enrollment requirements.</p><Quote id="united-american-plan-g-footer" /></div></div></section>
    <Section id="sources" title="Sources and related guides" shaded>
      <p className="text-sm">Reviewed November 17, 2026 using the official sources linked above. Discount eligibility depends on the state, policy, and application channel. State-approved policy documents determine benefits and availability.</p>
      <div className="flex flex-wrap gap-3">{[[parent, "United American Medicare Supplement overview"], ["/medicare-supplement-plans/compare/", "Compare Medigap plans"], ["/medicare-supplement-plans/medigap-eligibility/", "Medigap eligibility"]].map(([href, label]) => <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-900">{label}<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>)}</div>
    </Section>
  </article></SiteLayout>;
}
