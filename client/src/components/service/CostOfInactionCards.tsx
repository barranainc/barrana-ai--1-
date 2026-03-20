/**
 * CostOfInactionCards.tsx
 * 3 metric cards showing costs of inaction.
 * Cards appear with stagger on viewport entry.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface CostItem {
  figure: string;
  label: string;
  desc: string;
}

export interface CostOfInactionCardsProps {
  items: CostItem[];
  ctaText?: string;
}

export default function CostOfInactionCards({
  items,
  ctaText,
}: CostOfInactionCardsProps) {
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
    <div ref={containerRef}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderTop: "3px solid var(--b-warning)",
              border: "1px solid var(--b-border)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(16px)",
              transition: reduced
                ? "none"
                : `opacity 0.45s ease ${i * 0.12}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "var(--b-warning)",
                marginBottom: "0.375rem",
                lineHeight: 1.1,
              }}
            >
              {item.figure}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: "var(--b-dark)",
                marginBottom: "0.5rem",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--b-grey)",
                lineHeight: 1.6,
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {ctaText && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            opacity: show ? 1 : 0,
            transition: reduced ? "none" : `opacity 0.45s ease ${items.length * 0.12 + 0.1}s`,
          }}
        >
          <Link href="/contact" className="btn-primary">
            {ctaText}
          </Link>
        </div>
      )}
    </div>
  );
}
