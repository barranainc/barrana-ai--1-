/**
 * HeroAuditCard.tsx — Compact Audit Checklist Card for "Ready to Talk" hero tab
 */

import { CheckCircle } from "lucide-react";

const DARK = "#1A1A2E";
const GREEN = "#0D9668";
const GREY = "#7B7B7B";
const NAVY = "#283891";
const BORDER = "#E2E4ED";

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
        maxWidth: 540,
        width: "100%",
        background: "white",
        borderRadius: "1rem",
        border: `1px solid ${BORDER}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        padding: "1.25rem 1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.9375rem",
          fontWeight: 700,
          color: DARK,
          marginBottom: "1rem",
        }}
      >
        What You Get in the Free Audit
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {ITEMS.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <CheckCircle
              size={17}
              color={GREEN}
              strokeWidth={2.2}
              style={{ flexShrink: 0 }}
            />
            <span style={{ fontSize: "0.8125rem", color: DARK, lineHeight: 1.4 }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: "1rem", paddingTop: "0.625rem", textAlign: "center" as const }}>
        <span style={{ fontSize: "0.6875rem", color: NAVY, fontWeight: 600 }}>
          60 minutes. Free. No obligation.
        </span>
      </div>
    </div>
  );
}
