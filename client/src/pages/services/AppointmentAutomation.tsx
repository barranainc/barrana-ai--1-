/**
 * AppointmentAutomation.tsx
 * Route: /services/appointment-automation
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";
import TemplateEmptySlotGrid from "@/components/hero-visuals/TemplateEmptySlotGrid";

const data: ServicePageData = {
  title: "Appointment Automation | Reduce No-Shows by 25-40% | Barrana.ai",
  description:
    "Automated booking, dual reminders, digital intake, waitlist management, and rescheduling. Reduce no-shows by 25-40% for clinics and service businesses.",

  breadcrumb: "Appointment Automation",
  h1: "Every No-Show Is Revenue That Walked Out the Door. Automation Brings It Back.",
  subheadline:
    "Automated booking, dual reminders (48 hours + 2 hours), digital intake forms, waitlist management, and rescheduling. No-shows drop 25–40% within 60 days.",
  body: [
    "A physiotherapy clinic seeing 40 patients per day with a 20% no-show rate loses 8 appointments daily. At $80 per visit, that is $640 per day. $3,200 per week. Over $150,000 per year. Most of those no-shows are preventable with consistent reminders.",
    "Your front desk cannot send 80 reminder messages per day on top of check-ins, phone calls, and insurance questions. A system can.",
  ],
  ctaMicro: "Calculate your no-show cost. Free. Takes 60 minutes.",

  costHeading: "What No-Shows Are Costing Your Practice",
  costItems: [
    {
      figure: "$640/day",
      label: "Lost Appointments (40-patient clinic)",
      desc: "8 empty slots per day at $80 average. Slots that could have been filled by waitlisted patients.",
    },
    {
      figure: "50–70%",
      label: "Front Desk Time on Phones",
      desc: "Scheduling calls consume 50–70% of front desk time. Every minute on the phone is a minute not spent on patient experience.",
    },
    {
      figure: "15 min",
      label: "Paper Intake Per Patient",
      desc: "New patients fill forms in the waiting room. Staff transcribe manually. Errors happen. Time is wasted on both sides.",
    },
  ],

  beforeAfterMetrics: [
    { label: "No-Show Rate", before: "15–25%", after: "8–15% (–25–40%)", beforeW: 80, afterW: 40 },
    { label: "Reminder Process", before: "Manual or none", after: "Dual auto (48hr+2hr)", beforeW: 90, afterW: 8 },
    { label: "Intake Forms", before: "Paper, staff transcribes", after: "Digital before visit", beforeW: 85, afterW: 10 },
    { label: "Cancellation Slots", before: "Unfilled", after: "Auto waitlist fill", beforeW: 100, afterW: 5 },
    { label: "Post-Treatment Follow-Up", before: "Rarely happens", after: "30/60-day automatic", beforeW: 95, afterW: 10 },
  ],

  workflowSteps: [
    { label: "Booking Request", type: "trigger" },
    { label: "Slot Confirmed", type: "action" },
    { label: "Digital Intake", type: "action" },
    { label: "48hr Email Reminder", type: "action" },
    { label: "2hr SMS Reminder", type: "action" },
    { label: "Waitlist Auto-Fill", type: "action" },
    { label: "Post-Visit Follow-Up", type: "outcome" },
  ],
  workflowBadge: "No-shows reduced 25–40% within 60 days",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "If reminder delivery fails (bounced email, invalid phone), staff alerted for manual outreach before the appointment.",
    },
    {
      title: "Retries",
      desc: "SMS delivery failures retry with alternate number if available in the patient record.",
    },
    {
      title: "Approvals",
      desc: "Rescheduling beyond 2 times requires staff approval to prevent scheduling abuse.",
    },
    {
      title: "Logging",
      desc: "All booking changes, reminders sent, and patient responses logged against the patient record.",
    },
    {
      title: "Escalation",
      desc: "Patients who no-show twice flagged for practice manager review with full history.",
    },
  ],

  roiMetrics: [
    { label: "No-Show Rate", before: "15–25%", after: "8–15%" },
    { label: "Front Desk Phone Time", before: "50–70% of day", after: "Reduced significantly" },
    { label: "Patient Intake", before: "Paper waiting room", after: "Digital before visit" },
    { label: "Cancellation Slots", before: "Mostly unfilled", after: "Auto-filled from waitlist" },
    { label: "Typical Payback", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Clinics seeing 20+ patients per day",
    "Multi-practitioner practices",
    "Businesses with recurring appointment models",
    "Practices with no-show rates above 15%",
  ],
  notFit: [
    "Businesses with fewer than 10 appointments per week",
    "Practices where no-shows are not a significant revenue issue",
  ],

  aeoQuestion: "How does appointment automation reduce no-shows?",
  aeoAnswer:
    "Appointment automation reduces no-shows by sending consistent dual reminders: an email 48 hours before the appointment and an SMS 2 hours before. Patients can confirm or reschedule directly from the reminder. Cancellation slots are automatically offered to waitlisted patients. This combination typically reduces no-show rates by 25–40% within 60 days while eliminating the manual phone work of confirming appointments.",

  faqItems: [
    {
      question: "Does it integrate with Jane App?",
      answer:
        "Yes. We integrate with Jane App, Cliniko, and other clinic management platforms via their APIs.",
    },
    {
      question: "Can patients reschedule without calling?",
      answer:
        "Yes. The reminder includes a reschedule link showing available slots for automatic rebooking.",
    },
    {
      question: "What about multilingual patients?",
      answer:
        "We configure language preferences per patient record. Reminders sent in their preferred language.",
    },
    {
      question: "How quickly can this be set up?",
      answer:
        "Standard deployment: 2–3 weeks including reminder configuration, intake form setup, and calendar integration.",
    },
    {
      question: "Can we automate review requests?",
      answer:
        "Yes. Post-visit review requests (Google, RateMDs) can be configured as part of the system.",
    },
    {
      question: "What is the typical no-show reduction?",
      answer:
        "Clinics implementing dual reminders (48hr + 2hr SMS) typically see 25–40% reduction within the first 60 days.",
    },
  ],

  ctaHeadline: "Every Empty Slot Is Revenue Your Practice Cannot Recover. Fill Them Automatically.",
  ctaBody:
    "The audit calculates your no-show cost and shows you the automated reminder system designed for your practice.",

  internalLinks: [
    { label: "AI Receptionist", href: "/services/ai-receptionist", desc: "Answer every call, 24/7" },
    { label: "Client Intake Automation", href: "/services/client-intake-automation", desc: "Streamline new patient intake" },
    { label: "Medical Clinics", href: "/industries/physiotherapy-clinics", desc: "Clinic-specific automation" },
    { label: "Case Studies", href: "/case-studies", desc: "Real implementation results" },
  ],
};

export default function AppointmentAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} heroVisual={<TemplateEmptySlotGrid industry="Appointment Business" totalSlots={10} emptySlots={2} slotValue={120} />} />;
}
