import type { WorkflowDefinition } from '@/types/planner';

export const WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'inbound-enquiries',
    label: 'Inbound Enquiries',
    description: 'Handling leads, questions, and first contact',
    questions: [
      {
        id: 'source',
        question: 'Where do enquiries come from?',
        type: 'multi',
        options: ['Website form', 'Phone', 'Email', 'WhatsApp / social media', 'Referrals', 'Multiple channels'],
      },
      {
        id: 'response-speed',
        question: 'How quickly do you usually respond?',
        type: 'single',
        options: ['Within minutes', 'Within 1 hour', 'Same day', 'Next day', 'Inconsistent'],
      },
      {
        id: 'missed',
        question: 'Are enquiries ever missed or forgotten?',
        type: 'single',
        options: ['Often', 'Sometimes', 'Rarely'],
      },
    ],
  },
  {
    id: 'phone-calls',
    label: 'Phone Calls / Missed Calls',
    description: 'Answering, returning, and tracking calls',
    questions: [
      {
        id: 'unanswered-action',
        question: 'What happens when you cannot answer the phone?',
        type: 'single',
        options: ['Goes to voicemail', 'Missed entirely', 'Someone else answers', 'We have an answering service'],
      },
      {
        id: 'unanswered-count',
        question: 'How many calls go unanswered per week?',
        type: 'single',
        options: ['None', '1-3', '4-10', '10+', 'I do not know'],
      },
      {
        id: 'qualify-before-book',
        question: 'Do callers need to be qualified before booking?',
        type: 'single',
        options: ['Yes, always', 'Sometimes', 'No, just book them'],
      },
    ],
  },
  {
    id: 'lead-qualification',
    label: 'Lead Qualification',
    description: 'Determining if a prospect is a fit before investing time',
    questions: [
      {
        id: 'consistency',
        question: 'Do you ask the same qualifying questions to most enquiries?',
        type: 'single',
        options: ['Yes, very consistent', 'Somewhat similar', 'Varies a lot'],
      },
      {
        id: 'who-handles',
        question: 'Who handles qualification?',
        type: 'single',
        options: ['Me', 'A specific team member', 'Whoever is available', 'No one consistently'],
      },
      {
        id: 'unqualified-time',
        question: 'Do unqualified leads consume significant time?',
        type: 'single',
        options: ['Yes, a lot', 'Some', 'Not really'],
      },
    ],
  },
  {
    id: 'appointment-booking',
    label: 'Appointment Booking',
    description: 'Scheduling meetings, site visits, or consultations',
    questions: [
      {
        id: 'how-book',
        question: 'How do people book with you?',
        type: 'single',
        options: ['Phone call', 'Email back and forth', 'Online calendar link', 'Walk-in', 'Mixed'],
      },
      {
        id: 'no-shows',
        question: 'Do no-shows happen?',
        type: 'single',
        options: ['Frequently (10%+)', 'Occasionally', 'Rarely'],
      },
      {
        id: 'reminders-sent',
        question: 'Are appointment reminders sent?',
        type: 'single',
        options: ['Yes, automatically', 'Yes, manually', 'No'],
      },
    ],
  },
  {
    id: 'follow-up',
    label: 'Follow-Up',
    description: 'Checking in on quotes, proposals, or inactive leads',
    questions: [
      {
        id: 'follow-up-habit',
        question: 'After sending a quote or proposal, do you follow up?',
        type: 'single',
        options: ['Always', 'Sometimes', 'Rarely', 'Never systematically'],
      },
      {
        id: 'follow-up-timing',
        question: 'How soon after the initial contact?',
        type: 'single',
        options: ['Within 48 hours', 'Within a week', 'Whenever I remember', 'No set process'],
      },
      {
        id: 'follow-up-coverage',
        question: 'What percentage of quotes get follow-up?',
        type: 'single',
        options: ['80-100%', '50-80%', 'Under 50%', 'I do not know'],
      },
    ],
  },
  {
    id: 'client-onboarding',
    label: 'Client Onboarding',
    description: 'Welcoming new clients and collecting initial information',
    questions: [
      {
        id: 'standardised',
        question: 'Is your onboarding process the same for every client?',
        type: 'single',
        options: ['Yes, standardised', 'Mostly similar', 'Varies by person handling it', 'We do not have a defined process'],
      },
      {
        id: 'chase-details',
        question: 'Do staff manually chase missing details after onboarding starts?',
        type: 'single',
        options: ['Yes, frequently', 'Sometimes', 'Rarely'],
      },
      {
        id: 'multi-system',
        question: 'Does client data get entered into multiple systems?',
        type: 'single',
        options: ['Yes, 2-3 systems', 'Yes, more than 3', 'No, one system', 'We use spreadsheets'],
      },
    ],
  },
  {
    id: 'document-collection',
    label: 'Document Collection',
    description: 'Gathering files, forms, or paperwork from clients',
    questions: [
      {
        id: 'incomplete-docs',
        question: 'Do clients frequently submit incomplete documents?',
        type: 'single',
        options: ['Yes, almost always', 'Sometimes', 'Rarely'],
      },
      {
        id: 'follow-up-method',
        question: 'How do staff follow up on missing documents?',
        type: 'single',
        options: ['Email reminders (manual)', 'Phone calls', 'Both, repeatedly', 'We wait and hope'],
      },
      {
        id: 'compliance-sensitive',
        question: 'Is document collection compliance-sensitive?',
        type: 'single',
        options: ['Yes (regulated industry)', 'Somewhat', 'No'],
      },
    ],
  },
  {
    id: 'estimates-proposals',
    label: 'Estimates / Proposals',
    description: 'Creating and sending quotes or proposals',
    questions: [
      {
        id: 'creation-method',
        question: 'How are estimates or proposals created?',
        type: 'single',
        options: ['From a template', 'Custom each time', 'Using estimating software', 'From memory'],
      },
      {
        id: 'turnaround',
        question: 'How long does it take to send a quote after enquiry?',
        type: 'single',
        options: ['Same day', '1-2 days', '3+ days', 'Inconsistent'],
      },
      {
        id: 'quote-follow-up',
        question: 'Do you follow up on sent quotes?',
        type: 'single',
        options: ['Yes, systematically', 'Sometimes', 'Rarely'],
      },
    ],
  },
  {
    id: 'invoicing-payments',
    label: 'Invoicing / Payments',
    description: 'Billing clients and collecting payment',
    questions: [
      {
        id: 'invoice-creation',
        question: 'How are invoices created?',
        type: 'single',
        options: ['Accounting software (QuickBooks, etc.)', 'Manually (Word/Excel)', 'From project management tool', 'Inconsistently'],
      },
      {
        id: 'invoice-timing',
        question: 'How quickly after work completion are invoices sent?',
        type: 'single',
        options: ['Same day', 'Within a week', '2+ weeks', 'When someone remembers'],
      },
      {
        id: 'payment-reminders',
        question: 'Are payment reminders sent for overdue invoices?',
        type: 'single',
        options: ['Yes, automatically', 'Yes, manually', 'No'],
      },
    ],
  },
  {
    id: 'customer-support',
    label: 'Customer Support / FAQs',
    description: 'Answering recurring client questions',
    questions: [
      {
        id: 'repeat-questions',
        question: 'Do you answer the same questions repeatedly?',
        type: 'single',
        options: ['Yes, daily', 'Yes, weekly', 'Occasionally', 'No'],
      },
      {
        id: 'question-topics',
        question: 'What are most questions about?',
        type: 'multi',
        options: ['Scheduling / availability', 'Pricing', 'Process / what to expect', 'Status of their file', 'Multiple of these'],
      },
      {
        id: 'standardisable',
        question: 'Could most answers be standardised?',
        type: 'single',
        options: ['Yes, 80%+', 'Probably 50%', 'Not really'],
      },
    ],
  },
  {
    id: 'internal-updates',
    label: 'Internal Updates / Handoffs',
    description: 'Passing work between team members or systems',
    questions: [
      {
        id: 'handoff-method',
        question: 'How does work get passed between team members?',
        type: 'single',
        options: ['Verbal / in-person', 'Slack / email', 'Project management tool', 'It does not - things get dropped'],
      },
      {
        id: 'stuck-tasks',
        question: 'Do tasks ever get stuck because someone was not notified?',
        type: 'single',
        options: ['Yes, frequently', 'Sometimes', 'Rarely'],
      },
      {
        id: 'visibility',
        question: 'Is there visibility into who is working on what?',
        type: 'single',
        options: ['Yes, clear system', 'Somewhat', 'No, it is unclear'],
      },
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting / Summaries',
    description: 'Compiling operational or client reports',
    questions: [
      {
        id: 'how-compiled',
        question: 'How are reports compiled?',
        type: 'single',
        options: ['Manually from multiple sources', 'From one tool', 'We do not do regular reporting'],
      },
      {
        id: 'time-taken',
        question: 'How much time do reports take?',
        type: 'single',
        options: ['Hours per week', 'Hours per month', 'Minimal', 'We skip them'],
      },
      {
        id: 'who-sees',
        question: 'Who needs to see reports?',
        type: 'multi',
        options: ['Just me', 'My team', 'Clients', 'External stakeholders (owners, partners)'],
      },
    ],
  },
  {
    id: 'review-requests',
    label: 'Review Requests',
    description: 'Asking clients for Google or platform reviews',
    questions: [
      {
        id: 'ask-reviews',
        question: 'Do you ask clients for reviews?',
        type: 'single',
        options: ['Yes, systematically', 'Sometimes, manually', 'Rarely', 'Never'],
      },
      {
        id: 'platforms',
        question: 'Which platforms matter most?',
        type: 'multi',
        options: ['Google', 'Industry-specific (RateMDs, Houzz, etc.)', 'Social media', 'Multiple'],
      },
      {
        id: 'timing',
        question: 'When is the best time to ask?',
        type: 'single',
        options: ['Right after service', 'A few days later', 'We do not have a process'],
      },
    ],
  },
  {
    id: 'scheduling-reminders',
    label: 'Scheduling and Reminders',
    description: 'Managing recurring appointments and sending reminders',
    questions: [
      {
        id: 'reminders-automated',
        question: 'Are appointment reminders sent before visits?',
        type: 'single',
        options: ['Yes, automated', 'Yes, manual', 'No'],
      },
      {
        id: 'cancellations',
        question: 'Do clients frequently reschedule or cancel?',
        type: 'single',
        options: ['Yes, often', 'Sometimes', 'Rarely'],
      },
      {
        id: 'waitlist',
        question: 'Is there a waitlist system for cancelled slots?',
        type: 'single',
        options: ['Yes', 'No', 'What is a waitlist system?'],
      },
    ],
  },
];

export const WORKFLOW_MAP = Object.fromEntries(WORKFLOWS.map(w => [w.id, w])) as Record<string, WorkflowDefinition>;
