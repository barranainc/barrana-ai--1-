/**
 * CAMPAIGN PAGE: /campaign/law-firms
 * Standalone, noindex, no main nav. Single goal: book audit.
 * Target: Small law firms in GTA losing clients to slow intake and manual follow-up.
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

const UTM = "lawfirms-march2026";

export default function CampaignLawFirms() {
  return (
    <>
      <Helmet>
        <title>Barrana.ai - Law Firms Are Losing $120,000+ Per Year to Slow Intake | Vaughan</title>
        <meta
          name="description"
          content="Small law firms in Vaughan and the GTA lose $120,000+ per year to slow intake, manual document collection, and missed follow-up. See how automation fixes it."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="campaign-page min-h-screen flex flex-col bg-white">
        <CampaignHeader />

        {/* Hero - Navy background */}
        <FadeSection style={{ backgroundColor: NAVY }}>
          <div className="py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 md:px-6">
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: "rgba(126,15,74,0.3)", color: "#F9A8D4" }}
              >
                For Small Law Firms · Vaughan &amp; GTA
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Your Intake Process Is Costing You{" "}
                <span style={{ color: "#EF4444" }}>$120,000+</span>{" "}
                Per Year.
                <br />
                <span style={{ color: "#c0ee0e", display: "inline-block", marginTop: "0.15em" }}>
                  Here Is the Fix.
                </span>
              </h1>
              <p className="text-base md:text-lg mt-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                A prospective client in Vaughan or Woodbridge fills out your contact form at 9pm. You see it at 9am.
                By then, they have already spoken to two other firms. This happens every week.
                The fix takes 90 seconds to deploy.
              </p>
              <CampaignCTA utm={UTM} />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Response Race */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: NAVY }}>
              The Intake Race Vaughan Law Firms Are Losing Every Week
            </h2>
            <p className="text-sm mb-6" style={{ color: GREY }}>
              Prospective clients in Vaughan, Woodbridge, and Maple contact 3–5 firms at once. The first to respond gets the retainer.
            </p>
            <ResponseRaceGraphic
              withoutLabel="Your Firm (email reply next morning)"
              withoutTime="12+ Hours"
              withLabel="Barrana Automation"
              withTime="90 Seconds"
              outcomeWithout="Prospect retained by the firm that responded first"
              outcomeWith="Intake form sent, consultation booked automatically"
            />
          </div>
        </FadeSection>

        {/* Animated: Problem Counter Grid */}
        <FadeSection className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: NAVY }}>
              The Numbers for a Small Law Firm in Vaughan & the GTA
            </h2>
            <p className="text-sm mb-8" style={{ color: GREY }}>Whether your firm is in Vaughan, Woodbridge, Concord, or Maple - every lost client is a system problem, not a quality problem.</p>
            <ProblemCounterGrid
              stats={[
                { value: 120000, prefix: "$", suffix: "/yr", label: "Lost to slow intake - clients going to faster firms", icon: "⚖️" },
                { value: 48000, prefix: "$", suffix: "/yr", label: "Paralegal time on document chasing & manual follow-up", icon: "📄" },
                { value: 36000, prefix: "$", suffix: "/yr", label: "Unbilled hours - time tracking gaps in manual systems", icon: "⏱️" },
                { value: 85, suffix: "%", label: "Intake conversion rate achievable with automated follow-up", icon: "📈" },
              ]}
            />
            <div className="mt-8 flex flex-col gap-4">
              <CampaignMathItem figure="$120,000 – $180,000/year" label="4-6 lost clients per month × $2,500 average retainer - gone to the firm that responded first" />
              <CampaignMathItem figure="$48,000/year" label="Paralegal spending 20+ hours per week chasing documents, sending reminders, and managing intake manually" />
              <CampaignMathItem figure="$36,000/year" label="Unbilled hours - time tracking gaps in manual systems that never make it to an invoice" />
              <CampaignMathItem figure="$204,000/year at risk" label="Total operational revenue at risk from manual processes" isTotal />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Revenue Recovery Meter */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: NAVY }}>
              How Much Is Recoverable for Your Vaughan Firm?
            </h2>
            <RevenueRecoveryMeter
              totalAtRisk="$204,000/year at risk"
              recoverable="$120,000 – $150,000/year"
              recoverablePercent={65}
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
              title="Your Client Intake: Before vs. After"
              beforeSteps={[
                { label: "Enquiry arrives at 9pm - nobody responds", detail: "You see it at 9am. Prospect has already spoken to 2 other firms." },
                { label: "Intake form emailed manually - 2 days later", detail: "Paralegal sends form. Client doesn't reply. Nobody follows up." },
                { label: "Documents collected over 3 weeks by email", detail: "Back-and-forth. Missing items. Delays. Paralegal time wasted." },
              ]}
              afterSteps={[
                { label: "Enquiry triggers 90-second auto-response", detail: "Personalised email sent immediately. Consultation link included." },
                { label: "Intake form delivered automatically", detail: "Client completes digital intake before the first call. No paper." },
                { label: "Document checklist sent with auto-reminders", detail: "Missing items chased automatically. File complete before billing starts." },
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
                  Real Result · Immigration Law Firm · Vaughan / GTA
                </div>
                <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                  "An immigration law firm serving clients across Vaughan, Woodbridge, and the broader GTA was receiving 80+ enquiries per month but converting
                  only 35. The intake process took 5-7 days. Documents arrived late or incomplete. Paralegals
                  spent 25 hours per week on admin."
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
                  "We automated the enquiry response, the intake form delivery, and the document collection
                  sequence. Intake time dropped from 5 days to 48 hours. Paralegals were freed for billable work."
                </p>
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: MAGENTA }}>
                  <p className="text-lg font-bold text-white">Conversion rate: 44% → 71%</p>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                    $67,000 in additional retained revenue in the first quarter. Paralegal admin hours cut by 60%.
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
                  "A map of exactly where your intake is leaking clients (with dollar amounts)",
                  "Which 1-2 workflows would give you the biggest return if automated",
                  "What it would cost to fix (fixed pricing, you know the number upfront)",
                  "The full analysis is yours to keep - whether or not you hire us",
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

        <CampaignLeadForm industry="Law Firms" utm={UTM} />
        <CampaignFooter />
      </div>
    </>
  );
}
