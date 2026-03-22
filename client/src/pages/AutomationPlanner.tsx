/**
 * AutomationPlanner.tsx
 * Route: /automation-planner
 * Two zones: landing (wizardStarted === false) and wizard (wizardStarted === true).
 */

import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "wouter";
import FAQAccordion, { FAQItem } from "@/components/ui/FAQAccordion";
import type { Industry, PlannerState } from "@/types/planner";

const PlannerWizard = lazy(() => import("@/components/planner/PlannerWizard"));

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const NAVY      = "#283891";
const BURGUNDY  = "#7E0F4A";
const GREY      = "#7B7B7B";
const DARK      = "#1A1A2E";

// ─── Check icon (burgundy) ────────────────────────────────────────────────────
function BurgundyCheck() {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: BURGUNDY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Blue check icon ──────────────────────────────────────────────────────────
function BlueCheck() {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Start CTA button ─────────────────────────────────────────────────────────
function StartButton({ onStart, label = "Start the Planner" }: { onStart: () => void; label?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "16px 36px",
        borderRadius: 8,
        border: "none",
        background: hovered ? "#6a0c3e" : BURGUNDY,
        color: "white",
        fontSize: 17,
        fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.15s",
        lineHeight: 1,
      }}
    >
      {label}
    </button>
  );
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "Is this a sales pitch?",
    answer:
      "No. You get useful results without talking to anyone. If you want a deeper analysis, you can optionally request a detailed automation map or book a strategy call.",
  },
  {
    question: "How long does it take?",
    answer: "3 to 5 minutes for most people.",
  },
  {
    question: "Do I need to give my email?",
    answer: "Not to see the results. Only if you want the detailed map sent to you.",
  },
  {
    question: "Is this relevant to my industry?",
    answer:
      "We support accounting, immigration, law, healthcare, contractors, agencies, real estate, education, dental, insurance, property management, and general service businesses.",
  },
  {
    question: "What happens with my data?",
    answer:
      "Your responses are used only to generate your results. We do not sell data. If you provide your email, we may follow up with relevant automation insights.",
  },
];

