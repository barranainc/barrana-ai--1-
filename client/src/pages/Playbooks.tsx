import { Link } from "wouter";

const playbooks = [
  {
    emoji: "⚡",
    title: "Lead Response Playbook",
    desc: "Respond to every inquiry in 90 seconds, 24/7",
    steps: 5,
    slug: "lead-response",
  },
  {
    emoji: "📅",
    title: "Booking & Reminders Playbook",
    desc: "Cut no-shows by 35% with dual automated reminders",
    steps: 6,
    slug: "booking-reminders",
  },
  {
    emoji: "🤝",
    title: "Client Onboarding Playbook",
    desc: "Standardise the first-client experience end to end",
    steps: 7,
    slug: "client-onboarding",
  },
  {
    emoji: "📋",
    title: "Document Collection Playbook",
    desc: "Stop chasing documents — track and remind automatically",
    steps: 5,
    slug: "document-collection",
  },
  {
    emoji: "💳",
    title: "Invoice Automation Playbook",
    desc: "Bill on completion, collect faster, follow up automatically",
    steps: 4,
    slug: "invoice-automation",
  },
  {
    emoji: "🌙",
    title: "After-Hours Capture Playbook",
    desc: "Never lose an after-5pm lead again",
    steps: 5,
    slug: "after-hours-capture",
  },
];

export default function Playbooks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16" style={{ backgroundColor: "#F7F9FC" }}>
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "#1A1A2E" }}>
              Automation Playbooks
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#7B7B7B" }}>
              Step-by-step guides for automating the most impactful workflows in your business.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {playbooks.map((pb) => (
              <div
                key={pb.slug}
                className="rounded-xl bg-white border p-6 hover:shadow-lg transition-shadow"
                style={{ borderColor: "rgba(40,56,145,0.15)", borderTopColor: "#283891", borderTopWidth: "3px" }}
              >
                <div className="text-4xl mb-4">{pb.emoji}</div>
                <h2 className="text-lg font-bold mb-2" style={{ color: "#1A1A2E" }}>{pb.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#7B7B7B" }}>{pb.desc}</p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(40,56,145,0.08)", color: "#283891" }}
                  >
                    {pb.steps} steps
                  </span>
                  <Link
                    href={`/playbooks/${pb.slug}`}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "#283891" }}
                  >
                    View Playbook →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below grid */}
          <div className="mt-16 text-center">
            <p className="text-base mb-4" style={{ color: "#7B7B7B" }}>
              Ready to implement one of these playbooks in your business?
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#283891" }}
            >
              Book a Free Automation Audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
