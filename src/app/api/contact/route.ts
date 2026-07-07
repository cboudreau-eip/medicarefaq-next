import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/chat-log/db";

const NOTIFICATION_EMAIL = "customercare@teameip.com";

/**
 * POST /api/contact
 * Receives contact form submissions, stores in database, and sends email notification.
 *
 * Body: {
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   phone: string,
 *   reason: string,
 *   zipcode: string,
 *   message: string,
 *   isCustomer: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, reason, zipcode, message, isCustomer, _website } = body;

    // Honeypot check — if the hidden field has a value, it's a bot
    if (_website) {
      // Return success to the bot so it thinks it worked, but don't store anything
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !reason) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (firstName, lastName, email, reason)" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Store in database
    await sql`
      INSERT INTO contact_submissions (
        first_name, last_name, email, phone, reason, zipcode, message, is_customer, submitted_at
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone || null}, ${reason}, ${zipcode || null}, ${message || null}, ${isCustomer || null}, NOW()
      )
    `;

    // Send email notification via Resend
    await sendEmailNotification({
      firstName,
      lastName,
      email,
      phone,
      reason,
      zipcode,
      message,
      isCustomer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact Form Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

/**
 * Send email notification about new contact form submission
 */
async function sendEmailNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  zipcode: string;
  message: string;
  isCustomer: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("[Contact Form] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const reasonLabels: Record<string, string> = {
    "new-enrollment": "New Medicare Enrollment",
    "plan-comparison": "Plan Comparison Help",
    "rate-quote": "Rate Quote Request",
    "claims-billing": "Claims & Billing Question",
    "general": "General Question",
    "other": "Other",
  };

  const reasonLabel = reasonLabels[data.reason] || data.reason;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f4c5c; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Contact Form Submission</h2>
        <p style="color: #a7d8e4; margin: 4px 0 0; font-size: 13px;">MedicareFAQ Website</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #475569; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px; color: #1e293b;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 8px 12px; font-weight: 600; color: #475569; vertical-align: top;">Email</td>
            <td style="padding: 8px 12px; color: #1e293b;"><a href="mailto:${data.email}" style="color: #0f4c5c;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #475569; vertical-align: top;">Phone</td>
            <td style="padding: 8px 12px; color: #1e293b;">${data.phone || "Not provided"}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 8px 12px; font-weight: 600; color: #475569; vertical-align: top;">ZIP Code</td>
            <td style="padding: 8px 12px; color: #1e293b;">${data.zipcode || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #475569; vertical-align: top;">Reason</td>
            <td style="padding: 8px 12px; color: #1e293b;">${reasonLabel}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 8px 12px; font-weight: 600; color: #475569; vertical-align: top;">Existing Customer?</td>
            <td style="padding: 8px 12px; color: #1e293b;">${data.isCustomer || "Not specified"}</td>
          </tr>
          ${data.message ? `
          <tr>
            <td colspan="2" style="padding: 16px 12px 8px; font-weight: 600; color: #475569;">Message</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 0 12px 12px;">
              <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 6px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${data.message}</div>
            </td>
          </tr>
          ` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">
          Submitted via medicarefaq.com contact form • ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "MedicareFAQ Contact <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `New Contact: ${data.firstName} ${data.lastName} — ${reasonLabel}`,
        html: htmlBody,
        reply_to: data.email,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[Contact Form] Resend API error:", res.status, errorBody);
    }
  } catch (error) {
    console.error("[Contact Form] Email send failed:", error);
    // Don't throw — submission is already saved in DB
  }
}

