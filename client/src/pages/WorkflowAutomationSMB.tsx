import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";

// ─── Shared helpers ───────────────────────────────────────────────────────────

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

// ─── Graphic 1: The 8-Workflow Chain ─────────────────────────────────────────

function WorkflowChainDiagram() {
  const { ref, visible } = useReveal();
  const workflows = [
    { num: 1, name: "Lead Intake", trigger: "Form submitted", color: "#283891" },
    { num: 2, name: "Missed Call", trigger: "Call not answered", color: "#3B4FBF" },
    { num: 3, name: "Booking", trigger: "Slot confirmed", color: "#7E0F4A" },
    { num: 4, name: "Onboarding", trigger: "Contract signed", color: "#9B1A5C" },
    { num: 5, name: "Documents", trigger: "Checklist sent", color: "#283891" },
    { num: 6, name: "Invoicing", trigger: "Job complete", color: "#0F766E" },
    { num: 7, name: "Handoffs", trigger: "Stage transition", color: "#7E0F4A" },
    { num: 8, name: "Reporting", trigger: "Weekly trigger", color: "#3B4FBF" },
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0", background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "2rem", overflowX: "auto" }}>
      <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A2E", marginBottom: "1.5rem" }}>The 8 Core Business Workflows — Connected</h3>

      {/* Desktop: horizontal chain */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, minWidth: 700 }}>
        {workflows.map((wf, i) => (
          <div key={wf.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div
              style={{
                background: "#fff",
                border: `2px solid ${wf.color}`,
                borderTop: `4px solid ${wf.color}`,
                borderRadius: 10,
                padding: "0.875rem 0.625rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: wf.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.75rem" }}>
                {wf.num}
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.775rem", color: "#1A1A2E", textAlign: "center", lineHeight: 1.2 }}>{wf.name}</div>
              <div style={{ fontSize: "0.65rem", color: "#7B7B7B", textAlign: "center", lineHeight: 1.3 }}>{wf.trigger}</div>
            </div>
            {i < workflows.length - 1 && (
              <div style={{ width: 16, height: 2, background: "#CBD5E1", flexShrink: 0, opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${0.05 + i * 0.1}s`, position: "relative" }}>
                <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderLeft: "5px solid #CBD5E1", borderTop: "3px solid transparent", borderBottom: "3px solid transparent" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.8rem", color: "#7B7B7B", marginTop: "1.25rem", fontStyle: "italic" }}>
        Each workflow feeds into the next. Lead intake triggers onboarding. Onboarding triggers document collection. Documents trigger invoicing.
      </p>
    </div>
  );
}

// ─── Graphic 2: Trigger → Condition → Action Flow ────────────────────────────

function TriggerConditionActionFlow() {
  const { ref, visible } = useReveal();

  const examples = [
    {
      trigger: "Form submitted",
      condition: "Is lead qualified?",
      action: "Create CRM record + send confirmation",
    },
    {
      trigger: "Invoice overdue",
      condition: "Days overdue ≥ 7?",
      action: "Send payment reminder + alert owner",
    },
    {
      trigger: "Appointment booked",
      condition: "Service type = consultation?",
      action: "Send intake form + document checklist",
    },
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0", background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "2rem" }}>
      <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A2E", marginBottom: "1.5rem" }}>How Any Workflow Works: Trigger → Condition → Action</h3>

      {/* Header pattern */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        {[
          { label: "TRIGGER", sublabel: "Something happens", bg: "#FEF3C7", border: "#F59E0B", text: "#B45309" },
          { label: "→", sublabel: "", bg: "transparent", border: "transparent", text: "#CBD5E1" },
          { label: "CONDITION", sublabel: "Is it relevant?", bg: "#EFF6FF", border: "#283891", text: "#283891" },
          { label: "→", sublabel: "", bg: "transparent", border: "transparent", text: "#CBD5E1" },
          { label: "ACTION", sublabel: "System responds", bg: "#F0FDF4", border: "#16A34A", text: "#15803D" },
        ].map((step, i) => (
          <div key={i} style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.8)", transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s` }}>
            {step.sublabel ? (
              <div style={{ background: step.bg, border: `2px solid ${step.border}`, borderRadius: 10, padding: "0.625rem 1rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", color: step.text }}>{step.label}</div>
                <div style={{ fontSize: "0.7rem", color: "#7B7B7B", marginTop: "0.15rem" }}>{step.sublabel}</div>
              </div>
            ) : (
              <div style={{ fontSize: "1.5rem", color: "#CBD5E1", fontWeight: 300 }}>{step.label}</div>
            )}
          </div>
        ))}
      </div>

      {/* Examples */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {examples.map((ex, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "center", gap: "0.5rem", background: "#fff", borderRadius: 10, padding: "0.875rem 1rem", border: "1px solid #E2E8F0", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.4s ease ${0.3 + i * 0.1}s, transform 0.4s ease ${0.3 + i * 0.1}s` }}>
            <div style={{ background: "#FEF3C7", borderRadius: 8, padding: "0.4rem 0.625rem", fontSize: "0.8rem", color: "#B45309", fontWeight: 600, textAlign: "center" }}>{ex.trigger}</div>
            <span style={{ color: "#CBD5E1", fontSize: "1rem" }}>→</span>
            <div style={{ background: "#EFF6FF", borderRadius: 8, padding: "0.4rem 0.625rem", fontSize: "0.8rem", color: "#283891", fontWeight: 600, textAlign: "center" }}>{ex.condition}</div>
            <span style={{ color: "#CBD5E1", fontSize: "1rem" }}>→</span>
            <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "0.4rem 0.625rem", fontSize: "0.8rem", color: "#15803D", fontWeight: 600, textAlign: "center" }}>{ex.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WorkflowAutomationSMB() {
  useEffect(() => { document.title = "Business Workflow Automation for SMBs: The Complete Guide | Barrana.ai"; }, []);

  const faqs = [
    { q: "What is the difference between workflow automation and AI?", a: "Workflow automation executes rules: if this happens, do that. AI makes decisions within those rules — for example, qualifying a lead or categorising an inquiry. Most SMB automation is rule-based, with AI used for specific decision points like lead qualification or document classification." },
    { q: "How long does it take to set up workflow automation?", a: "A single workflow takes 1–2 weeks to design, build, and test. A connected multi-workflow system covering 3–5 workflows takes 4–8 weeks. Timeline depends on the complexity of your existing tools and the number of integrations required." },
    { q: "Do I need a CRM to automate workflows?", a: "Not always, but a CRM is the backbone of most business automation. It is where client records live, where workflow history is stored, and where your team sees what is happening. If you do not have a CRM, we recommend adding one as part of Phase 1." },
    { q: "What happens when a workflow fails?", a: "Every system we build includes error monitoring, retry logic, and escalation paths to a human. If a workflow fails — for example, an integration goes down — the system flags the error, retries automatically, and alerts the relevant team member if the retry fails." },
    { q: "Can workflow automation work for a one-person business?", a: "Yes. Solo operators often see the highest impact because there is no team to absorb the coordination overhead — every unautomated task returns directly to you. Lead response and booking automation alone can recover 10+ hours per week for a solo operator." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Business Workflow Automation for SMBs: The Complete Guide",
        "author": { "@type": "Organization", "name": "Barrana.ai" },
        "datePublished": "2024-01-01",
        "publisher": { "@type": "Organization", "name": "Barrana.ai", "url": "https://barrana.ai" },
        "description": "Workflow automation for small businesses means connecting triggers to actions across existing tools. The 8 highest-impact workflows to automate: lead intake, missed call, booking, onboarding, document collection, invoicing, handoffs, and reporting.",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barrana.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Workflow Guide", "item": "https://barrana.ai/workflow-guide" },
          { "@type": "ListItem", "position": 3, "name": "Business Workflow Automation for SMBs", "item": "https://barrana.ai/workflow-automation-smb" },
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
      <section style={{ background: "#1A1A2E", color: "#fff", paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span>Workflow Guide</span>
            <span>/</span>
            <span style={{ color: "#fff" }}>Workflow Automation for SMBs</span>
          </nav>
          <div style={{ display: "inline-block", background: "#283891", color: "#fff", borderRadius: 24, padding: "0.3rem 0.875rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Workflow Guide
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 740, marginBottom: "1rem" }}>
            Business Workflow Automation for SMBs: The Complete Guide
          </h1>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>12 min read</div>
        </div>
      </section>

      {/* ── Body ── */}
      <main style={{ background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.5rem" }}>

          {/* AEO Summary */}
          <SummaryBox>
            <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#283891", marginBottom: "0.625rem" }}>Quick Answer</div>
            <p style={{ color: "#1A1A2E", lineHeight: 1.75, margin: 0, fontSize: "0.9375rem" }}>
              Workflow automation for small businesses means connecting triggers to actions across your existing tools so that routine operational sequences happen automatically. When a client submits a form, the system creates their record, sends their confirmation, requests their documents, and books their appointment — without a human managing each step. The 8 highest-impact workflows to automate are: lead intake, missed call handling, appointment booking, client onboarding, document collection, invoicing, internal handoffs, and reporting.
            </p>
          </SummaryBox>

          {/* Who This Applies To */}
          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
            <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C2410C", marginBottom: "0.625rem" }}>Who This Applies To</div>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#1A1A2E", lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li>Service businesses with repetitive client-facing processes</li>
              <li>Office managers drowning in coordination and follow-up tasks</li>
              <li>Business owners whose team spends more than 30% of their time on admin</li>
            </ul>
          </div>

          {/* Section 1 */}
          <SectionHeading>What Is Workflow Automation (Not What You Think)</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Workflow automation is not robots. It is not AI assistants answering your emails. It is connecting your existing tools — your CRM, calendar, email platform, and accounting software — with logic: IF this happens, THEN do that. When a client books an appointment, the calendar triggers a confirmation email, a document request, and a CRM stage update. When an invoice is overdue by seven days, the system sends a reminder and notifies your accounts person. These are rules, not intelligence.
          </p>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            AI plays a role in specific decision points within these workflows — qualifying a lead, categorising a document, routing a call — but the backbone of SMB automation is rule-based logic. Understand this distinction and you will spend your budget in the right places.
          </p>

          {/* Section 2 */}
          <SectionHeading>The 8 Workflows Every Service Business Should Automate</SectionHeading>
          <WorkflowChainDiagram />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem" }}>
            {[
              { name: "Lead Intake", trigger: "Trigger: Form submitted or enquiry received", desc: "System creates a CRM record, assigns the lead to the right team member, sends a confirmation to the prospect, and initiates a qualification sequence. Outcome: every lead is captured, responded to within 90 seconds, and tracked." },
              { name: "Missed Call Handling", trigger: "Trigger: Incoming call not answered", desc: "System sends an immediate SMS to the missed caller, creates a follow-up task for the team, and logs the call in the CRM. Outcome: no missed call goes unacknowledged, even outside business hours." },
              { name: "Appointment Booking", trigger: "Trigger: Client selects a time slot", desc: "System confirms the booking, sends preparation instructions, adds the appointment to the relevant team member's calendar, and schedules reminders at 48 hours and 2 hours before. Outcome: zero-touch scheduling with consistent client communication." },
              { name: "Client Onboarding", trigger: "Trigger: Contract signed or engagement confirmed", desc: "System delivers the welcome email, intake form, and document checklist. CRM record is updated to onboarding stage and a task is created for the account manager. Outcome: every new client enters a consistent, professional onboarding experience." },
              { name: "Document Collection", trigger: "Trigger: Checklist delivered", desc: "System monitors document submission status and sends automated reminders every 48 hours for missing items. Escalates to a team member if items remain outstanding after 7 days. Outcome: document collection time reduced by 60–70%." },
              { name: "Invoicing", trigger: "Trigger: Job completion event", desc: "System generates the invoice, delivers it to the client, and initiates a payment reminder sequence. Overdue invoices trigger escalating reminders with automatic escalation to the owner. Outcome: faster payment cycles and fewer awkward chasing conversations." },
              { name: "Internal Handoffs", trigger: "Trigger: Stage transition in CRM or project system", desc: "System notifies the next team member, delivers relevant context, and creates the required task. Outcome: nothing falls between departments because someone forgot to send a message." },
              { name: "Reporting", trigger: "Trigger: Weekly or monthly schedule", desc: "System compiles performance data from your CRM, calendar, and accounting tool and delivers a summary to relevant stakeholders. Outcome: leaders have consistent visibility without manually pulling reports." },
            ].map(w => (
              <div key={w.name} style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.25rem 1.5rem", background: "#FAFBFF" }}>
                <div style={{ fontWeight: 800, color: "#283891", fontSize: "1rem", marginBottom: "0.25rem" }}>{w.name}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#7B7B7B", marginBottom: "0.5rem" }}>{w.trigger}</div>
                <p style={{ color: "#4B5563", lineHeight: 1.7, margin: 0, fontSize: "0.9rem" }}>{w.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <SectionHeading>How Workflows Connect: The Automation Chain</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Workflows do not operate in isolation. The output of one workflow becomes the trigger for the next. Lead intake creates the CRM record that triggers onboarding. Onboarding delivers the document checklist that triggers document collection. Document collection completion triggers the job start, which eventually triggers invoicing. This chain is what makes a full automation system significantly more valuable than individual workflows — each one compounds the others.
          </p>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            When you build workflows in isolation, you get efficiency gains on individual tasks. When you connect them into a chain, you get an operational system that largely runs itself.
          </p>

          {/* Section 4 */}
          <SectionHeading>What a Workflow Trigger Actually Looks Like</SectionHeading>
          <TriggerConditionActionFlow />
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            A trigger is any event that your software already detects: a form submission, an email arriving in a specific inbox, an invoice marked overdue, an appointment cancelled, a CRM stage changing. You do not need new software to have triggers — your existing tools are already generating these events. Automation simply connects them to responses.
          </p>

          {/* Section 5 */}
          <SectionHeading>What Stays Human in an Automated Workflow</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Automation handles the predictable, rule-based parts of your workflows. The following must remain with a qualified person:
          </p>
          <ul style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Professional decisions and advice</strong> — regulated or expertise-based recommendations</li>
            <li><strong>Exception handling</strong> — situations the workflow did not anticipate or could not route correctly</li>
            <li><strong>Sensitive communications</strong> — complaints, disputes, emotionally charged situations</li>
            <li><strong>Quality review</strong> — final sign-off on deliverables, proposals, and contracts</li>
          </ul>

          {/* Section 6 */}
          <SectionHeading>Tools That Make It Work</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.875rem", margin: "1.5rem 0" }}>
            {[
              { category: "Orchestration", tools: "Make (Integromat), Zapier, n8n" },
              { category: "CRM", tools: "HubSpot, Go High Level, Zoho CRM" },
              { category: "Scheduling", tools: "Calendly, Jane App, Acuity" },
              { category: "Accounting", tools: "QuickBooks, Xero, FreshBooks" },
              { category: "SMS / Messaging", tools: "Twilio, SimpleTexting, GoHighLevel" },
            ].map(t => (
              <div key={t.category} style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.1rem 1.25rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#283891", marginBottom: "0.4rem" }}>{t.category}</div>
                <div style={{ fontSize: "0.875rem", color: "#4B5563" }}>{t.tools}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            The orchestration layer (Make, Zapier, n8n) is the connective tissue — it reads events from one tool and triggers actions in another. Every other tool in the stack communicates through the orchestration layer. You do not need to replace your existing tools; you need to connect them.
          </p>

          {/* Section 7 */}
          <SectionHeading>The Phased Approach: Where to Start</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
            {[
              { phase: "Phase 1", title: "Highest-ROI Single Workflow", desc: "Deploy the one workflow that recovers the most time or prevents the most revenue loss. For most service businesses, this is lead response or appointment booking. Expected timeline: 1–2 weeks. Expected ROI: visible within 30 days.", color: "#283891" },
              { phase: "Phase 2", title: "2–3 Connected Workflows", desc: "Add the workflows that naturally follow from Phase 1. Lead intake + onboarding + document collection is the most common Phase 2 chain. Expected timeline: 3–6 weeks. Expected ROI: 10–20 hours/week recovered.", color: "#7E0F4A" },
              { phase: "Phase 3", title: "Full Operational System", desc: "Connect all 8 workflows into a unified operational system. Every stage of the client lifecycle is automated, monitored, and reported on. Expected timeline: 2–3 months. Expected impact: 20–40% reduction in operational overhead.", color: "#0F766E" },
            ].map(p => (
              <div key={p.phase} style={{ border: `2px solid ${p.color}`, borderRadius: 14, padding: "1.25rem 1.5rem", background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <div style={{ background: p.color, color: "#fff", borderRadius: 6, padding: "0.2rem 0.625rem", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.phase}</div>
                  <div style={{ fontWeight: 700, color: "#1A1A2E", fontSize: "0.95rem" }}>{p.title}</div>
                </div>
                <p style={{ color: "#4B5563", lineHeight: 1.7, margin: 0, fontSize: "0.9rem" }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 8 */}
          <SectionHeading>Common Workflow Automation Mistakes</SectionHeading>
          <ol style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Building workflows without mapping them first.</strong> Automating a process you have not mapped will automate its inefficiencies. Map the ideal workflow before building the automation.</li>
            <li><strong>No error handling or fallback paths.</strong> Every automated workflow needs a route for exceptions. If the CRM is down, if the email bounces, if the document is in an unexpected format — what happens? Define it.</li>
            <li><strong>Choosing tools for familiarity rather than fit.</strong> "We use Zapier because we've heard of it" is not a workflow design decision. Choose tools based on the integrations your workflows require.</li>
            <li><strong>Building too much in Phase 1.</strong> Trying to automate 6 workflows simultaneously produces delays, bugs, and team confusion. One workflow, done well, builds confidence and momentum.</li>
            <li><strong>No monitoring post-launch.</strong> Automation fails silently. Without error monitoring and regular performance review, broken workflows go unnoticed until a client complains.</li>
          </ol>

          {/* FAQ */}
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div style={{ marginBottom: "2.5rem" }}>
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          {/* CTA */}
          <div style={{ background: "#1A1A2E", borderRadius: 20, padding: "3rem 2rem", textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              See which workflows to build first for your business.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto 1.75rem" }}>
              The Automation Planner generates a personalised workflow roadmap in under 5 minutes. Or book a free Automation Audit.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/automation-planner" style={{ background: "#7E0F4A", color: "#fff", borderRadius: 8, padding: "0.875rem 1.75rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                See the Automation Planner
              </Link>
              <Link href="/contact" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 8, padding: "0.875rem 1.75rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                Book a Free Audit
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7B7B7B", marginBottom: "1rem" }}>Related Resources</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { label: "Lead Intake Workflow", href: "/workflows/lead-intake" },
                { label: "Appointment Booking Workflow", href: "/workflows/appointment-booking" },
                { label: "Client Onboarding Workflow", href: "/workflows/client-onboarding" },
                { label: "Document Collection Workflow", href: "/workflows/document-collection" },
                { label: "AI Adoption for Small Businesses", href: "/ai-adoption-small-business" },
                { label: "What Is AI Automation?", href: "/resources/what-is-ai-automation" },
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
