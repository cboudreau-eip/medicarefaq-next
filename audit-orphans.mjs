/**
 * Orphan Page Audit Script (v2 — improved relatedSlugs detection)
 * 
 * Finds all FAQ article slugs and checks which ones are never referenced
 * as a relatedSlug or internal link from any other page on the site.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');
const libDir = join(srcDir, 'lib');

// Step 1: Collect all FAQ slugs
const allFaqSlugs = new Set();
const allBlogSlugs = new Set();

const coverageData = readFileSync(join(libDir, 'coverage-data.ts'), 'utf-8');
for (const match of coverageData.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
  allFaqSlugs.add(match[1]);
}

for (let i = 1; i <= 9; i++) {
  try {
    const content = readFileSync(join(libDir, `simple-faq-data-batch${i}.ts`), 'utf-8');
    for (const match of content.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
      allFaqSlugs.add(match[1]);
    }
  } catch (e) {}
}

try {
  const simpleFaqMain = readFileSync(join(libDir, 'simple-faq-data.ts'), 'utf-8');
  for (const match of simpleFaqMain.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
    allFaqSlugs.add(match[1]);
  }
} catch (e) {}

const blogData = readFileSync(join(libDir, 'blog-articles-data.ts'), 'utf-8');
for (const match of blogData.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)) {
  allBlogSlugs.add(match[1]);
}

console.log(`Total FAQ slugs found: ${allFaqSlugs.size}`);
console.log(`Total Blog slugs found: ${allBlogSlugs.size}`);

// Step 2: For data files, parse each article's relatedSlugs and build a reverse map
// This is more reliable than regex matching across the whole file

function parseRelatedSlugsFromDataFile(content) {
  // Returns a map: articleSlug -> [relatedSlug1, relatedSlug2, ...]
  const articles = new Map();
  
  // Find each article block by its slug definition
  const slugPattern = /slug:\s*["']([^"']+)["']/g;
  let match;
  const slugPositions = [];
  
  while ((match = slugPattern.exec(content)) !== null) {
    slugPositions.push({ slug: match[1], pos: match.index });
  }
  
  for (let i = 0; i < slugPositions.length; i++) {
    const { slug, pos } = slugPositions[i];
    const nextPos = i + 1 < slugPositions.length ? slugPositions[i + 1].pos : content.length;
    const block = content.substring(pos, nextPos);
    
    // Find relatedSlugs array in this block
    const relIdx = block.indexOf('relatedSlugs:');
    if (relIdx === -1) continue;
    
    const bracketOpen = block.indexOf('[', relIdx);
    if (bracketOpen === -1) continue;
    
    let depth = 0;
    let bracketClose = -1;
    for (let j = bracketOpen; j < block.length; j++) {
      if (block[j] === '[') depth++;
      if (block[j] === ']') { depth--; if (depth === 0) { bracketClose = j; break; } }
    }
    if (bracketClose === -1) continue;
    
    const arrayStr = block.substring(bracketOpen + 1, bracketClose);
    const relatedSlugs = [];
    for (const m of arrayStr.matchAll(/["']([^"']+)["']/g)) {
      relatedSlugs.push(m[1]);
    }
    
    articles.set(slug, relatedSlugs);
  }
  
  return articles;
}

// Build reverse map: slug -> set of articles that reference it in relatedSlugs
const faqSlugReferences = new Map();
for (const slug of allFaqSlugs) {
  faqSlugReferences.set(slug, new Set());
}

const blogSlugReferences = new Map();
for (const slug of allBlogSlugs) {
  blogSlugReferences.set(slug, new Set());
}

// Parse all data files for relatedSlugs
const dataFiles = ['coverage-data.ts'];
for (let i = 1; i <= 9; i++) dataFiles.push(`simple-faq-data-batch${i}.ts`);
try { readFileSync(join(libDir, 'simple-faq-data.ts')); dataFiles.push('simple-faq-data.ts'); } catch (e) {}
dataFiles.push('blog-articles-data.ts');

for (const filename of dataFiles) {
  try {
    const content = readFileSync(join(libDir, filename), 'utf-8');
    const articlesMap = parseRelatedSlugsFromDataFile(content);
    
    for (const [articleSlug, relatedSlugs] of articlesMap) {
      for (const relSlug of relatedSlugs) {
        // This related slug is referenced from articleSlug
        if (faqSlugReferences.has(relSlug)) {
          faqSlugReferences.get(relSlug).add(`${filename}:${articleSlug}`);
        }
        if (blogSlugReferences.has(relSlug)) {
          blogSlugReferences.get(relSlug).add(`${filename}:${articleSlug}`);
        }
      }
    }
  } catch (e) {}
}

// Step 3: Also scan page/component files for href links
function findAllTsxFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...findAllTsxFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) && !entry.name.includes('data')) {
      results.push(fullPath);
    }
  }
  return results;
}

const pageFiles = findAllTsxFiles(srcDir);
console.log(`Scanning ${pageFiles.length} page/component files for href links...`);
console.log(`Scanning ${dataFiles.length} data files for relatedSlugs...\n`);

for (const filePath of pageFiles) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(process.cwd() + '/', '');
  
  for (const slug of allFaqSlugs) {
    if (content.includes(`/faqs/${slug}`)) {
      faqSlugReferences.get(slug).add(relativePath);
    }
  }
  
  for (const slug of allBlogSlugs) {
    if (content.includes(`/blog/${slug}`)) {
      blogSlugReferences.get(slug).add(relativePath);
    }
  }
}

// Step 4: Report
const orphanedFaqs = [];
for (const [slug, refs] of faqSlugReferences) {
  if (refs.size === 0) {
    orphanedFaqs.push(slug);
  }
}

const orphanedBlogs = [];
for (const [slug, refs] of blogSlugReferences) {
  if (refs.size === 0) {
    orphanedBlogs.push(slug);
  }
}

console.log(`=== ORPHANED FAQ ARTICLES (no internal links pointing to them) ===`);
console.log(`Count: ${orphanedFaqs.length} out of ${allFaqSlugs.size} total\n`);
orphanedFaqs.sort().forEach((slug, i) => {
  console.log(`  ${i + 1}. /faqs/${slug}`);
});

console.log(`\n=== ORPHANED BLOG ARTICLES ===`);
console.log(`Count: ${orphanedBlogs.length} out of ${allBlogSlugs.size} total\n`);
orphanedBlogs.sort().forEach((slug, i) => {
  console.log(`  ${i + 1}. /blog/${slug}`);
});

const wellLinked = [...faqSlugReferences.entries()]
  .filter(([, refs]) => refs.size >= 3)
  .sort((a, b) => b[1].size - a[1].size)
  .slice(0, 10);

console.log(`\n=== TOP 10 BEST-LINKED FAQ ARTICLES ===`);
wellLinked.forEach(([slug, refs]) => {
  console.log(`  ${refs.size} refs: /faqs/${slug}`);
});
