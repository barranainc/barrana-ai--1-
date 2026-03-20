/**
 * WorkflowDiagram.tsx
 * Reusable horizontal flow diagram for workflow tab sections.
 * Nodes animate in left-to-right when visible.
 * Responsive: horizontal on desktop, vertical on mobile.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMobile";

export type WorkflowStepType = "trigger" | "action" | "ai" | "outcome";

export interface WorkflowStep {
  label: string;
  type: WorkflowStepType;
}

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
  resultBadge?: string;
}

const typeStyle: Record<WorkflowStepType, { bg: string; border: string; text: string; label: string }> = {
  trigger: { bg: "var(--b-amber-bg)",   border: "var(--b-amber)",   text: "var(--b-amber)",   label: "Trigger" },
  action:  { bg: "rgba(40,56,145,0.07)", border: "var(--b-navy)",    text: "var(--b-navy)",    label: "Action"  },
  ai:      { bg: "rgba(124,58,237,0.07)",border: "#7c3aed",          text: "#7c3aed",          label: "AI"      },
  outcome: { bg: "var(--b-success-bg)",  border: "var(--b-success)", text: "var(--b-success)", label: "Result"  },
};

export default function WorkflowDiagram({ steps, resultBadge }: WorkflowDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    setVisible(false);
    const el = containerRef.current;
    if (!el) return;
    // Re-trigger animation on re-render (tab switch)
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.1 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, 50);
    return () => clearTimeout(t);
  }, [steps]);

  const show = visible || reduced;

  return (
    <div ref={containerRef}>
      {/* Desktop: scrollable horizontal chip flow — never wraps */}
      <div
        style={{
          display: isMobile ? "none" : "block",
          overflowX: "auto",
          overflowY: "visible",
          paddingBottom: "4px", // prevent clipping box-shadow on chips
          scrollbarWidth: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px", width: "max-content" }}>
          {steps.map((step, i) => {
            const s = typeStyle[step.type];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    background: s.bg,
                    border: `1.5px solid ${s.border}`,
                    borderRadius: "0.5rem",
                    padding: "0.45rem 0.875rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.15rem",
                    opacity: show ? 1 : 0,
                    transform: show ? "scale(1)" : "scale(0.85)",
                    transition: reduced ? "none" : `opacity 0.35s ease ${i * 0.12}s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s`,
                    minWidth: "88px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: s.text, opacity: 0.75 }}>
                    {s.label}
                  </span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--b-dark)", lineHeight: 1.3 }}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    size={13}
                    style={{
                      color: "var(--b-border)",
                      margin: "0 2px",
                      flexShrink: 0,
                      opacity: show ? 1 : 0,
                      transition: reduced ? "none" : `opacity 0.3s ease ${0.1 + i * 0.12}s`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: compact vertical list */}
      <div
        style={{ display: isMobile ? "flex" : "none", flexDirection: "column", gap: "0.4rem" }}
      >
        {steps.map((step, i) => {
          const s = typeStyle[step.type];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: s.border, flexShrink: 0,
              }} />
              <div style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderRadius: "0.375rem",
                padding: "0.3rem 0.625rem",
                flex: 1,
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "0.575rem", fontWeight: 700, color: s.text, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>
                  {s.label}
                </span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--b-dark)" }}>{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result badge */}
      {resultBadge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.25rem",
            background: "var(--b-success-bg)",
            border: "1.5px solid var(--b-success)",
            borderRadius: "2rem",
            padding: "0.4rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--b-success)",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(10px)",
            transition: reduced ? "none" : `opacity 0.45s ease ${steps.length * 0.12 + 0.2}s, transform 0.45s ease ${steps.length * 0.12 + 0.2}s`,
          }}
        >
          <span style={{ fontSize: "1rem" }}>✓</span>
          {resultBadge}
        </div>
      )}
    </div>
  );
}
