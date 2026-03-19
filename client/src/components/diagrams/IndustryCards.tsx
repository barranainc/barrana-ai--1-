/**
 * IndustryCards.tsx
 * 7 industry cards in a grid with icon, name, mini-flow, and result metric.
 * Mini-flow lines animate on hover.
 */

import { useEffect, useRef, useState } from "react";
import { Briefcase, Calculator, Wrench, Stethoscope, Scale, Building2, Truck } from "lucide-react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const industries = [
  {
    Icon: Briefcase,
    name: "Immigration",
    flow: ["Inquiry", "AI Qualifies", "CRM", "Booked"],
    metric: "Intake: 45 min → 5 min",
    href: "/industries/immigration",
  },
  {
    Icon: Calculator,
    name: "Accounting",
    flow: ["Season Start", "Doc Request", "Tracking", "Complete"],
    metric: "Chase time eliminated",
    href: "/industries/accounting",
  },
  {
    Icon: Wrench,
    name: "Contractors",
    flow: ["Inquiry", "AI Responds", "Quote", "Booked"],
    metric: "Zero missed leads",
    href: "/industries/contractors",
  },
  {
    Icon: Stethoscope,
    name: "Medical Clinics",
    flow: ["Waitlist", "Slot Opens", "Notified", "Confirmed"],
    metric: "No-shows down 25–40%",
    href: "/industries/medical-clinics",
  },
  {
    Icon: Scale,
    name: "Law Firms",
    flow: ["Inquiry", "Screened", "Assigned", "Retained"],
    metric: "Every inquiry captured",
    href: "/industries/law-firms",
  },
  {
    Icon: Building2,
    name: "Real Estate",
    flow: ["Listing", "Lead Captured", "Qualified", "Showing"],
    metric: "Response time < 2 min",
    href: "/industries/real-estate",
  },
  {
    Icon: Truck,
    name: "Service Businesses",
    flow: ["Request", "Routed", "Scheduled", "Invoiced"],
    metric: "Admin load down 60%",
    href: "/industries/service-businesses",
  },
];

function MiniFlow({ steps, hovered, reduced }: { steps: string[]; hovered: boolean; reduced: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", flexWrap: "wrap" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <span style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            padding: "0.15rem 0.4rem",
            borderRadius: "0.25rem",
            background: i === 0 ? "var(--b-amber-bg)" : i === steps.length - 1 ? "var(--b-success-bg)" : "rgba(40,56,145,0.06)",
            color: i === 0 ? "var(--b-amber)" : i === steps.length - 1 ? "var(--b-success)" : "var(--b-navy)",
            border: `1px solid ${i === 0 ? "var(--b-amber)" : i === steps.length - 1 ? "var(--b-success)" : "rgba(40,56,145,0.18)"}`,
            whiteSpace: "nowrap",
          }}>
            {s}
          </span>
          {i < steps.length - 1 && (
            <svg width="12" height="8" viewBox="0 0 12 8" style={{ flexShrink: 0 }}>
              <line
                x1="0" y1="4" x2="10" y2="4"
                stroke={hovered ? "var(--b-navy)" : "var(--b-border)"}
                strokeWidth="1.5"
                strokeDasharray="10"
                strokeDashoffset={hovered ? "0" : "10"}
                style={{ transition: reduced ? "none" : `stroke-dashoffset 0.4s ease ${i * 0.1}s, stroke 0.3s ease` }}
              />
              <polyline
                points="8,1 11,4 8,7"
                fill="none"
                stroke={hovered ? "var(--b-navy)" : "var(--b-border)"}
                strokeWidth="1.5"
                style={{ transition: reduced ? "none" : "stroke 0.3s ease" }}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function IndustryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible || reduced;

  return (
    <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {industries.map(({ Icon, name, flow, metric, href }, i) => (
        <Link
          key={name}
          href={href}
          style={{
            display: "block",
            textDecoration: "none",
            background: "white",
            border: "1px solid var(--b-border)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            opacity: show ? 1 : 0,
            transform: show ? (hoveredIdx === i ? "translateY(-6px)" : "translateY(0)") : "translateY(20px)",
            boxShadow: hoveredIdx === i ? "0 12px 32px rgba(40,56,145,0.1)" : "none",
            transition: reduced
              ? "none"
              : `opacity 0.5s ease ${i * 0.08}s, transform 0.3s cubic-bezier(0.16,1,0.3,1) ${show ? "0s" : `${i * 0.08}s`}, box-shadow 0.3s ease`,
            borderColor: hoveredIdx === i ? "rgba(40,56,145,0.25)" : "var(--b-border)",
          }}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{
              width: "2.5rem", height: "2.5rem", borderRadius: "0.5rem",
              background: "rgba(40,56,145,0.08)", display: "flex",
              alignItems: "center", justifyContent: "center", color: "var(--b-navy)",
            }}>
              <Icon size={18} strokeWidth={1.75} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--b-dark)" }}>{name}</span>
          </div>

          <div style={{ marginBottom: "0.875rem" }}>
            <MiniFlow steps={flow} hovered={hoveredIdx === i} reduced={reduced} />
          </div>

          <div style={{
            fontSize: "0.8125rem", fontWeight: 700,
            color: "var(--b-success)",
            display: "flex", alignItems: "center", gap: "0.3rem",
          }}>
            <span style={{ fontSize: "0.75rem" }}>✓</span>
            {metric}
          </div>
        </Link>
      ))}
    </div>
  );
}
