import type { PlannerState, PlannerAction } from "@/types/planner";
import PlannerNav from "./PlannerNav";

interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

const ROLE_OPTIONS = [
  { id: "solo-operator", label: "Solo operator", description: "I do everything" },
  { id: "business-owner", label: "Business owner", description: "I manage a team" },
  { id: "office-manager", label: "Office manager / operations lead", description: "" },
  { id: "team-lead", label: "Team lead / department head", description: "" },
];

const TEAM_SIZE_OPTIONS = [
  { id: "just-me", label: "Just me" },
  { id: "2-5", label: "2 to 5" },
  { id: "6-15", label: "6 to 15" },
  { id: "16-50", label: "16 to 50" },
  { id: "50+", label: "50+" },
];

const optionCardBase: React.CSSProperties = {
  border: "2px solid #E2E4ED",
  borderRadius: 10,
  padding: "14px 18px",
  cursor: "pointer",
  background: "white",
  textAlign: "left",
  width: "100%",
  transition: "border-color 0.15s, background 0.15s",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const optionCardSelected: React.CSSProperties = {
  ...optionCardBase,
  borderColor: "#283891",
  background: "#EEF0FB",
};

export default function StepRole({ state, dispatch, onNext, onBack }: Props) {
  const canNext = state.role !== null && state.teamSize !== null;

  function handleRoleSelect(id: string) {
    dispatch({ type: "SET_ROLE", role: id });
  }

  function handleTeamSizeSelect(id: string) {
    dispatch({ type: "SET_TEAM_SIZE", teamSize: id });
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
          color: "#1A1A2E",
          marginBottom: 6,
          marginTop: 0,
        }}
      >
        Tell us about your role
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#7B7B7B",
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        This helps us tailor recommendations to your scale.
      </p>

      {/* Role section */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1A1A2E",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Your role
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ROLE_OPTIONS.map((option) => {
            const isSelected = state.role === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleRoleSelect(option.id)}
                style={isSelected ? optionCardSelected : optionCardBase}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: isSelected ? "#283891" : "#1A1A2E",
                  }}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span style={{ fontSize: 13, color: "#7B7B7B" }}>
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Team size section */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1A1A2E",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Team size
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
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
                  border: `2px solid ${isSelected ? "#283891" : "#E2E4ED"}`,
                  borderRadius: 10,
                  padding: "12px 8px",
                  cursor: "pointer",
                  background: isSelected ? "#EEF0FB" : "white",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: 15,
                  color: isSelected ? "#283891" : "#1A1A2E",
                  transition: "border-color 0.15s, background 0.15s, color 0.15s",
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <PlannerNav
        onBack={onBack}
        onNext={onNext}
        canNext={canNext}
        showBack={false}
      />
    </div>
  );
}
