import { useReducer, useCallback } from 'react';
import type { PlannerState, PlannerAction, Industry, WorkflowId, PainPointId } from '@/types/planner';

const INITIAL_STATE: PlannerState = {
  currentStep: 0,
  role: null,
  teamSize: null,
  industry: null,
  industryOther: null,
  selectedWorkflows: [],
  workflowAnswers: {},
  tools: [],
  toolsOther: null,
  humanRequired: [],
  painPoints: [],
  volume: {
    enquiriesPerWeek: null,
    appointmentsPerWeek: null,
    activeClientsPerMonth: null,
    adminHoursPerWeek: null,
  },
  readiness: null,
};

function plannerReducer(state: PlannerState, action: PlannerAction): PlannerState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'SET_ROLE':
      return { ...state, role: action.role };
    case 'SET_TEAM_SIZE':
      return { ...state, teamSize: action.teamSize };
    case 'SET_INDUSTRY':
      return { ...state, industry: action.industry, industryOther: action.other ?? null };
    case 'TOGGLE_WORKFLOW': {
      const exists = state.selectedWorkflows.includes(action.workflowId);
      return {
        ...state,
        selectedWorkflows: exists
          ? state.selectedWorkflows.filter(w => w !== action.workflowId)
          : [...state.selectedWorkflows, action.workflowId],
      };
    }
    case 'SET_WORKFLOW_ANSWER':
      return {
        ...state,
        workflowAnswers: {
          ...state.workflowAnswers,
          [action.workflowId]: {
            ...(state.workflowAnswers[action.workflowId] ?? {}),
            [action.questionId]: action.answer,
          },
        },
      };
    case 'TOGGLE_TOOL': {
      const exists = state.tools.includes(action.toolId);
      return {
        ...state,
        tools: exists ? state.tools.filter(t => t !== action.toolId) : [...state.tools, action.toolId],
      };
    }
    case 'SET_TOOLS_OTHER':
      return { ...state, toolsOther: action.other };
    case 'TOGGLE_HUMAN_REQUIRED': {
      const exists = state.humanRequired.includes(action.optionId);
      return {
        ...state,
        humanRequired: exists
          ? state.humanRequired.filter(h => h !== action.optionId)
          : [...state.humanRequired, action.optionId],
      };
    }
    case 'TOGGLE_PAIN_POINT': {
      const exists = state.painPoints.includes(action.painPointId);
      if (exists) {
        return { ...state, painPoints: state.painPoints.filter(p => p !== action.painPointId) };
      }
      if (state.painPoints.length >= 3) return state; // max 3
      return { ...state, painPoints: [...state.painPoints, action.painPointId] };
    }
    case 'SET_VOLUME':
      return { ...state, volume: { ...state.volume, [action.field]: action.value } };
    case 'SET_READINESS':
      return { ...state, readiness: action.readiness };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

// Step ordering for UI display
export const STEP_NAMES = ['Business', 'Workflows', 'Tools', 'Priorities', 'Deep Dive', 'Boundaries', 'Volume', 'Results'];

// Deep-dive workflows = intersection of selectedWorkflows and pain-mapped workflows, max 3
export function getDeepDiveWorkflows(state: PlannerState): WorkflowId[] {
  if (state.painPoints.length === 0) return state.selectedWorkflows.slice(0, 3);

  const { PAIN_POINT_MAP } = require('@/config/planner/painPoints');
  const painMappedWorkflows = new Set<WorkflowId>();
  state.painPoints.forEach(pp => {
    (PAIN_POINT_MAP[pp]?.mappedWorkflows ?? []).forEach((w: WorkflowId) => painMappedWorkflows.add(w));
  });

  const intersection = state.selectedWorkflows.filter(w => painMappedWorkflows.has(w));
  return intersection.slice(0, 3);
}

export function usePlannerState(initialIndustry?: Industry) {
  const initial = initialIndustry
    ? { ...INITIAL_STATE, industry: initialIndustry }
    : INITIAL_STATE;

  const [state, dispatch] = useReducer(plannerReducer, initial);

  const goToStep = useCallback((step: number) => dispatch({ type: 'SET_STEP', step }), []);
  const nextStep = useCallback(() => dispatch({ type: 'SET_STEP', step: state.currentStep + 1 }), [state.currentStep]);
  const prevStep = useCallback(() => dispatch({ type: 'SET_STEP', step: Math.max(0, state.currentStep - 1) }), [state.currentStep]);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return { state, dispatch, goToStep, nextStep, prevStep, reset };
}
