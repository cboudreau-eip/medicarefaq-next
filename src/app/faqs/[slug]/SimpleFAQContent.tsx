"use client";

/**
 * Simple FAQ Article Content
 * Renders FAQ articles with headings + paragraphs, TOC sidebar, helpful vote, CTA banner.
 * Supports rich sections (tables, callouts, lists, FAQs) via the richSections field.
 * Includes FAQ schema, Article schema, and Breadcrumb schema for SEO.
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  User,
  Calendar,
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
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import type { SimpleFAQArticleData, BlogSectionContent } from "@/lib/article-types";
import FAQSchema from "@/components/schema/FAQSchema";
import ArticleSchema from "@/components/schema/ArticleSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { trackPhoneClick, trackCtaClick } from "@/lib/analytics";
import { getAuthorPhoto } from "@/lib/authors";
import ZipFormModal from "@/components/ZipFormModal";

const BASE_URL = "https://www.medicarefaq.com";

/* ─── Render markdown-style [text](url) links within text ─── */
function renderInlineLinks(text: string, key: number | string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, href] = match;
    const isInternal = href.startsWith("/");
    parts.push(
      isInternal ? (
        <Link key={`link-${key}-${match.index}`} href={href} className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors">
          {linkText}
        </Link>
      ) : (
        <a key={`link-${key}-${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors">
          {linkText}
        </a>
      )
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

/* ─── Render paragraph with markdown links ─── */
function renderParagraph(text: string, key: number | string, className?: string) {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]*)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, href] = match;
    if (!href || href.trim() === "") {
      parts.push(<strong key={`bold-${match.index}`}>{linkText}</strong>);
    } else {
      const isInternal = href.startsWith("/");
      parts.push(
        isInternal ? (
          <Link key={`link-${match.index}`} href={href} className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors">
            {linkText}
          </Link>
        ) : (
          <a key={`link-${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors">
            {linkText}
          </a>
        )
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return (
    <p key={key} className={className || "text-[#374151] text-[16px] leading-relaxed mb-4"}>
      {parts}
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
          {renderInlineLinks(answer, "faq-answer")}
        </div>
      )}
    </div>
  );
}

