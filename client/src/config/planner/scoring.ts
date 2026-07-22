import type { WorkflowId, PainPointId, OpportunityClassification } from '@/types/planner';

// Scoring weights (must sum to 1)
export const SCORING_WEIGHTS = {
  painSeverity: 0.30,
  frequency: 0.20,
  standardisation: 0.15,
  toolCompatibility: 0.15,
  humanSensitivity: 0.10, // inverse - lower sensitivity = higher score
  quickWinPotential: 0.10,
};

// Classification thresholds
export const CLASSIFICATION_THRESHOLDS = {
  quickWin: 4.0,
  strongNext: 3.0,
  carefulDesign: 2.0,
  // below 2.0 = keepHuman
};

// Base scores per workflow (1-5 scale) for each dimension
// Format: [painSeverity, frequency, standardisation, toolCompatibility, humanSensitivity, quickWinPotential]
export const WORKFLOW_BASE_SCORES: Record<WorkflowId, [number, number, number, number, number, number]> = {
  'inbound-enquiries':     [4, 5, 4, 4, 4, 5],
  'phone-calls':           [4, 4, 3, 3, 4, 4],
  'lead-qualification':    [3, 4, 3, 3, 3, 3],
  'appointment-booking':   [4, 5, 5, 5, 5, 5],
  'follow-up':             [4, 4, 5, 4, 4, 5],
  'client-onboarding':     [3, 3, 4, 3, 3, 3],
  'document-collection':   [4, 4, 4, 3, 3, 3],
  'estimates-proposals':   [3, 3, 3, 3, 3, 3],
  'invoicing-payments':    [3, 4, 5, 5, 4, 4],
  'customer-support':      [3, 5, 4, 3, 3, 4],
  'internal-updates':      [2, 4, 3, 3, 4, 3],
  'reporting':             [2, 3, 4, 3, 5, 3],
  'review-requests':       [3, 3, 5, 4, 5, 5],
  'scheduling-reminders':  [4, 5, 5, 4, 5, 5],
};

// Pain point → workflow amplifier (adds to painSeverity score when pain is in top 3)
export const PAIN_AMPLIFIERS: Record<PainPointId, Partial<Record<WorkflowId, number>>> = {
  'missed-leads':             { 'inbound-enquiries': 1.5, 'phone-calls': 1.2, 'lead-qualification': 1.0 },
  'too-much-admin':           { 'client-onboarding': 1.2, 'internal-updates': 1.0, 'reporting': 1.2 },
  'messy-onboarding':         { 'client-onboarding': 1.5, 'document-collection': 1.2 },
  'staff-overloaded':         { 'internal-updates': 1.2, 'customer-support': 1.0, 'scheduling-reminders': 1.0 },
  'manual-follow-ups':        { 'follow-up': 1.5, 'estimates-proposals': 1.2 },
  'no-visibility':            { 'reporting': 1.5, 'internal-updates': 1.2 },
  'no-shows':                 { 'appointment-booking': 1.5, 'scheduling-reminders': 1.5 },
  'repeated-questions':       { 'customer-support': 1.5, 'phone-calls': 1.0 },
  'poor-handoffs':            { 'internal-updates': 1.5, 'client-onboarding': 1.0 },
  'duplicate-entry':          { 'client-onboarding': 1.2, 'invoicing-payments': 1.2 },
  'inconsistent-experience':  { 'client-onboarding': 1.2, 'follow-up': 1.0, 'scheduling-reminders': 1.0 },
  'invoicing-delays':         { 'invoicing-payments': 1.5 },
};

// Team size modifiers for complexity
export const TEAM_SIZE_COMPLEXITY: Record<string, number> = {
  'Just me': 0.8,
  '2 to 5': 1.0,
  '6 to 15': 1.2,
  '16 to 50': 1.4,
  '50+': 1.6,
};

export function classifyOpportunity(score: number): OpportunityClassification {
  if (score >= CLASSIFICATION_THRESHOLDS.quickWin) return 'quick-win';
  if (score >= CLASSIFICATION_THRESHOLDS.strongNext) return 'strong-next';
  if (score >= CLASSIFICATION_THRESHOLDS.carefulDesign) return 'careful-design';
  return 'keep-human';
}
