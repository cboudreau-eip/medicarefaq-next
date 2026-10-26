/** Legacy URLs verified by the October 13, 2026 crawl repair.
 * Null entries have no verified equivalent; related cards for them are omitted.
 */
export const BROKEN_LINK_REPAIRS: Readonly<Record<string, string | null>> = {
  // October 26 audit: also protects legacy related-card slugs and old bookmarks.
  "/faqs/medicare-advantage-costs": "/medicare-part-c/medicare-advantage-costs/",
  "/faqs/medigap-supplement-open-enrollment": "/faqs/medicare-supplement-open-enrollment/",
  "/faqs/medicare-supplement-vs-medicare-advantage": "/medicare-plans/supplement-vs-advantage/",
  "/faqs/does-medicare-cover-physical-therapy": "/faqs/medicare-coverage-for-physical-therapy/",
  "/blog/maryland-birthday-rule": "/blog/maryland-medicare-supplement-birthday-rule/",
  "/faqs/medicare-agents-near-me": null,
  "/faqs/does-medicare-cover-bathroom-safety-devices": "/faqs/medicare-coverage-for-bathroom-safety-devices/",
  "/faqs/medicare-long-term-care": "/blog/does-medicare-include-long-term-care-common-misunderstanding/",
  "/faqs/does-medicare-cover-vision": "/faqs/medicare-vision-care-coverage/",
  "/faqs/medicare-dental-coverage": "/faqs/what-dental-expenses-does-medicare-cover/",
  "/faqs/medicare-advantage-benefits": "/faqs/medicare-advantage-extra-benefits-explained-whats-really-included/",
  "/faqs/medicare-part-a-trust-fund": "/faqs/how-is-medicare-funded/",
  "/blog/medicare-and-self-employment-tax-planning": null,
  "/faqs/does-medicare-cover-dental": "/faqs/what-dental-expenses-does-medicare-cover/",
  "/faqs/medicare-supplement-plan-g-benefits": "/medicare-supplement-plans/plan-g/",
  "/faqs/does-medicare-cover-wound-care": null,
  "/medicare-part-c/medicare-advantage-enrollment": "/medicare-part-c/medicare-advantage-enrollment-periods/",
  "/medicare-part-c/medicare-advantage-give-back-benefit": "/faqs/medicare-part-b-give-back-plan/",
  "/faqs/what-is-medicare-advantage": "/medicare-part-c/medicare-advantage-plans/",
  "/medicare-enrollment/special-enrollment-periods": "/faqs/medicare-special-enrollment-periods/",
  "/enrollment": "/original-medicare/medicare-enrollment-periods/",
  "/medicare-enrollment/employer-coverage": "/faqs/medicare-and-employer-coverage/",
  "/blog/when-should-you-enroll-in-medicare-if-still-working": "/faqs/when-should-you-enroll-in-medicare-if-still-working/",
  "/faqs/medicare-cobra": "/blog/understanding-cobra-and-medigap-coverage-costs-and-key-differences/",
  "/faqs/native-american-health-and-medicare": null,
  "/faqs/what-to-know-about-medicare-at-64": "/new-to-medicare/turning-65/",
  "/faqs/top-5-dental-insurance-for-seniors": "/faqs/dental-and-vision-insurance-for-seniors/",
  "/faqs/what-does-medicare-part-b-cover": "/original-medicare/medicare-parts/medicare-part-b/",
  "/medicare-enrollment-periods": "/original-medicare/medicare-enrollment-periods/",
  "/medicare-supplement": "/medicare-supplement-plans/",
  "/medicare-plans/advantage": "/medicare-part-c/medicare-advantage-plans/",
  "/faqs/4-critical-medicare-changes-in-2026-what-you-need-to-know": "/faqs/medicare-changes/",
  "/faqs/can-you-be-denied-a-medicare-supplement-plan": "/blog/pass-medigap-underwriting/",
  "/faqs/medicare-costs-2025": null,
  "/faqs/medicare-evidence-of-coverage": null,
  "/faqs/medicare-part-d-explained": "/original-medicare/medicare-parts/medicare-part-d/",
  "/faqs/medicare-appeals-process": "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-exceptions-and-appeals/",
  "/faqs/medicare-for-dummies": "/medicare-101/",
  "/faqs/extra-help-low-income-subsidy": "/faqs/medicare-extra-help-program/",
  "/faqs/medicare-savings-programs/faq": "/faqs/medicare-savings-programs/",
  "/faqs/medicare-eligibility-requirements": "/original-medicare/medicare-eligibility/",
  "/faqs/what-are-medicare-savings-programs": "/faqs/medicare-savings-programs/",
  "/faqs/what-is-a-medicare-supplement-insurance-plan": "/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/",
  "/faqs/medicare-enrollment-periods": "/original-medicare/medicare-enrollment-periods/",
  "/faqs/understanding-medicare-assignment-what-it-means-for-your-costs": "/faqs/what-is-medicare-assignment/",
  "/blog/understanding-your-medicare-part-d-formulary-a-2026-guide-to-prescription-drug-coverage": "/faqs/what-is-a-medicare-part-d-formulary/",
  "/faqs/eliquis-cost-with-medicare": null,
  "/faqs/what-is-a-dual-eligible-special-needs-plan": "/blog/dual-eligible-special-needs-plans-dsnp-explained/",
  "/faqs/best-medicare-advantage-plans": "/medicare-part-c/medicare-advantage-plans/",
  "/faqs/what-does-medicare-supplement-plan-f-cover": "/medicare-supplement-plans/plan-f/",
  "/faqs/medicare-supplement-plan-f-vs-plan-g-vs-plan-n": "/medicare-supplement-plans/compare/",
  "/blog/medicare-costs-in-2026-premiums-deductibles-and-key-changes": "/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes/",
  "/faqs/medicare-supplement-plan-n": "/medicare-supplement-plans/plan-n/",
  "/faqs/finding-local-doctors-who-accept-medicare": null,
  "/faqs/does-medicare-cover-hospice-care": "/faqs/does-medicare-cover-hospice/",
  "/faqs/medicare-advantage-annual-enrollment-period-aep-dates": "/blog/medicare-advantage-annual-enrollment-period-aep-dates/",
  "/faqs/medicare-part-d-prescription-drug-coverage": "/original-medicare/medicare-parts/medicare-part-d/",
  "/faqs/moving-to-another-state-with-medicare": "/faqs/what-to-do-with-medicare-if-youre-moving-medicare-change-of-address/",
  "/faqs/medicare-supplement-plans": "/medicare-supplement-plans/",
  "/faqs/six-protected-classes": "/faqs/medicare-part-d-six-protected-classes/",
  "/faqs/medicare-inpatient-vs-outpatient-vs-under-observation": "/blog/observation-vs-inpatient-why-it-can-affect-your-medicare-bill/",
  "/faqs/how-dual-residency-and-medicare-works": null,
  "/faqs/what-is-original-medicare": "/original-medicare/",
  "/faqs/medicare-and-wound-care-coverage": null
};

/** Resolve only reviewed legacy URLs. Preserve other URLs and query/fragment suffixes. */
export function repairInternalHref(href: string): string | null {
  const match = href.match(/^(https?:\/\/www\.medicarefaq\.com)?(\/[^?#]*)([?#].*)?$/);
  if (!match) return href;
  const path = match[2].replace(/\/$/, "");
  if (!Object.prototype.hasOwnProperty.call(BROKEN_LINK_REPAIRS, path)) return href;
  const destination = BROKEN_LINK_REPAIRS[path];
  return destination === null ? null : `${match[1] || ""}${destination}${match[3] || ""}`;
}
