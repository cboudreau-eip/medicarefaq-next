/**
 * Orphan Page Audit Script
 * 
 * Finds all FAQ article slugs and checks which ones are never referenced
 * as a relatedSlug or internal link from any other page on the site.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');
const libDir = join(srcDir, 'lib');

// Step 1: Collect all FAQ slugs (from coverage-data, simple-faq-data-batch*, blog-articles-data)
const allFaqSlugs = new Set();
const allBlogSlugs = new Set();

// Read coverage-data.ts to get coverage article slugs
const coverageData = readFileSync(join(libDir, 'coverage-data.ts'), 'utf-8');
const coverageSlugsMatch = coverageData.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g);
for (const match of coverageSlugsMatch) {
  allFaqSlugs.add(match[1]);
}

// Read simple-faq-data batches
for (let i = 1; i <= 9; i++) {
  const filePath = join(libDir, `simple-faq-data-batch${i}.ts`);
  try {
    const content = readFileSync(filePath, 'utf-8');
    const slugMatches = content.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g);
    for (const match of slugMatches) {
      allFaqSlugs.add(match[1]);
    }
  } catch (e) {
    // file doesn't exist, skip
  }
}

// Also check simple-faq-data.ts (the main one)
try {
  const simpleFaqMain = readFileSync(join(libDir, 'simple-faq-data.ts'), 'utf-8');
  const slugMatches = simpleFaqMain.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g);
  for (const match of slugMatches) {
    allFaqSlugs.add(match[1]);
  }
} catch (e) {}

// Read blog-articles-data.ts for blog slugs
const blogData = readFileSync(join(libDir, 'blog-articles-data.ts'), 'utf-8');
const blogSlugsMatch = blogData.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g);
for (const match of blogSlugsMatch) {
  allBlogSlugs.add(match[1]);
}

console.log(`Total FAQ slugs found: ${allFaqSlugs.size}`);
console.log(`Total Blog slugs found: ${allBlogSlugs.size}`);

// Step 2: Find all references to each slug across the entire codebase
// We look for:
// - relatedSlugs arrays
// - href="/faqs/SLUG" links in page components
// - Any other internal link references

function findAllTsxFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...findAllTsxFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = findAllTsxFiles(srcDir);
console.log(`Scanning ${allFiles.length} source files for internal links...\n`);

// Build a map: slug -> set of files that reference it
const faqSlugReferences = new Map();
for (const slug of allFaqSlugs) {
  faqSlugReferences.set(slug, new Set());
}

const blogSlugReferences = new Map();
for (const slug of allBlogSlugs) {
  blogSlugReferences.set(slug, new Set());
}

for (const filePath of allFiles) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(process.cwd() + '/', '');
  
  for (const slug of allFaqSlugs) {
    // Check if this file references the slug (but not as its own definition)
    // Look for the slug in relatedSlugs, href attributes, Link components, etc.
    if (content.includes(slug)) {
      // Don't count self-references (the file that defines this slug)
      const isOwnDefinition = content.includes(`slug: "${slug}"`) || 
                               content.includes(`slug: '${slug}'`) ||
                               content.includes(`slug: \`${slug}\``);
      
      // For simple-faq and coverage data files, only count if it's in a relatedSlugs array
      if (relativePath.includes('simple-faq-data') || relativePath.includes('coverage-data')) {
        // Check if this slug appears in a relatedSlugs context (not its own definition)
        const relatedPattern = new RegExp(`relatedSlugs[^\\]]*${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 's');
        if (relatedPattern.test(content) && !isOwnDefinition) {
          faqSlugReferences.get(slug).add(relativePath);
        } else if (!isOwnDefinition && content.includes(`"${slug}"`) && !content.includes(`slug: "${slug}"`)) {
          // It appears somewhere else in the file (maybe in another article's relatedSlugs)
          faqSlugReferences.get(slug).add(relativePath);
        }
      } else {
        // For page components, check for href links or any reference
        if (content.includes(`/faqs/${slug}`) || content.includes(`"/faqs/${slug}"`) || content.includes(`'/faqs/${slug}'`)) {
          faqSlugReferences.get(slug).add(relativePath);
        }
      }
    }
  }
  
  for (const slug of allBlogSlugs) {
    if (content.includes(slug)) {
      const isOwnDefinition = content.includes(`slug: "${slug}"`) || 
                               content.includes(`slug: '${slug}'`) ||
                               content.includes(`slug: \`${slug}\``);
      if (!isOwnDefinition) {
        if (content.includes(`/blog/${slug}`) || content.includes(`"${slug}"`) || content.includes(`'${slug}'`)) {
          blogSlugReferences.get(slug).add(filePath.replace(process.cwd() + '/', ''));
        }
      }
    }
  }
}

// Step 3: Report orphaned pages
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

// Step 4: Show well-linked pages for comparison
const wellLinked = [...faqSlugReferences.entries()]
  .filter(([, refs]) => refs.size >= 3)
  .sort((a, b) => b[1].size - a[1].size)
  .slice(0, 10);

console.log(`\n=== TOP 10 BEST-LINKED FAQ ARTICLES ===`);
wellLinked.forEach(([slug, refs]) => {
  console.log(`  ${refs.size} refs: /faqs/${slug}`);
});
