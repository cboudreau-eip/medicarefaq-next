import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY ?? "";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "12";

  // Check auth
  const pw = req.headers.get("x-cms-password");
  const expected = process.env.CMS_ADMIN_PASSWORD ?? "";
  if (!pw || pw !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if Unsplash key is configured
  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Unsplash API key not configured. Add UNSPLASH_ACCESS_KEY to environment variables." },
      { status: 503 }
    );
  }

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `Unsplash API error: ${res.status} ${errText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return simplified results
    const results = data.results.map((photo: any) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      description: photo.description || photo.alt_description || "",
      // Use the regular size for the article (1080px wide)
      url: photo.urls.regular,
      // Use small for preview in the picker
      thumb: photo.urls.small,
      // Attribution info (required by Unsplash guidelines)
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      unsplashUrl: photo.links.html,
    }));

    return NextResponse.json({
      results,
      total: data.total,
      totalPages: data.total_pages,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to search Unsplash: ${String(err)}` },
      { status: 500 }
    );
  }
}
