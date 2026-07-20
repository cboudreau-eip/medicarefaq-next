import { NextRequest, NextResponse } from "next/server";

const NOTIFICATION_EMAIL = "cboudreau@teameip.com";

interface LeadData {
  zip: string;
  city: string;
  state: string;
  hasMedicare: string;
  dentalImportance: string;
  drugImportance: string;
  name: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Basic validation
    if (!data.zip || !data.phone) {
      return NextResponse.json(
        { success: false, error: "ZIP code and phone number are required" },
        { status: 400 }
      );
    }

    // Send email notification
    await sendLeadNotification(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Lead Gen] Error processing submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

async function sendLeadNotification(data: LeadData) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("[Lead Gen] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const importanceLabels: Record<string, string> = {
    very: "Very Important",
    somewhat: "Somewhat Important",
    not: "Not Important",
    "": "Skipped",
  };

  const medicareLabels: Record<string, string> = {
    yes: "Yes, has Medicare",
    no: "New to Medicare",
    unsure: "Not sure",
    "": "Skipped",
  };

  const medicareLabel = medicareLabels[data.hasMedicare] || data.hasMedicare || "Not specified";
  const dentalLabel = importanceLabels[data.dentalImportance] || "Not specified";
  const drugLabel = importanceLabels[data.drugImportance] || "Not specified";
  const location = data.city && data.state ? `${data.city}, ${data.state} ${data.zip}` : data.zip;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B2A4A; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0; font-size: 18px;">🎯 New Lead from MedicareFAQ</h2>
        <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">Find Plans Form Submission</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; width: 160px; vertical-align: top; border-bottom: 1px solid #f1f5f9;">Name</td>
            <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9; font-size: 16px; font-weight: 600;">${data.name || "Not provided"}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; vertical-align: top; border-bottom: 1px solid #f1f5f9;">Phone</td>
            <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9; font-size: 16px; font-weight: 600;">
              <a href="tel:${data.phone.replace(/\D/g, "")}" style="color: #0D9488; text-decoration: none;">${data.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; vertical-align: top; border-bottom: 1px solid #f1f5f9;">Location</td>
            <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${location}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; vertical-align: top; border-bottom: 1px solid #f1f5f9;">Has Medicare?</td>
            <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${medicareLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; vertical-align: top; border-bottom: 1px solid #f1f5f9;">Dental Importance</td>
            <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${dentalLabel}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; font-weight: 600; color: #475569; vertical-align: top;">Drug Coverage Importance</td>
            <td style="padding: 10px 12px; color: #1e293b;">${drugLabel}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">
          Submitted via medicarefaq.com/find-plans • ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET
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
        from: "MedicareFAQ Leads <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `🎯 New Lead: ${data.name || "Unknown"} — ${location}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[Lead Gen] Resend API error:", res.status, errorBody);
    }
  } catch (error) {
    console.error("[Lead Gen] Email send failed:", error);
    // Don't throw — we still want to return success to the user
  }
}
