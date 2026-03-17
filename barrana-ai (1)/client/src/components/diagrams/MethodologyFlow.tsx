/**
 * MethodologyFlow.tsx
 * Barrana.ai — Animated horizontal methodology process flow
 * Steps illuminate sequentially as user scrolls into view
 */

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    tag: "Free",
    title: "Operational Friction Mapping",
    desc: "We spend 60 minutes mapping your current workflows, identifying where time is lost and what can be automated in the first 30 days.",
    color: "#283891",
  },
  {
    number: "02",
    tag: null,
    title: "Workflow Prioritization & Design",
    desc: "We architect an automation system that fits your existing tools. Highest-impact, lowest-friction opportunities go first.",
    color: "#283891",
  },
  {
    number: "03",
    tag: null,
    title: "Integration Build & Testing",
    desc: "We build the automation systems, test them against real scenarios from your operations, and iterate until they perform reliably.",
    color: "#7E0F4A",
  },
  {
    number: "04",
    tag: null,
    title: "Deployment & Onboarding",
    desc: "We deploy, document, and train your team. You get full visibility into what is running and what it is doing.",
    color: "#283891",
  },
  {
    number: "05",
    tag: null,
    title: "Monitoring & Optimization",
    desc: "We monitor performance, resolve edge cases, and refine based on real data. The system improves as your business evolves.",
    color: "#283891",
  },
];

export default function MethodologyFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Illuminate steps sequentially
          steps.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), 200 + i * 180);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      {/* Desktop: horizontal flow */}
      <div className="hidden lg:flex items-start gap-0 relative">
        {steps.map((step, i) => (
          <div key={step.number} className="flex-1 relative group">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute top-8 left-1/2 w-full h-px overflow-hidden" style={{ zIndex: 0 }}>
                <div
                  className="h-full"
                  style={{
                    backgroundColor: "#283891",
                    opacity: activeStep >= i ? 0.2 : 0,
                    width: activeStep >= i ? "100%" : "0%",
                    transition: `width 0.5s ease ${0.1 + i * 0.18}s, opacity 0.3s ease`,
                  }}
                />
              </div>
            )}

            <div
              className="relative z-10 px-4 pt-0"
              style={{
                opacity: activeStep >= i ? 1 : 0.25,
                transform: activeStep >= i ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
              }}
            >
              {/* Step number circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-lg transition-all duration-300"
                style={{
                  backgroundColor: activeStep >= i ? step.color : "transparent",
                  border: `2px solid ${step.color}`,
                  color: activeStep >= i ? "white" : step.color,
                  opacity: activeStep >= i ? 1 : 0.4,
                  boxShadow: activeStep >= i ? `0 4px 20px ${step.color}30` : "none",
                }}
              >
                {step.number}
              </div>

              {step.tag && (
                <div className="text-center mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#7E0F4A", color: "white" }}>
                    {step.tag}
                  </span>
                </div>
              )}

              <h3 className="font-bold text-gray-900 text-sm text-center mb-2 leading-snug">{step.title}</h3>
              <p className="text-xs text-gray-500 text-center leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex gap-4"
            style={{
              opacity: activeStep >= i ? 1 : 0.3,
              transform: activeStep >= i ? "translateX(0)" : "translateX(-12px)",
              transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-sm"
              style={{
                backgroundColor: activeStep >= i ? step.color : "transparent",
                border: `2px solid ${step.color}`,
                color: activeStep >= i ? "white" : step.color,
              }}
            >
              {step.number}
            </div>
            <div className="pt-1">
              {step.tag && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full mr-2" style={{ backgroundColor: "#7E0F4A", color: "white" }}>
                  {step.tag}
                </span>
              )}
              <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
