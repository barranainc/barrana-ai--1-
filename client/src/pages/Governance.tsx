import { Link } from "wouter";
export default function Governance() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>AI Governance</span></div>
          <div className="max-w-3xl">
            <div className="eyebrow">AI Governance</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>AI Governance for Small Business: A Practical Framework</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>How Barrana.ai approaches AI governance for small business clients in Canada. Covers PIPEDA compliance, data sovereignty, human oversight, and responsible automation design.</p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl space-y-10">
            <div className="aeo-block">
              <div className="aeo-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Our Governance Approach</div>
              <p>Barrana.ai builds automation systems with four governance principles: PIPEDA compliance, data sovereignty, human oversight, and transparent operation. Every system we build is documented, auditable, and designed to keep humans in control of substantive decisions.</p>
            </div>
            {[
              { title: "PIPEDA Compliance", body: "All automation systems we build are designed with PIPEDA (Personal Information Protection and Electronic Documents Act) compliance in mind. We document data flows, ensure personal information is collected only for stated purposes, and build data retention and deletion logic into every system that handles client personal information." },
              { title: "Data Sovereignty", body: "We build automation that connects the tools you own and control. We do not route client data through Barrana-owned systems. Every data flow is documented and disclosed. Client data stays within the platforms you already use and trust — typically Canadian-compliant infrastructure." },
              { title: "Human Oversight by Design", body: "Automation systems should handle coordination and communication — not professional judgment. Every system we build includes escalation logic that routes to a human when the situation requires professional expertise, legal judgment, or complex decision-making. Automated systems never make substantive professional decisions without human oversight." },
              { title: "Transparent Operation", body: "Every automation system we build is fully documented. You receive a system map showing every trigger, action, and data flow. You have complete visibility into what the system does, when it does it, and why. There are no black boxes." },
              { title: "Access and Credential Management", body: "We configure minimum-required access during the build phase. All credentials and API keys are transferred to you at project completion. We do not retain access to your systems after project completion unless you engage us for ongoing maintenance." },
              { title: "Audit Trail", body: "Automation platforms like Make and n8n maintain execution logs for every automation run. You can see exactly what happened, when, and with what data. This audit trail is important for both operational troubleshooting and compliance documentation." },
            ].map((section) => (
              <div key={section.title} className="p-6 rounded-2xl border" style={{ borderColor: "rgba(26,82,118,0.1)", backgroundColor: "#F7F9FC" }}>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#283891" }}>{section.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{section.body}</p>
              </div>
            ))}
            <div className="p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
              <h3 className="text-xl font-bold text-white mb-3">Questions About Governance?</h3>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free Automation Audit and we will walk through our governance approach for your specific business context.</p>
              <Link href="/contact" className="btn-primary">Book Free Audit</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
