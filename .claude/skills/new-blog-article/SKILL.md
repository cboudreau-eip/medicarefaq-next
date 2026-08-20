---
name: new-blog-article
description: Convert a finished blog article (pasted text, .docx, or .pdf) into a publishable BlogArticleData entry for MedicareFAQ.com, enforcing house style and the structural template, running the real content validator, and committing. Use whenever the user supplies article copy to publish, says "publish this article", "add this blog post", "turn this into an article", or hands over a draft document for the blog. Also use to re-validate or restructure an already-published article.
---

# New blog article

Turn finished article copy into a `BlogArticleData` entry that matches every other article on the
site. The user supplies prose; this skill supplies structure, house style, SEO fields, and
validation.

## Operating mode

**The user almost always supplies a COMPLETE article, not an outline.** Do not rewrite their
substance or invent claims. The job is structuring plus house-style enforcement.

**Latitude — "enforce house style" (the user's chosen setting):**

- DO preserve their meaning, argument order, and section order.
- DO silently fix mechanical violations: em dashes, unspelled date ranges, paragraphs over 5
  sentences, FAQ answers over 80 words, generic anchor text, banned phrases.
- DO add the required structural blocks they will not have written (Eddie's Pro Tip, callouts,
  zip-CTAs, FAQ section) using only facts already present in their draft.
- DO NOT invent statistics, dollar figures, or citations. If a required block needs a fact the
  draft lacks, build it from the draft's existing content or ask.
- ALWAYS report a summary of what was changed and what was added.

If the user supplies an *outline* instead, switch to generation mode: follow
`ARTICLE_SYSTEM_PROMPT` in `src/app/api/cms/generate-from-outline/route.ts` and write the prose.

## Intake

| Source | How to read it |
|---|---|
| Pasted into chat | Use directly. |
| `.docx` | Load the `docx` skill. |
| `.pdf` | Load the `pdf` skill. |
| File in `drafts/` | Read it. |

## Step 1 — Read the house rules

Do not work from memory. Read these first, every time:

- `src/lib/writing-config.ts` — brand voice, ICP, banned phrases, citation sources, reference data
- `src/lib/article-types.ts` — the `BlogArticleData` and `BlogSectionContent` interfaces
- `src/app/api/cms/generate-from-outline/route.ts` — `ARTICLE_SYSTEM_PROMPT` holds the exact JSON
  shape and placement rules for every section type

## Step 2 — Structure the content

Segment the draft into `BlogSectionContent` blocks. Section types and their fields:

```
{ "type": "heading", "level": 2, "id": "url-friendly-id", "text": "Section Title" }
{ "type": "paragraph", "content": "Supports **bold**, *italic*, [text](/url)." }
{ "type": "callout", "calloutType": "info|warning|success|tip", "calloutTitle": "...", "calloutText": "..." }
{ "type": "table", "title": "...", "headers": [...], "rows": [[...]], "footnote": "..." }
{ "type": "list", "ordered": true|false, "items": [...] }
{ "type": "faq", "faqs": [{ "question": "...", "answer": "40-80 words" }] }
{ "type": "eddie-pro-tip", "content": "First person, 2-4 sentences." }
{ "type": "zip-cta", "headline": "...", "subtext": "...", "buttonLabel": "..." }
{ "type": "image", "src": "/path.jpg", "alt": "..." }
{ "type": "steps", "steps": [{ "title": "...", "description": "..." }] }
```

Conversion rules:

- Any comparison, cost breakdown, or side-by-side data becomes a `table`, never prose.
- Any run of 3+ items becomes a `list`, never inline in a paragraph.
- `ordered: true` for steps and sequences, `false` for features and options.
- A `callout` every 2-3 paragraphs for visual variety.
- Callout type: `warning` for deadlines and penalties, `info` for key facts and numbers,
  `success` for benefits, `tip` for practical advice.
- Exactly ONE `eddie-pro-tip`, placed after the most impactful decision point.
- Group ALL FAQ questions into a single `faq` section.
- Target 7-8 headings at `level: 2`.
- Internal links are relative with a trailing slash: `/blog/slug/`, `/faqs/slug/`.
- External links use full URLs. Prefer the `citationSources` list in `writing-config.ts` and link
  to the deepest relevant page, never a homepage.

Hard style rules (validator errors, or explicit house rules):

- **Never use em dashes.** Use commas, semicolons, or the word "to" for ranges.
- Spell out date ranges: "January 1 to March 31", not "Jan 1-Mar 31".
- Paragraphs max 5 sentences; 2-4 is the target.
- FAQ answers 40-80 words. Over 80 is an error, over 60 warns.
- Anchor text max 7 words. Never "learn more", "click here", "read more", "visit", "check out".
- No banned phrases. Read the current list from `writing-config.ts`; it includes "Leverage",
  "Robust", "In conclusion", "Comprehensive guide", "Dive into", "Rest assured".
- No rhetorical questions, no sales-heavy language, no unverified statistics.
- Second person, addressing the reader as "you".

## Step 3 — Derive the article fields

Build the object with fields in **this exact order**, matching existing articles:

```
slug, seo, title, excerpt, category, categoryColor, date, dateUpdated,
author, reviewer, readTime, featured, image, imageAlt, answerBlock,
keyTakeaways, tableOfContents, sections, relatedSlugs
```

- `slug` — kebab-case, derived from the title. Must be unique; check the existing array.
- `seo.focusKeyword` — ask the user if it is not obvious from the draft.
- `seo.title` — under 60 characters, includes the focus keyword.
- `seo.description` — 150-160 characters.
- `seo.canonical` — `https://www.medicarefaq.com/blog/<slug>/`, trailing slash required.
- `seo.ogImage` — same value as `image`.
- `excerpt` — 1-2 sentences, worded differently from `seo.description`.
- `category` / `categoryColor` — reuse an existing pair from the array (for example
  "Medicare Supplement" / `#4F46E5`, "Medicare Basics" / `#2563EB`). Never invent a new colour.
- `date` — "Month D, YYYY". On first publish set `dateUpdated` to the same value.
- `author: "David Haass"`, `reviewer: "Ashlee Zareczny"` unless told otherwise.
- `readTime` — word count / 200, rounded, formatted as "N min read".
- `answerBlock` — optimized for AI Overviews: first 50 words, no preamble.
- `keyTakeaways` — 3 items.
- `tableOfContents` — one entry per `level: 2` heading. **Each `id` must match its heading `id`
  exactly** or the anchor links break.
- `relatedSlugs` — 3-4 real slugs from the existing array. Verify each one exists.
- `image` — see Images below.

### Images

Images cannot be generated. In order of preference:

1. The user supplies a path.
2. Reuse an existing `public/images/generated/*` file that genuinely fits the topic.
3. Fall back to `/images/medicarefaq-cover.jpg` and **tell the user it needs swapping.**

## Step 4 — Validate (do not skip this, do not eyeball it)

Write the candidate sections to a scratch JSON file, then run the project's real validator:

```
node --experimental-strip-types \
     --import ./.claude/skills/new-blog-article/scripts/register-hook.mjs \
     ./.claude/skills/new-blog-article/scripts/validate-article.mjs <sections.json>
```

The gate is **score >= 87**, matching `MIN_QUALITY_SCORE` in the CMS route. The script exits 1
below the gate. Fix the reported issues and re-run, up to 3 attempts, mirroring `MAX_RETRIES`.
Errors cost 15 points, warnings 5, info 1.

`node_modules` is frequently absent in this repo. The runner needs no dependencies, only
Node 22.6+ for native type stripping.

To re-validate an already-published article, dump its sections first:

```
node --experimental-strip-types \
     --import ./.claude/skills/new-blog-article/scripts/register-hook.mjs \
     ./.claude/skills/new-blog-article/scripts/extract-sections.mjs <slug> <out.json>
```

## Step 5 — Insert

Default: append the object to the `blogArticles` array in `src/lib/blog-articles-data.ts`.

If the article is long, or that file has grown unwieldy, create
`src/lib/blog-article-<short-name>.ts` exporting a single `BlogArticleData` and import it into the
array. Six articles already use this pattern.

Then verify:

- every `tableOfContents` id matches a heading id
- the slug appears nowhere else in the array
- every `relatedSlugs` entry resolves to a real article
- no em dashes anywhere in the new block
- the article is not marked `draft: true` unless the user wants it withheld. `draft: true`
  excludes it from the sitemap (`src/app/sitemaps/blog/route.ts`).

## Step 6 — Add a test

Follow the existing pattern in `tests/*-article.test.mjs`, but bound the slice to this article:

```js
const start = articleSource.indexOf('"slug": "<slug>"');
const end = articleSource.indexOf('"slug": "', start + 10);
const article = articleSource.slice(start, end === -1 ? undefined : end);
```

Note: the existing tests slice to end-of-file, so their assertions leak into every later article.
Use the bounded form above for new tests.

Assert that an FAQ section exists, that there are at least 8 FAQ questions, that a `zip-cta` is
present, that there are no em dashes, and that there are at least 5 internal links.

## Step 7 — Commit

```
[CONTENT] blog/<slug> | <lowercase description of what shipped>
```

`main` is the Vercel production branch. Per the user's standing instruction, push when they say
"push it"; otherwise commit and stop.

## Report back

State plainly:

- the live URL
- the validator score, plus any surviving warnings
- **what was changed** in their copy (banned phrases, em dashes, split paragraphs, trimmed FAQs)
- **what was added** that they did not write (Eddie's Pro Tip, callouts, zip-CTAs, FAQ section)
- whether the image is a placeholder that needs replacing
