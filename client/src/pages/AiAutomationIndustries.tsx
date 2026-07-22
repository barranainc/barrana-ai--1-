/**
 * AiAutomationIndustries.tsx
 * Hub page: "AI Automation by Industry: What Works for Your Business"
 * Route: /ai-automation-industries
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import { colors, spacing, typography, surfaces } from "@/styles/design-tokens";

// ─── Shared helpers ────────────────────────────────────────────────────────────

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
        <span style={{ fontSize: "1.25rem", color: "#283891", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: "1rem" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

// ─── Industry Data ─────────────────────────────────────────────────────────────

const industries = [
  { emoji: "📊", name: "Accounting Firms", slug: "accounting-firms", opportunity: "Document collection & invoice automation during tax season" },
  { emoji: "🛂", name: "Immigration Consultants", slug: "immigration-consultants", opportunity: "Intake categorisation & document tracking by visa type" },
  { emoji: "⚖️", name: "Law Firms", slug: "law-firms", opportunity: "Matter intake, conflict checks & billing automation" },
  { emoji: "🏥", name: "Medical Clinics", slug: "medical-clinics", opportunity: "Booking reminders & patient recall campaigns" },
  { emoji: "🏠", name: "Contractors", slug: "contractors", opportunity: "Lead response & after-hours capture" },
  { emoji: "🏡", name: "Real Estate Teams", slug: "real-estate-teams", opportunity: "Lead nurture & CRM automation" },
  { emoji: "🎓", name: "Tutoring & Education", slug: "tutoring-education", opportunity: "Enrolment automation & session scheduling" },
  { emoji: "📱", name: "Marketing Agencies", slug: "marketing-agencies", opportunity: "Client onboarding & monthly reporting automation" },
];

// ─── Graphic 1: Industry Card Grid ────────────────────────────────────────────

function IndustryGrid() {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        gap: "1.25rem",
        margin: "2rem 0",
      }}
    >
      {industries.map((ind, i) => (
        <Link
          key={ind.slug}
          href={`/industries/${ind.slug}`}
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderTop: "3px solid #283891",
            borderRadius: "12px",
            padding: "1.5rem 1.25rem",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            cursor: "pointer",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.45s ease ${i * 0.07}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, box-shadow 0.2s`,
            boxShadow: hovered === i ? "0 8px 24px rgba(40,56,145,0.14)" : "0 1px 4px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: "2rem" }}>{ind.emoji}</span>
          <span style={{ fontWeight: 800, fontSize: "0.9375rem", color: "#1A1A2E" }}>{ind.name}</span>
          <div>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#7B7B7B" }}>Top opportunity</span>
            <p style={{ fontSize: "0.8125rem", color: "#374151", lineHeight: 1.5, margin: "0.25rem 0 0" }}>{ind.opportunity}</p>
          </div>
          <span style={{ fontSize: "0.8rem", color: "#283891", fontWeight: 700, marginTop: "auto" }}>Explore →</span>
        </Link>
      ))}
    </div>
  );
}

// ─── Graphic 2: Industry Automation Maturity Scale ────────────────────────────

const maturityData = [
  { label: "Contractors", current: 1, potential: 4 },
  { label: "Real Estate", current: 2, potential: 4 },
  { label: "Professional Services", current: 3, potential: 5 },
  { label: "Healthcare", current: 3, potential: 5 },
  { label: "Finance/Accounting", current: 3, potential: 5 },
];

function MaturityScale() {
  const { ref, visible } = useReveal();
  const maxVal = 5;

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "2rem 1.75rem",
        margin: "2rem 0",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#7B7B7B", marginBottom: "1.5rem" }}>
        Industry Automation Maturity - Current vs Potential (Scale 1–5)
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {maturityData.map((row, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A1A2E" }}>{row.label}</span>
              <span style={{ fontSize: "0.78rem", color: "#7B7B7B" }}>
                Current: {row.current}/5 &nbsp;·&nbsp; Potential: {row.potential}/5
              </span>
            </div>
            <div style={{ position: "relative", height: "28px" }}>
              {/* Potential bar (background) */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                height: "100%",
                width: visible ? `${(row.potential / maxVal) * 100}%` : "0%",
                background: "linear-gradient(90deg, #EEF2FF, #C7D2FE)",
                borderRadius: "6px",
                transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.1}s`,
              }}>
                <span style={{
                  position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
                  fontSize: "0.7rem", color: "#283891", fontWeight: 700,
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.4s ease ${i * 0.1 + 0.5}s`,
                }}>Potential</span>
              </div>
              {/* Current bar (foreground) */}
              <div style={{
                position: "absolute", top: "6px", left: 0,
                height: "16px",
                width: visible ? `${(row.current / maxVal) * 100}%` : "0%",
                background: "linear-gradient(90deg, #283891, #3B4FC8)",
                borderRadius: "4px",
                transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1 + 0.2}s`,
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#374151" }}>
          <div style={{ width: "12px", height: "8px", borderRadius: "2px", background: "#283891" }} />
          Current automation level
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#374151" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: "#EEF2FF", border: "1.5px solid #C7D2FE" }} />
          Achievable potential
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AiAutomationIndustries() {
  useEffect(() => {
    document.title = "AI Automation by Industry: What Works for Your Business | Barrana AI";
  }, []);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 0 " + spacing.sectionPaddingSm }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <nav style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/industries" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Industries</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Automation by Industry</span>
          </nav>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: "999px", padding: "0.3rem 0.85rem", border: "1px solid rgba(255,255,255,0.3)" }}>
              Industry Guide
            </span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)" }}>⏱ 8 min read</span>
          </div>
          <h1 style={{ ...typography.pageTitle, color: "#fff", margin: 0 }}>
            AI Automation by Industry: What Works for Your Business
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: spacing.sectionPadding + " 0" }}>
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>

            {/* AEO Summary */}
            <SummaryBox>
              <p style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Quick Summary</p>
              <p style={{ fontSize: "0.9375rem", color: "#1A1A2E", lineHeight: 1.65, margin: 0 }}>
                The best AI automation for a small business depends on the industry. Accounting firms benefit most from document collection and invoice automation during tax season. Immigration consultants benefit from intake categorisation and document tracking. Law firms benefit from matter intake and billing automation. Clinics benefit from booking reminders and recall campaigns. Contractors benefit from lead response and after-hours capture. Each industry has unique workflows, compliance requirements, and client expectations that determine the right starting point.
              </p>
            </SummaryBox>

            {/* Who This Applies To */}
            <div style={{ background: "#F1F5F9", borderRadius: "12px", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontWeight: 800, color: "#1A1A2E", marginBottom: "0.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>Who This Applies To</p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 1.9 }}>
                <li>Business owners in professional services, healthcare, trades, and agencies looking for industry-specific automation guidance</li>
                <li>Anyone trying to identify the highest-ROI starting point for their specific business type</li>
              </ul>
            </div>

            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              AI automation is not one-size-fits-all. The workflows that consume a contractor's time look nothing like the workflows that consume an immigration consultant's time. The compliance constraints of a medical clinic are fundamentally different from those of an accounting firm. Getting the right automation starts with understanding your industry's specific pattern of friction.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              Below you'll find the eight industries we serve most frequently, with a direct link to the full automation guide for each. Following the industry grid, we walk through the top five industries in detail - covering the specific workflow problem, what automation addresses, and where to start.
            </p>

            {/* Industry Card Grid - main graphic */}
            <IndustryGrid />

            {/* Maturity Scale */}
            <SectionHeading>Automation Maturity by Industry</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              Some industries have adopted automation widely; others are still in early stages. The chart below shows the current automation level across our key industries versus the achievable potential - illustrating where the largest gaps (and therefore the largest opportunities) exist.
            </p>
            <MaturityScale />

            {/* Accounting */}
            <SectionHeading>Accounting Firms</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Accounting firms face an acute seasonal problem: the months of January through April generate a concentrated volume of document requests, status questions, and invoice cycles that strains small teams. Staff spend disproportionate time chasing clients for T4s and receipts, sending the same follow-up messages, and manually updating tracking spreadsheets. This is the industry's signature friction point.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Automation directly addresses the document collection and follow-up loop. When a client is assigned a file, the system automatically sends a personalised document checklist, sequences follow-up reminders at defined intervals, and flags overdue responses to the assigned accountant - without manual intervention. Invoice generation and sending can also be automated once the engagement is complete, with approval gates ensuring no invoice goes out without CPA review.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              The recommended starting point for accounting firms is document collection automation integrated with your CRM or practice management system. This single workflow typically recovers 5-8 hours of staff time per week during busy season.
            </p>

            {/* Immigration */}
            <SectionHeading>Immigration Consultants</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Immigration consultants manage highly variable case types - each visa category requires a different document set, different processing timelines, and different government communication requirements. Without automation, intake is handled manually for every new client, document checklists are sent by hand, and status updates require staff to check government portals and then communicate findings to each client individually.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Automation handles intake categorisation - routing each new inquiry to the right workflow based on visa type - and manages the document tracking process throughout the application lifecycle. Clients receive automated status updates at defined milestones, and the RCIC is notified of escalations that require their direct attention.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              The recommended starting point is client intake automation with visa-type branching logic. This eliminates manual intake qualification and ensures every new client enters the right workflow from day one.
            </p>

            {/* Law Firms */}
            <SectionHeading>Law Firms</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Law firms face two major administrative friction points: new matter intake (capturing sufficient information to open a file and perform a conflict check) and billing (preparing, sending, and following up on invoices). Both require coordination between multiple staff members and generate significant administrative overhead relative to the value of the work involved.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Automation addresses both. New matter intake can be triggered by a form submission, which populates the practice management system, initiates a conflict check request, and queues the matter for solicitor review - all without a staff member manually processing each step. Billing automation generates invoices from time entries, sequences payment reminders at defined intervals, and escalates overdue accounts to the billing partner.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              The recommended starting point for law firms is matter intake automation. It directly reduces the overhead on legal assistants and junior staff while improving the client experience from the first touchpoint.
            </p>

            {/* Clinics */}
            <SectionHeading>Medical and Allied Health Clinics</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Clinics - whether medical, dental, physiotherapy, or allied health - share a common operational challenge: appointment management. No-shows and last-minute cancellations are costly. Recall management (bringing patients back for follow-up appointments or annual check-ins) is time-intensive when done manually. Front desk staff spend a significant portion of their time on phone-based booking and reminder calls that automation can handle entirely.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Automated appointment reminders - sent by SMS or email 48 hours and 24 hours before an appointment - consistently reduce no-show rates by 20-35%. Recall campaigns automatically contact patients at defined intervals after their last visit, bringing in appointment bookings that would otherwise fall through.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              The recommended starting point for clinics is appointment reminder automation. It requires minimal setup, integrates with most practice management systems, and delivers measurable ROI within the first month.
            </p>

            {/* Contractors */}
            <SectionHeading>Contractors and Trades</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Contractors lose business primarily through delayed lead response. When a homeowner submits an inquiry, they typically contact two or three contractors simultaneously. The first to respond credibly wins the call. Most contractors are on-site during the day and cannot respond to web inquiries within the critical first hour. This is the single highest-value automation opportunity for trades businesses.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              An AI receptionist or automated lead response system handles incoming inquiries instantly - acknowledging the request, gathering job details, and booking an estimate appointment - regardless of when the inquiry arrives. After-hours capture ensures that evening and weekend inquiries do not go cold overnight.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              The recommended starting point for contractors is lead response and after-hours capture automation. It directly addresses the highest point of lost revenue and typically pays for itself within the first month of operation.
            </p>

            {/* FAQ */}
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem
                q="Does the industry I'm in matter for automation?"
                a="Yes, significantly. The workflows, compliance requirements, and client expectations vary by industry and determine what to automate first, how to structure approval gates, and which tools to integrate with. A generic automation approach misses the specific friction points that drive the most value in your industry."
              />
              <FAQItem
                q="Is healthcare automation different from professional services automation?"
                a="Yes. Healthcare automation must account for privacy regulations, clinical versus administrative task boundaries, and patient communication standards. Clinical decisions and health information require stricter human oversight than most professional services workflows."
              />
              <FAQItem
                q="Do contractors need the same automation as law firms?"
                a="No. Contractors prioritise lead response, quote follow-up, and job scheduling. Law firms prioritise matter intake, document management, and billing. The starting point, the tools used, and the compliance considerations are entirely different."
              />
              <FAQItem
                q="Can automation adapt as my industry changes?"
                a="Yes. All systems we build are modular. When regulations or workflows change, individual components can be updated without rebuilding the system. This is particularly important in regulated industries like immigration and finance, where regulatory changes can require rapid workflow adjustments."
              />
            </div>

            {/* CTA */}
            <div style={{ ...surfaces.darkGradient, borderRadius: "20px", padding: "3rem 2.5rem", textAlign: "center", marginTop: "3rem" }}>
              <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
                Find the Right Starting Point for Your Industry
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "1.75rem", lineHeight: 1.6, maxWidth: "540px", margin: "0 auto 1.75rem" }}>
                Use our Automation Planner to identify the highest-ROI starting point for your specific industry and workflow, or book a free audit with our team.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/automation-planner" style={{ background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "0.85rem 1.75rem", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
                  Start the Automation Planner →
                </Link>
                <Link href="/industries" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "0.85rem 1.75rem", borderRadius: "10px", textDecoration: "none", display: "inline-block", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  Browse All Industries
                </Link>
              </div>
            </div>

            {/* Related Links */}
            <div style={{ marginTop: "3rem" }}>
              <p style={{ fontWeight: 800, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "#7B7B7B", marginBottom: "1rem" }}>Industry Pages</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {[
                  { label: "Accounting Firms", href: "/industries/accounting-firms" },
                  { label: "Immigration Consultants", href: "/industries/immigration-consultants" },
                  { label: "Law Firms", href: "/industries/law-firms" },
                  { label: "Physiotherapy Clinics", href: "/industries/physiotherapy-clinics" },
                  { label: "Contractors", href: "/industries/contractors" },
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
        "headline": "AI Automation by Industry: What Works for Your Business",
        "description": "The best AI automation for a small business depends on the industry. Accounting firms benefit most from document collection and invoice automation. Immigration consultants benefit from intake categorisation. Law firms benefit from matter intake and billing automation.",
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
        "mainEntityOfPage": "https://barrana.ai/ai-automation-industries",
        "keywords": ["AI automation by industry", "accounting automation", "immigration automation", "law firm automation", "clinic automation", "contractor automation"]
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Does the industry I'm in matter for automation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, significantly. The workflows, compliance requirements, and client expectations vary by industry and determine what to automate first." } },
          { "@type": "Question", "name": "Do contractors need the same automation as law firms?", "acceptedAnswer": { "@type": "Answer", "text": "No. Contractors prioritise lead response, quote follow-up, and job scheduling. Law firms prioritise matter intake, document management, and billing." } }
        ]
      }} />
    </div>
  );
}
