import { useState } from "react";
import type { PlannerState, PlannerAction } from "@/types/planner";
import PlannerNav from "./PlannerNav";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

// ─── Brand constants ────────────────────────────────────────────────────────
const NAVY = "#283891";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

// ─── Shared micro-insight component ─────────────────────────────────────────
function MicroInsight({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: "#FFF9F0",
        border: "1.5px solid #FED7AA",
        borderRadius: 10,
        padding: "12px 14px",
        marginTop: 16,
        animation: reducedMotion ? "none" : "fadeSlideIn 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
      <p style={{ margin: 0, fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>{text}</p>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  );
}

// ─── Role options ────────────────────────────────────────────────────────────
const ROLE_OPTIONS = [
  {
    id: "solo-operator",
    label: "Solo Operator",
    description: "I do everything myself",
    iconPath: "M12 2a4 4 0 100 8 4 4 0 000-8zM6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2",
  },
  {
    id: "business-owner",
    label: "Business Owner",
    description: "I manage a team",
    iconPath:
      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  },
  {
    id: "office-manager",
    label: "Office Manager",
    description: "I handle the operations",
    iconPath:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    id: "team-lead",
    label: "Team Lead",
    description: "I run a department",
    iconPath:
      "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  },
];

const ROLE_INSIGHTS: Record<string, string> = {
  "solo-operator":
    "Solo operators typically recover 8–12 hours per week through automation — that is an entire extra workday.",
  "business-owner":
    "Business owners who automate their coordination layer free up 15–25% more capacity for their team without adding headcount.",
  "office-manager":
    "Operations leads are often the first to spot automation opportunities because they see every manual handoff.",
  "team-lead":
    "Team leads who automate routine coordination can redirect their team to higher-value work.",
};

// ─── Team size options ───────────────────────────────────────────────────────
const TEAM_SIZE_OPTIONS = [
  { id: "just-me", label: "Just me" },
  { id: "2-5", label: "2–5" },
  { id: "6-15", label: "6–15" },
  { id: "16-50", label: "16–50" },
  { id: "50+", label: "50+" },
];

const TEAM_SIZE_INSIGHTS: Record<string, string> = {
  "just-me":
    "As a solo operator, every automated task is time returned directly to you. No coordination overhead — just results.",
  "2-5":
    "Small teams benefit most from automating the coordination that currently depends on one person remembering to do it.",
  "6-15":
    "At this size, manual handoffs between team members become the primary bottleneck. Automation connects the gaps.",
  "16-50":
    "Teams this size typically have 3–5 high-impact automation opportunities. We will help you prioritise.",
  "50+":
    "Larger organisations often need connected automation systems, not just individual workflows.",
};

// ─── Checkmark badge ─────────────────────────────────────────────────────────
function CheckBadge() {
  return (
    <div
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="2,5 4,7.5 8,2.5" />
      </svg>
    </div>
  );
}

// ─── Role icon SVG ────────────────────────────────────────────────────────────
function RoleIcon({ path }: { path: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke={NAVY}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginBottom: 10 }}
    >
      {path.split(" M").map((segment, i) => (
        <path key={i} d={i === 0 ? segment : "M" + segment} />
      ))}
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function StepRole({ state, dispatch, onNext, onBack }: Props) {
  const [lastInsight, setLastInsight] = useState<string | null>(null);

  const canNext = state.role !== null && state.teamSize !== null;

  function handleRoleSelect(id: string) {
    dispatch({ type: "SET_ROLE", role: id });
    setLastInsight(ROLE_INSIGHTS[id] ?? null);
  }

  function handleTeamSizeSelect(id: string) {
    dispatch({ type: "SET_TEAM_SIZE", teamSize: id });
    setLastInsight(TEAM_SIZE_INSIGHTS[id] ?? null);
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 2px 20px rgba(40,56,145,0.08)",
        padding: "36px 32px",
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: DARK,
          marginBottom: 6,
          marginTop: 0,
        }}
      >
        First, tell us a little about you.
      </h2>
      <p
        style={{
          fontSize: 14,
          color: GREY,
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        This helps us tailor recommendations to your scale.
      </p>

      {/* ── Question 1: Role ── */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: DARK,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 14,
          }}
        >
          Your role
        </div>

        {/* 2×2 icon card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {ROLE_OPTIONS.map((option) => {
            const isSelected = state.role === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleRoleSelect(option.id)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  border: `2px solid ${isSelected ? NAVY : "#E2E4ED"}`,
                  borderRadius: 12,
                  padding: 20,
                  cursor: "pointer",
                  background: isSelected ? "#EEF0FB" : "white",
                  textAlign: "center",
                  transition: "all 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = NAVY;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E4ED";
                  }
                }}
              >
                {isSelected && <CheckBadge />}
                <RoleIcon path={option.iconPath} />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isSelected ? NAVY : DARK,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {option.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: GREY,
                    display: "block",
                  }}
                >
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Question 2: Team size ── */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: DARK,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 14,
          }}
        >
          Team size
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {TEAM_SIZE_OPTIONS.map((option) => {
            const isSelected = state.teamSize === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleTeamSizeSelect(option.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 24,
                  border: `2px solid ${isSelected ? NAVY : "#E2E4ED"}`,
                  background: isSelected ? "#EEF0FB" : "white",
                  color: isSelected ? NAVY : DARK,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = NAVY;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E4ED";
                  }
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Micro-insight — shows the most recently selected insight */}
      {lastInsight && <MicroInsight text={lastInsight} />}

      <PlannerNav
        onBack={onBack}
        onNext={onNext}
        canNext={canNext}
        showBack={false}
      />
    </div>
  );
}
