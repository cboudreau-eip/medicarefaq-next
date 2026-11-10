import type { ReactNode } from "react";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="py-12 border-b border-slate-100 scroll-mt-40"><div className="container max-w-4xl"><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5" style={{ fontFamily: "'Merriweather', serif" }}>{title}</h2><div className="space-y-4 text-slate-700 leading-relaxed [&_a]:text-teal-700 [&_a]:underline [&_h3]:font-bold [&_h3]:text-slate-900">{children}</div></div></section>;
}

export function EligibilityGuide() {
  return <>
    <nav aria-label="On this page" className="bg-slate-50 border-b border-slate-200"><div className="container max-w-4xl py-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-teal-700">{[["eligibility", "Who qualifies"], ["choosing", "How to compare"], ["underwriting", "Health questions"], ["pricing", "Understanding costs"], ["switching", "Enroll or switch"], ["help", "Get help"]].map(([id, label]) => <a key={id} href={`#${id}`} className="underline underline-offset-4">{label}</a>)}</div></nav>
    <Section id="eligibility" title="Who Can Buy Medigap in New Jersey?">
      <p>Medicare Supplement insurance works alongside Original Medicare. You generally need both Part A and Part B, and you pay a separate Medigap premium in addition to your Medicare premiums. Each policy covers one person, so spouses choose their own coverage.</p>
      <p>Your federal Medigap Open Enrollment Period lasts six months. It begins the first month you are 65 or older and enrolled in Part B. During this window, insurers cannot use your health to deny a policy they sell or charge more. If you delay Part B while working, this window may begin after your 65th birthday. Read <a href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when">Medicare’s enrollment guidance</a> before choosing a start date.</p>
      <h3>If you qualify for Medicare before age 65</h3>
      <p>New Jersey has separate protections for people eligible through disability. For those first eligible on or after January 1, 2020, the state describes a 12-month application window after Part B enrollment for designated Plan D coverage. Under age 50, coverage is through the state’s contracted carrier, currently Horizon; ages 50–64 have a different carrier-offer requirement. Premium protections tie these designated policies to the same carrier’s age-65 rate.</p>
      <p>These rules do not mean every plan letter is guaranteed to everyone under 65. Earlier eligibility dates have different Plan C provisions. Check the <a href="https://www.nj.gov/dobi/division_insurance/medsuppunder50/intro.html">NJ Department of Banking and Insurance requirements</a> for your age and eligibility date.</p>
      <aside className="rounded-xl border border-teal-200 bg-teal-50 p-5"><strong>Two different enrollment windows:</strong> Medicare’s fall Annual Enrollment Period does not give everyone a new right to buy Medigap without health questions.</aside>
    </Section>
    <Section id="choosing" title="How to Compare New Jersey Medigap Plans">
      <p>Start with the coverage you need, then compare insurers selling that plan letter. Standardized benefits are the same for the same letter, but premiums, discounts, service, and rate histories can differ.</p>
      <ol className="list-decimal pl-6 space-y-3">
        <li><strong>Check your enrollment protections.</strong> Confirm whether you are in open enrollment or have a guaranteed issue right before relying on a quote.</li>
        <li><strong>Choose your benefits.</strong> Compare Plan G’s excess-charge coverage with Plan N’s potential office and emergency-room copays. Neither pays the Part B deductible.</li>
        <li><strong>Request comparable quotes.</strong> Use the same ZIP code, start date, plan letter, and personal details. Ask which discounts are included and when they can end.</li>
        <li><strong>Evaluate the insurer.</strong> Review financial strength, complaint information, service, and past increases. Past prices do not guarantee future rates.</li>
      </ol>
      <p>Compare your total budget, including Part B, prescription drug coverage, and expenses Medigap does not cover. A lower monthly premium can come with more costs when you receive care.</p>
    </Section>
  </>;
}

