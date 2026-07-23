"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface SlideInCTAProps {
  /** Delay in ms before the panel slides in */
  delay?: number;
  /** localStorage key to track dismissal */
  storageKey?: string;
  /** How long (in hours) before showing again after dismissal */
  dismissDurationHours?: number;
}

export default function SlideInCTA({
  delay = 5000,
  storageKey = "slideInCTA_dismissed",
  dismissDurationHours = 24,
}: SlideInCTAProps) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has dismissed recently
    const dismissedAt = localStorage.getItem(storageKey);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      const dismissDurationMs = dismissDurationHours * 60 * 60 * 1000;
      if (elapsed < dismissDurationMs) {
        return; // Don't show
      }
    }

    // Show after delay
    const timer = setTimeout(() => {
      setShouldRender(true);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, storageKey, dismissDurationHours]);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(storageKey, Date.now().toString());
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
        aria-label="Find the right Medicare plan"
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
          {/* Icon/Visual */}
          <div className="w-16 h-16 bg-[#00263A] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#00263A] mb-3 leading-tight">
            Find the Right Medicare Plan for You
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Answer a few quick questions and we will help match you with plans available in your area. It takes less than 2 minutes.
          </p>

          {/* CTA Button */}
          <Link
            href="/find-plans/"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#C41E3A] hover:bg-[#a01830] text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Get Started - It&apos;s Free
          </Link>

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
            No cost. No obligation. No spam.
          </div>
        </div>
      </div>
    </>
  );
}
