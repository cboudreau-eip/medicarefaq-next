"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { US_STATE_PATHS } from "@/lib/us-map-paths";
import {
  BIRTHDAY_RULE_STATES,
  BIRTHDAY_RULE_STATE_CODES,
  CONTINUOUS_OE_STATE_CODES,
} from "@/lib/birthday-rule-states";

interface ModalData {
  stateCode: string;
  name: string;
  hasBirthdayRule: boolean;
  continuousOE?: boolean;
  description: string;
  link: string;
  window?: string;
}

export default function InteractiveUSMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");

  const handleStateClick = useCallback((stateCode: string) => {
    const ruleData = BIRTHDAY_RULE_STATES[stateCode];
    if (!ruleData) return;
    setModalData({
      stateCode,
      name: ruleData.name,
      hasBirthdayRule: ruleData.hasBirthdayRule,
      continuousOE: ruleData.continuousOE,
      description: ruleData.description,
      link: ruleData.link,
      window: ruleData.window,
    });
  }, []);

  const handleDropdownChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSelectedState(value);
      if (value) {
        handleStateClick(value);
      }
    },
    [handleStateClick]
  );

  const closeModal = useCallback(() => {
    setModalData(null);
  }, []);

  const getStateFill = (stateCode: string) => {
    if (hoveredState === stateCode) {
      if (BIRTHDAY_RULE_STATE_CODES.includes(stateCode)) return "#0d5c63"; // darker teal on hover
      if (CONTINUOUS_OE_STATE_CODES.includes(stateCode)) return "#4a6741"; // darker green on hover
      return "#2c4a6e"; // darker blue on hover
    }
    if (BIRTHDAY_RULE_STATE_CODES.includes(stateCode)) return "#14919b"; // teal for birthday rule
    if (CONTINUOUS_OE_STATE_CODES.includes(stateCode)) return "#6b9b61"; // green for continuous OE
    return "#4a90c4"; // standard blue
  };

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded" style={{ backgroundColor: "#14919b" }}></div>
          <span className="text-sm text-gray-700">Birthday Rule States</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded" style={{ backgroundColor: "#6b9b61" }}></div>
          <span className="text-sm text-gray-700">Continuous Open Enrollment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded" style={{ backgroundColor: "#4a90c4" }}></div>
          <span className="text-sm text-gray-700">No Additional Periods</span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="relative w-full max-w-4xl mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 960 600"
          className="w-full h-auto"
          aria-label="Interactive map of the United States showing Medigap birthday rule states"
        >
          {Object.entries(US_STATE_PATHS).map(([code, { path }]) => (
            <path
              key={code}
              d={path}
              fill={getStateFill(code)}
              stroke="#ffffff"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-150"
              onMouseEnter={() => setHoveredState(code)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleStateClick(code)}
              aria-label={BIRTHDAY_RULE_STATES[code]?.name || code}
            >
              <title>{BIRTHDAY_RULE_STATES[code]?.name || code}</title>
            </path>
          ))}
        </svg>

        {/* Tooltip on hover */}
        {hoveredState && (
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm shadow-md rounded-lg px-3 py-2 pointer-events-none z-10 border border-gray-200">
            <p className="text-sm font-semibold text-gray-800">
              {BIRTHDAY_RULE_STATES[hoveredState]?.name}
            </p>
            <p className="text-xs text-gray-500">
              {BIRTHDAY_RULE_STATE_CODES.includes(hoveredState)
                ? "Has Birthday Rule. Click to learn more"
                : CONTINUOUS_OE_STATE_CODES.includes(hoveredState)
                ? "Continuous Open Enrollment"
                : "No additional enrollment periods"}
            </p>
          </div>
        )}
      </div>

      {/* Dropdown selector */}
      <div className="mt-8 max-w-md mx-auto">
        <select
          value={selectedState}
          onChange={handleDropdownChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base"
          aria-label="Select a state to view its Medigap birthday rule status"
        >
          <option value="">Select a State</option>
          {Object.entries(BIRTHDAY_RULE_STATES)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
            .map(([code, data]) => (
              <option key={code} value={code}>
                {data.name}
                {data.hasBirthdayRule ? " ★" : data.continuousOE ? " ●" : ""}
              </option>
            ))}
        </select>
      </div>

      {/* Modal */}
      {modalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              {modalData.hasBirthdayRule ? (
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              ) : modalData.continuousOE ? (
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {modalData.hasBirthdayRule
                ? "Medigap Birthday Rule"
                : modalData.continuousOE
                ? "Continuous Open Enrollment"
                : "No Additional Periods"}
            </h3>

            {/* Description */}
            <p className="text-center text-gray-600 mb-2">
              {modalData.description}
            </p>

            {/* Window info for birthday rule states */}
            {modalData.window && (
              <p className="text-center text-sm text-teal-700 font-medium mb-4">
                Window: {modalData.window}
              </p>
            )}

            {/* CTA Button */}
            <div className="flex justify-center mt-6">
              <Link
                href={modalData.link}
                className="inline-flex items-center px-6 py-3 bg-[#f5a623] hover:bg-[#e09515] text-white font-semibold rounded-lg shadow-md transition-colors duration-150 text-base"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
