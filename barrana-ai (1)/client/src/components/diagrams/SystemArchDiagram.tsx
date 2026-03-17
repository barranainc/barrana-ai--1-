/**
 * SystemArchDiagram.tsx
 * Barrana.ai — Animated system architecture diagram (LARGE version)
 * Shows the Barrana automation layer connecting business tools
 * Connections animate in when scrolled into view
 */

import { useEffect, useRef, useState } from "react";

const CENTER = { x: 300, y: 210 };
const RADIUS = 155;

const satellites = [
  { id: "crm",      label: "CRM",          angle: -90,  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "email",    label: "Email",        angle: -30,  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "calendar", label: "Calendar",     angle: 30,   icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "invoice",  label: "Invoicing",    angle: 90,   icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "leads",    label: "Lead Capture", angle: 150,  icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" },
  { id: "pm",       label: "Project Mgmt", angle: 210,  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SystemArchDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 600 420"
        className="w-full h-auto"
        aria-label="Barrana.ai automation architecture diagram connecting CRM, email, calendar, invoicing, lead capture, and project management through central automation layer"
      >
        <defs>
          <radialGradient id="centerGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#283891" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#283891" stopOpacity="0.04" />
          </radialGradient>
          <filter id="softGlow2">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="shadow-sat">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#283891" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Outer orbit ring */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={RADIUS}
          fill="none"
          stroke="#283891"
          strokeWidth="0.8"
          strokeOpacity={visible ? 0.1 : 0}
          strokeDasharray="6 8"
          style={{ transition: "stroke-opacity 1.2s ease 0.2s" }}
        />
        {/* Inner orbit ring */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={RADIUS * 0.6}
          fill="none"
          stroke="#283891"
          strokeWidth="0.5"
          strokeOpacity={visible ? 0.06 : 0}
          strokeDasharray="3 6"
          style={{ transition: "stroke-opacity 1.2s ease 0.4s" }}
        />

        {/* Connection lines */}
        {satellites.map((sat, i) => {
          const pos = polarToXY(CENTER.x, CENTER.y, RADIUS, sat.angle);
          const isActive = activeId === sat.id;
          const len = Math.sqrt(Math.pow(pos.x - CENTER.x, 2) + Math.pow(pos.y - CENTER.y, 2));
          return (
            <line
              key={`line-${sat.id}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={pos.x}
              y2={pos.y}
              stroke={isActive ? "#7E0F4A" : "#283891"}
              strokeWidth={isActive ? 2 : 1.2}
              strokeOpacity={visible ? (isActive ? 0.7 : 0.22) : 0}
              strokeDasharray={len}
              strokeDashoffset={visible ? 0 : len}
              style={{
                transition: `stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s, stroke-opacity 0.3s ease ${0.3 + i * 0.1}s, stroke 0.2s, stroke-width 0.2s`,
              }}
            />
          );
        })}

        {/* Animated flow dots */}
        {visible && satellites.map((sat, i) => {
          const pos = polarToXY(CENTER.x, CENTER.y, RADIUS, sat.angle);
          const isAccent = i % 2 === 1;
          const linePath = `M ${CENTER.x} ${CENTER.y} L ${pos.x} ${pos.y}`;
          return (
            <circle key={`dot-${sat.id}`} r="4" fill={isAccent ? "#7E0F4A" : "#283891"} opacity="0.6">
              <animateMotion
                dur={`${2 + i * 0.35}s`}
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={linePath}
              />
            </circle>
          );
        })}

        {/* Center node */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={58}
          fill="url(#centerGrad2)"
          stroke="#283891"
          strokeWidth={visible ? 2 : 0}
          filter="url(#softGlow2)"
          style={{ transition: "stroke-width 0.6s ease 0.2s" }}
        />
        {/* Center pulse ring */}
        {visible && (
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={68}
            fill="none"
            stroke="#283891"
            strokeWidth="1.5"
            strokeOpacity="0.15"
            style={{ animation: "arch-pulse 3s ease-in-out infinite" }}
          />
        )}
        <text x={CENTER.x} y={CENTER.y - 12} textAnchor="middle" fontSize="11" fill="#283891" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="0.05em">BARRANA</text>
        <text x={CENTER.x} y={CENTER.y + 5}  textAnchor="middle" fontSize="10" fill="#283891" fontFamily="Inter, sans-serif" fontWeight="500">Automation</text>
        <text x={CENTER.x} y={CENTER.y + 20} textAnchor="middle" fontSize="10" fill="#283891" fontFamily="Inter, sans-serif" fontWeight="500">Layer</text>

        {/* Satellite nodes */}
        {satellites.map((sat, i) => {
          const pos = polarToXY(CENTER.x, CENTER.y, RADIUS, sat.angle);
          const isActive = activeId === sat.id;
          const NODE = 60;
          return (
            <g
              key={sat.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? `translate(${pos.x - NODE / 2}px, ${pos.y - NODE / 2}px) scale(1)`
                  : `translate(${pos.x - NODE / 2}px, ${pos.y - NODE / 2}px) scale(0.65)`,
                transition: `opacity 0.45s ease ${0.45 + i * 0.1}s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.45 + i * 0.1}s`,
              }}
              onMouseEnter={() => setActiveId(sat.id)}
              onMouseLeave={() => setActiveId(null)}
              className="cursor-pointer"
            >
              <rect width={NODE} height={NODE} rx="14" fill="white" filter="url(#shadow-sat)" />
              <rect
                width={NODE}
                height={NODE}
                rx="14"
                fill="white"
                stroke={isActive ? "#7E0F4A" : "#283891"}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 1 : 0.3}
                style={{ transition: "stroke 0.2s, stroke-width 0.2s, stroke-opacity 0.2s" }}
              />
              <rect width={NODE} height="4" rx="2" fill={isActive ? "#7E0F4A" : "#283891"} opacity={isActive ? 1 : 0.6} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
              <svg x="14" y="10" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#7E0F4A" : "#283891"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={sat.icon} />
              </svg>
              <text x={NODE / 2} y={NODE + 16} textAnchor="middle" fontSize="9.5" fill="#374151" fontFamily="Inter, sans-serif" fontWeight="600">
                {sat.label}
              </text>
            </g>
          );
        })}
      </svg>

      <style>{`
        @keyframes arch-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.4; }
          50%       { transform: scale(1.12); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
