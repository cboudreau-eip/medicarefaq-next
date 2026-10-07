"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { navigationData, type NavCategory } from "@/lib/navigation-data";
import { motion, AnimatePresence } from "framer-motion";
import { trackNavClick } from "@/lib/analytics";
import ZipFormModal from "@/components/ZipFormModal";
import MenuSearchDropdown from "@/components/MenuSearchDropdown";

function MegaMenuPanel({
  category,
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[min(90vw,960px)] bg-white border border-[#E5E7EB] shadow-xl rounded-b-xl z-50"
    >
      <div className="px-6 py-4">
        <div className="flex gap-5">
          {/* Main items grid */}
          <div className="flex-1">
            <h3
              className="text-[11px] font-bold tracking-wider mb-2 uppercase"
              style={{ color: category.color }}
            >
              {category.title}
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => {
                      onClose();
                      trackNavClick({
                        link_text: item.title,
                        destination: item.href,
                        nav_section: `mega_menu_${category.title.toLowerCase().replace(/\s+/g, "_")}`,
                      });
                    }}
                    className="group flex items-start gap-2.5 py-2 px-2 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-150"
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${category.color}12`,
                        color: category.color,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-[#1B2A4A] text-[14px] group-hover:text-[#1B2A4A] block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[12px] text-[#6B7280] mt-0.5 block leading-snug line-clamp-1">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Sidebar */}
          {category.sidebarItems && category.sidebarItems.length > 0 && (
            <div className="w-[240px] shrink-0 border-l border-[#E5E7EB] pl-5">
              <h4 className="text-[11px] font-bold tracking-wider text-[#C41230] mb-2 uppercase">
                {category.sidebarTitle}
              </h4>
              <div className="space-y-2">
                {category.sidebarItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => {
                      onClose();
                      trackNavClick({
                        link_text: item.title,
                        destination: item.href,
                        nav_section: `mega_menu_sidebar_${category.title.toLowerCase().replace(/\s+/g, "_")}`,
                      });
                    }}
                    className="block p-2.5 bg-[#F9FAFB] rounded-lg hover:bg-[#F0F4F8] transition-colors duration-150 group"
                  >
                    <span className="font-semibold text-[#1B2A4A] text-[13px] block leading-tight">
                      {item.title}
                    </span>
                    {item.description && (
                      <span className="text-[11px] text-[#6B7280] mt-0.5 block leading-snug line-clamp-2">
                        {item.description}
                      </span>
                    )}
                    {item.cta && (
                      <span className="inline-flex items-center gap-1 text-[#C41230] font-semibold text-[12px] mt-1.5 group-hover:gap-2 transition-all duration-150">
                        {item.cta}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MegaMenu({ lightWithCta = false, searchVariant = false, dividedNavy = false }: { lightWithCta?: boolean; searchVariant?: boolean; dividedNavy?: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={dividedNavy ? "bg-[#112E50] relative" : lightWithCta ? "bg-white border-b border-[#E5E7EB] relative" : "bg-[#1B2A4A] relative"}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        {/* Nav links centered */}
        <nav aria-label="Main navigation" className={dividedNavy ? "flex items-center h-[65.6px]" : searchVariant ? "flex items-center justify-start min-h-[68px] gap-0 xl:gap-2" : lightWithCta ? "flex items-center justify-end min-h-[68px] gap-1 xl:gap-3" : "flex items-center justify-center h-12"}>
          {navigationData.map((category, index) => (
            <div
              key={category.title}
              className={dividedNavy ? "flex flex-1 justify-center border-r border-[#567A99]" : undefined}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <button
                onClick={dividedNavy ? () => handleMouseEnter(index) : undefined}
                aria-expanded={dividedNavy ? activeIndex === index : undefined}
                onKeyDown={dividedNavy ? event => { if (event.key === "Escape") setActiveIndex(null); } : undefined}
                className={dividedNavy ? `relative flex h-8 items-center gap-[9.6px] whitespace-nowrap px-[9.6px] text-[12.8px] xl:text-base font-semibold text-white after:absolute after:-bottom-[3.2px] after:left-[9.6px] after:right-[9.6px] after:h-[3.2px] after:bg-[#F97316] after:transition-opacity ${activeIndex === index || (activeIndex === null && index === 1) ? "after:opacity-100" : "after:opacity-0"}` : `flex items-center gap-1.5 ${lightWithCta ? "px-2 xl:px-4 text-sm xl:text-base" : "px-5 text-sm"} h-12 font-semibold transition-all duration-150 ${
                  lightWithCta ? "text-[#1B2A4A] hover:bg-slate-50" : activeIndex === index
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {!dividedNavy && <span
                  className="w-1.5 h-1.5 rounded-full mr-1"
                  style={{ backgroundColor: category.color }}
                />}
                {category.title}
                <ChevronDown
                  className={`${dividedNavy ? "w-[11.2px] h-[11.2px]" : "w-3.5 h-3.5"} transition-transform duration-150 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          ))}
          {dividedNavy && <div onMouseEnter={() => setActiveIndex(null)}><MenuSearchDropdown dark /></div>}
          {searchVariant && <div className="ml-auto" onMouseEnter={() => setActiveIndex(null)}><MenuSearchDropdown /></div>}
          {lightWithCta && (
            <ZipFormModal
              coverageType="ms"
              triggerLabel="Get Started Free"
              triggerClassName="ml-3 shrink-0 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-5 py-3 rounded-lg text-sm xl:text-base whitespace-nowrap"
              triggerId="get-started-menu-test-1"
              pageSection="header"
            />
          )}
        </nav>
      </div>
      {/* Panel always centered relative to the full nav bar */}
      <AnimatePresence>
        {activeIndex !== null && (
          <MegaMenuPanel
            category={navigationData[activeIndex]}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
