"use client";

import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import styles from "./EmailKitPreview.module.css";

export default function EmailKitPreview() {
  const [submitted, setSubmitted] = useState(false);

  function submitPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Design preview only: never persist or transmit form values.
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <div className={styles.card}>
      <div className={styles.intro}><Mail size={23} aria-hidden="true" /><div><h3>Save it for later</h3><p>Get the complete OEP Plan Review Kit delivered to your inbox.</p></div></div>
      <details className={styles.details}>
        <summary>Email me the kit <Mail size={17} aria-hidden="true" /></summary>
        <div className={styles.panel}>
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
      </details>
    </div>
  );
}
