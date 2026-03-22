import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DrainItem {
  label: string;
  hours: number;
}

interface Props {
  className?: string;
  industry?: string;
  drains?: DrainItem[];
}

const DEFAULT_DRAINS: DrainItem[] = [
  { label: "Client reporting", hours: 8 },
  { label: "Data entry", hours: 6 },
  { label: "Email follow-up", hours: 5 },
  { label: "Admin tasks", hours: 4 },
];

const TOTAL_WEEK_HOURS = 40;

function AnimatedCounter({
  from,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  style,
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
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

export default function TemplateTimeDrainWaterfall({
  className,
  industry = "Professional Services",
  drains = DEFAULT_DRAINS,
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 1 : 0);

  const totalDrainHours = drains.reduce((sum, d) => sum + d.hours, 0);
  const billedHours = TOTAL_WEEK_HOURS - totalDrainHours;
  const drainPct = Math.round((totalDrainHours / TOTAL_WEEK_HOURS) * 100);

  useEffect(() => {
    if (reduced) { setPhase(1); return; }
    const t = setTimeout(() => setPhase(1), 3000);
    return () => clearTimeout(t);
  }, [reduced]);

  // Colors for drain bars
  const DRAIN_COLORS = ["#EF4444", "#F97316", "#D97706", "#EAB308"];

  return (
    <div
      role="img"
      aria-label={`Time drain waterfall for ${industry}. ${totalDrainHours} of 40 weekly hours consumed by admin tasks. After automation, those hours are reclaimed for productive work.`}
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
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {industry} — Weekly Time Drain
        </span>
      </div>

      {/* 40-hour week bar */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontSize: "0.65rem", color: "#6B7280" }}>40-hour work week</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#EF4444" }}>
            {drainPct}% non-billable
          </span>
        </div>
        <div style={{ background: "#F3F4F6", borderRadius: "8px", height: "20px", overflow: "hidden", display: "flex" }}>
          <motion.div
            animate={{ width: phase === 0 ? `${drainPct}%` : "0%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ background: "#EF4444", height: "100%", borderRadius: "8px 0 0 8px" }}
          />
          <motion.div
            animate={{ width: phase === 0 ? `${100 - drainPct}%` : "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ background: "#10B981", height: "100%", flex: 1, borderRadius: phase === 0 ? "0 8px 8px 0" : "8px" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
          <span style={{ fontSize: "0.6rem", color: "#EF4444" }}>
            {phase === 0 ? `${totalDrainHours}h admin` : "0h admin"}
          </span>
          <span style={{ fontSize: "0.6rem", color: "#10B981" }}>
            {phase === 0 ? `${billedHours}h productive` : `${TOTAL_WEEK_HOURS}h productive`}
          </span>
        </div>
      </div>

      {/* Waterfall drain bars */}
      <div style={{ marginBottom: "0.75rem" }}>
        {drains.map((drain, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
              <span style={{ fontSize: "0.65rem", color: "#374151", fontWeight: 500 }}>{drain.label}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: DRAIN_COLORS[i % DRAIN_COLORS.length] }}>
                {phase === 0 ? `${drain.hours}h/wk` : "0h"}
              </span>
            </div>
            <div style={{ background: "#F3F4F6", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
              <motion.div
                animate={{ width: phase === 0 ? `${(drain.hours / TOTAL_WEEK_HOURS) * 100}%` : "0%" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  background: DRAIN_COLORS[i % DRAIN_COLORS.length],
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        textAlign: "center",
        padding: "0.5rem",
        background: phase === 0 ? "#FEF2F2" : "#F0FDF4",
        borderRadius: "8px",
        border: `1px solid ${phase === 0 ? "#FECACA" : "#BBF7D0"}`,
        transition: "background 0.5s, border-color 0.5s",
      }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: phase === 0 ? "#EF4444" : "#10B981" }}>
          {phase === 0 ? (
            <>
              <AnimatedCounter from={0} to={totalDrainHours} duration={2.5} suffix="h" /> wasted on admin per week
            </>
          ) : (
            `${totalDrainHours}h recovered — same team, more output`
          )}
        </div>
      </div>
    </div>
  );
}
