"use client";
/**
 * analytics.ts — Centralized GTM dataLayer event helpers for MedicareFAQ
 *
 * All events are pushed to window.dataLayer which GTM forwards to GA4
 * (Measurement ID: G-4Z5R6F5E3W).
 *
 * Event taxonomy:
 *   zip_modal_open   — ZipFormModal trigger button clicked
 *   zip_submitted    — ZIP form submitted (just before demographics redirect)
 *   phone_click      — Any tel: link clicked
 *   cta_click        — Non-modal CTA button or link clicked
 *   nav_click        — Header / mega-menu / mobile-nav link clicked
 *   footer_click     — Footer link clicked
 *   outbound_click   — Link leaving medicarefaq.com domain
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/** Push a single event object to window.dataLayer */
export function pushEvent(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

// ─── Typed event helpers ──────────────────────────────────────────────────────

/** Fired when the ZipFormModal trigger button is clicked (modal opens) */
export function trackZipModalOpen(params: {
  coverage_type: string;
  button_label: string;
  page_section?: string;
}): void {
  pushEvent({
    event: "zip_modal_open",
    coverage_type: params.coverage_type,
    button_label: params.button_label,
    page_section: params.page_section ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** Fired when the ZIP form is submitted (just before redirect to demographics) */
export function trackZipSubmitted(params: {
  coverage_type: string;
  zip_code: string;
  page_section?: string;
}): void {
  pushEvent({
    event: "zip_submitted",
    coverage_type: params.coverage_type,
    zip_code: params.zip_code,
    page_section: params.page_section ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** Fired when any tel: phone link is clicked */
export function trackPhoneClick(params: {
  phone_number: string;
  page_section?: string;
}): void {
  pushEvent({
    event: "phone_click",
    phone_number: params.phone_number,
    page_section: params.page_section ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** Fired when a non-modal CTA button or link is clicked */
export function trackCtaClick(params: {
  button_label: string;
  destination?: string;
  page_section?: string;
}): void {
  pushEvent({
    event: "cta_click",
    button_label: params.button_label,
    destination: params.destination ?? "",
    page_section: params.page_section ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** Fired when a header / mega-menu / mobile-nav link is clicked */
export function trackNavClick(params: {
  link_text: string;
  destination: string;
  nav_section?: string;
}): void {
  pushEvent({
    event: "nav_click",
    link_text: params.link_text,
    destination: params.destination,
    nav_section: params.nav_section ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** Fired when a footer link is clicked */
export function trackFooterClick(params: {
  link_text: string;
  destination: string;
  footer_section?: string;
}): void {
  pushEvent({
    event: "footer_click",
    link_text: params.link_text,
    destination: params.destination,
    footer_section: params.footer_section ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/** Fired when a link leaving medicarefaq.com is clicked */
export function trackOutboundClick(params: {
  destination_url: string;
  link_text?: string;
}): void {
  pushEvent({
    event: "outbound_click",
    destination_url: params.destination_url,
    link_text: params.link_text ?? "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}
