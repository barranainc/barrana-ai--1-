/**
 * BeforeAfterSection.tsx
 * Prop-driven version of BeforeAfterComparison.
 * Accepts custom metrics data. Same visual design as the existing component.
 * Animated width bars (16px height), IntersectionObserver, respects prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MetricRow {
  label: string;
  before: string;
  after: string;
  beforeW: number;
  afterW: number;
}

export interface BeforeAfterSectionProps {
  metrics: MetricRow[];
}

export default function BeforeAfterSection({ metrics }: BeforeAfterSectionProps) {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible || reduced;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Before and after automation comparison"
      className="grid lg:grid-cols-2 gap-4 lg:gap-6"
    >
      {/* Before column */}
      <div
        style={{
          background: "var(--b-warning-bg)",
          borderLeft: "4px solid var(--b-warning)",
          borderRadius: "0 0.75rem 0.75rem 0",
          padding: "2rem",
          opacity: show ? 1 : 0,
          transform: show ? "translateX(0)" : "translateX(-40px)",
          transition: reduced
            ? "none"
            : "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--b-warning)",
            marginBottom: "1.25rem",
          }}
        >
          ✗ Before Barrana
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {metrics.map((m, i) => (
            <div key={m.label} aria-label={`${m.label}: before ${m.before}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--b-dark)",
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--b-warning)",
                  }}
                >
                  {m.before}
                </span>
              </div>
              <div
                style={{
                  height: "16px",
                  background: "rgba(220,38,38,0.15)",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "var(--b-warning)",
                    borderRadius: "6px",
                    width: show ? `${m.beforeW}%` : "0%",
                    transition: reduced
                      ? "none"
                      : `width 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* After column */}
      <div
        style={{
          background: "var(--b-success-bg)",
          borderLeft: "4px solid var(--b-success)",
          borderRadius: "0 0.75rem 0.75rem 0",
          padding: "2rem",
          opacity: show ? 1 : 0,
          transform: show ? "translateX(0)" : "translateX(40px)",
          transition: reduced
            ? "none"
            : "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--b-success)",
            marginBottom: "1.25rem",
          }}
        >
          ✓ After Barrana
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {metrics.map((m, i) => (
            <div key={m.label} aria-label={`${m.label}: after ${m.after}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--b-dark)",
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--b-success)",
                  }}
                >
                  {m.after}
                </span>
              </div>
              <div
                style={{
                  height: "16px",
                  background: "rgba(22,163,74,0.15)",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "var(--b-success)",
                    borderRadius: "6px",
                    width: show ? `${m.afterW}%` : "0%",
                    transition: reduced
                      ? "none"
                      : `width 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
