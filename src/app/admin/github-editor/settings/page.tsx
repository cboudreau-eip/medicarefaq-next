"use client";

import { writingConfig } from "@/lib/writing-config";
import {
  Settings,
  Volume2,
  Users,
  Ban,
  Link2,
  BookOpen,
  FileText,
  ChevronDown,
  ChevronRight,
  Database,
} from "lucide-react";
import { useState } from "react";

function CollapsibleSection({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ElementType;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <Icon className="w-5 h-5 text-purple-600 flex-shrink-0" />
        <span className="text-base font-semibold text-gray-900 flex-1">
          {title}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

function Badge({ children, color = "gray" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
}

export default function SettingsPage() {
  const config = writingConfig;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Writing Config
              </h1>
              <p className="text-sm text-gray-500">
                RankPilot rules &amp; brand guidelines used by Transform with AI
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Brand Voice */}
          <CollapsibleSection title="Brand Voice" icon={Volume2} defaultOpen={true}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Voice Name
                  </label>
                  <p className="text-sm text-gray-900 mt-1">{config.brandVoice.name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Perspective
                  </label>
                  <p className="text-sm text-gray-900 mt-1">{config.brandVoice.perspective}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Sentence Style
                  </label>
                  <p className="text-sm text-gray-900 mt-1">{config.brandVoice.sentenceStyle}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Primary Tone
                </label>
                <div className="flex gap-2 mt-1">
                  {config.brandVoice.primaryTone.map((t) => (
                    <Badge key={t} color="purple">{t}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Supporting Tone
                </label>
                <div className="flex gap-2 mt-1">
                  {config.brandVoice.supportingTone.map((t) => (
                    <Badge key={t} color="blue">{t}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Things to Avoid
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {config.brandVoice.avoid.map((a) => (
                    <Badge key={a} color="red">{a}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Writing Style Sample
                </label>
                <div className="mt-2 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed border border-gray-100 italic">
                  {config.brandVoice.writingStyleSample}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* ICP */}
          <CollapsibleSection title="Ideal Customer Profile (ICP)" icon={Users} defaultOpen={true}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  ICP Name
                </label>
                <p className="text-sm text-gray-900 mt-1 font-medium">{config.icp.name}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Who They Are
                </label>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">{config.icp.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Pain Points
                  </label>
                  <ul className="mt-2 space-y-1.5">
                    {config.icp.painPoints.map((p, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-400 mt-0.5 text-xs">&#9679;</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Goals
                  </label>
                  <ul className="mt-2 space-y-1.5">
                    {config.icp.goals.map((g, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-400 mt-0.5 text-xs">&#9679;</span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Common Objections
                  </label>
                  <ul className="mt-2 space-y-1.5">
                    {config.icp.objections.map((o, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 text-xs">&#9679;</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Decision Triggers
                  </label>
                  <ul className="mt-2 space-y-1.5">
                    {config.icp.decisionTriggers.map((t, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5 text-xs">&#9679;</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Trust Signals
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.icp.trustSignals.map((s, i) => (
                    <Badge key={i} color="green">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Banned Phrases */}
          <CollapsibleSection title="Banned Phrases" icon={Ban}>
            <div>
              <p className="text-sm text-gray-500 mb-3">
                These phrases will never appear in AI-generated content.
              </p>
              <div className="flex flex-wrap gap-2">
                {config.bannedPhrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-700 border border-red-100"
                  >
                    <Ban className="w-3 h-3 mr-1.5 text-red-400" />
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* Citation Sources */}
          <CollapsibleSection title="Preferred Citation Sources" icon={Link2}>
            <div>
              <p className="text-sm text-gray-500 mb-3">
                When the AI includes external links, it prefers these authoritative sources.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {config.citationSources.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors group"
                  >
                    <Link2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-500" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                      {source.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* Medicare Reference Data */}
          <CollapsibleSection title="Medicare Reference Data (Cross-Reference)" icon={Database}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                The AI uses these exact figures when mentioning costs, premiums, or thresholds. No guessing or rounding.
              </p>
              {[
                { title: "Part A Premiums & Costs", data: config.referenceData.partA },
                { title: "Part B Premiums & Costs", data: config.referenceData.partB },
                { title: "Part D Costs", data: config.referenceData.partD },
                { title: "Part C (Medicare Advantage)", data: config.referenceData.partC },
                { title: "IRMAA Individual Thresholds", data: config.referenceData.irmaaIndividual },
                { title: "IRMAA Joint Thresholds", data: config.referenceData.irmaaJoint },
                { title: "IRMAA Part B Premiums", data: config.referenceData.irmaaPartBPremiums },
                { title: "IRMAA Part D Surcharges", data: config.referenceData.irmaaPartDSurcharges },
                { title: "Medigap Plans", data: config.referenceData.medigap },
                { title: "Extra Help (Low-Income Subsidy)", data: config.referenceData.extraHelp },
                { title: "Therapy & Other Limits", data: config.referenceData.therapyLimits },
                { title: "IRS Standard Deductions", data: config.referenceData.irsDeductions },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">{section.title}</h4>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(section.data).map(([key, value]) => (
                          <tr key={key} className="border-b border-gray-100 last:border-0">
                            <td className="px-3 py-1.5 text-gray-600 font-medium">{key}</td>
                            <td className="px-3 py-1.5 text-gray-900 font-mono text-right">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Hardcoded Writing Rules */}
          <CollapsibleSection title="Hardcoded Writing Rules" icon={BookOpen}>
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">{config.hardcodedRules.targetWordCount}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Target Words</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">{config.hardcodedRules.numSections}</p>
                  <p className="text-xs text-gray-500 mt-0.5">H2 Sections</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">{config.hardcodedRules.numFaqs}</p>
                  <p className="text-xs text-gray-500 mt-0.5">FAQ Questions</p>
                </div>
              </div>

              {[
                { title: "Introduction Rules", items: config.hardcodedRules.introRules },
                { title: "Statistics & Uniqueness", items: config.hardcodedRules.statisticsRules },
                { title: "FAQ Answer Rules", items: config.hardcodedRules.faqRules },
                { title: "Paragraph Structure", items: config.hardcodedRules.paragraphRules },
                { title: "Anchor Text & Links", items: config.hardcodedRules.anchorTextRules },
                { title: "HTML Formatting", items: config.hardcodedRules.htmlFormatRules },
                { title: "Table Format", items: config.hardcodedRules.tableRules },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-purple-300 mt-1 text-[8px]">&#9632;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Generated Prompt Preview */}
          <CollapsibleSection title="Generated System Prompt (Preview)" icon={FileText}>
            <div>
              <p className="text-sm text-gray-500 mb-3">
                This is the full prompt injected into every Transform with AI call. It combines all the layers above.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {/* We'll import and call buildWritingPrompt at render time */}
                  {(() => {
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const { buildWritingPrompt } = require("@/lib/writing-config");
                    return buildWritingPrompt();
                  })()}
                </pre>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            To update these settings, edit{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
              src/lib/writing-config.ts
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
