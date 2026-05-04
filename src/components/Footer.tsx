"use client";

import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { trackFooterClick, trackPhoneClick } from "@/lib/analytics";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

const footerColumns = [
  {
    title: "NEW to MEDICARE",
    color: "#0D9488",
    links: [
      { label: "Medicare 101 Guide", href: "/medicare-101" },
      { label: "Am I Eligible?", href: "/new-to-medicare/eligibility" },
      { label: "Turning 65 Timeline", href: "/new-to-medicare/turning-65" },
      { label: "What Does it Cost?", href: "/new-to-medicare/costs" },
      { label: "Getting Started Checklist", href: "/new-to-medicare/checklist" },
    ],
  },
  {
    title: "MEDICARE PLANS",
    color: "#1B2A4A",
    links: [
      { label: "Compare Medicare Plans", href: "/medicare-plans" },
      { label: "Original Medicare", href: "/original-medicare" },
      { label: "Medicare Supplement", href: "/medicare-supplements" },
      { label: "Medicare Advantage", href: "/medicare-part-c/medicare-advantage-plans" },
      { label: "Part D (Rx Plans)", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Compare All Plans", href: "/medicare-supplements" },
      { label: "Medicare Costs", href: "/medicare-plans/costs" },
      { label: "Supplement Plans 2026", href: "/medicare-supplements/medicare-supplement-plans-2026" },
    ],
  },
  {
    title: "ENROLLMENT",
    color: "#D97706",
    links: [
      { label: "Turning 65 Enrollment", href: "/enrollment/turning-65" },
      { label: "Working past 65", href: "/enrollment/working-past-65" },
      { label: "Annual Changes", href: "/enrollment/annual-changes" },
      { label: "Late Penalties", href: "/enrollment/late-penalties" },
      { label: "How to Enroll", href: "/enrollment/how-to-enroll" },
      { label: "Enrollment Overview", href: "/enrollment" },
      { label: "Enrollment Timeline", href: "/tools/enrollment-timeline" },
    ],
  },
  {
    title: "COVERAGE",
    color: "#059669",
    links: [
      { label: "Does Medicare Cover...?", href: "/faqs" },
      { label: "Dental, Vision & Hearing", href: "/faqs/does-medicare-cover-dental-implants" },
      { label: "Specialized Care", href: "/faqs/does-medicare-cover-chiropractic-care" },
      { label: "Prescription Drugs", href: "/original-medicare/medicare-parts/medicare-part-d" },
      { label: "Search All Coverage", href: "/search" },
    ],
  },
  {
    title: "RESOURCES",
    color: "#4F46E5",
    links: [
      { label: "Medicare Library", href: "/library" },
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/library/guides" },
      { label: "Podcast", href: "/podcasts" },
      { label: "Videos", href: "/videos" },
      { label: "FAQs", href: "/faqs" },
      { label: "About Team", href: "/library/about" },
      { label: "Senior's Guide to Medicare", href: "/seniors-guide-to-medicare-gov/tools-and-resources" },
      { label: "Client Care Team", href: "/client-care-team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Scholarship", href: "/scholarship-opportunities" },
      { label: "Partners", href: "/third-party-partners" },
      { label: "Caregiver Guide", href: "/guide-to-being-a-caregiver/role-of-a-caregiver" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A]">
      {/* Main footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4
                className="text-xs font-bold tracking-wider mb-4"
                style={{ color: column.color }}
              >
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() =>
                        trackFooterClick({
                          link_text: link.label,
                          destination: link.href,
                          footer_section: column.title.toLowerCase().replace(/\s+/g, "_"),
                        })
                      }
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Divider + centered logo/contact + trust badges */}
        <div className="border-t border-white/10 pt-8">
          {/* Centered logo & contact row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <img
              src={LOGO_URL}
              alt="MedicareFAQ.com"
              className="h-10 w-auto brightness-0 invert opacity-70"
            />
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/50">
              <a
                href="tel:8883358996"
                onClick={() =>
                  trackPhoneClick({
                    phone_number: "(888) 335-8996",
                    page_section: "footer",
                  })
                }
                className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                (888) 335-8996
              </a>
              <a href="mailto:info@medicarefaq.com" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                info@medicarefaq.com
              </a>
            </div>
          </div>

          {/* Trust badges row — white/washed-out on navy */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 pb-2">

            {/* Forbes Finance Council */}
            <a href="https://www.forbes.com/councils/forbesfinancecouncil/people/davidhaass/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity">
              <span
                className="font-bold text-[20px] leading-none tracking-tight"
                style={{ color: "#FFFFFF", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Forbes
              </span>
              <span
                className="text-[9px] font-semibold tracking-widest uppercase border-t pt-1"
                style={{ color: "#CBD5E1", borderColor: "#CBD5E1" }}
              >
                Finance Council
              </span>
            </a>

            <div className="hidden sm:block h-8 w-px bg-white/20" />

            {/* Shopper Approved */}
            <a href="https://www.shopperapproved.com/reviews/MedicareFAQ.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: "#0D9488" }}
                >
                  ✓
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20"
                      fill={i <= 4 ? "#D97706" : "none"} stroke="#D97706" strokeWidth="1.5">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-[10px]" style={{ color: "#CBD5E1" }}>2,353 Ratings</div>
              <div className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "#0D9488" }}>
                Shopper Approved
              </div>
            </a>

            <div className="hidden sm:block h-8 w-px bg-white/20" />

            {/* BBB Accredited Business */}
            <a href="https://www.bbb.org/us/fl/tampa/profile/insurance-services-office/elite-insurance-partners-llc-0653-90292738" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center text-white text-[9px] font-black"
                  style={{ backgroundColor: "#003087" }}
                >
                  BBB
                </div>
                <div>
                  <div className="text-[11px] font-bold leading-tight" style={{ color: "#FFFFFF" }}>Accredited</div>
                  <div className="text-[11px] font-bold leading-tight" style={{ color: "#FFFFFF" }}>Business</div>
                </div>
              </div>
              <div className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "#CBD5E1" }}>
                BBB Rating: A+
              </div>
            </a>

          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-white/10" style={{ backgroundColor: "#111D30" }}>
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; 2026 MedicareFAQ.com &middot; Powered by Elite Insurance Partners, an
            affiliated entity not endorsed by any government agency.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              onClick={() =>
                trackFooterClick({ link_text: "Privacy Policy", destination: "/privacy-policy", footer_section: "bottom_bar" })
              }
              className="hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              onClick={() =>
                trackFooterClick({ link_text: "Terms of Use", destination: "/terms-of-use", footer_section: "bottom_bar" })
              }
              className="hover:text-white/70 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/sitemap-page"
              onClick={() =>
                trackFooterClick({ link_text: "Sitemap", destination: "/sitemap-page", footer_section: "bottom_bar" })
              }
              className="hover:text-white/70 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
