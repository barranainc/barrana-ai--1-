import { motion } from "framer-motion";
import type { Opportunity } from "@/types/planner";

interface Props {
  opportunity: Opportunity;
  rank?: number;
  delay?: number;
}

const CLASSIFICATION_CONFIG: Record<
  Opportunity["classification"],
  { label: string; bg: string; color: string }
> = {
  "quick-win": { label: "Quick Win", bg: "#ECFDF5", color: "#0D9668" },
  "strong-next": { label: "Strong Next Phase", bg: "#EEF1FA", color: "#283891" },
  "careful-design": { label: "Needs Careful Design", bg: "#FFFBEB", color: "#D97706" },
  "keep-human": { label: "Keep Human-Led", bg: "#F3F4F6", color: "#6B7280" },
};

const PHASE_LABELS: Record<1 | 2 | 3, string> = {
  1: "Phase 1",
  2: "Phase 2",
  3: "Phase 3",
};

export default function ResultCard({ opportunity, rank, delay = 0 }: Props) {
  const classConfig = CLASSIFICATION_CONFIG[opportunity.classification];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      style={{
        background: "white",
        borderRadius: 14,
        border: "1px solid #E2E4ED",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        padding: "20px 20px 18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top row: rank + classification badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
          gap: 8,
        }}
      >
        {/* Rank badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {rank !== undefined && (
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#283891",
                color: "white",
                fontSize: 12,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {rank}
            </div>
          )}

          {/* Phase pill */}
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#283891",
              background: "#EEF1FA",
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.02em",
            }}
          >
            {PHASE_LABELS[opportunity.phase]}
          </span>
        </div>

        {/* Classification badge */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: classConfig.color,
            background: classConfig.bg,
            padding: "4px 10px",
            borderRadius: 20,
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          {classConfig.label}
        </span>
      </div>

      {/* Opportunity name */}
      <h3
        style={{
          margin: "0 0 6px",
          fontSize: 16,
          fontWeight: 800,
          color: "#1A1A2E",
          lineHeight: 1.3,
        }}
      >
        {opportunity.name}
      </h3>

      {/* Description - 3 line clamp */}
      <p
        style={{
          margin: "0 0 14px",
          fontSize: 14,
          color: "#7B7B7B",
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        } as React.CSSProperties}
      >
        {opportunity.description}
      </p>

      {/* Impact row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          marginBottom: opportunity.toolsInvolved.length > 0 || opportunity.hasHumanGate ? 10 : 0,
        }}
      >
        {/* Lightbulb icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          style={{ flexShrink: 0, marginTop: 1 }}
        >
          <path
            d="M10 2a6 6 0 0 1 4.472 10.122c-.527.527-.972 1.13-1.2 1.878H6.728c-.228-.748-.673-1.35-1.2-1.878A6 6 0 0 1 10 2Z"
            stroke="#0D9668"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M7.5 17.5h5M8.5 15h3"
            stroke="#0D9668"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span style={{ fontSize: 13, color: "#0D7A55", fontWeight: 500, lineHeight: 1.4 }}>
          {opportunity.estimatedImpact}
        </span>
      </div>

      {/* Tools row */}
      {opportunity.toolsInvolved.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: opportunity.hasHumanGate ? 10 : 0,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 12, color: "#7B7B7B" }}>Works with:</span>
          {opportunity.toolsInvolved.map((tool) => (
            <span
              key={tool}
              style={{
                fontSize: 12,
                color: "#283891",
                background: "#EEF1FA",
                padding: "2px 8px",
                borderRadius: 12,
                fontWeight: 500,
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {/* Human gate badge */}
      {opportunity.hasHumanGate && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L3 6v5c0 4.418 2.986 8.164 7 9 4.014-.836 7-4.582 7-9V6L10 2Z"
              stroke="#7B7B7B"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <span style={{ fontSize: 12, color: "#7B7B7B", fontStyle: "italic" }}>
            Human approval gates included
          </span>
        </div>
      )}
    </motion.div>
  );
}
