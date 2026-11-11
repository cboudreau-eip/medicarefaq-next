const assets: Record<string, string> = {
  "/medicarefaq-ma-oep-plan-review-checklist.pdf": "plan_review_checklist",
  "/medicarefaq-ma-oep-plan-comparison-worksheet.pdf": "plan_comparison_worksheet",
  "/medicarefaq-ma-oep-provider-verification-sheet.pdf": "provider_verification_sheet",
  "/medicarefaq-ma-oep-prescription-workbook.pdf": "prescription_workbook",
  "/medicarefaq-ma-oep-plan-review-kit.pdf": "complete_kit",
};

export function oepPdfEvent(href: string, pageUrl: string, download: boolean) {
  try {
    const page = new URL(pageUrl);
    const target = new URL(href, page);
    const resource = assets[target.pathname];
    if (target.origin !== page.origin || !resource) return null;
    return {
      event: "oep_pdf_click",
      resource_id: resource,
      resource_path: target.pathname,
      action: download || target.searchParams.get("download") === "1" ? "download" : "open",
      page_path: page.pathname,
      environment: "preview",
    };
  } catch {
    return null;
  }
}

// A single delegated listener covers hub links, article links, and client navigation.
export function observeOepPdfClicks(doc: Document, pageUrl: () => string, capture: (event: NonNullable<ReturnType<typeof oepPdfEvent>>) => void) {
  const onClick = (event: MouseEvent) => {
    if (event.type === "click" ? event.button !== 0 : event.button !== 1) return;
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!anchor) return;
    const payload = oepPdfEvent(anchor.getAttribute("href")!, pageUrl(), anchor.hasAttribute("download"));
    if (payload) {
      try { capture(payload); } catch { /* Analytics must never prevent PDF access. */ }
    }
  };
  doc.addEventListener("click", onClick);
  doc.addEventListener("auxclick", onClick);
  return () => {
    doc.removeEventListener("click", onClick);
    doc.removeEventListener("auxclick", onClick);
  };
}
