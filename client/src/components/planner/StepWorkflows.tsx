import { useState } from "react";
import type { PlannerState, PlannerAction, WorkflowId } from "@/types/planner";
import { WORKFLOWS } from "@/config/planner/workflows";
import { INDUSTRY_MAP } from "@/config/planner/industries";
import PlannerNav from "./PlannerNav";

// ─── Brand constants ────────────────────────────────────────────────────────
const NAVY = "#283891";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

// ─── Props ──────────────────────────────────────────────────────────────────
interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

// ─── Workflow groups (per spec) ──────────────────────────────────────────────
interface WorkflowGroup {
  label: string;
  ids: WorkflowId[];
}

const WORKFLOW_GROUPS: WorkflowGroup[] = [
  {
    label: "Getting Clients",
    ids: [
      "inbound-enquiries",
      "phone-calls",
      "lead-qualification",
      "appointment-booking",
      "follow-up",
    ],
  },
  {
    label: "Serving Clients",
    ids: [
      "client-onboarding",
      "document-collection",
      "estimates-proposals",
      "invoicing-payments",
      "customer-support",
    ],
  },
  {
    label: "Running the Business",
    ids: [
      "internal-updates",
      "reporting",
      "review-requests",
      "scheduling-reminders",
    ],
  },
];

// ─── Industry typical-range map ──────────────────────────────────────────────
const INDUSTRY_RANGE: Record<string, string> = {
  immigration: "5 to 8",
  accountant: "4 to 6",
  "law-firm": "4 to 7",
  clinic: "5 to 7",
  contractor: "4 to 6",
  agency: "6 to 9",
  "real-estate": "4 to 7",
  education: "4 to 6",
  dental: "5 to 7",
  insurance: "4 to 7",
  "property-management": "5 to 8",
  ecommerce: "5 to 8",
};

function getRange(industry: string | null): string {
  if (!industry) return "4 to 7";
  return INDUSTRY_RANGE[industry] ?? "4 to 7";
}

function isInTypicalRange(count: number, range: string): boolean {
  const [lo, hi] = range.split(" to ").map(Number);
  return count >= lo && count <= hi;
}

// ─── Workflow one-liners ─────────────────────────────────────────────────────
const WORKFLOW_ONELINERS: Record<WorkflowId, string> = {
  "inbound-enquiries": "Handling new leads and first contact",
  "phone-calls": "Answering, returning, and tracking calls",
  "lead-qualification": "Figuring out if someone is a good fit",
  "appointment-booking": "Scheduling meetings or visits",
  "follow-up": "Checking in on quotes or cold leads",
  "client-onboarding": "Welcoming and setting up new clients",
  "document-collection": "Gathering files and paperwork",
  "estimates-proposals": "Creating and sending quotes",
  "invoicing-payments": "Billing and collecting money",
  "customer-support": "Answering the same questions repeatedly",
  "internal-updates": "Passing work between people",
  reporting: "Compiling operational reports",
  "review-requests": "Asking for Google reviews",
  "scheduling-reminders": "Appointment reminders and recurring bookings",
};

// ─── Workflow icons (SVG path data) ─────────────────────────────────────────
const WORKFLOW_ICON_PATHS: Record<WorkflowId, string> = {
  "inbound-enquiries":
    "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2M8 4v4h8V4M8 4a2 2 0 012-2h4a2 2 0 012 2",
  "phone-calls":
    "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  "lead-qualification":
    "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  "appointment-booking":
    "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  "follow-up":
    "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  "client-onboarding":
    "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  "document-collection":
    "M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  "estimates-proposals":
    "M9 7h6M9 11h6M9 15h4M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  "invoicing-payments":
    "M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  "customer-support":
    "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 17h.01",
  "internal-updates":
    "M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01",
  reporting:
    "M9 19V6l3-3 3 3v13M3 19h18M15 8h4v11h-4",
  "review-requests":
    "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  "scheduling-reminders":
    "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
};

const WORKFLOW_MAP_LOCAL = Object.fromEntries(WORKFLOWS.map((w) => [w.id, w]));

