import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync('src/lib/blog-article-part-b-2027.ts','utf8');
const a=JSON.parse(source.slice(source.indexOf('= ')+2).trim().replace(/;$/,''));
test('final figures, income boundaries, and total-versus-surcharge arithmetic',()=>{
const table=a.sections.find(s=>s.title==='2027 Part B income brackets');
assert.deepEqual(table.rows.map(r=>r[3]),['$209.40','$293.10','$418.80','$544.40','$670.00','$711.80']);
for(const row of table.rows){const n=s=>Number(s.replace(/[$,]/g,''));assert.equal(Math.round((209.4+n(row[2]))*100),Math.round(n(row[3])*100));}
assert.equal(table.rows[5][0],'$500,000 or more');
assert.match(source,/3.6%/);assert.doesNotMatch(source,/\$294\.60|\$420\.70|\$546\.80|\$672\.90/);
});
test('one tracked CTA, complete FAQ and matching navigation',()=>{
assert.deepEqual(a.tableOfContents.map(t=>t.id),a.sections.filter(s=>s.type==='heading'&&s.level===2).map(s=>s.id));
assert.equal(a.sections.filter(s=>s.type==='zip-cta').length,1);assert.equal(a.sections.find(s=>s.type==='zip-cta').guideVariant,'medicare');
assert.equal(a.sections.filter(s=>s.type==='eddie-pro-tip').length,1);assert.equal(a.sections.find(s=>s.type==='faq').faqs.length,8);
assert.ok((source.match(/\]\(\//g)||[]).length>=5);assert.doesNotMatch(source,/—/);
const registry=JSON.parse(fs.readFileSync('docs/guide-cta-pages.json'));assert.ok(registry.pages.includes(a.seo.canonical));assert.ok(!registry.automatic['/blog/'+a.slug+'/']);
});
test('old entry consolidated with permanent redirect and no unrelated removal',()=>{
const data=fs.readFileSync('src/lib/blog-articles-data.ts','utf8');assert.ok(!data.includes('2027-medicare-part-b-premium-estimate'));
assert.equal((data.match(/  partB2027Article,/g)||[]).length,1);
assert.ok(data.includes('slug: "medicare-and-federal-retirement-fehb-fers-csrs"'));
assert.match(fs.readFileSync('next.config.ts','utf8'),/source: "\/blog\/2027-medicare-part-b-premium-estimate", destination: "\/blog\/medicare-part-b-premium-2027\/", permanent: true/);
for(const slug of a.relatedSlugs)assert.ok(data.includes('slug: "'+slug+'"'));
assert.equal(a.dateUpdated,'November 19, 2026');
});
