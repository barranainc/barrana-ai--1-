import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";

const data: IndustryPageData = {
  title: "AI Automation for Medical Clinics Toronto | Barrana.ai",
  description:
    "Automate patient booking, reminders, digital intake, prescription renewal alerts, and follow-up for walk-in and family medicine clinics. Free audit.",
  route: "medical-clinics",
  breadcrumb: "Medical Clinics",
  h1: "Your Waiting Room Is Full but Your Phone Is Ringing. Your Staff Cannot Handle Both. Let Automation Take the Phones.",
  subheadline:
    "Online booking reduces call volume 40-50%. Automated reminders cut no-shows. Digital intake eliminates paper. Prescription renewal reminders keep patients engaged. Lab result follow-up runs systematically.",
  body: [
    "Medical clinics face a unique operational challenge: high patient volume, complex scheduling, regulatory requirements, and a front desk that simultaneously manages check-ins, phone calls, insurance, and intake forms. Something always suffers.",
    "Automation handles the coordination layer — booking, reminding, intake, follow-up — so your staff focuses on the clinical experience that patients value.",
  ],
  ctaMicro: "See how automation reduces your front desk burden. Free audit.",

  costHeading: "What Manual Operations Cost Medical Clinics",
  costItems: [
    {
      figure: "10-20%",
      label: "No-Show Rate",
      desc: "Empty appointment slots that could have served patients from the waitlist or walk-in queue.",
    },
    {
      figure: "60%+",
      label: "Front Desk Phone Time",
      desc: "Booking, confirming, rescheduling, prescription inquiries, lab results. Phones dominate the day.",
    },
    {
      figure: "10-15 min",
      label: "Paper Intake Per New Patient",
      desc: "Forms on clipboards. Staff transcription. Data entry errors. Time wasted on both sides.",
    },
  ],

  problems: [
    {
      title: "Phones Overwhelm the Front Desk",
      desc: "Patients call to book, confirm, ask about prescriptions, and check lab results. During peak hours, calls go to hold or voicemail. Patient experience suffers.",
    },
    {
      title: "No-Shows Waste Provider Time",
      desc: "Scheduled patients do not show. The provider's time is lost. Walk-ins or waitlisted patients who could have filled the slot did not get the chance.",
    },
    {
      title: "Prescription Renewal Communication Is Reactive",
      desc: "Patients run out of medication, call in a panic, and staff scramble. Proactive renewal reminders prevent this cycle.",
    },
    {
      title: "Lab Result Follow-Up Is Inconsistent",
      desc: "Results come back. Some patients are notified promptly. Others wait until their next visit to learn results are available.",
    },
  ],

  beforeAfterMetrics: [
    {
      label: "Phone Booking Volume",
      before: "Dominant, long hold times",
      after: "Reduced 40-50% through online booking",
      beforeW: 88,
      afterW: 45,
    },
    {
      label: "No-Show Rate",
      before: "10-20%",
      after: "5-12% with dual reminders",
      beforeW: 85,
      afterW: 40,
    },
    {
      label: "Patient Intake",
      before: "Paper forms, staff transcription",
      after: "Digital, completed before visit",
      beforeW: 85,
      afterW: 8,
    },
    {
      label: "Prescription Renewals",
      before: "Reactive (patient calls in panic)",
      after: "Proactive 30-day reminders",
      beforeW: 90,
      afterW: 8,
    },
    {
      label: "Lab Follow-Up",
      before: "Inconsistent",
      after: "Systematic notification when ready",
      beforeW: 80,
      afterW: 8,
    },
  ],

  workflowHeading: "Systems We Build for Medical Clinics",
  workflowSteps: [
    { label: "Patient Books Online", type: "trigger" },
    { label: "Digital Intake Sent", type: "action" },
    { label: "48hr Reminder", type: "action" },
    { label: "2hr SMS Reminder", type: "action" },
    { label: "Visit Complete", type: "action" },
    { label: "Rx Renewal Reminder", type: "action" },
    { label: "Lab Notification", type: "outcome" },
  ],
  workflowBadge: "Phone volume reduced 40-50%",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Critical lab results (abnormal flags) trigger immediate physician notification, not standard patient notification flow.",
    },
    {
      title: "Retries",
      desc: "Appointment reminder failures retry through alternate channel before appointment.",
    },
    {
      title: "Approvals",
      desc: "All prescription renewals require physician approval. Automation handles the logistics, not the clinical decision.",
    },
    {
      title: "Logging",
      desc: "All patient communications logged per record for PHIPA compliance and clinical documentation.",
    },
    {
      title: "Escalation",
      desc: "Patients reporting acute symptoms in any communication channel routed immediately to clinical staff.",
    },
  ],

  roiMetrics: [
    { label: "Phone Volume", before: "60%+ of front desk time", after: "Reduced 40-50%" },
    { label: "No-Show Rate", before: "10-20%", after: "5-12%" },
    { label: "Patient Intake", after: "Completed before visit, zero paper" },
    { label: "Prescription Renewals", after: "Proactive, zero panic calls" },
    { label: "Lab Follow-Up", after: "Systematic, zero gaps" },
    { label: "Payback Period", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Family medicine clinics with 30+ scheduled appointments per day",
    "Walk-in clinics with high volume and scheduling complexity",
    "Multi-provider clinics needing provider-specific scheduling",
    "Clinics wanting to reduce front desk phone burden",
  ],
  notFit: [
    "Specialist clinics with referral-only patient flow",
    "Clinics with fewer than 15 appointments per day",
  ],

  aeoQuestion: "How does AI automation help medical clinics?",
  aeoAnswer:
    "AI automation helps medical clinics by enabling online patient booking (reducing phone volume 40-50%), sending dual appointment reminders (cutting no-shows to 5-12%), providing digital intake forms completed before visits, sending proactive prescription renewal reminders, systematically notifying patients when lab results are available, and running post-visit follow-up with care instructions. This allows front desk staff to focus on in-person patient experience rather than phone management.",

  faqItems: [
    {
      question: "EMR integration?",
      answer:
        "We integrate with Oscar, TELUS Health, Accuro, and other Ontario EMR systems.",
    },
    {
      question: "PHIPA compliance?",
      answer:
        "All patient data stays in your clinic's controlled systems. We do not store or access clinical data.",
    },
    {
      question: "Can patients book specific providers?",
      answer:
        "Yes. Booking shows availability per provider, appointment type, and duration.",
    },
    { question: "How long?", answer: "Standard clinic automation: 3-4 weeks." },
    {
      question: "How much?",
      answer: "Medical clinic automation: $5,000-$10,000 CAD.",
    },
    {
      question: "Walk-in queue management?",
      answer:
        "We can implement virtual queue systems where walk-in patients check in online and receive estimated wait times.",
    },
  ],

  ctaHeadline:
    "Your Patients Deserve Better Than Hold Music. Your Staff Deserve Better Than All-Day Phone Duty. Automate the Gap.",
  ctaBody:
    "Walk away with a clear plan for reducing phone volume and no-shows. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Medical Clinics Automation Audit",
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
      desc: "24/7 inbound call handling",
    },
    {
      label: "Client Intake Automation",
      href: "/services/client-intake-automation",
      desc: "Digital intake before the visit",
    },
    {
      label: "Physiotherapy Clinics",
      href: "/industries/physiotherapy-clinics",
      desc: "Same system for physio practices",
    },
    {
      label: "Dental Offices",
      href: "/industries/dental-offices",
      desc: "Recall and no-show automation",
    },
  ],
};

export default function MedicalClinics() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} />;
}
