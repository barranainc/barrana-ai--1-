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

// ─── Graphic 1: Manual vs Automated Day ──────────────────────────────────────

function ManualVsAutomatedDay() {
  const { ref, visible } = useReveal();
  const tasks = [
    { label: "Lead Response", manual: 120, auto: 10 },
    { label: "Document Chasing", manual: 90, auto: 5 },
    { label: "Scheduling & Booking", manual: 60, auto: 5 },
    { label: "Follow-ups", manual: 60, auto: 10 },
    { label: "Admin & Reporting", manual: 90, auto: 15 },
  ];
  const maxMin = 120;

  return (
    <div ref={ref} style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "2rem", margin: "2rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1A1A2E", margin: 0 }}>Your Business Day: Manual vs Automated</h3>
        <div style={{
          background: "#1A6B3C", color: "#fff", borderRadius: 24, padding: "0.4rem 1rem",
          fontSize: "0.875rem", fontWeight: 700,
          opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.5s ease 1.2s, transform 0.5s ease 1.2s"
        }}>
          15 hrs/week recovered
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#7B7B7B" }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: "#DC2626" }} /> Manual
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#7B7B7B" }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: "#16A34A" }} /> Automated
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tasks.map((task, i) => (
          <div key={task.label} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s ease ${i * 0.12}s` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1A1A2E" }}>{task.label}</span>
              <span style={{ fontSize: "0.8rem", color: "#7B7B7B" }}>{task.manual} min → {task.auto} min</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ background: "#FEE2E2", borderRadius: 4, height: 14, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#DC2626", borderRadius: 4, width: visible ? `${(task.manual / maxMin) * 100}%` : "0%", transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s` }} />
              </div>
              <div style={{ background: "#DCFCE7", borderRadius: 4, height: 14, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#16A34A", borderRadius: 4, width: visible ? `${(task.auto / maxMin) * 100}%` : "0%", transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.12}s` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "#7B7B7B", fontStyle: "italic" }}>
        Manual total: 7 hrs/day in coordination. Automated: 45 min oversight.
      </p>
    </div>
  );
}

// ─── Graphic 2: 5-Stage Adoption Staircase ───────────────────────────────────

