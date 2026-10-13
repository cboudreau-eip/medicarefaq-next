import { repairInternalHref } from "./broken-link-repairs";

export interface RelatedArticleEntry { slug: string; title: string; href: string }
export interface RelatedTopicLink { label: string; href: string }

function topicKey(value: string): string {
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Resolve only unique, exact topic matches. Broad or ambiguous topics remain searches. */
export function createRelatedArticleResolver(entries: readonly RelatedArticleEntry[]) {
  const index = new Map<string, Map<string, RelatedArticleEntry>>();
  const byHref = new Map<string, RelatedArticleEntry>();
  for (const entry of entries) {
    if (!byHref.has(entry.href)) byHref.set(entry.href, entry);
    const keys = [entry.slug, entry.title];
    if (entry.href.startsWith("/faqs/")) {
      keys.push(entry.slug.replace(/^(does-medicare-cover-|medicare-coverage-for-)/, ""));
    }
    for (const value of keys) {
      const key = topicKey(value);
      const matches = index.get(key) ?? new Map<string, RelatedArticleEntry>();
      if (!matches.has(entry.href)) matches.set(entry.href, entry);
      index.set(key, matches);
    }
  }
  return (topic: string): RelatedTopicLink | null => {
    const label = topic.includes(" ") ? topic.trim() : topic.replace(/-/g, " ").replace(/\b[a-z]/g, (char) => char.toUpperCase());
    const oldHref = `/faqs/${topicKey(topic).replace(/ /g, "-")}/`;
    const repairedHref = repairInternalHref(oldHref);
    if (repairedHref === null) return null;
    if (repairedHref !== oldHref) return { label: byHref.get(repairedHref)?.title ?? label, href: repairedHref };
    const matches = index.get(topicKey(topic));
    if (matches?.size === 1) {
      const entry = matches.values().next().value!;
      return { label: entry.title, href: entry.href };
    }
    return { label, href: `/search/?q=${encodeURIComponent(topic)}` };
  };
}
