import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/heatmap/db";

const ADMIN_EMAIL = process.env.HEATMAP_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.HEATMAP_ADMIN_PASSWORD ?? "";
const HEATMAP_TRACK_SECRET = process.env.NEXT_PUBLIC_HEATMAP_TRACK_SECRET ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicarefaq.com";

// Allowed origins — the live site and any preview/staging domains
const ALLOWED_ORIGINS = [
  SITE_URL,
  "https://medicarefaq-next-nine.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

interface ClickEvent {
  page_path: string;
  x_percent: number;
  y_percent: number;
  viewport_width: number;
  viewport_height: number;
  element_tag?: string;
  element_id?: string;
  element_class?: string;
  element_text?: string;
  device_type: string;
  session_id?: string;
}

interface ScrollEvent {
  page_path: string;
  max_scroll_percent: number;
  viewport_height: number;
  page_height: number;
  device_type: string;
  session_id?: string;
}

interface TrackPayload {
  clicks?: ClickEvent[];
  scrolls?: ScrollEvent[];
}

// Maximum events per request to prevent abuse
const MAX_CLICKS_PER_REQUEST = 50;
const MAX_SCROLLS_PER_REQUEST = 10;

// Maximum string lengths to prevent oversized payloads
const MAX_PATH_LENGTH = 500;
const MAX_STRING_LENGTH = 200;

function isValidPagePath(path: string): boolean {
  if (typeof path !== "string") return false;
  if (path.length === 0 || path.length > MAX_PATH_LENGTH) return false;
  // Must start with / (relative path)
  if (!path.startsWith("/")) return false;
  return true;
}

function isValidPercent(val: unknown): boolean {
  return typeof val === "number" && isFinite(val) && val >= 0 && val <= 100;
}

function isValidDimension(val: unknown): boolean {
  return typeof val === "number" && isFinite(val) && val > 0 && val < 100000;
}

function sanitizeString(val: unknown): string | null {
  if (typeof val !== "string") return null;
  return val.slice(0, MAX_STRING_LENGTH);
}

export async function POST(request: NextRequest) {
  // ── Origin check ─────────────────────────────────────────────────────────────
  const origin = request.headers.get("origin") ?? "";
  const referer = request.headers.get("referer") ?? "";

  const originAllowed = ALLOWED_ORIGINS.some(
    (allowed) => origin === allowed || referer.startsWith(allowed)
  );

  // In development (no origin header from same-origin fetch), allow through
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev && !originAllowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Auth check ──────────────────────────────────────────────────────────────
  // Accept either:
  // 1. Admin email + password (from dashboard)
  // 2. Track secret (from HeatmapTracker component on public pages)
  const email = request.headers.get("x-heatmap-email") ?? "";
  const password = request.headers.get("x-heatmap-password") ?? "";
  const trackSecret = request.headers.get("x-heatmap-secret") ?? "";

  const isAdmin =
    ADMIN_EMAIL && ADMIN_PASSWORD && email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  const isTracker = HEATMAP_TRACK_SECRET && trackSecret === HEATMAP_TRACK_SECRET;

  if (!isAdmin && !isTracker) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: TrackPayload = await request.json();
    const sql = getDb();

    // Validate and cap batch sizes
    const clicks = (body.clicks || []).slice(0, MAX_CLICKS_PER_REQUEST);
    const scrolls = (body.scrolls || []).slice(0, MAX_SCROLLS_PER_REQUEST);

    // Insert clicks
    if (clicks.length > 0) {
      for (const click of clicks) {
        // Strict validation — skip malformed events
        if (
          !isValidPagePath(click.page_path) ||
          !isValidPercent(click.x_percent) ||
          !isValidPercent(click.y_percent) ||
          !isValidDimension(click.viewport_width) ||
          !isValidDimension(click.viewport_height)
        ) {
          continue;
        }
        await sql`
          INSERT INTO heatmap_clicks (
            page_path, x_percent, y_percent, viewport_width, viewport_height,
            element_tag, element_id, element_class, element_text, device_type, session_id
          ) VALUES (
            ${click.page_path}, ${click.x_percent}, ${click.y_percent},
            ${click.viewport_width}, ${click.viewport_height},
            ${sanitizeString(click.element_tag)}, ${sanitizeString(click.element_id)},
            ${sanitizeString(click.element_class)}, ${sanitizeString(click.element_text)},
            ${sanitizeString(click.device_type) ?? "unknown"}, ${sanitizeString(click.session_id)}
          )
        `;
      }
    }

    // Insert scroll depth
    if (scrolls.length > 0) {
      for (const scroll of scrolls) {
        // Strict validation — skip malformed events
        if (
          !isValidPagePath(scroll.page_path) ||
          !isValidPercent(scroll.max_scroll_percent) ||
          !isValidDimension(scroll.viewport_height) ||
          !isValidDimension(scroll.page_height)
        ) {
          continue;
        }
        await sql`
          INSERT INTO heatmap_scroll (
            page_path, max_scroll_percent, viewport_height, page_height, device_type, session_id
          ) VALUES (
            ${scroll.page_path}, ${scroll.max_scroll_percent},
            ${scroll.viewport_height}, ${scroll.page_height},
            ${sanitizeString(scroll.device_type) ?? "unknown"}, ${sanitizeString(scroll.session_id)}
          )
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Heatmap track error:", error);
    return NextResponse.json(
      { error: "Failed to track events" },
      { status: 500 }
    );
  }
}
