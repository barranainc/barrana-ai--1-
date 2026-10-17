// Patches applied to the live production bundle (no source code is available, only the built JS).
// Each patch must match exactly `count` times (or at least `min` times) or the build stops,
// so a changed upstream bundle cannot be patched silently in the wrong place.

const J = (v) => JSON.stringify(v);

// Per-service workflow diagrams on /services (audit task 4). Icons are reused from the existing step sets.
const PIPELINES = {
  appointment: [
    ["form", "Booking Request", "Online / phone"], ["book", "Slot Booked", "Calendar synced"], ["confirm", "Confirmation", "Instant email / SMS"],
    ["remind", "Reminders", "48hr + 2hr"], ["followup", "Follow-Up", "After the visit"]],
  invoice: [
    ["open", "Work Completed", "Trigger event"], ["record", "Invoice Generated", "From job data"], ["inquiry", "Invoice Sent", "Email + pay link"],
    ["remind", "Payment Reminders", "7 / 14 / 21 days"], ["confirm", "Reconciled", "Accounting sync"]],
  workflow: [
    ["form", "Trigger Event", "Form / email"], ["record", "Record Created", "CRM / sheet"], ["assign", "Task Assigned", "Right owner"],
    ["track", "Tools Updated", "Status synced"], ["flag", "Exceptions Flagged", "Team alerted"]],
  crm: [
    ["inquiry", "New Contact", "Form / email / call"], ["confirm", "Duplicate Check", "Matched to record"], ["record", "Fields Updated", "Auto-filled"],
    ["track", "Stage Moved", "On client action"], ["followup", "Follow-Up Task", "Owner assigned"]],
  reporting: [
    ["record", "Data Collected", "CRM, invoices, calendar"], ["track", "Metrics Calculated", "Daily / weekly"], ["flag", "Exceptions Flagged", "Overdue / stalled"],
    ["inquiry", "Report Sent", "Email / dashboard"], ["assign", "Owner Review", "Human decision"]],
  afterHours: [
    ["form", "After-Hours Enquiry", "Call / form / SMS"], ["ai", "Instant Reply", "< 90 seconds"], ["qualify", "Details Captured", "Need + urgency"],
    ["flag", "Urgent Escalated", "On-call alerted"], ["crm", "Morning Queue", "CRM + callback"]],
  aiAgents: [
    ["inquiry", "Request Received", "Any channel"], ["ai", "Intent Classified", "AI agent"], ["book", "Action Taken", "Book / route / create"],
    ["record", "Result Logged", "CRM record"], ["assign", "Human Review", "Exceptions escalated"]],
  customAi: [
    ["open", "Workflow Mapped", "Scope agreed"], ["checklist", "System Designed", "You approve first"], ["track", "Built & Tested", "Real scenarios"],
    ["confirm", "Go Live", "Team trained"], ["flag", "Monitored", "Logs + alerts"]],
};
const SERVICE_PIPELINE = {
  "appointment-automation": ["leadCapture", "appointment"],
  "invoice-automation": ["documentCollection", "invoice"],
  "workflow-automation": ["clientIntake", "workflow"],
  "crm-automation": ["clientIntake", "crm"],
  "operations-reporting": ["clientIntake", "reporting"],
  "after-hours-automation": ["leadCapture", "afterHours"],
  "ai-agents": ["clientIntake", "aiAgents"],
  "custom-ai-systems": ["clientIntake", "customAi"],
};
const pipelineInit =
  "(function(G){var I={};[].concat(G.leadCapture,G.clientIntake,G.documentCollection).forEach(function(s){I[s.id]=s.icon});" +
  "var P=" + J(PIPELINES) + ";Object.keys(P).forEach(function(k){G[k]=P[k].map(function(s,n){return{id:k+'-'+n,label:s[1],sublabel:s[2],icon:I[s[0]],color:n%2?'#7E0F4A':'#283891'}})})})(Ga);";

