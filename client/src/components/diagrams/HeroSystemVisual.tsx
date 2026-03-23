/**
 * HeroSystemVisual.tsx — Animated SVG hero diagram (v4 — dark premium)
 * Colour system updated to work on #1B223D card background.
 *
 * Layers:   YOUR TEAM  →  AUTOMATION  →  YOUR TOOLS
 * Accent:   Blue #4B6BFF (connectors, hub dots)
 *           Magenta #D61A7F (AUTOMATION label, pill accents)
 *           Panel #26304F  (row backgrounds)
 *           Text  #C7D0EA  (primary labels)  #9BA7C7 (muted)
 */

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ── Colour tokens ────────────────────────────────────────────────────
const BLUE    = "#4B6BFF";   // connectors, hub dots, icon bg
const MAG     = "#7E0F4A";   // AUTOMATION label, pill accent (official Barrana Magenta)
const PANEL   = "#26304F";   // inner section backgrounds
const LABEL   = "#C7D0EA";   // primary text / icon strokes
const MUTED   = "#9BA7C7";   // secondary text
const PILL_BG = "#F5F7FF";   // automation pill fill
const PILL_TX = "#233156";   // automation pill text
const BORD    = "rgba(255,255,255,0.14)"; // border colour

// ── SVG canvas ───────────────────────────────────────────────────────
const VW = 560;
const VH = 400;

// ── Box geometry ─────────────────────────────────────────────────────
const TEAM_BOX  = { x: 10, y: 10,  w: 540, h: 100, rx: 10 };
const AUTO_BOX  = { x: 10, y: 164, w: 540, h: 86,  rx: 10 };
const TOOLS_BOX = { x: 10, y: 286, w: 540, h: 100, rx: 10 };

const TEAM_BOTTOM  = TEAM_BOX.y  + TEAM_BOX.h;   // 110
const AUTO_TOP     = AUTO_BOX.y;                   // 164
const AUTO_BOTTOM  = AUTO_BOX.y  + AUTO_BOX.h;    // 250
const TOOLS_TOP    = TOOLS_BOX.y;                  // 286

const HUB1: [number, number] = [VW / 2, Math.round((TEAM_BOTTOM + AUTO_TOP)   / 2)]; // 137
const HUB2: [number, number] = [VW / 2, Math.round((AUTO_BOTTOM + TOOLS_TOP)  / 2)]; // 268

// ── Team row ──────────────────────────────────────────────────────────
const TEAM_ICY = TEAM_BOX.y + 38;
const TEAM_LBY = TEAM_ICY  + 30;

const TEAM_ITEMS = [
  { label: "Client Work",   x: 162 },
  { label: "Consultations", x: 254 },
  { label: "Judgment",      x: 346 },
  { label: "Relationships", x: 436 },
];

const TEAM_ICONS = [
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
];

// ── Automation pills ──────────────────────────────────────────────────
const PILL_Y = AUTO_BOX.y + 36;
const PILL_H = 27;
const AUTO_PILLS: { label: string; x: number; w: number }[] = [
  { label: "Lead Response",  x: 18,  w: 102 },
  { label: "Intake",         x: 140, w: 62  },
  { label: "Doc Collection", x: 222, w: 108 },
  { label: "Scheduling",     x: 350, w: 88  },
  { label: "Invoicing",      x: 458, w: 80  },
];

// ── Tools row ─────────────────────────────────────────────────────────
const TOOL_ICY = TOOLS_BOX.y + 37;
const TOOL_LBY = TOOL_ICY   + 28;

const TOOL_ITEMS = [
  { label: "CRM",        x: 110 },
  { label: "Calendar",   x: 203 },
  { label: "Email",      x: 291 },
  { label: "QuickBooks", x: 378 },
  { label: "Phone",      x: 465 },
];

const TOOL_ICONS = [
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
];

