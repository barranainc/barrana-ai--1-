import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, ClipboardCheck, Route, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import { submitLead } from "@/lib/ghl";

const industries = [
  "Professional services",
  "Home services and trades",
  "Healthcare and clinics",
  "Real estate and property",
  "Financial services",
  "Education and training",
  "Other",
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#283891] focus:ring-4 focus:ring-[#283891]/10";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    industry: "",
    teamSize: "",
    workflow: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setLoading(true);

    try {
      const nameParts = formData.name.trim().split(/\s+/);
      const result = await submitLead({
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" ") || undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        companyName: formData.business.trim(),
        industry: formData.industry,
        message: formData.workflow.trim(),
        formName: "Initial Workflow Conversation",
        pageUrl: window.location.href,
        tags: ["website-lead", "workflow-conversation"],
        customFields: [
          { key: "team_size", field_value: formData.teamSize },
        ],
      });

      if (!result.success) {
        throw new Error(result.error || "The request could not be submitted.");
      }

      setSubmitted(true);
      toast.success("Your request was sent.");
    } catch (error) {
      console.error("Workflow conversation request failed:", error);
      const message =
        "We could not send your request. Please check your connection and try again.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-950">
      <SEOHead
        title="Find the Workflow AI Should Fix First | Barrana.ai"
        description="Tell Barrana about one repeated workflow. The initial conversation determines fit, scope, and whether automation is the right next step."
      />

      <section className="relative overflow-hidden bg-[#09142F] py-16 text-white lg:py-20">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(117,135,209,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(117,135,209,0.14) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container relative max-w-5xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9BE5DD]">Initial workflow conversation</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Find the workflow AI should fix first.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Bring one repeated workflow that creates delay, copying, chasing, or unclear ownership. Barrana will use the conversation to determine fit, scope, and whether automation is the right next step.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7E0F4A]">What this conversation covers</p>
              <ul className="mt-5 space-y-4">
                {[
                  "The trigger that starts the workflow",
                  "The tools and people involved",
                  "The repeated handoff or constraint",
                  "The exceptions that need human judgment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#283891]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#172865] p-6 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#9BE5DD]" aria-hidden="true" />
                <h2 className="font-bold">Clear boundary</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-blue-100">
                The initial conversation is for fit and scope. It is not a promise of a free strategy, solution design, implementation plan, audit deliverable, or price quote.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3 text-[#283891]">
                <Route size={19} aria-hidden="true" />
                <h2 className="font-bold text-[#111A36]">A useful description</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                “When this happens, someone checks these details, updates this tool, and follows up with this person.”
              </p>
            </div>
          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03] sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[32rem] flex-col items-center justify-center text-center" role="status">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EDFF] text-[#283891]">
                  <ClipboardCheck size={27} aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-extrabold text-[#111A36]">Your workflow request was sent.</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                  Barrana will review the context you provided and contact you about the appropriate next step.
                </p>
                <Link href="/" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#283891] hover:text-[#7E0F4A]">
                  Return to the homepage <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-200 pb-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7E0F4A]">Workflow intake</p>
                  <h2 className="mt-3 text-2xl font-extrabold text-[#111A36]">Tell us where the work gets stuck.</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Required fields are marked with an asterisk.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700">Full name <span aria-hidden="true" className="text-[#7E0F4A]">*</span></label>
                      <input id="contact-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700">Work email <span aria-hidden="true" className="text-[#7E0F4A]">*</span></label>
                      <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" required value={formData.email} onChange={handleChange} className={fieldClass} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="text-sm font-semibold text-slate-700">Phone <span className="font-normal text-slate-400">optional</span></label>
                      <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="contact-business" className="text-sm font-semibold text-slate-700">Business name <span aria-hidden="true" className="text-[#7E0F4A]">*</span></label>
                      <input id="contact-business" name="business" type="text" autoComplete="organization" required value={formData.business} onChange={handleChange} className={fieldClass} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-industry" className="text-sm font-semibold text-slate-700">Industry <span aria-hidden="true" className="text-[#7E0F4A]">*</span></label>
                      <select id="contact-industry" name="industry" required value={formData.industry} onChange={handleChange} className={fieldClass}>
                        <option value="">Select an industry</option>
                        {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-team-size" className="text-sm font-semibold text-slate-700">Team size <span className="font-normal text-slate-400">optional</span></label>
                      <select id="contact-team-size" name="teamSize" value={formData.teamSize} onChange={handleChange} className={fieldClass}>
                        <option value="">Select a range</option>
                        <option value="1">1</option>
                        <option value="2-10">2 to 10</option>
                        <option value="11-25">11 to 25</option>
                        <option value="26-50">26 to 50</option>
                        <option value="51+">51 or more</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-workflow" className="text-sm font-semibold text-slate-700">Describe one repeated workflow <span aria-hidden="true" className="text-[#7E0F4A]">*</span></label>
                    <p id="workflow-help" className="mt-1 text-xs leading-5 text-slate-500">What starts it, what happens next, and where does the work slow down or get lost?</p>
                    <textarea id="contact-workflow" name="workflow" required rows={6} minLength={20} aria-describedby="workflow-help submit-status" value={formData.workflow} onChange={handleChange} className={`${fieldClass} resize-y`} />
                  </div>

                  <div id="submit-status" aria-live="polite">
                    {submitError && (
                      <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{submitError}</p>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#283891] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1F2D75] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#283891] disabled:cursor-wait disabled:opacity-70">
                    {loading ? "Sending your request..." : "Find the Workflow AI Should Fix First"}
                    {!loading && <ArrowRight size={17} aria-hidden="true" />}
                  </button>
                  <p className="text-center text-xs leading-5 text-slate-500">
                    Submit only information you are comfortable sharing for an initial business conversation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
