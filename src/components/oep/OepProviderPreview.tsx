import Link from "next/link";
import styles from "./OepRulesArticle.module.css";
import extra from "./OepLeavingPreview.module.css";

export const OEP_PROVIDER_SLUG = "doctors-dropping-medicare";
export const oepProviderPreviewEnabled = () => process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";
export const oepProviderTitle = "Doctors Dropping Medicare: How to Check Your Coverage";
export const oepProviderDescription = "Understand provider changes and verify your doctor, specialist, and hospital against the exact Medicare Advantage plan using a printable verification sheet.";
const sheet = "/medicarefaq-ma-oep-provider-verification-sheet.pdf";
const faqs = [
  ["Does accepting Medicare mean my doctor accepts my Medicare Advantage plan?", "No. Ask about the exact Medicare Advantage plan name, plan ID, year, and office location. Accepting Original Medicare is a different question from participating in a particular plan’s network."],
  ["What if the directory and the office disagree?", "Record both answers and their dates. Ask the insurance plan to investigate the exact provider and location, request written clarification or a reference number, and keep the status unresolved until the discrepancy is addressed."],
  ["Does an in-network hospital mean every clinician there is in network?", "Do not use the hospital’s listing as confirmation for every clinician or service. Ask the plan about the facility, treating clinicians, and any referral or authorization requirements for the care you are arranging."],
  ["Can I change plans whenever a doctor leaves?", "A doctor’s departure does not automatically create a Special Enrollment Period. Ask Medicare whether your circumstances qualify and confirm the deadline and effective date before submitting a change."],
];

