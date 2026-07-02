# Design Spec — "Remy-inspired" Landing Site

> **Reference:** [withremy.com](https://www.withremy.com/) — *Remy, the AI product-ideation / design agent.*
>
> **Note on fidelity:** The live site could not be pixel-inspected from this environment (the host is blocked by the network policy, and both direct fetch and the Wayback Machine were unreachable). The **information architecture, section flow, and copy** below are reconstructed from Remy's published site content. The **visual system** (exact hex, type scale, spacing) is an *informed interpretation* of Remy's aesthetic — a calm, editorial, high-whitespace, premium-software look — and is meant to be a buildable starting point, not a byte-for-byte clone. Treat color/type tokens as the recommended baseline; swap in verified brand values if/when the live site is accessible.

---

## 1. Brand & Positioning

**What Remy is:** A "product agent" / design teammate. You describe an app or idea in plain language; Remy listens, asks questions, pushes back, proposes directions, then packages sketches, mockups, user journeys, and prototypes into one structured visual spec — exploring dozens of directions across a visual canvas, informed by your brand and product. It doesn't stop at the build: it maintains the roadmap and helps ship the next feature.

**Core promise:** *"The design teammate you've always wanted — not a tool."* Remy learns your taste and brand so it designs like it's already been on your team for years.

**Voice & tone:**
- **Calm, confident, human.** First-person and second-person ("you describe… Remy listens"). Speaks about *ideas*, not features.
- **Editorial, not salesy.** Short declarative sentences. Lots of periods. Minimal exclamation.
- **Craft-forward.** Language of teams, taste, and craft ("six specialists, each tightly tuned to its domain," "built from the same first principles a great human team would be assembled with").
- **Quietly ambitious.** "Other AI tools stop at the build. Remy is just getting started."

**Adjectives that should be felt in every screen:** refined · unhurried · intelligent · warm · precise.

---

## 2. Visual Language (at a glance)

| Attribute | Direction |
|---|---|
| Density | **Very low.** Big whitespace, one idea per viewport. Generous vertical rhythm between sections. |
| Type | **Large.** Oversized headlines; comfortable body. Confident type contrast (display vs. body). |
| Color | **Restrained + warm.** Near-neutral base with a single warm/organic accent. Avoid rainbow UI. |
| Imagery | **Product-canvas centric.** Screenshots of the visual canvas, spec cards, and generated directions — framed cleanly, often on soft/tinted panels. |
| Motion | **Subtle.** Fade/slide-in on scroll, soft parallax on canvas art, gentle hover lifts. Nothing bouncy. |
| Shape | Soft, large corner radii (12–20px). Thin hairline borders. Diffuse, low-contrast shadows. |

---

## 3. Color System

A warm-neutral, low-saturation palette. One accent carries all emphasis. Provide light (primary) and dark surfaces.

### 3.1 Tokens (recommended baseline)

```
/* Surfaces — warm off-white, not pure #fff */
--bg-canvas        #FBFAF8   /* page background, warm paper */
--bg-surface       #FFFFFF   /* cards, elevated panels */
--bg-subtle        #F3F1EC   /* tinted section bands, image mats */
--bg-inverse       #14130F   /* dark sections / footer, near-black warm */

/* Text — warm ink, never pure #000 */
--text-primary     #1B1A17   /* headlines, primary copy */
--text-secondary   #5A574F   /* body, supporting copy */
--text-tertiary    #8B877D   /* captions, labels, meta */
--text-on-inverse  #F4F2ED   /* text on dark surfaces */

/* Accent — a single warm signal color (terracotta/amber family) */
--accent           #C8642F   /* primary CTA, links, highlights */
--accent-hover     #A94F22
--accent-soft      #F6E7DC   /* accent tint for chips/badges */

/* Lines & states */
--border-hairline  #E7E3DB
--border-strong    #D6D1C7
--focus-ring       #C8642F   /* 2px, 2px offset */
--success          #3F7A54
--danger           #B23A2E
```

> **Rationale:** Warm neutrals + one earthy accent read as "premium, human, crafted" rather than "generic SaaS blue." If verified brand colors differ, keep the *structure* (one accent, warm neutrals, near-black-not-black) and just swap values.

### 3.2 Usage rules
- **90% of every screen is neutral.** Accent appears only on primary CTAs, active states, links, and the occasional highlighted word.
- Never place accent text on the accent fill; use `--bg-surface` or `--text-on-inverse`.
- Dark sections (`--bg-inverse`) are used sparingly for emphasis moments (e.g., the "six specialists" / how-it-works, or footer) to create rhythm.
- Contrast: body text ≥ 4.5:1, large display text ≥ 3:1.

---

## 4. Typography

Editorial contrast between an expressive **display** face and a clean, neutral **text** face.

### 4.1 Families
- **Display / headlines:** a refined serif *or* a characterful grotesque with a display cut. Recommended: a modern serif (e.g., *Fraunces*, *GT Super*, *Reckless*) for warmth, **or** a tight geometric/grotesque (e.g., *Neue Haas Grotesk*, *Söhne*) if a cleaner tech feel is wanted. Pick one direction and commit.
- **Body / UI:** neutral humanist sans (e.g., *Inter*, *Söhne*, *Suisse Int'l*). High legibility at small sizes.
- **Mono (accents/labels):** optional (e.g., *Berkeley Mono*, *JetBrains Mono*) for eyebrow labels, spec/code chips.

### 4.2 Type scale (desktop → mobile)

| Token | Use | Size / line-height | Weight | Tracking |
|---|---|---|---|---|
| `display-xl` | Hero headline | 72 / 76px → 40 / 44px | 500–600 | −0.02em |
| `display-l` | Section headlines | 52 / 58px → 32 / 38px | 500–600 | −0.02em |
| `heading-m` | Sub-section / card title | 28 / 34px → 22 / 28px | 500 | −0.01em |
| `body-l` | Hero sub-copy, lead | 20 / 32px → 18 / 28px | 400 | 0 |
| `body-m` | Default body | 17 / 28px | 400 | 0 |
| `body-s` | Captions, meta | 14 / 22px | 400 | 0 |
| `eyebrow` | Section labels | 13 / 16px | 500, UPPERCASE | +0.12em |

### 4.3 Rules
- **Headlines set large and short** — max ~2 lines, `max-width: ~14ch–20ch`. Let whitespace do the work.
- Body copy `max-width: 60–68ch` for readability.
- One accent word inside a headline may take `--accent` or italic (if serif) to add rhythm — used at most once per screen.
- Never justify. Left-aligned by default; hero may be centered.

---

## 5. Layout & Grid

- **Container:** max content width **1200px** (wide feature/canvas sections may bleed to 1320px); side gutters 24px mobile / 40px tablet / 80px desktop.
- **Grid:** 12-column, 24px gutter desktop; collapses to 1-col on mobile (<768px).
- **Vertical rhythm:** section padding **120–160px** top/bottom on desktop, **72–88px** mobile. This large spacing *is* the brand — do not compress it.
- **Alignment:** generous, asymmetric compositions allowed for feature rows (text one side, canvas art the other), alternating left/right down the page.

---

## 6. Page Structure (section-by-section)

Order reflects Remy's narrative arc: *promise → what it does → how it works → why it's different → proof → call to action.*

### 6.1 Header / Nav
- **Sticky, transparent-on-hero → solid on scroll** (`--bg-canvas` with 1px `--border-hairline` bottom once scrolled).
- Left: **wordmark "Remy"** (display face, no heavy logo). Right: minimal links — `Product`, `How it works`, `Manifesto`/`About`, then a **ghost "Log in"** and a **primary "Get started"** / "Request access" button.
- Height ~72px. Mobile: hamburger → full-screen overlay menu on `--bg-canvas`.

### 6.2 Hero
- **Layout:** centered or left-aligned, huge headline, one line of sub-copy, one primary CTA + one text/secondary CTA. Whitespace-heavy.
- **Headline (`display-xl`):** *"The design teammate you've always wanted. Not a tool."* (accent or italic on "teammate").
- **Sub-copy (`body-l`, `--text-secondary`, max ~48ch):** *"Describe what you're trying to make. Remy listens, asks questions, pushes back, and works the idea into something buildable."*
- **CTAs:** primary **"Get started"** (accent fill); secondary **"See how it works →"** (text link with arrow).
- **Hero visual:** a large, softly-shadowed frame of the **visual canvas** — multiple generated design directions scattered on a board, subtly floating (slow parallax). Sits below the copy or offset to one side, bleeding slightly off the edge.

### 6.3 "What Remy does" — the visual canvas
- Eyebrow: `EXPLORE`. Headline (`display-l`): *"Dozens of directions, from one idea."*
- Body: *"Remy explores across a visual canvas, generating design directions informed by your brand and product — then packages sketches, mockups, user journeys, and prototypes into one structured, visual spec."*
- **Large canvas screenshot** on a `--bg-subtle` mat, hairline border, radius 16–20px. Optional annotation chips (mono labels) pointing to spec elements.

### 6.4 "How it works" — works at the level of ideas
- Consider a **dark band** (`--bg-inverse`) here for contrast.
- Headline: *"It works at the level of ideas."*
- Body: *"You describe what you're trying to make, what you care about, what excites you. Remy listens, asks questions, pushes back, proposes directions, and works the idea into something buildable."*
- 3-step horizontal flow (numbered `01 / 02 / 03`, mono numerals): **Describe → Explore → Spec.** Each step: short title + one sentence. Thin connectors between, no heavy icons.

### 6.5 "Not one agent — six specialists"
- Headline (`display-l`): *"Not one agent doing six jobs. Six specialists."*
- Body: *"Each one tightly tuned to its domain, built from the same first principles a great human team would be assembled with."*
- **Layout:** a 2×3 or 3×2 grid of restrained cards (`--bg-surface`, hairline border). Each card = specialist name + one-line remit. Minimal or no illustration; let type and space carry it. Hover: subtle lift (shadow + 2px translate-y).

### 6.6 "Beyond the build" — roadmap
- Headline: *"Other tools stop at the build. Remy keeps going."*
- Body: *"Remy builds and maintains the roadmap. One click to start the next feature."*
- Supporting visual: a clean roadmap/spec UI still, or a simple "one click → next feature" moment.

### 6.7 Social proof / trust (optional band)
- Quiet logo strip (grayscale, `--text-tertiary`) or 1–2 large pull-quote testimonials set in the display face, generous margins, attribution in `body-s`.

### 6.8 Final CTA
- Full-bleed calm band (either `--bg-subtle` or `--bg-inverse`).
- Headline (`display-l`): *"Design like Remy's been on your team for years."*
- Single primary CTA: **"Get started"**. One supporting line beneath.

### 6.9 Footer
- On `--bg-inverse`. Wordmark, one-line positioning, columns of links (Product / Company / Legal / Social), small legal row. Generous top padding (96px+). No visual noise.

---

## 7. Components

**Buttons**
- *Primary:* `--accent` fill, `--bg-surface`/white text, radius 10–12px, padding 14×24px, `body-m` 500. Hover → `--accent-hover`, subtle shadow. Active → slight scale 0.98.
- *Secondary / ghost:* transparent, 1px `--border-strong`, `--text-primary`. Hover → `--bg-subtle`.
- *Text link CTA:* `--text-primary` with animated arrow (→ nudges +4px on hover); underline on hover only.

**Cards:** `--bg-surface`, 1px `--border-hairline`, radius 16px, padding 28–32px, shadow `0 1px 2px rgba(20,19,15,.04), 0 8px 24px rgba(20,19,15,.06)`. Hover lift for interactive cards only.

**Eyebrow label:** `eyebrow` token, `--text-tertiary` or `--accent`, often with a leading dot/hairline.

**Chips / spec tags:** mono, `--bg-subtle` or `--accent-soft`, radius 999px, 6×12px.

**Image frames:** hairline border + soft shadow + optional `--bg-subtle` mat. Screenshots never sit raw on the page.

---

## 8. Motion & Interaction

- **Scroll reveals:** opacity 0→1 + translateY 16px→0, 500ms, `cubic-bezier(0.22, 1, 0.36, 1)`, staggered ~60ms across a group. Fire once.
- **Canvas parallax:** hero/board art drifts ±8–12px on scroll; disable when `prefers-reduced-motion`.
- **Hover:** 150–200ms ease-out; lifts, arrow nudges, accent shifts. Nothing springy.
- **Nav transition:** background + border fade in over 200ms after ~40px scroll.
- **Respect `prefers-reduced-motion: reduce`** — drop parallax and reveals to instant.

---

## 9. Responsive

| Breakpoint | Behavior |
|---|---|
| ≥1200px | Full 12-col, alternating asymmetric feature rows, hero art offset/bleeding. |
| 768–1199px | 8-col; feature rows stack image-below-text; section padding ~96px. |
| <768px | 1-col, centered hero, CTAs full-width, `display-xl`→40px, section padding 72px, nav → overlay menu. |

Images `max-width:100%`; wide canvas art scrolls inside its own `overflow-x:auto` container rather than forcing page scroll.

---

## 10. Accessibility

- Contrast ratios as in §3.2; verify accent-on-white ≥ 4.5:1 for text (darken accent for small text if needed).
- Visible 2px `--focus-ring` with 2px offset on all interactive elements.
- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` (hero), logical heading order.
- All canvas/product images get descriptive `alt`; decorative art `alt=""`.
- Hit targets ≥ 44×44px; motion honors `prefers-reduced-motion`.

---

## 11. Build Checklist
- [ ] Warm-neutral palette + single accent wired as CSS custom properties (light + dark surfaces).
- [ ] Display + text type pairing loaded; type scale tokens applied.
- [ ] Sticky nav with scroll-state background transition.
- [ ] Hero: oversized headline, one sub-line, two CTAs, floating canvas art.
- [ ] Alternating feature rows: Canvas → How it works (dark) → Six specialists grid → Beyond the build.
- [ ] Scroll-reveal + reduced-motion guard.
- [ ] Final CTA band + minimal dark footer.
- [ ] Responsive at 3 breakpoints; a11y contrast + focus states verified.

---

*Copy quoted/paraphrased from Remy's published site content. Visual tokens are a recommended interpretation pending verification against the live design.*
