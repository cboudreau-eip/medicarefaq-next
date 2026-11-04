import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, ClipboardCheck, FileText, HeartPulse, Pill, Scale, ShieldCheck, Wallet } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ZipFormModal from "@/components/ZipFormModal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Medicare Advantage OEP 2027 Resource Center",
  description: "Prepare for Medicare Advantage Open Enrollment with eligibility guidance, coverage checks, and plan-review resources for January through March 2027.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.medicarefaq.com/medicare-advantage-open-enrollment-resources/" },
};

const guides = [
  { icon: HeartPulse, title: "Your doctors and hospitals", description: "Start with the people and places you rely on. Confirm the exact plan and provider location before making a decision.", href: "/blog/doctors-dropping-medicare/", label: "Review provider access" },
  { icon: Pill, title: "Your prescriptions and pharmacy", description: "Bring your medication list, including strength and quantity, and compare pharmacy options alongside coverage.", href: "https://www.medicare.gov/plan-compare/", label: "Compare drugs on Medicare.gov" },
  { icon: Wallet, title: "Your total costs", description: "Look beyond the monthly premium. Organize expected doctor visits, prescriptions, and other out-of-pocket costs.", href: "/medicare-plans/costs/", label: "Understand Medicare costs" },
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
        <div className={styles.preview}>Design preview · OEP 2027 resource center · Worksheets and supporting-page updates are in preparation</div>
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
            <Link href="/blog/key-questions-to-ask-when-comparing-medicare-advantage-plans/" className={styles.startCard}><Scale aria-hidden="true" /><h3>Compare my coverage options</h3><p>Ask the right questions about providers, prescriptions, benefits, and costs.</p><span>Start your comparison <ArrowRight size={17} aria-hidden="true" /></span></Link>
            <a href="#plan-review-kit" className={`${styles.startCard} ${styles.kitCard}`}><ClipboardCheck aria-hidden="true" /><h3>Get organized for my plan review</h3><p>Explore the four worksheets being prepared for the OEP Plan Review Kit.</p><span>See what’s in the kit <ArrowRight size={17} aria-hidden="true" /></span></a>
          </div>
          <div className={styles.rules}><ShieldCheck size={25} aria-hidden="true" /><div><strong>Know which window applies to you.</strong><p>During MA OEP, eligible members can switch to another Medicare Advantage plan or return to Original Medicare and join a separate drug plan. Coverage generally starts the first of the month after the plan receives the request.</p><Link href="/original-medicare/medicare-enrollment-periods/">Compare Medicare enrollment windows <ArrowRight size={15} aria-hidden="true" /></Link></div></div>
        </section>

        <section className={styles.reviewSection} aria-labelledby="review-heading"><div className={styles.container}>
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>BEFORE YOU DECIDE</p><h2 id="review-heading">Review the coverage you actually use.</h2></div><p>Keep these three checks together as you compare your current plan with alternatives.</p></div>
          <div className={styles.guideGrid}>{guides.map(({ icon: Icon, title, description, href, label }) => <article className={styles.guide} key={title}><Icon size={29} aria-hidden="true" /><h3>{title}</h3><p>{description}</p><Link href={href}>{label} <ArrowRight size={16} aria-hidden="true" /></Link></article>)}</div>
        </div></section>

        <section id="plan-review-kit" className={`${styles.section} ${styles.container}`} aria-labelledby="kit-heading">
          <div className={styles.kitHeading}><div><p className={styles.kicker}>ONE REVIEW. FOUR USEFUL WORKSHEETS.</p><h2 id="kit-heading">Your OEP Plan Review Kit</h2><p className={styles.lead}>A place for your comparisons, confirmations, and questions—so you can see what still needs an answer.</p></div><span className={styles.status}>PDFs in preparation</span></div>
          <div className={styles.worksheetGrid}>{worksheets.map(({ number, icon: Icon, title, description, items }) => <article className={styles.worksheet} key={number}><div className={styles.sheetTop}><span>{number}</span><Icon size={23} aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p><details><summary>What this worksheet will include</summary><ul>{items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></details></article>)}</div>
          <div className={styles.kitFooter}><FileText size={25} aria-hidden="true" /><p><strong>Individual worksheets + one combined kit.</strong><br />The finished PDFs will be available here without an email signup. Downloads will be added after review.</p></div>
        </section>

        <section className={styles.optionsSection} aria-labelledby="options-heading"><div className={styles.container}>
          <p className={styles.kicker}>UNDERSTAND YOUR NEXT STEP</p><h2 id="options-heading">Considering a different coverage path?</h2>
          <div className={styles.optionsGrid}>
            <Link href="/blog/switching-from-medicare-advantage-to-original-medicare-what-you-need-to-know/"><span>RETURNING TO ORIGINAL MEDICARE</span><h3>Understand what changes when you leave MA.</h3><p>Review medical and drug coverage together before choosing your next step.</p><b>Explore the transition <ArrowRight size={17} aria-hidden="true" /></b></Link>
            <Link href="/faqs/switch-medicare-advantage-to-medicare-supplement/"><span>CONSIDERING MEDICARE SUPPLEMENT</span><h3>Check Medigap access before making a change.</h3><p>Find out which purchasing protections or underwriting requirements may apply to you.</p><b>Review Medigap considerations <ArrowRight size={17} aria-hidden="true" /></b></Link>
          </div>
          <details className={styles.deadline}><summary>What if I miss the January–March window?</summary><p>Other enrollment opportunities depend on your circumstances. Review <a href="https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods">Medicare’s Special Enrollment Period guidance</a> to see which situations may apply. Missing a deadline does not by itself establish eligibility for another window.</p></details>
        </div></section>

        <section className={`${styles.section} ${styles.container}`} aria-labelledby="help-heading"><div className={styles.help}>
          <div><p className={styles.eyebrow}>HELP WITH YOUR NEXT STEP</p><h2 id="help-heading">You don’t have to sort it out alone.</h2><p>Connect with a licensed insurance agent to discuss your Medicare coverage options.</p></div>
          <ZipFormModal coverageType="ma" triggerLabel="Explore My Options" triggerClassName={styles.primary} trackingId="oep-resource-hub-help" />
        </div><p className={styles.sources}>For free, independent counseling, contact your <a href="https://www.shiphelp.org/">State Health Insurance Assistance Program (SHIP)</a>. Enrollment information: <a href="https://www.medicare.gov/sign-up-change-plans/joining-a-health-or-drug-plan">Medicare.gov</a>.</p></section>
      </div>
    </SiteLayout>
  );
}
