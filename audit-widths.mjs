/**
 * Content Width Audit Script
 * 
 * Scans all PageContent.tsx files and template components to identify
 * which max-width class each page uses for its main content wrapper.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const srcDir = join(process.cwd(), 'src');

function findFiles(dir, pattern) {
  const results = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...findFiles(fullPath, pattern));
      } else if (entry.isFile() && pattern.test(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

// Find all PageContent.tsx files and key template files
const pageFiles = findFiles(srcDir, /PageContent\.tsx$/);
const templateFiles = [
  'src/app/faqs/[slug]/CoverageArticleContent.tsx',
  'src/app/faqs/[slug]/SimpleFAQContent.tsx',
  'src/app/blog/[slug]/BlogPostContent.tsx',
].map(f => join(process.cwd(), f));

const allFiles = [...pageFiles, ...templateFiles];

// Width classes to look for (ordered from narrowest to widest)
const widthClasses = [
  'max-w-3xl',  // 768px
  'max-w-4xl',  // 896px
  'max-w-5xl',  // 1024px
  'max-w-6xl',  // 1152px
  'max-w-7xl',  // 1280px
  'container',  // 1280px (from globals.css)
];

const results = {
  'max-w-3xl': [],
  'max-w-4xl': [],
  'max-w-5xl': [],
  'max-w-6xl': [],
  'max-w-7xl': [],
  'container (no max-w)': [],
  'unknown': [],
};

for (const filePath of allFiles) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const relPath = relative(process.cwd(), filePath);
    
    // Find the outermost content wrapper width
    // Look for the first significant max-w or container class on a wrapper div
    const usesContainer = content.includes('className="container') || content.includes("className='container");
    const usesMaxW7xl = content.includes('max-w-7xl');
    const usesMaxW6xl = content.includes('max-w-6xl');
    const usesMaxW5xl = content.includes('max-w-5xl');
    const usesMaxW4xl = content.includes('max-w-4xl');
    const usesMaxW3xl = content.includes('max-w-3xl');
    
    // Determine the primary content width (widest wrapper used for main content)
    let primaryWidth = 'unknown';
    
    if (usesMaxW7xl) {
      primaryWidth = 'max-w-7xl';
    } else if (usesContainer && usesMaxW6xl) {
      primaryWidth = 'max-w-6xl';
    } else if (usesContainer && !usesMaxW6xl && !usesMaxW7xl) {
      primaryWidth = 'container (no max-w)';
    } else if (usesMaxW6xl) {
      primaryWidth = 'max-w-6xl';
    } else if (usesMaxW5xl) {
      primaryWidth = 'max-w-5xl';
    } else if (usesMaxW4xl) {
      primaryWidth = 'max-w-4xl';
    }
    
    results[primaryWidth].push(relPath);
  } catch (e) {
    // skip missing files
  }
}

console.log('=== CONTENT WIDTH AUDIT ===\n');
console.log('Global .container class: max-width 1280px (at lg breakpoint)\n');
console.log('Tailwind max-w reference:');
console.log('  max-w-3xl = 768px');
console.log('  max-w-4xl = 896px');
console.log('  max-w-5xl = 1024px');
console.log('  max-w-6xl = 1152px');
console.log('  max-w-7xl = 1280px');
console.log('  container  = 1280px\n');

for (const [width, files] of Object.entries(results)) {
  if (files.length > 0) {
    console.log(`\n--- ${width} (${files.length} pages) ---`);
    files.sort().forEach(f => console.log(`  ${f}`));
  }
}

console.log('\n\n=== SUMMARY ===');
for (const [width, files] of Object.entries(results)) {
  if (files.length > 0) {
    console.log(`  ${width}: ${files.length} pages`);
  }
}
