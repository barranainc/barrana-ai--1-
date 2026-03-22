import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import PhysiotherapyHeroVisual from "@/components/hero-visuals/PhysiotherapyHeroVisual";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title:
    "AI Automation for Physiotherapy Clinics Toronto | Cut No-Shows 25-40% | Barrana.ai",
  description:
    "Reduce no-shows by 25-40%, automate patient booking, dual reminders, digital intake, waitlist management, and post-treatment follow-up. Jane App integrated. Free audit.",
  route: "physiotherapy-clinics",
  breadcrumb: "Physiotherapy Clinics",
  h1: "Every No-Show Is $80 That Walked Out the Door. At 40 Patients Per Day, That Is $150,000 Per Year.",
  subheadline:
    "Dual reminders cut no-shows 25-40%. Digital intake eliminates paper forms. Cancellations auto-fill from waitlist. Post-treatment re-engagement runs itself. Your front desk focuses on patients, not phones.",
  body: [
    "A physiotherapy clinic seeing 40 patients per day with a 20% no-show rate loses 8 appointments daily. At $80 per visit, that is $640 per day, $3,200 per week, over $150,000 per year. The majority of those no-shows are preventable with consistent reminders your front desk cannot send manually at that scale.",
    "Beyond no-shows, your front desk juggles booking calls, check-ins, insurance questions, and paper intake forms simultaneously. The phones ring. Patients wait. Something always gets dropped.",
  ],
  ctaMicro: "Calculate your annual no-show cost. Free 60-minute audit.",
  costHeading: "What Your Clinic Loses to No-Shows and Manual Processes",
  costItems: [
    {
      figure: "$150,000+/yr",
      label: "No-Show Revenue Lost",
      desc: "8 empty slots per day at a 40-patient clinic. Revenue that cannot be recovered once the slot passes.",
    },
    {
      figure: "50-70%",
      label: "Front Desk Phone Time",
      desc: "Booking, confirming, rescheduling. Every minute on the phone is a minute not spent on patient experience.",
    },
    {
      figure: "15 min/patient",
      label: "Paper Intake",
      desc: "Forms on clipboards. Staff transcription. Data quality issues. First impression from 1995.",
    },
  ],
  problems: [
    {
      title: "No-Shows Are Costly and Preventable",
      desc: "Patients forget. Schedules change. Consistent dual reminders (48hr email + 2hr SMS) prevent the majority, but sending 80+ reminders per day manually is impossible.",
    },
    {
      title: "Front Desk Overwhelmed During Peak Hours",
      desc: "Phones ring while patients check in. Insurance questions while appointments book. During peak hours, calls go to voicemail. Patients leave.",
    },
    {
      title: "Paper Intake Is Outdated",
      desc: "New patients fill forms on clipboards in the waiting room. Staff transcribe into the system. Errors happen. Time wasted on both sides.",
    },
    {
      title: "Post-Treatment Follow-Up Never Happens",
      desc: "Patients complete treatment and disappear. They should return for maintenance care but nobody contacts them consistently.",
    },
  ],
  beforeAfterMetrics: [
    {
      label: "No-Show Rate",
      before: "15-25%",
      after: "8-15% (reduced 25-40%)",
      beforeW: 85,
      afterW: 45,
    },
    {
      label: "Appointment Reminders",
      before: "Manual or inconsistent",
      after: "Dual auto (48hr email + 2hr SMS)",
      beforeW: 70,
      afterW: 8,
    },
    {
      label: "Patient Intake",
      before: "Paper forms, staff transcription",
      after: "Digital, completed before visit",
      beforeW: 80,
      afterW: 10,
    },
    {
      label: "Cancellation Slots",
      before: "Unfilled (no waitlist)",
      after: "Auto-filled from waitlist",
      beforeW: 90,
      afterW: 8,
    },
    {
      label: "Post-Treatment Follow-Up",
      before: "Rarely happens",
      after: "30/60-day auto re-engagement",
      beforeW: 95,
      afterW: 10,
    },
  ],
  workflowHeading: "Systems We Build for Physiotherapy Clinics",
  workflowSteps: [
    { label: "Patient Books", type: "trigger" },
    { label: "48hr Email Reminder", type: "action" },
    { label: "2hr SMS Reminder", type: "action" },
    { label: "Confirm or Reschedule", type: "ai" },
    { label: "Cancellation → Waitlist", type: "action" },
    { label: "Post-Treatment", type: "action" },
    { label: "Re-Engagement", type: "outcome" },
  ],
  workflowBadge: "No-shows reduced 25-40% within 60 days",
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Reminder delivery failure (bounced email, invalid phone number) triggers immediate alert to front desk for manual outreach before the appointment.",
    },
    {
      title: "Retries",
      desc: "SMS delivery failures retry with alternate phone number from patient record if available.",
    },
    {
      title: "Approvals",
      desc: "Patients attempting to reschedule more than twice require staff approval to prevent scheduling abuse.",
    },
    {
      title: "Logging",
      desc: "All booking changes, reminders sent, patient responses, and cancellations logged against patient record.",
    },
    {
      title: "Escalation",
      desc: "Patients who no-show twice flagged for practice manager review with complete appointment and reminder history.",
    },
  ],
  roiMetrics: [
    { label: "No-Show Rate", before: "15-25%", after: "Reduced 25-40% within 60 days" },
    { label: "Front Desk Phone Time", before: "50-70% of day", after: "Reduced 50-70%" },
    { label: "Patient Intake", after: "Completed before visit — zero paper" },
    { label: "Cancellation Slots", after: "Filled automatically from waitlist" },
    { label: "Daily Revenue Recovered", after: "$640+/day for 40-patient clinic" },
    { label: "Payback Period", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",
  bestFit: [
    "Clinics seeing 20+ patients per day",
    "Multi-practitioner practices with scheduling complexity",
    "Practices with no-show rates above 15%",
    "Clinics wanting to reduce front desk phone burden",
  ],
  notFit: [
    "Solo practitioners seeing fewer than 10 patients per week",
    "Practices where no-shows are not a revenue concern",
  ],
  aeoQuestion: "How does AI automation help physiotherapy clinics?",
  aeoAnswer:
    "AI automation helps physiotherapy clinics by sending dual appointment reminders (48-hour email + 2-hour SMS) to reduce no-shows by 25-40%, providing digital intake forms completed before visits, managing waitlists to auto-fill cancellation slots, enabling online self-serve booking, and running post-treatment re-engagement sequences at 30 and 60 days. This recovers revenue from no-shows, reduces front desk phone volume by 50-70%, and brings patients back for maintenance care.",
  faqItems: [
    {
      question: "Jane App integration?",
      answer:
        "Yes. We integrate fully with Jane App for patient booking, records, reminders, and billing.",
    },
    {
      question: "Can patients book specific treatment types?",
      answer:
        "Yes. Booking configured by appointment type (initial assessment, follow-up, specific treatment) with appropriate time slots and practitioner availability.",
    },
    {
      question: "Multilingual reminders?",
      answer:
        "Yes. Reminder language configured per patient preference: English, French, and other languages.",
    },
    {
      question: "Typical no-show reduction?",
      answer:
        "25-40% within 60 days of dual reminder implementation. Consistent across our clinic implementations.",
    },
    {
      question: "Can we automate Google review requests?",
      answer:
        "Yes. Post-visit review requests configurable as part of the system. Timed for maximum response rate.",
    },
    {
      question: "PHIPA compliance?",
      answer:
        "Patient data stays in your practice management system. We do not store, process, or access clinical data. All automation flows documented.",
    },
    {
      question: "How quickly can this be set up?",
      answer:
        "Standard clinic automation: 2-3 weeks including reminder configuration, intake form design, and Jane App integration.",
    },
  ],
  ctaHeadline:
    "Every Empty Slot Is Revenue Your Practice Cannot Recover. Dual Reminders Fill Them. Automation Runs Them.",
  ctaBody:
    "Walk away with a clear plan for recovering $640+ per day in no-show revenue. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Clinics Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",
  internalLinks: [
    {
      label: "Appointment Automation",
      href: "/services/appointment-automation",
      desc: "Booked, confirmed, reminded automatically",
    },
    {
      label: "AI Receptionist",
      href: "/services/ai-receptionist",
      desc: "24/7 inbound call and message handling",
    },
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Digital intake before the visit",
    },
    {
      label: "Dental Offices",
      href: "/industries/dental-offices",
      desc: "Same system applied to dental practices",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      desc: "Real results from real clients",
    },
  ],
};

export default function PhysiotherapyClinics() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data} heroVisual={<PhysiotherapyHeroVisual />}>
      <IndustryPlannerCTA industryName="Physiotherapy Clinics" industrySlug="clinic" />
    </IndustryPageLayout>
  );
}
