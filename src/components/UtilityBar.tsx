"use client";

import { utilityLinks } from "@/lib/navigation-data";
import { Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { trackNavClick } from "@/lib/analytics";

export default function UtilityBar() {
  return (
    <div className="bg-[#F5F7FA] border-b border-[#E5E7EB] text-sm hidden lg:block">
      <div className="container flex items-center justify-between h-9">
        <div className="flex items-center gap-5">
          <a href="https://www.bbb.org/us/fl/tampa/profile/insurance-services-office/elite-insurance-partners-llc-0653-90292738" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#4B5563] font-medium hover:text-[#D97706] transition-colors">
            <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
            BBB A+ Rated
          </a>
          <a href="https://eliteinsurancepartners.com/team-members/?rl=agents" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#4B5563] font-medium hover:text-[#059669] transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            Licensed Agents
          </a>
        </div>
        <nav className="flex items-center gap-5">
          {utilityLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() =>
                trackNavClick({
                  link_text: link.title,
                  destination: link.href,
                  nav_section: "utility_bar",
                })
              }
              className="flex items-center gap-1.5 text-[#4B5563] hover:text-[#1B2A4A] transition-colors duration-150 font-medium"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: link.color }}
              />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
