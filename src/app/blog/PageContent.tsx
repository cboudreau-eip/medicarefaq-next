"use client";

/**
 * Blog Landing Page
 * Design: Grid layout with featured post hero, category filters, and card grid
 * Follows the Clarity System design language
 * Pagination: URL-based numbered pagination (/blog?page=2)
 */

import Link from "next/link";
import { Clock, ArrowRight, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { blogArticles } from "@/lib/blog-articles-data";

const POSTS_PER_PAGE = 12;

export default function Blog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  // Parse date string (e.g., "May 15, 2026") into a sortable timestamp
  const parseDate = (dateStr: string): number => {
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
  };

  // Sort by most recent date (uses dateUpdated if available, otherwise date)
  const sortByDate = (a: { date: string; dateUpdated?: string }, b: { date: string; dateUpdated?: string }) => {
    const dateA = parseDate(a.dateUpdated || a.date);
    const dateB = parseDate(b.dateUpdated || b.date);
    return dateB - dateA; // newest first
  };

  // Merge old static posts with new scraped articles
  const allPosts = [
    ...blogPosts.map((p) => ({ ...p, dateUpdated: undefined })),
    ...blogArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      categoryColor: a.categoryColor,
      date: a.date,
      dateUpdated: a.dateUpdated,
      author: a.author,
      reviewer: a.reviewer,
      readTime: a.readTime,
      featured: a.featured,
      image: a.image,
      imageAlt: a.imageAlt,
    })),
  ];

  // Deduplicate by slug
  const uniquePosts = allPosts.filter(
    (post, index, self) => self.findIndex((p) => p.slug === post.slug) === index
  );

  // Sort all posts by date (newest first)
  const allSorted = uniquePosts.sort(sortByDate);

  // Latest 2 posts become the "Latest Articles" hero row (only on page 1)
  const featuredPosts = currentPage === 1 ? allSorted.slice(0, 2) : [];
  const remainingPosts = currentPage === 1 ? allSorted.slice(2) : allSorted;

  // Pagination
  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = remainingPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number array with ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Page Header */}
        <section className={`bg-[#1B2A4A] ${currentPage === 1 ? "py-12 md:py-16" : "py-6 md:py-8"}`}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="text-sm text-white/50 mb-4">
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white/80">Blog</span>
              </nav>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white mb-4">
                Medicare News & Insights
              </h1>
              {currentPage === 1 && (
                <p className="text-white/70 text-lg max-w-2xl">
                  Expert articles, guides, and analysis to help you navigate Medicare
                  with confidence. Updated regularly by licensed professionals.
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Featured Posts — page 1 only */}
        {featuredPosts.length > 0 && (
          <section className="bg-white py-10 md:py-14">
            <div className="container">
              <h2 className="text-xs font-bold tracking-wider text-[#C41230] uppercase mb-6">
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={post.image}
                          alt={(post as any).imageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md text-white"
                            style={{ backgroundColor: post.categoryColor }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-[#1B2A4A] text-xl mb-2 leading-tight group-hover:text-[#1B2A4A]">
                          {post.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" aria-hidden="true" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="text-sm text-[#9CA3AF]">{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="bg-[#F5F7FA] py-10 md:py-14">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold tracking-wider text-[#1B2A4A] uppercase">
                {currentPage === 1 ? "All Articles" : `All Articles — Page ${currentPage}`}
              </h2>
              <span className="text-xs text-[#9CA3AF]">
                {remainingPosts.length} articles
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200 h-full"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={post.image}
                        alt={(post as any).imageAlt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md text-white"
                          style={{ backgroundColor: post.categoryColor }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col h-[calc(100%-176px)]">
                      <h3 className="font-bold text-[#1B2A4A] text-[15px] mb-2 leading-snug group-hover:text-[#1B2A4A] line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[#6B7280] text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-1.5">
                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F5F7FA] hover:border-[#1B2A4A] hover:text-[#1B2A4A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-[#9CA3AF] text-sm">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page as number)}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150 ${
                        currentPage === page
                          ? "bg-[#1B2A4A] text-white border border-[#1B2A4A]"
                          : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F5F7FA] hover:border-[#1B2A4A] hover:text-[#1B2A4A]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F5F7FA] hover:border-[#1B2A4A] hover:text-[#1B2A4A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Page indicator */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-[#9CA3AF] mt-4">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
