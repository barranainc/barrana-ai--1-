import type { PainPointDefinition } from '@/types/planner';

export const PAIN_POINTS: PainPointDefinition[] = [
  { id: 'missed-leads', label: 'Missed leads or slow response to enquiries', mappedWorkflows: ['inbound-enquiries', 'phone-calls', 'lead-qualification'] },
  { id: 'too-much-admin', label: 'Too much time on admin and data entry', mappedWorkflows: ['client-onboarding', 'internal-updates', 'reporting'] },
  { id: 'messy-onboarding', label: 'Messy or inconsistent client onboarding', mappedWorkflows: ['client-onboarding', 'document-collection'] },
  { id: 'staff-overloaded', label: 'Staff overloaded with coordination tasks', mappedWorkflows: ['internal-updates', 'customer-support', 'scheduling-reminders'] },
  { id: 'manual-follow-ups', label: 'Too many manual follow-ups falling through', mappedWorkflows: ['follow-up', 'estimates-proposals'] },
  { id: 'no-visibility', label: 'No visibility into pipeline or operations', mappedWorkflows: ['reporting', 'internal-updates'] },
  { id: 'no-shows', label: 'No-shows and scheduling friction', mappedWorkflows: ['appointment-booking', 'scheduling-reminders'] },
  { id: 'repeated-questions', label: 'Repeated questions eating staff time', mappedWorkflows: ['customer-support', 'phone-calls'] },
  { id: 'poor-handoffs', label: 'Poor handoffs between team members or systems', mappedWorkflows: ['internal-updates', 'client-onboarding'] },
  { id: 'duplicate-entry', label: 'Duplicate data entry across tools', mappedWorkflows: ['client-onboarding', 'invoicing-payments'] },
  { id: 'inconsistent-experience', label: 'Inconsistent client experience', mappedWorkflows: ['client-onboarding', 'follow-up', 'scheduling-reminders'] },
  { id: 'invoicing-delays', label: 'Invoicing delays and cash flow friction', mappedWorkflows: ['invoicing-payments'] },
];

export const PAIN_POINT_MAP = Object.fromEntries(PAIN_POINTS.map(p => [p.id, p])) as Record<string, PainPointDefinition>;
