import "server-only";

export interface KitWebhookPayload { email: string; name: string; pdfUrl: string }

export async function sendKitWebhook(payload: KitWebhookPayload) {
  const endpoint = process.env.N8N_DECISION_KIT_URL;
  const secret = process.env.N8N_DECISION_KIT_SECRET;
  if (!endpoint || !secret || secret !== secret.trim()) throw new Error("Missing webhook configuration");
  const url = new URL(endpoint);
  if (url.protocol !== "https:" || url.hostname !== "n8nprod.teameip.com" || url.username || url.password) {
    throw new Error("Invalid webhook endpoint");
  }
  // One POST only: retrying an ambiguous timeout could send duplicate emails.
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Decision-Kit-Secret": secret },
    body: JSON.stringify({ email: payload.email, name: payload.name, pdfUrl: payload.pdfUrl }),
    signal: AbortSignal.timeout(15000),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`n8n request failed (${response.status})`);
  // Acceptance by n8n is not confirmation of downstream email delivery.
}
