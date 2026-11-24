# Data-backed article additions

Optional `contentAdditions` support allows the CMS to insert approved sections without renumbering existing sections or moving CTA/tracking components. Coverage articles use `after: "before-faqs"`; legacy FAQs use `section-N`; Part D uses the original section ID. Each addition includes a unique ID, heading and flat paragraph/list/table blocks. All text uses the existing safe inline renderer.

No article changes merely by deploying this support. The CMS prepares proposed additions and still requires manual approval followed by explicit publishing. Existing content arrays and CTA code stay unchanged. Run `tsx --test scripts/verify-content-additions.test.tsx` for renderer coverage.
