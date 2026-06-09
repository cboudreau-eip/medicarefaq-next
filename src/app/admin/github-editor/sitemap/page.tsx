"use client";

import "../sketch-theme.css";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Globe,
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  FileText,
  Loader2,
  Map,
} from "lucide-react";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export default function SitemapViewerPage() {
  const [sitemaps, setSitemaps] = useState<SitemapEntry[]>([]);
  const [selectedSitemap, setSelectedSitemap] = useState<string | null>(null);
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [urlsLoading, setUrlsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalUrls, setTotalUrls] = useState(0);

  const fetchIndex = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cms/sitemap-data?type=index");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSitemaps(data.sitemaps || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load sitemap index");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUrls = useCallback(async (sitemapLoc: string) => {
    setUrlsLoading(true);
    setSelectedSitemap(sitemapLoc);
    setError(null);
    try {
      const res = await fetch(
        `/api/cms/sitemap-data?type=urls&sitemap=${encodeURIComponent(sitemapLoc)}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUrls(data.urls || []);
      setTotalUrls(data.total || 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load sitemap URLs");
    } finally {
      setUrlsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIndex();
  }, [fetchIndex]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return d.toISOString().replace("T", " ").replace(/\.\d+Z$/, " +00:00");
    } catch {
      return dateStr;
    }
  };

  const getSitemapName = (loc: string) => {
    const parts = loc.replace(/\/$/, "").split("/");
    return parts[parts.length - 1] || loc;
  };

  // Back to index view
  const goBack = () => {
    setSelectedSitemap(null);
    setUrls([]);
    setTotalUrls(0);
  };

  return (
    <div className="min-h-screen sketch-paper-dots sketch-font-body flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-0 shrink-0">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/github-editor"
              className="text-gray-400 hover:text-gray-600 transition-colors mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Map className="w-5 h-5 text-teal-600" />
            <h1 className="text-base font-bold text-gray-900 tracking-tight">
              Sitemap Viewer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (selectedSitemap) fetchUrls(selectedSitemap);
                else fetchIndex();
              }}
              className="text-gray-400 hover:text-teal-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Raw XML
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Sitemap Index View */}
        {!selectedSitemap && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  This XML Sitemap Index file contains{" "}
                  <strong>{sitemaps.length}</strong> sitemaps.
                </p>

                <div className="sketch-section overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="text-left px-5 py-3 text-sm font-semibold">
                          Sitemap
                        </th>
                        <th className="text-left px-5 py-3 text-sm font-semibold w-56">
                          Last Modified
                        </th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sitemaps.map((sitemap, i) => (
                        <tr
                          key={i}
                          className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => fetchUrls(sitemap.loc)}
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-teal-500 shrink-0" />
                              <span className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                                {sitemap.loc}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-600">
                            {formatDate(sitemap.lastmod)}
                          </td>
                          <td className="px-3 py-3.5">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Sub-sitemap URL list view */}
        {selectedSitemap && (
          <div>
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sitemap Index
            </button>

            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-semibold text-gray-900">
                {getSitemapName(selectedSitemap)}
              </h2>
              {!urlsLoading && (
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                  {totalUrls} URLs
                </span>
              )}
            </div>

            {urlsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
              </div>
            ) : (
              <div className="sketch-section overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="text-left px-5 py-3 text-sm font-semibold">
                          URL
                        </th>
                        <th className="text-left px-5 py-3 text-sm font-semibold w-48">
                          Last Modified
                        </th>
                        <th className="text-left px-5 py-3 text-sm font-semibold w-32">
                          Change Freq
                        </th>
                        <th className="text-left px-5 py-3 text-sm font-semibold w-24">
                          Priority
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {urls.map((entry, i) => (
                        <tr
                          key={i}
                          className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-5 py-3">
                            <a
                              href={entry.loc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-teal-600 hover:text-teal-800 hover:underline font-medium break-all"
                            >
                              {entry.loc}
                            </a>
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {formatDate(entry.lastmod)}
                          </td>
                          <td className="px-5 py-3">
                            {entry.changefreq && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                                {entry.changefreq}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            {entry.priority && (
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  parseFloat(entry.priority) >= 0.8
                                    ? "bg-green-100 text-green-700"
                                    : parseFloat(entry.priority) >= 0.5
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {entry.priority}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
