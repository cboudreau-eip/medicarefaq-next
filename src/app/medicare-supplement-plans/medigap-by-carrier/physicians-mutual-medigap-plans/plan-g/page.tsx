import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Shield, ArrowRight, Info } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ZipFormModal from "@/components/ZipFormModal";
import GuideCta from "@/components/GuideCta";

const parent = "/medicare-supplement-plans/medigap-by-carrier/";
const path = `${parent}physicians-mutual-medigap-plans/plan-g/`;
const canonical = `https://www.medicarefaq.com${path}`;
const title = "Physicians Mutual Plan G: Coverage, Costs & Enrollment";
const description = "Explore Physicians Mutual Plan G benefits, costs, the Innovative deductible period, underwriting, and how to compare quotes or switch Medigap coverage.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article", images: ["/images/medicarefaq-cover.jpg"] },
};

const sources = {
  carrier: "https://www.physiciansmutual.com/web/medsupp",
  availability: "https://www.physiciansmutual.com/web/medsupp/innovative-plan-g",
  benefits: "https://www.medicare.gov/health-drug-plans/medigap/basics/compare-plan-benefits",
  exclusions: "https://www.medicare.gov/health-drug-plans/medigap/basics/coverage",
  costs: "https://www.medicare.gov/health-drug-plans/medigap/basics/costs",
  enrollment: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when",
  switching: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/change-policies/switch-drop",
  deductible: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
  highDeductible: "https://www.cms.gov/medicare/health-drug-plans/medigap/f-g-j-deductible-announcements",
};

const faqs = [
  { q: "Which company issues Physicians Mutual Plan G?", a: "Check the legal insurer on your state-specific quote and application. The Physicians Mutual family uses multiple insurance companies, and the brand name alone does not identify the company responsible for your policy." },
  { q: "Is Physicians Mutual Plan G the same as Medicare Advantage?", a: "No. Plan G supplements Original Medicare. Medicare Advantage is a different type of coverage. Medigap does not pay Medicare Advantage copayments or deductibles." },
  { q: "Does Physicians Mutual Plan G have a household discount?", a: "Ask for the current state-specific rate sheet and written quote. Do not assume a household discount or percentage applies to every policy. Confirm eligibility, whether another household member needs coverage, and the premium if you stop qualifying." },
  { q: "Is Physicians Mutual Plan G better than another company's Plan G?", a: "The standardized core benefits are the same. Compare the actual premium, legal insurer, discounts, service, and rate history for your state and policy. Brand recognition alone does not establish better value." },
  { q: "Does Physicians Mutual Plan G cover dental, hearing aids, or prescriptions?", a: "These are not standard Plan G benefits. Review separate dental, vision, or hearing coverage if needed, and a Part D plan for outpatient prescriptions. Plan G can help with cost sharing for drugs covered by Medicare Part B." },
  { q: "Can I get Physicians Mutual Plan G if I have a health condition?", a: "During your federal Medigap Open Enrollment Period, an insurer cannot reject your application or charge more because of health. Outside a protected enrollment right, medical underwriting may affect acceptance or price. State rules may provide additional protections." },
  { q: "Is Innovative Plan G the same as standard Plan G?", a: "No. The Innovative option has an initial deductible arrangement. Ask for its rider and a comparison with standard Plan G before deciding based on the monthly premium." },
  { q: "Do I need to wait for fall enrollment to apply?", a: "You can apply for Medigap throughout the year. The October 15–December 7 Medicare enrollment period does not itself guarantee acceptance into Plan G. Your Medigap enrollment rights and any Medicare Advantage disenrollment window must be considered separately." },
  { q: "Can my premium increase after I buy Plan G?", a: "Yes. A policy being renewable does not freeze its premium. Ask how the policy is rated and request the rate-change history for the same legal insurer, state, and policy form." },
];

