/**
 * InternalLinksGrid.tsx
 * Related content links grid.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export interface InternalLink {
  label: string;
  href: string;
  desc?: string;
}

export interface InternalLinksGridProps {
  links: InternalLink[];
}

export default function InternalLinksGrid({ links }: InternalLinksGridProps) {
  return (
    <div>
      <h2
        style={{
          fontWeight: 800,
          color: "var(--b-dark)",
          fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
          marginBottom: "1.5rem",
        }}
      >
        Related Resources
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            style={{
              display: "block",
              background: "white",
              border: "1px solid var(--b-border)",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              textDecoration: "none",
              transition: "box-shadow 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 4px 16px rgba(40,56,145,0.1)";
              el.style.borderColor = "rgba(40,56,145,0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "none";
              el.style.borderColor = "var(--b-border)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  color: "var(--b-navy)",
                  lineHeight: 1.35,
                }}
              >
                {link.label}
              </span>
              <ArrowRight
                size={16}
                style={{ color: "var(--b-navy)", flexShrink: 0, marginTop: "0.125rem" }}
              />
            </div>
            {link.desc && (
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--b-grey)",
                  marginTop: "0.5rem",
                  lineHeight: 1.5,
                }}
              >
                {link.desc}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
