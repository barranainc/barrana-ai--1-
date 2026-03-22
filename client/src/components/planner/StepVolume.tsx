import { useState } from "react";
import type { PlannerState, PlannerAction } from "@/types/planner";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

const READINESS_OPTIONS = [
  {
    value: "ready" as const,
    label: "Ready to start",
    sublabel: "I want to implement within 30 days",
  },
  {
    value: "interested" as const,
    label: "Interested",
    sublabel: "I want to understand my options",
  },
  {
    value: "exploring" as const,
    label: "Just exploring",
    sublabel: "I am researching what is possible",
  },
];

const VOLUME_FIELDS: {
  field: keyof PlannerState["volume"];
  label: string;
  placeholder: string;
}[] = [
  {
    field: "enquiriesPerWeek",
    label: "Approximate enquiries or leads per week",
    placeholder: "e.g. 20",
  },
  {
    field: "appointmentsPerWeek",
    label: "Appointments per week",
    placeholder: "e.g. 30",
  },
  {
    field: "activeClientsPerMonth",
    label: "Active clients or files per month",
    placeholder: "e.g. 50",
  },
  {
    field: "adminHoursPerWeek",
    label: "Hours your team spends on repetitive admin per week",
    placeholder: "e.g. 15",
  },
];

export default function StepVolume({ state, dispatch, onNext, onBack }: StepProps) {
  const [showVolumeHint, setShowVolumeHint] = useState(false);

  const canNext = state.readiness !== null;

  const allVolumeEmpty =
    state.volume.enquiriesPerWeek === null &&
    state.volume.appointmentsPerWeek === null &&
    state.volume.activeClientsPerMonth === null &&
    state.volume.adminHoursPerWeek === null;

  const handleVolumeChange = (
    field: keyof PlannerState["volume"],
    rawValue: string
  ) => {
    const parsed = parseInt(rawValue, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      dispatch({ type: "SET_VOLUME", field, value: parsed });
    } else if (rawValue === "") {
      // Allow clearing — treat as null by dispatching 0 then checking display
      dispatch({ type: "SET_VOLUME", field, value: 0 });
    }
  };

  const getDisplayValue = (val: number | null): string => {
    if (val === null || val === 0) return "";
    return String(val);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
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
        A few numbers to help us size the opportunity.
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#7B7B7B",
          lineHeight: 1.6,
          marginBottom: 32,
          marginTop: 0,
        }}
      >
        Approximate numbers are fine. This helps us estimate the impact
        automation could have.
      </p>

      {/* Volume inputs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
        {VOLUME_FIELDS.map(({ field, label, placeholder }) => (
          <div key={field}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#1A1A2E",
                marginBottom: 6,
              }}
            >
              {label}
            </label>
            <input
              type="number"
              min="0"
              placeholder={placeholder}
              value={getDisplayValue(state.volume[field])}
              onChange={(e) => handleVolumeChange(field, e.target.value)}
              onFocus={() => setShowVolumeHint(false)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "2px solid #E2E4ED",
                fontSize: 15,
                color: "#1A1A2E",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
                background: "white",
              }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = "#283891";
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = "#E2E4ED";
              }}
            />
          </div>
        ))}
      </div>

      {/* Gentle hint if all volume fields empty */}
      {allVolumeEmpty && showVolumeHint && (
        <div
          style={{
            background: "#FFF8E7",
            border: "1px solid #F59E0B",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 24,
            fontSize: 13,
            color: "#92400E",
            lineHeight: 1.5,
          }}
        >
          Adding even rough numbers helps us personalise your impact estimates.
          These are optional but recommended.
        </div>
      )}

      {/* Readiness question */}
      <div style={{ marginBottom: 36 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1A1A2E",
            marginBottom: 14,
            marginTop: 0,
          }}
        >
          How ready are you to explore automation?
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {READINESS_OPTIONS.map((opt) => {
            const isSelected = state.readiness === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  dispatch({ type: "SET_READINESS", readiness: opt.value });
                  if (allVolumeEmpty) setShowVolumeHint(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
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
                {/* Radio indicator */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: isSelected
                      ? "2px solid #283891"
                      : "2px solid #C5C8D6",
                    background: "white",
                    flexShrink: 0,
                    marginTop: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#283891",
                      }}
                    />
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? "#283891" : "#1A1A2E",
                      marginBottom: 2,
                    }}
                  >
                    {opt.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: isSelected ? "#4B61B8" : "#7B7B7B",
                    }}
                  >
                    {opt.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
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
          onClick={() => {
            if (!canNext) return;
            if (allVolumeEmpty) {
              setShowVolumeHint(true);
            }
            onNext();
          }}
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
          See My Results
        </button>
      </div>
    </div>
  );
}
