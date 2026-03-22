/**
 * WorkflowAutomation.tsx
 * Route: /services/workflow-automation
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "Workflow Automation | Connect Your Tools, Eliminate Hand-Offs | Barrana.ai",
  description:
    "Custom workflow automation that connects your business tools through trigger-action sequences. No more manual hand-offs, dropped tasks, or data re-entry.",

  breadcrumb: "Workflow Automation",
  h1: "Every Manual Hand-Off Between Your Tools Is a Place Where Work Gets Dropped. We Eliminate Them.",
  subheadline:
    "Custom workflow automation connects your CRM, calendar, email, project management, and accounting tools through trigger-action sequences. When something happens in one system, everything else updates automatically.",
  body: [
    "Your business has grown. You have added tools and people. But every new tool adds a hand-off point where someone has to manually move information from one system to another. Those hand-offs get forgotten, create errors, and slow everything down.",
    "Workflow automation replaces every manual hand-off with an automatic connection. The trigger fires. The actions execute. The work moves forward without waiting for someone to remember.",
  ],
  ctaMicro: "Map your workflows and find the hand-offs costing you the most time.",

  costHeading: "What Manual Hand-Offs Are Costing You",
  costItems: [
    {
      figure: "15–25 hrs/wk",
      label: "Coordination Work",
      desc: "Tasks that create no value: copying data between tools, sending status updates, routing work, building reports.",
    },
    {
      figure: "Dropped tasks",
      label: "Discovered by Client Complaints",
      desc: "Without automated hand-offs, work falls through when someone forgets a step. You find out when the client calls.",
    },
    {
      figure: "3 versions",
      label: "Of the Same Data",
      desc: "Information entered manually into 3 different systems ends up different in each one. Decisions made on bad data.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Hand-Offs", before: "Manual, memory-dependent", after: "Automatic, trigger-based", beforeW: 95, afterW: 5 },
    { label: "Data Consistency", before: "Different across systems", after: "Single source of truth", beforeW: 85, afterW: 8 },
    { label: "Task Completion", before: "Unreliable when busy", after: "100% reliable", beforeW: 80, afterW: 5 },
    { label: "Operational Visibility", before: "Check 4 systems manually", after: "Real-time dashboard", beforeW: 90, afterW: 10 },
    { label: "Coordination Hours", before: "15–25 hrs/week", after: "Near zero", beforeW: 85, afterW: 5 },
  ],

  workflowSteps: [
    { label: "Friction Mapping", type: "trigger" },
    { label: "Architecture Design", type: "action" },
    { label: "Integration Build", type: "action" },
    { label: "Scenario Testing", type: "action" },
    { label: "Go Live", type: "action" },
    { label: "30-Day Optimize", type: "outcome" },
  ],
  workflowBadge: "Coordination hours: 15–25/wk → Near zero",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "If any workflow step fails, the sequence pauses rather than continuing with incomplete or bad data.",
    },
    {
      title: "Retries",
      desc: "Each step has configurable retry logic with exponential backoff. Transient failures handled automatically.",
    },
    {
      title: "Approvals",
      desc: "Configurable approval gates at any step for sensitive workflows. A human must approve before the sequence continues.",
    },
    {
      title: "Logging",
      desc: "Every trigger, action, success, and failure logged with timestamps. Complete operational audit trail.",
    },
    {
      title: "Escalation",
      desc: "Persistent failures escalate to designated staff with full context of what failed and why.",
    },
  ],

  roiMetrics: [
    { label: "Coordination Hours", before: "15–25/week", after: "Recovered for revenue work" },
    { label: "Data Accuracy", before: "Manual entry errors", after: "Eliminated at source" },
    { label: "Task Completion", before: "Unreliable", after: "100% reliable" },
    { label: "Operational Visibility", before: "Fragmented", after: "Real-time" },
    { label: "Typical Payback", after: "30–90 days" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Businesses using 3+ connected tools with manual hand-offs",
    "Teams where coordination overhead consumes more than 10 hours/week",
    "Operations where dropped tasks create client-facing problems",
    "Companies growing faster than their processes can support",
  ],
  notFit: [
    "Businesses using only 1–2 tools with no integration needs",
    "Operations where all processes are truly one-person, one-tool",
  ],

  aeoQuestion: "What is workflow automation for small business?",
  aeoAnswer:
    "Workflow automation connects business tools through trigger-action sequences. When a defined event occurs in one system (a form submission, a status change, a payment received), the automation executes actions across connected systems: creating records, sending communications, assigning tasks, and updating statuses. This eliminates manual hand-offs that create delays, errors, and dropped tasks in growing businesses.",

  faqItems: [
    {
      question: "What tools can you connect?",
      answer:
        "Any tool with an API or webhook: CRMs, calendars, email platforms, accounting software, project management, phone systems, and custom databases.",
    },
    {
      question: "How do I know which workflows to automate first?",
      answer:
        "The free audit uses our Operational Friction Map to score every workflow and identify the highest-ROI automation opportunities.",
    },
    {
      question: "Can you connect tools that do not have a direct integration?",
      answer:
        "Yes. Using Make and n8n, we connect virtually any modern business tool through APIs and webhooks.",
    },
    {
      question: "What if my workflows change over time?",
      answer:
        "Workflows are documented and configurable. We can update sequences as your processes evolve. Maintenance retainers available.",
    },
    {
      question: "How do I know if the automation is working?",
      answer:
        "Monitoring dashboards and failure alerts. You see what ran, what succeeded, and what needs attention.",
    },
  ],

  ctaHeadline: "Your Tools Are Not Talking to Each Other. Your Team Is Playing Messenger. Stop That.",
  ctaBody:
    "The audit maps your hand-offs, scores the friction, and delivers a prioritized automation plan.",

  internalLinks: [
    { label: "CRM Automation", href: "/services/crm-automation", desc: "A CRM that updates itself" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Operational visibility" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Automate your lead pipeline" },
    { label: "Resources Hub", href: "/resources", desc: "Guides and automation resources" },
  ],
};

export default function WorkflowAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
