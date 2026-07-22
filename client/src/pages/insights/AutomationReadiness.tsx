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

function ReadinessChecker() {
  const questions = [
    "20+ client interactions per month",
    "At least one repeatable workflow",
    "Identifiable admin time drains",
    "Email + calendar tools in use",
    "Willing to start with one workflow",
  ];
  const [checked, setChecked] = useState<boolean[]>(Array(5).fill(false));
  const score = checked.filter(Boolean).length;

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const levelLabel = score >= 5 ? "Ready for Full System" : score >= 4 ? "Ready for Multi-Workflow" : score >= 3 ? "Ready for Phase 1" : "Not quite yet";
  const levelColor = score >= 5 ? "#283891" : score >= 4 ? "#2e409e" : score >= 3 ? "#22c55e" : "#7B7B7B";

  return (
    <div style={{ background: "#F8F9FC", borderRadius: 16, padding: "2rem", margin: "2rem 0" }}>
      <h3 style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "1.25rem", fontSize: "1.05rem" }}>Quick Readiness Check</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {questions.map((q, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#fff", border: `2px solid ${checked[i] ? "#22c55e" : "#E2E8F0"}`, borderRadius: 10, padding: "0.85rem 1rem", transition: "border-color 0.2s, background 0.2s", cursor: "pointer" }} onClick={() => toggle(i)}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[i] ? "#22c55e" : "#E2E8F0"}`, background: checked[i] ? "#22c55e" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
              {checked[i] && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ color: checked[i] ? "#1A1A2E" : "#7B7B7B", fontWeight: checked[i] ? 600 : 400, fontSize: "0.95rem", transition: "color 0.2s" }}>{q}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: `2px solid ${levelColor}`, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", fontWeight: 900, color: levelColor }}>{score}/5</div>
        <div style={{ fontWeight: 700, color: levelColor, fontSize: "1rem", marginTop: "0.25rem" }}>{levelLabel}</div>
        {score < 3 && <p style={{ color: "#7B7B7B", fontSize: "0.85rem", margin: "0.5rem 0 0" }}>Address the unchecked items before starting automation.</p>}
        {score >= 3 && score < 5 && <p style={{ color: "#7B7B7B", fontSize: "0.85rem", margin: "0.5rem 0 0" }}>You have a solid foundation. Start with one workflow and expand.</p>}
        {score === 5 && <p style={{ color: "#7B7B7B", fontSize: "0.85rem", margin: "0.5rem 0 0" }}>Your business is well-positioned for a full automation system.</p>}
      </div>
    </div>
  );
}

