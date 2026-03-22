import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  currentStep: number; // 1-8 (display step, not internal step)
  totalSteps?: number;
}

const NAVY = "#283891";
const BURGUNDY = "#7E0F4A";
const GREY = "#7B7B7B";

const STEP_NAMES = [
  "About You",
  "Your Business",
  "Workflows",
  "Your Tools",
  "Priorities",
  "Boundaries",
  "Deep Dive",
  "Volume",
];

function getTimeLabel(currentStep: number, totalSteps: number): string {
  const remaining = totalSteps - currentStep;
  if (remaining <= 0) return "Done!";
  if (remaining === 1) return "Almost done";
  if (remaining <= 3) return "About 2 minutes left";
  return "About 4 minutes left";
}

const pulseKeyframes = `
@keyframes plannerPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(40, 56, 145, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(40, 56, 145, 0); }
}
`;

export default function PlannerProgress({ currentStep, totalSteps = 8 }: Props) {
  const reducedMotion = useReducedMotion();
  const timeLabel = getTimeLabel(currentStep, totalSteps);

  // Fraction widths for mobile fill bar
  const completedFraction = Math.max(0, (currentStep - 1) / totalSteps);
  const currentFraction = 1 / totalSteps;

  return (
    <>
      {/* Inject pulse keyframes once */}
      <style>{pulseKeyframes}</style>

      {/* ── Desktop layout (≥600px) ── */}
      <div
        style={{
          width: "100%",
          marginBottom: 24,
          display: "none",
        }}
        className="planner-progress-desktop"
      >
        {/* Connector + circles row */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Connecting line behind circles */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
              right: 10,
              height: 1,
              background: "#E2E4ED",
              transform: "translateY(-50%)",
              zIndex: 0,
            }}
          />

          {STEP_NAMES.map((name, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 1,
                  flex: 1,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: isCompleted
                      ? BURGUNDY
                      : isCurrent
                      ? NAVY
                      : "transparent",
                    border: isCompleted || isCurrent
                      ? "none"
                      : `2px solid ${GREY}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    animation:
                      isCurrent && !reducedMotion
                        ? "plannerPulse 1.5s ease-in-out infinite"
                        : "none",
                    transition: "background 0.25s, border-color 0.25s",
                  }}
                >
                  {isCompleted && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4 7L8 3"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: isCurrent ? 700 : 400,
                    color: isCompleted ? BURGUNDY : isCurrent ? NAVY : GREY,
                    marginTop: 6,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s",
                    letterSpacing: "0.01em",
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step X of 8 — time label */}
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 12,
            color: GREY,
            fontWeight: 400,
          }}
        >
          Step {currentStep} of {totalSteps} — {timeLabel}
        </div>
      </div>

      {/* ── Mobile layout (<600px) ── */}
      <div
        style={{
          width: "100%",
          marginBottom: 20,
          display: "block",
        }}
        className="planner-progress-mobile"
      >
        {/* Thin fill bar */}
        <div
          style={{
            position: "relative",
            height: 6,
            borderRadius: 99,
            background: "#E2E4ED",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/* Completed portion */}
          {currentStep > 1 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completedFraction * 100}%` }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeInOut" }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                background: BURGUNDY,
                borderRadius: 99,
              }}
            />
          )}

          {/* Current segment */}
          <motion.div
            initial={false}
            animate={{
              left: `${completedFraction * 100}%`,
              width: `${currentFraction * 100}%`,
            }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              height: "100%",
              background: NAVY,
              borderRadius: 99,
            }}
          />
        </div>

        {/* Step X / 8 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: 12,
            color: GREY,
            fontWeight: 400,
          }}
        >
          Step {currentStep} / {totalSteps}
        </div>
      </div>

      {/* Responsive visibility via <style> tag */}
      <style>{`
        @media (min-width: 600px) {
          .planner-progress-desktop { display: block !important; }
          .planner-progress-mobile  { display: none !important; }
        }
        @media (max-width: 599px) {
          .planner-progress-desktop { display: none !important; }
          .planner-progress-mobile  { display: block !important; }
        }
      `}</style>
    </>
  );
}
