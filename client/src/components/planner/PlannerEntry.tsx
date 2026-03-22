import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  onStart: () => void;
}

const NAVY = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY = "#7B7B7B";
const DARK = "#1A1A2E";

// ── SVG icons ──────────────────────────────────────────────────────────────

function BullseyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="12" stroke={NAVY} strokeWidth="1.8" />
      <circle cx="14" cy="14" r="8"  stroke={NAVY} strokeWidth="1.8" />
      <circle cx="14" cy="14" r="3.5" fill={NAVY} />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 14l3 3 5-6"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapRouteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="6"  cy="22" r="2.5" stroke={NAVY} strokeWidth="1.8" />
      <circle cx="14" cy="6"  r="2.5" stroke={NAVY} strokeWidth="1.8" />
      <circle cx="22" cy="14" r="2.5" stroke={NAVY} strokeWidth="1.8" />
      <path
        d="M6 19.5C6 19.5 6 12 14 12"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 8.5C14 8.5 14 11.5 19.5 11.5"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 12h8"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Chaos-to-order SVG illustration ───────────────────────────────────────

const CHAOS_CIRCLES = [
  { cx: 22, cy: 18 },
  { cx: 34, cy: 30 },
  { cx: 18, cy: 42 },
  { cx: 40, cy: 54 },
  { cx: 28, cy: 64 },
  { cx: 12, cy: 56 },
];

const ORDER_CIRCLES = [
  { cx: 230, cy: 24 },
  { cx: 230, cy: 40 },
  { cx: 230, cy: 56 },
];

// Paths from each chaos circle to the midpoint, then to order circles
const PATHS = [
  { d: "M22,18 C80,18 140,24 230,24" },
  { d: "M34,30 C90,30 140,24 230,24" },
  { d: "M18,42 C80,42 140,40 230,40" },
  { d: "M40,54 C90,54 140,40 230,40" },
  { d: "M28,64 C80,64 140,56 230,56" },
  { d: "M12,56 C70,56 140,56 230,56" },
];

const strokeDashAnimation = `
@keyframes drawPath {
  0%   { stroke-dashoffset: 220; }
  60%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; }
}
`;

function ChaosToOrderSVG({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 260 80"
      width="100%"
      height="80"
      aria-label="Diagram showing scattered inputs connecting into an organised flow"
      role="img"
    >
      <style>{strokeDashAnimation}</style>

      {/* Animated connecting paths */}
      {PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke="#C7CAD9"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="220"
          strokeDashoffset={reduced ? 0 : 220}
          style={
            reduced
              ? undefined
              : {
                  animation: `drawPath 2s ease-in-out ${i * 0.18}s infinite`,
                }
          }
        />
      ))}

      {/* Chaos circles (left) */}
      {CHAOS_CIRCLES.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r="5" fill={GREY} opacity="0.55" />
      ))}

      {/* Order circles (right) */}
      {ORDER_CIRCLES.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r="6" fill={NAVY} />
      ))}

      {/* Arrow head on right */}
      <polygon
        points="244,40 236,35 236,45"
        fill={NAVY}
      />
    </svg>
  );
}

// ── Benefit card ───────────────────────────────────────────────────────────

interface CardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function BenefitCard({ icon, title, body }: CardProps) {
  return (
    <div
      style={{
        flex: 1,
        background: "white",
        border: "1.5px solid #E2E4ED",
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        boxSizing: "border-box",
        minWidth: 0,
      }}
    >
      <div style={{ marginBottom: 10, lineHeight: 0 }}>{icon}</div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: DARK,
          marginBottom: 4,
          lineHeight: 1.35,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: GREY,
          lineHeight: 1.5,
        }}
      >
        {body}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function PlannerEntry({ onStart }: Props) {
  const reduced = useReducedMotion();

  return (
    <>
      <style>{`
        @media (max-width: 480px) {
          .planner-cards-row {
            flex-direction: column !important;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "40px 24px 48px",
        }}
      >
        {/* ── Section A: Animated illustration ── */}
        <div style={{ marginBottom: 28 }}>
          <ChaosToOrderSVG reduced={reduced} />
        </div>

        {/* ── Section B: Headline + subheadline + 3 cards ── */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: NAVY,
            lineHeight: 1.25,
            marginBottom: 12,
            marginTop: 0,
            textAlign: "center",
          }}
        >
          Map What Your Business Can Automate
        </h1>

        <p
          style={{
            fontSize: 15,
            color: GREY,
            lineHeight: 1.65,
            marginBottom: 28,
            marginTop: 0,
            textAlign: "center",
          }}
        >
          Answer 8 guided questions. Get a personalised automation roadmap. See
          what should stay in human hands.
        </p>

        {/* Three benefit cards */}
        <div
          className="planner-cards-row"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <BenefitCard
            icon={<BullseyeIcon />}
            title="Your Top Opportunities"
            body="Ranked by impact and ease"
          />
          <BenefitCard
            icon={<ShieldIcon />}
            title="Your Control Points"
            body="What stays human-led"
          />
          <BenefitCard
            icon={<MapRouteIcon />}
            title="Your Phased Roadmap"
            body="What to automate first, second, third"
          />
        </div>

        {/* ── Section C: CTA + trust signals ── */}
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={onStart}
            style={{
              width: "100%",
              maxWidth: 320,
              padding: "16px 32px",
              borderRadius: 8,
              border: "none",
              background: BURGUNDY,
              color: "white",
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer",
              display: "block",
              margin: "0 auto 12px",
              transition: "background 0.15s",
              lineHeight: 1,
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#6a0c3e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = BURGUNDY;
            }}
          >
            Start the Planner
          </button>

          <p
            style={{
              fontSize: 13,
              color: GREY,
              margin: "0 0 20px",
              lineHeight: 1.5,
            }}
          >
            Takes about 3 to 5 minutes. No account required.
          </p>

          {/* Trust signals strip */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px 6px",
              fontSize: 12,
              color: GREY,
            }}
          >
            <span>Works with your existing tools</span>
            <span aria-hidden="true" style={{ opacity: 0.45 }}>•</span>
            <span>Phased, not all-at-once</span>
            <span aria-hidden="true" style={{ opacity: 0.45 }}>•</span>
            <span>No hype, just practical workflows</span>
          </div>
        </div>
      </div>
    </>
  );
}
