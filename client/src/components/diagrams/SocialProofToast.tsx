/**
 * SocialProofToast.tsx
 * Fixed bottom-left toast cycling through factual social proof messages.
 * Appears after 5s, dismissable, persists via localStorage.
 * Only uses owner-approved facts - no fake real-time notifications or unsupported results.
 */

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DISMISS_KEY = "barrana_toast_dismissed";

// Only owner-approved facts (27 Oct 2026). Client counts and average results were removed: no evidence on file.
const messages = [
  "Fixed pricing. Automation projects start from $1,500 CAD.",
  "Every engagement starts with a free 15-minute introductory session.",
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setMsgIdx((i) => (i + 1) % messages.length);
        setFadeIn(true);
      }, 300);
    }, 6000);
    return () => clearInterval(t);
  }, [visible, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  if (dismissed || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        zIndex: 50,
        maxWidth: "20rem",
        background: "white",
        borderLeft: "3px solid var(--b-navy)",
        borderRadius: "0.5rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        padding: "0.875rem 1rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.625rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: reduced ? "none" : "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "0.625rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--b-navy)",
          marginBottom: "0.25rem",
        }}>
          Barrana.ai
        </div>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--b-dark)",
            lineHeight: 1.5,
            margin: 0,
            opacity: fadeIn ? 1 : 0,
            transition: reduced ? "none" : "opacity 0.3s ease",
          }}
        >
          {messages[msgIdx]}
        </p>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.125rem",
          color: "var(--b-grey)",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          borderRadius: "0.25rem",
          transition: "color 0.15s, background 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--b-dark)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--b-grey)"; }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
