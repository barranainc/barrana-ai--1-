import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  className?: string;
  currentCapacity?: number;  // default 65
  newCapacity?: number;      // default 120
  unit?: string;             // default "units"
  adminOverhead?: number;    // percent, default 40
}

export default function TemplateScalingCapacityBar({
  className,
  currentCapacity = 65,
  newCapacity = 120,
  unit = "units",
  adminOverhead = 40,
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 1 : 0);

  const capacityGain = Math.round(((newCapacity - currentCapacity) / currentCapacity) * 100);
  const adminFreeHours = Math.round((adminOverhead / 100) * 40);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setPhase(1), 2500);
    return () => clearTimeout(t);
  }, [reduced]);

  // Bar max = newCapacity (scale everything against that)
  const maxVal = newCapacity * 1.1;
  const currentPct = (currentCapacity / maxVal) * 100;
  const adminPct = (adminOverhead / 100) * currentPct;
  const productivePct = currentPct - adminPct;
  const newPct = (newCapacity / maxVal) * 100;

  const tickValues = [0, Math.round(newCapacity * 0.25), Math.round(newCapacity * 0.5), Math.round(newCapacity * 0.75), newCapacity];

  return (
    <div
      role="img"
      aria-label={`Capacity bar showing current ${currentCapacity} ${unit} with ${adminOverhead}% admin overhead. After automation, capacity grows to ${newCapacity} ${unit} — a ${capacityGain}% increase with the same team.`}
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
          Scaling Capacity — Same Team
        </span>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        {/* Current capacity bar */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#374151" }}>Current capacity</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#283891" }}>{currentCapacity} {unit}</span>
          </div>
          <div style={{ background: "#F3F4F6", borderRadius: "6px", height: "28px", overflow: "hidden", position: "relative" }}>
            {/* Productive portion */}
            <motion.div
              animate={{ width: `${productivePct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                background: "#10B981",
                borderRadius: "6px 0 0 6px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "6px",
              }}
            >
              <span style={{ fontSize: "0.55rem", fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>
                Productive
              </span>
            </motion.div>
            {/* Admin overhead portion */}
            <motion.div
              animate={{ width: phase === 1 ? "0%" : `${adminPct}%`, left: `${productivePct}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                height: "100%",
                background: "#EF4444",
                display: "flex",
                alignItems: "center",
                paddingLeft: "6px",
                overflow: "hidden",
              }}
            >
              <span style={{ fontSize: "0.55rem", fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>
                Admin {adminOverhead}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* New capacity bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#374151" }}>With automation</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#283891" }}>
              {phase === 1 ? `${newCapacity} ${unit}` : `${currentCapacity} ${unit}`}
            </span>
          </div>
          <div style={{ background: "#F3F4F6", borderRadius: "6px", height: "28px", overflow: "hidden" }}>
            <motion.div
              animate={{ width: phase === 1 ? `${newPct}%` : `${productivePct}%` }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #283891, #00B4D8)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "8px",
              }}
            >
              <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "white" }}>
                {phase === 1 ? `+${capacityGain}% capacity` : "..."}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scale markers */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", paddingLeft: "0", paddingRight: "0" }}>
        {tickValues.map((v) => (
          <span key={v} style={{ fontSize: "0.55rem", color: "#9CA3AF" }}>{v}</span>
        ))}
      </div>

      {/* Summary stats */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[
          {
            label: "Admin overhead freed",
            value: phase === 1 ? `${adminFreeHours}h/wk` : `${adminFreeHours}h wasted`,
            color: phase === 1 ? "#10B981" : "#EF4444",
          },
          {
            label: "Capacity increase",
            value: `+${capacityGain}%`,
            color: "#283891",
          },
          {
            label: "Team size change",
            value: "0 hires",
            color: "#10B981",
          },
        ].map((stat) => (
          <div key={stat.label} style={{
            flex: 1,
            textAlign: "center",
            padding: "0.4rem",
            background: "#F9FAFB",
            borderRadius: "6px",
            border: "1px solid #E5E7EB",
          }}>
            <div style={{ fontSize: "0.55rem", color: "#6B7280", marginBottom: "2px" }}>{stat.label}</div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Bottom label */}
      {phase === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: "center",
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#283891",
          }}
        >
          Same team. {capacityGain}% more capacity.
        </motion.div>
      )}
    </div>
  );
}
