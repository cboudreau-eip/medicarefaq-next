/**
 * MedicareFAQ Design System — Design Tokens
 *
 * These tokens are the single source of truth for all visual decisions.
 * They map directly to the CSS custom properties defined in globals.css.
 *
 * To use in a new project:
 *   1. Copy this file into your project's design-system/tokens/ folder
 *   2. Copy the CSS variable block from globals.css into your new project's global CSS
 *   3. Reference tokens via Tailwind utilities or direct CSS variables
 */

export const colors = {
  // Brand — Primary
  navy: {
    DEFAULT: "oklch(0.25 0.05 260)",   // --color-navy  / var(--primary)
    light:   "oklch(0.35 0.05 260)",   // --color-navy-light
    dark:    "oklch(0.18 0.05 260)",   // --color-navy-dark
    label:   "Deep Navy",
    usage:   "Primary brand color. Used for headings, nav, primary buttons, and key UI chrome.",
  },
  ctaRed: {
    DEFAULT: "oklch(0.48 0.2 20)",     // --color-cta-red
    hover:   "oklch(0.42 0.2 20)",     // --color-cta-red-hover
    label:   "CTA Red",
    usage:   "Call-to-action buttons, urgency indicators, and destructive actions.",
  },

  // Brand — Journey Colors (used for Medicare journey path wayfinding)
  teal: {
    DEFAULT: "oklch(0.6 0.12 180)",    // --color-teal
    label:   "Teal",
    usage:   "New to Medicare journey path. Also used for chart-1.",
  },
  amber: {
    DEFAULT: "oklch(0.65 0.15 70)",    // --color-amber
    label:   "Amber",
    usage:   "Enrollment journey path. Also used for chart-4.",
  },
  green: {
    DEFAULT: "oklch(0.58 0.14 155)",   // --color-green
    label:   "Green",
    usage:   "Coverage journey path. Also used for chart-5.",
  },
  indigo: {
    DEFAULT: "oklch(0.5 0.18 280)",    // --color-indigo
    label:   "Indigo",
    usage:   "Library/resources journey path. Also used for chart-5.",
  },

  // Semantic — Surface
  background: {
    DEFAULT: "oklch(1 0 0)",           // --background — pure white
    alt:     "oklch(0.97 0.003 260)",  // --color-section-alt — off-white section bg
    label:   "Background",
  },
  foreground: {
    DEFAULT: "oklch(0.2 0.02 260)",    // --foreground — near-black text
    muted:   "oklch(0.5 0.02 260)",    // --muted-foreground
    label:   "Foreground",
  },
  border: {
    DEFAULT: "oklch(0.92 0.004 260)",  // --border
    label:   "Border",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'Plus Jakarta Sans', system-ui, sans-serif",
    label: "Plus Jakarta Sans",
    usage: "Primary typeface for all body copy, headings, and UI text.",
  },
  fontWeights: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
  },
  // Tailwind text-size scale used across the site
  scale: {
    xs:   "0.75rem",   // 12px
    sm:   "0.875rem",  // 14px
    base: "1rem",      // 16px
    lg:   "1.125rem",  // 18px
    xl:   "1.25rem",   // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
    "6xl": "3.75rem",  // 60px
  },
} as const;

export const spacing = {
  // Tailwind default spacing scale (rem-based, 4px base unit)
  // Key values used consistently across the site:
  section: {
    y:  "py-16 lg:py-24",  // Standard vertical section padding
    x:  "px-4 sm:px-6 lg:px-8",
  },
  container: {
    maxWidth: "1280px",    // max-w-screen-xl
  },
} as const;

export const radius = {
  sm:  "calc(0.5rem - 4px)",  // --radius-sm
  md:  "calc(0.5rem - 2px)",  // --radius-md
  lg:  "0.5rem",              // --radius-lg (base)
  xl:  "calc(0.5rem + 4px)",  // --radius-xl
  full: "9999px",
} as const;

export const shadows = {
  sm:  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md:  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg:  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl:  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;
