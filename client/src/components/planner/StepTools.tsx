import { useState } from "react";
import type { PlannerState, PlannerAction } from "@/types/planner";
import { TOOLS } from "@/config/planner/tools";
import PlannerNav from "./PlannerNav";

interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

// Build category groups from TOOLS array
function groupToolsByCategory(tools: typeof TOOLS) {
  const groups: Record<string, typeof TOOLS> = {};
  for (const tool of tools) {
    if (!groups[tool.category]) {
      groups[tool.category] = [];
    }
    groups[tool.category].push(tool);
  }
  return groups;
}

const MOSTLY_MANUAL_ID = "mostly-manual";
const OTHER_ID = "other-tool";

export default function StepTools({ state, dispatch, onNext, onBack }: Props) {
  const [otherText, setOtherText] = useState(state.toolsOther ?? "");
  const canNext = true; // Always true — tools is optional

  const toolGroups = groupToolsByCategory(TOOLS);
  // Category display order
  const categoryOrder = [
    "Productivity",
    "CRM",
    "Project Management",
    "Accounting",
    "Scheduling",
    "Payments",
    "E-commerce",
    "Healthcare",
    "Legal",
    "Field Service",
    "Communication",
    "Manual",
  ];

  function handleToggle(toolId: string) {
    if (toolId === MOSTLY_MANUAL_ID) {
      // Exclusive: deselect everything else, toggle "mostly manual"
      const isAlreadySelected = state.tools.includes(MOSTLY_MANUAL_ID);
      if (isAlreadySelected) {
        dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
      } else {
        // Clear all other tools first, then select mostly-manual
        state.tools
          .filter((t) => t !== MOSTLY_MANUAL_ID)
          .forEach((t) => dispatch({ type: "TOGGLE_TOOL", toolId: t }));
        dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
      }
    } else {
      // If mostly-manual is selected, deselect it first
      if (state.tools.includes(MOSTLY_MANUAL_ID)) {
        dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
      }
      dispatch({ type: "TOGGLE_TOOL", toolId });
    }
  }

  function handleOtherTextChange(value: string) {
    setOtherText(value);
    dispatch({ type: "SET_TOOLS_OTHER", other: value });
  }

  function handleOtherToggle() {
    // "Other" is a virtual tool not in TOOLS array — handle via toolsOther state
    const isSelected = state.tools.includes(OTHER_ID);
    if (!isSelected && state.tools.includes(MOSTLY_MANUAL_ID)) {
      dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
    }
    dispatch({ type: "TOGGLE_TOOL", toolId: OTHER_ID });
  }

  const isOtherSelected = state.tools.includes(OTHER_ID);

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
        What tools do you currently use?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#7B7B7B",
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        Select all that apply. You can skip this step if you prefer.
      </p>

      {/* Tool groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {categoryOrder
          .filter((cat) => toolGroups[cat])
          .map((category) => {
            const categoryTools = toolGroups[category];

            return (
              <div key={category}>
                {/* Category header */}
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#7B7B7B",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 10,
                    paddingBottom: 6,
                    borderBottom: "1px solid #F0F1F7",
                  }}
                >
                  {category}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 8,
                  }}
                >
                  {categoryTools.map((tool) => {
                    const isSelected = state.tools.includes(tool.id);
                    const isMostlyManual = tool.id === MOSTLY_MANUAL_ID;

                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => handleToggle(tool.id)}
                        style={{
                          border: `2px solid ${isSelected ? "#283891" : "#E2E4ED"}`,
                          borderRadius: 10,
                          padding: "12px 14px",
                          cursor: "pointer",
                          background: isSelected
                            ? isMostlyManual
                              ? "#FFF0F6"
                              : "#EEF0FB"
                            : "white",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          transition: "border-color 0.15s, background 0.15s",
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
                        {/* Checkbox */}
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: `2px solid ${isSelected ? "#283891" : "#C8CADC"}`,
                            background: isSelected ? "#283891" : "white",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "border-color 0.15s, background 0.15s",
                          }}
                        >
                          {isSelected && (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path
                                d="M1.5 4L3 5.5L6.5 2"
                                stroke="white"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>

                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? "#283891" : "#1A1A2E",
                            lineHeight: 1.4,
                          }}
                        >
                          {tool.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* "Other" option */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#7B7B7B",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 10,
              paddingBottom: 6,
              borderBottom: "1px solid #F0F1F7",
            }}
          >
            Other
          </div>

          <button
            type="button"
            onClick={handleOtherToggle}
            style={{
              border: `2px solid ${isOtherSelected ? "#283891" : "#E2E4ED"}`,
              borderRadius: 10,
              padding: "12px 14px",
              cursor: "pointer",
              background: isOtherSelected ? "#EEF0FB" : "white",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "border-color 0.15s, background 0.15s",
              marginBottom: isOtherSelected ? 10 : 0,
            }}
            onMouseEnter={(e) => {
              if (!isOtherSelected) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#283891";
              }
            }}
            onMouseLeave={(e) => {
              if (!isOtherSelected) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E4ED";
              }
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: `2px solid ${isOtherSelected ? "#283891" : "#C8CADC"}`,
                background: isOtherSelected ? "#283891" : "white",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              {isOtherSelected && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3 5.5L6.5 2"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: isOtherSelected ? 600 : 500,
                color: isOtherSelected ? "#283891" : "#1A1A2E",
              }}
            >
              Other tool or platform
            </span>
          </button>

          {isOtherSelected && (
            <input
              type="text"
              value={otherText}
              onChange={(e) => handleOtherTextChange(e.target.value)}
              placeholder="e.g. Salesforce, Notion, custom ERP..."
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 8,
                border: "2px solid #E2E4ED",
                fontSize: 13,
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
          )}
        </div>
      </div>

      <PlannerNav
        onBack={onBack}
        onNext={onNext}
        canNext={canNext}
        nextLabel="Next"
        showBack={true}
      />
    </div>
  );
}
