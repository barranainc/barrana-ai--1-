import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Contractors Toronto | Win More Jobs Without Missing Calls | Barrana.ai",
  description:
    "Automate lead capture, quote follow-up, site visit booking, after-hours calls, and invoicing for contractors. Jobber integrated. Free audit.",
  route: "contractors",
  breadcrumb: "Contractors and Trades",
  h1: "You Are on the Job All Day. Your Leads Arrive All Day. Automation Bridges That Gap.",
  subheadline:
    "Lead response in 90 seconds, even while you are on-site. Site visits booked into Jobber automatically. Quote follow-up at 48 hours, 5 days, 10 days. After-hours calls captured by AI. You wake up to a full calendar.",
  body: [
    "A homeowner submits quote requests to 3-5 contractors. The first professional response wins the majority of jobs. Most contractors cannot respond within hours because they are doing the actual work. By the time they check their phone at lunch, the homeowner has already booked with someone faster.",
    "At average job values of $5,000-$15,000, losing 8-12 leads per month to slow response means $40,000-$180,000 per year in revenue walking away. Not because your work is bad. Because your response was slow.",
  ],
  ctaMicro: "See how many leads you lose to slow response every month. Free 60-minute audit.",
  costHeading: "What Slow Response Costs Your Contracting Business",
  costItems: [
    {
      figure: "$40K-$180K/yr",
      label: "Lost Leads",
      desc: "8-12 qualified leads lost per month to no-response. At $5,000-$15,000 average job value — gone to faster competitors.",
    },
    {
      figure: "40%",
      label: "Quote Follow-Up Rate",
      desc: "You send a quote. Whether you follow up depends on how busy the rest of the week is. More than half your quotes get zero follow-up.",
    },
    {
      figure: "0%",
      label: "After-5pm Capture",
      desc: "Homeowners browse at night and on weekends. Every inquiry that arrives after hours sits unanswered until morning.",
    },
  ],
  problems: [
    {
      title: "Leads Arrive When You Are On-Site",
      desc: "Phone calls at 11am on a roof. Quote requests at 3pm pulling cable. You cannot be in two places at once.",
    },
    {
      title: "No Systematic Quote Follow-Up",
      desc: "Some clients get a follow-up call. Others never hear from you again. It depends entirely on whether you have time that evening, not on a system.",
    },
    {
      title: "Scheduling Is Manual and Messy",
      desc: "Site visits managed in notes, text messages, or your head. Double-bookings happen. Clients do not get professional confirmations.",
    },
    {
      title: "Invoicing Is an Afterthought",
      desc: "Job finishes Friday. Invoice goes out the following week. Maybe. Cash flow lags because billing depends on remembering.",
    },
  ],
  beforeAfterMetrics: [
    {
      label: "Lead Response",
      before: "4-6 hours (next break)",
      after: "Under 90 seconds, 24/7",
      beforeW: 88,
      afterW: 8,
    },
    {
      label: "Quote Follow-Up",
      before: "40% (memory-dependent)",
      after: "100% automated",
      beforeW: 80,
      afterW: 8,
    },
    {
      label: "After-Hours Leads",
      before: "0% captured",
      after: "100% captured",
      beforeW: 100,
      afterW: 5,
    },
    {
      label: "Scheduling",
      before: "Text messages and notes",
      after: "Booked into Jobber with confirmations",
      beforeW: 75,
      afterW: 10,
    },
    {
      label: "Invoicing",
      before: "1-2 weeks after job",
      after: "Triggered on job completion",
      beforeW: 85,
      afterW: 5,
    },
  ],
  workflowHeading: "Systems We Build for Contractors",
  workflowSteps: [
    { label: "Lead Arrives", type: "trigger" },
    { label: "90s Response", type: "ai" },
    { label: "Qualify Scope", type: "ai" },
    { label: "CRM Record", type: "action" },
    { label: "Jobber Booking", type: "action" },
    { label: "Quote Follow-Up", type: "action" },
    { label: "Invoice on Close", type: "outcome" },
  ],
  workflowBadge: "Response: 4-6 hrs → 90 seconds",
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Leads outside your service area or scope responded to politely rather than booked. No wasted site visits.",
    },
    {
      title: "Retries",
      desc: "Jobber booking failures create manual task for you with all lead details preserved. Nothing lost.",
    },
    {
      title: "Approvals",
      desc: "Large commercial leads or complex multi-trade projects can require your review before site visit booking.",
    },
    {
      title: "Logging",
      desc: "Every lead interaction, quote, follow-up, and booking logged in CRM for complete pipeline visibility.",
    },
    {
      title: "Escalation",
      desc: "Emergency calls (water damage, electrical hazard) trigger immediate SMS to you regardless of time or day.",
    },
  ],
  roiMetrics: [
    { label: "Response Time", before: "4-6 hours", after: "Under 90 seconds" },
    { label: "Lost Leads", before: "8-12/month", after: "1-2/month" },
    { label: "Quote Follow-Up", before: "40%", after: "100%" },
    { label: "Quote Conversion", after: "Estimated +22% within 60 days" },
    { label: "After-Hours Capture", before: "0%", after: "100%" },
    { label: "Invoice Delay", after: "Eliminated (same-day on job close)" },
    { label: "Payback Period", after: "Within first month (often first week)" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",
  bestFit: [
    "Contractors receiving 20+ quote requests per month",
    "Trades businesses where the owner is on-site during business hours",
    "Operations competing for residential jobs where response speed wins",
    "Businesses with significant after-hours inquiry volume",
  ],
  notFit: [
    "Contractors with fewer than 5 inquiries per month",
    "Businesses with a full-time office manager already handling all leads promptly",
  ],
  aeoQuestion: "How does AI automation help contractors?",
  aeoAnswer:
    "AI automation helps contractors by responding to leads within 90 seconds even while the contractor is on-site, qualifying project scope automatically, booking site visits into scheduling software like Jobber, running quote follow-up sequences at 48 hours, 5 days, and 10 days, capturing after-hours calls with AI voice agents, and triggering invoices automatically when jobs are marked complete. This bridges the gap between being on the job and winning the next one.",
  faqItems: [
    {
      question: "Does it work with Jobber?",
      answer:
        "Yes. Jobber is one of our primary contractor integrations: scheduling, CRM, quoting, and invoicing all connected.",
    },
    {
      question: "What about HomeStars and Houzz leads?",
      answer:
        "We capture leads from HomeStars, Houzz, Google Local Services, and other platforms via email parsing, webhooks, or API connections.",
    },
    {
      question: "Do I need a CRM?",
      answer:
        "For lead automation to work properly, yes. We recommend and set up Go High Level or similar lightweight CRMs as part of implementation.",
    },
    {
      question: "Will the automated messages sound professional?",
      answer:
        "Yes. Every template written in your voice: direct, professional, and clear. Not corporate, not robotic.",
    },
    {
      question: "How much does this cost?",
      answer:
        "Contractor lead automation: $3,000-$6,000 CAD. Typically pays for itself within the first month through captured leads.",
    },
    {
      question: "After-hours AI: does it really answer calls?",
      answer:
        "Yes. Natural conversational AI answers calls, qualifies the lead, books appointments, and delivers you a morning briefing with everything that happened overnight.",
    },
  ],
  ctaHeadline:
    "Your Crew Does the Work. The System Wins the Next Job. Automate the Gap Between.",
  ctaBody:
    "Walk away with a clear plan for capturing leads 24/7 without missing a single job. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Contractors Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",
  internalLinks: [
    {
      label: "Lead Response Automation",
      href: "/services/lead-response-automation",
      desc: "Respond in 90 seconds, every time",
    },
    {
      label: "AI Receptionist",
      href: "/services/ai-receptionist",
      desc: "24/7 inbound call handling",
    },
    {
      label: "After-Hours Automation",
      href: "/services/after-hours-automation",
      desc: "Capture leads while your team sleeps",
    },
    {
      label: "Invoice Automation",
      href: "/services/invoice-automation",
      desc: "Invoices on job completion, automatic",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      desc: "Real results from real clients",
    },
  ],
};

export default function Contractors() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Contractors" industrySlug="contractor" />
    </IndustryPageLayout>
  );
}
