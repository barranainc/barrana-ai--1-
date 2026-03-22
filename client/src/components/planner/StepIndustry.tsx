import { useState } from "react";
import type { PlannerState, PlannerAction, Industry } from "@/types/planner";
import { INDUSTRIES } from "@/config/planner/industries";
import PlannerNav from "./PlannerNav";

interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

export default function StepIndustry({ state, dispatch, onNext, onBack }: Props) {
  const [otherText, setOtherText] = useState(state.industryOther ?? "");

  const canNext = state.industry !== null;

  function handleSelect(id: Industry) {
    dispatch({
      type: "SET_INDUSTRY",
      industry: id,
      other: id === "other" ? otherText : undefined,
    });
  }

  function handleOtherTextChange(value: string) {
    setOtherText(value);
    if (state.industry === "other") {
      dispatch({ type: "SET_INDUSTRY", industry: "other", other: value });
    }
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 2px 20px rgba(40,56,145,0.08)",
        padding: "36px 32px",
        maxWidth: 720,
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
        What type of business do you run?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#7B7B7B",
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        We'll use industry-specific language and tailor your results.
      </p>

      {/* Industry grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {INDUSTRIES.map((industry) => {
          const isSelected = state.industry === industry.id;
          return (
            <button
              key={industry.id}
              type="button"
              onClick={() => handleSelect(industry.id as Industry)}
              style={{
                border: `2px solid ${isSelected ? "#283891" : "#E2E4ED"}`,
                borderRadius: 10,
                padding: "14px 16px",
                cursor: "pointer",
                background: isSelected ? "#EEF0FB" : "white",
                textAlign: "left",
                fontSize: 14,
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? "#283891" : "#1A1A2E",
                transition: "border-color 0.15s, background 0.15s, color 0.15s",
                lineHeight: 1.4,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#283891";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E4ED";
                }
              }}
            >
              {industry.label}
            </button>
          );
        })}
      </div>

      {/* "Other" text input */}
      {state.industry === "other" && (
        <div style={{ marginBottom: 8 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 8,
            }}
          >
            Please describe your business type
          </label>
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            placeholder="e.g. Veterinary clinic, Fitness studio..."
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "2px solid #E2E4ED",
              fontSize: 14,
              color: "#1A1A2E",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "#283891";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "#E2E4ED";
            }}
          />
        </div>
      )}

      <PlannerNav
        onBack={onBack}
        onNext={onNext}
        canNext={canNext}
        showBack={true}
      />
    </div>
  );
}
