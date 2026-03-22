import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FunnelStage {
  label: string;
  count: number;
  widthPct: number; // 0-100, width as % of container
  color: string;
  dropLabel?: string;
  dropCount?: number;
  dropDollars?: string;
}

const STAGES: FunnelStage[] = [
  {
    label: "80 leads / month",
    count: 80,
    widthPct: 100,
    color: "#283891",
  },
  {
    label: "30 continue",
    count: 30,
    widthPct: 50,
    color: "#2272c8",
    dropLabel: "Slow response →",
    dropCount: 50,
    dropDollars: "−$13,500 commission",
  },
  {
    label: "10 continue",
    count: 10,
    widthPct: 28,
    color: "#1588d8",
    dropLabel: "Follow-up abandoned →",
    dropCount: 20,
    dropDollars: "−$27,000 commission",
  },
  {
    label: "8 shown property",
    count: 8,
    widthPct: 20,
    color: "#00B4D8",
    dropLabel: "No nurture →",
    dropCount: 2,
    dropDollars: "−$5,400 commission",
  },
  {
    label: "4 transactions",
    count: 4,
    widthPct: 12,
    color: "#10B981",
  },
];

const FUNNEL_H = 36;
const FUNNEL_GAP = 2;

export default function RealEstateHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [visibleStages, setVisibleStages] = useState(reduced ? STAGES.length : 0);

  useEffect(() => {
    if (reduced) return;
    // Cascade stages with stagger
    STAGES.forEach((_, i) => {
      const t = setTimeout(() => setVisibleStages(i + 1), i * 500 + 300);
      return () => clearTimeout(t);
    });
  }, [reduced]);

  const containerW = 260;

  return (
    <div
      role="img"
      aria-label="Sales funnel showing 80 monthly leads. 50 drop at slow response stage, 20 more drop from abandoned follow-up. Only 4 leads become transactions. Commission value of dropped leads shown. 76 leads were lost to process failures, not disinterest."
      className={className}
      style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(40,56,145,0.10)",
        padding: "1.5rem",
        maxWidth: "500px",
        minHeight: "320px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          The Abandoned Pipeline
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: `${containerW}px`, position: "relative" }}>
          {STAGES.map((stage, i) => {
            const stageW = (stage.widthPct / 100) * containerW;
            const isVisible = i < visibleStages;
            return (
              <div key={i} style={{ position: "relative", marginBottom: `${FUNNEL_GAP}px` }}>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    width: `${stageW}px`,
                    height: `${FUNNEL_H}px`,
                    background: stage.color,
                    borderRadius: "5px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformOrigin: "center",
                  }}
                >
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "white", textAlign: "center", padding: "0 6px" }}>
                    {stage.label}
                  </span>
                </motion.div>

                {/* Dropout label to the right */}
                {stage.dropLabel && isVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 }}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      textAlign: "right",
                    }}
                  >
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#EF4444" }}>
                      {stage.dropLabel}
                    </div>
                    <div style={{ fontSize: "0.6rem", color: "#D97706", fontWeight: 600 }}>
                      {stage.dropDollars}
                    </div>
                  </motion.div>
                )}

                {/* Connector trapezoid between stages */}
                {i < STAGES.length - 1 && isVisible && i + 1 < visibleStages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      width: "0",
                      height: "0",
                      borderLeft: `${(stageW / 2 - (STAGES[i + 1].widthPct / 100 * containerW) / 2)}px solid transparent`,
                      borderRight: `${(stageW / 2 - (STAGES[i + 1].widthPct / 100 * containerW) / 2)}px solid transparent`,
                      borderTop: `8px solid ${stage.color}`,
                      margin: "0 auto",
                      opacity: 0.5,
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Bottom message */}
          {visibleStages >= STAGES.length && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                textAlign: "center",
                marginTop: "0.75rem",
                padding: "0.5rem",
                background: "#FEF2F2",
                borderRadius: "8px",
                border: "1px solid #FECACA",
              }}
            >
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#EF4444" }}>
                76 leads dropped.
              </div>
              <div style={{ fontSize: "0.6rem", color: "#6B7280", marginTop: "2px" }}>
                Not because they weren't interested.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
