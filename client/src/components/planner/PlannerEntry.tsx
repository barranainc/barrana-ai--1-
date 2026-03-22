interface Props {
  onStart: () => void;
}

const BENEFITS = [
  "Your top automation opportunities, ranked by impact",
  "What should stay human-led in your business",
  "A phased implementation roadmap",
];

export default function PlannerEntry({ onStart }: Props) {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      {/* Headline */}
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 32px)",
          fontWeight: 800,
          color: "#283891",
          lineHeight: 1.2,
          marginBottom: 16,
          marginTop: 0,
        }}
      >
        Map What Your Business Can Automate
      </h1>

      {/* Subheadline */}
      <p
        style={{
          fontSize: 16,
          color: "#7B7B7B",
          lineHeight: 1.6,
          marginBottom: 36,
          maxWidth: 480,
          margin: "0 auto 36px",
        }}
      >
        Answer a few guided questions to identify repetitive workflows,
        bottlenecks, and the best starting points for automation.
      </p>

      {/* Benefit rows */}
      <div
        style={{
          background: "#F7F8FC",
          borderRadius: 12,
          padding: "24px 28px",
          marginBottom: 36,
          textAlign: "left",
          display: "inline-block",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {BENEFITS.map((benefit) => (
          <div
            key={benefit}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#7E0F4A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6L4.5 8.5L10 3"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 15,
                color: "#1A1A2E",
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              {benefit}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button
        type="button"
        onClick={onStart}
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "16px 32px",
          borderRadius: 8,
          border: "none",
          background: "#7E0F4A",
          color: "white",
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          display: "block",
          margin: "0 auto 16px",
          transition: "background 0.15s",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#6a0c3e";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#7E0F4A";
        }}
      >
        Start the Planner
      </button>

      {/* Microcopy */}
      <p
        style={{
          fontSize: 13,
          color: "#7B7B7B",
          margin: 0,
        }}
      >
        Takes about 3 to 5 minutes. No account required.
      </p>
    </div>
  );
}
