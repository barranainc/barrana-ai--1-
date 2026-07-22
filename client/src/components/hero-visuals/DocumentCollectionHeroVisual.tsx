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

const SPIRAL_STEPS = [
  "Send Request",
  "Wait 3 days",
  "Reminder",
  "Wait 4 days",
  "Call client",
  "Partial docs",
  "Another reminder",
  "Wait again",
];

// Positions for 8 labels around a circle
function getLabelPos(index: number, total: number, cx: number, cy: number, r: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export default function DocumentCollectionHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"spiral" | "collapse" | "clean">(reduced ? "clean" : "spiral");
  const [spiralProgress, setSpiralProgress] = useState(reduced ? 1 : 0);

  // Days / hours counters
  const [daysTo, setDaysTo] = useState(reduced ? 9 : 18);
  const [hoursTo, setHoursTo] = useState(reduced ? 0 : 15);

  useEffect(() => {
    if (reduced) return;

    // Build spiral over 3s
    const mv = useMotionValue(0);
    const c = animate(mv, 1, {
      duration: 3,
      ease: "easeOut",
      onUpdate: (v) => setSpiralProgress(v),
      onComplete: () => {
        // 1s pause, then collapse
        setTimeout(() => {
          setPhase("collapse");
          setTimeout(() => {
            setPhase("clean");
            setDaysTo(9);
            setHoursTo(0);
          }, 600);
        }, 1000);
      },
    });
    return c.stop;
  }, [reduced]);

  const cx = 130;
  const cy = 100;
  const r1 = 50; // inner ring
  const r2 = 75; // outer ring

  // Spiral path: two rings connected
  const spiralCircumference1 = 2 * Math.PI * r1;
  const spiralCircumference2 = 2 * Math.PI * r2;

  return (
    <div
      role="img"
      aria-label="Circular spiral showing the email document chase cycle - send, wait, remind, wait, call, get partial docs, remind again - taking 18 days and 15 staff hours per week. Then collapses into a clean 9-day automated straight line."
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
          The Email Chase Spiral
        </span>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        <svg width="260" height="200" viewBox="0 0 260 200">

          {/* Center document icon */}
          <g transform={`translate(${cx - 12}, ${cy - 16})`}>
            <rect x={2} y={0} width={20} height={26} rx={2} fill="#EFF6FF" stroke="#283891" strokeWidth={1.5} />
            <line x1={6} y1={7} x2={18} y2={7} stroke="#283891" strokeWidth={1} />
            <line x1={6} y1={11} x2={18} y2={11} stroke="#283891" strokeWidth={1} />
            <line x1={6} y1={15} x2={14} y2={15} stroke="#283891" strokeWidth={1} />
          </g>
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize="8" fontWeight="700" fill="#283891">
            {phase === "clean" ? "✓ Complete" : "Complete\nPackage"}
          </text>

          {/* Spiral - inner ring */}
          {phase !== "clean" && (
            <circle
              cx={cx}
              cy={cy}
              r={r1}
              fill="none"
              stroke="#EF4444"
              strokeWidth={2.5}
              strokeDasharray={spiralCircumference1}
              strokeDashoffset={spiralCircumference1 * (1 - Math.min(spiralProgress * 2, 1))}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              opacity={phase === "collapse" ? 0 : 1}
              style={{ transition: phase === "collapse" ? "opacity 0.5s" : "none" }}
            />
          )}

          {/* Spiral - outer ring */}
          {phase !== "clean" && (
            <circle
              cx={cx}
              cy={cy}
              r={r2}
              fill="none"
              stroke="#EF4444"
              strokeWidth={2}
              strokeDasharray={spiralCircumference2}
              strokeDashoffset={spiralCircumference2 * (1 - Math.max(spiralProgress * 2 - 1, 0))}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              opacity={phase === "collapse" ? 0 : 0.6}
              style={{ transition: phase === "collapse" ? "opacity 0.5s" : "none" }}
            />
          )}

          {/* Step labels around outer ring */}
          {phase !== "clean" && SPIRAL_STEPS.map((label, i) => {
            const pos = getLabelPos(i, SPIRAL_STEPS.length, cx, cy, r2 + 22);
            const stepVisible = spiralProgress > i / SPIRAL_STEPS.length;
            return (
              <motion.text
                key={i}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="600"
                fill="#EF4444"
                initial={{ opacity: 0 }}
                animate={{ opacity: stepVisible && phase !== "collapse" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {label}
              </motion.text>
            );
          })}

          {/* Circular arrows on inner ring */}
          {phase !== "clean" && [0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const ax = cx + r1 * Math.cos(rad);
            const ay = cy + r1 * Math.sin(rad);
            const visible = spiralProgress > angle / 360;
            return (
              <motion.text
                key={angle}
                x={ax}
                y={ay + 3}
                textAnchor="middle"
                fontSize="10"
                fill="#EF4444"
                initial={{ opacity: 0 }}
                animate={{ opacity: visible && phase !== "collapse" ? 1 : 0 }}
              >
                ↻
              </motion.text>
            );
          })}

          {/* Clean straight arrow - phase clean */}
          {phase === "clean" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* Arrow line */}
              <line x1={20} y1={cy} x2={240} y2={cy} stroke="#00B4D8" strokeWidth={3} strokeLinecap="round" />
              <polygon points={`230,${cy - 6} 242,${cy} 230,${cy + 6}`} fill="#00B4D8" />

              {/* Step labels above arrow */}
              {["Request", "Portal", "Track", "Remind", "Complete"].map((s, i) => (
                <g key={i}>
                  <circle cx={20 + i * 55} cy={cy} r={5} fill="#00B4D8" />
                  <text x={20 + i * 55} y={cy - 12} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#00B4D8">
                    {s}
                  </text>
                </g>
              ))}
              <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" fontWeight="700" fill="#10B981">
                9 days total
              </text>
            </motion.g>
          )}
        </svg>
      </div>

      {/* Counters */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "0.25rem" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.6rem", color: "#6B7280", fontWeight: 600 }}>Days elapsed</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: daysTo === 9 ? "#10B981" : "#EF4444" }}>
            {reduced ? (
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{daysTo}</span>
            ) : (
              <AnimatedCounter from={phase === "clean" ? 18 : 0} to={daysTo} duration={phase === "clean" ? 1.5 : 3}
                style={{ color: daysTo === 9 ? "#10B981" : "#EF4444" }} />
            )}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.6rem", color: "#6B7280", fontWeight: 600 }}>Staff hrs / wk</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: hoursTo === 0 ? "#10B981" : "#EF4444" }}>
            {reduced ? (
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{hoursTo}</span>
            ) : (
              <AnimatedCounter from={phase === "clean" ? 15 : 0} to={hoursTo} duration={phase === "clean" ? 1.5 : 3}
                style={{ color: hoursTo === 0 ? "#10B981" : "#EF4444" }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
