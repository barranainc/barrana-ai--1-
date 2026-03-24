import { Link } from "wouter";
import ControlLayerCard from "@/components/service/ControlLayerCard";
import { colors, spacing, typography, surfaces } from "@/styles/design-tokens";

const NAVY = colors.navy;
const BURGUNDY = colors.magenta;
const DARK = colors.textPrimary;

const controlLayerItems = [
  {
    title: "Stop-Loss",
    desc: "If AI confidence drops below threshold, escalate to human immediately rather than continue automated response.",
  },
  {
    title: "Retry Logic",
    desc: "Failed CRM writes retry 3 times with exponential backoff. If all fail, staff receive immediate alert with the data.",
  },
  {
    title: "Approval Gates",
    desc: "High-value leads and sensitive actions require explicit human approval before execution.",
  },
  {
    title: "Audit Logging",
    desc: "Every automated action is logged with timestamp, trigger, outcome, and data changed.",
  },
  {
    title: "Human Escalation",
    desc: "Every automation has a defined path to a human operator. Nothing fails silently.",
  },
];

const pipedaPrinciples = [
  {
    title: "Data Minimisation",
    desc: "We collect and process only the personal information strictly required for the stated business purpose. No surplus data is captured, stored, or passed to third-party systems.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="17" stroke={NAVY} strokeWidth="2" fill="rgba(40,56,145,0.07)" />
        <path d="M11 18h14M18 11v14" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="4" fill="rgba(40,56,145,0.15)" stroke={NAVY} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Consent Flows",
    desc: "Automated workflows are designed to respect how clients have consented to be contacted and how their data may be used — and to stop when consent boundaries are reached.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="17" stroke={NAVY} strokeWidth="2" fill="rgba(40,56,145,0.07)" />
        <path d="M11 18l5 5 9-10" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Access Controls",
    desc: "Automation systems are granted minimum-required access only. Credentials are scoped to the tasks they perform and transferred to your ownership at project close.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="17" stroke={NAVY} strokeWidth="2" fill="rgba(40,56,145,0.07)" />
        <rect x="12" y="18" width="12" height="9" rx="2" stroke={NAVY} strokeWidth="2" />
        <path d="M14 18v-3a4 4 0 018 0v3" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const securityPrinciples = [
  "We never route your client data through Barrana-owned servers. Data flows directly between tools your business controls.",
  "All credentials and API keys are scoped to the minimum access required and transferred to your ownership at project completion.",
  "Automation platforms we use (Make, n8n) maintain full execution logs. Every run is traceable.",
  "We build systems that fail safely: if an automation step fails, it alerts a human rather than silently dropping data.",
];

export default function Governance() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        style={{
          ...surfaces.darkGradient,
          paddingTop: spacing.sectionPadding,
          paddingBottom: spacing.sectionPaddingSm,
        }}
      >
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)" }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Governance</span>
          </div>
          <div className="max-w-3xl">
            <div
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: BURGUNDY,
                background: "rgba(126,15,74,0.15)",
                borderRadius: "9999px",
                padding: "0.3rem 0.9rem",
                marginBottom: "1.25rem",
                border: `1px solid rgba(126,15,74,0.35)`,
              }}
            >
              Data Governance
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              Data Governance &amp; PIPEDA-Aware Automation
            </h1>
            <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: "620px" }}>
              We build automation systems with Canadian privacy law in mind. Every workflow we design is
              documented, auditable, and structured so your clients' data stays within platforms you control.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — How We Handle Your Data */}
      <section style={{ paddingTop: spacing.sectionPadding, paddingBottom: spacing.sectionPadding, background: "white" }}>
        <div className="container">
          <div style={{ maxWidth: "780px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: DARK, marginBottom: "1.25rem" }}>
              How We Handle Your Data
            </h2>
            <p style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.75, marginBottom: "1rem" }}>
              When Barrana.ai builds automation for your business, your client data never passes through
              infrastructure we own. We connect the tools you already use — your CRM, your email, your
              forms — and orchestrate them through platforms like Make or n8n that run under your account.
            </p>
            <p style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.75, marginBottom: "1rem" }}>
              Every data flow is documented in a system map delivered at project close. You can see exactly
              which field goes where, when it moves, and what triggers the action. There are no black-box
              integrations and no undisclosed data pathways.
            </p>
            <p style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.75 }}>
              We do not retain access to your systems after delivery unless you engage us for ongoing
              maintenance under a separate agreement. All credentials are transferred to you at handoff.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — PIPEDA Awareness */}
      <section style={{ paddingTop: spacing.sectionPadding, paddingBottom: spacing.sectionPadding, background: "#F7F9FC" }}>
        <div className="container">
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: DARK,
              marginBottom: "0.75rem",
            }}
          >
            PIPEDA Awareness in Automation
          </h2>
          <p style={{ color: "#6B7280", marginBottom: "2.5rem", maxWidth: "580px" }}>
            PIPEDA (Personal Information Protection and Electronic Documents Act) applies to most
            federally regulated businesses in Canada. We design automation that supports your
            obligations under three key principles.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {pipedaPrinciples.map((p) => (
              <div
                key={p.title}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: "1px solid rgba(40,56,145,0.1)",
                  boxShadow: "0 2px 8px rgba(40,56,145,0.05)",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>{p.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: NAVY, marginBottom: "0.5rem" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4B5563", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — The Control Layer */}
      <section style={{ paddingTop: spacing.sectionPadding, paddingBottom: spacing.sectionPadding, background: "white" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: DARK, marginBottom: "1rem" }}>
                The Control Layer
              </h2>
              <p style={{ color: "#4B5563", lineHeight: 1.7, marginBottom: "1rem" }}>
                Every automation system we build includes a control layer — a set of safeguards that
                govern how the system behaves when something unexpected happens.
              </p>
              <p style={{ color: "#4B5563", lineHeight: 1.7 }}>
                Automation without a control layer is brittle. A missed webhook or an ambiguous lead
                record can silently corrupt your CRM or miss a high-value opportunity. We build in
                explicit handling for failure, ambiguity, and edge cases from the start.
              </p>
            </div>
            <div>
              <ControlLayerCard items={controlLayerItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Security Principles */}
      <section style={{ paddingTop: spacing.sectionPadding, paddingBottom: spacing.sectionPadding, background: "#F7F9FC" }}>
        <div className="container">
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: DARK, marginBottom: "1.5rem" }}>
              Security Principles
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {securityPrinciples.map((point, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.875rem",
                    alignItems: "flex-start",
                    background: "white",
                    borderRadius: "0.75rem",
                    padding: "1.25rem 1.5rem",
                    border: "1px solid rgba(40,56,145,0.08)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: `rgba(40,56,145,0.1)`,
                      color: NAVY,
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "1px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.65 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          paddingTop: spacing.sectionPadding,
          paddingBottom: spacing.sectionPadding,
          ...surfaces.darkGradient,
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
            Questions About Data Handling?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "1.0625rem", marginBottom: "2rem", maxWidth: "520px", margin: "0 auto 2rem" }}>
            Contact us and we will walk through our governance approach for your specific business
            context — what data flows, where it goes, and how it is protected.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
