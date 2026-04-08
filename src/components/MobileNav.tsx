"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Search, Phone } from "lucide-react";
import { navigationData, utilityLinks } from "@/lib/navigation-data";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex items-center justify-between h-14 px-4 bg-white">
        <Link href="/" className="shrink-0" onClick={() => setIsOpen(false)}>
          <img src={LOGO_URL} alt="MedicareFAQ" className="h-9 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/compare-rates"
            className="bg-[#C41230] text-white font-bold px-3 py-1.5 rounded-md text-xs"
          >
            Get Started
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-[#1B2A4A]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Slide-down panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white z-50 shadow-xl max-h-[80vh] overflow-y-auto"
            >
              {/* Search */}
              <form onSubmit={handleSearch} className="p-4 border-b border-[#E5E7EB]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search Medicare topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm"
                  />
                </div>
              </form>

              {/* Nav categories */}
              <nav className="py-2">
                {navigationData.map((category, index) => (
                  <div key={category.title} className="border-b border-[#F3F4F6]">
                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      className="w-full flex items-center justify-between px-4 py-3.5"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-semibold text-[#1B2A4A] text-[15px]">
                          {category.title}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 ${
                          expandedIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 space-y-0.5">
                            {category.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-3 py-2.5 pl-4"
                                >
                                  <Icon
                                    className="w-4 h-4 shrink-0"
                                    style={{ color: category.color }}
                                  />
                                  <span className="text-sm text-[#4B5563]">
                                    {item.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {/* Utility links */}
                <div className="px-4 pt-4 space-y-3">
                  {utilityLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-[#6B7280] font-medium"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className="px-4 pt-6 pb-4">
                  <a
                    href="tel:8883358996"
                    className="flex items-center gap-2 text-[#1B2A4A] font-bold"
                  >
                    <Phone className="w-4 h-4" />
                    (888) 335-8996
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
