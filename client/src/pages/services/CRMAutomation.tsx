/**
 * CRMAutomation.tsx
 * Route: /services/crm-automation
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "CRM Automation | A CRM That Updates Itself | Barrana.ai",
  description:
    "Your CRM is only useful if the data is accurate. CRM automation creates records, updates stages, logs communications, and surfaces insights without manual entry.",

  breadcrumb: "CRM Automation",
  h1: "Your CRM Is Lying to You. Because Nobody Updates It. Fix That.",
  subheadline:
    "CRM automation creates records from every channel, updates pipeline stages automatically, logs every communication, and surfaces overdue follow-ups. Your CRM becomes reliable because humans are removed from the data entry loop.",
  body: [
    "You invested in a CRM. Six months later, half the records are outdated, pipeline stages are wrong, and nobody trusts the data enough to make decisions from it. The problem is not the CRM. The problem is that it depends on manual entry.",
    "Automate the data layer. The CRM becomes the real-time operating picture of your business.",
  ],
  ctaMicro: "See how your CRM can update itself. Free audit.",

  costHeading: "What an Inaccurate CRM Is Costing You",
  costItems: [
    {
      figure: "30%",
      label: "Pipeline Data Inaccurate",
      desc: "If 30% of your pipeline is inaccurate, every forecast, every resource decision, and every follow-up priority is based on wrong data.",
    },
    {
      figure: "Lost",
      label: "Follow-Ups in Stale Records",
      desc: "Leads that were never updated sit in the wrong stage. Nobody follows up because the CRM says they are not ready.",
    },
    {
      figure: "2–5 min",
      label: "Per Manual CRM Update",
      desc: "Each manual CRM update takes 2–5 minutes. Multiply by dozens per day. That is hours of zero-value work.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Record Creation", before: "Manual, often forgotten", after: "Auto from every channel", beforeW: 85, afterW: 5 },
    { label: "Stage Updates", before: "When someone remembers", after: "Auto on actions taken", beforeW: 80, afterW: 5 },
    { label: "Communications Logged", before: "Inconsistent", after: "Every touchpoint auto", beforeW: 75, afterW: 8 },
    { label: "Follow-Up Reliability", before: "Memory-based", after: "System-surfaced", beforeW: 85, afterW: 8 },
    { label: "CRM Accuracy", before: "60–70%", after: "95%+", beforeW: 70, afterW: 15 },
  ],

  workflowSteps: [
    { label: "Lead Arrives", type: "trigger" },
    { label: "Record Auto-Created", type: "action" },
    { label: "AI Tags + Scores", type: "ai" },
    { label: "Auto-Assigned", type: "action" },
    { label: "Stages Auto-Update", type: "action" },
    { label: "Overdue Surfaced", type: "outcome" },
  ],
  workflowBadge: "CRM accuracy: 65% → 95%+",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Duplicate detection prevents record creation when a high-confidence match exists. Merge suggestions surfaced to staff.",
    },
    {
      title: "Retries",
      desc: "CRM write failures retry with notification to admin. No data lost to API timeouts.",
    },
    {
      title: "Logging",
      desc: "Every CRM change logged with source (automation vs. manual) for audit clarity. You can see what the system changed vs. what a human changed.",
    },
    {
      title: "Approvals",
      desc: "Bulk operations and data migrations require admin approval before execution.",
    },
    {
      title: "Escalation",
      desc: "Records with conflicting data flagged for human review rather than auto-resolved.",
    },
  ],

  roiMetrics: [
    { label: "CRM Accuracy", before: "60–70%", after: "95%+" },
    { label: "Pipeline Visibility", before: "Guesswork", after: "Real-time" },
    { label: "Follow-Up Reliability", before: "Memory-based", after: "System-surfaced, never missed" },
    { label: "Staff Data Entry", before: "Hours/week", after: "Eliminated for routine records" },
    { label: "Typical Payback", after: "Immediate (better decisions)" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Businesses where CRM adoption has failed due to manual entry burden",
    "Teams with leads coming from 3+ channels",
    "Companies where pipeline accuracy affects resource planning",
    "Firms where follow-up consistency directly impacts revenue",
  ],
  notFit: [
    "Businesses without a CRM (we can help you set one up, but this service automates an existing one)",
    "Companies with fewer than 20 records per month",
  ],

  aeoQuestion: "What is CRM automation?",
  aeoAnswer:
    "CRM automation is the automatic creation, updating, and management of customer relationship management records based on triggers rather than manual data entry. Automated CRM systems create lead records from form submissions, calls, and messages; update pipeline stages based on real actions; log all communications; tag and score records; and surface overdue follow-ups. The goal is to make CRM data reliable by removing the manual entry that causes most CRM failures.",

  faqItems: [
    {
      question: "Which CRMs do you automate?",
      answer:
        "HubSpot, Go High Level, Zoho, Salesforce, Pipedrive, Monday.com, and custom solutions.",
    },
    {
      question: "Can you fix our existing dirty CRM data?",
      answer:
        "We can audit, clean, and restructure existing data as part of the implementation. Deduplication, field standardization, and stage correction included.",
    },
    {
      question: "Will this work alongside manual entries?",
      answer:
        "Yes. The system handles routine entries automatically. Staff can still manually update records when needed. Changes are logged with source attribution.",
    },
    {
      question: "How does duplicate detection work?",
      answer:
        "Matching algorithms compare email, phone, name, and company against existing records. High-confidence matches prevent creation; possible matches flag for review.",
    },
    {
      question: "What if we do not have a CRM yet?",
      answer:
        "We can recommend and set up a CRM as part of the implementation, then automate it from day one.",
    },
  ],

  ctaHeadline: "Your CRM Should Tell You What Is Happening. Not Require You to Tell It.",
  ctaBody:
    "The audit assesses your current CRM accuracy and shows you what automated data management looks like.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Capture leads into your CRM automatically" },
    { label: "Workflow Automation", href: "/services/workflow-automation", desc: "Connect all your tools" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Visibility into your operations" },
    { label: "Case Studies", href: "/case-studies", desc: "See real CRM automation results" },
  ],
};

export default function CRMAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