/* ─── Rich Section Renderer (tables, callouts, lists, FAQs) ─── */
function renderRichSection(section: BlogSectionContent, idx: number) {
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
              {renderInlineLinks(item, i)}
            </li>
          ))}
        </ol>
      ) : (
        <ul key={idx} className="list-disc list-outside ml-6 space-y-2 mb-4">
          {(section.items || []).map((item, i) => (
            <li key={i} className="text-[#374151] text-[16px] leading-relaxed">
              {renderInlineLinks(item, i)}
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
                      {renderInlineLinks(cell, `${ri}-${ci}`)}
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
                {renderInlineLinks(section.calloutText || "", idx)}
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

export default function SimpleFAQContent({ article, blogSlugs }: { article: SimpleFAQArticleData; blogSlugs: Set<string> }) {
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  // Determine if using rich sections
  const useRich = article.richSections && article.richSections.length > 0;

  // Build TOC from sections
  const toc = useRich
    ? article.richSections!
        .filter((s) => s.type === "heading" && s.level === 2)
        .map((s) => ({ id: s.id || "", label: s.text || "" }))
    : article.sections
        .filter((s) => s.heading)
        .map((s, i) => ({ id: `section-${i}`, label: s.heading }));

  // Extract FAQ items from richSections for schema
  const faqSchemaItems = useRich
    ? article.richSections!
        .filter((s) => s.type === "faq")
        .flatMap((s) => (s.faqs || []).map((f) => ({ q: f.question, a: f.answer })))
    : [];

  // Scroll spy
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );
    toc.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article, toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const pageUrl = `${BASE_URL}/faqs/${article.slug}/`;

  return (
    <main className="flex-1">
      {/* ─── JSON-LD Schema ─── */}
      <ArticleSchema
        title={article.seo?.title || article.title}
        description={article.seo?.description || article.summary}
        url={pageUrl}
        datePublished={article.datePublished || article.dateUpdated}
        dateModified={article.dateUpdated}
        authorName={article.author}
        authorUrl={article.authorUrl ? `${BASE_URL}${article.authorUrl}` : undefined}
        imageUrl={article.seo?.ogImage || undefined}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${BASE_URL}/` },
          { name: "FAQs", url: `${BASE_URL}/faqs/` },
          { name: article.title },
        ]}
      />
      {faqSchemaItems.length > 0 && <FAQSchema faqs={faqSchemaItems} />}

      {/* ─── Article Header ─── */}
      <section className="bg-[#1B2A4A] py-10 md:py-14">
        <div className="container max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                {article.category || "FAQ"}
              </span>
            </div>
            <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/faqs" className="hover:text-white/80 transition-colors">FAQs</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/70">{article.title}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-5">
              {article.title}
            </h1>
            {article.summary && (
              <p className="text-white/60 text-lg max-w-3xl mb-6">{article.summary}</p>
            )}
            {/* ─── Metadata Row ─── */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              {article.datePublished && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />Published {article.datePublished}
                </span>
              )}
              {article.dateUpdated && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />Last Reviewed {article.dateUpdated}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />{article.readTime}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Author / Reviewer Trust Bar ─── */}
      {(article.author || article.reviewer) && (
        <section className="bg-white border-b border-[#E5E7EB] py-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-6">
              {article.author && (
                <div className="flex items-center gap-3">
                  {getAuthorPhoto(article.author as string) ? (
                    <img
                      src={getAuthorPhoto(article.author as string)}
                      alt={article.author as string}
                      className="w-14 h-14 rounded-full object-cover shrink-0" style={{ objectPosition: 'center 20%' }}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#1B2A4A] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-sm">
                    <p className="text-[#6B7280] text-xs uppercase tracking-wide font-semibold">Written By</p>
                    {article.authorUrl ? (
                      <Link href={article.authorUrl} className="font-semibold text-[#1B2A4A] hover:text-[#C41230] transition-colors">
                        {article.author}
                      </Link>
                    ) : (
                      <span className="font-semibold text-[#1B2A4A]">{article.author}</span>
                    )}
                    {article.authorTitle && (
                      <p className="text-[#6B7280] text-xs">{article.authorTitle}</p>
                    )}
                  </div>
                </div>
              )}
              {article.reviewer && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="text-[#6B7280] text-xs uppercase tracking-wide font-semibold">Reviewed By</p>
                    {article.reviewerUrl ? (
                      <Link href={article.reviewerUrl} className="font-semibold text-[#1B2A4A] hover:text-[#C41230] transition-colors">
                        {article.reviewer}
                      </Link>
                    ) : (
                      <span className="font-semibold text-[#1B2A4A]">{article.reviewer}</span>
                    )}
                    {article.reviewerTitle && (
                      <p className="text-[#6B7280] text-xs">{article.reviewerTitle}</p>
                    )}
                  </div>
                </div>
              )}
              {/* Editorial Standards badge */}
              <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-[#6B7280]">
                <Shield className="w-4 h-4 text-[#059669]" />
                <Link href="/meet-the-editorial-team" className="hover:text-[#1B2A4A] transition-colors">
                  Editorial Standards
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Content + Sidebar ─── */}
      <section className="py-8 md:py-12">
        <div className="container max-w-6xl mx-auto">
          <div className="flex gap-8 lg:gap-10">
            {/* ─── Main Article Content ─── */}
            <article className="flex-1 min-w-0">
              <div className="prose prose-lg max-w-none">
                {useRich ? (
                  /* ─── Rich Sections (tables, callouts, lists, FAQs) ─── */
                  article.richSections!.map((section, i) => renderRichSection(section, i))
                ) : (
                  /* ─── Legacy Simple Sections (heading + paragraphs) ─── */
                  article.sections.map((section, i) => (
                    <div key={i} id={`section-${i}`} className="mb-8">
                      {section.heading && (
                        <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-3">
                          {section.heading}
                        </h2>
                      )}
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-[#4B5563] text-[15px] leading-relaxed mb-3">
                          {renderInlineLinks(p, j)}
                        </p>
                      ))}
                      {section.listItems && section.listItems.length > 0 && (
                        <ul className="list-disc pl-6 space-y-1.5 text-[#4B5563] text-[15px] mb-3">
                          {section.listItems.map((item, k) => (
                            <li key={k}>{renderInlineLinks(item, k)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* ─── Helpful Vote ─── */}
              <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-xl text-center">
                <p className="text-[#1B2A4A] font-semibold mb-3">
                  Was this article helpful?
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setHelpfulVote("yes")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      helpfulVote === "yes"
                        ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                        : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-2 border-transparent"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" /> Yes
                  </button>
                  <button
                    onClick={() => setHelpfulVote("no")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      helpfulVote === "no"
                        ? "bg-red-100 text-red-700 border-2 border-red-300"
                        : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-2 border-transparent"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" /> No
                  </button>
                </div>
                {helpfulVote && (
                  <p className="text-sm text-[#6B7280] mt-3">
                    Thank you for your feedback!
                  </p>
                )}
              </div>

              {/* ─── CTA Banner ─── */}
              <div className="mt-10 bg-gradient-to-r from-[#1B2A4A] to-[#2D3F63] rounded-2xl p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  Need Help Understanding Your Medicare Options?
                </h2>
                <p className="text-[#CBD5E1] text-lg mb-6 max-w-xl mx-auto">
                  Our licensed Medicare experts can help you find the right
                  coverage for your needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+18884410465"
              onClick={() => trackPhoneClick({ phone_number: "(888) 441-0465", page_section: "faq_simple" })}
                    className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call (888) 441-0465
                  </a>
                  <ZipFormModal
                    coverageType="ms"
                    triggerLabel="Compare Plans"
                    triggerClassName="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-lg border border-white/20"
                    pageSection="faq_simple"
                triggerId="compare-plans-faq-simple"
                  />
                </div>
              </div>

              {/* ─── Related Articles ─── */}
              {article.relatedSlugs && article.relatedSlugs.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">
                    Related Articles
                  </h3>
                  <div className="grid gap-3">
                    {article.relatedSlugs.map((slug, i) => (
                      <Link
                        key={i}
                        href={blogSlugs.has(slug) ? `/blog/${slug}` : `/faqs/${slug}`}
                        className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#C41230]/30 hover:shadow-sm transition-all group"
                      >
                        <ArrowRight className="w-4 h-4 text-[#C41230] shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span className="text-[#1B2A4A] font-medium text-sm group-hover:text-[#C41230] transition-colors">
                          {slug
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ─── Sidebar ─── */}
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-[180px] space-y-6">
                {/* ON THIS PAGE */}
                {toc.length > 0 && (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm py-1.5 px-3 rounded-md transition-all ${
                            activeSection === item.id
                              ? "bg-[#C41230]/10 text-[#C41230] font-semibold border-l-2 border-[#C41230]"
                              : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F5F7FA]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CTA Sidebar */}
                <div className="bg-[#1B2A4A] rounded-xl p-5 text-center">
                  <p className="text-white font-bold text-sm mb-1">Have Questions?</p>
                  <p className="text-white/60 text-xs mb-4">
                    Speak with a licensed Medicare agent
                  </p>
                  <a
                    href="tel:8883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "faq_simple" })}
                    className="flex items-center justify-center gap-2 bg-[#C41230] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#A50F28] transition-colors w-full mb-2"
                  >
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
