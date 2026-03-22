/**
 * HomepagePlannerCTA.tsx
 * Self-contained section for the homepage.
 * Drop-in after the "Cost of Inaction" / "Problems" section.
 */

import { useState } from "react";
import { Link } from "wouter";

const NAVY     = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY     = "#7B7B7B";
const DARK     = "#1A1A2E";

function BlueCheck() {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6L4.5 8.5L10 3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function HomepagePlannerCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ background: "#F5F5F5", padding: "72px 0" }}>
      <div className="container">
        <div style={{ maxWidth: 680 }}>
          {/* Section label */}
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BURGUNDY,
              marginBottom: 14,
            }}
          >
            Not Sure Where to Start?
          </p>

          {/* H2 */}
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.75vw, 1.875rem)",
              fontWeight: 800,
              color: DARK,
              marginBottom: 20,
              lineHeight: 1.25,
            }}
          >
            Map What Your Business Can Automate
          </h2>

          {/* Body */}
          <p
            style={{
              fontSize: 16,
              color: GREY,
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 560,
            }}
          >
            The Barrana Automation Planner walks you through your workflows and identifies the repetitive tasks costing you time, leads, and capacity. In about 3 minutes, you will see exactly where automation fits and where to start.
          </p>

          {/* Bullet points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
            {[
              "Identify your top automation opportunities",
              "See what should stay human-led",
              "Get a phased implementation roadmap",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <BlueCheck />
                <span style={{ fontSize: 15, color: DARK, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div>
            <Link
              href="/automation-planner"
              style={{
                display: "inline-block",
                padding: "15px 32px",
                borderRadius: 8,
                background: hovered ? "#6a0c3e" : BURGUNDY,
                color: "white",
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 0.15s",
                lineHeight: 1,
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Start the Planner
            </Link>
            <p style={{ fontSize: 13, color: GREY, marginTop: 10 }}>
              Free. No account required. Takes 3 to 5 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
