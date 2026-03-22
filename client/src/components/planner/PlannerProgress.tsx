import { motion } from "framer-motion";

interface Props {
  currentStep: number; // 1-8 (display step, not internal step)
  totalSteps?: number;
}

const STEP_LABELS = [
  "Business",
  "Workflows",
  "Tools",
  "Priorities",
  "Deep Dive",
  "Boundaries",
  "Volume",
  "Results",
];

export default function PlannerProgress({ currentStep, totalSteps = 8 }: Props) {
  return (
    <div style={{ width: "100%", marginBottom: 24 }}>
      {/* Step labels row — desktop */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        {STEP_LABELS.map((label, index) => {
          const stepNum = index + 1;
          const isCurrent = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          const isAdjacent =
            Math.abs(stepNum - currentStep) <= 1;

          return (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: "center",
                // On mobile, hide non-adjacent steps
              }}
              className={
                !isAdjacent && !isCurrent ? "hidden sm:block" : "block"
              }
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: isCurrent ? 700 : 400,
                  color: isCurrent
                    ? "#283891"
                    : isCompleted
                    ? "#7E0F4A"
                    : "#7B7B7B",
                  transition: "color 0.2s",
                  letterSpacing: "0.01em",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
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
        {/* Completed segments */}
        {currentStep > 1 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              background: "#7E0F4A",
              borderRadius: 99,
            }}
          />
        )}

        {/* Current segment (blue, partial) */}
        <motion.div
          initial={false}
          animate={{
            left: `${((currentStep - 1) / totalSteps) * 100}%`,
            width: `${(1 / totalSteps) * 100}%`,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            background: "#283891",
            borderRadius: 99,
          }}
        />
      </div>

      {/* Step dots row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          paddingLeft: `${(0.5 / totalSteps) * 100}%`,
          paddingRight: `${(0.5 / totalSteps) * 100}%`,
        }}
      >
        {STEP_LABELS.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={label}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: isCompleted
                  ? "#7E0F4A"
                  : isCurrent
                  ? "#283891"
                  : "#E2E4ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.25s",
                flexShrink: 0,
              }}
            >
              {isCompleted && (
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <path
                    d="M1 3L2.5 4.5L5 2"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* "Step X of 8" label */}
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          fontSize: 12,
          color: "#7B7B7B",
          fontWeight: 400,
        }}
      >
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
