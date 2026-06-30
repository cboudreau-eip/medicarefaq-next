"use client";
import Link from "next/link";
/**
 * MedigapByState - index page
 * Route: /medicare-supplement-plans/medigap-by-state
 * Updated: Links all 50 states to their detailed /medicare-supplement-plans/{state}/ pages
 */

import { MapPin, ChevronDown, Phone, ArrowRight, Star, Gift, Shield } from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

/* Complete list of all 50 states with their detailed page paths */
interface StateEntry {
  slug: string;       // URL path segment (e.g., "alabama")
  abbr: string;       // Two-letter abbreviation
  name: string;       // Full state name
  tag: "birthday-rule" | "anniversary-rule" | "guaranteed-issue" | "state-specific" | "standard";
  tagLabel?: string;  // Display label for the tag badge
}

const ALL_STATES: StateEntry[] = [
  { slug: "alabama",       abbr: "AL", name: "Alabama",        tag: "standard" },
  { slug: "alaska",        abbr: "AK", name: "Alaska",         tag: "standard" },
  { slug: "arizona",       abbr: "AZ", name: "Arizona",        tag: "standard" },
  { slug: "arkansas",      abbr: "AR", name: "Arkansas",       tag: "standard" },
  { slug: "california",    abbr: "CA", name: "California",     tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "colorado",      abbr: "CO", name: "Colorado",       tag: "standard" },
  { slug: "connecticut",   abbr: "CT", name: "Connecticut",    tag: "guaranteed-issue", tagLabel: "Guaranteed Issue" },
  { slug: "delaware",      abbr: "DE", name: "Delaware",       tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "florida",       abbr: "FL", name: "Florida",        tag: "standard" },
  { slug: "georgia",       abbr: "GA", name: "Georgia",        tag: "standard" },
  { slug: "hawaii",        abbr: "HI", name: "Hawaii",         tag: "standard" },
  { slug: "idaho",         abbr: "ID", name: "Idaho",          tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "illinois",      abbr: "IL", name: "Illinois",       tag: "standard" },
  { slug: "indiana",       abbr: "IN", name: "Indiana",        tag: "standard" },
  { slug: "iowa",          abbr: "IA", name: "Iowa",           tag: "standard" },
  { slug: "kansas",        abbr: "KS", name: "Kansas",         tag: "standard" },
  { slug: "kentucky",      abbr: "KY", name: "Kentucky",       tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "louisiana",     abbr: "LA", name: "Louisiana",      tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "maine",         abbr: "ME", name: "Maine",          tag: "guaranteed-issue", tagLabel: "Guaranteed Issue" },
  { slug: "maryland",      abbr: "MD", name: "Maryland",       tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "massachusetts", abbr: "MA", name: "Massachusetts",  tag: "state-specific",   tagLabel: "State-Specific Plans" },
  { slug: "michigan",      abbr: "MI", name: "Michigan",       tag: "standard" },
  { slug: "minnesota",     abbr: "MN", name: "Minnesota",      tag: "state-specific",   tagLabel: "State-Specific Plans" },
  { slug: "mississippi",   abbr: "MS", name: "Mississippi",    tag: "standard" },
  { slug: "missouri",      abbr: "MO", name: "Missouri",       tag: "anniversary-rule", tagLabel: "Anniversary Rule" },
  { slug: "montana",       abbr: "MT", name: "Montana",        tag: "standard" },
  { slug: "nebraska",      abbr: "NE", name: "Nebraska",       tag: "standard" },
  { slug: "nevada",        abbr: "NV", name: "Nevada",         tag: "standard" },
  { slug: "new-hampshire", abbr: "NH", name: "New Hampshire",  tag: "standard" },
  { slug: "new-jersey",    abbr: "NJ", name: "New Jersey",     tag: "standard" },
  { slug: "new-mexico",    abbr: "NM", name: "New Mexico",     tag: "standard" },
  { slug: "new-york",      abbr: "NY", name: "New York",       tag: "guaranteed-issue", tagLabel: "Guaranteed Issue" },
  { slug: "north-carolina",abbr: "NC", name: "North Carolina", tag: "standard" },
  { slug: "north-dakota",  abbr: "ND", name: "North Dakota",   tag: "standard" },
  { slug: "ohio",          abbr: "OH", name: "Ohio",           tag: "standard" },
  { slug: "oklahoma",      abbr: "OK", name: "Oklahoma",       tag: "standard" },
  { slug: "oregon",        abbr: "OR", name: "Oregon",         tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "pennsylvania",  abbr: "PA", name: "Pennsylvania",   tag: "standard" },
  { slug: "rhode-island",  abbr: "RI", name: "Rhode Island",   tag: "standard" },
  { slug: "south-carolina",abbr: "SC", name: "South Carolina", tag: "standard" },
  { slug: "south-dakota",  abbr: "SD", name: "South Dakota",   tag: "standard" },
  { slug: "tennessee",     abbr: "TN", name: "Tennessee",      tag: "standard" },
  { slug: "texas",         abbr: "TX", name: "Texas",          tag: "standard" },
  { slug: "utah",          abbr: "UT", name: "Utah",           tag: "standard" },
  { slug: "vermont",       abbr: "VT", name: "Vermont",        tag: "guaranteed-issue", tagLabel: "Guaranteed Issue" },
  { slug: "virginia",      abbr: "VA", name: "Virginia",       tag: "birthday-rule",    tagLabel: "Birthday Rule" },
  { slug: "washington",    abbr: "WA", name: "Washington",     tag: "guaranteed-issue", tagLabel: "Year-Round Switching" },
  { slug: "west-virginia", abbr: "WV", name: "West Virginia",  tag: "standard" },
  { slug: "wisconsin",     abbr: "WI", name: "Wisconsin",      tag: "state-specific",   tagLabel: "State-Specific Plans" },
  { slug: "wyoming",       abbr: "WY", name: "Wyoming",        tag: "standard" },
];

