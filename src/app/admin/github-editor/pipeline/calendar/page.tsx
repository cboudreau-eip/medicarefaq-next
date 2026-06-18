"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useCMSAuth } from "../../components/use-cms-auth";
import LoginScreen from "../../components/login-screen";
import SketchLayout from "../../components/sketch-layout";
import "../../sketch-theme.css";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowLeft,
  X,
  Inbox,
  Plus,
  Workflow,
  Lightbulb,
} from "lucide-react";
import {
  estDateKey,
  prettyDateKey,
  buildMonthGrid,
  parseDateKey,
  WEEKDAY_LABELS,
  MONTH_LABELS,
} from "@/lib/calendar-dates";
import type { PipelineItem } from "@/lib/pipeline-db";

/**
 * Editorial calendar — now backed by Neon Postgres (calendar_entries), not
 * localStorage. It handles two kinds of dated entries:
 *   • freeform "ideas"      → pipelineItemId === null
 *   • scheduled queue items → pipelineItemId points at a pipeline_items row
 * The calendar_entries table owns the date; pipeline state is read-only here.
 */

interface CalendarEntry {
  id: string;
  title: string;
  notes: string;
  category: string;
  entryDate: string; // YYYY-MM-DD
  status: "idea" | "scheduled" | "published";
  pipelineItemId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface IdeaForm {
  title: string;
  entryDate: string;
  category: string;
  notes: string;
}

export default function PipelineCalendarPage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();

  const [queueItems, setQueueItems] = useState<PipelineItem[]>([]);
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const todayKey = estDateKey();
  const { year: ty, monthIndex0: tm } = parseDateKey(todayKey);
  const [viewYear, setViewYear] = useState(ty);
  const [viewMonth, setViewMonth] = useState(tm); // 0-based
  const [activeDateKey, setActiveDateKey] = useState<string | null>(null);
  const [ideaForm, setIdeaForm] = useState<IdeaForm | null>(null);

