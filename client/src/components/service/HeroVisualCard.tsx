/**
 * HeroVisualCard.tsx
 * Animated stats card displayed in the right column of service/industry hero sections.
 * Data-driven: accepts metrics from roiMetrics so the visual always matches the page copy.
 * Renders up to 4 key metrics in a 2×2 grid with staggered entrance animation.
 */

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface HeroStat {
  value: string;   // e.g. "90 sec", "25-40%", "$150K", "24/7"
  label: string;   // e.g. "Lead Response Time", "No-Show Reduction"
  accent?: string; // optional highlight color, defaults to teal
}

interface HeroVisualCardProps {
  stats: HeroStat[];
  badge?: string; // small top label, e.g. "Typical Outcomes"
  show: boolean;  // tied to parent mounted state
}

const TEAL = "#00C9A7";
const NAVY = "#283891";

export default function HeroVisualCard({ stats, badge = "Typical Outcomes", show }: HeroVisualCardProps) {
  const reduced = useReducedMotion();
  const visible = show || reduced;
  const items = stats.slice(0, 4);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "1.75rem",
        boxShadow: "0 8px 40px rgba(40,56,145,0.10), 0 1px 4px rgba(40,56,145,0.06)",
        border: "1px solid rgba(40,56,145,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: reduced ? "none" : "opacity 0.65s ease 0.35s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.35s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${NAVY} 0%, ${TEAL} 100%)`,
        }}
      />

      {/* Badge */}
      <div style={{ marginBottom: "1.25rem", marginTop: "0.25rem" }}>
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: TEAL,
            background: `${TEAL}15`,
            borderRadius: "999px",
            padding: "0.25rem 0.75rem",
          }}
        >
          {badge}
        </span>
      </div>

      {/* 2×2 metric grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.875rem",
        }}
      >
        {items.map((stat, i) => (
          <div
            key={i}
            style={{
              background: i === 0 ? `${NAVY}` : "#F7F9FC",
              borderRadius: "14px",
              padding: "1rem 1.125rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: reduced
                ? "none"
                : `opacity 0.45s ease ${0.5 + i * 0.1}s, transform 0.45s ease ${0.5 + i * 0.1}s`,
              gridColumn: items.length === 1 ? "1 / -1" : undefined,
            }}
          >
            <p
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                fontWeight: 800,
                color: i === 0 ? TEAL : NAVY,
                lineHeight: 1.1,
                marginBottom: "0.375rem",
                letterSpacing: "-0.01em",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: i === 0 ? "rgba(255,255,255,0.7)" : "var(--b-grey)",
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p
        style={{
          fontSize: "0.6875rem",
          color: "rgba(100,116,139,0.7)",
          marginTop: "1rem",
          marginBottom: 0,
          lineHeight: 1.4,
        }}
      >
        Based on typical client outcomes. Your Automation Audit provides a custom projection.
      </p>
    </div>
  );
}
