/**
 * HomepagePlannerCTA.tsx
 * Self-contained section for the homepage.
 * Drop-in after the "Cost of Inaction" / "Problems" section.
 * Two-column layout: copy left, animated planner preview right.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const NAVY     = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY     = "#7B7B7B";
const DARK     = "#1A1A2E";
const OFFWHITE = "#F5F6FA";

function BlueCheck() {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6L4.5 8.5L10 3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ── Animated planner mock card ────────────────────────────────────────────────
const STEPS = [
  { q: "What is your role?",      choice: "Business Owner" },
  { q: "What is your industry?",  choice: "Law Firm" },
  { q: "Which workflows are manual?", choice: "Lead Response, Intake, Invoicing" },
  { q: "What tools do you use?",  choice: "CRM, Email, QuickBooks" },
];

const RESULT = {
  rank: "#1 Opportunity",
  title: "Lead Response Automation",
  saving: "18 hrs/week recovered",
  desc: "Respond to every inquiry in 90 seconds — 24 hrs a day.",
};

function PlannerPreviewCard({ visible }: { visible: boolean }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [typed, setTyped] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!visible) return;

    // Cycle through steps then show result
    let idx = 0;
    const advance = () => {
      if (idx < STEPS.length) {
        setStepIdx(idx);
        setShowResult(false);
        setTyped("");
        // Type the choice text
        const choice = STEPS[idx].choice;
        let ci = 0;
        const typeNext = () => {
          ci++;
          setTyped(choice.slice(0, ci));
          if (ci < choice.length) timerRef.current = setTimeout(typeNext, 28);
        };
        timerRef.current = setTimeout(typeNext, 400);
        idx++;
        timerRef.current = setTimeout(advance, 2400);
      } else {
        setShowResult(true);
        // Loop back after showing result
        timerRef.current = setTimeout(() => {
          idx = 0;
          setShowResult(false);
          setStepIdx(0);
          advance();
        }, 4000);
      }
    };

    timerRef.current = setTimeout(advance, 600);
    return () => clearTimeout(timerRef.current);
  }, [visible]);

  const totalSteps = 8;
  const progressStep = stepIdx + 1;

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        boxShadow: "0 12px 48px rgba(40,56,145,0.13), 0 2px 8px rgba(40,56,145,0.07)",
        border: "1px solid rgba(40,56,145,0.10)",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: "opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${NAVY} 0%, ${BURGUNDY} 100%)` }} />

      {/* Progress bar */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: BURGUNDY, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Automation Planner
          </span>
          <span style={{ fontSize: 11, color: GREY }}>Step {progressStep} of {totalSteps}</span>
        </div>
        {/* Step dots */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i < progressStep ? NAVY : "#E2E4ED",
                transition: "background 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "0 20px 20px", minHeight: 180 }}>
        {!showResult ? (
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 12, lineHeight: 1.4 }}>
              {STEPS[stepIdx]?.q}
            </p>
            {/* Simulated selected chip */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: `${NAVY}12`,
              border: `1.5px solid ${NAVY}`,
              borderRadius: 8,
              marginBottom: 16,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, fontFamily: "monospace" }}>
                {typed}
                <span style={{
                  display: "inline-block",
                  width: 1,
                  height: 13,
                  background: NAVY,
                  marginLeft: 1,
                  animation: "plannerBlink 0.9s step-end infinite",
                  verticalAlign: "middle",
                }} />
              </span>
            </div>
            {/* Ghost next options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Option A", "Option B"].map((o) => (
                <div key={o} style={{
                  height: 32, borderRadius: 6,
                  background: OFFWHITE,
                  border: "1px solid #E2E4ED",
                  opacity: 0.45,
                }} />
              ))}
            </div>
          </div>
        ) : (
          // Result preview
          <div
            style={{
              background: `linear-gradient(135deg, ${NAVY} 0%, #1e2d7a 100%)`,
              borderRadius: 12,
              padding: "18px 16px",
              color: "white",
              animation: "plannerFadeIn 0.5s ease",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#93c5fd", marginBottom: 6 }}>
              {RESULT.rank}
            </div>
            <p style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, marginBottom: 8, color: "white" }}>
              {RESULT.title}
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.12)", borderRadius: 6,
              padding: "5px 10px", marginBottom: 10,
            }}>
              <span style={{ fontSize: 12, color: "#86efac" }}>✓</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#86efac" }}>{RESULT.saving}</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, margin: 0 }}>
              {RESULT.desc}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #E2E4ED",
        padding: "12px 20px",
        background: OFFWHITE,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "plannerPulse 1.5s ease-in-out infinite" }} />
        <span style={{ fontSize: 11, color: GREY }}>Free · No account required · ~3 minutes</span>
      </div>

      <style>{`
        @keyframes plannerBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes plannerFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes plannerPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomepagePlannerCTA() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#F5F5F5", padding: "80px 0" }}>
      <div className="container">
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="planner-cta-grid"
        >
          {/* Left: copy */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: BURGUNDY,
                marginBottom: 14,
              }}
            >
              Not Sure Where to Start?
            </p>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.75vw, 1.875rem)",
                fontWeight: 800,
                color: DARK,
                marginBottom: 20,
                lineHeight: 1.25,
              }}
            >
              Map What Your Business Can Automate
            </h2>

            <p
              style={{
                fontSize: 16,
                color: GREY,
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              The Barrana Automation Planner walks you through your workflows and identifies the repetitive tasks costing you time, leads, and capacity. In about 3 minutes, you will see exactly where automation fits and where to start.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {[
                "Identify your top automation opportunities",
                "See what should stay human-led",
                "Get a phased implementation roadmap",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <BlueCheck />
                  <span style={{ fontSize: 15, color: DARK, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/automation-planner"
                style={{
                  display: "inline-block",
                  padding: "15px 32px",
                  borderRadius: 8,
                  background: hovered ? "#6a0c3e" : BURGUNDY,
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "background 0.15s",
                  lineHeight: 1,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                Start the Planner
              </Link>
              <p style={{ fontSize: 13, color: GREY, marginTop: 10 }}>
                Free. No account required. Takes 3 to 5 minutes.
              </p>
            </div>
          </div>

          {/* Right: animated planner preview */}
          <div>
            <PlannerPreviewCard visible={visible} />
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .planner-cta-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
