import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Prevent clickjacking — only allow the site to be framed by itself
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Prevent MIME-type sniffing — browsers must respect declared Content-Type
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Enforce HTTPS for 1 year, including subdomains
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    // Control referrer data sent to external sites
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Disable browser features the site does not use
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Content Security Policy — whitelist only the domains the site actually uses
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // GTM, Google Analytics, Google Ads, and PostHog script loading
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://ade.googlesyndication.com https://adservice.google.com https://www.google.com https://bat.bing.com https://connect.facebook.net https://solutions.invocacdn.com https://*.invoca.net https://app.posthog.com https://us-assets.i.posthog.com https://*.posthog.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Allow GTM and GA images (pixel tracking)
      "img-src 'self' data: https: blob: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com",
      // Allow GTM iframe, YouTube embeds, Google Ads, and self (for heatmap admin iframe viewer)
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://bid.g.doubleclick.net https://googleads.g.doubleclick.net https://www.facebook.com",
      // Allow GA/GTM beacons, Google Ads, PostHog, and demographics redirect domains
      "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://ade.googlesyndication.com https://adservice.google.com https://www.google.com https://bat.bing.com https://www.facebook.com https://demographics.medicarecompared.com https://demographicsqa.medicarecompared.com https://solutions.invocacdn.com https://*.invoca.net https://app.posthog.com https://us.i.posthog.com https://us-assets.i.posthog.com https://*.posthog.com",
      "media-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://demographics.medicarecompared.com https://demographicsqa.medicarecompared.com",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/compare-rates",
        destination: "/medicare-supplement-plans",
        permanent: true,
      },

      // ── Old /medicare-supplement-plans/medicare-supplement-plans/:slug → /medicare-supplement-plans/:slug ──
      {
        source: "/medicare-supplement-plans/medicare-supplement-plans/:slug",
        destination: "/medicare-supplement-plans/:slug",
        permanent: true,
      },

      // ── Old /medicare-supplement-plans/medicare-supplement-carriers index ──
      {
        source: "/medicare-supplement-plans/medicare-supplement-carriers",
        destination: "/medicare-supplement-plans/medigap-by-carrier",
        permanent: true,
      },

      // ── Old /medicare-supplement-plans/compare-medigap-plans ──
      {
        source: "/medicare-supplement-plans/compare-medigap-plans",
        destination: "/medicare-supplement-plans/compare",
        permanent: true,
      },

      // ── Old carrier slugs ──
      {
        source: "/medicare-supplement-plans/medicare-supplement-carriers/aetna",
        destination: "/medicare-supplement-plans/medigap-by-carrier/aetna-medicare-supplement-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplement-plans/medicare-supplement-carriers/cigna",
        destination: "/medicare-supplement-plans/medigap-by-carrier/cigna-medigap-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplement-plans/medicare-supplement-carriers/humana",
        destination: "/medicare-supplement-plans/medigap-by-carrier/humana-medigap-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplement-plans/medicare-supplement-carriers/mutual-of-omaha",
        destination: "/medicare-supplement-plans/medigap-by-carrier/mutual-of-omaha-medigap-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplement-plans/medicare-supplement-carriers/unitedhealthcare",
        destination: "/medicare-supplement-plans/medigap-by-carrier/united-healthcare-medigap-plans",
        permanent: true,
      },

      // ── FAQ slug redirects ──
      { source: "/faqs/medicare-questions", destination: "/faqs/turning-65-these-are-the-most-common-medicare-questions-answered", permanent: true },
      { source: "/faqs/medicare-part-d-enrollment", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods", permanent: true },
      { source: "/faqs/does-medicare-cover-diabetic-supplies", destination: "/faqs/medicare-diabetes", permanent: true },
      { source: "/faqs/does-medicare-cover-skilled-nursing", destination: "/faqs/medicare-coverage-for-skilled-nursing-facilities", permanent: true },
      { source: "/faqs/does-medicare-cover-wound-care", destination: "/faqs/medicare-and-wound-care-coverage", permanent: true },
      { source: "/faqs/medicare-supplement-plan-g", destination: "/medicare-supplement-plans/plan-g", permanent: true },
      { source: "/faqs/plan-g", destination: "/medicare-supplement-plans/plan-g", permanent: true },
      { source: "/faqs/what-does-medicare-part-a-cover", destination: "/original-medicare/medicare-parts/medicare-part-a", permanent: true },
      { source: "/faqs/what-is-medicare-part-a", destination: "/original-medicare/medicare-parts/medicare-part-a", permanent: true },
      { source: "/faqs/what-is-medicare-part-b", destination: "/original-medicare/medicare-parts/medicare-part-b", permanent: true },
      { source: "/faqs/what-is-medicare-part-d", destination: "/original-medicare/medicare-parts/medicare-part-d", permanent: true },
      { source: "/faqs/what-is-durable-medical-equipment-dme", destination: "/faqs/does-medicare-cover-durable-medical-equipment", permanent: true },
      { source: "/faqs/what-is-the-medicare-part-b-deductible", destination: "/faqs/medicare-part-b-premiums", permanent: true },
      { source: "/faqs/what-does-medically-necessary-mean-for-medicare", destination: "/faqs/what-does-medically-necessary-mean", permanent: true },
      { source: "/faqs/medicare-advantage", destination: "/medicare-part-c/medicare-advantage-plans", permanent: true },
      { source: "/faqs/medicare-advantage-plan-hmo", destination: "/medicare-part-c/medicare-advantage-plan-hmo", permanent: true },
      { source: "/faqs/medicare-eligibility", destination: "/original-medicare/medicare-eligibility", permanent: true },
      { source: "/faqs/medicare-part-d", destination: "/original-medicare/medicare-parts/medicare-part-d", permanent: true },
      { source: "/faqs/observation-vs-inpatient-why-it-can-affect-your-medicare-bill", destination: "/blog/observation-vs-inpatient-why-it-can-affect-your-medicare-bill", permanent: true },
      { source: "/faqs/medicare-and-vision-dental-and-hearing-what-are-your-options", destination: "/blog/medicare-and-vision-dental-and-hearing-what-are-your-options", permanent: true },

      // ── Missing section redirects ──
      { source: "/caregiver-guide", destination: "/guide-to-being-a-caregiver", permanent: true },
      { source: "/caregiver-guide/caregiver-resources", destination: "/guide-to-being-a-caregiver/caregiver-assistance", permanent: true },
      { source: "/caregiver-guide/helping-parent-enroll", destination: "/guide-to-being-a-caregiver/how-to-become-a-caregiver", permanent: true },
      { source: "/caregiver-guide/managing-medicare-benefits", destination: "/guide-to-being-a-caregiver/what-is-a-caregiver", permanent: true },
      { source: "/caregiver-guide/medicare-long-term-care", destination: "/guide-to-being-a-caregiver/caregiver-assistance", permanent: true },
      { source: "/caregiver-guide/understanding-medicare", destination: "/guide-to-being-a-caregiver/what-is-a-caregiver", permanent: true },
      { source: "/medicare-advantage", destination: "/medicare-part-c/medicare-advantage-plans", permanent: true },
      { source: "/medicare-part-c", destination: "/medicare-part-c/medicare-advantage-plans", permanent: true },
      { source: "/new-to-medicare", destination: "/new-to-medicare/eligibility", permanent: true },
      { source: "/new-to-medicare/medicare-fehb", destination: "/faqs/fehb-and-medicare", permanent: true },
      { source: "/new-to-medicare/medicare-under-65", destination: "/faqs/medicare-for-disabled-individuals", permanent: true },
      { source: "/new-to-medicare/medicare-va-benefits", destination: "/faqs/medicare-and-va-benefits", permanent: true },
      { source: "/new-to-medicare/medicare-vs-medicaid", destination: "/faqs/medicare-vs-medicaid", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/online-guides", destination: "/library/guides", permanent: true },
      { source: "/original-medicare/medicare-parts", destination: "/original-medicare", permanent: true },
      { source: "/terms-of-service", destination: "/terms-of-use", permanent: true },
      // Note: /medicare-enrollment/employer-coverage, /initial-enrollment-period, /special-enrollment-period
      // were previously redirected to FAQ pages but are now actual pages on the site — redirects removed.

      // ── Part D sub-page redirects ──
      { source: "/original-medicare/medicare-parts/medicare-part-d/coverage-gap-discount-program", destination: "/blog/coverage-gap-discount-program", permanent: true },
      { source: "/original-medicare/medicare-parts/medicare-part-d/part-d-coverage-gap", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-coverage-gap", permanent: true },
      { source: "/original-medicare/medicare-parts/medicare-part-d/part-d-eligibility", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-eligibility", permanent: true },
      { source: "/original-medicare/medicare-parts/medicare-part-d/part-d-enrollment-periods", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods", permanent: true },

      // ── Blog 404s — old URLs never migrated to new site ──
      { source: "/blog/best-medicare-supplement-companies", destination: "/faqs/top-10-medicare-supplement-insurance-companies", permanent: true },
      { source: "/blog/costs-of-not-having-insurance", destination: "/blog/the-essentials-medicare-supplement-vs-medicare-advantage-explained", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-benefits", destination: "/medicare-supplement-plans/plan-g", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-cost", destination: "/medicare-supplement-plans/plan-g", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-reviews", destination: "/faqs/medicare-plan-g-reviews", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-vs-plan-f", destination: "/faqs/medicare-supplement-plan-f-vs-plan-g-vs-plan-n", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-vs-plan-n", destination: "/faqs/medicare-supplement-plan-f-vs-plan-g-vs-plan-n", permanent: true },
      { source: "/blog/medicare-tax-rate", destination: "/faqs/medicare-tax-rate", permanent: true },
      { source: "/faqs/medicare-coverage-for-hearing-aids", destination: "/faqs/does-medicare-cover-hearing-aids", permanent: true },

      // ── High-deductible plan slug corrections ──
      { source: "/medicare-supplement-plans/plan-high-deductible-f", destination: "/medicare-supplement-plans/high-deductible-plan-f", permanent: true },
      { source: "/medicare-supplement-plans/plan-high-deductible-g", destination: "/medicare-supplement-plans/high-deductible-plan-g", permanent: true },

      // ── Old top-level URLs → new site structure ──
      { source: "/what-is-medicare", destination: "/medicare-101", permanent: true },
      { source: "/what-is-medicare-part-a", destination: "/original-medicare/medicare-parts/medicare-part-a", permanent: true },
      { source: "/what-is-medicare-part-b", destination: "/original-medicare/medicare-parts/medicare-part-b", permanent: true },
      { source: "/what-is-medicare-part-c", destination: "/medicare-part-c/medicare-advantage-plans", permanent: true },
      { source: "/what-is-medicare-part-d", destination: "/original-medicare/medicare-parts/medicare-part-d", permanent: true },
      { source: "/medicare-part-d", destination: "/original-medicare/medicare-parts/medicare-part-d", permanent: true },
      { source: "/medicare-enrollment/annual-enrollment-period", destination: "/medicare-enrollment", permanent: true },
      { source: "/medicare-enrollment/open-enrollment-period", destination: "/medicare-enrollment", permanent: true },
      { source: "/medigap", destination: "/medicare-supplement-plans", permanent: true },
      { source: "/medicare-costs", destination: "/new-to-medicare/costs", permanent: true },
      { source: "/medicare-eligibility", destination: "/new-to-medicare/eligibility", permanent: true },
      { source: "/turning-65", destination: "/new-to-medicare/turning-65", permanent: true },
      { source: "/medicare-supplement-insurance", destination: "/medicare-supplement-plans", permanent: true },

      // ── Blog article slug updates ──
      { source: "/blog/new-in-2025-medicares-part-d-payment-plan-explained", destination: "/blog/medicare-part-d-payment-plan-2026", permanent: true },
    ];
  },
  async headers() {
    // Security headers without X-Frame-Options restriction (for pages that embed iframes)
    const securityHeadersIframeAllowed = securityHeaders.filter(
      (h) => h.key !== "X-Frame-Options"
    );
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Admin heatmap dashboard needs to embed site pages in iframes — allow framing
        source: "/admin/heatmap(.*)",
        headers: securityHeadersIframeAllowed,
      },
    ];
  },
};

export default nextConfig;
