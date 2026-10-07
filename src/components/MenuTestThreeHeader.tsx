"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { utilityLinks } from "@/lib/navigation-data";
import { trackNavClick, trackPhoneClick } from "@/lib/analytics";
import ZipFormModal from "@/components/ZipFormModal";

export default function MenuTestThreeHeader() {
  return (
    <div className="border-b border-[#E5E7EB] bg-white">
      <div className="container flex h-[104px] items-center justify-between gap-4">
        <Link href="/" className="min-w-0 w-[240px] xl:w-[380px] shrink">
          <img src="/images/medicarefaq-logo.png" alt="MedicareFAQ.com - Powered by Elite Insurance Partners" className="h-auto w-full" />
        </Link>
        <div className="flex shrink-0 items-center gap-3 xl:gap-4">
          <nav aria-label="About and resources" className="flex items-center divide-x divide-slate-300">
            {utilityLinks.map(link => (
              <Link key={link.title} href={link.href} className="px-2 xl:px-3 whitespace-nowrap text-sm font-medium text-[#1B2A4A] hover:underline" onClick={() => trackNavClick({link_text: link.title, destination: link.href, nav_section: "utility_bar"})}>
                {link.title}
              </Link>
            ))}
          </nav>
          <a id="callInNum" href="tel:+18883358996" data-invoca-phone-number="18883358996" className="invoca-phone flex items-center gap-2 whitespace-nowrap text-lg xl:text-xl font-bold text-[#1B2A4A] hover:text-[#0D9488]" onClick={() => trackPhoneClick({phone_number: "(888) 335-8996", page_section: "header"})}>
            <Phone aria-hidden="true" className="h-6 w-6" />(888) 335-8996
          </a>
          <ZipFormModal coverageType="ms" triggerLabel="Get Started Free" triggerClassName="shrink-0 whitespace-nowrap rounded-xl bg-[#F97316] hover:bg-[#EA580C] px-4 xl:px-5 py-4 text-sm xl:text-lg font-bold text-white" triggerId="get-started-menu-test-3" pageSection="header" />
        </div>
      </div>
    </div>
  );
}
