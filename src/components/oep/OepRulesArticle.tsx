import Link from "next/link";
import styles from "./OepRulesArticle.module.css";

export const OEP_RULES_SLUG = "medicare-advantage-open-enrollment-period";
export const oepRulesTitle = "Medicare Advantage Open Enrollment Period 2027: Rules and Next Steps";

const enrollmentSource = "https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan";
const faq = [
  ["Can I change plans more than once during MA OEP?", "You can use the Medicare Advantage Open Enrollment Period for one change. Another change would require a separate valid enrollment opportunity; do not assume you can switch back before March 31."],
  ["Can I change only my stand-alone Part D plan?", "MA OEP does not let someone with Original Medicare switch stand-alone drug plans. A separate enrollment period must apply. If you leave Medicare Advantage for Original Medicare during MA OEP, you can join a stand-alone Part D plan as part of that transition."],
  ["Do I have to change my Medicare Advantage plan?", "No. This is an opportunity to review your coverage, not a requirement to replace it. Compare your current plan with alternatives before deciding."],
  ["Does leaving Medicare Advantage guarantee a Medigap policy?", "No. The right to leave Medicare Advantage and the right to buy Medigap without medical underwriting are different. Check your Medigap open enrollment, guaranteed-issue, trial-right, and state protections before making a change."],
];

export default function OepRulesArticle() {
  return <article className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
    <header className={styles.hero}><div className={styles.container}>
      <Link href="/faqs/">← Medicare FAQs</Link>
      <p className={styles.eyebrow}>MEDICARE ENROLLMENT GUIDE</p>
      <h1>{oepRulesTitle}</h1>
      <p>Understand whether you can make a change, what to check first, and when your new coverage would begin.</p>
      <p className={styles.byline}>By David Haass · Updated November 4, 2026</p>
    </div></header>
    <div className={styles.container}>
      <aside className={styles.answer} aria-label="Quick answer"><h2>The short answer</h2>
        <p><strong>January 1–March 31, 2027:</strong> If you are already enrolled in Medicare Advantage, you can use this window to make one change—to another Medicare Advantage plan or to Original Medicare, with the option to add a stand-alone drug plan. Coverage generally starts the first day of the month after the plan receives your request.</p>
        <a href="https://www.medicare.gov/publications/11219-Understanding-Medicare-Advantage-Medicare-Drug-Plan-Enrollment-Periods.pdf">Medicare’s enrollment-period guide</a>
      </aside>
      <nav className={styles.contents} aria-label="In this guide"><strong>In this guide</strong><a href="#eligibility">Who qualifies</a><a href="#allowed-changes">Allowed changes</a><a href="#effective-dates">Start dates</a><a href="#before-switching">Before switching</a><a href="#missed-oep-deadline">Missed the deadline?</a><a href="#questions">Common questions</a></nav>
      <section id="eligibility"><h2>Who can use Medicare Advantage OEP?</h2>
        <p>This annual window is for people already in a Medicare Advantage plan, including plans with or without prescription drug coverage. It is different from fall Annual Enrollment, which runs October 15–December 7.</p>
        <p>Having Original Medicare alone does not make you eligible for MA OEP. There is also a separate opportunity for people who joined Medicare Advantage during their Initial Enrollment Period: they can change plans or return to Original Medicare during the first three months they have Part A and Part B. <a href={enrollmentSource}>Check Medicare’s enrollment rules.</a></p>
      </section>
      <section id="allowed-changes"><h2>What can—and can’t—you change?</h2>
        <div className={styles.tableWrap}><table><caption>Changes available through the January–March MA OEP</caption><thead><tr><th scope="col">Your proposed change</th><th scope="col">Allowed?</th></tr></thead><tbody>
          <tr><td>Medicare Advantage → another Medicare Advantage plan, with or without drug coverage</td><td>Yes</td></tr>
          <tr><td>Medicare Advantage → Original Medicare, with the option to join a stand-alone Part D plan</td><td>Yes</td></tr>
          <tr><td>Original Medicare → Medicare Advantage</td><td>No, not through MA OEP</td></tr>
          <tr><td>Original Medicare + Part D → a different stand-alone Part D plan</td><td>No, not through MA OEP</td></tr>
        </tbody></table></div>
        <p>A separate enrollment opportunity may permit a change outside these rules. <a href="https://www.medicare.gov/publications/12026-understanding-medicare-advantage-plans.pdf">See Medicare’s guide to Medicare Advantage.</a></p>
      </section>
      <section id="effective-dates"><h2>When does the new coverage start?</h2>
        <p>The effective date is generally the first of the month after the plan receives your request. For example, a request received February 12, 2027 generally takes effect March 1. A March request generally takes effect April 1. Keep the confirmation and verify the effective date before using the new coverage. <a href={enrollmentSource}>Medicare explains effective dates.</a></p>
      </section>
      <section id="before-switching"><h2>Check these four things before making your one change</h2>
        <ol><li><strong>Providers:</strong> Ask both the plan and your providers about the exact plan, office location, and hospital you use. Record the answers.</li><li><strong>Prescriptions:</strong> Compare your medications, doses, pharmacy, coverage restrictions, and estimated annual costs using <a href="https://www.medicare.gov/plan-compare/">Medicare Plan Compare</a>.</li><li><strong>Total costs:</strong> Review premiums, deductibles, copays, coinsurance, and the plan’s medical out-of-pocket limit. A low premium alone does not tell you what care will cost.</li><li><strong>Coverage coordination:</strong> If returning to Original Medicare, arrange your drug coverage and investigate Medigap availability before finalizing the change.</li></ol>
        <aside className={styles.warning}><h3>Medigap is a separate decision</h3><p>MA OEP does not itself guarantee acceptance for Medigap. Medical underwriting may apply outside a protected enrollment opportunity. Your six-month Medigap open enrollment period, guaranteed-issue rights, certain first-year trial rights, or additional state protections may change that.</p><p>Trial rights have specific conditions; they are not a blanket guarantee for everyone leaving Medicare Advantage. <a href="https://www.medicare.gov/health-drug-plans/medigap/basics/how-medigap-works">Review Medicare’s trial-right rules</a> and <a href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when">when you can buy Medigap</a>.</p></aside>
        <aside className={styles.kit}><h3>Organize your review before you switch</h3><p>Write down your enrollment window, provider and prescription checks, estimated costs, and unresolved questions before submitting a change.</p></aside>
      </section>
      <section id="missed-oep-deadline"><h2>What if you miss March 31?</h2><p>Missing the deadline does not automatically create another enrollment window. A qualifying event, such as moving or losing certain coverage, may give you a Special Enrollment Period. The permitted change and deadline depend on your circumstances. <a href="https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods">Check Medicare’s Special Enrollment Period guidance.</a></p><p>If no other enrollment opportunity applies, fall Annual Enrollment may be your next chance to change coverage. Contact Medicare at <a href="tel:18006334227">1-800-MEDICARE (1-800-633-4227)</a> to confirm your options rather than submitting a request under an enrollment period that does not apply.</p></section>
      <section id="questions"><h2>Common questions about MA OEP</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<p className={styles.sourceNote}>Enrollment guidance is based on the official Medicare sources linked throughout this article.</p></section>
    </div>
  </article>;
}