function NotReadyCards() {
  const { ref, visible } = useReveal();
  const cards = [
    { problem: "Workflow is not defined", fix: "Map it in a 1-page flowchart first", icon: "⚠️" },
    { problem: "No CRM", fix: "Start with HubSpot free or a spreadsheet", icon: "⚠️" },
    { problem: "Volume is too low", fix: "Focus on lead generation before automation", icon: "⚠️" },
    { problem: "Can't define success", fix: "Set one metric: response time, no-show rate, or hours saved", icon: "⚠️" },
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", margin: "1.5rem 0 2rem" }}>
      {cards.map((card, i) => (
        <div key={i} style={{ borderLeft: "4px solid #f59e0b", background: "#FFFBEB", borderRadius: "0 12px 12px 0", padding: "1.25rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.45s ease ${i * 100}ms, transform 0.45s ease ${i * 100}ms` }}>
          <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{card.icon}</div>
          <div style={{ fontWeight: 700, color: "#1A1A2E", fontSize: "0.95rem", marginBottom: "0.4rem" }}>{card.problem}</div>
          <div style={{ color: "#7B7B7B", fontSize: "0.88rem", fontStyle: "italic" }}>Fix: {card.fix}</div>
        </div>
      ))}
    </div>
  );
}

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Know If Your Business Is Automation-Ready",
  "description": "A business is ready for automation when it has repeatable workflows, 20+ client interactions per month, identifiable time drains, basic digital tools, and willingness to start small.",
  "author": { "@type": "Organization", "name": "Barrana AI" },
  "publisher": { "@type": "Organization", "name": "Barrana AI" },
};

export default function AutomationReadiness() {
  useEffect(() => { document.title = "How to Know If Your Business Is Automation-Ready | Barrana AI"; }, []);

  return (
    <>
      <SEOHead title="How to Know If Your Business Is Automation-Ready | Barrana AI" description="A business is ready for automation when it has repeatable workflows, 20+ client interactions per month, identifiable time drains, basic digital tools, and willingness to start small." type="article" />
      <JsonLd data={jsonLdData} />
      <main style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A2E" }}>
        <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 1.5rem " + spacing.sectionPaddingSm }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }}>Decision Guide</span>
              <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>7 min read</span>
            </div>
            <h1 style={{ ...typography.pageTitle, color: "#fff", marginBottom: "1.25rem" }}>
              How to Know If Your Business Is Automation-Ready
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Most businesses are more ready than they think. Here are the 5 signals that tell you it's time.
            </p>
          </div>
        </section>

        <section style={{ padding: spacing.sectionPadding + " 1.5rem" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <SummaryBox>
              <strong style={{ color: "#283891", display: "block", marginBottom: "0.5rem" }}>Quick Answer</strong>
              <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.7 }}>
                A business is ready for automation when it has: (1) repeatable workflows, (2) at least 20 client interactions per month, (3) identifiable time drains in admin or coordination, (4) basic digital tools in place, and (5) willingness to start with one workflow. You do <em>not</em> need technical expertise, a large team, or a big budget.
              </p>
            </SummaryBox>

            <SectionHeading>The 5 Readiness Signals</SectionHeading>

            {[
              {
                num: 1, title: "You have repeatable workflows",
                body: "If the same steps happen in the same order for most clients, you have something automation can reliably handle. The workflow doesn't need to be perfect - it needs to be consistent. Even a rough, manual process that happens the same way 80% of the time is automatable."
              },
              {
                num: 2, title: "You have volume (20+ client interactions per month)",
                body: "Automation ROI depends on frequency. If the workflow runs 5 times a month, the time savings are marginal. At 20+ interactions, the compounding effect of saved time, reduced errors, and faster response becomes significant and measurable within weeks."
              },
              {
                num: 3, title: "You can name specific time drains",
                body: "If you or your team can say 'we spend X hours per week doing Y manually', you have identified a target. This specificity is the foundation of ROI calculation. Vague frustration is not enough - you need to be able to point to the drain."
              },
              {
                num: 4, title: "You have basic digital tools",
                body: "Email and a calendar are the minimum. A CRM of any kind - even a spreadsheet - is better. You do not need Salesforce or a complex tech stack. The key is that your client data exists in digital form that can be read and written by automation tools."
              },
              {
                num: 5, title: "You're willing to start small and measure",
                body: "The businesses that succeed with automation are those that commit to one workflow, measure its results for 4 weeks, and then expand. Impatience - wanting to automate everything at once - is the most common reason projects fail."
              },
            ].map((s) => (
              <div key={s.num} style={{ display: "flex", gap: "1.25rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ background: "#283891", color: "#fff", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0, marginTop: 2 }}>{s.num}</div>
                <div>
                  <strong style={{ color: "#1A1A2E", display: "block", marginBottom: "0.4rem" }}>{s.title}</strong>
                  <p style={{ color: "#7B7B7B", lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}

            <SectionHeading>The 5 Things You Do NOT Need</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { title: "Technical expertise", body: "We handle all technical implementation. You only need to understand your own workflows." },
                { title: "A large team", body: "Many of our most successful clients are solo operators or 2–3 person firms." },
                { title: "An enterprise CRM", body: "Free tools like HubSpot CRM or even Google Sheets are a sufficient starting point." },
                { title: "A big budget", body: "Most initial automations are scoped to $3,000–$8,000 with clear ROI within 60 days." },
                { title: "A perfectly documented process", body: "We document it during the audit. You just need to be able to describe what you do today." },
              ].map((item) => (
                <div key={item.title} style={{ background: "#F8F9FC", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#22c55e", fontWeight: 900, fontSize: "1rem" }}>✓</span>
                    <strong style={{ color: "#1A1A2E", fontSize: "0.95rem" }}>{item.title}</strong>
                  </div>
                  <p style={{ color: "#7B7B7B", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>

            <SectionHeading>The Quick Readiness Assessment</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.7, marginBottom: "1rem" }}>
              Toggle each item to Yes as it applies to your business. Your readiness level updates in real time.
            </p>
            <ReadinessChecker />

            <SectionHeading>What to Fix Before Automating</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              If you're not quite there yet on the readiness signals, here are the four things to address first:
            </p>
            <ol style={{ color: "#7B7B7B", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
              <li><strong style={{ color: "#1A1A2E" }}>Define the workflow</strong> - you can't automate what you can't describe. Write out the steps, even roughly.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Have a CRM or spreadsheet for client records</strong> - automation needs somewhere to read and write client data.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Have at least one tool for client intake</strong> - a form, an email inbox, or any structured method of receiving new enquiries.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Define what success looks like</strong> - how will you know it worked? Pick one metric before you build.</li>
            </ol>

            <SectionHeading>What to Fix If You're Not Ready Yet</SectionHeading>
            <NotReadyCards />

            <SectionHeading>Industry-Specific Readiness Patterns</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { industry: "Law", signal: "Active file management system", note: "File numbering, matter tracking, and document storage need to be in place." },
                { industry: "Clinics", signal: "Booking software", note: "Any practice management or scheduling tool is a sufficient foundation." },
                { industry: "Contractors", signal: "Any lead capture method", note: "Even a basic contact form or inquiry email is enough to start." },
                { industry: "Accounting", signal: "Document workflow definition", note: "A defined list of required documents per service type is the key prerequisite." },
              ].map((item) => (
                <div key={item.industry} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.3rem", fontSize: "0.95rem" }}>{item.industry}</div>
                  <div style={{ fontWeight: 600, color: "#1A1A2E", fontSize: "0.88rem", marginBottom: "0.4rem" }}>{item.signal}</div>
                  <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
                </div>
              ))}
            </div>

            <ContextualCTA
              label="See This in Action"
              description="Read how a physio clinic went from manual scheduling to full automation using"
              linkText="Appointment Automation"
              linkHref="/case-studies/physio-clinic-richmond-hill"
            />

            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem q="We're a solo operator with 2 clients - are we ready?" a="Probably not yet for workflow automation. Focus on landing more clients. But start preparing: use a proper CRM and document your intake process." />
              <FAQItem q="What if our processes aren't consistent yet?" a="Fix the process first. Automation doesn't fix a broken process - it accelerates it. Map the ideal workflow, then automate." />
              <FAQItem q="How do we know which automation to start with?" a="The Automation Planner helps you identify this. You can also book a free audit and we'll map it with you." />
              <FAQItem q="We tried automation before and it failed. Does readiness help?" a="Yes. Most automation failures happen because either the workflow wasn't defined or the wrong thing was automated first. The readiness framework prevents both." />
            </div>

            <div style={{ ...surfaces.darkGradient, borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.35rem", marginBottom: "0.75rem" }}>Find out where you stand</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>The Automation Planner maps your readiness and identifies your best starting point in minutes.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/automation-planner"><a style={{ background: "#fff", color: "#283891", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>Start the Automation Planner</a></Link>
                <Link href="/contact"><a style={{ background: "transparent", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a></Link>
              </div>
            </div>
            <RelatedResources pagePath="/insights/automation-readiness" />
          </div>
        </section>
      </main>
    </>
  );
}
