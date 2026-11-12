import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronDown, Check, ClipboardCheck, HeartPulse, Pill, Scale, ShieldCheck, Wallet } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ZipFormModal from "@/components/ZipFormModal";
import styles from "./page.module.css";
import EmailKitPreview from "./EmailKitPreview";

export const metadata: Metadata = {
  title: "Medicare Advantage OEP 2027 Resource Center",
  description: "Prepare for Medicare Advantage Open Enrollment with eligibility guidance, coverage checks, and plan-review resources for January through March 2027.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.medicarefaq.com/medicare-advantage-open-enrollment-resources/" },
};

const guides = [
  { icon: HeartPulse, title: "Your doctors and hospitals", description: "Start with the people and places you rely on. Confirm the exact plan and provider location before making a decision.", href: "/blog/doctors-dropping-medicare/", label: "Review provider access" },
  { icon: Pill, title: "Your prescriptions and pharmacy", description: "Check your exact medicines, coverage rules, and pharmacy costs with the prescription workbook.", href: "/blog/compare-medicare-advantage-prescriptions-pharmacies/", label: "Compare prescriptions and pharmacies" },
  { icon: Wallet, title: "Your total costs", description: "Compare premiums, medical and drug costs, and spending limits with a worked worksheet example.", href: "/medicare-plans/costs/", label: "Compare your total costs" },
];

const worksheets = [
  { number: "01", icon: ClipboardCheck, title: "Plan Review Checklist", description: "A clear order for reviewing your coverage and keeping track of next steps.", items: ["Confirm your enrollment window", "Gather plan documents and coverage questions", "Record what you still need to verify"] },
  { number: "02", icon: Scale, title: "Plan Comparison Worksheet", description: "Put your current plan and two alternatives side by side.", items: ["Compare premiums and expected costs", "Record provider and prescription checks", "Keep unresolved questions visible"] },
  { number: "03", icon: HeartPulse, title: "Provider Verification Sheet", description: "Keep a record of what your doctor’s office and the plan tell you.", items: ["Identify the exact plan and location", "Record who you contacted and when", "Track conflicting answers and follow-up"] },
  { number: "04", icon: Pill, title: "Prescription Cost Workbook", description: "Organize medication details and compare pharmacy assumptions consistently.", items: ["List medication, strength, and supply", "Note coverage rules and pharmacy status", "Separate drug costs from plan premiums"] },
];

