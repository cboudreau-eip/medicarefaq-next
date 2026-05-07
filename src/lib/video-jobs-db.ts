/**
 * video-jobs-db.ts
 *
 * Database helpers for tracking HeyGen video generation jobs.
 * Uses the same Neon Postgres connection as the heatmap feature.
 */

import { getDb } from "./heatmap/db";

export type VideoJobStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "unknown";

export interface VideoJob {
  id: number;
  heygen_video_id: string | null;
  article_slug: string;
  article_title: string;
  article_url: string;
  script: string | null;
  status: VideoJobStatus;
  triggered_by: "manual" | "github_action" | "publish";
  video_url: string | null;
  thumbnail_url: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export async function initVideoJobsSchema() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS video_jobs (
      id SERIAL PRIMARY KEY,
      heygen_video_id TEXT,
      article_slug TEXT NOT NULL,
      article_title TEXT NOT NULL,
      article_url TEXT NOT NULL DEFAULT '',
      script TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      triggered_by TEXT NOT NULL DEFAULT 'manual',
      video_url TEXT,
      thumbnail_url TEXT,
      error_message TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export async function createVideoJob(params: {
  heygenVideoId: string | null;
  articleSlug: string;
  articleTitle: string;
  articleUrl: string;
  script: string | null;
  status: VideoJobStatus;
  triggeredBy: "manual" | "github_action" | "publish";
}): Promise<VideoJob> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO video_jobs
      (heygen_video_id, article_slug, article_title, article_url, script, status, triggered_by)
    VALUES
      (${params.heygenVideoId}, ${params.articleSlug}, ${params.articleTitle},
       ${params.articleUrl}, ${params.script}, ${params.status}, ${params.triggeredBy})
    RETURNING *
  `;
  return rows[0] as VideoJob;
}

export async function updateVideoJob(
  id: number,
  updates: Partial<{
    heygenVideoId: string;
    status: VideoJobStatus;
    videoUrl: string;
    thumbnailUrl: string;
    errorMessage: string;
  }>
): Promise<void> {
  const sql = getDb();
  // Build update fields dynamically
  if (updates.heygenVideoId !== undefined) {
    await sql`UPDATE video_jobs SET heygen_video_id = ${updates.heygenVideoId}, updated_at = NOW() WHERE id = ${id}`;
  }
  if (updates.status !== undefined) {
    await sql`UPDATE video_jobs SET status = ${updates.status}, updated_at = NOW() WHERE id = ${id}`;
  }
  if (updates.videoUrl !== undefined) {
    await sql`UPDATE video_jobs SET video_url = ${updates.videoUrl}, updated_at = NOW() WHERE id = ${id}`;
  }
  if (updates.thumbnailUrl !== undefined) {
    await sql`UPDATE video_jobs SET thumbnail_url = ${updates.thumbnailUrl}, updated_at = NOW() WHERE id = ${id}`;
  }
  if (updates.errorMessage !== undefined) {
    await sql`UPDATE video_jobs SET error_message = ${updates.errorMessage}, updated_at = NOW() WHERE id = ${id}`;
  }
}

export async function listVideoJobs(limit = 50): Promise<VideoJob[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM video_jobs
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as VideoJob[];
}

export async function getVideoJobByHeygenId(
  heygenVideoId: string
): Promise<VideoJob | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM video_jobs WHERE heygen_video_id = ${heygenVideoId} LIMIT 1
  `;
  return (rows[0] as VideoJob) ?? null;
}

export async function getPendingVideoJobs(): Promise<VideoJob[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM video_jobs
    WHERE status IN ('pending', 'processing')
    ORDER BY created_at ASC
  `;
  return rows as VideoJob[];
}
