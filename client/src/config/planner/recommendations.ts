import type { WorkflowId } from '@/types/planner';

export interface RecommendationTemplate {
  workflowId: WorkflowId;
  name: string; // Generic name
  shortName: string;
  description: string; // Generic description
  estimatedImpact: string; // Generic impact
  implementationWeeks: string;
  barrana_service_href: string;
}

export const RECOMMENDATION_TEMPLATES: RecommendationTemplate[] = [
  {
    workflowId: 'inbound-enquiries',
    name: 'Enquiry Capture and First Response',
    shortName: 'Lead Response',
    description: 'Automatically capture every inbound enquiry from all channels, send an immediate personalised first response, and qualify the lead before routing to the right person.',
    estimatedImpact: 'Response time from hours to under 5 minutes. Zero missed enquiries. Staff freed from first-contact handling.',
    implementationWeeks: '1-2',
    barrana_service_href: '/services/lead-response-automation',
  },
  {
    workflowId: 'phone-calls',
    name: 'AI Receptionist and Call Routing',
    shortName: 'AI Receptionist',
    description: 'An AI receptionist handles calls 24/7, qualifies callers, books appointments, and routes urgent issues — without voicemail.',
    estimatedImpact: '100% call coverage. After-hours leads captured. Staff spend zero time on routine call handling.',
    implementationWeeks: '2-3',
    barrana_service_href: '/services/ai-receptionist',
  },
  {
    workflowId: 'lead-qualification',
    name: 'Automated Lead Qualification',
    shortName: 'Lead Qualification',
    description: 'Automatically screen and qualify enquiries using consistent criteria, routing only fit prospects for human follow-up.',
    estimatedImpact: 'Time spent on unqualified leads reduced by 60-80%. Only pre-qualified prospects reach your team.',
    implementationWeeks: '2-3',
    barrana_service_href: '/services/lead-response-automation',
  },
  {
    workflowId: 'appointment-booking',
    name: 'Appointment Automation and Reminders',
    shortName: 'Appointment Booking',
    description: 'Online booking, automated confirmations, multi-step reminders, and waitlist management — running without admin involvement.',
    estimatedImpact: 'No-show rate reduced 30-50%. Booking time eliminated. Waitlist fills cancelled slots automatically.',
    implementationWeeks: '1-2',
    barrana_service_href: '/services/appointment-automation',
  },
  {
    workflowId: 'follow-up',
    name: 'Follow-Up Sequence Automation',
    shortName: 'Follow-Up Automation',
    description: 'Systematic follow-up sequences for quotes, proposals, and inactive leads — running automatically at 3, 7, and 14-day intervals.',
    estimatedImpact: '100% of quotes receive follow-up. Conversion rates improve 15-25%. Staff time on follow-up eliminated.',
    implementationWeeks: '1-2',
    barrana_service_href: '/services/lead-response-automation',
  },
  {
    workflowId: 'client-onboarding',
    name: 'Client Intake and Onboarding Automation',
    shortName: 'Client Intake',
    description: 'Standardised intake forms, automatic CRM entry, welcome sequences, and document requests triggered from first contact.',
    estimatedImpact: 'Intake time reduced 80%+. Consistent experience for every client. Staff freed from manual data entry.',
    implementationWeeks: '2-3',
    barrana_service_href: '/services/client-intake-automation',
  },
  {
    workflowId: 'document-collection',
    name: 'Document Collection System',
    shortName: 'Document Collection',
    description: 'Automated document request portal with multi-step reminders, progress tracking, and compliance-ready audit trails.',
    estimatedImpact: 'Collection time reduced from weeks to days. Staff hours on document chase eliminated.',
    implementationWeeks: '2-4',
    barrana_service_href: '/services/document-collection',
  },
  {
    workflowId: 'estimates-proposals',
    name: 'Quote and Proposal Automation',
    shortName: 'Quote Automation',
    description: 'Template-based proposal generation triggered by enquiry, with automated follow-up sequences for sent quotes.',
    estimatedImpact: 'Quote turnaround time reduced to same-day. Follow-up consistency reaches 100%.',
    implementationWeeks: '2-3',
    barrana_service_href: '/services/workflow-automation',
  },
  {
    workflowId: 'invoicing-payments',
    name: 'Invoice and Payment Automation',
    shortName: 'Invoice Automation',
    description: 'Invoices triggered automatically at project milestones, with multi-step payment reminders at 7, 14, and 21 days.',
    estimatedImpact: 'Invoice cycle accelerated 7-14 days. Staff time on billing eliminated. Cash flow improved.',
    implementationWeeks: '1-2',
    barrana_service_href: '/services/invoice-automation',
  },
  {
    workflowId: 'customer-support',
    name: 'FAQ and Support Automation',
    shortName: 'Support Automation',
    description: 'AI handles recurring questions instantly, 24/7, escalating only complex issues to human team members.',
    estimatedImpact: '60-80% of routine questions handled automatically. Staff time on repetitive support eliminated.',
    implementationWeeks: '2-3',
    barrana_service_href: '/services/ai-receptionist',
  },
  {
    workflowId: 'internal-updates',
    name: 'Workflow and Handoff Automation',
    shortName: 'Internal Workflows',
    description: 'Automatic task routing, status updates, and handoff notifications — so work moves without manual nudging.',
    estimatedImpact: 'Tasks no longer stuck waiting for notifications. Handoff time eliminated. Team visibility improved.',
    implementationWeeks: '3-4',
    barrana_service_href: '/services/workflow-automation',
  },
  {
    workflowId: 'reporting',
    name: 'Automated Reporting and Dashboards',
    shortName: 'Reporting',
    description: 'Operational summaries, pipeline reports, and client updates generated and sent automatically on schedule.',
    estimatedImpact: 'Report preparation time eliminated. Consistent visibility without manual compilation.',
    implementationWeeks: '3-4',
    barrana_service_href: '/services/operations-reporting',
  },
  {
    workflowId: 'review-requests',
    name: 'Automated Review Requests',
    shortName: 'Review Automation',
    description: 'Timed review requests sent automatically after service delivery to the right platform for each client.',
    estimatedImpact: 'Review volume increases 3-5x. Zero staff time on review requests.',
    implementationWeeks: '1',
    barrana_service_href: '/services/workflow-automation',
  },
  {
    workflowId: 'scheduling-reminders',
    name: 'Scheduling and Reminder System',
    shortName: 'Reminder System',
    description: 'Multi-step appointment reminders, rescheduling links, and automatic waitlist fills — all automated.',
    estimatedImpact: 'No-show rate reduced 30-50%. Cancellation slots filled automatically. Admin time on scheduling eliminated.',
    implementationWeeks: '1-2',
    barrana_service_href: '/services/appointment-automation',
  },
];

export const RECOMMENDATION_MAP = Object.fromEntries(
  RECOMMENDATION_TEMPLATES.map(r => [r.workflowId, r])
) as Record<WorkflowId, RecommendationTemplate>;
