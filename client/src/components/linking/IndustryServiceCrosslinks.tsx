/**
 * IndustryServiceCrosslinks.tsx
 * Horizontal pill row of cross-links between industries and services.
 */

import { Link } from "wouter";

const NAVY = "#283891";

interface CrosslinkItem {
  href: string;
  label: string;
}

interface IndustryServiceCrosslinksProps {
  items: CrosslinkItem[];
  heading?: string;
}

export default function IndustryServiceCrosslinks({
  items,
  heading = "Industries That Benefit Most",
}: IndustryServiceCrosslinksProps) {
  if (!items || items.length === 0) return null;

  return (
    <section style={{ margin: "2rem 0" }}>
      <h3
        style={{
          fontWeight: 700,
          fontSize: "1rem",
          color: NAVY,
          marginBottom: "0.75rem",
        }}
      >
        {heading}
      </h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            style={{
              background: "rgba(40,56,145,0.08)",
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
              color: NAVY,
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = NAVY;
              el.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(40,56,145,0.08)";
              el.style.color = NAVY;
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
