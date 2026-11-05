# Decision Kit → Marketing Cloud: protected preview implementation

Status: protected preview deployed and tested. Production still uses the existing internal notification.
Read-only Salesforce verification succeeded: authentication HTTP 200; send definition HTTP 200, Active, matching the configured key (November 5, 2026). One approved diagnostic email was sent to cboudreau@teameip.com using fictional PreviewTest / 1962-02-28 data. Drip automation is not implemented.

## Confirmed contract
- recipient.contactKey and recipient.to: normalized, lower-case email address. SFMC maps these to SubscriberKey and EmailAddress.
- Name: first name, maximum 50 characters.
- BirthDate: YYYY-MM-DD text, maximum 50 characters.
- SubmissionDate: UTC ISO timestamp text, maximum 50 characters.
- EmailOptin: Boolean preserving the actual checkbox state. False still receives the requested transactional kit. This must not subscribe/re-subscribe a contact or override Salesforce suppression status.
- PDF_URL: personalized signed link, following the original developer handoff. Verify the email uses this value during the approved test.
- PDF Title: Turning 65 Medicare Decision Kit, matching the developer's new Text(50) field.
- Do not send legacy FirstName, LastName, SubmittedAt or Source attributes unless the admin confirms those columns exist.
- Current prechecked wording and behavior retained per user direction. EmailOptin=true is a preselected preference, not proof of affirmative consent; campaign setup must preserve that distinction and honor unsubscribes.

## Preview switches and missing settings
Only VERCEL_ENV=preview plus DECISION_KIT_SFMC_PREVIEW=true enables sends. Production cannot enable this implementation, even if the flag is accidentally set. Local/default previews generate the PDF without sending internal notifications.
Required preview-only settings:
- SFMC_CLIENT_ID / SFMC_CLIENT_SECRET / SFMC_ACCOUNT_ID / SFMC_SEND_DEFINITION_KEY
- SFMC_AUTH_BASE_URI or SFMC_AUTH_URL (the developer's file uses the latter; supports either base URI or /v2/token).
- DECISION_KIT_TEST_RECIPIENTS: comma-separated explicitly approved test addresses. No wildcard or implicit +alias matching.
- SFMC_PDF_URL_CONFIRMED=true after admin confirmation.
- DECISION_KIT_BLOB_READ_WRITE_TOKEN: token for a dedicated PRIVATE Blob store.
- DECISION_KIT_LINK_SECRET: at least 32 random characters; server-only.
- DECISION_KIT_LINK_ORIGIN: optional exact HTTPS origin override, no path or query. Defaults to the platform-provided immutable VERCEL_URL. Use the authenticated preview URL during review. The reviewer must be logged into Vercel to open emailed preview links; do not disable Deployment Protection.

Credentials in Downloads were not committed. Never expose these settings through NEXT_PUBLIC_.

## Link design
Generated PDFs are written server-side to private storage under opaque HMAC identifiers. No birthday, name, or email appears in file paths or links. The API checks a tamper-resistant signed token and its 30-day expiration before reading Blob; invalid/expired links return 410, disabled endpoints return 404. PDF responses are inline, no-store, noindex and no-referrer. Direct Blob access remains private.
These are bearer links: a person with a forwarded valid link can access it, subject also to preview authentication. They are not identity-bound login links. Revocation is possible by deleting the private file or rotating the signing key. Link expiry does not delete the stored PDF; define and implement automatic file cleanup before production launch.

## Behavior
The browser still opens the generated PDF immediately and retains fallback links. SFMC is awaited; 202 is reported as queued, never delivered. An SFMC/storage failure preserves the immediate PDF and displays an email-unavailable notice, with no fallback internal notification in preview. Errors do not expose tokens, response bodies, or PII. Retries reuse the same message key. Identical retries in the same form session keep the same request ID; changed fields produce a distinct message key. No claim of global exactly-once delivery across different browsers/sessions.

## Required before production approval
1. Confirm the transactional journey is active and its actual Data Extension/AMPscript agree with the contract above, especially PDF_URL and Boolean EmailOptin.
2. Test inbox approved: cboudreau@teameip.com. Dedicated private store: store_i9wasB8KRnzHSeAS, connected to preview only. Configure branch-only SFMC settings and run checked and unchecked submissions with fictitious birthdates. Confirm EmailSent/inbox receipt, exact stored values, and link behavior. Repeating a request must not send twice. Existing unsubscribes must remain suppressed for marketing.
3. Add production-grade server-verified bot protection and distributed rate limits before enabling any public email sender; preview recipient allowlisting alone is not a production abuse control.
4. Add bounded storage retention/cleanup, operational failure monitoring and a support/retry process. Decide whether higher-assurance identity-bound access is required for personalized documents.
5. Approve production cutover explicitly, replace the preview-only gate, confirm a trusted production link origin, then disable internal notifications only after the SFMC path is verified. Do not deploy preview code as a claim that the migration is complete.

## Validation
Run `node scripts/test-decision-kit-sfmc.cjs` for mocked API, field mapping, expiry, tampering and retry checks. This test never uses credentials, stores files or sends email. Run `node scripts/test-decision-kit-route.cjs` for real PDF generation and email failure fallback without any network sends. A clean Vercel preview build validates the complete app. No customer submissions are used for testing.

## Verified preview results — November 5, 2026
- Protected preview: https://medicarefaq-next-m9tskj2ff-elite-insurance-partners.vercel.app/tools/decision-kit/ (code 2178e2fa). Vercel preview SSO protection remains enabled.
- Clean preview builds passed, including TypeScript and static generation. Local standalone type checking encountered stale .next OEP artifacts only.
- Checked and unchecked browser submissions generated real personalized PDFs and stored them in the private Blob store. Both preserved browser open/download fallbacks after email failure.
- Vercel-hosted SFMC authentication returns HTTP 403. The same supplied credentials authenticate HTTP 200 from the authorized local diagnostic; no credentials are printed. This requires investigation of SFMC access restrictions; the precise policy causing rejection is not yet established.
- Direct diagnostic retry of the first message key was accepted HTTP 202. The message status subsequently returned TransactionalSendEvents.EmailSent; the email arrived at 20:04:36 UTC with subject Your Medicare Decision Kit is ready. No customer records were submitted for tests.
- The received email says Thanks, there instead of PreviewTest. Its download button resolves to https://info.teameip.com/medicare-kit and a fixed Marketing Cloud-hosted PDF, not the submitted personalized PDF_URL. The template must map Name and PDF_URL before cutover.
- No SFMC Data Extension row readback, successful Vercel-to-SFMC send, or emailed personalized-link verification is claimed. Full workflow remains blocked on the provider access and template issues. Production was not published or cut over.
