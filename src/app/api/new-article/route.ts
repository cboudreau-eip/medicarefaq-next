import { NextRequest, NextResponse } from "next/server";
import {
  generateVideoScript,
  extractPlainText,
} from "@/lib/video-script-generator";
import { submitHeyGenJob, isHeyGenConfigured } from "@/lib/heygen-client";
import {
  createVideoJob,
  updateVideoJob,
  initVideoJobsSchema,
} from "@/lib/video-jobs-db";

/**
 * POST /api/new-article
 *
 * Accepts a JSON payload describing a newly published article and:
 *   1. Forwards the article metadata to the Zapier webhook
 *   2. Generates a 2-minute video script using the Forge LLM
 *   3. Optionally submits the script to HeyGen (when HEYGEN_API_KEY is set)
 *   4. Records the job in the video_jobs database table
 */

const ZAPIER_WEBHOOK_URL =
  process.env.ZAPIER_WEBHOOK_URL ??
  "https://hooks.zapier.com/hooks/catch/27503867/4y2rqhz/";

const WEBHOOK_SECRET = process.env.ZAPIER_WEBHOOK_SECRET ?? "";

export async function POST(request: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  if (WEBHOOK_SECRET) {
    const incomingSecret = request.headers.get("x-medicarefaq-secret") ?? "";
    if (incomingSecret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    title,
    slug,
    url,
    author,
    date,
    category,
    excerpt,
    bodyText,
    generateScript = true,
    submitToHeyGen = true,
  } = body as {
    title?: string;
    slug?: string;
    url?: string;
    author?: string;
    date?: string;
    category?: string;
    excerpt?: string;
    bodyText?: string;
    generateScript?: boolean;
    submitToHeyGen?: boolean;
  };

  // ── Validate required fields ─────────────────────────────────────────────────
  if (!title || !slug) {
    return NextResponse.json(
      { error: "Missing required fields: title, slug" },
      { status: 400 }
    );
  }

  const canonicalUrl =
    url ?? `https://www.medicarefaq.com/faqs/${slug}/`;
  const publishDate =
    date ?? new Date().toISOString().split("T")[0];

  // ── Ensure DB schema exists ──────────────────────────────────────────────────
  try {
    await initVideoJobsSchema();
  } catch (e) {
    console.error("[new-article] Schema init failed:", e);
  }

  // ── Build the Zapier payload ─────────────────────────────────────────────────
  const zapierPayload = {
    title,
    slug,
    url: canonicalUrl,
    author: author ?? "David Haass",
    date: publishDate,
    category: category ?? "article",
    excerpt: excerpt ?? "",
    published_at: new Date().toISOString(),
    source: "medicarefaq-next",
  };

  // ── Step 1: Forward to Zapier ────────────────────────────────────────────────
  let zapierSuccess = false;
  let zapierError: string | null = null;
  try {
    const zapierRes = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zapierPayload),
    });

    if (!zapierRes.ok) {
      const text = await zapierRes.text();
      zapierError = `Zapier returned ${zapierRes.status}: ${text}`;
      console.error("[new-article] Zapier error:", zapierError);
    } else {
      zapierSuccess = true;
    }
  } catch (err) {
    zapierError = err instanceof Error ? err.message : String(err);
    console.error("[new-article] Zapier fetch failed:", zapierError);
  }

  // ── Step 2: Generate video script ────────────────────────────────────────────
  let scriptResult = null;
  let scriptError: string | null = null;
  let jobId: number | null = null;

  if (generateScript) {
    // Create a pending job record
    try {
      const job = await createVideoJob({
        heygenVideoId: null,
        articleSlug: slug ?? "",
        articleTitle: title ?? "",
        articleUrl: canonicalUrl,
        script: null,
        status: "pending",
        triggeredBy: "github_action",
      });
      jobId = job.id;
    } catch (e) {
      console.error("[new-article] Failed to create job record:", e);
    }

    try {
      scriptResult = await generateVideoScript({
        title: title ?? "",
        slug: slug ?? "",
        category: category ?? "Medicare",
        excerpt: excerpt ?? "",
        bodyText: extractPlainText(bodyText ?? excerpt ?? ""),
      });

      // Fire-and-forget: notify Zapier with the script
      const scriptPayload = {
        ...zapierPayload,
        event: "video_script_ready",
        video_script: scriptResult.script,
        script_word_count: scriptResult.wordCount,
        script_duration_seconds: scriptResult.estimatedDurationSeconds,
      };
      fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scriptPayload),
      }).catch((e) =>
        console.error("[new-article] Script Zapier notify failed:", e)
      );
    } catch (err) {
      scriptError = err instanceof Error ? err.message : String(err);
      console.error("[new-article] Script generation failed:", scriptError);

      if (jobId) {
        try {
          await updateVideoJob(jobId, {
            status: "failed",
            errorMessage: scriptError,
          });
        } catch (e) {
          console.error("[new-article] Failed to mark job failed:", e);
        }
      }
    }
  }

  // ── Step 3: Submit to HeyGen ─────────────────────────────────────────────────
  let heygenResult = null;
  if (scriptResult && (submitToHeyGen || isHeyGenConfigured())) {
    try {
      heygenResult = await submitHeyGenJob({
        script: scriptResult.script,
        title: title ?? "",
      });

      if (jobId && heygenResult?.videoId) {
        await updateVideoJob(jobId, {
          heygenVideoId: heygenResult.videoId,
          status: "processing",
        });
      }
    } catch (err) {
      const heygenError = err instanceof Error ? err.message : String(err);
      console.error("[new-article] HeyGen submission failed:", heygenError);
      if (jobId) {
        try {
          await updateVideoJob(jobId, {
            status: "failed",
            errorMessage: heygenError,
          });
        } catch (e) {
          console.error("[new-article] Failed to update job on HeyGen error:", e);
        }
      }
    }
  } else if (jobId && scriptResult) {
    // Script generated but HeyGen not configured
    try {
      await updateVideoJob(jobId, { status: "completed" });
    } catch (e) {
      console.error("[new-article] Failed to mark job completed:", e);
    }
  }

  // ── Response ─────────────────────────────────────────────────────────────────
  return NextResponse.json({
    success: true,
    jobId,
    zapier: { success: zapierSuccess, error: zapierError },
    script: scriptResult,
    scriptError,
    heygen: heygenResult,
    heygenConfigured: isHeyGenConfigured(),
    forwarded: zapierPayload,
  });
}
