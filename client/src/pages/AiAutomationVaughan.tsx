/**
 * AiAutomationVaughan.tsx
 * Local SEO page: "AI Automation for Small Businesses in Vaughan and the GTA"
 * Route: /ai-automation-vaughan
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";

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

// ─── Graphic 1: GTA Service Area Visual ───────────────────────────────────────

function GTAServiceArea() {
  const { ref, visible } = useReveal();
  const cities = [
    { name: "Vaughan", note: "HQ", highlight: true },
    { name: "Toronto", note: "" },
    { name: "Markham", note: "" },
    { name: "Richmond Hill", note: "" },
    { name: "Mississauga", note: "" },
    { name: "North York", note: "" },
    { name: "Brampton", note: "" },
    { name: "Oakville", note: "" },
    { name: "Burlington", note: "" },
    { name: "Hamilton", note: "" },
  ];

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
        GTA Service Area
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: "0.75rem",
      }}>
        {cities.map((city, i) => (
          <div
            key={i}
            style={{
              background: city.highlight ? "#283891" : "#EEF2FF",
              color: city.highlight ? "#fff" : "#283891",
              borderRadius: "10px",
              padding: "0.7rem 1rem",
              textAlign: "center",
              fontWeight: city.highlight ? 800 : 600,
              fontSize: "0.875rem",
              border: city.highlight ? "none" : "1px solid #C7D2FE",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.9)",
              transition: `opacity 0.35s ease ${i * 0.06}s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s`,
              position: "relative",
            }}
          >
            {city.name}
            {city.note && (
              <span style={{
                display: "block",
                fontSize: "0.65rem",
                fontWeight: 700,
                marginTop: "2px",
                background: "#7E0F4A",
                color: "#fff",
                borderRadius: "4px",
                padding: "1px 6px",
                letterSpacing: "0.05em",
                width: "fit-content",
                margin: "4px auto 0",
              }}>
                {city.note}
              </span>
            )}
          </div>
        ))}
      </div>
      <p style={{
        fontSize: "0.8125rem",
        color: "#7B7B7B",
        marginTop: "1.25rem",
        textAlign: "center",
        fontStyle: "italic",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease 0.7s",
      }}>
        Remote service available across all of Ontario
      </p>
    </div>
  );
}

// ─── Graphic 2: Engagement Timeline ───────────────────────────────────────────

const timelineSteps = [
  { label: "Week 1", title: "Audit", desc: "60-min free audit. Map workflows, identify friction points, define starting opportunity." },
  { label: "Week 2", title: "Map + Propose", desc: "Workflow diagrams, integration plan, fixed-price proposal. No surprises." },
  { label: "Weeks 3–4", title: "Phase 1 Build", desc: "First workflow built, integrated, and tested in your actual environment." },
  { label: "Week 5", title: "Test + Train", desc: "Live testing with real data. Team training on approvals and oversight." },
  { label: "Week 6+", title: "Monitor + Expand", desc: "Ongoing monitoring. Review performance. Add Phase 2 workflows when ready." },
];

function EngagementTimeline() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "2rem 1.75rem",
        margin: "2rem 0",
        overflowX: "auto",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#7B7B7B", marginBottom: "2rem" }}>
        What a Typical Engagement Looks Like
      </div>
      <div style={{ minWidth: "480px" }}>
        {/* Progress line */}
        <div style={{ position: "relative", height: "4px", background: "#E2E8F0", borderRadius: "2px", marginBottom: "0", margin: "0 0 0 0" }}>
          <div style={{
            position: "absolute", left: 0, top: 0,
            height: "100%", background: "linear-gradient(90deg, #283891, #7E0F4A)",
            borderRadius: "2px",
            width: visible ? "100%" : "0%",
            transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }} />
          {/* Milestone dots */}
          {timelineSteps.map((_, i) => {
            const leftPct = i === 0 ? 0 : i === timelineSteps.length - 1 ? 100 : (i / (timelineSteps.length - 1)) * 100;
            return (
              <div key={i} style={{
                position: "absolute",
                left: `${leftPct}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "14px", height: "14px",
                background: i === 0 ? "#283891" : i === timelineSteps.length - 1 ? "#7E0F4A" : "#fff",
                border: `2.5px solid ${i === timelineSteps.length - 1 ? "#7E0F4A" : "#283891"}`,
                borderRadius: "50%",
                zIndex: 2,
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.15 + 0.4}s`,
              }} />
            );
          })}
        </div>
        {/* Step cards below */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          {timelineSteps.map((step, i) => (
            <div key={i} style={{
              flex: 1,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease ${i * 0.12 + 0.3}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.12 + 0.3}s`,
            }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#7B7B7B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{step.label}</div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#283891", marginBottom: "0.35rem" }}>{step.title}</div>
              <div style={{ fontSize: "0.75rem", color: "#374151", lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AiAutomationVaughan() {
  useEffect(() => {
    document.title = "AI Automation for Small Businesses in Vaughan and the GTA | Barrana AI";
  }, []);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ background: "#1A1A2E", padding: "3.5rem 0 3rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <nav style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/services" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Services</Link>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Vaughan & GTA</span>
          </nav>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: "999px", padding: "0.3rem 0.85rem" }}>
              Local Services
            </span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)" }}>⏱ 8 min read</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.875rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: 0 }}>
            AI Automation for Small Businesses in Vaughan and the GTA
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem", marginTop: "1rem", marginBottom: 0 }}>
            50 Corstate Avenue, Unit 01 — Vaughan, ON L4K 4X2
          </p>
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
                Barrana.ai provides AI automation services for small businesses in Vaughan and the Greater Toronto Area. Based at 50 Corstate Avenue, Unit 01, Vaughan, ON L4K 4X2, Barrana serves businesses with 2–50 staff across professional services, healthcare, trades, and agencies. Services include lead response automation, AI receptionists, client intake, document collection, invoicing, and workflow automation. All implementations are PIPEDA-aware, use fixed pricing, and integrate with existing tools. Free 60-minute Automation Audit available.
              </p>
            </SummaryBox>

            {/* Who This Applies To */}
            <div style={{ background: "#F1F5F9", borderRadius: "12px", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
              <p style={{ fontWeight: 800, color: "#1A1A2E", marginBottom: "0.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>Who This Applies To</p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.9375rem", color: "#374151", lineHeight: 1.9 }}>
                <li>Small business owners in Vaughan, the GTA, and across Ontario with 2–50 staff</li>
                <li>Professional services firms, clinics, contractors, real estate teams, and agencies</li>
                <li>Businesses looking for a local automation partner with fixed pricing and no hourly billing</li>
              </ul>
            </div>

            {/* Section 1 */}
            <SectionHeading>Why Vaughan Businesses Are Adopting AI Automation</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              The Greater Toronto Area has one of Canada's highest concentrations of small professional services firms. Vaughan alone is home to thousands of independent accounting practices, immigration consultancies, law firms, medical clinics, and trades businesses — many of them founded and run by first- and second-generation Canadians who built their practices through service quality and hard work.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              Competition in the GTA is fierce. A client in Woodbridge searching for an immigration consultant will find a dozen options within five kilometres. In this environment, response time and client experience are the differentiators that determine which firms grow and which plateau. The firm that responds to an inquiry in 60 seconds — at 11pm on a Tuesday — wins the consultation over the firm that responds at 9am the next morning.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              AI automation directly addresses this competitive dynamic. Barrana.ai builds systems that respond instantly, stay organised, and keep professionals focused on the work that builds their reputation — rather than the administrative overhead that consumes it.
            </p>

            {/* Section 2 — Industries Grid */}
            <SectionHeading>Industries We Serve in the GTA</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              We work with small businesses across eight industry categories in the GTA. Each has distinct workflow patterns and compliance requirements that shape how we design automation.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              {[
                { emoji: "📊", name: "Accounting Firms", href: "/industries/accounting-firms" },
                { emoji: "🛂", name: "Immigration Consultants", href: "/industries/immigration-consultants" },
                { emoji: "⚖️", name: "Law Firms", href: "/industries/law-firms" },
                { emoji: "🏥", name: "Medical Clinics", href: "/industries/medical-clinics" },
                { emoji: "🏠", name: "Contractors", href: "/industries/contractors" },
                { emoji: "🏡", name: "Real Estate Teams", href: "/industries/real-estate-teams" },
                { emoji: "📱", name: "Marketing Agencies", href: "/industries/marketing-agencies" },
                { emoji: "🎓", name: "Tutoring & Education", href: "/industries/tutoring-education" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    background: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "10px",
                    padding: "0.85rem 1rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#1A1A2E",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#283891";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 12px rgba(40,56,145,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{item.emoji}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Section 3 */}
            <SectionHeading>Our Approach: Operator-First, Practical, Phased</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              We start every engagement with a free 60-minute Automation Audit. This is not a sales call. We map your actual workflows, identify where time is lost, and show you exactly what is automatable and what should stay manual. You leave with a clear picture of your automation opportunity regardless of whether we work together.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              All work is quoted at a fixed price before any build begins. No hourly billing, no scope creep invoicing, no surprises. We work with the tools you already use — your CRM, your email system, your practice management software — so you do not need to change your stack or learn a new platform.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              Implementations are phased. Phase 1 targets the single highest-value workflow in your business. Once that is working and delivering results, we map Phase 2. This approach keeps investment manageable and ensures you see ROI before committing to further build.
            </p>

            {/* Section 4 — Engagement Timeline */}
            <SectionHeading>What a Typical Engagement Looks Like</SectionHeading>
            <EngagementTimeline />

            {/* Section 5 */}
            <SectionHeading>PIPEDA and Canadian Privacy Considerations</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              All automation systems we build for Canadian businesses are designed with PIPEDA compliance in mind. This means every data flow is documented, consent mechanisms are built into intake forms where required, and data is stored in Canadian-hosted systems or approved jurisdictions by default.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1rem" }}>
              We do not connect client data to third-party services that fall outside PIPEDA's requirements without explicit review. For regulated industries — immigration, law, healthcare — we apply additional care to ensure that automated communications and data handling align with the professional conduct standards of the relevant regulatory bodies.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7 }}>
              Every engagement includes a data flow document: a complete map of what data moves, where it goes, how long it is retained, and who has access. This document is yours to keep and forms the basis of your compliance record.
            </p>

            {/* Section 6 — Service Areas */}
            <SectionHeading>Service Areas</SectionHeading>
            <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Our office is located in Vaughan. We serve businesses across the GTA and work remotely with businesses throughout Ontario.
            </p>
            <GTAServiceArea />

            {/* FAQ */}
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem
                q="Do you only serve businesses in Vaughan?"
                a="No. We serve businesses across the GTA and work remotely with businesses throughout Ontario. Our office is in Vaughan, but most implementation work is done remotely and does not require in-person meetings."
              />
              <FAQItem
                q="Is there a minimum contract size?"
                a="Our smallest engagement is a single-workflow automation starting at approximately $1,500 CAD. Most clients start with a Phase 1 package at $3,000–$5,000, which includes scoping, build, testing, and team training."
              />
              <FAQItem
                q="How long does an engagement take?"
                a="Phase 1 typically takes 2–4 weeks from audit to go-live. A full multi-workflow system takes 6–10 weeks. Timelines depend on integration complexity and client responsiveness during testing."
              />
              <FAQItem
                q="Do you offer support after implementation?"
                a="Yes. Monthly monitoring and maintenance plans start from $200/month. These cover platform licensing oversight, error monitoring, and minor workflow adjustments as your business evolves."
              />
              <FAQItem
                q="Is the initial audit really free?"
                a="Yes. The 60-minute Automation Audit is completely free with no obligation. We map your workflows and tell you exactly what to automate and in what order. You can use this information with any provider, or with us."
              />
            </div>

            {/* CTA */}
            <div style={{ background: "#1A1A2E", borderRadius: "20px", padding: "3rem 2.5rem", textAlign: "center", marginTop: "3rem" }}>
              <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
                Book Your Free Audit in Vaughan
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: "0.5rem", lineHeight: 1.6, maxWidth: "540px", margin: "0 auto 0.5rem" }}>
                60 minutes. No obligation. We'll map your workflows and tell you exactly what to automate and in what order.
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
                50 Corstate Avenue, Unit 01 — Vaughan, ON L4K 4X2
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" style={{ background: "#7E0F4A", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "0.85rem 1.75rem", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
                  Book Free Audit in Vaughan →
                </Link>
                <Link href="/services" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "0.85rem 1.75rem", borderRadius: "10px", textDecoration: "none", display: "inline-block", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  See Our Services
                </Link>
              </div>
            </div>

            {/* Related Links */}
            <div style={{ marginTop: "3rem" }}>
              <p style={{ fontWeight: 800, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "#7B7B7B", marginBottom: "1rem" }}>Related Pages</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {[
                  { label: "Our Services", href: "/services" },
                  { label: "Industries We Serve", href: "/industries" },
                  { label: "AI Adoption for Small Business", href: "/ai-adoption-small-business" },
                  { label: "Automation Planner", href: "/automation-planner" },
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
        "@type": "LocalBusiness",
        "name": "Barrana.ai",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "50 Corstate Avenue, Unit 01",
          "addressLocality": "Vaughan",
          "addressRegion": "ON",
          "postalCode": "L4K 4X2",
          "addressCountry": "CA"
        },
        "telephone": "+1-905-555-0000",
        "url": "https://barrana.ai",
        "description": "AI automation services for small businesses in Vaughan and the Greater Toronto Area.",
        "areaServed": ["Vaughan", "Toronto", "Markham", "Richmond Hill", "Mississauga", "North York", "Brampton", "Oakville", "Burlington", "Hamilton"],
        "serviceType": ["AI Automation", "Lead Response Automation", "Client Intake Automation", "Workflow Automation"]
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Do you only serve businesses in Vaughan?", "acceptedAnswer": { "@type": "Answer", "text": "No. We serve businesses across the GTA and work remotely with businesses throughout Ontario." } },
          { "@type": "Question", "name": "Is the initial audit really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The 60-minute Automation Audit is completely free with no obligation." } },
          { "@type": "Question", "name": "How long does an engagement take?", "acceptedAnswer": { "@type": "Answer", "text": "Phase 1 typically takes 2–4 weeks from audit to go-live. A full multi-workflow system takes 6–10 weeks." } }
        ]
      }} />
    </div>
  );
}
