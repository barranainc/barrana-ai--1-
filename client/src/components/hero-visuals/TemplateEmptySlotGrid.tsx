import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  className?: string;
  totalSlots?: number;
  emptySlots?: number;
  slotValue?: number;
  industry?: string;
}

function SlotIcon({ state }: { state: "filled" | "empty" | "waitlist" }) {
  const colors = {
    filled: "#10B981",
    empty: "#EF4444",
    waitlist: "#00B4D8",
  };
  const color = colors[state];
  return (
    <svg width="36" height="40" viewBox="0 0 36 40">
      {state === "empty" ? (
        <>
          <rect x={2} y={2} width={32} height={36} rx={4} fill="#FEE2E2" stroke="#EF4444" strokeWidth={1.5} strokeDasharray="4 2" />
          <text x={18} y={24} textAnchor="middle" fontSize="14" fill="#EF4444">✕</text>
        </>
      ) : (
        <>
          <rect x={2} y={2} width={32} height={36} rx={4} fill={`${color}20`} stroke={color} strokeWidth={1.5} />
          <circle cx={18} cy={14} r={6} fill={color} />
          <path d="M6 38 C6 30 30 30 30 38" fill={color} />
        </>
      )}
    </svg>
  );
}

export default function TemplateEmptySlotGrid({
  className,
  totalSlots = 10,
  emptySlots = 2,
  slotValue = 120,
  industry = "Healthcare",
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"show" | "filling" | "filled">(reduced ? "filled" : "show");
  const [filledCount, setFilledCount] = useState(reduced ? emptySlots : 0);

  const filledSlots = totalSlots - emptySlots;
  const dailyLoss = emptySlots * slotValue;
  const weeklyLoss = dailyLoss * 5;
  const annualLoss = weeklyLoss * 52;

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => {
      setPhase("filling");
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setFilledCount(count);
        if (count >= emptySlots) {
          clearInterval(interval);
          setPhase("filled");
        }
      }, 400);
    }, 2500);
    return () => clearTimeout(t1);
  }, [reduced, emptySlots]);

  return (
    <div
      role="img"
      aria-label={`Appointment slot grid for ${industry}. ${emptySlots} of ${totalSlots} slots are empty, representing $${annualLoss.toLocaleString()} in annual lost revenue. Waitlist patients fill the empty slots.`}
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
          {industry} - Appointment Slots
        </span>
      </div>

      {/* Slot row */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap", marginBottom: "1rem" }}>
        {Array.from({ length: totalSlots }).map((_, i) => {
          const isEmptySlot = i >= filledSlots;
          const filledFromWaitlist = isEmptySlot && i < filledSlots + filledCount;
          const state: "filled" | "empty" | "waitlist" = filledFromWaitlist
            ? "waitlist"
            : isEmptySlot
            ? "empty"
            : "filled";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <SlotIcon state={state} />
              <div style={{ fontSize: "0.55rem", textAlign: "center", color: "#6B7280", marginTop: "2px" }}>
                {i + 1}:00
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "0.75rem" }}>
        {[
          { color: "#10B981", label: `Filled (${filledSlots})` },
          { color: "#EF4444", label: `Empty (${emptySlots - filledCount})` },
          { color: "#00B4D8", label: `Waitlist (${filledCount})` },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
            <span style={{ fontSize: "0.6rem", color: "#6B7280" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Loss counters */}
      <div style={{
        background: phase === "filled" ? "#F0FDF4" : "#FEF2F2",
        borderRadius: "8px",
        padding: "0.5rem 0.75rem",
        border: `1px solid ${phase === "filled" ? "#BBF7D0" : "#FECACA"}`,
        transition: "background 0.5s, border-color 0.5s",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontSize: "0.65rem", color: "#6B7280" }}>Daily gap:</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: phase === "filled" ? "#10B981" : "#EF4444" }}>
            ${dailyLoss.toLocaleString()}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontSize: "0.65rem", color: "#6B7280" }}>Weekly:</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: phase === "filled" ? "#10B981" : "#EF4444" }}>
            ${weeklyLoss.toLocaleString()}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.65rem", color: "#6B7280" }}>Annual:</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 900, color: phase === "filled" ? "#10B981" : "#EF4444" }}>
            ${annualLoss.toLocaleString()}
          </span>
        </div>
        {phase === "filled" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", marginTop: "6px", fontSize: "0.65rem", fontWeight: 700, color: "#10B981" }}
          >
            ✓ Waitlist filled all empty slots automatically
          </motion.div>
        )}
      </div>
    </div>
  );
}
