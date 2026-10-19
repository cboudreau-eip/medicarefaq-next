/** Evaluate the guide's own enrollment year; never advertise an old season as open. */
export function getAepGuideStatus(year: number, now: Date): "before" | "open" | "closed" {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  const day = `${part("year")}-${part("month")}-${part("day")}`;
  if (day < `${year}-10-15`) return "before";
  return day <= `${year}-12-07` ? "open" : "closed";
}
