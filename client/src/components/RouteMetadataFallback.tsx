import { useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { ROUTE_DESCRIPTIONS, isPlaceholderDescription } from "@/data/route-metadata";
import { ORG_REF } from "@/lib/schema";

const BASE_URL = "https://barrana.ai";
const SITE_NAME = "Barrana.ai";
const DEFAULT_IMAGE = `${BASE_URL}/barrana-logo-social.png`;
const AUTO_ARTICLE_ID = "route-fallback-article";

function setMeta(property: string, content: string) {
  let element =
    document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`) ||
    document.querySelector<HTMLMetaElement>(`meta[name="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property.startsWith("og:") || property.startsWith("article:") ? "property" : "name", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function normalizedText(element: Element | null | undefined) {
  const text = element instanceof HTMLElement ? element.innerText : element?.textContent;
  return text?.replace(/\s+/g, " ").trim() || "";
}

/** First substantial paragraph in the main content, trimmed near 300 characters. */
function firstRealParagraph(main: Element | null): string {
  const root = main || document;
  for (const p of Array.from(root.querySelectorAll("p"))) {
    const text = normalizedText(p);
    if (!isPlaceholderDescription(text)) {
      return text.length > 300 ? `${text.slice(0, 297).replace(/\s+\S*$/, "")}…` : text;
    }
  }
  return "";
}

const ARTICLE_PREFIXES = ["/resources/", "/insights/", "/workflows/", "/playbooks/", "/operator-insights/", "/knowledge/"];

function isArticlePath(path: string) {
  return ARTICLE_PREFIXES.some((prefix) => path.startsWith(prefix)) && path.split("/").length === 3;
}

function hasArticleMarkup() {
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some(
    (s) => s.id !== AUTO_ARTICLE_ID && /"@type"\s*:\s*"(Article|BlogPosting|TechArticle|HowTo)"/.test(s.textContent || ""),
  );
}

/** Article markup for guides that do not emit their own (audit task 7). The organization is the author until real authors are supplied. */
function ensureArticleMarkup(path: string, headline: string, description: string) {
  document.getElementById(AUTO_ARTICLE_ID)?.remove();
  if (!isArticlePath(path) || hasArticleMarkup()) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = AUTO_ARTICLE_ID;
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline.slice(0, 110),
    description: description || undefined,
    mainEntityOfPage: `${BASE_URL}${path}`,
    url: `${BASE_URL}${path}`,
    inLanguage: "en-CA",
    author: ORG_REF,
    publisher: ORG_REF,
  });
  document.head.appendChild(script);
}

/**
 * Supplies route-specific metadata for pages that do not render SEOHead.
 * Page-level SEOHead effects still take precedence when richer metadata exists; approved
 * descriptions from data/route-metadata.ts always win over placeholder text (audit task 2).
 */
export default function RouteMetadataFallback() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const path = location === "/" ? "/" : location.replace(/\/+$/, "");
    const canonicalUrl = `${BASE_URL}${path}`;
    const main = document.querySelector("#main-content");
    const heading = main?.querySelector("h1") || document.querySelector("h1");
    const headingSection = heading?.closest("section");
    const onPageSummary = normalizedText(headingSection?.querySelector("p") || main?.querySelector("p"));
    const summary =
      ROUTE_DESCRIPTIONS[path] || (isPlaceholderDescription(onPageSummary) ? firstRealParagraph(main) : onPageSummary);
    const headingText = normalizedText(heading);
    const title = headingText ? `${headingText} | ${SITE_NAME}` : SITE_NAME;
    const type = isArticlePath(path) ? "article" : "website";

    document.title = title;
    setCanonical(canonicalUrl);

    if (summary) setMeta("description", summary);
    setMeta("robots", "index, follow");
    setMeta("og:title", title);
    if (summary) setMeta("og:description", summary);
    setMeta("og:url", canonicalUrl);
    setMeta("og:type", type);
    setMeta("og:image", DEFAULT_IMAGE);
    setMeta("og:site_name", SITE_NAME);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    if (summary) setMeta("twitter:description", summary);
    setMeta("twitter:image", DEFAULT_IMAGE);

    // Pages with their own SEOHead run after this effect; re-check once they have settled so an
    // approved description always wins over a placeholder, and guides get Article markup.
    const settle = window.setTimeout(() => {
      const current = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || "";
      const preferred = ROUTE_DESCRIPTIONS[path] || (isPlaceholderDescription(current) ? firstRealParagraph(main) : "");
      if (preferred && preferred !== current) {
        setMeta("description", preferred);
        setMeta("og:description", preferred);
        setMeta("twitter:description", preferred);
      }
      ensureArticleMarkup(path, headingText || document.title, preferred || current);
    }, 50);
    return () => window.clearTimeout(settle);
  }, [location]);

  return null;
}
