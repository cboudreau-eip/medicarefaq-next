import { NextResponse } from "next/server";
import { getDb } from "@/lib/heatmap/db";

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

export async function POST(request: Request) {
  try {
    const body: TrackPayload = await request.json();
    const sql = getDb();

    // Insert clicks
    if (body.clicks && body.clicks.length > 0) {
      for (const click of body.clicks) {
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
    if (body.scrolls && body.scrolls.length > 0) {
      for (const scroll of body.scrolls) {
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
