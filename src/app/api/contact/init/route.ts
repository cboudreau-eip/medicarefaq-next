import { NextResponse } from "next/server";
import { initContactSchema } from "../route";

/**
 * GET /api/contact/init
 * Initializes the contact_submissions table. Call once during setup.
 */
export async function GET() {
  try {
    await initContactSchema();
    return NextResponse.json({ success: true, message: "contact_submissions table initialized" });
  } catch (error) {
    console.error("[Contact Init Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize schema" },
      { status: 500 }
    );
  }
}
