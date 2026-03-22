import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";

const data: IndustryPageData = {
  title: "AI Automation for Landscaping Companies Toronto | Barrana.ai",
  description:
    "Automate seasonal contract renewals, crew scheduling, quote follow-up, weather-triggered dispatch, invoicing, and referral campaigns for landscaping companies. Free audit.",
  route: "landscaping",
  breadcrumb: "Landscaping Companies",
  h1: "Spring Is 6 Weeks Away and You Need 200 Contracts Renewed. That Is 200 Calls Your Team Does Not Have Time to Make.",
  subheadline:
    "Seasonal renewal campaigns automated. Quote follow-up that actually happens. Crew scheduling by geography and property. Weather-triggered snow removal dispatch. Invoice on completion. Referral requests after spring cleanup.",
  body: [
    "Landscaping and snow removal companies operate on seasonal cycles. Every transition requires mass communication: spring contract renewals, summer maintenance upsells, fall cleanup scheduling, and winter snow removal activation. Each involves contacting hundreds of clients within a tight window.",
    "Manual outreach means some clients are contacted, some are not, and the season starts before the campaign finishes. Automation contacts every client, on time, every season.",
  ],
  ctaText: "Get Your Free Landscaping Companies Automation Audit",
  ctaMicro: "See how many seasonal contracts you are losing to late outreach. Free audit.",

  costHeading: "What Manual Operations Cost Landscaping Companies",
  costItems: [
    {
      figure: "20-30%",
      label: "Contracts Lapse Annually",
      desc: "Not because clients are unhappy. Because nobody contacted them before another company knocked on their door.",
    },
    {
      figure: "40%",
      label: "Quote Follow-Up Rate",
      desc: "You send a quote for spring landscaping. Follow-up depends on whether you have time between jobs.",
    },
    {
      figure: "Delayed",
      label: "Snow Dispatch",
      desc: "Storm arrives at 4am. Dispatch depends on someone waking up, checking the forecast, and calling crews.",
    },
  ],

  problems: [
    {
      title: "Seasonal Contract Renewals Are Always Late",
      desc: "You need 200 contracts renewed. That takes weeks of calls. By the time you finish, a competitor has already knocked on 30 of your clients' doors.",
    },
    {
      title: "Quote Follow-Up Is Inconsistent",
      desc: "Spring estimate sent. Homeowner wants to think about it. Nobody follows up. They hire whoever calls back first.",
    },
    {
      title: "Snow Removal Dispatch Is Chaotic",
      desc: "Snow forecast at 4am. Manual dispatch required. Crews need routes. Clients need notifications. All of it manual, all of it time-sensitive.",
    },
    {
      title: "Crew Scheduling Wastes Drive Time",
      desc: "Crews driving across the city instead of working efficiently through geographic zones. No route optimization.",
    },
    {
      title: "Invoicing Is Seasonal and Overwhelming",
      desc: "Spring cleanup: 80 invoices in 2 weeks. Snow season: invoices after every push. Manual billing cannot keep up.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Contract renewals", before: "Manual calls, 20-30% lapse", after: "90-day automated campaign, 85%+ retention", beforeW: 85, afterW: 15 },
    { label: "Quote follow-up", before: "40% (time-dependent)", after: "100% automated at 48hr / 7d / 14d", beforeW: 80, afterW: 10 },
    { label: "Snow dispatch", before: "Manual, delayed at 4am", after: "Weather-triggered, automated crew notification", beforeW: 90, afterW: 10 },
    { label: "Crew scheduling", before: "Inefficient routing", after: "Geographic zone optimization", beforeW: 75, afterW: 25 },
    { label: "Invoicing", before: "Manual, seasonal backlogs", after: "Triggered on job/push completion", beforeW: 80, afterW: 10 },
  ],

  workflowHeading: "Systems We Build for Landscaping Companies",
  workflowSteps: [
    {
      id: "renewal",
      label: "Renewal Campaign",
      sublabel: "90 days before season",
      type: "trigger",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      color: "#F59E0B",
    },
    {
      id: "quote",
      label: "Quote + Follow-Up",
      sublabel: "48hr / 7d / 14d",
      type: "action",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#283891",
    },
    {
      id: "dispatch",
      label: "Snow Dispatch",
      sublabel: "Weather-triggered",
      type: "ai",
      icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
      color: "#7E0F4A",
    },
    {
      id: "schedule",
      label: "Crew Scheduling",
      sublabel: "Geographic zones",
      type: "action",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      color: "#283891",
    },
    {
      id: "invoice",
      label: "Auto Invoice",
      sublabel: "On completion",
      type: "outcome",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#10B981",
    },
  ],
  workflowBadge: "Seasonal Revenue Protected",

  controlItems: [
    { title: "Stop-Loss", desc: "Weather dispatch only triggers above defined snowfall threshold. No false dispatches on light dustings." },
    { title: "Retries", desc: "Crew notification failures retry through alternate channel (call if text fails). No crew misses a dispatch." },
    { title: "Approvals", desc: "Renewal pricing changes require owner approval before campaign launch." },
    { title: "Logging", desc: "Every property service, crew dispatch, and client communication logged. Critical for snow removal contract disputes." },
    { title: "Escalation", desc: "Client complaints about service quality or missed properties trigger immediate operations manager notification." },
  ],

  roiMetrics: [
    { label: "Contract retention", before: "70-75%", after: "85%+ through automated renewal campaigns" },
    { label: "Quote conversion", before: "40% follow-up rate", after: "100% automated, improved conversion" },
    { label: "Snow dispatch", before: "Manual, delayed", after: "Immediate weather-triggered, zero coordination" },
    { label: "Crew efficiency", before: "Inefficient routing", after: "Improved through geographic zone optimization" },
    { label: "Invoicing", before: "Manual seasonal backlogs", after: "Automatic, zero backlogs" },
    { label: "Typical payback", after: "Within first seasonal campaign" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Landscaping companies managing 100+ residential properties",
    "Snow removal operations with contract-based service",
    "Companies running both landscaping and snow removal",
    "Growing operations adding properties faster than admin can scale",
  ],
  notFit: [
    "Solo landscapers with fewer than 20 properties",
    "Companies doing exclusively commercial grounds maintenance with long-term single-property contracts",
  ],

  aeoQuestion: "How does AI automation help landscaping and snow removal companies?",
  aeoAnswer:
    "AI automation helps landscaping and snow removal companies by running seasonal contract renewal campaigns starting 90 days before each season, automating quote follow-up at 48 hours, 7 days, and 14 days, triggering snow removal dispatch based on weather API data with automatic crew and client notification, optimizing crew scheduling by geographic zone, generating invoices on job and snow push completion, and requesting referrals after visible service results like spring cleanups. This retains 85%+ of seasonal contracts, eliminates dispatch delays, and removes the invoicing backlog that plagues seasonal businesses.",

  faqItems: [
    {
      question: "Weather-triggered dispatch: how does it work?",
      answer: "We connect to weather APIs monitoring your service area. When snowfall exceeds your defined threshold, crews are automatically notified with zone assignments and client notifications are sent.",
    },
    {
      question: "Which landscaping software?",
      answer: "Jobber, LMN, Service Autopilot, Aspire, and custom systems.",
    },
    {
      question: "Can it handle both residential and commercial?",
      answer: "Yes. Separate workflows and contract structures per client type.",
    },
    {
      question: "How long does implementation take?",
      answer: "Standard landscaping automation: 3-4 weeks. Recommend starting at least 8 weeks before your next seasonal transition.",
    },
    {
      question: "How much does it cost?",
      answer: "Landscaping company automation: $5,000-$10,000 CAD. Seasonal renewal revenue alone typically exceeds the investment.",
    },
    {
      question: "Before/after photos?",
      answer: "Yes. Crews can log completion photos that attach to the property record and optionally send to the client as proof of service.",
    },
  ],

  ctaHeadline: "Every Season Starts the Same Way: Hundreds of Clients to Contact and Not Enough Time. Automate the Outreach That Keeps Your Book Full.",
  ctaBody: "Walk away with a seasonal automation plan built for your operation. No pitch. No obligation.",
  primaryCTA: "Get Your Free Landscaping Companies Automation Audit",
  primaryMicro: "Free 60-minute audit. See exactly what to automate first.",

  internalLinks: [
    { label: "After-Hours Automation", href: "/services/after-hours-automation", desc: "Capture leads while your crew sleeps" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond to every quote request in under 90 seconds" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Invoices on job completion, payments tracked automatically" },
    { label: "Appointment Automation", href: "/services/appointment-automation", desc: "Schedule crews and notify clients automatically" },
    { label: "Contractors", href: "/industries/contractors", desc: "Similar automation for trades businesses" },
    { label: "Home Services", href: "/industries/home-services", desc: "HVAC, plumbing, electrical automation" },
  ],
};

export default function Landscaping() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} />;
}
