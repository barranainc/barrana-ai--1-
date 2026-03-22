import type { PlannerState, PlannerAction, PainPointId } from "@/types/planner";
import { PAIN_POINTS } from "@/config/planner/painPoints";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPainPoints({ state, dispatch, onNext, onBack }: StepProps) {
  const selected = state.painPoints;
  const maxReached = selected.length >= 3;
  const canNext = selected.length === 3;

  const toggle = (id: PainPointId) => {
    dispatch({ type: "TOGGLE_PAIN_POINT", painPointId: id });
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
        What is causing the most pain right now?
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#7B7B7B",
          lineHeight: 1.6,
          marginBottom: 8,
          marginTop: 0,
        }}
      >
        Choose your top 3. These will drive our priority recommendations.
      </p>

      {/* Counter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 8,
                borderRadius: 4,
                background: i < selected.length ? "#7E0F4A" : "#E2E4ED",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: selected.length === 3 ? "#7E0F4A" : "#7B7B7B",
          }}
        >
          {selected.length} of 3 selected
        </span>
      </div>

      {/* Options grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 10,
          marginBottom: 32,
        }}
      >
        {PAIN_POINTS.map((pp) => {
          const isSelected = selected.includes(pp.id);
          const isDisabled = maxReached && !isSelected;

          return (
            <button
              key={pp.id}
              type="button"
              onClick={() => !isDisabled && toggle(pp.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 16px",
                border: isSelected
                  ? "2px solid #7E0F4A"
                  : "2px solid #E2E4ED",
                borderRadius: 10,
                background: isSelected
                  ? "#FDF0F6"
                  : isDisabled
                  ? "#F9F9FA"
                  : "#FFFFFF",
                cursor: isDisabled ? "not-allowed" : "pointer",
                textAlign: "left",
                opacity: isDisabled ? 0.5 : 1,
                transition: "all 0.15s",
              }}
            >
              {/* Checkbox indicator */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  border: isSelected ? "2px solid #7E0F4A" : "2px solid #C5C8D6",
                  background: isSelected ? "#7E0F4A" : "white",
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
                  color: isSelected ? "#7E0F4A" : "#1A1A2E",
                  lineHeight: 1.4,
                }}
              >
                {pp.label}
              </span>
            </button>
          );
        })}
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
          disabled={!canNext}
          style={{
            flex: 1,
            padding: "13px 24px",
            borderRadius: 8,
            border: "none",
            background: canNext ? "#283891" : "#C5C8D6",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: canNext ? "pointer" : "not-allowed",
            transition: "background 0.15s",
          }}
        >
          {canNext ? "Continue" : `Select ${3 - selected.length} more`}
        </button>
      </div>
    </div>
  );
}
