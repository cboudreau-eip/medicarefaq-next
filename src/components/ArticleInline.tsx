import React from "react";
import Link from "next/link";

// Legacy inline HTML is converted to the same limited format as CMS Markdown.
// No HTML is injected; attributes other than href are deliberately discarded.
function normalizeInlineHtml(text: string): string {
  return text
    .replace(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi, (_, _quote, href, label) => `[${label}](${href.replace(/&amp;/g, "&")})`)
    .replace(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, "**$1**")
    .replace(/<(?:em|i)\b[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, "*$1*");
}

export function renderInline(text: string, keyPrefix: string = "inline", allowLinks = true): React.ReactNode[] {
  text = normalizeInlineHtml(text);
  const nodes: React.ReactNode[] = [];
  // Combined regex: ***bold italic***, **bold**, *italic*, [text](url)
  const inlineRegex = /(\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]*)\)|(<br\s*\/?>))/gi;
  let lastIndex = 0;
  let match;
  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[7] !== undefined) {
      nodes.push(<br key={`${keyPrefix}-br-${match.index}`} />);
    } else if (match[2] !== undefined) {
      // ***bold italic***
      const innerNodes = renderInline(match[2], `${keyPrefix}-bii-${match.index}`, allowLinks);
      nodes.push(
        <strong key={`${keyPrefix}-bi-${match.index}`}>
          <em>{innerNodes}</em>
        </strong>
      );
    } else if (match[3] !== undefined) {
      // **bold** — recursively parse inner content for nested links
      const innerNodes = renderInline(match[3], `${keyPrefix}-bi-${match.index}`, allowLinks);
      nodes.push(<strong key={`${keyPrefix}-b-${match.index}`}>{innerNodes}</strong>);
    } else if (match[4] !== undefined) {
      // *italic*
      nodes.push(<em key={`${keyPrefix}-i-${match.index}`}>{renderInline(match[4], `${keyPrefix}-ii-${match.index}`, allowLinks)}</em>);
    } else if (match[5] !== undefined) {
      // [text](url)
      const linkText = match[5];
      const linkNodes = renderInline(linkText, `${keyPrefix}-label-${match.index}`, false);
      const href = match[6].trim();
      if (!href || href.trim() === "") {
        nodes.push(<strong key={`${keyPrefix}-l-${match.index}`}>{linkNodes}</strong>);
      } else {
        if (!allowLinks || !/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href)) {
          nodes.push(...linkNodes);
          lastIndex = match.index + match[0].length;
          continue;
        }
        const isInternal = href.startsWith("/");
        nodes.push(
          isInternal ? (
            <Link
              key={`${keyPrefix}-l-${match.index}`}
              href={href}
              className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors"
            >
              {linkNodes}
            </Link>
          ) : (
            <a
              key={`${keyPrefix}-l-${match.index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D6EFD] underline hover:text-[#0A58CA] transition-colors"
            >
              {linkNodes}
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


