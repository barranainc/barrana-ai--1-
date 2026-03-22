import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Physio Clinic Automation Case Study | $85K No-Show Recovery | Barrana.ai",
  description:
    "How a 6-practitioner physiotherapy clinic in Richmond Hill reduced no-shows by 38% using dual reminders and waitlist automation. $85,000 annual revenue recovered.",
  slug: "physio-clinic-richmond-hill",
  industry: "Physiotherapy Clinics",
  location: "Richmond Hill, Ontario",
  teamSize: "6 practitioners + 2 front desk",
  relatableIndustries: [
    "Physiotherapy",
    "Dental Offices",
    "Medical Clinics",
    "Veterinary Clinics",
    "Chiropractic",
  ],
  h1: "How a 6-Practitioner Clinic Recovered $85,000 Per Year Just by Sending Reminders Consistently",
  subheadline:
    "No-shows dropped from 22% to under 14%. Waitlist filled 70% of cancellation slots automatically. Front desk phone time reduced by 55%. Paper intake eliminated completely.",
  intro:
    "This Richmond Hill physiotherapy clinic was seeing 55 patients per day across 6 practitioners. At a 22% no-show rate, that was 12 empty slots daily. At $80 per visit, $960 per day in lost revenue. The front desk team of two was spending over half their time on phone scheduling.",
  businessDescription:
    "A multi-disciplinary physiotherapy clinic on Yonge Street in Richmond Hill offering physiotherapy, massage therapy, and chiropractic. 6 practitioners, 2 front desk staff. Using Jane App. 55+ patient visits per day. Serving families and athletes from Richmond Hill, Thornhill, and surrounding areas.",
  problemHeading: "What Was Breaking",
  problemBody: [
    "22% no-show rate across all practitioners — 12 empty slots per day, 60 per week, over 3,000 per year. At $80 per visit, over $240,000 in annual revenue capacity going unfilled.",
    "Front desk staff spent 55-60% of their day on phone calls: booking, confirming, rescheduling, answering insurance questions. During peak hours, 3-4 calls went to voicemail per hour.",
    "Paper intake forms took 15 minutes per new patient. With 8-10 new patients per week, that was 2-3 hours per week of data entry.",
    "When patients cancelled, slots went empty because there was no systematic way to notify waitlisted patients quickly enough.",
  ],
  beforeMetrics: [
    { label: "No-show rate", value: "22%" },
    { label: "Daily revenue impact", value: "$960/day" },
    { label: "Front desk phone time", value: "55-60%" },
    { label: "New patient intake time", value: "15 min" },
    { label: "Cancellation recovery", value: "Near zero" },
  ],
  solutionIntro:
    "We deployed a 4-workflow system: dual appointment reminders, waitlist management, digital intake, and post-treatment re-engagement. All integrated with Jane App. The front desk workflow changed minimally.",
  workflowSteps: [
    {
      id: "appointment-booked",
      label: "Appointment Booked",
      sublabel: "New or returning patient booking confirmed in Jane App",
      type: "trigger",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#F59E0B",
    },
    {
      id: "48hr-reminder",
      label: "48hr Email Reminder",
      sublabel: "Personalized email reminder with intake form link for new patients",
      type: "action",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "2hr-sms-reminder",
      label: "2hr SMS Reminder",
      sublabel: "Day-of SMS reminder with one-tap confirm or cancel option",
      type: "action",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z",
      color: "#283891",
    },
    {
      id: "waitlist-autofill",
      label: "No-Show? Waitlist Auto-Fill",
      sublabel: "Cancellation triggers instant waitlist notification and slot rebooking",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Reminder delivery failures (bounced email, wrong phone) alerted front desk for manual outreach before appointment.",
    },
    {
      title: "Retries",
      desc: "SMS failures retried with alternate number from patient record.",
    },
    {
      title: "Approvals",
      desc: "Patients rescheduling more than 2x flagged for front desk review.",
    },
    {
      title: "Logging",
      desc: "All reminder sends, responses, cancellations, and fills logged against patient record.",
    },
    {
      title: "Escalation",
      desc: "Patients no-showing twice flagged for practice manager with complete history.",
    },
  ],
  tools: ["Jane App", "Make (Integromat)", "Twilio", "Google Forms"],
  results: [
    {
      label: "No-show rate",
      before: "22%",
      after: "13.6% (38% reduction)",
      beforeW: 85,
      afterW: 35,
    },
    {
      label: "Waitlist slot fill",
      before: "Near zero",
      after: "70% of cancellations filled",
      beforeW: 85,
      afterW: 20,
    },
    {
      label: "Annual revenue recovered",
      before: "$0",
      after: "$85,000 est.",
      beforeW: 5,
      afterW: 85,
    },
    {
      label: "Front desk phone time",
      before: "55-60% of day",
      after: "~27% of day",
      beforeW: 85,
      afterW: 35,
    },
    {
      label: "New patient intake",
      before: "15 min in-clinic",
      after: "Zero (digital before visit)",
      beforeW: 80,
      afterW: 5,
    },
  ],
  implementationTimeline: "3 weeks",
  investmentRange: "$5,000–$8,000 CAD",
  payback: "Within first month",
  keyResultCallout:
    "$85,000 in annual revenue recovered. No-shows down 38%. Waitlist fills 70% of cancellations. Front desk freed from 55% of phone burden. Paper intake eliminated. Patients return for maintenance care 25% more often.",
  whyItMatters:
    "Some of the highest-ROI automation is also the simplest. Dual reminders are not complex technology. But implementing them consistently at scale, with waitlist management and failure handling, requires a system.",
  whyBullets: [
    "Your no-show rate is above 15%",
    "Your front desk spends more than half their time on the phone",
    "Cancellation slots go unfilled because you cannot reach waitlisted patients fast enough",
    "New patient intake involves paper forms",
    "Patients who complete treatment never come back for maintenance",
  ],
  crossIndustryItems: [
    { industry: "Physiotherapy Clinics", note: "Exact scenario." },
    {
      industry: "Dental Offices",
      note: "Identical no-show and recall patterns, often higher impact due to visit value.",
    },
    {
      industry: "Medical Clinics",
      note: "Same front desk overload and reminder needs.",
    },
    {
      industry: "Veterinary Clinics",
      note: "Appointment reminders and vaccination recall follow the same model.",
    },
    {
      industry: "Any Appointment-Based Business",
      note: "The dual reminder + waitlist pattern is universal.",
    },
  ],
  ctaHeadline:
    "Every Empty Slot Is Revenue You Cannot Get Back. The Fix Takes 3 Weeks.",
  ctaBody:
    "The audit calculates your specific no-show cost and shows you the reminder system designed for your practice.",
  internalLinks: [
    {
      label: "Physiotherapy Clinics",
      href: "/industries/physiotherapy-clinics",
    },
    {
      label: "Appointment Automation",
      href: "/services/appointment-automation",
    },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
    },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#7E0F4A",
};

export default function PhysioClinicRichmondHill() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
