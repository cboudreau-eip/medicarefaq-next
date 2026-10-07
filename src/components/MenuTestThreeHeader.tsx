"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { utilityLinks } from "@/lib/navigation-data";
import { trackNavClick, trackPhoneClick } from "@/lib/analytics";
import ZipFormModal from "@/components/ZipFormModal";

export default function MenuTestThreeHeader() {
  return (
    <div className="border-b border-[#E5E7EB] bg-white">
      <div className="container flex h-[83.2px] items-center justify-between gap-[12.8px]">
        <Link href="/" className="min-w-0 w-[192px] xl:w-[304px] shrink">
          <img src="/images/medicarefaq-logo.png" alt="MedicareFAQ.com - Powered by Elite Insurance Partners" className="h-auto w-full" />
        </Link>
        <div className="flex shrink-0 items-center gap-[9.6px] xl:gap-[12.8px]">
          <nav aria-label="About and resources" className="flex items-center divide-x divide-slate-300">
            {utilityLinks.map(link => (
              <Link key={link.title} href={link.href} className="px-[6.4px] xl:px-[9.6px] whitespace-nowrap text-sm leading-5 font-medium text-[#1B2A4A] hover:underline" onClick={() => trackNavClick({link_text: link.title, destination: link.href, nav_section: "utility_bar"})}>
                {link.title}
              </Link>
            ))}
          </nav>
          <a id="callInNum" href="tel:+18883358996" data-invoca-phone-number="18883358996" className="invoca-phone flex items-center gap-[6.4px] whitespace-nowrap text-[14.4px] xl:text-base leading-[22.4px] font-bold text-[#1B2A4A] hover:text-[#0D9488]" onClick={() => trackPhoneClick({phone_number: "(888) 335-8996", page_section: "header"})}>
            <Phone aria-hidden="true" className="h-[19.2px] w-[19.2px]" />(888) 335-8996
          </a>
          <ZipFormModal coverageType="ms" triggerLabel="Get Started Free" triggerClassName="shrink-0 whitespace-nowrap rounded-[9.6px] bg-[#F97316] hover:bg-[#EA580C] px-[12.8px] xl:px-4 py-[12.8px] text-[11.2px] leading-4 xl:text-[14.4px] xl:leading-[22.4px] font-bold text-white" triggerId="get-started-menu-test-3" pageSection="header" />
        </div>
      </div>
    </div>
  );
}
