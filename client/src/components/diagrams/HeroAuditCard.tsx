/**
 * HeroAuditCard.tsx - Compact introductory-session card for "Ready to Talk" hero tab
 */

import { CheckCircle } from "lucide-react";

const DARK = "#1A1A2E";
const GREEN = "#0D9668";
const GREY = "#707070";
const NAVY = "#283891";
const BORDER = "#E2E4ED";

const ITEMS = [
  "Your business and goals",
  "The workflow challenges costing your team time",
  "Where AI automation could save your team time",
  "Whether a fixed-price project makes sense",
  "15 minutes, free, no obligation",
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
        What We Cover in the Free Introductory Session
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
          15 minutes. Free. No obligation.
        </span>
      </div>
    </div>
  );
}
