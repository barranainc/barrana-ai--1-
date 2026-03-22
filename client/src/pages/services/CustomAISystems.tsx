/**
 * CustomAISystems.tsx
 * Route: /services/custom-ai-systems
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";
import TemplateScalingCapacityBar from "@/components/hero-visuals/TemplateScalingCapacityBar";

const data: ServicePageData = {
  title: "Custom AI Systems | Enterprise-Grade Automation for Growing Businesses | Barrana.ai",
  description:
    "Custom AI automation systems for complex business operations. Multi-workflow, multi-tool, fully governed. For businesses that have outgrown simple automation.",

  breadcrumb: "Custom AI Systems",
  h1: "Your Business Has Outgrown Simple Automation. You Need a System Designed Specifically for How You Operate.",
  subheadline:
    "Custom AI systems combine multiple automation workflows, AI agents, and integrations into a unified operational platform. Designed, built, governed, and optimized for your specific business.",
  body: [
    "You have tried individual automations. Maybe a Zapier connection here, a chatbot there. They help, but they do not solve the underlying problem: your operations are a patchwork of disconnected tools, manual hand-offs, and inconsistent processes.",
    "A custom AI system is the architectural solution. It connects everything, automates the coordination layer end-to-end, and gives you real-time visibility into the entire operation.",
  ],
  ctaMicro: "Get a custom system architecture designed for your business. Free audit.",

  costHeading: "What Disconnected Tools Are Costing You",
  costItems: [
    {
      figure: "3–5 hrs/day",
      label: "Tool-Switching and Manual Coordination",
      desc: "Your team uses 6 tools. None of them talk to each other. Someone is the human bridge between all of them.",
    },
    {
      figure: "3 versions",
      label: "Of the Same Data",
      desc: "Client data is in 3 places. Pipeline data is in 2. Financial data is in 1. Nobody trusts any of them completely.",
    },
    {
      figure: "More chaos",
      label: "With Every New Client or Staff",
      desc: "Without a unified system, growth creates more manual work, not less. Scaling multiplies the coordination burden.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Tools", before: "5–10 disconnected platforms", after: "Same platforms, unified layer", beforeW: 90, afterW: 15 },
    { label: "Data", before: "Different in every system", after: "Single source of truth", beforeW: 85, afterW: 8 },
    { label: "Coordination", before: "Human-managed, error-prone", after: "System-managed, reliable", beforeW: 95, afterW: 5 },
    { label: "Visibility", before: "Multiple dashboards", after: "One real-time view", beforeW: 90, afterW: 8 },
    { label: "Scaling", before: "Requires proportional headcount", after: "+30–50% volume, same team", beforeW: 100, afterW: 30 },
  ],

  workflowSteps: [
    { label: "Deep Operational Audit", type: "trigger" },
    { label: "System Architecture", type: "action" },
    { label: "Phased Build", type: "action" },
    { label: "AI Agents Integrated", type: "ai" },
    { label: "Unified Monitoring", type: "action" },
    { label: "Ongoing Optimization", type: "outcome" },
  ],
  workflowBadge: "Capacity: +30–50% without new headcount",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "System-wide circuit breakers. If a critical component fails, dependent workflows pause rather than propagating errors.",
    },
    {
      title: "Retries",
      desc: "Each integration has independent retry logic. Failures in one connection do not cascade to others.",
    },
    {
      title: "Approvals",
      desc: "Multi-level approval gates for high-impact workflows. Team leads, managers, and owners can have different approval authorities.",
    },
    {
      title: "Logging",
      desc: "Comprehensive system-wide audit log. Every trigger, action, decision, success, and failure across all workflows.",
    },
    {
      title: "Escalation",
      desc: "Tiered escalation: team member > team lead > manager > owner. Each tier with increasing urgency and broader context.",
    },
  ],

  roiMetrics: [
    { label: "Staff Coordination Time", before: "20–30 hrs/week across team", after: "Recovered for client work" },
    { label: "Operational Visibility", before: "Fragmented", after: "Unified real-time" },
    { label: "Capacity", before: "Capped by coordination overhead", after: "+30–50% same team" },
    { label: "Data Accuracy", before: "Inconsistent", after: "Consistent across all systems" },
    { label: "Typical Payback", after: "60–120 days" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Businesses with 10–50 staff and complex operations",
    "Companies using 5+ tools that need to work together",
    "Operations that have outgrown individual point automations",
    "Firms planning for growth and needing scalable infrastructure",
  ],
  notFit: [
    "Businesses that need only 1–2 simple automations (start with individual service pages)",
    "Startups without established, repeatable workflows",
  ],

  aeoQuestion: "What is a custom AI system for business?",
  aeoAnswer:
    "A custom AI system for business is a unified automation platform that connects multiple workflows, AI agents, and tool integrations into a single governed operational layer. Unlike individual automations that handle one process each, a custom system provides end-to-end coordination across lead capture, intake, service delivery, billing, and reporting with centralized monitoring, comprehensive logging, and multi-level governance.",

  faqItems: [
    {
      question: "How is this different from your other services?",
      answer:
        "Individual services automate one workflow. A custom system connects all your workflows into a unified, governed platform with centralized monitoring.",
    },
    {
      question: "How much does a custom system cost?",
      answer:
        "Custom systems typically range from $10,000–$25,000+ depending on complexity. Phased implementation allows you to spread the investment.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Full custom systems: 8–16 weeks in phases. First phase typically live within 3–4 weeks.",
    },
    {
      question: "Can I start with individual services and upgrade later?",
      answer:
        "Absolutely. Many clients start with lead response or intake automation and expand to a full system as they see ROI.",
    },
    {
      question: "Do you provide ongoing management?",
      answer:
        "Yes. Custom systems include an optional ongoing retainer for monitoring, optimization, and expansion.",
    },
  ],

  ctaHeadline: "Your Business Deserves a System Built Specifically for How You Operate.",
  ctaBody:
    "The deep operational audit maps your entire operation and delivers a custom system architecture designed for your growth.",

  internalLinks: [
    { label: "AI Agents for Business", href: "/services/ai-agents", desc: "The technology inside custom systems" },
    { label: "Workflow Automation", href: "/services/workflow-automation", desc: "Connect your tools" },
    { label: "Operations Reporting", href: "/services/operations-reporting", desc: "Visibility across all workflows" },
    { label: "Case Studies", href: "/case-studies", desc: "Enterprise automation results" },
  ],
};

export default function CustomAISystems() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} heroVisual={<TemplateScalingCapacityBar currentCapacity={3} newCapacity={12} unit="systems running" adminOverhead={60} />} />;
}
