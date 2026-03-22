import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StepItem {
  icon: string;
  label: string;
  minutes: number;
}

const STEPS: StepItem[] = [
  { icon: "📞", label: "Phone call", minutes: 8 },
  { icon: "⌨️", label: "Data entry", minutes: 12 },
  { icon: "📁", label: "CRM entry", minutes: 10 },
  { icon: "📅", label: "Calendar", minutes: 15 },
];

// Sand hourglass SVG
function HourglassIcon() {
  return (
    <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
      {/* Top glass */}
      <path d="M4 4h32L20 28 4 4z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      {/* Bottom glass */}
      <path d="M4 52h32L20 28 4 52z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      {/* Top/bottom bars */}
      <rect x="2" y="1" width="36" height="5" rx="2" fill="#EF4444" />
      <rect x="2" y="50" width="36" height="5" rx="2" fill="#EF4444" />
      {/* Animated sand drop */}
      <motion.circle
        cx="20"
        cy="22"
        r="2"
        fill="#EF4444"
        animate={{ cy: [22, 34, 22], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn" }}
      />
      <motion.circle
        cx="20"
        cy="26"
        r="1.5"
        fill="#EF4444"
        opacity={0.6}
        animate={{ cy: [26, 36, 26], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn", delay: 0.3 }}
      />
    </svg>
  );
}

// Lightning bolt icon
function LightningIcon() {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
      <path d="M18 2L4 22h10l-4 16L26 18h-10L18 2z" fill="#10B981" stroke="#059669" strokeWidth="1" />
    </svg>
  );
}

export default function ClientIntakeHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [stepsVisible, setStepsVisible] = useState<boolean[]>(
    reduced ? STEPS.map(() => true) : STEPS.map(() => false)
  );
  const [rightVisible, setRightVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setStepsVisible(STEPS.map(() => true));
      setRightVisible(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setStepsVisible(STEPS.map(() => false));
      setRightVisible(false);

      // Stagger left steps at 200ms each
      for (let i = 0; i < STEPS.length; i++) {
        await new Promise((r) => setTimeout(r, 250));
        if (cancelled) return;
        setStepsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }

      // Show right column
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;
      setRightVisible(true);

      // Pause then loop
      await new Promise((r) => setTimeout(r, 5000));
      if (!cancelled) run();
    };

    run();
    return () => { cancelled = true; };
  }, [reduced]);

  return (
    <div
      role="img"
      aria-label="Side-by-side comparison: current 45-minute manual intake process on the left taking 70% of space, versus 5-minute automated process on the right taking 30% of space. The size difference shows the time reduction."
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
      {/* Main columns */}
      <div style={{ display: "flex", gap: "8px", height: "240px" }}>
        {/* LEFT: Manual (70% width) */}
        <div
          style={{
            flex: "0 0 67%",
            background: "#FFF5F5",
            borderRadius: "10px",
            padding: "0.75rem",
            display: "flex",
            flexDirection: "column",
            border: "1.5px solid #FECACA",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "0.375rem" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#EF4444", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Current Process
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#EF4444", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              45 min
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center", marginBottom: "0.375rem" }}>
            <HourglassIcon />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, overflowY: "hidden" }}>
            {STEPS.map((step, i) => (
              <div key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={stepsVisible[i] ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "white",
                    borderRadius: "5px",
                    padding: "3px 6px",
                    border: "1px solid #FECACA",
                  }}
                >
                  <span style={{ fontSize: "11px" }}>{step.icon}</span>
                  <span style={{ fontSize: "9px", color: "#374151", flex: 1 }}>{step.label}</span>
                  <span style={{ fontSize: "9px", fontWeight: 600, color: "#EF4444", fontVariantNumeric: "tabular-nums" }}>
                    {step.minutes}m
                  </span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div style={{ textAlign: "center", fontSize: "8px", color: "#9CA3AF", padding: "1px 0" }}>
                    ⏸ wait...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Automated (30% width) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={rightVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            flex: "0 0 30%",
            background: "#F0FDF4",
            borderRadius: "10px",
            padding: "0.75rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1.5px solid #A7F3D0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "0.375rem" }}>
            <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Automated
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#10B981", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              4:47
            </div>
          </div>

          <LightningIcon />

          <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%", marginTop: "6px" }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.15, delay: rightVisible ? i * 0.05 : 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  background: "white",
                  borderRadius: "4px",
                  padding: "2px 4px",
                  border: "1px solid #A7F3D0",
                }}
              >
                <span style={{ fontSize: "9px" }}>{step.icon}</span>
                <span style={{ fontSize: "7px", color: "#374151" }}>✓</span>
              </motion.div>
            ))}
          </div>

          <div style={{ fontSize: "7px", color: "#10B981", fontWeight: 600, marginTop: "4px", textAlign: "center" }}>
            All at once
          </div>
        </motion.div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          textAlign: "center",
          marginTop: "0.625rem",
          padding: "0.5rem",
          background: "#F8F9FF",
          borderRadius: "8px",
          border: "1px solid #E0E4F5",
        }}
      >
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#283891" }}>
          The same intake.{" "}
          <span style={{ color: "#10B981" }}>90% less time.</span>
        </span>
      </div>
    </div>
  );
}
