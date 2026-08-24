import { permanentRedirect } from "next/navigation";

/**
 * /medicare-plans redirects to the first sub-page: Medicare Costs.
 * This prevents the 404 when users click "Medicare Plans" in the top nav.
 *
 * Targets the trailing-slash URL directly and uses a permanent (308)
 * redirect so this resolves in a single hop instead of chaining through
 * the app's trailingSlash:true middleware redirect (307 -> 308 -> 200).
 */
export default function MedicarePlansIndex() {
  permanentRedirect("/medicare-plans/costs/");
}
