// Generate src/lib/cms-pages-manifest.json — an inventory of all editable
// public static pages, with their route, file path, title, and capability flags.
//
// Usage:
//   node scripts/generate-pages-manifest.mjs
//
// The script is self-contained: it compiles the TypeScript parser
// (src/lib/cms-page-meta.ts) to a temp dir on demand, then imports it.
//
// The manifest is committed to the repo so the CMS inventory API is fast and
// deterministic in production (no recursive GitHub scan at request time).

import { readFileSync, writeFileSync, mkdtempSync, writeFileSync as wf } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// Compile the parser to a temp dir so this script is runnable standalone.
const cwd = process.cwd();
const outDir = mkdtempSync(join(tmpdir(), "cmsmeta-"));
const tmpTsconfig = join(outDir, "tsconfig.json");
const parserTs = resolve(cwd, "src/lib/cms-page-meta.ts");
wf(
  tmpTsconfig,
  JSON.stringify({
    compilerOptions: {
      module: "esnext",
      target: "es2020",
      moduleResolution: "bundler",
      outDir,
      rootDir: cwd,
      skipLibCheck: true,
      ignoreDeprecations: "6.0",
      esModuleInterop: true,
    },
    // Absolute path so resolution is independent of the tsconfig location.
    files: [parserTs],
  })
);
execFileSync(resolve(cwd, "node_modules/.bin/tsc"), ["-p", tmpTsconfig], { stdio: "inherit" });
const compiled = join(outDir, "src/lib/cms-page-meta.js");
const { parsePageMeta } = await import(pathToFileURL(compiled).href);

const APP_DIR = "src/app";

// Routes we never expose for editing.
function isExcluded(routePath, filePath) {
  if (filePath.includes("/admin/")) return true;          // CMS internals
  if (filePath.includes("/api/")) return true;            // API routes
  if (routePath.includes("[")) return true;               // dynamic routes
  if (filePath.includes("/prismic/")) return true;        // external CMS
  const devOnly = ["/test-speed", "/design-system", "/theme-preview"];
  if (devOnly.some((d) => routePath === d || routePath.startsWith(d + "/"))) return true;
  return false;
}

// Convert a page.tsx file path to its public route.
function toRoute(filePath) {
  let r = filePath.replace(/^src\/app/, "").replace(/\/page\.tsx$/, "");
  // strip route groups like (marketing)
  r = r.replace(/\/\([^/]+\)/g, "");
  if (r === "") r = "/";
  return r;
}

function walk(dir, acc) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (entry === "page.tsx") acc.push(full);
  }
  return acc;
}

// The 50 US states (slugs) that have templated Medigap pages.
const STATE_SLUGS = new Set([
  "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
  "delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
  "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
  "minnesota","mississippi","missouri","montana","nebraska","nevada","new-hampshire",
  "new-jersey","new-mexico","new-york","north-carolina","north-dakota","ohio",
  "oklahoma","oregon","pennsylvania","rhode-island","south-carolina","south-dakota",
  "tennessee","texas","utah","vermont","virginia","washington","west-virginia",
  "wisconsin","wyoming",
]);

// Classify a page into an editing tier.
function classify(routePath, meta) {
  // Templated state Medigap pages → eligible for full body editing later.
  const m = routePath.match(/^\/medicare-supplement-plans\/([a-z-]+)$/);
  const isStateMedigap = !!m && STATE_SLUGS.has(m[1]);

  return {
    contentEditable: isStateMedigap, // full body editing candidate (Phase 5)
    seoEditable: meta.hasMetadata,   // metadata editable
    hasSchema: meta.schemas.length > 0,
  };
}

const files = walk(APP_DIR, []);
const pages = [];

for (const filePath of files.sort()) {
  const routePath = toRoute(filePath);
  if (isExcluded(routePath, filePath)) continue;
  const src = readFileSync(filePath, "utf-8");
  const meta = parsePageMeta(src);
  const flags = classify(routePath, meta);
  pages.push({
    route: routePath,
    file: filePath,
    title: meta.title || "(untitled)",
    hasMetadata: meta.hasMetadata,
    schemaCount: meta.schemas.length,
    seoEditable: flags.seoEditable,
    contentEditable: flags.contentEditable,
    section: routePath.split("/")[1] || "(root)",
  });
}

const manifest = {
  generatedAt: new Date().toISOString(),
  count: pages.length,
  pages,
};

const out = "src/lib/cms-pages-manifest.json";
writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
console.log(`Wrote ${out} with ${pages.length} pages.`);

// Quick summary
const sections = {};
for (const p of pages) sections[p.section] = (sections[p.section] || 0) + 1;
console.log("Pages by section:");
for (const [s, n] of Object.entries(sections).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${s}: ${n}`);
}
const noMeta = pages.filter((p) => !p.hasMetadata);
const noSchema = pages.filter((p) => p.schemaCount === 0);
console.log(`\nPages without metadata block: ${noMeta.length}`);
console.log(`Pages without JSON-LD schema: ${noSchema.length}`);
const contentEditable = pages.filter((p) => p.contentEditable);
console.log(`Pages eligible for full content editing: ${contentEditable.length}`);
