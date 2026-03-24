/**
 * HeroAuditCard.tsx — Audit Checklist Card for "Ready to Talk" hero tab
 * Clean white card with 5 checkmark items.
 */

import { CheckCircle } from "lucide-react";

const DARK = "#1A1A2E";
const GREEN = "#0D9668";

const ITEMS = [
  "Full workflow map of your operations",
  "Annual cost calculation of your manual processes",
  "Top 3 automation opportunities ranked",
  "Phased implementation plan with fixed pricing",
  "Yours to keep — no obligation",
];

export default function HeroAuditCard() {
  return (
    <div
      style={{
        maxWidth: 480,
        background: "white",
        borderRadius: "1rem",
        border: "1px solid #E2E4ED",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontSize: "1.0625rem",
          fontWeight: 600,
          color: DARK,
          marginBottom: "1.5rem",
        }}
      >
        What You Get in the Free Audit
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {ITEMS.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <CheckCircle
              size={20}
              color={GREEN}
              strokeWidth={2}
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <span style={{ fontSize: "0.9375rem", color: DARK, lineHeight: 1.5 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
