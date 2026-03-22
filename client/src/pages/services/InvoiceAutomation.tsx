/**
 * InvoiceAutomation.tsx
 * Route: /services/invoice-automation
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "Invoice Automation | Bill on Completion, Not When Someone Remembers | Barrana.ai",
  description:
    "Automate invoice generation, delivery, and payment reminders. Invoices trigger on project completion. Reminders at 7/14/21 days. Integrated with QuickBooks.",

  breadcrumb: "Invoice Automation",
  h1: "Your Invoices Go Out 2–3 Weeks Late Because Billing Depends on Someone Remembering. Fix That.",
  subheadline:
    "Invoice automation generates bills the moment a project completes, sends them to clients with payment links, and follows up at 7, 14, and 21 days. Cash flow stabilizes. Staff never touch the billing process.",
  body: [
    "A $12,000 project completed on March 1st. The invoice was sent March 22nd. Payment arrived April 15th. That is 45 days of unnecessary cash flow drag because billing depended on a human remembering to generate an invoice.",
    "With automation, the invoice goes out on March 1st. Payment arrives by March 15th. Same work. 30 fewer days waiting for money.",
  ],
  ctaMicro: "Calculate how much delayed invoicing is costing your cash flow.",

  costHeading: "What Delayed Invoicing Is Costing You",
  costItems: [
    {
      figure: "30+ days",
      label: "Unnecessary Cash Flow Drag",
      desc: "Every late invoice adds weeks to your payment cycle. Multiply by every project and the impact on working capital is significant.",
    },
    {
      figure: "Some work",
      label: "Never Gets Invoiced",
      desc: "If billing depends on memory, some completed work never gets invoiced at all. Revenue literally lost to oversight.",
    },
    {
      figure: "0",
      label: "Consistent Reminders Sent",
      desc: "Overdue payment follow-up depends on someone checking. During busy periods, reminders do not go out.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Invoice Delay", before: "2–4 weeks post-completion", after: "Same day (auto trigger)", beforeW: 80, afterW: 5 },
    { label: "Payment Reminders", before: "Manual, inconsistent", after: "Auto 7/14/21 days", beforeW: 85, afterW: 8 },
    { label: "Billing Accuracy", before: "Depends on who invoices", after: "Generated from project data", beforeW: 70, afterW: 8 },
    { label: "Cash Flow", before: "Unpredictable, lagging", after: "Predictable, shortened", beforeW: 90, afterW: 20 },
    { label: "Staff Billing Time", before: "Hours/week", after: "Zero for routine invoices", beforeW: 80, afterW: 5 },
  ],

  workflowSteps: [
    { label: "Project Complete", type: "trigger" },
    { label: "Invoice Generated", type: "action" },
    { label: "Sent to Client", type: "action" },
    { label: "7-Day Reminder", type: "action" },
    { label: "14-Day Reminder", type: "action" },
    { label: "21-Day Escalation", type: "action" },
    { label: "Payment Reconciled", type: "outcome" },
  ],
  workflowBadge: "Invoice delay: 3 weeks → Same day",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Invoices above a defined threshold require manual review before sending. Prevents large billing errors from going out automatically.",
    },
    {
      title: "Retries",
      desc: "Payment link failures regenerate and resend automatically with notification to staff.",
    },
    {
      title: "Approvals",
      desc: "Credit notes, adjustments, and refunds require manager approval before processing.",
    },
    {
      title: "Logging",
      desc: "Full billing lifecycle tracked: generation, send, open, click, payment, reconciliation.",
    },
    {
      title: "Escalation",
      desc: "Invoices unpaid beyond 21 days escalated to designated staff member with full payment history.",
    },
  ],

  roiMetrics: [
    { label: "Invoice Delay", before: "2–4 weeks", after: "Same day" },
    { label: "Payment Cycle", before: "45+ days", after: "Shortened 10–15 days" },
    { label: "Forgotten Invoices", before: "Inevitable", after: "Impossible (trigger-based)" },
    { label: "Staff Billing Time", before: "Hours/week", after: "Near zero for routine" },
    { label: "Typical Payback", after: "Immediate (recovered revenue)" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Service businesses completing 10+ projects per month",
    "Firms where invoicing currently depends on manual triggers",
    "Businesses with recurring cash flow timing issues",
    "Practices using QuickBooks or Xero",
  ],
  notFit: [
    "Businesses billing fewer than 5 invoices per month",
    "Companies with complex custom billing that cannot be standardized",
  ],

  aeoQuestion: "What is invoice automation for small business?",
  aeoAnswer:
    "Invoice automation uses trigger-based logic to generate, send, and follow up on invoices without manual intervention. When a project status changes to complete in your management system, the automation generates an invoice in your accounting software (QuickBooks, Xero), sends it to the client with a payment link, and initiates reminder sequences at defined intervals for unpaid invoices. This eliminates billing delays caused by manual invoice creation.",

  faqItems: [
    {
      question: "Does it integrate with QuickBooks?",
      answer:
        "Yes. QuickBooks Online is one of our primary integrations for invoice automation. Also Xero and FreshBooks.",
    },
    {
      question: "Can it handle different billing rates per service type?",
      answer:
        "Yes. Invoice generation pulls from engagement terms on file, including service-specific rates and tax calculations.",
    },
    {
      question: "What about partial payments?",
      answer:
        "The system tracks partial payments and adjusts reminder sequences for remaining balances.",
    },
    {
      question: "How does it know when a project is complete?",
      answer:
        "It triggers on status changes in your project management tool: Monday.com, Clio, Jobber, or CRM pipeline stages.",
    },
    {
      question: "Can clients pay online?",
      answer:
        "Yes. Invoices include a payment link for immediate credit card or bank payment through your accounting platform.",
    },
  ],

  ctaHeadline: "Every Week of Delayed Invoicing Is a Week of Delayed Cash Flow. Automate It.",
  ctaBody:
    "The audit maps your current billing cycle and shows you exactly how many days of cash flow you can recover.",

  internalLinks: [
    { label: "Document Collection", href: "/services/document-collection", desc: "Automate what precedes billing" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Operational visibility automation" },
    { label: "Accounting Automation", href: "/industries/accounting-firms", desc: "Accounting-specific workflows" },
    { label: "Contractor Automation", href: "/industries/contractors", desc: "Contractor billing workflows" },
  ],
};

export default function InvoiceAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
