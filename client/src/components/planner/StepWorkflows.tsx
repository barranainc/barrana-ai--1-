import type { PlannerState, PlannerAction, WorkflowId } from "@/types/planner";
import { WORKFLOWS } from "@/config/planner/workflows";
import PlannerNav from "./PlannerNav";

interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

interface WorkflowGroup {
  label: string;
  ids: WorkflowId[];
}

const WORKFLOW_GROUPS: WorkflowGroup[] = [
  {
    label: "Client Acquisition",
    ids: [
      "inbound-enquiries",
      "phone-calls",
      "lead-qualification",
      "follow-up",
    ],
  },
  {
    label: "Operations",
    ids: [
      "appointment-booking",
      "client-onboarding",
      "document-collection",
      "estimates-proposals",
      "invoicing-payments",
      "scheduling-reminders",
    ],
  },
  {
    label: "Support & Reporting",
    ids: [
      "customer-support",
      "internal-updates",
      "reporting",
      "review-requests",
    ],
  },
];

const WORKFLOW_MAP = Object.fromEntries(WORKFLOWS.map((w) => [w.id, w]));

export default function StepWorkflows({ state, dispatch, onNext, onBack }: Props) {
  const canNext = state.selectedWorkflows.length >= 1;

  function handleToggle(id: WorkflowId) {
    dispatch({ type: "TOGGLE_WORKFLOW", workflowId: id });
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
        Which workflows happen in your business?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#7B7B7B",
          marginBottom: 8,
          marginTop: 0,
        }}
      >
        Select all that apply.
      </p>

      {/* Selection count */}
      <div
        style={{
          fontSize: 13,
          color: state.selectedWorkflows.length > 0 ? "#283891" : "#7B7B7B",
          fontWeight: state.selectedWorkflows.length > 0 ? 600 : 400,
          marginBottom: 24,
        }}
      >
        {state.selectedWorkflows.length === 0
          ? "No workflows selected yet"
          : `${state.selectedWorkflows.length} workflow${state.selectedWorkflows.length === 1 ? "" : "s"} selected`}
      </div>

      {/* Grouped workflow cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {WORKFLOW_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group header */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#7B7B7B",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: "1px solid #F0F1F7",
              }}
            >
              {group.label}
            </div>

            {/* Workflow cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 10,
              }}
            >
              {group.ids.map((id) => {
                const workflow = WORKFLOW_MAP[id];
                if (!workflow) return null;
                const isSelected = state.selectedWorkflows.includes(id);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleToggle(id)}
                    style={{
                      border: `2px solid ${isSelected ? "#283891" : "#E2E4ED"}`,
                      borderRadius: 10,
                      padding: "14px 16px",
                      cursor: "pointer",
                      background: isSelected ? "#EEF0FB" : "white",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
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
                    {/* Checkbox indicator */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: `2px solid ${isSelected ? "#283891" : "#C8CADC"}`,
                        background: isSelected ? "#283891" : "white",
                        flexShrink: 0,
                        marginTop: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "border-color 0.15s, background 0.15s",
                      }}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path
                            d="M2 5L4 7L8 3"
                            stroke="white"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: isSelected ? "#283891" : "#1A1A2E",
                          marginBottom: 3,
                          lineHeight: 1.3,
                        }}
                      >
                        {workflow.label}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#7B7B7B",
                          lineHeight: 1.4,
                        }}
                      >
                        {workflow.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <PlannerNav
        onBack={onBack}
        onNext={onNext}
        canNext={canNext}
        showBack={true}
      />
    </div>
  );
}
