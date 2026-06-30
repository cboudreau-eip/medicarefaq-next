"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GitBranch as Github,
  RefreshCw,
  LogOut,
  ArrowLeft,
  Sparkles,
  Plus,
  Map,
  FileText,
  Lightbulb,
  Settings,
  Wand2,
  MessageSquare,
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
  const isSmartCreatePage = pathname === "/admin/github-editor/create-smart";
  const isKeywordCreatePage = pathname === "/admin/github-editor/create-from-keyword";
  const isSitemapPage = pathname === "/admin/github-editor/sitemap";
  const isDraftsPage = pathname === "/admin/github-editor/drafts";
  const isIntelPage = pathname === "/admin/github-editor/content-intelligence";
  const isSettingsPage = pathname === "/admin/github-editor/settings";
  const isSubPage = isEditPage || isCreatePage || isSmartCreatePage || isKeywordCreatePage || isSitemapPage || isDraftsPage || isIntelPage || isSettingsPage;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-0 shrink-0">
      <div className="flex items-center justify-between h-14">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          {isSubPage && (
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
        {!isSubPage && (
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
          {!isSubPage && (
            <>
              <Link
                href="/admin/github-editor/create-from-keyword"
                className="flex items-center gap-1.5 text-xs font-semibold bg-purple-600 text-white rounded-lg px-3 py-1.5 hover:bg-purple-700 transition-colors"
                title="Create from Keyword"
              >
                <Wand2 className="w-3.5 h-3.5" />
                From Keyword
              </Link>
              <Link
                href="/admin/github-editor/create-smart"
                className="flex items-center gap-1.5 text-xs font-semibold bg-purple-600 text-white rounded-lg px-3 py-1.5 hover:bg-purple-700 transition-colors"
                title="Smart Create with AI"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Smart Create
              </Link>
              <Link
                href="/admin/github-editor/create"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
                title="Create with HTML"
              >
                <Plus className="w-3.5 h-3.5" />
                HTML Create
              </Link>
              <Link
                href="/admin/github-editor/drafts"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
                title="View Drafts"
              >
                <FileText className="w-3.5 h-3.5" />
                Drafts
              </Link>
              <Link
                href="/admin/github-editor/sitemap"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
                title="View Sitemaps"
              >
                <Map className="w-3.5 h-3.5" />
                Sitemaps
              </Link>
              <Link
                href="/admin/github-editor/content-intelligence"
                className="flex items-center gap-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg px-3 py-1.5 hover:bg-purple-100 transition-colors"
                title="Content Intelligence"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Intelligence
              </Link>
              <Link
                href="/admin/chat-logs"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
                title="Chat Logs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat Logs
              </Link>
              <Link
                href="/admin/github-editor/settings"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
                title="Writing Config"
              >
                <Settings className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
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
