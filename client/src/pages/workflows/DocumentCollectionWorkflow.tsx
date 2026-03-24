import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import SEOHead from "@/components/SEOHead";
import ContextualCTA from "@/components/linking/ContextualCTA";
import RelatedResources from "@/components/linking/RelatedResources";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
import { colors, spacing, typography } from "@/styles/design-tokens";

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
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", padding: 0 }}>
        {q}
        <span style={{ fontSize: "1.25rem", color: "#283891", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

function ChaseVsSystem() {
  const { ref, visible } = useReveal();
  const chaseSteps = ["Send request", "Wait", "Remind", "Wait", "Call", "Partial docs", "Remind again", "Wait again"];
  const systemSteps = ["Request sent", "Client uploads", "Auto-tracked", "Auto-remind", "Complete", "Team notified"];

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "start", marginBottom: "2rem" }}>
      {/* Left: chase */}
      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "1.25rem" }}>
        <div style={{ fontWeight: 700, color: "#DC2626", marginBottom: "0.75rem", fontSize: "0.9rem" }}>The Manual Chase</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {chaseSteps.map((step, i) => (
            <div key={i} style={{
              background: visible ? "#fff" : "#F1F5F9",
              border: "1px solid #FECACA",
              borderRadius: 6,
              padding: "0.4rem 0.7rem",
              fontSize: "0.82rem",
              color: i % 2 === 1 ? "#DC2626" : "#1A1A2E",
              fontStyle: i % 2 === 1 ? "italic" : "normal",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${i * 0.08}s, background 0.4s ease ${i * 0.08}s`,
            }}>
              {step}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontWeight: 800, color: "#DC2626", marginTop: "0.75rem", fontSize: "1rem" }}>18 days avg</div>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.1rem", color: "#7B7B7B", paddingTop: "3rem" }}>VS</div>

      {/* Right: system */}
      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "1.25rem" }}>
        <div style={{ fontWeight: 700, color: "#0D9668", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Automated System</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {systemSteps.map((step, i) => (
            <div key={i} style={{
              background: visible ? "#fff" : "#F1F5F9",
              border: "1px solid #BBF7D0",
              borderRadius: 6,
              padding: "0.4rem 0.7rem",
              fontSize: "0.82rem",
              color: "#1A1A2E",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${(i * 0.1) + 0.3}s, background 0.4s ease ${(i * 0.1) + 0.3}s`,
            }}>
              {step}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontWeight: 800, color: "#0D9668", marginTop: "0.75rem", fontSize: "1rem" }}>9 days avg</div>
      </div>
    </div>
  );
}

function DocumentDashboard() {
  const { ref, visible } = useReveal();
  const docs = [
    { name: "Passport Copy", status: "received" },
    { name: "Employment Letter", status: "received" },
    { name: "Bank Statements (3 months)", status: "received" },
    { name: "Tax Returns (2 years)", status: "received" },
    { name: "Lease Agreement", status: "received" },
    { name: "Photo ID", status: "received" },
    { name: "Reference Letter", status: "received" },
    { name: "Medical Records", status: "outstanding" },
    { name: "Police Certificate", status: "outstanding" },
    { name: "Language Test Results", status: "outstanding" },
  ];
  const received = docs.filter((d) => d.status === "received").length;
  const total = docs.length;
  const pct = Math.round((received / total) * 100);

  return (
    <div ref={ref} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "1.5rem", marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h4 style={{ fontWeight: 700, color: "#1A1A2E", margin: 0 }}>Document Collection Status</h4>
          <p style={{ color: "#7B7B7B", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>10 documents required</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "#283891" }}>{received}/{total}</div>
          <div style={{ fontSize: "0.75rem", color: "#7B7B7B" }}>complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#F1F5F9", borderRadius: 6, height: 10, marginBottom: "1rem", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: visible ? `${pct}%` : "0%",
          background: "linear-gradient(90deg, #283891 0%, #0D9668 100%)",
          borderRadius: 6,
          transition: "width 0.8s ease 0.2s",
        }} />
      </div>

      {/* Doc list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
        {docs.map((doc, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.45rem 0.75rem",
            background: doc.status === "received" ? "#F0FDF4" : "#FFF5F9",
            borderRadius: 6,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease ${i * 0.05}s`,
          }}>
            <span style={{ fontSize: "0.85rem", color: "#1A1A2E" }}>{doc.name}</span>
            {doc.status === "received" ? (
              <span style={{ color: "#0D9668", fontWeight: 700, fontSize: "0.8rem" }}>✓ Received</span>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: "0.7rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: 10 }}>Auto-reminder sent</span>
                <span style={{ color: "#DC2626", fontWeight: 700, fontSize: "0.8rem" }}>⚠ Outstanding</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status footer */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ background: "#FEF3C7", borderRadius: 8, padding: "0.5rem 0.875rem", fontSize: "0.82rem", color: "#92400E", fontWeight: 600 }}>
          Next reminder in 18 hours
        </div>
        <div style={{ background: "#FEE2E2", borderRadius: 8, padding: "0.5rem 0.875rem", fontSize: "0.82rem", color: "#991B1B", fontWeight: 600 }}>
          Escalation triggers in 4 days
        </div>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Automate Document Collection and Stop Chasing Clients",
  "description": "Automated document collection sends personalised requests with dynamic checklists, provides a secure upload portal, tracks submissions in real time, and sends 48-hour reminders for missing items.",
  "step": [
    { "@type": "HowToStep", "name": "Send dynamic document checklist based on service type" },
    { "@type": "HowToStep", "name": "Provide secure upload portal for client submissions" },
    { "@type": "HowToStep", "name": "Track submissions in real time in CRM" },
    { "@type": "HowToStep", "name": "Send 48-hour automated reminders for outstanding items" },
    { "@type": "HowToStep", "name": "Notify team member when package is complete" },
  ],
};

