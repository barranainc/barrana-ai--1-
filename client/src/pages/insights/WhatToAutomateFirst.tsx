import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
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

function PriorityPyramid() {
  const { ref, visible } = useReveal();
  const levels = [
    { label: "Lead Response", why: "Highest cost problem, fastest ROI", width: "100%", bg: "#283891" },
    { label: "Booking & Reminders", why: "35% no-show reduction", width: "82%", bg: "#2e409e" },
    { label: "Client Intake", why: "Eliminates 30 min of manual work per client", width: "64%", bg: "#3a4fb0" },
    { label: "Document Collection", why: "Stops the chase, saves 15 hrs/week", width: "46%", bg: "#7E0F4A" },
    { label: "Invoice Automation", why: "Faster payment, consistent follow-up", width: "28%", bg: "#a01260" },
  ];

  return (
    <div ref={ref} style={{ margin: "2.5rem 0", padding: "2rem", background: "#F8F9FC", borderRadius: 16 }}>
      <h3 style={{ textAlign: "center", fontWeight: 700, color: "#1A1A2E", marginBottom: "1.75rem", fontSize: "1.1rem" }}>
        Automation Priority Pyramid — Start at the Bottom
      </h3>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        {[...levels].reverse().map((level, i) => {
          const originalIndex = levels.length - 1 - i;
          const delay = (levels.length - 1 - originalIndex) * 150;
          return (
            <div
              key={level.label}
              style={{
                width: level.width,
                background: level.bg,
                borderRadius: 8,
                padding: "0.75rem 1.25rem",
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
              }}
            >
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{level.label}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", marginTop: "0.2rem" }}>Why: {level.why}</div>
            </div>
          );
        })}
      </div>
      <p style={{ textAlign: "center", color: "#7B7B7B", fontSize: "0.8rem", marginTop: "1rem" }}>
        Start at the base — Lead Response delivers the fastest measurable ROI
      </p>
    </div>
  );
}

const industryRows = [
  { industry: "Accounting", rec: "Document Collection", why: "Tax deadline pressure makes chase elimination urgent" },
  { industry: "Immigration", rec: "Lead Response", why: "High competition and urgent timelines require speed" },
  { industry: "Law", rec: "Matter Intake", why: "Prevents double-entry and ensures no files are lost" },
  { industry: "Clinics", rec: "Booking + Reminders", why: "No-shows represent direct, measurable revenue loss" },
  { industry: "Contractors", rec: "Lead Response", why: "After-hours enquiry volume is highest in this sector" },
  { industry: "Agencies", rec: "Client Onboarding", why: "Scale requires consistency in the first impression" },
];

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Should a Small Business Automate First?",
  "description": "The best first automation for most small businesses is lead response — responding within 90 seconds, qualifying prospects, creating CRM records, and booking consultations.",
  "author": { "@type": "Organization", "name": "Barrana AI" },
  "publisher": { "@type": "Organization", "name": "Barrana AI" },
};

