import type { PlannerState, PlannerAction, WorkflowId } from "@/types/planner";
import { PAIN_POINT_MAP } from "@/config/planner/painPoints";
import { WORKFLOW_MAP } from "@/config/planner/workflows";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

const WORKFLOW_EMOJIS: Record<string, string> = {
  "inbound-enquiries": "📥",
  "phone-calls": "📞",
  "lead-qualification": "🔍",
  "appointment-booking": "📅",
  "follow-up": "💬",
  "client-onboarding": "👋",
  "document-collection": "📄",
  "estimates-proposals": "📝",
  "invoicing-payments": "💰",
  "customer-support": "🎧",
  "internal-updates": "🔄",
  "reporting": "📊",
  "review-requests": "⭐",
  "scheduling-reminders": "🔔",
};

const QUESTION_INSIGHTS: Record<string, Record<string, string>> = {
  "inbound-enquiries": {
    default:
      "Research shows responding within 5 minutes is 21x more effective than responding within 30 minutes. Most businesses do not know where they fall on this spectrum.",
  },
  "appointment-booking": {
    default:
      "The average booking process takes 2-3 back-and-forth exchanges over 1-2 days. Automated booking cuts this to under 3 minutes.",
  },
  "document-collection": {
    default:
      "On average, firms spend 15 hours per week chasing missing documents. Automated 48-hour reminders cut collection time in half.",
  },
  "follow-up": {
    default:
      "80% of sales require 5+ follow-up contacts. Most businesses give up after 1-2. Automation handles the persistence so you do not have to.",
  },
  "scheduling-reminders": {
    default:
      "Automated appointment reminders reduce no-shows by 40-60% on average. Two reminders (48hr + 2hr) work better than one.",
  },
  "invoicing-payments": {
    default:
      "Businesses that automate invoice sending get paid 15 days faster on average. Consistent follow-up at 7, 14, and 21 days dramatically improves collection.",
  },
};

function getDeepDiveWorkflows(state: PlannerState): WorkflowId[] {
  if (state.painPoints.length === 0) {
    return state.selectedWorkflows.slice(0, 3) as WorkflowId[];
  }
  const painMapped = new Set<string>();
  state.painPoints.forEach((pp) => {
    PAIN_POINT_MAP[pp]?.mappedWorkflows?.forEach((w) => painMapped.add(w));
  });
  const intersection = state.selectedWorkflows.filter((w) => painMapped.has(w));
  const result = intersection.slice(0, 3);
  return (result.length > 0 ? result : state.selectedWorkflows.slice(0, 3)) as WorkflowId[];
}

