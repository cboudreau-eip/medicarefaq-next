import { redirect } from "next/navigation";

/**
 * /library redirects to the first sub-page: Guides.
 * This prevents the 404 when users click "Medicare Library" in the top nav.
 */
export default function LibraryIndex() {
  redirect("/library/guides");
}