export default function OepProviderPreview() {
  return <article className={`${styles.page} ${extra.article}`}>
    <div className={styles.notice}>Protected preview · Editorial draft for 2027 · Publication and reviewer approval pending</div>
    <header className={styles.hero}><div className={styles.container}>
      <Link href="/medicare-advantage-open-enrollment-resources/">← OEP 2027 Resource Center</Link>
      <p className={styles.eyebrow}>CHECK YOUR DOCTORS AND HOSPITALS</p>
      <h1>Why Are Doctors Dropping Medicare? How to Check Your Coverage</h1>
      <p>Find out what actually changed, then verify your doctor, specialist, and hospital against the exact coverage you plan to use.</p>
      <p className={styles.byline}>Original article by David Haass · Updated draft awaiting editorial review</p>
    </div></header>
    <div className={styles.container}>
      <aside className={styles.answer}><h2>Start with one question: which coverage?</h2><p>“We no longer take Medicare” needs clarification. It may refer to Original Medicare, a particular Medicare Advantage contract, or an office’s availability for new patients. <strong>An insurer’s name alone is not enough to establish a network match.</strong> Get the exact plan and location into the conversation before deciding to change coverage.</p></aside>
      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#what-changed">What changed?</a><a href="#verify">What to verify</a><a href="#call-script">Call script</a><a href="#conflicts">Conflicting answers</a><a href="#example">Worked example</a><a href="#next-steps">If a provider leaves</a><a href="#faqs">FAQs</a></nav>
      <section id="what-changed"><h2>Why might a doctor stop accepting your coverage?</h2><p>There is no single explanation that applies to every office. Ask whether the change concerns an insurance contract, Medicare participation, or appointment availability. If you received a letter, keep it and check the affected plan, location, and effective date.</p>
        <div className={styles.tableWrap} role="region" aria-label="Provider status distinctions" tabIndex={0}><table><caption>Similar phrases can describe different situations</caption><thead><tr><th scope="col">What you hear</th><th scope="col">What to clarify</th></tr></thead><tbody>
          <tr><td>“We accept Medicare.”</td><td>For Original Medicare, ask whether the provider accepts assignment for your service. This statement alone does not establish MA network participation.</td></tr>
          <tr><td>“We are nonparticipating.”</td><td>A nonparticipating Medicare provider may accept assignment case by case. This is different from formally opting out.</td></tr>
          <tr><td>“We opted out of Medicare.”</td><td>Medicare generally will not pay for care from an opted-out provider, except in certain emergencies. Ask about a private contract and costs before agreeing to nonemergency care.</td></tr>
          <tr><td>“We no longer take that plan.”</td><td>Identify the exact MA product, provider location, and contract end date. Do not assume every plan from that insurer is affected.</td></tr>
          <tr><td>“We are not taking new patients.”</td><td>Ask whether this is an appointment availability issue, whether existing patients are affected, and whether another clinician or location has availability.</td></tr>
        </tbody></table></div><p><a href="https://www.medicare.gov/basics/costs/medicare-costs/provider-accept-Medicare">Medicare explains assignment, nonparticipating providers, and opting out.</a></p>
      </section>
      <section id="verify"><h2>Verify the plan, year, provider, and location together</h2><p>Before calling, record the full plan name, contract and plan ID, plan type, and coverage year. Add the doctor’s name and specialty or the hospital’s name, plus the exact street address. Repeat the check for each important specialist and facility.</p><p>Use three sources: the plan’s provider directory, the provider’s office, and the insurance plan. Save the directory URL or document and the date checked. For calls or messages, record the date, person or department, answer, and reference number. Keep network status separate from new-patient acceptance.</p>
        <aside className={styles.warning}><h3>Check how your plan handles out-of-network care</h3><p>HMOs generally require network providers, with exceptions including emergencies, out-of-area urgent care, and temporary out-of-area dialysis. Some HMO-POS plans permit certain additional out-of-network services. PPOs generally cover out-of-network services at a higher cost. Neither a PPO label nor a directory search confirms the arrangements for your particular visit. Check coverage and provider availability before scheduling nonemergency care. <a href="https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/HMO">Medicare’s HMO guidance</a> and <a href="https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/PPO">PPO guidance</a> explain the differences.</p></aside>
      </section>
      <aside className={styles.answer}><h2>Check care away from home, too</h2><p>If you travel or live elsewhere part of the year, verify routine care at those locations separately. Our <Link href="/faqs/medicare-hmo-vs-ppo/">HMO, PPO, and travel checklist</Link> helps you compare network access and costs.</p></aside>
      <section id="call-script"><h2>Use this doctor and hospital verification script</h2>
        <aside className={styles.kit}><h3>Have the Provider Verification Sheet ready</h3><p>Use one copy per provider or facility. The two-page sheet has separate office and plan records, a discrepancy log, and a follow-up field.</p><div><a href={sheet} target="_blank" rel="noopener noreferrer">Open Provider Verification Sheet (PDF)</a><a href={`${sheet}?download=1`} download>Download the sheet</a></div></aside>
        <h3>Ask the office</h3><ol>
          <li>“I am checking [full plan name and ID] for [year]. Is [provider] at [street address] in network for this exact plan?”</li>
          <li>“Are you accepting new patients with this plan? If I am already a patient, can I continue at this location?”</li>
          <li>“Is a network change planned? What is its effective date, and is there a notice I can keep?”</li>
          <li>“Who can clarify insurance participation if your scheduling team cannot confirm it?”</li>
        </ol><h3>Ask the insurance plan</h3><ol>
          <li>“Please verify this provider and address for my exact plan and coverage year. Can you provide written confirmation or a call reference number?”</li>
          <li>“Does my planned visit or service require a referral or prior authorization? What must happen before the appointment?”</li>
          <li>“If the provider is outside the network, does my plan cover this service there, and what cost sharing and approval rules apply?”</li>
          <li>“If the office disagrees with your directory, who will investigate, and when should I follow up?”</li>
        </ol><p>For hospital care, ask separately about the facility and the clinicians involved. Ask the plan to explain the applicable billing protections and cost sharing; a network listing is not a complete coverage determination.</p>
      </section>
      <section id="conflicts"><h2>If answers conflict, mark the result unresolved</h2><p>Do not choose whichever answer is more reassuring. Give the plan the provider’s exact details and the office’s response. Request clarification, a reference number, and a follow-up date. Ask the office’s insurance or billing team to check the exact product as well.</p><p>On the sheet, record the discrepancy, next action, person responsible, and due date. Only change the status to verified when the issue has been resolved and you have recorded the source and date. “Verified” records the information obtained at that time; it is not a guarantee of future participation, authorization, or payment.</p><p>If care is already scheduled or treatment is ongoing, tell the plan promptly. Ask about continuity-of-care arrangements and available network alternatives rather than assuming an existing appointment remains covered.</p></section>
      <section id="example"><h2>Worked example: a directory listing is not the final answer</h2><p><strong>Fictional example:</strong> A shopper checks Dr. Avery Chen at Example Clinic North for Alternative B, a 2027 MA plan. All names are illustrative; this is not a provider or plan recommendation.</p>
        <div className={styles.tableWrap} role="region" aria-label="Completed verification example" tabIndex={0}><table><caption>How to complete the Provider Verification Sheet</caption><thead><tr><th scope="col">Sheet field</th><th scope="col">Example entry</th></tr></thead><tbody>
          <tr><td>Plan and location</td><td>Alternative B, 2027; copy the exact contract/plan ID and plan type from plan documents. Dr. Avery Chen, Example Clinic North; enter the full street address before calling.</td></tr>
          <tr><td>Directory result</td><td>Listed on February 10, 2027. Save the listing URL or document.</td></tr>
          <tr><td>Provider office</td><td>February 10: scheduling staff cannot confirm this exact product. Network status: Unknown. New-patient acceptance: Unknown.</td></tr>
          <tr><td>Insurance plan</td><td>Not contacted yet. Network and new-patient answers remain Unknown; no reference number yet.</td></tr>
          <tr><td>Referral or authorization</td><td>Not checked. Ask the plan about the intended service.</td></tr>
          <tr><td>Discrepancy and next action</td><td>Directory lists the doctor; office cannot confirm. Shopper will call the plan and contact the office’s insurance team on February 11.</td></tr>
          <tr><td>Resolution and final status</td><td>Unresolved. Record the plan reference number, response, and confirmation date when received. Do not treat this as a completed network match.</td></tr>
        </tbody></table></div><p>The example deliberately leaves unanswered fields visible. A blank or unknown response is a task to finish, not evidence of coverage. Keep Medicare numbers, diagnoses, and other sensitive patient details off this planning sheet.</p>
      </section>
      <section id="next-steps"><h2>If your provider leaves, confirm your options before switching</h2><p>Ask the plan about another appropriate provider, ongoing treatment, and the effective date of the change. Keep any termination notice. If you are comparing coverage, <Link href="/blog/key-questions-to-ask-when-comparing-medicare-advantage-plans/">compare plans side by side</Link> using your full provider list, prescriptions, and expected costs.</p><p>A provider departure does not automatically let you switch plans at any time. Medicare lists significant provider-network changes among circumstances that may qualify for a Special Enrollment Period. Contact 1-800-MEDICARE to check your specific situation, permitted changes, and deadline. <a href="https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan/special-circumstances-special-enrollment-periods">See Medicare’s Special Enrollment Period guidance.</a></p><p>For the regular January–March change window, read our <Link href="/faqs/medicare-advantage-open-enrollment-period/">Medicare Advantage Open Enrollment guide</Link>. Before submitting a change, confirm the new coverage start date and resolve important provider questions. If considering Original Medicare, review separate prescription coverage and any Medigap eligibility before relying on them.</p></section>
      <section id="faqs"><h2>Frequently asked questions</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      <aside className={styles.kit}><h2>Make provider verification part of your plan review</h2><p>Keep the completed sheet with your plan comparison and prescription checks.</p><div><Link href="/medicare-advantage-open-enrollment-resources/#plan-review-kit">Explore the OEP Plan Review Kit →</Link><a href={sheet} target="_blank" rel="noopener noreferrer">Open Provider Verification Sheet</a></div></aside>
      <p className={styles.sourceNote}>Official sources checked November 5, 2026. Educational planning guidance; individual coverage depends on plan terms and applicable rules. Editorial and keyword research review remain pending.</p>
    </div>
  </article>;
}
