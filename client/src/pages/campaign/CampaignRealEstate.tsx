/**
 * CAMPAIGN PAGE: /campaign/real-estate
 * Standalone, noindex, no main nav. Single goal: book audit.
 * Target: GTA real estate agents with cold CRM leads and no follow-up system.
 * Brand: Navy #283891 | Magenta #7E0F4A | Grey #7B7B7B
 */
import { Helmet } from "react-helmet-async";
import {
  CampaignHeader,
  CampaignFooter,
  CampaignCTA,
  CampaignLeadForm,
  CampaignMathItem,
  FadeSection,
  ResponseRaceGraphic,
  BeforeAfterWorkflow,
  RevenueRecoveryMeter,
  ProblemCounterGrid,
  NAVY,
  MAGENTA,
  GREY,
  SUCCESS,
} from "@/components/campaign/CampaignShared";

const UTM = "realestate-march2026";

export default function CampaignRealEstate() {
  return (
    <>
      <Helmet>
        <title>Barrana.ai — Your CRM Is Full of $60,000+ You Are Not Collecting | Vaughan Agents</title>
        <meta
          name="description"
          content="Vaughan real estate agents have 200+ leads sitting cold in their CRM. No follow-up after week 1. Automated drip sequences reactivate dormant leads and capture listings competitors get."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white">
        <CampaignHeader />

        {/* Hero — Navy background */}
        <FadeSection style={{ backgroundColor: NAVY }}>
          <div className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 md:px-6">
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: "rgba(126,15,74,0.3)", color: "#F9A8D4" }}
              >
                For Real Estate Agents &amp; Teams · Vaughan &amp; GTA
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Your CRM Is Full of{" "}
                <span style={{ color: "#EF4444" }}>$60,000+</span>{" "}
                You Are Not Collecting.
                <br />
                <span style={{ color: "#c0ee0e", display: "inline-block", marginTop: "0.15em" }}>
                  Here Is the Fix.
                </span>
              </h1>
              <p className="text-base md:text-lg mt-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                200+ Vaughan and GTA leads sitting cold in your CRM. No follow-up after the first week.
                Every dormant lead is a listing in Woodbridge, Maple, or Concord that went to the agent who stayed in touch.
                Automated follow-up does not forget. You do.
              </p>
              <CampaignCTA utm={UTM} />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Response Race — Portal enquiries */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: NAVY }}>
              The Portal Enquiry Race Vaughan Agents Are Losing Every Weekend
            </h2>
            <p className="text-sm mb-6" style={{ color: GREY }}>
              Buyers in Woodbridge, Maple, and Concord enquire on Realtor.ca at 9pm on a Saturday. The first agent to respond gets the showing.
            </p>
            <ResponseRaceGraphic
              withoutLabel="You (reply Monday morning)"
              withoutTime="36+ Hours"
              withLabel="Barrana Automation"
              withTime="90 Seconds"
              outcomeWithout="Buyer already booked a showing with another agent"
              outcomeWith="Showing booked — buyer is now your client"
            />
          </div>
        </FadeSection>

        {/* Animated: Problem Counter Grid */}
        <FadeSection className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: NAVY }}>
              The Numbers for a Real Estate Team in Vaughan & the GTA
            </h2>
            <p className="text-sm mb-8" style={{ color: GREY }}>Every cold lead in your CRM is a commission sitting uncollected — whether it is a Woodbridge townhouse, a Maple detached, or a Concord condo.</p>
            <ProblemCounterGrid
              stats={[
                { value: 60000, prefix: "$", suffix: "+", label: "200 dormant leads × 2% conversion × $15K commission", icon: "🏠" },
                { value: 45000, prefix: "$", suffix: "/yr", label: "Portal enquiries lost to faster agents after hours", icon: "📱" },
                { value: 5, suffix: " hrs/wk", label: "Manual CRM updates, drip emails, and follow-up management", icon: "⏱️" },
                { value: 12, suffix: " months", label: "Average lead-to-close timeline — manual follow-up dies at week 1", icon: "📅" },
              ]}
            />
            <div className="mt-8 flex flex-col gap-4">
              <CampaignMathItem figure="$60,000+ in unrealised revenue" label="200 dormant leads × 2% conversion rate × $15,000 average commission — sitting in your CRM" />
              <CampaignMathItem figure="$45,000/year" label="After-hours portal enquiries lost to agents who responded in 90 seconds while you were asleep" />
              <CampaignMathItem figure="5-8 hours/week" label="Manual CRM updates, drip emails, and follow-up management — time you could spend on active clients" />
              <CampaignMathItem figure="$105,000+ in recoverable revenue" label="From leads you already have, plus the ones you are about to get" isTotal />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Revenue Recovery Meter */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: NAVY }}>
              How Much Is Recoverable in Your Vaughan Pipeline?
            </h2>
            <RevenueRecoveryMeter
              totalAtRisk="$105,000+ in dormant commissions"
              recoverable="$60,000 – $90,000/year"
              recoverablePercent={70}
              label="Recoverable with Barrana Automation"
            />
          </div>
        </FadeSection>

        {/* Animated: Before / After Workflow */}
        <FadeSection className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: NAVY }}>
              What Changes When You Automate
            </h2>
            <BeforeAfterWorkflow
              title="Your Lead Follow-Up: Before vs. After"
              beforeSteps={[
                { label: "Vaughan buyer enquires at 9pm Saturday", detail: "You see it Monday morning. Buyer already booked with another agent in Woodbridge." },
                { label: "200 leads in CRM — no follow-up after week 1", detail: "You always have a hotter lead to chase. Cold leads go cold forever." },
                { label: "CRM updated manually when you remember", detail: "Gaps in data. No visibility. Leads fall through the cracks." },
              ]}
              afterSteps={[
                { label: "Portal enquiry gets 90-second auto-response", detail: "Personalised SMS + email sent instantly. Showing link included." },
                { label: "12-month automated drip sequence runs for every lead", detail: "Market updates, check-ins, neighbourhood insights — all personalised." },
                { label: "CRM updated automatically from every interaction", detail: "No manual logging. Full pipeline visibility. Nothing falls through." },
              ]}
            />
            <CampaignCTA utm={UTM} />
          </div>
        </FadeSection>

        {/* Proof / Case Study */}
        <FadeSection style={{ backgroundColor: NAVY }}>
          <div className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 md:px-6">
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#F9A8D4" }}>
                  Real Result · Real Estate Team in Vaughan
                </div>
                <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                  "A Vaughan-based team had 200+ leads going cold in their CRM. Nobody was following up
                  beyond the first week because there was always a hotter lead to chase or an active listing
                  to manage."
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
                  "We set up a 12-month automated drip sequence: market updates, neighbourhood insights, and
                  gentle check-ins — all personalised, all automated. Not templates that scream mass email."
                </p>
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: MAGENTA }}>
                  <p className="text-lg font-bold text-white">3 listings from leads dormant for 6-8 months</p>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                    $45,000+ in commissions from leads they already had but were not nurturing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Booking */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>
              Book Your Free Automation Audit
            </h2>
            <p className="text-sm mb-6" style={{ color: GREY }}>60 minutes. You keep the analysis whether or not you hire us.</p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <p className="font-semibold mb-4" style={{ color: NAVY }}>What you get in 60 minutes:</p>
              <ul className="flex flex-col gap-0">
                {[
                  "An assessment of your current CRM and lead pipeline",
                  "How many dormant leads you have and their estimated commission value",
                  "A follow-up automation strategy customised to your market area",
                  "What it would cost to implement (fixed pricing, upfront)",
                  "The full strategy is yours — whether or not you work with us",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-lg flex-shrink-0 mt-0.5" style={{ color: SUCCESS }}>✓</span>
                    <span className="text-base" style={{ color: "#4A4A4A" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </div>
        </FadeSection>

        <CampaignLeadForm industry="Real Estate" utm={UTM} />
        <CampaignFooter />
      </div>
    </>
  );
}
