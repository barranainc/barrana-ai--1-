/**
 * HeroBeforeAfterCard.tsx
 * Compact before/after comparison card for hero right column.
 * Shows top 4 metrics with animated width bars.
 * Triggered by `show` prop (parent mount state).
 */
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface BeforeAfterMetric {
  label: string;
  before: string;
  after: string;
  beforeW: number; // bar width 0-100
  afterW: number;  // bar width 0-100
}

interface Props {
  metrics: BeforeAfterMetric[];
  show: boolean;
}

export default function HeroBeforeAfterCard({ metrics, show }: Props) {
  const reduced = useReducedMotion();
  const items = metrics.slice(0, 4);
  const visible = show || reduced;

  return (
    <div style={{
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 8px 40px rgba(40,56,145,0.10), 0 1px 4px rgba(40,56,145,0.06)",
      border: "1px solid rgba(40,56,145,0.08)",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
      transition: reduced ? "none" : "opacity 0.65s ease 0.35s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.35s",
    }}>
      {/* Top gradient bar */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #DC2626 0%, #283891 50%, #16a34a 100%)" }} />

      {/* Header */}
      <div style={{
        padding: "1rem 1.25rem 0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(40,56,145,0.07)",
      }}>
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#283891" }}>
          Before vs After
        </span>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.08em" }}>Before</span>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em" }}>After</span>
        </div>
      </div>

      {/* Metric rows */}
      <div style={{ padding: "0.875rem 1.25rem 1.125rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((m, i) => (
          <div key={m.label}>
            {/* Label row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--b-dark)" }}>{m.label}</span>
            </div>

            {/* Before bar */}
            <div style={{ marginBottom: "0.3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ flex: 1, height: 8, background: "rgba(220,38,38,0.10)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    background: "#DC2626",
                    borderRadius: 4,
                    width: visible ? `${m.beforeW}%` : "0%",
                    transition: reduced ? "none" : `width 0.75s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.08}s`,
                  }} />
                </div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#DC2626", whiteSpace: "nowrap", minWidth: "auto" }}>{m.before}</span>
              </div>
            </div>

            {/* After bar */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ flex: 1, height: 8, background: "rgba(22,163,74,0.10)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    background: "#16a34a",
                    borderRadius: 4,
                    width: visible ? `${m.afterW}%` : "0%",
                    transition: reduced ? "none" : `width 0.75s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.08}s`,
                  }} />
                </div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#16a34a", whiteSpace: "nowrap" }}>
                  ✓ {m.after}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "0.625rem 1.25rem",
        background: "#F7F9FC",
        borderTop: "1px solid rgba(40,56,145,0.07)",
        fontSize: "0.6375rem",
        color: "rgba(100,116,139,0.7)",
        lineHeight: 1.4,
      }}>
        Typical outcomes for clients after Barrana.ai implementation.
      </div>
    </div>
  );
}
