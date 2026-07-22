/**
 * MethodTimeline.tsx
 * Horizontal 5-node timeline with sequential reveal animation.
 * Each node expands to show deliverables on click.
 * Collapses to vertical on mobile.
 */

import { useEffect, useRef, useState } from "react";
import { Search, PenTool, Settings, Rocket, TrendingUp, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  {
    Icon: Search,
    label: "Friction Mapping",
    sub: "60 min - Free",
    color: "var(--b-amber)",
    colorBg: "var(--b-amber-bg)",
    deliverables: "Workflow map, friction analysis, ROI projection. Yours to keep.",
  },
  {
    Icon: PenTool,
    label: "System Design",
    sub: "You approve first",
    color: "var(--b-navy)",
    colorBg: "rgba(40,56,145,0.06)",
    deliverables: "Architecture diagram, integration specs, fixed-price proposal.",
  },
  {
    Icon: Settings,
    label: "Build & Test",
    sub: "Real scenarios",
    color: "var(--b-navy)",
    colorBg: "rgba(40,56,145,0.06)",
    deliverables: "Deployed systems, test docs, error handling configured.",
  },
  {
    Icon: Rocket,
    label: "Go Live",
    sub: "Team trained",
    color: "var(--b-magenta)",
    colorBg: "rgba(126,15,74,0.06)",
    deliverables: "Training session, system docs, monitoring dashboard active.",
  },
  {
    Icon: TrendingUp,
    label: "Optimize",
    sub: "Gets smarter",
    color: "var(--b-success)",
    colorBg: "var(--b-success-bg)",
    deliverables: "30-day review, optimization report, system improvements.",
  },
];

export default function MethodTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible || reduced;

  return (
    <div ref={containerRef}>
      {/* Desktop: horizontal */}
      <div className="hidden lg:block">
        {/* Connecting line */}
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 0 }}>
          {/* Background connector line */}
          <div style={{
            position: "absolute",
            top: "1.75rem",
            left: "10%",
            right: "10%",
            height: "2px",
            background: "var(--b-border)",
            zIndex: 0,
          }} />
          {/* Animated fill */}
          <div style={{
            position: "absolute",
            top: "1.75rem",
            left: "10%",
            height: "2px",
            background: "var(--b-navy)",
            zIndex: 1,
            width: show ? "80%" : "0%",
            transition: reduced ? "none" : "width 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }} />

          {steps.map((s, i) => (
            <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
              {/* Node */}
              <button
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                aria-label={s.label}
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "50%",
                  background: expanded === i ? s.color : "white",
                  border: `2px solid ${s.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: expanded === i ? "white" : s.color,
                  cursor: "pointer",
                  transition: reduced ? "none" : "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: show ? (expanded === i ? "scale(1.15)" : "scale(1)") : "scale(0.8)",
                  opacity: show ? 1 : 0,
                  transitionDelay: reduced ? "0s" : `${0.2 + i * 0.18}s`,
                  boxShadow: expanded === i ? `0 0 0 4px ${s.colorBg}` : "none",
                }}
              >
                <s.Icon size={18} strokeWidth={2} />
              </button>

              {/* Label block */}
              <div style={{
                marginTop: "0.75rem",
                textAlign: "center",
                opacity: show ? 1 : 0,
                transition: reduced ? "none" : `opacity 0.4s ease ${0.35 + i * 0.18}s`,
              }}>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--b-dark)", marginBottom: "0.2rem" }}>
                  {i + 1}. {s.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: s.color, fontWeight: 600 }}>{s.sub}</div>
              </div>

              {/* Deliverables popout */}
              <div style={{
                marginTop: "0.75rem",
                background: s.colorBg,
                border: `1px solid ${s.color}`,
                borderRadius: "0.5rem",
                padding: expanded === i ? "0.875rem" : "0",
                maxHeight: expanded === i ? "120px" : "0",
                overflow: "hidden",
                fontSize: "0.8125rem",
                color: "var(--b-dark)",
                lineHeight: 1.6,
                width: "90%",
                transition: reduced ? "none" : "max-height 0.35s ease, padding 0.35s ease, opacity 0.3s ease",
                opacity: expanded === i ? 1 : 0,
              }}>
                {s.deliverables}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--b-grey)", marginTop: "1.25rem" }}>
          Click any stage to see what you receive.
        </p>
      </div>

      {/* Mobile: vertical */}
      <div className="lg:hidden flex flex-col gap-4">
        {steps.map((s, i) => (
          <div
            key={s.label}
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(-20px)",
              transition: reduced ? "none" : `opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-expanded={expanded === i}
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.25rem",
                background: expanded === i ? s.colorBg : "white",
                border: `1px solid ${expanded === i ? s.color : "var(--b-border)"}`,
                borderRadius: "0.625rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{
                width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                background: expanded === i ? s.color : "white",
                border: `2px solid ${s.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: expanded === i ? "white" : s.color, flexShrink: 0,
              }}>
                <s.Icon size={16} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--b-dark)" }}>
                  {i + 1}. {s.label}
                </div>
                <div style={{ fontSize: "0.8125rem", color: s.color, fontWeight: 600 }}>{s.sub}</div>
              </div>
              <ChevronDown
                size={16}
                style={{
                  color: "var(--b-grey)",
                  transition: "transform 0.25s ease",
                  transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {expanded === i && (
              <div style={{
                padding: "0.875rem 1.25rem",
                background: s.colorBg,
                borderLeft: `3px solid ${s.color}`,
                borderRadius: "0 0 0.5rem 0.5rem",
                fontSize: "0.875rem",
                color: "var(--b-dark)",
                lineHeight: 1.65,
              }}>
                {s.deliverables}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
