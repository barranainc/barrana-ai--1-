import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";

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
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E2E8F0", padding: "1rem 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", padding: 0 }}>
        {q}
        <span style={{ fontSize: "1.25rem", color: "#283891", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

function OnboardingTimeline() {
  const { ref, visible } = useReveal();
  const manualSteps = [
    { label: "Send Welcome", time: "Day 1" },
    { label: "Send Intake Form", time: "Day 1 (if remembered)" },
    { label: "Follow Up Form", time: "Day 3-5" },
    { label: "Create CRM Record", time: "Day 2-3" },
    { label: "Request Documents", time: "Day 3" },
    { label: "Book First Meeting", time: "Day 4-5" },
    { label: "Assign Team Member", time: "Day 2" },
  ];
  const autoSteps = [
    { label: "Welcome + Intake Form", time: "< 60 sec" },
    { label: "CRM Record Created", time: "< 2 min" },
    { label: "Document Request", time: "Instant" },
    { label: "Booking Link Sent", time: "Instant" },
    { label: "Team Assigned", time: "Instant" },
    { label: "Day 3 Check-in", time: "Auto" },
    { label: "Day 7 Update", time: "Auto" },
  ];

  return (
    <div ref={ref} style={{ marginBottom: "2rem" }}>
      {/* Manual row */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontWeight: 700, color: "#DC2626", fontSize: "0.9rem" }}>Manual Onboarding</span>
          <span style={{ fontWeight: 800, color: "#DC2626", fontSize: "0.9rem" }}>2–5 days</span>
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {manualSteps.map((s, i) => (
            <div key={i} style={{
              background: visible ? "#FEF2F2" : "#F1F5F9",
              border: "1px solid #FECACA",
              borderRadius: 8,
              padding: "0.4rem 0.7rem",
              fontSize: "0.78rem",
              transition: `background 0.4s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontWeight: 600, color: "#DC2626" }}>{s.label}</div>
              <div style={{ color: "#7B7B7B", fontSize: "0.7rem" }}>{s.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: "1.5rem", color: "#7B7B7B", marginBottom: "1.25rem" }}>↓ Automation compresses this to minutes</div>

      {/* Auto row */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontWeight: 700, color: "#0D9668", fontSize: "0.9rem" }}>Automated Onboarding</span>
          <span style={{ fontWeight: 800, color: "#0D9668", fontSize: "0.9rem" }}>&lt; 5 minutes</span>
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {autoSteps.map((s, i) => (
            <div key={i} style={{
              background: visible ? "#F0FDF4" : "#F1F5F9",
              border: "1px solid #BBF7D0",
              borderRadius: 8,
              padding: "0.4rem 0.7rem",
              fontSize: "0.78rem",
              transition: `background 0.4s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontWeight: 600, color: "#0D9668" }}>{s.label}</div>
              <div style={{ color: "#7B7B7B", fontSize: "0.7rem" }}>{s.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IndustryOnboardingCards() {
  const { ref, visible } = useReveal();
  const industries = [
    {
      name: "Immigration",
      icon: "🛂",
      points: ["Visa type determines document checklist", "Conditional intake branches by case type", "Automated deadline tracking from filing date"],
    },
    {
      name: "Accounting",
      icon: "📊",
      points: ["T1/T2/bookkeeping triggers different workflow", "Tax year data request automated at intake", "CRA consent form dispatched with e-signature"],
    },
    {
      name: "Law",
      icon: "⚖️",
      points: ["Matter classification on intake", "Conflict check triggered automatically", "Retainer agreement sent via e-signature"],
    },
    {
      name: "Clinic",
      icon: "🏥",
      points: ["Health history form at booking confirmation", "Insurance verification request automated", "Appointment prep instructions by service type"],
    },
  ];

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
      {industries.map((ind, i) => (
        <div key={i} style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: 12,
          padding: "1.25rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{ind.icon}</div>
          <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.75rem" }}>{ind.name}</div>
          <ul style={{ paddingLeft: "1rem", margin: 0 }}>
            {ind.points.map((p, j) => (
              <li key={j} style={{ color: "#7B7B7B", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: "0.35rem" }}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Automate Client Onboarding Using Your Current Tools",
  "description": "Automated client onboarding handles welcome email, intake form, CRM record creation, document collection, first appointment scheduling, and team assignment.",
  "step": [
    { "@type": "HowToStep", "name": "Trigger welcome email and intake form on contract signing" },
    { "@type": "HowToStep", "name": "Create CRM record from form responses automatically" },
    { "@type": "HowToStep", "name": "Send document request with dynamic checklist" },
    { "@type": "HowToStep", "name": "Book first meeting via calendar integration" },
    { "@type": "HowToStep", "name": "Assign team member and send Day 3 and Day 7 check-ins" },
  ],
};

export default function ClientOnboardingWorkflow() {
  return (
    <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{ background: "#EEF2FF", color: "#283891", fontWeight: 600, fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>Workflow Guide</span>
          <span style={{ background: "#F8F9FA", color: "#7B7B7B", fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>10 min read</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 900, color: "#1A1A2E", lineHeight: 1.2, marginBottom: "1rem" }}>
          How to Automate Client Onboarding Using Your Current Tools
        </h1>
        <SummaryBox>
          <p style={{ margin: 0, color: "#283891", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Automated client onboarding handles: welcome email delivery, intake form distribution and tracking, CRM record creation from form responses, document collection initiation, first appointment scheduling, and team member assignment. It ensures every new client receives the same professional experience regardless of who handles them or when they sign up. Common tools: CRM (existing), Typeform or Google Forms, document portal, calendar integration, and Make for orchestration. Implementation: 2–4 weeks. Reduces intake time from 30–45 minutes to under 5 minutes of staff review.
          </p>
        </SummaryBox>
      </div>

      {/* Section 1 */}
      <SectionHeading>The Manual Onboarding Problem</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Manual client onboarding is a 7-step process that a person has to execute over 2–5 days. Send the welcome email. Remember to attach the intake form. Follow up when the form isn't completed. Manually create the CRM record. Send a document request. Try to book the first meeting. Figure out who on the team should be assigned. Each step requires context, each step requires data entry, and each step can fail if someone is busy or on holiday.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        The client experience varies depending on who handles the file. A client who signs up on a Monday gets a different experience than one who signs up on a Friday. That inconsistency is a risk to your reputation and your operations.
      </p>

      {/* Section 2 */}
      <SectionHeading>What Automated Onboarding Delivers</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Every new client receives, without exception:
      </p>
      <ul style={{ color: "#1A1A2E", lineHeight: 1.9, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li>Instant confirmation and welcome message within 60 seconds of contract signing</li>
        <li>A tailored intake form matched to their service type</li>
        <li>Secure document upload link with a dynamic checklist</li>
        <li>Calendar link for the first meeting</li>
        <li>Team member assignment with a personal introduction</li>
        <li>Automated Day 3 check-in to confirm they've completed the intake steps</li>
        <li>Automated Day 7 status update so nothing falls through</li>
      </ul>

      {/* Section 3 */}
      <SectionHeading>The 7-Step Automated Onboarding Sequence</SectionHeading>
      <ol style={{ color: "#1A1A2E", lineHeight: 1.8, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Trigger (contract signed or payment received)</strong> — The webhook fires when a contract is signed via e-signature or payment is received. This is the single source of truth for "client is confirmed."
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Welcome email sent instantly</strong> — Personalized with the client's name, service type, and assigned team member. Sets expectations for what happens next.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Intake form dispatched</strong> — A service-type-specific intake form (built in Typeform or Google Forms) is sent within the same email or as a follow-up 5 minutes later.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>CRM record created automatically</strong> — All fields populated from the contract/payment data. The intake form responses map directly into CRM fields when submitted.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Document request sent</strong> — A dynamic checklist based on service type, delivered via a secure upload portal link.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Booking link sent for first meeting</strong> — The client schedules their first consultation from real-time calendar availability.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Team member assigned and notified</strong> — Assignment based on service type, caseload, or round-robin. The team member receives a briefing email with all context collected so far.
        </li>
      </ol>

      {/* Timeline */}
      <OnboardingTimeline />

      {/* Section 4 */}
      <SectionHeading>How It Adapts by Industry</SectionHeading>
      <IndustryOnboardingCards />

      {/* Workflow Diagram */}
      <WorkflowDiagram
        steps={[
          { label: "Contract Signed", type: "trigger" },
          { label: "Welcome + Intake Form", type: "action" },
          { label: "CRM Record Created", type: "action" },
          { label: "Document Request Sent", type: "action" },
          { label: "First Meeting Booked", type: "action" },
          { label: "Team Member Assigned", type: "outcome" },
        ]}
        resultBadge="Client live in under 10 minutes"
      />

      {/* Section 5 */}
      <SectionHeading>What Stays Human in Onboarding</SectionHeading>
      <ul style={{ color: "#1A1A2E", lineHeight: 1.9, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li>Professional assessment and scoping of the engagement</li>
        <li>Advice on service selection where the client is unsure</li>
        <li>Any situation requiring clinical, legal, or financial judgement</li>
        <li>Situations where the client has questions about the process before proceeding</li>
      </ul>

      {/* Section 6 */}
      <SectionHeading>Tools</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { tool: "Your existing CRM", note: "HubSpot, Zoho, or similar. Make populates it via API — no manual data entry." },
          { tool: "Typeform / Google Forms", note: "For the intake form. Both integrate cleanly with Make. Responses map to CRM fields." },
          { tool: "PandaDoc / DocuSign", note: "E-signature for contracts. Contract signing is the trigger for the entire onboarding sequence." },
          { tool: "Make (Integromat)", note: "The orchestration layer. Connects every tool, runs the conditional logic, manages the sequence." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#F8F9FA", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
            <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.4rem", fontSize: "0.9rem" }}>{item.tool}</div>
            <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>

      {/* Section 7 */}
      <SectionHeading>Implementation Timeline and Cost</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { week: "Week 1-2", label: "Audit + Design", note: "Map the current process, define service types, design the intake form, plan document checklists." },
          { week: "Week 2-3", label: "Build + Connect", note: "Build the Make scenario, connect CRM, set up intake form, configure e-signature trigger." },
          { week: "Week 3-4", label: "Test + Launch", note: "End-to-end testing with real data, team training, parallel run alongside manual process." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#EEF2FF", borderRadius: 10, padding: "1.1rem" }}>
            <div style={{ fontWeight: 700, color: "#283891", fontSize: "0.8rem", marginBottom: "0.2rem" }}>{item.week}</div>
            <div style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "0.4rem" }}>{item.label}</div>
            <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        <strong>Typical cost: $2,500–$5,000</strong> for a full onboarding sequence covering one or two service types. Multi-service builds with conditional branching are priced based on complexity.
      </p>

      {/* Before/After */}
      <BeforeAfterSection metrics={[
        { label: "Time to Complete Onboarding", before: "2-5 days", after: "< 10 minutes", beforeW: 90, afterW: 5 },
        { label: "Staff Time on Intake", before: "30-45 min/client", after: "< 5 min review", beforeW: 80, afterW: 10 },
        { label: "Intake Form Completion Rate", before: "60-70%", after: "90-95%", beforeW: 65, afterW: 95 },
        { label: "Onboarding Consistency", before: "Variable", after: "100%", beforeW: 50, afterW: 100 },
      ]} />

      {/* FAQ */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <div style={{ marginBottom: "2.5rem" }}>
        <FAQItem q="Our onboarding is different for every client. Can it still be automated?" a="Partially, yes. The common steps — welcome, CRM creation, document request, booking — can almost always be automated. The custom elements are layered on top via conditional logic. You define the service types and we build the branches accordingly." />
        <FAQItem q="What if the client doesn't complete the intake form?" a="A 48-hour reminder fires automatically, then a 5-day reminder with a slightly more direct tone. If still incomplete at Day 7, an escalation alert goes to the assigned team member for personal follow-up. Nothing falls through silently." />
        <FAQItem q="Can it handle multiple service types?" a="Yes. Conditional logic in Make routes different service types through different onboarding sequences — different intake forms, different document checklists, different team assignments. This is one of the core design elements." />
        <FAQItem q="Does the client need to download any software?" a="No. Everything is delivered via email and web link. The intake form, document portal, booking link, and e-signature are all browser-based. No app download required for the client." />
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #283891 0%, #1A1A2E 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Ready to Give Every Client a World-Class First Impression?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Map your current onboarding process and see where automation compresses the timeline.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/automation-planner">
            <a style={{ background: "#7E0F4A", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>Start the Automation Planner</a>
          </Link>
          <Link href="/contact">
            <a style={{ background: "transparent", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a>
          </Link>
        </div>
      </div>

      {/* Related Links */}
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.75rem" }}>Related</h3>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {[
            { label: "Client Intake Automation", href: "/services/client-intake-automation" },
            { label: "Document Collection Workflow", href: "/workflows/document-collection" },
            { label: "What to Automate First", href: "/insights/what-to-automate-first" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <a style={{ background: "#F0F4FF", color: "#283891", padding: "0.5rem 1rem", borderRadius: 20, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>{link.label}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
