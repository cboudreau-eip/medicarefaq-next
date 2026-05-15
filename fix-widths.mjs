/**
 * Width Standardization Script
 * 
 * Converts all raw "max-w-Nxl mx-auto px-4" patterns to use "container max-w-Nxl"
 * The container class provides the responsive padding, so px-4 is no longer needed.
 * 
 * Patterns to fix:
 * 1. "max-w-5xl mx-auto px-4" → "container max-w-5xl"
 * 2. "max-w-5xl mx-auto"      → "container max-w-5xl"
 * 3. "max-w-4xl mx-auto px-4" → "container max-w-4xl"
 * 4. "max-w-4xl mx-auto"      → "container max-w-4xl"
 * 
 * Also handles cases where there are additional classes after mx-auto.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';

const srcDir = join(process.cwd(), 'src', 'app');
const dryRun = process.argv.includes('--dry-run');

function findFiles(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...findFiles(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

const files = findFiles(srcDir);
let totalChanges = 0;
let filesChanged = 0;

for (const filePath of files) {
  let content = readFileSync(filePath, 'utf-8');
  const original = content;
  const relPath = relative(process.cwd(), filePath);
  
  // Pattern 1: "max-w-5xl mx-auto px-4" → "container max-w-5xl"
  // But only when it's a standalone wrapper (className="max-w-5xl mx-auto px-4")
  // Not when it's inside a className with other important classes
  
  const replacements = [
    // max-w-5xl mx-auto px-4 with possible extra classes
    {
      pattern: /className="max-w-5xl mx-auto px-4([^"]*)"/g,
      replacement: (match, rest) => {
        const trimmed = rest.trim();
        return trimmed ? `className="container max-w-5xl ${trimmed}"` : `className="container max-w-5xl"`;
      }
    },
    // max-w-4xl mx-auto px-4 with possible extra classes
    {
      pattern: /className="max-w-4xl mx-auto px-4([^"]*)"/g,
      replacement: (match, rest) => {
        const trimmed = rest.trim();
        return trimmed ? `className="container max-w-4xl ${trimmed}"` : `className="container max-w-4xl"`;
      }
    },
    // max-w-5xl mx-auto (no px-4) — standalone
    {
      pattern: /className="max-w-5xl mx-auto([^"]*)"/g,
      replacement: (match, rest) => {
        const trimmed = rest.trim();
        // Skip if already has container
        if (match.includes('container')) return match;
        return trimmed ? `className="container max-w-5xl ${trimmed}"` : `className="container max-w-5xl"`;
      }
    },
    // max-w-4xl mx-auto (no px-4) — standalone
    {
      pattern: /className="max-w-4xl mx-auto([^"]*)"/g,
      replacement: (match, rest) => {
        const trimmed = rest.trim();
        if (match.includes('container')) return match;
        return trimmed ? `className="container max-w-4xl ${trimmed}"` : `className="container max-w-4xl"`;
      }
    },
    // Also handle cases where max-w comes after other classes but before mx-auto
    // e.g., className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto"
    {
      pattern: /className="([^"]*?)max-w-5xl mx-auto([^"]*)"/g,
      replacement: (match, before, after) => {
        if (match.includes('container')) return match;
        const beforeTrimmed = before.trim();
        const afterTrimmed = after.replace(/\s*px-4\s*/, ' ').trim();
        const classes = ['container', 'max-w-5xl', beforeTrimmed, afterTrimmed].filter(Boolean).join(' ');
        return `className="${classes}"`;
      }
    },
    {
      pattern: /className="([^"]*?)max-w-4xl mx-auto([^"]*)"/g,
      replacement: (match, before, after) => {
        if (match.includes('container')) return match;
        const beforeTrimmed = before.trim();
        const afterTrimmed = after.replace(/\s*px-4\s*/, ' ').trim();
        const classes = ['container', 'max-w-4xl', beforeTrimmed, afterTrimmed].filter(Boolean).join(' ');
        return `className="${classes}"`;
      }
    },
  ];
  
  for (const { pattern, replacement } of replacements) {
    content = content.replace(pattern, replacement);
  }
  
  if (content !== original) {
    const changes = countDifferences(original, content);
    totalChanges += changes;
    filesChanged++;
    
    if (dryRun) {
      console.log(`[DRY RUN] ${relPath}: ${changes} changes`);
    } else {
      writeFileSync(filePath, content);
      console.log(`[FIXED] ${relPath}: ${changes} changes`);
    }
  }
}

function countDifferences(a, b) {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  let count = 0;
  for (let i = 0; i < Math.max(aLines.length, bLines.length); i++) {
    if (aLines[i] !== bLines[i]) count++;
  }
  return count;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files changed: ${filesChanged}`);
console.log(`Total line changes: ${totalChanges}`);
if (dryRun) console.log(`(Dry run — no files were modified)`);