// Extra cards for the Resources hub so every retained resource hub is reachable (audit task 6).
const HUB_CARDS = [
  { category: "Tool", title: "Automation Planner", description: "Answer guided questions about your workflows and get a phased roadmap, including what should stay human-led.", readTime: "3–5 min", color: "#283891", href: "/automation-planner", cta: "Open the planner" },
  { category: "Tool", title: "Automation ROI Calculator", description: "Estimate the time and cost of manual work in your business using your own inputs and assumptions.", readTime: "Interactive", color: "#7E0F4A", href: "/automation-roi-calculator", cta: "Open the calculator" },
  { category: "Playbooks", title: "Automation Playbooks", description: "Step-by-step guides for lead response, booking reminders, client onboarding, document collection, invoicing, and after-hours capture.", readTime: "6 playbooks", color: "#283891", href: "/playbooks", cta: "Browse playbooks" },
  { category: "Reference", title: "Workflow Templates", description: "Visual templates showing how common automated workflows are structured, step by step.", readTime: "Templates", color: "#7E0F4A", href: "/templates", cta: "View templates" },
  { category: "Reference", title: "Before and After", description: "Side-by-side comparisons of common business workflows before and after coordination tasks are automated.", readTime: "8 workflows", color: "#283891", href: "/before-after", cta: "See comparisons" },
  { category: "Reference", title: "Automation Benchmarks", description: "Typical outcome ranges reported for automation projects in GTA service businesses.", readTime: "Reference", color: "#7E0F4A", href: "/benchmarks", cta: "View benchmarks" },
  { category: "Reference", title: "AI Automation Glossary", description: "Plain-language definitions of AI automation terms for small business owners.", readTime: "Glossary", color: "#283891", href: "/glossary", cta: "Open the glossary" },
  { category: "Knowledge Base", title: "Knowledge Base", description: "In-depth articles on lead automation, client intake, AI agents, and workflow automation fundamentals.", readTime: "5 articles", color: "#7E0F4A", href: "/knowledge", cta: "Read articles" },
  { category: "Operator Insights", title: "Operator Insights", description: "Short field notes on response time, follow-up, intake costs, and the controls every automation needs.", readTime: "6 articles", color: "#283891", href: "/operator-insights", cta: "Read insights" },
  { category: "Case Studies", title: "Case Studies", description: "How GTA service businesses automated intake, follow-up, scheduling, and invoicing.", readTime: "12 case studies", color: "#7E0F4A", href: "/case-studies", cta: "Read case studies" },
  { category: "Reference", title: "Integrations", description: "The business tools Barrana connects, including CRMs, scheduling, accounting, and automation platforms.", readTime: "Tool directory", color: "#283891", href: "/integrations", cta: "See integrations" },
  { category: "Answers", title: "Frequently Asked Questions", description: "Answers about cost, timelines, data handling, and how an automation engagement works.", readTime: "FAQ", color: "#7E0F4A", href: "/faq", cta: "Read the FAQ" },
];

const RETIRED_RE = /path:"(\/resources\/(?:automation-playbooks|ai-automation-glossary|workflow-templates|automation-benchmarks|before-and-after|roi-calculator))",component:[A-Za-z0-9_$]+/g;

