import { useState } from "react";
import type { PlannerState, PlannerAction, PainPointId } from "@/types/planner";
import { PAIN_POINT_MAP } from "@/config/planner/painPoints";

const NAVY = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

interface PainPointCard {
  id: PainPointId;
  label: string;
  oneLiner: string;
}

const PAIN_POINT_CARDS: PainPointCard[] = [
  {
    id: "missed-leads",
    label: "Missed leads or slow response",
    oneLiner: "Prospects book with whoever responds first",
  },
  {
    id: "too-much-admin",
    label: "Too much time on admin",
    oneLiner: "Half the day goes to tasks that generate zero revenue",
  },
  {
    id: "messy-onboarding",
    label: "Messy client onboarding",
    oneLiner:
      "Every new client is a different experience depending on who handles it",
  },
  {
    id: "staff-overloaded",
    label: "Staff overloaded",
    oneLiner:
      "Your team is good. They are just drowning in coordination work.",
  },
  {
    id: "manual-follow-ups",
    label: "Manual follow-ups falling through",
    oneLiner: "Quotes sent, never followed up. Leads gone.",
  },
  {
    id: "no-visibility",
    label: "No visibility into operations",
    oneLiner: "You find out something dropped when the client complains",
  },
  {
    id: "no-shows",
    label: "No-shows and scheduling friction",
    oneLiner: "Empty slots that could have been filled",
  },
  {
    id: "repeated-questions",
    label: "Repeated questions consuming time",
    oneLiner: "Answering the same thing 15 times a week",
  },
  {
    id: "poor-handoffs",
    label: "Poor handoffs between people",
    oneLiner: "Work gets stuck because someone was not notified",
  },
  {
    id: "duplicate-entry",
    label: "Duplicate data entry",
    oneLiner: "Typing the same information into 3 different systems",
  },
  {
    id: "inconsistent-experience",
    label: "Inconsistent client experience",
    oneLiner: "Quality depends on who handles it, not on a system",
  },
  {
    id: "invoicing-delays",
    label: "Invoicing delays and cash flow",
    oneLiner: "Work finishes. Invoice goes out 2 weeks later.",
  },
];

const TWO_SELECTION_INSIGHTS: Record<string, string> = {
  "missed-leads+manual-follow-ups":
    "These two together point to a lead capture and follow-up automation sequence.",
  "manual-follow-ups+missed-leads":
    "These two together point to a lead capture and follow-up automation sequence.",
  "too-much-admin+messy-onboarding":
    "These two suggest client onboarding and workflow automation are your biggest opportunities.",
  "messy-onboarding+too-much-admin":
    "These two suggest client onboarding and workflow automation are your biggest opportunities.",
  "no-shows+scheduling-friction":
    "These two point to automated booking reminders as your highest-impact quick win.",
  "scheduling-friction+no-shows":
    "These two point to automated booking reminders as your highest-impact quick win.",
};

function getTwoSelectionInsight(ids: PainPointId[]): string {
  const key = ids.join("+");
  return (
    TWO_SELECTION_INSIGHTS[key] ||
    "These two priorities help us narrow your recommendations to the highest-impact workflows."
  );
}

function getThreeSelectionWorkflowCount(ids: PainPointId[]): number {
  const workflows = new Set<string>();
  ids.forEach((id) => {
    const def = PAIN_POINT_MAP[id];
    if (def) {
      def.mappedWorkflows.forEach((w) => workflows.add(w));
    }
  });
  return workflows.size;
}

export default function StepPainPoints({
  state,
  dispatch,
  onNext,
  onBack,
}: StepProps) {
  const selected = state.painPoints;
  const maxReached = selected.length >= 3;
  const canNext = selected.length === 3;

  // Track selection order locally — parallel to state.painPoints
  const [selectionOrder, setSelectionOrder] = useState<PainPointId[]>([]);

  const toggle = (id: PainPointId) => {
    const isSelected = selected.includes(id);
    if (isSelected) {
      setSelectionOrder((prev) => prev.filter((s) => s !== id));
    } else {
      if (maxReached) return;
      setSelectionOrder((prev) => [...prev, id]);
    }
    dispatch({ type: "TOGGLE_PAIN_POINT", painPointId: id });
  };

  // Impact preview content
  const renderImpactPreview = () => {
    if (selected.length === 0) return null;

    let text = "";
    if (selected.length === 1) {
      text = "Your #1 priority will be the focus of our top recommendation.";
    } else if (selected.length === 2) {
      text = getTwoSelectionInsight(selected);
    } else {
      const count = getThreeSelectionWorkflowCount(selected);
      text = `Your three priorities point to ${count} workflows to dig into. Let us explore those next.`;
    }

    return (
      <div
        style={{
          background: "#EEF1FA",
          border: "1.5px solid #C4CCE8",
          borderRadius: 10,
          padding: "12px 16px",
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 1.6,
          marginTop: 16,
        }}
      >
        {text}
      </div>
    );
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
        What is causing the most friction right now?
      </h2>
      <p
        style={{
          fontSize: 15,
          color: GREY,
          lineHeight: 1.6,
          marginBottom: 8,
          marginTop: 0,
        }}
      >
        Choose your top 3. These will drive your priority recommendations.
      </p>

      {/* Selection counter with dot indicators */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => {
            const isFilled = i < selected.length;
            return (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: isFilled ? BURGUNDY : "#E2E4ED",
                  border: isFilled ? `2px solid ${BURGUNDY}` : "2px solid #C5C8D6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "white",
                }}
              >
                {isFilled ? i + 1 : null}
              </div>
            );
          })}
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: selected.length === 3 ? BURGUNDY : GREY,
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
        }}
      >
        {PAIN_POINT_CARDS.map((pp) => {
          const isSelected = selected.includes(pp.id);
          const isDisabled = maxReached && !isSelected;
          const orderIndex = selectionOrder.indexOf(pp.id);
          const badgeNumber = isSelected && orderIndex !== -1 ? orderIndex + 1 : null;

          return (
            <button
              key={pp.id}
              type="button"
              onClick={() => !isDisabled && toggle(pp.id)}
              style={{
                position: "relative",
                padding: "14px 16px",
                border: isSelected
                  ? `2px solid ${BURGUNDY}`
                  : "2px solid #E2E4ED",
                borderRadius: 12,
                background: isSelected
                  ? "#FDF0F6"
                  : "white",
                cursor: isDisabled ? "not-allowed" : "pointer",
                textAlign: "left",
                width: "100%",
                opacity: isDisabled ? 0.45 : 1,
                transition: "all 0.15s",
              }}
            >
              {/* Number badge */}
              {badgeNumber !== null && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: BURGUNDY,
                    color: "white",
                    fontSize: 13,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {badgeNumber}
                </div>
              )}

              {/* Card content */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: isSelected ? BURGUNDY : DARK,
                  lineHeight: 1.3,
                  paddingRight: isSelected ? 30 : 0,
                }}
              >
                {pp.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: GREY,
                  lineHeight: 1.4,
                  marginTop: 4,
                }}
              >
                {pp.oneLiner}
              </div>
            </button>
          );
        })}
      </div>

      {/* Impact preview */}
      {renderImpactPreview()}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
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
          disabled={!canNext}
          style={{
            flex: 1,
            padding: "13px 24px",
            borderRadius: 8,
            border: "none",
            background: canNext ? NAVY : "#C5C8D6",
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