function getTagStyles(tag: StateEntry["tag"]) {
  switch (tag) {
    case "birthday-rule":
      return {
        badge: "bg-amber-100 text-amber-800 border border-amber-200",
        icon: <Gift className="w-3 h-3" aria-hidden="true" />,
      };
    case "anniversary-rule":
      return {
        badge: "bg-orange-100 text-orange-800 border border-orange-200",
        icon: <Star className="w-3 h-3" aria-hidden="true" />,
      };
    case "guaranteed-issue":
      return {
        badge: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        icon: <Shield className="w-3 h-3" aria-hidden="true" />,
      };
    case "state-specific":
      return {
        badge: "bg-purple-100 text-purple-800 border border-purple-200",
        icon: <Star className="w-3 h-3" aria-hidden="true" />,
      };
    default:
      return null;
  }
}

export default function PageContent() {
  const specialStates = ALL_STATES.filter((s) => s.tag !== "standard");
  const standardStates = ALL_STATES.filter((s) => s.tag === "standard");

  return (
    <article className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link href="/medicare-supplement-plans" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-teal-400">By State</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-teal-400" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medigap Plans by State
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Medicare Supplement rules, top carriers, and premiums vary by state. Find detailed state-specific guidance, carrier rankings, and Plan G vs Plan N comparisons for all 50 states.
          </p>
          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              pageSection="medigap_by_state"
              triggerId="compare-plans-medigap-state-1"
              coverageType="ms"
              title="Compare Medigap Plans in Your State"
              subtitle="Enter your ZIP code to see rates from top Medigap carriers available in your area - free, no obligation."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Get State-Specific Rates <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a href="tel:+18883358996"  data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medigap_by_state" })} className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">

          {/* Legend */}
          <div className="mb-10 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700 mb-3">State Rule Legend</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-medium">
                <Gift className="w-3 h-3" aria-hidden="true" /> Birthday Rule - annual guaranteed switching window
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 font-medium">
                <Star className="w-3 h-3" aria-hidden="true" /> Anniversary Rule - annual switching tied to policy date
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-medium">
                <Shield className="w-3 h-3" aria-hidden="true" /> Guaranteed Issue - switch anytime, no underwriting
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-medium">
                <Star className="w-3 h-3" aria-hidden="true" /> State-Specific Plans - unique plan structure
              </span>
            </div>
          </div>

          {/* States with special rules */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
              States with Special Medigap Rules
            </h2>
            <p className="text-slate-500 mb-6">
              These states have birthday rules, anniversary rules, guaranteed issue protections, or unique plan structures that give enrollees additional flexibility.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialStates.map((state) => {
                const tagStyles = getTagStyles(state.tag);
                return (
                  <Link
                    key={state.slug}
                    href={`/medicare-supplement-plans/${state.slug}/`}
                    className="group flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-lg font-black text-white">{state.abbr}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{state.name}</h3>
                      {tagStyles && state.tagLabel && (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${tagStyles.badge}`}>
                          {tagStyles.icon} {state.tagLabel}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* All other states */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
              States with Federal Medigap Standardization
            </h2>
            <p className="text-slate-500 mb-6">
              These states follow the federal lettered plan structure (Plans A through N). Benefits are identical across carriers - only premiums differ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {standardStates.map((state) => (
                <Link
                  key={state.slug}
                  href={`/medicare-supplement-plans/${state.slug}/`}
                  className="group flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-lg font-black text-white">{state.abbr}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">{state.name}</h3>
                    <p className="text-xs text-slate-500">Full carrier rankings and premium guide</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Not Sure Which Plan is Right for Your State?</h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our licensed Medicare agents can compare Medigap plans and rates in your specific state at no cost to you.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <ZipFormModal
                pageSection="medigap_by_state"
                triggerId="compare-plans-medigap-state-2"
                coverageType="ms"
                title="Compare Medigap Plans in Your State"
                subtitle="Enter your ZIP code to see rates from top Medigap carriers in your area - free, no obligation."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                    Compare Plans in Your Area <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                }
              />
              <a href="tel:+18883358996"  data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medigap_by_state" })} className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-white/20">
                <Phone className="w-4 h-4" aria-hidden="true" /> Call (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>

      </article>
  );
}
