"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Loader2,
  AlertCircle,
  ImageIcon,
  Calendar,
  LayoutGrid,
  ArrowUpDown,
  Plus,
} from "lucide-react";

export interface ArticleListItem {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  image: string;
  excerpt: string;
  date: string;
  category: string;
  type: "blog" | "coverage";
  url: string;
}

type SortMode = "recent" | "alpha";

interface ArticleCardGridProps {
  articles: ArticleListItem[];
  loading: boolean;
  error: string | null;
  pageTitle: string;
}

export default function ArticleCardGrid({
  articles,
  loading,
  error,
  pageTitle,
}: ArticleCardGridProps) {
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");

  const filtered = useMemo(() => {
    let list = articles;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q)
      );
    }
    if (sortMode === "alpha") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [articles, search, sortMode]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col" style={{ height: "calc(100vh - 57px)" }}>
      {/* Sub-header with search, sort, and new article */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutGrid className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
            <span className="text-sm text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
              {filtered.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or slug..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            {/* Sort */}
            <button
              onClick={() => setSortMode(sortMode === "recent" ? "alpha" : "recent")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortMode === "recent" ? "Most Recent" : "A\u2013Z"}
            </button>
            {/* New Article */}
            <Link
              href="/admin/github-editor/create"
              className="flex items-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Article
            </Link>
          </div>
        </div>
      </div>

      {/* Scrollable grid area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-3" />
            <span className="text-base">Loading articles...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FileText className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-base font-medium text-gray-500">No articles found</p>
            <p className="text-sm mt-1">Try adjusting your search.</p>
          </div>
        )}

        {/* Card Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filtered.map((article) => (
              <Link
                key={`card-${article.type}-${article.slug}`}
                href={`/admin/github-editor/edit/${article.type}/${article.slug}`}
                className="group text-left bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-gray-300 transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gray-100 overflow-hidden">
                  {(article.image || article.ogImage) ? (
                    <img
                      src={article.image || article.ogImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-gray-300" />
                    </div>
                  )}
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md text-white ${
                        article.type === "blog" ? "bg-blue-500" : "bg-teal-500"
                      }`}
                    >
                      {article.type === "blog" ? "Blog" : "FAQ"}
                    </span>
                  </div>
                  {/* Category Badge */}
                  {article.category && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-white/90 text-gray-600 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
                    {article.title}
                  </h3>
                  {(article.seoDescription || article.excerpt) && (
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                      {article.seoDescription || article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {article.date && (
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 font-mono truncate max-w-[140px]">
                      {article.slug}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
