import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";

const data: IndustryPageData = {
  title: "AI Automation for Marketing Agencies Toronto | Barrana.ai",
  description:
    "Automate client onboarding, project handoffs, monthly reporting, invoicing, and lead follow-up for digital marketing and creative agencies. Free audit.",
  route: "marketing-agencies",
  breadcrumb: "Marketing Agencies",
  h1: "You Sell Efficiency to Clients. Your Internal Operations Run on Slack Messages and Memory. Fix That.",
  subheadline:
    "Client onboarding in 48 hours, not 2 weeks. Project handoffs that never drop. Monthly reports generated without anyone building them. Invoices on milestone completion. Lead follow-up that actually happens.",
  body: [
    "Marketing agencies have a credibility problem: they sell operational efficiency to clients while running their own operations on Slack threads, shared docs with unclear ownership, and follow-up that depends on who remembers.",
    "The agencies that scale past 10 clients without chaos are the ones that systematize their internal operations. The creative work stays human. The coordination work becomes automated.",
  ],
  ctaMicro: "See where your agency operations are leaking time. Free 60-minute audit.",

  costHeading: "What Manual Operations Cost Marketing Agencies",
  costItems: [
    {
      figure: "1-2 Weeks",
      label: "Client Onboarding Delay",
      desc: "Access credentials, brand guidelines, strategy questionnaires, asset collection. Each step requires a different email thread.",
    },
    {
      figure: "4-6 hrs/client",
      label: "Monthly Reporting Time",
      desc: "Pulling data from 5 platforms, building slides, adding commentary. Multiplied by 15 clients, that is a full-time role.",
    },
    {
      figure: "Abandoned",
      label: "New Business Follow-Up",
      desc: "Agency leads need multiple touchpoints before signing. Without automation, most get one call and then silence.",
    },
  ],

  problems: [
    {
      title: "Client Onboarding Takes Too Long",
      desc: "New clients wait 1-2 weeks for onboarding because access collection, asset gathering, and kickoff scheduling happen through scattered email threads.",
    },
    {
      title: "Project Handoffs Drop Between Teams",
      desc: "Copywriter finishes. Designer does not know. Developer is waiting. Without automated handoffs, work sits in someone's outbox.",
    },
    {
      title: "Monthly Reports Consume Days",
      desc: "Data from Google Ads, Meta, Analytics, email, and SEO tools compiled manually into slides. By the time the report is done, the data is old.",
    },
    {
      title: "Invoicing Is Disconnected from Delivery",
      desc: "Milestones complete but invoices depend on someone in operations remembering to generate them. Cash flow lags.",
    },
    {
      title: "New Business Follow-Up Is Inconsistent",
      desc: "Prospective clients get an enthusiastic first call, then radio silence for 2 weeks. By then they have signed with another agency.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Client Onboarding", before: "1-2 weeks scattered emails", after: "48-hour structured sequence", beforeW: 85, afterW: 12 },
    { label: "Project Handoffs", before: "Slack messages, sometimes missed", after: "Automatic task creation on status change", beforeW: 80, afterW: 8 },
    { label: "Monthly Reporting", before: "4-6 hours per client", after: "Near-zero (auto-generated)", beforeW: 90, afterW: 8 },
    { label: "Invoicing", before: "Manual, disconnected from milestones", after: "Triggered on milestone completion", beforeW: 85, afterW: 8 },
    { label: "Lead Follow-Up", before: "1 call then nothing", after: "100% automated 48hr/7d/14d", beforeW: 90, afterW: 8 },
  ],

  workflowHeading: "Systems We Build for Marketing Agencies",
  workflowSteps: [
    { label: "Contract Signed", type: "trigger" },
    { label: "Onboarding Portal", type: "action" },
    { label: "Kickoff Ready 48hr", type: "action" },
    { label: "Milestone Handoffs", type: "ai" },
    { label: "Monthly Reports", type: "action" },
    { label: "Invoice on Delivery", type: "action" },
    { label: "Renewal / Referral", type: "outcome" },
  ],
  workflowBadge: "Onboarding: 2 weeks → 48 hours",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Client reports with missing data sources (API disconnected, tracking broken) flagged with warning rather than sent with incomplete data.",
    },
    {
      title: "Retries",
      desc: "Platform API failures retry 3x before generating partial report with gap indicators.",
    },
    {
      title: "Approvals",
      desc: "Client-facing reports and communications require account manager approval before delivery.",
    },
    {
      title: "Logging",
      desc: "All client deliveries, approvals, and milestone completions logged for SLA tracking.",
    },
    {
      title: "Escalation",
      desc: "Projects approaching deadline with incomplete milestones escalate to project manager with specific blockers identified.",
    },
  ],

  roiMetrics: [
    { label: "Client Onboarding", before: "1-2 weeks", after: "48 hours" },
    { label: "Reporting Time", before: "4-6 hrs/client/month", after: "Near-zero (automated)" },
    { label: "Handoff Delays", after: "Eliminated" },
    { label: "Invoice Delay", after: "Eliminated (milestone-triggered)" },
    { label: "Lead Follow-Up", after: "100% automated" },
    { label: "Client Capacity", after: "30-50% more accounts, same team" },
    { label: "Payback Period", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Digital marketing agencies with 10+ active clients",
    "Creative agencies with multi-step production workflows",
    "Agencies where reporting consumes significant staff hours",
    "Growing agencies adding clients faster than operations can scale",
  ],
  notFit: [
    "Solo freelance marketers with 1-3 clients",
    "Agencies with a dedicated full-time operations manager handling everything efficiently",
  ],

  aeoQuestion: "How does AI automation help marketing agencies?",
  aeoAnswer:
    "AI automation helps marketing agencies by structuring client onboarding into a 48-hour sequence (access collection, asset gathering, questionnaires, kickoff scheduling), automating project handoffs between team members on task completion, generating monthly reports by pulling data from advertising and analytics platforms, triggering invoices on milestone delivery, and running new business follow-up sequences. This allows agencies to handle 30-50% more client accounts without proportional operations staff growth.",

  faqItems: [
    { question: "Which project tools?", answer: "Monday.com, Asana, ClickUp, Basecamp, and custom workflows." },
    {
      question: "Which ad platforms for reporting?",
      answer: "Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, Google Analytics, email platforms. If it has an API, we can pull data.",
    },
    {
      question: "Can it handle different client tiers?",
      answer: "Yes. Different service packages can have different reporting frequencies, touchpoint schedules, and workflow complexity.",
    },
    { question: "How long?", answer: "Standard agency automation: 3-5 weeks." },
    {
      question: "How much?",
      answer: "Agency automation: $5,000-$12,000 CAD depending on workflow count and platform integrations.",
    },
    {
      question: "Does it replace our project managers?",
      answer: "No. It handles the coordination overhead (notifications, handoffs, reminders, reporting data). PMs focus on strategy and client relationships.",
    },
  ],

  ctaHeadline:
    "Your Clients Pay for Results, Not for Your Team to Build Spreadsheets. Automate the Operations.",
  ctaBody:
    "Walk away with a clear plan for handling 30-50% more clients with your existing team. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Marketing Agencies Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Workflow Automation", href: "/services/workflow-automation", desc: "Connect your tools through automation" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Automated dashboards and reports" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Invoices on milestone delivery" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond to new business in 90 seconds" },
    { label: "Service Businesses", href: "/industries/service-businesses", desc: "Automation for all service operations" },
  ],
};

export default function MarketingAgencies() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} />;
}
