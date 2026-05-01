"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

function getDeviceType(): string {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("heatmap_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem("heatmap_session_id", sessionId);
  }
  return sessionId;
}

interface ClickData {
  page_path: string;
  x_percent: number;
  y_percent: number;
  viewport_width: number;
  viewport_height: number;
  element_tag: string;
  element_id: string;
  element_class: string;
  element_text: string;
  device_type: string;
  session_id: string;
}

interface ScrollData {
  page_path: string;
  max_scroll_percent: number;
  viewport_height: number;
  page_height: number;
  device_type: string;
  session_id: string;
}

export default function HeatmapTracker() {
  const pathname = usePathname();
  const clickBuffer = useRef<ClickData[]>([]);
  const maxScroll = useRef<number>(0);
  const flushTimeout = useRef<NodeJS.Timeout | null>(null);

  const flush = useCallback(async () => {
    const clicks = [...clickBuffer.current];
    clickBuffer.current = [];

    const scrolls: ScrollData[] = [];
    if (maxScroll.current > 0) {
      scrolls.push({
        page_path: pathname,
        max_scroll_percent: maxScroll.current,
        viewport_height: window.innerHeight,
        page_height: document.documentElement.scrollHeight,
        device_type: getDeviceType(),
        session_id: getSessionId(),
      });
    }

    if (clicks.length === 0 && scrolls.length === 0) return;

    try {
      await fetch("/api/heatmap/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clicks, scrolls }),
        keepalive: true,
      });
    } catch {
      // Silently fail — don't disrupt user experience
    }
  }, [pathname]);

  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;

    maxScroll.current = 0;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const pageHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = ((e.clientY + scrollY) / pageHeight) * 100;

      clickBuffer.current.push({
        page_path: pathname,
        x_percent: xPercent,
        y_percent: yPercent,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        element_tag: target.tagName.toLowerCase(),
        element_id: target.id || "",
        element_class: target.className?.toString().slice(0, 200) || "",
        element_text: target.textContent?.slice(0, 100) || "",
        device_type: getDeviceType(),
        session_id: getSessionId(),
      });

      // Debounce flush
      if (flushTimeout.current) clearTimeout(flushTimeout.current);
      flushTimeout.current = setTimeout(flush, 3000);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (pageHeight > 0) {
        const percent = (scrollTop / pageHeight) * 100;
        if (percent > maxScroll.current) {
          maxScroll.current = percent;
        }
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Flush on page unload
    const handleBeforeUnload = () => {
      flush();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (flushTimeout.current) clearTimeout(flushTimeout.current);
      flush();
    };
  }, [pathname, flush]);

  return null; // Invisible component
}
