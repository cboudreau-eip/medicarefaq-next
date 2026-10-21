export const DECISION_KIT_CONSENT_VERSION = "2026-10-21";
export const DECISION_KIT_CONSENT_TEXT = "Yes, send me Medicare tips, enrollment reminders, and information about insurance options from MedicareFAQ, powered by Elite Insurance Partners. I can unsubscribe at any time.";

export function decisionKitConsent(value: unknown) {
  return {
    optedIn: value === true,
    recordedAt: new Date().toISOString(),
    source: "/tools/decision-kit/",
    version: DECISION_KIT_CONSENT_VERSION,
    text: DECISION_KIT_CONSENT_TEXT,
  };
}
