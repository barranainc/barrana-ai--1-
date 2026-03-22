import { useState } from "react";
import type { PlannerState, PlannerAction } from "@/types/planner";
import { TOOLS } from "@/config/planner/tools";
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

// ─── Tool emoji map ──────────────────────────────────────────────────────────
function getToolEmoji(label: string): string | null {
  const l = label.toLowerCase();
  if (l.includes("google workspace") || l.includes("gmail")) return "🌐";
  if (l.includes("microsoft 365") || l.includes("outlook")) return "🔷";
  if (l.includes("whatsapp")) return "💬";
  if (l.includes("hubspot")) return "🟠";
  if (l.includes("go high level") || l.includes("gohighlevel")) return "🔴";
  if (l.includes("zoho")) return "🟡";
  if (l.includes("calendly") || l.includes("acuity")) return "📅";
  if (l.includes("jobber")) return "🔧";
  if (l.includes("clio")) return "⚖️";
  if (l.includes("jane app") || l.includes("cliniko")) return "🏥";
  if (
    l.includes("monday.com") ||
    l.includes("asana") ||
    l.includes("clickup")
  )
    return "📋";
  if (
    l.includes("quickbooks") ||
    l.includes("xero") ||
    l.includes("freshbooks")
  )
    return "📊";
  if (l.includes("stripe")) return "💳";
  if (l.includes("shopify")) return "🛒";
  if (l.includes("custom crm")) return "💾";
  if (l.includes("spreadsheet") || l.includes("google sheets") || l.includes("excel"))
    return "📑";
  if (l.includes("manual") || l.includes("paper")) return "📄";
  return null;
}

function getToolAbbrev(label: string): string {
  return label.slice(0, 2).toUpperCase();
}

// ─── Grouped tool structure ──────────────────────────────────────────────────
// Group 1: Communication
// Group 2: Scheduling & CRM (Scheduling, CRM, Legal, Healthcare, Field Service)
// Group 3: Finance (Accounting, E-commerce, Payments)
// Group 4: Other (remaining: Productivity, Project Management, Manual)

type ToolGroup = {
  label: string;
  ids: string[];
};

const COMMUNICATION_CATS = new Set(["Communication"]);
const SCHEDULING_CRM_CATS = new Set([
  "Scheduling",
  "CRM",
  "Legal",
  "Healthcare",
  "Field Service",
]);
const FINANCE_CATS = new Set(["Accounting", "E-commerce", "Payments"]);

function buildToolGroups(): ToolGroup[] {
  const communication: string[] = [];
  const schedulingCrm: string[] = [];
  const finance: string[] = [];
  const other: string[] = [];

  for (const tool of TOOLS) {
    if (COMMUNICATION_CATS.has(tool.category)) {
      communication.push(tool.id);
    } else if (SCHEDULING_CRM_CATS.has(tool.category)) {
      schedulingCrm.push(tool.id);
    } else if (FINANCE_CATS.has(tool.category)) {
      finance.push(tool.id);
    } else {
      other.push(tool.id);
    }
  }

  const groups: ToolGroup[] = [];
  if (communication.length > 0)
    groups.push({ label: "Communication", ids: communication });
  if (schedulingCrm.length > 0)
    groups.push({ label: "Scheduling & CRM", ids: schedulingCrm });
  if (finance.length > 0)
    groups.push({ label: "Finance", ids: finance });
  if (other.length > 0)
    groups.push({ label: "Other", ids: other });
  return groups;
}

const TOOL_GROUPS = buildToolGroups();
const TOOL_MAP = Object.fromEntries(TOOLS.map((t) => [t.id, t]));

// ─── Stack compatibility indicator ──────────────────────────────────────────
type StackStatus = "great" | "good" | "manual" | "none";

