"use client";

/**
 * MedigapStateTemplate — PageContent
 * Route: /medicare-supplements/medigap-by-state/[stateSlug]
 * Data-driven template for all Medigap by-state pages.
 */

import Link from "next/link";
import {
  MapPin, ChevronDown, Phone, ArrowRight, CheckCircle2,
  AlertTriangle, Info, Building2, Users, Star
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { getStateBySlug, STATE_DATA } from "@/lib/medigap-state-data";

export default function PageContent({ stateSlug }: { stateSlug: string }) {
  const state = getStateBySlug(stateSlug);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements/medigap-by-state" className="hover:text-white transition-colors">By State</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">{state.name}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">{state.abbreviation}</span>
            </div>
            {state.isStandardized ? (
              <span className="text-xs font-bold px-3 py-1 rounded-full border bg-teal-100 text-teal-800 border-teal-200">
                Federal Standardization
              </span>
            ) : (
              <span className="text-xs font-bold px-3 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-200">
                State-Specific Plans
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            {state.name} Medigap Plans
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Medicare Supplement Plans in {state.name} — 2026 Rates, Rules & Carrier Options
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-teal-400" />
              <span><strong className="text-white">{state.medicareEnrollees}</strong> Medicare enrollees</span>
            </div>
            {state.isStandardized && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Avg Plan G: <strong className="text-white">{state.avgPlanGPremium}</strong></span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <ZipFormModal
              coverageType="ms"
              title={`Compare Medigap Rates in ${state.name}`}
              subtitle={`Enter your ZIP code to see rates from top Medigap carriers available in ${state.name} — free, no obligation.`}
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare {state.name} Rates <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">

          {/* State-specific standardization note */}
          {!state.isStandardized && state.standardizationNote && (
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl mb-10 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">State-Specific Plan Structure</p>
                <p className="text-sm text-amber-800">{state.standardizationNote}</p>
              </div>
            </div>
          )}

          {/* Key facts grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {state.keyFacts.map((fact, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl text-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{fact.label}</p>
                <p className="font-bold text-slate-900 text-sm">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Medigap in {state.name}
            </h2>
            <p className="text-slate-600 leading-relaxed">{state.overview}</p>
          </div>

          {/* Open enrollment note */}
          <div className="mb-12 p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">Open Enrollment in {state.name}</p>
              <p className="text-sm text-blue-800">{state.openEnrollmentNote}</p>
            </div>
          </div>

          {/* State-specific rules */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              {state.name} Medigap Rules
            </h2>
            <ul className="space-y-3">
              {state.stateSpecificRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top carriers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Top Carriers in {state.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {state.topCarriers.map((carrier, i) => (
                <div key={i} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{carrier}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular plans */}
          {state.isStandardized && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                Most Popular Plans in {state.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {state.popularPlans.map((letter) => (
                  <Link
                    key={letter}
                    href={`/medicare-supplements/${letter === "HD-G" ? "high-deductible-plan-g" : letter === "HD-F" ? "high-deductible-plan-f" : `plan-${letter.toLowerCase()}`}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Plan {letter}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Nearby States */}
          {state.nearbyStates && state.nearbyStates.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                Explore Medigap Plans in Nearby States
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {state.nearbyStates.map((nearbySlug) => {
                  const nearby = STATE_DATA.find(s => s.slug === nearbySlug);
                  if (!nearby) return null;
                  return (
                    <Link
                      key={nearbySlug}
                      href={`/medicare-supplements/medigap-by-state/${nearbySlug}`}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <span className="text-sm font-black text-blue-900">{nearby.abbreviation}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{nearby.name}</p>
                          <p className="text-xs text-slate-500">Medigap Plans</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">Compare {state.name} Medigap Rates</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Our licensed Medicare agents specialize in {state.name} Medigap plans and can compare rates from all available carriers at no cost to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <ZipFormModal
                coverageType="ms"
                title={`Compare Medigap Rates in ${state.name}`}
                subtitle={`Enter your ZIP code to get personalized Medigap rates from top carriers in ${state.name} — free, no obligation.`}
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                    Compare {state.name} Rates <ArrowRight className="w-4 h-4" />
                  </button>
                }
              />
              <a href="tel:8883358996" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
                <Phone className="w-4 h-4" /> Call (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
