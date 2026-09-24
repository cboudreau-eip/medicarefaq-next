import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const pagePath = new URL("../src/app/blog/PageContent.tsx", import.meta.url);
const source = fs.readFileSync(pagePath, "utf8");

test("blog landing page promotes four latest articles without pagination duplicates", () => {
  assert.match(source, /allSorted\.slice\(0, 4\)/);
  assert.match(source, /allSorted\.slice\(4\)/);
  assert.match(source, /grid md:grid-cols-2 gap-6/);
});

test("featured article cards use taller images and equal-height content", () => {
  assert.match(source, /relative h-\[276px\] md:h-\[332px\] overflow-hidden/);
  assert.match(source, /group flex h-full flex-col/);
  assert.match(source, /p-6 flex flex-1 flex-col/);
});

test("all article preview cards use taller images and equal-height rows", () => {
  assert.match(source, /relative h-\[202px\] overflow-hidden/);
  assert.match(source, /p-5 flex flex-1 flex-col/);
  assert.doesNotMatch(source, /h-\[calc\(100%-176px\)\]/);
});