  // --- Load queue items (from the DB-backed pipeline) + calendar entries. ---
  const loadAll = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    try {
      const [itemsRes, entriesRes] = await Promise.all([
        authFetch("/api/cms/pipeline/items"),
        authFetch("/api/cms/calendar"),
      ]);
      const itemsData = await itemsRes.json();
      const entriesData = await entriesRes.json();
      const items: PipelineItem[] = Array.isArray(itemsData.items) ? itemsData.items : [];
      setQueueItems(
        items.filter((i) => i.status === "approved" || i.status === "producing")
      );
      setEntries(Array.isArray(entriesData.entries) ? entriesData.entries : []);
    } catch (err: any) {
      setError(err?.message || "Failed to load the calendar.");
    } finally {
      setLoading(false);
    }
  }, [authenticated, authFetch]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Pipeline ids that already have a calendar entry → drives the Unscheduled tray.
  const scheduledItemIds = useMemo(
    () => new Set(entries.map((e) => e.pipelineItemId).filter(Boolean) as string[]),
    [entries]
  );
  const unscheduled = useMemo(
    () => queueItems.filter((i) => !scheduledItemIds.has(i.id)),
    [queueItems, scheduledItemIds]
  );

  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  // dateKey -> entries scheduled/planned on that date
  const byDate = useMemo(() => {
    const m = new Map<string, CalendarEntry[]>();
    for (const e of entries) {
      const arr = m.get(e.entryDate) ?? [];
      arr.push(e);
      m.set(e.entryDate, arr);
    }
    return m;
  }, [entries]);

  // --- Month navigation ---
  const goPrevMonth = () => {
    setActiveDateKey(null);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const goNextMonth = () => {
    setActiveDateKey(null);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };
  const goToday = () => {
    setActiveDateKey(null);
    setViewYear(ty);
    setViewMonth(tm);
  };

  // --- Mutations (all persist to the DB, then update local state) ---

  /** Schedule a queue item onto a date (creates a calendar entry linked to it). */
  const scheduleItem = async (item: PipelineItem, dateKey: string) => {
    if (scheduledItemIds.has(item.id)) return; // already scheduled
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch("/api/cms/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.brief?.title || item.sourceTitle,
          category: item.brief?.category || item.sourceCategory || "",
          entryDate: dateKey,
          pipelineItemId: item.id,
          status: "scheduled",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to schedule.");
      setEntries((prev) => [...prev, data.entry]);
    } catch (err: any) {
      setError(err?.message || "Failed to schedule item.");
    } finally {
      setSaving(false);
    }
  };

  /** Move any existing entry (scheduled brief or idea) to a different date. */
  const moveEntry = async (entryId: string, dateKey: string) => {
    const existing = entries.find((e) => e.id === entryId);
    if (!existing || existing.entryDate === dateKey) return;
    const prev = entries;
    setEntries((cur) =>
      cur.map((e) => (e.id === entryId ? { ...e, entryDate: dateKey } : e))
    );
    try {
      const res = await authFetch(`/api/cms/calendar/${entryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryDate: dateKey }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to move entry.");
      }
    } catch (err: any) {
      setEntries(prev);
      setError(err?.message || "Failed to move entry.");
    }
  };

  /** Remove an entry (unschedule a brief, or delete a freeform idea). */
  const removeEntry = async (entryId: string) => {
    const prev = entries;
    setEntries((cur) => cur.filter((e) => e.id !== entryId));
    try {
      const res = await authFetch(`/api/cms/calendar/${entryId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to remove entry.");
      }
    } catch (err: any) {
      setEntries(prev);
      setError(err?.message || "Failed to remove entry.");
    }
  };

  /** Create a freeform idea (no pipeline link). */
  const saveIdea = async () => {
    if (!ideaForm) return;
    if (!ideaForm.title.trim()) {
      setError("Give the idea a title.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch("/api/cms/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ideaForm, status: "idea" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save idea.");
      setEntries((prev) => [...prev, data.entry]);
      setIdeaForm(null);
    } catch (err: any) {
      setError(err?.message || "Failed to save idea.");
    } finally {
      setSaving(false);
    }
  };

  // --- Drag and drop ---
  // Payload is "item:<pipelineId>" (from the tray) or "entry:<entryId>" (a chip).
  const onDragStartItem = (e: React.DragEvent, pipelineId: string) => {
    e.dataTransfer.setData("text/plain", `item:${pipelineId}`);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragStartEntry = (e: React.DragEvent, entryId: string) => {
    e.dataTransfer.setData("text/plain", `entry:${entryId}`);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDropToDate = (e: React.DragEvent, dateKey: string) => {
    e.preventDefault();
    const payload = e.dataTransfer.getData("text/plain");
    if (payload.startsWith("item:")) {
      const item = queueItems.find((q) => q.id === payload.slice(5));
      if (item) scheduleItem(item, dateKey);
    } else if (payload.startsWith("entry:")) {
      moveEntry(payload.slice(6), dateKey);
    }
  };

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fdfbf3" }}
      >
        <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <SketchLayout onLogout={logout}>
      <div className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <Link
              href="/admin/github-editor/pipeline"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-2"
            >
              <ArrowLeft size={14} />
              Back to Pipeline
            </Link>
            <div className="flex items-center gap-2">
              <CalendarDays size={24} className="text-teal-600" />
              <h1 className="text-2xl font-bold text-gray-900">Editorial Calendar</h1>
            </div>
            <p className="text-gray-600 mt-1">
              Plan article ideas and schedule queued briefs across the month.
              Dates are U.S. Eastern (EST) and saved to the database.
            </p>
          </div>
          <button
            onClick={() =>
              setIdeaForm({
                title: "",
                entryDate: activeDateKey || todayKey,
                category: "",
                notes: "",
              })
            }
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shrink-0"
          >
            <Plus size={16} />
            Add Idea
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-2 font-bold">
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Calendar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {MONTH_LABELS[viewMonth]} {viewYear}
                {loading && <Loader2 size={15} className="animate-spin text-gray-400" />}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToday}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Today
                </button>
                <button
                  onClick={goPrevMonth}
                  className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goNextMonth}
                  className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Weekday header */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAY_LABELS.map((w) => (
                <div
                  key={w}
                  className="text-xs font-medium text-gray-400 text-center py-1"
                >
                  {w}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
              {grid.map((cell) => {
                const dayEntries = byDate.get(cell.key) ?? [];
                const isToday = cell.key === todayKey;
                const isActive = cell.key === activeDateKey;
                return (
                  <div
                    key={cell.key}
                    onClick={() => cell.inMonth && setActiveDateKey(cell.key)}
                    onDragOver={(e) => {
                      if (cell.inMonth) e.preventDefault();
                    }}
                    onDrop={(e) => cell.inMonth && onDropToDate(e, cell.key)}
                    className={`min-h-[84px] rounded-lg border p-1.5 text-left transition-colors ${
                      cell.inMonth
                        ? "bg-white cursor-pointer hover:border-teal-300"
                        : "bg-gray-50 text-gray-300"
                    } ${isActive ? "border-teal-500 ring-1 ring-teal-300" : "border-gray-200"}`}
                  >
                    <div
                      className={`text-xs font-medium mb-1 flex items-center justify-between ${
                        isToday ? "text-teal-700" : cell.inMonth ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      <span
                        className={
                          isToday
                            ? "bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            : ""
                        }
                      >
                        {cell.day}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dayEntries.slice(0, 3).map((e) => {
                        const isBrief = !!e.pipelineItemId;
                        return (
                          <div
                            key={e.id}
                            draggable
                            onDragStart={(ev) => onDragStartEntry(ev, e.id)}
                            title={e.notes || e.title}
                            className={`group flex items-center gap-1 rounded px-1.5 py-1 text-[11px] leading-tight border ${
                              isBrief
                                ? "bg-teal-50 border-teal-200 text-teal-900"
                                : "bg-amber-50 border-amber-200 text-amber-900"
                            }`}
                          >
                            {isBrief ? (
                              <Workflow size={11} className="shrink-0 opacity-70" />
                            ) : (
                              <Lightbulb size={11} className="shrink-0 opacity-70" />
                            )}
                            <span className="truncate flex-1">{e.title}</span>
                            <button
                              onClick={(ev) => {
                                ev.stopPropagation();
                                removeEntry(e.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                              title={isBrief ? "Unschedule" : "Delete idea"}
                            >
                              <X size={11} />
                            </button>
                          </div>
                        );
                      })}
                      {dayEntries.length > 3 && (
                        <div className="text-[10px] text-gray-400 pl-1">
                          +{dayEntries.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unscheduled tray */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
            <div className="flex items-center gap-2 mb-3">
              <Inbox size={16} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900">Unscheduled</h3>
              <span className="ml-auto text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                {unscheduled.length}
              </span>
            </div>

            {activeDateKey && (
              <div className="mb-3 text-xs bg-teal-50 border border-teal-200 rounded-lg p-2 text-teal-800">
                Click an item below to schedule it for{" "}
                <span className="font-semibold">{prettyDateKey(activeDateKey)}</span>.
                <button
                  onClick={() => setActiveDateKey(null)}
                  className="ml-1 underline"
                >
                  cancel
                </button>
              </div>
            )}

            {unscheduled.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-6">
                <p>All queued items are scheduled.</p>
                <Link
                  href="/admin/github-editor/pipeline"
                  className="text-teal-600 hover:text-teal-700 text-xs mt-1 inline-block"
                >
                  Approve more briefs →
                </Link>
              </div>
            ) : (
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {unscheduled.map((it) => (
                  <div
                    key={it.id}
                    draggable
                    onDragStart={(e) => onDragStartItem(e, it.id)}
                    onClick={() => {
                      if (activeDateKey) scheduleItem(it, activeDateKey);
                    }}
                    className={`border border-gray-200 rounded-lg p-2.5 ${
                      activeDateKey
                        ? "cursor-pointer hover:border-teal-400 hover:bg-teal-50"
                        : "cursor-grab"
                    }`}
                    title={activeDateKey ? "Click to schedule on the selected date" : "Drag onto a date"}
                  >
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {it.brief?.title || it.sourceTitle}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1 text-[11px] text-gray-500">
                      {it.brief?.keyword && <span># {it.brief.keyword}</span>}
                      {it.brief?.category && <span>{it.brief.category}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[11px] text-gray-400 mt-3 leading-snug">
              Drag an item onto a date, or pick a date then click an item. Use
              “Add Idea” to plan content that isn’t in the pipeline yet.
            </p>
          </div>
        </div>

        {/* Add Idea modal */}
        {ideaForm && (
          <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => !saving && setIdeaForm(null)}
          >
            <div
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-500" />
                  Add Idea
                </h3>
                <button
                  onClick={() => setIdeaForm(null)}
                  disabled={saving}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Title</label>
                  <input
                    type="text"
                    autoFocus
                    value={ideaForm.title}
                    onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                    placeholder="Article idea…"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Date</label>
                    <input
                      type="date"
                      value={ideaForm.entryDate}
                      onChange={(e) => setIdeaForm({ ...ideaForm, entryDate: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Category</label>
                    <input
                      type="text"
                      value={ideaForm.category}
                      onChange={(e) => setIdeaForm({ ...ideaForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                      placeholder="optional"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Notes</label>
                  <textarea
                    value={ideaForm.notes}
                    onChange={(e) => setIdeaForm({ ...ideaForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                    rows={3}
                    placeholder="Optional notes / angle"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={saveIdea}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Save
                </button>
                <button
                  onClick={() => setIdeaForm(null)}
                  disabled={saving}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SketchLayout>
  );
}
