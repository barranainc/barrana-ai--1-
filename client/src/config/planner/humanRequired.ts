import type { HumanRequiredOption, WorkflowId } from '@/types/planner';

export const HUMAN_REQUIRED_OPTIONS: HumanRequiredOption[] = [
  {
    id: 'professional-judgement',
    label: 'Professional judgement or expert advice',
    relatedWorkflows: ['lead-qualification', 'client-onboarding'],
    impactDescription: 'Qualification steps include human review before routing. Expert advice flagged for human delivery.',
  },
  {
    id: 'legal-regulated',
    label: 'Legal or regulated decisions',
    relatedWorkflows: ['document-collection', 'client-onboarding', 'invoicing-payments'],
    impactDescription: 'Automation handles coordination; all regulated decisions include mandatory human review gate.',
  },
  {
    id: 'pricing-decisions',
    label: 'Pricing decisions and custom quotes',
    relatedWorkflows: ['estimates-proposals'],
    impactDescription: 'Quote templates are automated; final pricing approval remains with human.',
  },
  {
    id: 'sensitive-documents',
    label: 'Reviewing sensitive or confidential documents',
    relatedWorkflows: ['document-collection', 'client-onboarding'],
    impactDescription: 'Document collection automated; human review required before processing confidential content.',
  },
  {
    id: 'comms-approval',
    label: 'Approval before sending client communications',
    relatedWorkflows: ['inbound-enquiries', 'follow-up', 'client-onboarding'],
    impactDescription: 'All outbound communications queue for human approval before sending.',
  },
  {
    id: 'payment-approval',
    label: 'Payment or refund approval',
    relatedWorkflows: ['invoicing-payments'],
    impactDescription: 'Invoice generation automated; payment release and refunds require human authorisation.',
  },
  {
    id: 'edge-cases',
    label: 'Handling unusual or edge-case situations',
    relatedWorkflows: ['customer-support', 'inbound-enquiries'],
    impactDescription: 'Standard enquiries automated; edge cases flagged for human handling.',
  },
  {
    id: 'complex-escalation',
    label: 'Escalation for complex client issues',
    relatedWorkflows: ['customer-support', 'internal-updates'],
    impactDescription: 'Routine support automated with smart escalation paths to human team members.',
  },
  {
    id: 'relationship-conversations',
    label: 'Relationship-driven conversations',
    relatedWorkflows: ['follow-up', 'client-onboarding'],
    impactDescription: 'Administrative follow-up automated; relationship-critical touchpoints flagged for personal handling.',
  },
  {
    id: 'final-signoff',
    label: 'Final sign-off on deliverables or work',
    relatedWorkflows: ['reporting', 'estimates-proposals', 'invoicing-payments'],
    impactDescription: 'Deliverables prepared automatically; final sign-off by human before client delivery.',
  },
];
