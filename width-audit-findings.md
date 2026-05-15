# Content Width Audit — Findings & Standard

## Current State (After max-w-7xl fix)

| Width Class | Pixel Width | Usage | Page Count |
|---|---|---|---|
| `container` | 1280px | Landing pages with sidebar (MA plans, Medigap, Open Enrollment, Medicare 101, enrollment pages, supplements, original-medicare, etc.) | ~35 pages |
| `container max-w-6xl` | 1152px | Article templates (Coverage FAQ, SimpleFAQ, Blog), new-to-medicare sub-pages, about-us | ~9 pages |
| `max-w-5xl mx-auto px-4` | 1024px | Sub-section pages (Part A, Part B, Part D sub, caregiver, MA sub, editorial team, etc.) | ~14 pages |
| `max-w-4xl mx-auto` or `container max-w-4xl` | 896px | Narrow utility pages (search, tools, legal, scholarship, by-state, by-carrier, some inner elements) | ~19 pages |

## Proposed Standard

### Tier 1: `container` (1280px) — Landing/Section Pages
Pages with sidebar navigation, stat cards, multi-column layouts.
- Homepage sections
- Medicare Advantage Plans, Medigap Plans, Medicare Open Enrollment
- Medicare 101, Enrollment sub-pages
- Medicare Supplements, Original Medicare

### Tier 2: `container max-w-6xl` (1152px) — Article Pages
Content-focused pages with optional sidebar, prose-heavy.
- All FAQ articles (Coverage + SimpleFAQ templates)
- All blog posts
- New-to-Medicare sub-pages
- About Us

### Tier 3: `container max-w-5xl` (1024px) — Sub-Section Pages
Focused topic pages, often with sidebar TOC.
- Part A, Part B, Part D sub-pages
- Medicare costs, coverage, eligibility, enrollment periods
- Caregiver guide, MA plan types, editorial team

### Tier 4: `container max-w-4xl` (896px) — Utility/Narrow Pages
Simple single-column pages, tools, legal.
- Search, sitemap
- Scholarship, third-party partners
- Tools (enrollment timeline)
- By-state, by-carrier index pages
- Legal (privacy, terms)

## Key Rule
All pages MUST use `container` as the base class (provides responsive padding + 1280px max).
To narrow further, add `max-w-6xl`, `max-w-5xl`, or `max-w-4xl` alongside `container`.
Never use raw `max-w-Nxl mx-auto px-4` — always use `container` + optional narrowing.
