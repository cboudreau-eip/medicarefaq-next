import { NextResponse } from "next/server";
import { initChatLogSchema } from "@/lib/chat-log/db";

const ADMIN_EMAIL = process.env.HEATMAP_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.HEATMAP_ADMIN_PASSWORD ?? "";

function checkAuth(request: Request): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  const email = request.headers.get("x-admin-email") ?? "";
  const password = request.headers.get("x-admin-password") ?? "";
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initChatLogSchema();
    return NextResponse.json({ success: true, message: "Chat log schema initialized" });
  } catch (error) {
    console.error("Chat log schema init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize schema" },
      { status: 500 }
    );
  }
}
