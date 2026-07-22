/**
 * AutomationROI.tsx
 * Resource guide: How to Calculate the ROI of Business Automation
 * Route: /resources/automation-roi
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// ─── Shared helpers ────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "4px solid #283891", background: "#F0F4FF", borderRadius: "0 12px 12px 0", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, color: "#283891", marginBottom: "1rem", marginTop: "2.5rem" }}>
      {children}
    </h2>
  );
}

// ─── ROI Pyramid graphic ───────────────────────────────────────────────────────

const PYRAMID_LAYERS = [
  { icon: "📈", label: "Layer 4: Scalability", sub: "More clients, same team", shade: "rgba(40,56,145,0.45)", width: "45%" },
  { icon: "💰", label: "Layer 3: Revenue Captured", sub: "Leads and clients retained", shade: "rgba(40,56,145,0.62)", width: "60%" },
  { icon: "✓", label: "Layer 2: Error Reduction", sub: "Rework hours eliminated", shade: "rgba(40,56,145,0.78)", width: "76%" },
  { icon: "⏰", label: "Layer 1: Time Saved", sub: "$$ per week recovered", shade: "#283891", width: "95%" },
];

function ROIPyramid() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "2rem 0", margin: "2rem 0" }}
    >
      {PYRAMID_LAYERS.map((layer, i) => (
        <div
          key={i}
          style={{
            width: layer.width,
            maxWidth: "640px",
            background: layer.shade,
            borderRadius: "8px",
            padding: "0.875rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.45s ease ${(PYRAMID_LAYERS.length - 1 - i) * 0.15}s, transform 0.45s ease ${(PYRAMID_LAYERS.length - 1 - i) * 0.15}s`,
          }}
        >
          <span style={{ fontSize: "1.375rem", flexShrink: 0 }}>{layer.icon}</span>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.3 }}>{layer.label}</div>
            <div style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.8125rem", marginTop: "2px" }}>{layer.sub}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: "0.75rem", fontSize: "0.8125rem", color: "#7B7B7B", textAlign: "center" }}>
        The Automation ROI Stack - value compounds as you move up
      </div>
    </div>
  );
}

// ─── Formula boxes ─────────────────────────────────────────────────────────────

function FormulaBox({ label, formula }: { label: string; formula: string }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#283891", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
      <div style={{ background: "#F5F5F5", border: "1px solid #E2E2E2", borderRadius: "8px", padding: "1rem 1.25rem", fontFamily: "monospace", fontSize: "0.9375rem", color: "#1A1A2E", lineHeight: 1.7, overflowX: "auto", whiteSpace: "pre-wrap" }}>
        {formula}
      </div>
    </div>
  );
}

// ─── ROI Preview card ──────────────────────────────────────────────────────────

function ROIPreviewCard() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        background: "#1A1A2E",
        borderRadius: "16px",
        padding: "2rem",
        margin: "2rem 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        maxWidth: "560px",
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
        ROI SNAPSHOT - Example Business
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8125rem", marginBottom: "0.35rem" }}>
            Time Savings (Layer 1)
          </div>
          <div style={{ color: "#4ADE80", fontWeight: 700, fontSize: "1.0625rem", fontFamily: "monospace" }}>
            12 hrs/week × $35/hr × 52 weeks = <span style={{ fontSize: "1.25rem" }}>$21,840</span> saved/year
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8125rem", marginBottom: "0.35rem" }}>
            Revenue at Risk (Layer 3)
          </div>
          <div style={{ color: "#4ADE80", fontWeight: 700, fontSize: "1.0625rem", fontFamily: "monospace" }}>
            5 missed leads/month × $2,000 avg × 12 = <span style={{ fontSize: "1.25rem" }}>$120,000</span> revenue protected
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Combined annual opportunity</div>
            <div style={{ color: "#4ADE80", fontWeight: 800, fontSize: "1.75rem", fontFamily: "monospace" }}>$141,840</div>
          </div>
          <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "8px", padding: "0.5rem 1rem", color: "#4ADE80", fontSize: "0.8125rem", fontWeight: 700 }}>
            Payback: 30–90 days
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AutomationROI() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#1A1A2E" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #283891 0%, #1A1A2E 100%)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
            <Link href="/resources" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Resources</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>Automation ROI</span>
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(126,15,74,0.35)", border: "1px solid rgba(126,15,74,0.6)", borderRadius: "2rem", padding: "0.3rem 0.9rem", marginBottom: "1.25rem" }}>
            <span style={{ color: "#E8A0C5", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>ROI</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.875rem,4vw,2.875rem)", fontWeight: 900, color: "#fff", lineHeight: 1.18, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            How to Calculate the ROI of Business Automation
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>10 min read</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Framework + Examples</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <SummaryBox>
          <div style={{ fontWeight: 700, color: "#283891", fontSize: "1.0625rem", marginBottom: "0.625rem" }}>
            The Automation ROI Stack
          </div>
          <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.75, fontSize: "0.9375rem" }}>
            Most ROI calculations only count time saved - and therefore understate the value of automation by 5–10×. The Automation ROI Stack is a four-layer framework that captures every dimension of value: direct time recovery, error elimination, revenue protection, and the compounding multiplier of scalability. This guide walks you through measuring each layer and building a defensible business case.
          </p>
        </SummaryBox>

        <SectionHeading>The Four ROI Layers</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          Business automation delivers value through four distinct mechanisms. Each layer builds on the one below it - and each is real, measurable money that your business is currently leaving on the table.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "0.75rem" }}>
          <strong>Layer 1 - Time Saved</strong> is the most visible: hours of manual work your team no longer needs to do. Data entry, scheduling, follow-ups, report generation - these hours have a direct dollar value at your team's loaded cost rate.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "0.75rem" }}>
          <strong>Layer 2 - Error Reduction</strong> captures the cost of rework, corrections, missed deadlines, and client complaints caused by human error in repetitive processes. Automated processes don't fat-finger numbers or forget to attach files.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "0.75rem" }}>
          <strong>Layer 3 - Revenue Captured</strong> is often the largest layer for client-facing businesses. Slow follow-up, dropped leads, missed renewals, and delayed proposals are revenue that evaporates silently. Automation closes that gap.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1.5rem" }}>
          <strong>Layer 4 - Scalability</strong> is the compounding multiplier. Once your workflows are automated, you can serve 2× the clients with the same headcount. The marginal cost of growth collapses. This is where automation transitions from cost-saving to business transformation.
        </p>

        <ROIPyramid />

        <SectionHeading>How to Calculate Each Layer</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1.5rem" }}>
          Use these formulas to build your ROI estimate. You don't need exact numbers - conservative estimates still produce compelling cases. The goal is to set a floor, not a ceiling.
        </p>

        <FormulaBox
          label="Layer 1 - Time Saved"
          formula={`Hours saved per week
× Loaded hourly cost (salary + benefits + overhead)
× 52 weeks
= Annual time savings value

Example: 15 hrs/week × $40/hr × 52 = $31,200/year`}
        />
        <FormulaBox
          label="Layer 2 - Error Reduction"
          formula={`Estimated rework hours per month
× Hourly cost
× 12 months
+ Client churn attributed to errors × avg client value
= Annual error cost eliminated

Example: 8 hrs/month × $40 × 12 = $3,840 + 1 client × $12,000 = $15,840/year`}
        />
        <FormulaBox
          label="Layer 3 - Revenue Captured"
          formula={`Leads lost per month (slow follow-up, missed enquiries)
× Average client lifetime value
× 12 months
= Annual revenue at risk

Example: 4 leads/month × $3,500 LTV × 12 = $168,000/year`}
        />
        <FormulaBox
          label="Layer 4 - Scalability Multiplier"
          formula={`Current revenue per FTE
× % capacity freed by automation
× Team size
= Additional revenue capacity unlocked (no new hires)

Example: $180,000/FTE × 25% × 4 FTEs = $180,000 incremental capacity`}
        />

        <ROIPreviewCard />

        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/automation-roi-calculator"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#283891", fontWeight: 700, fontSize: "1rem", textDecoration: "none", borderBottom: "2px solid #283891", paddingBottom: "2px" }}
          >
            Try the Interactive Calculator →
          </Link>
        </div>

        <SectionHeading>Typical ROI Timeline</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          Automation projects typically require an upfront investment in setup, configuration, and process mapping - usually 20–60 hours of professional services depending on complexity. This one-time cost is then weighed against recurring savings that compound every week.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          For most small and mid-sized businesses, the payback period lands between <strong>30 and 90 days</strong>. Businesses with higher staff costs or larger lead pipelines often see payback within the first 2–4 weeks.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          Implementation costs typically range from $3,000–$15,000 for a comprehensive automation overhaul. Against an annual value creation of $50,000–$300,000 (across all four ROI layers), this represents a 5–30× return in year one alone - with zero incremental cost in subsequent years.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "0.5rem" }}>
          The key insight: <strong>the question is rarely "can we afford automation?"</strong> - it's "what is it costing us every month we delay?"
        </p>

        {/* CTA */}
        <div style={{ background: "#283891", borderRadius: "20px", padding: "3rem 2.5rem", marginTop: "4rem", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.375rem,3vw,2rem)", fontWeight: 800, marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
            Ready to Build Your ROI Case?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.78)", marginBottom: "2rem", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
            We'll map your workflows, estimate your four-layer ROI, and show you exactly what automation would return for your specific business.
          </p>
          <Link
            href="/contact"
            style={{ display: "inline-block", background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2.25rem", borderRadius: "10px", textDecoration: "none", letterSpacing: "0.01em" }}
          >
            Get Your Free ROI Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}
