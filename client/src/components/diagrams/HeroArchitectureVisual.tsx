/**
 * HeroArchitectureVisual.tsx — 3-Layer Architecture Diagram
 * Your Tools → Barrana Automation Layer → Your Team Freed
 */

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  FileText,
  Users,
  UserCheck,
  BarChart3,
  Briefcase,
  ArrowDown,
  Zap,
} from "lucide-react";

const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";
const GREEN = "#0D9668";

const PILLS = [
  "Lead Capture",
  "AI Qualification",
  "CRM Sync",
  "Document Collection",
  "Invoice Trigger",
  "Follow-Up",
];

const TOOL_ITEMS = [
  { icon: Mail, label: "Email" },
  { icon: Phone, label: "CRM" },
  { icon: Calendar, label: "Calendar" },
  { icon: FileText, label: "Forms" },
];

const TEAM_ITEMS = [
  { icon: Users, label: "Consultants" },
  { icon: UserCheck, label: "Admin" },
  { icon: BarChart3, label: "Managers" },
  { icon: Briefcase, label: "Owners" },
];

export default function HeroArchitectureVisual() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [layer1, setLayer1] = useState(false);
  const [arrow1, setArrow1] = useState(false);
  const [layer2, setLayer2] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [layer3, setLayer3] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      setLayer1(true);
      setArrow1(true);
      setLayer2(true);
      setArrow2(true);
      setLayer3(true);
      return;
    }
    const timers = [
      setTimeout(() => setLayer1(true), 300),
      setTimeout(() => setArrow1(true), 600),
      setTimeout(() => setLayer2(true), 800),
      setTimeout(() => setArrow2(true), 1100),
      setTimeout(() => setLayer3(true), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const reveal = (visible: boolean) =>
    reducedMotion
      ? {}
      : {
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <style>{`
        @keyframes arrowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes layerGlow {
          0%, 100% { box-shadow: 0 8px 32px rgba(40,56,145,0.25); }
          50% { box-shadow: 0 8px 40px rgba(40,56,145,0.35); }
        }
      `}</style>

      {/* Layer 1 — YOUR EXISTING TOOLS */}
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          border: "1px solid #E2E4ED",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          padding: "1.5rem",
          ...reveal(layer1),
        }}
      >
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: GREY,
            marginBottom: "1rem",
          }}
        >
          Layer 1 — Your Existing Tools
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", textAlign: "center" }}>
          {TOOL_ITEMS.map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
              <item.icon size={28} color={NAVY} strokeWidth={1.5} />
              <span style={{ fontSize: "0.75rem", color: DARK, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.75rem", color: GREY, fontStyle: "italic", margin: "0.875rem 0 0", textAlign: "center" }}>
          Your tools stay the same.
        </p>
      </div>

      {/* Arrow 1 */}
      <div style={{ textAlign: "center", animation: reducedMotion ? "none" : "arrowPulse 2s infinite", ...reveal(arrow1) }}>
        <ArrowDown size={22} color={NAVY} />
      </div>

      {/* Layer 2 — BARRANA AUTOMATION LAYER */}
      <div
        style={{
          background: "linear-gradient(135deg, #283891, #7E0F4A)",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 8px 32px rgba(40,56,145,0.25)",
          border: "2px solid rgba(255,255,255,0.15)",
          animation: reducedMotion ? "none" : "layerGlow 3s infinite",
          ...reveal(layer2),
        }}
      >
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "0.75rem",
          }}
        >
          Automation
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "white",
            fontWeight: 700,
            fontSize: "1.0625rem",
            marginBottom: "1rem",
          }}
        >
          <Zap size={18} />
          Barrana Automation Layer
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {PILLS.map((pill) => (
            <span
              key={pill}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "0.75rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
          We automate the coordination layer between them.
        </p>
      </div>

      {/* Arrow 2 */}
      <div style={{ textAlign: "center", animation: reducedMotion ? "none" : "arrowPulse 2s infinite", ...reveal(arrow2) }}>
        <ArrowDown size={22} color={NAVY} />
      </div>

      {/* Layer 3 — YOUR TEAM (FREED FROM ADMIN) */}
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          border: "1px solid #E2E4ED",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          padding: "1.5rem",
          ...reveal(layer3),
        }}
      >
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: GREY,
            marginBottom: "1rem",
          }}
        >
          Layer 3 — Your Team (Freed from Admin)
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", textAlign: "center" }}>
          {TEAM_ITEMS.map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
              <item.icon size={28} color={GREEN} strokeWidth={1.5} />
              <span style={{ fontSize: "0.75rem", color: DARK, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
