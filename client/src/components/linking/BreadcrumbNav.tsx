/**
 * BreadcrumbNav.tsx
 * Accessible breadcrumb navigation with JSON-LD BreadcrumbList schema.
 */

import { Link } from "wouter";

const NAVY = "#283891";
const GREY = "#7B7B7B";

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
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    itemProp="item"
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
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    itemProp="name"
                    style={{ color: GREY }}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(i + 1)} />
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
