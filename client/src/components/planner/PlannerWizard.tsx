import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePlannerState } from "@/hooks/usePlannerState";
import type { Industry, PlannerState } from "@/types/planner";
import PlannerEntry from "./PlannerEntry";
import StepRole from "./StepRole";
import StepIndustry from "./StepIndustry";
import StepWorkflows from "./StepWorkflows";
import StepTools from "./StepTools";
import StepHumanRequired from "./StepHumanRequired";
import StepPainPoints from "./StepPainPoints";
import StepDeepDive from "./StepDeepDive";
import StepVolume from "./StepVolume";
import PlannerResults from "./PlannerResults";
import PlannerProgress from "./PlannerProgress";

interface Props {
  initialIndustry?: Industry;
  onComplete?: (state: PlannerState) => void;
}

// Map internal step → progress bar display step (1-8)
function getProgressStep(currentStep: number): number {
  // step 0 = entry (no bar)
  // step 1 = Role (progress 1)
  // step 2 = Industry (progress 2)
  // step 3 = Workflows (progress 3)
  // step 4 = Tools (progress 4)
  // step 5 = HumanRequired (progress 5)
  // step 6 = PainPoints (progress 6)
  // step 7 = DeepDive (progress 7)
  // step 8 = Volume (progress 8)
  // step 9 = Results (progress 8 complete)
  if (currentStep <= 0) return 0;
  if (currentStep >= 9) return 8;
  return currentStep;
}

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function PlannerWizard({ initialIndustry, onComplete }: Props) {
  const { state, dispatch, nextStep, prevStep } = usePlannerState(initialIndustry);
  const { currentStep } = state;

  // Check for ?industry= query param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const industryParam = params.get("industry");
    if (industryParam) {
      dispatch({ type: "SET_INDUSTRY", industry: industryParam as Industry });
    }
  }, [dispatch]);

  // When reaching the results step, call onComplete if provided
  useEffect(() => {
    if (currentStep === 9 && onComplete) {
      onComplete(state);
    }
  }, [currentStep, onComplete, state]);

  const progressStep = getProgressStep(currentStep);
  const showProgress = currentStep > 0;

  function handleNext() {
    nextStep();
  }

  function handleBack() {
    prevStep();
  }

  function handleStart() {
    dispatch({ type: "SET_STEP", step: 1 });
  }

  function renderStep() {
    switch (currentStep) {
      case 0:
        return <PlannerEntry key="entry" onStart={handleStart} />;
      case 1:
        return (
          <StepRole
            key="role"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <StepIndustry
            key="industry"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <StepWorkflows
            key="workflows"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <StepTools
            key="tools"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <StepHumanRequired
            key="human-required"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <StepPainPoints
            key="pain-points"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <StepDeepDive
            key="deep-dive"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 8:
        return (
          <StepVolume
            key="volume"
            state={state}
            dispatch={dispatch}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 9:
        return <PlannerResults key="results" state={state} />;
      default:
        return null;
    }
  }

  return (
    <div
      style={{
        minHeight: "100%",
        padding: "32px 16px 64px",
        maxWidth: 800,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Progress bar (hidden on entry step) */}
      {showProgress && (
        <div style={{ marginBottom: 32 }}>
          <PlannerProgress currentStep={progressStep} totalSteps={8} />
        </div>
      )}

      {/* Step content with transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            enter: { duration: 0.3, ease: "easeOut" },
            exit: { duration: 0.2, ease: "easeIn" },
          }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
