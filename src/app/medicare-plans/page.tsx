import { redirect } from "next/navigation";

/**
 * /medicare-plans redirects to the first sub-page: Medicare Costs.
 * This prevents the 404 when users click "Medicare Plans" in the top nav.
 */
export default function MedicarePlansIndex() {
  redirect("/medicare-plans/costs");
}
