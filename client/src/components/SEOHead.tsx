/**
 * SEOHead.tsx
 * Injects Open Graph, Twitter Card, and canonical URL meta tags via DOM manipulation.
 * Works in CSR without react-helmet. Each page can render <SEOHead> with specific props;
 * the last render wins (standard React behaviour for effects).
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOHeadProps {
  title?: string;
  description?: string;
  type?: "website" | "article";
  image?: string;
}

const BASE_URL = "https://barrana.ai";
const DEFAULT_IMAGE = BASE_URL + "/og-image.png";
const SITE_NAME = "Barrana.ai";

export default function SEOHead({ title, description, type = "website", image }: SEOHeadProps) {
  const [location] = useLocation();
  const canonicalUrl = BASE_URL + location;
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    function setMeta(property: string, content: string) {
      let el = document.querySelector(`meta[property="${property}"]`) ||
               document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("article:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }

    function setLink(rel: string, href: string) {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    }

    // Canonical URL
    setLink("canonical", canonicalUrl);

    // Open Graph
    if (title) setMeta("og:title", title);
    if (description) setMeta("og:description", description);
    setMeta("og:url", canonicalUrl);
    setMeta("og:type", type);
    setMeta("og:image", ogImage);
    setMeta("og:site_name", SITE_NAME);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    if (title) setMeta("twitter:title", title);
    if (description) setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
  }, [title, description, type, canonicalUrl, ogImage]);

  return null;
}
