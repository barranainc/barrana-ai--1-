/**
 * Real, anonymized client case study (owner brief, 6 Nov 2026).
 *
 * Copy comes from "Barrana Case Study Web Developer Brief" (pages 3-5), prepared from Barrana's five-page
 * source PDF. Barrana confirmed the project is real and the client approved publication of the anonymized
 * details and figures. Do not add the illustrative North York page's figures or tools, a client name, logo,
 * quote, exact city, hours saved, cost or speed percentages, ratings or compliance claims.
 */
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/linking/BreadcrumbNav";
import JsonLd from "@/components/JsonLd";
import AuditBookingLink from "@/components/AuditBookingLink";
import { ORG_REF, SITE_URL } from "@/lib/schema";

const PATH = "/case-studies/immigration-practice-automation";
const TITLE = "Immigration Practice Automation Case Study | Barrana.ai";
const DESCRIPTION =
  "See how Barrana automated intake, agreements, payments and document collection for a Canadian immigration consultancy. Real results; client name withheld.";
const H1 = "How a Canadian immigration consultancy automated intake and case management";
// First publication. Add dateModified when the page is next updated.
const PUBLISHED = "2026-11-06";

const atAGlance = [
  { label: "Client", value: "Licensed Canadian immigration consultancy led by a Regulated Canadian Immigration Consultant (RCIC)" },
  { label: "Engagement", value: "June 2026 to present, delivered in phases" },
  { label: "Systems", value: "Monday.com, Microsoft 365 and OneDrive, Microsoft Teams, Square, e-signature and a custom automation layer" },
  { label: "Barrana's role", value: "Process review, solution design, implementation, phased rollout, staff training and ongoing support" },
];

const workflow = [
  {
    title: "Inquiry and booking",
    body: "New email inquiries become leads in the board; returning clients are matched to existing records. Clients can book consultations and receive follow-up reminders.",
  },
  {
    title: "Agreements and payment",
    body: "Consultation and retainer agreements are generated from the firm's templates, sent for e-signature and filed. Payment and signature status remain synchronized.",
  },
  {
    title: "Case setup",
    body: "When a retainer is both signed and paid, the system opens the case, assigns a case number, creates OneDrive folders and produces the relevant checklist and questionnaire.",
  },
  {
    title: "Client portal and review",
    body: "A private link lets clients complete questionnaires, see outstanding documents and upload files. Staff review each submission and return incorrect items with a clear note.",
  },
  {
    title: "Oversight",
    body: "Managers receive a daily list of files that need attention, including missed steps, unpaid balances and stalled work.",
  },
];

const results = [
  "100+ consultation and retainer agreements generated and sent in a single month, without manual assembly.",
  "Approximately 300 case files organized in one standard folder structure, with more than 1,100 working folders created automatically.",
  "66 program checklist and questionnaire definitions used to generate client-specific requirements.",
  "The shared inquiries inbox is checked every five minutes so new email inquiries can become leads on the board.",
  "A 15-minute reconciliation cycle keeps payment and case status aligned.",
];

