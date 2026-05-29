"use client";

import { Loader2 } from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import { useArticles } from "../components/use-articles";
import LoginScreen from "../components/login-screen";
import CMSHeader from "../components/cms-header";
import ArticleCardGrid from "../components/article-card-grid";

export default function FAQArticlesPage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();
  const { articles, loading, error, blogCount, faqCount, totalCount, refresh } = useArticles({
    authenticated,
    authFetch,
    typeFilter: "coverage",
  });

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CMSHeader
        totalCount={totalCount}
        blogCount={blogCount}
        faqCount={faqCount}
        onRefresh={refresh}
        onLogout={logout}
      />
      <ArticleCardGrid
        articles={articles}
        loading={loading}
        error={error}
        pageTitle="FAQ Articles"
      />
    </div>
  );
}
