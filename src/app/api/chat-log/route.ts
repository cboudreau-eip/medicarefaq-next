import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/chat-log/db";

/**
 * POST /api/chat-log
 *
 * Logs a chat conversation exchange (user question + assistant response).
 * Called by the ChatWidget after each complete AI response.
 *
 * Payload:
 * {
 *   sessionId: string,
 *   pagePath: string,
 *   deviceType: "desktop" | "mobile" | "tablet",
 *   messages: [{ role: "user" | "assistant", content: string }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, pagePath, deviceType, messages } = body;

    // Validate required fields
    if (!sessionId || !pagePath || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages to log" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const device = deviceType || "desktop";

    // Upsert conversation record
    await sql`
      INSERT INTO chat_conversations (session_id, page_path, device_type, message_count, last_message_at)
      VALUES (${sessionId}, ${pagePath}, ${device}, ${messages.length}, NOW())
      ON CONFLICT (session_id) DO UPDATE SET
        message_count = chat_conversations.message_count + ${messages.length},
        last_message_at = NOW()
    `;

    // Insert messages
    for (const msg of messages) {
      if (!msg.role || !msg.content) continue;
      await sql`
        INSERT INTO chat_messages (session_id, role, content)
        VALUES (${sessionId}, ${msg.role}, ${msg.content})
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chat log error:", error);
    return NextResponse.json(
      { error: "Failed to log conversation" },
      { status: 500 }
    );
  }
}
