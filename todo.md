# Project TODO

- [x] Fix Medicare Plans nav dot color — #1B2A4A is invisible against #1B2A4A background, change to a lighter blue
- [x] Add keyword-rich internal links to /enrollment/annual-changes page (6 contextual links to FAQ, Part D, MA pages)
- [x] Add keyword-rich internal links to /enrollment/turning-65
- [x] Add keyword-rich internal links to /enrollment/working-past-65
- [x] Add keyword-rich internal links to /enrollment/how-to-enroll
- [x] Add keyword-rich internal links to /enrollment/late-penalties
- [x] Add keyword-rich internal links to /tools/enrollment-timeline
- [x] Create reusable schema components (FAQSchema, BreadcrumbSchema, ArticleSchema)
- [x] Test schema markup on /enrollment/annual-changes page
- [x] Fix schema issues on /enrollment/annual-changes: ISO 8601 dates + add image field

## Missing Pages Build — Batch 1: State Medigap Pages
- [x] Build alabama-medigap-plans state page
- [x] Build missouri-medigap-plans state page
- [x] Build maryland-medigap-plans state page
- [x] Build wyoming-medigap-plans state page
- [x] Build nebraska-medigap-plans state page

## Missing Pages Build — Batch 2: Original Medicare Section Pages
- [x] Build medicare-eligibility page
- [x] Build medicare-coverage page
- [x] Build medicare-costs page
- [x] Build medicare-enrollment-periods page

## Missing Pages Build — Batch 3: FAQ Articles
- [x] Build chronic-care-management FAQ
- [x] Build five-surprising-facts-about-medigap-you-didnt-know FAQ
- [x] Build does-medicare-cover-hormone-therapy-for-menopause FAQ
- [x] Build medicare-cover-dialysis-treatments FAQ
- [x] Build medicare-plan-g-reviews FAQ
- [x] Build report-medicare-fraud FAQ
- [x] Build medicare-hmo-vs-ppo FAQ
- [x] Build will-medicare-pay-for-a-nebulizer-machine FAQ

## Missing Pages Build — Batch 4: Structural Pages
- [x] Build medicare-advantage-plan-hmo page
- [x] Build role-of-a-caregiver sub-page
- [x] Build online-guides section page

## Missing Pages Build — Batch 5: Blog Posts
- [x] Build switching-from-medicare-advantage-to-original-medicare blog post
- [x] Build top-free-computer-classes-for-seniors blog post
- [x] Build the-best-time-to-enroll-in-a-medicare-supplement-plan blog post
- [x] Build nevada-birthday-rule blog post
- [x] Build when-to-switch-medigap-plans blog post
- [x] Build medicare-supplements-cost-vs-value-explained blog post
- [x] Build direct-care-opportunity-act blog post
- [x] Build step-therapy-and-prior-authorization blog post
- [x] Build medicare-for-all blog post
- [x] Build understanding-medigaps-foreign-travel-benefits blog post
- [x] Build complications-of-shingles-in-the-elderly blog post
- [x] Build medicare-blue-button blog post
- [x] Build senior-dating-and-relationships blog post
- [x] Build companion-pets-for-seniors blog post
- [x] Build best-states-to-retire blog post
- [x] Build medicare-starter-guide-what-to-do-in-your-first-90-days blog post
- [x] Build how-can-seniors-save-on-prescription-drug-costs blog post
- [x] Create dynamic robots.ts for proper robots.txt with sitemap declaration
- [x] Fix blog sitemap to include all individual blog post URLs
- [x] Set logo.png as site favicon (favicon.ico, apple-touch-icon)

## UI Adjustments
- [ ] Reduce mega menu dropdown height — tighten padding/spacing (~20-30% reduction) starting with Medicare Plans
- [ ] Apply mega menu height reduction globally to all menus
- [ ] Make mega menu dropdown not full-width — constrain to content container width, centered under nav
- [ ] Fix journey button subtitle readability — stack text with full white subtitle and subtle divider (Option C)

## Orphan Page Fixes
- [x] Rebuild /faqs index page — Option A: all 250 articles with category filter pills
- [ ] Fix orphaned non-FAQ pages (mutual-of-omaha, role-of-a-caregiver, MA plan types)
- [ ] Update relatedSlugs to point more links at 72 orphaned FAQ articles
- [ ] Consolidate 18 FAQ categories into 6-7 parent groups for cleaner filter pills
- [x] Rewrite /faqs/applying-for-medicare with comprehensive content and 5+ internal links
- [x] Fix broken relatedSlugs cross-references: observation-vs-inpatient and skilled-nursing-vs-custodial-care are blog posts linked as /faqs/
- [x] Upgrade SimpleFAQ template to support rich section types (tables, callouts, lists, FAQs)
- [x] Rewrite /faqs/medicare-supplement-plans-medigap-pricing-methods with rich formatting and 5+ internal links
- [x] Upgrade /faqs/applying-for-medicare to use rich formatting too
- [x] Add FAQ schema markup to SimpleFAQ template
- [x] Add Article/BreadcrumbList schema to SimpleFAQ template
- [x] Name community-rated states in medigap pricing methods article
- [x] Add external citations (CMS.gov, Medicare.gov, NAIC) to medigap pricing methods article
- [x] Fix SHIP link to shiphelp.org in medigap pricing methods article
- [x] Add author/reviewer credentials trust bar to SimpleFAQ template
- [x] Add published/last reviewed date split to SimpleFAQ article data and template
- [x] Fix OG image for medigap pricing methods article (replace old WordPress URL)
- [ ] Add Article/FAQ/Breadcrumb schema to CoverageArticleContent template (test: dental implants page)
