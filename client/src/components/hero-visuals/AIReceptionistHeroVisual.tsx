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

// Phone icon
function PhoneIcon({ size = 16, color = "#6B7280" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 2h2.5l1 3L5 6.5c.9 1.8 2.2 3.1 4 4l1.5-1.5 3 1V13c0 .6-.4 1-1 1C6 14 2 10 2 3c0-.6.4-1 1-1z"
        fill={color}
      />
    </svg>
  );
}

// Voicemail icon
function VoicemailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="4" cy="8" r="3" stroke="#EF4444" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="3" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="4" y1="11" x2="12" y2="11" stroke="#EF4444" strokeWidth="1.5" />
    </svg>
  );
}

const HOURS = [
  { label: "9am", start: 0 },
  { label: "12pm", start: 3 / 12 },
  { label: "3pm", start: 6 / 12 },
  { label: "6pm", start: 9 / 12 },
  { label: "9pm", start: 1 },
];

// Segments of the 12-hour timeline
const SEGMENTS = [
  { start: 0, end: 3 / 12, color: "#10B981", label: "Answered ✓", type: "answered" },
  { start: 3 / 12, end: 4 / 12, color: "#D97706", label: "Voicemail", type: "partial" },
  { start: 4 / 12, end: 8 / 12, color: "#10B981", label: "", type: "mixed" },
  { start: 8 / 12, end: 1, color: "#EF4444", label: "No Coverage", type: "missed" },
];

const DOLLAR_AMOUNTS = ["$350", "$800", "$1,200"];

export default function AIReceptionistHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);
  const [showOverlay, setShowOverlay] = useState(reduced);
  const [dollarVisible, setDollarVisible] = useState<boolean[]>(reduced ? [false, false, false] : [false, false, false]);

  useEffect(() => {
    if (reduced) {
      setPhase(3);
      setShowOverlay(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      // Phase 0: build timeline left to right (2s)
      setPhase(0);
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;

      // Phase 1: show dollar amounts floating (staggered)
      setPhase(1);
      for (let i = 0; i < DOLLAR_AMOUNTS.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        if (cancelled) return;
        setDollarVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }

      // Phase 2: show counter
      setPhase(2);
      await new Promise((r) => setTimeout(r, 1500));
      if (cancelled) return;

      // Phase 3: teal overlay sweeps
      setPhase(3);
      setShowOverlay(true);
      await new Promise((r) => setTimeout(r, 2500));
      if (cancelled) return;

      // Pause then restart
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;
      setShowOverlay(false);
      setDollarVisible([false, false, false]);
      setPhase(0);

      // Loop
      setTimeout(run, 300);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const timelineWidth = 400;
  const timelineHeight = 28;

  return (
    <div
      role="img"
      aria-label="24-hour timeline showing phone coverage gap. Business hours partly covered, 5pm to 9pm all calls missed. Shows estimated daily revenue loss from missed calls. Then AI coverage overlay fills entire timeline green."
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
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#EF4444", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Calls You're Not Answering
        </span>
      </div>

      {/* Timeline label row */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px", paddingLeft: "0", paddingRight: "0" }}>
        {HOURS.map((h) => (
          <span key={h.label} style={{ fontSize: "9px", color: "#9CA3AF", fontWeight: 500 }}>
            {h.label}
          </span>
        ))}
      </div>

      {/* Timeline bar */}
      <div style={{ position: "relative", height: `${timelineHeight}px`, borderRadius: "6px", overflow: "hidden", background: "#F3F4F6" }}>
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: i * 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${seg.start * 100}%`,
              width: `${(seg.end - seg.start) * 100}%`,
              height: "100%",
              background: seg.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "left center",
              opacity: 0.85,
            }}
          >
            {seg.label && (
              <span style={{ fontSize: "8px", fontWeight: 700, color: "white", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                {seg.label}
              </span>
            )}
            {seg.type === "partial" && (
              <VoicemailIcon size={12} />
            )}
            {seg.type === "missed" && (
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0, 1, 2].map((j) => (
                  <VoicemailIcon key={j} size={10} />
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Teal AI overlay */}
        {showOverlay && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#283891",
              transformOrigin: "right center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              borderRadius: "6px",
            }}
          >
            <span style={{ fontSize: "9px", fontWeight: 700, color: "white", letterSpacing: "0.05em" }}>
              With AI: 24/7 Coverage ✓
            </span>
          </motion.div>
        )}
      </div>

      {/* Dollar amounts floating over missed section */}
      <div style={{ position: "relative", height: "40px", marginTop: "2px" }}>
        {DOLLAR_AMOUNTS.map((amt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={dollarVisible[i] ? { opacity: [0, 1, 0], y: -28 } : { opacity: 0, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${68 + i * 10}%`,
              fontSize: "11px",
              fontWeight: 700,
              color: "#EF4444",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {amt}
          </motion.div>
        ))}
      </div>

      {/* Counter section */}
      <div
        style={{
          background: showOverlay ? "#F0FFF4" : "#FFF5F5",
          borderRadius: "10px",
          padding: "0.75rem 1rem",
          marginTop: "0.5rem",
          transition: "background 0.6s ease",
          textAlign: "center",
        }}
      >
        {showOverlay ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#10B981" }}>
              $0 missed - every call answered
            </div>
            <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "2px" }}>
              AI receptionist active 24/7
            </div>
          </motion.div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <PhoneIcon size={16} color="#EF4444" />
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>
                Calls missed today: <strong style={{ color: "#EF4444" }}>7</strong>
              </span>
            </div>
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: "1rem", fontWeight: 700, color: "#EF4444", marginTop: "4px" }}
              >
                =&nbsp;
                <AnimatedCounter from={0} to={2100} duration={1.5} prefix="$" suffix=" potential lost today" />
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Sub-label */}
      <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
        <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
          Based on average service call value of $300
        </span>
      </div>
    </div>
  );
}