export default function WhatToAutomateFirst() {
  useEffect(() => { document.title = "What Should a Small Business Automate First? | Barrana AI"; }, []);
  const tableReveal = useReveal();

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A2E" }}>
        <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 1.5rem " + spacing.sectionPaddingSm }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }}>Decision Guide</span>
              <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>8 min read</span>
            </div>
            <h1 style={{ ...typography.pageTitle, color: "#fff", marginBottom: "1.25rem" }}>
              What Should a Small Business Automate First?
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              The highest-ROI first automation for most service businesses — and how to choose the right starting point for yours.
            </p>
          </div>
        </section>

        <section style={{ padding: spacing.sectionPadding + " 1.5rem" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <SummaryBox>
              <strong style={{ color: "#283891", display: "block", marginBottom: "0.5rem" }}>Quick Answer</strong>
              <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.7 }}>
                The best first automation for most small businesses is <strong>lead response</strong> — responding to every enquiry within 90 seconds, qualifying the prospect, creating a CRM record, and booking a consultation. It addresses the highest-cost problem (lost leads from slow response), requires the lowest complexity (1–2 week implementation), and delivers measurable ROI within the first month.
              </p>
            </SummaryBox>

            <SectionHeading>Why the First Automation Decision Matters Most</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              You are more likely to stall on automation entirely if your first project fails. A bad first experience creates scepticism that delays every subsequent initiative — often by months or years. This is why the selection of the first automation deserves careful thought, not just enthusiasm.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              The first automation must meet three criteria: (a) <strong>high-ROI</strong> so you feel the impact quickly and can justify the effort, (b) <strong>low-complexity</strong> so implementation doesn't drag out and lose momentum, and (c) <strong>measurable</strong> so you can prove to yourself and your team that it worked.
            </p>

            <SectionHeading>The 5 Highest-ROI Starting Points (Ranked)</SectionHeading>

            {[
              {
                rank: 1, title: "Lead Response Automation",
                desc: "Automatically acknowledges every inbound enquiry within 90 seconds, qualifies the prospect with 2–3 questions, creates a CRM record, and offers a booking link. This is ranked first because slow response is the single highest-cost problem in most service businesses — measurable, immediate, and directly tied to revenue.",
                time: "1–2 weeks", result: "2–4x increase in contact rate"
              },
              {
                rank: 2, title: "Appointment Booking + Reminders",
                desc: "Replaces manual back-and-forth scheduling with a calendar link and automated confirmation and reminder sequence. The ROI comes from two sources: staff time saved on scheduling, and a 30–40% reduction in no-shows from the reminder sequence alone.",
                time: "1 week", result: "30–40% no-show reduction"
              },
              {
                rank: 3, title: "Client Intake Automation",
                desc: "Replaces manual intake forms, copy-pasting, and follow-up chasers with a structured digital intake that populates your CRM and triggers the next workflow step automatically. Eliminates approximately 30 minutes of manual admin per new client.",
                time: "1–2 weeks", result: "30 min saved per client"
              },
              {
                rank: 4, title: "Document Collection",
                desc: "Automates the request, reminder, and receipt of client documents — eliminating the back-and-forth chase that costs professional service firms hours per client per week. Especially high-value in accounting, immigration, and law.",
                time: "2–3 weeks", result: "10–15 hrs/week saved"
              },
              {
                rank: 5, title: "Invoice Automation",
                desc: "Triggers invoice creation and sending automatically on job completion or milestone, then follows up with payment reminders on a defined schedule. Reduces days-to-pay and eliminates the awkward manual follow-up call.",
                time: "1–2 weeks", result: "20–40% faster payment"
              },
            ].map((item) => (
              <div key={item.rank} style={{ background: "#F8F9FC", borderRadius: 12, padding: "1.5rem", marginBottom: "1.25rem", borderLeft: `4px solid ${item.rank === 1 ? "#283891" : "#E2E8F0"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ background: item.rank === 1 ? "#283891" : "#7B7B7B", color: "#fff", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>{item.rank}</span>
                  <strong style={{ color: "#1A1A2E", fontSize: "1rem" }}>{item.title}</strong>
                </div>
                <p style={{ color: "#7B7B7B", lineHeight: 1.7, margin: "0 0 0.75rem" }}>{item.desc}</p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.82rem", color: "#283891", fontWeight: 600 }}>Implementation: {item.time}</span>
                  <span style={{ fontSize: "0.82rem", color: "#7E0F4A", fontWeight: 600 }}>Typical result: {item.result}</span>
                </div>
              </div>
            ))}

            <SectionHeading>Why Lead Response Wins as the First Automation</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              The cost of slow lead response is immediate and measurable. Research consistently shows: contact rate at 5 minutes is 78%. At 30 minutes, it drops to 26%. At 1 hour, it falls to 12%. Every hour of delay costs you real conversions with prospects who have already moved on to a competitor.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", margin: "1.5rem 0 2rem" }}>
              {[
                { time: "5 min", rate: "78%", color: "#22c55e" },
                { time: "30 min", rate: "26%", color: "#f59e0b" },
                { time: "1 hour", rate: "12%", color: "#ef4444" },
              ].map((stat) => (
                <div key={stat.time} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: stat.color }}>{stat.rate}</div>
                  <div style={{ color: "#1A1A2E", fontWeight: 600, fontSize: "0.9rem" }}>Contact rate</div>
                  <div style={{ color: "#7B7B7B", fontSize: "0.82rem" }}>at {stat.time} response</div>
                </div>
              ))}
            </div>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              Most service businesses have at least 5–10 missed or delayed leads per month — each worth $500–$5,000+. A single additional conversion per month from faster response often pays for the entire automation system in month one.
            </p>

            <PriorityPyramid />

            <SectionHeading>Lead Response: Before and After</SectionHeading>
            <BeforeAfterSection metrics={[
              { label: "Response Time", before: "4-8 hours", after: "90 seconds", beforeW: 90, afterW: 5 },
              { label: "Lost Leads / Month", before: "8-12", after: "1-2", beforeW: 80, afterW: 15 },
              { label: "Follow-Up Rate", before: "40%", after: "100%", beforeW: 40, afterW: 100 },
              { label: "After-Hours Capture", before: "0%", after: "100%", beforeW: 5, afterW: 100 },
            ]} />

            <SectionHeading>Industry-Specific Starting Points</SectionHeading>
            <div ref={tableReveal.ref} style={{ overflowX: "auto", marginBottom: "2rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", opacity: tableReveal.visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
                <thead>
                  <tr style={{ background: "#283891", color: "#fff" }}>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.9rem" }}>Industry</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.9rem" }}>Recommended First</th>
                    <th style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.9rem" }}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {industryRows.map((row, i) => (
                    <tr key={row.industry} style={{ background: i % 2 === 0 ? "#fff" : "#F8F9FC" }}>
                      <td style={{ padding: "0.85rem 1rem", fontWeight: 600, color: "#1A1A2E", fontSize: "0.9rem", borderBottom: "1px solid #E2E8F0" }}>{row.industry}</td>
                      <td style={{ padding: "0.85rem 1rem", color: "#283891", fontWeight: 600, fontSize: "0.9rem", borderBottom: "1px solid #E2E8F0" }}>{row.rec}</td>
                      <td style={{ padding: "0.85rem 1rem", color: "#7B7B7B", fontSize: "0.88rem", borderBottom: "1px solid #E2E8F0" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionHeading>The Phased Approach: Do Not Automate Everything At Once</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              The most common mistake business owners make is trying to automate everything simultaneously. Phase 1 should be a single workflow — implemented, tested, and measured. Only once it is running reliably should you expand.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { phase: "Phase 1", desc: "One workflow. Proven. Measured. 2–4 weeks.", color: "#283891" },
                { phase: "Phase 2", desc: "2–3 more workflows added once Phase 1 is solid.", color: "#2e409e" },
                { phase: "Phase 3", desc: "Connect the workflows into a unified system.", color: "#7E0F4A" },
              ].map((p) => (
                <div key={p.phase} style={{ borderLeft: `4px solid ${p.color}`, background: "#F8F9FC", borderRadius: "0 12px 12px 0", padding: "1.25rem" }}>
                  <div style={{ fontWeight: 700, color: p.color, marginBottom: "0.4rem" }}>{p.phase}</div>
                  <p style={{ color: "#7B7B7B", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              Rushing to Phase 3 before Phase 1 is solid creates fragile systems that fail at the worst moments and erode trust in automation entirely.
            </p>

            <SectionHeading>Common Mistakes When Choosing What to Automate</SectionHeading>
            <ul style={{ color: "#7B7B7B", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
              <li><strong style={{ color: "#1A1A2E" }}>Starting with the most complex workflow</strong> — complexity means longer timelines and more failure points, exactly what you don't want from a first project.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Choosing based on what's technically possible rather than ROI</strong> — impressive demos don't equal business value. Start where the money is.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Skipping measurement</strong> — if you don't define success metrics before you build, you'll never know if it worked.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Trying to automate a broken manual process</strong> — automation amplifies whatever the process does, including its flaws. Fix the process first.</li>
            </ul>

            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem q="Can I automate two things at once for Phase 1?" a="We recommend starting with one workflow and measuring results before adding the second. Two simultaneous implementations often lead to scope creep and delayed results." />
              <FAQItem q="What if my most urgent problem isn't in the top 5?" a="Map your workflows first. Urgency and ROI aren't always the same thing. The Automation Audit helps you prioritise objectively." />
              <FAQItem q="How long before I see ROI from lead response automation?" a="Typically within the first month. If you're converting even one additional lead per month that you were previously losing to slow response, the system pays for itself." />
              <FAQItem q="Does industry matter for this ranking?" a="Yes. The rankings above apply to most service businesses, but the Industry-Specific section shows exceptions by sector." />
            </div>

            <div style={{ ...surfaces.darkGradient, borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.35rem", marginBottom: "0.75rem" }}>Ready to find your starting point?</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>The Automation Planner identifies your highest-ROI first automation in under 5 minutes.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/automation-planner"><a style={{ background: "#fff", color: "#283891", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>Start the Automation Planner</a></Link>
                <Link href="/contact"><a style={{ background: "transparent", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book Free Audit</a></Link>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.5rem" }}>
              <p style={{ color: "#7B7B7B", fontSize: "0.85rem", marginBottom: "0.75rem", fontWeight: 600 }}>Related reading</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {[
                  { href: "/ai-adoption-small-business", label: "AI Adoption for Small Business" },
                  { href: "/insights/automation-readiness", label: "Automation Readiness" },
                  { href: "/workflows/lead-intake", label: "Lead Intake Workflow" },
                  { href: "/services/lead-response-automation", label: "Lead Response Automation" },
                ].map((link) => (
                  <Link key={link.href} href={link.href}><a style={{ color: "#283891", fontSize: "0.88rem", textDecoration: "underline" }}>{link.label}</a></Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
