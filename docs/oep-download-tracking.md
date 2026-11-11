# OEP PDF click tracking (preview)

Event: `oep_pdf_click`, sent through the existing PostHog client and GTM dataLayer.

Properties: `resource_id`, `resource_path`, `action` (`open` or `download`), `page_path`, `environment` (`preview`). These custom properties exclude URL queries, fragments, form fields and PDF contents. Existing analytics providers retain their own standard metadata and consent behavior.

Covers the checklist, comparison worksheet, provider sheet, prescription workbook and complete kit on the hub and supporting pages. A delegated listener also handles links rendered after client navigation. Keyboard activation, normal clicks and middle clicks are supported. It does not cancel or delay navigation; blocked analytics does not prevent access.

This measures link activation, not successful transfer, reading, completion or a lead. Direct PDF visits and downloads from the browser's PDF viewer are not measured. Report these separately from any existing automatic file-download events to avoid double counting.

Mounted only in local development and Vercel preview. Production launch requires deliberately enabling the tracker and setting the environment property appropriately. Filter preview traffic out of production reports.

Before launch, validate receipt in PostHog. For GA4, verify or configure a GTM Custom Event trigger for `oep_pdf_click`, map these event parameters, and register reportable custom dimensions as needed. A dataLayer push alone does not prove GA4 delivery. No GTM container or analytics dashboard was published as part of this change.

Validation: `node scripts/test-oep-download-events.cjs` exercises all assets, action selection, source-page changes, privacy of custom properties, listener cleanup and analytics failures without sending analytics traffic.
