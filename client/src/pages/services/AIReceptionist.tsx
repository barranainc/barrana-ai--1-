/**
 * AIReceptionist.tsx
 * Route: /services/ai-receptionist
 * Meta description: AI receptionist that answers every call, qualifies every lead, and books
 * every appointment. 24/7. Natural conversation. No missed inquiries.
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";
import AIReceptionistHeroVisual from "@/components/hero-visuals/AIReceptionistHeroVisual";

const data: ServicePageData = {
  title: "AI Receptionist | Every Call Answered 24/7 | Barrana.ai",
  description:
    "AI receptionist that answers every call, qualifies every lead, and books every appointment. 24/7. Natural conversation. No missed inquiries.",

  breadcrumb: "AI Receptionist",
  h1: "40% of Your Calls Go Unanswered. Each One Is a Client Who Called Someone Else.",
  subheadline:
    "An AI receptionist answers every call, qualifies every inquiry, and books every appointment. 24 hours a day, 7 days a week. Natural conversation, not a phone tree.",
  body: [
    "Your front desk is handling check-ins, insurance questions, and scheduling while the phone rings. Three calls go to voicemail in an hour. Two were qualified new clients. After 5pm, every call goes unanswered. Most callers do not leave messages.",
    "An AI receptionist fills this gap without adding headcount. It handles the calls your team cannot get to and captures the leads that currently disappear.",
  ],
  ctaMicro: "Find out how many calls you are missing and what they are worth.",

  costHeading: "What Missed Calls Are Costing You",
  costItems: [
    {
      figure: "40%",
      label: "Calls Missed During Peak Hours",
      desc: "Your team is busy. Calls go to voicemail. Most callers hang up and call the next business on their list.",
    },
    {
      figure: "100%",
      label: "After-Hours Calls Lost",
      desc: "Between 5pm and 9am, every inquiry goes unanswered. That is 16 hours per day of zero lead capture.",
    },
    {
      figure: "$500–$15K",
      label: "Per Missed Call",
      desc: "Depending on your industry and average client value, every unanswered call is a potential client who chose a competitor.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Peak Hours Calls", before: "40% go to voicemail", after: "100% answered <2 rings", beforeW: 80, afterW: 5 },
    { label: "After-Hours Calls", before: "0% answered", after: "100% answered", beforeW: 100, afterW: 5 },
    { label: "Call Documentation", before: "Handwritten notes", after: "Auto transcript + CRM", beforeW: 85, afterW: 8 },
    { label: "Booking Process", before: "Manual callback", after: "During the call", beforeW: 90, afterW: 8 },
    { label: "Front Desk Focus", before: "Split: phones + clients", after: "Full focus on in-person", beforeW: 85, afterW: 15 },
  ],

  workflowSteps: [
    { label: "Call Arrives", type: "trigger" },
    { label: "Professional Greeting", type: "action" },
    { label: "AI Qualifies", type: "ai" },
    { label: "CRM Record", type: "action" },
    { label: "Appointment Booked", type: "outcome" },
    { label: "Summary to Team", type: "action" },
    { label: "Escalation If Needed", type: "outcome" },
  ],
  workflowBadge: "After-hours capture: 0% → 100%",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Complex or emotional calls detected and transferred to human staff within 30 seconds. The AI never handles situations beyond its scope.",
    },
    {
      title: "Retries",
      desc: "If calendar booking fails during the call, AI confirms verbally and creates a manual task for staff to follow up.",
    },
    {
      title: "Approvals",
      desc: "Existing clients (flagged in CRM) are always transferred to a human rather than handled by AI.",
    },
    {
      title: "Logging",
      desc: "Full transcript + AI-generated summary stored per interaction. Nothing said on the phone is lost.",
    },
    {
      title: "Escalation",
      desc: "Configurable escalation rules: urgent keywords, VIP caller detection, after-hours emergency routing.",
    },
  ],

  roiMetrics: [
    { label: "After-Hours Capture", before: "0%", after: "100%" },
    { label: "Peak Missed Calls", before: "40% lost", after: "Eliminated" },
    { label: "Front Desk Phone Volume", before: "Full burden", after: "Reduced 50–70%" },
    { label: "Monthly Cost vs Receptionist", after: "Fraction of salary" },
    { label: "Typical Payback", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Businesses relying on inbound calls for new clients",
    "Teams where front desk is overwhelmed during busy hours",
    "Operations extending beyond standard 9–5 hours",
    "Businesses in competitive markets where response speed wins clients",
  ],
  notFit: [
    "Businesses receiving fewer than 5 calls per week",
    "Operations where every call requires immediate specialized human judgment",
  ],

  aeoQuestion: "What is an AI receptionist for small business?",
  aeoAnswer:
    "An AI receptionist is an automated phone and messaging system that answers incoming calls using natural language, qualifies callers, collects information, books appointments, and routes complex inquiries to human staff. Unlike traditional IVR menus, it holds real conversations, understands context, and takes operational actions including CRM updates and calendar bookings. It operates 24/7 without staffing costs.",

  faqItems: [
    {
      question: "Does the AI sound robotic?",
      answer:
        "No. Modern voice AI delivers natural, conversational speech. We configure tone, pace, and language to match your brand.",
    },
    {
      question: "What happens when a call is too complex?",
      answer:
        "Escalation rules transfer to a live team member within 30 seconds with full context of the conversation so far.",
    },
    {
      question: "Can it book into Jobber or Jane App?",
      answer:
        "Yes. We integrate with Jobber, Jane App, Google Calendar, Calendly, and most scheduling platforms.",
    },
    {
      question: "Can I see transcripts?",
      answer:
        "Yes. Full transcripts and AI summaries delivered to your inbox or CRM after every interaction.",
    },
    {
      question: "How quickly can this be set up?",
      answer:
        "Standard deployment: 2–3 weeks including voice configuration, greeting scripts, qualification logic, and integration testing.",
    },
    {
      question: "What languages does it support?",
      answer:
        "English and French standard. Additional languages configurable based on your client base.",
    },
  ],

  ctaHeadline: "Your Phone Is Ringing Right Now. Is Anyone Answering?",
  ctaBody:
    "The audit reviews your call volume, after-hours inquiry patterns, and calculates the revenue impact of missed calls specific to your business.",

  internalLinks: [
    {
      label: "Lead Response Automation",
      href: "/services/lead-response-automation",
      desc: "Full lead pipeline automation",
    },
    {
      label: "After-Hours Automation",
      href: "/services/after-hours-automation",
      desc: "Complete after-hours coverage",
    },
    {
      label: "Appointment Automation",
      href: "/services/appointment-automation",
      desc: "Booking and reminder systems",
    },
    {
      label: "Contractor Automation",
      href: "/industries/contractors",
      desc: "Contractor-specific receptionist",
    },
  ],
};

export default function AIReceptionist() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} heroVisual={<AIReceptionistHeroVisual />} />;
}
