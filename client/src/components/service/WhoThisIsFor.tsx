/**
 * WhoThisIsFor.tsx
 * Two-column "best fit / not fit" section.
 * Items fade in with stagger on viewport entry.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface WhoThisIsForProps {
  bestFit: string[];
  notFit: string[];
}

function ItemList({
  items,
  isGood,
  show,
  reduced,
}: {
  items: string[];
  isGood: boolean;
  show: boolean;
  reduced: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.625rem",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(10px)",
            transition: reduced
              ? "none"
              : `opacity 0.4s ease ${i * 0.1}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
          }}
        >
          {/* Icon */}
          <span
            style={{
              flexShrink: 0,
              marginTop: "0.15rem",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: isGood ? "var(--b-success)" : "#9CA3AF",
            }}
            aria-hidden="true"
          >
            {isGood ? "✓" : "✗"}
          </span>
          <span
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--b-dark)",
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function WhoThisIsFor({ bestFit, notFit }: WhoThisIsForProps) {
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
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {/* Best Fit column */}
      <div
        style={{
          background: "rgba(22,163,74,0.04)",
          border: "1px solid rgba(22,163,74,0.15)",
          borderRadius: "0.75rem",
          padding: "1.75rem",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "var(--b-success)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "1.25rem",
          }}
        >
          Best Fit
        </div>
        <ItemList items={bestFit} isGood={true} show={show} reduced={reduced} />
      </div>

      {/* Not the Right Fit column */}
      <div
        style={{
          background: "#F7F9FC",
          border: "1px solid var(--b-border)",
          borderRadius: "0.75rem",
          padding: "1.75rem",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "var(--b-grey)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "1.25rem",
          }}
        >
          Not the Right Fit
        </div>
        <ItemList items={notFit} isGood={false} show={show} reduced={reduced} />
      </div>
    </div>
  );
}
