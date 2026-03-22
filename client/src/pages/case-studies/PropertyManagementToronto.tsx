import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Property Management Automation Case Study | 65 to 120 Units | Barrana.ai",
  description:
    "How a Toronto property management company automated maintenance routing, rent reminders, lease renewals, and owner reporting. Scaled from 65 to 120 units with same team.",
  slug: "property-management-toronto",
  industry: "Property Management",
  location: "Downtown Toronto",
  teamSize: "Owner + property manager + admin",
  relatableIndustries: [
    "Property Management",
    "Real Estate",
    "Marketing Agencies",
    "Service Businesses",
  ],
  h1: "How a 3-Person Property Management Team Went From 65 Units to 120 Without Adding Staff",
  subheadline:
    "Maintenance requests auto-triaged by priority. Rent reminders automated. Lease renewals triggered at 90 days. Owner reports generated weekly. The team managed 85% more units with the same 3 people.",
  intro:
    "This downtown Toronto property management company was managing 65 residential units across 4 buildings for 3 different owners. They were at capacity: maintenance requests piled up, rent follow-up required uncomfortable manual calls, lease renewals were discovered 2 weeks before expiry, and owner reports took a full day per property per month.",
  businessDescription:
    "A boutique property management company managing residential rental units in Cabbagetown, Leslieville, Liberty Village, and the Distillery District. 3 staff managing 65 units across 4 buildings for 3 property owners. Services: tenant relations, maintenance coordination, rent collection, lease administration, owner reporting.",
  problemBody: [
    "Maintenance requests arrived via email, text, and phone. No triage — emergency requests sat in the same inbox as routine requests. Response time varied from 2 hours to 2 days.",
    "Rent follow-up for late payments required manual, uncomfortable calls. The admin delayed them. Some late payments were not followed up at all.",
    "Lease renewals tracked in a spreadsheet. Team discovered upcoming expiries 2-3 weeks before date — not enough time for a proper renewal conversation.",
    "Monthly owner reports required a full day per property — 3 days per month total just on reporting.",
  ],
  beforeMetrics: [
    { label: "Units managed", value: "65 (at capacity)" },
    { label: "Maintenance response", value: "2 hrs – 2 days" },
    { label: "Rent follow-up", value: "Manual, inconsistent" },
    { label: "Lease renewal notice", value: "2-3 weeks before expiry" },
    { label: "Owner reporting", value: "1 full day per property" },
  ],
  solutionIntro:
    "We deployed automation across maintenance intake, rent collection, lease tracking, and owner reporting. The goal: remove enough overhead from the 65-unit portfolio to create capacity for growth without hiring.",
  workflowSteps: [
    {
      id: "step-1",
      label: "Maintenance Request Received",
      sublabel: "Tenant submits request via email, SMS, or online portal",
      type: "trigger",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#F59E0B",
    },
    {
      id: "step-2",
      label: "AI Triage: Emergency/Urgent/Routine",
      sublabel: "AI classifies severity and routes to appropriate vendor or queue",
      type: "ai",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "#7E0F4A",
    },
    {
      id: "step-3",
      label: "Rent Reminder Sequence",
      sublabel: "Automated reminders sent at day 1, 5, and 10 of late payment",
      type: "action",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "step-4",
      label: "Auto Owner Report Monday AM",
      sublabel: "Weekly property summary auto-generated and delivered to each owner",
      type: "outcome",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Emergency maintenance (flooding, gas, fire) triggered immediate multi-channel alert to property manager + emergency vendor. Never queued as routine.",
    },
    {
      title: "Retries",
      desc: "Rent reminder failures retried via alternate channel. Documentation maintained.",
    },
    {
      title: "Approvals",
      desc: "Maintenance above $500 required owner approval before vendor dispatch.",
    },
    {
      title: "Logging",
      desc: "All tenant communications, maintenance, financial transactions logged per unit for legal documentation.",
    },
    {
      title: "Escalation",
      desc: "Rent unpaid beyond 15 days escalated to PM with full payment and communication history.",
    },
  ],
  tools: ["Buildium", "Make (Integromat)", "Twilio", "OpenAI", "Google Sheets"],
  results: [
    {
      label: "Units managed",
      before: "65",
      after: "120 (same team)",
      beforeW: 35,
      afterW: 75,
    },
    {
      label: "Maintenance response",
      before: "2 hrs – 2 days",
      after: "Emergency <1hr, routine 48hr",
      beforeW: 85,
      afterW: 20,
    },
    {
      label: "Lease renewals",
      before: "2-3 week surprise",
      after: "90-day proactive process",
      beforeW: 85,
      afterW: 15,
    },
    {
      label: "Owner reporting",
      before: "3 days/month",
      after: "Automated Monday AM",
      beforeW: 90,
      afterW: 5,
    },
    {
      label: "Surprise vacancies",
      before: "Regular",
      after: "Zero since implementation",
      beforeW: 80,
      afterW: 5,
    },
  ],
  implementationTimeline: "5 weeks (multi-building complexity)",
  investmentRange: "$10,000–$14,000 CAD",
  payback: "Through revenue from 55 additional units",
  keyResultCallout:
    "65 units to 120 units. Same 3-person team. Owner reporting fully automated. Maintenance triaged by AI. Rent reminders removed the most uncomfortable part of the job. Zero surprise lease expirations.",
  whyItMatters:
    "Property management is one of the clearest examples where operational overhead directly limits growth. Every unit adds communication, maintenance, billing, and reporting. Without automation, growth requires proportional hiring.",
  whyBullets: [
    "You are at capacity and cannot take new properties without hiring",
    "Maintenance requests pile up in a shared inbox with no priority system",
    "Rent follow-up is manual and uncomfortable",
    "Lease renewals surprise you weeks before expiry",
    "Owner reports take days per month to compile",
  ],
  crossIndustryItems: [
    { industry: "Property Management", note: "Exact scenario." },
    {
      industry: "Real Estate Brokerages",
      note: "Similar scaling without proportional admin.",
    },
    {
      industry: "Marketing Agencies",
      note: "Client portfolio management at scale follows similar patterns.",
    },
    {
      industry: "Service Businesses",
      note: "Any business scaling operations without matching headcount.",
    },
    {
      industry: "Home Services",
      note: "Multi-property coordination and seasonal dispatching share common patterns.",
    },
  ],
  ctaHeadline:
    "Your Portfolio Could Be 50% Larger With the Same Team. The Coordination Is What Holds You Back.",
  ctaBody:
    "The audit maps your per-unit operational overhead and shows you exactly how automation creates capacity for growth.",
  internalLinks: [
    { label: "Property Management", href: "/industries/property-management" },
    { label: "Operations Reporting", href: "/services/operations-reporting" },
    { label: "Workflow Automation", href: "/services/workflow-automation" },
    { label: "CRM Automation", href: "/services/crm-automation" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#7E0F4A",
};

export default function PropertyManagementToronto() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
