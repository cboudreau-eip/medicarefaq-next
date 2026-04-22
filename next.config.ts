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
        permanent: true, // 301 redirect
      },
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
