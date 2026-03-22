import type { Opportunity } from "@/types/planner";

interface Props {
  phase1: Opportunity[];
  phase2: Opportunity[];
  phase3: Opportunity[];
}

const PHASES = [
  {
    key: "phase1" as const,
    label: "Phase 1",
    sublabel: "Immediate Wins",
    timeframe: "Weeks 1–3",
    filled: true,
    color: "#283891",
  },
  {
    key: "phase2" as const,
    label: "Phase 2",
    sublabel: "Build on Momentum",
    timeframe: "Weeks 4–8",
    filled: false,
    color: "#4B61B8",
  },
  {
    key: "phase3" as const,
    label: "Phase 3",
    sublabel: "Mature Operations",
    timeframe: "Weeks 9–16",
    filled: false,
    color: "#7B7B7B",
  },
];

export default function RoadmapTimeline({ phase1, phase2, phase3 }: Props) {
  const phaseData = { phase1, phase2, phase3 };

  return (
    <div>
      {/* Desktop: horizontal layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 32px 1fr 32px 1fr",
          alignItems: "start",
          gap: 0,
        }}
        className="roadmap-desktop"
      >
        {PHASES.map((phase, idx) => {
          const opportunities = phaseData[phase.key];
          const isLast = idx === PHASES.length - 1;

          return (
            <>
              {/* Phase column */}
              <div
                key={phase.key}
                style={{
                  background: phase.filled ? "#EEF1FA" : "#F7F8FC",
                  border: `1.5px solid ${phase.filled ? "#C4CCE8" : "#E2E4ED"}`,
                  borderRadius: 12,
                  padding: "18px 18px 20px",
                }}
              >
                {/* Circle + label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: phase.filled ? phase.color : "white",
                      border: `2.5px solid ${phase.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: phase.filled ? "white" : phase.color,
                      }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: phase.color,
                        lineHeight: 1.2,
                      }}
                    >
                      {phase.label}: {phase.sublabel}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#7B7B7B",
                        marginTop: 2,
                      }}
                    >
                      {phase.timeframe}
                    </div>
                  </div>
                </div>

                {/* Opportunities */}
                {opportunities.length > 0 ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {opportunities.map((opp) => (
                      <li
                        key={opp.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          marginBottom: 8,
                          fontSize: 13,
                          color: "#1A1A2E",
                          lineHeight: 1.4,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: phase.color,
                            flexShrink: 0,
                            marginTop: 5,
                          }}
                        />
                        {opp.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: 13, color: "#7B7B7B", margin: 0, fontStyle: "italic" }}>
                    No items in this phase
                  </p>
                )}
              </div>

              {/* Connector arrow (not after last) */}
              {!isLast && (
                <div
                  key={`connector-${idx}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 20,
                    height: "100%",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#C5C8D6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </>
          );
        })}
      </div>

      {/* Mobile: vertical stack */}
      <style>{`
        @media (max-width: 600px) {
          .roadmap-desktop {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
