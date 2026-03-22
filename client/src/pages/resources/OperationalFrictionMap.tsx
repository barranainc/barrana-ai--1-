/**
 * OperationalFrictionMap.tsx
 * Resource guide: "The Operational Friction Map"
 * Route: /resources/operational-friction-map
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// ─── Shared layout helpers ────────────────────────────────────────────────────

function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "4px solid #283891", background: "#F0F4FF", borderRadius: "0 12px 12px 0", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, color: "#283891", marginBottom: "1rem", marginTop: "2.5rem" }}>{children}</h2>;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Graphic 1 & 2: FrictionMatrix ────────────────────────────────────────────

interface MatrixDot {
  label: string;
  quadrant: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  // position within quadrant as 0-1 fractions
  qx: number;
  qy: number;
}

const exampleDots: MatrixDot[] = [
  { label: "Lead intake", quadrant: "bottom-right", qx: 0.6, qy: 0.4 },
  { label: "Client advice", quadrant: "top-right", qx: 0.55, qy: 0.55 },
  { label: "Status updates", quadrant: "bottom-right", qx: 0.3, qy: 0.65 },
  { label: "Complex filings", quadrant: "top-right", qx: 0.35, qy: 0.35 },
];

const immigrationDots: MatrixDot[] = [
  { label: "Document requests", quadrant: "bottom-right", qx: 0.65, qy: 0.55 },
  { label: "Intake forms", quadrant: "bottom-right", qx: 0.38, qy: 0.35 },
  { label: "Case status emails", quadrant: "bottom-right", qx: 0.7, qy: 0.7 },
  { label: "Visa strategy", quadrant: "top-right", qx: 0.5, qy: 0.4 },
  { label: "Policy review", quadrant: "top-left", qx: 0.5, qy: 0.5 },
  { label: "Appointment reminders", quadrant: "bottom-right", qx: 0.5, qy: 0.85 },
  { label: "Compliance checks", quadrant: "top-right", qx: 0.7, qy: 0.65 },
  { label: "Rare exceptions", quadrant: "top-left", qx: 0.35, qy: 0.35 },
];

interface FrictionMatrixProps {
  showDots?: MatrixDot[];
  isFilled?: boolean;
  title?: string;
}

function FrictionMatrix({ showDots, isFilled = false, title }: FrictionMatrixProps) {
  const { ref, visible } = useReveal();
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setDotsVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const quadrantStyle = (q: "tl" | "tr" | "bl" | "br") => {
    const base: React.CSSProperties = {
      position: "absolute",
      width: "50%",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.75rem",
      textAlign: "center",
    };
    if (q === "tr") return { ...base, top: 0, right: 0, background: isFilled ? "rgba(40,56,145,0.06)" : "rgba(40,56,145,0.04)" };
    if (q === "tl") return { ...base, top: 0, left: 0, background: "#fff" };
    if (q === "br") return {
      ...base, bottom: 0, right: 0,
      background: isFilled ? "rgba(126,15,74,0.06)" : "rgba(126,15,74,0.04)",
      animation: (!isFilled && visible) ? "pulseHighlight 2s ease-in-out infinite" : "none",
    };
    return { ...base, bottom: 0, left: 0, background: "rgba(123,123,123,0.05)" };
  };

  const getDotPosition = (dot: MatrixDot): React.CSSProperties => {
    const halfW = 50;
    const halfH = 50;
    let baseX = 0, baseY = 0;
    if (dot.quadrant === "top-right") { baseX = halfW; baseY = 0; }
    if (dot.quadrant === "top-left") { baseX = 0; baseY = 0; }
    if (dot.quadrant === "bottom-right") { baseX = halfW; baseY = halfH; }
    if (dot.quadrant === "bottom-left") { baseX = 0; baseY = halfH; }
    const left = `${baseX + dot.qx * halfW}%`;
    const top = `${baseY + dot.qy * halfH}%`;
    return { left, top };
  };

  return (
    <div ref={ref} style={{ margin: "2rem 0" }}>
      {title && (
        <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#7B7B7B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
          {title}
        </p>
      )}
      <style>{`
        @keyframes pulseHighlight {
          0%, 100% { box-shadow: inset 0 0 0 2px rgba(126,15,74,0.3); }
          50% { box-shadow: inset 0 0 0 3px rgba(126,15,74,0.6); }
        }
      `}</style>

      <div style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "2rem",
        overflow: "visible",
      }}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {/* Y-axis label */}
          <div style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#7B7B7B",
            letterSpacing: "0.07em",
            textAlign: "center",
            flexShrink: 0,
            userSelect: "none",
          }}>
            Skill Required (Low → High)
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              position: "relative",
              paddingBottom: "100%",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}>
              <div style={{ position: "absolute", inset: 0 }}>
                {/* Grid lines */}
                <div style={{
                  position: "absolute", inset: 0,
                  border: "1.5px solid #CBD5E1",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}>
                  {/* Vertical midline */}
                  <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1.5px", background: "#CBD5E1", transform: "translateX(-50%)" }} />
                  {/* Horizontal midline */}
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1.5px", background: "#CBD5E1", transform: "translateY(-50%)" }} />

                  {/* Quadrant fills */}
                  <div style={quadrantStyle("tl")}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#374151", lineHeight: 1.3 }}>Monitor</span>
                    <span style={{ fontSize: "0.675rem", color: "#7B7B7B", marginTop: "0.2rem" }}>Low automation priority</span>
                  </div>
                  <div style={quadrantStyle("tr")}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#283891", lineHeight: 1.3 }}>Protect</span>
                    <span style={{ fontSize: "0.675rem", color: "#7B7B7B", marginTop: "0.2rem" }}>Keep human, reduce surrounding admin</span>
                  </div>
                  <div style={quadrantStyle("bl")}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#374151", lineHeight: 1.3 }}>Batch & Simplify</span>
                    <span style={{ fontSize: "0.675rem", color: "#7B7B7B", marginTop: "0.2rem" }}>Low priority</span>
                  </div>
                  <div style={quadrantStyle("br")}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#7E0F4A", lineHeight: 1.3 }}>
                      {!isFilled && <span style={{ display: "block", fontSize: "0.9rem", marginBottom: "0.1rem" }}>⭐</span>}
                      AUTOMATE FIRST
                    </span>
                    <span style={{ fontSize: "0.675rem", color: "#7E0F4A", fontWeight: 600, marginTop: "0.2rem" }}>Highest ROI</span>
                  </div>
                </div>

                {/* Dots */}
                {showDots && showDots.map((dot, i) => {
                  const pos = getDotPosition(dot);
                  const isHighROI = dot.quadrant === "bottom-right";
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        ...pos,
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        opacity: dotsVisible ? 1 : 0,
                        transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s`,
                        transformOrigin: "center",
                        scale: dotsVisible ? "1" : "0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "3px",
                        pointerEvents: "none",
                      }}
                    >
                      <div style={{
                        width: "10px", height: "10px",
                        borderRadius: "50%",
                        background: isHighROI ? "#7E0F4A" : "#283891",
                        border: "2px solid #fff",
                        boxShadow: `0 0 0 1.5px ${isHighROI ? "#7E0F4A" : "#283891"}`,
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 700,
                        color: isHighROI ? "#7E0F4A" : "#283891",
                        background: "#fff",
                        border: `1px solid ${isHighROI ? "#F3A8D0" : "#C7D2FE"}`,
                        borderRadius: "4px",
                        padding: "1px 5px",
                        whiteSpace: "nowrap",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      }}>
                        {dot.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis label */}
            <div style={{ textAlign: "center", fontSize: "0.75rem", fontWeight: 700, color: "#7B7B7B", letterSpacing: "0.07em", marginTop: "0.5rem", userSelect: "none" }}>
              Frequency (Low → High)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OperationalFrictionMap() {
  useEffect(() => {
    document.title = "The Operational Friction Map | Barrana AI Resources";
  }, []);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "3rem 0 2.5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <nav style={{ fontSize: "0.8125rem", color: "#7B7B7B", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Link href="/" style={{ color: "#7B7B7B", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/resources" style={{ color: "#7B7B7B", textDecoration: "none" }}>Resources</Link>
            <span>/</span>
            <span style={{ color: "#1A1A2E" }}>Operational Friction Map</span>
          </nav>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{
              background: "#FDF2F8", color: "#7E0F4A",
              fontWeight: 700, fontSize: "0.75rem",
              letterSpacing: "0.07em", textTransform: "uppercase",
              borderRadius: "999px", padding: "0.3rem 0.85rem",
            }}>
              Framework
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#7B7B7B" }}>⏱ 12 min read</span>
          </div>

          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 900,
            color: "#1A1A2E",
            lineHeight: 1.18,
            marginBottom: "0",
          }}>
            The Operational Friction Map
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "2.5rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <SummaryBox>
            <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Quick Summary</p>
            <p style={{ fontSize: "0.9375rem", color: "#1A1A2E", lineHeight: 1.65, margin: 0 }}>
              The Operational Friction Map is a two-axis diagnostic framework for identifying which tasks in your business deliver the highest ROI when automated.
              By plotting your workflows against frequency and skill level required, you can instantly see which tasks to automate first, which to protect for human judgment,
              and which to simplify or batch. Most professional services firms have 3–5 high-priority automation candidates hidden in plain sight.
            </p>
          </SummaryBox>

          <SectionHeading>What Is Operational Friction?</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            Operational friction is the invisible tax your business pays every day. It's the time your team spends on tasks that aren't billable, aren't strategic,
            and don't require expertise — but still demand attention. A client waiting 3 hours for a confirmation email.
            A staff member re-entering data from a form into your CRM. A follow-up that never happened because someone was too busy.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            For professional services firms — immigration lawyers, accountants, physiotherapists, insurance brokers — operational friction typically consumes
            15–25% of total staff time. That's one quarter of your payroll delivering zero direct value.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
            The Friction Map helps you see it clearly, prioritize ruthlessly, and act precisely.
          </p>

          <FrictionMatrix showDots={exampleDots} title="Figure 1 — Friction Quadrant Framework" />

          <p style={{ fontSize: "0.875rem", color: "#7B7B7B", marginTop: "-1rem", marginBottom: "2rem", fontStyle: "italic" }}>
            Plot any task by how often it occurs (horizontal) and how much professional skill it requires (vertical). The bottom-right quadrant is your automation target zone.
          </p>

          <SectionHeading>Understanding Each Quadrant</SectionHeading>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
            {[
              {
                title: "AUTOMATE FIRST — Bottom Right",
                description: "High-frequency, low-skill tasks. These are your highest ROI automation targets. Think: intake form processing, appointment confirmations, payment reminders, status update emails. Every one of these running manually is waste.",
                bg: "#FDF2F8", border: "#7E0F4A", titleColor: "#7E0F4A",
              },
              {
                title: "Protect — Top Right",
                description: "High-frequency, high-skill tasks. These require your professionals and should stay human. But the administrative layer around them — scheduling, document requests, follow-up confirmations — can often be automated to free up expert time.",
                bg: "#EEF2FF", border: "#283891", titleColor: "#283891",
              },
              {
                title: "Batch & Simplify — Bottom Left",
                description: "Low-frequency, low-skill tasks. These aren't worth complex automation but can often be batched into efficient routines or handled with simple templates.",
                bg: "#F8FAFC", border: "#CBD5E1", titleColor: "#374151",
              },
              {
                title: "Monitor — Top Left",
                description: "Low-frequency, high-skill tasks. These are specialized activities that happen rarely and require deep expertise. Keep them human but track time spent to reassess as your business scales.",
                bg: "#F8FAFC", border: "#CBD5E1", titleColor: "#374151",
              },
            ].map((q, i) => (
              <div key={i} style={{
                background: q.bg,
                border: `1.5px solid ${q.border}`,
                borderRadius: "12px",
                padding: "1.25rem",
              }}>
                <div style={{ fontWeight: 800, fontSize: "0.8125rem", color: q.titleColor, marginBottom: "0.5rem" }}>{q.title}</div>
                <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>{q.description}</p>
              </div>
            ))}
          </div>

          <SectionHeading>How to Map Your Business in 5 Steps</SectionHeading>
          <ol style={{ paddingLeft: "1.5rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 1.4 }}>
            {[
              { n: 1, title: "List every recurring task", body: "Spend 30 minutes listing everything your team does repeatedly — daily, weekly, and monthly. Include tasks that feel small. Focus on the moment between a client action and a business response." },
              { n: 2, title: "Rate frequency (1–5)", body: "Assign a frequency score: 1 = rarely (once a month or less), 5 = constantly (multiple times per day). Don't overthink this — a rough estimate is sufficient." },
              { n: 3, title: "Rate skill required (1–5)", body: "Assess how much professional judgment the task requires. Data entry and confirmations score low. Strategic advice and complex analysis score high." },
              { n: 4, title: "Plot on the matrix", body: "Place each task in one of the four quadrants. Tasks that score high frequency AND low skill go in the bottom-right — your Automate First zone." },
              { n: 5, title: "Prioritize by time cost", body: "Within the Automate First quadrant, rank tasks by time cost (frequency × minutes per occurrence). The top 3 items on this list are your automation roadmap." },
            ].map((step) => (
              <li key={step.n} style={{ marginBottom: "1.25rem", paddingLeft: "0.5rem" }}>
                <strong style={{ color: "#283891" }}>{step.title}.</strong>{" "}
                <span>{step.body}</span>
              </li>
            ))}
          </ol>

          <SectionHeading>Example: Immigration Firm Friction Map</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            Here's what a completed Friction Map looks like for a typical immigration law firm with 4–8 staff.
            Notice how several high-ROI tasks cluster in the bottom-right quadrant — and how client-facing strategy stays top-right.
          </p>

          <FrictionMatrix showDots={immigrationDots} isFilled title="Figure 2 — Immigration Firm Example" />

          <SectionHeading>Implementation Process</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            Once you've identified your Automate First tasks, implementation follows a proven sequence:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1.5rem 0" }}>
            {[
              { step: "1", title: "Document the current manual process", detail: "Map every step, tool, and decision point in the existing workflow." },
              { step: "2", title: "Identify software connections required", detail: "Determine which tools need to talk to each other (CRM, calendar, email, forms)." },
              { step: "3", title: "Configure automation logic", detail: "Build the workflow in your automation platform with conditional branching for edge cases." },
              { step: "4", title: "Test with real data", detail: "Run 10–20 real scenarios before going live. Catch failure modes early." },
              { step: "5", title: "Monitor and refine", detail: "Track error rates and outcomes for the first 2 weeks. Most workflows stabilize within a month." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: "1rem", alignItems: "flex-start",
                background: "#fff", border: "1px solid #E2E8F0",
                borderRadius: "12px", padding: "1rem 1.25rem",
              }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "#283891", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.8rem", flexShrink: 0,
                }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1A2E", marginBottom: "0.2rem" }}>{s.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "#7B7B7B" }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            background: "#7E0F4A",
            borderRadius: "20px",
            padding: "3rem 2.5rem",
            textAlign: "center",
            marginTop: "3rem",
          }}>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
              Want Us to Map Your Business?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
              We run a live Friction Mapping exercise as part of every Automation Audit. Book your free 60-minute session and leave with a completed matrix and prioritized action plan.
            </p>
            <Link href="/contact" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
              Book a Free Automation Audit →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
