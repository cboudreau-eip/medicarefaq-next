import { NextResponse } from "next/server";
import { initHeatmapSchema } from "@/lib/heatmap/db";

const HEATMAP_SECRET = process.env.HEATMAP_ADMIN_SECRET ?? "";

function checkAuth(request: Request): boolean {
  if (!HEATMAP_SECRET) return false; // No secret configured = locked out
  const incoming = request.headers.get("x-heatmap-secret") ?? "";
  return incoming === HEATMAP_SECRET;
}

export async function POST(request: Request) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initHeatmapSchema();
    return NextResponse.json({ success: true, message: "Schema initialized" });
  } catch (error) {
    console.error("Schema init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize schema" },
      { status: 500 }
    );
  }
}