export default function OepResourcesPage() {
  // Review-only route: explicit release work is required before production use.
  if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview") notFound();

  return (
    <SiteLayout>
      <div className={styles.page}>
        <div className={styles.preview}>Review preview · OEP 2027 resource center · Guides and all five PDFs are ready for review. Not published.</div>
        <section className={styles.hero} aria-labelledby="oep-heading">
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>OEP resources</span></nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>YOUR 2027 PLAN REVIEW STARTS HERE</p>
                <h1 id="oep-heading">Medicare Advantage<br /><span>Open Enrollment</span><br />Resource Center</h1>
                <p className={styles.intro}>A clear next step for your Medicare coverage. Check the rules, review what matters to you, and organize your options for 2027.</p>
                <a className={styles.primary} href="#start-here">Find your starting point <ArrowRight size={19} aria-hidden="true" /></a>
                <a className={styles.heroLink} href="#plan-review-kit">Explore the Plan Review Kit <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
              <aside className={styles.calendar} aria-label="2027 Medicare Advantage Open Enrollment dates">
                <div className={styles.calendarTop}><CalendarDays size={24} aria-hidden="true" /><span>MEDICARE ADVANTAGE OEP</span></div>
                <div className={styles.dates}><div><span>JANUARY</span><strong>01</strong></div><span className={styles.dateLine} aria-hidden="true" /><div><span>MARCH</span><strong>31</strong></div></div>
                <p className={styles.year}>2027</p>
                <div className={styles.calendarNote}><ShieldCheck size={23} aria-hidden="true" /><p>For people already enrolled in a Medicare Advantage plan.</p></div>
                <p className={styles.calendarFoot}>This is a different enrollment window from fall Annual Enrollment.</p>
              </aside>
            </div>
          </div>
        </section>

        <section id="start-here" className={`${styles.section} ${styles.container}`} aria-labelledby="start-heading">
          <p className={styles.kicker}>START WITH YOUR QUESTION</p><h2 id="start-heading">What would you like to do?</h2>
          <p className={styles.lead}>Choose the path that fits where you are in your review.</p>
          <div className={styles.startGrid}>
            <Link href="/faqs/medicare-advantage-open-enrollment-period/" className={styles.startCard}><CalendarDays aria-hidden="true" /><h3>Check whether I can change my plan</h3><p>Understand who can use MA OEP, the available changes, and when coverage starts.</p><span>Check the OEP rules <ArrowRight size={17} aria-hidden="true" /></span></Link>
            <Link href="/blog/should-i-keep-or-switch-medicare-advantage-plan/" className={styles.startCard}><ShieldCheck aria-hidden="true" /><h3>Decide whether to keep my plan</h3><p>Weigh what works, what needs attention, and whether an alternative addresses your priorities.</p><span>Review the decision guide <ArrowRight size={17} aria-hidden="true" /></span></Link>
            <Link href="/blog/key-questions-to-ask-when-comparing-medicare-advantage-plans/" className={styles.startCard}><Scale aria-hidden="true" /><h3>Compare my coverage options</h3><p>Ask the right questions about providers, prescriptions, benefits, and costs.</p><span>Start your comparison <ArrowRight size={17} aria-hidden="true" /></span></Link>
            <a href="#plan-review-kit" className={`${styles.startCard} ${styles.kitCard}`}><ClipboardCheck aria-hidden="true" /><h3>Get organized for my plan review</h3><p>Explore the four worksheets and the complete OEP Plan Review Kit.</p><span>See what’s in the kit <ArrowRight size={17} aria-hidden="true" /></span></a>
          </div>
          <div className={styles.rules}><ShieldCheck size={25} aria-hidden="true" /><div><strong>Know which window applies to you.</strong><p>During MA OEP, eligible members can switch to another Medicare Advantage plan or return to Original Medicare and join a separate drug plan. Coverage generally starts the first of the month after the plan receives the request.</p><Link href="/original-medicare/medicare-enrollment-periods/">Compare Medicare enrollment windows <ArrowRight size={15} aria-hidden="true" /></Link></div></div>
        </section>

        <section className={styles.reviewSection} aria-labelledby="review-heading"><div className={styles.container}>
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>BEFORE YOU DECIDE</p><h2 id="review-heading">Review the coverage you actually use.</h2></div><p>Keep these three checks together as you compare your current plan with alternatives.</p></div>
          <div className={styles.guideGrid}>{guides.map(({ icon: Icon, title, description, href, label }) => <article className={styles.guide} key={title}><Icon size={29} aria-hidden="true" /><h3>{title}</h3><p>{description}</p><Link href={href}>{label} <ArrowRight size={16} aria-hidden="true" /></Link></article>)}</div>
        </div></section>

        <section id="plan-review-kit" className={`${styles.section} ${styles.container}`} aria-labelledby="kit-heading">
          <div className={styles.kitHeading}><div><p className={styles.kicker}>ONE REVIEW. FOUR USEFUL WORKSHEETS.</p><h2 id="kit-heading">Your OEP Plan Review Kit</h2><p className={styles.lead}>A place for your comparisons, confirmations, and questions—so you can see what still needs an answer.</p></div><span className={styles.status}>Ready for review · Publication pending</span></div>
          <EmailKitPreview />
          <h3 className={styles.individualHeading}>Need just one worksheet?</h3>
          <div className={styles.worksheetGrid}>{worksheets.map(({ number, icon: Icon, title, description, items }) => <article className={styles.worksheet} key={number}><div className={styles.sheetTop}><span>{number}</span><Icon size={23} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p><details><summary>{"What this worksheet includes"}</summary><ul>{items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></details>{number === "01" && <div className={styles.downloadLinks}><a href="/medicarefaq-ma-oep-plan-review-checklist.pdf" target="_blank" rel="noopener noreferrer">Open checklist PDF <span>(new tab)</span></a><a href="/medicarefaq-ma-oep-plan-review-checklist.pdf?download=1" download>Download checklist</a><small>2 pages · PDF · 6.0 KB · Review draft</small></div>}{number === "02" && <div className={styles.downloadLinks}><a href="/medicarefaq-ma-oep-plan-comparison-worksheet.pdf" target="_blank" rel="noopener noreferrer">Open comparison PDF <span>(new tab)</span></a><a href="/medicarefaq-ma-oep-plan-comparison-worksheet.pdf?download=1" download>Download comparison worksheet</a><small>3 pages · PDF · 8.1 KB · Review draft</small></div>}{number === "03" && <div className={styles.downloadLinks}><a href="/medicarefaq-ma-oep-provider-verification-sheet.pdf" target="_blank" rel="noopener noreferrer">Open provider sheet PDF <span>(new tab)</span></a><a href="/medicarefaq-ma-oep-provider-verification-sheet.pdf?download=1" download>Download provider sheet</a><small>2 pages · PDF · 5.5 KB · Review draft</small></div>}{number === "04" && <div className={styles.downloadLinks}><a href="/medicarefaq-ma-oep-prescription-workbook.pdf" target="_blank" rel="noopener noreferrer">Open prescription workbook PDF <span>(new tab)</span></a><a href="/medicarefaq-ma-oep-prescription-workbook.pdf?download=1" download>Download prescription workbook</a><small>3 pages · PDF · 7.5 KB · Review draft</small></div>}</article>)}</div>
        <details className={styles.checklistHelp}>
            <summary>How to use the checklist + a fictional example</summary>
            <p>Ready to act on your comparison? Follow the <Link href="/blog/how-to-switch-medicare-advantage-plans/">before, during, and after switching guide</Link>, including its after-switch confirmation checklist.</p>
            <p>Print both pages. Mark each check Yes, No, or Not checked and use the notes to record what still needs an answer. This worksheet does not determine eligibility or enroll you in a plan.</p>
            <ol><li>Record your current plan, plan identifier if known, year, review date, reason for review, and desired coverage path. Never enter your Medicare number.</li><li>Confirm your enrollment opportunity and record the source and date. Gather plan documents and questions, then check your doctors and hospitals for the exact plan.</li><li>Review medications, pharmacies, expected costs, benefits, limits, referrals, and authorizations. If leaving Medicare Advantage, check drug coverage and Medigap purchasing rights before changing.</li><li>Record unresolved issues, the person responsible, and the next action. Separate requested and confirmed start dates. Save confirmation and check cards, pharmacy, and appointments after a switch.</li></ol>
            <p><strong>Fictional example:</strong> Jordan reviews Current Plan A for 2027 on February 10 because hospital access is a concern. Medications have been checked; hospital access and the enrollment opportunity still need confirmation. Jordan will call the plan and Medicare. The requested start is March 1; the confirmed date stays blank until verified. This is not a completed enrollment.</p>
            <p>Keep your completed sheet private; do not upload it. Use the comparison worksheet to organize alternatives. Use the provider sheet for network checks. Use the prescription workbook to compare drugs and pharmacies.</p>
          </details>
        <details className={styles.checklistHelp}>
          <summary>How to compare plans + a fictional cost example</summary>
          <p>Print the three landscape pages at 100% size. Keep your current plan in column A and the same two alternatives in columns B and C throughout. Record exact plan names, plan year, location, and the date of each quote.</p>
          <ol><li>Verify doctors, hospitals, prescriptions, pharmacies, benefit limits, referrals, and authorizations. Record the source and date. Use Verified, Not checked, or Conflicting; do not assume an unknown cost is zero.</li><li>Use the same comparison period and expected services. Add plan premiums for that period, medical cost sharing, drug cost sharing without premiums, and noncovered expenses. Record Part B and any other premiums separately. Do not count a premium or deductible twice.</li><li>Record medical limits and the drug out-of-pocket threshold separately. These are not amounts to add to expected expenses. Note unresolved questions, priorities, tradeoffs, who will follow up, and whether to keep the current plan, consider an alternative, or wait.</li></ol>
          <p><strong>Fictional 12-month example:</strong> Current A: $20 × 12 + $900 medical + $360 drugs = $1,500. Alternative B: $35 × 12 + $700 + $240 = $1,360. Alternative C: $0 × 12 + $1,400 + $600 = $2,000. Each assumes $0 noncovered expenses; Part B premiums are excluded. These figures are examples, not quotes.</p>
          <p>B has the lowest subtotal, but Jordan has not confirmed its hospital access. The decision stays pending. Keep completed worksheets private; no upload or email signup is needed.</p>
        </details><details className={styles.checklistHelp}>
          <summary>How to verify providers + a sample call script</summary>
          <p>Print one two-page copy for each provider or hospital, exact location, and plan. Record the plan name, identifier, type, and year. Check the directory, then record separate answers from the provider office and the plan, including dates, contact channels, names or roles, and reference numbers.</p>
          <p><strong>Ask the office:</strong> “For [plan name, plan ID, and year], is [provider] at [exact address] in network? Are you accepting new patients under that plan? Who can confirm the exact product if you are unsure?” Accepting Original Medicare does not by itself confirm participation in a Medicare Advantage plan.</p>
          <p><strong>Ask the plan:</strong> “Please confirm whether [provider or hospital] at [address] is in network for [exact plan and year]. What referral or authorization rules should I verify? May I have a written confirmation or reference number?” Confirm appointment availability directly with the office.</p>
          <p><strong>If answers disagree:</strong> Record the discrepancy, follow-up owner, next action, and next check date. Mark the result unresolved until clarified. Keep new-patient acceptance separate from network status; a dated confirmation is not a guarantee of future participation or payment.</p>
          <p><strong>Fictional example:</strong> Jordan checks Dr. Avery Chen at Example Clinic North for Alternative B, 2027. The directory lists the provider on February 10, but the office cannot confirm the exact product and the plan has not responded. Jordan marks the status unresolved and will call the plan and retain a reference number.</p>
          <p>Keep completed sheets private. Do not add Medicare numbers, diagnoses, or other sensitive patient details. No upload or email signup is needed.</p>
        </details><details className={styles.checklistHelp}>
          <summary>How to compare prescription costs + a fictional example</summary>
          <p>Print all three pages. Copy the medicine name, brand or generic, formulation, strength, dose, quantity, days supplied, and refill frequency from your current list. Ask your prescriber or pharmacist about unclear details; do not change treatment for this comparison.</p>
          <ol><li>Repeat page two for each medicine and pharmacy comparison. Use the same supply for each option. Record exact plan identifiers, year, pharmacy location and type, preferred or standard network status, coverage, tier, price source, and date.</li><li>Check prior authorization, step therapy, and quantity limits separately using Yes, No, or Unknown. Unknown is different from not covered. Ask the plan or prescriber about restrictions and record unresolved questions.</li><li>Use estimated totals for all medicines over the same comparison period. Costs can vary during the year; do not multiply a single fill price by twelve without verifying the assumptions. Record whether premiums and deductibles are already included.</li><li>Transfer the covered-drug subtotal without premiums to the Plan Comparison Worksheet once. Record noncovered expenses separately. Keep premiums in the premium fields, and do not add an included deductible again. If the subtotal cannot be separated, mark it unresolved.</li></ol>
          <p><strong>Fictional example:</strong> Medication X is an invented 10 mg tablet taken once daily, with 30 tablets per fill. Only for this simplified example, assume twelve fills at a fixed $30, $20, or $50 under plans A, B, or C with no additional drug charges. The drug subtotals are $360, $240, and $600. These are not real prices or a model for costs that change during the year.</p>
          <p>In the fictional scenario, option B’s pharmacy status is verified, but its hospital access remains unresolved. Its $35 monthly plan premium belongs in the comparison worksheet’s premium fields, not the $240 drug subtotal. A and C premiums are $20 and $0; the same separation applies.</p>
          <p>Keep completed medication lists private; no upload or email signup is needed. Official guidance: <a href="https://www.medicare.gov/health-drug-plans/part-d/basics/costs">Medicare drug costs</a> and <a href="https://www.medicare.gov/health-drug-plans/part-d/what-drug-plans-cover/plan-rules">drug plan coverage rules</a>.</p>
        </details></section>

        <section className={styles.optionsSection} aria-labelledby="options-heading"><div className={styles.container}>
          <p className={styles.kicker}>UNDERSTAND YOUR NEXT STEP</p><h2 id="options-heading">Considering a different coverage path?</h2>
          <div className={styles.optionsGrid}>
            <Link href="/blog/how-to-switch-medicare-advantage-plans/"><h3>Switch Medicare Advantage Plans</h3><p>Follow the application, effective-date, prescription, and appointment checklist.</p><b>See the switching steps <ArrowRight size={17} aria-hidden="true" /></b></Link>
            <Link href="/blog/switching-from-medicare-advantage-to-original-medicare-what-you-need-to-know/"><h3>Return to Original Medicare</h3><p>Review medical and drug coverage together before choosing your next step.</p><b>Explore the transition <ArrowRight size={17} aria-hidden="true" /></b></Link>
            <Link href="/faqs/switch-medicare-advantage-to-medicare-supplement/"><h3>Consider Medicare Supplement</h3><p>Find out which purchasing protections or underwriting requirements may apply to you.</p><b>Review Medigap considerations <ArrowRight size={17} aria-hidden="true" /></b></Link>
          </div>
          <details className={styles.deadline}><summary><CalendarDays className={styles.deadlineIcon} size={26} aria-hidden="true" /><span><span className={styles.deadlineLabel}>MISSED THE DEADLINE?</span><span className={styles.deadlineTitle}>What if I miss the January–March window?</span><span className={styles.deadlineHint}>Explore what to check next.</span></span><ChevronDown className={styles.deadlineChevron} size={22} aria-hidden="true" /></summary><p>Missing a deadline does not by itself establish eligibility for another window. Check pending applications, possible Special Enrollment Periods, and coverage issues that need attention now.</p><p><Link href="/blog/missed-medicare-advantage-open-enrollment-deadline/">See your next steps after March 31 →</Link></p></details>
        </div></section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="help-heading"><div className={styles.help}>
          <div><p className={styles.eyebrow}>HELP WITH YOUR NEXT STEP</p><h2 id="help-heading">You don’t have to sort it out alone.</h2><p>Connect with a licensed insurance agent to discuss your Medicare coverage options.</p></div>
          <ZipFormModal coverageType="ma" triggerLabel="Explore My Options" triggerClassName={styles.primary} trackingId="oep-resource-hub-help" />
        </div><p className={styles.sources}>For free, independent counseling, contact your <a href="https://www.shiphelp.org/">State Health Insurance Assistance Program (SHIP)</a>. Enrollment information: <a href="https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan">Medicare.gov</a>.</p></section>
      </div>
    </SiteLayout>
  );
}
