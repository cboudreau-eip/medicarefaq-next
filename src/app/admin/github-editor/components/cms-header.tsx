"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GitBranch as Github,
  RefreshCw,
  LogOut,
  ArrowLeft,
} from "lucide-react";

interface CMSHeaderProps {
  totalCount?: number;
  blogCount?: number;
  faqCount?: number;
  onRefresh?: () => void;
  onLogout: () => void;
}

export default function CMSHeader({
  totalCount,
  blogCount,
  faqCount,
  onRefresh,
  onLogout,
}: CMSHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "All", href: "/admin/github-editor", count: totalCount },
    { label: "Blog", href: "/admin/github-editor/blog", count: blogCount },
    { label: "FAQ", href: "/admin/github-editor/faq", count: faqCount },
  ];

  const isEditPage = pathname.startsWith("/admin/github-editor/edit/");
  const isCreatePage = pathname === "/admin/github-editor/create";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-0 shrink-0">
      <div className="flex items-center justify-between h-14">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          {(isEditPage || isCreatePage) && (
            <Link
              href="/admin/github-editor"
              className="text-gray-400 hover:text-gray-600 transition-colors mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}
          <Github className="w-5 h-5 text-teal-600" />
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            MedicareFAQ CMS Editor
          </h1>
        </div>

        {/* Center: Nav Tabs (only on list pages) */}
        {!isEditPage && !isCreatePage && (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin/github-editor"
                  ? pathname === "/admin/github-editor" || pathname === "/admin/github-editor/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-4 py-4 border-b-2 transition-colors ${
                    isActive
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {item.label}
                  {item.count !== undefined && (
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-gray-400 hover:text-teal-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
              title="Refresh articles"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
