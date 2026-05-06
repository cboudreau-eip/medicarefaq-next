import { NextRequest, NextResponse } from "next/server";
import {
  generateVideoScript,
  extractPlainText,
  type ArticleSummaryInput,
} from "@/lib/video-script-generator";
import { submitHeyGenJob, isHeyGenConfigured } from "@/lib/heygen-client";

/**
 * POST /api/generate-video-script
 *
 * Accepts article data, generates a 2-minute video script using Claude,
 * and optionally submits it to HeyGen if the API key is configured.
 *
 * Request body:
 * {
 *   title:       string  — Article headline
 *   slug:        string  — URL slug
 *   category:    string  — Article category
 *   excerpt:     string  — Short description
 *   bodyText:    string  — Plain text body content (or HTML, will be stripped)
 *   submitToHeyGen?: boolean  — Whether to submit to HeyGen after generating (default: false)
 * }
 */

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, slug, category, excerpt, bodyText, submitToHeyGen } =
    body as {
      title?: string;
      slug?: string;
      category?: string;
      excerpt?: string;
      bodyText?: string;
      submitToHeyGen?: boolean;
    };

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Missing required fields: title, slug" },
      { status: 400 }
    );
  }

  const articleInput: ArticleSummaryInput = {
    title: title ?? "",
    slug: slug ?? "",
    category: category ?? "Medicare",
    excerpt: excerpt ?? "",
    bodyText: extractPlainText(bodyText ?? ""),
  };

  try {
    // Step 1: Generate the script with Claude
    const scriptResult = await generateVideoScript(articleInput);

    // Step 2: Optionally submit to HeyGen
    let heygenResult = null;
    if (submitToHeyGen) {
      heygenResult = await submitHeyGenJob({
        script: scriptResult.script,
        title: title ?? "",
      });
    }

    return NextResponse.json({
      success: true,
      script: scriptResult,
      heygen: heygenResult,
      heygenConfigured: isHeyGenConfigured(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-video-script] Error:", message);
    return NextResponse.json(
      { error: "Script generation failed", details: message },
      { status: 500 }
    );
  }
}
