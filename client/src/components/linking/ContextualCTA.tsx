/**
 * ContextualCTA.tsx
 * Compact inline callout with a contextual call-to-action link.
 */

import { Link } from "wouter";

const NAVY = "#283891";
const GREY = "#7B7B7B";

interface ContextualCTAProps {
  label: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export default function ContextualCTA({ label, description, linkText, linkHref }: ContextualCTAProps) {
  return (
    <div
      style={{
        background: "rgba(40,56,145,0.06)",
        borderLeft: `4px solid ${NAVY}`,
        borderRadius: "0 0.75rem 0.75rem 0",
        padding: "1.25rem 1.5rem",
        margin: "2rem 0",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          fontSize: "0.875rem",
          color: NAVY,
          margin: 0,
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: GREY,
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {description}{" "}
        <Link
          href={linkHref}
          style={{
            color: NAVY,
            fontWeight: 600,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
          }}
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
