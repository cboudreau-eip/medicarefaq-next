import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(path, dependencies = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", compiled)(
    (name) => name in dependencies ? dependencies[name] : require(name), module, module.exports
  );
  return module.exports;
}
const courseLayout = load("../src/components/CourseLayout.tsx", {
  "@/components/CourseQuiz": { __esModule: true, default: () => null },
  "@/lib/course-quiz-data": { COURSE_QUIZZES: [] },
});
const onboarding = load("../src/components/CourseOnboarding.tsx");
const { default: CourseOverview } = load("../src/app/medicare-101-course/PageContent.tsx", {
  "@/components/CourseLayout": courseLayout,
  "@/components/CourseOnboarding": onboarding,
  "@/components/ZipFormModal": { __esModule: true, default: () => null },
  "@/lib/analytics": { trackPhoneClick() {} },
});
const html = renderToStaticMarkup(React.createElement(CourseOverview));
// Next's production build sets trailing-slash behavior; plain Node uses its default.
const linkedPaths = new Set([...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1].replace(/\/$/, "")));

test("a fresh server render includes the heading and every lesson without browser storage or effects", () => {
  assert.match(html, /<h1[^>]*>Medicare 101 Course<\/h1>/);
  assert.equal(courseLayout.COURSE_LESSONS.length, 7);
  for (const lesson of courseLayout.COURSE_LESSONS) {
    assert.ok(linkedPaths.has(`/medicare-101-course/${lesson.slug}`), `Lesson ${lesson.number} must be a real link in initial HTML`);
  }
});

test("personalization is closed by default and the course links are outside that disclosure", () => {
  assert.match(html, /Personalize your action plan \(optional\)/);
  assert.doesNotMatch(html, /<details[^>]*\bopen(?:=|\s|>)/);
  const disclosureEnd = html.indexOf("</details>");
  assert.ok(disclosureEnd > 0);
  for (const lesson of courseLayout.COURSE_LESSONS) {
    assert.ok(html.indexOf(`href="/medicare-101-course/${lesson.slug}`) > disclosureEnd);
  }
});
