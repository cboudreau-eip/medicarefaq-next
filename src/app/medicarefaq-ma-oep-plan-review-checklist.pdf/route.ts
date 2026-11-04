import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  // Draft resources must remain unavailable on production, even if merged accidentally.
  if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview") {
    return new Response(null, { status: 404 });
  }
  const file = await readFile(path.join(process.cwd(), "src/assets/oep-2027/plan-review-checklist.pdf"));
  const download = new URL(request.url).searchParams.get("download") === "1";
  return new Response(new Uint8Array(file), { headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": (download ? "attachment" : "inline") + '; filename="medicarefaq-ma-oep-plan-review-checklist.pdf"',
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "private, no-store",
  } });
}
