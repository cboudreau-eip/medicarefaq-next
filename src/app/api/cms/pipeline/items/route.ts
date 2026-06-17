import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import { listPipelineItems, syncPipelineItems } from "@/lib/pipeline-db";

export const runtime = "nodejs";

// GET: return all pipeline items (replaces localStorage loadItems()).
export async function GET(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listPipelineItems();
    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("Pipeline items GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load pipeline items" },
      { status: 500 }
    );
  }
}

// POST: replace the full set of pipeline items (replaces localStorage saveItems()).
export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];
    await syncPipelineItems(items);
    return NextResponse.json({ success: true, count: items.length });
  } catch (error: any) {
    console.error("Pipeline items POST error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save pipeline items" },
      { status: 500 }
    );
  }
}