const sections = [
  ["coverage", "Coverage & exclusions"], ["cost", "Premiums & discounts"],
  ["compare", "Standard vs. Innovative G"], ["doctors", "Doctors & claims"],
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

export default function PhysiciansMutualPlanGPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: canonical, datePublished: "2026-11-17", dateModified: "2026-11-17", author: { "@type": "Organization", name: "MedicareFAQ" }, publisher: { "@type": "Organization", name: "MedicareFAQ" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["Home", "/"], ["Medicare Supplement", "/medicare-supplement-plans/"], ["Carriers", parent], ["Physicians Mutual Plan G", path]].map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: `https://www.medicarefaq.com${url}` })) },
  ];
  return <SiteLayout><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><article className="bg-white">
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-blue-100 mb-7"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/medicare-supplement-plans/">Medicare Supplement</Link><span aria-hidden="true">›</span><Link href={parent}>Carriers</Link><span aria-hidden="true">›</span><span>Plan G</span></nav>
        <div className="flex items-center gap-3 mb-4"><Shield className="w-8 h-8 text-teal-300" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 px-3 py-1">Medicare Supplement Guide</span></div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl mb-5">Physicians Mutual Medicare Supplement <span className="text-teal-300 whitespace-nowrap">Plan G</span></h1>
        <p className="text-lg text-blue-100 max-w-3xl mb-6">Understand your benefits, compare the full cost, and check your enrollment rights before choosing Physicians Mutual Plan G.</p>
        <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mb-7">{[["Coverage", "Works with Original Medicare"], ["2026 Part B deductible", "$283 — you pay"], ["Your premium", "Personalized quote needed"]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/10 px-5 py-4"><p className="text-sm text-blue-100">{label}</p><p className="font-bold text-lg">{value}</p></div>)}</div>
        <Quote label="Compare Medicare Supplement Options" id="physicians-mutual-plan-g-hero" />
        <p className="text-sm text-blue-100 mt-5">By MedicareFAQ · Updated November 17, 2026 · Availability varies by location</p>
      </div>
    </section>
    <div className="bg-slate-50 border-b border-slate-200"><nav aria-label="On this page" className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="text-blue-900 underline underline-offset-4">{label}</a>)}</nav></div>

    <Section id="overview" title="What is Physicians Mutual Plan G?">
      <p>Physicians Mutual Plan G is Medicare Supplement insurance, also called Medigap. It helps pay eligible expenses left after Original Medicare pays. It is not Medicare Advantage, and it does not replace your Medicare Part A and Part B coverage.</p>
      <p>The core benefits of standard Plan G are standardized. Choosing Physicians Mutual instead of another insurer does not give you a different set of standard Plan G medical benefits. The practical decision is whether the policy available to you offers a suitable price and service.</p>
      <p>The Physicians Mutual family markets coverage through multiple insurance companies. Match your quote to its legal issuer and policy form before checking financial strength, complaints, or rate history. The <Source href={sources.carrier}>company website</Source> changes product information by state; confirm what is available where you live.</p>
      <p>Ask whether the quote is for standard Plan G or an Innovative option. A lower monthly premium does not mean the same immediate out-of-pocket exposure. Read the outline of coverage and any rider together before applying.</p>
      <Tip><strong>Quick answer:</strong> Standard Plan G covers most Original Medicare cost sharing, but not the Part B deductible. You also pay premiums and expenses outside the policy’s benefits. The <Source href={sources.deductible}>2026 Part B deductible is $283</Source>; it is not a cap on all your health spending.</Tip>
    </Section>

    <Section id="coverage" title="What does Physicians Mutual Plan G cover?" shaded>
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

    <Section id="cost" title="How much does Physicians Mutual Plan G cost?">
      <p>There is no single national Physicians Mutual Plan G price. Request a quote for your ZIP code, effective date, age, and applicable rating category. Ask whether underwriting, tobacco status, or discounts affect the amount you are shown.</p>
      <h3 className="text-xl font-bold text-slate-900">Compare your actual offer, not a national starting price</h3>
      <p>Request the standard Plan G premium before and after discounts, any policy fee, and the payment schedule. A rate advertised for another age or location is not your quote. Keep the legal insurer and policy form alongside each price so that you can compare future rate changes for the same product.</p>
      <p>We do not list an estimated Physicians Mutual premium as if it were a personal offer. Use the <Source href={sources.carrier}>official product information</Source> or request a written comparison for your location.</p>
      <Table caption="Items to verify in a Plan G quote" headers={["Ask for", "Why it matters"]} rows={[
        ["Legal insurer and policy form", "A brand-level comparison may combine different products"],
        ["Premium before and after discounts", "Shows the real savings and conditions"],
        ["Rating method and rate history", "Helps assess future affordability; past increases do not predict future rates"],
        ["Payment frequency and policy fees", "The first-year total may differ from 12 times the quoted premium"],
      ]} />
      <h3 className="text-xl font-bold text-slate-900">Verify discounts on your written quote</h3>
      <p>Ask whether a household discount, payment-method savings, or a non-tobacco rate applies to the policy offered to you. Request the current state-specific rate sheet and the premium before and after any adjustment. We have not verified a single nationwide discount percentage for Physicians Mutual Plan G.</p>
      <p>If a household discount is offered, confirm who must live with you, whether that person must also be insured, and what happens if your household changes. Check whether discounts can be combined and whether an application or policy fee changes the first-year total.</p>
      <p>Also ask whether the policy uses attained-age, issue-age, or community rating. A policy without age-based increases can still have other premium increases. <Source href={sources.costs}>Medicare explains the factors affecting Medigap costs</Source>.</p>
      <Tip><strong>Comparison tip:</strong> Write down the discounted monthly premium, first-year fees, discount conditions, and effective date for each quote. Compare the same Plan G type before deciding which price is better.</Tip>
      <GuideCta variant="medigap" description="Considering Physicians Mutual Plan G? Enter your ZIP code to compare Medicare Supplement options in your area. Availability and enrollment requirements apply." />
    </Section>

    <Section id="compare" title="Standard Plan G vs. Innovative Plan G" shaded>
      <p><Source href={sources.availability}>Physicians Mutual describes Innovative Plan G Wellness Plus</Source> as having a yearly deductible during up to its first three calendar years. The first period runs from the effective date through December, followed by two calendar years. Its published November 1, 2026 example ends the deductible period January 1, 2029—not after 36 full months.</p>
      <Table caption="Questions for comparing standard and Innovative Plan G" headers={["Ask about", "Standard Plan G", "Innovative option"]} rows={[
        ["Initial cost sharing", "Part B deductible applies", "Request the rider deductible and costs that count"],
        ["Timing", "Standard benefits from the effective date, subject to policy terms", "Get the exact date the initial deductible period ends"],
        ["Premium", "Request a current written quote", "Compare the written premium and rider conditions"],
        ["Future costs", "Premium increases remain possible", "Ask how later premiums are calculated"],
      ]} />
      <p>The company states that removing the Innovative Discount Rider before year three changes the premium to the standard Plan G Wellness Plus premium. Confirm the terms for your state. Its advertised savings are projections, not a promise of your result.</p>
      <Tip><strong>Budget before choosing:</strong> Request a year-by-year illustration showing premiums, deductible exposure, and the transition date. Compare a year with little care and a year with substantial Medicare-covered care. Avoid treating premium savings alone as total savings.</Tip>
      <h3 className="text-xl font-bold text-slate-900">Compare Plan N and high-deductible G separately</h3>
      <p>Plan N may require up to $20 for certain office visits and up to $50 for ER visits without inpatient admission, and does not cover Part B excess charges. Conventional high-deductible G is another product type; do not assume it has the Innovative rider’s transition terms. Check each policy’s availability and benefits. See our <Link href="/medicare-supplement-plans/plan-n/" className="text-teal-700 underline">Plan N guide</Link> and <Link href="/medicare-supplement-plans/plan-g/" className="text-teal-700 underline">national Plan G guide</Link>.</p>
    </Section>

    <Section id="doctors" title="Doctors, travel, and claims">
      <p>With a standard, non-SELECT Medigap policy, your provider access follows Original Medicare rather than a Medicare Advantage network. Ask whether the doctor accepts Original Medicare and is accepting new patients. Medicare SELECT policies have different network rules.</p>
      <p>Wellness Plus materials describe preventive-care benefits and Silver&amp;Fit access. Check your state’s benefit limits and participating facilities. These extras do not replace Part D prescription coverage or change the standard Plan G benefits listed above.</p>
      <p>Show your Medicare and supplement cards. Medicare processes its covered portion first; confirm with the insurer whether claims cross over automatically and how to submit any that do not. Compare your Medicare Summary Notice with the insurer’s explanation of benefits before paying an unexpected bill.</p>
      <h3 className="text-xl font-bold text-slate-900">Keep supplement and prescription coverage separate</h3>
      <p>Plan G works alongside Original Medicare; it is not a Medicare Advantage plan. Compare a separate Part D plan using your prescriptions and pharmacies. A supplement quote does not establish whether your medications are covered by a drug plan.</p>
      <p>Plan G does not turn a service Medicare excludes into a covered service, except for specific supplemental benefits such as qualifying foreign emergency care. Review <Source href={sources.carrier}>Physicians Mutual’s supplement coverage information</Source> and your own policy, especially before overseas travel.</p>
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

    <Section id="switch" title="Switching to Physicians Mutual Plan G without a coverage gap">
      <p>If you already have Medigap, do not cancel it just because you submitted a new application. First confirm approval, the premium, and the replacement effective date. Medicare describes a 30-day free-look period when replacing a Medigap policy; you pay both premiums during the overlap. <Source href={sources.switching}>Review Medicare’s switching rules</Source>.</p>
      <Tip><strong>Leaving Medicare Advantage?</strong> An opportunity to leave that plan does not automatically create a right to buy Plan G without underwriting. Confirm supplement eligibility first, then coordinate your return to Original Medicare and any Part D enrollment.</Tip>
      <p>Our <Link href="/faqs/switch-medicare-advantage-to-medicare-supplement/" className="text-teal-700 underline">Medicare Advantage-to-Medigap switching guide</Link> explains the separate decisions involved.</p>
      <h3 className="text-xl font-bold text-slate-900">Is Physicians Mutual the right Plan G company for you?</h3>
      <p>Check the latest financial-strength rating for the legal company issuing your policy, including the date and outlook. Do not substitute a rating for another company in the same insurance family. A financial rating is not a customer-service score or a guarantee of future premiums. Our <Link href={parent} className="text-teal-700 underline">Medigap carrier comparison</Link> provides other options to research.</p>
      <p>Shortlist it if the actual local offer fits your budget and coverage needs. Ask about customer support and request rate history for the exact policy. Compare other carriers if the discount is temporary, the total price is higher, or another company better fits your enrollment circumstances. We have not assigned a nationwide “best” rating or projected future savings.</p>
    </Section>

    <Section id="faq" title="Frequently asked questions about Physicians Mutual Plan G" shaded>
      <div className="space-y-3">{faqs.map(({ q, a }) => <details key={q} className="group rounded-xl border border-slate-200 bg-white"><summary className="cursor-pointer p-5 font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-700">{q}</summary><p className="px-5 pb-5">{a}</p></details>)}</div>
    </Section>

    <section className="py-12"><div className="max-w-4xl mx-auto px-4"><div className="rounded-xl border-l-4 border-teal-500 bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-center text-white"><Shield className="mx-auto mb-4 text-teal-300 w-9 h-9" aria-hidden="true" /><h2 className="text-2xl font-bold mb-3">Compare Physicians Mutual Plan G with your local options</h2><p className="text-blue-100 max-w-xl mx-auto mb-6">Start with your ZIP code to connect with help comparing premiums, available policies, and enrollment requirements.</p><Quote id="physicians-mutual-plan-g-footer" /></div></div></section>
    <Section id="sources" title="Sources and related guides" shaded>
      <p className="text-sm">Reviewed November 17, 2026 using the official sources linked above. Discount eligibility depends on the state, policy, and application channel. State-approved policy documents determine benefits and availability.</p>
      <div className="flex flex-wrap gap-3">{[[parent, "Medicare Supplement carrier overview"], ["/medicare-supplement-plans/compare/", "Compare Medigap plans"], ["/medicare-supplement-plans/medigap-eligibility/", "Medigap eligibility"]].map(([href, label]) => <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-900">{label}<ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>)}</div>
    </Section>
  </article></SiteLayout>;
}
