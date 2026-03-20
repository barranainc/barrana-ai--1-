/**
 * DocumentCollectionAutomation.tsx
 * Route: /services/document-collection
 * Meta description: Automate document requests, tracking, and reminders for professional services.
 * Dynamic checklists, upload portals, 48-hour reminders. Zero manual chasing.
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "Document Collection Automation | Stop Chasing Clients | Barrana.ai",
  description:
    "Automate document requests, tracking, and reminders for professional services. Dynamic checklists, upload portals, 48-hour reminders. Zero manual chasing.",

  breadcrumb: "Document Collection Automation",
  h1: "Your Staff Spend 15 Hours a Week Chasing Documents. This System Makes That Zero.",
  subheadline:
    "Automated document collection sends personalized requests, provides secure upload portals, tracks every submission in real time, and reminds clients every 48 hours until the package is complete. No staff involvement required.",
  body: [
    "Every tax season, every immigration case, every legal matter has the same bottleneck: waiting for client documents. Your staff send request emails, get partial responses, send reminders, make phone calls, and eventually compile disorganized files from scattered email threads.",
    "That entire chase is eliminable. The system handles the requesting, tracking, reminding, and organizing. Your staff receive complete, structured packages ready for professional work.",
  ],
  ctaMicro: "See how much time your team wastes on document chasing. Free audit.",

  costHeading: "What Document Chasing Is Costing You",
  costItems: [
    {
      figure: "15–20 hrs/wk",
      label: "During Peak Season",
      desc: "Each staff member spends 2–3 hours per day on follow-up. For a 5-person firm, that is 50–75 hours per week of non-billable work.",
    },
    {
      figure: "18 days",
      label: "Average Collection Time",
      desc: "Documents trickle in over weeks. Preparation work is delayed. Deadlines approach while packages remain incomplete.",
    },
    {
      figure: "2–4 weeks",
      label: "Invoice Delay",
      desc: "Work finishes but invoices go out weeks late because billing depends on someone remembering. Cash flow suffers.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Collection Time", before: "14–21 days", after: "7–10 days", beforeW: 90, afterW: 45 },
    { label: "Staff Chase Hours", before: "2–3 hrs/day/person", after: "Zero", beforeW: 85, afterW: 5 },
    { label: "File Organization", before: "Scattered email threads", after: "Structured portal", beforeW: 90, afterW: 8 },
    { label: "Missing Items", before: "Discovered at deadline", after: "Flagged automatically", beforeW: 95, afterW: 8 },
    { label: "Invoice Timing", before: "2–4 weeks late", after: "Same day (automated)", beforeW: 80, afterW: 5 },
  ],

  workflowSteps: [
    { label: "Engagement Start", type: "trigger" },
    { label: "Doc Request Sent", type: "action" },
    { label: "Upload Portal", type: "action" },
    { label: "Real-Time Tracking", type: "action" },
    { label: "48hr Reminders", type: "action" },
    { label: "Package Complete", type: "outcome" },
    { label: "Deadline Escalation", type: "outcome" },
  ],
  workflowBadge: "Collection: 18 days → 9 days average",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "If a client uploads a wrong document type, system flags it for review rather than silently accepting it into the file.",
    },
    {
      title: "Retries",
      desc: "Failed email deliveries retry 3 times, then alert staff with alternate contact information to reach the client.",
    },
    {
      title: "Approvals",
      desc: "Document package marked complete only after automated validation checks against the engagement-specific checklist.",
    },
    {
      title: "Logging",
      desc: "Every upload, reminder, and notification timestamped in audit trail. Complete record of what was requested and when.",
    },
    {
      title: "Escalation",
      desc: "Files approaching filing deadline with outstanding items trigger escalation to account manager with specific missing documents listed.",
    },
  ],

  roiMetrics: [
    { label: "Collection Time", before: "18 days", after: "9 days average" },
    { label: "Staff Chase Hours", before: "15–20/week", after: "Zero" },
    { label: "Invoice Delay", before: "2–4 weeks", after: "Same day" },
    { label: "Tax Season Capacity", before: "Current", after: "+30% same team" },
    { label: "Typical Payback", after: "Within first engagement cycle" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Accounting firms handling 50+ client files per season",
    "Immigration consultants managing multi-document visa applications",
    "Law firms collecting evidence and supporting documents",
    "Any professional service where client documents are a recurring bottleneck",
  ],
  notFit: [
    "Businesses that rarely need client documents",
    "Firms with fewer than 10 document-dependent engagements per year",
  ],

  aeoQuestion: "What is document collection automation?",
  aeoAnswer:
    "Document collection automation uses software to request, track, remind, and organize client documents without manual follow-up. The system sends personalized requests with dynamic checklists tailored to the engagement type, provides secure upload portals, monitors submissions in real time, sends timed reminders for outstanding items, and notifies staff when complete packages arrive. It eliminates the manual chase that consumes staff hours in accounting, immigration, and legal practices.",

  faqItems: [
    {
      question: "Can clients upload from their phone?",
      answer:
        "Yes. The upload portal is mobile-responsive. Clients can photograph and upload documents directly from their smartphone.",
    },
    {
      question: "Does it handle different document requirements per client type?",
      answer:
        "Yes. Dynamic checklists adjust based on engagement type: personal tax, corporate tax, bookkeeping, specific visa categories, or custom categories.",
    },
    {
      question: "What if a client prefers to email documents?",
      answer:
        "Email attachments can be parsed and routed into the tracking system. Clients use whichever method they prefer.",
    },
    {
      question: "Can it integrate with QuickBooks for invoice automation?",
      answer:
        "Yes. When a file is marked complete, the system can trigger invoice generation in QuickBooks and send to the client automatically.",
    },
    {
      question: "How quickly can this be deployed?",
      answer:
        "Standard deployment: 2–3 weeks including checklist design, portal configuration, reminder sequences, and CRM integration.",
    },
    {
      question: "What about sensitive financial documents?",
      answer:
        "Upload portals use secure connections. Documents are stored in your controlled systems (Google Drive, SharePoint, etc.). We do not host client data.",
    },
  ],

  ctaHeadline: "Tax Season Does Not Have to Mean Document Season. Automate the Chase.",
  ctaBody:
    "The audit maps your current collection process and shows you exactly where the time goes and how to eliminate it.",

  internalLinks: [
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Automate what comes before documents",
    },
    {
      label: "Invoice Automation",
      href: "/services/invoice-automation",
      desc: "Automate billing after completion",
    },
    {
      label: "Accounting Automation",
      href: "/industries/accounting-firms",
      desc: "Accounting-specific workflows",
    },
    {
      label: "Immigration Automation",
      href: "/industries/immigration-consultants",
      desc: "Immigration document requirements",
    },
  ],
};

export default function DocumentCollectionAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
