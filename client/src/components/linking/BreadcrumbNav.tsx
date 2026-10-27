/**
 * BreadcrumbNav.tsx
 * Accessible breadcrumb navigation with JSON-LD BreadcrumbList schema.
 * This is the only BreadcrumbList a page emits; layouts must not add a second copy.
 */

import { Link } from "wouter";

const NAVY = "#283891";
// Darker than the brand grey: 13px breadcrumb text needs 4.5:1 contrast on the light hero backgrounds.
const GREY = "#5F5F6B";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  if (!items || items.length === 0) return null;

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://barrana.ai${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        style={{
          fontSize: "0.8125rem",
          color: GREY,
          marginBottom: "1.5rem",
        }}
      >
        <ol
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.25rem",
            margin: 0,
            padding: 0,
          }}
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
              >
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    style={{
                      color: NAVY,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
                    }}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    style={{ color: GREY }}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span style={{ color: GREY, margin: "0 0.125rem" }} aria-hidden="true">
                    &#8250;
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
