/**
 * HeroPlannerPreview.tsx — 4-Step Planner Preview for "Ready to Plan" hero tab
 * Vertical steps connected by a dotted line.
 */

import { useState, useEffect } from "react";

const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";

const STEPS = [
  { num: 1, title: "Your Business Type", desc: "Industry, team size, tools you use" },
  { num: 2, title: "Your Workflows", desc: "What you do manually every day" },
  { num: 3, title: "Your Pain Points", desc: "Where the money and time is leaking" },
  { num: 4, title: "Your Roadmap", desc: "What to automate first, what to keep human" },
];

export default function HeroPlannerPreview() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i]);
      }, 100 + i * 150));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ maxWidth: 480 }}>
      {STEPS.map((step, i) => {
        const isVisible = visibleSteps.includes(i);
        const isLast = i === STEPS.length - 1;
        const circleColor = isLast ? MAGENTA : NAVY;

        return (
          <div
            key={step.num}
            style={{
              display: "flex",
              gap: "1rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Left column: circle + dotted line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 36 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: circleColor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    borderLeft: "2px dotted #E2E4ED",
                  }}
                />
              )}
            </div>

            {/* Right column: text */}
            <div style={{ paddingBottom: isLast ? 0 : "1.5rem", paddingTop: "0.25rem" }}>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1A1A2E",
                  marginBottom: "0.25rem",
                }}
              >
                {step.title}
              </div>
              <div style={{ fontSize: "0.875rem", color: GREY, lineHeight: 1.5 }}>
                {step.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
