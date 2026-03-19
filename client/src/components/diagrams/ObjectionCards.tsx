/**
 * ObjectionCards.tsx
 * 3 cards neutralizing top objections before the problems section.
 */

import { useEffect, useRef, useState } from "react";
import { Layers, UserCheck, Users } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const objections = [
  {
    Icon: Layers,
    title: "No New Software Required",
    body: "We build on top of your existing CRM, calendar, email, and accounting tools. Your team keeps working exactly how they work today.",
  },
  {
    Icon: UserCheck,
    title: "No Technical Knowledge Needed",
    body: "You understand your workflows. That is enough. We handle every technical decision, build, and deployment.",
  },
  {
    Icon: Users,
    title: "Does Not Replace Your Staff",
    body: "Automation handles coordination: data entry, follow-up, reminders, routing. Your team handles judgment, expertise, and relationships.",
  },
];

export default function ObjectionCards() {
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
    <div ref={containerRef} className="grid lg:grid-cols-3 gap-6">
      {objections.map(({ Icon, title, body }, i) => (
        <div
          key={title}
          style={{
            background: "white",
            border: "1px solid var(--b-border)",
            borderRadius: "0.75rem",
            padding: "2rem",
            borderTop: "3px solid var(--b-navy)",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            transition: reduced ? "none" : `opacity 0.5s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
          }}
        >
          <div style={{
            width: "3rem", height: "3rem", borderRadius: "0.5rem",
            background: "rgba(40,56,145,0.08)", display: "flex",
            alignItems: "center", justifyContent: "center",
            color: "var(--b-navy)", marginBottom: "1.25rem",
            opacity: show ? 1 : 0,
            transition: reduced ? "none" : `opacity 0.6s ease ${0.2 + i * 0.12}s`,
          }}>
            <Icon size={22} strokeWidth={1.75} />
          </div>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--b-dark)", marginBottom: "0.625rem" }}>
            {title}
          </h3>
          <p style={{ fontSize: "0.9375rem", color: "var(--b-grey)", lineHeight: 1.65 }}>{body}</p>
        </div>
      ))}
    </div>
  );
}