function AdoptionStaircase() {
  const { ref, visible } = useReveal();
  const stages = [
    { num: 1, name: "Assessment", desc: "Map friction points & ROI potential", color: "#283891" },
    { num: 2, name: "First Automation", desc: "Deploy highest-impact workflow", color: "#3B4FBF" },
    { num: 3, name: "Expand", desc: "Add 2–3 connected workflows", color: "#7E0F4A" },
    { num: 4, name: "Connect", desc: "Integrate tools into unified system", color: "#9B1A5C" },
    { num: 5, name: "Optimise", desc: "Monitor, measure & iterate", color: "#1A6B3C" },
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0", padding: "2rem", background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 16 }}>
      <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1A1A2E", marginBottom: "1.5rem" }}>The 5-Stage SMB AI Adoption Path</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {stages.map((stage, i) => (
          <div
            key={stage.num}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: `${i * 2}rem`,
              background: "#fff",
              border: `2px solid ${stage.color}`,
              borderRadius: 12,
              padding: "0.875rem 1.25rem",
              marginBottom: "0.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: `opacity 0.45s ease ${i * 0.15}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: stage.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", flexShrink: 0 }}>
              {stage.num}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: stage.color, fontSize: "0.95rem" }}>{stage.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#7B7B7B", marginTop: "0.1rem" }}>{stage.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Graphic 3: Automate vs Keep Human Grid ───────────────────────────────────

function AutomateVsHumanGrid() {
  const { ref, visible } = useReveal();
  const automate = [
    "Lead response & qualification",
    "Appointment booking & reminders",
    "Client intake & onboarding",
    "Document collection & chasing",
    "Invoice creation & reminders",
    "Follow-up sequences",
    "Internal handoffs & notifications",
    "Weekly reporting & summaries",
  ];
  const human = [
    "Professional judgement & advice",
    "Pricing & contract decisions",
    "Regulated professional decisions",
    "Handling complaints & exceptions",
    "Relationship-building conversations",
    "Final sign-off on deliverables",
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#F0FDF4", border: "2px solid #16A34A", borderRadius: 16, padding: "1.5rem" }}>
          <div style={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#16A34A", marginBottom: "1rem" }}>
            ✓ Automate These
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {automate.map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-15px)", transition: `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "#1A1A2E", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#EFF6FF", border: "2px solid #283891", borderRadius: 16, padding: "1.5rem" }}>
          <div style={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#283891", marginBottom: "1rem" }}>
            👤 Keep Human
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {human.map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(15px)", transition: `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#283891", flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "#1A1A2E", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AiAdoptionSmallBusiness() {
  useEffect(() => { document.title = "AI Adoption for Small Businesses: A Practical Guide | Barrana.ai"; }, []);

  const faqs = [
    { q: "How long does AI adoption take for a small business?", a: "Your first workflow takes 1–2 weeks to design, build, and test. A multi-workflow system takes 4–8 weeks. A full operational system covering 6+ workflows typically takes 2–3 months. Most clients see measurable ROI from the first workflow within 30 days." },
    { q: "Do I need to change my current software?", a: "No. We integrate with the tools you already use — your CRM, calendar, email, and accounting software. We connect them rather than replace them. If a critical tool is missing, we recommend adding it as part of the process." },
    { q: "Is this relevant for a solo operator?", a: "Yes — solo operators often see the highest impact. Every task that gets automated returns time directly to you, since there is no team to absorb the coordination overhead. Lead response and booking automation are the most valuable starting points for solo businesses." },
    { q: "What if I'm not sure what to automate?", a: "That is exactly what the free Automation Audit determines. In a 60-minute session, we map your current workflows, identify the highest-friction tasks, and recommend a Phase 1 that delivers measurable ROI within the first month." },
    { q: "Is my client data safe?", a: "All data stays within your controlled systems. We do not introduce third-party platforms that store your client information without your knowledge. Every data flow is documented, and all Canadian implementations follow PIPEDA guidelines." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "AI Adoption for Small Businesses: A Practical Guide",
        "author": { "@type": "Organization", "name": "Barrana.ai" },
        "datePublished": "2024-01-01",
        "publisher": { "@type": "Organization", "name": "Barrana.ai", "url": "https://barrana.ai" },
        "description": "AI adoption for a small business means systematically identifying repetitive operational tasks and automating them. Learn the 5-stage method, costs, and what to automate first.",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barrana.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Getting Started", "item": "https://barrana.ai/getting-started" },
          { "@type": "ListItem", "position": 3, "name": "AI Adoption for Small Businesses", "item": "https://barrana.ai/ai-adoption-small-business" },
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
            <span>Getting Started</span>
            <span>/</span>
            <span style={{ color: "#fff" }}>AI Adoption for Small Businesses</span>
          </nav>
          <div style={{ display: "inline-block", background: "#283891", color: "#fff", borderRadius: 24, padding: "0.3rem 0.875rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Getting Started
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 900, lineHeight: 1.15, maxWidth: 740, marginBottom: "1rem" }}>
            AI Adoption for Small Businesses: A Practical Guide
          </h1>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>15 min read</div>
        </div>
      </section>

      {/* ── Body ── */}
      <main style={{ background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.5rem" }}>

          {/* AEO Summary */}
          <SummaryBox>
            <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#283891", marginBottom: "0.625rem" }}>Quick Answer</div>
            <p style={{ color: "#1A1A2E", lineHeight: 1.75, margin: 0, fontSize: "0.9375rem" }}>
              AI adoption for a small business means systematically identifying repetitive operational tasks — lead response, booking, intake, document collection, invoicing, and reporting — and automating them using connected tools and AI logic. It is not about replacing people. It is about eliminating the coordination overhead that consumes 30–50% of a small team's time. The best starting point for most businesses is lead response automation, which can be implemented in 1–2 weeks and shows measurable ROI within the first month. Typical investment: $3,000–$15,000 CAD depending on scope.
            </p>
          </SummaryBox>

          {/* Who This Applies To */}
          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
            <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C2410C", marginBottom: "0.625rem" }}>Who This Applies To</div>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#1A1A2E", lineHeight: 1.8, fontSize: "0.9375rem" }}>
              <li>Small business owners with 2–50 staff in service industries</li>
              <li>Solo operators drowning in admin tasks</li>
              <li>Office managers looking for systematic operational solutions</li>
              <li>Business owners who know automation exists but are not sure where to start</li>
            </ul>
          </div>

          {/* Section 1 */}
          <SectionHeading>What AI Adoption Actually Means for a Small Business</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            AI adoption does not mean robots. For small and medium businesses, it means connecting the tools you already use so that routine workflows happen automatically. A client fills out a form — the system creates a CRM record, sends a confirmation email, requests their documents, and books a meeting slot, all within 90 seconds. No one typed anything. No one followed up manually. The work happened because triggers connected to actions.
          </p>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            The coordination overhead that currently consumes 30–50% of a small team's day — the chasing, the scheduling, the copy-pasting between systems — is exactly what automation eliminates. You are not replacing your team. You are removing the work that was never the best use of their time.
          </p>

          <ManualVsAutomatedDay />

          {/* Section 2 */}
          <SectionHeading>The Five Stages of SMB AI Adoption</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Most businesses attempt automation in the wrong order: they choose tools before mapping their workflows, or they try to automate everything at once. The five-stage approach below produces consistent, measurable results.
          </p>
          <ol style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Assessment.</strong> Map every client-facing and internal workflow. Identify where time is lost, where errors occur, and where ROI potential is highest. This is a 60–90 minute structured audit, not a vague discovery call.</li>
            <li><strong>First Automation.</strong> Deploy a single workflow — typically lead response — that solves the highest-friction point. Build it, test it, and prove the ROI before expanding.</li>
            <li><strong>Expand.</strong> Add 2–3 connected workflows (booking, intake, document collection). Each one compounds the previous — the system becomes more valuable as the workflows connect.</li>
            <li><strong>Connect.</strong> Integrate tools into a unified operational system. Data flows between your CRM, calendar, documents, and accounting without human intervention.</li>
            <li><strong>Optimise.</strong> Monitor performance, measure results, and iterate. This is where you move from "automation works" to "automation compounds."</li>
          </ol>

          <AdoptionStaircase />

          {/* Section 3 */}
          <SectionHeading>What Can Be Automated in a Small Business</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>Ranked by impact for most service businesses:</p>
          <ol style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Lead response</strong> — 90-second response to every inquiry, 24/7, with qualification and routing</li>
            <li><strong>Appointment booking and reminders</strong> — self-serve booking, confirmation, and reminder sequences</li>
            <li><strong>Client intake and onboarding</strong> — form delivery, CRM record creation, welcome sequences</li>
            <li><strong>Document collection</strong> — automated checklists with follow-up reminders every 48 hours</li>
            <li><strong>Invoicing</strong> — invoice creation triggered by job completion, with payment reminder sequences</li>
            <li><strong>Follow-up sequences</strong> — post-consultation, post-quote, post-delivery touch sequences</li>
            <li><strong>Internal handoffs</strong> — stage transition notifications, task assignments, team alerts</li>
            <li><strong>Reporting</strong> — weekly performance summaries delivered automatically to relevant team members</li>
          </ol>

          {/* Section 4 */}
          <SectionHeading>What Should Stay Human</SectionHeading>
          <AutomateVsHumanGrid />
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Automation handles volume and consistency. Humans handle judgement and relationships. The goal is not to remove humans from your business — it is to remove humans from the tasks that do not require a human. Professional advice, pricing decisions, regulated determinations, sensitive communications, and final sign-off on deliverables should always remain with a qualified person.
          </p>

          {/* Section 5 */}
          <SectionHeading>What It Costs</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
            {[
              { tier: "Single Workflow", price: "$1,500–$4,000 CAD", desc: "One end-to-end workflow (e.g. lead response)" },
              { tier: "Multi-Workflow", price: "$5,000–$12,000 CAD", desc: "2–4 connected workflows with integrations" },
              { tier: "Full System", price: "$10,000–$20,000 CAD", desc: "6+ workflows, full operational integration" },
              { tier: "Monthly Maintenance", price: "$200–$500 CAD/mo", desc: "Monitoring, updates, and iteration support" },
            ].map(t => (
              <div key={t.tier} style={{ background: "#F8FAFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7B7B7B", marginBottom: "0.5rem" }}>{t.tier}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#283891", marginBottom: "0.4rem" }}>{t.price}</div>
                <div style={{ fontSize: "0.8rem", color: "#7B7B7B" }}>{t.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Most businesses see ROI within 30–60 days of deploying their first workflow. A single workflow that saves 10 hours per week at $50/hour recovers its cost within the first month of operation.
          </p>

          {/* Section 6 */}
          <SectionHeading>Common Mistakes</SectionHeading>
          <ol style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Starting with a complex workflow.</strong> The first automation should be simple, fast, and high-impact. Lead response or appointment booking — not a multi-stage, exception-heavy process.</li>
            <li><strong>Automating everything at once.</strong> Attempting to automate 6 workflows simultaneously produces delays, confusion, and poor results. Phase your implementation.</li>
            <li><strong>Choosing tools before mapping workflows.</strong> "We bought Zapier — now what do we connect?" Tools are infrastructure. Map the workflow first, then select the tool that supports it.</li>
            <li><strong>Not testing with real data.</strong> Many automation failures happen because the system was built with hypothetical scenarios. Test every workflow with real client data before going live.</li>
            <li><strong>No monitoring or fallback paths.</strong> Every automated workflow needs error handling, retry logic, and a fallback path to a human. If the automation fails, someone needs to know.</li>
            <li><strong>Expecting zero maintenance.</strong> Automation requires monitoring and iteration. Tools update, business processes change, and edge cases emerge. Budget for ongoing support.</li>
          </ol>

          {/* Section 7 */}
          <SectionHeading>How Barrana Approaches AI Adoption</SectionHeading>
          <p style={{ color: "#4B5563", lineHeight: 1.8 }}>
            Every Barrana engagement follows a five-stage method:
          </p>
          <ol style={{ color: "#4B5563", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
            <li><strong>Free Automation Audit.</strong> 60 minutes. We map your workflows and identify the highest-ROI starting point with no cost or obligation.</li>
            <li><strong>Friction Map.</strong> A documented analysis of your current processes, including time cost, error rate, and automation potential for each workflow.</li>
            <li><strong>Fixed-Price Phase 1.</strong> We quote a fixed price for the first workflow before any work begins. No scope creep, no hourly billing surprises.</li>
            <li><strong>Build, Test, and Launch.</strong> Every system is tested with real data before going live. We do not launch until you are satisfied with the results.</li>
            <li><strong>Monitoring and Iteration.</strong> We monitor the system post-launch, catch errors early, and iterate as your workflows evolve.</li>
          </ol>

          {/* FAQ */}
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div style={{ marginBottom: "2.5rem" }}>
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          {/* CTA */}
          <div style={{ background: "#1A1A2E", borderRadius: 20, padding: "3rem 2rem", textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              Ready to eliminate the coordination overhead?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.75rem", maxWidth: 520, margin: "0 auto 1.75rem" }}>
              Start with the Automation Planner to get a personalised workflow recommendation — or book a free Automation Audit.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/automation-planner" style={{ background: "#7E0F4A", color: "#fff", borderRadius: 8, padding: "0.875rem 1.75rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                Start the Automation Planner
              </Link>
              <Link href="/contact" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 8, padding: "0.875rem 1.75rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                Book a Free Automation Audit
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7B7B7B", marginBottom: "1rem" }}>Related Resources</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { label: "What to Automate First", href: "/insights/what-to-automate-first" },
                { label: "Automation Readiness", href: "/insights/automation-readiness" },
                { label: "Build vs Buy", href: "/insights/build-vs-buy" },
                { label: "When AI Is Not the Answer", href: "/insights/when-ai-is-not-the-answer" },
                { label: "Lead Intake Workflow", href: "/workflows/lead-intake" },
                { label: "Client Onboarding Workflow", href: "/workflows/client-onboarding" },
                { label: "Automation Planner", href: "/automation-planner" },
                { label: "Lead Response Automation", href: "/services/lead-response-automation" },
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
