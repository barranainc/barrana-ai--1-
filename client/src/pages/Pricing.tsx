/**
 * Pricing page (audit R7, owner-approved 27 Oct 2026: "starting from $1,500 CAD" everywhere).
 *
 * Only owner-approved facts belong here: the $1,500 CAD starting point, the free 15-minute introductory
 * session, and a fixed quote after it. Do not add tiers, taxes, inclusions or timelines without approval.
 */
import { Link } from "wouter";
import { ArrowRight, Check, ClipboardList, FileCheck2, Wrench } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/linking/BreadcrumbNav";
import JsonLd from "@/components/JsonLd";
import AuditBookingLink, { CALENDLY_URL } from "@/components/AuditBookingLink";
import { ORG_REF, SITE_URL } from "@/lib/schema";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Free 15-minute introductory session",
    body: "No charge and no obligation. We discuss your business, understand your workflow challenges, and explore where AI automation could save your team time.",
  },
  {
    icon: FileCheck2,
    title: "2. A fixed quote",
    body: "After we understand what you need, you receive a fixed price for the workflow or workflows you want automated. No hourly billing and no surprise invoices.",
  },
  {
    icon: Wrench,
    title: "3. Build and launch",
    body: "Work starts only after you approve the quote. We build, test and launch the automation with human checks where judgement is needed.",
  },
];

const priceFactors = [
  "How many workflows are automated",
  "How many tools need to be connected, such as your CRM, email, calendar, forms or accounting software",
  "How many steps, exceptions and approval points each workflow has",
  "How much ongoing support you want after launch",
];

const faqs = [
  {
    q: "How much does automation cost with Barrana?",
    a: "Projects start from $1,500 CAD. The exact price is a fixed quote that you receive after a free 15-minute introductory session, based on the workflows you choose.",
  },
  {
    q: "Is the introductory session really free?",
    a: "Yes. The 15-minute introductory session costs nothing and comes with no obligation. Book a time that suits you with our scheduling link.",
  },
  {
    q: "Do you charge by the hour?",
    a: "No. Implementation is quoted as a fixed price once we understand what you need, so you know the cost before any work starts.",
  },
  {
    q: "What currency are your prices in?",
    a: "All prices are in Canadian dollars (CAD).",
  },
];

const pageUrl = `${SITE_URL}/pricing`;

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Workflow automation implementation",
  serviceType: "Business process automation",
  url: pageUrl,
  provider: ORG_REF,
  areaServed: "Greater Toronto Area",
  offers: [
    {
      "@type": "Offer",
      name: "Introductory session (15 minutes)",
      price: "0",
      priceCurrency: "CAD",
      url: CALENDLY_URL,
    },
    {
      "@type": "Offer",
      name: "Automation implementation",
      priceCurrency: "CAD",
      priceSpecification: { "@type": "PriceSpecification", minPrice: 1500, priceCurrency: "CAD" },
      url: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Pricing: Automation From $1,500 CAD | Barrana.ai"
        description="Barrana automation projects start from $1,500 CAD. Start with a free 15-minute introductory session, then get a fixed quote for the workflows you choose. No hourly billing."
      />
      <JsonLd data={offerSchema} />
      <JsonLd data={faqSchema} />

      <section className="pt-24 pb-14 lg:pt-28" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container">
          <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <div className="max-w-3xl">
            <div className="section-label mb-4">Pricing</div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">Automation projects start from $1,500 CAD</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Barrana builds fixed-price automation for small and medium service businesses. Your exact price is set in a fixed
              quote after a free 15-minute introductory session, so you know the cost before any work starts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AuditBookingLink className="btn-accent">
                Book Your Free Introductory Session <ArrowRight size={16} aria-hidden="true" />
              </AuditBookingLink>
              <Link href="/services" className="btn-secondary">
                See what we automate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
            <div className="rounded-2xl border border-slate-200 p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7E0F4A]">Free</p>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">Introductory session</h2>
              <p className="mt-1 text-3xl font-extrabold text-[#283891]">$0</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {["15 minutes, no obligation", "Talk through your business and workflow challenges", "Where AI automation could save your team time", "Book online at a time that suits you"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-[#283891]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[#283891] p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7E0F4A]">Paid, fixed price</p>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">Automation implementation</h2>
              <p className="mt-1 text-3xl font-extrabold text-[#283891]">From $1,500 CAD</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {["Fixed quote once we understand what you need", "No hourly billing", "Built and tested before launch", "Human checks where judgement is needed"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-[#283891]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 max-w-5xl text-sm text-slate-600">All prices are in Canadian dollars (CAD).</p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">How pricing works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white border border-slate-200 p-6">
                <Icon size={22} className="text-[#283891]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">What affects your quote</h2>
          <p className="text-slate-700 mb-5">Every project starts from $1,500 CAD. The fixed quote depends on:</p>
          <ul className="space-y-3">
            {priceFactors.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <Check size={18} className="mt-0.5 shrink-0 text-[#283891]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-700">
            Not sure what you need? Read about our <Link href="/services" className="font-semibold text-[#283891] underline underline-offset-2">automation services</Link>,{" "}
            <Link href="/services/lead-response-automation" className="font-semibold text-[#283891] underline underline-offset-2">lead response automation</Link>{" "}
            or <Link href="/services/workflow-automation" className="font-semibold text-[#283891] underline underline-offset-2">workflow automation</Link>, or see the{" "}
            <Link href="/faq" className="font-semibold text-[#283891] underline underline-offset-2">FAQ</Link>.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Pricing questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl bg-white border border-slate-200 p-5">
                <h3 className="font-bold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#283891" }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start with a free 15-minute introductory session</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Talk through your business, then get a fixed quote, starting from $1,500 CAD.</p>
          <AuditBookingLink className="btn-accent">
            Book Your Free Introductory Session <ArrowRight size={16} aria-hidden="true" />
          </AuditBookingLink>
        </div>
      </section>
    </div>
  );
}
