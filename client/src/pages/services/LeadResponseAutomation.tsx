/**
 * LeadResponseAutomation.tsx
 * Route: /services/lead-response-automation
 * Meta description: Stop losing leads to slow response. Barrana.ai builds lead response systems
 * that reply in 90 seconds, qualify automatically, and book appointments 24/7.
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "Lead Response Automation | Respond in 90 Seconds | Barrana.ai",
  description:
    "Stop losing leads to slow response. Barrana.ai builds lead response systems that reply in 90 seconds, qualify automatically, and book appointments 24/7.",

  breadcrumb: "Lead Response Automation",
  h1: "Your Leads Are Not Ghosting You. They Are Booking With Whoever Responded First.",
  subheadline:
    "Lead response automation responds to every inquiry in under 90 seconds, qualifies the prospect, creates a CRM record, and books an appointment. Even at 11pm on a Sunday.",
  body: [
    "A potential client contacts 3-5 businesses. Research shows conversion drops over 80% after the first 5 minutes without a response. Your team takes 4-8 hours because they are doing actual work.",
    "That is not a sales problem. It is a systems problem. And it has a systematic fix.",
  ],
  ctaMicro:
    "See exactly how many leads you are losing to slow response. Free. No obligation.",

  costHeading: "What Slow Response Is Costing You",
  costItems: [
    {
      figure: "$5,000–$15,000/mo",
      label: "Lost Leads",
      desc: "5 missed leads per month at $1,000–$3,000 average client value. The first responder wins the majority of available work.",
    },
    {
      figure: "0%",
      label: "After-Hours Capture",
      desc: "Every inquiry that arrives after 5pm sits in voicemail or an inbox until morning. Your competitors with automation capture them at 9pm.",
    },
    {
      figure: "40%",
      label: "Manual Follow-Up Rate",
      desc: "Without automation, follow-up depends on someone remembering. On a busy week, most quotes and inquiries get zero follow-up.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Response Time", before: "4–8 hours", after: "Under 90 seconds", beforeW: 85, afterW: 12 },
    { label: "Follow-Up Rate", before: "40% of leads", after: "100% automated", beforeW: 80, afterW: 8 },
    { label: "After-Hours Capture", before: "0%", after: "100% captured", beforeW: 100, afterW: 5 },
    { label: "CRM Entry", before: "Manual, next day", after: "Automatic, instant", beforeW: 75, afterW: 8 },
    { label: "Lead Tracking", before: "Scattered, inconsistent", after: "Unified pipeline", beforeW: 90, afterW: 10 },
  ],

  workflowSteps: [
    { label: "Lead Arrives", type: "trigger" },
    { label: "90s Response", type: "ai" },
    { label: "AI Qualifies", type: "ai" },
    { label: "CRM Record", type: "action" },
    { label: "Book Appointment", type: "action" },
    { label: "Follow-Up Sequence", type: "action" },
    { label: "Human Escalation", type: "outcome" },
  ],
  workflowBadge: "Response: 4–8 hrs → 90 seconds",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "If AI confidence score drops below threshold, lead routes to a human immediately instead of receiving an automated response.",
    },
    {
      title: "Retries",
      desc: "CRM write failures retry 3x with exponential backoff. If all fail, staff get immediate alert with the lead data.",
    },
    {
      title: "Approvals",
      desc: "High-value leads above your defined threshold require human approval before booking.",
    },
    {
      title: "Logging",
      desc: "Every interaction timestamped: channel, actions taken, AI decisions, outcome. Full audit trail in your CRM.",
    },
    {
      title: "Escalation",
      desc: "Leads completing full sequence without response flagged for personal outreach with complete interaction history.",
    },
  ],

  roiMetrics: [
    { label: "Response Time", before: "4–8 hours", after: "Under 90 seconds" },
    { label: "Lost Leads/Month", before: "8–12", after: "1–2" },
    { label: "Follow-Up Rate", before: "40% manual", after: "100% automated" },
    { label: "After-Hours Capture", before: "0%", after: "100%" },
    { label: "Typical Payback", after: "30–60 days" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Service businesses receiving 20+ inbound leads per month",
    "Teams that cannot respond within 5 minutes during work hours",
    "Businesses competing in markets where multiple providers are contacted simultaneously",
    "Operations needing 24/7 lead capture",
  ],
  notFit: [
    "Businesses with fewer than 5 leads per month",
    "Companies where every lead requires immediate complex human judgment before any response",
  ],

  aeoQuestion: "What is lead response automation?",
  aeoAnswer:
    "Lead response automation is a system that automatically acknowledges and qualifies inbound inquiries within seconds, creates CRM records, and triggers structured follow-up workflows. When a prospect submits a form, calls, or messages, the system responds immediately with a personalized acknowledgment, collects qualifying information, scores the lead, books appointments, and initiates timed follow-up sequences. The goal is to eliminate the gap between inquiry arrival and meaningful business engagement.",

  faqItems: [
    {
      question: "How much does lead response automation cost?",
      answer:
        "Implementation: $2,000–$5,000 CAD. Monthly tools: $100–$300. Fixed pricing after free audit. Most implementations pay for themselves within 30–60 days through captured leads.",
    },
    {
      question: "Does the automated response sound generic?",
      answer:
        "No. Every template is written specifically for your business, service type, and brand voice. Responses reference the prospect's actual inquiry details.",
    },
    {
      question: "What if a lead is too complex for automation?",
      answer:
        "Escalation rules route complex inquiries to a human team member immediately with full context. The system never handles situations outside its defined scope.",
    },
    {
      question: "Does it work after business hours?",
      answer:
        "Yes. 24/7. A lead arriving at 11pm on Saturday gets the same quality response as one arriving at 10am on Tuesday.",
    },
    {
      question: "Which CRMs do you integrate with?",
      answer:
        "HubSpot, Go High Level, Zoho, Salesforce, Pipedrive, Monday.com, and custom solutions. If your CRM has an API, we can connect it.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Standard lead response automation: 2–3 weeks from audit to live deployment, including template writing, CRM integration, and testing.",
    },
  ],

  ctaHeadline: "Every Hour You Wait, Another Lead Books With Someone Faster.",
  ctaBody:
    "The audit quantifies exactly how many leads you are losing and shows you what the automated version looks like for your business.",

  internalLinks: [
    { label: "AI Receptionist", href: "/services/ai-receptionist", desc: "24/7 call handling" },
    { label: "CRM Automation", href: "/services/crm-automation", desc: "CRM that updates itself" },
    { label: "After-Hours Automation", href: "/services/after-hours-automation", desc: "Capture leads overnight" },
    { label: "Case Studies", href: "/case-studies", desc: "See real implementation results" },
  ],
};

export default function LeadResponseAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
