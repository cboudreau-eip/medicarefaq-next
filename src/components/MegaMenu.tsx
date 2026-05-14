"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { navigationData, type NavCategory } from "@/lib/navigation-data";
import { motion, AnimatePresence } from "framer-motion";
import { trackNavClick } from "@/lib/analytics";

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

export default function MegaMenu() {
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
      className="bg-[#1B2A4A] relative"
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        {/* Nav links centered */}
        <nav className="flex items-center justify-center h-12">
          {navigationData.map((category, index) => (
            <div
              key={category.title}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <button
                className={`flex items-center gap-1.5 px-5 h-12 text-sm font-semibold transition-all duration-150 ${
                  activeIndex === index
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mr-1"
                  style={{ backgroundColor: category.color }}
                />
                {category.title}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          ))}
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
