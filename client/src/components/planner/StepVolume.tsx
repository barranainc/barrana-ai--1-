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
    icon: "🚀",
    label: "Ready to Go",
    sublabel: "I want to start implementing within 30 days. Show me the plan.",
    microInsight:
      "Great. Your results will include a clear action plan and a direct path to book a strategy call.",
  },
  {
    value: "interested" as const,
    icon: "🧭",
    label: "Exploring Options",
    sublabel: "I want to understand what is possible before committing.",
    microInsight:
      "Perfect. Your results will focus on opportunities and a phased approach so you can evaluate without pressure.",
  },
  {
    value: "exploring" as const,
    icon: "📖",
    label: "Just Researching",
    sublabel: "I am learning about automation and want to see what applies to me.",
    microInsight:
      "That is a smart approach. Your results will explain what is possible and what it looks like in your specific industry.",
  },
];

function formatWithCommas(n: number): string {
  return n.toLocaleString("en-US");
}

export default function StepVolume({ state, dispatch, onNext, onBack }: StepProps) {
  const [localValues, setLocalValues] = useState<Record<string, number>>({
    enquiriesPerWeek: state.volume.enquiriesPerWeek ?? 0,
    appointmentsPerWeek: state.volume.appointmentsPerWeek ?? 0,
    activeClientsPerMonth: state.volume.activeClientsPerMonth ?? 0,
    adminHoursPerWeek: state.volume.adminHoursPerWeek ?? 0,
  });

  const canNext = state.readiness !== null;

  const handleSliderChange = (field: keyof PlannerState["volume"], rawValue: number) => {
    setLocalValues((prev) => ({ ...prev, [field]: rawValue }));
    dispatch({ type: "SET_VOLUME", field, value: rawValue });
  };

  const enq = localValues.enquiriesPerWeek;
  const appt = localValues.appointmentsPerWeek;
  const clients = localValues.activeClientsPerMonth;
  const admin = localValues.adminHoursPerWeek;

  const hasAppointmentWorkflow =
    state.selectedWorkflows.includes("appointment-booking") ||
    state.selectedWorkflows.includes("scheduling-reminders");

  const selectedReadiness = READINESS_OPTIONS.find((o) => o.value === state.readiness);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
      <style>{`
        .planner-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(to right, #283891 0%, #283891 var(--val, 0%), #E2E4ED var(--val, 0%), #E2E4ED 100%);
        }
        .planner-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7E0F4A;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }
        .planner-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7E0F4A;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }
        .planner-slider::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: #E2E4ED;
        }
      `}</style>

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
        A few numbers to size the opportunity.
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
        Approximate is fine. These help us estimate the real impact automation could have for your business.
      </p>

      {/* Sliders */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 40 }}>

        {/* Slider 1: Enquiries per week */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 8,
            }}
          >
            Approximate enquiries or leads per week
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={enq}
            onChange={(e) => handleSliderChange("enquiriesPerWeek", parseInt(e.target.value, 10))}
            className="planner-slider"
            style={{ "--val": `${(enq / 100) * 100}%` } as React.CSSProperties}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#283891",
              marginTop: 8,
              lineHeight: 1,
            }}
          >
            {enq === 0 ? "Unknown" : `${enq} enquiries/week`}
          </div>
          {enq > 0 && (
            <div
              style={{
                background: "#EEF1FA",
                border: "1.5px solid #C4CCE8",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#4B5563",
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              At {enq} enquiries per week, if even 20% get a slow or no response, that is{" "}
              <strong>{Math.round(enq * 0.2 * 4)}</strong> potential clients lost per month.
            </div>
          )}
        </div>

        {/* Slider 2: Appointments per week */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: hasAppointmentWorkflow ? "#1A1A2E" : "#9CA3AF",
              marginBottom: 8,
            }}
          >
            Appointments or sessions per week
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={appt}
            onChange={(e) => handleSliderChange("appointmentsPerWeek", parseInt(e.target.value, 10))}
            className="planner-slider"
            disabled={!hasAppointmentWorkflow}
            style={{
              "--val": `${(appt / 100) * 100}%`,
              opacity: hasAppointmentWorkflow ? 1 : 0.4,
              cursor: hasAppointmentWorkflow ? "pointer" : "not-allowed",
            } as React.CSSProperties}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: hasAppointmentWorkflow ? "#283891" : "#9CA3AF",
              marginTop: 8,
              lineHeight: 1,
            }}
          >
            {hasAppointmentWorkflow ? (appt === 0 ? "Unknown" : `${appt} appointments/week`) : "-"}
          </div>
          {!hasAppointmentWorkflow ? (
            <div
              style={{
                background: "#F9FAFB",
                border: "1.5px solid #E5E7EB",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#9CA3AF",
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              Not applicable based on your workflows.
            </div>
          ) : appt > 0 ? (
            <div
              style={{
                background: "#EEF1FA",
                border: "1.5px solid #C4CCE8",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#4B5563",
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              At {appt} appointments with a typical 15-20% no-show rate, that is{" "}
              <strong>{Math.round(appt * 0.175)}</strong> empty slots per week - recoverable with automated reminders.
            </div>
          ) : null}
        </div>

        {/* Slider 3: Active clients per month */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 8,
            }}
          >
            Active clients or open files per month
          </label>
          <input
            type="range"
            min={0}
            max={200}
            step={1}
            value={clients}
            onChange={(e) => handleSliderChange("activeClientsPerMonth", parseInt(e.target.value, 10))}
            className="planner-slider"
            style={{ "--val": `${(clients / 200) * 100}%` } as React.CSSProperties}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#283891",
              marginTop: 8,
              lineHeight: 1,
            }}
          >
            {clients === 0 ? "Unknown" : `${clients} clients/month`}
          </div>
          {clients > 0 && (
            <div
              style={{
                background: "#EEF1FA",
                border: "1.5px solid #C4CCE8",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: "#4B5563",
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              With {clients} active clients and a 20-30% capacity increase from automation, your team could handle{" "}
              <strong>{Math.round(clients * 1.25)}</strong> clients without adding headcount.
            </div>
          )}
        </div>

        {/* Slider 4: Admin hours per week - THE AHA MOMENT */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: "#1A1A2E",
              marginBottom: 8,
            }}
          >
            Hours your team spends on repetitive admin per week
          </label>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={admin}
            onChange={(e) => handleSliderChange("adminHoursPerWeek", parseInt(e.target.value, 10))}
            className="planner-slider"
            style={{ "--val": `${(admin / 60) * 100}%` } as React.CSSProperties}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#283891",
              marginTop: 8,
              lineHeight: 1,
            }}
          >
            {admin === 0 ? "Unknown" : `${admin} hours/week`}
          </div>
          {admin > 0 && (
            <div
              style={{
                background: "#FFF5F5",
                border: "1.5px solid #FECACA",
                borderRadius: 12,
                padding: "14px 16px",
                marginTop: 10,
              }}
            >
              <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: "#991B1B", lineHeight: 1.5 }}>
                {formatWithCommas(admin * 52)} hours per year on tasks that generate zero revenue.
              </p>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: "#7F1D1D", lineHeight: 1.6 }}>
                At $30/hr staff cost, that is{" "}
                <strong>${formatWithCommas(admin * 52 * 30)}</strong> per year.
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#7F1D1D", lineHeight: 1.6 }}>
                Automation typically recovers 40-60% of this - that is{" "}
                <strong>${formatWithCommas(Math.round(admin * 52 * 30 * 0.5))}</strong> in recovered productivity.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Readiness question */}
      <div style={{ marginBottom: 36 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1A1A2E",
            marginBottom: 16,
            marginTop: 0,
          }}
        >
          Where are you in your automation journey?
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {READINESS_OPTIONS.map((opt) => {
            const isSelected = state.readiness === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => dispatch({ type: "SET_READINESS", readiness: opt.value })}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 18px",
                  borderRadius: 14,
                  border: isSelected ? "2px solid #283891" : "2px solid #E2E4ED",
                  background: isSelected ? "#EEF0FB" : "white",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    display: "block",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {opt.icon}
                </span>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    textAlign: "center",
                    color: isSelected ? "#283891" : "#1A1A2E",
                    marginBottom: 6,
                  }}
                >
                  {opt.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#7B7B7B",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {opt.sublabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Micro-insight for selected readiness */}
        {selectedReadiness && (
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
              {selectedReadiness.microInsight}
            </p>
          </div>
        )}
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
            background: canNext ? "#7E0F4A" : "#C5C8D6",
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
