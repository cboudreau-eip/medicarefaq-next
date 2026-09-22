import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const articlePath = new URL("../src/lib/blog-articles-data.ts", import.meta.url);
const articleSource = fs.readFileSync(articlePath, "utf8");

function sliceArticle(source, slug) {
  const start = Math.max(
    source.indexOf(`"slug": "${slug}"`),
    source.indexOf(`slug: "${slug}"`)
  );
  if (start < 0) return null;

  const nextQuoted = source.indexOf('"slug": "', start + 1);
  const nextBare = source.indexOf('slug: "', start + 1);
  const candidates = [nextQuoted, nextBare].filter((index) => index >= 0);
  const end = candidates.length ? Math.min(...candidates) : source.length;

  return source.slice(start, end);
}

test("2027 immigrant Medicare article states the enacted law and exact timeline", () => {
  const article = sliceArticle(
    articleSource,
    "medicare-policy-shift-in-2027-impact-on-immigrant-eligibilit"
  );

  assert.ok(article, "Immigrant Medicare eligibility article must exist");
  assert.match(article, /Public Law 119-21/);
  assert.match(article, /enacted law/i);
  assert.match(article, /January 4, 2027/);
  assert.match(article, /February 1, 2027/);
  assert.match(article, /lawful permanent residents?[^\n]+protected|protected[^\n]+lawful permanent residents?/i);
  assert.match(article, /DACA status alone did not establish Medicare eligibility/i);
});

test("2027 immigrant Medicare article removes the prior factual errors", () => {
  const article = sliceArticle(
    articleSource,
    "medicare-policy-shift-in-2027-impact-on-immigrant-eligibilit"
  );

  for (const inaccurateText of [
    "proposed H.R. 1 rule",
    "Nothing is finalized yet",
    "No final rule exists yet",
    "$202.90",
    "$283",
    "$1,736",
    "$565",
  ]) {
    assert.equal(article.includes(inaccurateText), false, `Article must not contain: ${inaccurateText}`);
  }
});

test("2027 immigrant Medicare article follows the blog structure", () => {
  const article = sliceArticle(
    articleSource,
    "medicare-policy-shift-in-2027-impact-on-immigrant-eligibilit"
  );

  assert.equal((article.match(/type: "heading", level: 2/g) || []).length, 8);
  assert.equal((article.match(/question:/g) || []).length >= 8, true);
  assert.equal((article.match(/type: "eddie-pro-tip"/g) || []).length, 1);
  assert.ok(article.includes('type: "zip-cta"'));
  assert.equal((article.match(/\]\(\//g) || []).length >= 5, true);
  assert.equal(article.includes("—"), false, "Article must not contain em dashes");
});
