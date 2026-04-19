/**
 * OperationsReportingAutomation.tsx
 * Route: /services/operations-reporting
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "Operations Reporting Automation",
  description:
    "Automate internal operations: document management, task routing, staff alerts, compliance logging, and weekly reporting. Operational visibility without manual work.",

  breadcrumb: "Operations Reporting Automation",
  h1: "You Cannot Fix What You Cannot See. And Right Now, Your Operations Are Invisible.",
  subheadline:
    "Operations automation handles document management, task routing, escalation alerts, compliance logging, and weekly reporting. You get real-time visibility into your business without building a single spreadsheet.",
  body: [
    "Manual operations are invisible operations. You do not know which client files are complete, which invoices are overdue, which team member is at capacity, or which tasks have been dropped. You find out when something fails, not before.",
    "Automation creates visibility as a byproduct. When every operational step is system-managed, you see everything in real time.",
  ],
  ctaMicro: "See where your operations are blind. Free 60-minute audit.",

  costHeading: "What Invisible Operations Are Costing You",
  costItems: [
    {
      figure: "Unknown",
      label: "Dropped Tasks Until Client Complains",
      desc: "Without system tracking, the first signal that something was missed is often a client complaint.",
    },
    {
      figure: "Half a day",
      label: "Compiling Manual Reports Weekly",
      desc: "Someone spends Friday afternoon building a spreadsheet from 4 different systems. That report is outdated by Monday.",
    },
    {
      figure: "Hidden",
      label: "Staff Overload Until Burnout",
      desc: "Without workload visibility, you discover someone is overwhelmed when they miss deadlines or leave.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Operational Visibility", before: "Check 4 systems manually", after: "Real-time dashboard", beforeW: 90, afterW: 8 },
    { label: "Reporting", before: "Manual, Friday afternoon", after: "Auto every Monday AM", beforeW: 85, afterW: 5 },
    { label: "Task Routing", before: "Manual, inconsistent", after: "Automatic by rules", beforeW: 80, afterW: 8 },
    { label: "Escalation", before: "Whoever notices", after: "System-triggered thresholds", beforeW: 90, afterW: 5 },
    { label: "Compliance Logging", before: "Manual, gaps inevitable", after: "Every action auto-logged", beforeW: 85, afterW: 8 },
  ],

  workflowSteps: [
    { label: "Triggers Defined", type: "trigger" },
    { label: "Task Routing Built", type: "action" },
    { label: "Escalation Alerts", type: "action" },
    { label: "Compliance Logging", type: "action" },
    { label: "Weekly Reports", type: "action" },
    { label: "Monitor + Refine", type: "outcome" },
  ],
  workflowBadge: "Reporting time: hours/week → zero",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "If data source is unavailable, report sent with warning flag rather than stale data. You always know when data is incomplete.",
    },
    {
      title: "Retries",
      desc: "Failed data pulls retry 3x before generating partial report with gap indicators.",
    },
    {
      title: "Logging",
      desc: "Report generation audit trail: which sources accessed, data freshness, delivery confirmation.",
    },
    {
      title: "Approvals",
      desc: "Operational changes flagged in reports can require manager acknowledgment before being archived.",
    },
    {
      title: "Escalation",
      desc: "Critical operational alerts (approaching deadlines, capacity overload) bypass normal channels and go directly to designated contacts.",
    },
  ],

  roiMetrics: [
    { label: "Reporting Time", before: "Hours/week", after: "Zero (automated)" },
    { label: "Task Completion", before: "Unreliable", after: "100% tracked, nothing forgotten" },
    { label: "Compliance Logging", before: "Manual, gaps", after: "Continuous, zero effort" },
    { label: "Staff Overload", before: "Hidden until crisis", after: "Visible before it happens" },
    { label: "Typical Payback", after: "Immediate (prevented failures)" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Businesses with 5+ staff where coordination is complex",
    "Regulated industries requiring audit trails (immigration, law, healthcare)",
    "Companies where the owner needs operational visibility without building reports",
    "Teams where dropped tasks create client-facing problems",
  ],
  notFit: [
    "Very small operations (1–2 people) with simple processes",
    "Businesses with no digital tools to pull data from",
  ],

  aeoQuestion: "What is operations automation for service business?",
  aeoAnswer:
    "Operations automation replaces manual internal business processes with triggered, rules-based systems. This includes automated task routing, document management, staff escalation alerts, compliance logging, and weekly operational reporting. The goal is to create real-time visibility into business operations and ensure that no task, deadline, or client interaction is missed because it depended on someone remembering to do it.",

  faqItems: [
    {
      question: "What data goes into the weekly report?",
      answer:
        "CRM pipeline status, project completion rates, outstanding invoices, overdue follow-ups, staff workload distribution. Customized to what matters to your business.",
    },
    {
      question: "Can I get daily alerts instead of weekly reports?",
      answer:
        "Yes. Alert frequency is configurable. Critical thresholds trigger immediate notifications. Summaries can be daily, weekly, or custom.",
    },
    {
      question: "Does this work with my project management tool?",
      answer:
        "Yes. We integrate with Monday.com, Clio, Jobber, Asana, and most project management platforms.",
    },
    {
      question: "Is this useful for compliance?",
      answer:
        "Extremely. For regulated industries (immigration, law, healthcare), automated audit trails document every action without manual logging.",
    },
    {
      question: "How long to implement?",
      answer:
        "Standard operations automation: 3–5 weeks including trigger definition, alert configuration, report design, and testing.",
    },
  ],

  ctaHeadline: "Stop Running Your Business Blind. See Everything. Chase Nothing.",
  ctaBody:
    "The audit identifies your biggest visibility gaps and shows you what real-time operational awareness looks like.",

  internalLinks: [
    { label: "Workflow Automation", href: "/services/workflow-automation", desc: "Connect your tools end-to-end" },
    { label: "CRM Automation", href: "/services/crm-automation", desc: "CRM that updates itself" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Automate your billing cycle" },
    { label: "Immigration Automation", href: "/industries/immigration-consultants", desc: "Immigration-specific operations" },
  ],
};

export default function OperationsReportingAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
