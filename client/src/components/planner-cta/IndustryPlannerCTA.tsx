/**
 * IndustryPlannerCTA.tsx
 * Inline CTA section for individual industry pages.
 * Links to /automation-planner?industry={industrySlug}
 */

import { useState } from "react";
import { Link } from "wouter";

const BURGUNDY = "#7E0F4A";
const GREY     = "#7B7B7B";
const DARK     = "#1A1A2E";

interface Props {
  industryName: string; // e.g. "Immigration Consultants"
  industrySlug: string; // e.g. "immigration"
}

export default function IndustryPlannerCTA({ industryName, industrySlug }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ background: "#EEF0FB", padding: "56px 0" }}>
      <div className="container" style={{ maxWidth: 720 }}>
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
          See It for Your Business
        </p>

        {/* H2 */}
        <h2
          style={{
            fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
            fontWeight: 800,
            color: DARK,
            marginBottom: 16,
            lineHeight: 1.3,
          }}
        >
          What Does Automation Look Like for {industryName}?
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: 14,
            color: GREY,
            lineHeight: 1.7,
            marginBottom: 28,
            maxWidth: 540,
          }}
        >
          Use the Barrana Automation Planner to map your specific {industryName} workflows and see where automation delivers the most impact.
        </p>

        {/* CTA */}
        <Link
          href={`/automation-planner?industry=${industrySlug}`}
          style={{
            display: "inline-block",
            padding: "14px 28px",
            borderRadius: 8,
            background: hovered ? "#6a0c3e" : BURGUNDY,
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            textDecoration: "none",
            transition: "background 0.15s",
            lineHeight: 1,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Start the Planner for {industryName}
        </Link>
      </div>
    </section>
  );
}
