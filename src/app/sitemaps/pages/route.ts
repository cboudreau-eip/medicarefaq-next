import { buildXml } from "@/lib/sitemap";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";

const pages = [
    { url: `${BASE_URL}/about-us/david-haass/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/coverage-gaps/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/choosing-a-medigap-plan/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/enrollment-windows/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/medigap-vs-advantage/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/next-steps/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/parts-of-medicare/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-101-course/what-is-medicare/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-advantage-plans/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-by-state/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medigap-plans/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/sitemap-page/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/tools/decision-kit/`, priority: "0.7", changefreq: "monthly" },
  // Core
  { url: `${BASE_URL}/`, priority: "1.0", changefreq: "daily" },
  { url: `${BASE_URL}/contact/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/about-us/`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/about-us/jagger-esch/`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/meet-the-editorial-team/`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/client-care-team/`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/testimonials/`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/privacy-policy/`, priority: "0.3", changefreq: "yearly" },
  { url: `${BASE_URL}/terms-of-use/`, priority: "0.3", changefreq: "yearly" },
  { url: `${BASE_URL}/scholarship-opportunities/`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/third-party-partners/`, priority: "0.4", changefreq: "monthly" },
  // New To Medicare
  { url: `${BASE_URL}/medicare-101/`, priority: "0.9", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/eligibility/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/costs/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/checklist/`, priority: "0.7", changefreq: "monthly" },
  // Supplement index pages
  { url: `${BASE_URL}/medicare-supplement-plans/`, priority: "0.9", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplement-plans/compare/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplement-plans/medigap-eligibility/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplement-plans/medicare-supplement-plans-2026/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplement-plans/medigap-by-carrier/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplement-plans/medigap-by-state/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-plans/costs/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-plans/supplement-vs-advantage/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-plans/best-supplement-plans/`, priority: "0.8", changefreq: "monthly" },
  // Medicare Advantage
  { url: `${BASE_URL}/medicare-part-c/medicare-advantage-plans/`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-part-c/medicare-advantage-plan-types/`, priority: "0.7", changefreq: "monthly" },
  // Library / Resources
  { url: `${BASE_URL}/faqs/`, priority: "0.8", changefreq: "weekly" },
  { url: `${BASE_URL}/library/guides/`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/podcasts/`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/videos/`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/search/`, priority: "0.5", changefreq: "monthly" },
  // Caregiver Guide
  { url: `${BASE_URL}/guide-to-being-a-caregiver/`, priority: "0.7", changefreq: "monthly" },
  // Seniors Guide
  { url: `${BASE_URL}/seniors-guide-to-medicare-gov/tools-and-resources/`, priority: "0.6", changefreq: "monthly" },
];


export function GET() {
  return new NextResponse(buildXml(pages), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
