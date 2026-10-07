"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { searchContent } from "@/lib/search-index";

export default function MenuSearchDropdown({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => query.trim().length >= 2 ? searchContent(query).slice(0, 6) : [], [query]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const outside = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={trigger} type="button" aria-label={open ? "Close search" : "Open search"} aria-expanded={open} aria-controls="menu-test-two-search" onClick={() => setOpen(!open)} className={`flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0D9488] ${dark ? "h-[65.6px] w-16 text-white hover:bg-white/10" : "h-12 w-12 rounded-lg text-[#1B2A4A] hover:bg-slate-100"}`}>
        {open ? <X aria-hidden="true" className={dark ? "h-[22.4px] w-[22.4px]" : "h-7 w-7"} /> : <Search aria-hidden="true" className={dark ? "h-[22.4px] w-[22.4px]" : "h-7 w-7"} />}
      </button>
      {open && (
        <div id="menu-test-two-search" className="absolute right-0 top-full z-[60] mt-2 w-[420px] max-w-[calc(100vw-32px)] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <form action="/search/" method="get" role="search">
            <label htmlFor="menu-test-two-query" className="mb-2 block text-sm font-semibold text-[#1B2A4A]">Search Medicare topics</label>
            <div className="flex gap-2">
              <input ref={input} id="menu-test-two-query" name="q" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Medicare topics..." required className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#1B2A4A] focus:outline-[#0D9488]" />
              <button type="submit" className="rounded-lg bg-[#1B2A4A] px-3 py-2 text-sm font-semibold text-white">Search</button>
            </div>
          </form>
          {query.trim().length >= 2 && (
            <div className="mt-3 max-h-[50vh] overflow-y-auto" aria-live="polite">
              {results.length ? <ul>{results.map(result => <li key={result.id}><Link href={result.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm text-[#1B2A4A] hover:bg-slate-100">{result.title}</Link></li>)}</ul> : <p className="py-2 text-sm text-slate-600">No results. Try another topic.</p>}
              <Link href={`/search/?q=${encodeURIComponent(query.trim())}`} className="mt-2 block text-sm font-semibold text-[#0B7C72] hover:underline">View all results</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
