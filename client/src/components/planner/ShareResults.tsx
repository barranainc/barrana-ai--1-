import { useState } from "react";
import type { PlannerState } from "@/types/planner";

interface Props {
  state: PlannerState;
}

function encodeState(state: PlannerState): string {
  return btoa(encodeURIComponent(JSON.stringify(state)));
}

export default function ShareResults({ state }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/automation-planner?r=${encodeState(state)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    "My Automation Planner Results"
  )}&body=${encodeURIComponent(
    `Hi,\n\nI just completed the Barrana Automation Planner and wanted to share my results with you.\n\nView results here: ${shareUrl}\n\nLet me know what you think!`
  )}`;

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E2E4ED",
        borderRadius: 14,
        padding: "24px 20px",
      }}
    >
      <h3
        style={{
          margin: "0 0 6px",
          fontSize: 16,
          fontWeight: 700,
          color: "#1A1A2E",
        }}
      >
        Share These Results
      </h3>
      <p style={{ margin: "0 0 18px", fontSize: 14, color: "#7B7B7B", lineHeight: 1.5 }}>
        Share with your business partner or team.
      </p>

      {/* URL display */}
      <div
        style={{
          background: "#F7F8FC",
          border: "1px solid #E2E4ED",
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 14,
          fontSize: 12,
          color: "#7B7B7B",
          fontFamily: "monospace",
          wordBreak: "break-all",
          lineHeight: 1.5,
        }}
      >
        {shareUrl.length > 80 ? shareUrl.slice(0, 80) + "…" : shareUrl}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            flex: 1,
            minWidth: 130,
            padding: "11px 16px",
            borderRadius: 8,
            border: "2px solid #283891",
            background: copied ? "#283891" : "white",
            color: copied ? "white" : "#283891",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10l5 5L16 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <rect
                  x="7"
                  y="7"
                  width="10"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 13H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Copy Link
            </>
          )}
        </button>

        <a
          href={mailtoLink}
          style={{
            flex: 1,
            minWidth: 130,
            padding: "11px 16px",
            borderRadius: 8,
            border: "2px solid #E2E4ED",
            background: "white",
            color: "#1A1A2E",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "border-color 0.15s",
            boxSizing: "border-box",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M3 5l7 6 7-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Email me these results
        </a>
      </div>
    </div>
  );
}