export function PracticalGuide() {
  return <>
    <Section id="underwriting" title="When Will You Have to Answer Health Questions?">
      <p>Outside a protected enrollment window, an insurer may review your health before accepting an application. This is medical underwriting. Applications may ask about diagnoses, treatments, medications, hospital stays, or planned procedures. Questions and look-back periods vary by insurer; answer the actual application accurately.</p>
      <p>A review can lead to approval, a different premium where permitted, or a denial. A condition is not automatically disqualifying across every company. Ask about the insurer’s requirements before assuming you can replace your current policy.</p>
      <p>Guaranteed issue rights can protect you in specific situations, such as certain involuntary coverage losses or Medicare Advantage trial-right situations. Available plan letters and deadlines depend on the event. Keep termination notices and other supporting records. <a href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/change-policies/switch-drop">Medicare explains switching protections here.</a></p>
      <aside className="rounded-xl border border-blue-200 bg-blue-50 p-5"><strong>Illustrative example:</strong> Someone applying at 68 simply to lower a premium may face health questions. Someone losing qualifying coverage may have a protected purchase right. Age alone does not determine the answer.</aside>
    </Section>
    <Section id="pricing" title="Why Medigap Premiums Differ—and Why They Can Rise">
      <p>Two insurers can charge different amounts for the same standardized benefits. Your quote may reflect your location, age, tobacco use, eligibility for discounts, and the insurer’s rating method. Compare quotes for the same person and effective date; a Newark example is not a quote for every New Jersey ZIP code.</p>
      <h3>Ask how the policy is priced</h3>
      <p>Attained-age premiums can rise as you age. Issue-age pricing uses your age when you buy, while community-rated policies do not base premiums on age. Neither issue-age nor community rating guarantees a fixed premium: claims costs and other approved rate changes can still raise the price. Ask which method applies to the specific policy you are considering.</p>
      <p>Request the full premium before and after discounts, the discount conditions, and available rate-increase history. Household or payment discounts are not universal. Consider what you would pay if a discount ended, rather than comparing only first-year prices.</p>
      <p>The <a href="https://www.medicare.gov/supplements-other-insurance/whats-medicare-supplement-insurance-medigap/medigap-costs">Medicare guide to Medigap costs</a> explains why comparing companies matters. Use a personalized quote for current pricing.</p>
    </Section>
    <Section id="switching" title="How to Enroll or Switch Without a Coverage Gap">
      <ol className="list-decimal pl-6 space-y-3">
        <li><strong>Confirm Medicare and your application window.</strong> Check Part A and Part B start dates and any guaranteed issue deadline.</li>
        <li><strong>Compare the same plan across insurers.</strong> Obtain a written quote and confirm discounts, underwriting, and the requested effective date.</li>
        <li><strong>Apply and wait for confirmation.</strong> A quote is not an approval. Review the policy, premium, and start date before changing existing coverage.</li>
        <li><strong>Coordinate replacement coverage.</strong> If leaving Medicare Advantage, confirm a valid election period, Original Medicare’s start date, and any separate Part D coverage. Medigap does not pay Medicare Advantage cost sharing.</li>
        <li><strong>Review before canceling the old policy.</strong> When switching Medigap policies, use the 30-day free-look period. You generally pay both premiums during the overlap; arrange cancellation after deciding to keep the replacement.</li>
      </ol>
      <p>Do not cancel existing coverage based only on an estimated premium. See <a href="https://www.medicare.gov/publications/02110-choosing-a-medigap-policy.pdf">Medicare’s Medigap buying guide</a> for replacement-policy details.</p>
    </Section>
    <Section id="help" title="Where New Jersey Residents Can Get Help">
      <p><a href="https://nj.gov/humanservices/doas/services/q-z/ship/index.shtml">NJ SHIP</a> provides free, impartial Medicare counseling. A counselor can help you check enrollment rights, compare coverage, and review assistance programs. The Department of Banking and Insurance can help with insurer licensing and insurance complaints.</p>
      <p>If premiums are difficult to afford, ask about Medicare Savings Programs and prescription-cost assistance before buying another policy. These programs have their own eligibility rules and are not Medigap plans. If you have Medicaid, review how it already works with Medicare before applying for supplemental coverage.</p>
    </Section>
  </>;
}