// ── Icon helper ───────────────────────────────────────────────────────
function SvgIcon({
  cx, cy, d, stroke, bg, r = 19,
}: {
  cx: number; cy: number; d: string; stroke: string; bg: string; r?: number;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={bg} />
      <g transform={`translate(${cx - 10},${cy - 10}) scale(0.833)`}>
        <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

// ── CSS keyframes ─────────────────────────────────────────────────────
const KF = `
@keyframes hubPulse {
  0%,100% { r:5; opacity:0.9; }
  50%      { r:7.5; opacity:0.45; }
}
@keyframes autoPulse {
  0%,100% { filter: drop-shadow(0 0 12px rgba(126,15,74,0.30)); }
  50%      { filter: drop-shadow(0 0 28px rgba(126,15,74,0.55)); }
}
`;

// ── Component ─────────────────────────────────────────────────────────
export default function HeroSystemVisual() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    if (reduced) { setPhase(5); return; }
    const timers = [
      setTimeout(() => setPhase(1),  150),
      setTimeout(() => setPhase(2),  700),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 1800),
      setTimeout(() => setPhase(5), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const tr = (prop: string, dur = 0.5, delay = 0, ease = "ease") =>
    `${prop} ${dur}s ${ease} ${delay}s`;

  return (
    <div
      className="hidden md:block"
      role="img"
      aria-label="System diagram: automation layer connecting your team to your tools"
      style={{ width: "100%", userSelect: "none" }}
    >
      {!reduced && <style>{KF}</style>}

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── DEFS ─────────────────────────────────────────────── */}
        <defs>
          {TEAM_ITEMS.map((item, i) => (
            <path key={`du${i}`} id={`upper-${i}`}
              d={`M ${item.x} ${TEAM_BOTTOM} L ${HUB1[0]} ${HUB1[1]}`} />
          ))}
          {TOOL_ITEMS.map((item, i) => (
            <path key={`dl${i}`} id={`lower-${i}`}
              d={`M ${HUB2[0]} ${HUB2[1]} L ${item.x} ${TOOLS_TOP}`} />
          ))}
        </defs>

        {/* ══ YOUR TEAM BOX ═══════════════════════════════════════ */}
        <g style={{
          opacity:   phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(-14px)",
          transition: reduced ? "none" : [tr("opacity"), tr("transform", 0.55, 0, "cubic-bezier(0.16,1,0.3,1)")].join(", "),
        }}>
          <rect
            x={TEAM_BOX.x} y={TEAM_BOX.y} width={TEAM_BOX.w} height={TEAM_BOX.h}
            rx={TEAM_BOX.rx}
            fill={PANEL}
            stroke={BORD}
            strokeWidth="1"
          />
          <text x={30} y={TEAM_ICY}      fontSize="11" fontWeight="700" letterSpacing="1.5" fill={LABEL}>YOUR</text>
          <text x={30} y={TEAM_ICY + 14} fontSize="11" fontWeight="700" letterSpacing="1.5" fill={LABEL}>TEAM</text>

          {TEAM_ITEMS.map((item, i) => (
            <g key={item.label} style={{ opacity: phase >= 1 ? 1 : 0, transition: reduced ? "none" : tr("opacity", 0.45, 0.1 + i * 0.09) }}>
              <SvgIcon
                cx={item.x} cy={TEAM_ICY}
                d={TEAM_ICONS[i]}
                stroke={LABEL}
                bg="rgba(75,107,255,0.18)"
              />
              <text x={item.x} y={TEAM_LBY} fontSize="11.5" fontWeight="600" textAnchor="middle" fill={LABEL}>
                {item.label}
              </text>
            </g>
          ))}
        </g>

        {/* ══ UPPER CONNECTORS + HUB1 ═════════════════════════════ */}
        <g style={{ opacity: phase >= 2 ? 1 : 0, transition: reduced ? "none" : tr("opacity", 0.3) }}>
          {TEAM_ITEMS.map((item, i) => (
            <line key={`ul${i}`}
              x1={item.x} y1={TEAM_BOTTOM} x2={HUB1[0]} y2={HUB1[1]}
              stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.45"
              pathLength="1" strokeDasharray="1"
              strokeDashoffset={phase >= 2 ? 0 : 1}
              style={{ transition: reduced ? "none" : tr("stroke-dashoffset", 0.5, i * 0.09) }}
            />
          ))}
          <circle
            cx={HUB1[0]} cy={HUB1[1]}
            r={phase >= 2 ? 5 : 0}
            fill={BLUE}
            opacity={phase >= 2 ? 0.9 : 0}
            style={{
              transition: reduced ? "none" : [tr("r", 0.4, 0.45), tr("opacity", 0.4, 0.45)].join(", "),
              animation: (!reduced && phase >= 5) ? "hubPulse 2.2s ease-in-out infinite" : "none",
            }}
          />
        </g>

        {/* ══ AUTOMATION BOX ══════════════════════════════════════ */}
        <g
          style={{
            opacity:   phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "scale(1)" : "scale(0.97)",
            transformBox: "fill-box",
            transformOrigin: "50% 50%",
            transition: reduced ? "none" : [tr("opacity", 0.55), tr("transform", 0.55, 0, "cubic-bezier(0.16,1,0.3,1)")].join(", "),
          }}
        >
          <rect
            x={AUTO_BOX.x} y={AUTO_BOX.y} width={AUTO_BOX.w} height={AUTO_BOX.h}
            rx={AUTO_BOX.rx}
            fill={PANEL}
            stroke={MAG}
            strokeWidth="1.5"
            style={{
              filter: phase >= 3 ? "drop-shadow(0 0 14px rgba(126,15,74,0.30))" : "none",
              transition: reduced ? "none" : "filter 1s ease",
              animation: (!reduced && phase >= 5) ? "autoPulse 3s ease-in-out infinite" : "none",
            }}
          />

          {/* AUTOMATION label */}
          <text
            x={AUTO_BOX.x + AUTO_BOX.w / 2}
            y={AUTO_BOX.y + 21}
            fontSize="13.5" fontWeight="800" letterSpacing="2.5" textAnchor="middle" fill={MAG}
          >
            AUTOMATION
          </text>

          {/* Pills */}
          {AUTO_PILLS.map((pill) => (
            <g key={pill.label}>
              <rect
                x={AUTO_BOX.x + pill.x} y={PILL_Y}
                width={pill.w} height={PILL_H} rx="5"
                fill={PILL_BG}
                stroke="rgba(75,107,255,0.2)"
                strokeWidth="1"
              />
              <text
                x={AUTO_BOX.x + pill.x + pill.w / 2}
                y={PILL_Y + 18}
                fontSize="11.5" fontWeight="700" textAnchor="middle" fill={PILL_TX}
              >
                {pill.label}
              </text>
            </g>
          ))}
        </g>

        {/* ══ LOWER CONNECTORS + HUB2 ═════════════════════════════ */}
        <g style={{ opacity: phase >= 4 ? 1 : 0, transition: reduced ? "none" : tr("opacity", 0.3) }}>
          {TOOL_ITEMS.map((item, i) => (
            <line key={`ll${i}`}
              x1={HUB2[0]} y1={HUB2[1]} x2={item.x} y2={TOOLS_TOP}
              stroke={BLUE} strokeWidth="1.4" strokeOpacity="0.4"
              pathLength="1" strokeDasharray="1"
              strokeDashoffset={phase >= 4 ? 0 : 1}
              style={{ transition: reduced ? "none" : tr("stroke-dashoffset", 0.5, i * 0.09) }}
            />
          ))}
          <circle
            cx={HUB2[0]} cy={HUB2[1]}
            r={phase >= 4 ? 5 : 0}
            fill={BLUE}
            opacity={phase >= 4 ? 0.9 : 0}
            style={{
              transition: reduced ? "none" : [tr("r", 0.4, 0.45), tr("opacity", 0.4, 0.45)].join(", "),
              animation: (!reduced && phase >= 5) ? "hubPulse 2.2s ease-in-out 1.1s infinite" : "none",
            }}
          />
        </g>

        {/* ══ YOUR TOOLS BOX ══════════════════════════════════════ */}
        <g style={{
          opacity:   phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? "translateY(0)" : "translateY(14px)",
          transition: reduced ? "none" : [tr("opacity"), tr("transform", 0.55, 0, "cubic-bezier(0.16,1,0.3,1)")].join(", "),
        }}>
          <rect
            x={TOOLS_BOX.x} y={TOOLS_BOX.y} width={TOOLS_BOX.w} height={TOOLS_BOX.h}
            rx={TOOLS_BOX.rx}
            fill={PANEL}
            stroke={BORD}
            strokeWidth="1"
          />
          <text x={30} y={TOOL_ICY}      fontSize="11" fontWeight="700" letterSpacing="1.5" fill={MUTED}>YOUR</text>
          <text x={30} y={TOOL_ICY + 14} fontSize="11" fontWeight="700" letterSpacing="1.5" fill={MUTED}>TOOLS</text>

          {TOOL_ITEMS.map((item, i) => (
            <g key={item.label} style={{ opacity: phase >= 5 ? 1 : 0, transition: reduced ? "none" : tr("opacity", 0.45, 0.1 + i * 0.09) }}>
              <SvgIcon
                cx={item.x} cy={TOOL_ICY}
                d={TOOL_ICONS[i]}
                stroke={MUTED}
                bg="rgba(255,255,255,0.07)"
                r={17}
              />
              <text x={item.x} y={TOOL_LBY} fontSize="11.5" fontWeight="600" textAnchor="middle" fill={MUTED}>
                {item.label}
              </text>
            </g>
          ))}
        </g>

        {/* ══ FLOW DOTS ═══════════════════════════════════════════ */}
        {phase >= 5 && !reduced && (
          <>
            {TEAM_ITEMS.map((_, i) => (
              <circle key={`fu${i}`} r="3" fill={BLUE} opacity="0.7">
                <animateMotion dur={`${1.6 + i * 0.25}s`} begin={`${i * 0.5}s`} repeatCount="indefinite">
                  <mpath href={`#upper-${i}`} />
                </animateMotion>
              </circle>
            ))}
            {TOOL_ITEMS.map((_, i) => (
              <circle key={`fl${i}`} r="3" fill={BLUE} opacity="0.6">
                <animateMotion dur={`${1.6 + i * 0.2}s`} begin={`${0.3 + i * 0.4}s`} repeatCount="indefinite">
                  <mpath href={`#lower-${i}`} />
                </animateMotion>
              </circle>
            ))}
          </>
        )}

        {/* ══ CAPTION ═════════════════════════════════════════════ */}
        <text
          x={VW / 2} y={VH - 2}
          fontSize="12.5" textAnchor="middle" fill={MUTED}
          style={{
            opacity: phase >= 5 ? 0.8 : 0,
            transition: reduced ? "none" : tr("opacity", 0.6, 0.2),
          }}
        >
          Your tools stay the same. We automate the coordination layer between them.
        </text>
      </svg>
    </div>
  );
}
