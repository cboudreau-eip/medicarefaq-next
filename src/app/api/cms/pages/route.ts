import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import manifest from "@/lib/cms-pages-manifest.json";

/**
 * GET /api/cms/pages
 * Returns the inventory of editable public static pages (from the committed
 * manifest). Optional query params:
 *   ?section=...        filter by top-level section
 *   ?status=no-schema   filter to pages missing JSON-LD schema
 *   ?status=no-meta     filter to pages without an inline metadata block
 *   ?status=content     filter to pages eligible for full content editing
 *   ?q=...              free-text match on route/title
 */
export async function GET(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section");
  const status = searchParams.get("status");
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  let pages = manifest.pages as Array<{
    route: string;
    file: string;
    title: string;
    hasMetadata: boolean;
    schemaCount: number;
    seoEditable: boolean;
    contentEditable: boolean;
    section: string;
  }>;

  if (section) pages = pages.filter((p) => p.section === section);
  if (status === "no-schema") pages = pages.filter((p) => p.schemaCount === 0);
  if (status === "no-meta") pages = pages.filter((p) => !p.hasMetadata);
  if (status === "content") pages = pages.filter((p) => p.contentEditable);
  if (q) {
    pages = pages.filter(
      (p) =>
        p.route.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q)
    );
  }

  // Section summary for UI filters.
  const sections: Record<string, number> = {};
  for (const p of manifest.pages) {
    sections[p.section] = (sections[p.section] || 0) + 1;
  }

  return NextResponse.json({
    generatedAt: manifest.generatedAt,
    total: manifest.count,
    returned: pages.length,
    sections,
    pages,
  });
}
