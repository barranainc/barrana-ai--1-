import type { IndustryDefinition } from '@/types/planner';

export const INDUSTRIES: IndustryDefinition[] = [
  {
    id: 'accountant',
    label: 'Accountant / Bookkeeper',
    terms: { client: 'client', enquiry: 'enquiry', appointment: 'meeting', file: 'engagement', intake: 'new client onboarding', document: 'tax documents (T4s, receipts, investment statements, etc.)', staff: 'accountant', tool: 'QuickBooks', compliance: 'CRA filing deadlines' },
    preweightedWorkflows: ['document-collection', 'client-onboarding', 'invoicing-payments'],
  },
  {
    id: 'immigration',
    label: 'Immigration Consultant',
    terms: { client: 'client', enquiry: 'enquiry', appointment: 'consultation', file: 'case file', intake: 'intake assessment', document: 'supporting documents (passport, employment records, transcripts, etc.)', staff: 'consultant', tool: 'CRM', compliance: 'RCIC compliance and PIPEDA requirements' },
    preweightedWorkflows: ['document-collection', 'inbound-enquiries', 'client-onboarding'],
  },
  {
    id: 'law-firm',
    label: 'Law Firm',
    terms: { client: 'client', enquiry: 'matter enquiry', appointment: 'consultation', file: 'matter', intake: 'matter intake', document: 'case documents and evidence', staff: 'lawyer', tool: 'Clio', compliance: 'solicitor-client privilege and regulatory requirements' },
    preweightedWorkflows: ['client-onboarding', 'document-collection', 'invoicing-payments'],
  },
  {
    id: 'clinic',
    label: 'Clinic / Healthcare Practice',
    terms: { client: 'patient', enquiry: 'booking request', appointment: 'appointment', file: 'patient record', intake: 'patient intake', document: 'health history and intake forms', staff: 'practitioner', tool: 'Jane App', compliance: 'PHIPA requirements' },
    preweightedWorkflows: ['appointment-booking', 'scheduling-reminders', 'customer-support'],
  },
  {
    id: 'contractor',
    label: 'Contractor / Home Services',
    terms: { client: 'customer', enquiry: 'quote request', appointment: 'site visit', file: 'job', intake: 'job estimate', document: 'project specs and photos', staff: 'crew', tool: 'Jobber', compliance: 'safety and building code requirements' },
    preweightedWorkflows: ['inbound-enquiries', 'follow-up', 'estimates-proposals'],
  },
  {
    id: 'agency',
    label: 'Agency / Marketing Firm',
    terms: { client: 'client', enquiry: 'lead', appointment: 'discovery call', file: 'account', intake: 'client onboarding', document: 'brand assets, credentials, and strategy brief', staff: 'account manager', tool: 'Monday.com', compliance: 'SLA requirements' },
    preweightedWorkflows: ['client-onboarding', 'reporting', 'invoicing-payments'],
  },
  {
    id: 'real-estate',
    label: 'Real Estate Office',
    terms: { client: 'buyer/seller', enquiry: 'lead', appointment: 'showing', file: 'transaction', intake: 'buyer/seller intake', document: 'purchase documents and pre-approval', staff: 'agent', tool: 'CRM', compliance: 'real estate regulations' },
    preweightedWorkflows: ['inbound-enquiries', 'follow-up', 'appointment-booking'],
  },
  {
    id: 'education',
    label: 'Education / Training Business',
    terms: { client: 'student', enquiry: 'enrolment enquiry', appointment: 'session', file: 'enrolment', intake: 'student onboarding', document: 'enrolment forms and records', staff: 'instructor', tool: 'CRM', compliance: 'education regulations' },
    preweightedWorkflows: ['inbound-enquiries', 'scheduling-reminders', 'follow-up'],
  },
  {
    id: 'dental',
    label: 'Dental Office',
    terms: { client: 'patient', enquiry: 'booking request', appointment: 'appointment', file: 'patient record', intake: 'patient registration', document: 'dental and medical history forms', staff: 'hygienist/dentist', tool: 'Dentrix', compliance: 'PHIPA requirements' },
    preweightedWorkflows: ['scheduling-reminders', 'appointment-booking', 'review-requests'],
  },
  {
    id: 'insurance',
    label: 'Insurance / Mortgage Broker',
    terms: { client: 'client', enquiry: 'quote request', appointment: 'meeting', file: 'policy/application', intake: 'application intake', document: 'supporting documents and financial records', staff: 'broker', tool: 'management system', compliance: 'FSRA/RIBO requirements' },
    preweightedWorkflows: ['follow-up', 'document-collection', 'client-onboarding'],
  },
  {
    id: 'property-management',
    label: 'Property Management',
    terms: { client: 'tenant', enquiry: 'maintenance request', appointment: 'inspection', file: 'unit/property', intake: 'lease application', document: 'tenant documents and agreements', staff: 'property manager', tool: 'Buildium', compliance: 'tenancy legislation' },
    preweightedWorkflows: ['customer-support', 'scheduling-reminders', 'reporting'],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    terms: { client: 'customer', enquiry: 'customer enquiry', appointment: 'consultation', file: 'order', intake: 'customer registration', document: 'order and shipping documents', staff: 'team member', tool: 'Shopify', compliance: 'consumer protection regulations' },
    preweightedWorkflows: ['customer-support', 'invoicing-payments', 'follow-up'],
  },
  {
    id: 'professional-other',
    label: 'Professional Services (Other)',
    terms: { client: 'client', enquiry: 'enquiry', appointment: 'meeting', file: 'file', intake: 'client intake', document: 'client documents', staff: 'team member', tool: 'CRM', compliance: 'industry regulations' },
    preweightedWorkflows: ['inbound-enquiries', 'client-onboarding', 'invoicing-payments'],
  },
  {
    id: 'other',
    label: 'Other',
    terms: { client: 'client', enquiry: 'enquiry', appointment: 'appointment', file: 'file', intake: 'intake', document: 'documents', staff: 'team member', tool: 'CRM', compliance: 'regulatory requirements' },
    preweightedWorkflows: ['inbound-enquiries', 'follow-up', 'client-onboarding'],
  },
];

export const INDUSTRY_MAP = Object.fromEntries(INDUSTRIES.map(i => [i.id, i])) as Record<string, IndustryDefinition>;
