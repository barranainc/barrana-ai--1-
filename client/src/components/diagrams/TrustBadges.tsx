/**
 * TrustBadges.tsx
 * 4-stat strip that replaces the current broken stats band.
 * Numbers count up on page load (above-the-fold).
 */

import { useEffect, useState } from "react";
import { CalendarCheck, Zap, Clock, Shield } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const badges = [
  {
    Icon: CalendarCheck,
    numLabel: "10+",
    isNumeric: false,
    label: "Years Building Systems",
    sublabel: "Production-grade software delivery",
  },
  {
    Icon: Zap,
    numLabel: "90",
    isNumeric: true,
    suffix: " sec",
    label: "Lead Response Time",
    sublabel: "Typical improvement after deployment",
  },
  {
    Icon: Clock,
    numLabel: "15–20",
    isNumeric: false,
    suffix: " hrs",
    label: "Recovered Per Week",
    sublabel: "Staff admin time redirected to revenue work",
  },
  {
    Icon: Shield,
    numLabel: "Fixed",
    isNumeric: false,
    label: "Pricing Model",
    sublabel: "Outcomes, not hours. No surprises.",
  },
];

function CountUpNumber({ target, suffix = "", duration = 2200, reduced }: {
  target: string; suffix?: string; duration?: number; reduced: boolean;
}) {
  const numeric = !isNaN(Number(target));
  const [display, setDisplay] = useState(numeric ? "0" : target);

  useEffect(() => {
    if (!numeric || reduced) { setDisplay(target + suffix); return; }
    const end = Number(target);
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(eased * end)) + suffix);
      if (p < 1) requestAnimationFrame(raf);
      else setDisplay(String(end) + suffix);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [target, suffix, duration, numeric, reduced]);

  return <span>{display}</span>;
}

export default function TrustBadges() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t); }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--b-border)" }}>
      {badges.map(({ Icon, numLabel, suffix = "", label, sublabel }, i) => (
        <div
          key={label}
          style={{
            background: "white",
            padding: "1.75rem 1.5rem",
            opacity: mounted || reduced ? 1 : 0,
            transform: mounted || reduced ? "translateY(0)" : "translateY(16px)",
            transition: reduced ? "none" : `opacity 0.5s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{
              width: "2.5rem", height: "2.5rem", borderRadius: "0.5rem",
              background: "rgba(40,56,145,0.08)", display: "flex", alignItems: "center",
              justifyContent: "center", color: "var(--b-navy)",
            }}>
              <Icon size={18} strokeWidth={2} />
            </div>
            <div className="stat-number-white" style={{ color: "var(--b-navy)", fontSize: "clamp(1.5rem,3vw,2rem)" }}>
              {numLabel === "Fixed" || numLabel === "15–20" ? (
                <span>{numLabel}{suffix}</span>
              ) : (
                <CountUpNumber target={numLabel} suffix={suffix} reduced={reduced} />
              )}
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--b-dark)", marginBottom: "0.25rem" }}>{label}</div>
          <div style={{ fontSize: "0.8125rem", color: "var(--b-grey)", lineHeight: 1.5 }}>{sublabel}</div>
        </div>
      ))}
    </div>
  );
}
