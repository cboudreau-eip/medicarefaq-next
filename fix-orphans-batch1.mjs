/**
 * Fix Orphaned FAQ Articles — Batch 1 (first 25)
 * 
 * Strategy: For each orphaned article, find 2-3 articles in the same category
 * that already have relatedSlugs, and add the orphan's slug to their relatedSlugs array.
 * 
 * This version uses a safe string manipulation approach:
 * - Find the target article by its slug definition
 * - From that position, find the next "relatedSlugs: [" 
 * - Find the matching "]" for that specific bracket
 * - Insert the new slug before the "]"
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const libDir = join(process.cwd(), 'src', 'lib');

// First 25 orphaned slugs from the audit
const orphanedSlugs = [
  "25-medicare-qas-you-should-know",
  "all-in-one-medicare-plan",
  "ambulance-and-medicare-coverage",
  "average-cost-of-medicare-advantage",
  "can-my-employer-pay-my-medicare-premiums",
  "can-you-get-medicare-without-receiving-social-security-benefits",
  "checklist-preparing-for-medicare-enrollment-in-2026",
  "coverage-gap-discount-program",
  "delay-medicare",
  "dental-and-vision-insurance-for-seniors",
  "differences-between-medicare-and-social-security",
  "do-disposable-adult-diaper-manufacturers-have-assistance-programs-for-free-or-reduced-cost-depends",
  "do-i-really-need-supplemental-insurance-with-medicare",
  "does-medicare-cover-a-biopsy",
  "does-medicare-cover-alzheimers-care",
  "does-medicare-cover-an-echocardiogram",
  "does-medicare-cover-asthma-inhalers",
  "does-medicare-cover-atrial-fibrillation",
  "does-medicare-cover-atrial-fibrillation-afib",
  "does-medicare-cover-bathroom-safety-devices",
  "does-medicare-cover-botox",
  "does-medicare-cover-cataract-surgery",
  "does-medicare-cover-cologuard",
  "does-medicare-cover-copd",
  "does-medicare-cover-dentures",
];

// Step 1: Load all article data to understand categories
function loadAllArticles() {
  const articles = new Map(); // slug -> { category, file }
  
  // Load coverage-data.ts
  const coverageContent = readFileSync(join(libDir, 'coverage-data.ts'), 'utf-8');
  const coverageSlugs = [...coverageContent.matchAll(/slug:\s*"([^"]+)"/g)];
  const coverageCategories = [...coverageContent.matchAll(/category:\s*"([^"]+)"/g)];
  for (let i = 0; i < coverageSlugs.length; i++) {
    articles.set(coverageSlugs[i][1], { 
      category: coverageCategories[i]?.[1] || 'Medicare Coverage', 
      file: 'coverage-data.ts' 
    });
  }
  
  // Load simple-faq-data batches
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

/**
 * Safely add a slug to a target article's relatedSlugs array in a file.
 * Returns the modified content, or null if it couldn't be done.
 */
function addToRelatedSlugs(content, targetSlug, orphanSlug) {
  // Find the target article's slug definition
  const slugDef = `slug: "${targetSlug}"`;
  const slugDefAlt = `slug: '${targetSlug}'`;
  let slugPos = content.indexOf(slugDef);
  if (slugPos === -1) slugPos = content.indexOf(slugDefAlt);
  if (slugPos === -1) return null;
  
  // From that position, find the next "relatedSlugs: ["
  const relatedStart = content.indexOf('relatedSlugs:', slugPos);
  if (relatedStart === -1) return null;
  
  // Make sure this relatedSlugs belongs to this article (not the next one)
  // Check there's no new "slug:" definition between slugPos and relatedStart
  const nextSlugDef = content.indexOf('\n    slug:', slugPos + slugDef.length);
  if (nextSlugDef !== -1 && nextSlugDef < relatedStart) return null;
  
  // Find the opening "[" after "relatedSlugs:"
  const bracketOpen = content.indexOf('[', relatedStart);
  if (bracketOpen === -1) return null;
  
  // Find the matching "]" - count brackets
  let depth = 0;
  let bracketClose = -1;
  for (let i = bracketOpen; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        bracketClose = i;
        break;
      }
    }
  }
  if (bracketClose === -1) return null;
  
  // Check if orphan slug is already in this array
  const arrayContent = content.substring(bracketOpen, bracketClose + 1);
  if (arrayContent.includes(orphanSlug)) return null;
  
  // Insert the new slug before the closing "]"
  const beforeClose = content.substring(0, bracketClose);
  const afterClose = content.substring(bracketClose);
  
  // Determine separator - check if array has content
  const innerContent = content.substring(bracketOpen + 1, bracketClose).trim();
  let insertion;
  if (innerContent === '') {
    insertion = `"${orphanSlug}"`;
  } else {
    insertion = `, "${orphanSlug}"`;
  }
  
  return beforeClose + insertion + afterClose;
}

const allArticles = loadAllArticles();
console.log(`Loaded ${allArticles.size} total articles\n`);

// Step 2: For each orphan, find target articles to add it to
const assignments = []; // { targetSlug, orphanSlug, file }

for (const orphanSlug of orphanedSlugs) {
  const orphanData = allArticles.get(orphanSlug);
  if (!orphanData) {
    console.log(`WARNING: Could not find data for orphan: ${orphanSlug}`);
    continue;
  }
  
  const orphanCategory = orphanData.category;
  
  // Find articles in the same category
  const sameCategoryCandidates = [];
  const otherCandidates = [];
  
  for (const [slug, data] of allArticles) {
    if (slug === orphanSlug) continue;
    if (data.category === orphanCategory) {
      sameCategoryCandidates.push({ slug, ...data });
    } else {
      // Check keyword overlap for cross-category matches
      const orphanWords = new Set(orphanSlug.split('-').filter(w => w.length > 3));
      const slugWords = slug.split('-').filter(w => w.length > 3);
      const overlap = slugWords.filter(w => orphanWords.has(w)).length;
      if (overlap >= 2) {
        otherCandidates.push({ slug, ...data, overlap });
      }
    }
  }
  
  // Pick targets: prefer same category, then keyword overlap
  const candidates = [...sameCategoryCandidates, ...otherCandidates.sort((a, b) => b.overlap - a.overlap)];
  
  // Pick 3 targets (skip the orphan itself and other orphans in this batch when possible)
  const targets = candidates
    .filter(c => !orphanedSlugs.includes(c.slug)) // prefer non-orphan targets
    .slice(0, 3);
  
  // If we don't have 3, allow orphan targets too
  if (targets.length < 3) {
    const remaining = candidates
      .filter(c => !targets.find(t => t.slug === c.slug))
      .slice(0, 3 - targets.length);
    targets.push(...remaining);
  }
  
  for (const target of targets) {
    assignments.push({ targetSlug: target.slug, orphanSlug, file: target.file });
  }
  
  if (targets.length === 0) {
    console.log(`WARNING: No candidates found for orphan: ${orphanSlug} (category: ${orphanCategory})`);
  }
}

console.log(`Total assignments to process: ${assignments.length}\n`);

// Step 3: Group by file and apply edits
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
    } else {
      // Try alternate quote style
      // Skip silently - might already exist or target not found
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
console.log(`Files modified: ${[...fileEdits.entries()].filter(([,e]) => e.length > 0).length}`);
