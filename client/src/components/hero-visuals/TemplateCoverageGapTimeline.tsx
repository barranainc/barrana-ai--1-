import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  className?: string;
  businessStart?: number; // hour 0-23, default 9
  businessEnd?: number;   // hour 0-23, default 17
}

function AnimatedCounter({
  from,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  style,
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  style?: React.CSSProperties;
}) {
  const mv = useMotionValue(from);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  useEffect(() => {
    const c = animate(mv, to, { duration, ease: "easeOut" });
    return c.stop;
  }, [duration, from, mv, to]);
  return <motion.span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{display}</motion.span>;
}

function formatHour(h: number) {
  const period = h >= 12 ? "PM" : "AM";
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}${period}`;
}

export default function TemplateCoverageGapTimeline({
  className,
  businessStart = 9,
  businessEnd = 17,
}: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 1 : 0);

  const businessHours = businessEnd - businessStart;
  const gapHours = 24 - businessHours;
  const gapPct = Math.round((gapHours / 24) * 100);
  const businessPct = Math.round((businessHours / 24) * 100);

  // Missed calls approx: 3 per off-hour block of 8hrs
  const missedCalls = Math.round(gapHours * 0.4);
  const annualLost = missedCalls * 365 * 85; // ~$85 avg value per missed call

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setPhase(1), 3000);
    return () => clearTimeout(t);
  }, [reduced]);

  // 24-hour timeline markers: 0,6,12,18,24
  const MARKERS = [0, 6, 12, 18, 24];

  // Teal overlay covers full 24h in phase 1
  const tealWidth = phase === 1 ? "100%" : "0%";

  return (
    <div
      role="img"
      aria-label={`24-hour coverage timeline. Business hours ${formatHour(businessStart)} to ${formatHour(businessEnd)} covered in green. Off-hours gap of ${gapHours} hours shown in red with missed calls. Then teal AI coverage overlay fills the entire 24-hour day.`}
      className={className}
      style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(40,56,145,0.10)",
        padding: "1.5rem",
        maxWidth: "500px",
        minHeight: "320px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          24-Hour Coverage Gap
        </span>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: "1rem" }}>
        {/* Label row */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          {MARKERS.map((h) => (
            <span key={h} style={{ fontSize: "0.6rem", color: "#9CA3AF" }}>{formatHour(h % 24)}</span>
          ))}
        </div>

        {/* Bar */}
        <div style={{ position: "relative", height: "32px", borderRadius: "6px", overflow: "hidden", background: "#F3F4F6" }}>
          {/* Off-hours before business: 0 → businessStart */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${(businessStart / 24) * 100}%`,
            height: "100%",
            background: "#FEE2E2",
            borderRight: "2px solid #EF4444",
          }} />

          {/* Business hours */}
          <div style={{
            position: "absolute",
            left: `${(businessStart / 24) * 100}%`,
            top: 0,
            width: `${(businessHours / 24) * 100}%`,
            height: "100%",
            background: "#D1FAE5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#065F46" }}>
              {formatHour(businessStart)} – {formatHour(businessEnd)}
            </span>
          </div>

          {/* Off-hours after business: businessEnd → 24 */}
          <div style={{
            position: "absolute",
            left: `${(businessEnd / 24) * 100}%`,
            top: 0,
            width: `${((24 - businessEnd) / 24) * 100}%`,
            height: "100%",
            background: "#FEE2E2",
            borderLeft: "2px solid #EF4444",
          }} />

          {/* Teal AI overlay */}
          <motion.div
            animate={{ width: tealWidth }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              background: "rgba(0,180,216,0.55)",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "6px", justifyContent: "center" }}>
          {[
            { color: "#10B981", label: "Business hours" },
            { color: "#EF4444", label: "Gap (unmanned)" },
            { color: "#00B4D8", label: "AI coverage" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: item.color }} />
              <span style={{ fontSize: "0.6rem", color: "#6B7280" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {[
          { label: "Coverage gap", value: `${gapHours}h / day`, color: phase === 1 ? "#10B981" : "#EF4444" },
          { label: "Daily missed calls", value: `~${missedCalls}`, color: phase === 1 ? "#10B981" : "#EF4444" },
        ].map((stat) => (
          <div key={stat.label} style={{
            flex: 1,
            textAlign: "center",
            padding: "0.4rem",
            background: "#F9FAFB",
            borderRadius: "6px",
            border: "1px solid #E5E7EB",
          }}>
            <div style={{ fontSize: "0.6rem", color: "#6B7280" }}>{stat.label}</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: stat.color }}>
              {phase === 1 ? (stat.label === "Coverage gap" ? "0h / day" : "~0") : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Annual lost */}
      <div style={{
        textAlign: "center",
        padding: "0.5rem",
        background: phase === 1 ? "#F0FDF4" : "#FEF2F2",
        borderRadius: "8px",
        border: `1px solid ${phase === 1 ? "#BBF7D0" : "#FECACA"}`,
        transition: "background 0.5s, border-color 0.5s",
      }}>
        <div style={{ fontSize: "0.65rem", color: "#6B7280", marginBottom: "2px" }}>
          Est. annual value at stake:
        </div>
        <div style={{ fontSize: "1.1rem", fontWeight: 900, color: phase === 1 ? "#10B981" : "#EF4444" }}>
          {phase === 1 ? "Recovered" : (
            reduced ? (
              <span>${annualLost.toLocaleString()}</span>
            ) : (
              <AnimatedCounter from={0} to={annualLost} duration={2.5} prefix="$" />
            )
          )}
        </div>
        <div style={{ fontSize: "0.6rem", color: "#6B7280", marginTop: "2px" }}>
          {phase === 1
            ? "AI answers every call, 24/7"
            : `lost to missed after-hours calls`}
        </div>
      </div>
    </div>
  );
}
