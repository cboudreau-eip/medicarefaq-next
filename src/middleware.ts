import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Single gate for all admin-facing surfaces.
 *
 * The CMS (content editor, AI pipeline, editorial calendar) plus the admin
 * dashboards (heatmap, chat-logs, video-scripts) must be completely unreachable
 * on the public production deployment, and reachable only on the separate
 * firewalled deployment. This is controlled by one server-side env var.
 *
 * Fail-closed: ONLY the exact string "true" enables the CMS. A missing or
 * mistyped value (e.g. "True", "1", "yes") leaves everything disabled.
 *
 * Note: this flag is NOT a network firewall — it only flips the app-level gate.
 * The enabled deployment still needs network-level protection (Vercel
 * Deployment Protection / Trusted IPs / a real firewall) to be truly private.
 *
 * Public tracking endpoints (/api/heatmap/track, the base /api/chat-log POST,
 * and the /init bootstraps) are intentionally NOT matched here so the public
 * site keeps recording analytics regardless of the flag. Only the admin /data
 * read endpoints are gated.
 */
export function middleware(_req: NextRequest) {
  if (process.env.ENABLE_CMS !== "true") {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // github-editor, heatmap, chat-logs, video-scripts UIs
    "/api/cms/:path*", // all CMS APIs
    "/api/video-jobs/:path*", // HeyGen video job webhook/reads (CMS-driven)
    "/api/heatmap/data/:path*", // admin dashboard READ only
    "/api/chat-log/data/:path*", // admin dashboard READ only
  ],
};
