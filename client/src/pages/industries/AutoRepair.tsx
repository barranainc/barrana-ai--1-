import { useEffect } from "react";
import IndustryPageLayout, { IndustryPageData } from "@/components/industry/IndustryPageLayout";
import IndustryPlannerCTA from "@/components/planner-cta/IndustryPlannerCTA";

const data: IndustryPageData = {
  title: "AI Automation for Auto Repair Shops Toronto | Barrana.ai",
  description:
    "Automate service reminders, appointment booking, estimate follow-up, invoicing, and review requests for auto repair and service shops. Free audit.",
  route: "auto-repair",
  breadcrumb: "Auto Repair Shops",
  h1: "Your Customers Need Oil Changes Every 5,000 km. Nobody Is Tracking Any of It.",
  subheadline:
    "Mileage and time-based service reminders. Automated booking. Estimate follow-up for declined services. Invoice on completion. Google review requests. Seasonal tire change campaigns.",
  body: [
    "Auto repair shops have a built-in recurring revenue model that most never fully capture. Every vehicle needs regular maintenance: oil changes, brake inspections, tire rotations, seasonal swaps, and scheduled services. But most shops only see customers when something breaks because nobody sent the reminder.",
    "The shops that grow fastest treat maintenance reminders as a revenue system, not an afterthought. Automation sends the right reminder to the right customer at the right time, every time.",
  ],
  ctaText: "Get Your Free Auto Repair Shops Automation Audit",
  ctaMicro: "See how much maintenance revenue your shop is leaving on the table. Free audit.",

  costHeading: "What Manual Operations Cost Auto Repair Shops",
  costItems: [
    {
      figure: "40-50%",
      label: "Customers Overdue",
      desc: "Vehicles due for oil changes, brake inspections, and seasonal services who never get reminded. They go to whoever is convenient when they finally remember.",
    },
    {
      figure: "0%",
      label: "Declined Service Follow-Up",
      desc: "Customer declines brake service during oil change. No follow-up ever happens. Customer gets brakes done at another shop months later.",
    },
    {
      figure: "0",
      label: "Seasonal Campaigns Run",
      desc: "Tire swap season arrives. You mean to send a campaign to 200 customers. It never gets done because you are busy running the shop.",
    },
  ],

  problems: [
    {
      title: "No Maintenance Tracking System",
      desc: "Each vehicle has different service intervals. Without a system, reminders depend on customers remembering, which they do not.",
    },
    {
      title: "Declined Service Follow-Up Never Happens",
      desc: "Technician recommends brake pads. Customer says 'next time.' Nobody follows up. Customer gets it done elsewhere.",
    },
    {
      title: "Seasonal Campaigns Are Always Too Late",
      desc: "Tire swap season. Winter prep. Summer AC checks. By the time you run the campaign manually, the season has started and slots are full.",
    },
    {
      title: "Estimates Get No Follow-Up",
      desc: "Customer gets an estimate for major repair. They want to think about it. Nobody follows up. They call another shop.",
    },
    {
      title: "Reviews Rarely Requested",
      desc: "Happy customers would leave reviews but nobody asks. Your Google profile stays stagnant while competitors grow their ratings.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Service reminders", before: "None — customer remembers or does not", after: "Automated by mileage estimate and time", beforeW: 90, afterW: 15 },
    { label: "Declined service follow-up", before: "Zero follow-up", after: "30-day and 60-day automated sequence", beforeW: 85, afterW: 10 },
    { label: "Seasonal campaigns", before: "Manual, usually late or skipped", after: "Automated 4 weeks before each season", beforeW: 80, afterW: 20 },
    { label: "Estimate follow-up", before: "Depends on who remembers", after: "48hr / 7d / 14d automated sequence", beforeW: 75, afterW: 15 },
    { label: "Google review requests", before: "Rarely requested", after: "Automatic after every completed service", beforeW: 85, afterW: 10 },
  ],

  workflowHeading: "Systems We Build for Auto Repair Shops",
  workflowSteps: [
    {
      id: "reminder",
      label: "Service Reminder",
      sublabel: "Mileage + time",
      type: "trigger",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#F59E0B",
    },
    {
      id: "book",
      label: "Booking Link",
      sublabel: "One-click",
      type: "action",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      color: "#283891",
    },
    {
      id: "service",
      label: "Service Performed",
      sublabel: "Technician logs",
      type: "action",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      color: "#283891",
    },
    {
      id: "invoice",
      label: "Invoice Sent",
      sublabel: "Auto-generated",
      type: "action",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#283891",
    },
    {
      id: "review",
      label: "Review Request",
      sublabel: "2hr after invoice",
      type: "outcome",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
      color: "#10B981",
    },
  ],
  workflowBadge: "Maintenance Revenue Recovered",

  controlItems: [
    { title: "Stop-Loss", desc: "Safety-critical declined services (brakes, tires, steering) flagged with higher urgency in follow-up sequence." },
    { title: "Retries", desc: "Reminder delivery failures retry via alternate channel. No customer falls through on a bad email address." },
    { title: "Approvals", desc: "Seasonal campaign pricing and promotions require manager approval before distribution." },
    { title: "Logging", desc: "All service history, recommendations, and communications logged per vehicle and per customer." },
    { title: "Escalation", desc: "Vehicles with safety-critical overdue services flagged for shop manager awareness." },
  ],

  roiMetrics: [
    { label: "Maintenance revenue", before: "40-50% of customers overdue", after: "Increased 25-40% through systematic reminders" },
    { label: "Declined service recovery", before: "0% follow-up", after: "15-25% converted through 30/60-day sequence" },
    { label: "Seasonal booking", before: "Last-minute rush", after: "Filled 4 weeks in advance" },
    { label: "Estimate conversion", before: "Memory-dependent", after: "Improved through consistent 48hr/7d/14d follow-up" },
    { label: "Google reviews", before: "Rarely requested", after: "Consistent automatic requests every service" },
    { label: "Typical payback", after: "Within first month" },
  ],
  roiNote: "These are typical outcomes. The Automation Audit provides a projection for your specific shop.",

  bestFit: [
    "Auto repair shops with 200+ active customers",
    "Shops offering scheduled maintenance services",
    "Tire shops with seasonal swap programs",
    "Multi-bay shops wanting to optimize utilization",
  ],
  notFit: [
    "Shops focused exclusively on collision/body work",
    "New shops without an existing customer base to remind",
  ],

  aeoQuestion: "How does AI automation help auto repair shops?",
  aeoAnswer:
    "AI automation helps auto repair shops by sending maintenance reminders based on estimated mileage intervals and time since last service, following up on declined service recommendations at 30 and 60 days, running seasonal campaigns (tire swaps, winter prep, AC checks) 4 weeks before each season, automating estimate follow-up at 48 hours, 7 days, and 14 days, and requesting Google reviews after every completed service. This captures maintenance revenue that would otherwise go to competitors when customers finally remember they need service.",

  faqItems: [
    {
      question: "Which shop management software?",
      answer: "We integrate with Mitchell 1, Shop-Ware, Tekmetric, AutoFluent, and other shop management systems.",
    },
    {
      question: "How does mileage estimation work?",
      answer: "Based on average annual mileage per customer (configurable) and date of last service. Increasingly accurate over time as service history builds.",
    },
    {
      question: "Can it handle fleet accounts?",
      answer: "Yes. Fleet vehicles tracked individually with fleet manager receiving consolidated reports and reminders.",
    },
    {
      question: "How long does implementation take?",
      answer: "Standard auto repair automation: 2-3 weeks.",
    },
    {
      question: "How much does it cost?",
      answer: "Auto repair shop automation: $3,000-$6,000 CAD. Maintenance reminder revenue alone typically exceeds investment within first month.",
    },
    {
      question: "Seasonal campaigns to how many customers?",
      answer: "We have run seasonal campaigns to 500+ customers. System handles any volume.",
    },
  ],

  ctaHeadline: "Every Vehicle in Your System Needs Regular Maintenance. Every Customer Forgets. Automate the Reminder That Brings Them Back.",
  ctaBody: "Walk away with a clear plan for recovering maintenance revenue. No pitch. No obligation.",
  primaryCTA: "Get Your Free Auto Repair Shops Automation Audit",
  primaryMicro: "Free 60-minute audit. See exactly what to automate first.",

  internalLinks: [
    { label: "Appointment Automation", href: "/services/appointment-automation", desc: "Book, confirm, and remind automatically" },
    { label: "Lead Response Automation", href: "/services/lead-response-automation", desc: "Respond to every inquiry in under 90 seconds" },
    { label: "Invoice Automation", href: "/services/invoice-automation", desc: "Invoices sent on job completion, payments tracked" },
    { label: "Contractors", href: "/industries/contractors", desc: "Similar automation for trades businesses" },
    { label: "Home Services", href: "/industries/home-services", desc: "HVAC, plumbing, electrical automation" },
    { label: "Case Studies", href: "/case-studies", desc: "Real results from real businesses" },
  ],
};

export default function AutoRepair() {
  useEffect(() => {
    document.title = data.title;
  }, []);
  return (
    <IndustryPageLayout data={data}>
      <IndustryPlannerCTA industryName="Auto Repair" industrySlug="contractor" />
    </IndustryPageLayout>
  );
}
