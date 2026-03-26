/**
 * CAMPAIGN PAGE: /campaign/dental
 * Standalone, noindex, no main nav. Single goal: book audit.
 * Target: Dental practices in Vaughan / York Region losing revenue to no-shows & missed recall.
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

const UTM = "dental-march2026";

export default function CampaignDental() {
  return (
    <>
      <Helmet>
        <title>Barrana.ai — Your Empty Chairs Cost $150,000+ Per Year | Vaughan Dental</title>
        <meta
          name="description"
          content="Dental practices in Vaughan and York Region lose $377,000/year to no-shows, missed recall, and after-hours voicemail. See how automation fills your chairs."
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
                For Dental Practices · Vaughan &amp; York Region
              </div>
              {/* Headline: dollar amount prominent gold, "Here Is How to Fill Them." on its own line in magenta */}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Your Empty Chairs Are Costing You{" "}
                <span style={{ color: "#EF4444" }}>$150,000+</span>{" "}
                Per Year.
                <br />
                <span style={{ color: "#c0ee0e", display: "inline-block", marginTop: "0.15em" }}>
                  Here Is How to Fill Them.
                </span>
              </h1>
              <p className="text-base md:text-lg mt-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                A 20% no-show rate at $200 per visit. 300 patients overdue for recall.
                After-hours enquiries from Vaughan and Woodbridge families going to voicemail.
                This is revenue that belongs to your practice — it is just not being captured.
              </p>
              <CampaignCTA utm={UTM} />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Response Race — After-hours leads */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: NAVY }}>
              After-Hours Enquiries: The Race Vaughan Clinics Are Losing
            </h2>
            <p className="text-sm mb-6" style={{ color: GREY }}>
              60% of dental enquiries happen outside office hours. Vaughan families search for a dentist at 9pm.
              Right now, those calls go to voicemail — and to your competitor.
            </p>
            <ResponseRaceGraphic
              withoutLabel="Your Practice (voicemail, call back next morning)"
              withoutTime="12+ Hours"
              withLabel="Barrana Automation"
              withTime="90 Seconds"
              outcomeWithout="Patient booked with the clinic that answered"
              outcomeWith="Appointment confirmed — patient on your calendar"
            />
          </div>
        </FadeSection>

        {/* Animated: Problem Counter Grid */}
        <FadeSection className="bg-white py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: NAVY }}>
              The Numbers for a Vaughan Dental Practice
            </h2>
            <p className="text-sm mb-8" style={{ color: GREY }}>
              Whether your practice is in Woodbridge, Maple, Concord, or Kleinburg — every empty chair is a system problem, not a patient problem.
            </p>
            <ProblemCounterGrid
              stats={[
                { value: 250000, prefix: "$", suffix: "/yr", label: "20% no-show rate × $200/visit × 25 patients/day", icon: "🦷" },
                { value: 60000, prefix: "$", suffix: "/yr", label: "300 overdue recall patients sitting in an uncalled list", icon: "📋" },
                { value: 72000, prefix: "$", suffix: "/yr", label: "After-hours enquiries lost to voicemail", icon: "📞" },
                { value: 31200, prefix: "$", suffix: "/yr", label: "Front desk time on phone booking & manual reminders", icon: "⏱️" },
              ]}
            />
            <div className="mt-8 flex flex-col gap-4">
              <CampaignMathItem figure="$250,000/year" label="20% no-show rate × $200/visit × 25 patients per day — empty chairs every single day" />
              <CampaignMathItem figure="$60,000/year" label="300 overdue recall patients × $200 — sitting in a list nobody is calling through" />
              <CampaignMathItem figure="$36,000 – $72,000/year" label="After-hours enquiries lost to voicemail — new patients going to the clinic that answered" />
              <CampaignMathItem figure="$31,200/year" label="Front desk spending 12 hours per week on phone booking and manual reminders" />
              <CampaignMathItem figure="$377,000/year at risk" label="Total operational revenue at risk from manual processes" isTotal />
            </div>
          </div>
        </FadeSection>

        {/* Animated: Revenue Recovery Meter */}
        <FadeSection style={{ backgroundColor: "#EEF0F8" }} className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: NAVY }}>
              How Much Is Recoverable for Your Vaughan Practice?
            </h2>
            <RevenueRecoveryMeter
              totalAtRisk="$377,000/year at risk"
              recoverable="$180,000 – $220,000/year"
              recoverablePercent={55}
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
              title="Your Patient Journey: Before vs. After"
              beforeSteps={[
                { label: "No-show at 2pm — front desk scrambles", detail: "Chair sits empty. No automated fill system. Revenue gone." },
                { label: "300 recall patients — nobody calling them", detail: "List sits in your PMS. Front desk too busy. $60K uncaptured." },
                { label: "Vaughan family calls at 8pm — goes to voicemail", detail: "Patient calls 3 clinics. Books with whoever answers first." },
              ]}
              afterSteps={[
                { label: "No-show triggers auto-fill from waitlist", detail: "Waitlist patient gets SMS — chair filled within 2 hours." },
                { label: "Recall campaign runs automatically", detail: "300 patients get personalised reminders. 40%+ re-book." },
                { label: "After-hours enquiry gets 90-second response", detail: "Auto-reply sent. Booking link included. Appointment confirmed." },
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
                  Real Result · Dental Practice in Vaughan / York Region
                </div>
                <p className="text-base md:text-lg text-white leading-relaxed mb-4">
                  "A 3-chair dental practice in the Vaughan area had a 22% no-show rate and 400 patients overdue
                  for recall. The front desk was spending 15 hours per week on the phone — and still not getting
                  through the recall list. Families in Woodbridge and Maple were booking elsewhere because nobody answered after 5pm."
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
                  "We automated the recall campaign, the no-show fill sequence, and the after-hours enquiry
                  response. The front desk now handles exceptions only. The system handles the volume."
                </p>
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: MAGENTA }}>
                  <p className="text-lg font-bold text-white">No-show rate dropped from 22% to 9%</p>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>
                    180 recall patients re-booked in 6 weeks. $36,000 in recovered revenue in the first quarter.
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
            <p className="text-sm mb-6" style={{ color: GREY }}>
              60 minutes. Zoom or in-person at our Vaughan office (50 Corstate Ave, Unit 01). You keep the analysis whether or not you hire us.
            </p>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <p className="font-semibold mb-4" style={{ color: NAVY }}>What you get in 60 minutes:</p>
              <ul className="flex flex-col gap-0">
                {[
                  "Your exact no-show cost calculated (per day, per week, per year — specific to your practice)",
                  "Your recall list value — how much revenue is sitting dormant in your PMS",
                  "Your after-hours booking opportunity — leads going to competitors after 5pm",
                  "The full analysis is yours — whether or not you hire us",
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

        <CampaignLeadForm industry="Dental" utm={UTM} />
        <CampaignFooter />
      </div>
    </>
  );
}
