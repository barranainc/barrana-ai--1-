import type { PlannerState, PlannerAction } from "@/types/planner";
import { HUMAN_REQUIRED_OPTIONS } from "@/config/planner/humanRequired";

const NAVY = "#283891";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

const OPTION_EMOJIS: Record<string, string> = {
  "professional-judgement": "🧠",
  "legal-regulated": "⚖️",
  "pricing-decisions": "💰",
  "sensitive-documents": "🔒",
  "comms-approval": "💬",
  "payment-approval": "💳",
  "edge-cases": "⚠️",
  "complex-escalation": "🔺",
  "relationship-conversations": "🤝",
  "final-signoff": "✅",
};

interface ToggleSwitchProps {
  isSelected: boolean;
}

function ToggleSwitch({ isSelected }: ToggleSwitchProps) {
  return (
    <div style={{ position: "relative", width: 44, height: 24, flexShrink: 0 }}>
      <div
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: isSelected ? NAVY : "#E2E4ED",
          transition: "background 0.2s",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "white",
            top: 3,
            left: isSelected ? 23 : 3,
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}

export default function StepHumanRequired({
  state,
  dispatch,
  onNext,
  onBack,
}: StepProps) {
  const selected = state.humanRequired;

  const toggle = (id: string) => {
    dispatch({ type: "TOGGLE_HUMAN_REQUIRED", optionId: id });
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <h2
        style={{
          fontSize: "clamp(22px, 4vw, 28px)",
          fontWeight: 800,
          color: NAVY,
          marginBottom: 10,
          marginTop: 0,
          lineHeight: 1.2,
        }}
      >
        What should stay in your hands?
      </h2>
      <p
        style={{
          fontSize: 15,
          color: GREY,
          lineHeight: 1.6,
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        Good automation has clear boundaries. Select anything that should not be
        fully automated. We will build these as control points.
      </p>

      {/* Toggle card list */}
      <div style={{ marginBottom: 16 }}>
        {HUMAN_REQUIRED_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.id);
          const emoji = OPTION_EMOJIS[option.id] ?? "•";

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 18px",
                border: isSelected
                  ? `2px solid ${NAVY}`
                  : "2px solid #E2E4ED",
                borderRadius: 12,
                background: isSelected ? "#EEF0FB" : "white",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.15s",
                marginBottom: 10,
              }}
            >
              {/* Left: emoji + text */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    flexShrink: 0,
                    marginTop: 2,
                    lineHeight: 1,
                  }}
                >
                  {emoji}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isSelected ? NAVY : DARK,
                      lineHeight: 1.3,
                    }}
                  >
                    {option.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: GREY,
                      lineHeight: 1.5,
                      marginTop: 3,
                    }}
                  >
                    {option.impactDescription}
                  </div>
                </div>
              </div>

              {/* Right: toggle */}
              <ToggleSwitch isSelected={isSelected} />
            </button>
          );
        })}
      </div>

      {/* Shield visual — shown when >= 1 selected */}
      {selected.length >= 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: "#F0F4FF",
            border: "1.5px solid #C4CCE8",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: NAVY,
            marginBottom: selected.length >= 3 ? 10 : 32,
          }}
        >
          🛡️{" "}
          <span>
            {selected.length} control {selected.length === 1 ? "point" : "points"} set
          </span>
        </div>
      )}

      {/* Reassurance message — shown when >= 3 selected */}
      {selected.length >= 3 && (
        <div
          style={{
            display: "flex",
            gap: 10,
            background: "#FFF9F0",
            border: "1.5px solid #FED7AA",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 13,
            color: "#92400E",
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          <span style={{ flexShrink: 0 }}>💡</span>
          <span>
            You have set {selected.length} control points. That is good. The
            automation handles everything around these boundaries while keeping
            you in charge of the decisions that matter.
          </span>
        </div>
      )}

      {/* Spacer when no shield or reassurance shown */}
      {selected.length === 0 && <div style={{ marginBottom: 32 }} />}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "13px 24px",
            borderRadius: 8,
            border: "2px solid #E2E4ED",
            background: "white",
            color: DARK,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          style={{
            flex: 1,
            padding: "13px 24px",
            borderRadius: 8,
            border: "none",
            background: NAVY,
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
