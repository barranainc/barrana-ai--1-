import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Animated counter helper
function AnimatedCounter({
  from,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
  style,
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [duration, from, mv, to]);

  return (
    <motion.span className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {rounded}
    </motion.span>
  );
}

// Lead icon (person silhouette SVG)
function LeadIcon({ color = "#283891" }: { color?: string }) {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <circle cx="10" cy="7" r="5" fill={color} />
      <path d="M2 23c0-4.418 3.582-8 8-8s8 3.582 8 8" fill={color} />
    </svg>
  );
}

// Clock positions for leads arranged in a semicircle on the right
const LEAD_POSITIONS = [
  { x: 172, y: 72, disappearAt: 0.08 },   // top right ~2 o'clock
  { x: 196, y: 110, disappearAt: 0.25 },  // right ~3 o'clock
  { x: 188, y: 154, disappearAt: 0.5 },   // lower right ~4:30
  { x: 160, y: 186, disappearAt: 0.75 },  // bottom right ~5:30
  { x: 124, y: 200, disappearAt: 0.75 },  // bottom ~6 o'clock
];

const GOOD_LEAD = { x: 80, y: 78 }; // top left ~11 o'clock, 90sec position

const LABELS: Record<number, string> = {
  0: "5 min: −21% contact",
  1: "30 min: −80% contact",
};

export default function LeadResponseHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const [phase, setPhase] = useState(reduced ? 99 : 0);
  const animRef = useRef<{ stop?: () => void }>({});

  // SVG clock center
  const cx = 128;
  const cy = 140;
  const r = 80;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      setPhase(99);
      return;
    }

    let cancelled = false;

    const runLoop = () => {
      if (cancelled) return;
      setProgress(0);
      setPhase(0);

      const controls = animate(0, 1, {
        duration: 6,
        ease: "linear",
        onUpdate: (v) => {
          if (cancelled) return;
          setProgress(v);
          // Update phase based on sweep
          if (v >= 0.75) setPhase(4);
          else if (v >= 0.5) setPhase(3);
          else if (v >= 0.25) setPhase(2);
          else if (v >= 0.08) setPhase(1);
        },
        onComplete: () => {
          if (!cancelled) {
            setTimeout(runLoop, 1200);
          }
        },
      });
      animRef.current.stop = controls.stop;
    };

    runLoop();

    return () => {
      cancelled = true;
      animRef.current.stop?.();
    };
  }, [reduced]);

  // strokeDashoffset: 0 = full circle drawn, circumference = none drawn
  const dashOffset = circumference * (1 - progress);

  const getLeadOpacity = (disappearAt: number) =>
    progress >= disappearAt ? 0 : 1;
  const getLeadScale = (disappearAt: number) =>
    progress >= disappearAt ? 0 : 1;

  return (
    <div
      role="img"
      aria-label="Clock showing leads disappearing over time - at 5 minutes 21% contact rate loss, at 30 minutes 80% loss. One lead glows green at 90 seconds - the automated response window."
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
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#EF4444", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          The Cost of Slow Response
        </span>
      </div>

      {/* SVG Clock */}
      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
        <svg width="256" height="230" viewBox="0 0 256 230" style={{ overflow: "visible" }}>
          {/* Clock face background */}
          <circle cx={cx} cy={cy} r={r + 4} fill="#F8F9FF" stroke="#E8ECF5" strokeWidth={1} />

          {/* Sweeping arc (progress indicator) */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#EF4444"
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "none" }}
          />

          {/* Background arc track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#E8ECF5"
            strokeWidth={10}
            style={{ opacity: 0.5 }}
          />

          {/* Good lead marker (90 sec position ≈ 2% of arc) */}
          <g transform={`translate(${GOOD_LEAD.x - 10}, ${GOOD_LEAD.y - 12})`}>
            {/* Glow effect */}
            <circle cx={10} cy={8} r={14} fill="#10B981" opacity={0.15} />
            <LeadIcon color="#10B981" />
          </g>
          <text
            x={GOOD_LEAD.x - 2}
            y={GOOD_LEAD.y - 18}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#10B981"
          >
            ✓ 90 sec
          </text>

          {/* 5 lead icons that disappear */}
          {LEAD_POSITIONS.map((pos, i) => (
            <g key={i}>
              <motion.g
                transform={`translate(${pos.x - 10}, ${pos.y - 12})`}
                animate={{
                  opacity: getLeadOpacity(pos.disappearAt),
                  scale: getLeadScale(pos.disappearAt),
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                transition={{ duration: 0.3 }}
              >
                <LeadIcon color="#EF4444" />
              </motion.g>
              {/* Label for first 2 leads */}
              {i in LABELS && (
                <motion.text
                  x={pos.x + 18}
                  y={pos.y + 4}
                  fontSize="9"
                  fontWeight="600"
                  fill="#EF4444"
                  animate={{ opacity: progress >= pos.disappearAt && progress < pos.disappearAt + 0.2 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {LABELS[i]}
                </motion.text>
              )}
            </g>
          ))}

          {/* Center time label */}
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="#6B7280">
            Response
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fontWeight="700" fill="#283891">
            Timer
          </text>

          {/* Time labels around clock */}
          <text x={cx} y={cy - r - 14} textAnchor="middle" fontSize="9" fill="#9CA3AF">12</text>
          <text x={cx + r + 14} y={cy + 4} textAnchor="middle" fontSize="9" fill="#9CA3AF">3</text>
          <text x={cx} y={cy + r + 18} textAnchor="middle" fontSize="9" fill="#9CA3AF">6</text>
          <text x={cx - r - 14} y={cy + 4} textAnchor="middle" fontSize="9" fill="#9CA3AF">9</text>
        </svg>
      </div>

      {/* Bottom counters */}
      <div style={{ textAlign: "center", marginTop: "-0.5rem" }}>
        <div style={{ fontSize: "0.875rem", color: "#374151", marginBottom: "0.25rem" }}>
          Leads lost today:{" "}
          {reduced ? (
            <span style={{ fontWeight: 700, color: "#EF4444", fontVariantNumeric: "tabular-nums" }}>8</span>
          ) : (
            <AnimatedCounter
              from={0}
              to={8}
              duration={4}
              style={{ fontWeight: 700, color: "#EF4444" }}
            />
          )}
        </div>
        <div style={{ fontSize: "0.875rem", color: "#D97706", fontWeight: 700 }}>
          Est. value:{" "}
          {reduced ? (
            <span style={{ fontVariantNumeric: "tabular-nums" }}>$480,000/yr</span>
          ) : (
            <AnimatedCounter
              from={0}
              to={480000}
              duration={4}
              prefix="$"
              suffix="/yr"
              style={{ fontVariantNumeric: "tabular-nums" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
