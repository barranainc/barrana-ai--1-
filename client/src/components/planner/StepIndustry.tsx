import { useState } from "react";
import type { PlannerState, PlannerAction, Industry } from "@/types/planner";
import { INDUSTRIES } from "@/config/planner/industries";
import PlannerNav from "./PlannerNav";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  state: PlannerState;
  dispatch: React.Dispatch<PlannerAction>;
  onNext: () => void;
  onBack: () => void;
}

// ─── Brand constants ────────────────────────────────────────────────────────
const NAVY = "#283891";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

// ─── Shared micro-insight component ─────────────────────────────────────────
function MicroInsight({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
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
        marginTop: 16,
        animation: reducedMotion ? "none" : "fadeSlideIn 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
      <p style={{ margin: 0, fontSize: 13, color: "#92400E", lineHeight: 1.6 }}>{text}</p>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  );
}

// ─── Industry emoji map ──────────────────────────────────────────────────────
const INDUSTRY_EMOJI: Record<string, string> = {
  accountant: "📊",
  immigration: "🌐",
  "law-firm": "⚖️",
  clinic: "🏥",
  contractor: "🔨",
  agency: "📣",
  "real-estate": "🏠",
  education: "🎓",
  dental: "😁",
  insurance: "🛡️",
  "property-management": "🏢",
  ecommerce: "🛒",
  solopreneur: "🎯",
  "professional-other": "💼",
  other: "➕",
};

// ─── Industry teaser map ─────────────────────────────────────────────────────
const INDUSTRY_TEASER: Record<string, string> = {
  accountant: "Tax season document chaos? We see that a lot.",
  immigration: "45-minute intakes and document chasing? Very common.",
  "law-firm": "Non-billable hours eating your revenue? There is a fix.",
  clinic: "No-shows and front desk overload? Dual reminders change everything.",
  contractor: "On-site all day while leads go to voicemail? We hear you.",
  agency: "Selling efficiency while running on Slack threads? Ironic, right?",
  "real-estate": "80 leads, 4 closings. The pipeline is leaking.",
  education: "Enrolment scrambles and scheduling nightmares? Automate both.",
  dental: "Empty hygienist chairs and 300 overdue recalls? That is fixable.",
  insurance: "40% of quotes get zero follow-up. Every lapsed renewal is lost.",
  "property-management": "65 units at capacity? Automation gets you to 120 with the same team.",
  ecommerce: "Order follow-up, returns, support tickets. Volume problems.",
  solopreneur: "Every admin minute is a billable minute lost. Let's fix that.",
  "professional-other": "If your business runs on clients and follow-ups.",
  other: "Tell us what you do.",
};

// ─── Industry micro-insight map ───────────────────────────────────────────────
const INDUSTRY_INSIGHTS: Record<string, string> = {
  immigration:
    "Immigration consultants who automate intake and document collection typically recover 11+ consultant hours per week. Let us see where your opportunities are.",
  contractor:
    "Contractors who automate lead response see 22% higher quote conversion. That is more jobs without spending more on ads.",
  clinic:
    "Clinics that implement automated reminders reduce no-shows by 40–60% on average. That is significant recoverable revenue.",
  dental:
    "Dental offices using automated recall systems fill 30–40% more hygiene appointments. Your schedule should be full.",
  "law-firm":
    "Law firms that automate intake and document collection recover 8–12 non-billable hours per week per fee earner.",
  accountant:
    "Accounting firms that automate document collection cut average file completion time from 3 weeks to 5 days.",
  "real-estate":
    "Real estate teams that automate lead follow-up contact 3x more leads within the first 5 minutes — when conversion is highest.",
  agency:
    "Agencies that automate onboarding and reporting handle 30–40% more clients without adding operations staff.",
  insurance:
    "Insurance brokers with automated follow-up sequences convert 25% more quotes. Most of those were just waiting to be asked.",
  "property-management":
    "Property managers who automate maintenance requests and tenant communication handle 40% more units with the same team.",
  education:
    "Education businesses with automated enrolment and scheduling reduce admin time by 8–15 hours per week.",
  ecommerce:
    "E-commerce businesses that automate post-purchase follow-up recover 15–20% of abandoned carts and reduce support volume by 30%.",
  "professional-other":
    "Professional service businesses typically automate client onboarding, follow-up, and reporting first. We will map your specific priorities.",
  other:
    "Every business has repetitive workflows. Tell us what you do and we will identify where automation fits.",
};

// ─── Checkmark badge ─────────────────────────────────────────────────────────
function CheckBadge() {
  return (
    <div
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
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="2,5 4,7.5 8,2.5" />
      </svg>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
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

  const activeInsight =
    state.industry !== null ? (INDUSTRY_INSIGHTS[state.industry] ?? null) : null;

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
        What type of business do you run?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: GREY,
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        We will tailor everything to your industry — the language, the examples, and the recommendations.
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
          const emoji = INDUSTRY_EMOJI[industry.id] ?? "🏢";
          const teaser = INDUSTRY_TEASER[industry.id] ?? "";
          return (
            <button
              key={industry.id}
              type="button"
              onClick={() => handleSelect(industry.id as Industry)}
              style={{
                position: "relative",
                border: `2px solid ${isSelected ? NAVY : "#E2E4ED"}`,
                borderRadius: 12,
                padding: 16,
                cursor: "pointer",
                background: isSelected ? "#EEF0FB" : "white",
                textAlign: "left",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = NAVY;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E4ED";
                }
              }}
            >
              {isSelected && <CheckBadge />}
              <span
                style={{
                  fontSize: 22,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                {emoji}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: isSelected ? NAVY : DARK,
                  display: "block",
                }}
              >
                {industry.label}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: GREY,
                  lineHeight: 1.4,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {teaser}
              </span>
            </button>
          );
        })}
      </div>

      {/* Micro-insight for selected industry */}
      {activeInsight && <MicroInsight text={activeInsight} />}

      {/* "Other" text input */}
      {state.industry === "other" && (
        <div style={{ marginTop: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: DARK,
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
              color: DARK,
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = NAVY;
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
