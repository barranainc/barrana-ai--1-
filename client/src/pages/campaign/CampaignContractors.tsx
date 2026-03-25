/**
 * CAMPAIGN PAGE: /campaign/contractors
 * Standalone, noindex, no main nav. Single goal: book audit.
 * Target: Vaughan/GTA contractors losing leads to slow response.
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

const UTM = "contractors-march2026";

export default function CampaignContractors() {
  return (
    <>
      <Helmet>
        <title>Barrana.ai — Stop Losing $96,000/Year to Missed Calls | Vaughan Contractors</title>
        <meta
          name="description"
          content="Vaughan contractors lose 8-12 leads per month while on the job. See how 90-second automated response recovers $96,000+ in lost revenue."
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
                For Vaughan & GTA Contractors
              </div>
              {/* Headline: dollar amount prominent gold, "Here Is the Fix." on its own line in magenta */}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                You Are Losing{" "}
                <span style={{ color: "#EF4444" }}>$96,000+</span>{" "}
                Per Year to Missed Calls.
                <br />
                <span style={{ color: "#c0ee0e", display: "inline-block", marginTop: "0.15em" }}>
                  Here Is the Fix.
                </span>
              </h1>
              <p className="text-base md:text-lg mt-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                You are on a job site in Woodbridge or Kleinburg. Your phone rings. You cannot answer.
                By the time you call back, the homeowner already booked someone else.
                This happens <strong className="text-white">8–12 times per month</strong>. At{" "}
                <strong className="text-white">$8,000 to $25,000 per job</strong>, the math is brutal.
              </p>
              <CampaignCTA utm={UTM} />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Response Race Graphic */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: NAVY }}>
              The Race Vaughan Contractors Are Losing Every Day
            </h2>
            <p className="text-sm mb-6" style={{ color: GREY }}>
              Homeowners in Vaughan, Woodbridge, and Maple get 3–5 quotes. The first contractor to respond wins.
              Right now, that is not you.
            </p>
            <ResponseRaceGraphic
              withoutLabel="You (calling back after the job)"
              withoutTime="4+ Hours"
              withLabel="Barrana Automation"
              withTime="90 Seconds"
              outcomeWithout="Homeowner already booked your competitor"
              outcomeWith="Lead qualified, site visit booked automatically"
            />
          </div>
        </FadeSection>

        {/* Animated: Problem Counter Grid */}
        <FadeSection className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: NAVY }}>
              The Numbers for a Typical Vaughan Contractor
            </h2>
            <p className="text-sm mb-8" style={{ color: GREY }}>
              Whether you work in Woodbridge, Maple, Concord, or Kleinburg — every one of these is a system problem, not a you problem.
            </p>
            <ProblemCounterGrid
              stats={[
                { value: 96000, prefix: "$", suffix: "+/yr", label: "Lost to missed & slow lead responses in the GTA", icon: "📞" },
                { value: 100000, prefix: "$", suffix: "/yr", label: "Quotes with zero follow-up — revenue left on table", icon: "📋" },
                { value: 15000, prefix: "$", suffix: "/yr", label: "Invoice delays — cash floating instead of collected", icon: "🧾" },
                { value: 82, suffix: "%", label: "Quote close rate achievable with automated follow-up", icon: "📈" },
              ]}
            />
            <div className="mt-8 flex flex-col gap-4">
              <CampaignMathItem figure="$96,000 – $144,000/year" label="8-12 missed or slow leads per month × $12,000 average job value" />
              <CampaignMathItem figure="$50,000 – $100,000/year" label="40% of quotes get zero follow-up — revenue left on the table" />
              <CampaignMathItem figure="$8,000 – $15,000/year" label="Invoice delays — cash constantly floating instead of collected" />
              <CampaignMathItem figure="$154,000 – $259,000/year" label="in recoverable operational waste" isTotal />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Revenue Recovery Meter */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: NAVY }}>
              How Much Is Recoverable for Your Vaughan Business?
            </h2>
            <RevenueRecoveryMeter
              totalAtRisk="$154,000 – $259,000/year"
              recoverable="$96,000 – $144,000/year"
              recoverablePercent={62}
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
              title="Your Lead Process: Before vs. After"
              beforeSteps={[
                { label: "Lead calls while you're on a roof in Woodbridge", detail: "Goes to voicemail. You see it 4 hours later." },
                { label: "You call back — they don't answer", detail: "They already booked the competitor who responded first." },
                { label: "Quote sent — no follow-up system", detail: "40% of quotes expire with zero follow-up. Revenue gone." },
              ]}
              afterSteps={[
                { label: "Lead calls — auto-response in 90 seconds", detail: "Personalised SMS/email sent instantly, even at 10pm." },
                { label: "Lead qualifies & books site visit automatically", detail: "Calendar link sent. Visit booked without you lifting a finger." },
                { label: "Follow-up at 48hrs, 5 days, 10 days — automatic", detail: "No manual reminders. Every quote gets a full follow-up sequence." },
              ]}
            />
            <CampaignCTA utm={UTM} />
          </div>
        </FadeSection>

        {/* Proof / Case Study */}
        <FadeSection className="py-12 md:py-16" style={{ backgroundColor: NAVY }}>
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#F9A8D4" }}>
                Real Result · Vaughan General Contractor
              </div>
              <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                "A general contractor based in Woodbridge was generating 30+ enquiries per month but closing only 18.
                The problem was not his pricing or his work quality — he does premium renovations across Vaughan, Maple, and Kleinburg.
                It was response time. By the time he called back after a day on site, the homeowner had already booked someone else."
              </p>
              <p className="text-base text-white leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
                "We set up a system that responds to every enquiry in 90 seconds with a personalised message,
                qualifies the lead, and books a site visit — even at 10pm on a Saturday night."
              </p>
              <div
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: MAGENTA }}
              >
                <p className="text-lg font-bold text-white">
                  Quote conversion: 60% → 82%
                </p>
                <p className="text-sm text-white mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                  $24,000+ in new revenue in the first quarter — from leads he was already getting but losing.
                </p>
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
            <p className="text-sm mb-6" style={{ color: GREY }}>
              60 minutes. Zoom or in-person at our Vaughan office (50 Corstate Ave, Unit 01). You keep the analysis whether or not you hire us.
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <p className="font-semibold mb-4" style={{ color: NAVY }}>What you get in 60 minutes:</p>
              <ul className="flex flex-col gap-0">
                {[
                  "A map of exactly where your leads are leaking (with dollar amounts specific to your business)",
                  "Which 1-2 workflows would give you the biggest return if automated",
                  "What it would cost to fix (fixed pricing — you know the number upfront, no surprises)",
                  "The full analysis is yours to keep — whether or not you hire us",
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

        <CampaignLeadForm industry="Contractors" utm={UTM} />
        <CampaignFooter />
      </div>
    </>
  );
}
