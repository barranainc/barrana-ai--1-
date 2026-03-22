import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function AnimatedCounter({
  from,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  style,
}: {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}) {
  const mv = useMotionValue(from);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  useEffect(() => {
    const c = animate(mv, to, { duration, ease: "easeOut" });
    return c.stop;
  }, [duration, from, mv, to]);
  return <motion.span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{display}</motion.span>;
}

function FlameIcon({ flicker }: { flicker: boolean }) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <motion.path
        d="M8 0 C8 0 12 5 10 9 C10 9 13 7 12 12 C12 12 14 11 14 14 C14 17.5 11 20 8 20 C5 20 2 17.5 2 14 C2 11 4 12 4 12 C3 7 6 9 6 9 C4 5 8 0 8 0Z"
        fill="#EF4444"
        animate={flicker ? { scaleY: [1, 1.1, 0.95, 1.05, 1], opacity: [1, 0.9, 1, 0.85, 1] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "8px 20px" }}
      />
      <motion.ellipse
        cx={8} cy={15} rx={3} ry={2}
        fill="#D97706"
        animate={flicker ? { opacity: [0.8, 1, 0.7, 1, 0.8] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

const HOUR_BLOCKS = [
  { hour: 1, label: "Intake processing", type: "waste" as const },
  { hour: 2, label: "Document chasing + status calls", type: "waste" as const },
  { hour: 3, label: "Billable: Client Work", type: "billable" as const },
  { hour: 4, label: "Billable: Client Work", type: "billable" as const },
  { hour: 5, label: "Billable: Client Work", type: "billable" as const },
  { hour: 6, label: "Billable: Client Work", type: "billable" as const },
  { hour: 7, label: "Billable: Client Work", type: "billable" as const },
  { hour: 8, label: "Billable: Client Work", type: "billable" as const },
];

export default function LawFirmsHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) { setPhase(1); return; }
    const t = setTimeout(() => setPhase(1), 3000);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div
      role="img"
      aria-label="8-hour workday showing first 2 hours burning as non-billable admin work at $350 per hour, totaling $700 per day or $182,000 per year per lawyer. Then automation eliminates the waste and those hours become billable."
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
          The Billable Hour Burn
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
        {/* Hour blocks */}
        <div style={{ flex: 1 }}>
          {HOUR_BLOCKS.map((block, i) => {
            const isWaste = block.type === "waste";
            const automated = phase === 1 && isWaste;
            return (
              <motion.div
                key={i}
                animate={{
                  height: automated ? "12px" : "34px",
                  background: automated
                    ? "#E5E7EB"
                    : isWaste
                    ? "#FEE2E2"
                    : "#D1FAE5",
                }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeInOut" }}
                style={{
                  borderRadius: "6px",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  animate={{ opacity: automated ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: 0 }}
                >
                  {isWaste && !automated && <FlameIcon flicker={!reduced} />}
                  {!isWaste && (
                    <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
                      <circle cx={6} cy={6} r={5} fill="#10B981" opacity={0.3} />
                      <path d="M3 6 L5.5 8.5 L9 4" stroke="#10B981" strokeWidth={1.5} strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  <span style={{
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    color: isWaste ? "#EF4444" : "#065F46",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    Hr {block.hour}: {block.label}
                  </span>
                </motion.div>
                {automated && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: "0.55rem", color: "#6B7280", fontWeight: 600, paddingLeft: "4px" }}
                  >
                    Automated
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right side counters */}
        <div style={{ flexShrink: 0, width: "130px", paddingTop: "4px" }}>
          <div style={{
            background: phase === 0 ? "#FEF2F2" : "#F0FDF4",
            borderRadius: "8px",
            padding: "0.5rem",
            border: `1px solid ${phase === 0 ? "#FECACA" : "#BBF7D0"}`,
          }}>
            <div style={{ fontSize: "0.6rem", color: "#6B7280", marginBottom: "4px", fontWeight: 600 }}>
              Non-billable:
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: phase === 0 ? "#EF4444" : "#10B981", marginBottom: "4px" }}>
              {phase === 0 ? "2 hrs / day" : "0 hrs / day"}
            </div>
            <div style={{ fontSize: "0.6rem", color: "#374151", marginBottom: "2px" }}>
              @ $350/hr =
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: phase === 0 ? "#EF4444" : "#10B981", marginBottom: "6px" }}>
              {phase === 0 ? "$700 / day" : "$0 / day"}
            </div>
            <div style={{ borderTop: `1px solid ${phase === 0 ? "#FECACA" : "#BBF7D0"}`, paddingTop: "6px" }}>
              <div style={{ fontSize: "0.6rem", color: "#6B7280", marginBottom: "2px" }}>Per lawyer, per year:</div>
              <div style={{
                fontSize: phase === 0 ? "1.1rem" : "0.9rem",
                fontWeight: 900,
                color: phase === 0 ? "#EF4444" : "#10B981",
              }}>
                {phase === 0 ? "$182,000" : "$0 lost"}
              </div>
            </div>
          </div>

          {phase === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: "0.5rem",
                background: "#EFF6FF",
                borderRadius: "6px",
                padding: "0.4rem",
                fontSize: "0.6rem",
                color: "#283891",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              +2 billable hrs<br />recovered / day
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
