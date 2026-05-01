"use client";

import { useState, useEffect, useCallback } from "react";

interface Stats {
  total_clicks: number;
  total_sessions: number;
  today_clicks: number;
  avg_scroll_depth: number;
  top_page: string;
  top_page_clicks: number;
}

interface PageData {
  page_path: string;
  click_count: number;
  last_activity: string;
}

interface HeatmapDashboardProps {
  secret: string;
}

type View = "dashboard" | "heatmap" | "scroll" | "elements";

export default function HeatmapDashboard({ secret }: HeatmapDashboardProps) {
  const [view, setView] = useState<View>("dashboard");
  const [stats, setStats] = useState<Stats | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (url: string) => {
      const res = await fetch(url, {
        headers: { "x-heatmap-secret": secret },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    [secret]
  );

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, pagesData] = await Promise.all([
          fetchData("/api/heatmap/data?type=stats"),
          fetchData("/api/heatmap/data?type=pages"),
        ]);
        setStats(statsData);
        setPages(pagesData.pages || []);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [fetchData]);

  const navItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: DashboardIcon },
    { id: "heatmap" as View, label: "Heatmap Viewer", icon: HeatmapIcon },
    { id: "scroll" as View, label: "Scroll Depth", icon: ScrollIcon },
    { id: "elements" as View, label: "Click Analytics", icon: ElementsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141720] border-r border-[#2a2d37] flex flex-col">
        <div className="p-6 border-b border-[#2a2d37]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00d97e]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#00d97e]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-base">Heatmap</h1>
              <p className="text-gray-500 text-xs">Analytics Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 px-3">Navigation</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                view === item.id
                  ? "bg-[#00d97e]/10 text-[#00d97e]"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1d27]"
              }`}
            >
              <item.icon active={view === item.id} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2a2d37]">
          <div className="bg-[#1a1d27] rounded-lg p-3">
            <p className="text-gray-400 text-xs">Tracking Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-[#00d97e] rounded-full animate-pulse" />
              <span className="text-[#00d97e] text-sm font-medium">Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#2a2d37] flex items-center justify-between px-8">
          <h2 className="text-white text-lg font-semibold">
            {navItems.find((n) => n.id === view)?.label}
          </h2>
          <div className="flex items-center gap-4">
            {view !== "dashboard" && (
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="bg-[#1a1d27] border border-[#2a2d37] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d97e] min-w-[300px]"
              >
                <option value="">Select a page...</option>
                {pages.map((p) => (
                  <option key={p.page_path} value={p.page_path}>
                    {p.page_path} ({p.click_count} clicks)
                  </option>
                ))}
              </select>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {loading ? (
            <LoadingState />
          ) : view === "dashboard" ? (
            <DashboardView stats={stats} pages={pages} />
          ) : view === "heatmap" ? (
            <HeatmapView page={selectedPage} secret={secret} />
          ) : view === "scroll" ? (
            <ScrollView page={selectedPage} secret={secret} />
          ) : (
            <ElementsView page={selectedPage} secret={secret} />
          )}
        </div>
      </main>
    </div>
  );
}

// === Sub-views ===

function DashboardView({ stats, pages }: { stats: Stats | null; pages: PageData[] }) {
  if (!stats) return <EmptyState message="No data collected yet. Tracking is active — data will appear once visitors interact with your site." />;

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Clicks"
          value={stats.total_clicks.toLocaleString()}
          subtitle={`${stats.today_clicks} today`}
          icon={<ClickIcon />}
        />
        <KPICard
          title="Unique Sessions"
          value={stats.total_sessions.toLocaleString()}
          subtitle="All time"
          icon={<SessionIcon />}
        />
        <KPICard
          title="Avg Scroll Depth"
          value={`${stats.avg_scroll_depth}%`}
          subtitle="Across all pages"
          icon={<ScrollDepthIcon />}
        />
        <KPICard
          title="Top Page"
          value={stats.top_page_clicks.toLocaleString()}
          subtitle={stats.top_page.length > 30 ? stats.top_page.slice(0, 30) + "..." : stats.top_page}
          icon={<TopPageIcon />}
        />
      </div>

      {/* Pages Table */}
      <div className="bg-[#141720] border border-[#2a2d37] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2d37] flex items-center justify-between">
          <h3 className="text-white font-semibold">Pages by Click Volume</h3>
          <span className="text-gray-400 text-sm">{pages.length} pages tracked</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2d37]">
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-3">Page</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-3">Clicks</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-3">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {pages.slice(0, 20).map((page, i) => (
                <tr key={page.page_path} className={`border-b border-[#2a2d37]/50 hover:bg-[#1a1d27] transition-colors ${i % 2 === 0 ? "" : "bg-[#0f1117]/30"}`}>
                  <td className="px-6 py-3">
                    <span className="text-white text-sm">{page.page_path}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="text-[#00d97e] font-medium text-sm">{Number(page.click_count).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="text-gray-400 text-sm">
                      {page.last_activity ? new Date(page.last_activity).toLocaleDateString("en-US", { timeZone: "America/New_York" }) : "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No click data yet. Tracking is active.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HeatmapView({ page, secret }: { page: string; secret: string }) {
  const [clicks, setClicks] = useState<Array<{ x_percent: number; y_percent: number }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!page) return;
    setLoading(true);
    fetch(`/api/heatmap/data?type=clicks&page=${encodeURIComponent(page)}`, {
      headers: { "x-heatmap-secret": secret },
    })
      .then((r) => r.json())
      .then((data) => setClicks(data.clicks || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, secret]);

  if (!page) return <EmptyState message="Select a page from the dropdown above to view its heatmap." />;
  if (loading) return <LoadingState />;

  return (
    <div className="space-y-4">
      <div className="bg-[#141720] border border-[#2a2d37] rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-4">{clicks.length} clicks recorded for this page</p>
        <div className="relative bg-[#0f1117] rounded-lg overflow-hidden" style={{ minHeight: "600px" }}>
          {/* Heatmap overlay */}
          <iframe
            src={page}
            className="w-full border-0 rounded-lg"
            style={{ height: "800px", pointerEvents: "none" }}
            title="Page preview"
          />
          {/* Click dots overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {clicks.map((click, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full opacity-40"
                style={{
                  left: `${click.x_percent}%`,
                  top: `${click.y_percent}%`,
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, rgba(255,59,48,0.8) 0%, rgba(255,149,0,0.4) 50%, transparent 70%)",
                  boxShadow: "0 0 8px rgba(255,59,48,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollView({ page, secret }: { page: string; secret: string }) {
  const [scrollData, setScrollData] = useState<Array<{ max_scroll_percent: number }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!page) return;
    setLoading(true);
    fetch(`/api/heatmap/data?type=scroll&page=${encodeURIComponent(page)}`, {
      headers: { "x-heatmap-secret": secret },
    })
      .then((r) => r.json())
      .then((data) => setScrollData(data.scrolls || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, secret]);

  if (!page) return <EmptyState message="Select a page from the dropdown above to view scroll depth." />;
  if (loading) return <LoadingState />;

  // Calculate scroll depth distribution
  const buckets = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const distribution = buckets.map((bucket) => ({
    label: `${bucket}%`,
    count: scrollData.filter((s) => s.max_scroll_percent >= bucket).length,
    percent: scrollData.length > 0
      ? (scrollData.filter((s) => s.max_scroll_percent >= bucket).length / scrollData.length) * 100
      : 0,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-[#141720] border border-[#2a2d37] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Scroll Depth Distribution</h3>
        <p className="text-gray-400 text-sm mb-6">{scrollData.length} sessions recorded</p>
        <div className="space-y-3">
          {distribution.map((bucket) => (
            <div key={bucket.label} className="flex items-center gap-4">
              <span className="text-gray-400 text-sm w-12 text-right">{bucket.label}</span>
              <div className="flex-1 h-8 bg-[#0f1117] rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg transition-all duration-500"
                  style={{
                    width: `${bucket.percent}%`,
                    background: `linear-gradient(90deg, #00d97e, ${bucket.percent > 50 ? "#00d97e" : "#ff9500"})`,
                    opacity: 0.8,
                  }}
                />
              </div>
              <span className="text-white text-sm w-20 text-right">
                {bucket.count} ({Math.round(bucket.percent)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ElementsView({ page, secret }: { page: string; secret: string }) {
  const [elements, setElements] = useState<Array<{ element_tag: string; element_id: string; element_text: string; click_count: number }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!page) return;
    setLoading(true);
    fetch(`/api/heatmap/data?type=top-elements&page=${encodeURIComponent(page)}`, {
      headers: { "x-heatmap-secret": secret },
    })
      .then((r) => r.json())
      .then((data) => setElements(data.elements || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, secret]);

  if (!page) return <EmptyState message="Select a page from the dropdown above to view click analytics." />;
  if (loading) return <LoadingState />;

  return (
    <div className="bg-[#141720] border border-[#2a2d37] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2a2d37]">
        <h3 className="text-white font-semibold">Most Clicked Elements</h3>
        <p className="text-gray-400 text-sm mt-1">Top 20 elements by click volume</p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2a2d37]">
            <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-3">#</th>
            <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-3">Element</th>
            <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-3">ID</th>
            <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-3">Text</th>
            <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-3">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((el, i) => (
            <tr key={i} className="border-b border-[#2a2d37]/50 hover:bg-[#1a1d27] transition-colors">
              <td className="px-6 py-3 text-gray-500 text-sm">{i + 1}</td>
              <td className="px-6 py-3">
                <span className="text-[#00d97e] bg-[#00d97e]/10 px-2 py-0.5 rounded text-xs font-mono">
                  &lt;{el.element_tag}&gt;
                </span>
              </td>
              <td className="px-6 py-3 text-gray-300 text-sm font-mono">{el.element_id || "—"}</td>
              <td className="px-6 py-3 text-gray-400 text-sm max-w-[200px] truncate">{el.element_text || "—"}</td>
              <td className="px-6 py-3 text-right text-white font-medium text-sm">{Number(el.click_count).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {elements.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">No click data for this page yet.</p>
        </div>
      )}
    </div>
  );
}

// === Shared Components ===

function KPICard({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="bg-[#141720] border border-[#2a2d37] rounded-xl p-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm uppercase tracking-wider">{title}</span>
          <div className="w-8 h-8 bg-[#00d97e]/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        </div>
        <p className="text-white text-3xl font-bold">{value}</p>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>
      {/* Corner bracket decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#2a2d37] rounded-tl" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#2a2d37] rounded-tr" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#2a2d37] rounded-bl" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#2a2d37] rounded-br" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-[#141720] border border-[#2a2d37] rounded-2xl flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <p className="text-gray-400 text-center max-w-md">{message}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-[#00d97e] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// === Icons ===

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 ${active ? "text-[#00d97e]" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function HeatmapIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 ${active ? "text-[#00d97e]" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  );
}

function ScrollIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 ${active ? "text-[#00d97e]" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

function ElementsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 ${active ? "text-[#00d97e]" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  );
}

function ClickIcon() {
  return (
    <svg className="w-4 h-4 text-[#00d97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
    </svg>
  );
}

function SessionIcon() {
  return (
    <svg className="w-4 h-4 text-[#00d97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ScrollDepthIcon() {
  return (
    <svg className="w-4 h-4 text-[#00d97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  );
}

function TopPageIcon() {
  return (
    <svg className="w-4 h-4 text-[#00d97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
