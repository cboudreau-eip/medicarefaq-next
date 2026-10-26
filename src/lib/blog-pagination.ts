export const BLOG_POSTS_PER_PAGE = 12;
export const BLOG_FEATURED_COUNT = 4;

/** Keep metadata and the listing on the same real page, including malformed URLs. */
export function effectiveBlogPage(value: string | string[] | number | undefined, totalPages: number): number {
  const first = Array.isArray(value) ? value[0] : value;
  const raw = String(first ?? '1');
  const parsed = /^\d+$/.test(raw) ? Number(raw) : 1;
  const positive = Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
  return Math.min(positive, Math.max(1,totalPages));
}

export function blogPageHref(page: number): string {
  return page <= 1 ? '/blog/' : `/blog/?page=${page}`;
}

export function blogPageCount(slugs: readonly string[]): number {
  return Math.max(1,Math.ceil((new Set(slugs).size-BLOG_FEATURED_COUNT)/BLOG_POSTS_PER_PAGE));
}
