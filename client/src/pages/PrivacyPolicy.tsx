import { Link } from "wouter";
import {
  Database,
  ExternalLink,
  LockKeyhole,
  Mail,
  Megaphone,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const sections = [
  { id: "scope", label: "Scope and accountability" },
  { id: "collection", label: "Information we collect" },
  { id: "uses", label: "How we use information" },
  { id: "meta", label: "Facebook and Instagram ads" },
  { id: "sharing", label: "Service providers and disclosure" },
  { id: "retention", label: "Retention and safeguards" },
  { id: "choices", label: "Your choices and rights" },
  { id: "contact", label: "Contact the Privacy Lead" },
];

const summaryItems = [
  {
    icon: UserRoundCheck,
    title: "You choose what to provide",
    text: "Inquiry forms ask for business contact details and information about the workflow you want to discuss.",
  },
  {
    icon: Database,
    title: "We use it for a defined purpose",
    text: "We use the information to respond, assess fit, deliver services, maintain records, and protect the website.",
  },
  {
    icon: ShieldCheck,
    title: "You can ask about your information",
    text: "You may request access, correction, or deletion, subject to legal and recordkeeping requirements.",
  },
];

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-slate-200 py-10 first:border-t-0 first:pt-0"
    >
      <div className="flex gap-5 sm:gap-7">
        <span
          aria-hidden="true"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E9EDFF] text-xs font-extrabold text-[#283891]"
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-extrabold tracking-[-0.025em] text-[#111A36]">
            {title}
          </h2>
          <div className="mt-5 space-y-4 text-[0.98rem] leading-7 text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-950">
      <SEOHead
        title="Privacy Policy | Barrana.ai"
        description="How Barrana.ai collects, uses, shares, retains, and protects personal information, including information received through Facebook and Instagram ads."
      />

      <section className="relative overflow-hidden bg-[#09142F] text-white">
        <span
          className="absolute inset-0 opacity-35"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(117,135,209,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(117,135,209,0.13) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <span
          className="absolute -right-36 top-10 h-96 w-96 rounded-full border border-[#E7B1CD]/20"
          aria-hidden="true"
        />
        <div className="container relative py-16 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-400"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-200">Privacy Policy</span>
          </nav>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Your information, explained plainly.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                This policy explains how Barrana handles personal information
                from this website, service inquiries, Facebook and Instagram
                ads, Meta lead forms, and the Meta Pixel.
              </p>
              <p className="mt-7 text-sm font-semibold text-[#E7B1CD]">
                Effective October 8, 2026
              </p>
            </div>

            <div className="border-l-2 border-[#7E0F4A] bg-white/[0.055] p-6 backdrop-blur-sm sm:p-7">
              <p className="text-sm font-bold text-white">The short version</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Barrana collects the information needed to respond to business
                inquiries and provide services. We do not sell personal
                information. We use service providers for hosting and customer
                relationship management, and we explain Meta advertising
                separately below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-px bg-slate-200 md:grid-cols-3">
          {summaryItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white px-6 py-7 sm:px-8">
              <Icon size={21} className="text-[#7E0F4A]" aria-hidden="true" />
              <h2 className="mt-4 text-base font-extrabold text-[#111A36]">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container grid max-w-6xl gap-10 py-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border-l-2 border-[#283891] pl-5">
            <h2 className="text-sm font-extrabold text-[#111A36]">
              On this page
            </h2>
            <nav aria-label="Privacy policy sections" className="mt-4">
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm leading-5 text-slate-500 transition hover:text-[#7E0F4A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#283891]"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 rounded-xl bg-[#E9EDFF] p-5">
            <LockKeyhole
              size={20}
              className="text-[#283891]"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-bold text-[#111A36]">
              Privacy request
            </p>
            <a
              href="mailto:help@barrana.ai?subject=Privacy%20request"
              className="mt-2 block break-all text-sm font-semibold text-[#283891] underline decoration-[#283891]/30 underline-offset-4 hover:text-[#7E0F4A]"
            >
              help@barrana.ai
            </a>
          </div>
        </aside>

        <article className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm shadow-slate-950/[0.03] sm:px-10 lg:px-12">
          <PolicySection
            id="scope"
            number="01"
            title="Scope and accountability"
          >
            <p>
              This policy applies to personal information handled by Barrana.ai,
              also called Barrana, through barrana.ai, its campaign pages,
              inquiry forms, automation planner, direct communications, and ads
              or lead forms operated through Facebook and Instagram.
            </p>
            <p>
              Barrana is responsible for personal information under its control.
              The Privacy Lead receives questions, access requests, correction
              requests, deletion requests, and complaints using the contact
              details at the end of this policy.
            </p>
          </PolicySection>

          <PolicySection
            id="collection"
            number="02"
            title="Information we collect"
          >
            <p>We collect information in four ways:</p>
            <ul className="list-disc space-y-3 pl-5 marker:text-[#7E0F4A]">
              <li>
                <strong className="text-[#111A36]">
                  Information you provide.
                </strong>{" "}
                This may include your name, work email, phone number, business
                name, industry, team size, workflow details, operational
                challenges, appointment information, and anything else you
                include in a message.
              </li>
              <li>
                <strong className="text-[#111A36]">
                  Information from Meta.
                </strong>{" "}
                If you respond to a Barrana ad or submit a Facebook or Instagram
                lead form, Meta may provide us with your form responses, contact
                details, campaign source, and related lead information.
              </li>
              <li>
                <strong className="text-[#111A36]">
                  Meta Pixel event information.
                </strong>{" "}
                The Meta Pixel may use cookies or similar technology and send
                Meta a PageView event when you open a page. After the main
                contact form is submitted successfully, it also sends a Lead
                event labelled Initial Workflow Conversation. These events may
                include the page URL, referring page, browser or device details,
                and the IP address processed during the request. The current
                Lead event does not include the information entered in the form.
              </li>
              <li>
                <strong className="text-[#111A36]">
                  Technical information.
                </strong>{" "}
                Website hosting and security logs may record an IP address,
                browser and device information, requested pages, referring page,
                and timestamps. The site may store a theme choice and
                dismissed-notice preference in your browser.
              </li>
            </ul>
            <div className="rounded-xl border border-[#283891]/15 bg-[#F5F6FA] p-5 text-sm leading-6 text-slate-600">
              Barrana currently uses Meta Pixel ID 1757222568845282. You can
              block or delete cookies through your browser and manage
              advertising preferences through Meta. Blocking advertising
              technology does not prevent you from submitting a Barrana form.
            </div>
          </PolicySection>

          <PolicySection id="uses" number="03" title="How we use information">
            <p>We use personal information to:</p>
            <ul className="list-disc space-y-3 pl-5 marker:text-[#7E0F4A]">
              <li>
                respond to an inquiry and determine whether Barrana can help
                with the workflow described;
              </li>
              <li>schedule and prepare for a business conversation;</li>
              <li>provide, support, and document agreed services;</li>
              <li>
                maintain customer relationship records and avoid duplicate or
                conflicting follow-up;
              </li>
              <li>understand which campaign or page produced an inquiry;</li>
              <li>measure advertising performance and reported conversions;</li>
              <li>
                operate, troubleshoot, and protect the website and its forms;
              </li>
              <li>
                meet contractual, accounting, legal, and regulatory obligations;
                and
              </li>
              <li>
                send marketing messages where you have consented or where the
                law otherwise permits them.
              </li>
            </ul>
            <p>
              We do not use an inquiry alone as consent to send unrelated
              marketing. You may unsubscribe from marketing messages at any
              time. We may still send messages needed to answer your request or
              provide a service.
            </p>
          </PolicySection>

          <PolicySection
            id="meta"
            number="04"
            title="Facebook and Instagram advertising"
          >
            <div className="mb-6 flex items-start gap-4 border-l-2 border-[#7E0F4A] bg-[#FFF8FC] p-5">
              <Megaphone
                size={22}
                className="mt-1 shrink-0 text-[#7E0F4A]"
                aria-hidden="true"
              />
              <p className="m-0 text-sm leading-6 text-slate-700">
                This section is included so a person who finds Barrana through a
                Meta ad can understand what happens to the information they
                submit and how website events are measured.
              </p>
            </div>
            <p>
              Meta operates Facebook and Instagram and processes information
              under its own terms and privacy policy. When you view or interact
              with an ad, Meta may collect information about that activity. When
              you submit a Meta lead form, Meta sends the information you chose
              to provide to Barrana.
            </p>
            <p>
              Barrana uses Meta lead information to contact you about the
              request, assess service fit, record the source of the inquiry, and
              review campaign performance at the lead level. The Meta Pixel is
              used to record website page views and successful submissions of
              the main contact form. Meta may connect Pixel event information
              with information it already holds, as described in its own privacy
              policy.
            </p>
            <p>
              We do not sell Meta lead information. We do not ask Meta lead-form
              users to provide passwords, government identification numbers,
              financial account details, health information, or information
              about children.
            </p>
            <p>
              You can review Meta&apos;s practices and manage advertising
              preferences using Meta&apos;s own controls:
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-[#283891] underline decoration-[#283891]/30 underline-offset-4 hover:text-[#7E0F4A]"
              >
                Meta Privacy Policy{" "}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a
                href="https://accountscenter.facebook.com/ad_preferences/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-[#283891] underline decoration-[#283891]/30 underline-offset-4 hover:text-[#7E0F4A]"
              >
                Meta ad preferences{" "}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </PolicySection>

          <PolicySection
            id="sharing"
            number="05"
            title="Service providers and disclosure"
          >
            <p>
              We disclose personal information only for the purposes described
              in this policy, including to:
            </p>
            <ul className="list-disc space-y-3 pl-5 marker:text-[#7E0F4A]">
              <li>
                <strong className="text-[#111A36]">
                  HighLevel and LeadConnector
                </strong>
                , which receive website-form and lead information for customer
                relationship management, contact records, and follow-up;
              </li>
              <li>
                <strong className="text-[#111A36]">Hostinger</strong>, which
                hosts the website and may process technical and server-log
                information;
              </li>
              <li>
                <strong className="text-[#111A36]">Meta</strong>, which may
                receive lead-form information and website events when you use
                Facebook, Instagram, or barrana.ai;
              </li>
              <li>
                contractors, advisers, or technology providers that need the
                information to perform work for Barrana;
              </li>
              <li>
                government, regulatory, law-enforcement, or legal parties when
                disclosure is required or permitted by law; and
              </li>
              <li>
                a buyer or successor in connection with a proposed or completed
                business transaction, subject to appropriate protections.
              </li>
            </ul>
            <p>
              Some service providers process information outside Canada.
              Personal information stored or processed in another country may be
              subject to that country&apos;s laws and lawful access by its
              courts, law-enforcement agencies, or regulators.
            </p>
          </PolicySection>

          <PolicySection
            id="retention"
            number="06"
            title="Retention and safeguards"
          >
            <p>
              Barrana keeps personal information only as long as reasonably
              needed for the purpose it was collected, the business
              relationship, recordkeeping, dispute resolution, security, and
              legal requirements. When the information is no longer required, we
              delete it, anonymize it, or allow it to be overwritten through the
              normal operation of backup systems.
            </p>
            <p>
              We use administrative, technical, and organizational safeguards
              that are appropriate to the sensitivity of the information. These
              may include limited access, account controls, encrypted
              transmission, service provider controls, and incident response
              procedures. No website, email, or storage system can guarantee
              absolute security.
            </p>
          </PolicySection>

          <PolicySection
            id="choices"
            number="07"
            title="Your choices and rights"
          >
            <p>You may contact the Privacy Lead to:</p>
            <ul className="list-disc space-y-3 pl-5 marker:text-[#7E0F4A]">
              <li>ask whether Barrana holds personal information about you;</li>
              <li>request access to, or correction of, that information;</li>
              <li>withdraw consent, subject to legal or contractual limits;</li>
              <li>
                request deletion where Barrana is not required to keep the
                information;
              </li>
              <li>opt out of marketing communications; or</li>
              <li>
                raise a question or complaint about Barrana&apos;s information
                practices.
              </li>
            </ul>
            <p>
              We may need to verify your identity before completing a request.
              We will explain any legal exception or limit that prevents us from
              completing all or part of a request.
            </p>
            <p>
              The website and Barrana&apos;s services are intended for
              businesses and adults. We do not knowingly solicit personal
              information from children.
            </p>
          </PolicySection>

          <PolicySection
            id="contact"
            number="08"
            title="Contact the Privacy Lead"
          >
            <p>
              Send privacy questions and requests with the subject line{" "}
              <strong className="text-[#111A36]">Privacy request</strong>.
            </p>
            <div className="grid gap-5 rounded-xl bg-[#09142F] p-6 text-slate-200 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="font-bold text-white">Privacy Lead, Barrana.ai</p>
                <p className="mt-2 text-sm leading-6">
                  50 Corstate Avenue, Unit 01
                </p>
                <p className="text-sm leading-6">
                  Vaughan, Ontario L4K 4X2, Canada
                </p>
              </div>
              <a
                href="mailto:help@barrana.ai?subject=Privacy%20request"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#7E0F4A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6A0C3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail size={16} aria-hidden="true" />
                Email the Privacy Lead
              </a>
            </div>
            <p>
              If Barrana does not resolve a privacy concern to your
              satisfaction, you may contact the{" "}
              <a
                href="https://www.priv.gc.ca/en/report-a-concern/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#283891] underline decoration-[#283891]/30 underline-offset-4 hover:text-[#7E0F4A]"
              >
                Office of the Privacy Commissioner of Canada
              </a>
              .
            </p>
            <p>
              We may update this policy when our services, providers,
              advertising tools, or legal obligations change. The effective date
              at the top of the page identifies the current version.
            </p>
          </PolicySection>
        </article>
      </div>
    </div>
  );
}
