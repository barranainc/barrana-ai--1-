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

function BuildVsBuyTable() {
  const { ref, visible } = useReveal();
  const cols = [
    {
      name: "Off-the-Shelf",
      icon: "📦",
      cost: "$20–500/month",
      timeline: "Same day",
      flexibility: "Low",
      maintenance: "Vendor managed",
      bestFor: "Simple, standard tasks",
      highlight: false,
    },
    {
      name: "Hybrid / Connected",
      icon: "🔗",
      cost: "$3,000–12,000 once + $200–500/mo",
      timeline: "2–6 weeks",
      flexibility: "High",
      maintenance: "Shared",
      bestFor: "Multi-workflow service businesses",
      highlight: true,
    },
    {
      name: "Fully Custom",
      icon: "⚙️",
      cost: "$50,000+",
      timeline: "3–6 months",
      flexibility: "Maximum",
      maintenance: "Your team / agency",
      bestFor: "Enterprise / regulated",
      highlight: false,
    },
  ];

  const rows: { label: string; key: keyof typeof cols[0] }[] = [
    { label: "Cost", key: "cost" },
    { label: "Timeline", key: "timeline" },
    { label: "Flexibility", key: "flexibility" },
    { label: "Maintenance", key: "maintenance" },
    { label: "Best For", key: "bestFor" },
  ];

  return (
    <div ref={ref} style={{ margin: "2rem 0", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {cols.map((col) => (
          <div key={col.name} style={{ border: col.highlight ? "2px solid #283891" : "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", position: "relative" }}>
            {col.highlight && (
              <div style={{ background: "#283891", color: "#fff", textAlign: "center", padding: "0.4rem", fontSize: "0.78rem", fontWeight: 700 }}>
                Recommended for most service businesses
              </div>
            )}
            <div style={{ background: col.highlight ? "#F0F4FF" : "#F8F9FC", padding: "1.25rem", textAlign: "center", borderBottom: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>{col.icon}</div>
              <div style={{ fontWeight: 800, color: "#1A1A2E", fontSize: "0.95rem" }}>{col.name}</div>
            </div>
            <div>
              {rows.map((row) => (
                <div key={row.key} style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #F0F2F5" }}>
                  <div style={{ fontSize: "0.73rem", color: "#7B7B7B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>{row.label}</div>
                  <div style={{ fontSize: "0.88rem", color: "#1A1A2E", fontWeight: col.highlight ? 600 : 400 }}>{col[row.key] as string}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HybridArchitecture() {
  const { ref, visible } = useReveal();
  const tools = ["CRM", "Calendar", "Email", "Accounting"];
  return (
    <div ref={ref} style={{ background: "#F8F9FC", borderRadius: 16, padding: "2rem", margin: "2rem 0", opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <h3 style={{ textAlign: "center", fontWeight: 700, color: "#1A1A2E", marginBottom: "1.75rem", fontSize: "1rem" }}>
        How the Hybrid Approach Works
      </h3>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {tools.map((t) => (
            <div key={t} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: "0.5rem 0.85rem", fontSize: "0.82rem", fontWeight: 600, color: "#283891", textAlign: "center" }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
          <div style={{ color: "#7B7B7B", fontSize: "1.4rem" }}>→</div>
          <div style={{ fontSize: "0.7rem", color: "#7B7B7B" }}>connects to</div>
        </div>
        <div style={{ background: "#283891", color: "#fff", borderRadius: 12, padding: "1rem 1.25rem", textAlign: "center", minWidth: 120 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, opacity: 0.8, marginBottom: "0.25rem" }}>ORCHESTRATION</div>
          <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Make / Zapier</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
          <div style={{ color: "#7B7B7B", fontSize: "1.4rem" }}>→</div>
          <div style={{ fontSize: "0.7rem", color: "#7B7B7B" }}>applies</div>
        </div>
        <div style={{ background: "#7E0F4A", color: "#fff", borderRadius: 12, padding: "1rem 1.25rem", textAlign: "center", minWidth: 120 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, opacity: 0.8, marginBottom: "0.25rem" }}>CUSTOM</div>
          <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Logic Layer</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
          <div style={{ color: "#7B7B7B", fontSize: "1.4rem" }}>→</div>
          <div style={{ fontSize: "0.7rem", color: "#7B7B7B" }}>produces</div>
        </div>
        <div style={{ background: "#1A1A2E", color: "#fff", borderRadius: 12, padding: "1rem 1.25rem", textAlign: "center", minWidth: 120 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, opacity: 0.8, marginBottom: "0.25rem" }}>OUTPUTS</div>
          <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Your Workflows</div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#7B7B7B", fontSize: "0.82rem", marginTop: "1.25rem" }}>
        Existing tools. Custom logic. Connected intelligently.
      </p>
    </div>
  );
}

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Build vs Buy: Custom AI Automation vs Off-the-Shelf Tools",
  "description": "For most service businesses with 2-50 staff, the best approach is a hybrid: use off-the-shelf tools connected by a custom automation layer built on platforms like Make or Zapier.",
  "author": { "@type": "Organization", "name": "Barrana AI" },
  "publisher": { "@type": "Organization", "name": "Barrana AI" },
};

export default function BuildVsBuy() {
  useEffect(() => { document.title = "Build vs Buy: Custom AI Automation vs Off-the-Shelf Tools | Barrana AI"; }, []);

  return (
    <>
      <SEOHead title="Build vs Buy: Custom AI Automation vs Off-the-Shelf Tools | Barrana AI" description="For most service businesses with 2-50 staff, the best approach is a hybrid: use off-the-shelf tools connected by a custom automation layer built on platforms like Make or Zapier." type="article" />
      <JsonLd data={jsonLdData} />
      <main style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A2E" }}>
        <section style={{ ...surfaces.darkGradient, padding: spacing.sectionPadding + " 1.5rem " + spacing.sectionPaddingSm }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }}>Decision Guide</span>
              <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>9 min read</span>
            </div>
            <h1 style={{ ...typography.pageTitle, color: "#fff", marginBottom: "1.25rem" }}>
              Build vs Buy: Custom AI Automation vs Off-the-Shelf Tools
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              The honest guide to which approach fits your business — and why most service businesses end up in the middle.
            </p>
          </div>
        </section>

        <section style={{ padding: spacing.sectionPadding + " 1.5rem" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <SummaryBox>
              <strong style={{ color: "#283891", display: "block", marginBottom: "0.5rem" }}>Quick Answer</strong>
              <p style={{ margin: 0, color: "#1A1A2E", lineHeight: 1.7 }}>
                For most service businesses with 2–50 staff, the best approach is a <strong>hybrid</strong>: use off-the-shelf tools (CRM, calendar, accounting) connected by a custom automation layer built on platforms like Make or Zapier. Pure off-the-shelf cannot adapt to your workflows. Fully custom costs 5–10x more. The hybrid delivers custom results at off-the-shelf speed.
              </p>
            </SummaryBox>

            <SectionHeading>The Three Options</SectionHeading>

            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Off-the-Shelf</strong> means buying a standalone product designed to handle a specific task out of the box — a chatbot, a booking tool, an email marketing platform. You configure it but don't customise the underlying logic. It works well for generic, standard use cases and requires no technical expertise to deploy.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Hybrid / Connected</strong> means taking the off-the-shelf tools you already use (CRM, calendar, accounting, email) and building custom automation logic between them using a platform like Make or Zapier. The tools themselves are standard products, but the connections, conditions, and routing rules are built specifically for your workflows.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              <strong style={{ color: "#1A1A2E" }}>Fully Custom</strong> means commissioning bespoke software: custom code, custom AI models, custom integrations. Nothing is off-the-shelf. This offers maximum flexibility and is appropriate for organisations with proprietary data models, complex decision logic, or strict compliance requirements — but at significantly higher cost and timeline.
            </p>

            <BuildVsBuyTable />

            <SectionHeading>When Off-the-Shelf Works</SectionHeading>
            <ul style={{ color: "#7B7B7B", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
              <li>Your use case is simple and standard — generic booking, generic email sequences</li>
              <li>You only need one tool for one task and don't need it to connect with others</li>
              <li>Your volume is low (under 20 interactions per month)</li>
              <li>Your budget is under $500/month and you're not ready to invest upfront</li>
              <li>No integration with your existing tools is required</li>
            </ul>

            <SectionHeading>When the Hybrid Approach Wins</SectionHeading>
            <ul style={{ color: "#7B7B7B", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
              <li>Multiple tools need to talk to each other (CRM + calendar + email + accounting)</li>
              <li>Your workflows are specific to your business model or service type</li>
              <li>You need conditional logic — different actions depending on client type, service, or status</li>
              <li>Your budget is $3,000–$12,000 for implementation with $200–$500/month ongoing</li>
              <li>You want to avoid replacing tools you've already invested in</li>
            </ul>

            <HybridArchitecture />

            <SectionHeading>When to Build Fully Custom</SectionHeading>
            <ul style={{ color: "#7B7B7B", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
              <li>You have proprietary data models that off-the-shelf tools can't accommodate</li>
              <li>Your decision logic is complex enough that no platform can express it reliably</li>
              <li>You operate in a regulated industry with specific compliance requirements (e.g. AFSL, AHPRA)</li>
              <li>Your budget exceeds $50,000 and your timeline is 3–6 months</li>
              <li>You are an enterprise, not a service business — this path is rarely right for under 50 staff</li>
            </ul>

            <SectionHeading>The Real Cost of Each Option</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              Off-the-shelf tools appear cheapest upfront — $20–$500/month with no implementation cost. But the real cost is in the workarounds: manual steps you still have to do because the tool can't quite do what you need, or multiple tools that don't connect, or staff time spent compensating for the tool's limitations.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
              The hybrid approach has a moderate upfront investment ($3,000–$12,000) but low ongoing cost ($200–$500/month) and high ROI once built. The logic is custom to your business, which means fewer workarounds and more reliable operation.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Fully custom development carries a high upfront cost ($50,000+), moderate ongoing cost, and maximum flexibility. For service businesses, this is rarely justified — the hybrid approach delivers 90% of the value at 20% of the cost.
            </p>

            <SectionHeading>Common Build vs Buy Mistakes</SectionHeading>
            <ul style={{ color: "#7B7B7B", lineHeight: 1.9, paddingLeft: "1.25rem" }}>
              <li><strong style={{ color: "#1A1A2E" }}>Buying off-the-shelf because it's cheaper upfront</strong> — then paying more in staff time spent on workarounds over 12 months.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Thinking custom is the only way to get what they need</strong> — most service business requirements are achievable with the hybrid approach.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Not factoring in integration costs</strong> — a tool that can't connect to your CRM has hidden costs that emerge over time.</li>
              <li><strong style={{ color: "#1A1A2E" }}>Paying for a platform you barely use</strong> — buying enterprise software for a 5-person team wastes budget and creates complexity.</li>
            </ul>

            <SectionHeading>How Barrana Approaches This Decision</SectionHeading>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              We always start with your existing tools. Replacing software you already use is expensive and disruptive — and usually unnecessary. Our first step is understanding what you have and identifying which connections are missing.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              We build the logic connecting your existing tools — the conditions, routing rules, data mappings, and automation sequences that make your workflows run without manual intervention. This is the "custom" part: not the tools, but the intelligence between them.
            </p>
            <p style={{ color: "#7B7B7B", lineHeight: 1.8 }}>
              We only recommend a new platform if there is a genuine gap — something no existing tool can fill. And we never recommend enterprise software to a 5-person firm.
            </p>

            <ContextualCTA
              label="See the Hybrid Approach"
              description="Read how an accounting firm connected their existing tools with custom automation using"
              linkText="Workflow Automation"
              linkHref="/case-studies/accounting-firm-vaughan"
            />

            <SectionHeading>Frequently Asked Questions</SectionHeading>
            <div style={{ marginBottom: "2.5rem" }}>
              <FAQItem q="Do I need to replace my current software?" a="Almost never. The hybrid approach connects what you have. We only recommend new tools when there is a clear gap that existing tools cannot fill." />
              <FAQItem q="Is Make or Zapier the same thing?" a="Similar purpose, different strengths. Make is more flexible for complex multi-step workflows. Zapier is simpler for straightforward triggers. We recommend based on your specific needs." />
              <FAQItem q="What does 'custom' mean if you're using off-the-shelf tools?" a="The tools are off-the-shelf. The logic connecting them — the conditions, routing rules, data mappings, and sequences — is custom-built for your workflows." />
              <FAQItem q="Can we start off-the-shelf and move to hybrid later?" a="Yes. Many clients start with a simple tool, outgrow it, and we then build proper integrations. Starting simple is fine — it's a good way to validate the workflow before investing in automation." />
            </div>

            <div style={{ ...surfaces.darkGradient, borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.35rem", marginBottom: "0.75rem" }}>Not sure which approach fits?</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>The Automation Planner helps you map your needs and identify the right approach in minutes.</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/automation-planner"><a style={{ background: "#fff", color: "#283891", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>Start the Automation Planner</a></Link>
                <Link href="/contact"><a style={{ background: "transparent", color: "#fff", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a></Link>
              </div>
            </div>
            <RelatedResources pagePath="/insights/build-vs-buy" />
          </div>
        </section>
      </main>
    </>
  );
}
