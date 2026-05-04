"use client";

/**
 * TrustBadgeBar — full-width horizontal trust strip
 * Badges: Forbes Finance Council · Shopper Approved · BBB Accredited Business
 * Placed directly above the footer on the homepage (trial).
 */

export default function TrustBadgeBar() {
  return (
    <section className="w-full border-t border-gray-200 bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
          Trusted &amp; Recognized
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">

          {/* Forbes Finance Council */}
          <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-serif font-bold text-[22px] leading-none tracking-tight"
                style={{ color: "#1B2A4A", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Forbes
              </span>
            </div>
            <div
              className="text-[10px] font-semibold tracking-widest uppercase border-t pt-1"
              style={{ color: "#1B2A4A", borderColor: "#1B2A4A" }}
            >
              Finance Council
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-gray-300" />

          {/* Shopper Approved */}
          <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1">
              {/* Checkmark icon */}
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#0D9488" }}
              >
                ✓
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill={i <= 4 ? "#D97706" : "none"}
                    stroke="#D97706"
                    strokeWidth="1.5"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="text-[11px] font-medium text-gray-500">
              2,353 Ratings
            </div>
            <div
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#0D9488" }}
            >
              Shopper Approved
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-gray-300" />

          {/* BBB Accredited Business */}
          <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: "#003087" }}
              >
                BBB
              </div>
              <div>
                <div
                  className="text-[11px] font-bold leading-tight"
                  style={{ color: "#003087" }}
                >
                  Accredited
                </div>
                <div
                  className="text-[11px] font-bold leading-tight"
                  style={{ color: "#003087" }}
                >
                  Business
                </div>
              </div>
            </div>
            <div
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#003087" }}
            >
              BBB Rating: A+
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
