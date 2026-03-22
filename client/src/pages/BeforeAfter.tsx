import { Link } from "wouter";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";

const NAVY = "#283891";
const DARK = "#1A1A2E";

const sectionHeadingStyle: React.CSSProperties = {
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

const sections = [
  {
    label: "Lead Response",
    heading: "Lead Response",
    bg: "white",
    metrics: [
      { label: "Response Time", before: "4–8 hours", after: "Under 90 seconds", beforeW: 88, afterW: 8 },
      { label: "After-Hours Coverage", before: "0% captured", after: "100% captured", beforeW: 100, afterW: 5 },
      { label: "Follow-Up Rate", before: "40% of leads", after: "100% of leads", beforeW: 40, afterW: 100 },
    ],
  },
  {
    label: "Client Intake",
    heading: "Client Intake",
    bg: "#F7F9FC",
    metrics: [
      { label: "Intake Process Time", before: "30–45 minutes manual", after: "Under 5 minutes", beforeW: 90, afterW: 10 },
      { label: "Staff Touchpoints", before: "7 manual steps", after: "1 review only", beforeW: 90, afterW: 12 },
      { label: "CRM Record Accuracy", before: "60–70% complete", after: "100% complete", beforeW: 65, afterW: 100 },
    ],
  },
  {
    label: "Document Collection",
    heading: "Document Collection",
    bg: "white",
    metrics: [
      { label: "Average Collection Time", before: "18–21 days", after: "9–11 days", beforeW: 90, afterW: 50 },
      { label: "Collection Completion Rate", before: "65%", after: "93%", beforeW: 65, afterW: 93 },
      { label: "Staff Chase Time/Week", before: "6–8 hours", after: "30 minutes", beforeW: 80, afterW: 8 },
    ],
  },
  {
    label: "Appointment Reminders",
    heading: "Appointment Reminders",
    bg: "#F7F9FC",
    metrics: [
      { label: "No-Show Rate", before: "18–25%", after: "6–10%", beforeW: 25, afterW: 10 },
      { label: "Reminder Completion", before: "60% receive reminders", after: "100% automated", beforeW: 60, afterW: 100 },
      { label: "Rebooking on Cancellation", before: "50% rebooked", after: "85% rebooked", beforeW: 50, afterW: 85 },
    ],
  },
  {
    label: "Invoicing",
    heading: "Invoicing",
    bg: "white",
    metrics: [
      { label: "Invoice Delivery", before: "2–4 weeks after completion", after: "Same day, automatic", beforeW: 85, afterW: 5 },
      { label: "Payment Collection Time", before: "45–60 days average", after: "28–35 days average", beforeW: 85, afterW: 50 },
      { label: "Overdue Rate", before: "25–35%", after: "12–18%", beforeW: 35, afterW: 18 },
    ],
  },
  {
    label: "After-Hours Coverage",
    heading: "After-Hours Lead Coverage",
    bg: "#F7F9FC",
    metrics: [
      { label: "After-5pm Lead Capture", before: "0% (voicemail)", after: "100% responded", beforeW: 100, afterW: 5 },
      { label: "Qualified by Morning", before: "0%", after: "100% in CRM", beforeW: 100, afterW: 5 },
      { label: "Lead Loss Rate", before: "High — 40%+ after hours", after: "Under 5%", beforeW: 40, afterW: 5 },
    ],
  },
  {
    label: "Quote Follow-Up",
    heading: "Quote Follow-Up",
    bg: "white",
    metrics: [
      { label: "Follow-Up Completion", before: "35–40% of quotes", after: "100% automated", beforeW: 40, afterW: 100 },
      { label: "Conversion Rate", before: "Baseline", after: "+15–25% improvement", beforeW: 50, afterW: 72 },
      { label: "Follow-Up Speed", before: "Next day (if remembered)", after: "Auto at 48hr, 5d, 10d", beforeW: 70, afterW: 5 },
    ],
  },
  {
    label: "Client Status Updates",
    heading: "Client Status Updates",
    bg: "#F7F9FC",
    metrics: [
      { label: "Outbound Status Calls/Week", before: "25–30 calls", after: "Under 5 calls", beforeW: 90, afterW: 18 },
      { label: "Client Satisfaction (status info)", before: "60% satisfied", after: "90%+ satisfied", beforeW: 60, afterW: 90 },
      { label: "Staff time on updates/week", before: "4–6 hours", after: "30 minutes", beforeW: 80, afterW: 8 },
    ],
  },
];

export default function BeforeAfter() {
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
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Before vs After</span>
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
              Workflow Comparisons
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
              Before vs After Automation
            </h1>
            <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: "600px" }}>
              Real workflow comparisons showing what changes when coordination tasks are automated.
              Eight common business workflows — side by side.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((sec) => (
        <section
          key={sec.label}
          style={{
            paddingTop: "3.5rem",
            paddingBottom: "3.5rem",
            background: sec.bg,
          }}
        >
          <div className="container">
            <span style={sectionLabelStyle}>{sec.label}</span>
            <h2 style={sectionHeadingStyle}>{sec.heading}</h2>
            <BeforeAfterSection metrics={sec.metrics} />
          </div>
        </section>
      ))}

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
            Ready to See Your Before &amp; After?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "1.0625rem",
              maxWidth: "540px",
              margin: "0 auto 2rem",
              lineHeight: 1.65,
            }}
          >
            Book a free Automation Audit and we will map your current workflows, identify the highest-impact
            automations, and show you what the after state looks like for your specific business.
          </p>
          <Link href="/contact" className="btn-primary">
            Book Free Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
