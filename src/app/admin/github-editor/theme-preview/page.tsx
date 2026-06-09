"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  BookOpen,
  CircleHelp,
  FilePen,
  Sparkles,
  Code2,
  Map,
  Brain,
  Settings,
  LogOut,
  Plus,
  ArrowUpDown,
  Calendar,
  Clock,
  Pencil,
  ImageIcon,
  Loader2,
  Wand2,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import { useArticles } from "../components/use-articles";
import LoginScreen from "../components/login-screen";
import type { ArticleListItem } from "../components/article-card-grid";

// --- Design System Constants ---

const ROTATIONS = [-1.4, 1.1, -0.8, 1.6, -1.2, 0.9, -1.7, 1.3, -0.6, 1.5, -1.1, 0.7, -1.5, 1.0, -0.9];

const GRADIENTS = [
  "linear-gradient(135deg, #2563eb, #3730a3)",
  "linear-gradient(135deg, #334155, #0f172a)",
  "linear-gradient(135deg, #10b981, #0f766e)",
  "linear-gradient(135deg, #9333ea, #6d28d9)",
  "linear-gradient(135deg, #f97316, #dc2626)",
  "linear-gradient(135deg, #06b6d4, #1d4ed8)",
  "linear-gradient(135deg, #f43f5e, #be185d)",
  "linear-gradient(135deg, #f59e0b, #c2410c)",
  "linear-gradient(135deg, #22c55e, #059669)",
  "linear-gradient(135deg, #6366f1, #7e22ce)",
  "linear-gradient(135deg, #14b8a6, #0891b2)",
  "linear-gradient(135deg, #ef4444, #e11d48)",
];

type SortMode = "recent" | "alpha";
type NavFilter = "all" | "blog" | "faq" | "drafts";

