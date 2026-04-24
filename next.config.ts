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
      // GTM and Google Analytics script loading
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Allow GTM and GA images (pixel tracking)
      "img-src 'self' data: https: blob: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com",
      // Allow GTM iframe and YouTube embeds
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com",
      // Allow GA/GTM beacons and demographics redirect domains
      "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://demographics.medicarecompared.com https://demographicsqa.medicarecompared.com",
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
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/compare-rates",
        destination: "/medicare-supplements",
        permanent: true,
      },

      // ── Old /medicare-supplements/medicare-supplement-plans/:slug → /medicare-supplements/:slug ──
      {
        source: "/medicare-supplements/medicare-supplement-plans/:slug",
        destination: "/medicare-supplements/:slug",
        permanent: true,
      },

      // ── Old /medicare-supplements/medicare-supplement-carriers index ──
      {
        source: "/medicare-supplements/medicare-supplement-carriers",
        destination: "/medicare-supplements/medigap-by-carrier",
        permanent: true,
      },

      // ── Old /medicare-supplements/compare-medigap-plans ──
      {
        source: "/medicare-supplements/compare-medigap-plans",
        destination: "/medicare-supplements/compare",
        permanent: true,
      },

      // ── Old carrier slugs ──
      {
        source: "/medicare-supplements/medicare-supplement-carriers/aetna",
        destination: "/medicare-supplements/medigap-by-carrier/aetna-medicare-supplement-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplements/medicare-supplement-carriers/cigna",
        destination: "/medicare-supplements/medigap-by-carrier/cigna-medigap-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplements/medicare-supplement-carriers/humana",
        destination: "/medicare-supplements/medigap-by-carrier/humana-medigap-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplements/medicare-supplement-carriers/mutual-of-omaha",
        destination: "/medicare-supplements/medigap-by-carrier/mutual-of-omaha-medigap-plans",
        permanent: true,
      },
      {
        source: "/medicare-supplements/medicare-supplement-carriers/unitedhealthcare",
        destination: "/medicare-supplements/medigap-by-carrier/united-healthcare-medigap-plans",
        permanent: true,
      },

      // ── FAQ slug redirects ──
      { source: "/faqs/does-medicare-cover-diabetic-supplies", destination: "/faqs/medicare-diabetes", permanent: true },
      { source: "/faqs/does-medicare-cover-skilled-nursing", destination: "/faqs/medicare-coverage-for-skilled-nursing-facilities", permanent: true },
      { source: "/faqs/does-medicare-cover-wound-care", destination: "/faqs/medicare-and-wound-care-coverage", permanent: true },
      { source: "/faqs/medicare-supplement-plan-g", destination: "/medicare-supplements/plan-g", permanent: true },
      { source: "/faqs/plan-g", destination: "/medicare-supplements/plan-g", permanent: true },
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
      { source: "/enrollment/employer-coverage", destination: "/faqs/medicare-and-employer-coverage", permanent: true },
      { source: "/enrollment/initial-enrollment-period", destination: "/faqs/medicare-initial-enrollment-period", permanent: true },
      { source: "/enrollment/special-enrollment-period", destination: "/faqs/medicare-special-enrollment-period", permanent: true },
      { source: "/enrollment/special-enrollment-periods", destination: "/faqs/medicare-special-enrollment-period", permanent: true },

      // ── Part D sub-page redirects ──
      { source: "/original-medicare/medicare-parts/medicare-part-d/coverage-gap-discount-program", destination: "/blog/coverage-gap-discount-program", permanent: true },
      { source: "/original-medicare/medicare-parts/medicare-part-d/part-d-coverage-gap", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-coverage-gap", permanent: true },
      { source: "/original-medicare/medicare-parts/medicare-part-d/part-d-eligibility", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-eligibility", permanent: true },
      { source: "/original-medicare/medicare-parts/medicare-part-d/part-d-enrollment-periods", destination: "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods", permanent: true },

      // ── Blog 404s — old URLs never migrated to new site ──
      { source: "/blog/best-medicare-supplement-companies", destination: "/faqs/top-10-medicare-supplement-insurance-companies", permanent: true },
      { source: "/blog/costs-of-not-having-insurance", destination: "/blog/the-essentials-medicare-supplement-vs-medicare-advantage-explained", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-benefits", destination: "/medicare-supplements/plan-g", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-cost", destination: "/medicare-supplements/plan-g", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-reviews", destination: "/faqs/medicare-plan-g-reviews", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-vs-plan-f", destination: "/faqs/medicare-supplement-plan-f-vs-plan-g-vs-plan-n", permanent: true },
      { source: "/blog/medicare-supplement-plan-g-vs-plan-n", destination: "/faqs/medicare-supplement-plan-f-vs-plan-g-vs-plan-n", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
