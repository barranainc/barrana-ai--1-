import type { PlannerState, PlannerAction, WorkflowId } from "@/types/planner";
import { PAIN_POINT_MAP } from "@/config/planner/painPoints";
import { WORKFLOW_MAP } from "@/config/planner/workflows";

interface StepProps {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

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
  // If intersection is empty, fall back to top 3 selected workflows
  return (result.length > 0 ? result : state.selectedWorkflows.slice(0, 3)) as WorkflowId[];
}

export default function StepDeepDive({ state, dispatch, onNext, onBack }: StepProps) {
  const deepDiveWorkflows = getDeepDiveWorkflows(state);

  // canNext: at least the first question of each workflow has an answer
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
          Let us dig into the workflows that matter most.
        </h2>
        <p style={{ color: "#7B7B7B", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
          No workflows were selected. Please go back and select some workflows first.
        </p>
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
        Let us dig into the workflows that matter most.
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#7B7B7B",
          lineHeight: 1.6,
          marginBottom: 36,
          marginTop: 0,
        }}
      >
        We will ask a few focused questions about each.
      </p>

      {/* Workflow sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {deepDiveWorkflows.map((wId, wIndex) => {
          const wDef = WORKFLOW_MAP[wId];
          if (!wDef) return null;

          return (
            <div key={wId}>
              {/* Workflow heading */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: "2px solid #E2E4ED",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#283891",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {wIndex + 1}
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#1A1A2E",
                  }}
                >
                  {wDef.label}
                </h3>
              </div>

              {/* Questions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {wDef.questions.map((q) => {
                  const currentAnswer = state.workflowAnswers[wId]?.[q.id];

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
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                                  gap: 12,
                                  padding: "11px 14px",
                                  border: isSelected
                                    ? "2px solid #283891"
                                    : "2px solid #E2E4ED",
                                  borderRadius: 8,
                                  background: isSelected ? "#EEF1FA" : "#FFFFFF",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.15s",
                                }}
                              >
                                {/* Radio indicator */}
                                <div
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    border: isSelected
                                      ? "2px solid #283891"
                                      : "2px solid #C5C8D6",
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
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "#283891",
                                      }}
                                    />
                                  )}
                                </div>
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: isSelected ? 600 : 400,
                                    color: isSelected ? "#283891" : "#1A1A2E",
                                  }}
                                >
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {q.options.map((opt) => {
                            const multiAnswer = (currentAnswer as string[]) ?? [];
                            const isSelected = multiAnswer.includes(opt);
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleMultiAnswer(wId, q.id, opt)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  padding: "11px 14px",
                                  border: isSelected
                                    ? "2px solid #283891"
                                    : "2px solid #E2E4ED",
                                  borderRadius: 8,
                                  background: isSelected ? "#EEF1FA" : "#FFFFFF",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.15s",
                                }}
                              >
                                {/* Checkbox indicator */}
                                <div
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 4,
                                    border: isSelected
                                      ? "2px solid #283891"
                                      : "2px solid #C5C8D6",
                                    background: isSelected ? "#283891" : "white",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {isSelected && (
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
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
                                    fontWeight: isSelected ? 600 : 400,
                                    color: isSelected ? "#283891" : "#1A1A2E",
                                  }}
                                >
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
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
          Continue
        </button>
      </div>
    </div>
  );
}
