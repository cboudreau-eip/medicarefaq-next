"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Target,
  Settings2,
  CheckCircle2,
  ArrowRight,
  Edit3,
  RotateCcw,
  Wand2,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import CMSHeader from "../components/cms-header";

// --- Types ---

interface OutlineSubSection {
  id: string;
  heading: string;
  type: "h3";
  points: string[];
}

interface OutlineSection {
  id: string;
  heading: string;
  type: "h2" | "h3";
  points: string[];
  targetWordCount: number;
  subSections: OutlineSubSection[];
}

interface GeneratedOutline {
  title: string;
  sections: OutlineSection[];
}

interface OutlineSettings {
  topic: string;
  targetKeyword: string;
  contentType: string;
  tone: string;
  targetWordCount: number;
  numSections: number;
  numFaqs: number;
  targetLocation: string;
  additionalInstructions: string;
}

// --- Constants ---

const CONTENT_TYPES = [
  { value: "blog", label: "Blog Post" },
  { value: "comparison", label: "Comparison" },
  { value: "guide", label: "How-To Guide" },
  { value: "listicle", label: "Listicle" },
  { value: "pillar", label: "Pillar Page" },
  { value: "review", label: "Review" },
  { value: "case-study", label: "Case Study" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "authoritative", label: "Authoritative" },
  { value: "friendly", label: "Friendly" },
  { value: "academic", label: "Academic" },
  { value: "persuasive", label: "Persuasive" },
];

// --- Main Page ---

