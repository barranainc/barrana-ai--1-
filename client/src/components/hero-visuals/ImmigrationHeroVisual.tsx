import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function AnimatedCounter({
  from,
  to,
  duration = 1.5,
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

interface DrainItem {
  label: string;
  hours: number;
  fractionOfTotal: number; // out of 40 hours
  color: string;
}

const TOTAL_HOURS = 40;

const DRAINS: DrainItem[] = [
  { label: "Intake processing", hours: 12, fractionOfTotal: 12 / 40, color: "#EF4444" },
  { label: "Document chasing", hours: 8, fractionOfTotal: 8 / 40, color: "#F97316" },
  { label: "Status calls", hours: 4, fractionOfTotal: 4 / 40, color: "#EAB308" },
  { label: "Admin / reporting", hours: 3, fractionOfTotal: 3 / 40, color: "#D97706" },
];

const CONSULTING_HOURS = 13;
const RECOVERED_HOURS = 33;

export default function ImmigrationHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);
  const [drainsSealed, setDrainsSealed] = useState(reduced);
  const [visibleDrains, setVisibleDrains] = useState<boolean[]>(
    reduced ? DRAINS.map(() => true) : DRAINS.map(() => false)
  );

  useEffect(() => {
    if (reduced) {
      setPhase(3);
      setDrainsSealed(true);
      setVisibleDrains(DRAINS.map(() => true));
      return;
    }

    let cancelled = false;

    const run = async () => {
      setPhase(0);
      setDrainsSealed(false);
      setVisibleDrains(DRAINS.map(() => false));

      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;

      // Stagger drain appearances
      for (let i = 0; i < DRAINS.length; i++) {
        await new Promise((r) => setTimeout(r, 600));
        if (cancelled) return;
        setVisibleDrains((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }

      setPhase(1);
      await new Promise((r) => setTimeout(r, 1000));
      if (cancelled) return;
      setPhase(2);
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;

      // Seal drains
      setPhase(3);
      setDrainsSealed(true);
      await new Promise((r) => setTimeout(r, 3000));
      if (cancelled) return;

      // Loop
      await new Promise((r) => setTimeout(r, 1500));
      if (!cancelled) run();
    };

    run();
    return () => { cancelled = true; };
  }, [reduced]);

  const BAR_MAX_WIDTH = 380;
  const ROW_HEIGHT = 32;
  const DRAIN_INDICATOR_HEIGHT = 20;

  // Calculate remaining hours after each visible drain
  const totalDrained = DRAINS.reduce((acc, d, i) => acc + (visibleDrains[i] ? d.hours : 0), 0);
  const remainingHours = TOTAL_HOURS - (drainsSealed ? 0 : totalDrained);
  const displayHours = drainsSealed ? RECOVERED_HOURS : remainingHours < 0 ? 0 : remainingHours;

  return (
    <div
      role="img"
      aria-label="Waterfall chart showing a 40-hour consultant week. 27 hours drain away to intake, document chasing, status calls, and admin. Only 13 hours remain for actual consulting work. Then automation seals the drains and recovers 20 hours."
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
          Where Your Consultant Hours Go
        </span>
      </div>

      {/* Full bar at top */}
      <div style={{ marginBottom: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#283891" }}>Available capacity</span>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#283891", fontVariantNumeric: "tabular-nums" }}>
            40 hrs / week
          </span>
        </div>
        <div style={{ height: `${ROW_HEIGHT}px`, borderRadius: "5px", background: "#E0E4F5", position: "relative", overflow: "hidden" }}>
          <motion.div
            style={{
              height: "100%",
              background: drainsSealed ? "#00B4D8" : "#283891",
              borderRadius: "5px",
              transition: "background 0.5s ease",
            }}
            animate={{ width: `${(displayHours / TOTAL_HOURS) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingLeft: "8px" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "white" }}>
              {drainsSealed ? `${RECOVERED_HOURS} hrs freed for billable work` : `${Math.max(0, TOTAL_HOURS - totalDrained)} hrs remaining`}
            </span>
          </div>
        </div>
      </div>

      {/* Drain rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", margin: "6px 0" }}>
        {DRAINS.map((drain, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={visibleDrains[i] ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {/* Drain arrow */}
              <div style={{ fontSize: "10px", color: drainsSealed ? "#10B981" : drain.color, fontWeight: 700, width: "12px", textAlign: "center" }}>
                {drainsSealed ? "↑" : "↓"}
              </div>
              {/* Bar */}
              <div style={{ flex: 1, height: `${DRAIN_INDICATOR_HEIGHT}px`, background: "#F3F4F6", borderRadius: "4px", overflow: "hidden", position: "relative" }}>
                <motion.div
                  style={{
                    height: "100%",
                    background: drainsSealed ? "#10B981" : drain.color,
                    transition: "background 0.5s ease",
                    borderRadius: "4px",
                    opacity: 0.8,
                  }}
                  animate={{ width: `${drain.fractionOfTotal * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingLeft: "6px" }}>
                  <span style={{ fontSize: "8px", color: "white", fontWeight: 600 }}>{drain.label}</span>
                </div>
              </div>
              {/* Hours */}
              <span style={{
                fontSize: "9px",
                fontWeight: 700,
                color: drainsSealed ? "#10B981" : drain.color,
                fontVariantNumeric: "tabular-nums",
                width: "36px",
                textAlign: "right",
                transition: "color 0.5s ease",
              }}>
                {drainsSealed ? `+${drain.hours}h` : `−${drain.hours}h`}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Result bar */}
      {phase >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: "4px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: drainsSealed ? "#00B4D8" : "#10B981" }}>
              {drainsSealed ? "With automation" : "For actual consulting"}
            </span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: drainsSealed ? "#00B4D8" : "#10B981", fontVariantNumeric: "tabular-nums" }}>
              {drainsSealed ? `${RECOVERED_HOURS} hrs` : `${CONSULTING_HOURS} hrs`}
            </span>
          </div>
          <div style={{ height: `${ROW_HEIGHT}px`, borderRadius: "5px", background: "#F0FDF4", border: `1.5px solid ${drainsSealed ? "#00B4D8" : "#A7F3D0"}`, overflow: "hidden", position: "relative" }}>
            <motion.div
              style={{
                height: "100%",
                background: drainsSealed ? "#00B4D8" : "#10B981",
                borderRadius: "5px",
                transition: "background 0.5s ease",
              }}
              animate={{ width: drainsSealed ? `${(RECOVERED_HOURS / TOTAL_HOURS) * 100}%` : `${(CONSULTING_HOURS / TOTAL_HOURS) * 100}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* Bottom message */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            marginTop: "0.625rem",
            padding: "0.375rem 0.5rem",
            background: "#FFF5F5",
            borderRadius: "8px",
            border: "1px solid #FECACA",
          }}
        >
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#7E0F4A" }}>
            68% of consultant time requires zero immigration expertise
          </span>
        </motion.div>
      )}
    </div>
  );
}
