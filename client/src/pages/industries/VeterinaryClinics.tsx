import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";

const data: IndustryPageData = {
  title: "AI Automation for Veterinary Clinics Toronto | Barrana.ai",
  description:
    "Automate pet appointment booking, vaccination reminders, prescription refill alerts, post-surgery follow-up, and Google reviews for veterinary practices. Free audit.",
  route: "veterinary-clinics",
  breadcrumb: "Veterinary Clinics",
  h1: "Fluffy Is Due for Vaccinations. Her Owner Forgot. Your Staff Forgot to Remind Them. Automation Does Not Forget.",
  subheadline:
    "Vaccination and wellness reminders on schedule. Automated booking with confirmations. Prescription refill alerts. Post-surgery follow-up calls your staff does not have to make. Pet birthday greetings that build loyalty.",
  body: [
    "Veterinary clinics share the operational challenges of human healthcare — no-shows, scheduling complexity, phone-heavy front desks — plus unique ones: vaccination schedules, multi-pet households, seasonal parasite prevention, and post-surgical monitoring. All of it managed manually in most practices.",
    "The practices that retain clients long-term are the ones that communicate proactively. Pet owners who receive timely vaccination reminders, refill alerts, and wellness check notifications stay loyal for the life of their pet.",
  ],
  ctaMicro:
    "See how many vaccination and wellness reminders your practice is missing. Free audit.",

  costHeading: "What Manual Operations Cost Veterinary Clinics",
  costItems: [
    {
      figure: "30-40%",
      label: "Pets With Overdue Vaccinations",
      desc: "Annual vaccinations and boosters due. Without reminders, owners forget. Revenue and pet health both suffer.",
    },
    {
      figure: "10-15%",
      label: "No-Show Rate",
      desc: "Pet appointments missed or forgotten. Vet's time wasted. Slot could have served another patient.",
    },
    {
      figure: "Overwhelmed",
      label: "Front Desk Phone Burden",
      desc: "Booking, confirming, prescription inquiries, vaccination questions. Same phone burden as human clinics.",
    },
  ],

  problems: [
    {
      title: "Vaccination and Wellness Reminders Fall Behind",
      desc: "Each pet has a different vaccination schedule. Tracking hundreds of pets and sending timely reminders manually is impossible at scale.",
    },
    {
      title: "No-Shows Waste Vet Time",
      desc: "Pet owners forget appointments. Without reminders, 10-15% of slots go empty.",
    },
    {
      title: "Prescription Refills Are Reactive",
      desc: "Pet runs out of medication. Owner calls in a panic. Staff scramble. Proactive alerts prevent the cycle.",
    },
    {
      title: "Post-Surgery Follow-Up Is Inconsistent",
      desc: "Pets recovering from procedures need check-in calls at 24hr, 3 days, and 7 days. Staff remember some but not all.",
    },
  ],

  beforeAfterMetrics: [
    {
      label: "Vaccination Reminders",
      before: "Manual, 30-40% overdue",
      after: "Automated per pet schedule",
      beforeW: 85,
      afterW: 8,
    },
    {
      label: "No-Show Rate",
      before: "10-15%",
      after: "5-8% with dual reminders",
      beforeW: 82,
      afterW: 38,
    },
    {
      label: "Prescription Refills",
      before: "Reactive (panic calls)",
      after: "Proactive 14-day alerts",
      beforeW: 90,
      afterW: 8,
    },
    {
      label: "Post-Surgery Follow-Up",
      before: "Inconsistent",
      after: "Automated 24hr/3day/7day",
      beforeW: 85,
      afterW: 8,
    },
    {
      label: "Client Retention",
      before: "Dependent on owner memory",
      after: "Systematic lifecycle communication",
      beforeW: 80,
      afterW: 10,
    },
  ],

  workflowHeading: "Systems We Build for Veterinary Clinics",
  workflowSteps: [
    { label: "Vaccination Due (30d)", type: "trigger" },
    { label: "Reminder to Owner", type: "action" },
    { label: "Booking Confirmed", type: "action" },
    { label: "Visit Complete", type: "action" },
    { label: "Post-Surgery Check-In", type: "action" },
    { label: "Rx Refill Alert (14d)", type: "action" },
    { label: "Pet Birthday + Loyalty", type: "outcome" },
  ],
  workflowBadge: "Vaccination compliance: 60% → 90%+",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Post-surgery check-ins where owner reports concerning symptoms (bleeding, lethargy, not eating) trigger immediate clinical team notification.",
    },
    {
      title: "Retries",
      desc: "Vaccination reminder delivery failures retry via alternate channel. No pet falls through the cracks due to a bad email address.",
    },
    {
      title: "Approvals",
      desc: "Prescription refills require vet approval before owner notification. Automation handles logistics, not clinical decisions.",
    },
    {
      title: "Logging",
      desc: "All patient (pet) communications logged per record for veterinary documentation.",
    },
    {
      title: "Escalation",
      desc: "Owners reporting emergency symptoms in any communication routed to emergency protocol immediately.",
    },
  ],

  roiMetrics: [
    { label: "Vaccination Compliance", before: "60%", after: "90%+" },
    { label: "No-Show Rate", before: "10-15%", after: "5-8%" },
    { label: "Prescription Refill Revenue", after: "Proactive capture" },
    { label: "Post-Surgery Follow-Up", after: "100% consistent" },
    { label: "Wellness Revenue", after: "Increased 20-30%" },
    { label: "Payback Period", after: "Within first month" },
  ],
  roiNote:
    "These are typical outcomes. The Automation Audit provides a projection for your specific business.",

  bestFit: [
    "Veterinary practices seeing 20+ patients per day",
    "Multi-vet clinics with scheduling complexity",
    "Practices with 500+ active pet patients",
    "Clinics wanting to grow wellness revenue",
  ],
  notFit: [
    "Emergency-only veterinary hospitals",
    "Solo vets seeing fewer than 10 patients per day",
  ],

  aeoQuestion: "How does AI automation help veterinary clinics?",
  aeoAnswer:
    "AI automation helps veterinary clinics by sending vaccination and wellness reminders on each pet's individual schedule, providing appointment booking with dual reminders to reduce no-shows to 5-8%, alerting pet owners 14 days before prescription refills run out, running post-surgery check-in sequences at 24 hours, 3 days, and 7 days, and building client loyalty through pet birthday greetings and wellness offers. This increases vaccination compliance to 90%+, recovers no-show revenue, and retains clients through systematic lifecycle communication.",

  faqItems: [
    {
      question: "Which veterinary software?",
      answer:
        "We integrate with Cornerstone, AVImark, eVetPractice, Digitail, and other practice management systems.",
    },
    {
      question: "Multi-pet households?",
      answer:
        "Yes. Consolidated reminders for households with multiple pets. One email covering all pets due for services.",
    },
    {
      question: "Pet birthday greetings: really?",
      answer:
        "Yes, and they work remarkably well. Pet owners have strong emotional connections. A birthday greeting builds loyalty that lasts the pet's lifetime.",
    },
    {
      question: "How long?",
      answer: "Standard veterinary automation: 2-3 weeks.",
    },
    {
      question: "How much?",
      answer: "Veterinary clinic automation: $4,000-$8,000 CAD.",
    },
    {
      question: "Seasonal parasite prevention?",
      answer:
        "Yes. Seasonal campaigns (spring flea/tick, heartworm) automated to all eligible patients.",
    },
  ],

  ctaHeadline:
    "Every Missed Vaccination Is Revenue Lost and a Pet Unprotected. Automate the Reminders.",
  ctaBody:
    "Walk away with a clear plan for 90%+ vaccination compliance and zero missed follow-ups. Free. No pitch. No obligation.",
  primaryCTA: "Get Your Free Veterinary Clinics Automation Audit",
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
      label: "Medical Clinics",
      href: "/industries/medical-clinics",
      desc: "Family medicine automation",
    },
    {
      label: "Dental Offices",
      href: "/industries/dental-offices",
      desc: "Recall and no-show automation",
    },
  ],
};

export default function VeterinaryClinics() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return <IndustryPageLayout data={data} />;
}
