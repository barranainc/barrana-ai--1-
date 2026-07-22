import { Link } from "wouter";

const NAVY = "#283891";
const BURGUNDY = "#7E0F4A";
const DARK = "#1A1A2E";

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  "Lead Response":   { bg: "rgba(40,56,145,0.08)",   text: NAVY,      border: "rgba(40,56,145,0.2)" },
  "Operations":      { bg: "rgba(126,15,74,0.08)",    text: BURGUNDY,  border: "rgba(126,15,74,0.2)" },
  "ROI Analysis":    { bg: "rgba(22,163,74,0.08)",    text: "#15803D",  border: "rgba(22,163,74,0.2)" },
  "Lead Management": { bg: "rgba(217,119,6,0.08)",    text: "#B45309",  border: "rgba(217,119,6,0.2)" },
  "Governance":      { bg: "rgba(109,40,217,0.08)",   text: "#6D28D9",  border: "rgba(109,40,217,0.2)" },
  "Immigration":     { bg: "rgba(6,182,212,0.08)",    text: "#0E7490",  border: "rgba(6,182,212,0.2)" },
};

function Tag({ label }: { label: string }) {
  const c = tagColors[label] ?? { bg: "rgba(107,114,128,0.1)", text: "#374151", border: "rgba(107,114,128,0.2)" };
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "0.25rem 0.7rem",
        borderRadius: "9999px",
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
      }}
    >
      {label}
    </span>
  );
}

const featuredArticle = {
  slug: "/operator-insights/response-time-systems-problem",
  tag: "Lead Response",
  date: "March 2025",
  readTime: "6 min read",
  title: "Why Response Time Is a Systems Problem, Not a Sales Problem",
  excerpt:
    "Most GTA service businesses lose leads not because their prices are wrong or their pitch is weak, but because a human being has to notice the inquiry and choose to respond. When response time averages four to eight hours, a third of your qualified leads have already booked with someone else. This is a systems problem - and systems problems have systems solutions.",
};

const gridArticles = [
  {
    slug: "/operator-insights/hidden-cost-manual-intake",
    tag: "Operations",
    date: "Feb 2025",
    readTime: "5 min read",
    title: "The Hidden Cost of Manual Client Intake",
    excerpt: "When intake is manual, the real cost isn't the 45 minutes per client - it's the error rate, the lag, and the staff capacity absorbed by data entry instead of value-adding work.",
  },
  {
    slug: "/operator-insights/admin-hours-annual-cost",
    tag: "ROI Analysis",
    date: "Feb 2025",
    readTime: "4 min read",
    title: "What Your Admin Hours Actually Cost Per Year",
    excerpt: "At $25/hour, 15 admin hours per week is $19,500 annually - and that's before accounting for the opportunity cost of staff doing coordination instead of billable work.",
  },
  {
    slug: "/operator-insights/why-follow-up-fails",
    tag: "Lead Management",
    date: "Jan 2025",
    readTime: "5 min read",
    title: "Why Follow-Up Fails (And How to Fix It Systematically)",
    excerpt: "Manual follow-up fails for a simple reason: it depends on a person remembering to do it while managing everything else. The fix isn't discipline - it's removing the human dependency.",
  },
  {
    slug: "/operator-insights/control-layer-boundaries",
    tag: "Governance",
    date: "Jan 2025",
    readTime: "6 min read",
    title: "The Control Layer: Why Every Automation Needs Boundaries",
    excerpt: "Automation without a control layer is a liability. Stop-loss logic, escalation paths, and audit trails aren't optional extras - they're what separates a reliable system from a reckless one.",
  },
  {
    slug: "/operator-insights/immigration-intake-field-report",
    tag: "Immigration",
    date: "Mar 2025",
    readTime: "7 min read",
    title: "Intake Automation for Immigration Firms: A Field Report",
    excerpt: "How an immigration consulting firm in Mississauga reduced intake time from 50 minutes to under 5 - without changing their process, just removing the manual steps from their staff's plate.",
  },
];

export default function OperatorInsights() {
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
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Operator Insights</span>
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
              Field Notes
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
              Operator Insights
            </h1>
            <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: "600px" }}>
              Field notes from implementing automation for GTA service businesses.
              Written for operators, not technologists.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="container">
          {/* Featured Article */}
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#9CA3AF",
                marginBottom: "1rem",
              }}
            >
              Featured Article
            </div>
            <Link
              href={featuredArticle.slug}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  background: "white",
                  border: `2px solid rgba(40,56,145,0.15)`,
                  borderRadius: "1.25rem",
                  padding: "2.5rem",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "0 12px 40px rgba(40,56,145,0.12)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Tag label={featuredArticle.tag} />
                  <span style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>{featuredArticle.date}</span>
                  <span style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>·</span>
                  <span style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>{featuredArticle.readTime}</span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                    fontWeight: 800,
                    color: DARK,
                    lineHeight: 1.25,
                    marginBottom: "1rem",
                  }}
                >
                  {featuredArticle.title}
                </h2>
                <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "680px" }}>
                  {featuredArticle.excerpt}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    color: NAVY,
                  }}
                >
                  Read article
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          {/* Grid of articles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {gridArticles.map((art) => (
              <Link key={art.slug} href={art.slug} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "white",
                    border: "1px solid rgba(40,56,145,0.1)",
                    borderRadius: "1rem",
                    padding: "1.75rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 8px 28px rgba(40,56,145,0.1)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
                    <Tag label={art.tag} />
                    <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{art.date}</span>
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: DARK,
                      lineHeight: 1.35,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {art.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#4B5563", lineHeight: 1.65, flexGrow: 1 }}>
                    {art.excerpt}
                  </p>
                  <div
                    style={{
                      marginTop: "1.25rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{art.readTime}</span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: NAVY,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      Read
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
