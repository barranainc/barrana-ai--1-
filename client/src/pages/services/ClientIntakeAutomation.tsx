/**
 * ClientIntakeAutomation.tsx
 * Route: /services/client-intake-automation
 * Meta description: Automate client intake for your professional firm. AI collects, qualifies,
 * categorizes, and routes new clients in under 5 minutes. Works with your existing CRM.
 */

import { useEffect } from "react";
import ServicePageLayout, { ServicePageData } from "@/components/service/ServicePageLayout";
import ClientIntakeHeroVisual from "@/components/hero-visuals/ClientIntakeHeroVisual";

const data: ServicePageData = {
  title: "Client Intake Automation | 45 Minutes to Under 5 | Barrana.ai",
  description:
    "Automate client intake for your professional firm. AI collects, qualifies, categorizes, and routes new clients in under 5 minutes. Works with your existing CRM.",

  breadcrumb: "Client Intake Automation",
  h1: "Your Intake Process Takes 45 Minutes Per Client. This System Reduces It to Under 5.",
  subheadline:
    "Client intake automation collects information, qualifies the inquiry, categorizes it by type, creates a CRM record, assigns it to the right person, and books the consultation. All before your team touches anything.",
  body: [
    "Every new client inquiry follows the same pattern: someone on your team collects basic information over the phone, types it into a CRM, figures out which team member should handle it, sends a confirmation, and schedules the first meeting. That takes 30–45 minutes and happens differently every time depending on who handles it.",
    "The entire sequence is automatable. The AI handles the intake. Your team handles the expertise.",
  ],
  ctaMicro: "See how your intake process looks before and after automation. Free audit.",

  costHeading: "What Manual Intake Is Costing You",
  costItems: [
    {
      figure: "30–45 min",
      label: "Per New Client",
      desc: "Multiplied by 40 inquiries per month, that is 20–30 hours of staff time per month on data collection that requires no expertise.",
    },
    {
      figure: "0%",
      label: "Evening Inquiries Captured",
      desc: "Prospects researching at 8pm get no response until 9am. By then, they have already reached out to 2–3 other firms.",
    },
    {
      figure: "Variable",
      label: "First Impression Quality",
      desc: "Intake quality depends on who answers the phone. Some clients get a professional experience. Others get a rushed callback.",
    },
  ],

  beforeAfterMetrics: [
    { label: "Intake Time", before: "30–45 min/client", after: "Under 5 min review", beforeW: 90, afterW: 10 },
    { label: "Evening Inquiries", before: "No response till AM", after: "24/7 instant response", beforeW: 100, afterW: 5 },
    { label: "Data Quality", before: "Varies by handler", after: "100% structured", beforeW: 70, afterW: 8 },
    { label: "Routing", before: "Manual decision", after: "Automatic by type", beforeW: 80, afterW: 8 },
    { label: "Client Experience", before: "Delayed, unclear", after: "Instant + checklist", beforeW: 85, afterW: 10 },
  ],

  workflowSteps: [
    { label: "Inquiry Arrives", type: "trigger" },
    { label: "AI Responds (90s)", type: "ai" },
    { label: "AI Categorizes", type: "ai" },
    { label: "CRM Record", type: "action" },
    { label: "Team Assigned", type: "action" },
    { label: "Client Confirmed", type: "action" },
    { label: "Consultation Booked", type: "outcome" },
  ],
  workflowBadge: "Intake: 45 min → Under 5 min",

  controlItems: [
    {
      title: "Stop-Loss",
      desc: "Unrecognized inquiry types are flagged for human review rather than auto-categorized. The system never guesses on ambiguous cases.",
    },
    {
      title: "Retries",
      desc: "Form submission failures trigger backup email collection with manual entry fallback. No inquiry is lost to a technical glitch.",
    },
    {
      title: "Approvals",
      desc: "High-complexity cases can require manager approval before team member assignment.",
    },
    {
      title: "Logging",
      desc: "Full intake transcript stored against the CRM record. Complete audit trail of every question asked and answer received.",
    },
    {
      title: "Escalation",
      desc: "Inquiries mentioning urgent deadlines or emergency situations route to a priority queue with immediate staff notification.",
    },
  ],

  roiMetrics: [
    { label: "Intake Time", before: "45 minutes", after: "Under 5 minutes" },
    { label: "Staff Hours/Week", before: "20–30 on intake", after: "Recovered for clients" },
    { label: "Lead Response", before: "Same day", after: "Under 3 minutes" },
    { label: "Client Capacity", before: "Current", after: "+20–30% same team" },
    { label: "Typical Payback", after: "Within first billing cycle" },
  ],
  roiNote:
    "These are typical outcome scenarios. The Automation Audit provides a projection specific to your business.",

  bestFit: [
    "Professional firms (immigration, law, accounting) handling 20+ new inquiries per month",
    "Multi-practitioner firms where routing matters",
    "Businesses where intake quality directly affects client experience",
    "Firms experiencing evening inquiry volume they cannot capture",
  ],
  notFit: [
    "Businesses with fewer than 10 new inquiries per month",
    "Solo practitioners who prefer to personally handle every first contact",
  ],

  aeoQuestion: "What is client intake automation?",
  aeoAnswer:
    "Client intake automation uses software to collect, qualify, categorize, and route new client information into business systems without manual data entry. When a prospect reaches out, an automated intake system gathers details through structured questions, creates a complete CRM record, categorizes the inquiry by type, assigns it to the appropriate team member, and sends the client a confirmation with next steps. The process completes in minutes instead of the 30–45 minutes typical of manual intake.",

  faqItems: [
    {
      question: "Can this handle multiple service types?",
      answer:
        "Yes. The system uses branching logic to ask different qualifying questions based on the service type selected, routing each to the appropriate workflow.",
    },
    {
      question: "Does it replace the initial consultation?",
      answer:
        "No. It replaces the administrative work before the consultation: collecting information, categorizing, creating records, scheduling. The professional consultation remains human-led.",
    },
    {
      question: "Will it work with my existing CRM?",
      answer:
        "Yes. We integrate with HubSpot, Go High Level, Zoho, Salesforce, Clio, and custom CRMs. If you use spreadsheets, we can migrate you to a CRM as part of implementation.",
    },
    {
      question: "Can the intake handle multiple languages?",
      answer:
        "Yes. We configure intake for English, French, and other languages your practice serves.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Standard intake automation: 3–4 weeks including questionnaire design, AI categorization logic, CRM integration, and testing.",
    },
    {
      question: "What about PIPEDA compliance?",
      answer:
        "All client data stays within your controlled systems. We document every data flow and build with Canadian privacy requirements in mind.",
    },
  ],

  ctaHeadline: "Your Intake Process Is Your Client's First Impression. Make It Instant.",
  ctaBody:
    "The audit maps your current intake workflow and shows you exactly where time is being lost and how to recover it.",

  internalLinks: [
    {
      label: "Document Collection Automation",
      href: "/services/document-collection",
      desc: "Automate what comes after intake",
    },
    {
      label: "Lead Response Automation",
      href: "/services/lead-response-automation",
      desc: "Capture leads before intake",
    },
    {
      label: "Immigration Automation",
      href: "/industries/immigration-consultants",
      desc: "Immigration-specific intake workflows",
    },
    {
      label: "Law Firm Automation",
      href: "/industries/law-firms",
      desc: "Law firm intake automation",
    },
  ],
};

export default function ClientIntakeAutomation() {
  useEffect(() => {
    document.title = data.title;
  }, []);

  return <ServicePageLayout data={data} heroVisual={<ClientIntakeHeroVisual />} />;
}
