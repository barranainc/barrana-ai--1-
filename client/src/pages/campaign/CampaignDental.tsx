import CampaignLayout, { type CampaignPage } from "@/components/campaign/CampaignLayout";

const MAGENTA = "#7E0F4A";

const page: CampaignPage = {
  meta: {
    title: "Barrana.ai \u2014 Your Empty Chairs Cost $150,000+ Per Year",
    description:
      "Dental clinics with a 20% no-show rate lose $250,000/year in empty chairs. Dual reminders and recall automation recover most of it.",
  },
  utm: "utm_source=email&utm_medium=cold&utm_campaign=dental-march2026",
  hero: {
    h1Parts: [
      { text: "Your Empty Chairs Are Costing You " },
      { text: "$150,000+ Per Year", color: MAGENTA },
      { text: ".\nHere Is How to Fill Them." },
    ],
    body: "A 20% no-show rate at $200 per visit. 300 patients overdue for recall. After-hours enquiries going to voicemail. This is revenue that belongs to your practice \u2014 it is just not being captured.",
  },
  math: {
    heading: "The Numbers for a Dental Practice in York Region",
    items: [
      {
        value: "$250,000/year",
        label:
          "20% no-show rate \u00d7 $200/visit \u00d7 25 patients per day \u2014 empty chairs every single day",
      },
      {
        value: "$60,000/year",
        label:
          "300 overdue recall patients \u00d7 $200 \u2014 sitting in a list nobody is calling through",
      },
      {
        value: "$36,000 \u2013 $72,000/year",
        label:
          "After-hours enquiries lost to voicemail \u2014 new patients going to the clinic that answered",
      },
      {
        value: "$31,200/year",
        label:
          "Front desk spending 12 hours per week on phone booking and manual reminders",
      },
    ],
    total: "$377,000/year at risk",
  },
  fixes: {
    heading: "What Changes When You Automate",
    items: [
      "Dual appointment reminders (48-hour email + 2-hour SMS) reduce no-shows to 8-12%",
      "Cancellations are automatically offered to waitlisted patients \u2014 slots fill without a phone call",
      "Automated recall campaigns reach overdue patients with a direct booking link \u2014 no more call lists",
      "After-hours AI receptionist answers calls, qualifies enquiries, and books appointments at 11pm",
      "New patient intake forms are delivered digitally before the first visit \u2014 no clipboard in the waiting room",
      "Google Review requests go out after every positive visit \u2014 your online reputation grows automatically",
    ],
  },
  proof: {
    heading: "What Happened at a Richmond Hill Clinic",
    paragraphs: [
      "A multi-practitioner clinic with a 22% no-show rate implemented dual reminders and waitlist auto-fill. The front desk stopped making reminder calls. The system handled it.",
    ],
    result:
      "No-shows dropped to 13.6%. Revenue recovered: $85,000 per year from chairs that were sitting empty. Hygiene schedule filled 60-70% of cancellation slots automatically.",
  },
  booking: {
    items: [
      "Your exact no-show cost calculated (per day, per week, per year)",
      "Your recall list value \u2014 how much revenue is sitting dormant",
      "Your after-hours booking opportunity \u2014 leads you are currently losing",
      "What it would cost to fix (fixed pricing, upfront)",
      "The full analysis is yours \u2014 whether or not you hire us",
    ],
  },
};

export default function CampaignDental() {
  return <CampaignLayout page={page} />;
}