function getStackStatus(tools: string[]): StackStatus {
  if (tools.length === 0) return "none";
  const isManualOnly =
    tools.length === 1 && tools[0] === "mostly-manual";
  const hasManual = tools.includes("mostly-manual");
  const hasSpreadsheets = tools.includes("spreadsheets");
  const modernTools = tools.filter(
    (t) => t !== "mostly-manual" && t !== "spreadsheets"
  );

  if (hasManual && modernTools.length === 0) return "manual";
  if (modernTools.length >= 3) return "great";
  if (modernTools.length >= 1) return "good";
  if (hasSpreadsheets && modernTools.length === 0) return "manual";
  return "manual";
}

const STACK_CONFIG: Record<
  Exclude<StackStatus, "none">,
  { bg: string; border: string; dot: string; text: string; message: string }
> = {
  great: {
    bg: "#F0FDF4",
    border: "#86EFAC",
    dot: "#22C55E",
    text: "#166534",
    message:
      "Great tool stack — automation will connect everything you already use.",
  },
  good: {
    bg: "#FFFBEB",
    border: "#FDE68A",
    dot: "#F59E0B",
    text: "#92400E",
    message:
      "Good starting point. We may suggest adding a lightweight CRM for full connectivity.",
  },
  manual: {
    bg: "#FFF7ED",
    border: "#FED7AA",
    dot: "#F97316",
    text: "#92400E",
    message:
      "Starting from manual is fine. Many of our best implementations began here.",
  },
};

// ─── Micro-insight map ───────────────────────────────────────────────────────
const TOOL_INSIGHTS: Record<string, string> = {
  quickbooks:
    "QuickBooks connects beautifully with automation. Invoice generation and payment tracking can be fully automated.",
  jobber:
    "Jobber is one of our most common contractor integrations. Lead capture, scheduling, and invoicing all connect.",
  hubspot:
    "HubSpot pairs powerfully with automation. Your pipeline, follow-up sequences, and reporting can all be connected.",
  clio: "Clio integrates with legal workflow automation. Matter intake, document collection, and billing automation all connect.",
  "jane-cliniko":
    "Jane App is our primary healthcare scheduling integration. Booking automation, reminders, and recalls all work with Jane.",
  "mostly-manual":
    "Starting from manual is fine. Many of our most successful implementations began with businesses that had no automation at all. We include basic tool setup as part of Phase 1.",
  spreadsheets:
    "Starting from manual is fine. Many of our most successful implementations began with businesses that had no automation at all. We include basic tool setup as part of Phase 1.",
  "google-workspace":
    "Google Workspace is the backbone of most of our automations. Gmail, Calendar, and Sheets all connect seamlessly.",
};

function getInsight(toolId: string): string | null {
  return TOOL_INSIGHTS[toolId] ?? null;
}

// ─── Micro-insight component ─────────────────────────────────────────────────
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

// ─── Main component ──────────────────────────────────────────────────────────
const MOSTLY_MANUAL_ID = "mostly-manual";
const OTHER_ID = "other-tool";

