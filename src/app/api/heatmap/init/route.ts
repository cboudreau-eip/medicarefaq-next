import { NextResponse } from "next/server";
import { initHeatmapSchema } from "@/lib/heatmap/db";

const ADMIN_EMAIL = process.env.HEATMAP_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.HEATMAP_ADMIN_PASSWORD ?? "";

function checkAuth(request: Request): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  const email = request.headers.get("x-heatmap-email") ?? "";
  const password = request.headers.get("x-heatmap-password") ?? "";
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
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
