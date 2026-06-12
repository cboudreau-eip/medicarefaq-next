// Codemod: make protected CMS routes accept a signed session token (from 2FA
// login) in addition to the raw admin password. Adds an import of
// verifySessionToken and rewrites the local `return pw === CMS_PASSWORD;`
// (and the transform-route Bearer variant) to also accept a valid token.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src", "app", "api", "cms");

// Files that contain a local checkCmsAuth using `=== CMS_PASSWORD`
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name === "route.ts") out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let patched = 0;

const IMPORT_LINE = `import { verifySessionToken } from "@/lib/cms-auth";\n`;

for (const file of files) {
  let src = fs.readFileSync(file, "utf8");
  const original = src;

  // Skip the auth route itself (already rewritten) and pipeline/state (forwards header).
  if (file.endsWith(path.join("cms", "auth", "route.ts"))) continue;

  const hasCheck =
    src.includes("=== CMS_PASSWORD") ||
    src.includes("pw === CMS_PASSWORD") ||
    src.includes("=== process.env.CMS_ADMIN_PASSWORD");

  if (!hasCheck) continue;

  // Add the import once, after the first import line.
  if (!src.includes('from "@/lib/cms-auth"')) {
    const firstImportEnd = src.indexOf("\n", src.indexOf("import "));
    src = src.slice(0, firstImportEnd + 1) + IMPORT_LINE + src.slice(firstImportEnd + 1);
  }

  // Standard variant: `return pw === CMS_PASSWORD;`
  src = src.replace(
    /return pw === CMS_PASSWORD;/g,
    "if (verifySessionToken(pw)) return true;\n  return pw === CMS_PASSWORD;"
  );

  // transform route variant uses headerPw and a Bearer token:
  //   if (headerPw === CMS_PASSWORD) return true;
  src = src.replace(
    /if \(headerPw === CMS_PASSWORD\) return true;/g,
    "if (verifySessionToken(headerPw)) return true;\n  if (headerPw === CMS_PASSWORD) return true;"
  );
  //   if (token === CMS_PASSWORD) return true;
  src = src.replace(
    /if \(token === CMS_PASSWORD\) return true;/g,
    "if (verifySessionToken(token)) return true;\n    if (token === CMS_PASSWORD) return true;"
  );

  if (src !== original) {
    fs.writeFileSync(file, src, "utf8");
    patched++;
    console.log("patched:", path.relative(process.cwd(), file));
  }
}

console.log(`\nDone. Patched ${patched} route file(s).`);
