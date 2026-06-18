/**
 * calendar-db.ts
 *
 * Database helpers for the editorial calendar (article ideas, and later,
 * scheduled pipeline briefs). Uses the same Neon Postgres connection
 * (DATABASE_URL) as heatmap / video_jobs / pipeline. Mirrors pipeline-db.ts.
 *
 * A calendar entry is a standalone idea pinned to a single date. It MAY
 * optionally reference a pipeline item via `pipeline_item_id` — that link is
 * how the future "schedule this brief" flow will attach a queue item to a date.
 *
 * Ownership rule: the calendar entry owns the date. Pipeline status is read
 * separately (for display badges) and is never written back from here, so the
 * two systems can't drift out of sync.
 */

import { randomUUID } from "node:crypto";
import { getDb } from "./heatmap/db";

export type CalendarEntryStatus = "idea" | "scheduled" | "published";

export interface CalendarEntry {
  id: string;
  title: string;
  notes: string;
  category: string;
  entryDate: string; // YYYY-MM-DD
  status: CalendarEntryStatus;
  pipelineItemId: string | null;
  createdAt: string;
  updatedAt: string;
}

let schemaReady = false;

/** Idempotent — safe to call on every request. Creates the table if missing. */
export async function initCalendarSchema() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS calendar_entries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      entry_date DATE NOT NULL,
      status TEXT NOT NULL DEFAULT 'idea',
      pipeline_item_id TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_calendar_entry_date ON calendar_entries(entry_date)`;
  // One date per pipeline item: a given brief can be scheduled at most once.
  // Re-scheduling moves the existing row (UPDATE entry_date), it never inserts.
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_calendar_pipeline_item
    ON calendar_entries(pipeline_item_id)
    WHERE pipeline_item_id IS NOT NULL
  `;
}

/** Ensure the schema exists exactly once per warm serverless instance. */
async function ensureSchema() {
  if (schemaReady) return;
  await initCalendarSchema();
  schemaReady = true;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToEntry(row: any): CalendarEntry {
  // entry_date comes back from the neon driver as a "YYYY-MM-DD" string (or a
  // Date on some configs); normalize to a plain date string either way.
  const rawDate = row.entry_date;
  const entryDate =
    rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : String(rawDate ?? "").slice(0, 10);
  return {
    id: row.id,
    title: row.title ?? "",
    notes: row.notes ?? "",
    category: row.category ?? "",
    entryDate,
    status: (row.status as CalendarEntryStatus) ?? "idea",
    pipelineItemId: row.pipeline_item_id ?? null,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : "",
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : "",
  };
}

/** List entries, optionally bounded to a [from, to] date range (inclusive). */
export async function listCalendarEntries(range?: {
  from?: string;
  to?: string;
}): Promise<CalendarEntry[]> {
  await ensureSchema();
  const sql = getDb();
  const rows =
    range?.from && range?.to
      ? await sql`
          SELECT * FROM calendar_entries
          WHERE entry_date >= ${range.from} AND entry_date <= ${range.to}
          ORDER BY entry_date ASC, created_at ASC
        `
      : await sql`
          SELECT * FROM calendar_entries
          ORDER BY entry_date ASC, created_at ASC
        `;
  return (rows as any[]).map(rowToEntry);
}

export async function createCalendarEntry(input: {
  title: string;
  entryDate: string;
  notes?: string;
  category?: string;
  status?: CalendarEntryStatus;
  pipelineItemId?: string | null;
}): Promise<CalendarEntry> {
  await ensureSchema();
  const sql = getDb();
  const id = randomUUID();
  const status =
    input.status ?? (input.pipelineItemId ? "scheduled" : "idea");
  const rows = await sql`
    INSERT INTO calendar_entries
      (id, title, notes, category, entry_date, status, pipeline_item_id)
    VALUES (
      ${id},
      ${input.title},
      ${input.notes ?? ""},
      ${input.category ?? ""},
      ${input.entryDate},
      ${status},
      ${input.pipelineItemId ?? null}
    )
    RETURNING *
  `;
  return rowToEntry((rows as any[])[0]);
}

/** Partial update. Returns the updated row, or null if no entry has that id. */
export async function updateCalendarEntry(
  id: string,
  updates: Partial<{
    title: string;
    notes: string;
    category: string;
    entryDate: string;
    status: CalendarEntryStatus;
    pipelineItemId: string | null;
  }>
): Promise<CalendarEntry | null> {
  await ensureSchema();
  const sql = getDb();
  const existingRows = (await sql`
    SELECT * FROM calendar_entries WHERE id = ${id} LIMIT 1
  `) as any[];
  if (!existingRows.length) return null;
  const cur = rowToEntry(existingRows[0]);
  const next = {
    title: updates.title ?? cur.title,
    notes: updates.notes ?? cur.notes,
    category: updates.category ?? cur.category,
    entryDate: updates.entryDate ?? cur.entryDate,
    status: updates.status ?? cur.status,
    pipelineItemId:
      updates.pipelineItemId !== undefined
        ? updates.pipelineItemId
        : cur.pipelineItemId,
  };
  const rows = (await sql`
    UPDATE calendar_entries SET
      title = ${next.title},
      notes = ${next.notes},
      category = ${next.category},
      entry_date = ${next.entryDate},
      status = ${next.status},
      pipeline_item_id = ${next.pipelineItemId},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as any[];
  return rowToEntry(rows[0]);
}

export async function deleteCalendarEntry(id: string): Promise<void> {
  await ensureSchema();
  const sql = getDb();
  await sql`DELETE FROM calendar_entries WHERE id = ${id}`;
}
