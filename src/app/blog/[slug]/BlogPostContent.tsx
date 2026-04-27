"use client";
/**
 * Blog Post Content Renderer
 * Renders full blog articles from BlogArticleData with:
 * - Sticky TOC sidebar
 * - Section rendering (paragraph, heading, table, callout, list, faq)
 * - Markdown-style link parsing
 * - Author/reviewer card
 * - Key takeaways box
 * - Related articles CTA
 * - Helpful vote widget
 */
import { useState, useEffect } from "react";
import ZipFormModal from "@/components/ZipFormModal";
import Link from "next/link";
import {
  Clock,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Phone,
  ArrowRight,
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import type { BlogArticleData, BlogSectionContent } from "@/lib/article-types";
import { blogArticles } from "@/lib/blog-articles-data";
import { trackPhoneClick } from "@/lib/analytics";
/* ─── Markdown Inline Parser ─── */
// Parses **bold**, *italic*, and [text](url) in a string and returns React nodes
function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Combined regex: **bold**, *italic*, [text](url)
  const inlineRegex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]*)\))/g;
  let lastIndex = 0;
  let match;
  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[2] !== undefined) {
      // **bold**
      nodes.push(<strong key={`${keyPrefix}-b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      // *italic*
      nodes.push(<em key={`${keyPrefix}-i-${match.index}`}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      // [text](url)
      const linkText = match[4];
      const href = match[5];
      if (!href || href.trim() === "") {
        nodes.push(<strong key={`${keyPrefix}-l-${match.index}`}>{linkText}</strong>);
      } else {
        const isInternal = href.startsWith("/");
        nodes.push(
          isInternal ? (
            <Link
              key={`${keyPrefix}-l-${match.index}`}
              href={href}
              className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors"
            >
              {linkText}
            </Link>
          ) : (
            <a
              key={`${keyPrefix}-l-${match.index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors"
            >
              {linkText}
            </a>
          )
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function renderParagraph(text: string, key: number | string, className?: string) {
  return (
    <p key={key} className={className}>
      {parseInline(text, String(key))}
    </p>
  );
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F7FA] transition-colors"
      >
        <span className="font-semibold text-[#1B2A4A] text-[15px] pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#6B7280] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6B7280] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 text-[#4B5563] text-[15px] leading-relaxed border-t border-[#E5E7EB] pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ─── Section Renderer ─── */
function renderSection(section: BlogSectionContent, idx: number) {
  switch (section.type) {
    case "heading": {
      const Tag = section.level === 3 ? "h3" : "h2";
      const cls =
        section.level === 3
          ? "text-xl font-bold text-[#1B2A4A] mt-8 mb-3"
          : "text-2xl font-bold text-[#1B2A4A] mt-10 mb-4 pb-2 border-b border-[#E5E7EB]";
      return (
        <Tag key={idx} id={section.id} className={cls}>
          {section.text}
        </Tag>
      );
    }
    case "paragraph":
      return renderParagraph(
        section.content || "",
        idx,
        "text-[#374151] text-[16px] leading-relaxed mb-4"
      );
    case "list":
      return section.ordered ? (
        <ol key={idx} className="list-decimal list-outside ml-6 space-y-2 mb-4">
          {(section.items || []).map((item, i) => (
            <li key={i} className="text-[#374151] text-[16px] leading-relaxed">
              {renderParagraph(item, i)}
            </li>
          ))}
        </ol>
      ) : (
        <ul key={idx} className="list-disc list-outside ml-6 space-y-2 mb-4">
          {(section.items || []).map((item, i) => (
            <li key={i} className="text-[#374151] text-[16px] leading-relaxed">
              {renderParagraph(item, i)}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={idx} className="overflow-x-auto mb-6 rounded-lg border border-[#E5E7EB]">
          <table className="w-full text-sm">
            {section.headers && (
              <thead className="bg-[#1B2A4A] text-white">
                <tr>
                  {section.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {(section.rows || []).map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[#374151] border-t border-[#E5E7EB]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {section.footnote && (
            <p className="text-xs text-[#6B7280] px-4 py-2 bg-[#F9FAFB] border-t border-[#E5E7EB]">
              {section.footnote}
            </p>
          )}
        </div>
      );
    case "callout": {
      const calloutStyles = {
        warning: {
          bg: "bg-[#FEF3C7]",
          border: "border-[#FDE68A]",
          title: "text-[#92400E]",
          icon: AlertTriangle,
          iconColor: "text-[#D97706]",
        },
        info: {
          bg: "bg-[#EFF6FF]",
          border: "border-[#BFDBFE]",
          title: "text-[#1E40AF]",
          icon: Info,
          iconColor: "text-[#3B82F6]",
        },
        success: {
          bg: "bg-[#F0FDF4]",
          border: "border-[#BBF7D0]",
          title: "text-[#166534]",
          icon: CheckCircle,
          iconColor: "text-[#22C55E]",
        },
        tip: {
          bg: "bg-[#F5F3FF]",
          border: "border-[#DDD6FE]",
          title: "text-[#5B21B6]",
          icon: Lightbulb,
          iconColor: "text-[#7C3AED]",
        },
      };
      const style = calloutStyles[section.calloutType || "info"] || calloutStyles.info;
      const Icon = style.icon;
      return (
        <div
          key={idx}
          className={`${style.bg} ${style.border} border rounded-xl p-5 mb-6`}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 ${style.iconColor} shrink-0 mt-0.5`} />
            <div>
              {section.calloutTitle && (
                <p className={`font-bold text-sm mb-1 ${style.title}`}>
                  {section.calloutTitle}
                </p>
              )}
              <p className="text-[#374151] text-[15px] leading-relaxed">
                {section.calloutText}
              </p>
            </div>
          </div>
        </div>
      );
    }
    case "faq":
      return (
        <div key={idx} className="space-y-3 mb-6">
          {(section.faqs || []).map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      );
    default:
      return null;
  }
}

/* ─── Main Component ─── */
export default function BlogPostContent({ article }: { article: BlogArticleData }) {
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  // Scroll spy
  useEffect(() => {
    if (!article.tableOfContents?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );
    article.tableOfContents.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="flex-1">
      {/* ─── Article Header ─── */}
      <section className="bg-[#1B2A4A] py-10 md:py-14">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase"
                style={{ backgroundColor: article.categoryColor || "#2563EB" }}
              >
                {article.category}
              </span>
            </div>

            {/* Breadcrumb */}
            <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/blog" className="hover:text-white/80 transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/70">{article.title}</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5 max-w-3xl">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#C41230] flex items-center justify-center text-white text-xs font-bold">
                  {article.author?.charAt(0) || "A"}
                </span>
                {article.author}
              </span>
              {article.reviewer && (
                <span className="text-white/40">
                  Reviewed by{" "}
                  <span className="text-white/60">{article.reviewer}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Article Body + Sidebar ─── */}
      <section className="bg-[#F5F7FA] py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex gap-8 items-start">
            {/* Main content */}
            <article className="flex-1 min-w-0">
              {/* Hero image */}
              {article.image && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}

              {/* Key takeaways */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 shadow-sm">
                  <h2 className="text-lg font-bold text-[#1B2A4A] mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#C41230]" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2">
                    {article.keyTakeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#374151] text-[15px]">
                        <CheckCircle className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article sections */}
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                {(() => {
                  const elements: React.ReactNode[] = [];
                  let i = 0;
                  while (i < article.sections.length) {
                    const section = article.sections[i];
                    // Detect h3 heading followed by numbered paragraphs → wrap in soft-gray box
                    if (
                      section.type === "heading" &&
                      section.level === 3
                    ) {
                      const groupStart = i;
                      const groupItems: typeof article.sections = [section];
                      let j = i + 1;
                      while (
                        j < article.sections.length &&
                        article.sections[j].type === "paragraph" &&
                        /^\d+\.\s/.test(article.sections[j].content || "")
                      ) {
                        groupItems.push(article.sections[j]);
                        j++;
                      }
                      if (groupItems.length > 1) {
                        // Render as a soft-gray highlighted box
                        elements.push(
                          <div
                            key={`group-${groupStart}`}
                            className="bg-[#F3F4F6] rounded-xl p-5 md:p-6 my-6 border border-[#E5E7EB]"
                          >
                            {groupItems.map((s, gi) => renderSection(s, groupStart + gi))}
                          </div>
                        );
                        i = j;
                        continue;
                      }
                    }
                    elements.push(renderSection(section, i));
                    i++;
                  }
                  return elements;
                })()}
              </div>

              {/* Bottom FAQs */}
              {article.faqs && article.faqs.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {article.faqs.map((faq, i) => (
                      <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              )}

              {/* Helpful vote */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 text-center shadow-sm">
                <p className="text-[#1B2A4A] font-semibold mb-4">
                  Was this article helpful?
                </p>
                {helpfulVote === null ? (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setHelpfulVote("yes")}
                      className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E7EB] rounded-lg hover:bg-[#F0FDF4] hover:border-[#059669] transition-colors text-[#374151] text-sm font-medium"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes, helpful
                    </button>
                    <button
                      onClick={() => setHelpfulVote("no")}
                      className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E7EB] rounded-lg hover:bg-[#FEF2F2] hover:border-[#EF4444] transition-colors text-[#374151] text-sm font-medium"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      Not helpful
                    </button>
                  </div>
                ) : (
                  <p className="text-[#059669] font-medium">
                    {helpfulVote === "yes"
                      ? "Thanks for your feedback!"
                      : "Thanks — we'll work to improve this article."}
                  </p>
                )}
              </div>

              {/* Related Articles */}
              {article.relatedSlugs && article.relatedSlugs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1B2A4A] mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#C41230]" />
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {article.relatedSlugs.slice(0, 4).map((relSlug) => {
                      const rel = blogArticles.find(a => a.slug === relSlug);
                      if (!rel) return null;
                      return (
                        <Link
                          key={relSlug}
                          href={`/blog/${relSlug}`}
                          className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-xl hover:border-[#C41230] hover:bg-[#FFF5F7] transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#1B2A4A] text-sm leading-snug group-hover:text-[#C41230] transition-colors line-clamp-2">{rel.title}</p>
                            <p className="text-xs text-[#6B7280] mt-1">{rel.readTime}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#C41230] shrink-0 mt-0.5 transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA Banner */}
              <div className="bg-[#1B2A4A] rounded-xl p-6 md:p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-2">
                  Have Medicare questions?
                </h3>
                <p className="text-white/70 mb-5 text-sm">
                  Our licensed Medicare agents are available to help you find the right coverage.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+18884410465"
              onClick={() => trackPhoneClick({ phone_number: "(888) 441-0465", page_section: "blog_post" })}
                    className="flex items-center justify-center gap-2 bg-[#C41230] hover:bg-[#A50E28] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call 1-888-441-0465
                  </a>
                  <ZipFormModal
                    coverageType="ms"
                    triggerLabel="Compare Rates"
                    triggerClassName="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"              pageSection="blog_post"
                triggerId="compare-plans-blog-post" />
                </div>
              </div>
            </article>

            {/* ─── Sticky TOC Sidebar ─── */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">
                    In This Article
                  </h3>
                  <nav className="space-y-1">
                    {article.tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? "bg-[#EFF6FF] text-[#1D4ED8] font-medium"
                            : "text-[#4B5563] hover:bg-[#F5F7FA] hover:text-[#1B2A4A]"
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Sidebar CTA */}
                <div className="mt-4 bg-[#C41230] rounded-xl p-5 text-white text-center">
                  <p className="font-bold text-sm mb-1">Free Medicare Help</p>
                  <p className="text-white/80 text-xs mb-3">
                    Speak with a licensed agent today
                  </p>
                  <a
                    href="tel:+18884410465"
              onClick={() => trackPhoneClick({ phone_number: "(888) 441-0465", page_section: "blog_post" })}
                    className="block bg-white text-[#C41230] font-bold text-sm py-2 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    1-888-441-0465
                  </a>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
