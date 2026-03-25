import CampaignLayout, { type CampaignPage } from "@/components/campaign/CampaignLayout";

const page: CampaignPage = {
  meta: {
    title: "Barrana.ai \u2014 Your CRM Is Full of Money You Are Not Collecting",
    description:
      "200+ leads sitting cold in your CRM. No follow-up after week 1. Automated drip sequences reactivate dormant leads and capture listings competitors get.",
  },
  utm: "utm_source=email&utm_medium=cold&utm_campaign=realestate-march2026",
  hero: {
    h1Parts: [
      { text: "Your CRM Is Full of Money You Are Not Collecting." },
    ],
    body: "200+ leads sitting cold. No follow-up after the first week. Every dormant lead is a listing that went to the agent who stayed in touch. Automated follow-up does not forget. You do.",
  },
  math: {
    heading: "The Numbers for a Real Estate Team in the GTA",
    items: [
      {
        value: "6-12 months",
        label:
          "Average time for a real estate lead to convert \u2014 manual follow-up dies after week 1",
      },
      {
        value: "$60,000+ in unrealised revenue",
        label:
          "200 dormant leads \u00d7 2% conversion rate \u00d7 $15,000 average commission",
      },
      {
        value: "$0 response after 5pm",
        label:
          "After-hours enquiries from Realtor.ca and Zillow \u2014 lost to faster agents before morning",
      },
      {
        value: "5-8 hours/week",
        label:
          "Manual CRM updates, drip emails, and follow-up management",
      },
    ],
    total: "Every cold lead in your CRM is a commission sitting uncollected",
  },
  fixes: {
    heading: "What Changes When You Automate",
    items: [
      "12-month automated drip sequences \u2014 market updates, neighbourhood insights, and check-ins sent to every lead",
      "Instant response to new portal enquiries \u2014 90 seconds, 24/7, including weekends",
      "CRM updated automatically from every interaction \u2014 no manual logging",
      "Anniversary and milestone outreach \u2014 home purchase anniversaries, market updates, seasonal check-ins",
      "Google Review requests after every closing \u2014 your online presence grows with every deal",
    ],
  },
  proof: {
    heading: "What Happened With a Vaughan Real Estate Team",
    paragraphs: [
      "A Vaughan-based team had 200+ leads going cold in their CRM. Nobody was following up beyond the first week because there was always a hotter lead to chase or an active listing to manage.",
      "We set up a 12-month automated drip sequence: market updates, neighbourhood insights, and gentle check-ins \u2014 all personalised, all automated. Not templates that scream mass email.",
    ],
    result:
      "3 listings came from leads that had been sitting dormant for 6-8 months. At $15,000+ commission per listing, that was $45,000+ from leads they already had but were not nurturing.",
  },
  booking: {
    items: [
      "An assessment of your current CRM and lead pipeline",
      "How many dormant leads you have and their estimated commission value",
      "A follow-up automation strategy customised to your market area",
      "What it would cost to implement (fixed pricing, upfront)",
      "The full strategy is yours \u2014 whether or not you work with us",
    ],
    microcopy: "Zoom or in-person at our Vaughan office. Your choice.",
  },
};

export default function CampaignRealEstate() {
  return <CampaignLayout page={page} />;
}
