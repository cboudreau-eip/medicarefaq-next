# October 26 technical audit repairs

## Scope and authoritative sources

Started at production commit `478c9082`, preserving the newer CMS publications. The CMS article API reads the repository content files on `main`; repairs are made in those same files, not generated HTML. The existing reviewed-link map also supplies permanent redirects and protects legacy related-card references. No homepage redirects, robots changes, page removals, or new articles were introduced.

All 16 reported destinations returned HTTP 404 during the pre-change live recheck. All selected existing replacement pages returned HTTP 200 directly and their headings were reviewed for topic relevance. The local-agent, self-employment-tax, and wound-care destinations have no verified equivalent and receive no redirect.

## Item 1 decisions

Paths below are relative to `https://www.medicarefaq.com`. Final replacement URLs use trailing slashes.

| Old destination | Source pages changed | Replacement or unlink decision | Reason |
| --- | --- | --- | --- |
| `/faqs/medicare-advantage-costs/` | `/blog/medicare-costs-double-beneficiaries/` | `/medicare-part-c/medicare-advantage-costs/`; separate Part D cost link | The original anchor combined two programs. Link each cost topic separately. |
| `/faqs/medigap-supplement-open-enrollment/` | `/blog/medicare-supplement-plans-compared/` | `/faqs/medicare-supplement-open-enrollment/` | Same enrollment window and protections. |
| `/faqs/medicare-supplement-vs-medicare-advantage/` | `/blog/hmsa-plan-termination-may-raise-costs-for-hawaii-seniors/` | `/medicare-plans/supplement-vs-advantage/` | Compares the two coverage structures discussed in the paragraphs. |
| `/faqs/does-medicare-cover-physical-therapy/` | Same HMSA article | Unlink “doctor visit”; legacy URL redirects to `/faqs/medicare-coverage-for-physical-therapy/` | The source discusses general visit copays, not therapy. The old URL itself has a genuine therapy equivalent. |
| `/blog/maryland-birthday-rule/` | `/medicare-by-state/` | `/blog/maryland-medicare-supplement-birthday-rule/` | Existing Maryland birthday-rule guide. |
| `/faqs/medicare-agents-near-me/` | `/faqs/medicare-supplemental-insurance-tax-deductible/` | Remove related link; no redirect | No verified local-agent guide. |
| `/faqs/does-medicare-cover-bathroom-safety-devices/` | `/faqs/home-safety-assessment-for-the-elderly/`; additional dental-implant related data | `/faqs/medicare-coverage-for-bathroom-safety-devices/` | Existing coverage guide for those devices. |
| `/faqs/medicare-long-term-care/` | `/faqs/what-medicare-doesnt-cover-common-surprises/` | `/blog/does-medicare-include-long-term-care-common-misunderstanding/` | Explains long-term care coverage exclusions and alternatives. |
| `/faqs/does-medicare-cover-vision/` | Same coverage-surprises article | `/faqs/medicare-vision-care-coverage/` | Existing vision coverage guide. |
| `/faqs/medicare-dental-coverage/` | Same coverage-surprises article | `/faqs/what-dental-expenses-does-medicare-cover/` | Existing dental coverage guide. |
| `/faqs/medicare-advantage-benefits/` | `/faqs/medicare-visiting-angels/`; additional Advantage related data | `/faqs/medicare-advantage-extra-benefits-explained-whats-really-included/` | Discusses the extra benefits named by the card. |
| `/faqs/medicare-part-a-trust-fund/` | `/faqs/medicare-tax-rate/` | `/faqs/how-is-medicare-funded/` | Includes the Part A trust fund and payroll taxes. Card description no longer promises a specific depletion projection. |
| `/blog/medicare-and-self-employment-tax-planning/` | `/faqs/medicare-tax-rate/` | Remove the sentence advertising a nonexistent dedicated guide; no redirect | Preserve the preceding tax explanation. No verified equivalent. |
| `/faqs/does-medicare-cover-dental/` | `/faqs/does-medicare-cover-eye-exams/` | `/faqs/what-dental-expenses-does-medicare-cover/` | Same dental coverage topic. |
| `/faqs/medicare-supplement-plan-g-benefits/` | `/faqs/medicare-8-minute-rule/` | `/medicare-supplement-plans/plan-g/` | Plan G benefits. Inline source fixed; existing related-card slug resolves directly through the reviewed map. |
| `/faqs/does-medicare-cover-wound-care/` | `/faqs/medicare-coverage-for-diabetic-shoes/` | Keep “foot ulcers” as plain text; no redirect | Preserve the qualifying-condition text without substituting a different topic. |

## Item 2 pagination

The blog now shares its published, deduplicated inventory and page normalization between metadata and the displayed listing. Four featured articles and 12 regular articles per numbered page are preserved. Page count follows the current inventory, not the audit's historical maximum of 15.

| Request | Before canonical | After canonical |
| --- | --- | --- |
| `/blog/` or `/blog/?page=1` | `/blog/` | `/blog/` |
| `/blog/?page=2` | `/blog/` | `/blog/?page=2` |
| `/blog/?page=2&utm_source=test` | `/blog/` | `/blog/?page=2` |
| Valid page N | `/blog/` | `/blog/?page=N` |
| Missing, zero, negative, malformed, unsafe integer | `/blog/` | Page 1, matching the displayed listing |
| Repeated page parameter | `/blog/` | First value, normalized consistently |
| Out-of-range positive integer | `/blog/` with empty listing | Last real page, matching its displayed listing |

Open Graph URL matches the canonical. Existing title, description, image, and crawlable pagination links are preserved. Metadata streaming is unchanged.

## Item 3 state canonicals

Added only `alternates.canonical` to each existing route's metadata for New Hampshire, New Mexico, North Dakota, Oklahoma, Oregon, Rhode Island, South Carolina, South Dakota, Utah, Vermont, West Virginia, and Wyoming. Each uses `https://www.medicarefaq.com/medicare-supplement-plans/<state>/`. Existing content and other metadata remain intact.

## Verification

Unit checks cover URL normalization, no mapped redirect chains, unavailable destinations, direct source repairs, page-number edge cases, dynamic page count, the existing featured grid, and all twelve state canonical declarations. All 17 checks, TypeScript, and the production build passed.

Local production-server verification passed for all 15 numbered blog pages (182 unique article cards), nine additional query cases, all 12 state pages, all 12 reported source pages, and all 13 permanent redirects. Canonicals were checked in both server-response HTML and the rendered browser DOM. Redirect destinations returned HTTP 200 directly. Production verification is reported separately after deployment; these results describe the local build. No claim is made about Google's processing or ranking impact.

The three unavailable topics remain unavailable; the broken links to them are removed, not disguised as working destinations. A currently open CMS editor containing an older article should be refreshed before saving.
