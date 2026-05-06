/**
 * heygen-client.ts
 *
 * HeyGen API integration for submitting video generation jobs.
 *
 * STATUS: Stubbed — ready to activate once HEYGEN_API_KEY is set in Vercel.
 *
 * HeyGen API docs: https://docs.heygen.com/reference/video-generate
 *
 * Required environment variables (set in Vercel):
 *   HEYGEN_API_KEY      — Your HeyGen API key (Settings → API in HeyGen dashboard)
 *   HEYGEN_AVATAR_ID    — Avatar ID to use (from HeyGen → Avatars)
 *   HEYGEN_VOICE_ID     — Voice ID to use (from HeyGen → Voices)
 */

export interface HeyGenJobInput {
  script: string;
  title: string;
  /** Optional: override the default avatar */
  avatarId?: string;
  /** Optional: override the default voice */
  voiceId?: string;
}

export interface HeyGenJobResult {
  /** Whether the job was successfully submitted */
  submitted: boolean;
  /** HeyGen video ID — use this to poll for completion */
  videoId?: string;
  /** Error message if submission failed */
  error?: string;
  /** Whether this was a dry-run (API key not configured) */
  dryRun: boolean;
}

export interface HeyGenVideoStatus {
  videoId: string;
  status: "pending" | "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  error?: string;
}

const HEYGEN_API_BASE = "https://api.heygen.com";

/**
 * Returns true if the HeyGen API key is configured and the integration is live.
 */
export function isHeyGenConfigured(): boolean {
  return Boolean(process.env.HEYGEN_API_KEY);
}

/**
 * Submits a video generation job to HeyGen.
 *
 * If HEYGEN_API_KEY is not set, returns a dry-run result so the rest of the
 * pipeline can be tested without a live key.
 */
export async function submitHeyGenJob(
  input: HeyGenJobInput
): Promise<HeyGenJobResult> {
  const apiKey = process.env.HEYGEN_API_KEY;
  const avatarId = input.avatarId ?? process.env.HEYGEN_AVATAR_ID ?? "DEFAULT_AVATAR_ID";
  const voiceId = input.voiceId ?? process.env.HEYGEN_VOICE_ID ?? "DEFAULT_VOICE_ID";

  // ── Dry-run mode (no API key configured) ────────────────────────────────────
  if (!apiKey) {
    console.log("[HeyGen] DRY RUN — HEYGEN_API_KEY not set. Would submit:", {
      title: input.title,
      scriptWordCount: input.script.split(/\s+/).length,
      avatarId,
      voiceId,
    });
    return {
      submitted: false,
      dryRun: true,
      videoId: `dry-run-${Date.now()}`,
    };
  }

  // ── Live submission ──────────────────────────────────────────────────────────
  try {
    const payload = {
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: avatarId,
            avatar_style: "normal",
          },
          voice: {
            type: "text",
            input_text: input.script,
            voice_id: voiceId,
            speed: 1.0,
          },
          background: {
            type: "color",
            value: "#ffffff",
          },
        },
      ],
      dimension: {
        width: 1280,
        height: 720,
      },
      aspect_ratio: "16:9",
      test: false,
      caption: false,
      title: input.title,
    };

    const res = await fetch(`${HEYGEN_API_BASE}/v2/video/generate`, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[HeyGen] API error:", res.status, errorText);
      return {
        submitted: false,
        dryRun: false,
        error: `HeyGen API returned ${res.status}: ${errorText}`,
      };
    }

    const data = await res.json();
    const videoId = data?.data?.video_id ?? data?.video_id;

    if (!videoId) {
      return {
        submitted: false,
        dryRun: false,
        error: "HeyGen did not return a video_id",
      };
    }

    console.log("[HeyGen] Job submitted successfully. Video ID:", videoId);
    return { submitted: true, dryRun: false, videoId };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[HeyGen] Fetch error:", message);
    return { submitted: false, dryRun: false, error: message };
  }
}

/**
 * Polls HeyGen for the status of a previously submitted video job.
 */
export async function getHeyGenVideoStatus(
  videoId: string
): Promise<HeyGenVideoStatus> {
  const apiKey = process.env.HEYGEN_API_KEY;

  if (!apiKey) {
    return { videoId, status: "pending" };
  }

  try {
    const res = await fetch(
      `${HEYGEN_API_BASE}/v1/video_status.get?video_id=${videoId}`,
      {
        headers: { "X-Api-Key": apiKey },
      }
    );

    if (!res.ok) {
      return { videoId, status: "failed", error: `Status ${res.status}` };
    }

    const data = await res.json();
    const info = data?.data ?? data;

    const statusMap: Record<string, HeyGenVideoStatus["status"]> = {
      pending: "pending",
      processing: "processing",
      waiting: "pending",
      completed: "completed",
      failed: "failed",
    };

    return {
      videoId,
      status: statusMap[info.status] ?? "pending",
      videoUrl: info.video_url,
      thumbnailUrl: info.thumbnail_url,
      durationSeconds: info.duration,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { videoId, status: "failed", error: message };
  }
}
