import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

const BASE_URL = "https://barrana.ai";
const SITE_NAME = "Barrana.ai";
const DEFAULT_IMAGE = `${BASE_URL}/barrana-logo.png`;

function setMeta(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`) ||
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

function isArticlePath(path: string) {
  return ["/resources/", "/insights/", "/workflows/", "/playbooks/", "/operator-insights/"].some((prefix) =>
    path.startsWith(prefix),
  );
}

/**
 * Supplies route-specific metadata for pages that do not render SEOHead.
 * Page-level SEOHead effects still take precedence when richer metadata exists.
 */
export default function RouteMetadataFallback() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const path = location === "/" ? "/" : location.replace(/\/+$/, "");
    const canonicalUrl = `${BASE_URL}${path}`;
    const main = document.querySelector("#main-content");
    const heading = main?.querySelector("h1") || document.querySelector("h1");
    const headingSection = heading?.closest("section");
    const summary = normalizedText(headingSection?.querySelector("p") || main?.querySelector("p"));
    const headingText = normalizedText(heading);
    const title = headingText ? `${headingText} | ${SITE_NAME}` : SITE_NAME;
    const type = isArticlePath(path) ? "article" : "website";

    document.title = title;
    setCanonical(canonicalUrl);

    if (summary) setMeta("description", summary);
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
  }, [location]);

  return null;
}
