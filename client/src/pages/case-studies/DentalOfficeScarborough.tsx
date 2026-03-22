import { useEffect } from "react";
import CaseStudyPageLayout, { CaseStudyData } from "@/components/case-study/CaseStudyPageLayout";

const data: CaseStudyData = {
  title: "Dental Office Automation Case Study | $120K Revenue Recovery | Barrana.ai",
  description:
    "How a 3-chair dental practice in Scarborough automated reminders, recall campaigns, and digital intake. No-shows down 55%. Recall compliance up to 91%.",
  slug: "dental-office-scarborough",
  industry: "Dental Offices",
  location: "Scarborough, Toronto",
  teamSize: "2 dentists + 2 hygienists + 2 front desk",
  relatableIndustries: [
    "Dental Offices",
    "Physiotherapy",
    "Medical Clinics",
    "Veterinary Clinics",
  ],
  h1: "How a 3-Chair Dental Practice Recovered $120,000 Per Year by Automating What Their Front Desk Could Not Do Manually",
  subheadline:
    "No-shows dropped 55%. Recall compliance jumped from 64% to 91%. 350 overdue patients contacted in one automated campaign. Front desk finally had time for patients instead of phones.",
  intro:
    "This Scarborough dental practice had 3 treatment chairs, 2 dentists, 2 hygienists, and 2 front desk staff. They were losing revenue simultaneously: a 19% no-show rate costing over $500/day in empty chairs, and a recall compliance rate of only 64% meaning 700+ patients were overdue. The front desk spent 65% of their day on the phone.",
  businessDescription:
    "A general and family dental practice in Scarborough serving the Agincourt, Malvern, and Rouge Hill communities. 3 chairs. 2 dentists, 2 hygienists, 2 front desk. Using Dentrix. 45+ patient visits per day. 2,000+ active records. Significant multilingual patient base.",
  problemBody: [
    "19% no-show rate: 8-9 missed appointments per day. At $150-$250 per visit average, over $1,500 per day in empty chair time.",
    "Recall compliance at 64%: over 700 patients overdue for 6-month cleaning. The front desk could contact 15-20 per day between other duties.",
    "Front desk spending 65% of time on phones: booking, confirming, rescheduling, insurance questions, and recall outreach.",
    "Paper intake forms: 15 minutes in waiting room plus 10 minutes of staff transcription. Medical history transcription errors created clinical risk.",
  ],
  beforeMetrics: [
    { label: "No-show rate", value: "19%" },
    { label: "Daily revenue impact", value: "$1,200-$2,250/day" },
    { label: "Recall compliance", value: "64%" },
    { label: "Front desk phone time", value: "65%" },
    { label: "New patient intake", value: "25 min total" },
  ],
  solutionIntro:
    "We deployed a 5-workflow system: dual reminders, 6-month recall campaigns, digital intake, declined treatment follow-up, and post-visit review requests. All integrated with Dentrix. Multilingual communications configured.",
  workflowSteps: [
    {
      id: "recall-trigger",
      label: "6-Month Recall Trigger",
      sublabel: "Dentrix flags patient as due — system takes over from there",
      type: "trigger",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#F59E0B",
    },
    {
      id: "reminders",
      label: "48hr Email + 2hr SMS Reminder",
      sublabel: "Dual-channel appointment reminders with one-tap confirm or reschedule",
      type: "action",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "waitlist-fill",
      label: "Cancellation → Waitlist Auto-Fill",
      sublabel: "Cancelled slot offered to waitlist patients automatically",
      type: "ai",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      color: "#7E0F4A",
    },
    {
      id: "review-request",
      label: "Post-Visit Google Review Request",
      sublabel: "Review request sent 2 hours after appointment completion",
      type: "outcome",
      icon: "M5 13l4 4L19 7",
      color: "#10B981",
    },
  ],
  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Medical history alerts (allergies, conditions, medications) surfaced prominently in Dentrix before any treatment.",
    },
    {
      title: "Retries",
      desc: "Recall delivery failures retried via alternate channel.",
    },
    {
      title: "Approvals",
      desc: "Declined treatment follow-up messaging approved by dentist before activation.",
    },
    {
      title: "Logging",
      desc: "All patient communications logged against record for regulatory compliance.",
    },
    {
      title: "Escalation",
      desc: "Patients reporting pain or emergency symptoms routed immediately to clinical staff.",
    },
  ],
  tools: [
    "Dentrix",
    "Make (Integromat)",
    "Twilio",
    "Google Forms",
    "Typeform",
    "Google Business Profile",
  ],
  results: [
    {
      label: "No-show rate",
      before: "19%",
      after: "8.5% (55% reduction)",
      beforeW: 85,
      afterW: 30,
    },
    {
      label: "Recall compliance",
      before: "64%",
      after: "91% within 4 months",
      beforeW: 50,
      afterW: 85,
    },
    {
      label: "Recall campaign speed",
      before: "15-20 patients/day",
      after: "350 contacted in week 1",
      beforeW: 10,
      afterW: 90,
    },
    {
      label: "Annual revenue recovered",
      before: "N/A",
      after: "$120,000 est.",
      beforeW: 5,
      afterW: 85,
    },
    {
      label: "Google reviews/month",
      before: "2-3",
      after: "12-15",
      beforeW: 15,
      afterW: 80,
    },
  ],
  implementationTimeline: "3 weeks",
  investmentRange: "$6,000–$9,000 CAD",
  payback: "Within first month",
  keyResultCallout:
    "$120,000 in annual revenue recovered. No-shows down 55%. Recall compliance from 64% to 91%. 350 overdue patients contacted in one week (would have taken months manually). Google reviews tripled.",
  whyItMatters:
    "Dental practices have built-in recurring revenue that most never fully capture. Every patient is on a 6-month cycle. Every no-show is a permanent loss. Automation captures both the recurring revenue and the daily utilization that manual processes cannot maintain at scale.",
  whyBullets: [
    "Your no-show rate is above 15%",
    "You have hundreds of patients overdue for recall",
    "Your front desk is spending the majority of their day on the phone",
    "New patients fill paper forms in the waiting room",
    "Declined treatments are never followed up on",
  ],
  crossIndustryItems: [
    { industry: "Dental Offices", note: "Exact scenario." },
    { industry: "Physiotherapy Clinics", note: "Identical no-show and reminder patterns." },
    { industry: "Medical Clinics", note: "Same front desk overload and recall needs." },
    {
      industry: "Veterinary Clinics",
      note: "Vaccination recall structurally identical to dental recall.",
    },
    { industry: "Optometry", note: "Annual exam recall follows same 12-month cycle." },
  ],
  ctaHeadline:
    "Your Recall List Is Revenue Waiting to Be Captured. Your No-Shows Are Revenue Walking Away. Fix Both.",
  ctaBody:
    "The audit analyzes your no-show rate, recall compliance, and front desk utilization. You walk away with a specific revenue recovery projection.",
  internalLinks: [
    { label: "Dental Offices", href: "/industries/dental-offices" },
    { label: "Appointment Automation", href: "/services/appointment-automation" },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "Client Intake Automation", href: "/services/client-intake-automation" },
    { label: "All Case Studies", href: "/case-studies" },
  ],
  color: "#283891",
};

export default function DentalOfficeScarborough() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <CaseStudyPageLayout data={data} />;
}