export function indexPatches() {
  const p = [
    // ---- Task 2: descriptions from the route-level SEO component ----
    { name: "seo: description override + placeholder guard", find: 'u=iv(d?.querySelector("p")||s?.querySelector("p"))', replace: 'u=window.__bDesc(i,iv(d?.querySelector("p")||s?.querySelector("p")))', count: 1 },
    { name: "seo: post-render description/Article pass", find: "document.title=h,TB(o),", replace: "document.title=h,TB(o),setTimeout(()=>window.__bAfter(i),60),setTimeout(()=>window.__bAfter(i),700),", count: 1 },
    { name: "seo: knowledge articles use og:type article", find: '["/resources/","/insights/","/workflows/","/playbooks/","/operator-insights/"]', replace: '["/resources/","/insights/","/workflows/","/playbooks/","/operator-insights/","/knowledge/"]', count: 1 },
    { name: "seo: consistent title suffix", find: /\| Barrana AI(?: Resources)?(?=["`])/g, replace: "| Barrana.ai", min: 1 },

    // ---- Task 1: retired duplicate URLs ----
    { name: "redirect: retired routes", find: RETIRED_RE, replace: 'path:"$1",component:window.__bRedir', count: 6 },
    { name: "links: retired ROI calculator URL", find: 'href:"/resources/roi-calculator"', replace: 'href:"/automation-roi-calculator"', count: 1 },

    // ---- Task 4: visible escape sequences ----
    { name: "text: \\u2013 escapes", find: "\\\\u2013", replace: "–", count: 5 },
    { name: "text: \\u00B7 escape", find: '" \\\\u00B7 "', replace: '" · "', count: 1 },

    // ---- Task 4: service diagrams ----
    { name: "diagram: client intake is not immigration-only", find: 'label:"Assign File",sublabel:"By visa type"', replace: 'label:"Assign File",sublabel:"Right team member"', count: 1 },
    { name: "diagram: per-service pipelines", find: "]};function SA(t=.15)", replace: "]};" + pipelineInit + "function SA(t=.15)", count: 1 },
    ...Object.entries(SERVICE_PIPELINE).map(([slug, [from, to]]) => ({
      name: "diagram: " + slug,
      find: new RegExp('(slug:"' + slug + '"[^]{0,700}?pipeline:Ga\\.)' + from + "\\b", "g"),
      replace: "$1" + to,
      count: 1,
    })),

    // ---- Task 4: one consistent timeline definition ----
    { name: "timeline: process intro", find: "Five stages. Fixed pricing. Your first automation live in 2–3 weeks.", replace: "Five stages. Fixed pricing. Your first workflow is typically live 2–4 weeks after the first call.", count: 1 },
    { name: "timeline: FAQ setup", find: "First workflow: 1–2 weeks. Full multi-workflow system: 4–8 weeks. You start seeing results from Week 1, not Month 3.", replace: "First workflow: typically 1–2 weeks of build and testing, live 2–4 weeks after the first call once scope is approved. Full multi-workflow system: typically 4–10 weeks, depending on the number of workflows and integrations.", count: 1 },
    { name: "timeline: FAQ results", find: "First automated workflow goes live in 1–2 weeks. Measurable results visible within the first week of operation. Full system payback typically 30–60 days.", replace: "Your first automated workflow typically goes live 2–4 weeks after the first call (about 1–2 weeks of that is build and testing). Results depend on your volumes, so we agree on what to measure before launch.", count: 1 },
    { name: "timeline: FAQ results (long form)", find: "First automated workflow goes live in 1 to 2 weeks. You will see results - faster responses, fewer missed leads, less admin time - within the first week of operation. Full system payback: typically 30 to 60 days.", replace: "Your first automated workflow typically goes live 2 to 4 weeks after the first call, of which about 1 to 2 weeks is build and testing. Results depend on your volumes, so we agree on what to measure before launch.", count: 1 },

    // ---- Task 5: do not add cash-flow timing or capacity value to revenue ----
    { name: "claims: accounting headline", find: "$82,000+ in new revenue", replace: "$52,000 in new revenue", count: 2 },
    { name: "claims: accounting detail (range)", find: "65 additional clients at avg $800 = $52,000 new revenue. Invoice delays eliminated = $30,000–$50,000 accelerated cash flow.", replace: "65 additional clients at avg $800 = $52,000 in new annual revenue. Separately, faster invoicing brought forward an estimated $30,000–$50,000 in cash flow - a timing benefit, not new revenue.", count: 1 },
    { name: "claims: accounting detail", find: "65 additional clients at avg $800 = $52,000 new revenue. Invoice delays eliminated = $30,000+ accelerated cash flow.", replace: "65 additional clients at avg $800 = $52,000 in new annual revenue. Separately, faster invoicing brought forward $30,000+ in cash flow - a timing benefit, not new revenue.", count: 1 },
    { name: "claims: immigration headline", find: "$86,400+ recovered", replace: "$50,000+ in captured leads", count: 2 },
    { name: "claims: immigration detail", find: "14 staff hours/week recovered = $36,400/yr in capacity. 25% more client files handled. $50,000+ in captured evening leads.", replace: "Revenue: $50,000+ from captured evening leads. Capacity: 14 staff hours/week recovered (about $36,400/yr in staff time, not cash savings). 25% more client files handled.", count: 2 },

    // ---- Task 6: internal links ----
    { name: "footer: link FAQ, case studies, resources", find: '{label:"About Barrana",href:"/about"}],CB=[', replace: '{label:"About Barrana",href:"/about"},{label:"Resources",href:"/resources"},{label:"Case Studies",href:"/case-studies"},{label:"FAQ",href:"/faq"},{label:"Privacy Policy",href:"/privacy-policy"}],CB=[', count: 1 },
    { name: "resources: hub cards", find: 'href:"/resources/integration-priority-matrix"}],RW=[', replace: 'href:"/resources/integration-priority-matrix"},' + HUB_CARDS.map(J).join(",") + "],RW=[", count: 1 },
    { name: "resources: card call-to-action label", find: 'className:"flex items-center gap-1.5 text-xs font-semibold mt-auto",style:{color:b.color},children:["Read guide",', replace: 'className:"flex items-center gap-1.5 text-xs font-semibold mt-auto",style:{color:b.color},children:[b.cta||"Read guide",', count: 1 },
    {
      name: "integrations: link tool cards to detail pages",
      fn: (s) => {
        const start = s.indexOf("function kR(");
        const end = s.indexOf("const AR={", start);
        if (start < 0 || end < 0) throw new Error("kR not found");
        const body = s.slice(start, end);
        const n = body.split("children:i.name})").length - 1;
        if (n !== 1) throw new Error("integrations card name matched " + n + " times");
        return s.slice(0, start) + body.replace("children:i.name})", 'children:window.__bIntHref(i.name)?e.jsx(C,{href:window.__bIntHref(i.name),style:{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"},children:i.name}):i.name})') + s.slice(end);
      },
    },

    {
      name: "playbooks hub: list the industry playbooks",
      find: 'slug:"after-hours-capture"}];function p1(',
      replace:
        'slug:"after-hours-capture"},' +
        [
          { emoji: "📊", title: "Accounting Firm Playbook", desc: "Document collection, onboarding, and invoicing for accounting practices", steps: 16, slug: "accounting-firm" },
          { emoji: "🔧", title: "Contractor Playbook", desc: "Lead response, quote follow-up, and invoicing for contractors", steps: 16, slug: "contractor" },
          { emoji: "🛂", title: "Immigration Consultant Playbook", desc: "Intake, document tracking, and deadlines for immigration firms", steps: 20, slug: "immigration-consultant" },
          { emoji: "🏥", title: "Physiotherapy Clinic Playbook", desc: "Reminders, digital intake, and no-show reduction for clinics", steps: 16, slug: "physiotherapy-clinic" },
        ].map(J).join(",") +
        "];function p1(",
      count: 1,
    },
    {
      name: "operator insights hub: list the industry articles",
      find: '"}];function yR(',
      replace:
        '"},' +
        [
          { slug: "/operator-insights/accounting-firm-automation", tag: "Accounting", date: "", readTime: "8 min read", title: "Automation for Accounting Firms: The Document Chase Problem", excerpt: "Every accounting firm has the same problem: clients who do not send their documents on time." },
          { slug: "/operator-insights/contractor-lead-automation", tag: "Contractors", date: "", readTime: "7 min read", title: "Lead Automation for Contractors: Why Response Time Is Everything", excerpt: "Contractors lose more qualified leads to slow response time than to price." },
          { slug: "/operator-insights/immigration-consultant-automation", tag: "Immigration", date: "", readTime: "9 min read", title: "Automation for Immigration Consultants: What Works and What Does Not", excerpt: "High-volume intake, complex document requirements, strict deadlines, and precise file tracking." },
          { slug: "/operator-insights/law-firm-intake-automation", tag: "Legal", date: "", readTime: "10 min read", title: "Client Intake Automation for Law Firms: Compliance and Efficiency", excerpt: "Automating intake while keeping conflict checks, engagement letters, and professional obligations intact." },
          { slug: "/operator-insights/physiotherapy-no-show-reduction", tag: "Healthcare", date: "", readTime: "6 min read", title: "No-Show Reduction for Physiotherapy Clinics: A Systems Approach", excerpt: "A clinic with a 20 percent no-show rate is losing 20 percent of its appointment capacity every week." },
        ].map(J).join(",") +
        "];function yR(",
      count: 1,
    },
    { name: "integrations: list Jobber (has a detail page)", find: '{name:"Pipedrive",emoji:"🟢",desc:"Sales-focused pipeline management"}]', replace: '{name:"Pipedrive",emoji:"🟢",desc:"Sales-focused pipeline management"},{name:"Jobber",emoji:"🛠️",desc:"Field service quotes, scheduling, and invoicing"}]', count: 1 },
    {
      name: "locations: link every city/industry page from /locations",
      find: 'e.jsx("section",{"data-loc":"client/src/pages/Locations.tsx:58",className:"py-16",style:{backgroundColor:"#283891"},',
      replace:
        'e.jsx("section",{style:{padding:"0 0 5rem",background:"#fff"},children:e.jsxs("div",{className:"container",children:[' +
        'e.jsx("h2",{style:{fontSize:"1.5rem",fontWeight:700,color:"#111827",marginBottom:"1.25rem"},children:"Local Guides by City and Industry"}),' +
        'e.jsx("ul",{style:{listStyle:"none",padding:0,margin:0,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"0.5rem 2rem"},' +
        'children:EA.map(x=>e.jsx("li",{children:e.jsx(C,{href:x.route,style:{color:"#283891",fontSize:"0.9rem",textDecoration:"none"},children:x.industry+" in "+x.city})},x.route))})]})}),' +
        'e.jsx("section",{"data-loc":"client/src/pages/Locations.tsx:58",className:"py-16",style:{backgroundColor:"#283891"},',
      count: 1,
    },

    // ---- Task 7: structured data ----
    { name: "schema: drop duplicate service breadcrumb", find: 'e.jsx("script",{"data-loc":"client/src/components/service/ServicePageLayout.tsx:177",type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(u)}}),', replace: "", count: 1 },
    { name: "schema: drop duplicate case-study breadcrumb", find: 'e.jsx("script",{"data-loc":"client/src/components/case-study/CaseStudyPageLayout.tsx:282",type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(u)}}),', replace: "", count: 1 },
    { name: "schema: drop duplicate industry breadcrumb", find: 'e.jsx("script",{"data-loc":"client/src/components/industry/IndustryPageLayout.tsx:193",type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(g)}}),', replace: "", count: 1 },
    { name: "schema: breadcrumb microdata (list)", find: ',itemScope:!0,itemType:"https://schema.org/BreadcrumbList"', replace: "", count: 1 },
    { name: "schema: breadcrumb microdata (item)", find: ',itemProp:"itemListElement",itemScope:!0,itemType:"https://schema.org/ListItem"', replace: "", count: 1 },
    { name: "schema: breadcrumb microdata (link)", find: 'href:o.href,itemProp:"item",', replace: "href:o.href,", count: 1 },
    { name: "schema: breadcrumb microdata (name)", find: /itemProp:"name",(?=children:o\.label|style:\{color:\$p\},"aria-current")/g, replace: "", count: 2 },
    { name: "schema: breadcrumb microdata (position)", find: 'e.jsx("meta",{"data-loc":"client/src/components/linking/BreadcrumbNav.tsx:99",itemProp:"position",content:String(s+1)}),', replace: "", count: 1 },
    { name: "schema: normalise every JSON-LD block", find: /(type:"application\/ld\+json",dangerouslySetInnerHTML:\{__html:JSON\.stringify\()([A-Za-z0-9_$.]+)\)/g, replace: "$1window.__bLd($2))", min: 8 },

    // ---- Task 10: forms and conversion events ----
    { name: "tracking: contact form lead event", find: 'window.fbq?.("track","Lead",{content_name:"Initial Workflow Conversation"}),', replace: 'window.fbq?.("track","Lead",{content_name:"Initial Workflow Conversation"}),window.__bTrack("generate_lead",{form_name:"Initial Workflow Conversation"}),', count: 1 },
    { name: "campaign form: check response", find: 'try{await fetch("/api/lead",', replace: 'try{const __r=await fetch("/api/lead",', count: 1 },
    {
      name: "campaign form: only show success after a successful submit",
      find: ",i]})})}catch{}d(!1),s(!0)}",
      replace: ',i]})});if(!__r.ok)throw new Error(String(__r.status));window.fbq?.("track","Lead",{content_name:"Campaign - "+t});window.__bTrack("generate_lead",{form_name:"Campaign - "+t})}catch{d(!1);window.alert("Sorry - your request could not be sent. Please try again, or use the form at barrana.ai/contact.");return}d(!1),s(!0)}',
      count: 1,
    },
  ];
  return p;
}

export function plannerPatches() {
  return [
    { name: "tracking: planner completion", find: "function zt({state:n,onRestart:t}){", replace: 'function zt({state:n,onRestart:t}){x.useEffect(()=>{window.__bTrack&&window.__bTrack("planner_complete",{industry:n.industry||""})},[]);', count: 1 },
  ];
}

export function applyPatches(src, patches, log) {
  for (const p of patches) {
    if (p.fn) {
      src = p.fn(src);
      log(`  ok   ${p.name}`);
      continue;
    }
    const n = typeof p.find === "string" ? src.split(p.find).length - 1 : (src.match(p.find) || []).length;
    const bad = p.count !== undefined ? n !== p.count : n < (p.min ?? 1);
    if (bad) throw new Error(`Patch "${p.name}" matched ${n} times (expected ${p.count ?? ">=" + (p.min ?? 1)})`);
    src = typeof p.find === "string" ? src.split(p.find).join(p.replace) : src.replace(p.find, p.replace);
    log(`  ok   ${p.name} (${n})`);
  }
  return src;
}
