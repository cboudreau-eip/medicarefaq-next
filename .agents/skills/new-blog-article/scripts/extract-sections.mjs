/**
 * Dumps a published article's sections to JSON so they can be re-validated.
 *
 * Usage:
 *   node --experimental-strip-types \
 *        --import ./.claude/skills/new-blog-article/scripts/register-hook.mjs \
 *        ./.claude/skills/new-blog-article/scripts/extract-sections.mjs <slug> <out.json>
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [slug, out] = process.argv.slice(2);
if (!slug || !out) {
  console.error("usage: extract-sections.mjs <slug> <out.json>");
  process.exit(2);
}

const dataPath = path.join(process.cwd(), "src", "lib", "blog-articles-data.ts");
const { blogArticles } = await import(pathToFileURL(dataPath).href);

const article = blogArticles.find((a) => a.slug === slug);
if (!article) {
  console.error(`No article with slug "${slug}". ${blogArticles.length} articles loaded.`);
  process.exit(1);
}

fs.writeFileSync(out, JSON.stringify(article.sections, null, 1));
console.log(`Wrote ${article.sections.length} sections for "${slug}" to ${out}`);
