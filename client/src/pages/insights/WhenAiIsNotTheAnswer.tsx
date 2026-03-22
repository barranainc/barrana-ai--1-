import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";

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

const signs = [
  { sign: "No repeatable process", fix: "Document the ideal workflow first" },
  { sign: "People problem, not systems", fix: "Address accountability before automating" },
  { sign: "Volume too low (<10/month)", fix: "Grow the business, then automate" },
  { sign: "Data is too messy", fix: "Clean and standardise data first" },
  { sign: "Can't define success", fix: "Set one clear metric before building" },
  { sign: "High-accountability area", fix: "Keep humans in the loop" },
  { sign: "Haven't diagnosed the problem", fix: "Diagnose the root cause first" },
];

function WarningCards() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", margin: "1.5rem 0 2rem" }}>
      {signs.map((s, i) => (
        <div key={i} style={{ borderLeft: "4px solid #f59e0b", background: "#FFFBEB", borderRadius: "0 12px 12px 0", padding: "1.25rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <span style={{ background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
            <strong style={{ color: "#1A1A2E", fontSize: "0.9rem" }}>{s.sign}</strong>
          </div>
          <p style={{ color: "#7B7B7B", fontSize: "0.84rem", fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>Fix first: {s.fix}</p>
        </div>
      ))}
    </div>
  );
}

function DiagnosisFramework() {
  const { ref, visible } = useReveal();
  const steps = [
    { num: 1, title: "Name the problem precisely", example: '"We lose 8 leads per month"', color: "#283891" },
    { num: 2, title: "Measure current state", example: '"Response time: 4 hours average"', color: "#2e409e" },
    { num: 3, title: "Define success", example: '"Response time < 90 seconds, leads lost < 2/month"', color: "#7E0F4A" },
  ];
  return (
    <div ref={ref} style={{ margin: "2rem 0" }}>
      <h3 style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "1.25rem", fontSize: "1rem" }}>The Diagnosis Framework: 3 Steps Before You Build</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {steps.map((step, i) => (
          <div key={step.num} style={{ background: "#F8F9FC", borderRadius: 12, padding: "1.5rem", borderTop: `4px solid ${step.color}`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.45s ease ${i * 150}ms, transform 0.45s ease ${i * 150}ms` }}>
            <div style={{ width: 32, height: 32, background: step.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{step.num}</div>
            <strong style={{ color: "#1A1A2E", display: "block", marginBottom: "0.5rem", fontSize: "0.95rem" }}>{step.title}</strong>
            <p style={{ color: "#7B7B7B", fontSize: "0.85rem", fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>e.g. {step.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "When AI Is Not the Answer: 7 Signs Automation Is Not What You Need Right Now",
  "description": "AI automation is not the right solution when you don't have a repeatable process, your problem is a people issue, your volume is too low, or you haven't diagnosed the root problem.",
  "author": { "@type": "Organization", "name": "Barrana AI" },
  "publisher": { "@type": "Organization", "name": "Barrana AI" },
};

export default function WhenAiIsNotTheAnswer() {
  useEffect(() => { document.title = "When AI Is Not the Answer: 7 Signs You're Not Ready | Barrana AI"; }, []);

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A2E" }}>
        <section style={{ background: "linear-gradient(135deg,#7E0F4A 0%,#1A1A2E 100%)", padding: "4rem 1.5rem 3rem" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }}>Decision Guide</span>
              <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>7 min read</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              When AI Is Not the Answer: 7 Signs Automation Is Not What You Need Right Now
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              The honest guide to recognising when to wait — and what to fix first.
            </p>
          </div>
        </section>

        <section style={{ padding: "3rem 1.5rem" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <SummaryBox>
              <strong style={{ color: "#283891", display: "block", marginBottom: "0.5rem" }}>Quick Answer</strong>
              <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.7 }}>
                AI automation is not the right solution when: you don't have a repeatable process, your problem is a people issue, your volume is under 10 interactions per month, your data is too messy, you can't define success, you're automating in a high-accountability area without oversight, or you haven't diagnosed the root problem. Fix these first — then automate.
              </p>
            </SummaryBox>

            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "2rem" }}>
              Automation is one of the most powerful tools available to small businesses. But it is not a universal solution. Knowing when <em>not</em> to automate is as important as knowing what to automate. Building a system on a shaky foundation doesn't fix the foundation — it amplifies its flaws.
            </p>

            <SectionHeading>The 7 Signs</SectionHeading>

            <WarningCards />

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2rem" }}>
              {[
                {
                  num: 1, title: "You don't have a repeatable process",
                  body: "If you do it differently every time, automating it will lock in inconsistency at scale. The automation will behave unpredictably because the underlying process is unpredictable. This doesn't mean your process needs to be perfect — it needs to follow the same general steps for most clients, most of the time.",
                  fix: "Document the ideal process first. Even a rough 1-page flowchart is enough to start. Define the steps, the inputs, the outputs, and the exceptions. Then automate the core path."
                },
                {
                  num: 2, title: "Your problem is a people problem, not a systems problem",
                  body: "If the issue is lack of follow-through, accountability, or motivation on your team, automation won't solve it. A reminder system can't make someone want to do good work. An onboarding automation can't compensate for poor training. Technology amplifies what's already there — including dysfunction.",
                  fix: "Address the people issue first. Define expectations, establish accountability, and create the right incentive structure. Once the human side is functioning, automation can multiply the results."
                },
                {
                  num: 3, title: "Your volume is too low",
                  body: "If you have fewer than 10 client interactions per month, the ROI calculation rarely works in your favour. The time saved by automation is real, but at low volume it doesn't justify the implementation cost. You'd recover the investment faster by focusing on getting more clients.",
                  fix: "Focus on lead generation and business development. Set a target of 20+ monthly interactions as your automation trigger point. Use that time to document your processes so you're ready to automate when volume justifies it."
                },
                {
                  num: 4, title: "Your data is too messy",
                  body: "Automation depends on clean, structured, consistent data. If your CRM has duplicate records, inconsistent naming conventions, missing fields, or data spread across five different spreadsheets, any automation built on top of it will produce unreliable results. Garbage in, garbage out — at scale.",
                  fix: "Run a data cleanup sprint before automating. Standardise your client records, consolidate your data sources, and define the fields that automation will depend on. This cleanup often takes 2–4 weeks but is foundational."
                },
                {
                  num: 5, title: "You cannot define success",
                  body: "If you can't say 'this automation will have worked when X is true', you'll never know if it worked. And if you can't measure it, you can't improve it, justify the investment, or scale it confidently. Vague outcomes lead to vague accountability.",
                  fix: "Before building anything, define one clear metric. Response time, no-show rate, hours saved per week, or conversion rate. Write it down. This becomes your acceptance criteria for the build."
                },
                {
                  num: 6, title: "You're automating in a high-accountability area without oversight",
                  body: "Professional advice, medical decisions, regulated communications, and complex client-specific judgements are areas where automation can assist but should not replace human oversight. The risk of errors in these areas is not just operational — it's legal and reputational.",
                  fix: "Keep humans in the loop. Use automation to draft, prepare, and prompt — but require human review and approval before anything sensitive is sent or actioned. Build oversight into the workflow, not around it."
                },
                {
                  num: 7, title: "You haven't diagnosed the root problem",
                  body: "'We need AI' is not a diagnosis. 'We lose 8 leads per month because our response time is over 4 hours' is. When the problem isn't defined, the solution is speculative. You might build the right thing, or you might build something impressive that doesn't address the actual source of pain.",
                  fix: "Diagnose before building. Name the problem precisely. Measure the current state. Then design the solution. This 3-step process takes a few hours and saves months of misdirected implementation."
                },
              ].map((sign) => (
                <div key={sign.num} style={{ background: "#F8F9FC", borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #f59e0b" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{ background: "#f59e0b", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{sign.num}</span>
                    <strong style={{ color: "#1A1A2E", fontSize: "1rem" }}>{sign.title}</strong>
                  </div>
                  <p style={{ color: "#7B7B7B", lineHeight: 1.75, margin: "0 0 0.75rem" }}>{sign.body}</p>
                  <div style={{ background: "#fff", borderRadius: 8, padding: "0.75rem 1rem", border: "1px solid #E2E8F0" }}>
                    <strong style={{ color: "#283891", fontSize: "0.85rem" }}>Fix: </strong>
                    <span style={{ color: "#7B7B7B", fontSize: "0.88rem" }}>{sign.fix}</span>
                  </div>
                </div>
              ))}
            </div>

            <SectionHeading>The Common Thread</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              All 7 signs point to the same root issue: automation should solve a defined, measured problem — not be purchased speculatively because it sounds powerful. The businesses that get the most from automation are those that treat it as a precision tool, not a cure-all.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              The most successful automation projects start with a clearly articulated problem, a measurable baseline, and a defined success outcome. Everything else — the tools, the platforms, the integrations — follows from that foundation.
            </p>

            <DiagnosisFramework />

            <SectionHeading>What to Do Instead</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              If any of the 7 signs apply to your business right now, here is the sequence:
            </p>
            <ol style={{ color: "#7B7B7B", lineHeight: 2, paddingLeft: "1.25rem" }}>
              <li><strong style={{ color: "#1A1A2E" }}>Map your workflows</strong> — document what you actually do today, step by step</li>
              <li><strong style={{ color: "#1A1A2E" }}>Identify the highest-cost bottleneck</strong> — where is time, money, or opportunity being lost?</li>
              <li><strong style={{ color: "#1A1A2E" }}>Define success</strong> — what does "fixed" look like, in measurable terms?</li>
              <li><strong style={{ color: "#1A1A2E" }}>Clean your data</strong> — standardise client records and consolidate data sources</li>
              <li><strong style={{ color: "#1A1A2E" }}>Fix process inconsistencies</strong> — document the ideal path before you automate it</li>
              <li><strong style={{ color: "#1A1A2E" }}>Then automate</strong> — with a defined problem, clean data, and measurable success criteria</li>
            </ol>

            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem q="What if I'm not sure whether my problem is a people issue or systems issue?" a="Run an experiment: have the person follow the ideal process manually for 2 weeks. If results improve with manual effort, it's a process issue. If the person can't sustain it, it's a systems issue." />
              <FAQItem q="We only have 8 client interactions per month. Should we wait?" a="Focus on lead generation first. When you reach 20+ per month, automation ROI becomes compelling. Use the time to document your processes." />
              <FAQItem q="How do I clean up our data before automating?" a="A data audit and cleanup sprint is often part of Phase 1. We can include it in the automation scope — typically 1–2 weeks of structured cleanup before building." />
              <FAQItem q="We've invested in automation before and it didn't work. Was it one of these 7 reasons?" a="Almost always yes. The most common root causes are Sign 1 (no repeatable process) or Sign 7 (didn't diagnose the problem first). Both lead to building the wrong thing." />
            </div>

            <div style={{ background: "linear-gradient(135deg,#283891 0%,#1A1A2E 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.35rem", marginBottom: "0.75rem" }}>Check your readiness before you build</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>The Readiness Assessment shows you exactly where you stand and what to address first.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/insights/automation-readiness"><a style={{ background: "#fff", color: "#283891", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>Take the Readiness Assessment</a></Link>
                <Link href="/contact"><a style={{ background: "transparent", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
