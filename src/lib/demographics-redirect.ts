/**
 * Medicare Compared — Demographics App Redirect
 *
 * Ported from the provided demographics-redirect.js script into a
 * TypeScript module for use in the Next.js app.
 *
 * Usage:
 *   import { redirectToDemographics } from '@/lib/demographics-redirect';
 *   redirectToDemographics(zipCode, 'ms');
 *
 * Coverage types:
 *   'ma'  → Medicare Advantage
 *   'ms'  → Medicare Supplement (Medigap)
 *   'pdp' → Part D (Drug Plan)
 *   'me'  → Medicare Advantage + Supplement
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const DEMOGRAPHICS_BASE_URL = "https://demographicsqa.medicarecompared.com"; // QA for testing
const YOUR_BRAND = "medicarefaq";
const YOUR_PAGE_ID = ""; // optional campaign/page identifier

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCookie(name: string): string {
  const re = new RegExp(
    "(?:^|;)\\s*" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"
  );
  const match = document.cookie.match(re);
  return match ? decodeURIComponent(match[1]) : "";
}

function getURLParams(): Record<string, string> {
  const out: Record<string, string> = {};
  new URLSearchParams(window.location.search).forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua))
    return "mobile";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome\//i.test(ua)) return "Chrome";
  if (/firefox\//i.test(ua)) return "Firefox";
  if (/safari\//i.test(ua)) return "Safari";
  if (/msie|trident/i.test(ua)) return "Internet Explorer";
  return "Unknown";
}

function detectOS(): string {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "Windows";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/mac os x/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown";
}

function detectDeviceBrand(): string {
  const ua = navigator.userAgent;
  if (/samsung/i.test(ua)) return "Samsung";
  if (/iphone|ipad|ipod|mac/i.test(ua)) return "Apple";
  if (/huawei/i.test(ua)) return "Huawei";
  if (/motorola|moto\s/i.test(ua)) return "Motorola";
  if (/\blg\b/i.test(ua)) return "LG";
  return "";
}

function pageURL(): string {
  return (
    window.location.protocol +
    "//" +
    window.location.hostname +
    window.location.pathname
  );
}

function referrerHostname(): string {
  try {
    return document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    return "";
  }
}

// ─── Payload ─────────────────────────────────────────────────────────────────

function buildPayload(
  zipCode: string,
  termId: string,
  qp: Record<string, string>
): Record<string, string | number> {
  const now = new Date().toISOString();
  const gaClientId = getCookie("_ga");
  const device = detectDevice();
  const browser = detectBrowser();
  const os = detectOS();
  const brand = detectDeviceBrand();
  const currentPageURL = pageURL();
  const landing = window.location.origin + window.location.pathname;
  const referrer = referrerHostname();

  return {
    // Form
    postalCode: zipCode,
    termId: termId || "",

    // Session
    sessionStartTime: now,
    leadPageID: qp.leadPageID || YOUR_PAGE_ID,
    leadBrand: getCookie("leadBrand") || YOUR_BRAND,
    leadClientIDGoogle: gaClientId,
    leadStatus: "New",
    leadSubStatus: "",

    // UTM / click params — forwarded from page URL as-is
    utm_source: qp.utm_source || "direct",
    utm_medium: qp.utm_medium || "search",
    utm_campaign: qp.utm_campaign || "",
    utm_term: qp.utm_term || "",
    utm_content: qp.utm_content || "",
    adgroupid: qp.adgroupid || "",
    network: qp.network || "",
    adposition: qp.adposition || "",
    matchtype: qp.matchtype || "",
    location: qp.location || "",
    placement: qp.placement || "",
    querystring: qp.querystring || "",
    extensionid: qp.extensionid || "",
    gclid: qp.gclid || "",
    msclkid: qp.msclkid || "",
    fbclid: qp.fbclid || "",
    campaignID: qp.campaignID || "",
    adgroup_ID: qp.adgroup_ID || "",
    keywordID: qp.keywordID || "",
    info: qp.info || "",
    MATOKENID: qp.MATOKENID || "",

    // Device / browser / OS
    leadDevice: device,
    leadBrowser: browser,
    osName: os,
    leadDeviceBrand: brand,
    leadDeviceName: "",
    leadOsVersion: "",
    leadScreenHeight: window.outerHeight || "",
    leadScreenWidth: window.outerWidth || "",

    // Page metadata
    leadURL: currentPageURL,
    leadLandingPage: landing,
    leadReferringUrl: referrer,

    // First-touch original attribution (marketing_Original-* fields)
    "marketing_Original-Lead-Ad-Source": qp.utm_source || "direct",
    "marketing_Original-Lead-Medium": qp.utm_medium || "search",
    "marketing_Original-Lead-Ad-Campaign": qp.utm_campaign || "",
    "marketing_Original-Lead-Ad-Group": qp.adgroupid || "",
    "marketing_Original-Lead-Date": now,
    "marketing_Original-Lead-URL": currentPageURL,
    "marketing_Original-Google-Client-ID": gaClientId,
    "marketing_Original-Lead-Network": qp.network || "",
    "marketing_Original-Lead-Match-Type": qp.matchtype || "",
    "marketing_Original-Lead-Keywords": qp.utm_term || "",
    "marketing_Original-Lead-Query-String": qp.querystring || "",
    "marketing_Original-Lead-Content": qp.utm_content || "",
    "marketing_Original-Lead-Extension": qp.extensionid || "",
    "marketing_Original-Lead-Device": device,
    "marketing_Original-Lead-Location": qp.location || "",
    "marketing_Original-Lead-Placement": qp.placement || "",
    "marketing_Original-Lead-Ad-Position": qp.adposition || "",
    "marketing_Original-Lead-Device-Brand": brand,
    "marketing_Original-Lead-Device-Name": "",
    "marketing_Original-Lead-Lead-OS-Version": "",
    "marketing_Original-Lead-Screen-Height": window.outerHeight || "",
    "marketing_Original-Lead-Screen-Width": window.outerWidth || "",
    "marketing_Original-Lead-Landing-Page": landing,
    "marketing_Original-Lead-Referring-URL": referrer,
    "marketing_Original-Lead-IP-Address": "",
    "marketing_Original-Lead-Lead-Browser": browser,
    "marketing_Original-Lead-Operating-System": os,
    "marketing_Original-Lead-Campaign-ID": qp.campaignID || "",
    "marketing_Original-Lead-Ad-Group-ID": qp.adgroup_ID || "",
    "marketing_Original-Lead-Keyword-ID": qp.keywordID || "",
    "marketing_Original-Lead-Extension-ID": qp.extensionid || "",
  };
}

// ─── Submit as hidden GET form ───────────────────────────────────────────────

function submitForm(
  targetURL: string,
  payload: Record<string, string | number>
) {
  let form = document.getElementById(
    "mc-demographics-form"
  ) as HTMLFormElement | null;
  if (!form) {
    form = document.createElement("form");
    form.id = "mc-demographics-form";
    form.style.display = "none";
    document.body.appendChild(form);
  }
  form.method = "GET";
  form.action = targetURL;
  while (form.firstChild) form.firstChild.remove();

  Object.keys(payload).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = payload[key] != null ? String(payload[key]) : "";
    form!.appendChild(input);
  });

  form.submit();
}

// ─── Public API ──────────────────────────────────────────────────────────────

export type CoverageType = "ma" | "ms" | "pdp" | "me";

/**
 * Redirect the visitor to the demographics app with all attribution params.
 *
 * @param zipCode       5-digit ZIP code
 * @param coverageType  'ma' | 'ms' | 'pdp' | 'me'
 * @param termId        Optional term/image ID
 */
export function redirectToDemographics(
  zipCode: string,
  coverageType: CoverageType,
  termId?: string
) {
  const qp = getURLParams();
  const payload = buildPayload(zipCode, termId || "", qp);
  submitForm(DEMOGRAPHICS_BASE_URL + "/" + (coverageType || "ma"), payload);
}
