import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import WorkflowDiagram from "@/components/diagrams/WorkflowDiagram";
import BeforeAfterSection from "@/components/service/BeforeAfterSection";
import { colors, spacing, typography } from "@/styles/design-tokens";

function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `4px solid ${colors.navy}`, background: colors.navyWash, borderRadius: "0 12px 12px 0", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
      {children}
    </div>
  );
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ ...typography.sectionHeading, marginBottom: "1rem", marginTop: "2.5rem" }}>{children}</h2>;
}
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E2E8F0", padding: "1rem 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", padding: 0 }}>
        {q}
        <span style={{ fontSize: "1.25rem", color: "#283891", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <p style={{ marginTop: "0.75rem", color: "#7B7B7B", lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

function CancellationBranch() {
  const { ref, visible } = useReveal();
  const steps = [
    "Client Cancels",
    "Waitlist Checked",
    "Offer Sent to #1",
    "2hr Claim Window",
    "Slot Filled (or next)",
  ];
  return (
    <div ref={ref} style={{ background: "#FFF5F9", border: "1px solid #F9D0E2", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
      <h4 style={{ fontWeight: 700, color: "#7E0F4A", marginBottom: "1rem", fontSize: "0.95rem" }}>Cancellation Branch — Waitlist Auto-Fill</h4>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              background: visible ? "#7E0F4A" : "#E2E8F0",
              color: "#fff",
              borderRadius: 8,
              padding: "0.5rem 0.9rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: `background 0.4s ease ${i * 0.15}s`,
              whiteSpace: "nowrap",
            }}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <span style={{ color: "#7E0F4A", fontSize: "1.1rem", fontWeight: 700 }}>→</span>
            )}
          </div>
        ))}
      </div>
      <p style={{ color: "#7B7B7B", fontSize: "0.85rem", marginTop: "0.75rem", margin: "0.75rem 0 0" }}>
        Fills 60–70% of cancelled slots automatically without any staff involvement.
      </p>
    </div>
  );
}

