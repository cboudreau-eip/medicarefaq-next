import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "./review-data.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "OEP 2027 Review for Pepper",
  description: "Private editorial review directory for the MedicareFAQ OEP resource center.",
  robots: { index: false, follow: false },
};

export default function OepReviewPage() {
  if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview") notFound();
  const groups = [...new Set(data.pages.slice(1).map(page => page.group))];
  return <main className={styles.review}>
    <header className={styles.header}><span>MEDICARE<span className={styles.red}>FAQ</span></span><span className={styles.private}>Private preview · Not published</span></header>
    <section className={styles.hero}>
      <p className={styles.eyebrow}>PREPARED FOR PEPPER · NOVEMBER 11, 2026</p>
      <h1>OEP 2027<br />Ready for your review</h1>
      <p className={styles.intro}>Explore the resource center, supporting guides, and printable worksheets as they stand today. Please review the experience and note the changes you want before publication.</p>
      <a className={styles.primary} href={data.pages[0].path} target="_blank" rel="noopener noreferrer">Start with the resource center <span aria-hidden="true">↗</span></a>
      <p className={styles.subtle}>Pages open in a new tab so you can keep this directory open.</p>
      <div className={styles.metrics}><div><strong>11</strong><span>Review pages</span></div><div><strong>5</strong><span>PDF resources</span></div><div><strong>4 new · 7 updates</strong><span>Plus one supporting AEP correction</span></div></div>
    </section>
    <nav className={styles.jump} aria-label="Review sections"><a href="#pages">Page directory</a><a href="#pdfs">PDF library</a><a href="#notes">What remains</a><a href="#feedback">Feedback checklist</a></nav>
    <section className={styles.section} id="pages"><p className={styles.eyebrow}>01 / PAGE DIRECTORY</p><h2>Follow the visitor journey</h2><p>Preview links stay in this protected deployment. “Compare live version” opens the existing public page for reference.</p>
      {groups.map(group => <div key={group} className={styles.group}><h3>{group}</h3><div className={styles.grid}>{data.pages.filter(p => p.group === group).map(page => <article className={styles.card} key={page.id}><div className={styles.cardTop}><span>{page.id}</span><span className={page.status === "New page" ? styles.new : styles.update}>{page.status}</span></div><h4>{page.title}</h4><p>{page.note}</p><div className={styles.links}><a href={page.path} target="_blank" rel="noopener noreferrer">Review preview ↗</a>{page.status !== "New page" && <a href={`https://www.medicarefaq.com${page.path}`} target="_blank" rel="noopener noreferrer">Compare live version ↗</a>}</div></article>)}</div></div>)}
      <aside className={styles.support}><strong>Supporting update: {data.supporting.title}</strong><p>{data.supporting.note}</p><a href={data.supporting.path} target="_blank" rel="noopener noreferrer">Review AEP wording ↗</a></aside>
    </section>
    <section className={styles.section} id="pdfs"><p className={styles.eyebrow}>02 / PDF LIBRARY</p><h2>Open the kit and worksheets</h2><p>These are review drafts. OEP downloads require no signup; the separate Turning 65 kit and signup flow are unchanged.</p><div className={styles.pdfList}>{data.pdfs.map(pdf => <article className={styles.pdf} key={pdf.path}><div className={styles.pdfIcon}>PDF</div><div><h3>{pdf.title}</h3><p>{pdf.pages} pages · {pdf.note}</p></div><div className={styles.links}><a href={pdf.path} target="_blank" rel="noopener noreferrer">Open ↗</a><a href={`${pdf.path}?download=1`} download>Download ↓</a></div></article>)}</div></section>
    <section className={styles.section} id="notes"><p className={styles.eyebrow}>03 / REVIEW STATUS</p><h2>What is ready and what remains</h2><div className={styles.grid}><article className={styles.card}><span className={styles.new}>Ready to review</span><h3>The content and experience</h3><p>The landing page, ten supporting pages, navigation between guides, and all five PDFs are available for review.</p><p>November 9 checks confirmed page and PDF delivery and PostHog PDF-click receipt. Download clicks measure activation, not completed reading or leads.</p></article><article className={styles.card}><span className={styles.pending}>Still open</span><h3>Before production launch</h3><ul><li>GA4 delivery and reporting remain unverified.</li><li>Semrush research is incomplete; keyword-demand claims are not validated.</li><li>Final editorial review and publication approval are pending.</li><li>Reconcile any newer CMS edits, remove draft labels deliberately, and finish production indexing and launch checks.</li></ul></article></div><p className={styles.note}>This is an as-is review package, not publication approval or a fresh medical/legal review. The live site, existing signup flow, notification emails, and webhook have not been changed by this package.</p></section>
    <section className={styles.section} id="feedback"><p className={styles.eyebrow}>04 / FEEDBACK</p><h2>What would you change?</h2><p>Use the page IDs above when sending feedback to Charlie. Suggested format: <strong>Page ID · section · requested change · priority.</strong></p><fieldset className={styles.checklist}><legend>Review checklist</legend>{["The landing page makes the purpose and next step clear.","The guides answer the questions readers need to make a decision.","The page order and links make sense.","The layout works on desktop and mobile.","The PDFs are useful, readable, and easy to open or download.","Calls to action feel appropriate.","Required edits and launch concerns are identified."].map(text => <label key={text}><input type="checkbox" />{text}</label>)}</fieldset><p className={styles.subtle}>Checkboxes are for your review session only; they are not saved or submitted. Add comments in the accompanying Word document or send your notes to Charlie.</p></section>
    <footer className={styles.footer}>MedicareFAQ · OEP 2027 review package · Private preview only</footer>
  </main>;
}
