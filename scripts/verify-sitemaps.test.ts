import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildXml, latestContentDate, recordContentDate } from "../src/lib/sitemap";
import { generateSitemapDates } from "./generate-sitemap-dates.mjs";
import { blogArticles } from "../src/lib/blog-articles-data";
import { coverageArticles } from "../src/lib/coverage-data";
import { simpleFAQArticles } from "../src/lib/simple-faq-data";

const families = ["pages", "plans", "faqs", "blog", "enrollment", "original-medicare"];
async function entries() {
  return (await Promise.all(families.map(async family => {
    const { GET } = await import("../src/app/sitemaps/" + family + "/route");
    const response = GET(); assert.equal(response.status, 200);
    const xml = await response.text(); assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
    return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => ({ url: match[1].match(/<loc>(.*?)<\/loc>/)![1], lastmod: match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1] }));
  }))).flat();
}
test("sitemaps retain articles, include missing families and exclude utility/test pages", async () => {
  const all = await entries(); const urls = new Set(all.map(entry => entry.url)); const base = "https://www.medicarefaq.com";
  assert.equal(urls.size, all.length, "No duplicate URLs across sitemaps");
  for (const article of blogArticles) assert.equal(urls.has(base + "/blog/" + article.slug + "/"), !article.draft, article.slug);
  for (const article of [...coverageArticles, ...simpleFAQArticles]) assert.ok(urls.has(base + "/faqs/" + article.slug + "/"), article.slug);
  for (const route of ["/tools/decision-kit/", "/medicare-open-enrollment/", "/medicare-by-state/", "/medigap-plans/", "/about-us/david-haass/", "/original-medicare/medicare-costs/", "/original-medicare/medicare-eligibility/"]) assert.ok(urls.has(base + route), route);
  assert.equal(all.filter(entry => new URL(entry.url).pathname.startsWith("/medicare-101-course/")).length, 8);
  const states = fs.readdirSync("src/app/medicare-supplement-plans", {withFileTypes:true}).filter(dir => dir.isDirectory() && fs.existsSync("src/app/medicare-supplement-plans/"+dir.name+"/page.tsx") && !["compare", "medigap-eligibility", "medicare-supplement-plans-2026", "medigap-by-carrier", "medigap-by-state", "[planSlug]"].includes(dir.name));
  assert.equal(states.length, 50);
  for (const state of states) assert.ok(urls.has(base+"/medicare-supplement-plans/"+state.name+"/"), state.name);
  for (const route of ["/aep-banner-test/", "/design-system/", "/find-plans/", "/compare-rates/", "/medicare-101-course/results/", "/homepage-menu-test-1/"]) assert.ok(!urls.has(base+route), route);
  for (const entry of all) if(entry.lastmod) assert.ok(Number.isFinite(Date.parse(entry.lastmod)));
});
test("dates reflect recorded updates and omit unknown dates", async () => {
  assert.equal(latestContentDate("2026-01-01", "October 6, 2026"), "2026-10-06T00:00:00.000Z");
  assert.equal(latestContentDate(undefined, "invalid"), undefined);
  assert.equal(recordContentDate({lastReviewed:"2026-01-01",dateUpdated:"2026-09-30"}), "2026-09-30T00:00:00.000Z");
  assert.equal(recordContentDate({review:{date:"2026-09-18"}}),"2026-09-18T00:00:00.000Z");
  const all=await entries();
  const article=blogArticles.find(a=>a.slug==="best-medicare-plan-comparison-tools")!;
  assert.equal(all.find(e=>e.url.endsWith("/blog/"+article.slug+"/"))?.lastmod,latestContentDate(article.dateUpdated,article.date));
  assert.equal(all.find(e=>e.url.endsWith("/new-to-medicare/costs/"))?.lastmod,"2026-08-07T00:00:00.000Z");
  const xml=buildXml([{url:"https://www.medicarefaq.com/unknown/?x=1&y=2",priority:"0.7",changefreq:"monthly"}]);
  assert.ok(!xml.includes("lastmod")); assert.ok(xml.includes("&amp;"));
});
test("build regeneration picks up changed source dates without executing pages", () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"sitemap-test-"));
  fs.mkdirSync(path.join(root,"src/app/example"),{recursive:true}); fs.mkdirSync(path.join(root,"src/lib"),{recursive:true});
  const page=path.join(root,"src/app/example/page.tsx");
  fs.writeFileSync(page,'throw new Error("must not execute"); const schema={dateModified:"2026-09-01"};');
  generateSitemapDates(root);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root,"src/lib/sitemap-page-dates.json"),"utf8"))["/example/"],"2026-09-01T00:00:00.000Z");
  fs.writeFileSync(page,'const schema={dateModified:"2026-10-12"};'); generateSitemapDates(root);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root,"src/lib/sitemap-page-dates.json"),"utf8"))["/example/"],"2026-10-12T00:00:00.000Z");
});
test("the three corrected canonicals use their served addresses",()=>{
  for (const route of ["medicare-part-c/medicare-advantage-plans", "medicare-enrollment/annual-changes"]) {
    const source=fs.readFileSync("src/app/"+route+"/page.tsx","utf8"); assert.ok(source.includes('canonical: "https://www.medicarefaq.com/'+route+'/"'));
  }
  const article=blogArticles.find(a=>a.slug==="medicare-supplements-cost-vs-value-explained")!;
  assert.equal(article.seo?.canonical,"https://www.medicarefaq.com/blog/"+article.slug+"/");
});
