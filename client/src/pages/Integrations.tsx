import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const NAVY = "#283891";
const DARK = "#1A1A2E";

// Tool categories
const categories = [
  {
    name: "CRM & Lead Management",
    tools: [
      { name: "HubSpot", emoji: "🟠", desc: "Full pipeline, deals, and contact automation" },
      { name: "GoHighLevel", emoji: "🟣", desc: "All-in-one CRM, funnels, and messaging" },
      { name: "Zoho CRM", emoji: "🔴", desc: "Mid-market CRM with deep workflow automation" },
      { name: "Salesforce", emoji: "🔵", desc: "Enterprise CRM for larger service businesses" },
      { name: "Pipedrive", emoji: "🟢", desc: "Sales-focused pipeline management" },
    ],
  },
  {
    name: "Calendar & Scheduling",
    tools: [
      { name: "Google Calendar", emoji: "📅", desc: "Booking confirmations, reminders, and blocks" },
      { name: "Calendly", emoji: "🗓️", desc: "Self-serve booking linked to CRM intake" },
      { name: "Acuity", emoji: "🕐", desc: "Service-specific appointment scheduling" },
      { name: "Jane App", emoji: "🏥", desc: "Healthcare scheduling and patient intake" },
    ],
  },
  {
    name: "Communication",
    tools: [
      { name: "Gmail", emoji: "📧", desc: "Automated outreach, follow-ups, and parsing" },
      { name: "Outlook", emoji: "💙", desc: "Corporate email automation and routing" },
      { name: "Twilio SMS", emoji: "📱", desc: "Two-way SMS reminders and lead response" },
      { name: "WhatsApp Business", emoji: "💬", desc: "Automated client messaging and updates" },
    ],
  },
  {
    name: "Finance & Billing",
    tools: [
      { name: "QuickBooks", emoji: "🟩", desc: "Automated invoicing and payment sync" },
      { name: "FreshBooks", emoji: "🟦", desc: "Invoice delivery and client billing flows" },
      { name: "Wave", emoji: "🌊", desc: "SMB accounting with automated invoice triggers" },
      { name: "Stripe", emoji: "💳", desc: "Payment collection and subscription management" },
    ],
  },
  {
    name: "Forms & Intake",
    tools: [
      { name: "Typeform", emoji: "🔷", desc: "Conversational intake forms with logic branching" },
      { name: "Jotform", emoji: "🟡", desc: "Document requests, lead capture, and intake" },
      { name: "Google Forms", emoji: "📝", desc: "Simple intake with CRM auto-population" },
      { name: "Paperform", emoji: "📋", desc: "Styled forms with payment and routing" },
    ],
  },
  {
    name: "Automation Platforms",
    tools: [
      { name: "Make (Integromat)", emoji: "⚙️", desc: "Our primary platform for multi-step workflows" },
      { name: "Zapier", emoji: "⚡", desc: "Broad connector library for trigger-action flows" },
      { name: "n8n", emoji: "🔗", desc: "Self-hosted option for data-sensitive clients" },
    ],
  },
  {
    name: "Document & File",
    tools: [
      { name: "Google Drive", emoji: "📂", desc: "Automatic folder creation and file routing" },
      { name: "Dropbox", emoji: "📦", desc: "Secure document delivery and collection" },
      { name: "DocuSign", emoji: "✍️", desc: "E-signature flows for intake and contracts" },
      { name: "Clio", emoji: "⚖️", desc: "Legal practice management and client intake" },
    ],
  },
];

// Hub diagram spokes config
const spokeCategories = [
  "CRM & Leads",
  "Scheduling",
  "Communication",
  "Finance",
  "Forms",
  "Automation",
  "Documents",
  "Analytics",
];

function HubDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (svgRef.current) obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  const cx = 300;
  const cy = 220;
  const spokeR = 165;
  const count = spokeCategories.length;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 440"
      style={{ width: "100%", maxWidth: "600px", display: "block", margin: "0 auto" }}
      aria-label="Barrana.ai connects to all major tool categories"
    >
      {/* Spokes */}
      {spokeCategories.map((cat, i) => {
        const angle = (2 * Math.PI * i) / count - Math.PI / 2;
        const x2 = cx + spokeR * Math.cos(angle);
        const y2 = cy + spokeR * Math.sin(angle);
        return (
          <line
            key={cat}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke={NAVY}
            strokeWidth="2"
            strokeOpacity="0.35"
            strokeDasharray="120"
            strokeDashoffset={drawn ? "0" : "120"}
            style={{
              transition: `stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
            }}
          />
        );
      })}

      {/* Outer circles */}
      {spokeCategories.map((cat, i) => {
        const angle = (2 * Math.PI * i) / count - Math.PI / 2;
        const x = cx + spokeR * Math.cos(angle);
        const y = cy + spokeR * Math.sin(angle);
        return (
          <g key={cat}>
            <circle
              cx={x}
              cy={y}
              r="34"
              fill="rgba(40,56,145,0.08)"
              stroke={NAVY}
              strokeWidth="1.5"
              strokeOpacity="0.3"
              style={{
                opacity: drawn ? 1 : 0,
                transition: `opacity 0.5s ease ${0.5 + i * 0.08}s`,
              }}
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              style={{
                fontSize: "9px",
                fontWeight: 700,
                fill: NAVY,
                opacity: drawn ? 1 : 0,
                transition: `opacity 0.5s ease ${0.6 + i * 0.08}s`,
              }}
            >
              {cat.split(" ").map((word, wi) => (
                <tspan key={wi} x={x} dy={wi === 0 ? (cat.includes(" ") ? "-6" : "0") : "12"}>
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      {/* Center circle */}
      <circle
        cx={cx}
        cy={cy}
        r="52"
        fill={NAVY}
        style={{
          opacity: drawn ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
        }}
      />
      <text
        x={cx}
        y={cy - 7}
        textAnchor="middle"
        style={{ fontSize: "13px", fontWeight: 800, fill: "white" }}
      >
        Barrana.ai
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        style={{ fontSize: "9.5px", fill: "rgba(255,255,255,0.65)" }}
      >
        Automation Hub
      </text>
    </svg>
  );
}

export default function Integrations() {
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
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Integrations</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
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
                Integrations
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
                Tools We Connect
              </h1>
              <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: "520px" }}>
                We connect the tools your business already uses. No platform switches, no migration
                headaches. Barrana.ai builds the bridges between your existing stack so data flows
                automatically where it needs to go.
              </p>
            </div>
            <div>
              <HubDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {categories.map((cat) => (
              <div key={cat.name}>
                <h2
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 800,
                    color: DARK,
                    marginBottom: "1.25rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(40,56,145,0.1)",
                  }}
                >
                  {cat.name}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      style={{
                        background: "#F7F9FC",
                        borderRadius: "0.875rem",
                        padding: "1.25rem",
                        border: "1px solid rgba(40,56,145,0.08)",
                        transition: "box-shadow 0.2s ease, transform 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(40,56,145,0.12)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{ fontSize: "1.75rem", marginBottom: "0.625rem", lineHeight: 1 }}>
                        {tool.emoji}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: DARK, marginBottom: "0.3rem" }}>
                        {tool.name}
                      </div>
                      <div style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.55 }}>
                        {tool.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
            Don't see your tool?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              maxWidth: "540px",
              margin: "0 auto 2rem",
            }}
          >
            We integrate with 200+ platforms. Book an automation audit and tell us what you use -
            if there's an API, we can connect it.
          </p>
          <Link href="/contact" className="btn-primary">
            Book an Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
