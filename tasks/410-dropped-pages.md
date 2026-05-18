# Task: 410 Response for Dropped Pages

## Background

When the new dev site launches, approximately 282 pages from the live site at `medicarefaq.com` will no longer exist. These are primarily:

- Low-value `/faqs/` coverage articles that were cut
- Low-value `/blog/` posts that were cut

These pages have near-zero traffic and no meaningful backlink equity, so they are **intentionally not being redirected**. However, rather than letting them return a generic 404, we want to return a **410 Gone** response to signal to Google that these pages are permanently and deliberately removed. This speeds up deindexing significantly.

## Decision

- **Not using 301 redirects** — redirecting thin/unrelated content creates soft 404s and dilutes destination page relevance
- **Not using 404** — Google treats 404 as possibly temporary and keeps recrawling for months
- **Using 410 Gone** — communicates permanent, deliberate removal; Google deindexes faster (often within days)

## Implementation Plan

**Approach: Next.js Middleware (`middleware.ts`)**

A `middleware.ts` file at the project root will:
1. Hold a `Set` of all dropped slugs (just the slug portion, not the full URL)
2. Check every incoming `/faqs/` and `/blog/` request against the set
3. Return a `NextResponse` with status `410` if matched
4. Pass all other requests through normally

This keeps the logic out of `next.config.ts`, runs at the edge before page rendering, and is easy to maintain.

**Example structure:**
```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const DROPPED_SLUGS = new Set([
  // /faqs/ slugs (slug only, no path prefix)
  "example-dropped-faq-slug",
  // /blog/ slugs
  "example-dropped-blog-slug",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const faqMatch = pathname.match(/^\/faqs\/([^/]+)\/?$/);
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  const slug = faqMatch?.[1] ?? blogMatch?.[1];

  if (slug && DROPPED_SLUGS.has(slug)) {
    return new NextResponse(null, { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/faqs/:slug*", "/blog/:slug*"],
};
```

## Step 1: Generate the Dropped Slug List

The list of 282 dropped slugs needs to be derived by comparing:
- **Live site slugs** — crawl `https://www.medicarefaq.com/sitemap.xml` (or sub-sitemaps) to get all current `/faqs/` and `/blog/` URLs
- **Dev site slugs** — extract all slugs from `src/lib/blog-articles-data.ts`, `src/lib/coverage-data.ts`, and `src/lib/faq-data.ts`
- **Diff** — any slug on the live site that is NOT on the dev site and NOT already covered by a 301 redirect in `next.config.ts` goes into the 410 list

**To start this task, say:** "Let's work on the 410 dropped pages task" and I will:
1. Crawl the live site sitemaps to get all current `/faqs/` and `/blog/` URLs
2. Extract all dev site slugs from the data files
3. Diff the two lists against the existing redirects
4. Generate the complete `middleware.ts` file with all dropped slugs
5. Test and push

## Status

- [ ] Generate dropped slug list (crawl live site vs. dev site diff)
- [ ] Write `middleware.ts` with 410 logic
- [ ] Verify 410 responses on sample dropped URLs
- [ ] Push to production
