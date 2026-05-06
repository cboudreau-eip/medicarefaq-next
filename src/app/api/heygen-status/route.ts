import { NextResponse } from "next/server";
import { isHeyGenConfigured } from "@/lib/heygen-client";

/**
 * GET /api/heygen-status
 * Returns whether the HeyGen API key is configured in the environment.
 * Used by the admin video-scripts page to show the correct status badge on load.
 */
export async function GET() {
  return NextResponse.json({ configured: isHeyGenConfigured() });
}
