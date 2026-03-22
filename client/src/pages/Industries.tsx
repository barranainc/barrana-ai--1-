/**
 * Industries.tsx — Barrana.ai Industries Overview
 * Design: Premium Systems Consultancy
 * Numbered alternating layout, scroll reveal, no emoji
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const industriesList = [
  {
    slug: "immigration-consultants",
    number: "01",
    title: "Immigration Consultants",
    tagline: "AI intake categorizes visa types. Document collection runs itself.",
    description: "For a 2-consultant firm handling 50 inquiries per month, 40% of every week is consumed by intake, document chasing, and status calls — none of which requires RCIC expertise. We automate all of it.",
    automations: ["AI visa categorization (8+ streams)", "Document portal with 48hr reminders", "Automatic status updates at every file stage", "Weekly practice reporting delivered Monday"],
    color: "#283891",
  },
  {
    slug: "accounting-firms",
    number: "02",
    title: "Accounting Firms",
    tagline: "Tax season should be profitable, not chaotic.",
    description: "Staff spend 2-3 hours per day chasing documents instead of preparing returns. Invoices go out weeks late. We cut document collection time in half and trigger invoices the day work is done.",
    automations: ["Tax document collection with secure portals", "QuickBooks invoice automation on completion", "CRA deadline tracking and escalation", "Seasonal capacity planning reports"],
    color: "#7E0F4A",
  },
  {
    slug: "law-firms",
    number: "03",
    title: "Law Firms",
    tagline: "Protect the billable hours. Automate the admin.",
    description: "A solo practitioner spending 2 hours per day on admin loses 500+ billable hours per year. At $300/hour, that is $150,000 consumed by tasks that require no legal training.",
    automations: ["Matter intake by practice area + conflict check", "Retainer and engagement letter automation", "Client status updates at every matter stage", "Billing triggered on matter close via Clio"],
    color: "#283891",
  },
  {
    slug: "contractors",
    number: "04",
    title: "Contractors & Trades",
    tagline: "You are on the job. Your leads arrive all day. Automation bridges that gap.",
    description: "At $5,000–$15,000 per job, losing 8–12 leads per month to slow response means $40,000–$180,000 in revenue walking away. Not because your work is bad — because your response was slow.",
    automations: ["90-second lead response even while on-site", "Quote follow-up at 48hr/5d/10d", "Jobber scheduling + after-hours voice AI", "Invoice triggered on job completion"],
    color: "#7E0F4A",
  },
  {
    slug: "physiotherapy-clinics",
    number: "05",
    title: "Physiotherapy Clinics",
    tagline: "Every no-show is $80 that walked out the door.",
    description: "At 40 patients per day with 20% no-shows, that is $150,000 per year in preventable revenue loss. Dual reminders cut no-shows 25–40% within 60 days.",
    automations: ["Dual reminders: 48hr email + 2hr SMS", "Digital intake completed before visit", "Waitlist auto-fill on cancellation", "30/60-day post-treatment re-engagement"],
    color: "#283891",
  },
  {
    slug: "real-estate-teams",
    number: "06",
    title: "Real Estate Teams",
    tagline: "Leads have a 5-minute window. Your team is showing properties.",
    description: "80% of buyers take 6–12 months to purchase. Without automation, follow-up is abandoned after 2 weeks. Those buyers close with someone else.",
    automations: ["90-second unified lead response from all sources", "12-month buyer nurture sequences", "Listing appointment follow-up", "Post-offer to close milestone automation"],
    color: "#7E0F4A",
  },
  {
    slug: "service-businesses",
    number: "07",
    title: "Service Businesses",
    tagline: "If you run on appointments and clients, you are ready for automation.",
    description: "Service businesses share a common operational cycle: inquire, onboard, deliver, invoice. At every stage, manual tasks create delays and inconsistency. The system handles coordination. Your team handles delivery.",
    automations: ["90-second lead response 24/7", "Consistent automated client onboarding", "Scheduling with dual reminders", "Same-day invoicing on service completion"],
    color: "#283891",
  },
  {
    slug: "dental-offices",
    number: "08",
    title: "Dental Offices",
    tagline: "Your chairs should be full. Your recall list should be current.",
    description: "A 2-chair hygiene practice with 10% no-show improvement and better recall compliance can add $80,000–$120,000 in annual revenue without a single new marketing dollar.",
    automations: ["Dual reminders reduce no-shows 50-60%", "Automated 6-month recall campaigns", "Digital intake completed before visit", "Google review request after every appointment"],
    color: "#7E0F4A",
  },
  {
    slug: "insurance-brokers",
    number: "09",
    title: "Insurance Brokers",
    tagline: "40% of your quotes get zero follow-up. 15-20% of renewals lapse.",
    description: "Quote follow-up depends on the broker's workload that week. Renewal tracking depends on a spreadsheet someone updates monthly. Both fail silently — until clients are gone.",
    automations: ["Quote follow-up at 48hr/7d/14d", "Renewal reminders at 90/60/30 days", "Consistent welcome sequence for new clients", "Cross-sell gap detection and broker alerts"],
    color: "#283891",
  },
  {
    slug: "mortgage-brokers",
    number: "10",
    title: "Mortgage Brokers",
    tagline: "Leads go cold in hours. Documents take weeks. Maturities slip to lenders.",
    description: "Mortgage clients shop 3–5 brokers simultaneously. The first substantive response wins the application. Meanwhile, your existing book gets renewed by lenders because you had no proactive outreach.",
    automations: ["90-second lead response with pre-qualification", "Document collection portal with 48hr reminders", "Maturity renewal sequence starting 6 months out", "Client status updates through approval stages"],
    color: "#7E0F4A",
  },
  {
    slug: "financial-advisors",
    number: "11",
    title: "Financial Advisors",
    tagline: "Your clients expect proactive service. Automation delivers it at scale.",
    description: "With 100–300 households, maintaining consistent annual reviews, KYC renewals, birthday greetings, and market updates manually is impossible. The advisors who grow fastest have systems that maintain the relationship rhythm.",
    automations: ["Annual reviews scheduled automatically at 11 months", "KYC renewal reminders at 90/60/30 days", "Birthday and portfolio milestone touchpoints", "Continuous compliance logging every interaction"],
    color: "#283891",
  },
  {
    slug: "marketing-agencies",
    number: "12",
    title: "Marketing Agencies",
    tagline: "You sell efficiency to clients. Your operations run on Slack messages.",
    description: "Client onboarding takes 1–2 weeks. Monthly reporting takes 4–6 hours per client. New business follow-up gets abandoned after the first call. The agencies that scale systematize these operational layers.",
    automations: ["Client onboarding in 48 hours not 2 weeks", "Automated project handoffs on task completion", "Monthly reports from platform APIs (zero manual)", "Milestone-triggered invoicing"],
    color: "#7E0F4A",
  },
  {
    slug: "cleaning-companies",
    number: "13",
    title: "Cleaning Companies",
    tagline: "Your clients book at 9pm. Your office closes at 5pm.",
    description: "Manual scheduling and follow-up work at 20 clients. At 100 clients, it breaks. Automation scales the operations so you can scale the business without scaling the admin overhead.",
    automations: ["24/7 quote response under 90 seconds", "Booking with confirmations and dual reminders", "Automatic invoicing on job completion", "Google review request after every clean"],
    color: "#283891",
  },
  {
    slug: "property-management",
    number: "14",
    title: "Property Management",
    tagline: "Scale to 200 units without hiring five more staff.",
    description: "Every additional unit generates tenant communications, maintenance coordination, owner reporting, and lease administration. At 50 units, a 3-person team can manage. At 150 units, without systems, the same team drowns.",
    automations: ["Maintenance requests with AI priority triage", "Lease renewals triggered 90 days before expiry", "Automated rent reminders at 1/5/10 days late", "Monthly owner reports auto-generated"],
    color: "#7E0F4A",
  },
  {
    slug: "home-services",
    number: "15",
    title: "Home Services — HVAC, Plumbing, Electrical",
    tagline: "Emergency calls at 2am. 300 seasonal clients due. Automate both.",
    description: "Home service companies handle emergency work that cannot wait and scheduled maintenance that keeps recurring revenue flowing. Managing both manually means one consumes the day while the other falls behind.",
    automations: ["24/7 emergency dispatch with AI triage", "Seasonal maintenance campaigns to 100% of clients", "Agreement renewals at 90/60/30 days", "Weather-triggered snow removal dispatch"],
    color: "#283891",
  },
  {
    slug: "medical-clinics",
    number: "16",
    title: "Medical Clinics",
    tagline: "Your waiting room is full but your phone is ringing.",
    description: "A front desk simultaneously managing check-ins, phone calls, insurance questions, and intake forms cannot do all of it well. Online booking reduces phone volume 40–50%. Automation handles the rest.",
    automations: ["Online booking reduces phone volume 40-50%", "Dual reminders cut no-shows to 5-12%", "Digital intake completed before visit", "Proactive prescription renewal reminders"],
    color: "#7E0F4A",
  },
  {
    slug: "veterinary-clinics",
    number: "17",
    title: "Veterinary Clinics",
    tagline: "Fluffy is due for vaccinations. Her owner forgot. Automation does not forget.",
    description: "Each pet has a different vaccination schedule. 30–40% of animals are overdue not because owners do not care, but because nobody sent a reminder. Systematic outreach changes that.",
    automations: ["Vaccination reminders per pet schedule", "Dual appointment reminders cut no-shows 40%+", "Prescription refill alerts 14 days before empty", "Post-surgery check-ins at 24hr/3day/7day"],
    color: "#283891",
  },
  {
    slug: "tutoring-education",
    number: "18",
    title: "Tutoring & Education Centers",
    tagline: "Enrollment season is a 3-week scramble. Session scheduling is a nightmare.",
    description: "30–50% of enrollment inquiries are lost to slow follow-up. 30–40% of students lapse at term end because nobody contacted them. Both problems have the same fix: systematic, automated communication.",
    automations: ["90-second enrollment response with assessment booking", "Conflict-free session scheduling system", "Automated monthly parent progress reports", "60-day re-enrollment campaign before term end"],
    color: "#7E0F4A",
  },
  {
    slug: "auto-repair",
    number: "19",
    title: "Auto Repair Shops",
    tagline: "Every vehicle needs regular maintenance. Every customer forgets.",
    description: "Auto repair shops have a built-in recurring revenue model that most never fully capture. Systematic maintenance reminders, seasonal campaigns, and declined-service follow-up add 25–40% to maintenance revenue.",
    automations: ["Mileage and time-based service reminders", "Declined service follow-up at 30/60 days", "Seasonal campaigns 4 weeks before each season", "Google review request after every completed service"],
    color: "#283891",
  },
  {
    slug: "landscaping",
    number: "20",
    title: "Landscaping & Snow Removal",
    tagline: "Spring is 6 weeks away. You need 200 contracts renewed.",
    description: "Every seasonal transition requires mass communication to hundreds of clients within a tight window. Manual outreach means some clients are contacted, some are not, and the season starts before the campaign finishes.",
    automations: ["90-day seasonal contract renewal campaigns", "Weather-triggered automatic snow dispatch", "Geographic crew scheduling optimization", "Invoices triggered on job and push completion"],
    color: "#7E0F4A",
  },
];

function IndustryRow({ industry, idx }: { industry: typeof industriesList[0]; idx: number }) {
  const reveal = useReveal();
  const isEven = idx % 2 === 0;
  return (
    <div
      ref={reveal.ref}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 lg:py-16"
      style={{
        borderTop: "1px solid rgba(40,56,145,0.08)",
        opacity: reveal.visible ? 1 : 0,
        transform: reveal.visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className={isEven ? "" : "lg:order-2"}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl font-extrabold" style={{ color: industry.color, opacity: 0.12 }}>{industry.number}</span>
          <span className="section-label">{industry.title}</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: "#111827" }}>
          {industry.tagline}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{industry.description}</p>
        <Link href={`/industries/${industry.slug}`} className="btn-primary text-sm">
          View Industry Solutions
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>

      <div className={isEven ? "" : "lg:order-1"}>
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: isEven ? "#F7F8FB" : "rgba(40,56,145,0.03)",
            border: "1px solid rgba(40,56,145,0.08)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: industry.color }}>
            Common Automations
          </p>
          <div className="space-y-3">
            {industry.automations.map((a, i) => (
              <div
                key={a}
                className="flex items-center gap-3 p-3 bg-white rounded-xl"
                style={{
                  border: "1px solid rgba(40,56,145,0.06)",
                  opacity: reveal.visible ? 1 : 0,
                  transform: reveal.visible ? "translateX(0)" : "translateX(12px)",
                  transition: `opacity 0.4s ease ${i * 0.08 + 0.3}s, transform 0.4s ease ${i * 0.08 + 0.3}s`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${industry.color}18` }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke={industry.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  const hero = useReveal(0.05);
  const cta = useReveal(0.2);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none" />
        <div className="container relative z-10">
          <div
            ref={hero.ref}
            style={{
              opacity: hero.visible ? 1 : 0,
              transform: hero.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="section-divider mb-4">
              <span className="section-label">Industries We Serve</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "#111827" }}>
                Automation Built Around<br />How Your Industry Works
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We specialize in professional service businesses in Toronto and the GTA. Each industry has specific workflows, compliance requirements, and operational patterns. We build automation systems that reflect those realities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="pb-8" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          {industriesList.map((industry, idx) => (
            <IndustryRow key={industry.slug} industry={industry} idx={idx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #283891 0%, #1e2d7a 50%, #7E0F4A 100%)" }}
      >
        <div
          ref={cta.ref}
          className="container text-center"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">Don't See Your Industry?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            We work with any professional service business in the GTA. Book a free Automation Audit and we will map your specific workflows.
          </p>
          <Link href="/contact" className="btn-accent">
            Book Free Automation Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
