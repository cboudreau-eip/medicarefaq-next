"use client";
/**
 * Full-Page Article Preview
 * 
 * Renders a preview of the article exactly as it would appear on the live site,
 * using the real BlogPostContent renderer inside SiteLayout.
 * 
 * Data is passed via sessionStorage (key: "cms_preview_article") from the
 * Smart Article Creator page. This avoids URL length limits and keeps
 * preview data ephemeral.
 */

import { useState, useEffect } from "react";
import { Loader2, ArrowLeft, Eye } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import BlogPostContent from "@/app/blog/[slug]/BlogPostContent";
import type { BlogArticleData } from "@/lib/article-types";

export default function PreviewPage() {
  const [article, setArticle] = useState<BlogArticleData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("cms_preview_article");
      if (!raw) {
        setError("No preview data found. Please use the 'Full Preview' button from the Smart Article Creator.");
        return;
      }
      const data = JSON.parse(raw) as BlogArticleData;
      setArticle(data);
    } catch (err) {
      setError("Failed to load preview data. Please try again from the Smart Article Creator.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Preview Unavailable</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <a
            href="/admin/github-editor/create-smart"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Smart Creator
          </a>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <>
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-purple-600 text-white text-center py-2 px-4 shadow-lg">
        <div className="flex items-center justify-center gap-3">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">
            Preview Mode — This is how your article will look when published
          </span>
          <a
            href="/admin/github-editor/create-smart"
            className="ml-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
          >
            Back to Editor
          </a>
        </div>
      </div>

      {/* Offset for the fixed banner */}
      <div className="pt-10">
        <SiteLayout>
          <BlogPostContent article={article} />
        </SiteLayout>
      </div>
    </>
  );
}
