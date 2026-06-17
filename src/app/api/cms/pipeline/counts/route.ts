import { NextRequest, NextResponse } from "next/server";
import { getPipelineCounts } from "@/lib/pipeline-db";

export const runtime = "nodejs";

// GET: status counts for the pipeline. Intentionally readable without the CMS
// admin password so external monitoring (e.g. the Relay Engine dashboard) can
// poll it. It exposes only aggregate counts, never content.
export async function GET(_req: NextRequest) {
  try {
    const counts = await getPipelineCounts();
    // Convenience aliases matching the pipeline tab labels.
    return NextResponse.json({
      counts,
      intake: counts.ingested,
      review: counts.briefed,
      queue: counts.approved + counts.producing,
      output: counts.done,
    });
  } catch (error: any) {
    console.error("Pipeline counts error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load pipeline counts" },
      { status: 500 }
    );
  }
}
