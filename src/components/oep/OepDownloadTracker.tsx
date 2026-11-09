"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { pushEvent } from "@/lib/analytics";
import { observeOepPdfClicks } from "@/lib/oep-download-events";

export default function OepDownloadTracker() {
  useEffect(() => observeOepPdfClicks(document, () => window.location.href, (payload) => {
    // Keep either analytics destination working if the other is blocked.
    try { pushEvent({ ...payload }); } catch { /* Keep the link functional. */ }
    try {
      const { event, ...properties } = payload;
      posthog.capture(event, properties);
    } catch { /* Keep the link functional. */ }
  }), []);
  return null;
}
