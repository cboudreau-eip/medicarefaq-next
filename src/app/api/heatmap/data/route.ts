import { NextResponse } from "next/server";
import { getDb } from "@/lib/heatmap/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const device = searchParams.get("device");
  const type = searchParams.get("type") || "clicks"; // clicks | scroll | stats | pages


  try {
    const sql = getDb();

    if (type === "pages") {
      // Return list of all tracked pages with click counts
      const result = await sql`
        SELECT page_path, COUNT(*) as click_count, 
               MAX(created_at) as last_activity
        FROM heatmap_clicks
        GROUP BY page_path
        ORDER BY click_count DESC
      `;
      return NextResponse.json({ pages: result });
    }

    if (type === "stats") {
      // Return overview stats
      const totalClicks = await sql`SELECT COUNT(*) as count FROM heatmap_clicks`;
      const totalSessions = await sql`SELECT COUNT(DISTINCT session_id) as count FROM heatmap_clicks`;
      const todayClicks = await sql`
        SELECT COUNT(*) as count FROM heatmap_clicks 
        WHERE created_at >= CURRENT_DATE
      `;
      const avgScroll = await sql`
        SELECT AVG(max_scroll_percent) as avg_scroll FROM heatmap_scroll
      `;
      const topPage = await sql`
        SELECT page_path, COUNT(*) as count FROM heatmap_clicks 
        GROUP BY page_path ORDER BY count DESC LIMIT 1
      `;

      return NextResponse.json({
        total_clicks: totalClicks[0]?.count || 0,
        total_sessions: totalSessions[0]?.count || 0,
        today_clicks: todayClicks[0]?.count || 0,
        avg_scroll_depth: Math.round(avgScroll[0]?.avg_scroll || 0),
        top_page: topPage[0]?.page_path || "N/A",
        top_page_clicks: topPage[0]?.count || 0,
      });
    }

    if (type === "clicks" && page) {
      const result = await sql`
        SELECT x_percent, y_percent, element_tag, element_id, element_text, 
               device_type, created_at
        FROM heatmap_clicks
        WHERE page_path = ${page}
        ${startDate ? sql`AND created_at >= ${startDate}::timestamptz` : sql``}
        ${endDate ? sql`AND created_at <= ${endDate}::timestamptz` : sql``}
        ${device && device !== "all" ? sql`AND device_type = ${device}` : sql``}
        ORDER BY created_at DESC
        LIMIT 5000
      `;
      return NextResponse.json({ clicks: result });
    }

    if (type === "scroll" && page) {
      const result = await sql`
        SELECT max_scroll_percent, device_type, created_at
        FROM heatmap_scroll
        WHERE page_path = ${page}
        ${startDate ? sql`AND created_at >= ${startDate}::timestamptz` : sql``}
        ${endDate ? sql`AND created_at <= ${endDate}::timestamptz` : sql``}
        ${device && device !== "all" ? sql`AND device_type = ${device}` : sql``}
        ORDER BY created_at DESC
        LIMIT 1000
      `;
      return NextResponse.json({ scrolls: result });
    }

    if (type === "top-elements" && page) {
      const result = await sql`
        SELECT element_tag, element_id, element_text, COUNT(*) as click_count
        FROM heatmap_clicks
        WHERE page_path = ${page}
        ${startDate ? sql`AND created_at >= ${startDate}::timestamptz` : sql``}
        ${endDate ? sql`AND created_at <= ${endDate}::timestamptz` : sql``}
        ${device && device !== "all" ? sql`AND device_type = ${device}` : sql``}
        GROUP BY element_tag, element_id, element_text
        ORDER BY click_count DESC
        LIMIT 20
      `;
      return NextResponse.json({ elements: result });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Heatmap data error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
