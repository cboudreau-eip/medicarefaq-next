"use client";

import "../../sketch-theme.css";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Save,
  ExternalLink,
  Code2,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  MessageSquareText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useCMSAuth } from "../../components/use-cms-auth";
import LoginScreen from "../../components/login-screen";

const SITE_BASE = "https://www.medicarefaq.com";

interface PageMetaData {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: string;
  robotsIndex: boolean | null;
  robotsFollow: boolean | null;
  hasMetadata: boolean;
}

interface NamedSchemaDTO {
  name: string;
  type: string;
  raw: string;
}

interface LoadedPage {
  route: string;
  file: string;
  sha: string;
  seoEditable: boolean;
  contentEditable: boolean;
  meta: PageMetaData;
  schemas: NamedSchemaDTO[];
}

interface SchemaDraft {
  /** existing var name (empty for new) */
  name: string;
  /** detected @type */
  type: string;
  /** editable JSON text */
  json: string;
  /** newName for inserts */
  newName?: string;
  isNew?: boolean;
}

const SCHEMA_TEMPLATES: Record<string, object> = {
  WebPage: { "@context": "https://schema.org", "@type": "WebPage", name: "", description: "", url: "" },
  FAQPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [{ "@type": "Question", name: "", acceptedAnswer: { "@type": "Answer", text: "" } }],
  },
  BreadcrumbList: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" }],
  },
  Article: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "",
    description: "",
    url: "",
    author: { "@type": "Organization", name: "MedicareFAQ" },
  },
};

/** Convert a JS object literal (from the parser) into pretty JSON for editing. */
function literalToJson(raw: string): string {
  try {
    // The raw is a JS object literal; try JSON.parse first (works when keys are quoted).
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    // Fall back: best-effort convert unquoted keys + single quotes to JSON.
    try {
      const jsonish = raw
        .replace(/([{,]\s*)([A-Za-z_@$][\w@$]*)\s*:/g, '$1"$2":')
        .replace(/'/g, '"')
        .replace(/,(\s*[}\]])/g, "$1");
      return JSON.stringify(JSON.parse(jsonish), null, 2);
    } catch {
      return raw; // show as-is; user can fix
    }
  }
}

function CharCounter({ value, min, max }: { value: string; min: number; max: number }) {
  const len = value.length;
  let color = "text-amber-600";
  if (len >= min && len <= max) color = "text-green-600";
  else if (len > max) color = "text-red-600";
  return (
    <span className={`text-xs font-medium ${color}`}>
      {len} chars (ideal {min}–{max})
    </span>
  );
}

