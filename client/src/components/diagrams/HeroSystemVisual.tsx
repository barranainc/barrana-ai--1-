/**
 * HeroSystemVisual.tsx
 * 3-layer system diagram for the hero section.
 * Layer 1 (bottom): Your Tools — draws in first
 * Layer 2 (middle): Automation Layer — glows in
 * Layer 3 (top): Your Team — fades in last
 * Hidden on mobile (<768px).
 */

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TOOLS = [
  { label: "CRM",        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Calendar",   icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Email",      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "QuickBooks", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { label: "Phone",      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
];

const AUTOMATION = [
  "Lead Response", "Intake", "Doc Collection", "Scheduling", "Invoicing",
];

const TEAM = [
  { label: "Client Work",    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { label: "Consultations",  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Judgment",       icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { label: "Relationships",  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
];

export default function HeroSystemVisual() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) { setPhase(5); return; }
    const timers = [
      setTimeout(() => setPhase(1), 200),   // tools appear
      setTimeout(() => setPhase(2), 900),   // lines draw to middle
      setTimeout(() => setPhase(3), 1400),  // automation layer glows in
      setTimeout(() => setPhase(4), 2000),  // lines draw to top
      setTimeout(() => setPhase(5), 2500),  // team appears + dots flow
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <div
      className="hidden md:block"
      role="img"
      aria-label="System diagram showing automation layer connecting your tools to your team"
      style={{ width: "100%", userSelect: "none" }}
    >
      {/* Team layer */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "0.875rem 0.5rem",
        background: "rgba(22,163,74,0.06)",
        borderRadius: "0.75rem",
        border: "1px solid rgba(22,163,74,0.2)",
        marginBottom: "0.5rem",
        opacity: phase >= 5 ? 1 : 0,
        transform: phase >= 5 ? "translateY(0)" : "translateY(-12px)",
        transition: reduced ? "none" : "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--b-success)", marginRight: "0.5rem" }}>
          Your Team
        </div>
        {TEAM.map(({ label, icon }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "50%",
              background: "rgba(22,163,74,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--b-success)" strokeWidth="1.75" style={{ width: "1rem", height: "1rem" }}>
                <path d={icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--b-success)", whiteSpace: "nowrap" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Connector lines top */}
      <div style={{
        height: "1.5rem", position: "relative", overflow: "hidden",
        opacity: phase >= 4 ? 1 : 0,
        transition: reduced ? "none" : "opacity 0.4s ease",
      }}>
        <svg width="100%" height="100%" viewBox="0 0 400 24" preserveAspectRatio="none">
          {[80, 160, 240, 320].map((x, i) => (
            <line key={i} x1={x} y1="24" x2={200} y2="0"
              stroke="#283891" strokeWidth="1.5" strokeOpacity="0.25"
              strokeDasharray="30" strokeDashoffset={phase >= 4 ? "0" : "30"}
              style={{ transition: reduced ? "none" : `stroke-dashoffset 0.5s ease ${i * 0.08}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Automation layer */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "1rem 0.75rem",
        background: "rgba(40,56,145,0.08)",
        borderRadius: "0.75rem",
        border: "1.5px solid rgba(40,56,145,0.3)",
        boxShadow: phase >= 3 ? "0 0 24px rgba(40,56,145,0.12)" : "none",
        marginBottom: "0",
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "scale(1)" : "scale(0.97)",
        transition: reduced ? "none" : "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease",
      }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--b-navy)", marginRight: "0.25rem" }}>
          Automation
        </div>
        {AUTOMATION.map((label) => (
          <div key={label} style={{
            padding: "0.3rem 0.5rem",
            background: "white",
            border: "1px solid rgba(40,56,145,0.2)",
            borderRadius: "0.375rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--b-navy)",
            whiteSpace: "nowrap",
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Connector lines bottom */}
      <div style={{
        height: "1.5rem", position: "relative", overflow: "hidden",
        opacity: phase >= 2 ? 1 : 0,
        transition: reduced ? "none" : "opacity 0.4s ease",
      }}>
        <svg width="100%" height="100%" viewBox="0 0 400 24" preserveAspectRatio="none">
          {[80, 160, 240, 320].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={200} y2="24"
              stroke="#283891" strokeWidth="1.5" strokeOpacity="0.25"
              strokeDasharray="30" strokeDashoffset={phase >= 2 ? "0" : "30"}
              style={{ transition: reduced ? "none" : `stroke-dashoffset 0.5s ease ${i * 0.08}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tools layer */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "0.875rem 0.5rem",
        background: "rgba(40,56,145,0.04)",
        borderRadius: "0.75rem",
        border: "1px solid var(--b-border)",
        marginTop: "0.5rem",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
        transition: reduced ? "none" : "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--b-grey)", marginRight: "0.5rem" }}>
          Your Tools
        </div>
        {TOOLS.map(({ label, icon }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "0.4rem",
              background: "rgba(40,56,145,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--b-navy)" strokeWidth="1.75" style={{ width: "1rem", height: "1rem" }}>
                <path d={icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--b-grey)", whiteSpace: "nowrap" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: "0.6875rem", color: "var(--b-grey)", marginTop: "0.75rem", opacity: 0.7 }}>
        Your tools stay the same. We automate the coordination layer between them.
      </div>
    </div>
  );
}
