"use client";

import { useState, useEffect, useCallback } from "react";
import type { ArticleListItem } from "./article-card-grid";

interface UseArticlesOptions {
  authenticated: boolean;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
  typeFilter?: "all" | "blog" | "coverage";
}

export function useArticles({ authenticated, authFetch, typeFilter = "all" }: UseArticlesOptions) {
  const [allArticles, setAllArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch("/api/cms/articles");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load articles");
      setAllArticles(data.articles ?? []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [authenticated, authFetch]);

  useEffect(() => {
    if (authenticated) {
      loadArticles();
    }
  }, [authenticated, loadArticles]);

  // Filter by type
  const articles =
    typeFilter === "all"
      ? allArticles
      : allArticles.filter((a) => a.type === typeFilter);

  const blogCount = allArticles.filter((a) => a.type === "blog").length;
  const faqCount = allArticles.filter((a) => a.type === "coverage").length;
  const totalCount = allArticles.length;

  return {
    articles,
    allArticles,
    loading,
    error,
    blogCount,
    faqCount,
    totalCount,
    refresh: loadArticles,
  };
}
