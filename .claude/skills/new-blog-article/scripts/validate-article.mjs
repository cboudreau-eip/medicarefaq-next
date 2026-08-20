/**
 * Runs the project's real content validator against a candidate article.
 *
 * Usage:
 *   node --experimental-strip-types \
 *        --import ./.claude/skills/new-blog-article/scripts/register-hook.mjs \
 *        ./.claude/skills/new-blog-article/scripts/validate-article.mjs <sections.json>
 *
 * <sections.json> is a JSON array of BlogSectionContent objects, OR a full
 * BlogArticleData object (its .sections array is used).
 *
 * Exits 1 if score < MIN_QUALITY_SCORE (87) so it can gate a commit.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const MIN_QUALITY_SCORE = 87;

const input = process.argv[2];
if (!input) {
  console.error("usage: validate-article.mjs <sections.json>");
  process.exit(2);
}

const repoRoot = process.cwd();
const validatorPath = path.join(repoRoot, "src", "lib", "content-validator.ts");
const { validateContent } = await import(pathToFileURL(validatorPath).href);

const raw = JSON.parse(fs.readFileSync(input, "utf8"));
const sections = Array.isArray(raw) ? raw : raw.sections;
if (!Array.isArray(sections)) {
  console.error("Input must be a sections array or an object with a .sections array.");
  process.exit(2);
}

const result = validateContent(sections);

const bySeverity = { error: [], warning: [], info: [] };
for (const issue of result.issues) {
  (bySeverity[issue.severity] ??= []).push(issue);
}

console.log(`\nQuality score: ${result.score}/100   (gate: ${MIN_QUALITY_SCORE})`);
console.log(
  `errors: ${bySeverity.error.length}  warnings: ${bySeverity.warning.length}  info: ${bySeverity.info.length}\n`
);

for (const sev of ["error", "warning", "info"]) {
  for (const i of bySeverity[sev]) {
    const where = i.sectionIndex === undefined ? "" : ` [#${i.sectionIndex} ${i.sectionType}]`;
    console.log(`${sev.toUpperCase().padEnd(7)} ${i.category}${where}: ${i.message}`);
    if (i.detail) console.log(`        ${i.detail}`);
  }
}

if (result.score < MIN_QUALITY_SCORE) {
  console.log(`\nFAIL — score ${result.score} is below the ${MIN_QUALITY_SCORE} gate. Fix and re-run.`);
  process.exit(1);
}
console.log(`\nPASS — score ${result.score} meets the ${MIN_QUALITY_SCORE} gate.`);
