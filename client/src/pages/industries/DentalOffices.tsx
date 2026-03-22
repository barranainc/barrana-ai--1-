import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Dental Offices Toronto | Fill Chairs, Clear Recall Lists | Barrana.ai",
  description: "Reduce dental no-shows 50-60%, automate recall campaigns, patient booking, digital intake, and review requests for dental practices. Free audit.",
  route: "dental-offices",
  breadcrumb: "Dental Offices",
  h1: "Your Hygienist Chairs Sit Empty When Patients No-Show. Your Recall List Has 300 Overdue Patients. Automation Handles Both.",
  subheadline: "Dual reminders reduce no-shows 50-60%. Automated recall campaigns contact every overdue patient every 6 months. Online booking reduces phone volume. Digital intake eliminates paper. Google reviews request after every visit.",
  body: [
    "Dental practices depend on chair utilization. Every empty hygienist chair is $150-$300 in lost revenue that cannot be recovered. Between no-shows, missed recall patients, and front desk staff buried in phone calls, most practices operate well below their revenue capacity.",
    "The math is straightforward: a 2-chair hygiene practice with 10% no-show improvement and better recall compliance can add $80,000-$120,000 in annual revenue without adding a single new marketing dollar.",
  ],
  ctaMicro: "Calculate your no-show cost and recall gap. Free 60-minute audit.",

  costHeading: "What Your Dental Practice Is Leaving on the Table",
  costItems: [
    { figure: "$400-$800/day", label: "No-Show Revenue Lost", desc: "2-3 missed appointments per day at $150-$300 average hygiene value. Chairs sit empty. Revenue gone forever." },
    { figure: "30-40%", label: "Recall Gap", desc: "Patients due for 6-month cleanings who never get contacted because manual recall tracking falls behind every quarter." },
    { figure: "60%+", label: "Front Desk Phone Time", desc: "Booking, confirming, insurance questions, and recall outreach consume the entire day. Patient experience suffers." },
  ],

  problemsHeading: undefined,
  problems: [
    { title: "No-Shows Drain Revenue Daily", desc: "Patients forget or cancel last-minute. Hygienist and dentist chairs sit empty. The time cannot be sold to someone else because the slot is gone." },
    { title: "Recall Tracking Falls Behind Every Quarter", desc: "You have 500+ patients. Each one is on a 6-month recall cycle. Manual tracking means most overdue patients never get contacted." },
    { title: "Front Desk Is the Bottleneck", desc: "Phones ring constantly. Check-ins compete with scheduling. Insurance verification is manual. Staff cannot do all of it simultaneously." },
    { title: "New Patient Intake Is Slow and Paper-Based", desc: "Paper forms in the waiting room. Medical history on clipboards. Staff transcription with errors. First impression is outdated." },
  ],

  beforeAfterMetrics: [
    { label: "No-Show Rate", before: "10-20%", after: "5-10% (dual reminder system)", beforeW: 85, afterW: 40 },
    { label: "Recall Compliance", before: "60-70% (manual)", after: "85-95% (automated campaigns)", beforeW: 80, afterW: 30 },
    { label: "Patient Booking", before: "Phone-dependent", after: "Online self-serve + auto confirmation", beforeW: 80, afterW: 10 },
    { label: "Patient Intake", before: "Paper forms, staff transcription", after: "Digital, completed before visit", beforeW: 85, afterW: 8 },
    { label: "Google Reviews", before: "Rarely requested", after: "Automatic after every visit", beforeW: 90, afterW: 8 },
  ],

  workflowHeading: "Systems We Build for Dental Offices",
  workflowSteps: [
    { label: "Patient Books", type: "trigger" },
    { label: "Digital Intake Sent", type: "action" },
    { label: "48hr Email Reminder", type: "action" },
    { label: "2hr SMS Reminder", type: "action" },
    { label: "Visit Complete", type: "action" },
    { label: "Review Request", type: "action" },
    { label: "6-Month Recall", type: "outcome" },
  ],
  workflowBadge: "No-shows reduced 50-60%",

  controlItems: [
    { title: "Stop-Loss", desc: "Medical history flags (allergies, conditions, medications) surfaced prominently to treating dentist before any procedure. System never suppresses clinical alerts." },
    { title: "Retries", desc: "Recall notice delivery failures retry via alternate channel (SMS if email bounced, email if SMS failed)." },
    { title: "Approvals", desc: "Treatment plan follow-up communications and financial discussions require dentist approval before patient outreach." },
    { title: "Logging", desc: "All patient communications logged against record for regulatory compliance and audit trail." },
    { title: "Escalation", desc: "Patients reporting pain, swelling, or emergency symptoms in any communication channel routed immediately to clinical staff." },
  ],

  roiMetrics: [
    { label: "No-Show Rate", before: "10-20%", after: "Reduced 50-60%" },
    { label: "Recall Compliance", before: "60-70%", after: "85-95%" },
    { label: "Front Desk Phone Time", before: "60%+", after: "Reduced 40-50%" },
    { label: "New Patient Intake", after: "Completed before visit, zero paper" },
    { label: "Google Reviews", after: "Consistent automatic requests" },
    { label: "Annual Revenue Impact", after: "$80,000-$120,000 for 2-chair practice" },
    { label: "Payback Period", after: "Within first month" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific practice.",

  bestFit: [
    "Dental practices with 2+ hygienist chairs",
    "Offices with 500+ patients in their recall system",
    "Practices where front desk is overwhelmed with phone scheduling",
    "Offices wanting to grow patient volume without adding admin staff",
  ],
  notFit: [
    "Brand new practices without an established patient base",
    "Offices with dedicated full-time recall coordinator already achieving 90%+ compliance",
  ],

  aeoQuestion: "How does AI automation help dental offices?",
  aeoAnswer: "AI automation helps dental offices by sending dual appointment reminders (48-hour email + 2-hour SMS) to reduce no-shows by 50-60%, running automated 6-month recall campaigns to maintain 85-95% hygiene compliance, enabling online self-serve booking, providing digital intake forms completed before visits, and requesting Google reviews after every appointment. For a 2-chair hygiene practice, this typically recovers $80,000-$120,000 in annual revenue from improved chair utilization and recall compliance.",

  faqItems: [
    { question: "Practice management integration?", answer: "We integrate with Dentrix, Eaglesoft, Open Dental, ClearDent, and ABELDent via their APIs or data export methods." },
    { question: "Can patients book specific procedure types?", answer: "Yes. Booking configured by appointment type (cleaning, exam, specific procedures) with appropriate duration and chair assignment." },
    { question: "Insurance verification?", answer: "We can automate insurance eligibility checks as part of the intake or booking workflow depending on your management system." },
    { question: "PHIPA compliance?", answer: "All patient data stays in your practice management system. We do not store, process, or access clinical patient data. Automation flows documented." },
    { question: "How quickly?", answer: "Standard dental automation: 2-3 weeks from audit to live." },
    { question: "How much?", answer: "Dental practice automation: $4,000-$8,000 CAD. Typically pays for itself within the first month through reduced no-shows and improved recall." },
    { question: "Can we do treatment plan follow-up?", answer: "Yes. Presented-but-not-scheduled treatment plans get systematic follow-up at 48hr, 7-day, and 30-day intervals." },
  ],

  ctaHeadline: "Your Chairs Should Be Full. Your Recall List Should Be Current. Automation Makes Both Happen.",
  ctaBody: "Walk away with a clear plan for recovering $80,000-$120,000 per year in chair revenue. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Dental Offices Automation Audit",
  primaryMicro: "Walk away with a clear plan. No pitch. No obligation.",

  internalLinks: [
    { label: "Appointment Automation", href: "/services/appointment-automation", desc: "Booked, confirmed, reminded automatically" },
    { label: "AI Receptionist", href: "/services/ai-receptionist", desc: "24/7 inbound call handling" },
    { label: "Client Intake Automation", href: "/services/client-intake-automation", desc: "Digital intake before the visit" },
    { label: "Physiotherapy Clinics", href: "/industries/physiotherapy-clinics", desc: "Same system, different specialty" },
    { label: "Medical Clinics", href: "/industries/medical-clinics", desc: "Family medicine automation" },
  ],
};

export default function DentalOffices() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Dental Offices" industrySlug="dental" />
    </IndustryPageLayout>
  );
}
