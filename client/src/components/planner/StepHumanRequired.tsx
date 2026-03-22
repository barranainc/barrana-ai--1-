import type { PlannerState, PlannerAction } from "@/types/planner";
import { HUMAN_REQUIRED_OPTIONS } from "@/config/planner/humanRequired";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

export default function StepHumanRequired({ state, dispatch, onNext, onBack }: StepProps) {
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
          color: "#283891",
          marginBottom: 10,
          marginTop: 0,
          lineHeight: 1.2,
        }}
      >
        What should stay in human hands?
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#7B7B7B",
          lineHeight: 1.6,
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        Automation works best when boundaries are clear. Select anything that
        should not be fully automated in your business.
      </p>

      {/* Options grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {HUMAN_REQUIRED_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 16px",
                border: isSelected
                  ? "2px solid #283891"
                  : "2px solid #E2E4ED",
                borderRadius: 10,
                background: isSelected ? "#EEF1FA" : "#FFFFFF",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              {/* Checkbox indicator */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  border: isSelected ? "2px solid #283891" : "2px solid #C5C8D6",
                  background: isSelected ? "#283891" : "white",
                  flexShrink: 0,
                  marginTop: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isSelected && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L4.5 8.5L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              <span
                style={{
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? "#283891" : "#1A1A2E",
                  lineHeight: 1.4,
                }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <div
        style={{
          background: "#F7F8FC",
          border: "1px solid #E2E4ED",
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 32,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          style={{ flexShrink: 0, marginTop: 1 }}
        >
          <circle cx="10" cy="10" r="9" stroke="#283891" strokeWidth="1.5" />
          <path
            d="M10 9v5M10 6.5v.5"
            stroke="#283891"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <p style={{ fontSize: 13, color: "#7B7B7B", margin: 0, lineHeight: 1.5 }}>
          We build automation with these boundaries in mind. Sensitive steps get
          human approval gates, not full automation.
        </p>
      </div>

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
            color: "#1A1A2E",
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
            background: "#283891",
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
