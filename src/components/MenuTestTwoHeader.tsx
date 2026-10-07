"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { utilityLinks } from "@/lib/navigation-data";
import { trackNavClick, trackPhoneClick } from "@/lib/analytics";

export default function MenuTestTwoHeader() {
  return (
    <div className="border-b border-[#E5E7EB] bg-white">
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="w-[234px] shrink-0">
          <img src="/images/medicarefaq-logo.png" alt="MedicareFAQ.com - Powered by Elite Insurance Partners" className="h-auto w-full" />
        </Link>
        <div className="flex items-center gap-6 xl:gap-10">
          <nav aria-label="About and resources" className="flex items-center gap-4 xl:gap-5">
            {utilityLinks.map(link => (
              <Link key={link.title} href={link.href} className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[#1B2A4A] hover:underline" onClick={() => trackNavClick({link_text: link.title, destination: link.href, nav_section: "utility_bar"})}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: link.color}} />
                {link.title}
              </Link>
            ))}
          </nav>
          <a id="callInNum" href="tel:+18883358996" data-invoca-phone-number="18883358996" className="invoca-phone flex items-center gap-2 whitespace-nowrap text-xl xl:text-2xl font-bold text-[#1B2A4A] hover:text-[#0D9488]" onClick={() => trackPhoneClick({phone_number: "(888) 335-8996", page_section: "header"})}>
            <Phone aria-hidden="true" className="h-5 w-5" />(888) 335-8996
          </a>
        </div>
      </div>
    </div>
  );
}