function CreateFromKeywordInner() {
  const router = useRouter();
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();

  // Step state: "configure" | "review" | "generating"
  const [step, setStep] = useState<"configure" | "review" | "generating">("configure");

  // Config state
  const [topic, setTopic] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [tone, setTone] = useState("professional");
  const [targetWordCount, setTargetWordCount] = useState(2000);
  const [numSections, setNumSections] = useState(7);
  const [numFaqs, setNumFaqs] = useState(4);
  const [targetLocation, setTargetLocation] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Outline state
  const [outline, setOutline] = useState<GeneratedOutline | null>(null);
  const [outlineSettings, setOutlineSettings] = useState<OutlineSettings | null>(null);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  const [generatingArticle, setGeneratingArticle] = useState(false);
  const [error, setError] = useState("");

  // Editing state
  const [editingTitle, setEditingTitle] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // --- Generate Outline ---
  const handleGenerateOutline = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic or title.");
      return;
    }

    setGeneratingOutline(true);
    setError("");

    try {
      const res = await authFetch("/api/cms/generate-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          targetKeyword: targetKeyword.trim() || undefined,
          contentType,
          tone,
          targetWordCount,
          numSections,
          numFaqs,
          targetLocation: targetLocation.trim() || undefined,
          additionalInstructions: additionalInstructions.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Outline generation failed");

      setOutline(data.outline);
      setOutlineSettings(data.settings);
      setStep("review");
      // Expand all sections by default
      setExpandedSections(new Set(data.outline.sections.map((s: OutlineSection) => s.id)));
    } catch (err) {
      setError(String(err));
    } finally {
      setGeneratingOutline(false);
    }
  };

  // --- Generate Article from Outline ---
  const handleGenerateArticle = async () => {
    if (!outline) return;

    setGeneratingArticle(true);
    setStep("generating");
    setError("");

    try {
      const res = await authFetch("/api/cms/generate-from-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          outline,
          settings: outlineSettings,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Article generation failed");

      // Save as a draft and redirect to Smart Create
      const draftRes = await authFetch("/api/cms/drafts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: outline.title,
          rawContent: `[Generated from outline]\nKeyword: ${outlineSettings?.targetKeyword || topic}\nContent Type: ${outlineSettings?.contentType || "blog"}`,
          sections: data.sections,
          tableOfContents: data.tableOfContents,
          outline,
          outlineSettings,
          category: "General",
        }),
      });

      const draftData = await draftRes.json();
      if (!draftRes.ok) throw new Error(draftData.error ?? "Failed to save draft");

      // Redirect to Smart Create with the draft loaded
      router.push(`/admin/github-editor/create-smart?draft=${draftData.id}`);
    } catch (err) {
      setError(String(err));
      setStep("review");
    } finally {
      setGeneratingArticle(false);
    }
  };

  // --- Outline Editing Helpers ---
  const updateSectionHeading = (sectionId: string, heading: string) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId ? { ...s, heading } : s
      ),
    });
  };

  const updateSectionWordCount = (sectionId: string, count: number) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId ? { ...s, targetWordCount: count } : s
      ),
    });
  };

  const updateSectionPoint = (sectionId: string, pointIndex: number, value: string) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId
          ? { ...s, points: s.points.map((p, i) => (i === pointIndex ? value : p)) }
          : s
      ),
    });
  };

  const addSectionPoint = (sectionId: string) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId ? { ...s, points: [...s.points, ""] } : s
      ),
    });
  };

  const removeSectionPoint = (sectionId: string, pointIndex: number) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId
          ? { ...s, points: s.points.filter((_, i) => i !== pointIndex) }
          : s
      ),
    });
  };

  const removeSection = (sectionId: string) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.filter((s) => s.id !== sectionId),
    });
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    if (!outline) return;
    const idx = outline.sections.findIndex((s) => s.id === sectionId);
    if (idx === -1) return;
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === outline.sections.length - 1) return;

    const newSections = [...outline.sections];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    setOutline({ ...outline, sections: newSections });
  };

  const addSection = () => {
    if (!outline) return;
    const newId = `s${outline.sections.length + 1}`;
    const newSection: OutlineSection = {
      id: newId,
      heading: "New Section",
      type: "h2",
      points: ["Key point to cover"],
      targetWordCount: 200,
      subSections: [],
    };
    // Insert before the last section (conclusion)
    const sections = [...outline.sections];
    sections.splice(sections.length - 1, 0, newSection);
    setOutline({ ...outline, sections });
    setExpandedSections(new Set([...expandedSections, newId]));
  };

  const updateSubSectionHeading = (sectionId: string, subId: string, heading: string) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              subSections: s.subSections.map((sub) =>
                sub.id === subId ? { ...sub, heading } : sub
              ),
            }
          : s
      ),
    });
  };

  const updateSubSectionPoint = (sectionId: string, subId: string, pointIndex: number, value: string) => {
    if (!outline) return;
    setOutline({
      ...outline,
      sections: outline.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              subSections: s.subSections.map((sub) =>
                sub.id === subId
                  ? { ...sub, points: sub.points.map((p, i) => (i === pointIndex ? value : p)) }
                  : sub
              ),
            }
          : s
      ),
    });
  };

  const toggleSection = (sectionId: string) => {
    const next = new Set(expandedSections);
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    setExpandedSections(next);
  };

  // --- Auth states ---
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  const totalWordCount = outline
    ? outline.sections.reduce((sum, s) => sum + (s.targetWordCount || 0), 0)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CMSHeader onLogout={logout} />

      {/* Sub-header with step indicator */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wand2 className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-semibold text-gray-900">Create from Keyword</h2>
          </div>
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              step === "configure" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
            }`}>
              <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold">1</span>
              Configure
            </div>
            <ArrowRight className="w-3 h-3 text-gray-300" />
            <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              step === "review" ? "bg-purple-100 text-purple-700" : step === "generating" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
            }`}>
              <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold">2</span>
              Review Outline
            </div>
            <ArrowRight className="w-3 h-3 text-gray-300" />
            <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              step === "generating" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-400"
            }`}>
              <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold">3</span>
              Generate Article
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="max-w-5xl mx-auto px-6 mt-4">
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-600">&times;</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6">

          {/* ═══ STEP 1: CONFIGURE ═══ */}
          {step === "configure" && (
            <div className="max-w-2xl mx-auto space-y-5">
              {/* Topic Input */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      What do you want to write about? *
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full text-base font-medium border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter a keyword, title, or topic idea..."
                      onKeyDown={(e) => e.key === "Enter" && handleGenerateOutline()}
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                      Examples: &ldquo;medicare advantage costs 2026&rdquo; or &ldquo;How Much Does Medicare Advantage Cost in 2026?&rdquo;
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Target Keyword <span className="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={targetKeyword}
                      onChange={(e) => setTargetKeyword(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Primary SEO keyword to target"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                      If blank, the AI will determine the best keyword from your topic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Settings */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Content Type</label>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {CONTENT_TYPES.map((ct) => (
                        <option key={ct.value} value={ct.value}>{ct.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Tone</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {TONES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Word Count</label>
                    <input
                      type="number"
                      value={targetWordCount}
                      onChange={(e) => setTargetWordCount(Number(e.target.value))}
                      min={500}
                      max={8000}
                      step={100}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Sections</label>
                    <input
                      type="number"
                      value={numSections}
                      onChange={(e) => setNumSections(Number(e.target.value))}
                      min={3}
                      max={15}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Advanced Settings Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 mt-4 transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Advanced Settings
                  {showAdvanced ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>

                {showAdvanced && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Number of FAQs</label>
                        <input
                          type="number"
                          value={numFaqs}
                          onChange={(e) => setNumFaqs(Number(e.target.value))}
                          min={0}
                          max={10}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Target Location</label>
                        <input
                          type="text"
                          value={targetLocation}
                          onChange={(e) => setTargetLocation(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., South Florida"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Additional Instructions</label>
                      <textarea
                        value={additionalInstructions}
                        onChange={(e) => setAdditionalInstructions(e.target.value)}
                        rows={3}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        placeholder="Any specific instructions for the AI..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateOutline}
                disabled={generatingOutline || !topic.trim()}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-purple-600 text-white rounded-xl px-6 py-3.5 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingOutline ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Outline...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Outline
                  </>
                )}
              </button>
            </div>
          )}

          {/* ═══ STEP 2: REVIEW OUTLINE ═══ */}
          {step === "review" && outline && (
            <div className="space-y-5">
              {/* Outline Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {editingTitle ? (
                      <input
                        type="text"
                        value={outline.title}
                        onChange={(e) => setOutline({ ...outline, title: e.target.value })}
                        onBlur={() => setEditingTitle(false)}
                        onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                        autoFocus
                        className="w-full text-lg font-bold border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <h1
                        className="text-lg font-bold text-gray-900 cursor-pointer hover:text-purple-700 transition-colors group"
                        onClick={() => setEditingTitle(true)}
                      >
                        {outline.title}
                        <Edit3 className="w-3.5 h-3.5 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h1>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {outlineSettings?.targetKeyword}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {outline.sections.length} sections
                      </span>
                      <span>~{totalWordCount.toLocaleString()} words</span>
                      <span className="capitalize">{outlineSettings?.contentType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setStep("configure"); setOutline(null); }}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Start Over
                    </button>
                    <button
                      onClick={handleGenerateArticle}
                      disabled={generatingArticle}
                      className="flex items-center gap-1.5 text-sm font-semibold bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      {generatingArticle ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          Generate Article
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-3">
                {outline.sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    {/* Section Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedSections.has(section.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      <GripVertical className="w-3.5 h-3.5 text-gray-300" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase w-6">{section.type}</span>
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => updateSectionHeading(section.id, e.target.value)}
                        className="flex-1 text-sm font-semibold text-gray-800 bg-transparent border-none focus:outline-none focus:bg-white focus:border focus:border-purple-300 focus:rounded px-1 py-0.5 -ml-1"
                      />
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        ~{section.targetWordCount}w
                      </span>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => moveSection(section.id, "up")}
                          disabled={idx === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveSection(section.id, "down")}
                          disabled={idx === outline.sections.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeSection(section.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Section Body (expanded) */}
                    {expandedSections.has(section.id) && (
                      <div className="px-4 py-3 space-y-3">
                        {/* Word count target */}
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-500">Target words:</label>
                          <input
                            type="number"
                            value={section.targetWordCount}
                            onChange={(e) => updateSectionWordCount(section.id, Number(e.target.value))}
                            min={50}
                            max={1000}
                            step={25}
                            className="w-20 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>

                        {/* Key Points */}
                        <div>
                          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Key Points</label>
                          <div className="space-y-1.5">
                            {section.points.map((point, pi) => (
                              <div key={pi} className="flex items-start gap-2">
                                <span className="text-xs text-gray-300 mt-1.5 w-4 text-right shrink-0">{pi + 1}.</span>
                                <input
                                  type="text"
                                  value={point}
                                  onChange={(e) => updateSectionPoint(section.id, pi, e.target.value)}
                                  className="flex-1 text-sm border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                  placeholder="Key point..."
                                />
                                <button
                                  onClick={() => removeSectionPoint(section.id, pi)}
                                  className="p-1 text-gray-300 hover:text-red-500 mt-0.5"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addSectionPoint(section.id)}
                              className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium mt-1"
                            >
                              <Plus className="w-3 h-3" />
                              Add point
                            </button>
                          </div>
                        </div>

                        {/* Sub-sections */}
                        {section.subSections.length > 0 && (
                          <div className="ml-4 mt-3 space-y-2 border-l-2 border-purple-100 pl-3">
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Sub-sections (H3)</label>
                            {section.subSections.map((sub) => (
                              <div key={sub.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                                <input
                                  type="text"
                                  value={sub.heading}
                                  onChange={(e) => updateSubSectionHeading(section.id, sub.id, e.target.value)}
                                  className="w-full text-sm font-medium border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                                />
                                {sub.points.map((point, pi) => (
                                  <div key={pi} className="flex items-start gap-2 ml-2">
                                    <span className="text-xs text-gray-300 mt-1">-</span>
                                    <input
                                      type="text"
                                      value={point}
                                      onChange={(e) => updateSubSectionPoint(section.id, sub.id, pi, e.target.value)}
                                      className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Section Button */}
                <button
                  onClick={addSection}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 border-dashed rounded-xl py-3 hover:bg-purple-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>

              {/* Bottom Action Bar */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between sticky bottom-4">
                <div className="text-xs text-gray-500">
                  {outline.sections.length} sections &middot; ~{totalWordCount.toLocaleString()} total words
                </div>
                <button
                  onClick={handleGenerateArticle}
                  disabled={generatingArticle}
                  className="flex items-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-5 py-2.5 hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                  {generatingArticle ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Approve &amp; Generate Article
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ═══ STEP 3: GENERATING ═══ */}
          {step === "generating" && (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Your Article</h3>
              <p className="text-sm text-gray-500 mb-4">
                The AI is writing your full article based on the approved outline. This typically takes 30-60 seconds.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <p className="text-xs font-medium text-gray-600 mb-2">Writing with:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Brand voice &amp; ICP rules
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Medicare reference data (2026)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Per-section word count targets
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Eddie&apos;s Pro Tip included
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Post-transform validation
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default function CreateFromKeywordPage() {
  return (
    <Suspense fallback={null}>
      <CreateFromKeywordInner />
    </Suspense>
  );
}
