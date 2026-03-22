import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [duration, from, mv, to]);

  return (
    <motion.span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {rounded}
    </motion.span>
  );
}

// Simple person/lead silhouette
function PersonIcon({ color = "#374151", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 14 18" fill="none">
      <circle cx="7" cy="5" r="4" fill={color} />
      <path d="M1 17c0-3.314 2.686-6 6-6s6 2.686 6 6" fill={color} />
    </svg>
  );
}

interface TimeSegment {
  label: string;
  start: number; // 0-24
  end: number;   // 0-24
  type: "active" | "closed" | "asleep";
  leads: Array<{ x: number; value: string; delay: number }>;
}

const SEGMENTS: TimeSegment[] = [
  {
    label: "On the Job",
    start: 7,
    end: 17,
    type: "active",
    leads: [
      { x: 25, value: "", delay: 0 },
      { x: 45, value: "", delay: 0.3 },
      { x: 65, value: "", delay: 0.6 },
    ],
  },
  {
    label: "Office Closed",
    start: 17,
    end: 22,
    type: "closed",
    leads: [
      { x: 15, value: "$8K", delay: 0.2 },
      { x: 50, value: "$15K", delay: 0.7 },
      { x: 82, value: "$12K", delay: 1.1 },
    ],
  },
  {
    label: "Asleep",
    start: 22,
    end: 31, // wraps to 7am
    type: "asleep",
    leads: [
      { x: 20, value: "$20K", delay: 0.4 },
      { x: 65, value: "$6K", delay: 0.9 },
    ],
  },
];

// Calculate segment width as proportion of 24 hours
const TOTAL_SPAN = 24; // hours shown

function getSegmentWidth(seg: TimeSegment): number {
  const span = seg.end > 24 ? (seg.end - 24) + (24 - seg.start) : seg.end - seg.start;
  return span / TOTAL_SPAN;
}

export default function ContractorsHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);
  const [floatingDollars, setFloatingDollars] = useState<boolean>(reduced);

  useEffect(() => {
    if (reduced) {
      setPhase(3);
      setFloatingDollars(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setPhase(0);
      setFloatingDollars(false);

      await new Promise((r) => setTimeout(r, 1200));
      if (cancelled) return;
      setPhase(1);

      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;
      setFloatingDollars(true);
      setPhase(2);

      await new Promise((r) => setTimeout(r, 1800));
      if (cancelled) return;
      setPhase(3);

      await new Promise((r) => setTimeout(r, 4000));
      if (!cancelled) run();
    };

    run();
    return () => { cancelled = true; };
  }, [reduced]);

  const TIMELINE_HEIGHT_ACTIVE = 40;
  const TIMELINE_HEIGHT_CLOSED = 68;
  const TIMELINE_HEIGHT_ASLEEP = 56;

  const getHeight = (type: TimeSegment["type"]) => {
    if (type === "active") return TIMELINE_HEIGHT_ACTIVE;
    if (type === "closed") return TIMELINE_HEIGHT_CLOSED;
    return TIMELINE_HEIGHT_ASLEEP;
  };

  const getColor = (type: TimeSegment["type"]) => {
    if (type === "active") return "#6B7280";
    if (type === "closed") return "#EF4444";
    return "#7E0F4A";
  };

  const getBgColor = (type: TimeSegment["type"]) => {
    if (type === "active") return "#F3F4F6";
    if (type === "closed") return "#FFF5F5";
    return "#FDF2F8";
  };

  return (
    <div
      role="img"
      aria-label="24-hour timeline showing contractor lead flow. Daytime leads partially answered. Evening and overnight leads all receive red X marks as they go unanswered. Dollar amounts shown for each missed lead. Total estimated overnight revenue loss displayed."
      className={className}
      style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(40,56,145,0.10)",
        padding: "1.25rem",
        maxWidth: "500px",
        minHeight: "320px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#EF4444", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          After-Hours Lead Graveyard
        </span>
      </div>

      {/* Hour labels */}
      <div style={{ display: "flex", marginBottom: "4px" }}>
        {["7am", "12pm", "5pm", "10pm", "7am"].map((t, i) => (
          <div key={i} style={{ flex: i === 4 ? "0 0 auto" : 1, fontSize: "9px", color: "#9CA3AF" }}>
            {t}
          </div>
        ))}
      </div>

      {/* Timeline segments */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}>
        {SEGMENTS.map((seg, si) => {
          const widthPct = getSegmentWidth(seg) * 100;
          const h = getHeight(seg.type);
          const bg = getBgColor(seg.type);
          const borderColor = getColor(seg.type);

          return (
            <motion.div
              key={si}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: si * 0.25, ease: "easeOut" }}
              style={{
                flex: `0 0 ${widthPct}%`,
                height: `${h}px`,
                background: bg,
                border: `1.5px solid ${borderColor}`,
                borderRadius: "6px",
                position: "relative",
                overflow: "visible",
                transformOrigin: "bottom center",
              }}
            >
              {/* Segment label */}
              <div style={{
                position: "absolute",
                bottom: "4px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "7px",
                fontWeight: 700,
                color: borderColor,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}>
                {seg.label}
              </div>

              {/* Lead icons */}
              {seg.leads.map((lead, li) => (
                <div
                  key={li}
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: `${lead.x}%`,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1px",
                  }}
                >
                  <PersonIcon
                    color={seg.type === "active" ? "#10B981" : "#EF4444"}
                    size={11}
                  />
                  {seg.type === "active" ? (
                    <span style={{ fontSize: "8px", color: "#10B981", fontWeight: 700 }}>✓</span>
                  ) : (
                    <span style={{ fontSize: "8px", color: "#EF4444", fontWeight: 700 }}>✗</span>
                  )}

                  {/* Floating dollar amount */}
                  {seg.type !== "active" && lead.value && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={floatingDollars
                        ? { opacity: [0, 1, 1, 0], y: [0, -16, -20, -24] }
                        : { opacity: 0, y: 0 }
                      }
                      transition={{
                        duration: 2.5,
                        delay: lead.delay,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        top: "-4px",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "#EF4444",
                        fontVariantNumeric: "tabular-nums",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {lead.value}
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Counter section */}
      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: "0.875rem",
            padding: "0.75rem",
            background: "#FFF5F5",
            borderRadius: "10px",
            border: "1.5px solid #FECACA",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "#374151", marginBottom: "3px" }}>
            Revenue lost last night:
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#EF4444" }}>
            <AnimatedCounter from={0} to={35000} duration={2} prefix="$" suffix="" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ fontSize: "0.7rem", color: "#7E0F4A", fontWeight: 600, marginTop: "4px" }}
          >
            Your leads don't have business hours.
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
