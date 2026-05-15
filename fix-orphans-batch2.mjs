/**
 * Fix Orphaned FAQ Articles — Batch 2 (articles 26-50)
 * 
 * Improved distribution: tracks how many times each target article has been used
 * and penalizes over-used targets so links spread across more diverse articles.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const libDir = join(process.cwd(), 'src', 'lib');

// Batch 2: orphaned slugs 26-50
const orphanedSlugs = [
  "does-medicare-cover-diabetic-supplies",
  "does-medicare-cover-durable-medical-equipment",
  "does-medicare-cover-end-stage-renal-disease",
  "does-medicare-cover-eye-exams",
  "does-medicare-cover-gender-reassignment-surgery",
  "does-medicare-cover-glasses",
  "does-medicare-cover-glaucoma",
  "does-medicare-cover-hepatitis-c-screening",
  "does-medicare-cover-hormone-therapy-for-menopause",
  "does-medicare-cover-leqembi",
  "does-medicare-cover-life-alert",
  "does-medicare-cover-meals-on-wheels",
  "does-medicare-cover-memory-care",
  "does-medicare-cover-mental-health",
  "does-medicare-cover-ostomy-supplies",
  "does-medicare-cover-ozempic",
  "does-medicare-cover-podiatry",
  "does-medicare-cover-prosthetic-devices",
  "does-medicare-cover-robotic-surgery",
  "does-medicare-cover-root-canals",
  "does-medicare-cover-second-opinions-and-when-should-you-get-one",
  "does-medicare-cover-sleep-apnea",
  "does-medicare-cover-speech-therapy",
  "does-medicare-cover-telehealth",
  "does-medicare-cover-urinary-catheters",
];

// Track how many times each target article has been used (for distribution)
const targetUsageCount = new Map();

function loadAllArticles() {
  const articles = new Map();
  
  const coverageContent = readFileSync(join(libDir, 'coverage-data.ts'), 'utf-8');
  const coverageSlugs = [...coverageContent.matchAll(/slug:\s*"([^"]+)"/g)];
  const coverageCategories = [...coverageContent.matchAll(/category:\s*"([^"]+)"/g)];
  for (let i = 0; i < coverageSlugs.length; i++) {
    articles.set(coverageSlugs[i][1], { 
      category: coverageCategories[i]?.[1] || 'Medicare Coverage', 
      file: 'coverage-data.ts',
      index: i
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
        file: filename,
        index: j
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
  
  // Make sure this relatedSlugs belongs to this article
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

const allArticles = loadAllArticles();
console.log(`Loaded ${allArticles.size} total articles\n`);

// Build keyword index for better matching
function getKeywords(slug) {
  const stopWords = new Set(['does', 'medicare', 'cover', 'the', 'and', 'for', 'what', 'how', 'are', 'can', 'you', 'your', 'with', 'from']);
  return slug.split('-').filter(w => w.length > 2 && !stopWords.has(w));
}

// For each orphan, find 3 diverse target articles
const assignments = [];

for (const orphanSlug of orphanedSlugs) {
  const orphanData = allArticles.get(orphanSlug);
  if (!orphanData) {
    console.log(`WARNING: Could not find data for orphan: ${orphanSlug}`);
    continue;
  }
  
  const orphanCategory = orphanData.category;
  const orphanKeywords = new Set(getKeywords(orphanSlug));
  
  // Score all potential targets
  const scored = [];
  for (const [slug, data] of allArticles) {
    if (slug === orphanSlug) continue;
    if (orphanedSlugs.includes(slug)) continue; // Don't link to other orphans in this batch
    
    let score = 0;
    
    // Same category bonus
    if (data.category === orphanCategory) score += 10;
    
    // Keyword overlap bonus
    const targetKeywords = getKeywords(slug);
    const overlap = targetKeywords.filter(w => orphanKeywords.has(w)).length;
    score += overlap * 5;
    
    // Related category bonus (both are coverage articles)
    if (orphanCategory === 'Medicare Coverage' && data.category === 'Medicare Coverage') score += 3;
    
    // Penalize over-used targets heavily
    const usageCount = targetUsageCount.get(slug) || 0;
    score -= usageCount * 15;
    
    // Slight preference for articles in different files (diversity)
    if (data.file !== orphanData.file) score += 2;
    
    if (score > 0) {
      scored.push({ slug, score, ...data });
    }
  }
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Pick top 3 targets
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

// Apply edits grouped by file
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
