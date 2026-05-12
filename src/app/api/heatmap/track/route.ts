import { NextResponse } from "next/server";
import { getDb } from "@/lib/heatmap/db";

const ADMIN_EMAIL = process.env.HEATMAP_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.HEATMAP_ADMIN_PASSWORD ?? "";
const HEATMAP_TRACK_SECRET = process.env.NEXT_PUBLIC_HEATMAP_TRACK_SECRET ?? "";

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

export async function POST(request: Request) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  // Accept either:
  // 1. Admin email + password (from dashboard)
  // 2. Track secret (from HeatmapTracker component on public pages)
  const email = request.headers.get("x-heatmap-email") ?? "";
  const password = request.headers.get("x-heatmap-password") ?? "";
  const trackSecret = request.headers.get("x-heatmap-secret") ?? "";

  const isAdmin = ADMIN_EMAIL && ADMIN_PASSWORD && email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
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
        // Basic validation
        if (
          typeof click.page_path !== "string" ||
          typeof click.x_percent !== "number" ||
          typeof click.y_percent !== "number"
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
            ${click.element_tag || null}, ${click.element_id || null},
            ${click.element_class || null}, ${click.element_text || null},
            ${click.device_type}, ${click.session_id || null}
          )
        `;
      }
    }

    // Insert scroll depth
    if (scrolls.length > 0) {
      for (const scroll of scrolls) {
        // Basic validation
        if (
          typeof scroll.page_path !== "string" ||
          typeof scroll.max_scroll_percent !== "number"
        ) {
          continue;
        }
        await sql`
          INSERT INTO heatmap_scroll (
            page_path, max_scroll_percent, viewport_height, page_height, device_type, session_id
          ) VALUES (
            ${scroll.page_path}, ${scroll.max_scroll_percent},
            ${scroll.viewport_height}, ${scroll.page_height},
            ${scroll.device_type}, ${scroll.session_id || null}
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
