/**
 * IntegrationPriorityMatrix.tsx
 * Resource guide: The Integration Priority Matrix
 * Route: /resources/integration-priority-matrix
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

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
  return <h2 style={{ fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, color: "#283891", marginBottom: "1rem", marginTop: "2.5rem" }}>{children}</h2>;
}

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}>
      {children}
    </div>
  );
}

type Priority = "Tier 1" | "Tier 2" | "Tier 3";

const MATRIX: { tool: string; category: string; priority: Priority; impact: string; effort: string; why: string }[] = [
  { tool: "CRM and Email", category: "Lead Management", priority: "Tier 1", impact: "Very High", effort: "Low", why: "Ensures every lead is captured and followed up without manual entry. Most businesses do this first." },
  { tool: "Web Form and CRM", category: "Lead Capture", priority: "Tier 1", impact: "Very High", effort: "Low", why: "Eliminates manual lead entry. Every form submission becomes a CRM record instantly." },
  { tool: "Calendar and CRM", category: "Scheduling", priority: "Tier 1", impact: "High", effort: "Low", why: "Bookings auto-create or update CRM records. No more manually logging appointments." },
  { tool: "Email and Task Manager", category: "Operations", priority: "Tier 2", impact: "High", effort: "Medium", why: "Converts email-based requests into trackable tasks. Reduces things falling through the cracks." },
  { tool: "Accounting and CRM", category: "Finance", priority: "Tier 2", impact: "High", effort: "Medium", why: "Eliminates double entry between sales and accounting. Especially valuable for recurring billing." },
  { tool: "Document Platform and CRM", category: "Document Management", priority: "Tier 2", impact: "High", effort: "Medium", why: "Contracts and signed docs automatically attach to client records. No manual uploads." },
  { tool: "Phone/SMS and CRM", category: "Communication", priority: "Tier 2", impact: "Medium", effort: "Medium", why: "Call logs and SMS threads sync to the client record. Improves team visibility and handoffs." },
  { tool: "Project Management and CRM", category: "Delivery", priority: "Tier 3", impact: "Medium", effort: "High", why: "Links client record to active projects. Valuable once core intake and billing are automated." },
  { tool: "Analytics and CRM", category: "Reporting", priority: "Tier 3", impact: "Medium", effort: "High", why: "Enables full-funnel reporting from lead source to revenue. Requires clean data in other systems first." },
  { tool: "Chat/Support and CRM", category: "Support", priority: "Tier 3", impact: "Medium", effort: "Medium", why: "Support tickets and chat transcripts attached to client records. Better for businesses with support volume." },
];

const PRIORITY_COLOR: Record<Priority, { bg: string; text: string }> = {
  "Tier 1": { bg: "#DCFCE7", text: "#15803D" },
  "Tier 2": { bg: "#FEF9C3", text: "#92400E" },
  "Tier 3": { bg: "#F3F4F6", text: "#4B5563" },
};

export default function IntegrationPriorityMatrix() {
  const [filter, setFilter] = useState<"All" | Priority>("All");

  const filtered = filter === "All" ? MATRIX : MATRIX.filter(r => r.priority === filter);

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #F7F9FC 100%)", borderBottom: "1px solid #E2E6F3", padding: "4rem 0 3rem" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <nav style={{ display: "flex", gap: "0.4rem", fontSize: "0.8rem", color: "#7B7B7B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#7B7B7B", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/resources" style={{ color: "#7B7B7B", textDecoration: "none" }}>Resources</Link>
            <span>/</span>
            <span style={{ color: "#1A1A2E", fontWeight: 600 }}>Integration Priority Matrix</span>
          </nav>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7E0F4A", marginBottom: "0.75rem" }}>
            Strategic Framework
          </p>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800, color: "#1A1A2E", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            The Integration Priority Matrix
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "#7B7B7B", lineHeight: 1.75, marginBottom: "2rem" }}>
            Not all integrations are equal. This matrix ranks the most common tool connections by business impact and implementation effort - so you know exactly where to start and what to leave for later.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Get a Custom Integration Plan</Link>
            <Link href="/integrations" style={{ display: "inline-block", padding: "0.75rem 1.5rem", border: "1.5px solid #283891", borderRadius: 8, color: "#283891", fontWeight: 700, textDecoration: "none" }}>Browse All Integrations</Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ maxWidth: 900, padding: "3rem 1rem" }}>

        <RevealSection>
          <SummaryBox>
            <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem" }}>How to read this matrix:</p>
            <p style={{ color: "#1A1A2E", lineHeight: 1.7 }}>
              <strong>Tier 1</strong> integrations deliver the highest impact for the lowest effort - do these first. <strong>Tier 2</strong> integrations unlock significant operational gains once Tier 1 is stable. <strong>Tier 3</strong> integrations are worth building eventually, but require cleaner data foundations first.
            </p>
          </SummaryBox>
        </RevealSection>

        <RevealSection>
          <SectionHeading>Why Integration Sequencing Matters</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Most businesses approach tool integration backwards - they start with the most visible system (often the CRM) and try to connect everything at once. The result is brittle automations, data conflicts, and teams who stop trusting the tools.
          </p>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "2rem" }}>
            The right approach is to establish a clean data flow in layers: first ensure every lead is captured (Tier 1), then ensure every job is billed correctly (Tier 2), then optimise for reporting and visibility (Tier 3). Each tier builds on the data quality established by the previous one.
          </p>
        </RevealSection>

        {/* Matrix Table */}
        <RevealSection>
          <SectionHeading>The Matrix</SectionHeading>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {(["All", "Tier 1", "Tier 2", "Tier 3"] as const).map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  padding: "0.5rem 1.125rem",
                  borderRadius: 6,
                  border: filter === t ? "none" : "1.5px solid #E2E6F3",
                  background: filter === t ? "#283891" : "white",
                  color: filter === t ? "white" : "#7B7B7B",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map(({ tool, category, priority, impact, effort, why }) => {
              const pc = PRIORITY_COLOR[priority];
              return (
                <div key={tool} style={{ background: "#F7F9FC", borderRadius: 12, padding: "1.25rem 1.5rem", border: "1px solid #E2E6F3" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.625rem" }}>
                    <div>
                      <p style={{ fontWeight: 800, color: "#1A1A2E", fontSize: "1rem", marginBottom: "0.2rem" }}>{tool}</p>
                      <p style={{ color: "#7B7B7B", fontSize: "0.8125rem" }}>{category}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ background: pc.bg, color: pc.text, fontWeight: 700, fontSize: "0.75rem", padding: "0.3rem 0.75rem", borderRadius: 20 }}>{priority}</span>
                      <span style={{ background: "#F0F4FF", color: "#283891", fontWeight: 600, fontSize: "0.75rem", padding: "0.3rem 0.75rem", borderRadius: 20 }}>Impact: {impact}</span>
                      <span style={{ background: "#FFF", color: "#7B7B7B", fontWeight: 600, fontSize: "0.75rem", padding: "0.3rem 0.75rem", borderRadius: 20, border: "1px solid #E2E6F3" }}>Effort: {effort}</span>
                    </div>
                  </div>
                  <p style={{ color: "#4B5563", lineHeight: 1.65, fontSize: "0.9375rem" }}>{why}</p>
                </div>
              );
            })}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>The Tier 1 Stack: What to Build First</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            For most service businesses, the Tier 1 stack looks like this: a web form feeds into your CRM, the CRM triggers an email sequence, and new bookings update the CRM record automatically. This takes 1 to 2 weeks to implement and typically saves 6 to 10 hours per week immediately.
          </p>
          <div style={{ background: "#F0F4FF", borderRadius: 12, padding: "1.5rem 1.75rem", marginBottom: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#283891", marginBottom: "1rem" }}>Tier 1 implementation order:</p>
            <ol style={{ paddingLeft: "1.25rem", color: "#1A1A2E", lineHeight: 2.2 }}>
              <li><strong>Week 1:</strong> Connect web form to CRM (all leads captured)</li>
              <li><strong>Week 1:</strong> Connect CRM to email (automated follow-up starts)</li>
              <li><strong>Week 2:</strong> Connect calendar to CRM (bookings logged automatically)</li>
              <li><strong>Week 2:</strong> Test full lead-to-booking flow, fix gaps</li>
            </ol>
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>Common Integration Mistakes</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { mistake: "Connecting too many tools at once", fix: "Pick one flow, get it working perfectly, then expand. Complexity compounds." },
              { mistake: "Skipping field mapping review", fix: "Spend 30 minutes reviewing which fields sync and how. Mismatched fields cause bad data." },
              { mistake: "No error notifications", fix: "Set up alerts for failed automation runs. Silent failures are harder to catch than noisy ones." },
              { mistake: "Automating a broken process", fix: "Fix manual workflow gaps before automating. Automation amplifies both efficiency and dysfunction." },
              { mistake: "Over-engineering the trigger logic", fix: "Start with simple triggers (form submitted, create record). Add conditions later once the base flow is stable." },
            ].map(({ mistake, fix }) => (
              <div key={mistake} style={{ display: "flex", gap: "1.25rem", background: "white", border: "1px solid #E2E6F3", borderRadius: 10, padding: "1.125rem 1.5rem" }}>
                <div style={{ color: "#DC2626", fontSize: "1.25rem", flexShrink: 0, lineHeight: 1 }}>x</div>
                <div>
                  <p style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "0.25rem" }}>Mistake: {mistake}</p>
                  <p style={{ color: "#7B7B7B", fontSize: "0.9375rem" }}><strong style={{ color: "#16A34A" }}>Fix:</strong> {fix}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection>
          <div style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginTop: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>
              Want a Custom Integration Roadmap?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 520, margin: "0 auto 1.75rem" }}>
              We will audit your current tool stack and build you a prioritised integration plan - starting with the connections that save the most time.
            </p>
            <Link href="/contact" style={{ display: "inline-block", padding: "0.875rem 2rem", background: "#7E0F4A", color: "white", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
              Book Your Free Audit
            </Link>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
