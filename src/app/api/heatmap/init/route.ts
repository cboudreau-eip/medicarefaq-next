import { NextResponse } from "next/server";
import { initHeatmapSchema } from "@/lib/heatmap/db";

export async function GET() {
  // Debug endpoint — check if env var is loaded (does NOT reveal the value)
  const secret = process.env.HEATMAP_ADMIN_SECRET;
  return NextResponse.json({
    envLoaded: !!secret,
    envLength: secret ? secret.length : 0,
    envFirst3: secret ? secret.substring(0, 3) : null,
  });
}

export async function POST(request: Request) {
  // Simple auth check — require a secret header
  const authHeader = request.headers.get("x-heatmap-secret");
  if (authHeader !== process.env.HEATMAP_ADMIN_SECRET) {
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
