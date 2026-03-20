/**
 * ROIMetricsGrid.tsx
 * Grid of ROI metric cards with before/after comparison.
 * Stagger fade-up on viewport entry.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ROIMetric {
  label: string;
  before?: string;
  after: string;
}

export interface ROIMetricsGridProps {
  metrics: ROIMetric[];
  note?: string;
  ctaText?: string;
}

export default function ROIMetricsGrid({
  metrics,
  note,
  ctaText,
}: ROIMetricsGridProps) {
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
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {metrics.map((metric, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: "1px solid var(--b-border)",
              borderRadius: "0.75rem",
              padding: "1.25rem 1.5rem",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(14px)",
              transition: reduced
                ? "none"
                : `opacity 0.4s ease ${i * 0.1}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            {/* Label */}
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--b-grey)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.625rem",
              }}
            >
              {metric.label}
            </div>

            {metric.before ? (
              /* Before → After display */
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--b-warning)",
                    fontWeight: 600,
                    textDecoration: "line-through",
                  }}
                >
                  {metric.before}
                </span>
                <span style={{ color: "var(--b-border)", fontSize: "0.875rem" }}>
                  →
                </span>
                <span
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 800,
                    color: "var(--b-success)",
                  }}
                >
                  {metric.after}
                </span>
              </div>
            ) : (
              /* After-only display */
              <div
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                  fontWeight: 800,
                  color: "var(--b-navy)",
                  lineHeight: 1.1,
                }}
              >
                {metric.after}
              </div>
            )}
          </div>
        ))}
      </div>

      {note && (
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--b-grey)",
            fontStyle: "italic",
            marginTop: "1rem",
            lineHeight: 1.5,
          }}
        >
          {note}
        </p>
      )}

      {ctaText && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            opacity: show ? 1 : 0,
            transition: reduced ? "none" : `opacity 0.45s ease ${metrics.length * 0.1 + 0.15}s`,
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
