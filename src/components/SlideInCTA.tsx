"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface SlideInCTAProps {
  /** Scroll percentage (0-100) at which the panel slides in */
  scrollPercent?: number;
  /** localStorage key to track dismissal */
  storageKey?: string;
  /** How long (in hours) before showing again after dismissal */
  dismissDurationHours?: number;
}

export default function SlideInCTA({
  scrollPercent = 40,
  storageKey = "slideInCTA_dismissed",
  dismissDurationHours = 24,
}: SlideInCTAProps) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // TODO: Re-enable localStorage check after testing
    // const dismissedAt = localStorage.getItem(storageKey);
    // if (dismissedAt) {
    //   const elapsed = Date.now() - parseInt(dismissedAt, 10);
    //   const dismissDurationMs = dismissDurationHours * 60 * 60 * 1000;
    //   if (elapsed < dismissDurationMs) {
    //     return; // Don't show
    //   }
    // }

    const handleScroll = () => {
      if (triggered) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      if (scrolled >= scrollPercent) {
        setTriggered(true);
        setShouldRender(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVisible(true);
          });
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPercent, storageKey, dismissDurationHours, triggered]);

  const handleDismiss = () => {
    setVisible(false);
    // TODO: Re-enable localStorage save after testing
    // localStorage.setItem(storageKey, Date.now().toString());
    // Remove from DOM after animation completes
    setTimeout(() => setShouldRender(false), 400);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-[998] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] max-w-[90vw] bg-white shadow-2xl z-[999] transform transition-transform duration-400 ease-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Get your free Medicare Decision Kit"
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center justify-center h-full px-8 py-12 text-center">
          {/* Eddie */}
          <div className="w-28 h-28 mb-8 relative overflow-hidden">
            <Image
              src="/eddie_eagle_arms_transparent.png"
              alt="Eddie the Eagle"
              width={112}
              height={112}
              className="object-contain object-top"
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#00263A] mb-3 leading-tight">
            Free Workbook That Makes Medicare Simple
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            A printable workbook to organize your deadlines, doctors,
            prescriptions, and costs.
          </p>

          {/* CTA Button */}
          <a
            href="https://rebuild.medicarecompared.com/tools/decision-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#F5820B] hover:bg-[#d96f08] text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Download Free Kit
          </a>

          {/* Trust signals */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Free. No obligation. Updated for 2026.
          </div>
        </div>
      </div>
    </>
  );
}
