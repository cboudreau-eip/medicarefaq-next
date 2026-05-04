import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System || MedicareFAQ",
  description: "MedicareFAQ living design system — colors, typography, spacing, and components.",
  robots: "noindex",
};

// ─── Color Swatches ────────────────────────────────────────────────────────────

const colorGroups = [
  {
    label: "Brand —— Primary",
    colors: [
      { name: "Navy",       tailwind: "bg-navy",       hex: "#1a2340", usage: "Primary buttons, headings, nav" },
      { name: "Navy Light", tailwind: "bg-navy-light", hex: "#2a3a5c", usage: "Hover states, secondary nav" },
      { name: "Navy Dark",  tailwind: "bg-navy-dark",  hex: "#0f1628", usage: "Footer, dark overlays" },
      { name: "CTA Red",    tailwind: "bg-cta-red",    hex: "#b91c1c", usage: "CTA buttons, urgency" },
    ],
  },
  {
    label: "Brand —— Journey Colors",
    colors: [
      { name: "Teal",   tailwind: "bg-teal",   hex: "#0d9488", usage: "New to Medicare" },
      { name: "Amber",  tailwind: "bg-amber",  hex: "#d97706", usage: "Enrollment" },
      { name: "Green",  tailwind: "bg-green",  hex: "#16a34a", usage: "Coverage" },
      { name: "Indigo", tailwind: "bg-indigo", hex: "#4f46e5", usage: "Library / Resources" },
    ],
  },
  {
    label: "Semantic —— Surface",
    colors: [
      { name: "Background",     tailwind: "bg-background border border-border",     hex: "#ffffff", usage: "Page background" },
      { name: "Section Alt",    tailwind: "bg-section-alt",   hex: "#f7f8fc", usage: "Alternate section bg" },
      { name: "Foreground",     tailwind: "bg-foreground",    hex: "#1a1f2e", usage: "Body text" },
      { name: "Muted Fg",       tailwind: "bg-muted-foreground", hex: "#6b7280", usage: "Secondary text, captions" },
      { name: "Border",         tailwind: "bg-border",        hex: "#e5e7eb", usage: "Dividers, input borders" },
    ],
  },
];

// ─── Typography Scale ──────────────────────────────────────────────────────────

const typeScale = [
  { size: "text-6xl", label: "6xl — 60px", weight: "font-extrabold", sample: "Medicare Made Simple" },
  { size: "text-5xl", label: "5xl — 48px", weight: "font-bold",      sample: "Find Your Perfect Plan" },
  { size: "text-4xl", label: "4xl — 36px", weight: "font-bold",      sample: "Understanding Medicare" },
  { size: "text-3xl", label: "3xl — 30px", weight: "font-semibold",  sample: "Medicare Supplement Plans" },
  { size: "text-2xl", label: "2xl — 24px", weight: "font-semibold",  sample: "Compare Your Coverage Options" },
  { size: "text-xl",  label: "xl — 20px",  weight: "font-medium",    sample: "Get answers to your Medicare questions" },
  { size: "text-lg",  label: "lg — 18px",  weight: "font-normal",    sample: "We help you navigate Medicare with confidence." },
  { size: "text-base",label: "base — 16px",weight: "font-normal",    sample: "Medicare is a federal health insurance program for people 65 or older." },
  { size: "text-sm",  label: "sm — 14px",  weight: "font-normal",    sample: "Last updated: January 2026 · 5 min read" },
  { size: "text-xs",  label: "xs — 12px",  weight: "font-normal",    sample: "DISCLAIMER: This content is for informational purposes only." },
];

// ─── Spacing Scale ─────────────────────────────────────────────────────────────

const spacingScale = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24];

// ─── Radius Scale ──────────────────────────────────────────────────────────────

const radiusScale = [
  { label: "None",   class: "rounded-none",  value: "0px" },
  { label: "SM",     class: "rounded-sm",    value: "calc(0.5rem - 4px)" },
  { label: "MD",     class: "rounded-md",    value: "calc(0.5rem - 2px)" },
  { label: "LG",     class: "rounded-lg",    value: "0.5rem" },
  { label: "XL",     class: "rounded-xl",    value: "calc(0.5rem + 4px)" },
  { label: "2XL",    class: "rounded-2xl",   value: "1rem" },
  { label: "Full",   class: "rounded-full",  value: "9999px" },
];

// ─── Shadow Scale ──────────────────────────────────────────────────────────────

const shadowScale = [
  { label: "SM",  class: "shadow-sm",  desc: "Subtle lift — cards, inputs" },
  { label: "MD",  class: "shadow-md",  desc: "Moderate elevation — dropdowns" },
  { label: "LG",  class: "shadow-lg",  desc: "High elevation — modals, popovers" },
  { label: "XL",  class: "shadow-xl",  desc: "Maximum elevation — overlays" },
];

