/**
 * AutomateClientIntake.tsx
 * Resource guide: "How to Automate Client Intake Without Switching Software"
 * Route: /resources/automate-client-intake
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";

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

const STEPS = [
  { num: 1, title: "Trigger: Lead Fills Out Web Form", desc: "A potential client submits your intake form - name, contact info, service needed, urgency. This event fires automatically." },
  { num: 2, title: "Instant Acknowledgement Email Sent", desc: "Within 90 seconds, the lead receives a personalised confirmation email with next steps and your calendar link." },
  { num: 3, title: "CRM Record Created Automatically", desc: "Contact details, service type, and source are pushed into your CRM. No manual data entry, no copy-paste errors." },
  { num: 4, title: "Intake Questionnaire Delivered", desc: "A tailored questionnaire is sent based on the service selected. Responses populate the same CRM record." },
  { num: 5, title: "Document Request (If Applicable)", desc: "For services requiring supporting docs, a secure upload link is sent. Files are attached to the client record." },
  { num: 6, title: "Appointment Booked via Calendar Link", desc: "Client books a consultation directly into your availability. Reminder emails are sent 24h and 1h before." },
  { num: 7, title: "Your Team Notified - Ready to Serve", desc: "By the time you open the file, the client's intake is complete. You focus on the consultation, not admin." },
];

const BEFORE_AFTER = [
  { label: "Time to first response", before: "4–24 hours", after: "90 seconds" },
  { label: "Intake completion rate", before: "~55%", after: "85–90%" },
  { label: "Admin time per new client", before: "45–60 min", after: "5 min" },
  { label: "Data entry errors", before: "Frequent", after: "Near zero" },
  { label: "Drop-off due to slow follow-up", before: "High", after: "Minimal" },
];

// ─── Graphic 3: ImplementationTimeline using WorkflowDiagram ─────────────────

function ImplementationTimeline() {
  return (
    <div style={{ margin: "1.5rem 0 2rem" }}>
      <WorkflowDiagram
        steps={[
          { label: "Map Current Process", type: "trigger" },
          { label: "Configure Logic", type: "action" },
          { label: "Connect Tools", type: "action" },
          { label: "Test Scenarios", type: "ai" },
          { label: "Deploy + Monitor", type: "outcome" },
        ]}
        resultBadge="Live in 2–4 weeks"
      />
    </div>
  );
}

export default function AutomateClientIntake() {
  useEffect(() => {
    document.title = "How to Automate Client Intake Without Switching Software | Barrana AI";
  }, []);

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #F7F9FC 100%)", borderBottom: "1px solid #E2E6F3", padding: "4rem 0 3rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <nav style={{ display: "flex", gap: "0.4rem", fontSize: "0.8rem", color: "#7B7B7B", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "#7B7B7B", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/resources" style={{ color: "#7B7B7B", textDecoration: "none" }}>Resources</Link>
            <span>/</span>
            <span style={{ color: "#1A1A2E", fontWeight: 600 }}>Automate Client Intake</span>
          </nav>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span style={{
              background: "#F0FDF4", color: "#16A34A",
              fontWeight: 700, fontSize: "0.75rem",
              letterSpacing: "0.07em", textTransform: "uppercase",
              borderRadius: "999px", padding: "0.3rem 0.85rem",
            }}>
              Implementation
            </span>
            <span style={{ fontSize: "0.8125rem", color: "#7B7B7B" }}>⏱ 15 min read</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 800, color: "#1A1A2E", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            How to Automate Client Intake Without Switching Software
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "#7B7B7B", lineHeight: 1.75, marginBottom: "2rem" }}>
            Your intake process sets the tone for every client relationship - yet most service businesses are still handling it manually. This guide walks through a complete automated intake system: from first form submission to a fully briefed team member, with zero data entry.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Get This Built for Your Business</Link>
            <Link href="/automation-planner" style={{ display: "inline-block", padding: "0.75rem 1.5rem", border: "1.5px solid #283891", borderRadius: 8, color: "#283891", fontWeight: 700, textDecoration: "none" }}>Take the Planner</Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ maxWidth: 800, padding: "3rem 1rem" }}>

        <RevealSection>
          <SummaryBox>
            <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem" }}>The core insight:</p>
            <p style={{ color: "#1A1A2E", lineHeight: 1.7 }}>
              Client intake is the highest-leverage automation in most service businesses. It touches every new client, happens repeatedly, and is highly predictable - making it ideal for automation. The businesses that automate intake first typically recover 8–12 hours per week within 30 days.
            </p>
          </SummaryBox>
        </RevealSection>

        <RevealSection>
          <SectionHeading>Why Manual Intake Costs You More Than You Think</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Every time a new client enquires, your team is likely performing the same sequence of tasks: sending a welcome email, creating a CRM record, asking for documents, scheduling a call. Multiply that by every new client across a year, and you are looking at hundreds of hours of pure admin.
          </p>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            Beyond time, slow intake has a direct revenue impact. Studies show that responding to an inbound lead within 5 minutes makes you 100 times more likely to connect than waiting 30 minutes. For most businesses doing manual intake, the average response time is 4+ hours. By then, the prospect has often moved on.
          </p>
          <div style={{ background: "#FFF5F5", border: "1px solid #FECACA", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
            <p style={{ fontWeight: 700, color: "#B91C1C", marginBottom: "0.5rem" }}>The hidden cost of a slow intake process:</p>
            <ul style={{ color: "#7B7B7B", lineHeight: 2, paddingLeft: "1.25rem" }}>
              <li>Lost leads who did not hear back fast enough</li>
              <li>Incomplete intake files that delay billable work</li>
              <li>Staff time spent chasing missing documents</li>
              <li>Data entry errors creating downstream problems</li>
              <li>No-shows from prospects who were not properly nurtured</li>
            </ul>
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>The 7-Step Automated Intake System</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Here is how a complete automated intake system works from end to end. This can be implemented for most service businesses within 1 to 2 weeks.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", background: "#F7F9FC", borderRadius: 12, padding: "1.25rem 1.5rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#283891", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.875rem", flexShrink: 0 }}>
                  {num}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "0.25rem" }}>{title}</p>
                  <p style={{ color: "#7B7B7B", lineHeight: 1.65, fontSize: "0.9375rem" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>Before vs. After: By the Numbers</SectionHeading>
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #E2E6F3", marginBottom: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#283891", padding: "0.75rem 1.25rem", gap: "1rem" }}>
              <span style={{ fontWeight: 700, color: "white", fontSize: "0.875rem" }}>Metric</span>
              <span style={{ fontWeight: 700, color: "#93c5fd", fontSize: "0.875rem" }}>Before</span>
              <span style={{ fontWeight: 700, color: "#86efac", fontSize: "0.875rem" }}>After</span>
            </div>
            {BEFORE_AFTER.map(({ label, before, after }, i) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "0.875rem 1.25rem", gap: "1rem", background: i % 2 === 0 ? "white" : "#F7F9FC", borderTop: "1px solid #E2E6F3" }}>
                <span style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.9rem" }}>{label}</span>
                <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{before}</span>
                <span style={{ color: "#16A34A", fontWeight: 600, fontSize: "0.9rem" }}>{after}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>What Tools Are Involved?</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            The beauty of client intake automation is that it works with the tools you already have. You do not need to replace your CRM or email platform - you simply connect them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { name: "Web forms", examples: "Typeform, Gravity Forms, JotForm" },
              { name: "CRM", examples: "HubSpot, Clio, Salesforce, GoHighLevel" },
              { name: "Email", examples: "Gmail, Outlook, ActiveCampaign" },
              { name: "Calendar", examples: "Calendly, Acuity, Google Calendar" },
              { name: "Document collection", examples: "DocuSign, PandaDoc, ShareFile" },
              { name: "Automation layer", examples: "Make, Zapier, n8n" },
            ].map(({ name, examples }) => (
              <div key={name} style={{ background: "#F7F9FC", borderRadius: 10, padding: "1rem 1.25rem", border: "1px solid #E2E6F3" }}>
                <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.25rem", fontSize: "0.9375rem" }}>{name}</p>
                <p style={{ color: "#7B7B7B", fontSize: "0.8125rem" }}>{examples}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>Industry-Specific Considerations</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            While the core intake flow is universal, some industries have specific requirements:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { industry: "Law Firms", note: "Client intake must include conflict check before full intake proceeds. Automation can trigger a manual conflict-check step before releasing sensitive questionnaires." },
              { industry: "Immigration Consultants", note: "Document requirements vary by case type. Use conditional logic to deliver the right document checklist based on visa category or service selected." },
              { industry: "Physiotherapy and Medical Clinics", note: "Health intake forms require consent. Automate the delivery and digital signing of consent forms before the first appointment." },
              { industry: "Accounting Firms", note: "Onboarding requires copies of prior-year returns, ID, and authorization. Automated document requests with deadline reminders dramatically increase completion rates." },
              { industry: "Real Estate Teams", note: "Buyer and seller intake are different flows. Use service-type branching to deliver the right questions, timeline, and document requests automatically." },
            ].map(({ industry, note }) => (
              <div key={industry} style={{ background: "white", border: "1px solid #E2E6F3", borderRadius: 10, padding: "1.125rem 1.5rem" }}>
                <p style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "0.375rem" }}>{industry}</p>
                <p style={{ color: "#7B7B7B", lineHeight: 1.65, fontSize: "0.9375rem" }}>{note}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>How to Get Started</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { step: "Map your current intake flow", detail: "Write down every step from first contact to ready-for-service. Note where delays happen and what requires manual input." },
              { step: "Identify your highest-friction point", detail: "Is it the initial response? Document collection? Booking? Start with the step that causes the most drop-off or wasted time." },
              { step: "Build the automation in layers", detail: "Start simple: form to CRM to confirmation email. Then layer in questionnaires, document requests, and calendar booking." },
              { step: "Test with real leads", detail: "Submit a test enquiry and follow the entire automated flow as if you were the client. Fix gaps before going live." },
              { step: "Monitor and refine", detail: "Track intake completion rates. If questionnaires go unanswered, add a 48h reminder. Automation improves over time." },
            ].map(({ step, detail }, i) => (
              <div key={step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#7E0F4A", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0, marginTop: 2 }}>
                  {i + 1}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "0.25rem" }}>{step}</p>
                  <p style={{ color: "#7B7B7B", lineHeight: 1.65, fontSize: "0.9375rem" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading>Implementation Timeline</SectionHeading>
          <p style={{ color: "#7B7B7B", lineHeight: 1.75, marginBottom: "1rem" }}>
            A complete intake automation goes live in 2–4 weeks following five sequential steps:
          </p>
          <ImplementationTimeline />
        </RevealSection>

        {/* CTA */}
        <RevealSection>
          <div style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginTop: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>
              Ready to Automate Your Intake Process?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 520, margin: "0 auto 1.75rem" }}>
              Most of our clients have a fully automated intake system live within 2 weeks. Book a free audit and we will map exactly what your intake flow looks like automated.
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
