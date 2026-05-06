import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/new-article
 *
 * Accepts a JSON payload describing a newly published article and forwards it
 * to the Zapier webhook so downstream Zaps (AI processing, Slack alerts, etc.)
 * can react to new content.
 *
 * Expected request body:
 * {
 *   title:    string  — Article headline
 *   slug:     string  — URL slug (e.g. "does-medicare-cover-hearing-aids")
 *   url:      string  — Full canonical URL
 *   author:   string  — Author display name
 *   date:     string  — ISO 8601 publish date (e.g. "2026-05-06")
 *   category: string  — "coverage" | "blog" | "faq" | etc.
 *   excerpt:  string  — Short description / meta description
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
  // If a secret is configured, require it in the request header.
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

  const { title, slug, url, author, date, category, excerpt } = body as {
    title?: string;
    slug?: string;
    url?: string;
    author?: string;
    date?: string;
    category?: string;
    excerpt?: string;
  };

  // ── Validate required fields ─────────────────────────────────────────────────
  if (!title || !slug) {
    return NextResponse.json(
      { error: "Missing required fields: title, slug" },
      { status: 400 }
    );
  }

  // ── Build the payload for Zapier ─────────────────────────────────────────────
  const zapierPayload = {
    title,
    slug,
    url: url ?? `https://www.medicarefaq.com/faqs/${slug}/`,
    author: author ?? "David Haass",
    date: date ?? new Date().toISOString().split("T")[0],
    category: category ?? "article",
    excerpt: excerpt ?? "",
    published_at: new Date().toISOString(),
    source: "medicarefaq-next",
  };

  // ── Forward to Zapier ────────────────────────────────────────────────────────
  try {
    const zapierRes = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zapierPayload),
    });

    if (!zapierRes.ok) {
      const text = await zapierRes.text();
      console.error("[new-article] Zapier returned non-OK:", zapierRes.status, text);
      return NextResponse.json(
        { error: "Zapier webhook failed", status: zapierRes.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, forwarded: zapierPayload });
  } catch (err) {
    console.error("[new-article] Failed to reach Zapier:", err);
    return NextResponse.json(
      { error: "Could not reach Zapier webhook" },
      { status: 502 }
    );
  }
}