export default function StepTools({
  state,
  dispatch,
  onNext,
  onBack,
}: Props) {
  const [otherText, setOtherText] = useState(state.toolsOther ?? "");
  const [lastToolInsight, setLastToolInsight] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const canNext = true; // tools are optional

  const stackStatus = getStackStatus(state.tools);
  const isOtherSelected = state.tools.includes(OTHER_ID);

  function handleToggle(toolId: string) {
    const wasSelected = state.tools.includes(toolId);

    if (toolId === MOSTLY_MANUAL_ID) {
      const isAlreadySelected = state.tools.includes(MOSTLY_MANUAL_ID);
      if (isAlreadySelected) {
        dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
      } else {
        state.tools
          .filter((t) => t !== MOSTLY_MANUAL_ID)
          .forEach((t) => dispatch({ type: "TOGGLE_TOOL", toolId: t }));
        dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
      }
    } else {
      if (state.tools.includes(MOSTLY_MANUAL_ID)) {
        dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
      }
      dispatch({ type: "TOGGLE_TOOL", toolId });
    }

    // Update insight for newly selected tool (not on deselect)
    if (!wasSelected) {
      const insight = getInsight(toolId);
      if (insight) setLastToolInsight(insight);
    }
  }

  function handleOtherTextChange(value: string) {
    setOtherText(value);
    dispatch({ type: "SET_TOOLS_OTHER", other: value });
  }

  function handleOtherToggle() {
    const isSelected = state.tools.includes(OTHER_ID);
    if (!isSelected && state.tools.includes(MOSTLY_MANUAL_ID)) {
      dispatch({ type: "TOGGLE_TOOL", toolId: MOSTLY_MANUAL_ID });
    }
    dispatch({ type: "TOGGLE_TOOL", toolId: OTHER_ID });
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
        What tools does your business currently use?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: GREY,
          marginBottom: 20,
          marginTop: 0,
        }}
      >
        Select all that apply. We will recommend automation that connects with
        what you already have.
      </p>

      {/* Stack compatibility indicator */}
      {stackStatus !== "none" && (
        <div
          style={{
            background: STACK_CONFIG[stackStatus].bg,
            border: `1.5px solid ${STACK_CONFIG[stackStatus].border}`,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 13,
            fontWeight: 600,
            color: STACK_CONFIG[stackStatus].text,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: STACK_CONFIG[stackStatus].dot,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          {stackStatus === "great" && "✓ "}
          {stackStatus === "good" && "→ "}
          {stackStatus === "manual" && "○ "}
          {STACK_CONFIG[stackStatus].message}
        </div>
      )}

      {/* Tool groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {TOOL_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group header */}
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: GREY,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: "1px solid #F0F1F7",
              }}
            >
              {group.label}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 8,
              }}
            >
              {group.ids.map((id) => {
                const tool = TOOL_MAP[id];
                if (!tool) return null;
                const isSelected = state.tools.includes(id);
                const isHovered = hoveredId === id;
                const emoji = getToolEmoji(tool.label);
                const abbrev = getToolAbbrev(tool.label);

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleToggle(id)}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      border: `2px solid ${
                        isSelected ? NAVY : isHovered ? NAVY : "#E2E4ED"
                      }`,
                      borderRadius: 12,
                      padding: "12px 14px",
                      cursor: "pointer",
                      background: isSelected ? "#EEF0FB" : "white",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    {/* Emoji or abbreviation circle */}
                    {emoji ? (
                      <span
                        style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}
                      >
                        {emoji}
                      </span>
                    ) : (
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: isSelected ? NAVY : "#E2E4ED",
                          color: isSelected ? "white" : GREY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          flexShrink: 0,
                          transition: "all 0.15s",
                        }}
                      >
                        {abbrev}
                      </span>
                    )}

                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: isSelected ? NAVY : DARK,
                        lineHeight: 1.35,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {tool.label}
                    </span>

                    {/* Selected checkmark badge */}
                    {isSelected && (
                      <span
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: NAVY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <path
                            d="M1.5 4L3 5.5L6.5 2"
                            stroke="white"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* "Other tool" option */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: GREY,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 10,
              paddingBottom: 6,
              borderBottom: "1px solid #F0F1F7",
            }}
          >
            Something else?
          </div>

          <button
            type="button"
            onClick={handleOtherToggle}
            onMouseEnter={() => setHoveredId(OTHER_ID)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              border: `2px solid ${
                isOtherSelected
                  ? NAVY
                  : hoveredId === OTHER_ID
                  ? NAVY
                  : "#E2E4ED"
              }`,
              borderRadius: 12,
              padding: "12px 14px",
              cursor: "pointer",
              background: isOtherSelected ? "#EEF0FB" : "white",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.15s",
              position: "relative",
              marginBottom: isOtherSelected ? 10 : 0,
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>
              🔌
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: isOtherSelected ? NAVY : DARK,
              }}
            >
              Other tool or platform
            </span>
            {isOtherSelected && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: NAVY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3 5.5L6.5 2"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
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
                color: DARK,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = NAVY;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#E2E4ED";
              }}
            />
          )}
        </div>
      </div>

      {/* Micro-insight for most-recently selected tool */}
      {lastToolInsight && <MicroInsight text={lastToolInsight} />}

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
