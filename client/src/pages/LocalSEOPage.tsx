/**
 * City pages for GTA areas that have no fuller /locations page (audit R6, 23 Oct 2026).
 *
 * Brampton, Scarborough, Oakville and Etobicoke were kept and expanded. The other /ai-automation/*
 * city and city-industry URLs now 301 to their /locations equivalents (see scripts/routes.mjs).
 * Content here must stay factual: no local statistics, client names or results that are not on file.
 */
import { Link, useParams } from "wouter";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AuditBookingLink from "@/components/AuditBookingLink";

type LinkItem = { label: string; href: string };

type CityPage = {
  city: string;
  region: string;
  intro: string;
  focus: string;
  industries: LinkItem[];
  workflows: { title: string; body: string; href: string }[];
  nearby: LinkItem[];
};

const INDUSTRY = {
  immigration: { label: "Immigration Consultants", href: "/industries/immigration-consultants" },
  accounting: { label: "Accounting Firms", href: "/industries/accounting-firms" },
  law: { label: "Law Firms", href: "/industries/law-firms" },
  contractors: { label: "Contractors", href: "/industries/contractors" },
  clinics: { label: "Medical and Healthcare Clinics", href: "/industries/medical-clinics" },
  dental: { label: "Dental Offices", href: "/industries/dental-offices" },
  realEstate: { label: "Real Estate Teams", href: "/industries/real-estate-teams" },
};

const WORKFLOW = {
  lead: { title: "Lead response", body: "Every website, phone and ad enquiry gets an immediate reply, a few qualifying questions and a booking link, including evenings and weekends.", href: "/services/lead-response-automation" },
  intake: { title: "Client intake", body: "New clients complete one structured intake; the details land in your CRM and the right person is assigned without retyping.", href: "/services/client-intake-automation" },
  documents: { title: "Document collection", body: "Checklists go out automatically and reminders continue until every required document has arrived, with a clear status for your team.", href: "/services/document-collection" },
  appointments: { title: "Appointments and reminders", body: "Clients book from live availability and receive reminders before the visit, so fewer slots are lost to no-shows.", href: "/services/appointment-automation" },
  invoices: { title: "Invoices and payment reminders", body: "Invoices are issued when the work is done and polite reminders follow on a schedule you approve.", href: "/services/invoice-automation" },
};

const CITY_DATA: Record<string, CityPage> = {
  brampton: {
    city: "Brampton",
    region: "Brampton, ON",
    intro: "Brampton's rapidly growing business community includes a significant concentration of immigration consultants and professional service firms. Barrana.ai helps Brampton businesses automate client intake and operational workflows.",
    focus: "For Brampton firms the usual starting points are intake and document collection for immigration and accounting files, and fast first responses for contractors and clinics that compete for the same enquiries.",
    industries: [
      { label: "Immigration Consultants in Brampton", href: "/locations/brampton/immigration-consultants" },
      { label: "Accounting Firms in Brampton", href: "/locations/brampton/accounting-firms" },
      { label: "Law Firms in Brampton", href: "/locations/brampton/law-firms" },
      { label: "Contractors in Brampton", href: "/locations/brampton/contractors" },
      { label: "Dental Clinics in Brampton", href: "/locations/brampton/dental-clinics" },
      INDUSTRY.realEstate,
    ],
    workflows: [WORKFLOW.intake, WORKFLOW.documents, WORKFLOW.lead],
    nearby: [
      { label: "Mississauga", href: "/locations/mississauga" },
      { label: "Vaughan", href: "/locations/vaughan" },
      { label: "Etobicoke", href: "/ai-automation/etobicoke" },
    ],
  },
  scarborough: {
    city: "Scarborough",
    region: "Scarborough, Toronto, ON",
    intro: "Scarborough's diverse small business community serves one of the most multicultural populations in Canada. Barrana.ai helps Scarborough service businesses automate lead response, client intake, and document collection workflows.",
    focus: "Scarborough practices often handle enquiries in several languages and from many referral sources. Automation keeps every enquiry answered and every intake complete, while your team decides how each client is served.",
    industries: [
      { label: "Immigration Consultants in Scarborough", href: "/locations/scarborough/immigration-consultants" },
      INDUSTRY.accounting,
      INDUSTRY.clinics,
      INDUSTRY.dental,
      INDUSTRY.contractors,
    ],
    workflows: [WORKFLOW.lead, WORKFLOW.intake, WORKFLOW.appointments],
    nearby: [
      { label: "Toronto", href: "/locations/toronto" },
      { label: "North York", href: "/locations/north-york" },
      { label: "Markham", href: "/locations/markham" },
    ],
  },
  oakville: {
    city: "Oakville",
    region: "Oakville, ON",
    intro: "Oakville's professional service businesses serve an affluent and demanding client base. Barrana.ai helps Oakville firms automate the operational workflows that affect client experience.",
    focus: "In Oakville the work that most affects client experience is usually response time, onboarding and billing. Those are the workflows we look at first, with approvals kept wherever professional judgement is involved.",
    industries: [INDUSTRY.accounting, INDUSTRY.law, INDUSTRY.clinics, INDUSTRY.contractors, INDUSTRY.realEstate],
    workflows: [WORKFLOW.lead, WORKFLOW.intake, WORKFLOW.invoices],
    nearby: [
      { label: "Mississauga", href: "/locations/mississauga" },
      { label: "Etobicoke", href: "/ai-automation/etobicoke" },
      { label: "Toronto", href: "/locations/toronto" },
    ],
  },
  etobicoke: {
    city: "Etobicoke",
    region: "Etobicoke, Toronto, ON",
    intro: "Etobicoke's business community spans professional services, construction, and healthcare. Barrana.ai helps Etobicoke businesses automate lead response, client intake, and scheduling workflows.",
    focus: "Etobicoke contractors and clinics tend to lose the most time to slow first replies and manual scheduling, while professional firms lose it to intake and document chasing.",
    industries: [INDUSTRY.contractors, INDUSTRY.clinics, INDUSTRY.immigration, INDUSTRY.accounting, INDUSTRY.realEstate],
    workflows: [WORKFLOW.lead, WORKFLOW.appointments, WORKFLOW.intake],
    nearby: [
      { label: "Toronto", href: "/locations/toronto" },
      { label: "Mississauga", href: "/locations/mississauga" },
      { label: "Oakville", href: "/ai-automation/oakville" },
    ],
  },
};

