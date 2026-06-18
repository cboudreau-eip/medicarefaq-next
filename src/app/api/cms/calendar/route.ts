import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import { listCalendarEntries, createCalendarEntry } from "@/lib/calendar-db";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET: list calendar entries. Optional ?from=YYYY-MM-DD&to=YYYY-MM-DD bounds
// the result to the visible month grid.
export async function GET(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;
    const entries = await listCalendarEntries(from && to ? { from, to } : undefined);
    return NextResponse.json({ entries });
  } catch (error: any) {
    console.error("Calendar GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load calendar entries" },
      { status: 500 }
    );
  }
}

// POST: create a calendar entry. `pipelineItemId` is optional — when present,
// the entry represents a scheduled pipeline brief rather than a freeform idea.
export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const entryDate = typeof body.entryDate === "string" ? body.entryDate.trim() : "";

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    if (!DATE_RE.test(entryDate)) {
      return NextResponse.json(
        { error: "entryDate must be a YYYY-MM-DD string" },
        { status: 400 }
      );
    }

    const entry = await createCalendarEntry({
      title,
      entryDate,
      notes: typeof body.notes === "string" ? body.notes : "",
      category: typeof body.category === "string" ? body.category : "",
      pipelineItemId:
        typeof body.pipelineItemId === "string" ? body.pipelineItemId : null,
    });
    return NextResponse.json({ entry }, { status: 201 });
  } catch (error: any) {
    console.error("Calendar POST error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create calendar entry" },
      { status: 500 }
    );
  }
}
