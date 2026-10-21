export const DECISION_KIT_CONSENT_VERSION = "2026-10-21-prechecked";
export const DECISION_KIT_CONSENT_TEXT = "Send me Medicare tips and marketing emails from MedicareFAQ / Elite Insurance Partners. Unsubscribe anytime.";

export function decisionKitConsent(value: unknown) {
  return {
    optedIn: value === true,
    recordedAt: new Date().toISOString(),
    source: "/tools/decision-kit/",
    version: DECISION_KIT_CONSENT_VERSION,
    text: DECISION_KIT_CONSENT_TEXT,
    method: "Prechecked checkbox; visitor can uncheck before submitting",
  };
}
