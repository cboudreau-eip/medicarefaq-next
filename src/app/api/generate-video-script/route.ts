import { NextRequest, NextResponse } from "next/server";
import {
  generateVideoScript,
  extractPlainText,
  type ArticleSummaryInput,
} from "@/lib/video-script-generator";
import { submitHeyGenJob, isHeyGenConfigured } from "@/lib/heygen-client";
import {
  createVideoJob,
  updateVideoJob,
  initVideoJobsSchema,
} from "@/lib/video-jobs-db";

/**
 * POST /api/generate-video-script
 *
 * Accepts article data, generates a 2-minute video script using the Forge LLM,
 * and optionally submits it to HeyGen if the API key is configured.
 *
 * Request body:
 * {
 *   title:       string  — Article headline
 *   slug:        string  — URL slug
 *   category:    string  — Article category
 *   excerpt:     string  — Short description
 *   bodyText:    string  — Plain text body content (or HTML, will be stripped)
 *   submitToHeyGen?: boolean  — Whether to submit to HeyGen after generating (default: false)
 * }
 */

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, slug, category, excerpt, bodyText, submitToHeyGen } =
    body as {
      title?: string;
      slug?: string;
      category?: string;
      excerpt?: string;
      bodyText?: string;
      submitToHeyGen?: boolean;
    };

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Missing required fields: title, slug" },
      { status: 400 }
    );
  }

  const articleInput: ArticleSummaryInput = {
    title: title ?? "",
    slug: slug ?? "",
    category: category ?? "Medicare",
    excerpt: excerpt ?? "",
    bodyText: extractPlainText(bodyText ?? ""),
  };

  // Ensure schema exists
  try {
    await initVideoJobsSchema();
  } catch (e) {
    console.error("[generate-video-script] Schema init failed:", e);
  }

  // Create a pending job record
  let jobId: number | null = null;
  const articleUrl = `https://www.medicarefaq.com/faqs/${slug}/`;
  try {
    const job = await createVideoJob({
      heygenVideoId: null,
      articleSlug: slug ?? "",
      articleTitle: title ?? "",
      articleUrl,
      script: null,
      status: "pending",
      triggeredBy: "manual",
    });
    jobId = job.id;
  } catch (e) {
    console.error("[generate-video-script] Failed to create job record:", e);
  }

  try {
    // Step 1: Generate the script
    const scriptResult = await generateVideoScript(articleInput);

    // Update job with script
    if (jobId) {
      try {
        await updateVideoJob(jobId, { status: "processing" });
      } catch (e) {
        console.error("[generate-video-script] Failed to update job status:", e);
      }
    }

    // Step 2: Optionally submit to HeyGen
    let heygenResult = null;
    if (submitToHeyGen) {
      heygenResult = await submitHeyGenJob({
        script: scriptResult.script,
        title: title ?? "",
      });

      // Update job with HeyGen video ID
      if (jobId && heygenResult?.videoId) {
        try {
          await updateVideoJob(jobId, {
            heygenVideoId: heygenResult.videoId,
            status: "processing",
          });
        } catch (e) {
          console.error("[generate-video-script] Failed to update HeyGen ID:", e);
        }
      }
    } else if (jobId) {
      // Script generated but not submitted to HeyGen — mark as completed (script only)
      try {
        await updateVideoJob(jobId, { status: "completed" });
      } catch (e) {
        console.error("[generate-video-script] Failed to mark job completed:", e);
      }
    }

    return NextResponse.json({
      success: true,
      jobId,
      script: scriptResult,
      heygen: heygenResult,
      heygenConfigured: isHeyGenConfigured(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-video-script] Error:", message);

    // Mark job as failed
    if (jobId) {
      try {
        await updateVideoJob(jobId, {
          status: "failed",
          errorMessage: message,
        });
      } catch (e) {
        console.error("[generate-video-script] Failed to mark job failed:", e);
      }
    }

    return NextResponse.json(
      { error: "Script generation failed", details: message },
      { status: 500 }
    );
  }
}
