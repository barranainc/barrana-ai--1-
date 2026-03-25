import CampaignLayout, { type CampaignPage } from "@/components/campaign/CampaignLayout";

const MAGENTA = "#7E0F4A";

const page: CampaignPage = {
  meta: {
    title: "Barrana.ai \u2014 Stop Losing $96,000/Year to Missed Calls",
    description:
      "Vaughan contractors lose 8-12 leads per month while on the job. See how 90-second automated response recovers $96,000+ in lost revenue.",
  },
  utm: "utm_source=email&utm_medium=cold&utm_campaign=contractors-march2026",
  hero: {
    h1Parts: [
      { text: "You Are Losing " },
      { text: "$96,000+ Per Year", color: MAGENTA },
      { text: " to Missed Calls.\nHere Is the Fix." },
    ],
    body: "You are on a job site. Your phone rings. You cannot answer. By the time you call back, the homeowner already booked someone else. This happens 8-12 times per month. At $8,000 to $25,000 per job, the math is brutal.",
  },
  math: {
    heading: "The Numbers for a Typical Contractor in Vaughan",
    items: [
      {
        value: "$96,000 \u2013 $144,000/year",
        label:
          "8-12 missed or slow leads per month \u00d7 $12,000 average job value",
      },
      {
        value: "$50,000 \u2013 $100,000/year",
        label:
          "40% of quotes get zero follow-up \u2014 revenue left on the table",
      },
      {
        value: "$8,000 \u2013 $15,000/year",
        label:
          "Invoice delays \u2014 cash constantly floating instead of collected",
      },
    ],
    total: "$154,000 \u2013 $259,000/year in recoverable operational waste",
  },
  fixes: {
    heading: "What Changes When You Automate",
    items: [
      "Every enquiry gets a response in under 90 seconds \u2014 even when you are on a roof",
      "After-hours and weekend calls are captured and qualified automatically",
      "Every quote gets a follow-up at 48 hours, 5 days, and 10 days \u2014 no manual reminders",
      "Invoices go out the day the job completes \u2014 not 2 weeks later when you remember",
      "Google Review requests are sent after every completed project \u2014 your reputation grows on autopilot",
    ],
  },
  proof: {
    heading: "What Happened When a Mississauga Contractor Fixed This",
    paragraphs: [
      "A general contractor generating 30+ enquiries per month was closing only 18. The problem was not his pricing or his work quality. It was response time. By the time he called back after a day on site, the homeowner had already booked someone else.",
      "We set up a system that responds to every enquiry in 90 seconds with a personalised message, qualifies the lead, and books a site visit \u2014 even at 10pm on a Saturday. His team did not change. His tools did not change.",
    ],
    result:
      "Quote conversion went from 60% to 82%. That was $24,000+ in new revenue in the first quarter alone \u2014 from leads he was already getting but losing.",
  },
  booking: {
    items: [
      "A map of exactly where your leads are leaking (with dollar amounts)",
      "Which 1-2 workflows would give you the biggest return if automated",
      "What it would cost to fix (fixed pricing, you know the number upfront)",
      "The full analysis is yours to keep \u2014 whether or not you hire us",
    ],
    microcopy: "Zoom or in-person at our Vaughan office. Your choice.",
  },
};

export default function CampaignContractors() {
  return <CampaignLayout page={page} />;
}