function cityFaqs(city: string) {
  return [
    {
      q: `Do you work with businesses in ${city}?`,
      a: `Yes. Barrana.ai is based at 50 Corstate Avenue in Vaughan and works with service businesses across the GTA, including ${city}. Audits and onboarding can be held in person when requested; implementation and support are handled remotely.`,
    },
    {
      q: `Where should a ${city} business start with automation?`,
      a: "With the one repeated workflow that costs your team the most time or loses the most enquiries. The free 60-minute Automation Audit maps your workflows and shows what to automate first, and what to leave alone.",
    },
    {
      q: "Do we need to change our software?",
      a: "Usually not. Barrana connects the tools you already use, such as your CRM, email, calendar and forms, and keeps a person in the loop for decisions that need judgement.",
    },
  ];
}

const card = { backgroundColor: "#F7F9FC", border: "1px solid rgba(26,82,118,0.08)" };

export default function LocalSEOPage() {
  const params = useParams<{ city?: string }>();
  const page = CITY_DATA[params.city || ""];

  if (!page) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container py-16">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#1F2937" }}>Location page not found</h1>
          <Link href="/locations" className="btn-secondary">View all locations</Link>
        </div>
      </div>
    );
  }

  const faqs = cityFaqs(page.city);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`AI Automation for Small Business in ${page.city} | Barrana.ai`}
        description={`Workflow automation for ${page.city} service businesses: lead response, client intake, document collection and scheduling. Start with a free 60-minute Automation Audit.`}
      />
      <section className="hero-light pt-24 pb-16">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="breadcrumb-sep">/</span><Link href="/locations">Locations</Link><span className="breadcrumb-sep">/</span><span>{page.city}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="eyebrow">AI Automation · {page.region}</div>
            <h1 className="font-extrabold mb-4" style={{ color: "#1F2937" }}>AI Automation for Small Business in {page.city}</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>{page.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl">
            <div className="aeo-block mb-10">
              <div className="aeo-label">Who We Serve in {page.city}</div>
              <p>Barrana.ai serves small and medium businesses in {page.city} with 2 to 50 staff who rely on client relationships and need to handle higher inquiry volumes without adding administrative staff.</p>
              <p className="mt-3">{page.focus}</p>
            </div>

            <h2 className="text-xl font-bold mb-4" style={{ color: "#1F2937" }}>Workflows {page.city} Businesses Automate First</h2>
            <div className="space-y-3 mb-10">
              {page.workflows.map((wf) => (
                <Link key={wf.href} href={wf.href} className="block p-5 rounded-xl group" style={card}>
                  <span className="flex items-center justify-between gap-3 font-bold" style={{ color: "#1F2937" }}>
                    {wf.title}
                    <ArrowRight size={16} className="flex-shrink-0" style={{ color: "#283891" }} aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed" style={{ color: "#4B5563" }}>{wf.body}</span>
                </Link>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4" style={{ color: "#1F2937" }}>Industries We Serve in {page.city}</h2>
            <div className="grid md:grid-cols-2 gap-3 mb-10">
              {page.industries.map((ind) => (
                <Link key={ind.href} href={ind.href} className="p-4 rounded-xl flex items-center gap-3" style={card}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#7E0F4A" }} />
                  <span className="text-sm font-medium" style={{ color: "#374151" }}>{ind.label}</span>
                </Link>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4" style={{ color: "#1F2937" }}>Questions from {page.city} Businesses</h2>
            <div className="space-y-4 mb-10">
              {faqs.map((f) => (
                <div key={f.q} className="p-5 rounded-xl" style={card}>
                  <h3 className="font-bold mb-2" style={{ color: "#1F2937" }}>{f.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{f.a}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-3" style={{ color: "#1F2937" }}>Nearby Service Areas</h2>
            <p className="text-sm mb-10" style={{ color: "#4B5563" }}>
              {page.nearby.map((n, i) => (
                <span key={n.href}>
                  {i > 0 && " · "}
                  <Link href={n.href} className="font-semibold" style={{ color: "#283891" }}>{n.label}</Link>
                </span>
              ))}
              {" · "}
              <Link href="/locations" className="font-semibold" style={{ color: "#283891" }}>All GTA locations</Link>
            </p>

            <div className="p-8 rounded-2xl" style={{ background: "linear-gradient(135deg, #1E2B6E, #283891)" }}>
              <h2 className="text-xl font-bold text-white mb-3">Free Automation Audit for {page.city} Businesses</h2>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Book a free 60-minute Automation Audit. We walk through your workflows, estimate what your manual work costs each year, and show you what to automate first.</p>
              <AuditBookingLink className="btn-primary">Book Your Free Automation Audit</AuditBookingLink>
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
