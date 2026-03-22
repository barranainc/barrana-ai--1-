/**
 * HumanInTheLoop.tsx
 * Foundation content page: "Human-in-the-Loop AI"
 * Route: /human-in-the-loop-ai
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import ControlLayerCard from "@/components/service/ControlLayerCard";

// ─── Shared helpers ────────────────────────────────────────────────────────────

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
        <span style={{ fontSize: "1.25rem", color: "#283891", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: "1rem" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

// ─── Graphic 1: Automation Boundary Map ───────────────────────────────────────

function AutomationBoundaryMap() {
  const { ref, visible } = useReveal();
  const nodes = [
    { label: "Lead Arrives", type: "auto" },
    { label: "Auto Response", type: "auto" },
    { label: "Qualification", type: "auto" },
    { label: "Book Consult", type: "auto" },
    { label: "Advise Client", type: "human" },
    { label: "Send Engagement", type: "auto" },
    { label: "Doc Collection", type: "auto" },
    { label: "Review & Approve", type: "human" },
    { label: "Deliver Work", type: "human" },
    { label: "Invoice Sent", type: "auto" },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "2rem 1.5rem",
        margin: "2rem 0",
        overflowX: "auto",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#7B7B7B", marginBottom: "1.5rem" }}>
        Client Lifecycle — Automation Boundary Map
      </div>
      <div style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "wrap", minWidth: "560px" }}>
        {nodes.map((node, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              <div
                style={{
                  width: "74px",
                  padding: "0.5rem 0.35rem",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  background: node.type === "auto" ? "#ECFDF5" : "#EEF2FF",
                  color: node.type === "auto" ? "#065F46" : "#283891",
                  border: node.type === "auto" ? "1.5px solid #6EE7B7" : "2px solid #283891",
                  boxShadow: node.type === "human" ? "0 0 0 3px rgba(40,56,145,0.12)" : "none",
                }}
              >
                {node.type === "human" && <div style={{ fontSize: "1rem", marginBottom: "2px" }}>👤</div>}
                {node.label}
              </div>
              <div style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                color: node.type === "auto" ? "#059669" : "#283891",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {node.type === "auto" ? "AUTO" : "HUMAN"}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div
                style={{
                  width: "18px",
                  height: "2px",
                  borderTop: "2px dashed #CBD5E1",
                  flexShrink: 0,
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.3s ease ${i * 0.08 + 0.1}s`,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#374151" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#ECFDF5", border: "1.5px solid #6EE7B7" }} />
          Automated — runs without human input
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#374151" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#EEF2FF", border: "2px solid #283891" }} />
          Human Decision Point — requires professional judgement
        </div>
      </div>
    </div>
  );
}

// ─── Control Layer Items ───────────────────────────────────────────────────────

const controlLayerItems = [
  { title: "Stop-Loss Rules", desc: "Automation pauses and alerts a human if an action would exceed defined thresholds (e.g., invoice above $10,000, message to a flagged client)." },
  { title: "Retry Logic", desc: "Failed automations retry up to 3 times before escalating. No silent failures — every error is logged and notified." },
  { title: "Approval Gates", desc: "High-stakes workflow steps require explicit human confirmation before proceeding. Approvals are logged with timestamp and approver identity." },
  { title: "Full Audit Logging", desc: "Every automated action is logged: what ran, when, on which record, triggered by what. Available for review at any time." },
  { title: "Escalation Paths", desc: "If the system cannot classify or handle a case, it routes to the assigned team member with full context and a clear action request." },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HumanInTheLoop() {
  useEffect(() => {
    document.title = "Human-in-the-Loop AI: Why the Best Automation Keeps Humans in Charge | Barrana AI";
  }, []);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: "#1A1A2E", padding: "3.5rem 0 3rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <nav style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/resources" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Resources</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Human-in-the-Loop AI</span>
          </nav>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: "999px", padding: "0.3rem 0.85rem" }}>
              Governance
            </span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)" }}>⏱ 12 min read</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.875rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: 0 }}>
            Human-in-the-Loop AI: Why the Best Automation Keeps Humans in Charge
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "2.5rem 0 5rem" }}>
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>

            {/* AEO Summary */}
            <SummaryBox>
              <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Quick Summary</p>
              <p style={{ fontSize: "0.9375rem", color: "#1A1A2E", lineHeight: 1.65, margin: 0 }}>
                Human-in-the-loop AI automation means designing systems where AI handles repetitive coordination tasks while humans retain control over decisions that require professional judgement, emotional intelligence, regulatory compliance, or accountability. For service businesses, this means AI manages scheduling, reminders, data collection, and routing — while pricing, advice, approvals, exception handling, and sensitive communications stay in human hands. This approach builds client trust, reduces risk, and ensures quality without sacrificing the efficiency gains of automation.
              </p>
            </SummaryBox>

            {/* Who This Applies To */}
            <div style={{ background: "#F1F5F9", borderRadius: "12px", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontWeight: 800, color: "#1A1A2E", marginBottom: "0.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>Who This Applies To</p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 1.9 }}>
                <li>Business owners designing automation systems who want to know where to draw the line</li>
                <li>Professional services firms with regulated or sensitive client interactions</li>
                <li>Anyone concerned about accountability in automated workflows</li>
              </ul>
            </div>

            {/* Section 1 */}
            <SectionHeading>What Human-in-the-Loop Means in Practice</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Human-in-the-loop is not a philosophical concept about the future of work. It is a design decision you make when building each workflow. The question is simple: at which steps in this process does a human need to see, approve, or act before the system proceeds?
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Where you place approval steps and escalation paths is exactly where human oversight lives in your system. A workflow with no approval gates is fully automated. A workflow with three approval gates is human-in-the-loop. The architecture is the governance.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              For professional services firms, human-in-the-loop design is not optional — it is the responsible default. Clients trust you with sensitive matters. Regulators hold you accountable. Your professional liability insurance covers your judgements, not your software's.
            </p>

            {/* Automation Boundary Map Graphic */}
            <AutomationBoundaryMap />

            {/* Section 2 */}
            <SectionHeading>The 9 Things That Should Stay Human</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Not every decision is equal. Some are safely delegated to automation; others carry risk, liability, or relational weight that only a human can manage. Here are the nine categories that should always have a human in the loop.
            </p>
            <ol style={{ paddingLeft: "1.5rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 2.1 }}>
              <li><strong>Professional judgement and expert advice</strong> — Legal, medical, financial, or immigration advice requires a licensed professional. Automation can gather and present information; it cannot advise.</li>
              <li><strong>Custom pricing and negotiation</strong> — Pricing decisions involving exceptions, relationships, or complex scope belong with the human who owns client relationships.</li>
              <li><strong>Regulated decisions</strong> — Legal advice, medical recommendations, financial planning. These are governed by professional rules that cannot be delegated to software.</li>
              <li><strong>Emotionally sensitive communications</strong> — Bad news, difficult situations, grief, or crisis. Automated messages in these contexts cause damage that no efficiency gain justifies.</li>
              <li><strong>Handling exceptions and edge cases</strong> — When a situation falls outside the defined parameters of a workflow, escalate to a human. Automation is built for the normal path, not the abnormal one.</li>
              <li><strong>Relationship-building and trust development</strong> — New client onboarding, high-value relationship maintenance, and conversations that determine long-term retention require a human touch.</li>
              <li><strong>Final approval on high-value deliverables</strong> — Any document, plan, or recommendation going to a client under your professional name requires human review and approval before it leaves your firm.</li>
              <li><strong>Dispute resolution and complaints</strong> — Client complaints handled entirely by automated systems generate escalating frustration. A human must own and resolve disputes.</li>
              <li><strong>Anything your professional liability insurance covers</strong> — If your E&amp;O or professional liability policy covers it, a human is responsible for it. That responsibility cannot be automated away.</li>
            </ol>

            {/* Section 3 */}
            <SectionHeading>How Approval Gates Work in Automated Systems</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              An approval gate is a deliberate pause in a workflow that requires a human to review and confirm before the next step fires. The workflow reaches a certain point, stops, sends a notification to the designated reviewer, and waits. Nothing proceeds until a human takes action.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Common approval gate examples for professional services firms:
            </p>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 2 }}>
              <li>Invoice above $5,000 — owner review required before the invoice is sent to the client</li>
              <li>New client in a matter type the firm has not handled before — conflict check sign-off required before engagement proceeds</li>
              <li>Outgoing communication containing legal terms — solicitor review before the message is dispatched</li>
              <li>Document package above a defined complexity threshold — paralegal review before the system routes it to the client portal</li>
            </ul>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginTop: "1rem" }}>
              Approval gates are logged. When an approval is given, the system records who approved, when they approved, and from which device. This creates an audit trail that protects the firm in the event of a dispute.
            </p>

            {/* Section 4 */}
            <SectionHeading>How Escalation Paths Prevent Failures</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              An escalation path is the mechanism that activates when automation reaches a situation it cannot handle. Rather than failing silently or proceeding incorrectly, the system detects the edge case and routes it to a human with full context.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Escalation triggers should be defined for: unrecognised intake categories, document submissions that fail validation, messages that contain emotional language flagged by the system, and any step where the automation's confidence score falls below a defined threshold.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              When an escalation fires, the assigned team member receives a notification that includes: what triggered the escalation, the full context of the record, the last action taken, and a clear description of what action is needed. The human resolves the situation and, if appropriate, marks it resolved so the automation can continue.
            </p>

            {/* Section 5 — Control Layer with ControlLayerCard component */}
            <SectionHeading>The Control Layer</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Every automation system we build at Barrana includes five governance mechanisms that form the control layer. These mechanisms ensure the system cannot proceed in ways that would cause damage, lose data, or bypass human oversight.
            </p>
            <ControlLayerCard items={controlLayerItems} />

            {/* Section 6 */}
            <SectionHeading>Industry Examples</SectionHeading>

            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Immigration Consultants</strong>
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Automation handles intake categorisation, document checklists, status updates, and reminder sequences. The regulated human work — assessing eligibility, providing immigration advice, submitting applications, and handling IRCC correspondence — stays entirely with the licensed RCIC. Approval gates fire before any communication goes to a government authority or contains advice about a client's eligibility.
            </p>

            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Accounting Firms</strong>
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Automation handles document collection, deadline reminders, invoice generation, and client communication sequences during busy season. The CPA reviews all returns before they are filed, reviews all correspondence that includes tax advice, and approves all invoices above the firm's threshold. No return is filed and no advice is sent without a human having reviewed and approved it.
            </p>

            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Law Firms</strong>
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Automation handles new matter intake, conflict check requests, document assembly for standard templates, billing reminders, and deadline tracking. Solicitors retain full control over advice, pleadings, negotiations, and any communication that would be considered legal advice under the Law Society's rules. Every document assembly includes a human review gate before the document is sent to a client.
            </p>

            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Medical and Allied Health Clinics</strong>
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Automation handles appointment booking, recall campaigns, pre-appointment reminders, and follow-up satisfaction surveys. Clinical staff retain full control over treatment decisions, medication communications, test results, and any message that relates to a patient's health status. Escalation paths fire immediately when a patient's message indicates a clinical concern.
            </p>

            {/* Section 7 */}
            <SectionHeading>Why Full Automation Is Usually the Wrong Goal</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              The goal of automation is not to remove humans from your business. The goal is to remove the coordination overhead that prevents your humans from doing the work only humans can do.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              When a skilled professional spends three hours a week sending document request emails and chasing clients for signatures, that is three hours not spent on billable advice, relationship development, or complex problem solving. Automation reclaims that time. The professional's value is not displaced — it is amplified.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              Firms that pursue full automation — removing humans from all customer touchpoints — often discover they have optimised away the thing clients valued most: the sense that a knowledgeable human is watching out for their interests. Human-in-the-loop design preserves that sense while capturing the efficiency gains that make the practice more profitable.
            </p>

            {/* Section 8 */}
            <SectionHeading>How to Design Automation That Builds Trust</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Clients notice when they are in an automated system. Most do not object to automation — they object to feeling deceived or abandoned. Designing transparent, human-feeling automation builds more trust than hiding the automation entirely.
            </p>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 2 }}>
              <li><strong>Tell clients what is automated and what is not.</strong> A one-sentence disclosure in your welcome email — "Our intake process is handled automatically. Your file will be reviewed personally within 24 hours" — sets expectations and builds confidence.</li>
              <li><strong>Use your actual name in automated emails.</strong> "From: Sarah Chen at Barrana Law" — not "From: notifications@yourfirm.com." The personal sender name signals that a real person owns the relationship.</li>
              <li><strong>Make human escalation easy.</strong> Every automated message should include a clear path to reach a human: a direct phone number, a reply address that reaches a person, or a booking link for an immediate callback.</li>
              <li><strong>Log everything.</strong> Full audit trails are not just for compliance. They are also for reassurance — yours and your client's. When a question arises about what happened, when, and why, the answer is always available.</li>
            </ul>

            {/* FAQ */}
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem
                q="Does human-in-the-loop automation slow things down?"
                a="Only for the specific steps that require it. The automation handles everything else at full speed, so humans spend their time on decisions, not coordination. Most firms find that their total turnaround time drops significantly even with approval gates in place, because the non-human steps now happen instantly."
              />
              <FAQItem
                q="What happens if the human misses an approval step?"
                a="The system escalates after a defined window — typically 4 to 24 hours depending on urgency — and notifies a backup reviewer. No workflow is left waiting indefinitely without an escalation trigger."
              />
              <FAQItem
                q="Is human-in-the-loop more expensive to implement?"
                a="Slightly, because it requires defining clear approval rules and escalation paths upfront. But it significantly reduces liability and trust risk, which more than offsets the additional implementation time."
              />
              <FAQItem
                q="Can clients tell when they're in an automated workflow?"
                a="Sometimes. We recommend designing automation to be transparent — using real sender names, clear and human-sounding language, and easy paths to reach a real person. Clients who know they are in a well-designed automated system are generally comfortable with it."
              />
              <FAQItem
                q="Is this approach PIPEDA-compliant?"
                a="Yes. The human oversight layer is part of our PIPEDA-aware design standard for all Canadian business implementations. Every automated data flow is documented, and the approval gates ensure that sensitive data decisions are reviewed by an accountable human before proceeding."
              />
            </div>

            {/* CTA */}
            <div style={{ background: "#1A1A2E", borderRadius: "20px", padding: "3rem 2.5rem", textAlign: "center", marginTop: "3rem" }}>
              <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
                Design Automation That Keeps You in Control
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "1.75rem", lineHeight: 1.6, maxWidth: "540px", margin: "0 auto 1.75rem" }}>
                Book a free 60-minute Automation Audit. We'll map your workflows and show you exactly where to place approval gates and escalation paths — no obligation.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" style={{ background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "0.85rem 1.75rem", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
                  Book a Free Audit →
                </Link>
                <Link href="/governance" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "0.85rem 1.75rem", borderRadius: "10px", textDecoration: "none", display: "inline-block", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  See Our Governance Approach
                </Link>
              </div>
            </div>

            {/* Related Links */}
            <div style={{ marginTop: "3rem" }}>
              <p style={{ fontWeight: 800, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "#7B7B7B", marginBottom: "1rem" }}>Related Pages</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {[
                  { label: "Governance Approach", href: "/governance" },
                  { label: "AI Adoption for Small Business", href: "/ai-adoption-small-business" },
                  { label: "Custom AI Systems", href: "/services/custom-ai-systems" },
                  { label: "Automation by Industry", href: "/ai-automation-industries" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ background: "#EEF2FF", color: "#283891", fontWeight: 600, fontSize: "0.875rem", padding: "0.5rem 1rem", borderRadius: "8px", textDecoration: "none", border: "1px solid #C7D2FE" }}
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Human-in-the-Loop AI: Why the Best Automation Keeps Humans in Charge",
        "description": "Human-in-the-loop AI automation means designing systems where AI handles repetitive coordination tasks while humans retain control over decisions that require professional judgement, emotional intelligence, regulatory compliance, or accountability.",
        "author": {
          "@type": "Organization",
          "name": "Barrana.ai",
          "url": "https://barrana.ai"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Barrana.ai",
          "url": "https://barrana.ai"
        },
        "mainEntityOfPage": "https://barrana.ai/human-in-the-loop-ai",
        "keywords": ["human-in-the-loop AI", "AI governance", "approval gates", "escalation paths", "automation oversight", "PIPEDA compliance"]
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Does human-in-the-loop automation slow things down?", "acceptedAnswer": { "@type": "Answer", "text": "Only for the specific steps that require it. The automation handles everything else at full speed, so humans spend their time on decisions, not coordination." } },
          { "@type": "Question", "name": "What happens if the human misses an approval step?", "acceptedAnswer": { "@type": "Answer", "text": "The system escalates after a defined window — typically 4 to 24 hours depending on urgency — and notifies a backup reviewer." } },
          { "@type": "Question", "name": "Is this approach PIPEDA-compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The human oversight layer is part of our PIPEDA-aware design standard for all Canadian business implementations." } }
        ]
      }} />
    </div>
  );
}
