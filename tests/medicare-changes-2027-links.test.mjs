import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const file = new URL("../src/lib/blog-articles-data.ts", import.meta.url);
const source = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const slug = "medicare-changes-2027";
const start = source.indexOf(`    slug: "${slug}"`);
const end = source.indexOf('\n  {\n    slug: "', start + 10);
const article = source.slice(start, end === -1 ? undefined : end);

test("2027 Medicare changes article contains no malformed hyperlink markup", () => {
  assert.ok(start >= 0, "Article must exist");
  assert.equal(/\[\[[A-Za-z]/.test(article), false, "Nested Markdown links must not remain");
  assert.equal(article.includes("<a href="), false, "Raw HTML anchors must not remain");
  assert.equal(article.includes(")](/"), false, "Malformed nested link suffixes must not remain");
});

test("2027 Medicare changes article links point to the intended resources", () => {
  for (const expectedLink of [
    "[Medicare Advantage benefit structures](/faqs/medicare-advantage-extra-benefits-explained-whats-really-included/)",
    "[comparing plans](/medicare-plans/)",
    "[Medicare Advantage plans](/medicare-part-c/medicare-advantage-plans/)",
    "[Medicare Advantage Open Enrollment Period](/faqs/medicare-advantage-open-enrollment-period/)",
    "[CMS annual premium announcements](https://www.cms.gov/newsroom)",
    "[Social Security's IRMAA guidance](https://www.ssa.gov/medicare/i-agree/higher-premiums)",
    "[Medicare's penalty guidelines](https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties)",
  ]) {
    assert.ok(article.includes(expectedLink), `Article must include: ${expectedLink}`);
  }

  assert.equal(
    article.includes("/faqs/medicare-coverage-for-disabled-under-65/"),
    false,
    "General plan-comparison links must not point to disability eligibility content",
  );
});
