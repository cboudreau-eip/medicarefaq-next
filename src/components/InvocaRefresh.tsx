"use client";

/**
 * InvocaRefresh — re-triggers Invoca DNI scan on every client-side route change.
 *
 * Next.js App Router navigates without a full page reload, so Invoca's initial
 * scan (which runs once on page load) doesn't fire again when the route changes.
 * This component watches for pathname changes and calls Invoca's re-scan method
 * so phone numbers are swapped correctly on every page.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    Invoca?: {
      PNAPI?: {
        run: () => void;
      };
    };
  }
}

export default function InvocaRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure the new page's DOM (including phone number elements)
    // has rendered before Invoca scans for them.
    const timer = setTimeout(() => {
      if (window.Invoca?.PNAPI?.run) {
        window.Invoca.PNAPI.run();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
