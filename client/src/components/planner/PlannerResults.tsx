import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { PlannerState } from "@/types/planner";
import { usePlannerScoring } from "@/hooks/usePlannerScoring";
import ResultCard from "./ResultCard";
import RoadmapTimeline from "./RoadmapTimeline";
import LeadCaptureForm from "./LeadCaptureForm";
import ShareResults from "./ShareResults";

interface Props {
  state: PlannerState;
  onRestart?: () => void;
}

function SectionCard({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      style={{
        background: "white",
        border: "1px solid #E2E4ED",
        borderRadius: 16,
        padding: "28px 24px",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: "0 0 18px",
        fontSize: 20,
        fontWeight: 800,
        color: "#1A1A2E",
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  );
}

const COMPLEXITY_CONFIG = {
  low: {
    label: "Low",
    color: "#0D9668",
    bg: "#ECFDF5",
    description:
      "Your workflows are well-suited to automation with your current tools. Expect a smooth implementation with quick results.",
  },
  medium: {
    label: "Medium",
    color: "#D97706",
    bg: "#FFFBEB",
    description:
      "Some workflows may need custom configuration or minor tool integrations. A phased approach will keep things manageable.",
  },
  high: {
    label: "High",
    color: "#DC2626",
    bg: "#FEF2F2",
    description:
      "Your setup has several moving parts. We recommend a discovery session before implementation to map dependencies properly.",
  },
};

export default function PlannerResults({ state, onRestart }: Props) {
  const scoringState = { ...state, currentStep: 9 };
  const results = usePlannerScoring(scoringState);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const leadFormRef = useRef<HTMLDivElement>(null);

  if (!results) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          gap: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid #E2E4ED",
            borderTop: "3px solid #283891",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ fontSize: 14, color: "#7B7B7B", margin: 0 }}>
          Calculating your results...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Sort: quick-wins first
  const sortedOpportunities = [...results.opportunities].sort((a, b) => {
    const order = { "quick-win": 0, "strong-next": 1, "careful-design": 2, "keep-human": 3 };
    return order[a.classification] - order[b.classification];
  });

  const complexityConf = COMPLEXITY_CONFIG[results.complexity];

  const handleLeadSubmit = async (
    email: string,
    businessName: string,
    name: string,
    notes: string
  ) => {
    setIsLeadSubmitted(true);
    // Fire and forget
    try {
      await fetch("/api/planner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName, name, notes, state }),
      });
    } catch {
      // Silently ignore — success is shown regardless
    }
  };

  const scrollToLeadForm = () => {
    leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "40px 20px 60px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* ── Section A: Summary ── */}
      <SectionCard delay={0}>
        <SectionHeading>Your Automation Summary</SectionHeading>
        <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, margin: "0 0 20px" }}>
          {results.summaryText}
        </p>

        {/* Stat chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {state.teamSize && (
            <div
              style={{
                background: "#EEF1FA",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: "#283891",
              }}
            >
              Team: {state.teamSize}
            </div>
          )}
          {state.industry && (
            <div
              style={{
                background: "#EEF1FA",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: "#283891",
              }}
            >
              {state.industry.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </div>
          )}
          <div
            style={{
              background: "#EEF1FA",
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: "#283891",
            }}
          >
            {state.selectedWorkflows.length} workflow
            {state.selectedWorkflows.length !== 1 ? "s" : ""} assessed
          </div>
        </div>
      </SectionCard>

      {/* ── Section B: Top Opportunities ── */}
      <SectionCard delay={0.2} style={{ padding: "28px 24px" }}>
        <SectionHeading>Your Top Automation Opportunities</SectionHeading>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {sortedOpportunities.slice(0, 5).map((opp, idx) => (
            <ResultCard
              key={opp.id}
              opportunity={opp}
              rank={idx + 1}
              delay={0.2 + idx * 0.08}
            />
          ))}
        </div>
      </SectionCard>

      {/* ── Section C: Human-Led Items ── */}
      {results.humanLedItems.length > 0 && (
        <SectionCard delay={0.4}>
          <SectionHeading>What Should Stay Human-Led</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {results.humanLedItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 14px",
                  background: "#F7F8FC",
                  borderRadius: 10,
                  border: "1px solid #E2E4ED",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 1 }}
                >
                  <path
                    d="M10 2L3 6v5c0 4.418 2.986 8.164 7 9 4.014-.836 7-4.582 7-9V6L10 2Z"
                    stroke="#283891"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1A1A2E",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#7B7B7B", lineHeight: 1.5 }}>
                    {item.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Section D: Suggested Starting Point ── */}
      {results.suggestedStart && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
          style={{
            background: "#1E2B6E",
            borderRadius: 16,
            padding: "28px 24px",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 12,
              fontWeight: 700,
              color: "#8FA4E8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Recommended First Step
          </p>
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: 20,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Start Here
          </h2>
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: 17,
              fontWeight: 700,
              color: "#C4D0F5",
            }}
          >
            {results.suggestedStart.name}
          </h3>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 14,
              color: "#A3B4E8",
              lineHeight: 1.6,
            }}
          >
            {results.suggestedStart.estimatedImpact}
          </p>

          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "13px 24px",
              borderRadius: 8,
              background: "#7E0F4A",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#6a0c3e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#7E0F4A";
            }}
          >
            Book a Strategy Call
          </a>
        </motion.div>
      )}

      {/* ── Section E: Complexity ── */}
      <SectionCard delay={0.6}>
        <SectionHeading>Implementation Complexity</SectionHeading>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          {(["low", "medium", "high"] as const).map((level) => {
            const conf = COMPLEXITY_CONFIG[level];
            const isActive = level === results.complexity;
            return (
              <div
                key={level}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 8,
                  background: isActive ? conf.bg : "#F7F8FC",
                  border: isActive ? `2px solid ${conf.color}` : "2px solid #E2E4ED",
                  textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? conf.color : "#C5C8D6",
                  }}
                >
                  {conf.label}
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ margin: 0, fontSize: 14, color: "#4B5563", lineHeight: 1.6 }}>
          {complexityConf.description}
        </p>
      </SectionCard>

      {/* ── Section F: Phased Roadmap ── */}
      <SectionCard delay={0.7}>
        <SectionHeading>Your Phased Roadmap</SectionHeading>
        <RoadmapTimeline
          phase1={results.roadmap.phase1}
          phase2={results.roadmap.phase2}
          phase3={results.roadmap.phase3}
        />
      </SectionCard>

      {/* ── Section G: Estimated Benefits ── */}
      <SectionCard delay={0.8}>
        <SectionHeading>Estimated Benefits</SectionHeading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {[
            {
              icon: "⏱",
              label: "Admin hours recoverable",
              value: results.benefits.adminHoursRecoverable,
            },
            {
              icon: "⚡",
              label: "Response time improvement",
              value: results.benefits.responseImprovement,
            },
            {
              icon: "↩",
              label: "Follow-up rate",
              value: results.benefits.followUpImprovement,
            },
            {
              icon: "📈",
              label: "Capacity increase",
              value: results.benefits.capacityImprovement,
            },
          ].map((metric) => (
            <div
              key={metric.label}
              style={{
                background: "#F7F8FC",
                border: "1px solid #E2E4ED",
                borderRadius: 10,
                padding: "16px 14px",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>{metric.icon}</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0D9668",
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}
              >
                {metric.value}
              </div>
              <div style={{ fontSize: 12, color: "#7B7B7B", lineHeight: 1.4 }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", lineHeight: 1.5 }}>
          Estimates are indicative and based on typical outcomes for businesses of similar size
          and workflow complexity. Actual results will depend on implementation quality, staff
          adoption, and your specific processes.
        </p>
      </SectionCard>

      {/* ── Section H: Lead Capture ── */}
      <SectionCard delay={0.9} style={{ padding: "28px 24px" }}>
        <div ref={leadFormRef}>
          <SectionHeading>Get Your Custom Automation Map</SectionHeading>
          <p style={{ margin: "0 0 20px", fontSize: 14, color: "#7B7B7B", lineHeight: 1.6 }}>
            We will prepare a detailed, personalised automation map based on your results and
            send it directly to you.
          </p>
          <LeadCaptureForm
            state={state}
            onSubmit={handleLeadSubmit}
            isSubmitted={isLeadSubmitted}
          />
        </div>
      </SectionCard>

      {/* ── Section I: Share ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.0, ease: "easeOut" }}
      >
        <ShareResults state={state} />
      </motion.div>

      {/* ── Footer CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.1, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          paddingTop: 8,
        }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
          <button
            type="button"
            onClick={scrollToLeadForm}
            style={{
              flex: "1 1 200px",
              maxWidth: 280,
              padding: "14px 20px",
              borderRadius: 8,
              border: "none",
              background: "#7E0F4A",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#6a0c3e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#7E0F4A";
            }}
          >
            Get My Custom Automation Map
          </button>

          <a
            href="/contact"
            style={{
              flex: "1 1 200px",
              maxWidth: 240,
              padding: "14px 20px",
              borderRadius: 8,
              border: "2px solid #283891",
              background: "white",
              color: "#283891",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              textAlign: "center",
              transition: "all 0.15s",
              boxSizing: "border-box",
            }}
          >
            Book a Strategy Call
          </a>
        </div>

        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            style={{
              background: "none",
              border: "none",
              color: "#7B7B7B",
              fontSize: 13,
              cursor: "pointer",
              padding: "4px 8px",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Start Over
          </button>
        )}
      </motion.div>
    </div>
  );
}
