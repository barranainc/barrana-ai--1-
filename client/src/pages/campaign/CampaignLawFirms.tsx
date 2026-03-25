import CampaignLayout, { type CampaignPage } from "@/components/campaign/CampaignLayout";

const MAGENTA = "#7E0F4A";

const page: CampaignPage = {
  meta: {
    title: "Barrana.ai \u2014 Your Lawyers Are Doing $400/Hour Data Entry",
    description:
      "Law firms lose $150,000-$250,000 per lawyer per year to non-billable admin. Automation recovers 60% of it without changing your practice management system.",
  },
  utm: "utm_source=email&utm_medium=cold&utm_campaign=law-march2026",
  hero: {
    h1Parts: [
      { text: "Your Lawyers Are Doing " },
      { text: "$400/Hour Data Entry", color: MAGENTA },
      { text: ".\nThat Is the Most Expensive Admin in Your Firm." },
    ],
    body: "Every hour spent on intake forms, document chasing, and billing admin is an hour that does not get billed. At $300 to $500 per hour, the cost of manual operations is not an inconvenience. It is a revenue problem.",
  },
  math: {
    heading: "The Numbers for a Law Firm in the GTA",
    items: [
      {
        value: "$208,000/year per lawyer",
        label:
          "2 hours per day of non-billable admin \u00d7 $400/hour billable rate",
      },
      {
        value: "$1,040,000/year for a 5-lawyer firm",
        label:
          "That is over a million dollars in capacity that never gets billed",
      },
      {
        value: "$312,000/year recoverable",
        label:
          "Even recovering 30% of that admin time back to billable work",
      },
    ],
    total: "Your firm\u2019s single biggest invisible cost",
  },
  fixes: {
    heading: "What Changes When You Automate",
    items: [
      "Matter intake automated \u2014 client submits online, CRM record created, conflict check initiated",
      "Document collection via secure portal with 48-hour auto-reminders until complete",
      "Retainer agreement delivery and e-signature tracking \u2014 no chasing for signatures",
      "Billing triggered on matter events \u2014 invoices go out when work happens, not when someone remembers",
      "Client status updates sent automatically at every case milestone \u2014 fewer \u2018what is happening with my file?\u2019 calls",
    ],
  },
  proof: {
    heading: "What Happened at a GTA Boutique Firm",
    paragraphs: [
      "A boutique law firm handling real estate closings was spending 10+ hours per lawyer per week on intake processing, document chasing for closing packages, retainer tracking, and manual invoice generation.",
      "We automated the coordination layer. Clients submit intake online. Documents are collected via a portal with automatic reminders. Retainer status is tracked and escalated. Invoices trigger on file events.",
    ],
    result:
      "10+ hours per lawyer per week recovered for billable work. Document collection time cut from 3 weeks to 10 days. Same team. Same practice management system. Same caseload \u2014 with significantly more capacity.",
  },
  booking: {
    items: [
      "Your firm\u2019s annual non-billable admin cost calculated (per lawyer, firm-wide)",
      "Which workflows are consuming the most lawyer and paralegal time",
      "A prioritised list of what to automate first for maximum billable hour recovery",
      "What it would cost to implement (fixed pricing, upfront)",
      "The full analysis is yours \u2014 whether or not you engage us",
    ],
  },
};

export default function CampaignLawFirms() {
  return <CampaignLayout page={page} />;
}
