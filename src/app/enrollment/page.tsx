import { redirect } from "next/navigation";

/**
 * /enrollment redirects to the first sub-page: Turning 65 Enrollment.
 * This prevents the 404 when users click "Enrollment" in the top nav.
 */
export default function EnrollmentIndex() {
  redirect("/enrollment/turning-65");
}
