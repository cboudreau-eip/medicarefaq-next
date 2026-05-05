import { NextResponse } from "next/server";
import { initHeatmapSchema } from "@/lib/heatmap/db";

export async function POST(request: Request) {
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