export default function DocumentCollectionWorkflow() {
  return (
    <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: spacing.sectionPadding + " 1.25rem" }}>
      <SEOHead title="How to Automate Document Collection for Service Businesses" description="A step-by-step guide to building an automated document collection workflow that cuts collection time from weeks to days." type="article" />
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{ background: "#EEF2FF", color: "#283891", fontWeight: 600, fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>Workflow Guide</span>
          <span style={{ background: "#F8F9FA", color: "#7B7B7B", fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>9 min read</span>
        </div>
        <h1 style={{ ...typography.pageTitle, marginBottom: "1rem" }}>
          How to Automate Document Collection and Stop Chasing Clients
        </h1>
        <SummaryBox>
          <p style={{ margin: 0, color: "#283891", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Automated document collection sends personalised requests with dynamic checklists, provides a secure upload portal, tracks submissions in real time, sends reminders every 48 hours for missing items, and notifies the assigned team member when the package is complete. Average collection time drops from 18–21 days to 9–11 days. Staff chasing time drops from 15 hours/week to zero. Common tools: form/portal builder, Make for orchestration, CRM for tracking, Twilio for SMS reminders.
          </p>
        </SummaryBox>
      </div>

      {/* Section 1 */}
      <SectionHeading>The Manual Document Chase Problem</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Staff spend 15+ hours per week chasing documents. The process is the same every time: send the checklist, wait, send a reminder, wait, call the client, receive a partial submission, send another reminder for the outstanding items, wait again. Each cycle takes days. The average collection time for a standard engagement runs 18–21 days.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        The cost isn't just time. Incomplete files at the start of an engagement delay billable work, create bottlenecks, and often require the professional to chase the client themselves — taking them away from the work they're actually trained to do.
      </p>

      {/* Chase vs System diagram */}
      <ChaseVsSystem />

      {/* Section 2 */}
      <SectionHeading>What Automated Document Collection Does</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        When an engagement is confirmed, the system sends a personalised document request with a dynamic checklist — the items on the list are determined by the service type, not a generic template. The client receives a secure upload portal link: browser-based, no software download required. As documents arrive, the system tracks each item in the CRM in real time. Every 48 hours, a reminder goes out for any outstanding items — automatically, without staff involvement. At Day 10–14 if items are still missing, an escalation alert fires to the assigned team member for personal follow-up. When the package is complete, the team member is notified immediately.
      </p>

      {/* Document Dashboard */}
      <DocumentDashboard />

      {/* Section 3 */}
      <SectionHeading>The Dynamic Checklist System</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        The most important design element in document collection automation is that the checklist is not the same for every client. Sending a generic 20-item list when a client only needs 8 creates friction and delays. The system reads the service type field from the CRM and generates the appropriate checklist automatically.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ background: "#F8F9FA", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
          <div style={{ fontWeight: 700, color: "#7E0F4A", marginBottom: "0.5rem" }}>Immigration</div>
          <p style={{ color: "#7B7B7B", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>Different visa types trigger different document lists. A spousal sponsorship needs different documents than a skilled worker application. The checklist is populated from a lookup table in Make.</p>
        </div>
        <div style={{ background: "#F8F9FA", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
          <div style={{ fontWeight: 700, color: "#7E0F4A", marginBottom: "0.5rem" }}>Accounting</div>
          <p style={{ color: "#7B7B7B", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>T1 personal returns, T2 corporate, and bookkeeping engagements all require different source documents. The intake form captures the service type and the correct list generates automatically.</p>
        </div>
      </div>

      {/* Section 4 */}
      <SectionHeading>The 48-Hour Reminder Sequence</SectionHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
        {[
          { day: "Day 0", label: "Initial Request", desc: "Dynamic checklist sent via email and SMS. Upload portal link included.", color: "#283891" },
          { day: "Day 2", label: "First Reminder", desc: "Reminder listing specifically the outstanding items — not the full checklist.", color: "#283891" },
          { day: "Day 5", label: "Second Reminder", desc: "Slightly more direct tone. Notes that the file cannot proceed without these items.", color: "#7E0F4A" },
          { day: "Day 10", label: "Escalation Alert", desc: "Team member receives a notification for personal follow-up. Human touch applied.", color: "#DC2626" },
          { day: "Day 14", label: "Account Manager Flag", desc: "Flagged for senior review if still incomplete. Action plan determined case-by-case.", color: "#991B1B" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ background: item.color, color: "#fff", borderRadius: 8, padding: "0.35rem 0.7rem", fontSize: "0.8rem", fontWeight: 700, minWidth: "60px", textAlign: "center", flexShrink: 0 }}>{item.day}</div>
            <div>
              <div style={{ fontWeight: 700, color: "#1A1A2E", fontSize: "0.9rem" }}>{item.label}</div>
              <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Diagram */}
      <WorkflowDiagram
        steps={[
          { label: "Engagement Confirmed", type: "trigger" },
          { label: "Dynamic Checklist Sent", type: "action" },
          { label: "48hr Auto-Reminder", type: "ai" },
          { label: "Track Submissions", type: "action" },
          { label: "Package Complete", type: "outcome" },
        ]}
        resultBadge="Collection time cut in half"
      />

      {/* Section 5 */}
      <SectionHeading>What Stays Human</SectionHeading>
      <ul style={{ color: "#1A1A2E", lineHeight: 1.9, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li>When a client says they don't have a document and need guidance on how to obtain it</li>
        <li>Sensitive document situations — health records, legal documents — where the conversation needs to be handled personally</li>
        <li>When collection is stalled because the client is dealing with a personal circumstance the team knows about</li>
        <li>Disputes over what documents are required (the system escalates these; they're not handled automatically)</li>
      </ul>

      {/* Section 6 */}
      <SectionHeading>Tools</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { tool: "PandaDoc / ShareFile", note: "Secure document portal with tracking. Clients upload; the system records receipt." },
          { tool: "Make (Integromat)", note: "Orchestration: sends requests, monitors CRM fields for submission status, fires reminders." },
          { tool: "CRM (HubSpot / Zoho)", note: "Source of truth for collection status. Each document is a field or checklist item tracked per file." },
          { tool: "Twilio", note: "SMS reminders. Higher open rate than email for time-sensitive follow-ups." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#F8F9FA", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
            <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.4rem", fontSize: "0.9rem" }}>{item.tool}</div>
            <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>

      {/* Section 7 */}
      <SectionHeading>Results to Expect</SectionHeading>
      <BeforeAfterSection metrics={[
        { label: "Average Collection Time", before: "18-21 days", after: "9-11 days", beforeW: 85, afterW: 40 },
        { label: "Staff Chasing Time", before: "15 hrs/week", after: "0 hrs/week", beforeW: 90, afterW: 5 },
        { label: "File Completeness at Open", before: "40%", after: "85%", beforeW: 40, afterW: 85 },
        { label: "Collection Rate (30 days)", before: "60-70%", after: "90-95%", beforeW: 65, afterW: 92 },
      ]} />

      <ContextualCTA
        label="See This in Action"
        description="Read how an accounting firm eliminated document chasing and saved 15 hours per week using"
        linkText="Document Collection Automation"
        linkHref="/case-studies/accounting-firm-vaughan"
      />

      {/* FAQ */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <div style={{ marginBottom: "2.5rem" }}>
        <FAQItem q="Can the checklist adapt to each client's service type?" a="Yes. The checklist is dynamically generated from the service type field in your CRM. Different service types get different required document lists. The mapping is set up during implementation and can be updated any time." />
        <FAQItem q="What upload method do clients use?" a="A secure link to a portal — no software download required. Common options: PandaDoc, ShareFile, Google Drive with restricted sharing, or a client portal built into your CRM. Tool selection is partly based on your file size requirements and existing subscriptions." />
        <FAQItem q="What if a client says they don't have a particular document?" a="The system flags this exception and routes it to the assigned team member. The exception is logged in the CRM and the item is removed from the outstanding list with a note. The team member handles the conversation from there." />
        <FAQItem q="How does it handle large files?" a="Document portal selection is partly based on file size requirements. For large files — medical imaging, large PDFs, architectural drawings — we select portals with higher upload size limits. ShareFile and PandaDoc both support large files well." />
        <FAQItem q="Can we track collection rate across all active files?" a="Yes. The dashboard view shows collection status across all active files, sortable by overdue items, days elapsed, and completion percentage. This is typically surfaced in a CRM view or a dedicated reporting dashboard." />
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #283891 0%, #1A1A2E 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Ready to Eliminate the Document Chase?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Map your current collection process and see where automation cuts the timeline in half.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/automation-planner">
            <a style={{ background: "#7E0F4A", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>Start the Automation Planner</a>
          </Link>
          <Link href="/contact">
            <a style={{ background: "transparent", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a>
          </Link>
        </div>
      </div>

      <RelatedResources pagePath="/workflows/document-collection" />
    </div>
  );
}
