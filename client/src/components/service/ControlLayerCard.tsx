/**
 * ControlLayerCard.tsx
 * Dark navy card showing governance/control layer items.
 * Items stagger-animate in on viewport entry.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface GovernanceItem {
  title: string;
  desc: string;
}

interface ControlLayerCardProps {
  items: GovernanceItem[];
}

export default function ControlLayerCard({ items }: ControlLayerCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible || reduced;

  return (
    <div
      ref={containerRef}
      style={{
        background: "var(--b-navy)",
        borderRadius: "1rem",
        padding: "2.5rem",
        color: "white",
      }}
    >
      {/* Shield icon */}
      <div style={{ marginBottom: "1rem" }}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 4L6 10v10c0 8.84 5.96 17.12 14 19.16C28.04 37.12 34 28.84 34 20V10L20 4z"
            fill="rgba(126,15,74,0.18)"
            stroke="#7E0F4A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M14 20l4 4 8-8"
            stroke="#7E0F4A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "0.875rem",
          color: "#D1D5DB",
          marginBottom: "2rem",
          lineHeight: 1.5,
        }}
      >
        Every system we build includes a control layer
      </p>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              borderLeft: "3px solid #7E0F4A",
              paddingLeft: "1rem",
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(-16px)",
              transition: reduced
                ? "none"
                : `opacity 0.4s ease ${i * 0.15}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "white",
                marginBottom: "0.25rem",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: "0.8125rem",
                color: "#D1D5DB",
                lineHeight: 1.55,
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
