import { NextRequest, NextResponse } from "next/server";
import {
  generateVideoScript,
  extractPlainText,
} from "@/lib/video-script-generator";
import { submitHeyGenJob, isHeyGenConfigured } from "@/lib/heygen-client";

/**
 * POST /api/new-article
 *
 * Accepts a JSON payload describing a newly published article and:
 *   1. Forwards the article metadata to the Zapier webhook
 *   2. Generates a 2-minute video script using Claude
 *   3. Optionally submits the script to HeyGen (when HEYGEN_API_KEY is set)
 *
 * Expected request body:
 * {
 *   title:          string   — Article headline
 *   slug:           string   — URL slug (e.g. "does-medicare-cover-hearing-aids")
 *   url?:           string   — Full canonical URL (auto-built from slug if omitted)
 *   author?:        string   — Author display name (defaults to "David Haass")
 *   date?:          string   — ISO 8601 publish date (defaults to today)
 *   category?:      string   — "coverage" | "blog" | "faq" | etc.
 *   excerpt?:       string   — Short description / meta description
 *   bodyText?:      string   — Plain text or HTML body content for richer script generation
 *   generateScript?: boolean — Whether to generate a video script (default: true)
 *   submitToHeyGen?: boolean — Whether to submit to HeyGen (default: false; requires HEYGEN_API_KEY)
 * }
 *
 * Security: requests must include the header
 *   X-MedicareFAQ-Secret: <ZAPIER_WEBHOOK_SECRET env var>
 * This prevents the endpoint from being spammed by external parties.
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
    submitToHeyGen = false,
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

  // ── Step 2: Generate video script with Claude ────────────────────────────────
  let scriptResult = null;
  let scriptError: string | null = null;

  if (generateScript) {
    try {
      scriptResult = await generateVideoScript({
        title: title ?? "",
        slug: slug ?? "",
        category: category ?? "Medicare",
        excerpt: excerpt ?? "",
        bodyText: extractPlainText(bodyText ?? excerpt ?? ""),
      });

      // Append script to Zapier payload as a follow-up notification
      // (fire-and-forget — don't block the response)
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
    }
  }

  // ── Step 3: Submit to HeyGen (if requested and key is available) ─────────────
  let heygenResult = null;
  if (submitToHeyGen && scriptResult && isHeyGenConfigured()) {
    heygenResult = await submitHeyGenJob({
      script: scriptResult.script,
      title: title ?? "",
    });
  }

  // ── Response ─────────────────────────────────────────────────────────────────
  return NextResponse.json({
    success: true,
    zapier: { success: zapierSuccess, error: zapierError },
    script: scriptResult,
    scriptError,
    heygen: heygenResult,
    heygenConfigured: isHeyGenConfigured(),
    forwarded: zapierPayload,
  });
}
