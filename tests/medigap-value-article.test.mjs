import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const source = fs.readFileSync('src/lib/blog-article-medigap-value.ts', 'utf8');
const article = JSON.parse(source.slice(source.indexOf('= {') + 2, source.lastIndexOf('}') + 1));
const sections = article.sections;

test('article preserves CTA positions, links, and complete structured content', () => {
  const comparison = sections.findIndex(s => s.id === 'side-by-side-comparison');
  assert.equal(sections[comparison - 1].type, 'zip-cta');
  assert.equal(sections[comparison - 1].buttonLabel, 'Compare Medigap Options');
  const broker = sections.findIndex(s => s.id === 'independent-broker');
  assert.equal(sections[broker - 1].type, 'zip-cta');
  assert.equal(sections[broker - 1].buttonLabel, 'Explore My Options');
  assert.equal(sections.filter(s => s.type === 'zip-cta').length, 2);
  assert.equal(sections.filter(s => s.type === 'eddie-pro-tip').length, 1);
  assert.equal(sections.find(s => s.type === 'faq').faqs.length, 8);
  assert.deepEqual(article.tableOfContents.map(s => s.id), sections.filter(s => s.level === 2).map(s => s.id));
  assert.ok((source.match(/\]\(\//g) || []).length >= 6);
  assert.ok(!source.includes('\u2014'));
  assert.ok(!article.draft);
  assert.ok(fs.existsSync('public' + article.image));
  assert.equal(article.seo.canonical, `https://www.medicarefaq.com/blog/${article.slug}/`);
});
