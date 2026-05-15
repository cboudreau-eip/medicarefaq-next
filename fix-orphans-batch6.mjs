/**
 * Fix Orphaned FAQ Articles — Batch 6 (articles 126-150)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const libDir = join(process.cwd(), 'src', 'lib');

const orphanedSlugs = [
  "medicare-qualified-government-wages",
  "medicare-reimbursement",
  "medicare-replacement-plans",
  "medicare-silversneakers-program",
  "medicare-vision-care-coverage",
  "medicare-visiting-angels",
  "medicare-vs-medicaid",
  "native-american-health-and-medicare",
  "nevada-birthday-rule",
  "new-medicare-changes",
  "observation-vs-inpatient-why-it-can-affect-your-medicare-bill",
  "part-b-excess-charges-medicare-overcharge-measure",
  "part-d-plans-what-you-need-to-know-to-minimize-costs",
  "protect-yourself-from-medicare-penalties-and-deadlines",
  "qualified-medicare-beneficiary-program",
  "rheumatoid-arthritis-treatment-and-medicare-coverage",
  "six-protected-classes",
  "top-10-medicare-supplement-insurance-companies",
  "top-5-dental-insurance-for-seniors",
  "understanding-medicare-assignment-what-it-means-for-your-costs",
  "understanding-the-intersection-of-tricare-va-benefits-and-medicare",
  "what-dental-expenses-does-medicare-cover",
  "what-does-medicare-part-a-cover",
  "what-is-a-medicare-part-d-formulary",
  "what-is-durable-medical-equipment-dme",
];

const targetUsageCount = new Map();

function loadAllArticles() {
  const articles = new Map();
  
  const coverageContent = readFileSync(join(libDir, 'coverage-data.ts'), 'utf-8');
  const coverageSlugs = [...coverageContent.matchAll(/slug:\s*"([^"]+)"/g)];
  const coverageCategories = [...coverageContent.matchAll(/category:\s*"([^"]+)"/g)];
  for (let i = 0; i < coverageSlugs.length; i++) {
    articles.set(coverageSlugs[i][1], { 
      category: coverageCategories[i]?.[1] || 'Medicare Coverage', 
      file: 'coverage-data.ts'
    });
  }
  
  for (let i = 1; i <= 9; i++) {
    const filename = `simple-faq-data-batch${i}.ts`;
    const content = readFileSync(join(libDir, filename), 'utf-8');
    const slugs = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
    const categories = [...content.matchAll(/category:\s*["']([^"']+)["']/g)];
    for (let j = 0; j < slugs.length; j++) {
      articles.set(slugs[j][1], { 
        category: categories[j]?.[1] || 'Medicare FAQ', 
        file: filename
      });
    }
  }
  
  return articles;
}

function addToRelatedSlugs(content, targetSlug, orphanSlug) {
  const slugDef = `slug: "${targetSlug}"`;
  const slugDefAlt = `slug: '${targetSlug}'`;
  let slugPos = content.indexOf(slugDef);
  if (slugPos === -1) slugPos = content.indexOf(slugDefAlt);
  if (slugPos === -1) return null;
  
  const relatedStart = content.indexOf('relatedSlugs:', slugPos);
  if (relatedStart === -1) return null;
  
  const nextSlugDef = content.indexOf('\n    slug:', slugPos + slugDef.length);
  if (nextSlugDef !== -1 && nextSlugDef < relatedStart) return null;
  
  const bracketOpen = content.indexOf('[', relatedStart);
  if (bracketOpen === -1) return null;
  
  let depth = 0;
  let bracketClose = -1;
  for (let i = bracketOpen; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) { bracketClose = i; break; }
    }
  }
  if (bracketClose === -1) return null;
  
  const arrayContent = content.substring(bracketOpen, bracketClose + 1);
  if (arrayContent.includes(orphanSlug)) return null;
  
  const beforeClose = content.substring(0, bracketClose);
  const afterClose = content.substring(bracketClose);
  const innerContent = content.substring(bracketOpen + 1, bracketClose).trim();
  
  let insertion;
  if (innerContent === '') {
    insertion = `"${orphanSlug}"`;
  } else {
    insertion = `, "${orphanSlug}"`;
  }
  
  return beforeClose + insertion + afterClose;
}

function getKeywords(slug) {
  const stopWords = new Set(['does', 'medicare', 'cover', 'the', 'and', 'for', 'what', 'how', 'are', 'can', 'you', 'your', 'with', 'from', 'is', 'whats', 'not']);
  return slug.split('-').filter(w => w.length > 2 && !stopWords.has(w));
}

const allArticles = loadAllArticles();
console.log(`Loaded ${allArticles.size} total articles\n`);

const assignments = [];

for (const orphanSlug of orphanedSlugs) {
  const orphanData = allArticles.get(orphanSlug);
  if (!orphanData) {
    console.log(`WARNING: Could not find data for orphan: ${orphanSlug}`);
    continue;
  }
  
  const orphanCategory = orphanData.category;
  const orphanKeywords = new Set(getKeywords(orphanSlug));
  
  const scored = [];
  for (const [slug, data] of allArticles) {
    if (slug === orphanSlug) continue;
    if (orphanedSlugs.includes(slug)) continue;
    
    let score = 0;
    if (data.category === orphanCategory) score += 10;
    
    const targetKeywords = getKeywords(slug);
    const overlap = targetKeywords.filter(w => orphanKeywords.has(w)).length;
    score += overlap * 5;
    
    if (orphanCategory === 'Medicare Coverage' && data.category === 'Medicare Coverage') score += 3;
    
    const usageCount = targetUsageCount.get(slug) || 0;
    score -= usageCount * 15;
    
    if (data.file !== orphanData.file) score += 2;
    
    if (score > 0) scored.push({ slug, score, ...data });
  }
  
  scored.sort((a, b) => b.score - a.score);
  const targets = scored.slice(0, 3);
  
  for (const target of targets) {
    assignments.push({ targetSlug: target.slug, orphanSlug, file: target.file });
    targetUsageCount.set(target.slug, (targetUsageCount.get(target.slug) || 0) + 1);
  }
  
  if (targets.length === 0) {
    console.log(`WARNING: No candidates found for orphan: ${orphanSlug}`);
  }
}

console.log(`Total assignments to process: ${assignments.length}`);
console.log(`Unique targets used: ${targetUsageCount.size}\n`);

const fileEdits = new Map();
for (const a of assignments) {
  if (!fileEdits.has(a.file)) fileEdits.set(a.file, []);
  fileEdits.get(a.file).push(a);
}

let totalEdits = 0;
for (const [filename, edits] of fileEdits) {
  const filePath = join(libDir, filename);
  let content = readFileSync(filePath, 'utf-8');
  let editCount = 0;
  
  for (const { targetSlug, orphanSlug } of edits) {
    const result = addToRelatedSlugs(content, targetSlug, orphanSlug);
    if (result) {
      content = result;
      editCount++;
      console.log(`  + "${orphanSlug}" → ${targetSlug} (${filename})`);
    }
  }
  
  if (editCount > 0) {
    writeFileSync(filePath, content);
    console.log(`  [Saved ${filename}: ${editCount} edits]\n`);
    totalEdits += editCount;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Orphans processed: ${orphanedSlugs.length}`);
console.log(`Total relatedSlugs additions: ${totalEdits}`);
console.log(`Unique target articles used: ${targetUsageCount.size}`);
console.log(`Max links added to any single target: ${Math.max(...targetUsageCount.values())}`);
