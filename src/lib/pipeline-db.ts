/**
 * pipeline-db.ts
 *
 * Database helpers for the content pipeline (Intake → Review → Queue → Output).
 * Replaces the old browser-localStorage storage so pipeline state is shared,
 * durable, and readable by external tools (e.g. the Relay Engine dashboard).
 *
 * Uses the same Neon Postgres connection (DATABASE_URL) as video_jobs / heatmap.
 * Mirrors the structure of video-jobs-db.ts.
 */

import { getDb } from "./heatmap/db";

export type PipelineStatus =
  | "ingested"
  | "briefed"
  | "approved"
  | "rejected"
  | "producing"
  | "done"
  | "failed";

export interface PipelineSeo {
  suggestedTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  semanticKeywords: string[];
  contentAngle: string;
}

export interface PipelineBrief {
  title: string;
  keyword: string;
  secondaryKeywords: string[];
  wordCount: number;
  linkCount: number;
  description: string;
  category: string;
}

/** Camel-cased item shape, identical to what the admin page already uses. */
export interface PipelineItem {
  id: string;
  status: PipelineStatus;
  sourceTitle: string;
  sourceUrl: string;
  sourceCategory: string;
  sourceSnippet: string;
  sourceSeo: PipelineSeo;
  topic: string;
  importanceScore: number;
  ingestedAt: string;
  brief?: PipelineBrief;
  briefGeneratedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  producedAt?: string;
  draftSlug?: string;
  error?: string;
}

let schemaReady = false;

/** Idempotent — safe to call on every request. Creates the table if missing. */
export async function initPipelineSchema() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS pipeline_items (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'ingested',
      source_title TEXT,
      source_url TEXT,
      source_category TEXT,
      source_snippet TEXT,
      source_seo JSONB,
      topic TEXT,
      importance_score REAL DEFAULT 0,
      brief JSONB,
      draft_slug TEXT,
      error TEXT,
      ingested_at TIMESTAMP WITH TIME ZONE,
      brief_generated_at TIMESTAMP WITH TIME ZONE,
      approved_at TIMESTAMP WITH TIME ZONE,
      rejected_at TIMESTAMP WITH TIME ZONE,
      produced_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_pipeline_status ON pipeline_items(status)`;
}

/** Ensure the schema exists exactly once per warm serverless instance. */
async function ensureSchema() {
  if (schemaReady) return;
  await initPipelineSchema();
  schemaReady = true;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToItem(row: any): PipelineItem {
  return {
    id: row.id,
    status: row.status,
    sourceTitle: row.source_title ?? "",
    sourceUrl: row.source_url ?? "",
    sourceCategory: row.source_category ?? "",
    sourceSnippet: row.source_snippet ?? "",
    sourceSeo: row.source_seo ?? {
      suggestedTitle: "",
      metaDescription: "",
      primaryKeyword: "",
      semanticKeywords: [],
      contentAngle: "",
    },
    topic: row.topic ?? "",
    importanceScore: Number(row.importance_score ?? 0),
    ingestedAt: row.ingested_at ? new Date(row.ingested_at).toISOString() : "",
    brief: row.brief ?? undefined,
    briefGeneratedAt: row.brief_generated_at
      ? new Date(row.brief_generated_at).toISOString()
      : undefined,
    approvedAt: row.approved_at ? new Date(row.approved_at).toISOString() : undefined,
    rejectedAt: row.rejected_at ? new Date(row.rejected_at).toISOString() : undefined,
    producedAt: row.produced_at ? new Date(row.produced_at).toISOString() : undefined,
    draftSlug: row.draft_slug ?? undefined,
    error: row.error ?? undefined,
  };
}

export async function listPipelineItems(): Promise<PipelineItem[]> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`SELECT * FROM pipeline_items ORDER BY ingested_at DESC NULLS LAST`;
  return (rows as any[]).map(rowToItem);
}

/** Just the ids — used by the ingest route for server-side dedup. */
export async function getPipelineItemIds(): Promise<string[]> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`SELECT id FROM pipeline_items`;
  return (rows as any[]).map((r) => r.id);
}

/** Status → count map, for dashboards (this tool and Relay Engine). */
export async function getPipelineCounts(): Promise<Record<PipelineStatus, number>> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql`SELECT status, COUNT(*)::int AS cnt FROM pipeline_items GROUP BY status`;
  const counts: Record<PipelineStatus, number> = {
    ingested: 0,
    briefed: 0,
    approved: 0,
    rejected: 0,
    producing: 0,
    done: 0,
    failed: 0,
  };
  for (const r of rows as any[]) {
    if (r.status in counts) counts[r.status as PipelineStatus] = Number(r.cnt);
  }
  return counts;
}

async function upsertPipelineItem(item: PipelineItem): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO pipeline_items (
      id, status, source_title, source_url, source_category, source_snippet,
      source_seo, topic, importance_score, brief, draft_slug, error,
      ingested_at, brief_generated_at, approved_at, rejected_at, produced_at, updated_at
    ) VALUES (
      ${item.id},
      ${item.status},
      ${item.sourceTitle ?? ""},
      ${item.sourceUrl ?? ""},
      ${item.sourceCategory ?? ""},
      ${item.sourceSnippet ?? ""},
      ${JSON.stringify(item.sourceSeo ?? null)}::jsonb,
      ${item.topic ?? ""},
      ${item.importanceScore ?? 0},
      ${item.brief ? JSON.stringify(item.brief) : null}::jsonb,
      ${item.draftSlug ?? null},
      ${item.error ?? null},
      ${item.ingestedAt || null},
      ${item.briefGeneratedAt || null},
      ${item.approvedAt || null},
      ${item.rejectedAt || null},
      ${item.producedAt || null},
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      status = EXCLUDED.status,
      source_title = EXCLUDED.source_title,
      source_url = EXCLUDED.source_url,
      source_category = EXCLUDED.source_category,
      source_snippet = EXCLUDED.source_snippet,
      source_seo = EXCLUDED.source_seo,
      topic = EXCLUDED.topic,
      importance_score = EXCLUDED.importance_score,
      brief = EXCLUDED.brief,
      draft_slug = EXCLUDED.draft_slug,
      error = EXCLUDED.error,
      ingested_at = EXCLUDED.ingested_at,
      brief_generated_at = EXCLUDED.brief_generated_at,
      approved_at = EXCLUDED.approved_at,
      rejected_at = EXCLUDED.rejected_at,
      produced_at = EXCLUDED.produced_at,
      updated_at = NOW()
  `;
}

/**
 * Replace the entire pipeline with the provided set of items (mirrors the old
 * localStorage "save the whole array" semantics, but server-side and durable).
 * Upserts every provided item, then deletes any rows no longer present.
 */
export async function syncPipelineItems(items: PipelineItem[]): Promise<void> {
  await ensureSchema();
  const sql = getDb();

  for (const item of items) {
    await upsertPipelineItem(item);
  }

  const keepIds = new Set(items.map((i) => i.id));
  const existing = (await sql`SELECT id FROM pipeline_items`) as any[];
  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await sql`DELETE FROM pipeline_items WHERE id = ${row.id}`;
    }
  }
}
