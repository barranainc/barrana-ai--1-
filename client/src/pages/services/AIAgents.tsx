/**
 * AIAgents.tsx
 * Route: /services/ai-agents
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";
import AIAgentsHeroVisual from "@/components/hero-visuals/AIAgentsHeroVisual";

const data: ServicePageData = {
  title: "AI Agents for Business | Beyond Chatbots | Barrana.ai",
  description:
    "AI agents take real actions in your business: booking appointments, creating records, qualifying leads, routing tasks. Not chatbots. Operational systems.",

  breadcrumb: "AI Agents",
  h1: "A Chatbot Answers Questions. An AI Agent Runs Part of Your Business. You Need the Second One.",
  subheadline:
    "AI agents receive inputs, make decisions based on rules or AI reasoning, take actions inside your business tools, and monitor outcomes. They are operational workers, not conversation widgets.",
  body: [
    "Most business owners who think they need a chatbot actually need something entirely different. They need a system that books appointments, qualifies leads, creates CRM records, sends follow-up sequences, routes tasks, and generates reports without anyone manually managing each step.",
    "That is not a chatbot. That is an AI agent. And it is the technology behind every automation system Barrana builds.",
  ],
  ctaMicro: "See which AI agent type fits your business. Free audit.",

  costHeading: "What Buying the Wrong AI Tool Is Costing You",
  costItems: [
    {
      figure: "$500–$2K",
      label: "Chatbot Solves Nothing",
      desc: "You spend $500–$2,000 on a chatbot. It handles FAQs. Your real problem (slow lead response, manual intake, document chasing) remains completely unsolved.",
    },
    {
      figure: "10x",
      label: "ROI Difference",
      desc: "The chatbot saves minutes. The agent saves hours and captures revenue. The investment difference is 2–4x but the return difference is 10x+.",
    },
    {
      figure: "Hours/day",
      label: "Coordination Work Not Automated",
      desc: "Every hour your team spends on coordination is an hour not spent on the expertise clients are paying for.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Lead Response", before: "Chatbot answers FAQ, lead leaves", after: "Agent qualifies, books, follows up", beforeW: 90, afterW: 10 },
    { label: "Intake", before: "Chatbot gets name/email only", after: "Agent categorizes, assigns, confirms", beforeW: 85, afterW: 10 },
    { label: "Follow-Up", before: "Zero (chatbot cannot sequence)", after: "Multi-step automated sequences", beforeW: 100, afterW: 5 },
    { label: "CRM", before: "Manual after chat conversation", after: "Auto-created, tagged, scored", beforeW: 85, afterW: 5 },
    { label: "System Access", before: "Chatbot has no business access", after: "Agent acts across all tools", beforeW: 100, afterW: 8 },
  ],

  workflowSteps: [
    { label: "Input Received", type: "trigger" },
    { label: "AI Reasoning", type: "ai" },
    { label: "Actions Executed", type: "action" },
    { label: "Outcome Monitored", type: "action" },
    { label: "Human Escalation", type: "outcome" },
  ],
  workflowBadge: "Chatbot vs Agent: 10x+ ROI difference",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Agent operates within strictly defined scope. Inputs outside that scope route to human immediately, never handled by guess.",
    },
    {
      title: "Retries",
      desc: "If an action fails (CRM unavailable, email bounced), agent retries with backoff and alerts staff if persistent.",
    },
    {
      title: "Approvals",
      desc: "Configurable approval gates for sensitive actions. Agent proposes action, human approves.",
    },
    {
      title: "Logging",
      desc: "Every AI decision, action taken, and outcome logged. Full transparency on what the agent did and why.",
    },
    {
      title: "Escalation",
      desc: "Complexity thresholds, sentiment detection, and VIP flags trigger immediate human handoff.",
    },
  ],

  roiMetrics: [
    { label: "Agent-Handled Tasks", after: "10–20+ hours/week recovered" },
    { label: "Lead Response", after: "Under 90 seconds every inquiry" },
    { label: "Data Accuracy", before: "Manual ~65%", after: "AI-generated 95%+" },
    { label: "Process Consistency", before: "Depends on who handles it", after: "Identical every time" },
    { label: "Typical Payback", after: "30–90 days" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Businesses with high-volume repetitive operations (20+ inquiries/month)",
    "Firms where coordination tasks consume more than 10 hours/week",
    "Operations requiring 24/7 coverage",
    "Businesses that tried chatbots and found them insufficient",
  ],
  notFit: [
    "Businesses only needing a simple FAQ widget",
    "Operations with fewer than 5 client interactions per week",
  ],

  aeoQuestion: "What is an AI agent for business?",
  aeoAnswer:
    "An AI agent for business is software that receives inputs, makes decisions using AI reasoning, takes operational actions inside business tools, and monitors outcomes without human initiation. Unlike chatbots that only answer questions, AI agents create CRM records, book appointments, send follow-up sequences, route tasks, qualify leads, and generate reports. Each agent is configured for a specific operational function with defined scope, logic, and governance.",

  faqItems: [
    {
      question: "What is the difference between an AI agent and a chatbot?",
      answer:
        "A chatbot answers questions. An AI agent takes operational actions: creating records, booking meetings, sending sequences, routing tasks. A chatbot responds and stops. An agent responds, decides, acts, and monitors.",
    },
    {
      question: "Do I need technical staff to manage an AI agent?",
      answer:
        "No. We build, document, and deploy fully operational agents. Your team interacts with the outputs (CRM records, booked appointments, notifications), not the agent itself.",
    },
    {
      question: "How much does an AI agent cost?",
      answer:
        "Simple single-function agents: $1,500–$4,000. Complex multi-integration agents: $5,000–$12,000. Fixed pricing after free audit.",
    },
    {
      question: "Can an AI agent handle phone calls?",
      answer:
        "Yes. Voice AI agents answer calls, qualify callers, book appointments, and route based on intent. See our AI Receptionist service.",
    },
    {
      question: "What AI models do you use?",
      answer:
        "OpenAI (GPT-4), Claude, and Gemini depending on the specific task. We select the model that performs best for each use case.",
    },
  ],

  ctaHeadline: "Stop Buying Chatbots When You Need Operations. Get the Right AI System.",
  ctaBody:
    "The audit assesses your workflows and recommends the right combination of AI agents and automation for your business.",

  internalLinks: [
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "AI agents for lead capture" },
    { label: "Client Intake Automation", href: "/services/client-intake-automation", desc: "AI agents for intake" },
    { label: "AI Receptionist", href: "/services/ai-receptionist", desc: "Voice AI agent" },
    { label: "Custom AI Systems", href: "/services/custom-ai-systems", desc: "Enterprise-grade AI systems" },
  ],
};

export default function AIAgents() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} heroVisual={<AIAgentsHeroVisual />} />;
}
