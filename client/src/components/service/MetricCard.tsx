/**
 * MetricCard.tsx
 * Animated counter card. Counts up from 0 for purely numeric values.
 * Uses IntersectionObserver to trigger. Respects prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface MetricCardProps {
  value: string;       // e.g. "90", "15-20", "100%", "30-60 days"
  label: string;
  sublabel?: string;
  color?: "success" | "warning" | "navy";
}

const colorMap = {
  navy:    "var(--b-navy)",
  success: "var(--b-success)",
  warning: "var(--b-warning)",
};

function CountUp({
  value,
  color,
  reduced,
  active,
}: {
  value: string;
  color: string;
  reduced: boolean;
  active: boolean;
}) {
  const isNumeric = /^\d+$/.test(value);
  const [display, setDisplay] = useState(isNumeric && !reduced ? "0" : value);

  useEffect(() => {
    if (!isNumeric || reduced) {
      setDisplay(value);
      return;
    }
    if (!active) return;
    const end = Number(value);
    const duration = 1800;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(eased * end)));
      if (progress < 1) requestAnimationFrame(raf);
      else setDisplay(String(end));
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [value, isNumeric, reduced, active]);

  return (
    <span
      style={{
        fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
        fontWeight: 800,
        color,
        lineHeight: 1.1,
        display: "block",
      }}
    >
      {display}
    </span>
  );
}

export default function MetricCard({
  value,
  label,
  sublabel,
  color = "navy",
}: MetricCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const resolvedColor = colorMap[color];

  return (
    <div
      ref={containerRef}
      style={{
        background: "white",
        border: "1px solid var(--b-border)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "translateY(0)" : "translateY(12px)",
        transition: reduced ? "none" : "opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <CountUp
        value={value}
        color={resolvedColor}
        reduced={reduced}
        active={visible || reduced}
      />
      <div
        style={{
          fontWeight: 600,
          fontSize: "0.875rem",
          color: "var(--b-dark)",
          marginTop: "0.5rem",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontSize: "0.8125rem",
            color: "var(--b-grey)",
            marginTop: "0.25rem",
            lineHeight: 1.5,
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}
