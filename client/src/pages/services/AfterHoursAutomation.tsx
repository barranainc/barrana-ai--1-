/**
 * AfterHoursAutomation.tsx
 * Route: /services/after-hours-automation
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";

const data: ServicePageData = {
  title: "After-Hours AI Automation | Barrana.ai",
  description:
    "Capture and qualify every lead that arrives after business hours. AI receptionist, automated qualification, CRM records, and morning briefings.",

  breadcrumb: "After-Hours Automation",
  h1: "Between 5pm and 9am, Every Inquiry Goes to Voicemail. Your Competitors Do Not Have That Problem.",
  subheadline:
    "After-hours automation answers calls, responds to messages, qualifies leads, creates CRM records, and books appointments while your team sleeps. You wake up to a briefing of everything that happened overnight.",
  body: [
    "Your business is open 8 hours a day. Leads arrive 24 hours a day. Homeowners research contractors at 9pm. Patients look for clinics at 7am. Immigration clients in different time zones inquire at 2am.",
    "16 hours of every day, your business is completely offline. That is 16 hours of zero lead capture your competitors are filling.",
  ],
  ctaMicro: "See how many leads arrive outside business hours. Free audit.",

  costHeading: "What Zero After-Hours Coverage Is Costing You",
  costItems: [
    {
      figure: "16 hrs/day",
      label: "Zero Lead Capture",
      desc: "That is 67% of every 24-hour period. Two-thirds of every day, your business cannot respond to a single inquiry.",
    },
    {
      figure: "100%",
      label: "Weekend Inquiries Lost",
      desc: "48 hours every week where leads go to voicemail or sit in inboxes. By Monday, they have booked elsewhere.",
    },
    {
      figure: "0",
      label: "International Time Zone Coverage",
      desc: "For immigration consultants, clients in Asia, Europe, and the Middle East are awake when you are not.",
    },
  ],

  beforeAfterMetrics: [
    { label: "After 5pm", before: "All calls to voicemail", after: "AI answers every call", beforeW: 100, afterW: 5 },
    { label: "Weekend Coverage", before: "Zero", after: "Full, same quality", beforeW: 100, afterW: 5 },
    { label: "After-Hours Lead Capture", before: "0%", after: "100% with qualification", beforeW: 100, afterW: 5 },
    { label: "Morning Routine", before: "Check voicemail, call cold leads", after: "Briefing + already booked", beforeW: 85, afterW: 8 },
    { label: "International Reachability", before: "Unreachable their hours", after: "Responsive any time zone", beforeW: 100, afterW: 5 },
  ],

  workflowSteps: [
    { label: "After-Hours Inquiry", type: "trigger" },
    { label: "AI Handles", type: "ai" },
    { label: "Qualifies Lead", type: "ai" },
    { label: "CRM Record", type: "action" },
    { label: "Appointment Booked", type: "outcome" },
    { label: "Morning Briefing", type: "outcome" },
  ],
  workflowBadge: "After-hours capture: 0% → 100%",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Emergency or urgent situations trigger immediate SMS notification to on-call staff.",
    },
    {
      title: "Retries",
      desc: "If booking system is unavailable, AI confirms a callback time and creates a manual follow-up task for the morning.",
    },
    {
      title: "Logging",
      desc: "All after-hours interactions logged with full transcripts and outcomes.",
    },
    {
      title: "Approvals",
      desc: "High-value after-hours leads can be flagged for priority morning follow-up rather than standard queue.",
    },
    {
      title: "Escalation",
      desc: "Specific keywords or situations (legal emergency, medical concern) trigger immediate escalation to designated contacts.",
    },
  ],

  roiMetrics: [
    { label: "After-Hours Lead Capture", before: "0%", after: "100%" },
    { label: "Weekend Coverage", before: "Zero", after: "Full" },
    { label: "Morning Briefing", before: "Check voicemail manually", after: "Automatic summary" },
    { label: "Response Time (After-Hours)", before: "Hours (next morning)", after: "Under 2 minutes" },
    { label: "Typical Payback", after: "Often within first week" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Contractors (homeowners browse evenings and weekends)",
    "Clinics (patients research outside business hours)",
    "Immigration firms (international time zones)",
    "Any business where after-hours leads represent significant missed revenue",
  ],
  notFit: [
    "Businesses that genuinely receive zero inquiries outside business hours",
    "Operations where after-hours coverage adds no revenue value",
  ],

  aeoQuestion: "What is after-hours automation for small business?",
  aeoAnswer:
    "After-hours automation captures and qualifies every lead that arrives outside business hours using AI receptionist systems and automated response workflows. When a call, form submission, or message arrives between closing and opening, the system responds immediately, qualifies the inquiry, creates a CRM record, books appointments when applicable, and delivers a morning briefing to the business owner. This converts the 16 hours per day of zero coverage into active lead capture.",

  faqItems: [
    {
      question: "Does it handle phone calls after hours?",
      answer:
        "Yes. AI receptionist answers calls with a natural greeting, qualifies callers, and books appointments or creates follow-up tasks.",
    },
    {
      question: "What if someone has a genuine emergency?",
      answer:
        "Configurable emergency keywords and scenarios trigger immediate SMS to your on-call staff.",
    },
    {
      question: "When do I receive the morning briefing?",
      answer:
        "Configurable. Most clients set it for 7am. Delivered via email with full summary of overnight activity.",
    },
    {
      question: "Can it handle different time zones?",
      answer:
        "Yes. The system operates 24/7 in all time zones. Booking links show availability in the caller's local time.",
    },
    {
      question: "How much does this cost?",
      answer:
        "After-hours automation typically costs $2,000–$4,000 to implement. Monthly operating cost is a fraction of hiring overnight coverage.",
    },
  ],

  ctaHeadline: "Your Competitors Do Not Sleep. Your Lead Capture Should Not Either.",
  ctaBody:
    "The audit analyzes your after-hours inquiry patterns and shows you exactly how much revenue is being lost between 5pm and 9am.",

  internalLinks: [
    { label: "AI Receptionist", href: "/services/ai-receptionist", desc: "Full AI call handling" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Complete lead pipeline" },
    { label: "Contractor Automation", href: "/industries/contractors", desc: "Contractor after-hours coverage" },
    { label: "Immigration Automation", href: "/industries/immigration-consultants", desc: "Time zone coverage for immigration" },
  ],
};

export default function AfterHoursAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} />;
}
