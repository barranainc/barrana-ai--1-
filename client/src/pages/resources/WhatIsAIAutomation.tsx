/**
 * WhatIsAIAutomation.tsx
 * Resource guide: "What Is AI Automation for Small Business?"
 * Route: /resources/what-is-ai-automation
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

// ─── Graphic 1: ManualVsAutomatedFlow ─────────────────────────────────────────

const manualSteps = [
  { label: "Client Submits Form", delay: "" },
  { label: "Staff Reads Email", delay: "2–4 hrs" },
  { label: "Creates CRM Record", delay: "15 min" },
  { label: "Sends Confirmation", delay: "10 min" },
  { label: "Schedules Meeting", delay: "20 min" },
];

function ManualVsAutomatedFlow() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "2rem",
        margin: "2rem 0",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Left — Manual */}
        <div style={{ flex: "1 1 260px" }}>
          <div style={{
            fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#DC2626", marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span style={{ fontSize: "1rem" }}>✗</span> Without Automation
          </div>
          {manualSteps.map((step, i) => (
            <div key={i}>
              <div
                style={{
                  background: "#FEE2E2",
                  border: "1.5px solid #DC2626",
                  borderRadius: "999px",
                  padding: "0.5rem 1.1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#7F1D1D",
                  textAlign: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-24px)",
                  transition: `opacity 0.4s ease ${i * 0.18}s, transform 0.4s ease ${i * 0.18}s`,
                }}
              >
                {step.label}
              </div>
              {i < manualSteps.length - 1 && (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  margin: "0.25rem 0",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.3s ease ${i * 0.18 + 0.1}s`,
                }}>
                  <div style={{ width: "2px", height: "12px", background: "#FCA5A5" }} />
                  {step.delay && (
                    <span style={{
                      fontSize: "0.7rem", color: "#DC2626", fontWeight: 700,
                      background: "#FEF2F2", border: "1px solid #FECACA",
                      borderRadius: "4px", padding: "1px 6px",
                    }}>
                      ⏱ {step.delay}
                    </span>
                  )}
                  <div style={{ width: "2px", height: "12px", background: "#FCA5A5" }} />
                </div>
              )}
            </div>
          ))}
          <div style={{
            marginTop: "1rem",
            background: "#DC2626", color: "#fff",
            borderRadius: "8px", padding: "0.6rem 1rem",
            fontWeight: 800, fontSize: "0.875rem", textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: `opacity 0.5s ease ${manualSteps.length * 0.18}s`,
          }}>
            Total: 3–5 hours
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: "1px", background: "#E2E8F0",
          alignSelf: "stretch", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ background: "#fff", padding: "4px", fontSize: "1.25rem" }}>⚡</span>
        </div>

        {/* Right — Automated */}
        <div style={{ flex: "1 1 260px" }}>
          <div style={{
            fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#16A34A", marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span style={{ fontSize: "1rem" }}>✓</span> With Automation
          </div>
          <div style={{
            background: "#F0FDF4", border: "1.5px solid #16A34A",
            borderRadius: "12px", padding: "1.25rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: `opacity 0.6s ease ${manualSteps.length * 0.18 + 0.15}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${manualSteps.length * 0.18 + 0.15}s`,
          }}>
            {manualSteps.map((step, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "0.35rem 0",
                borderBottom: i < manualSteps.length - 1 ? "1px solid #DCFCE7" : "none",
              }}>
                <span style={{ color: "#16A34A", fontWeight: 900, fontSize: "1rem", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#14532D" }}>{step.label}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: "1rem",
            background: "#16A34A", color: "#fff",
            borderRadius: "8px", padding: "0.6rem 1rem",
            fontWeight: 800, fontSize: "0.875rem", textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: `opacity 0.5s ease ${manualSteps.length * 0.18 + 0.3}s`,
          }}>
            ⚡ Total: 90 seconds
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Graphic 2: ROI Timeline ──────────────────────────────────────────────────

const roiNodes = [
  { label: "Week 0", sublabel: "Investment", type: "cost" as const },
  { label: "Week 2–3", sublabel: "First workflow live", type: "milestone" as const },
  { label: "Week 4–6", sublabel: "ROI breakeven", type: "milestone" as const },
  { label: "Month 3–6", sublabel: "Compounding returns", type: "return" as const },
];

function ROITimeline() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        margin: "2rem 0",
        overflowX: "auto",
      }}
    >
      <div style={{ minWidth: "520px" }}>
        {/* Return bars (above timeline) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: "0.5rem", height: "80px" }}>
          {roiNodes.map((node, i) => (
            <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
              {node.type === "return" && (
                <div style={{
                  width: "40px",
                  height: visible ? "72px" : "0px",
                  background: "linear-gradient(to top, #16A34A, #4ADE80)",
                  borderRadius: "6px 6px 0 0",
                  transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15 + 0.4}s`,
                  position: "relative",
                }}>
                  <span style={{
                    position: "absolute", top: "-22px", left: "50%", transform: "translateX(-50%)",
                    fontSize: "0.65rem", fontWeight: 800, color: "#16A34A", whiteSpace: "nowrap",
                  }}>+ROI</span>
                </div>
              )}
              {node.type === "milestone" && i === 2 && (
                <div style={{
                  width: "28px",
                  height: visible ? "36px" : "0px",
                  background: "linear-gradient(to top, #22C55E, #86EFAC)",
                  borderRadius: "6px 6px 0 0",
                  transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15 + 0.4}s`,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Horizontal line */}
        <div style={{ position: "relative", height: "4px", background: "#E2E8F0", borderRadius: "2px", margin: "0" }}>
          <div style={{
            position: "absolute", left: 0, top: 0,
            height: "100%", background: "#283891", borderRadius: "2px",
            width: visible ? "100%" : "0%",
            transition: "width 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }} />
          {/* Nodes */}
          {roiNodes.map((node, i) => {
            const leftPct = i === 0 ? 0 : i === 1 ? 33 : i === 2 ? 66 : 100;
            return (
              <div key={i} style={{
                position: "absolute",
                left: `${leftPct}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "14px", height: "14px",
                background: node.type === "cost" ? "#DC2626" : "#283891",
                border: "2.5px solid #fff",
                borderRadius: "50%",
                boxShadow: "0 0 0 2px " + (node.type === "cost" ? "#DC2626" : "#283891"),
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.2 + 0.3}s`,
                zIndex: 2,
              }} />
            );
          })}
        </div>

        {/* Cost bar (below timeline) */}
        <div style={{ display: "flex", paddingTop: "0.5rem", height: "70px", alignItems: "flex-start" }}>
          {roiNodes.map((node, i) => (
            <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              {node.type === "cost" && (
                <div style={{
                  width: "40px",
                  height: visible ? "60px" : "0px",
                  background: "linear-gradient(to bottom, #DC2626, #FCA5A5)",
                  borderRadius: "0 0 6px 6px",
                  transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s`,
                  position: "relative",
                }}>
                  <span style={{
                    position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
                    fontSize: "0.65rem", fontWeight: 800, color: "#DC2626", whiteSpace: "nowrap",
                  }}>Invest</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Labels */}
        <div style={{ display: "flex", marginTop: "1.5rem" }}>
          {roiNodes.map((node, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#283891" }}>{node.label}</div>
              <div style={{ fontSize: "0.7rem", color: "#7B7B7B", marginTop: "2px" }}>{node.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Graphic 3: Five Starting Points Cards ────────────────────────────────────

const startingPoints = [
  { emoji: "📥", title: "Client Intake", benefit: "Cut intake time from days to minutes", href: "/services/client-intake-automation" },
  { emoji: "📧", title: "Email Follow-up", benefit: "Never miss a lead with automated sequences", href: "/services/email-automation" },
  { emoji: "📅", title: "Appointment Booking", benefit: "Fill your calendar without back-and-forth", href: "/services/appointment-booking-automation" },
  { emoji: "🧾", title: "Invoice & Payments", benefit: "Get paid faster with automated billing", href: "/services/invoice-payment-automation" },
  { emoji: "📊", title: "Reporting & Dashboards", benefit: "Real-time insights without manual data pulls", href: "/services/reporting-dashboard-automation" },
];

function StartingPointCards() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        margin: "2rem 0",
      }}
    >
      {startingPoints.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          style={{
            flex: "1 1 160px",
            background: "#fff",
            border: "1.5px solid #E2E8F0",
            borderRadius: "14px",
            padding: "1.25rem 1rem",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0.5rem",
            cursor: "pointer",
            transition: `opacity 0.45s ease ${i * 0.1}s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s, border-color 0.2s, box-shadow 0.2s`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#283891";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(40,56,145,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
          }}
        >
          <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
          <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1A1A2E" }}>{item.title}</span>
          <span style={{ fontSize: "0.78rem", color: "#7B7B7B", lineHeight: 1.4 }}>{item.benefit}</span>
          <span style={{ fontSize: "0.75rem", color: "#283891", fontWeight: 700, marginTop: "0.25rem" }}>Learn more →</span>
        </Link>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WhatIsAIAutomation() {
  useEffect(() => {
    document.title = "What Is AI Automation for Service Businesses? | Barrana AI";
  }, []);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "3rem 0 2.5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: "0.8125rem", color: "#7B7B7B", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Link href="/" style={{ color: "#7B7B7B", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/resources" style={{ color: "#7B7B7B", textDecoration: "none" }}>Resources</Link>
            <span>/</span>
            <span style={{ color: "#1A1A2E" }}>What Is AI Automation</span>
          </nav>

          {/* Category + read time */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{
              background: "#EEF2FF", color: "#283891",
              fontWeight: 700, fontSize: "0.75rem",
              letterSpacing: "0.07em", textTransform: "uppercase",
              borderRadius: "999px", padding: "0.3rem 0.85rem",
            }}>
              Getting Started
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#7B7B7B" }}>⏱ 8 min read</span>
          </div>

          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 900,
            color: "#1A1A2E",
            lineHeight: 1.18,
            marginBottom: "0",
          }}>
            What Is AI Automation for Service Businesses?
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "2.5rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <SummaryBox>
            <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Quick Summary</p>
            <p style={{ fontSize: "0.9375rem", color: "#1A1A2E", lineHeight: 1.65, margin: 0 }}>
              AI automation for service businesses means connecting your existing software tools — CRM, email, calendar, forms — with intelligent logic that handles repetitive tasks automatically.
              It eliminates the manual middle layer between client actions and business outcomes. You don't need to change your software stack, hire a developer, or understand code.
              Most businesses see full ROI within 4–6 weeks of their first workflow going live.
            </p>
          </SummaryBox>

          <SectionHeading>What AI Automation Actually Means</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            When most people hear "AI automation," they imagine robots replacing staff or enterprise-scale software transformations.
            For service businesses — service firms, professional practices, independent operators — it means something far more practical:
            getting your software to do the repetitive tasks your team currently does by hand.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            Think about what happens after a client fills out your contact form. Someone on your team reads the email, creates a CRM entry, sends a confirmation, and schedules a meeting.
            That sequence might take a skilled staff member 30–45 minutes across the day — interrupted, delayed, and error-prone.
            With automation, the exact same sequence runs in 90 seconds, every time, without human involvement.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
            The "AI" component means the system can handle variability: reading unstructured form responses, classifying inquiry types, routing leads to the right team member,
            and drafting personalized replies — not just filling in template fields.
          </p>

          <ManualVsAutomatedFlow />

          <SectionHeading>What It Is Not</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            AI automation is not a replacement for professional judgment. It does not make decisions about client advice, complex filings, or nuanced service delivery.
            It handles the administrative layer around those decisions — freeing your professionals to focus on work that requires expertise.
          </p>
          <ul style={{ paddingLeft: "1.5rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 2 }}>
            <li>It is <strong>not</strong> a new software platform you need to learn</li>
            <li>It is <strong>not</strong> a developer project costing six figures</li>
            <li>It is <strong>not</strong> something that requires changing your current tools</li>
            <li>It is <strong>not</strong> an AI chatbot bolted onto your website</li>
            <li>It is <strong>not</strong> a replacement for the staff who handle complex work</li>
          </ul>

          <SectionHeading>What It Costs</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
            For a professional services firm in Canada, a complete AI automation implementation — including scoping, build, testing, and training — typically ranges
            from <strong>$3,000 to $15,000 CAD</strong> depending on the number of workflows and integrations involved.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
            The ongoing monthly cost for automation platform licenses (Make, Zapier, or similar) is typically $50–$200/month for a growing firm.
            Compare that against the cost of a staff member spending 10 hours per week on tasks that automation would eliminate — the math resolves quickly.
          </p>

          <ROITimeline />

          <SectionHeading>Five Common Starting Points</SectionHeading>
          <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Most firms start with one high-friction workflow and expand from there. The five starting points below represent the highest ROI opportunities for professional services businesses.
            Each takes 2–4 weeks to implement and pays for itself within the first month.
          </p>
          <ol style={{ paddingLeft: "1.5rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 2 }}>
            <li><strong>Client Intake Automation</strong> — Capture, qualify, and respond to new leads automatically</li>
            <li><strong>Email Follow-up Sequences</strong> — Nurture prospects without manual outreach</li>
            <li><strong>Appointment Booking</strong> — Eliminate the back-and-forth scheduling loop</li>
            <li><strong>Invoice and Payment Reminders</strong> — Reduce accounts receivable with automated billing</li>
            <li><strong>Reporting and Dashboards</strong> — Aggregate data across tools without manual exports</li>
          </ol>

          <StartingPointCards />

          {/* CTA */}
          <div style={{
            background: "#283891",
            borderRadius: "20px",
            padding: "3rem 2.5rem",
            textAlign: "center",
            marginTop: "3rem",
          }}>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
              Ready to Implement This?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
              Book a free 60-minute Automation Audit. We'll map your highest-friction workflows and show you exactly what's automatable — no obligation.
            </p>
            <Link href="/contact" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
              Book Your Free Automation Audit →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
