import pageDates from "./sitemap-page-dates.json";

export interface SitemapEntry { url: string; priority: string; changefreq: string; lastmod?: string }

/** Latest recorded content date; never substitute the request/build time. */
export function latestContentDate(...values: unknown[]): string | undefined {
  const dates = values.filter((value): value is string => typeof value === "string" && !!value.trim())
    .map(value => {
      const text = value.trim();
      // Written editorial dates are calendar days, independent of server timezone.
      const input = /^[A-Za-z]+ \d{1,2},? \d{4}$/.test(text) ? text + " UTC" : /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(text) ? text : "invalid";
      return new Date(input);
    }).filter(value => Number.isFinite(value.getTime()));
  return dates.length ? new Date(Math.max(...dates.map(value => value.getTime()))).toISOString() : undefined;
}

export function recordContentDate(record: unknown): string | undefined {
  const value = record as { dateUpdated?: string; lastReviewed?: string; dateModified?: string; review?: { date?: string } };
  return latestContentDate(value.dateUpdated, value.lastReviewed, value.dateModified, value.review?.date);
}

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
export function buildXml(entries: SitemapEntry[]): string {
  const seen = new Set<string>();
  const urls = entries.filter(entry => { if (seen.has(entry.url)) return false; seen.add(entry.url); return true; }).map(entry => {
    const lastmod = latestContentDate(entry.lastmod, (pageDates as Record<string, string>)[new URL(entry.url).pathname]);
    return '  <url>\n    <loc>' + escapeXml(entry.url) + '</loc>' + (lastmod ? '\n    <lastmod>' + lastmod + '</lastmod>' : '') + '\n    <changefreq>' + escapeXml(entry.changefreq) + '</changefreq>\n    <priority>' + escapeXml(entry.priority) + '</priority>\n  </url>';
  }).join("\n");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>';
}
