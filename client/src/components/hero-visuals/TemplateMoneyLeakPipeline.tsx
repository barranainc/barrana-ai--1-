import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LeakItem {
  label: string;
  amount: string;
}

interface Props {
  className?: string;
  industry?: string;
  leaks?: LeakItem[];
}

const DEFAULT_LEAKS: LeakItem[] = [
  { label: "Slow response", amount: "$4,200/mo" },
  { label: "No follow-up", amount: "$6,800/mo" },
  { label: "No reminders", amount: "$3,100/mo" },
  { label: "Late invoicing", amount: "$2,400/mo" },
];

// Drip animation component
function Drip({ delay, color = "#EF4444" }: { delay: number; color?: string }) {
  return (
    <motion.div
      style={{
        width: "6px",
        height: "8px",
        background: color,
        borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
        position: "absolute",
      }}
      animate={{
        y: [0, 24],
        opacity: [1, 0],
        scaleX: [1, 0.7],
      }}
      transition={{
        duration: 1.2,
        delay,
        repeat: Infinity,
        ease: "easeIn",
        repeatDelay: 0.8,
      }}
    />
  );
}

export default function TemplateMoneyLeakPipeline({
  className,
  industry = "Professional Services",
  leaks = DEFAULT_LEAKS,
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? "sealed" : "leaking");

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setPhase("sealed"), 3500);
    return () => clearTimeout(t);
  }, [reduced]);

  const PIPE_W = 48;
  const totalLeak = leaks.length;
  const SEGMENT_H = 54;
  const totalPipeH = (totalLeak + 1) * SEGMENT_H;

  return (
    <div
      role="img"
      aria-label={`Revenue pipeline for ${industry} with ${leaks.length} leak points including slow response and no follow-up. Leaks seal after automation is applied.`}
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
          {industry} - Revenue Leaks
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "280px" }}>
          {/* "Revenue in" label at top */}
          <div style={{ textAlign: "center", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10B981" }}>↓ Revenue In</span>
          </div>

          {/* Pipeline */}
          <div style={{ position: "relative", height: `${totalPipeH}px` }}>
            {/* Main pipe - center column */}
            <div style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: `${PIPE_W}px`,
              height: "100%",
              background: "#EFF6FF",
              border: "2px solid #BFDBFE",
              borderRadius: "4px",
            }} />

            {/* Green flow inside pipe */}
            <motion.div
              animate={phase === "sealed" ? { height: "100%" } : { height: "100%" }}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: `${PIPE_W - 4}px`,
                top: 0,
                background: "linear-gradient(180deg, #10B981 0%, #059669 100%)",
                borderRadius: "3px",
                opacity: 0.15,
              }}
            />

            {/* Leak points */}
            {leaks.map((leak, i) => {
              const y = (i + 1) * SEGMENT_H - SEGMENT_H / 2;
              const side = i % 2 === 0 ? "right" : "left";
              const leakX = side === "right"
                ? `calc(50% + ${PIPE_W / 2}px)`
                : `calc(50% - ${PIPE_W / 2}px - 80px)`;

              return (
                <div key={i}>
                  {/* Leak hole indicator */}
                  <motion.div
                    animate={phase === "sealed" ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    style={{
                      position: "absolute",
                      top: `${y - 6}px`,
                      left: side === "right" ? `calc(50% + ${PIPE_W / 2 - 6}px)` : `calc(50% - ${PIPE_W / 2 - 6}px)`,
                      width: "12px",
                      height: "12px",
                      background: "#EF4444",
                      borderRadius: "50%",
                      border: "2px solid white",
                      zIndex: 2,
                    }}
                  />

                  {/* Drip */}
                  {phase === "leaking" && !reduced && (
                    <div style={{
                      position: "absolute",
                      top: `${y + 6}px`,
                      left: side === "right" ? `calc(50% + ${PIPE_W / 2 - 3}px)` : `calc(50% - ${PIPE_W / 2 + 3}px)`,
                    }}>
                      <Drip delay={i * 0.3} />
                    </div>
                  )}

                  {/* Leak label */}
                  <motion.div
                    animate={phase === "sealed" ? { opacity: 0.3 } : { opacity: 1 }}
                    style={{
                      position: "absolute",
                      top: `${y - 14}px`,
                      left: leakX,
                      width: "80px",
                    }}
                  >
                    <div style={{ fontSize: "0.6rem", fontWeight: 600, color: "#EF4444" }}>{leak.label}</div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#D97706" }}>{leak.amount}</div>
                  </motion.div>

                  {/* Sealed patch */}
                  {phase === "sealed" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      style={{
                        position: "absolute",
                        top: `${y - 8}px`,
                        left: side === "right" ? `calc(50% + ${PIPE_W / 2 - 8}px)` : `calc(50% - ${PIPE_W / 2 + 8}px)`,
                        width: "16px",
                        height: "16px",
                        background: "#10B981",
                        borderRadius: "50%",
                        border: "2px solid white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      <span style={{ fontSize: "8px", color: "white" }}>✓</span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* "Revenue out" label at bottom */}
          <div style={{ textAlign: "center", marginTop: "4px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: phase === "sealed" ? "#10B981" : "#EF4444" }}>
              {phase === "sealed" ? "↓ Full Revenue Retained" : "↓ Revenue Out (reduced)"}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        textAlign: "center",
        marginTop: "0.5rem",
        padding: "0.5rem",
        background: phase === "sealed" ? "#F0FDF4" : "#FEF2F2",
        borderRadius: "8px",
        border: `1px solid ${phase === "sealed" ? "#BBF7D0" : "#FECACA"}`,
        transition: "background 0.5s, border-color 0.5s",
      }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: phase === "sealed" ? "#10B981" : "#EF4444" }}>
          {phase === "sealed"
            ? "All leaks sealed - revenue flows through cleanly"
            : `${leaks.length} revenue leaks identified`}
        </span>
      </div>
    </div>
  );
}
