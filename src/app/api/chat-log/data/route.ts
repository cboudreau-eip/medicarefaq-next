import { NextResponse } from "next/server";
import { getDb } from "@/lib/chat-log/db";

const ADMIN_EMAIL = process.env.HEATMAP_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.HEATMAP_ADMIN_PASSWORD ?? "";

function checkAuth(request: Request): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  const email = request.headers.get("x-admin-email") ?? "";
  const password = request.headers.get("x-admin-password") ?? "";
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "conversations"; // conversations | messages | stats
  const sessionId = searchParams.get("session");
  const search = searchParams.get("search");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = (page - 1) * limit;

  try {
    const sql = getDb();

    if (type === "stats") {
      const totalConversations = await sql`SELECT COUNT(*) as count FROM chat_conversations`;
      const totalMessages = await sql`SELECT COUNT(*) as count FROM chat_messages`;
      const todayConversations = await sql`
        SELECT COUNT(*) as count FROM chat_conversations
        WHERE started_at >= CURRENT_DATE
      `;
      const avgMessages = await sql`
        SELECT AVG(message_count) as avg_count FROM chat_conversations
      `;
      const topPages = await sql`
        SELECT page_path, COUNT(*) as count FROM chat_conversations
        GROUP BY page_path ORDER BY count DESC LIMIT 5
      `;

      return NextResponse.json({
        total_conversations: totalConversations[0]?.count || 0,
        total_messages: totalMessages[0]?.count || 0,
        today_conversations: todayConversations[0]?.count || 0,
        avg_messages_per_conversation: Math.round(avgMessages[0]?.avg_count || 0),
        top_pages: topPages,
      });
    }

    if (type === "messages" && sessionId) {
      const messages = await sql`
        SELECT role, content, created_at
        FROM chat_messages
        WHERE session_id = ${sessionId}
        ORDER BY created_at ASC
      `;
      return NextResponse.json({ messages });
    }

    if (type === "conversations") {
      let conversations;

      if (search) {
        // Search in message content
        conversations = await sql`
          SELECT DISTINCT c.session_id, c.page_path, c.started_at, c.last_message_at,
                 c.message_count, c.device_type
          FROM chat_conversations c
          INNER JOIN chat_messages m ON c.session_id = m.session_id
          WHERE m.content ILIKE ${"%" + search + "%"}
          ${startDate ? sql`AND c.started_at >= ${startDate}::timestamptz` : sql``}
          ${endDate ? sql`AND c.started_at <= ${endDate}::timestamptz` : sql``}
          ORDER BY c.last_message_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;
      } else {
        conversations = await sql`
          SELECT session_id, page_path, started_at, last_message_at,
                 message_count, device_type
          FROM chat_conversations
          WHERE 1=1
          ${startDate ? sql`AND started_at >= ${startDate}::timestamptz` : sql``}
          ${endDate ? sql`AND started_at <= ${endDate}::timestamptz` : sql``}
          ORDER BY last_message_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;
      }

      return NextResponse.json({ conversations });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Chat log data error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
