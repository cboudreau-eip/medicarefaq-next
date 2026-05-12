import { NextRequest, NextResponse } from "next/server";
import {
  listVideoJobs,
  getPendingVideoJobs,
  updateVideoJob,
  initVideoJobsSchema,
  type VideoJobStatus,
} from "@/lib/video-jobs-db";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY ?? "";
const WEBHOOK_SECRET = process.env.ZAPIER_WEBHOOK_SECRET ?? "";

/**
 * GET /api/video-jobs
 *
 * Returns the list of all video jobs, and syncs status for any
 * pending/processing jobs from the HeyGen API.
 */
export async function GET(request: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  if (WEBHOOK_SECRET) {
    const incomingSecret = request.headers.get("x-medicarefaq-secret") ?? "";
    if (incomingSecret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    await initVideoJobsSchema();

    // Sync status of pending/processing jobs from HeyGen
    if (HEYGEN_API_KEY) {
      try {
        const pendingJobs = await getPendingVideoJobs();
        await Promise.all(
          pendingJobs
            .filter((job) => job.heygen_video_id)
            .map(async (job) => {
              try {
                const res = await fetch(
                  `https://api.heygen.com/v1/video_status.get?video_id=${job.heygen_video_id}`,
                  {
                    headers: {
                      "X-Api-Key": HEYGEN_API_KEY,
                      Accept: "application/json",
                    },
                  }
                );
                if (!res.ok) return;
                const data = await res.json();
                const videoData = data?.data;
                if (!videoData) return;

                const heygenStatus: string = videoData.status ?? "unknown";

                // Map HeyGen status to our status enum
                let newStatus: VideoJobStatus = "unknown";
                if (heygenStatus === "completed") newStatus = "completed";
                else if (heygenStatus === "processing" || heygenStatus === "pending")
                  newStatus = "processing";
                else if (heygenStatus === "failed") newStatus = "failed";

                const updates: Parameters<typeof updateVideoJob>[1] = {
                  status: newStatus,
                };

                if (videoData.video_url) {
                  updates.videoUrl = videoData.video_url;
                }
                if (videoData.thumbnail_url) {
                  updates.thumbnailUrl = videoData.thumbnail_url;
                }

                await updateVideoJob(job.id, updates);
              } catch (e) {
                console.error(
                  `[video-jobs] Failed to sync job ${job.id}:`,
                  e
                );
              }
            })
        );
      } catch (e) {
        console.error("[video-jobs] Failed to sync pending jobs:", e);
      }
    }

    // Return the updated list
    const jobs = await listVideoJobs(100);
    return NextResponse.json({ success: true, jobs });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[video-jobs] Error:", message);
    return NextResponse.json(
      { error: "Failed to fetch video jobs", details: message },
      { status: 500 }
    );
  }
}