function NoShowImpact() {
  const { ref, visible } = useReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= 4400) { clearInterval(timer); return 4400; }
        return c + 110;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <div ref={ref} style={{ marginBottom: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        <div style={{ background: "#FEF2F2", border: "2px solid #FECACA", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 900, color: "#DC2626", lineHeight: 1 }}>20%</div>
          <div style={{ fontWeight: 700, color: "#1A1A2E", marginTop: "0.5rem", marginBottom: "0.4rem" }}>No-Show Rate</div>
          <div style={{ fontSize: "0.8rem", color: "#7B7B7B" }}>Before automation</div>
        </div>
        <div style={{ background: "#F0FDF4", border: "2px solid #BBF7D0", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 900, color: "#0D9668", lineHeight: 1 }}>8%</div>
          <div style={{ fontWeight: 700, color: "#1A1A2E", marginTop: "0.5rem", marginBottom: "0.4rem" }}>No-Show Rate</div>
          <div style={{ fontSize: "0.8rem", color: "#7B7B7B" }}>After dual reminder system</div>
        </div>
      </div>
      <div style={{ background: "#EEF2FF", borderRadius: 10, padding: "1.25rem", textAlign: "center" }}>
        <p style={{ color: "#283891", fontWeight: 600, fontSize: "0.95rem", margin: 0, lineHeight: 1.7 }}>
          At $200/session, 10 sessions/day: 1 no-show prevented per day =&nbsp;
          <span style={{ fontWeight: 900, fontSize: "1.1rem" }}>${count.toLocaleString()}/month recovered</span>
        </p>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Automate Appointment Booking and Reduce No-Shows",
  "description": "Automated booking combines self-serve scheduling with dual reminders (48-hour email + 2-hour SMS) and waitlist management to reduce no-shows 25-40%.",
  "step": [
    { "@type": "HowToStep", "name": "Set up self-serve online booking with real-time availability" },
    { "@type": "HowToStep", "name": "Send instant confirmation email" },
    { "@type": "HowToStep", "name": "Send 48-hour reminder email" },
    { "@type": "HowToStep", "name": "Send 2-hour SMS reminder" },
    { "@type": "HowToStep", "name": "Auto-fill cancellations from waitlist" },
  ],
};

export default function AppointmentBookingWorkflow() {
  return (
    <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: spacing.sectionPadding + " 1.25rem" }}>
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{ background: "#EEF2FF", color: "#283891", fontWeight: 600, fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>Workflow Guide</span>
          <span style={{ background: "#F8F9FA", color: "#7B7B7B", fontSize: "0.8rem", padding: "0.3rem 0.8rem", borderRadius: 20 }}>9 min read</span>
        </div>
        <h1 style={{ ...typography.pageTitle, marginBottom: "1rem" }}>
          How to Automate Appointment Booking and Reduce No-Shows
        </h1>
        <SummaryBox>
          <p style={{ margin: 0, color: "#283891", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Automated appointment booking combines self-serve scheduling with dual reminders (48-hour email + 2-hour SMS) and waitlist management. Clients book online based on real-time availability, receive automatic confirmations, get reminded before the appointment, and can reschedule with one click. If they cancel, the next waitlisted client is offered the slot automatically. Typical results: no-shows reduced 25–40%, front desk phone volume reduced 40–50%, cancellation slots filled 60–70% automatically.
          </p>
        </SummaryBox>
      </div>

      {/* Section 1 */}
      <SectionHeading>The Manual Booking Problem</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Phone-dependent scheduling creates a hidden cost that most practices never add up. Staff spend 30–40% of their time on scheduling tasks: incoming calls to book, incoming calls to reschedule, outgoing calls to confirm, and manual calendar management. That's not the highest-value work for trained professionals.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        No-shows happen because reminders are inconsistent or forgotten — sent sometimes but not always, via one channel only, or not personalized enough to feel urgent. And when a client cancels, the slot sits empty because there's no waitlist system. Revenue is lost not because demand isn't there, but because the process can't fill the gap fast enough.
      </p>

      {/* Section 2 */}
      <SectionHeading>What Automated Booking Looks Like</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        A client visits your website or receives a booking link by email or SMS. They see your real-time availability — only times you've made open, respecting your rules and buffer times. They pick a time, fill in any required information, and confirm. Within seconds, they receive a confirmation email. No phone call. No back-and-forth. No staff involvement. The entire booking takes under 3 minutes.
      </p>

      {/* Workflow Diagram */}
      <WorkflowDiagram
        steps={[
          { label: "Client Books Online", type: "trigger" },
          { label: "Instant Confirmation", type: "action" },
          { label: "48hr Email Reminder", type: "action" },
          { label: "2hr SMS Reminder", type: "action" },
          { label: "Appointment", type: "outcome" },
        ]}
        resultBadge="No-shows reduced 35%"
      />

      <CancellationBranch />

      {/* Section 3 */}
      <SectionHeading>The Dual Reminder System (48hr + 2hr)</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        Single reminders work. Dual reminders work significantly better. The research is consistent: combining a 48-hour email with a 2-hour SMS cuts no-shows by 25–40% compared to no reminders at all, and by 15–20% compared to a single reminder.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        The timing is deliberate. The 48-hour reminder gives clients enough runway to reschedule if something has come up — which is good: you'd rather have the slot filled by someone else than have a ghost. The 2-hour reminder is close enough to the appointment that it creates commitment. SMS open rate at 2 hours out: 98% within 3 minutes of delivery. Email open rates at that window: 35-45%. Using both covers every client preference.
      </p>

      {/* No-Show Impact */}
      <NoShowImpact />

      {/* Section 4 */}
      <SectionHeading>Waitlist Auto-Fill</SectionHeading>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1rem" }}>
        When a client cancels — whether from the reminder link or by calling — the system immediately checks the waitlist. The first waitlisted client receives an offer: "A spot has opened on [date] at [time]. Click here to claim it within 2 hours." If they don't claim it, the offer goes to the next person on the list.
      </p>
      <p style={{ color: "#7B7B7B", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        This fills 60–70% of cancelled slots automatically. The remaining 30–40% are genuinely short-notice cancellations where no waitlisted client is available at that time. Even recovering 60% of cancelled slots at $150–$300 per session compounds meaningfully over a year.
      </p>

      {/* Section 5 */}
      <SectionHeading>Industry Patterns</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { industry: "Clinics", tool: "Jane App / Cliniko", note: "Deep integration with clinical workflows. Patient forms, health history, and insurance can be collected at booking." },
          { industry: "Accountants", tool: "Calendly + Make", note: "Booking triggers a document prep checklist sent to the client before the meeting. Arrives prepared, meeting is shorter." },
          { industry: "Contractors", tool: "Jobber / booking + deposit", note: "Booking includes a deposit step. Reduces ghost bookings. Job details collected at time of booking." },
          { industry: "Immigration", tool: "Calendly + intake link", note: "Booking link includes a short intake form. Consultant receives context before the call. No time wasted on basics." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#F8F9FA", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
            <div style={{ fontWeight: 700, color: "#7E0F4A", marginBottom: "0.25rem" }}>{item.industry}</div>
            <div style={{ fontSize: "0.8rem", color: "#283891", marginBottom: "0.5rem", fontWeight: 600 }}>{item.tool}</div>
            <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>

      {/* Section 6 */}
      <SectionHeading>What Stays Human</SectionHeading>
      <ul style={{ color: "#1A1A2E", lineHeight: 1.9, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
        <li>Complex rescheduling for high-value or long-standing clients who deserve a personal response</li>
        <li>Priority booking for urgent cases requiring clinical or professional judgement</li>
        <li>Situations where the client has had a bad experience and needs a personal touch before rebooking</li>
        <li>Calendar decisions involving multiple staff members with competing priorities</li>
      </ul>

      {/* Section 7 */}
      <SectionHeading>Tools</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { tool: "Jane App", note: "Purpose-built for clinics. Patient management, scheduling, billing, and telehealth in one platform." },
          { tool: "Calendly", note: "Clean, fast booking for professional services. Excellent for consultants and accountants." },
          { tool: "Acuity Scheduling", note: "Strong for salons, wellness, and businesses with multiple service types and staff." },
          { tool: "Jobber", note: "Built for trades and home services. Booking, quoting, and job management combined." },
          { tool: "Google Calendar + Make", note: "Custom configuration for businesses with existing Google Workspace and specific workflow requirements." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "1rem", border: "1px solid #E2E8F0" }}>
            <div style={{ fontWeight: 700, color: "#283891", marginBottom: "0.4rem", fontSize: "0.9rem" }}>{item.tool}</div>
            <p style={{ color: "#7B7B7B", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.note}</p>
          </div>
        ))}
      </div>

      {/* Section 8 */}
      <SectionHeading>Results to Expect</SectionHeading>
      <BeforeAfterSection metrics={[
        { label: "No-Show Rate", before: "18-22%", after: "8-12%", beforeW: 80, afterW: 35 },
        { label: "Front Desk Phone Volume", before: "High", after: "-40-50%", beforeW: 85, afterW: 40 },
        { label: "Cancellation Fill Rate", before: "10-20%", after: "60-70%", beforeW: 15, afterW: 65 },
        { label: "Admin Time on Scheduling", before: "30-40% of day", after: "-70-80%", beforeW: 80, afterW: 15 },
      ]} />

      {/* FAQ */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <div style={{ marginBottom: "2.5rem" }}>
        <FAQItem q="Can clients reschedule or cancel through the reminder?" a="Yes. Every reminder includes a one-click reschedule link and a cancellation link that triggers the waitlist automatically. No phone call needed, which means the client is more likely to act on it." />
        <FAQItem q="What if we have complex availability rules?" a="Calendar integrations respect your availability settings. We can add custom logic for different service types, team members, locations, or time blocks — including buffer times between appointments and blocked-out periods." />
        <FAQItem q="Does this work with our existing booking tool?" a="We integrate with most popular booking tools: Jane App, Calendly, Acuity, Jobber, SimplyBook.me, and more. If you use a custom or proprietary system, we can integrate via API in most cases." />
        <FAQItem q="How do we build a waitlist if we don't have one?" a="We set up a simple waitlist form or CRM field — clients opt in at booking with a single checkbox. The system manages the rest: order, notifications, and slot assignment." />
        <FAQItem q="What if a client doesn't respond to the 2-hour reminder?" a="The appointment proceeds as scheduled. If the client doesn't show, the no-show follow-up sequence fires automatically — typically an email offering a rebooking link and noting any cancellation policy." />
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #283891 0%, #1A1A2E 100%)", borderRadius: 16, padding: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.25rem,2.5vw,1.625rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Ready to Reduce No-Shows and Free Your Front Desk?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", lineHeight: 1.7 }}>See exactly how automated booking would work for your practice or business.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/automation-planner">
            <a style={{ background: "#7E0F4A", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>Start the Automation Planner</a>
          </Link>
          <Link href="/contact">
            <a style={{ background: "transparent", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "1rem", border: "2px solid rgba(255,255,255,0.4)" }}>Book a Free Audit</a>
          </Link>
        </div>
      </div>

      {/* Related Links */}
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.75rem" }}>Related</h3>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {[
            { label: "Appointment Automation", href: "/services/appointment-automation" },
            { label: "What to Automate First", href: "/insights/what-to-automate-first" },
            { label: "Booking Reminders Playbook", href: "/playbooks/booking-reminders" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <a style={{ background: "#F0F4FF", color: "#283891", padding: "0.5rem 1rem", borderRadius: 20, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>{link.label}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
