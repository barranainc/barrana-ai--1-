import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TOTAL = 100;
const OVERDUE = 36;
const ACTIVE = TOTAL - OVERDUE;

// Patient icon: circle head + body bump
function PatientIcon({ color, size = 16 }: { color: string; size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 16 16">
      <circle cx={8} cy={5} r={3.5} fill={color} />
      <path d="M2 16 C2 11 14 11 14 16" fill={color} />
    </svg>
  );
}

// Build 10×10 grid positions. Overdue cluster in bottom-right area.
function buildGrid() {
  // We want the 36 overdue in bottom-right: rows 7-9 (all 10) + row 6 (last 6)
  const icons: { row: number; col: number; isOverdue: boolean }[] = [];
  // rows 0-9, cols 0-9
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;
      // bottom-right cluster: rows 7-9 = 30, then rows 6 cols 4-9 = 6 → 36 total
      const isOverdue =
        row >= 7 || (row === 6 && col >= 4);
      icons.push({ row, col, isOverdue });
    }
  }
  return icons;
}

const GRID = buildGrid();

export default function DentalHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  // phase: "show" → grid visible, "sweep" → teal conversion in progress, "done" → all green
  const [phase, setPhase] = useState<"show" | "sweep" | "done">(reduced ? "done" : "show");
  const [sweepCol, setSweepCol] = useState(reduced ? 10 : -1);

  useEffect(() => {
    if (reduced) return;

    // After 2s pulse, start sweep
    const t1 = setTimeout(() => {
      setPhase("sweep");
      // Sweep left-to-right: 10 columns over 2s
      let col = 0;
      const interval = setInterval(() => {
        col++;
        setSweepCol(col);
        if (col >= 10) {
          clearInterval(interval);
          setPhase("done");
        }
      }, 200);
    }, 2500);

    return () => clearTimeout(t1);
  }, [reduced]);

  const isConverted = (row: number, col: number) =>
    phase === "done" || (phase === "sweep" && col < sweepCol);

  const ICON_SIZE = 16;
  const GAP = 4;
  const CELL = ICON_SIZE + GAP;

  return (
    <div
      role="img"
      aria-label="Grid of 100 patient icons. 64 green for active recall patients, 36 red for overdue patients. Shows $72,000 in unrealized recall revenue. Then a teal wave converts overdue patients to active as recall reminders are sent."
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
          The Recall Gap Grid
        </span>
      </div>

      {/* Grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(10, ${ICON_SIZE}px)`,
            gap: `${GAP}px`,
          }}
        >
          {GRID.map(({ row, col, isOverdue }, i) => {
            const converted = isConverted(row, col);
            const color = !isOverdue
              ? "#10B981"
              : converted
              ? "#00B4D8"
              : "#EF4444";

            return (
              <motion.div
                key={i}
                animate={
                  isOverdue && phase === "show"
                    ? { opacity: [1, 0.6, 1] }
                    : {}
                }
                transition={
                  isOverdue && phase === "show"
                    ? { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: (row * 10 + col) * 0.01 }
                    : {}
                }
              >
                <PatientIcon color={color} size={ICON_SIZE} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.75rem", color: "#374151", marginBottom: "4px", fontWeight: 500 }}>
          {phase === "done"
            ? "Recall campaign running…"
            : "36% of your patients are overdue for their recall visit."}
        </div>

        <div style={{ fontSize: "0.7rem", color: "#6B7280", marginBottom: "4px" }}>
          360 patients × $200 hygiene visit =
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.4rem" }}>
          <span style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: phase === "done" ? "#10B981" : "#EF4444",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
            transition: "color 0.5s",
          }}>
            $72,000
          </span>
          <span style={{ fontSize: "0.75rem", color: phase === "done" ? "#10B981" : "#EF4444", fontWeight: 700 }}>
            {phase === "done" ? "recovered" : "unrealized revenue"}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <PatientIcon color="#10B981" size={12} />
          <span style={{ fontSize: "0.6rem", color: "#6B7280" }}>Active ({ACTIVE})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <PatientIcon color="#EF4444" size={12} />
          <span style={{ fontSize: "0.6rem", color: "#6B7280" }}>Overdue ({OVERDUE})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <PatientIcon color="#00B4D8" size={12} />
          <span style={{ fontSize: "0.6rem", color: "#6B7280" }}>Recalled</span>
        </div>
      </div>
    </div>
  );
}
