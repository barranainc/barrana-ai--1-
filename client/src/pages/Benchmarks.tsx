import { Link } from "wouter";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";

const NAVY = "#283891";
const DARK = "#1A1A2E";

const headingStyle: React.CSSProperties = {
  fontSize: "1.375rem",
  fontWeight: 800,
  color: DARK,
  marginBottom: "1.5rem",
};

const sectionLabelStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: NAVY,
  background: "rgba(40,56,145,0.08)",
  border: "1px solid rgba(40,56,145,0.18)",
  borderRadius: "9999px",
  padding: "0.25rem 0.8rem",
  marginBottom: "0.75rem",
};

export default function Benchmarks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, ${DARK} 0%, ${NAVY} 100%)`,
          paddingTop: "6rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.55)" }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Benchmarks</span>
          </div>
          <div className="max-w-3xl">
            <div
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#60A5FA",
                background: "rgba(96,165,250,0.12)",
                borderRadius: "9999px",
                padding: "0.3rem 0.9rem",
                marginBottom: "1.25rem",
                border: "1px solid rgba(96,165,250,0.25)",
              }}
            >
              Automation Benchmarks
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
              Automation Benchmarks
            </h1>
            <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: "600px" }}>
              Typical results from deployed automation systems for GTA service businesses.
              Based on measured client outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ paddingTop: "3rem", paddingBottom: "0" }}>
        <div className="container">
          <div
            style={{
              maxWidth: "720px",
              background: "#F7F9FC",
              border: "1px solid rgba(40,56,145,0.1)",
              borderRadius: "0.875rem",
              padding: "1.25rem 1.5rem",
              display: "flex",
              gap: "0.875rem",
              alignItems: "flex-start",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>
              These benchmarks represent typical results across multiple implementations. Individual results vary
              based on starting conditions, business type, and the specific workflows automated. We calculate
              projected ROI for your specific business during the discovery phase.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — Response Time */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div className="container">
          <span style={sectionLabelStyle}>Response Time</span>
          <h2 style={headingStyle}>Lead Response &amp; Follow-Up</h2>
          <BeforeAfterSection metrics={[
            { label: "Lead Response Time", before: "4–8 hours average", after: "Under 90 seconds", beforeW: 88, afterW: 8 },
            { label: "After-Hours Coverage", before: "0% (voicemail)", after: "100% captured", beforeW: 100, afterW: 5 },
            { label: "Follow-Up Completion", before: "35–40% of leads", after: "100% automated", beforeW: 40, afterW: 100 },
          ]} />
        </div>
      </section>

      {/* Section 2 — Appointment & Scheduling */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem", background: "#F7F9FC" }}>
        <div className="container">
          <span style={sectionLabelStyle}>Appointments</span>
          <h2 style={headingStyle}>Appointment &amp; Scheduling</h2>
          <BeforeAfterSection metrics={[
            { label: "No-Show Rate", before: "18–25%", after: "6–10%", beforeW: 25, afterW: 10 },
            { label: "Booking Confirmation Time", before: "24–48 hours manual", after: "Instant automated", beforeW: 80, afterW: 5 },
            { label: "Reminder Delivery Rate", before: "60% (manual)", after: "100% automated", beforeW: 60, afterW: 100 },
          ]} />
        </div>
      </section>

      {/* Section 3 — Document Collection */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div className="container">
          <span style={sectionLabelStyle}>Documents</span>
          <h2 style={headingStyle}>Document Collection</h2>
          <BeforeAfterSection metrics={[
            { label: "Collection Timeline", before: "18–21 days average", after: "9–11 days", beforeW: 90, afterW: 45 },
            { label: "Completion Rate (30 days)", before: "65–70%", after: "92–95%", beforeW: 68, afterW: 93 },
            { label: "Staff chase time/week", before: "6–8 hours", after: "Under 30 minutes", beforeW: 80, afterW: 8 },
          ]} />
        </div>
      </section>

      {/* Section 4 — Admin & Capacity */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem", background: "#F7F9FC" }}>
        <div className="container">
          <span style={sectionLabelStyle}>Admin &amp; Capacity</span>
          <h2 style={headingStyle}>Admin Burden &amp; Team Capacity</h2>
          <BeforeAfterSection metrics={[
            { label: "Admin Hours per Week", before: "15–20 hrs (per 3 staff)", after: "5–7 hrs", beforeW: 85, afterW: 30 },
            { label: "Invoice Delivery", before: "2–4 weeks late", after: "Same-day triggered", beforeW: 85, afterW: 5 },
            { label: "Client Capacity (same team)", before: "Baseline", after: "+25–35% more clients", beforeW: 60, afterW: 95 },
          ]} />
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          background: `linear-gradient(135deg, ${DARK} 0%, ${NAVY} 100%)`,
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
            What Are Your Benchmarks?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "1.0625rem",
              maxWidth: "520px",
              margin: "0 auto 2rem",
              lineHeight: 1.65,
            }}
          >
            Book a free Automation Audit and we will calculate projected ROI for your specific
            workflows and team size.
          </p>
          <Link href="/contact" className="btn-primary">
            Book Free Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
