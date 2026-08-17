import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const file = new URL("../src/lib/coverage-data.ts", import.meta.url);
const source = fs.readFileSync(file, "utf8");
const start = source.indexOf('  slug: "reduce-medicare-premiums",');
const end = source.indexOf("\n  /* ───", start);
const article = source.slice(start, end);

test("Reduce Medicare Premiums uses verified current 2026 Part B, Part D, and historical values", () => {
  assert.ok(start >= 0, "The Reduce Medicare Premiums article must exist");
  assert.ok(article.includes("$202.90/month"), "Article must use the 2026 standard Part B premium");
  assert.ok(article.includes("$2,434.80/year"), "Article must use the annualized 2026 Part B premium");
  assert.ok(article.includes("$38.99 in 2026"), "Article must use the 2026 Part D penalty base premium");
  assert.ok(article.includes("$2,100 in 2026"), "Article must state the current 2026 Part D cap");
  assert.ok(article.includes("up from $185/month in 2025"), "Article must retain the correct historical 2025 Part B comparison");

  for (const staleValue of ["$185.00/month", "$2,220/year", "$36.78 in 2026", "$174.70 in 2025"]) {
    assert.equal(article.includes(staleValue), false, `Article must not retain stale value: ${staleValue}`);
  }
});