// ─── Landing content ──────────────────────────────────────────────────────────
function LandingContent({ onStart }: { onStart: () => void }) {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "#EEF0FB", padding: "72px 0 80px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 24, fontSize: 13, color: GREY }}>
            <Link href="/" style={{ color: GREY, textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>·</span>
            <span style={{ color: NAVY, fontWeight: 600 }}>Automation Planner</span>
          </nav>

          {/* Section label */}
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BURGUNDY,
              marginBottom: 16,
            }}
          >
            Automation Planner
          </p>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: DARK,
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            Map What Your Business Can Automate
          </h1>

          {/* Sub */}
          <p style={{ fontSize: 16, color: GREY, lineHeight: 1.7, marginBottom: 20, maxWidth: 580 }}>
            Answer a few guided questions. Get a prioritised automation roadmap. See what should stay human-led.
          </p>

          {/* Body */}
          <p style={{ fontSize: 15, color: GREY, lineHeight: 1.75, marginBottom: 36, maxWidth: 640 }}>
            The Barrana Automation Planner walks you through your workflows and identifies the repetitive tasks that are costing you time, leads, and capacity. In about 3 to 5 minutes, you will see exactly where automation fits in your business and where to start.
          </p>

          {/* CTA */}
          <StartButton onStart={onStart} />
          <p style={{ fontSize: 13, color: GREY, marginTop: 12 }}>Free. No account required. Takes 3 to 5 minutes.</p>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: DARK,
              marginBottom: 32,
            }}
          >
            What the Planner Delivers
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              "Your top automation opportunities, ranked by impact and implementation ease",
              "A clear view of what should remain human-led in your business",
              "A phased roadmap: what to automate first, second, and third",
              "Estimated time recovery and capacity improvements",
              "Optional: a detailed automation map and strategy call with Barrana",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <BurgundyCheck />
                <p style={{ fontSize: 15, color: DARK, lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section style={{ background: "#F5F5F5", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: DARK,
              marginBottom: 32,
            }}
          >
            Built for Business Owners and Operators
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              "Small business owners (2–50 staff) who know they have operational bottlenecks but are not sure where to start",
              "Solo operators drowning in admin who want to understand what can be automated",
              "Office managers and operations leads looking for a systematic approach to reducing manual work",
              "Business owners evaluating AI automation but not ready for a sales call",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <BlueCheck />
                <p style={{ fontSize: 15, color: DARK, lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 15,
              color: GREY,
              fontStyle: "italic",
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid #E0E0E0",
            }}
          >
            "If your business runs on appointments, enquiries, and follow-ups, this planner is for you."
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: DARK,
              marginBottom: 36,
            }}
          >
            How It Works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              "Tell us about your business — industry, team size, tools you use",
              "Select which workflows exist in your operations",
              "Answer a few focused questions about your biggest bottlenecks",
              "Tell us what must stay human-led",
              "Get your personalised automation roadmap with priorities, phases, and estimated impact",
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: NAVY,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ fontSize: 15, color: DARK, lineHeight: 1.65, margin: 0, paddingTop: 6 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLE OUTPUT ── */}
      <section style={{ background: "#F5F5F5", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Section label */}
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BURGUNDY,
              marginBottom: 16,
            }}
          >
            Example Output
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: DARK,
              marginBottom: 32,
            }}
          >
            What Results Look Like
          </h2>

          {/* Result card */}
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: "28px 32px",
              borderLeft: `5px solid ${BURGUNDY}`,
              boxShadow: "0 2px 16px rgba(40,56,145,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: "#EEF0FB",
                  borderRadius: 6,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: NAVY,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Sample Result
              </div>
            </div>
            <p
              style={{
                fontSize: 15,
                color: DARK,
                lineHeight: 1.75,
                margin: "0 0 20px",
              }}
            >
              An immigration consulting firm with 3 staff found that enquiry response, document collection, and client status updates were their top 3 automation opportunities. Phase 1 implementation: 3 weeks. Estimated time recovery: 12–16 hours per week.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Phase 1", value: "3 weeks" },
                { label: "Time Recovered", value: "12–16 hrs/wk" },
                { label: "Opportunities Found", value: "3 quick wins" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#F7F9FC",
                    borderRadius: 8,
                    padding: "10px 16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: GREY, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 13, color: GREY, marginTop: 16, fontStyle: "italic" }}>
            This is the type of output the planner produces. Personalised to your specific inputs.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: DARK,
              marginBottom: 32,
            }}
          >
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#1E2B6E", padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: 700, textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.625rem, 3.5vw, 2.25rem)",
              fontWeight: 800,
              color: "white",
              marginBottom: 32,
              lineHeight: 1.25,
            }}
          >
            Ready to See What Your Business Can Automate?
          </h2>
          <StartButton onStart={onStart} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 14 }}>
            Free. 3 to 5 minutes. No account required.
          </p>
        </div>
      </section>
    </>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────
export default function AutomationPlanner() {
  const [wizardStarted, setWizardStarted] = useState(false);
  const [initialIndustry, setInitialIndustry] = useState<Industry | undefined>(undefined);
  const [sharedState, setSharedState] = useState<PlannerState | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedResults = params.get("r");
    const industry = params.get("industry");

    if (encodedResults) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedResults)));
        setSharedState(decoded);
        setWizardStarted(true);
      } catch {
        /* ignore malformed param */
      }
    }

    if (industry) {
      setInitialIndustry(industry as Industry);
    }
  }, []);

  return (
    <div>
      {!wizardStarted && !sharedState && (
        <LandingContent onStart={() => setWizardStarted(true)} />
      )}
      {(wizardStarted || sharedState) && (
        <Suspense
          fallback={
            <div style={{ padding: "4rem", textAlign: "center", color: GREY, fontSize: 15 }}>
              Loading planner...
            </div>
          }
        >
          <PlannerWizard
            initialIndustry={initialIndustry}
            initialState={sharedState ?? undefined}
          />
        </Suspense>
      )}
    </div>
  );
}