// ─── Micro-insight ───────────────────────────────────────────────────────────
function MicroInsight({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: "#FFF9F0",
        border: "1.5px solid #FED7AA",
        borderRadius: 10,
        padding: "12px 14px",
        marginTop: 12,
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
      <p style={{ margin: 0, fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>
        {text}
      </p>
    </div>
  );
}

// ─── Workflow tile icon ──────────────────────────────────────────────────────
function WorkflowIcon({ id, color }: { id: WorkflowId; color: string }) {
  const d = WORKFLOW_ICON_PATHS[id];
  if (!d) return null;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d={d} />
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function StepWorkflows({
  state,
  dispatch,
  onNext,
  onBack,
}: Props) {
  const [hoveredId, setHoveredId] = useState<WorkflowId | null>(null);

  const industryObj = state.industry ? INDUSTRY_MAP[state.industry] : null;
  const industryLabel = industryObj?.label ?? "your industry";
  const preweighted: WorkflowId[] = industryObj?.preweightedWorkflows ?? [];
  const range = getRange(state.industry);
  const count = state.selectedWorkflows.length;
  const inRange = count > 0 && isInTypicalRange(count, range);

  const canNext = count >= 1;

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
          color: DARK,
          marginBottom: 6,
          marginTop: 0,
        }}
      >
        Which of these workflows happen in your business?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: GREY,
          marginBottom: 20,
          marginTop: 0,
        }}
      >
        Most {industryLabel} businesses select {range} of these.
      </p>

      {/* Running counter pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: count > 0 ? "#EEF0FB" : "#F4F4F8",
            color: count > 0 ? NAVY : GREY,
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 20,
            padding: "5px 14px",
            border: `1.5px solid ${count > 0 ? "#C6CAEC" : "#E2E4ED"}`,
            transition: "all 0.15s",
          }}
        >
          {count === 0
            ? "No workflows selected yet"
            : `${count} workflow${count === 1 ? "" : "s"} selected`}
        </span>

        {inRange && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 13,
              color: "#166534",
              fontWeight: 500,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <circle cx="7.5" cy="7.5" r="7" fill="#22C55E" />
              <path
                d="M4.5 7.5L6.5 9.5L10.5 5.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            That is typical for {industryLabel} businesses.
          </span>
        )}
      </div>

      {/* Groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {WORKFLOW_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group header */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: GREY,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: "1px solid #F0F1F7",
              }}
            >
              {group.label}
            </div>

            {/* Tiles grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: 10,
              }}
            >
              {group.ids.map((id) => {
                const workflow = WORKFLOW_MAP_LOCAL[id];
                if (!workflow) return null;

                const isSelected = state.selectedWorkflows.includes(id);
                const isPreweighted = preweighted.includes(id);
                const isHovered = hoveredId === id;

                // Border logic: selected > hovered > preweighted > default
                let borderStyle = `2px solid ${isSelected ? NAVY : isHovered ? NAVY : "#E2E4ED"}`;
                // Pre-highlighted gets left accent when not selected
                const borderLeft =
                  isPreweighted && !isSelected
                    ? `3px solid ${NAVY}`
                    : isSelected
                    ? `2px solid ${NAVY}`
                    : isHovered
                    ? `2px solid ${NAVY}`
                    : `2px solid #E2E4ED`;

                // Suppress the generic border when we apply a left accent
                const borderRight =
                  isPreweighted && !isSelected
                    ? "1px solid #E2E4ED"
                    : undefined;
                const borderTop =
                  isPreweighted && !isSelected
                    ? "1px solid #E2E4ED"
                    : undefined;
                const borderBottom =
                  isPreweighted && !isSelected
                    ? "1px solid #E2E4ED"
                    : undefined;

                // Use shorthand border only when not pre-highlighted unselected
                const borderShorthand =
                  isPreweighted && !isSelected ? undefined : borderStyle;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleToggle(id)}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      border: borderShorthand,
                      borderLeft,
                      borderRight,
                      borderTop,
                      borderBottom,
                      borderRadius: 12,
                      padding: "14px 14px",
                      cursor: "pointer",
                      background: isSelected ? "#EEF0FB" : "white",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    {/* Pre-weighted badge (top-left, not selected) */}
                    {isPreweighted && !isSelected && (
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 10,
                          fontSize: 10,
                          fontWeight: 600,
                          color: NAVY,
                          background: "#EEF0FB",
                          borderRadius: 20,
                          padding: "2px 7px",
                          lineHeight: 1.5,
                        }}
                      >
                        Common
                      </span>
                    )}

                    {/* Selected checkmark badge (top-right) */}
                    {isSelected && (
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: NAVY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5L4 7L8 3"
                            stroke="white"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}

                    {/* Icon + text row */}
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        marginTop:
                          isPreweighted && !isSelected ? 18 : 0,
                      }}
                    >
                      <WorkflowIcon
                        id={id}
                        color={isSelected ? NAVY : "#4B5CB8"}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: isSelected ? NAVY : DARK,
                            lineHeight: 1.3,
                          }}
                        >
                          {workflow.label}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: GREY,
                            marginTop: 3,
                            lineHeight: 1.45,
                          }}
                        >
                          {WORKFLOW_ONELINERS[id]}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Micro-insight when nothing is selected yet */}
      {count === 0 && (
        <MicroInsight text="Tick every workflow that currently happens in your business — even if it is messy or manual. This shapes the entire plan we build for you." />
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
