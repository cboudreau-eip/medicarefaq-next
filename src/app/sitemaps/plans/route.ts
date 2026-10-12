import { buildXml, recordContentDate, type SitemapEntry } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { MEDIGAP_PLANS } from "@/lib/medigap-plan-data";
import { CARRIER_DATA } from "@/lib/medigap-carrier-data";
import { STATE_DATA } from "@/lib/medigap-state-data";
import { MEDICARE_ADVANTAGE_PAGES } from "@/lib/medicare-advantage-sub-data";
import { CAREGIVER_PAGES } from "@/lib/caregiver-guide-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";



export function GET() {
  const entries: SitemapEntry[] = [
    { url: `${BASE_URL}/medicare-supplement-plans/alabama/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/alaska/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/arizona/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/arkansas/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/california/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/colorado/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/connecticut/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/delaware/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/florida/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/georgia/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/hawaii/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/idaho/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/illinois/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/indiana/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/iowa/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/kansas/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/kentucky/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/louisiana/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/maine/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/maryland/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/massachusetts/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/michigan/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/minnesota/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/mississippi/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/missouri/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/montana/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/nebraska/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/nevada/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/new-hampshire/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/new-jersey/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/new-mexico/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/new-york/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/north-carolina/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/north-dakota/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/ohio/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/oklahoma/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/oregon/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/pennsylvania/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/rhode-island/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/south-carolina/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/south-dakota/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/tennessee/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/texas/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/utah/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/vermont/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/virginia/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/washington/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/west-virginia/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/wisconsin/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-supplement-plans/wyoming/`, priority: "0.7", changefreq: "monthly" },
  ];

  // Medigap plan letter pages
  for (const plan of Object.values(MEDIGAP_PLANS)) {
    entries.push({
      url: `${BASE_URL}/medicare-supplement-plans/${plan.slug}/`,
      lastmod: recordContentDate(plan),
      priority: "0.8",
      changefreq: "monthly",
    });
  }

  // Carrier pages
  for (const carrier of CARRIER_DATA) {
    entries.push({
      url: `${BASE_URL}/medicare-supplement-plans/medigap-by-carrier/${carrier.slug}/`,
      lastmod: recordContentDate(carrier),
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // State pages
  for (const state of STATE_DATA) {
    entries.push({
      url: `${BASE_URL}/medicare-supplement-plans/medigap-by-state/${state.slug}/`,
      lastmod: recordContentDate(state),
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Medicare Advantage sub-pages
  for (const page of MEDICARE_ADVANTAGE_PAGES.filter((p) => p.slug !== "")) {
    entries.push({
      url: `${BASE_URL}/medicare-part-c/${page.slug}/`,
      lastmod: recordContentDate(page),
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Caregiver guide sub-pages
  for (const page of CAREGIVER_PAGES.filter((p) => p.slug !== "")) {
    entries.push({
      url: `${BASE_URL}/guide-to-being-a-caregiver/${page.slug}/`,
      lastmod: recordContentDate(page),
      priority: "0.6",
      changefreq: "monthly",
    });
  }


  // Plan G state-specific rate pages
  const planGStates = ["florida", "texas", "california", "new-york", "ohio", "pennsylvania", "illinois", "north-carolina", "georgia", "michigan"];
  for (const state of planGStates) {
    entries.push({
      url: `${BASE_URL}/medicare-supplement-plans/${state}/plan-g/`,
      priority: "0.8",
      changefreq: "monthly",
    });
    entries.push({
      url: `${BASE_URL}/medicare-supplement-plans/${state}/plan-n/`,
      priority: "0.8",
      changefreq: "monthly",
    });
  }

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
