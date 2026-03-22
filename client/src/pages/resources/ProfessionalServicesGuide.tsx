/**
 * ProfessionalServicesGuide.tsx
 * Resource guide: Automation for Professional Services Firms
 * Route: /resources/professional-services-guide
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";

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

// ─── Billable vs Admin split bars ─────────────────────────────────────────────

function BillableVsAdminBars() {
  const { ref, visible } = useReveal();

  const bars = [
    {
      label: "Before Automation",
      billable: 50,
      admin: 50,
      billableLabel: "50% Billable Work",
      adminLabel: "50% Admin / Coordination",
      billableAmt: "~$125/hr effective",
      adminAmt: "$0 recovery",
    },
    {
      label: "After Automation",
      billable: 75,
      admin: 25,
      billableLabel: "75% Billable Work",
      adminLabel: "25% Admin",
      billableAmt: "~$187/hr effective",
      adminAmt: "Automated",
    },
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {bars.map((bar, i) => (
          <div key={i}>
            <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.5rem" }}>
              {bar.label}
            </div>
            <div style={{ display: "flex", height: "52px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E5E5E5" }}>
              <div
                style={{
                  width: visible ? `${bar.billable}%` : "0%",
                  background: "#283891",
                  transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.25}s`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.8125rem", whiteSpace: "nowrap", padding: "0 0.75rem" }}>
                  {bar.billableLabel}
                </span>
              </div>
              <div
                style={{
                  width: visible ? `${bar.admin}%` : "100%",
                  background: "#7E0F4A",
                  transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.25}s`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: "0.8125rem", whiteSpace: "nowrap", padding: "0 0.75rem" }}>
                  {bar.adminLabel}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#283891", fontWeight: 600 }}>{bar.billableAmt}</span>
              <span style={{ fontSize: "0.75rem", color: "#7E0F4A", fontWeight: 600 }}>{bar.adminAmt}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.125rem 1.5rem",
          background: "#F0F4FF",
          borderRadius: "10px",
          borderLeft: "4px solid #283891",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s",
        }}
      >
        <strong style={{ color: "#283891" }}>Recovering 15–20 hrs/week of billable time at $250–$500/hr = $195,000–$520,000/year</strong>
        <span style={{ color: "#3A3A3A", fontSize: "0.9rem" }}> in recovered billing capacity — without hiring a single additional person.</span>
      </div>
    </div>
  );
}

// ─── Six workflows list ────────────────────────────────────────────────────────

const SIX_WORKFLOWS = [
  {
    icon: "📬",
    title: "Enquiry Intake & Triage",
    desc: "Automatically capture enquiries from all channels (web, email, phone), classify by service type and urgency, and route to the right team member within seconds — not hours.",
  },
  {
    icon: "📋",
    title: "Client Onboarding & Document Collection",
    desc: "Send welcome sequences, collect required documents, trigger compliance checks, and populate your CRM and matter management system — all without manual intervention.",
  },
  {
    icon: "📅",
    title: "Appointment & Deadline Management",
    desc: "Automate scheduling, reminders, rescheduling workflows, and critical deadline tracking. Eliminate the calendar tag that consumes 3–5 hours of admin time per week per fee-earner.",
  },
  {
    icon: "💳",
    title: "Billing & Invoice Follow-up",
    desc: "Auto-generate invoices from time records, send payment reminders at configured intervals, escalate overdue accounts, and reconcile payments — reducing debtor days by 40–60%.",
  },
  {
    icon: "🔄",
    title: "Status Updates & Client Communication",
    desc: "Proactively push matter or project status updates to clients at key milestones. Eliminate the 'where are we up to?' calls that interrupt deep work throughout the day.",
  },
  {
    icon: "📊",
    title: "Reporting & Business Intelligence",
    desc: "Aggregate data from your CRM, billing, and project management systems into automated weekly reports. Leadership gets visibility; staff stop building spreadsheets.",
  },
];

// ─── Industry section helper ───────────────────────────────────────────────────

function IndustrySubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#283891", marginBottom: "0.625rem", paddingBottom: "0.375rem", borderBottom: "2px solid #E8EDFF" }}>
        {title}
      </h3>
      <div style={{ color: "#3A3A3A", lineHeight: 1.8, fontSize: "0.9375rem" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Lifecycle workflow steps ──────────────────────────────────────────────────

const LIFECYCLE_STEPS = [
  { label: "Enquiry", type: "trigger" as const },
  { label: "Qualify", type: "ai" as const },
  { label: "Engage", type: "action" as const },
  { label: "Onboard", type: "action" as const },
  { label: "Deliver", type: "action" as const },
  { label: "Bill", type: "action" as const },
  { label: "Retain", type: "outcome" as const },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProfessionalServicesGuide() {
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
            <span style={{ color: "rgba(255,255,255,0.9)" }}>Professional Services Guide</span>
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(126,15,74,0.35)", border: "1px solid rgba(126,15,74,0.6)", borderRadius: "2rem", padding: "0.3rem 0.9rem", marginBottom: "1.25rem" }}>
            <span style={{ color: "#E8A0C5", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Industry Guide</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.875rem,4vw,2.875rem)", fontWeight: 900, color: "#fff", lineHeight: 1.18, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Automation for Professional Services Firms
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>20 min read</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Immigration · Law · Accounting · Financial Advisory · Insurance</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <SummaryBox>
          <div style={{ fontWeight: 700, color: "#283891", fontSize: "1.0625rem", marginBottom: "0.625rem" }}>
            What This Guide Covers
          </div>
          <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.75, fontSize: "0.9375rem" }}>
            Professional services firms sell time — yet they spend half of it on work that generates zero revenue. This guide covers the specific automation patterns that shift that ratio: the six workflows every firm should automate, industry-specific implementation patterns for immigration, law, accounting, financial advisory, and insurance/mortgage, and the compliance considerations that make professional services automation different from every other sector.
          </p>
        </SummaryBox>

        <SectionHeading>The Professional Services Automation Paradox</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          Professional services firms have a structural problem: their revenue model is built on selling expertise at an hourly or matter rate, but the average fee-earner spends only 50% of their working day on billable activity. The other half evaporates into email, data entry, scheduling, chasing documents, generating reports, and managing internal coordination.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          This isn't a people problem — it's a systems problem. The solution isn't hiring more staff (which simply scales the overhead) or billing fewer hours (which destroys margins). The solution is automating the coordination layer that consumes half your team's capacity.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "0.5rem" }}>
          The visualization below shows what shifts when the coordination layer is automated:
        </p>

        <BillableVsAdminBars />

        <SectionHeading>Six Workflows Every Professional Services Firm Should Automate</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1.75rem" }}>
          These workflows appear across virtually every professional services firm we've worked with. They are consistently the highest-ROI automation targets because they combine high frequency, high manual effort, and direct client impact.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "0.5rem" }}>
          {SIX_WORKFLOWS.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "1.125rem", padding: "1.25rem 1.5rem", border: "1px solid #E8EDFF", borderRadius: "12px", background: "#FAFBFF" }}
            >
              <div style={{ fontSize: "1.625rem", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#1A1A2E", fontSize: "1rem", marginBottom: "0.35rem" }}>
                  <span style={{ color: "#283891", marginRight: "0.5rem" }}>{i + 1}.</span>
                  {item.title}
                </div>
                <div style={{ color: "#3A3A3A", lineHeight: 1.7, fontSize: "0.9375rem" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionHeading>Industry-Specific Patterns</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1.75rem" }}>
          While the six core workflows apply universally, each practice area has its own workflow topology, compliance context, and client communication norms. Below are the patterns we see most frequently in each sector.
        </p>

        <IndustrySubSection title="Immigration Law">
          <p>Immigration practices are document-intensive by design — every application involves a checklist of 15–40 documents, each with different expiry dates, certified translation requirements, and government submission formats. Manual document tracking creates bottlenecks at every stage and exposes firms to catastrophic errors when deadlines are missed.</p>
          <p>Automation in immigration typically targets three high-value areas: document collection workflows (automated request sequences with client portals), deadline tracking and government fee alert systems, and status update pipelines that reduce inbound status calls by 70–90%.</p>
          <p>The compounding benefit: once a document workflow is automated, the same infrastructure handles renewals, appeals, and secondary applications — multiplying the initial ROI with each returning client.</p>
        </IndustrySubSection>

        <IndustrySubSection title="Law Firms">
          <p>Law firms have historically been slow to adopt automation due to concerns about privilege, confidentiality, and regulatory compliance. In practice, the workflows most amenable to automation — intake, scheduling, document collection, billing — touch none of these concerns and represent 40–60% of administrative overhead.</p>
          <p>High-impact targets in legal practice include: new matter opening sequences (client intake → conflict check → engagement letter → file creation), court date and limitation period tracking with multi-step reminder sequences, and accounts receivable automation that reduces average debtor days from 60–90 to under 30.</p>
          <p>Many firms also benefit from automated precedent distribution — ensuring the right document template is pushed to fee-earners based on matter type, rather than relying on institutional memory.</p>
        </IndustrySubSection>

        <IndustrySubSection title="Accounting Firms">
          <p>Accounting firms face a particularly sharp version of the paradox: their peak demand periods (tax season, EOFY) create intense capacity pressure precisely when manual coordination overhead is highest. Automation that reduces coordination load by even 30% can mean the difference between a firm that survives tax season intact and one that loses staff to burnout.</p>
          <p>Key workflows include: annual engagement letter dispatch and e-signature collection, ATO/CRA correspondence tracking and response routing, work-in-progress (WIP) reporting automation, and client reminder sequences for document provision (historically one of the biggest time sinks in any accounting practice).</p>
          <p>Payroll processing notifications, ASIC/SEDAR deadline alerts, and automated billing summaries round out the automation stack for most mid-size firms.</p>
        </IndustrySubSection>

        <IndustrySubSection title="Financial Advisory">
          <p>Financial advisory firms operate under heavy compliance obligations (ASIC, FCA, SEC, IIROC depending on jurisdiction) that create substantial documentation requirements. Paradoxically, this compliance burden is itself a strong argument for automation: manual compliance processes are error-prone, and errors in a regulated context carry significant risk.</p>
          <p>Automation targets include: SOA/FDS generation workflows, review meeting scheduling and preparation sequences (client data pulled and pre-populated before the adviser sees the file), fee disclosure automation, and portfolio rebalancing notification workflows. CRM hygiene — keeping client records accurate as life circumstances change — is another high-value area.</p>
        </IndustrySubSection>

        <IndustrySubSection title="Insurance & Mortgage Broking">
          <p>Broking businesses are pipeline businesses: the margin comes from volume, and volume requires fast, accurate processing of large numbers of parallel client cases. Manual case management at scale creates two failure modes — dropped cases (lost revenue) and slow processing (client attrition to competitors).</p>
          <p>Automation targets include: renewal reminder sequences (the highest-ROI automation for most insurance brokers), lender comparison and scenario generation, document collection and lender submission workflows, and settlement/approval notification chains that keep clients informed without requiring manual updates.</p>
          <p>For mortgage brokers specifically, automated rate watch alerts — notifying clients when their current product becomes uncompetitive — generate strong repeat business and referrals with near-zero ongoing effort.</p>
        </IndustrySubSection>

        {/* WorkflowDiagram graphic */}
        <SectionHeading>The Professional Services Client Lifecycle</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1.25rem" }}>
          End-to-end automation is possible at every transition point in the professional services client lifecycle. The diagram below shows the seven stages and the automation opportunities at each handoff.
        </p>
        <div style={{ background: "#F8FAFF", borderRadius: "14px", padding: "1.75rem 1.5rem", marginBottom: "1rem", overflowX: "auto" }}>
          <WorkflowDiagram
            steps={LIFECYCLE_STEPS}
            resultBadge="End-to-end automation possible at each transition"
          />
        </div>
        <p style={{ lineHeight: 1.8, color: "#7B7B7B", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Each arrow in the lifecycle represents a handoff — and every handoff is a point where manual coordination can be replaced with a triggered, reliable automated action.
        </p>

        <SectionHeading>Compliance Considerations</SectionHeading>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          Professional services automation must be implemented within the regulatory framework of your practice area. The good news: the workflows most amenable to automation (scheduling, document collection, billing, communication) are generally the least sensitive from a compliance perspective.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          <strong>PIPEDA / Privacy Act compliance</strong> (Canada/Australia): Client data that flows through automation platforms must be handled under compliant data processing agreements. For most mainstream automation platforms (Zapier, Make, n8n), BAAs or DPAs are available. Avoid platforms that cannot provide these agreements for professional services data.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          <strong>Conflict checks</strong> in legal practice must remain a human-supervised step. Automation can trigger a conflict check process and surface relevant data, but the clearance decision cannot be delegated to an automated system.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          <strong>Legal privilege</strong> is preserved when automation handles non-privileged administrative processes. Communications that contain legal advice should not pass through third-party automation platforms without appropriate data handling agreements in place.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A", marginBottom: "1rem" }}>
          <strong>Data residency</strong> requirements vary by jurisdiction and sector. Firms handling health, immigration, or financial data may have specific requirements about where data is stored and processed. Ensure your automation stack is evaluated against these requirements before deployment.
        </p>
        <p style={{ lineHeight: 1.8, color: "#3A3A3A" }}>
          When in doubt, engage your professional indemnity insurer and compliance counsel before deploying automation that touches regulated data. Most concerns are resolvable with appropriate platform selection and data architecture.
        </p>

        {/* CTA */}
        <div style={{ background: "#283891", borderRadius: "20px", padding: "3rem 2.5rem", marginTop: "4rem", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.375rem,3vw,2rem)", fontWeight: 800, marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>
            Automate Your Professional Services Firm
          </h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
            We've helped immigration firms, law practices, accountants, and financial advisers reclaim 15–20 billable hours per fee-earner per week. Let's build the same system for your firm.
          </p>
          <Link
            href="/contact"
            style={{ display: "inline-block", background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2.25rem", borderRadius: "10px", textDecoration: "none", letterSpacing: "0.01em" }}
          >
            Book a Free Workflow Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