export default function StepDeepDive({ state, dispatch, onNext, onBack }: StepProps) {
  const deepDiveWorkflows = getDeepDiveWorkflows(state);

  const canNext = deepDiveWorkflows.every((wId) => {
    const wDef = WORKFLOW_MAP[wId];
    if (!wDef || wDef.questions.length === 0) return true;
    const firstQ = wDef.questions[0];
    const answer = state.workflowAnswers[wId]?.[firstQ.id];
    return answer !== undefined && answer !== null && answer !== "" && !(Array.isArray(answer) && answer.length === 0);
  });

  const handleSingleAnswer = (workflowId: WorkflowId, questionId: string, answer: string) => {
    dispatch({ type: "SET_WORKFLOW_ANSWER", workflowId, questionId, answer });
  };

  const handleMultiAnswer = (workflowId: WorkflowId, questionId: string, option: string) => {
    const current = (state.workflowAnswers[workflowId]?.[questionId] as string[]) ?? [];
    const newVal = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];
    dispatch({ type: "SET_WORKFLOW_ANSWER", workflowId, questionId, answer: newVal });
  };

  const hasFirstQuestionAnswer = (wId: WorkflowId): boolean => {
    const wDef = WORKFLOW_MAP[wId];
    if (!wDef || wDef.questions.length === 0) return false;
    const firstQ = wDef.questions[0];
    const answer = state.workflowAnswers[wId]?.[firstQ.id];
    return answer !== undefined && answer !== null && answer !== "" && !(Array.isArray(answer) && answer.length === 0);
  };

  if (deepDiveWorkflows.length === 0) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px" }}>
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 28px)",
            fontWeight: 800,
            color: "#283891",
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          Let us dig into what matters most.
        </h2>
        <p style={{ color: "#7B7B7B", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
          No workflows were selected. Please go back and select some workflows first.
        </p>
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
            Skip this step
          </button>
        </div>
      </div>
    );
  }

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
        Let us dig into what matters most.
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
        We are focusing on the{" "}
        <strong style={{ color: "#1A1A2E" }}>{deepDiveWorkflows.length}</strong>{" "}
        {deepDiveWorkflows.length === 1 ? "area" : "areas"} causing you the most friction. Quick focused questions for each.
      </p>

      {/* Workflow sections */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {deepDiveWorkflows.map((wId, wIndex) => {
          const wDef = WORKFLOW_MAP[wId];
          if (!wDef) return null;
          const emoji = WORKFLOW_EMOJIS[wId] ?? "⚙️";
          const insightMap = QUESTION_INSIGHTS[wId];
          const showInsight = hasFirstQuestionAnswer(wId) && insightMap;
          const insightText = insightMap?.default;

          return (
            <div key={wId}>
              {/* Workflow section header */}
              <div
                style={{
                  background: "#F7F9FC",
                  border: "1.5px solid #E2E4ED",
                  borderRadius: 12,
                  padding: "14px 18px",
                  marginBottom: 16,
                  marginTop: wIndex === 0 ? 24 : 24,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 22, marginRight: 10 }}>{emoji}</span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#1A1A2E",
                  }}
                >
                  {wDef.label}
                </span>
              </div>

              {/* Questions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: 4, paddingRight: 4 }}>
                {wDef.questions.map((q, qIndex) => {
                  const currentAnswer = state.workflowAnswers[wId]?.[q.id];
                  const hasAnswer =
                    currentAnswer !== undefined &&
                    currentAnswer !== null &&
                    currentAnswer !== "" &&
                    !(Array.isArray(currentAnswer) && currentAnswer.length === 0);

                  return (
                    <div key={q.id}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1A1A2E",
                          marginBottom: 12,
                          marginTop: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {q.question}
                        {q.type === "multi" && (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 400,
                              color: "#7B7B7B",
                              marginLeft: 6,
                            }}
                          >
                            (select all that apply)
                          </span>
                        )}
                      </p>

                      {q.type === "single" ? (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 10,
                          }}
                        >
                          {q.options.map((opt) => {
                            const isSelected = currentAnswer === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSingleAnswer(wId, q.id, opt)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  padding: "14px 16px",
                                  borderRadius: 10,
                                  border: isSelected ? "2px solid #283891" : "2px solid #E2E4ED",
                                  background: isSelected ? "#EEF0FB" : "white",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  fontSize: 14,
                                  fontWeight: isSelected ? 700 : 500,
                                  color: isSelected ? "#283891" : "#1A1A2E",
                                  transition: "all 0.15s",
                                }}
                              >
                                {/* Radio dot */}
                                <div
                                  style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    border: isSelected ? "2px solid #283891" : "2px solid #C5C8D6",
                                    background: "white",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {isSelected && (
                                    <div
                                      style={{
                                        width: 9,
                                        height: 9,
                                        borderRadius: "50%",
                                        background: "#283891",
                                      }}
                                    />
                                  )}
                                </div>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {q.options.map((opt) => {
                            const multiAnswer = (currentAnswer as string[]) ?? [];
                            const isSelected = multiAnswer.includes(opt);
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleMultiAnswer(wId, q.id, opt)}
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: 20,
                                  border: isSelected ? "2px solid #283891" : "2px solid #E2E4ED",
                                  background: isSelected ? "#EEF0FB" : "white",
                                  cursor: "pointer",
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: isSelected ? "#283891" : "#1A1A2E",
                                  transition: "all 0.15s",
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Micro-insight after first question when answered */}
                      {qIndex === 0 && hasAnswer && showInsight && insightText && (
                        <div
                          style={{
                            marginTop: 14,
                            background: "#FFF9F0",
                            border: "1.5px solid #FED7AA",
                            borderRadius: 10,
                            padding: "12px 14px",
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                          }}
                        >
                          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>💡</span>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              color: "#92400E",
                              lineHeight: 1.6,
                            }}
                          >
                            {insightText}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
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
          {canNext ? "Continue" : "Answer the highlighted questions"}
        </button>
      </div>
    </div>
  );
}
