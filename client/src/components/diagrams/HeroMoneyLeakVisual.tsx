/**
 * HeroMoneyLeakVisual.tsx — Money Leak Bar Chart for "Know My Costs" hero tab
 * 4 horizontal bars showing money leaks, stacking to a total.
 */

import { useState, useEffect } from "react";

const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";

const LEAKS = [
  { label: "Missed & Slow Leads", amount: "$36K–$180K/yr", width: "85%" },
  { label: "Admin Hours Burned", amount: "$26K–$78K/yr", width: "55%" },
  { label: "No-Shows & Empty Slots", amount: "$15K–$150K/yr", width: "70%" },
  { label: "Invoice Delays", amount: "$10K–$50K/yr", width: "35%" },
];

export default function HeroMoneyLeakVisual() {
  const [visibleBars, setVisibleBars] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LEAKS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleBars((prev) => [...prev, i]);
      }, 100 + i * 100));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ maxWidth: 480 }}>
      {LEAKS.map((leak, i) => {
        const isVisible = visibleBars.includes(i);
        return (
          <div
            key={leak.label}
            style={{
              marginBottom: "1.25rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.375rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: GREY, fontWeight: 500 }}>
                {leak.label}
              </span>
              <span style={{ fontSize: "0.9375rem", color: MAGENTA, fontWeight: 700 }}>
                {leak.amount}
              </span>
            </div>
            <div
              style={{
                height: 8,
                background: "rgba(126,15,74,0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: isVisible ? leak.width : "0%",
                  background: "rgba(126,15,74,0.35)",
                  borderRadius: 4,
                  transition: "width 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Separator */}
      <div
        style={{
          borderTop: "1px solid #E2E4ED",
          margin: "1rem 0",
          opacity: visibleBars.length === LEAKS.length ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Total */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          opacity: visibleBars.length === LEAKS.length ? 1 : 0,
          transform: visibleBars.length === LEAKS.length ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
        }}
      >
        <span style={{ fontSize: "0.9375rem", color: "#1A1A2E", fontWeight: 600 }}>
          Total Annual Loss
        </span>
        <span style={{ fontSize: "1.25rem", color: MAGENTA, fontWeight: 800 }}>
          $80K–$200K/yr
        </span>
      </div>
    </div>
  );
}
