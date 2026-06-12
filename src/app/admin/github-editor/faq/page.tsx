"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Loader2,
  Search,
  FileText,
  ArrowUpDown,
  Plus,
  Calendar,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import { useArticles } from "../components/use-articles";
import LoginScreen from "../components/login-screen";
import SketchLayout from "../components/sketch-layout";
import type { ArticleListItem } from "../components/article-card-grid";

const ROTATIONS = [-1.4, 1.1, -0.8, 1.6, -1.2, 0.9, -1.7, 1.3, -0.6, 1.5, -1.1, 0.7, -1.5, 1.0, -0.9];
type SortMode = "recent" | "alpha";

function SketchArticleCard({ article, index }: { article: ArticleListItem; index: number }) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const hasImage = !!(article.image || article.ogImage);
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try { return new Date(dateStr).toISOString().split("T")[0]; } catch { return dateStr; }
  };

  return (
    <Link href={`/admin/github-editor/edit/${article.type}/${article.slug}`} className="group block transition-all duration-300" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="bg-white border-[3px] border-[#2b2b2b] overflow-hidden transition-all duration-300 group-hover:shadow-[8px_8px_0_#2b2b2b] group-hover:-translate-y-1.5 shadow-[5px_5px_0_#2b2b2b]" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
        <div className="relative h-[160px] overflow-hidden bg-gray-100">
          {hasImage ? (
            <img src={article.image || article.ogImage} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300"><ImageIcon className="w-10 h-10 text-gray-400" /></div>
          )}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="inline-block text-xs font-bold px-2.5 py-1 border-[2px] border-[#2b2b2b] bg-[#ffdd57] text-[#2b2b2b]" style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px", transform: "rotate(-2deg)" }}>FAQ</span>
            {article.category && <span className="inline-block text-xs font-bold px-2.5 py-1 border-[2px] border-[#2b2b2b] bg-white text-[#2b2b2b]" style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px", transform: "rotate(2deg)" }}>{article.category}</span>}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-[#2b2b2b] text-base leading-snug mb-2 line-clamp-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>{article.title}</h3>
          {(article.seoDescription || article.excerpt) && <p className="text-sm text-[#555555] leading-relaxed mb-3 line-clamp-2">{article.seoDescription || article.excerpt}</p>}
          <div className="border-t-2 border-dashed border-[#bbbbbb] my-3" />
          <div className="flex items-center justify-between text-xs text-[#888888]">
            {article.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" style={{ strokeWidth: 2.4 }} />{formatDate(article.date)}</span>}
            <span className="font-mono text-[#9a9a9a] truncate max-w-[120px]">{article.slug.length > 20 ? article.slug.slice(0, 20) + "..." : article.slug}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FAQArticlesPage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();
  const { articles, loading, error, blogCount, faqCount, totalCount, refresh } = useArticles({ authenticated, authFetch, typeFilter: "coverage" });
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");

  const filtered = useMemo(() => {
    let list = articles;
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter((a) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q)); }
    if (sortMode === "alpha") { list = [...list].sort((a, b) => a.title.localeCompare(b.title)); }
    return list;
  }, [articles, search, sortMode]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}><Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" /></div>;
  if (!authenticated) return <LoginScreen onLogin={login} />;

  return (
    <SketchLayout totalCount={totalCount} blogCount={blogCount} faqCount={faqCount} onLogout={logout}>
      <div className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{ borderBottom: "3px dashed #2b2b2b" }}>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>
            <span style={{ background: "linear-gradient(180deg, transparent 55%, rgba(255,221,87,0.75) 55%)", padding: "0 4px" }}>FAQ Articles</span>
          </h1>
          <span className="text-sm px-3 py-1 border-[2px] border-[#2b2b2b] bg-white" style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}>{filtered.length} total</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" style={{ strokeWidth: 2.4 }} />
            <input type="text" placeholder="Search by title or slug..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64 pl-9 pr-3 py-2.5 text-base bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a]" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "'Patrick Hand', cursive" }} />
          </div>
          <button onClick={() => refresh()} disabled={loading} className="flex items-center gap-2 text-base px-4 py-2.5 bg-white border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }} title="Refresh articles">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} style={{ strokeWidth: 2.4 }} />
          </button>
          <button onClick={() => setSortMode(sortMode === "recent" ? "alpha" : "recent")} className="flex items-center gap-2 text-base px-4 py-2.5 bg-white border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
            <ArrowUpDown className="w-4 h-4" style={{ strokeWidth: 2.4 }} />{sortMode === "recent" ? "Most Recent" : "A\u2013Z"}
          </button>
          <Link href="/admin/github-editor/create-from-keyword" className="flex items-center gap-2 text-base font-bold px-4 py-2.5 bg-[#7ed957] border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all text-[#2b2b2b]" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>
            <Plus className="w-4 h-4" style={{ strokeWidth: 2.8 }} />New Article
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        {loading && <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b] mr-3" /><span className="text-base text-[#555555]">Loading articles...</span></div>}
        {error && <div className="text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-4 py-3" style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}>{error}</div>}
        {!loading && !error && filtered.length === 0 && <div className="flex flex-col items-center justify-center py-24 text-[#888888]"><FileText className="w-12 h-12 mb-3 opacity-30" /><p className="text-lg text-[#555555]">No FAQ articles found</p></div>}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
            {filtered.map((article, i) => <SketchArticleCard key={`${article.type}-${article.slug}`} article={article} index={i} />)}
          </div>
        )}
      </div>
    </SketchLayout>
  );
}