function EditorInner() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();
  const searchParams = useSearchParams();
  const file = searchParams.get("file") || "";

  const [data, setData] = useState<LoadedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // editable form state
  const [meta, setMeta] = useState<PageMetaData | null>(null);
  const [robotsNoindex, setRobotsNoindex] = useState(false);
  const [schemas, setSchemas] = useState<SchemaDraft[]>([]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // FAQ content editing (state Medigap pages only)
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[] | null>(null);
  const [faqLoading, setFaqLoading] = useState(false);
  const [faqSaving, setFaqSaving] = useState(false);
  const [faqError, setFaqError] = useState<string | null>(null);
  const [faqSuccess, setFaqSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!file) {
      setError("No page specified.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await authFetch(`/api/cms/page-meta?file=${encodeURIComponent(file)}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      const loaded = json as LoadedPage;
      setData(loaded);
      setMeta(loaded.meta);
      setRobotsNoindex(loaded.meta.robotsIndex === false);
      const drafts: SchemaDraft[] = loaded.schemas.map((s) => ({
        name: s.name,
        type: s.type || "Schema",
        json: literalToJson(s.raw),
      }));
      setSchemas(drafts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load page metadata");
    } finally {
      setLoading(false);
    }
  }, [file, authFetch]);

  useEffect(() => {
    if (authenticated) load();
  }, [authenticated, load]);

  const updateMeta = (patch: Partial<PageMetaData>) =>
    setMeta((m) => (m ? { ...m, ...patch } : m));

  const addSchema = (templateKey: string) => {
    const tpl = SCHEMA_TEMPLATES[templateKey];
    setSchemas((s) => [
      ...s,
      {
        name: "",
        type: templateKey,
        json: JSON.stringify(tpl, null, 2),
        newName: `${templateKey.charAt(0).toLowerCase()}${templateKey.slice(1)}Schema`,
        isNew: true,
      },
    ]);
  };

  const removeSchema = (idx: number) =>
    setSchemas((s) => s.filter((_, i) => i !== idx));

  const updateSchema = (idx: number, json: string) =>
    setSchemas((s) => s.map((d, i) => (i === idx ? { ...d, json } : d)));

  // Load FAQ content for content-editable state pages.
  const loadFaqs = useCallback(async () => {
    if (!file) return;
    setFaqLoading(true);
    setFaqError(null);
    setFaqSuccess(null);
    try {
      const res = await authFetch(`/api/cms/state-faq?file=${encodeURIComponent(file)}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Failed to load FAQs");
      setFaqs(json.entries || []);
    } catch (err: unknown) {
      setFaqError(err instanceof Error ? err.message : "Failed to load FAQs");
    } finally {
      setFaqLoading(false);
    }
  }, [file, authFetch]);

  // Auto-load FAQs once the page is known to be content-editable.
  useEffect(() => {
    if (data?.contentEditable && faqs === null && !faqLoading) {
      loadFaqs();
    }
  }, [data, faqs, faqLoading, loadFaqs]);

  const updateFaq = (idx: number, patch: Partial<{ question: string; answer: string }>) =>
    setFaqs((f) => (f ? f.map((e, i) => (i === idx ? { ...e, ...patch } : e)) : f));
  const addFaq = () =>
    setFaqs((f) => [...(f || []), { question: "", answer: "" }]);
  const removeFaq = (idx: number) =>
    setFaqs((f) => (f ? f.filter((_, i) => i !== idx) : f));
  const moveFaq = (idx: number, dir: -1 | 1) =>
    setFaqs((f) => {
      if (!f) return f;
      const j = idx + dir;
      if (j < 0 || j >= f.length) return f;
      const copy = [...f];
      [copy[idx], copy[j]] = [copy[j], copy[idx]];
      return copy;
    });

  const handleSaveFaqs = async () => {
    if (!data || !faqs) return;
    setFaqSaving(true);
    setFaqError(null);
    setFaqSuccess(null);
    for (const e of faqs) {
      if (!e.question.trim() || !e.answer.trim()) {
        setFaqError("Every FAQ needs a non-empty question and answer.");
        setFaqSaving(false);
        return;
      }
    }
    try {
      const res = await authFetch("/api/cms/state-faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: data.file, entries: faqs }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Publish failed");
      setFaqSuccess(`Published ${json.count} FAQs. Commit ${String(json.commitSha || "").slice(0, 7)}.`);
      setTimeout(loadFaqs, 1200);
    } catch (err: unknown) {
      setFaqError(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setFaqSaving(false);
    }
  };

  const handleSave = async () => {
    if (!data || !meta) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    // Validate schema JSON locally first.
    for (const d of schemas) {
      try {
        JSON.parse(d.json);
      } catch {
        setError(`Schema "${d.type}" is not valid JSON. Please fix it before saving.`);
        setSaving(false);
        return;
      }
    }

    const schemaEdits = schemas.map((d) => ({
      name: d.isNew ? undefined : d.name || undefined,
      matchType: d.isNew ? undefined : d.type,
      newName: d.newName,
      json: d.json,
    }));

    try {
      const res = await authFetch("/api/cms/page-meta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: data.file,
          meta: {
            title: meta.title,
            description: meta.description,
            canonical: meta.canonical,
            ogTitle: meta.ogTitle,
            ogDescription: meta.ogDescription,
            ogUrl: meta.ogUrl,
            ogImage: meta.ogImage,
          },
          robots: { index: !robotsNoindex, follow: !robotsNoindex },
          schemaEdits,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Publish failed");
      setSuccess(`Published. Changes: ${(json.applied || []).join(", ")}. Commit ${String(json.commitSha || "").slice(0, 7)}.`);
      // Reload to reflect committed state.
      setTimeout(load, 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
      </div>
    );
  }
  if (!authenticated) return <LoginScreen onLogin={login} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdfbf3" }}>
      {/* Sub-header */}
      <div className="sticky top-0 z-10 bg-white border-b-[3px] border-[#2b2b2b] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin/github-editor/pages" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[#2b2b2b] truncate">Edit Page SEO &amp; Schema</h1>
            {data && <p className="text-xs text-[#888888] font-mono truncate">{data.route}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {data && (
            <a
              href={`${SITE_BASE}${data.route}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm px-3 py-2 border-[2px] border-[#2b2b2b] bg-white hover:-translate-y-0.5 transition-all"
              style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
            >
              <ExternalLink className="w-4 h-4" /> View live
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving || loading || !meta}
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 border-[2.5px] border-[#2b2b2b] bg-[#7ed957] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all text-[#2b2b2b] disabled:opacity-50"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Publish to GitHub
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b] mr-3" />
            <span className="text-base text-[#555555]">Loading metadata...</span>
          </div>
        )}
        {error && (
          <div className="flex items-start gap-2 text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-4 py-3 rounded-lg">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2 text-sm text-green-800 bg-green-50 border-[2px] border-green-600 px-4 py-3 rounded-lg">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {success}
          </div>
        )}

        {!loading && meta && data && (
          <>
            {!meta.hasMetadata && (
              <div className="flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border-[2px] border-amber-500 px-4 py-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                This page has no inline <code>export const metadata</code> block, so SEO text
                fields can&apos;t be edited here. You can still add or edit JSON-LD schema below.
              </div>
            )}

            {/* SEO metadata card */}
            <section className="bg-white border-[3px] border-[#2b2b2b] rounded-xl p-6 space-y-5" style={{ borderRadius: "18px 6px 18px 6px / 6px 18px 6px 18px" }}>
              <h2 className="text-xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>SEO Metadata</h2>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-[#2b2b2b]">Meta Title</label>
                  <CharCounter value={meta.title} min={50} max={60} />
                </div>
                <input
                  type="text"
                  value={meta.title}
                  disabled={!meta.hasMetadata}
                  onChange={(e) => updateMeta({ title: e.target.value })}
                  className="w-full px-3 py-2.5 border-[2px] border-[#2b2b2b] rounded-lg focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b] disabled:bg-gray-100"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-[#2b2b2b]">Meta Description</label>
                  <CharCounter value={meta.description} min={150} max={160} />
                </div>
                <textarea
                  value={meta.description}
                  disabled={!meta.hasMetadata}
                  onChange={(e) => updateMeta({ description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 border-[2px] border-[#2b2b2b] rounded-lg focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#2b2b2b] block mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={meta.canonical}
                  disabled={!meta.hasMetadata}
                  onChange={(e) => updateMeta({ canonical: e.target.value })}
                  className="w-full px-3 py-2.5 border-[2px] border-[#2b2b2b] rounded-lg font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b] disabled:bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#2b2b2b] block mb-1">OG Title</label>
                  <input
                    type="text"
                    value={meta.ogTitle}
                    disabled={!meta.hasMetadata}
                    onChange={(e) => updateMeta({ ogTitle: e.target.value })}
                    className="w-full px-3 py-2.5 border-[2px] border-[#2b2b2b] rounded-lg focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#2b2b2b] block mb-1">OG Image URL</label>
                  <input
                    type="text"
                    value={meta.ogImage}
                    disabled={!meta.hasMetadata}
                    placeholder="(inherits site default if empty)"
                    onChange={(e) => updateMeta({ ogImage: e.target.value })}
                    className="w-full px-3 py-2.5 border-[2px] border-[#2b2b2b] rounded-lg font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b] disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#2b2b2b] block mb-1">OG Description</label>
                <textarea
                  value={meta.ogDescription}
                  disabled={!meta.hasMetadata}
                  onChange={(e) => updateMeta({ ogDescription: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2.5 border-[2px] border-[#2b2b2b] rounded-lg focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b] disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-[#2b2b2b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsNoindex}
                  disabled={!meta.hasMetadata}
                  onChange={(e) => setRobotsNoindex(e.target.checked)}
                  className="w-4 h-4"
                />
                Set <code>noindex, nofollow</code> (hide this page from search engines)
              </label>
            </section>

            {/* Schema card */}
            <section className="bg-white border-[3px] border-[#2b2b2b] rounded-xl p-6 space-y-4" style={{ borderRadius: "18px 6px 18px 6px / 6px 18px 6px 18px" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive" }}>
                  JSON-LD Schema
                </h2>
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addSchema(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    defaultValue=""
                    className="text-sm px-3 py-2 border-[2px] border-[#2b2b2b] rounded-lg bg-white"
                  >
                    <option value="">+ Add schema…</option>
                    {Object.keys(SCHEMA_TEMPLATES).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {schemas.length === 0 && (
                <p className="text-sm text-[#888888]">
                  No JSON-LD schema on this page yet. Use “Add schema” to insert one.
                </p>
              )}

              {schemas.map((d, idx) => (
                <div key={idx} className="border-[2px] border-[#cfcabb] rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b2b2b]">
                      <Code2 className="w-4 h-4" /> {d.type}
                      {d.isNew && <span className="text-xs text-purple-600">(new)</span>}
                    </span>
                    <button
                      onClick={() => removeSchema(idx)}
                      className="text-gray-400 hover:text-red-500"
                      title="Remove from editor (won't delete on save unless you also remove from page)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {d.isNew && (
                    <input
                      type="text"
                      value={d.newName || ""}
                      onChange={(e) =>
                        setSchemas((s) => s.map((x, i) => (i === idx ? { ...x, newName: e.target.value } : x)))
                      }
                      placeholder="schema variable name"
                      className="w-full px-2 py-1.5 border-[2px] border-[#2b2b2b] rounded font-mono text-xs"
                    />
                  )}
                  <textarea
                    value={d.json}
                    onChange={(e) => updateSchema(idx, e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border-[2px] border-[#2b2b2b] rounded-lg font-mono text-xs focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b]"
                    spellCheck={false}
                  />
                </div>
              ))}
            </section>

            {/* FAQ content card (state Medigap pages only) */}
            {data.contentEditable && (
              <section className="bg-white border-[3px] border-[#2b2b2b] rounded-xl p-6 space-y-4" style={{ borderRadius: "18px 6px 18px 6px / 6px 18px 6px 18px" }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#2b2b2b] flex items-center gap-2" style={{ fontFamily: "'Caveat', cursive" }}>
                    <MessageSquareText className="w-5 h-5" /> Page FAQs (body content)
                  </h2>
                  <button
                    onClick={handleSaveFaqs}
                    disabled={faqSaving || faqLoading || !faqs}
                    className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 border-[2.5px] border-[#2b2b2b] bg-[#7ed957] hover:shadow-[3px_3px_0_#2b2b2b] hover:-translate-y-0.5 transition-all text-[#2b2b2b] disabled:opacity-50"
                    style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                  >
                    {faqSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Publish FAQs
                  </button>
                </div>

                <p className="text-xs text-[#888888]">
                  These FAQs render in the page&apos;s accordion and feed its data file. Editing here
                  commits to <code>src/lib/&lt;state&gt;-medigap-data.ts</code>.
                </p>

                {faqError && (
                  <div className="flex items-start gap-2 text-sm text-[#c0392b] bg-[#fef2f2] border-[2px] border-[#c0392b] px-4 py-3 rounded-lg">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {faqError}
                  </div>
                )}
                {faqSuccess && (
                  <div className="flex items-start gap-2 text-sm text-green-800 bg-green-50 border-[2px] border-green-600 px-4 py-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {faqSuccess}
                  </div>
                )}

                {faqLoading && (
                  <div className="flex items-center gap-2 text-sm text-[#555555] py-4">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading FAQs...
                  </div>
                )}

                {!faqLoading && faqs && faqs.map((e, idx) => (
                  <div key={idx} className="border-[2px] border-[#cfcabb] rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#888888]">FAQ {idx + 1}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveFaq(idx, -1)} disabled={idx === 0} className="text-gray-400 hover:text-[#2b2b2b] disabled:opacity-30" title="Move up">
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button onClick={() => moveFaq(idx, 1)} disabled={idx === faqs.length - 1} className="text-gray-400 hover:text-[#2b2b2b] disabled:opacity-30" title="Move down">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeFaq(idx)} className="text-gray-400 hover:text-red-500" title="Remove FAQ">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={e.question}
                      onChange={(ev) => updateFaq(idx, { question: ev.target.value })}
                      placeholder="Question"
                      className="w-full px-3 py-2 border-[2px] border-[#2b2b2b] rounded-lg text-sm font-semibold focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b]"
                    />
                    <textarea
                      value={e.answer}
                      onChange={(ev) => updateFaq(idx, { answer: ev.target.value })}
                      placeholder="Answer"
                      rows={4}
                      className="w-full px-3 py-2 border-[2px] border-[#2b2b2b] rounded-lg text-sm focus:outline-none focus:shadow-[2px_2px_0_#2b2b2b]"
                    />
                  </div>
                ))}

                {!faqLoading && faqs && (
                  <button
                    onClick={addFaq}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-2 border-[2px] border-dashed border-[#2b2b2b] bg-white hover:bg-[#fffdf2] transition-all"
                    style={{ borderRadius: "120px 8px 120px 8px / 8px 120px 8px 120px" }}
                  >
                    <Plus className="w-4 h-4" /> Add FAQ
                  </button>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function PageMetaEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}>
          <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}
