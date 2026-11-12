"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2, FileText, Download } from "lucide-react";
import styles from "./EmailKitPreview.module.css";

export default function EmailKitPreview() {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  function submitPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Design preview only: never persist or transmit form values.
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <div className={styles.card}>
      <FileText size={28} className={styles.kitIcon} aria-hidden="true" />
      <div className={styles.intro}><h3>Get the Complete OEP Plan Review Kit</h3><p>All four worksheets in one PDF, with clickable contents and bookmarks. Email it to yourself for later, or download it now—no signup required to download.</p><p className={styles.meta}>11 pages · PDF · 28.3 KB · Review draft</p></div>
      <div className={styles.actions}>
        <button type="button" className={styles.emailButton} aria-expanded={open} aria-controls="oep-email-kit-panel" onClick={() => setOpen(!open)}><Mail size={18} aria-hidden="true" /> Email Me the Kit</button>
        <a className={styles.downloadButton} href="/medicarefaq-ma-oep-plan-review-kit.pdf?download=1" download><Download size={18} aria-hidden="true" /> Download Now</a>
        <a className={styles.openLink} href="/medicarefaq-ma-oep-plan-review-kit.pdf" target="_blank" rel="noopener noreferrer">Open PDF (new tab)</a>
      </div>
        <div id="oep-email-kit-panel" className={styles.panel} hidden={!open}>
          {submitted ? <div role="status" className={styles.confirmation}>
            <CheckCircle2 size={25} aria-hidden="true" /><h4>Preview complete</h4>
            <p>No email was sent and your information wasn’t saved. You can still open the kit now.</p>
            <a href="/medicarefaq-ma-oep-plan-review-kit.pdf" target="_blank" rel="noopener noreferrer">Open the Kit <span>(new tab)</span></a>
            <button className={styles.reset} type="button" onClick={() => setSubmitted(false)}>Try the form again</button>
          </div> : <form onSubmit={submitPreview}>
            <p className={styles.notice}>Design preview only · No emails will be sent. Use sample information.</p>
            <div className={styles.fields}>
              <label htmlFor="oep-kit-email">Email address <span>(required)</span><input id="oep-kit-email" type="email" required autoComplete="off" placeholder="you@example.com" maxLength={254} data-ph-no-capture /></label>
              <label htmlFor="oep-kit-name">First name <span>(optional)</span><input id="oep-kit-name" type="text" autoComplete="off" placeholder="Your first name" maxLength={50} data-ph-no-capture /></label>
            </div>
            <label className={styles.preference}><input type="checkbox" /><span>Send me Medicare tips, helpful articles, and enrollment reminders from MedicareFAQ / Elite Insurance Partners. Unsubscribe anytime.</span></label>
            <div className={styles.footer}><button type="submit">Send My Kit <Mail size={16} aria-hidden="true" /></button><p>Email updates are optional. <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p></div>
          </form>}
        </div>
    </div>
  );
}
