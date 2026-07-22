import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import SEOHead from "@/components/SEOHead";
import ContextualCTA from "@/components/linking/ContextualCTA";
import RelatedResources from "@/components/linking/RelatedResources";
import { colors, spacing, typography, surfaces } from "@/styles/design-tokens";

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

function DecisionMatrix() {
  const { ref, visible } = useReveal();
  const quadrants = [
    {
      label: "AUTOMATE",
      freq: "High", judge: "Low",
      color: "#22c55e", bg: "#F0FDF4",
      border: "#22c55e",
      examples: "Invoice reminders, lead acknowledgements, booking confirmations",
      position: "top-left",
    },
    {
      label: "DELEGATE + AI ASSIST",
      freq: "High", judge: "High",
      color: "#283891", bg: "#F0F4FF",
      border: "#283891",
      examples: "Client advice calls, escalations, custom proposals",
      position: "top-right",
    },
    {
      label: "BATCH IT",
      freq: "Low", judge: "Low",
      color: "#7B7B7B", bg: "#F8F9FC",
      border: "#E2E8F0",
      examples: "Filing, data tidying, admin catch-up",
      position: "bottom-left",
    },
    {
      label: "DELEGATE",
      freq: "Low", judge: "High",
      color: "#1A1A2E", bg: "#F8F9FC",
      border: "#1A1A2E",
      examples: "Complex complaints, regulatory decisions, relationship calls",
      position: "bottom-right",
    },
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
      <h3 style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "1.5rem", fontSize: "1rem", textAlign: "center" }}>
        The Automation vs Delegation Decision Matrix
      </h3>
      <div style={{ position: "relative" }}>
        {/* Axis labels */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
          <div style={{ textAlign: "center", fontWeight: 700, color: "#7B7B7B", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            ← Low Judgement Required - High Judgement Required →
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
          {/* Y-axis label */}
          <div style={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}>
            <div style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap", fontWeight: 700, color: "#7B7B7B", fontSize: "0.78rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              ↑ High Freq ↓ Low
            </div>
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {quadrants.map((q) => (
              <div key={q.label} style={{ background: q.bg, border: `2px solid ${q.border}`, borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ fontWeight: 800, color: q.color, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{q.label}</div>
                <div style={{ fontSize: "0.72rem", color: "#7B7B7B", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.4rem" }}>Freq: {q.freq} | Judgement: {q.judge}</div>
                <p style={{ color: "#7B7B7B", fontSize: "0.8rem", margin: 0, lineHeight: 1.5 }}>{q.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#7B7B7B", fontSize: "0.8rem", marginTop: "1rem" }}>
        Start with the top-left quadrant: high frequency, low judgement tasks are your fastest automation wins.
      </p>
    </div>
  );
}

function TaskClassification() {
  const { ref, visible } = useReveal();
  const automate = [
    "Invoice reminder",
    "Lead acknowledgement",
    "Document request",
    "Booking confirmation",
  ];
  const delegate = [
    "Client advice",
    "Complaint handling",
    "Custom proposals",
    "Relationship calls",
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1.5rem 0 2rem", opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <div>
        <div style={{ background: "#22c55e", color: "#fff", borderRadius: "10px 10px 0 0", padding: "0.75rem 1rem", fontWeight: 700, fontSize: "0.9rem", textAlign: "center" }}>AUTOMATE</div>
        <div style={{ border: "2px solid #22c55e", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
          {automate.map((t, i) => (
            <div key={t} style={{ padding: "0.75rem 1rem", background: i % 2 === 0 ? "#F0FDF4" : "#fff", borderBottom: "1px solid #E2E8F0", fontSize: "0.88rem", color: "#1A1A2E", fontWeight: 500 }}>
              <span style={{ color: "#22c55e", marginRight: "0.5rem", fontWeight: 700 }}>→</span>{t}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ background: "#283891", color: "#fff", borderRadius: "10px 10px 0 0", padding: "0.75rem 1rem", fontWeight: 700, fontSize: "0.9rem", textAlign: "center" }}>DELEGATE</div>
        <div style={{ border: "2px solid #283891", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
          {delegate.map((t, i) => (
            <div key={t} style={{ padding: "0.75rem 1rem", background: i % 2 === 0 ? "#F0F4FF" : "#fff", borderBottom: "1px solid #E2E8F0", fontSize: "0.88rem", color: "#1A1A2E", fontWeight: 500 }}>
              <span style={{ color: "#283891", marginRight: "0.5rem", fontWeight: 700 }}>→</span>{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const practicalExamples = [
  { task: "Send invoice reminder", decision: "Automate", reason: "Rule-based, repetitive, no judgement required" },
  { task: "Client status update call", decision: "Delegate", reason: "Requires relationship, empathy, and specific context" },
  { task: "Initial lead acknowledgement", decision: "Automate", reason: "Standardisable, speed-critical, high volume" },
  { task: "Handle a client complaint", decision: "Delegate", reason: "Requires emotional intelligence and accountability" },
];

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Automation vs Delegation: What Business Owners Get Wrong",
  "description": "Automation and delegation solve different problems. The decision framework: if a task follows the same rules every time and requires no judgement, automate it. If it requires context, creativity, or relationships, delegate it.",
  "author": { "@type": "Organization", "name": "Barrana AI" },
  "publisher": { "@type": "Organization", "name": "Barrana AI" },
};

export default function AutomationVsDelegation() {
  useEffect(() => { document.title = "Automation vs Delegation: What Business Owners Get Wrong | Barrana AI"; }, []);
  const examplesReveal = useReveal();

  return (
    <>
      <SEOHead title="Automation vs Delegation: What Business Owners Get Wrong | Barrana AI" description="Automation and delegation solve different problems. If a task follows the same rules every time and requires no judgement, automate it. If it requires context, creativity, or relationships, delegate it." type="article" />
      <JsonLd data={jsonLdData} />
      <main style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A2E" }}>
        <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 1.5rem " + spacing.sectionPaddingSm }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }}>Decision Guide</span>
              <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>8 min read</span>
            </div>
            <h1 style={{ ...typography.pageTitle, color: "#fff", marginBottom: "1.25rem" }}>
              Automation vs Delegation: What Business Owners Get Wrong
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Two different tools. Two different problems. A practical framework for choosing which one to use.
            </p>
          </div>
        </section>

        <section style={{ padding: spacing.sectionPadding + " 1.5rem" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <SummaryBox>
              <strong style={{ color: "#283891", display: "block", marginBottom: "0.5rem" }}>Quick Answer</strong>
              <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.7 }}>
                Automation and delegation solve different problems. If the task follows the same rules every time and requires no judgement, automate it. If it requires context, creativity, or relationships, delegate it. If it is high-frequency AND low-skill, automate first and free the person for higher-value work.
              </p>
            </SummaryBox>

            <SectionHeading>The Core Distinction</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Delegation</strong> means you assign the task to a person. That person can adapt to context, interpret ambiguous situations, exercise judgement, and make decisions based on the specific circumstances. The task still takes human time - it's just someone else's time.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Automation</strong> means the task is removed from people entirely and handled by connected systems. No one decides whether to send the reminder - it happens automatically, every time, without exception. The task takes zero human time.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              These are fundamentally different tools. Using the wrong one for the wrong task creates either unreliable automation (too much variability) or unnecessarily expensive delegation (too much human time on rule-based work). Both outcomes are costly.
            </p>

            <SectionHeading>What Business Owners Get Wrong</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { title: "Trying to automate tasks that need judgement", body: "Writing custom client advice, handling complex exception cases, or managing difficult conversations cannot be reliably automated. The variability is too high and the cost of error is too great." },
                { title: "Delegating tasks that could be automated", body: "Sending standard reminders, creating CRM records, generating invoices, and sending booking confirmations are rule-based. Delegating them wastes your team's time and creates inconsistency from human error." },
                { title: "Using delegation as a substitute for process design", body: "Dumping messy, undefined work on a hire and hoping they'll figure it out is not delegation - it's avoidance. You still need to define the process before you assign it." },
                { title: "Using automation as a substitute for clear thinking", body: "Automating a poorly defined process doesn't fix the process - it runs the poorly defined process faster and more consistently. Define first, then automate." },
              ].map((item, i) => (
                <div key={i} style={{ background: "#F8F9FC", borderRadius: 12, padding: "1.25rem", borderLeft: "4px solid #7E0F4A" }}>
                  <strong style={{ color: "#1A1A2E", display: "block", marginBottom: "0.4rem" }}>{item.title}</strong>
                  <p style={{ color: "#7B7B7B", margin: 0, lineHeight: 1.7, fontSize: "0.95rem" }}>{item.body}</p>
                </div>
              ))}
            </div>

            <SectionHeading>The Decision Framework</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.7, marginBottom: "1rem" }}>
              Place every task on two dimensions: how often does it happen (frequency), and how much judgement does it require? The quadrant it falls into tells you the right approach.
            </p>

            <DecisionMatrix />

            <SectionHeading>Task Classification Examples</SectionHeading>
            <TaskClassification />

            <SectionHeading>Practical Examples</SectionHeading>
            <div ref={examplesReveal.ref} style={{ overflowX: "auto", marginBottom: "2rem", opacity: examplesReveal.visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#283891", color: "#fff" }}>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.88rem" }}>Task</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.88rem" }}>Decision</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.88rem" }}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {practicalExamples.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F8F9FC" }}>
                      <td style={{ padding: "0.85rem 1rem", color: "#1A1A2E", fontWeight: 500, fontSize: "0.88rem", borderBottom: "1px solid #E2E8F0" }}>{row.task}</td>
                      <td style={{ padding: "0.85rem 1rem", fontWeight: 700, fontSize: "0.88rem", color: row.decision === "Automate" ? "#22c55e" : "#283891", borderBottom: "1px solid #E2E8F0" }}>{row.decision}</td>
                      <td style={{ padding: "0.85rem 1rem", color: "#7B7B7B", fontSize: "0.85rem", borderBottom: "1px solid #E2E8F0" }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionHeading>The Compounding Effect of Getting It Right</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              When you automate the right tasks, your team's attention shifts to higher-value work - the work that requires judgement, creativity, and relationship. The volume of low-value activity they used to absorb simply disappears. This is not just faster - it is structurally better.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              Over time, the compounding effect is significant. A team freed from reminder emails, CRM data entry, and document chasing can redirect that capacity toward client relationships, strategic work, and growth. The business doesn't just operate more efficiently - it becomes more capable.
            </p>

            <SectionHeading>Why Both Matter</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ background: "#F0F4FF", borderRadius: 12, padding: "1.25rem", border: "2px solid #283891" }}>
                <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.5rem" }}>Only automation</div>
                <p style={{ color: "#7B7B7B", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>Handles volume efficiently but loses the human touch that clients need for complex situations. Falls short in high-judgement moments.</p>
              </div>
              <div style={{ background: "#FFF0F8", borderRadius: 12, padding: "1.25rem", border: "2px solid #7E0F4A" }}>
                <div style={{ fontWeight: 700, color: "#7E0F4A", marginBottom: "0.5rem" }}>Only delegation</div>
                <p style={{ color: "#7B7B7B", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>Human capacity has a ceiling. Growth requires proportionally more headcount. Inconsistency in rule-based tasks creates errors and client friction.</p>
              </div>
            </div>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              The best-run service businesses use both: automation for everything rule-based and repeatable, delegation for everything that requires context, creativity, accountability, or relationship. The two work in concert - automation creates capacity, delegation uses it wisely.
            </p>

            <ContextualCTA
              label="See This in Action"
              description="Read how a contractor eliminated manual follow-ups and freed 15 hours per week using"
              linkText="Workflow Automation"
              linkHref="/case-studies/contractor-mississauga"
            />

            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem q="Is there anything that should never be automated?" a="Yes - tasks involving professional liability, emotional support, creative judgement, and regulated advice should not be automated. They can be supported by automation but must remain human-led." />
              <FAQItem q="Can AI assist with delegation?" a="Yes. AI can draft, summarise, or prepare information for the delegate - reducing the time the task takes. The decision and execution remain human." />
              <FAQItem q="How do we identify which of our tasks fit each quadrant?" a="The Automation Audit maps your workflows and scores each task on frequency and judgement required. This is the output of the friction mapping exercise." />
              <FAQItem q="We've been delegating everything because we didn't know what could be automated. Where do we start?" a="Start with the highest-frequency, lowest-judgement tasks. Invoice reminders, appointment reminders, lead acknowledgements, document requests. These are usually automatable within 1–2 weeks." />
            </div>

            <div style={{ ...surfaces.darkGradient, borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.35rem", marginBottom: "0.75rem" }}>Find out what to automate and what to delegate</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>The Automation Planner maps your workflows and scores each task in minutes.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/automation-planner"><a style={{ background: "#fff", color: "#283891", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>Start the Automation Planner</a></Link>
                <Link href="/contact"><a style={{ background: "transparent", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a></Link>
              </div>
            </div>

            <RelatedResources pagePath="/insights/automation-vs-delegation" />
          </div>
        </section>
      </main>
    </>
  );
}
