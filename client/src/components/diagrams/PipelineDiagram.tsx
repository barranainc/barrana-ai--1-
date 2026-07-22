/**
 * PipelineDiagram.tsx
 * Barrana.ai - Animated automation pipeline diagram (LARGE version)
 * Shows trigger → AI processing → CRM update → follow-up
 * Steps animate in sequence on scroll
 */

import { useEffect, useRef, useState } from "react";

interface PipelineStep {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
}

interface PipelineDiagramProps {
  steps: PipelineStep[];
  title?: string;
}

export default function PipelineDiagram({ steps, title }: PipelineDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), 80 + i * 180);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [steps]);

  return (
    <div ref={ref} className="w-full">
      {title && (
        <p className="text-xs text-gray-400 text-center mb-5 font-semibold uppercase tracking-widest">{title}</p>
      )}
      <div className="flex items-start justify-between gap-1">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1 min-w-0 flex-1">
            {/* Step node */}
            <div
              className="flex flex-col items-center flex-1 min-w-0"
              style={{
                opacity: visibleCount > i ? 1 : 0,
                transform: visibleCount > i ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
                transition: `opacity 0.45s ease ${i * 0.12}s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s`,
              }}
            >
              {/* Icon box */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-2 relative flex-shrink-0"
                style={{
                  backgroundColor: visibleCount > i ? step.color : "transparent",
                  border: `2px solid ${step.color}`,
                  boxShadow: visibleCount > i ? `0 4px 14px ${step.color}30` : "none",
                  transition: "background-color 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={visibleCount > i ? "white" : step.color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={step.icon} />
                </svg>
                {/* Step number badge */}
                <div
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    fontSize: "8px",
                    backgroundColor: step.color === "#7E0F4A" ? "#283891" : "#7E0F4A",
                    opacity: visibleCount > i ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {i + 1}
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-800 text-center leading-tight w-full px-1">{step.label}</p>
              <p className="text-[9px] text-gray-400 text-center leading-tight mt-0.5 w-full px-1">{step.sublabel}</p>
            </div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <div
                className="flex items-center pb-7 flex-shrink-0"
                style={{
                  opacity: visibleCount > i ? 1 : 0,
                  transition: `opacity 0.3s ease ${0.1 + i * 0.12}s`,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 10 10" fill="#283891" opacity="0.4">
                  <path d="M0 0 L10 5 L0 10 Z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Pre-defined pipeline configurations
export const PIPELINES = {
  leadCapture: [
    { id: "form",    label: "Lead Form",        sublabel: "Website / SMS",   icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "#283891" },
    { id: "ai",      label: "AI Response",      sublabel: "< 90 seconds",    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1", color: "#7E0F4A" },
    { id: "qualify", label: "Qualify Lead",     sublabel: "Auto questions",  icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#283891" },
    { id: "crm",     label: "CRM Entry",        sublabel: "Auto-logged",     icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "#283891" },
    { id: "book",    label: "Book Appointment", sublabel: "Calendar link",   icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#7E0F4A" },
  ],
  clientIntake: [
    { id: "inquiry",  label: "Client Inquiry", sublabel: "Form / Email",     icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "#283891" },
    { id: "confirm",  label: "Auto Confirm",   sublabel: "Instant reply",    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "#7E0F4A" },
    { id: "record",   label: "CRM Record",     sublabel: "Auto-created",     icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "#283891" },
    { id: "assign",   label: "Assign File",    sublabel: "By visa type",     icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "#283891" },
    { id: "followup", label: "24hr Follow-Up", sublabel: "Auto-scheduled",   icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", color: "#7E0F4A" },
  ],
  documentCollection: [
    { id: "open",      label: "File Opened",    sublabel: "Engagement start", icon: "M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z", color: "#283891" },
    { id: "checklist", label: "Doc Checklist",  sublabel: "Auto-sent",        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", color: "#7E0F4A" },
    { id: "track",     label: "Track Docs",     sublabel: "Real-time status", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "#283891" },
    { id: "remind",    label: "48hr Reminders", sublabel: "Auto-sent",        icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", color: "#7E0F4A" },
    { id: "flag",      label: "Flag Overdue",   sublabel: "Staff alerted",    icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9", color: "#283891" },
  ],
};
