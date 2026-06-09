import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/course-email
 * Captures email from the Medicare 101 Course progress-save prompt.
 * Stores the lead in a simple JSON file for now (can be upgraded to a CRM/email service later).
 *
 * Body: { email: string, source: string }
 */

// In-memory store for the current deployment session
// In production, this would go to a database, CRM, or email marketing service
const leads: Array<{ email: string; source: string; timestamp: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    // Store the lead
    const lead = {
      email: email.toLowerCase().trim(),
      source: source || "medicare-101-course",
      timestamp: new Date().toISOString(),
    };

    leads.push(lead);

    // Log for visibility (will appear in server logs)
    console.log(`[Course Email Lead] ${lead.email} from ${lead.source} at ${lead.timestamp}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// GET endpoint to retrieve leads (admin use)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_API_KEY;

  // Simple auth check — only allow if admin key is set and matches
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ leads, count: leads.length });
}
