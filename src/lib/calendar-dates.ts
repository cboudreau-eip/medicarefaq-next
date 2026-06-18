/**
 * calendar-dates.ts
 *
 * EST-aware date helpers for the editorial calendar grid. The calendar operates
 * in US Eastern time per project preference, so "today" and all date keys are
 * derived in America/New_York regardless of the viewer's local timezone.
 *
 * Pure client-safe utilities (no DB / node deps) — extracted from the former
 * cms-pipeline-store.ts when pipeline + calendar state moved to Postgres.
 */

const EST_TZ = "America/New_York";

/** Returns the EST calendar date key ("YYYY-MM-DD") for a given Date (default now). */
export function estDateKey(d: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EST_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** Builds a "YYYY-MM-DD" key from explicit year/month(0-based)/day numbers. */
export function dateKeyFromYMD(year: number, monthIndex0: number, day: number): string {
  const mm = String(monthIndex0 + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/** Parses a "YYYY-MM-DD" key into its numeric parts. */
export function parseDateKey(key: string): { year: number; monthIndex0: number; day: number } {
  const [y, m, d] = key.split("-").map((n) => parseInt(n, 10));
  return { year: y, monthIndex0: m - 1, day: d };
}

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Builds a 6-row (42-cell) month grid of date keys for the given year/month,
 * including leading/trailing days from adjacent months so the grid is full.
 * Each cell notes whether it belongs to the current month.
 */
export function buildMonthGrid(
  year: number,
  monthIndex0: number
): { key: string; day: number; inMonth: boolean }[] {
  const first = new Date(year, monthIndex0, 1);
  const startWeekday = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, monthIndex0 + 1, 0).getDate();
  const daysInPrev = new Date(year, monthIndex0, 0).getDate();

  const cells: { key: string; day: number; inMonth: boolean }[] = [];

  // Leading days from previous month
  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = daysInPrev - i;
    const prevMonth = monthIndex0 === 0 ? 11 : monthIndex0 - 1;
    const prevYear = monthIndex0 === 0 ? year - 1 : year;
    cells.push({ key: dateKeyFromYMD(prevYear, prevMonth, day), day, inMonth: false });
  }
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ key: dateKeyFromYMD(year, monthIndex0, day), day, inMonth: true });
  }
  // Trailing days to fill to 42 cells
  let nextDay = 1;
  while (cells.length < 42) {
    const nextMonth = monthIndex0 === 11 ? 0 : monthIndex0 + 1;
    const nextYear = monthIndex0 === 11 ? year + 1 : year;
    cells.push({ key: dateKeyFromYMD(nextYear, nextMonth, nextDay), day: nextDay, inMonth: false });
    nextDay++;
  }
  return cells;
}

/** Human-friendly label for a date key, e.g. "Mon, Jun 17". */
export function prettyDateKey(key: string): string {
  const { year, monthIndex0, day } = parseDateKey(key);
  const d = new Date(year, monthIndex0, day);
  return `${WEEKDAY_LABELS[d.getDay()]}, ${MONTH_LABELS[monthIndex0].slice(0, 3)} ${day}`;
}
