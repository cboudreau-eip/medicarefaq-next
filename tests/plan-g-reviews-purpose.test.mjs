import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const source = fs.readFileSync(new URL('../src/lib/simple-faq-data-batch6.ts', import.meta.url), 'utf8');
const normalized = source.replace(/\r\n/g, '\n');
const match = normalized.match(/  (\{\n    "slug": "medicare-plan-g-reviews"[\s\S]*?\n  \}),\n  \{\n    slug: 'report-medicare-fraud'/);
assert.ok(match, 'Bounded FAQ entry must exist');
const article = JSON.parse(match[1]);

test('preserves the existing URL and gives reviews a distinct purpose', () => {
  assert.equal(article.seo.canonical, 'https://www.medicarefaq.com/faqs/medicare-plan-g-reviews/');
  assert.match(article.title, /Complaints and Service Quality/);
  assert.equal(article.richSections.filter(s => s.type === 'faq').length, 1);
  assert.equal(article.richSections.find(s => s.type === 'faq').faqs.length, 4);
  const ids = article.richSections.filter(s => s.type === 'heading').map(s => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(!JSON.stringify(article).includes('—'));
});

test('includes source-backed complaint guidance and links to both companion articles', () => {
  const text = JSON.stringify(article);
  assert.match(text, /content.naic.org\/article\/how-file-complaint/);
  assert.match(text, /not necessarily Plan G-only/);
  assert.match(text, /Missing data is not a clean record/);
  for (const slug of ['best-medicare-supplement-plan-g-companies', 'medicare-plan-g-pros-and-cons']) {
    assert.ok(text.includes(`/blog/${slug}/`));
  }
  assert.equal(article.richSections.filter(s => s.type === 'table').length, 2);
});

test('both companion articles link back to the reviews resource', () => {
  const blogs = fs.readFileSync(new URL('../src/lib/blog-articles-data.ts', import.meta.url), 'utf8');
  for (const slug of ['best-medicare-supplement-plan-g-companies', 'medicare-plan-g-pros-and-cons']) {
    const marker = new RegExp('(?:"slug"|slug): "' + slug + '"');
    const offset = blogs.search(marker);
    assert.ok(offset >= 0);
    const tail = blogs.slice(offset + blogs.slice(offset).match(marker)[0].length);
    const end = tail.search(/(?:"slug"|slug): "/);
    assert.ok(tail.slice(0, end < 0 ? undefined : end).includes('/faqs/medicare-plan-g-reviews/'));
  }
});
