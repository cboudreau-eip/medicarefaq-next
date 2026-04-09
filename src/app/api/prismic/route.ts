import { createClient } from "@/prismicio";
import { NextRequest } from "next/server";
import { redirectToPreviewURL, exitPreview } from "@prismicio/next";

export async function GET(request: NextRequest) {
  const client = createClient();
  const { searchParams } = new URL(request.url);

  if (searchParams.has("exit-preview")) {
    return exitPreview();
  }

  return redirectToPreviewURL({ client, request });
}
