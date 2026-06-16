"use client";

import "../sketch-theme.css";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Loader2,
  Search,
  LayoutGrid,
  RefreshCw,
  ExternalLink,
  Code2,
  Tag,
  AlertTriangle,
  CheckCircle2,
  PenLine,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import SketchLayout from "../components/sketch-layout";

interface PageRow {
  route: string;
  file: string;
  title: string;
  hasMetadata: boolean;
  schemaCount: number;
  seoEditable: boolean;
  contentEditable: boolean;
  section: string;
}

type StatusFilter = "all" | "no-schema" | "no-meta" | "content";

const SITE_BASE = "https://www.medicarefaq.com";

export default function PagesInventoryPage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();

  const [pages, setPages] = useState<PageRow[]>([]);
  const [sections, setSections] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [section, setSection] = useState<string>("");

  const fetchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch("/api/cms/pages");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPages(data.pages || []);
      setSections(data.sections || {});
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load pages");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (authenticated) fetchPages();
  }, [authenticated, fetchPages]);

  const filtered = useMemo(() => {
    let list = pages;
    if (status === "no-schema") list = list.filter((p) => p.schemaCount === 0);
    if (status === "no-meta") list = list.filter((p) => !p.hasMetadata);
    if (status === "content") list = list.filter((p) => p.contentEditable);
    if (section) list = list.filter((p) => p.section === section);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.route.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => a.route.localeCompare(b.route));
  }, [pages, status, section, search]);

  const counts = useMemo(() => {
    return {
      all: pages.length,
      noSchema: pages.filter((p) => p.schemaCount === 0).length,
      noMeta: pages.filter((p) => !p.hasMetadata).length,
      content: pages.filter((p) => p.contentEditable).length,
    };
  }, [pages]);

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

  const chip = (key: StatusFilter, label: string, n: number) => (
    <button
      onClick={() => setStatus(key)}
      className={`text-sm px-3 py-1.5 border-[2.5px] border-[#2b2b2b] transition-all ${
        status === key ? "bg-[#ffdd57] shadow-[3px_3px_0_#2b2b2b]" : "bg-white hover:-translate-y-0.5"
      }`}
      style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
    >
      {label} <span className="opacity-60">({n})</span>
    </button>
  );

  return (
    <SketchLayout onLogout={logout}>
      {/* Toolbar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ borderBottom: "3px dashed #2b2b2b", backgroundColor: "#fdfbf3" }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>
              <span style={{ background: "linear-gradient(180deg, transparent 55%, rgba(255,221,87,0.75) 55%)", padding: "0 4px" }}>
                Site Pages
              </span>
            </h1>
            <span
              className="text-sm px-3 py-1 border-[2px] border-[#2b2b2b] bg-white"
              style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
            >
              {filtered.length} shown
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" style={{ strokeWidth: 2.4 }} />
              <input
                type="text"
                placeholder="Search route or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-9 pr-3 py-2.5 text-base bg-white border-[2.5px] border-[#2b2b2b] focus:shadow-[3px_3px_0_#2b2b2b] focus:outline-none transition-all placeholder:text-[#9a9a9a]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "'Patrick Hand', cursive" }}
              />
            </div>
            <button
              onClick={fetchPages}
              disabled={loading}
              className="flex items-center gap-2 text-base px-4 py-2.5 bg-white border-[2.5px] border-[#2b2b2b] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all disabled:opacity-50"
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} style={{ strokeWidth: 2.4 }} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {chip("all", "All", counts.all)}
          {chip("no-schema", "Missing schema", counts.noSchema)}
          {chip("no-meta", "No metadata block", counts.noMeta)}
          {chip("content", "Content-editable", counts.content)}

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="text-sm px-3 py-1.5 border-[2.5px] border-[#2b2b2b] bg-white ml-2"
            style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px", fontFamily: "'Patrick Hand', cursive" }}
          >
            <option value="">All sections</option>
            {Object.entries(sections)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([s, n]) => (
                <option key={s} value={s}>
                  {s} ({n})
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-8">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b] mr-3" />
            <span className="text-base text-[#555555]">Loading pages...</span>
          </div>
        )}
        {error && (
          <div
            className="text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-4 py-3"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-[#888888]">
            <LayoutGrid className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-lg text-[#555555]">No pages match these filters</p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div
            className="bg-white border-[3px] border-[#2b2b2b] overflow-hidden"
            style={{ borderRadius: "18px 6px 18px 6px / 6px 18px 6px 18px" }}
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-[2.5px] border-[#2b2b2b] bg-[#fffdf2]">
                  <th className="px-4 py-3 text-sm font-bold text-[#2b2b2b]">Page</th>
                  <th className="px-4 py-3 text-sm font-bold text-[#2b2b2b]">Section</th>
                  <th className="px-4 py-3 text-sm font-bold text-[#2b2b2b]">SEO</th>
                  <th className="px-4 py-3 text-sm font-bold text-[#2b2b2b]">Schema</th>
                  <th className="px-4 py-3 text-sm font-bold text-[#2b2b2b]">Content</th>
                  <th className="px-4 py-3 text-sm font-bold text-[#2b2b2b] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.file} className="border-b border-dashed border-[#cfcabb] hover:bg-[#fffdf2]">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#2b2b2b] text-sm">{p.title}</div>
                      <div className="text-xs text-[#888888] font-mono">{p.route}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#555555]">{p.section}</td>
                    <td className="px-4 py-3">
                      {p.hasMetadata ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> editable
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5" /> no block
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {p.schemaCount > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-[#2b2b2b]">
                          <Code2 className="w-3.5 h-3.5" /> {p.schemaCount}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5" /> none
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {p.contentEditable ? (
                        <span className="inline-flex items-center gap-1 text-xs text-purple-700">
                          <PenLine className="w-3.5 h-3.5" /> yes
                        </span>
                      ) : (
                        <span className="text-xs text-[#aaaaaa]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`${SITE_BASE}${p.route}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 border-[2px] border-[#2b2b2b] bg-white hover:-translate-y-0.5 transition-all"
                          style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
                          title="View live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/admin/github-editor/pages/edit?file=${encodeURIComponent(p.file)}`}
                          className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 border-[2px] border-[#2b2b2b] bg-[#ffdd57] hover:shadow-[2px_2px_0_#2b2b2b] hover:-translate-y-0.5 transition-all text-[#2b2b2b]"
                          style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
                        >
                          <Tag className="w-3.5 h-3.5" /> Edit SEO
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SketchLayout>
  );
}
