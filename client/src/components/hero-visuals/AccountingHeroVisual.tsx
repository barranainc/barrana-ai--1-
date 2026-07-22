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

// SVG gauge arc helper - returns an SVG path for a semi-circle arc segment
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (a: number) => (a * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export default function AccountingHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  // Phase: 0 = initial high capacity, 1 = after automation
  const [phase, setPhase] = useState(reduced ? 1 : 0);

  // Needle angle: -180deg = 0%, 0deg = 100%, 30deg = 120%
  // Range: -180 to +30 for 0-120%
  // 95% → angle = -180 + (95/120)*210 = -180 + 166.25 = -13.75
  // 80% → angle = -180 + (80/120)*210 = -180 + 140 = -40
  const needleAngleBefore = -13.75;
  const needleAngleAfter = -40;

  const [needleAngle, setNeedleAngle] = useState(reduced ? needleAngleAfter : needleAngleBefore);

  useEffect(() => {
    if (reduced) {
      setPhase(1);
      setNeedleAngle(needleAngleAfter);
      return;
    }
    // After 2.5s show initial state, then after pause animate to phase 1
    const t1 = setTimeout(() => {
      setPhase(1);
      setNeedleAngle(needleAngleAfter);
    }, 2500);
    return () => clearTimeout(t1);
  }, [reduced]);

  const cx = 130;
  const cy = 130;
  const r = 80;

  // Semi-circle arc: 180deg to 360deg (left to right, bottom half up)
  // We draw from -180 to 0 deg (left to right across top)
  const arcLength = Math.PI * r; // half circumference

  // Colors for gauge zones: green 0-70%, yellow 70-90%, red 90-120%
  const greenEnd = -180 + (70 / 120) * 180; // about -75deg
  const yellowEnd = -180 + (90 / 120) * 180; // about -45deg

  // Needle tip coords
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleTipX = cx + (r - 8) * Math.cos(needleRad);
  const needleTipY = cy + (r - 8) * Math.sin(needleRad);

  const bars = phase === 0
    ? [
        { label: "Chasing docs / admin", pct: 45, color: "#EF4444" },
        { label: "Preparation", pct: 40, color: "#10B981" },
        { label: "Available", pct: 15, color: "#D1D5DB" },
      ]
    : [
        { label: "Chasing docs / admin", pct: 12, color: "#EF4444" },
        { label: "Preparation", pct: 68, color: "#10B981" },
        { label: "Available", pct: 20, color: "#D1D5DB" },
      ];

  return (
    <div
      role="img"
      aria-label="Capacity gauge showing tax-season accounting firm at 95% capacity. Admin tasks consuming 45% of time. Then admin shrinks to 12%, preparation grows, and capacity opens to 80% - with 30% room to grow."
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
          Tax Season Capacity
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {/* Gauge SVG */}
        <div style={{ flexShrink: 0 }}>
          <svg width="180" height="120" viewBox="0 0 260 140">
            {/* Track */}
            <path
              d={describeArc(cx, cy, r, -180, 0)}
              fill="none"
              stroke="#F3F4F6"
              strokeWidth={18}
              strokeLinecap="round"
            />
            {/* Green zone 0-70% */}
            <path
              d={describeArc(cx, cy, r, -180, greenEnd)}
              fill="none"
              stroke="#10B981"
              strokeWidth={18}
              strokeLinecap="butt"
              opacity={0.8}
            />
            {/* Yellow zone 70-90% */}
            <path
              d={describeArc(cx, cy, r, greenEnd, yellowEnd)}
              fill="none"
              stroke="#D97706"
              strokeWidth={18}
              strokeLinecap="butt"
              opacity={0.8}
            />
            {/* Red zone 90-120% */}
            <path
              d={describeArc(cx, cy, r, yellowEnd, 0)}
              fill="none"
              stroke="#EF4444"
              strokeWidth={18}
              strokeLinecap="round"
              opacity={0.8}
            />

            {/* Tick labels */}
            <text x={cx - r - 14} y={cy + 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">0%</text>
            <text x={cx} y={cy - r - 10} textAnchor="middle" fontSize="9" fill="#9CA3AF">60%</text>
            <text x={cx + r + 14} y={cy + 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">120%</text>

            {/* Needle */}
            <motion.line
              x1={cx}
              y1={cy}
              x2={needleTipX}
              y2={needleTipY}
              stroke={phase === 0 ? "#EF4444" : "#10B981"}
              strokeWidth={3}
              strokeLinecap="round"
              animate={{ x2: needleTipX, y2: needleTipY, stroke: phase === 0 ? "#EF4444" : "#10B981" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <circle cx={cx} cy={cy} r={6} fill="#374151" />

            {/* Capacity label */}
            <text x={cx} y={cy + 22} textAnchor="middle" fontSize="13" fontWeight="700"
              fill={phase === 0 ? "#EF4444" : "#10B981"}>
              {phase === 0 ? "95%" : "80%"}
            </text>
          </svg>
        </div>

        {/* Bars */}
        <div style={{ flex: 1, paddingTop: "0.25rem" }}>
          {bars.map((bar, i) => (
            <div key={i} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                <span style={{ fontSize: "0.65rem", color: "#6B7280", fontWeight: 500 }}>{bar.label}</span>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: bar.color }}>{bar.pct}%</span>
              </div>
              <div style={{ background: "#F3F4F6", borderRadius: "4px", height: "10px", overflow: "hidden" }}>
                <motion.div
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ height: "100%", background: bar.color, borderRadius: "4px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status label */}
      <motion.div
        animate={{ opacity: 1 }}
        style={{ textAlign: "center", marginTop: "0.5rem" }}
      >
        {phase === 0 ? (
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#EF4444", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            AT CAPACITY - Turning Clients Away
          </span>
        ) : (
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#10B981", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            30% ROOM TO GROW
          </span>
        )}
      </motion.div>
    </div>
  );
}
