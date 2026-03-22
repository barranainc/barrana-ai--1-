export type Industry =
  | 'accountant'
  | 'immigration'
  | 'law-firm'
  | 'clinic'
  | 'contractor'
  | 'agency'
  | 'real-estate'
  | 'education'
  | 'dental'
  | 'insurance'
  | 'property-management'
  | 'ecommerce'
  | 'professional-other'
  | 'other';

export type WorkflowId =
  | 'inbound-enquiries'
  | 'phone-calls'
  | 'lead-qualification'
  | 'appointment-booking'
  | 'follow-up'
  | 'client-onboarding'
  | 'document-collection'
  | 'estimates-proposals'
  | 'invoicing-payments'
  | 'customer-support'
  | 'internal-updates'
  | 'reporting'
  | 'review-requests'
  | 'scheduling-reminders';

export type PainPointId =
  | 'missed-leads'
  | 'too-much-admin'
  | 'messy-onboarding'
  | 'staff-overloaded'
  | 'manual-follow-ups'
  | 'no-visibility'
  | 'no-shows'
  | 'repeated-questions'
  | 'poor-handoffs'
  | 'duplicate-entry'
  | 'inconsistent-experience'
  | 'invoicing-delays';

export type OpportunityClassification = 'quick-win' | 'strong-next' | 'careful-design' | 'keep-human';

export interface WorkflowQuestion {
  id: string;
  question: string;
  type: 'single' | 'multi';
  options: string[];
}

export interface WorkflowDefinition {
  id: WorkflowId;
  label: string;
  description: string;
  questions: WorkflowQuestion[];
}

export interface IndustryDefinition {
  id: Industry;
  label: string;
  terms: {
    client: string;
    enquiry: string;
    appointment: string;
    file: string;
    intake: string;
    document: string;
    staff: string;
    tool: string;
    compliance: string;
  };
  preweightedWorkflows: WorkflowId[];
}

export interface PainPointDefinition {
  id: PainPointId;
  label: string;
  mappedWorkflows: WorkflowId[];
}

export interface ToolDefinition {
  id: string;
  label: string;
  compatibilityScore: number; // 1-5
  category: string;
}

export interface HumanRequiredOption {
  id: string;
  label: string;
  relatedWorkflows: WorkflowId[];
  impactDescription: string;
}

export interface PlannerState {
  currentStep: number;
  role: string | null;
  teamSize: string | null;
  industry: Industry | null;
  industryOther: string | null;
  selectedWorkflows: WorkflowId[];
  workflowAnswers: Record<string, Record<string, string | string[]>>;
  tools: string[];
  toolsOther: string | null;
  humanRequired: string[];
  painPoints: PainPointId[];
  volume: {
    enquiriesPerWeek: number | null;
    appointmentsPerWeek: number | null;
    activeClientsPerMonth: number | null;
    adminHoursPerWeek: number | null;
  };
  readiness: 'ready' | 'interested' | 'exploring' | null;
}

export interface Opportunity {
  id: string;
  workflowId: WorkflowId;
  name: string;
  description: string;
  classification: OpportunityClassification;
  phase: 1 | 2 | 3;
  score: number;
  estimatedImpact: string;
  toolsInvolved: string[];
  hasHumanGate: boolean;
}

export interface PlannerResults {
  summaryText: string;
  opportunities: Opportunity[];
  humanLedItems: { label: string; explanation: string }[];
  suggestedStart: Opportunity | null;
  complexity: 'low' | 'medium' | 'high';
  roadmap: { phase1: Opportunity[]; phase2: Opportunity[]; phase3: Opportunity[] };
  benefits: {
    adminHoursRecoverable: string;
    responseImprovement: string;
    followUpImprovement: string;
    capacityImprovement: string;
  };
}

export type PlannerAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_ROLE'; role: string }
  | { type: 'SET_TEAM_SIZE'; teamSize: string }
  | { type: 'SET_INDUSTRY'; industry: Industry; other?: string }
  | { type: 'TOGGLE_WORKFLOW'; workflowId: WorkflowId }
  | { type: 'SET_WORKFLOW_ANSWER'; workflowId: WorkflowId; questionId: string; answer: string | string[] }
  | { type: 'TOGGLE_TOOL'; toolId: string }
  | { type: 'SET_TOOLS_OTHER'; other: string }
  | { type: 'TOGGLE_HUMAN_REQUIRED'; optionId: string }
  | { type: 'TOGGLE_PAIN_POINT'; painPointId: PainPointId }
  | { type: 'SET_VOLUME'; field: keyof PlannerState['volume']; value: number }
  | { type: 'SET_READINESS'; readiness: PlannerState['readiness'] }
  | { type: 'RESET' };
