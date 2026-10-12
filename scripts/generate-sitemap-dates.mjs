import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

// Read declared page modification dates without importing or executing page code.
// Runs when Next loads its config, so CMS changes are reflected at the next deploy.
export function generateSitemapDates(root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")) {
  const app = path.join(root, "src/app");
  const dates = {};
  function walk(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      if (item.isDirectory() && !["admin", "api"].includes(item.name) && !item.name.startsWith("[")) walk(path.join(dir, item.name));
      if (!item.isFile() || item.name !== "page.tsx") continue;
      const file = path.join(dir, item.name);
      const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const found = [];
      function visit(node) {
        if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === "dateModified" && ts.isStringLiteral(node.initializer)) {
          const raw = node.initializer.text;
          if (/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(raw) && Number.isFinite(Date.parse(raw))) found.push(new Date(raw).toISOString());
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
      if (found.length) dates["/" + path.relative(app, dir).split(path.sep).filter(Boolean).join("/") + (dir === app ? "" : "/")] = found.sort().at(-1);
    }
  }
  walk(app);
  const target = path.join(root, "src/lib/sitemap-page-dates.json");
  const text = JSON.stringify(Object.fromEntries(Object.entries(dates).sort()), null, 2) + "\n";
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== text) fs.writeFileSync(target, text);
  return dates;
}