// ─── Section Wrapper ───────────────────────────────────────────────────────────

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mb-16">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
        <h2 className="text-2xl font-bold text-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Token({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <code className="text-xs bg-section-alt text-navy px-2 py-1 rounded font-mono">{value}</code>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-teal text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-teal inline-block" />
            Living Style Guide
          </div>
          <h1 className="text-5xl font-extrabold mb-3">MedicareFAQ Design System</h1>
          <p className="text-lg text-white/70 max-w-2xl">
            The single source of truth for all visual decisions — colors, typography, spacing,
            radius, shadows, and core UI components. Use this as a reference when building
            new pages or extending the site.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {["Colors", "Typography", "Spacing", "Radius", "Shadows", "Buttons", "Badges", "Forms", "Cards"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white/90"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* ── Colors ── */}
        <Section title="Colors" id="colors">
          {colorGroups.map((group) => (
            <div key={group.label} className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{group.label}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.colors.map((c) => (
                  <div key={c.name} className="rounded-xl overflow-hidden border border-border shadow-sm">
                    <div className={`h-16 w-full ${c.tailwind}`} />
                    <div className="p-3 bg-white">
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{c.hex}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CSS Variable reference */}
          <div className="mt-6 bg-section-alt rounded-xl p-5">
            <h3 className="text-sm font-semibold text-navy mb-3">CSS Variable Reference</h3>
            <div className="grid sm:grid-cols-2 gap-x-8">
              <div>
                <Token label="--color-navy" value="oklch(0.25 0.05 260)" />
                <Token label="--color-navy-light" value="oklch(0.35 0.05 260)" />
                <Token label="--color-navy-dark" value="oklch(0.18 0.05 260)" />
                <Token label="--color-cta-red" value="oklch(0.48 0.2 20)" />
                <Token label="--color-teal" value="oklch(0.6 0.12 180)" />
              </div>
              <div>
                <Token label="--color-amber" value="oklch(0.65 0.15 70)" />
                <Token label="--color-green" value="oklch(0.58 0.14 155)" />
                <Token label="--color-indigo" value="oklch(0.5 0.18 280)" />
                <Token label="--color-section-alt" value="oklch(0.97 0.003 260)" />
                <Token label="--background" value="oklch(1 0 0)" />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography" id="typography">
          <div className="bg-section-alt rounded-xl p-5 mb-6">
            <Token label="Font Family" value="'Plus Jakarta Sans', system-ui, sans-serif" />
            <Token label="Weights used" value="400 (Regular) · 500 (Medium) · 600 (Semibold) · 700 (Bold) · 800 (ExtraBold)" />
          </div>
          <div className="space-y-1">
            {typeScale.map((t) => (
              <div key={t.label} className="flex items-baseline gap-4 py-3 border-b border-border/50 last:border-0">
                <span className="w-28 shrink-0 text-xs text-muted-foreground font-mono">{t.label}</span>
                <p className={`${t.size} ${t.weight} text-foreground leading-tight`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Spacing ── */}
        <Section title="Spacing" id="spacing">
          <p className="text-sm text-muted-foreground mb-4">
            Based on Tailwind&apos;s default 4px base unit. All spacing values are multiples of 4px.
          </p>
          <div className="space-y-2">
            {spacingScale.map((n) => (
              <div key={n} className="flex items-center gap-4">
                <span className="w-16 text-xs text-muted-foreground font-mono shrink-0">
                  {n} · {n * 4}px
                </span>
                <div
                  className="h-5 bg-navy rounded"
                  style={{ width: `${n * 4}px`, minWidth: "4px" }}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 bg-section-alt rounded-xl p-5">
            <h3 className="text-sm font-semibold text-navy mb-3">Standard Section Spacing</h3>
            <Token label="Section vertical padding" value="py-16 lg:py-24" />
            <Token label="Container max-width" value="1280px (max-w-screen-xl)" />
            <Token label="Container horizontal padding" value="px-4 sm:px-6 lg:px-8" />
          </div>
        </Section>

        {/* ── Radius ── */}
        <Section title="Radius" id="radius">
          <div className="flex flex-wrap gap-4">
            {radiusScale.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-navy ${r.class}`} />
                <span className="text-xs font-semibold text-foreground">{r.label}</span>
                <span className="text-xs text-muted-foreground font-mono">{r.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Shadows ── */}
        <Section title="Shadows" id="shadows">
          <div className="flex flex-wrap gap-6">
            {shadowScale.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <div className={`w-28 h-20 bg-white rounded-xl ${s.class} border border-border/30`} />
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Buttons" id="buttons">
          <div className="space-y-6">
            {/* Primary */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Primary (Navy)</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors text-base">
                  Default
                </button>
                <button className="px-5 py-2.5 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors text-sm">
                  Small
                </button>
                <button className="px-8 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors text-lg">
                  Large
                </button>
                <button disabled className="px-6 py-3 bg-navy/40 text-white font-semibold rounded-lg cursor-not-allowed text-base">
                  Disabled
                </button>
              </div>
            </div>

            {/* CTA Red */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">CTA (Red)</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-6 py-3 bg-cta-red text-white font-semibold rounded-lg hover:bg-cta-red-hover transition-colors text-base">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-cta-red text-white font-bold rounded-lg hover:bg-cta-red-hover transition-colors text-base flex items-center gap-2">
                  Find My Plan
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Outline */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Outline</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors text-base">
                  Navy Outline
                </button>
                <button className="px-6 py-3 border-2 border-cta-red text-cta-red font-semibold rounded-lg hover:bg-cta-red hover:text-white transition-colors text-base">
                  Red Outline
                </button>
              </div>
            </div>

            {/* Ghost */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Ghost // Text</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-4 py-2 text-navy font-semibold hover:bg-section-alt rounded-lg transition-colors">
                  Ghost Button
                </button>
                <button className="text-navy font-semibold underline underline-offset-2 hover:text-navy-dark transition-colors">
                  Text Link Button
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges" id="badges">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-navy text-white">Navy</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-cta-red text-white">CTA Red</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-teal text-white">Teal</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-amber text-white">Amber</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green text-white">Green</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo text-white">Indigo</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-section-alt text-navy border border-border">Neutral</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border-2 border-navy text-navy">Outline</span>
          </div>
        </Section>

        {/* ── Forms ── */}
        <Section title="Forms" id="forms">
          <div className="max-w-md space-y-5">
            {/* Text input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                ZIP Code <span className="text-cta-red">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 90210"
                className="w-full px-4 py-3 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-colors"
              />
              <p className="mt-1 text-xs text-muted-foreground">Enter your 5-digit ZIP code to find plans in your area.</p>
            </div>

            {/* Select */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Medicare Type</label>
              <select className="w-full px-4 py-3 border border-border rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-colors">
                <option value="">Select an option…</option>
                <option>Medicare Supplement</option>
                <option>Medicare Advantage</option>
                <option>Part D Drug Plan</option>
              </select>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                className="mt-0.5 w-4 h-4 rounded border-border text-navy focus:ring-navy"
              />
              <label htmlFor="consent" className="text-sm text-foreground">
                I agree to be contacted by a licensed insurance agent about Medicare plans.
              </label>
            </div>

            {/* Error state */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Email <span className="text-cta-red">*</span>
              </label>
              <input
                type="email"
                defaultValue="invalid-email"
                className="w-full px-4 py-3 border-2 border-cta-red rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cta-red transition-colors"
              />
              <p className="mt-1 text-xs text-cta-red font-medium">Please enter a valid email address.</p>
            </div>

            {/* Submit */}
            <button className="w-full py-3 bg-cta-red text-white font-bold rounded-lg hover:bg-cta-red-hover transition-colors text-base">
              Find My Plans →
            </button>
          </div>
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards" id="cards">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Basic card */}
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-2">Medicare Supplement</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Covers the gaps in Original Medicare, including copays, coinsurance, and deductibles.
              </p>
              <a href="#" className="text-sm font-semibold text-navy hover:underline">
                Learn more →
              </a>
            </div>

            {/* Highlighted card */}
            <div className="bg-navy text-white rounded-xl p-5 shadow-md">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal mb-2">Most Popular</span>
              <h3 className="text-lg font-bold mb-2">Plan G</h3>
              <p className="text-sm text-white/70 mb-4">
                The most comprehensive Medigap plan available to new Medicare enrollees.
              </p>
              <button className="text-sm font-semibold text-white border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Compare Plans
              </button>
            </div>

            {/* Icon card */}
            <div className="bg-section-alt border border-border rounded-xl p-5">
              <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-navy mb-1">No Referrals Needed</h3>
              <p className="text-sm text-muted-foreground">
                See any doctor who accepts Medicare — no referrals or network restrictions.
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer note ── */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            MedicareFAQ Design System · Source:{" "}
            <code className="font-mono text-navy text-xs bg-section-alt px-1.5 py-0.5 rounded">
              /src/design-system/
            </code>
            {" "}· Tokens defined in{" "}
            <code className="font-mono text-navy text-xs bg-section-alt px-1.5 py-0.5 rounded">
              globals.css
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
