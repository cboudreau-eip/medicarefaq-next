import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import { updateCalendarEntry, deleteCalendarEntry } from "@/lib/calendar-db";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// PATCH: update an entry (edit fields, or move it to another date).
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const updates: Record<string, unknown> = {};

    if (typeof body.title === "string") updates.title = body.title.trim();
    if (typeof body.notes === "string") updates.notes = body.notes;
    if (typeof body.category === "string") updates.category = body.category;
    if (typeof body.status === "string") updates.status = body.status;
    if (typeof body.entryDate === "string") {
      const d = body.entryDate.trim();
      if (!DATE_RE.test(d)) {
        return NextResponse.json(
          { error: "entryDate must be a YYYY-MM-DD string" },
          { status: 400 }
        );
      }
      updates.entryDate = d;
    }
    if (body.pipelineItemId === null || typeof body.pipelineItemId === "string") {
      updates.pipelineItemId = body.pipelineItemId;
    }

    const entry = await updateCalendarEntry(id, updates);
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ entry });
  } catch (error: any) {
    console.error("Calendar PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update calendar entry" },
      { status: 500 }
    );
  }
}

// DELETE: remove an entry.
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteCalendarEntry(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Calendar DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete calendar entry" },
      { status: 500 }
    );
  }
}
