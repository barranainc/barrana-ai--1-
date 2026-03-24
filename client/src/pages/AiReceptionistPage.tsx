import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import { colors, spacing, typography, surfaces } from "@/styles/design-tokens";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `4px solid ${colors.navy}`, background: colors.navyWash, borderRadius: "0 12px 12px 0", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ ...typography.sectionHeading, marginBottom: "1rem", marginTop: "2.5rem" }}>{children}</h2>;
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E2E8F0", padding: "1rem 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", padding: 0 }}
      >
        {q}
        <span style={{ fontSize: "1.25rem", color: "#283891", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: "1rem" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

// ─── Graphic 1: AI Receptionist Call Flow ────────────────────────────────────

function CallFlowDiagram() {
  const { ref, visible } = useReveal();

  const mainFlow = [
    { label: "Call Arrives", type: "trigger", color: "#B45309", bg: "#FEF3C7", border: "#F59E0B" },
    { label: "AI Greeting", type: "action", color: "#283891", bg: "#EFF6FF", border: "#283891" },
    { label: "Qualify Caller", type: "ai", color: "#7E0F4A", bg: "#FDF2F8", border: "#7E0F4A" },
    { label: "Route Decision", type: "action", color: "#283891", bg: "#EFF6FF", border: "#283891" },
  ];

  const outcomes = [
    { label: "Book Appointment", desc: "Calendar + CRM record created", color: "#15803D", bg: "#F0FDF4", border: "#16A34A" },
    { label: "Transfer to Human", desc: "Warm handoff with context brief", color: "#283891", bg: "#EFF6FF", border: "#283891" },
    { label: "Take a Message", desc: "CRM record + team notification", color: "#7E0F4A", bg: "#FDF2F8", border: "#7E0F4A" },
  ];

  return (
    <div ref={ref} style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "2rem", margin: "2rem 0" }}>
      <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A2E", marginBottom: "1.5rem" }}>AI Receptionist Call Flow</h3>

      {/* Main flow — horizontal */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem", overflowX: "auto", paddingBottom: 4 }}>
        {mainFlow.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              background: step.bg,
              border: `2px solid ${step.border}`,
              borderRadius: step.label === "Route Decision" ? "50%" : 10,
              padding: step.label === "Route Decision" ? "0.875rem" : "0.625rem 1rem",
              width: step.label === "Route Decision" ? 80 : "auto",
              height: step.label === "Route Decision" ? 80 : "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.2rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.8)",
              transition: `opacity 0.4s ease ${i * 0.15}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: step.color, opacity: 0.7 }}>{step.type}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1A1A2E", lineHeight: 1.2 }}>{step.label}</div>
            </div>
            {i < mainFlow.length - 1 && (
              <div style={{ width: 24, height: 2, background: "#CBD5E1", flexShrink: 0, margin: "0 2px", opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${0.08 + i * 0.15}s`, position: "relative" }}>
                <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderLeft: "6px solid #CBD5E1", borderTop: "4px solid transparent", borderBottom: "4px solid transparent" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3-way branch */}
      <div style={{ borderTop: "2px dashed #CBD5E1", paddingTop: "1.5rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7B7B7B", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "1rem" }}>Routing Outcomes</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.875rem" }}>
          {outcomes.map((o, i) => (
            <div key={o.label} style={{
              background: o.bg,
              border: `2px solid ${o.border}`,
              borderRadius: 12,
              padding: "1rem 1.1rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.4s ease ${0.6 + i * 0.12}s, transform 0.4s ease ${0.6 + i * 0.12}s`,
            }}>
              <div style={{ fontWeight: 800, fontSize: "0.875rem", color: o.color, marginBottom: "0.3rem" }}>{o.label}</div>
              <div style={{ fontSize: "0.775rem", color: "#7B7B7B" }}>{o.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final outcome badge */}
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        {["CRM record created", "Calendar entry added", "Team briefing delivered"].map((badge, i) => (
          <div key={badge} style={{
            background: "#F0FDF4", border: "1.5px solid #16A34A", borderRadius: 24, padding: "0.3rem 0.875rem",
            fontSize: "0.775rem", fontWeight: 700, color: "#15803D",
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease ${0.9 + i * 0.1}s`,
          }}>
            ✓ {badge}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Graphic 2: Coverage Timeline ────────────────────────────────────────────

function CoverageTimeline() {
  const { ref, visible } = useReveal();

  const rows = [
    {
      label: "Human Receptionist",
      segments: Array.from({ length: 24 }, (_, h) => ({
        covered: h >= 9 && h < 17,
        color: h >= 9 && h < 17 ? "#16A34A" : "#FCA5A5",
        isMissed: h < 9 || h >= 17,
      })),
      missedLabel: "Missed calls",
    },
    {
      label: "AI Receptionist",
      segments: Array.from({ length: 24 }, () => ({ covered: true, color: "#0F766E", isMissed: false })),
      missedLabel: null,
    },
    {
      label: "Hybrid (Recommended)",
      segments: Array.from({ length: 24 }, (_, h) => ({
        covered: true,
        color: h >= 9 && h < 17 ? "#283891" : "#0F766E",
        isMissed: false,
      })),
      missedLabel: null,
    },
  ];

  const hours = Array.from({ length: 24 }, (_, h) => h);

  return (
    <div ref={ref} style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "2rem", margin: "2rem 0", overflowX: "auto" }}>
      <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A2E", marginBottom: "1.5rem" }}>Call Coverage: 24-Hour Comparison</h3>

      {/* Hour labels */}
      <div style={{ display: "flex", gap: 0, marginBottom: "0.5rem", paddingLeft: 180 }}>
        {[0, 6, 12, 18, 23].map(h => (
          <div key={h} style={{ flex: h === 23 ? 1 : 6, fontSize: "0.65rem", color: "#7B7B7B", textAlign: "left" }}>
            {h === 0 ? "12am" : h === 6 ? "6am" : h === 12 ? "12pm" : h === 18 ? "6pm" : "11pm"}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: 540 }}>
        {rows.map((row, ri) => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 172, flexShrink: 0, fontSize: "0.8rem", fontWeight: 600, color: "#1A1A2E", textAlign: "right" }}>{row.label}</div>
            <div style={{ flex: 1, display: "flex", height: 28, borderRadius: 6, overflow: "hidden", gap: "1px" }}>
              {hours.map((h, i) => (
                <div
                  key={h}
                  title={`${h}:00`}
                  style={{
                    flex: 1,
                    background: visible ? row.segments[i].color : "#E2E8F0",
                    transition: `background 0.05s ease ${ri * 0.15 + i * 0.02}s`,
                    position: "relative",
                  }}
                />
              ))}
            </div>
            {row.missedLabel && (
              <div style={{
                background: "#FEE2E2", border: "1px solid #FCA5A5", color: "#DC2626",
                borderRadius: 6, padding: "0.2rem 0.5rem", fontSize: "0.7rem", fontWeight: 700,
                flexShrink: 0, whiteSpace: "nowrap",
                opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.8s",
              }}>
                {row.missedLabel}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.25rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
        {[
          { color: "#16A34A", label: "Human (9am–5pm)" },
          { color: "#FCA5A5", label: "Unattended (missed calls)" },
          { color: "#0F766E", label: "AI Receptionist" },
          { color: "#283891", label: "Human (business hours)" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#7B7B7B" }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: l.color, flexShrink: 0 }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AiReceptionistPage() {
  useEffect(() => { document.title = "AI Receptionist for Small Businesses and Professional Services | Barrana.ai"; }, []);

  const faqs = [
    { q: "Will callers know they're talking to an AI?", a: "The AI identifies itself as an automated assistant for your business. We do not recommend or build deceptive AI implementations. Transparency is both ethically correct and better for your brand — callers appreciate knowing what they are interacting with." },
    { q: "What languages does it support?", a: "English and French are supported as standard. Additional languages are available on request depending on the platform selected for your implementation." },
    { q: "Can it actually book appointments in my calendar?", a: "Yes, with direct calendar integration. We integrate with Jane App, Calendly, Google Calendar, and most CRM-native calendars. Appointments booked through the AI receptionist appear in your calendar in real time." },
    { q: "What happens if the AI can't handle a call?", a: "Calls escalate to a human automatically based on defined triggers — a caller request, a complex or ambiguous query, or detection of specific keywords (complaint, urgent, legal). The AI never abandons a caller without providing an escalation path." },
    { q: "Is the call data stored privately?", a: "Yes. Calls are stored within your system only. We do not route call data through third-party storage without your knowledge. All Canadian business implementations follow PIPEDA guidelines for personal data handling." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "AI Receptionist for Small Businesses and Professional Services",
        "author": { "@type": "Organization", "name": "Barrana.ai" },
        "datePublished": "2024-01-01",
        "publisher": { "@type": "Organization", "name": "Barrana.ai", "url": "https://barrana.ai" },
        "description": "An AI receptionist answers calls 24/7, qualifies callers, books appointments, and creates CRM records. Costs $200-$500/month vs $3,000-$4,000/month for a human. Best for after-hours coverage and overflow.",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barrana.ai/" },
          { "@type": "ListItem", "position": 2, "name": "AI Tools", "item": "https://barrana.ai/ai-tools" },
          { "@type": "ListItem", "position": 3, "name": "AI Receptionist", "item": "https://barrana.ai/ai-receptionist" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <section style={{ ...surfaces.darkGradient, color: "#fff", paddingTop: spacing.sectionPadding, paddingBottom: spacing.sectionPaddingSm }}>
        <div className="container">
          <nav style={{ display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span>AI Tools</span>
            <span>/</span>
            <span style={{ color: "#fff" }}>AI Receptionist</span>
          </nav>
          <div style={{ display: "inline-block", background: "#283891", color: "#fff", borderRadius: 24, padding: "0.3rem 0.875rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
            AI Tools
          </div>
          <h1 style={{ ...typography.pageTitle, color: "#fff", maxWidth: 740, marginBottom: "1rem" }}>
            AI Receptionist for Small Businesses and Professional Services
          </h1>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>10 min read</div>
        </div>
      </section>

      {/* ── Body ── */}
      <main style={{ background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: spacing.sectionPadding + " 1.5rem" }}>

          {/* AEO Summary */}
          <SummaryBox>
            <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#283891", marginBottom: "0.625rem" }}>Quick Answer</div>
            <p style={{ color: "#1A1A2E", lineHeight: 1.75, margin: 0, fontSize: "0.9375rem" }}>
              An AI receptionist is a voice-based or text-based AI agent that answers phone calls and messages for your business 24/7. It qualifies callers, books appointments, creates CRM records, and delivers briefings — handling the tasks a human receptionist does, but without business-hour limits. Typical cost: $200–$500/month vs $3,000–$4,000/month for a human. Best for: after-hours coverage, overflow during peak hours, and consistent call handling. Not a replacement for human interaction in emotionally sensitive or complex situations.
            </p>
          </SummaryBox>

          {/* Who This Applies To */}
          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
            <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C2410C", marginBottom: "0.625rem" }}>Who This Applies To</div>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#1A1A2E", lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li>Service businesses that receive 20+ inbound calls or enquiries per month</li>
              <li>Practices that miss calls after hours or during peak periods</li>
              <li>Clinics, law firms, accounting practices, contractors, and immigration firms</li>
            </ul>
          </div>

          {/* Section 1 */}
          <SectionHeading>What an AI Receptionist Actually Does (Step by Step)</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            An AI receptionist is not a phone menu. It is a conversational agent that handles calls the way a trained human receptionist would — except it operates 24 hours a day, 7 days a week, without variation in quality.
          </p>
          <ol style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Answers the call.</strong> Within 1–2 rings, the AI greets the caller using your business name and a natural-sounding opening.</li>
            <li><strong>Qualifies the caller.</strong> It asks 2–3 questions to determine what the caller needs, how urgent the matter is, and whether it can be handled immediately.</li>
            <li><strong>Routes or handles.</strong> Based on the qualification, the AI either books an appointment, transfers to the right team member with a context brief, or takes a detailed message.</li>
            <li><strong>Creates the CRM record.</strong> Every call creates or updates a record in your CRM with caller details, the nature of the enquiry, and the outcome.</li>
            <li><strong>Delivers the briefing.</strong> If the call results in a handoff, the relevant team member receives a briefing — by SMS, email, or CRM notification — before they speak to the caller.</li>
          </ol>
          <CallFlowDiagram />

          {/* Section 2 */}
          <SectionHeading>AI Receptionist vs Human Receptionist: An Honest Comparison</SectionHeading>
          <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#F0F4FF" }}>
                  <th style={{ padding: "0.875rem 1rem", textAlign: "left", fontWeight: 700, color: "#283891", borderBottom: "2px solid #C7D2FE" }}>Factor</th>
                  <th style={{ padding: "0.875rem 1rem", textAlign: "left", fontWeight: 700, color: "#7E0F4A", borderBottom: "2px solid #C7D2FE" }}>Human Receptionist</th>
                  <th style={{ padding: "0.875rem 1rem", textAlign: "left", fontWeight: 700, color: "#0F766E", borderBottom: "2px solid #C7D2FE" }}>AI Receptionist</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor: "Availability", human: "Business hours only (8–9 hrs/day)", ai: "24/7, 365 days" },
                  { factor: "Monthly cost", human: "$3,000–$4,000 CAD + benefits", ai: "$200–$500 + $2,000–$4,000 setup" },
                  { factor: "Consistency", human: "Varies by day, mood, and workload", ai: "Identical quality on every call" },
                  { factor: "Complex handling", human: "Strong — adapts to any situation", ai: "Limited — rule-based routing only" },
                  { factor: "Emotional intelligence", human: "High — detects and responds to tone", ai: "Basic — keyword and sentiment detection" },
                  { factor: "Scalability", human: "Requires additional headcount", ai: "Handles unlimited concurrent calls" },
                ].map((row, i) => (
                  <tr key={row.factor} style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFF", borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "#1A1A2E" }}>{row.factor}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#4B5563" }}>{row.human}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#4B5563" }}>{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Neither is always better. The right choice depends on the type of calls your business receives. Emotionally complex calls — complaints, grief counselling, high-stakes decisions — benefit from human handling. Routine booking, qualification, and information calls are ideal for AI.
          </p>

          {/* Section 3 */}
          <SectionHeading>AI Receptionist vs Chatbot: Different Tools for Different Jobs</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ background: "#F8FAFF", border: "2px solid #E2E8F0", borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ fontWeight: 800, color: "#283891", marginBottom: "0.5rem" }}>Chatbot</div>
              <ul style={{ color: "#4B5563", fontSize: "0.875rem", lineHeight: 1.8, margin: 0, paddingLeft: "1.1rem" }}>
                <li>Text only</li>
                <li>Website only</li>
                <li>Answers FAQs and routes simple enquiries</li>
                <li>Visitor-initiated</li>
                <li>Best for website lead capture</li>
              </ul>
            </div>
            <div style={{ background: "#F0FDF9", border: "2px solid #0F766E", borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ fontWeight: 800, color: "#0F766E", marginBottom: "0.5rem" }}>AI Receptionist</div>
              <ul style={{ color: "#4B5563", fontSize: "0.875rem", lineHeight: 1.8, margin: 0, paddingLeft: "1.1rem" }}>
                <li>Voice and text</li>
                <li>Phone, website, and SMS</li>
                <li>Qualifies, routes, and books</li>
                <li>Inbound call-initiated</li>
                <li>Best for after-hours and overflow coverage</li>
              </ul>
            </div>
          </div>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            A chatbot handles website visitors who are browsing. An AI receptionist handles callers who are ready to act. They serve different points in the client journey and often operate together in the same business.
          </p>

          {/* Section 4 */}
          <SectionHeading>How It Works for Each Industry</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
            {[
              { industry: "Accounting Practices", desc: "The AI qualifies the caller — new client, existing client, tax season enquiry — collects their name and contact details, requests the relevant documents, and books the initial consultation directly into the accountant's calendar." },
              { industry: "Law Firms", desc: "The AI qualifies the matter type (family, corporate, immigration, criminal), collects the caller's details, provides an estimated response timeframe, and routes urgent matters to an on-call paralegal or duty line." },
              { industry: "Medical and Allied Health Clinics", desc: "The AI handles after-hours appointment booking, prescription refill requests, and general enquiries. Urgent medical calls are escalated to an on-call nurse line or emergency services as appropriate." },
              { industry: "Contractors and Trade Businesses", desc: "The AI collects job type, location, urgency, and contact information. Emergency calls (flood, electrical fault) are escalated immediately. Standard enquiries receive a callback booking within business hours." },
              { industry: "Immigration Consultants", desc: "The AI qualifies the visa type the caller needs assistance with, assesses urgency, collects contact details, and books a consultation. Complex or distressed callers are escalated to a regulated consultant." },
            ].map(ind => (
              <div key={ind.industry} style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.1rem 1.5rem", background: "#FAFBFF" }}>
                <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.35rem", fontSize: "0.95rem" }}>{ind.industry}</div>
                <p style={{ color: "#4B5563", lineHeight: 1.7, margin: 0, fontSize: "0.9rem" }}>{ind.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 5: Coverage Timeline */}
          <SectionHeading>Coverage Without Limits: What 24/7 Means in Practice</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            A human receptionist covers 9am to 5pm. That is 8 hours out of 24. The remaining 16 hours — evenings, early mornings, weekends — every inbound call goes unanswered or hits a voicemail that most callers will not leave a message on. Research consistently shows that 30–50% of missed calls never call back.
          </p>
          <CoverageTimeline />
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            The hybrid model is most effective for professional services: human receptionist during business hours for complex and high-value calls, AI receptionist for after-hours and overflow. This gives callers a human experience when they need it and consistent coverage when they do not.
          </p>

          {/* Section 6 */}
          <SectionHeading>What Caller Experience Looks Like</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>A sample AI receptionist call for an accounting firm:</p>
          <div style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "1.5rem", margin: "1.5rem 0" }}>
            {[
              { speaker: "AI", text: "Thank you for calling Meridian Accounting. I'm the automated assistant for the firm. How can I help you today?" },
              { speaker: "Caller", text: "Hi, I need help with my taxes — I'm a new client." },
              { speaker: "AI", text: "I can help you get started. Are you a sole proprietor, incorporated, or filing as an individual?" },
              { speaker: "Caller", text: "I'm incorporated — small business." },
              { speaker: "AI", text: "Great. I can book you in for a free 30-minute consultation with one of our corporate tax advisors. Do you have a preferred time this week?" },
              { speaker: "Caller", text: "Thursday afternoon works." },
              { speaker: "AI", text: "I have Thursday at 2pm and 3:30pm available. Which works better for you?" },
              { speaker: "Caller", text: "2pm please." },
              { speaker: "AI", text: "Done — you're booked for Thursday at 2pm. I'll send a confirmation to the email you provide. Can I get your name and best email?" },
            ].map((line, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", marginBottom: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 48, padding: "0.25rem 0.5rem", borderRadius: 6, background: line.speaker === "AI" ? "#EFF6FF" : "#FFF7ED", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", color: line.speaker === "AI" ? "#283891" : "#C2410C", textAlign: "center" }}>
                  {line.speaker}
                </div>
                <p style={{ color: "#4B5563", lineHeight: 1.7, margin: 0, fontSize: "0.9rem" }}>{line.text}</p>
              </div>
            ))}
          </div>

          {/* Section 7 */}
          <SectionHeading>When to Escalate to a Human</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            A well-designed AI receptionist escalates proactively in the following situations:
          </p>
          <ul style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Emotionally distressed callers</strong> — detected through tone, keywords ("emergency," "desperate," "please help"), or explicit statements</li>
            <li><strong>Complex complaints</strong> — any caller expressing dissatisfaction, disputes, or legal concerns</li>
            <li><strong>Sensitive personal situations</strong> — medical emergencies, domestic situations, anything requiring immediate human judgement</li>
            <li><strong>High-value prospects</strong> — callers who explicitly ask to speak to a person or who the AI cannot adequately qualify</li>
          </ul>

          {/* Section 8 */}
          <SectionHeading>Risks and How to Avoid Them</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
            {[
              { risk: "Brand risk: overly robotic tone", mitigation: "Design the AI's greeting and responses using your brand voice. Avoid generic corporate language. Test with real callers before launch. The AI should sound like your business, not like a call centre." },
              { risk: "Privacy risk: handling sensitive caller data", mitigation: "Define exactly what data the AI collects, where it is stored, and who has access. For professional services handling regulated information, ensure your implementation follows PIPEDA guidelines and sector-specific requirements." },
              { risk: "Reliability risk: what if the AI fails during a call", mitigation: "Every implementation should include a fallback path — voicemail, forwarding to a mobile, or an emergency contact number. Callers must always have a route to communicate with your business, even if the AI is unavailable." },
            ].map(r => (
              <div key={r.risk} style={{ border: "1px solid #FED7AA", borderRadius: 12, padding: "1.1rem 1.5rem", background: "#FFFBEB" }}>
                <div style={{ fontWeight: 700, color: "#B45309", marginBottom: "0.35rem", fontSize: "0.9rem" }}>Risk: {r.risk}</div>
                <p style={{ color: "#4B5563", lineHeight: 1.7, margin: 0, fontSize: "0.875rem" }}><strong>Mitigation:</strong> {r.mitigation}</p>
              </div>
            ))}
          </div>

          {/* Section: Cost */}
          <SectionHeading>Cost Breakdown</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
            {[
              { label: "Platform cost", value: "$200–$500/month", note: "Ongoing AI receptionist service" },
              { label: "Setup & configuration", value: "$2,000–$4,000", note: "One-time build and integration" },
              { label: "Human receptionist", value: "$3,000–$4,000/month", note: "Salary + benefits, business hours only" },
              { label: "Break-even", value: "Month 1–2", note: "Typical ROI timeline" },
            ].map(c => (
              <div key={c.label} style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7B7B7B", marginBottom: "0.5rem" }}>{c.label}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#283891", marginBottom: "0.3rem" }}>{c.value}</div>
                <div style={{ fontSize: "0.8rem", color: "#7B7B7B" }}>{c.note}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            For most service businesses receiving 30+ inbound calls per month, an AI receptionist pays for its setup cost within the first 1–2 months — before accounting for after-hours leads that would previously have been missed entirely.
          </p>

          {/* FAQ */}
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div style={{ marginBottom: "2.5rem" }}>
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          {/* CTA */}
          <div style={{ ...surfaces.darkGradient, borderRadius: 20, padding: "3rem 2rem", textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              Stop missing after-hours calls.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto 1.75rem" }}>
              Book a free Automation Audit to see whether an AI receptionist is right for your business — or explore the full AI Receptionist service.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#7E0F4A", color: "#fff", borderRadius: 8, padding: "0.875rem 1.75rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                Book a Free Audit
              </Link>
              <Link href="/services/ai-receptionist" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 8, padding: "0.875rem 1.75rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                See the AI Receptionist Service
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7B7B7B", marginBottom: "1rem" }}>Related Resources</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { label: "AI Receptionist Service", href: "/services/ai-receptionist" },
                { label: "After-Hours Automation", href: "/services/after-hours-automation" },
                { label: "AI Adoption for Small Businesses", href: "/ai-adoption-small-business" },
                { label: "What to Automate First", href: "/insights/what-to-automate-first" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ background: "#F0F4FF", color: "#283891", border: "1px solid #C7D2FE", borderRadius: 8, padding: "0.4rem 0.875rem", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
