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
} from "lucide-react";
import {
  type PipelineItem,
  loadPipelineItems,
  savePipelineItems,
  buildMonthGrid,
  estDateKey,
  prettyDateKey,
  WEEKDAY_LABELS,
  MONTH_LABELS,
  parseDateKey,
} from "@/lib/cms-pipeline-store";

export default function PipelineCalendarPage() {
  const { authenticated, authLoading, login, logout } = useCMSAuth();
  const [items, setItems] = useState<PipelineItem[]>([]);
  const todayKey = estDateKey();
  const { year: ty, monthIndex0: tm } = parseDateKey(todayKey);
  const [viewYear, setViewYear] = useState(ty);
  const [viewMonth, setViewMonth] = useState(tm); // 0-based
  // The date cell currently selected for assigning an item (the "schedule into" target)
  const [activeDateKey, setActiveDateKey] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadPipelineItems());
  }, []);

  const updateItems = useCallback(
    (updater: (prev: PipelineItem[]) => PipelineItem[]) => {
      setItems((prev) => {
        const next = updater(prev);
        savePipelineItems(next);
        return next;
      });
    },
    []
  );

  // Only queued (approved/producing) items are schedulable on the editorial calendar.
  const queueItems = useMemo(
    () => items.filter((i) => i.status === "approved" || i.status === "producing"),
    [items]
  );
  const unscheduled = useMemo(
    () => queueItems.filter((i) => !i.scheduledFor),
    [queueItems]
  );

  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  // Map of dateKey -> items scheduled on that date
  const byDate = useMemo(() => {
    const m = new Map<string, PipelineItem[]>();
    for (const it of queueItems) {
      if (it.scheduledFor) {
        const arr = m.get(it.scheduledFor) ?? [];
        arr.push(it);
        m.set(it.scheduledFor, arr);
      }
    }
    return m;
  }, [queueItems]);

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

  const scheduleItem = (itemId: string, dateKey: string) => {
    updateItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, scheduledFor: dateKey } : i))
    );
  };
  const unscheduleItem = (itemId: string) => {
    updateItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, scheduledFor: undefined } : i))
    );
  };

  // Drag-and-drop support
  const onDropToDate = (e: React.DragEvent, dateKey: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) scheduleItem(id, dateKey);
  };
  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
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
        <div className="mb-6">
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
            Plan your queued articles across the month. Times shown in U.S.
            Eastern (EST). Scheduling is saved automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Calendar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {MONTH_LABELS[viewMonth]} {viewYear}
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
                const dayItems = byDate.get(cell.key) ?? [];
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
                      {dayItems.slice(0, 3).map((it) => (
                        <div
                          key={it.id}
                          draggable
                          onDragStart={(e) => onDragStart(e, it.id)}
                          title={it.brief?.title}
                          className="group flex items-center gap-1 bg-teal-50 border border-teal-200 rounded px-1.5 py-1 text-[11px] leading-tight text-teal-900"
                        >
                          <span className="truncate flex-1">
                            {it.brief?.title || it.sourceTitle}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              unscheduleItem(it.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-teal-500 hover:text-red-500"
                            title="Unschedule"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                      {dayItems.length > 3 && (
                        <div className="text-[10px] text-gray-400 pl-1">
                          +{dayItems.length - 3} more
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
                    onDragStart={(e) => onDragStart(e, it.id)}
                    onClick={() => {
                      if (activeDateKey) scheduleItem(it.id, activeDateKey);
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
              Tip: drag an item onto a date, or pick a date then click an item.
              Automated draft creation from this schedule is coming next.
            </p>
          </div>
        </div>
      </div>
    </SketchLayout>
  );
}
