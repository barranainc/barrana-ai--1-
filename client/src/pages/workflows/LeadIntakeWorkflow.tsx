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

function ResponseTimeChart() {
  const { ref, visible } = useReveal();
  const data = [
    { time: "5 minutes", rate: 78, color: "#0D9668" },
    { time: "30 minutes", rate: 26, color: "#7E0F4A" },
    { time: "1 hour", rate: 12, color: "#DC2626" },
    { time: "4 hours", rate: 5, color: "#DC2626" },
    { time: "Next day", rate: 2, color: "#991B1B" },
  ];
  return (
    <div ref={ref} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.5rem" }}>Lead Contact Rate by Response Time</h3>
      <p style={{ fontSize: "0.875rem", color: "#7B7B7B", marginBottom: "1.25rem" }}>How quickly you respond directly determines whether you reach the lead at all.</p>
      {data.map((d, i) => (
        <div key={i} style={{ marginBottom: "0.875rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "#0D9668" : "#1A1A2E" }}>
              {d.time}{i === 0 ? " — Your target" : ""}
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: d.color }}>{d.rate}% contact rate</span>
          </div>
          <div style={{ background: "#F1F5F9", borderRadius: 6, height: 20, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: visible ? `${d.rate}%` : "0%",
              background: d.color,
              borderRadius: 6,
              transition: `width 0.8s ease ${i * 0.15}s`,
            }} />
          </div>
        </div>
      ))}
      <p style={{ fontSize: "0.75rem", color: "#7B7B7B", marginTop: "1rem" }}>Source: Harvard Business Review / Lead Response Management Study</p>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Automate Lead Intake for Service Businesses",
  "description": "A complete guide to automating lead intake using Make, a CRM, Calendly, and Twilio — cutting response time from hours to under 90 seconds.",
  "step": [
    { "@type": "HowToStep", "name": "Capture every lead channel in one system" },
    { "@type": "HowToStep", "name": "Send instant acknowledgement within 90 seconds" },
    { "@type": "HowToStep", "name": "Qualify with 2-3 automated questions" },
    { "@type": "HowToStep", "name": "Route to the right team member" },
    { "@type": "HowToStep", "name": "Create CRM record and book consultation automatically" },
  ],
};

export default function LeadIntakeWorkflow() {
  return (
    <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: spacing.sectionPadding + " 1.25rem" }}>
      <SEOHead title="How to Automate Lead Intake for Service Businesses" description="A complete guide to automating lead intake using Make, a CRM, Calendly, and Twilio — cutting response time from hours to under 90 seconds." type="article" />
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{ background: "#EEF2FF", color: "#283891", fontWeight: 600, fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>Workflow Guide</span>
          <span style={{ background: "#F8F9FA", color: "#7B7B7B", fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>10 min read</span>
        </div>
        <h1 style={{ ...typography.pageTitle, marginBottom: "1rem" }}>
          How to Automate Lead Intake for Service Businesses
        </h1>
        <SummaryBox>
          <p style={{ margin: 0, color: "#283891", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.7 }}>
            A lead intake automation system handles: (1) immediate response within 60–90 seconds of enquiry, (2) qualification through 2–3 automated questions, (3) routing to the right team member based on answers, (4) CRM record creation with all collected data, and (5) booking a consultation. Common tools: Make for orchestration, a CRM (HubSpot, Go High Level, Zoho) for records, Calendly for booking, and Twilio for SMS. Implementation: 1–2 weeks. Typical results: response time drops from 4–8 hours to under 90 seconds, quote conversion improves 15–25%, after-hours leads captured at 100% instead of 0%.
          </p>
        </SummaryBox>
      </div>

      {/* Section 1 */}
      <SectionHeading>The Manual Lead Intake Problem</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        When a lead submits a form on your website, here is what typically happens: the enquiry arrives by email. Someone on the team sees it — two hours later, if they're not in a meeting. They manually create a CRM record, type a confirmation email, and try to book a meeting. By then, the lead has moved on. They submitted to three other businesses. The one that responded first got the call.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        After hours it's worse. A lead who submits at 7 pm on a Friday doesn't hear back until Monday morning — 60+ hours later. The contact rate at that point is under 2%. You paid for the ad, you got the click, and you lost the lead because the response came too late.
      </p>

      {/* Section 2 */}
      <SectionHeading>What a Lead Automation System Does (5 Steps)</SectionHeading>
      <ol style={{ color: "#1A1A2E", lineHeight: 1.8, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Captures every lead channel</strong> — website form, email enquiry, Google Business profile, social DMs — into one unified workflow. Source is tagged on every record.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Sends instant acknowledgement (&lt;90 seconds)</strong> — personalized by source (website vs. Google vs. social), by service type if captured, and by time of day.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Qualifies with 2–3 embedded questions</strong> — service needed, timeline, and rough budget. Keeps the friction minimal while capturing the data you need to route properly.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Routes to the right team member</strong> — based on service type, location, or any field you choose. The team member receives full context: source, answers, and any prior interactions.
        </li>
        <li style={{ marginBottom: "0.75rem" }}>
          <strong>Creates the CRM record and books the consultation automatically</strong> — no manual data entry, no scheduling back-and-forth. The lead picks from real-time availability.
        </li>
      </ol>

      {/* Workflow Diagram */}
      <WorkflowDiagram
        steps={[
          { label: "Enquiry Arrives", type: "trigger" },
          { label: "90-Second Response", type: "action" },
          { label: "Qualify (2-3 Questions)", type: "ai" },
          { label: "Route to Team Member", type: "action" },
          { label: "Create CRM Record", type: "action" },
          { label: "Book Consultation", type: "outcome" },
        ]}
        resultBadge="Lead converted in under 2 minutes"
      />

      {/* Section 3 */}
      <SectionHeading>The Complete Workflow (Trigger to Outcome)</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        The trigger is a form submission — from your website, a landing page, or a Google Business profile. The moment the form fires, a webhook sends the data to Make (formerly Integromat). Make is the orchestration layer: it routes data between your tools and runs the conditional logic.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Within seconds, Make sends a personalized acknowledgement via email and SMS simultaneously (using Twilio for SMS). The message references what the lead enquired about and sets expectations: "We've received your enquiry about [service]. A team member will be in touch within [X hours]." During business hours, that handoff is often immediate.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        The qualification sequence fires next. This is typically 2–3 questions delivered inline in the email or via a short form. The answers trigger conditional branches in Make: an immigration enquiry routes differently from a bookkeeping enquiry. A high-budget lead with an urgent timeline gets flagged for priority follow-up.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        Once qualified, the CRM record is created automatically — all fields populated from the form and qualification answers. A Calendly or equivalent booking link is included in the next touchpoint. The assigned team member receives a Slack or email notification with the full context summary.
      </p>

      {/* Response Time Chart */}
      <ResponseTimeChart />

      {/* Section 4 */}
      <SectionHeading>Tools Used for Lead Automation</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { tool: "Make (Integromat)", desc: "Orchestration layer — connects your tools, runs the conditional logic, handles the webhook from your form." },
          { tool: "CRM (HubSpot / GHL / Zoho)", desc: "Record creation, pipeline tracking, and the source of truth for every lead through the funnel." },
          { tool: "Calendly", desc: "Real-time booking integration. Leads pick from live availability — no back-and-forth." },
          { tool: "Twilio", desc: "Programmatic SMS. Sends the 90-second response and any follow-up messages." },
          { tool: "Your existing form", desc: "Typeform, Gravity Forms, WPForms, or any form with webhook support. No need to replace it." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#F8F9FA", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
            <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.4rem", fontSize: "0.95rem" }}>{item.tool}</div>
            <div style={{ color: "#7B7B7B", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Section 5 */}
      <SectionHeading>Industry-Specific Lead Intake Patterns</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { industry: "Immigration", note: "The qualification question is visa type. Different visa categories trigger different intake branches, document checklists, and team routing." },
          { industry: "Accounting", note: "Service type (T1 personal, T2 corporate, bookkeeping) determines which workflow fires and which team member is assigned." },
          { industry: "Contractors", note: "Job type and location are the key qualifiers. Out-of-area enquiries are flagged differently; large commercial jobs route to senior staff." },
          { industry: "Clinics", note: "Urgency and insurance type are the primary qualifiers. Urgent cases trigger a different (faster) pathway; uninsured patients receive self-pay information." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "1.1rem", border: "1px solid #E2E8F0" }}>
            <div style={{ fontWeight: 700, color: "#7E0F4A", marginBottom: "0.5rem" }}>{item.industry}</div>
            <p style={{ color: "#7B7B7B", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>

      {/* Section 6 */}
      <SectionHeading>What Should Stay Human in Lead Handling</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Automation handles speed and consistency. Humans handle judgement and relationship. Specifically, keep these human:
      </p>
      <ul style={{ color: "#1A1A2E", lineHeight: 1.9, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li>Complex qualification that requires professional context (unusual cases, edge conditions)</li>
        <li>Pricing discussions and custom proposals</li>
        <li>Any follow-up that requires knowledge of the client's history or relationship context</li>
        <li>Situations where a lead explicitly asks to speak with someone</li>
      </ul>

      {/* Section 7 */}
      <SectionHeading>Implementation Timeline and Cost</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#EEF2FF", borderRadius: 10, padding: "1.25rem" }}>
          <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem" }}>Week 1</div>
          <p style={{ color: "#1A1A2E", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>Audit all lead sources, map the current process, define qualification logic, select tools if not already in place.</p>
        </div>
        <div style={{ background: "#EEF2FF", borderRadius: 10, padding: "1.25rem" }}>
          <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem" }}>Week 2</div>
          <p style={{ color: "#1A1A2E", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>Build the workflow in Make, connect CRM, set up booking integration, test across all lead sources, go live.</p>
        </div>
      </div>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        <strong>Typical cost: $1,500–$3,500</strong> for a single-workflow lead automation covering one primary service type. Multi-service or multi-branch configurations are priced accordingly.
      </p>

      {/* Section 8 */}
      <SectionHeading>What Results to Expect</SectionHeading>
      <BeforeAfterSection metrics={[
        { label: "Response Time", before: "4-8 hours", after: "90 seconds", beforeW: 90, afterW: 5 },
        { label: "Lost Leads / Month", before: "8-12", after: "1-2", beforeW: 80, afterW: 15 },
        { label: "Follow-Up Rate", before: "40%", after: "100%", beforeW: 40, afterW: 100 },
        { label: "After-Hours Capture", before: "0%", after: "100%", beforeW: 5, afterW: 100 },
        { label: "Staff Time (first response)", before: "10 hrs/week", after: "< 30 min/week", beforeW: 90, afterW: 5 },
      ]} />

      <ContextualCTA
        label="See This in Action"
        description="Read how an immigration firm automated lead intake and cut response time to 90 seconds using"
        linkText="Lead Response Automation"
        linkHref="/case-studies/immigration-firm-north-york"
      />

      {/* FAQ */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <div style={{ marginBottom: "2.5rem" }}>
        <FAQItem q="What if leads come from multiple channels?" a="The system captures all channels — website form, email, Google Business, social DMs — into one unified workflow. The source is tagged on each record so you can see which channels drive the most qualified leads." />
        <FAQItem q="Can it qualify leads for complex services?" a="The qualification uses 2-3 questions that you define. For complex qualification, we build multi-step sequences with conditional branches — so a visa enquiry can branch into different qualification paths based on the visa category." />
        <FAQItem q="What happens to leads who don't qualify?" a="They go into a nurture sequence — not lost, just in a different track. Qualification thresholds are configurable, and the nurture sequence can include educational content, a lighter-touch follow-up, or a referral pathway." />
        <FAQItem q="How does the 90-second response actually work?" a="The moment a form is submitted, a webhook fires, the automation creates the record, personalises the message, and sends it via email and SMS simultaneously. Average actual time: 8-45 seconds depending on server load and the complexity of personalization." />
        <FAQItem q="Does this work for after-hours enquiries?" a="Yes. The system runs 24/7. After-hours leads get the same 90-second response and are flagged in the morning digest so the team sees them first thing. The team member assignment happens immediately; the human follow-up happens at business hours." />
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #283891 0%, #1A1A2E 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Ready to Stop Losing Leads to Slow Response?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", lineHeight: 1.7 }}>Map your current lead intake process and see exactly where automation would have the most impact.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/automation-planner">
            <a style={{ background: "#7E0F4A", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>Start the Automation Planner</a>
          </Link>
          <Link href="/contact">
            <a style={{ background: "transparent", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a>
          </Link>
        </div>
      </div>

      <RelatedResources pagePath="/workflows/lead-intake" />
    </div>
  );
}
