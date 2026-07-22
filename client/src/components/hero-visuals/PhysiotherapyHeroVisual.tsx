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
  className,
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  style?: React.CSSProperties;
  className?: string;
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

// Simple chair SVG: 30x40, seat + back
function ChairIcon({ color, noShowLabel }: { color: string; noShowLabel?: boolean }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="28" height="38" viewBox="0 0 28 38" fill="none">
        {/* Chair back */}
        <rect x="4" y="2" width="20" height="16" rx="3" fill={color} />
        {/* Chair seat */}
        <rect x="2" y="20" width="24" height="10" rx="3" fill={color} />
        {/* Chair legs */}
        <rect x="4" y="30" width="4" height="8" rx="1" fill={color} opacity={0.7} />
        <rect x="20" y="30" width="4" height="8" rx="1" fill={color} opacity={0.7} />
        {/* Person silhouette on seat (only if occupied) */}
        {color === "#10B981" && (
          <>
            <circle cx="14" cy="9" r="4" fill="white" opacity={0.9} />
            <path d="M9 18c0-2.761 2.239-5 5-5s5 2.239 5 5" fill="white" opacity={0.7} />
          </>
        )}
        {/* X mark for no-show */}
        {noShowLabel && (
          <g>
            <line x1="8" y1="6" x2="20" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="6" x2="8" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
      {noShowLabel && (
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#EF4444",
            color: "white",
            fontSize: "6px",
            fontWeight: 700,
            padding: "1px 3px",
            borderRadius: "3px",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}
        >
          NO-SHOW
        </motion.div>
      )}
    </div>
  );
}

const TOTAL_CHAIRS = 10;
const NO_SHOW_INDICES = [3, 7]; // which chairs are no-shows (0-indexed)

export default function PhysiotherapyHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 4 : 0);
  const [chairsVisible, setChairsVisible] = useState<boolean[]>(
    reduced ? Array(TOTAL_CHAIRS).fill(true) : Array(TOTAL_CHAIRS).fill(false)
  );
  const [recoveryPhase, setRecoveryPhase] = useState(reduced ? 2 : 0);

  useEffect(() => {
    if (reduced) {
      setPhase(4);
      setChairsVisible(Array(TOTAL_CHAIRS).fill(true));
      setRecoveryPhase(2);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setPhase(0);
      setChairsVisible(Array(TOTAL_CHAIRS).fill(false));
      setRecoveryPhase(0);

      // Stagger chair appearances
      for (let i = 0; i < TOTAL_CHAIRS; i++) {
        await new Promise((r) => setTimeout(r, 100));
        if (cancelled) return;
        setChairsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }

      setPhase(1);
      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;

      setPhase(2);
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      setPhase(3);
      await new Promise((r) => setTimeout(r, 2500));
      if (cancelled) return;

      setPhase(4);
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      // Recovery phase: chairs fill
      setRecoveryPhase(1);
      await new Promise((r) => setTimeout(r, 1200));
      if (cancelled) return;

      setRecoveryPhase(2);
      await new Promise((r) => setTimeout(r, 3000));
      if (cancelled) return;

      // Loop
      await new Promise((r) => setTimeout(r, 1500));
      if (!cancelled) run();
    };

    run();
    return () => { cancelled = true; };
  }, [reduced]);

  const getChairColor = (index: number): string => {
    if (!NO_SHOW_INDICES.includes(index)) return "#10B981";
    // Recovery: no-show chairs turn teal
    if (recoveryPhase >= 1 && index === NO_SHOW_INDICES[0]) return "#00B4D8";
    if (recoveryPhase >= 1 && index === NO_SHOW_INDICES[1]) return "#00B4D8";
    return "#EF4444";
  };

  const isRecovered = (index: number) => recoveryPhase >= 1 && NO_SHOW_INDICES.includes(index);

  return (
    <div
      role="img"
      aria-label="Row of 10 physiotherapy treatment chairs. 8 occupied in green, 2 empty in red labeled No-Show. Revenue counters show daily, weekly, and annual cost of no-shows totaling $41,600 per year. Then empty chairs fill from waitlist and reminder confirmation."
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
          The Cost of Empty Chairs
        </span>
      </div>

      {/* Chair row */}
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {Array.from({ length: TOTAL_CHAIRS }, (_, i) => {
          const isNoShow = NO_SHOW_INDICES.includes(i);
          const color = getChairColor(i);
          const rec = isRecovered(i);

          return (
            <div key={i} style={{ position: "relative" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={chairsVisible[i] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <ChairIcon
                  color={color}
                  noShowLabel={isNoShow && !rec}
                />
              </motion.div>
              {/* Recovery labels */}
              {rec && recoveryPhase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "6px",
                    fontWeight: 700,
                    color: "#00B4D8",
                    whiteSpace: "nowrap",
                    background: "#F0F9FF",
                    padding: "1px 3px",
                    borderRadius: "3px",
                    border: "1px solid #00B4D8",
                  }}
                >
                  {i === NO_SHOW_INDICES[0] ? "Waitlist ✓" : "Confirmed ✓"}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Revenue counters */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: recoveryPhase >= 2 ? "#F0FFF4" : "#FFF5F5",
            borderRadius: "10px",
            padding: "0.75rem",
            border: `1.5px solid ${recoveryPhase >= 2 ? "#A7F3D0" : "#FECACA"}`,
            transition: "background 0.6s ease, border-color 0.6s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <div style={{ fontSize: "0.7rem", color: "#6B7280" }}>
                $80 per slot · 2 empty slots today
              </div>
              <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                Daily:{" "}
                {phase >= 2 && (
                  <AnimatedCounter
                    from={0}
                    to={recoveryPhase >= 2 ? 0 : 160}
                    duration={1.2}
                    prefix="$"
                    style={{ fontWeight: 700, color: recoveryPhase >= 2 ? "#10B981" : "#EF4444" }}
                  />
                )}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                Weekly:{" "}
                {phase >= 3 && (
                  <AnimatedCounter
                    from={0}
                    to={recoveryPhase >= 2 ? 0 : 800}
                    duration={1.4}
                    prefix="$"
                    style={{ fontWeight: 700, color: recoveryPhase >= 2 ? "#10B981" : "#EF4444" }}
                  />
                )}
              </div>
            </div>

            {/* Annual shock number */}
            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: "right" }}
              >
                <div style={{ fontSize: "0.6rem", color: "#6B7280", marginBottom: "2px" }}>Per year</div>
                <div style={{
                  fontSize: recoveryPhase >= 2 ? "1.5rem" : "2rem",
                  fontWeight: 800,
                  color: recoveryPhase >= 2 ? "#10B981" : "#EF4444",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                  transition: "color 0.5s ease, font-size 0.3s ease",
                }}>
                  {recoveryPhase >= 2 ? (
                    <motion.span key="recovered" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      $0 lost
                    </motion.span>
                  ) : (
                    <AnimatedCounter from={0} to={41600} duration={2} prefix="$" />
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {recoveryPhase >= 2 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: "0.7rem", fontWeight: 600, color: "#10B981", textAlign: "center" }}
            >
              Recovered: $41,600 saved - waitlist + reminders active
            </motion.div>
          ) : (
            phase >= 4 && (
              <div style={{ fontSize: "0.65rem", color: "#9CA3AF", textAlign: "center" }}>
                2 no-shows/day · 5 days/week · 52 weeks
              </div>
            )
          )}
        </motion.div>
      )}
    </div>
  );
}
