/**
 * HeroWorkflowDiagram.tsx
 * Design: Barrana.ai — Premium Systems Consultancy
 * Animated SVG workflow diagram — LARGE version for hero section.
 * Lines draw themselves in on mount. Nodes pulse subtly.
 * Colors: Navy #283891, Magenta #7E0F4A
 */

import { useEffect, useRef, useState } from "react";

const nodes = [
  { id: "lead",     label: "Lead Form",      x: 60,  y: 120, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "#283891" },
  { id: "agent",    label: "AI Intake Agent",x: 260, y: 40,  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1", color: "#7E0F4A" },
  { id: "crm",      label: "CRM",            x: 460, y: 120, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "#283891" },
  { id: "calendar", label: "Calendar",       x: 260, y: 220, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#283891" },
  { id: "invoice",  label: "Invoice System", x: 460, y: 300, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "#7E0F4A" },
  { id: "followup", label: "Follow-Up",      x: 660, y: 190, icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", color: "#283891" },
];

const edges = [
  { from: "lead",     to: "agent" },
  { from: "agent",    to: "crm" },
  { from: "agent",    to: "calendar" },
  { from: "crm",      to: "invoice" },
  { from: "crm",      to: "followup" },
  { from: "calendar", to: "invoice" },
  { from: "invoice",  to: "followup" },
];

const NODE_W = 80;
const NODE_H = 80;

function getNodeCenter(id: string) {
  const n = nodes.find((n) => n.id === id)!;
  return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 };
}

export default function HeroWorkflowDiagram() {
  const [drawn, setDrawn] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 800 420"
        className="w-full h-auto"
        style={{ minHeight: 260 }}
        aria-label="AI automation workflow diagram for service businesses Toronto"
      >
        <defs>
          {edges.map((e, i) => {
            const isAccent = (e.from === "agent" && e.to === "calendar") || (e.from === "invoice" && e.to === "followup");
            return (
              <marker
                key={`arrow-${i}`}
                id={`arrow-${i}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L0,8 L8,4 z" fill={isAccent ? "#7E0F4A" : "#283891"} opacity="0.55" />
              </marker>
            );
          })}
          <filter id="glow-hero">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow-node">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#283891" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Background subtle grid */}
        <defs>
          <pattern id="smallGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#283891" strokeWidth="0.3" strokeOpacity="0.06"/>
          </pattern>
        </defs>
        <rect width="800" height="420" fill="url(#smallGrid)" />

        {/* Edges */}
        {edges.map((e, i) => {
          const from = getNodeCenter(e.from);
          const to = getNodeCenter(e.to);
          const isAccent = (e.from === "agent" && e.to === "calendar") || (e.from === "invoice" && e.to === "followup");
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const pathLen = Math.sqrt(dx * dx + dy * dy) * 1.4;
          // Bezier control point
          const cx = (from.x + to.x) / 2;
          const cy = (from.y + to.y) / 2 - 20;
          const d = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
          return (
            <path
              key={`edge-${i}`}
              d={d}
              stroke={isAccent ? "#7E0F4A" : "#283891"}
              strokeWidth="2"
              strokeOpacity={drawn ? 0.4 : 0}
              fill="none"
              strokeDasharray={pathLen}
              strokeDashoffset={drawn ? 0 : pathLen}
              markerEnd={`url(#arrow-${i})`}
              style={{
                transition: `stroke-dashoffset ${0.7 + i * 0.13}s cubic-bezier(0.4,0,0.2,1) ${0.25 + i * 0.12}s, stroke-opacity 0.4s ease ${0.25 + i * 0.12}s`,
              }}
            />
          );
        })}

        {/* Animated flow dots along edges */}
        {drawn && edges.map((e, i) => {
          const from = getNodeCenter(e.from);
          const to = getNodeCenter(e.to);
          const isAccent = (e.from === "agent" && e.to === "calendar") || (e.from === "invoice" && e.to === "followup");
          const cx = (from.x + to.x) / 2;
          const cy = (from.y + to.y) / 2 - 20;
          const d = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
          return (
            <circle key={`dot-${i}`} r="3.5" fill={isAccent ? "#7E0F4A" : "#283891"} opacity="0.7">
              <animateMotion
                dur={`${2.2 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
                path={d}
              />
            </circle>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = activeNode === node.id;
          return (
            <g
              key={node.id}
              style={{
                opacity: drawn ? 1 : 0,
                transform: drawn
                  ? `translate(${node.x}px, ${node.y}px) scale(1)`
                  : `translate(${node.x}px, ${node.y + 16}px) scale(0.88)`,
                transition: `opacity 0.55s ease ${0.1 + i * 0.09}s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + i * 0.09}s`,
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="cursor-pointer"
            >
              {/* Shadow rect */}
              <rect
                width={NODE_W}
                height={NODE_H}
                rx="16"
                fill="white"
                filter="url(#shadow-node)"
              />
              {/* Border rect */}
              <rect
                width={NODE_W}
                height={NODE_H}
                rx="16"
                fill="white"
                stroke={node.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeOpacity={isActive ? 1 : 0.3}
                filter={isActive ? "url(#glow-hero)" : undefined}
                style={{ transition: "stroke-width 0.2s, stroke-opacity 0.2s" }}
              />
              {/* Color accent top bar */}
              <rect
                width={NODE_W}
                height="4"
                rx="2"
                fill={node.color}
                opacity={isActive ? 1 : 0.7}
                style={{ transition: "opacity 0.2s" }}
              />
              {/* Icon */}
              <svg x="20" y="14" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={node.icon} />
              </svg>
              {/* Label */}
              <text
                x={NODE_W / 2}
                y={NODE_H + 18}
                textAnchor="middle"
                fontSize="11"
                fill="#374151"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Animated pulse ring on AI Intake Agent node */}
        {drawn && (
          <ellipse
            cx={nodes[1].x + NODE_W / 2}
            cy={nodes[1].y + NODE_H / 2}
            rx="52"
            ry="52"
            fill="none"
            stroke="#7E0F4A"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            style={{ animation: "pulse-ring-hero 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite" }}
          />
        )}
      </svg>

      <style>{`
        @keyframes pulse-ring-hero {
          0%   { transform: scale(0.82); opacity: 0.5; }
          70%  { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(1.18); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