const questions = [
  {
    q: "Did the firm replace its existing software?",
    a: "No. Barrana built an automation layer around Monday.com, Microsoft 365 and other tools the firm already used.",
  },
  {
    q: "Does the system make immigration decisions?",
    a: "No. It coordinates routine tasks; licensed consultants retain professional judgment and application decisions.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  description: DESCRIPTION,
  url: `${SITE_URL}${PATH}`,
  mainEntityOfPage: `${SITE_URL}${PATH}`,
  inLanguage: "en-CA",
  datePublished: PUBLISHED,
  author: ORG_REF,
  publisher: ORG_REF,
};

const h2 = "text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4";
const body = "text-slate-700 leading-relaxed";

export default function ImmigrationPracticeAutomation() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={TITLE} description={DESCRIPTION} type="article" />
      <JsonLd data={articleSchema} />

      <section className="pt-24 pb-14 lg:pt-28" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "Immigration Practice Automation" },
            ]}
          />
          <div className="max-w-3xl">
            <p className="inline-flex max-w-full items-start gap-2 rounded-lg bg-[#E8F5EE] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-[#15803d]">
              <ShieldCheck size={14} className="mt-[3px] shrink-0" aria-hidden="true" />
              <span>Real client project | Client identity withheld</span>
            </p>
            <h1 className="mt-5 text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{H1}</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              A regulated Canadian immigration consultancy needed to manage a growing volume of inquiries, agreements, payments,
              case setup and document collection without making licensed consultants responsible for more administrative work.
              Barrana connected the tools the practice already used and automated routine handoffs from first inquiry to an
              application-ready file.
            </p>
            <p className="mt-6 rounded-xl border border-[#15803d]/25 bg-white p-4 text-sm leading-6 text-slate-700">
              This is a real Barrana client project. The client's name is withheld for confidentiality, and some identifying
              details have been generalized. Figures below are as of November 2026.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-4xl">
          <h2 className={h2}>At a glance</h2>
          <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {atAGlance.map((row) => (
              <div key={row.label} className="grid gap-1 p-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="font-bold text-gray-900">{row.label}</dt>
                <dd className="text-slate-700 leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container max-w-3xl">
          <h2 className={h2}>What was the challenge?</h2>
          <p className={body}>
            As client volume grew, the firm's intake, bookings, agreements, payments and document requests required repeated
            manual work. Staff re-entered information across tools, followed up on missing signatures and documents, and checked
            separate places to find out which files were stalled. Immigration files also involve different requirements for
            different programs and family members, making omissions costly to discover late.
          </p>
          <p className={`${body} mt-4`}>
            The practice wanted a clearer view of every file and more consistent follow-up while leaving eligibility, strategy and
            application decisions with its licensed professionals.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-4xl">
          <h2 className={h2}>What did Barrana automate?</h2>
          <p className={`${body} max-w-3xl`}>
            Barrana mapped the firm's existing process, then built an automation layer around its established Monday.com and
            Microsoft 365 workflows. The rollout happened in phases, with higher-risk actions tested before activation.
          </p>
          <h3 className="mt-10 mb-5 text-xl font-bold text-gray-900">The workflow, from inquiry to file</h3>
          <ol className="space-y-4">
            {workflow.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#283891] text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-gray-900">{step.title}</p>
                  <p className="mt-1 text-slate-700 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container max-w-3xl">
          <h2 className={h2}>What results were recorded?</h2>
          <p className={`${body} mb-5`}>As of November 2026, the system supported the following operational volume:</p>
          <ul className="space-y-3">
            {results.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-4 text-slate-700 leading-relaxed">
                <Check size={18} className="mt-1 shrink-0 text-[#283891]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-3xl">
          <h2 className={h2}>People remain in control</h2>
          <p className={body}>
            The system prepares routine work, routes files and makes missed steps visible. Staff review submitted documents, and
            licensed consultants continue to make the professional decisions about eligibility, strategy and submissions. Staff
            access is tied to case assignment; sensitive actions require named authorization.
          </p>
        </div>
      </section>

      <section className="py-14" style={{ backgroundColor: "#F7F8FB" }}>
        <div className="container max-w-3xl">
          <h2 className={h2}>Common questions about this project</h2>
          <div className="space-y-4">
            {questions.map((item) => (
              <div key={item.q} className="rounded-xl bg-white border border-slate-200 p-5">
                <h3 className="font-bold text-gray-900">{item.q}</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-slate-600">
            Looking for other examples? The other pages in{" "}
            <Link href="/case-studies" className="font-semibold text-[#283891] underline underline-offset-2">
              Case Studies
            </Link>{" "}
            are illustrative composites, not client results. Related services:{" "}
            <Link href="/services/client-intake-automation" className="font-semibold text-[#283891] underline underline-offset-2">
              client intake automation
            </Link>
            ,{" "}
            <Link href="/services/document-collection" className="font-semibold text-[#283891] underline underline-offset-2">
              document collection
            </Link>{" "}
            and{" "}
            <Link href="/services/workflow-automation" className="font-semibold text-[#283891] underline underline-offset-2">
              workflow automation
            </Link>
            . More for{" "}
            <Link href="/industries/immigration-consultants" className="font-semibold text-[#283891] underline underline-offset-2">
              immigration consultants
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#283891" }}>
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore your own workflow</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            If your practice is spending time on repeated intake, agreement preparation or document follow-up, Barrana can map one
            workflow and identify where automation would help.
          </p>
          <AuditBookingLink className="btn-accent">
            Find the workflow to automate first <ArrowRight size={16} aria-hidden="true" />
          </AuditBookingLink>
          <p className="mt-3 text-sm text-blue-100">Free 15-minute introductory session. Opens our booking page.</p>
        </div>
      </section>
    </div>
  );
}
