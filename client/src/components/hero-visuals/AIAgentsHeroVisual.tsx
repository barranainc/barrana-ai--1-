import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHATBOT_BLOCKS = [
  { label: "Answer FAQ", color: "#9CA3AF" },
  { label: "Capture Email", color: "#9CA3AF" },
  { label: "Show Info", color: "#9CA3AF" },
];

const AGENT_BLOCKS = [
  { label: "Respond", color: "#283891" },
  { label: "Qualify", color: "#2d4099" },
  { label: "Create CRM Record", color: "#3248a8" },
  { label: "Book Appointment", color: "#2e5eb8" },
  { label: "Send Follow-Up", color: "#2272c8" },
  { label: "Route Task", color: "#1588d8" },
  { label: "Generate Report", color: "#0ca0e0" },
  { label: "Escalate to Human", color: "#05aee8" },
  { label: "...more", color: "#00B4D8" },
];

const BLOCK_H = 26;
const BLOCK_GAP = 4;
const AGENT_DELAY_START = 0.8; // agent tower starts after chatbot finishes

export default function AIAgentsHeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const chatbotVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: { delay: reduced ? 0 : i * 0.15, duration: 0.35, ease: "easeOut" },
    }),
  };

  const agentVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0, y: 10 },
    visible: (i: number) => ({
      scaleY: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : AGENT_DELAY_START + i * 0.12,
        duration: 0.3,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 18,
      },
    }),
  };

  const chatbotHeight = CHATBOT_BLOCKS.length * (BLOCK_H + BLOCK_GAP);
  const agentHeight = AGENT_BLOCKS.length * (BLOCK_H + BLOCK_GAP);

  return (
    <div
      role="img"
      aria-label="Two towers side by side. Short grey chatbot tower with 3 capability blocks. Tall blue AI agent tower with 8-plus capability blocks reaching much higher. Shows the capability gap between chatbots and AI agents."
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
          Chatbot vs AI Agent
        </span>
      </div>

      <div style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        minHeight: `${agentHeight + 48}px`,
        paddingBottom: "0.5rem",
      }}>
        {/* CHATBOT tower */}
        <div style={{ flex: "0 0 38%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          {/* Title */}
          <div style={{
            textAlign: "center",
            fontSize: "0.65rem",
            fontWeight: 800,
            color: "#9CA3AF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
          }}>
            CHATBOT
          </div>

          {/* Blocks stacked from bottom — we render top to bottom but align to bottom via flex column-reverse trick */}
          <div style={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: `${BLOCK_GAP}px`,
            height: `${agentHeight}px`,
            justifyContent: "flex-start",
          }}>
            {CHATBOT_BLOCKS.map((block, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={chatbotVariants}
                style={{
                  background: block.color,
                  borderRadius: "6px",
                  height: `${BLOCK_H}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformOrigin: "bottom center",
                }}
              >
                <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "white", textAlign: "center", padding: "0 4px" }}>
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Dotted limit line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.7, duration: 0.4 }}
            style={{
              marginTop: "4px",
              borderTop: "2px dashed #D1D5DB",
              paddingTop: "4px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "0.55rem", color: "#9CA3AF", fontStyle: "italic" }}>
              That's all it can do.
            </span>
          </motion.div>
        </div>

        {/* AI AGENT tower */}
        <div style={{ flex: "0 0 56%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <div style={{
            textAlign: "center",
            fontSize: "0.65rem",
            fontWeight: 800,
            color: "#283891",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
          }}>
            AI AGENT
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: `${BLOCK_GAP}px`,
            height: `${agentHeight}px`,
            justifyContent: "flex-start",
          }}>
            {AGENT_BLOCKS.map((block, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={agentVariants}
                style={{
                  background: `linear-gradient(90deg, ${block.color}, #00B4D8)`,
                  borderRadius: "6px",
                  height: `${BLOCK_H}px`,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                  transformOrigin: "bottom center",
                }}
              >
                <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "white" }}>
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : AGENT_DELAY_START + AGENT_BLOCKS.length * 0.12 + 0.3 }}
        style={{
          textAlign: "center",
          marginTop: "0.5rem",
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#374151",
          lineHeight: 1.4,
        }}
      >
        You're paying for{" "}
        <span style={{ color: "#9CA3AF" }}>3 capabilities</span>.
        {" "}You need{" "}
        <span style={{ color: "#283891" }}>8+</span>
      </motion.div>
    </div>
  );
}