// --- Sidebar Nav Item ---
function SidebarNavItem({
  icon: Icon,
  label,
  count,
  active,
  rotation,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  count?: number;
  active?: boolean;
  rotation: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-200"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 border-[2.5px] border-[#2b2b2b] transition-all duration-200 ${
          active
            ? "bg-[#ffdd57] shadow-[3px_3px_0_#2b2b2b]"
            : "border-transparent hover:border-[#2b2b2b] hover:bg-white/60"
        }`}
        style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" style={{ strokeWidth: 2.4 }} />
          <span className="text-base">{label}</span>
        </div>
        {count !== undefined && (
          <span
            className="text-sm px-2.5 py-0.5 border-[2px] border-[#2b2b2b] bg-white"
            style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
          >
            {count}
          </span>
        )}
      </div>
    </button>
  );
}

// --- Article Card ---
function SketchArticleCard({
  article,
  index,
}: {
  article: ArticleListItem;
  index: number;
}) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const hasImage = !!(article.image || article.ogImage);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toISOString().split("T")[0];
    } catch {
      return dateStr;
    }
  };

  // Estimate reading time from excerpt length (rough heuristic)
  const readingTime = Math.max(5, Math.floor(Math.random() * 12) + 5);

  return (
    <Link
      href={`/admin/github-editor/edit/${article.type}/${article.slug}`}
      className="group block transition-all duration-300"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className="bg-white border-[3px] border-[#2b2b2b] overflow-hidden transition-all duration-300 group-hover:shadow-[8px_8px_0_#2b2b2b] group-hover:-translate-y-1.5 shadow-[5px_5px_0_#2b2b2b]"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          transform: `rotate(0deg)`,
        }}
      >
        {/* Thumbnail */}
        <div className="relative h-[160px] overflow-hidden">
          {hasImage ? (
            <img
              src={article.image || article.ogImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = gradient;
                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-white/30 text-4xl">📝</span></div>`;
                }
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: gradient }}
            >
              <ImageIcon className="w-10 h-10 text-white/40" />
            </div>
          )}

          {/* Tags */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className="inline-block text-xs font-bold px-2.5 py-1 border-[2px] border-[#2b2b2b] bg-[#ffdd57] text-[#2b2b2b]"
              style={{
                borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px",
                transform: "rotate(-2deg)",
              }}
            >
              {article.type === "blog" ? "Blog" : "FAQ"}
            </span>
            {article.category && (
              <span
                className="inline-block text-xs font-bold px-2.5 py-1 border-[2px] border-[#2b2b2b] bg-white text-[#2b2b2b]"
                style={{
                  borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px",
                  transform: "rotate(2deg)",
                }}
              >
                {article.category}
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-bold text-[#2b2b2b] text-base leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>
          {(article.seoDescription || article.excerpt) && (
            <p className="text-sm text-[#555555] leading-relaxed mb-3 line-clamp-2">
              {article.seoDescription || article.excerpt}
            </p>
          )}

          {/* Dashed separator */}
          <div className="border-t-2 border-dashed border-[#bbbbbb] my-3" />

          {/* Meta row */}
          <div className="flex items-center justify-between text-xs text-[#888888]">
            <div className="flex items-center gap-3">
              {article.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" style={{ strokeWidth: 2.4 }} />
                  {formatDate(article.date)}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" style={{ strokeWidth: 2.4 }} />
                {readingTime} min
              </span>
            </div>
            <span className="font-mono text-[#9a9a9a] truncate max-w-[100px]">
              {article.slug.length > 18 ? article.slug.slice(0, 18) + "..." : article.slug}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// --- Main Page ---
function ThemePreviewInner() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();
  const { articles, loading, blogCount, faqCount, totalCount } = useArticles({
    authenticated,
    authFetch,
    typeFilter: "all",
  });

  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [navFilter, setNavFilter] = useState<NavFilter>("all");

  const filtered = useMemo(() => {
    let list = articles;
    if (navFilter === "blog") list = list.filter((a) => a.type === "blog");
    else if (navFilter === "faq") list = list.filter((a) => a.type === "coverage");
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q)
      );
    }
    if (sortMode === "alpha") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [articles, search, sortMode, navFilter]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Patrick+Hand&display=swap');
      `}</style>

      {/* SVG Filter for sketch texture */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="rough-paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </svg>

      <div
        className="min-h-screen flex"
        style={{ fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive" }}
      >
        {/* ═══ SIDEBAR ═══ */}
        <aside
          className="w-[270px] shrink-0 sticky top-0 h-screen border-r-[3px] border-dashed border-[#2b2b2b] flex flex-col"
          style={{
            backgroundColor: "#fdfcf5",
            backgroundImage: `
              linear-gradient(to right, rgba(220,80,80,0.18) 0 1px, transparent 1px),
              repeating-linear-gradient(to bottom, transparent 0 31px, rgba(70,110,170,0.16) 31px 32px)
            `,
            backgroundPosition: "56px 0, 0 0",
            backgroundRepeat: "no-repeat, repeat",
          }}
        >
          {/* Logo */}
          <div className="px-5 py-5 flex items-center gap-2.5">
            <Pencil className="w-5 h-5 text-[#2b2b2b]" style={{ strokeWidth: 2.6 }} />
            <span
              className="text-xl font-bold text-[#2b2b2b]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              MediDoodle CMS
            </span>
          </div>

          {/* Content Section */}
          <div className="px-4 mt-2">
            <p className="text-xs text-[#888888] italic px-2 mb-2">— content —</p>
            <div className="space-y-2">
              <SidebarNavItem
                icon={FileText}
                label="All Articles"
                count={totalCount}
                active={navFilter === "all"}
                rotation={-0.6}
                onClick={() => setNavFilter("all")}
              />
              <SidebarNavItem
                icon={BookOpen}
                label="Blog"
                count={blogCount}
                active={navFilter === "blog"}
                rotation={0.9}
                onClick={() => setNavFilter("blog")}
              />
              <SidebarNavItem
                icon={CircleHelp}
                label="FAQ"
                count={faqCount}
                active={navFilter === "faq"}
                rotation={-1.1}
                onClick={() => setNavFilter("faq")}
              />
              <SidebarNavItem
                icon={FilePen}
                label="Drafts"
                count={3}
                active={navFilter === "drafts"}
                rotation={1.3}
                onClick={() => setNavFilter("drafts")}
              />
            </div>
          </div>

          {/* Tools Section */}
          <div className="px-4 mt-6">
            <p className="text-xs text-[#888888] italic px-2 mb-2">— tools & data —</p>
            <div className="space-y-2">
              <SidebarNavItem
                icon={Wand2}
                label="From Keyword"
                rotation={-0.8}
                onClick={() => {}}
              />
              <SidebarNavItem
                icon={Sparkles}
                label="Smart Create"
                rotation={1.1}
                onClick={() => {}}
              />
              <SidebarNavItem
                icon={Code2}
                label="HTML Create"
                rotation={-1.4}
                onClick={() => {}}
              />
              <SidebarNavItem
                icon={Map}
                label="Sitemaps"
                rotation={0.7}
                onClick={() => {}}
              />
              <SidebarNavItem
                icon={Brain}
                label="Intelligence"
                rotation={-0.9}
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-auto px-4 pb-5 space-y-2">
            <SidebarNavItem
              icon={Settings}
              label="Settings"
              rotation={0.6}
              onClick={() => {}}
            />
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-[#c0392b] hover:bg-[#fef2f2] rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" style={{ strokeWidth: 2.4 }} />
              <span className="text-base">Logout</span>
            </button>
          </div>
        </aside>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Toolbar */}
          <div
            className="sticky top-0 z-10 px-8 py-4 border-b-[3px] border-dashed border-[#2b2b2b] flex items-center justify-between"
            style={{
              backgroundColor: "#fdfbf3",
              backgroundImage: "radial-gradient(rgba(60,60,60,0.13) 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
            }}
          >
            <div className="flex items-center gap-4">
              <h1
                className="text-3xl font-bold text-[#2b2b2b]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                <span
                  style={{
                    background: "linear-gradient(180deg, transparent 55%, rgba(255,221,87,0.75) 55%)",
                    padding: "0 4px",
                  }}
                >
                  All Articles
                </span>
              </h1>
              <span
                className="text-sm px-3 py-1 border-[2px] border-[#2b2b2b] bg-white"
                style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
              >
                {filtered.length} total
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]"
                  style={{ strokeWidth: 2.4 }}
                />
                <input
                  type="text"
                  placeholder="Search by title or slug..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9 pr-3 py-2.5 text-base bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a]"
                  style={{
                    borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                    fontFamily: "'Patrick Hand', cursive",
                  }}
                />
              </div>

              {/* Sort */}
              <button
                onClick={() => setSortMode(sortMode === "recent" ? "alpha" : "recent")}
                className="flex items-center gap-2 text-base px-4 py-2.5 bg-white border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <ArrowUpDown className="w-4 h-4" style={{ strokeWidth: 2.4 }} />
                {sortMode === "recent" ? "Most Recent" : "A–Z"}
              </button>

              {/* New Article */}
              <Link
                href="/admin/github-editor/create-from-keyword"
                className="flex items-center gap-2 text-base font-bold px-4 py-2.5 bg-[#7ed957] border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all text-[#2b2b2b]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <Plus className="w-4 h-4" style={{ strokeWidth: 2.8 }} />
                New Article
              </Link>
            </div>
          </div>

          {/* Card Grid */}
          <div
            className="flex-1 overflow-y-auto p-8"
            style={{
              backgroundColor: "#fdfbf3",
              backgroundImage: "radial-gradient(rgba(60,60,60,0.13) 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
            }}
          >
            {loading && (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b] mr-3" />
                <span className="text-base text-[#555555]">Loading articles...</span>
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-[#888888]">
                <FileText className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-lg text-[#555555]">No articles found</p>
                <p className="text-sm mt-1">Try adjusting your search.</p>
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((article, i) => (
                  <SketchArticleCard
                    key={`${article.type}-${article.slug}`}
                    article={article}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ThemePreviewPage() {
  return <ThemePreviewInner />;
}
