/**
 * CostOfInaction.tsx
 * 4 metric cards showing money/time being lost. Dollar figures count up.
 * + a totals callout card at the bottom.
 */

import { useEffect, useRef, useState } from "react";
import { TrendingDown, Users, Clock, BarChart2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const costs = [
  {
    Icon: TrendingDown,
    figure: "5K–15K",
    prefix: "$",
    period: "/month",
    label: "Lost Leads",
    desc: "Prospects who booked with faster competitors while your team was unavailable.",
  },
  {
    Icon: Users,
    figure: "19,500",
    prefix: "$",
    period: "/year",
    label: "Wasted Admin",
    desc: "Per employee spent on tasks automation handles - data entry, reminders, follow-up.",
  },
  {
    Icon: Clock,
    figure: "30+",
    prefix: "",
    period: " days",
    label: "Cash Flow Drag",
    desc: "From invoices sent weeks late. Delayed billing that compounds every month.",
  },
  {
    Icon: BarChart2,
    figure: "20–30%",
    prefix: "",
    period: "",
    label: "Unrealized Growth",
    desc: "Capacity your team cannot reach because 40% of their time goes to admin.",
  },
];

function CountUp({ target, show, reduced }: { target: number; show: boolean; reduced: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!show || reduced) { setVal(target); return; }
    let start: number | null = null;
    const duration = 2200;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(raf);
      else setVal(target);
    };
    requestAnimationFrame(raf);
  }, [show, target, reduced]);
  return <>{val.toLocaleString()}</>;
}

export default function CostOfInaction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible || reduced;

  return (
    <div ref={containerRef}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {costs.map(({ Icon, figure, prefix, period, label, desc }, i) => (
          <div
            key={label}
            style={{
              background: "white",
              border: "1px solid var(--b-border)",
              borderTop: "3px solid var(--b-warning)",
              borderRadius: "0.75rem",
              padding: "1.75rem 1.5rem",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(30px)",
              transition: reduced ? "none" : `opacity 0.55s ease ${i * 0.15}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <div style={{
                width: "2.25rem", height: "2.25rem", borderRadius: "0.4rem",
                background: "var(--b-warning-bg)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--b-warning)", flexShrink: 0,
              }}>
                <Icon size={16} strokeWidth={2} />
              </div>
            </div>
            <div style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--b-warning)", lineHeight: 1, marginBottom: "0.25rem" }}>
              {figure === "19,500" ? (
                <>$<CountUp target={19500} show={show} reduced={reduced} />/year</>
              ) : (
                <>{prefix}{figure}{period}</>
              )}
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--b-dark)", marginBottom: "0.5rem" }}>{label}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--b-grey)", lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Totals callout */}
      <div
        style={{
          background: "var(--b-navy)",
          borderRadius: "0.75rem",
          padding: "2rem",
          color: "white",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
          transition: reduced ? "none" : "opacity 0.6s ease 0.65s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.65s",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.625rem" }}>
          The Total Picture
        </div>
        <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "rgba(255,255,255,0.9)", maxWidth: "64ch" }}>
          For a typical 5-person service business, the annual cost of manual operations is{" "}
          <strong style={{ color: "white" }}>$50,000 to $100,000</strong>{" "}
          in lost revenue, wasted labor, and missed capacity. Most owners have never done this math.
        </p>
      </div>
    </div>
  );
}
