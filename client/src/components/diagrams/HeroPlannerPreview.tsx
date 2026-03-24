/**
 * HeroPlannerPreview.tsx — Compact 4-Step Planner Preview
 */

import { useState, useEffect } from "react";

const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const BORDER = "#E2E4ED";

const STEPS = [
  { num: 1, title: "Your Business Type", desc: "Industry, team size, tools you use" },
  { num: 2, title: "Your Workflows", desc: "What you do manually every day" },
  { num: 3, title: "Your Pain Points", desc: "Where the money and time is leaking" },
  { num: 4, title: "Your Roadmap", desc: "What to automate first, what to keep human" },
];

export default function HeroPlannerPreview() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setVisibleSteps([0, 1, 2, 3]); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleSteps((prev) => [...prev, i]), 100 + i * 120));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

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
      <div style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: GREY, marginBottom: "1rem" }}>
        Automation Planner — 4 Steps
      </div>

      {STEPS.map((step, i) => {
        const isVisible = visibleSteps.includes(i);
        const isLast = i === STEPS.length - 1;
        const circleColor = isLast ? MAGENTA : NAVY;

        return (
          <div
            key={step.num}
            style={{
              display: "flex",
              gap: "0.75rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", minWidth: 30 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: circleColor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              {!isLast && (
                <div style={{ width: 2, flex: 1, minHeight: 12, borderLeft: `2px dotted ${BORDER}` }} />
              )}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : "0.875rem", paddingTop: "0.25rem" }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1A1A2E", marginBottom: "0.125rem" }}>
                {step.title}
              </div>
              <div style={{ fontSize: "0.75rem", color: GREY, lineHeight: 1.45 }}>
                {step.desc}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: "0.875rem", paddingTop: "0.625rem", textAlign: "center" as const }}>
        <span style={{ fontSize: "0.6875rem", color: NAVY, fontWeight: 600 }}>
          3–5 minutes. Free. Results on screen immediately.
        </span>
      </div>
    </div>
  );
}
