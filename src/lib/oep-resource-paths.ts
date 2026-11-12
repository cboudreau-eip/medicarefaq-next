// Exact resource-center routes; do not suppress the kit on unrelated Medicare pages.
const OEP_RESOURCE_PATHS = new Set([
  "/medicare-advantage-open-enrollment-resources",
  "/faqs/medicare-advantage-open-enrollment-period",
  "/original-medicare/medicare-enrollment-periods",
  "/blog/key-questions-to-ask-when-comparing-medicare-advantage-plans",
  "/blog/doctors-dropping-medicare",
  "/blog/compare-medicare-advantage-prescriptions-pharmacies",
  "/medicare-plans/costs",
  "/blog/how-to-switch-medicare-advantage-plans",
  "/blog/switching-from-medicare-advantage-to-original-medicare-what-you-need-to-know",
  "/faqs/switch-medicare-advantage-to-medicare-supplement",
  "/blog/missed-medicare-advantage-open-enrollment-deadline"
]);

export function isOepResourcePath(pathname: string | null | undefined): boolean {
  return OEP_RESOURCE_PATHS.has((pathname ?? "").replace(/\/+$/, ""));
}
