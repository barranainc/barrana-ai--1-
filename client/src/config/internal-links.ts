/**
 * internal-links.ts
 * Comprehensive internal linking configuration for every page on barrana.ai.
 * Each entry maps a route path to its outbound links for SEO cross-linking.
 */

export interface PageLinks {
  pillar?: string;
  services: { href: string; label: string }[];
  industries: { href: string; label: string }[];
  workflows: { href: string; label: string }[];
  caseStudies: { href: string; label: string }[];
  decisions: { href: string; label: string }[];
  local: { href: string; label: string }[];
  cta: "planner" | "strategy-call" | "audit";
}

/* ------------------------------------------------------------------ */
/*  Shorthand helpers - keep the map DRY                              */
/* ------------------------------------------------------------------ */

const S = {
  leadResponse:    { href: "/services/lead-response-automation",  label: "Lead Response Automation" },
  clientIntake:    { href: "/services/client-intake-automation",   label: "Client Intake Automation" },
  aiReceptionist:  { href: "/services/ai-receptionist",           label: "AI Receptionist" },
  documentCollection: { href: "/services/document-collection",    label: "Document Collection" },
  appointment:     { href: "/services/appointment-automation",     label: "Appointment Automation" },
  invoice:         { href: "/services/invoice-automation",         label: "Invoice Automation" },
  workflow:        { href: "/services/workflow-automation",         label: "Workflow Automation" },
  crm:             { href: "/services/crm-automation",             label: "CRM Automation" },
  opsReporting:    { href: "/services/operations-reporting",       label: "Operations Reporting" },
  afterHours:      { href: "/services/after-hours-automation",     label: "After-Hours Automation" },
  aiAgents:        { href: "/services/ai-agents",                  label: "AI Agents" },
  customAI:        { href: "/services/custom-ai-systems",          label: "Custom AI Systems" },
  fullStack:       { href: "/services/full-stack",                 label: "Full-Stack Services" },
};

const I = {
  immigration:     { href: "/industries/immigration-consultants",  label: "Immigration Consultants" },
  accounting:      { href: "/industries/accounting-firms",         label: "Accounting Firms" },
  law:             { href: "/industries/law-firms",                label: "Law Firms" },
  contractors:     { href: "/industries/contractors",              label: "Contractors" },
  physio:          { href: "/industries/physiotherapy-clinics",    label: "Physiotherapy Clinics" },
  realEstate:      { href: "/industries/real-estate-teams",        label: "Real Estate Teams" },
  service:         { href: "/industries/service-businesses",       label: "Service Businesses" },
  dental:          { href: "/industries/dental-offices",           label: "Dental Offices" },
  insurance:       { href: "/industries/insurance-brokers",        label: "Insurance Brokers" },
  mortgage:        { href: "/industries/mortgage-brokers",         label: "Mortgage Brokers" },
  financial:       { href: "/industries/financial-advisors",       label: "Financial Advisors" },
  marketing:       { href: "/industries/marketing-agencies",       label: "Marketing Agencies" },
  cleaning:        { href: "/industries/cleaning-companies",       label: "Cleaning Companies" },
  property:        { href: "/industries/property-management",      label: "Property Management" },
  home:            { href: "/industries/home-services",            label: "Home Services" },
  medical:         { href: "/industries/medical-clinics",          label: "Medical Clinics" },
  veterinary:      { href: "/industries/veterinary-clinics",       label: "Veterinary Clinics" },
  tutoring:        { href: "/industries/tutoring-education",       label: "Tutoring & Education" },
  auto:            { href: "/industries/auto-repair",              label: "Auto Repair" },
  landscaping:     { href: "/industries/landscaping",              label: "Landscaping" },
};

const W = {
  leadIntake:       { href: "/workflows/lead-intake",              label: "Lead Intake Workflow" },
  appointmentBook:  { href: "/workflows/appointment-booking",      label: "Appointment Booking Workflow" },
  clientOnboard:    { href: "/workflows/client-onboarding",        label: "Client Onboarding Workflow" },
  docCollection:    { href: "/workflows/document-collection",      label: "Document Collection Workflow" },
};

const CS = {
  immigration:  { href: "/case-studies/immigration-firm-north-york",        label: "Immigration Firm - North York" },
  accounting:   { href: "/case-studies/accounting-firm-vaughan",             label: "Accounting Firm - Vaughan" },
  contractor:   { href: "/case-studies/contractor-mississauga",              label: "Contractor - Mississauga" },
  physio:       { href: "/case-studies/physio-clinic-richmond-hill",         label: "Physio Clinic - Richmond Hill" },
  law:          { href: "/case-studies/law-firm-toronto",                    label: "Law Firm - Toronto" },
  realEstate:   { href: "/case-studies/real-estate-team-markham",            label: "Real Estate Team - Markham" },
  dental:       { href: "/case-studies/dental-office-scarborough",           label: "Dental Office - Scarborough" },
  cleaning:     { href: "/case-studies/cleaning-company-etobicoke",          label: "Cleaning Company - Etobicoke" },
  hvac:         { href: "/case-studies/hvac-company-brampton",               label: "HVAC Company - Brampton" },
  property:     { href: "/case-studies/property-management-toronto",         label: "Property Management - Toronto" },
  insurance:    { href: "/case-studies/insurance-brokerage-vaughan",         label: "Insurance Brokerage - Vaughan" },
  marketing:    { href: "/case-studies/marketing-agency-liberty-village",    label: "Marketing Agency - Liberty Village" },
};

const D = {
  whatFirst:    { href: "/insights/what-to-automate-first",      label: "What to Automate First" },
  readiness:    { href: "/insights/automation-readiness",         label: "Automation Readiness" },
  buildVsBuy:   { href: "/insights/build-vs-buy",                label: "Build vs Buy" },
  whenNot:      { href: "/insights/when-ai-is-not-the-answer",   label: "When AI Is Not the Answer" },
  delegation:   { href: "/insights/automation-vs-delegation",     label: "Automation vs Delegation" },
};

const P = {
  adoption:     { href: "/ai-adoption-small-business",       label: "AI Adoption for Small Business" },
  workflowSmb:  { href: "/workflow-automation-smb",           label: "Workflow Automation for SMBs" },
  receptionist: { href: "/ai-receptionist",                   label: "AI Receptionist" },
  humanLoop:    { href: "/human-in-the-loop-ai",              label: "Human-in-the-Loop AI" },
  industries:   { href: "/ai-automation-industries",          label: "AI Automation by Industry" },
  vaughan:      { href: "/ai-automation-vaughan",             label: "AI Automation in Vaughan" },
};

const L = {
  vaughan: { href: "/ai-automation-vaughan", label: "AI Automation in Vaughan" },
};

/* ------------------------------------------------------------------ */
/*  The map                                                           */
/* ------------------------------------------------------------------ */

export const internalLinks: Record<string, PageLinks> = {

  /* ============================================================== */
  /*  SERVICE PAGES                                                  */
  /* ============================================================== */

  "/services/lead-response-automation": {
    pillar: "/ai-adoption-small-business",
    services: [S.afterHours, S.crm, S.aiReceptionist],
    industries: [I.contractors, I.realEstate, I.cleaning, I.landscaping, I.home],
    workflows: [W.leadIntake],
    caseStudies: [CS.contractor, CS.realEstate],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/client-intake-automation": {
    pillar: "/ai-adoption-small-business",
    services: [S.documentCollection, S.crm, S.workflow],
    industries: [I.immigration, I.law, I.accounting, I.financial],
    workflows: [W.clientOnboard],
    caseStudies: [CS.immigration, CS.law],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/ai-receptionist": {
    pillar: "/ai-receptionist",
    services: [S.afterHours, S.appointment, S.leadResponse],
    industries: [I.dental, I.medical, I.law, I.contractors, I.physio],
    workflows: [W.leadIntake, W.appointmentBook],
    caseStudies: [CS.dental, CS.law],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/services/document-collection": {
    pillar: "/workflow-automation-smb",
    services: [S.clientIntake, S.workflow, S.crm],
    industries: [I.immigration, I.accounting, I.law, I.mortgage],
    workflows: [W.docCollection, W.clientOnboard],
    caseStudies: [CS.immigration, CS.accounting],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/appointment-automation": {
    pillar: "/ai-receptionist",
    services: [S.aiReceptionist, S.crm, S.afterHours],
    industries: [I.physio, I.dental, I.medical, I.veterinary, I.tutoring],
    workflows: [W.appointmentBook],
    caseStudies: [CS.physio, CS.dental],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/invoice-automation": {
    pillar: "/workflow-automation-smb",
    services: [S.crm, S.opsReporting, S.workflow],
    industries: [I.accounting, I.contractors, I.cleaning, I.landscaping],
    workflows: [W.clientOnboard],
    caseStudies: [CS.accounting, CS.cleaning],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/workflow-automation": {
    pillar: "/workflow-automation-smb",
    services: [S.crm, S.opsReporting, S.documentCollection],
    industries: [I.marketing, I.property, I.insurance],
    workflows: [W.clientOnboard, W.leadIntake],
    caseStudies: [CS.marketing, CS.property],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "planner",
  },

  "/services/crm-automation": {
    pillar: "/ai-adoption-small-business",
    services: [S.leadResponse, S.clientIntake, S.workflow],
    industries: [I.realEstate, I.insurance, I.contractors, I.marketing],
    workflows: [W.leadIntake],
    caseStudies: [CS.realEstate, CS.contractor],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/operations-reporting": {
    pillar: "/workflow-automation-smb",
    services: [S.workflow, S.crm, S.invoice],
    industries: [I.property, I.marketing, I.accounting],
    workflows: [W.clientOnboard],
    caseStudies: [CS.property, CS.accounting],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/services/after-hours-automation": {
    pillar: "/ai-receptionist",
    services: [S.aiReceptionist, S.leadResponse, S.appointment],
    industries: [I.dental, I.medical, I.contractors, I.home],
    workflows: [W.leadIntake, W.appointmentBook],
    caseStudies: [CS.dental, CS.hvac],
    decisions: [D.whenNot],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/services/ai-agents": {
    pillar: "/human-in-the-loop-ai",
    services: [S.customAI, S.workflow, S.fullStack],
    industries: [I.marketing, I.insurance, I.property, I.law, I.accounting],
    workflows: [W.leadIntake, W.clientOnboard],
    caseStudies: [CS.marketing, CS.insurance],
    decisions: [D.buildVsBuy, D.whenNot],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/services/custom-ai-systems": {
    pillar: "/human-in-the-loop-ai",
    services: [S.aiAgents, S.workflow, S.fullStack],
    industries: [I.marketing, I.insurance, I.property, I.law],
    workflows: [W.clientOnboard],
    caseStudies: [CS.marketing, CS.insurance],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/services/full-stack": {
    pillar: "/ai-adoption-small-business",
    services: [S.workflow, S.crm, S.leadResponse, S.aiAgents],
    industries: [I.service, I.marketing, I.contractors],
    workflows: [W.leadIntake, W.clientOnboard],
    caseStudies: [CS.marketing, CS.contractor],
    decisions: [D.whatFirst, D.readiness],
    local: [L.vaughan],
    cta: "planner",
  },

  /* ============================================================== */
  /*  INDUSTRY PAGES                                                 */
  /* ============================================================== */

  "/industries/immigration-consultants": {
    pillar: "/ai-automation-industries",
    services: [S.clientIntake, S.documentCollection, S.afterHours, S.crm, S.workflow],
    industries: [I.law, I.accounting],
    workflows: [W.clientOnboard, W.docCollection],
    caseStudies: [CS.immigration],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/accounting-firms": {
    pillar: "/ai-automation-industries",
    services: [S.clientIntake, S.documentCollection, S.invoice, S.opsReporting, S.workflow],
    industries: [I.financial, I.law],
    workflows: [W.docCollection, W.clientOnboard],
    caseStudies: [CS.accounting],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/law-firms": {
    pillar: "/ai-automation-industries",
    services: [S.clientIntake, S.aiReceptionist, S.documentCollection, S.afterHours, S.crm],
    industries: [I.immigration, I.accounting],
    workflows: [W.clientOnboard, W.docCollection],
    caseStudies: [CS.law],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/contractors": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.aiReceptionist, S.invoice, S.crm],
    industries: [I.home, I.landscaping, I.cleaning],
    workflows: [W.leadIntake],
    caseStudies: [CS.contractor],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/physiotherapy-clinics": {
    pillar: "/ai-automation-industries",
    services: [S.appointment, S.aiReceptionist, S.afterHours, S.crm],
    industries: [I.medical, I.dental],
    workflows: [W.appointmentBook],
    caseStudies: [CS.physio],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/real-estate-teams": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.crm, S.afterHours, S.workflow],
    industries: [I.mortgage, I.property],
    workflows: [W.leadIntake],
    caseStudies: [CS.realEstate],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/service-businesses": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.fullStack, S.crm, S.afterHours, S.workflow],
    industries: [I.contractors, I.cleaning, I.home],
    workflows: [W.leadIntake, W.clientOnboard],
    caseStudies: [CS.hvac, CS.contractor],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "planner",
  },

  "/industries/dental-offices": {
    pillar: "/ai-automation-industries",
    services: [S.appointment, S.aiReceptionist, S.afterHours, S.crm],
    industries: [I.medical, I.physio],
    workflows: [W.appointmentBook],
    caseStudies: [CS.dental],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/insurance-brokers": {
    pillar: "/ai-automation-industries",
    services: [S.workflow, S.clientIntake, S.crm, S.opsReporting],
    industries: [I.financial, I.mortgage],
    workflows: [W.clientOnboard],
    caseStudies: [CS.insurance],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/mortgage-brokers": {
    pillar: "/ai-automation-industries",
    services: [S.documentCollection, S.clientIntake, S.crm, S.workflow],
    industries: [I.realEstate, I.financial, I.insurance],
    workflows: [W.docCollection, W.clientOnboard],
    caseStudies: [CS.realEstate],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/financial-advisors": {
    pillar: "/ai-automation-industries",
    services: [S.clientIntake, S.documentCollection, S.crm, S.opsReporting],
    industries: [I.accounting, I.insurance],
    workflows: [W.clientOnboard, W.docCollection],
    caseStudies: [CS.accounting],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/marketing-agencies": {
    pillar: "/ai-automation-industries",
    services: [S.workflow, S.opsReporting, S.aiAgents, S.crm],
    industries: [I.service, I.property],
    workflows: [W.clientOnboard],
    caseStudies: [CS.marketing],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "planner",
  },

  "/industries/cleaning-companies": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.invoice, S.crm, S.afterHours],
    industries: [I.landscaping, I.home, I.contractors],
    workflows: [W.leadIntake],
    caseStudies: [CS.cleaning],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/property-management": {
    pillar: "/ai-automation-industries",
    services: [S.workflow, S.opsReporting, S.crm, S.afterHours],
    industries: [I.realEstate, I.insurance],
    workflows: [W.clientOnboard],
    caseStudies: [CS.property],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/home-services": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.aiReceptionist, S.afterHours, S.crm],
    industries: [I.contractors, I.cleaning, I.landscaping],
    workflows: [W.leadIntake],
    caseStudies: [CS.hvac],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/medical-clinics": {
    pillar: "/ai-automation-industries",
    services: [S.appointment, S.aiReceptionist, S.afterHours, S.crm],
    industries: [I.dental, I.physio, I.veterinary],
    workflows: [W.appointmentBook],
    caseStudies: [CS.physio],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/veterinary-clinics": {
    pillar: "/ai-automation-industries",
    services: [S.appointment, S.aiReceptionist, S.afterHours, S.crm],
    industries: [I.medical, I.dental],
    workflows: [W.appointmentBook],
    caseStudies: [CS.dental],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/tutoring-education": {
    pillar: "/ai-automation-industries",
    services: [S.appointment, S.clientIntake, S.crm, S.afterHours],
    industries: [I.physio, I.service],
    workflows: [W.appointmentBook, W.clientOnboard],
    caseStudies: [CS.physio],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/auto-repair": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.appointment, S.aiReceptionist, S.invoice],
    industries: [I.contractors, I.home],
    workflows: [W.appointmentBook, W.leadIntake],
    caseStudies: [CS.hvac],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/industries/landscaping": {
    pillar: "/ai-automation-industries",
    services: [S.leadResponse, S.invoice, S.crm, S.afterHours],
    industries: [I.cleaning, I.contractors, I.home],
    workflows: [W.leadIntake],
    caseStudies: [CS.cleaning],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  /* ============================================================== */
  /*  PILLAR PAGES                                                   */
  /* ============================================================== */

  "/ai-adoption-small-business": {
    services: [S.leadResponse, S.clientIntake, S.crm, S.fullStack],
    industries: [I.contractors, I.service, I.realEstate],
    workflows: [W.leadIntake, W.clientOnboard],
    caseStudies: [CS.contractor, CS.realEstate, CS.accounting],
    decisions: [D.whatFirst, D.readiness, D.whenNot],
    local: [L.vaughan],
    cta: "planner",
  },

  "/workflow-automation-smb": {
    services: [S.workflow, S.documentCollection, S.invoice, S.opsReporting],
    industries: [I.marketing, I.property, I.accounting],
    workflows: [W.clientOnboard, W.docCollection, W.leadIntake],
    caseStudies: [CS.marketing, CS.property, CS.accounting],
    decisions: [D.buildVsBuy, D.delegation, D.readiness],
    local: [L.vaughan],
    cta: "planner",
  },

  "/ai-receptionist": {
    services: [S.aiReceptionist, S.afterHours, S.appointment, S.leadResponse],
    industries: [I.dental, I.medical, I.law, I.contractors],
    workflows: [W.leadIntake, W.appointmentBook],
    caseStudies: [CS.dental, CS.law, CS.hvac],
    decisions: [D.buildVsBuy, D.whenNot],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/human-in-the-loop-ai": {
    services: [S.aiAgents, S.customAI, S.workflow, S.clientIntake],
    industries: [I.law, I.immigration, I.insurance],
    workflows: [W.clientOnboard, W.docCollection],
    caseStudies: [CS.law, CS.immigration, CS.insurance],
    decisions: [D.whenNot, D.buildVsBuy, D.delegation],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/ai-automation-industries": {
    services: [S.leadResponse, S.workflow, S.aiReceptionist, S.fullStack],
    industries: [I.immigration, I.contractors, I.dental, I.marketing, I.property],
    workflows: [W.leadIntake, W.clientOnboard, W.appointmentBook],
    caseStudies: [CS.immigration, CS.contractor, CS.dental, CS.marketing],
    decisions: [D.whatFirst, D.readiness],
    local: [L.vaughan],
    cta: "planner",
  },

  "/ai-automation-vaughan": {
    services: [S.leadResponse, S.aiReceptionist, S.fullStack, S.workflow],
    industries: [I.contractors, I.dental, I.realEstate, I.accounting],
    workflows: [W.leadIntake, W.appointmentBook],
    caseStudies: [CS.accounting, CS.insurance, CS.contractor],
    decisions: [D.whatFirst, D.readiness],
    local: [],
    cta: "audit",
  },

  /* ============================================================== */
  /*  WORKFLOW PAGES                                                 */
  /* ============================================================== */

  "/workflows/lead-intake": {
    pillar: "/ai-adoption-small-business",
    services: [S.leadResponse, S.crm, S.afterHours],
    industries: [I.contractors, I.realEstate, I.home],
    workflows: [W.appointmentBook],
    caseStudies: [CS.contractor, CS.realEstate],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/workflows/appointment-booking": {
    pillar: "/ai-receptionist",
    services: [S.appointment, S.aiReceptionist, S.afterHours],
    industries: [I.dental, I.physio, I.medical],
    workflows: [W.leadIntake],
    caseStudies: [CS.dental, CS.physio],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/workflows/client-onboarding": {
    pillar: "/workflow-automation-smb",
    services: [S.clientIntake, S.documentCollection, S.workflow],
    industries: [I.immigration, I.law, I.accounting],
    workflows: [W.docCollection],
    caseStudies: [CS.immigration, CS.law],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/workflows/document-collection": {
    pillar: "/workflow-automation-smb",
    services: [S.documentCollection, S.clientIntake, S.workflow],
    industries: [I.immigration, I.accounting, I.mortgage],
    workflows: [W.clientOnboard],
    caseStudies: [CS.immigration, CS.accounting],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  /* ============================================================== */
  /*  INSIGHT / DECISION PAGES                                       */
  /* ============================================================== */

  "/insights/what-to-automate-first": {
    pillar: "/ai-adoption-small-business",
    services: [S.leadResponse, S.appointment, S.crm],
    industries: [I.contractors, I.service],
    workflows: [W.leadIntake],
    caseStudies: [CS.contractor],
    decisions: [D.readiness, D.delegation],
    local: [L.vaughan],
    cta: "planner",
  },

  "/insights/automation-readiness": {
    pillar: "/ai-adoption-small-business",
    services: [S.fullStack, S.workflow, S.crm],
    industries: [I.service, I.marketing],
    workflows: [W.clientOnboard],
    caseStudies: [CS.marketing],
    decisions: [D.whatFirst, D.buildVsBuy],
    local: [L.vaughan],
    cta: "planner",
  },

  "/insights/build-vs-buy": {
    pillar: "/human-in-the-loop-ai",
    services: [S.customAI, S.aiAgents, S.fullStack],
    industries: [I.marketing, I.insurance],
    workflows: [W.clientOnboard],
    caseStudies: [CS.marketing],
    decisions: [D.whenNot, D.readiness],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/insights/when-ai-is-not-the-answer": {
    pillar: "/human-in-the-loop-ai",
    services: [S.workflow, S.clientIntake],
    industries: [I.law, I.immigration],
    workflows: [W.clientOnboard],
    caseStudies: [CS.law],
    decisions: [D.delegation, D.buildVsBuy],
    local: [L.vaughan],
    cta: "strategy-call",
  },

  "/insights/automation-vs-delegation": {
    pillar: "/workflow-automation-smb",
    services: [S.workflow, S.fullStack, S.opsReporting],
    industries: [I.property, I.marketing],
    workflows: [W.clientOnboard],
    caseStudies: [CS.property],
    decisions: [D.whatFirst, D.readiness],
    local: [L.vaughan],
    cta: "planner",
  },

  /* ============================================================== */
  /*  CASE STUDY PAGES                                               */
  /* ============================================================== */

  "/case-studies/immigration-firm-north-york": {
    services: [S.clientIntake, S.documentCollection, S.afterHours],
    industries: [I.immigration],
    workflows: [W.clientOnboard, W.docCollection],
    caseStudies: [CS.law, CS.accounting],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/accounting-firm-vaughan": {
    services: [S.documentCollection, S.invoice, S.opsReporting],
    industries: [I.accounting],
    workflows: [W.docCollection, W.clientOnboard],
    caseStudies: [CS.immigration, CS.insurance],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/contractor-mississauga": {
    services: [S.leadResponse, S.crm, S.invoice],
    industries: [I.contractors],
    workflows: [W.leadIntake],
    caseStudies: [CS.hvac, CS.cleaning],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/physio-clinic-richmond-hill": {
    services: [S.appointment, S.aiReceptionist, S.afterHours],
    industries: [I.physio],
    workflows: [W.appointmentBook],
    caseStudies: [CS.dental, CS.law],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/law-firm-toronto": {
    services: [S.clientIntake, S.aiReceptionist, S.documentCollection],
    industries: [I.law],
    workflows: [W.clientOnboard, W.docCollection],
    caseStudies: [CS.immigration, CS.accounting],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/real-estate-team-markham": {
    services: [S.leadResponse, S.crm, S.afterHours],
    industries: [I.realEstate],
    workflows: [W.leadIntake],
    caseStudies: [CS.contractor, CS.property],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/dental-office-scarborough": {
    services: [S.appointment, S.aiReceptionist, S.afterHours],
    industries: [I.dental],
    workflows: [W.appointmentBook],
    caseStudies: [CS.physio, CS.law],
    decisions: [D.delegation],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/cleaning-company-etobicoke": {
    services: [S.leadResponse, S.invoice, S.crm],
    industries: [I.cleaning],
    workflows: [W.leadIntake],
    caseStudies: [CS.contractor, CS.hvac],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/hvac-company-brampton": {
    services: [S.leadResponse, S.aiReceptionist, S.afterHours],
    industries: [I.home],
    workflows: [W.leadIntake],
    caseStudies: [CS.contractor, CS.cleaning],
    decisions: [D.whatFirst],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/property-management-toronto": {
    services: [S.workflow, S.opsReporting, S.crm],
    industries: [I.property],
    workflows: [W.clientOnboard],
    caseStudies: [CS.insurance, CS.marketing],
    decisions: [D.readiness],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/insurance-brokerage-vaughan": {
    services: [S.workflow, S.clientIntake, S.crm],
    industries: [I.insurance],
    workflows: [W.clientOnboard],
    caseStudies: [CS.property, CS.accounting],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "audit",
  },

  "/case-studies/marketing-agency-liberty-village": {
    services: [S.workflow, S.opsReporting, S.aiAgents],
    industries: [I.marketing],
    workflows: [W.clientOnboard],
    caseStudies: [CS.property, CS.insurance],
    decisions: [D.buildVsBuy],
    local: [L.vaughan],
    cta: "planner",
  },

  /* ============================================================== */
  /*  SPECIAL PAGES                                                  */
  /* ============================================================== */

  "/start-here": {
    services: [S.leadResponse, S.aiReceptionist, S.fullStack],
    industries: [I.contractors, I.dental, I.service],
    workflows: [W.leadIntake, W.appointmentBook],
    caseStudies: [CS.contractor, CS.dental],
    decisions: [D.whatFirst, D.readiness],
    local: [L.vaughan],
    cta: "planner",
  },

  "/solopreneurs": {
    services: [S.fullStack, S.leadResponse, S.crm, S.afterHours],
    industries: [I.service, I.marketing, I.contractors],
    workflows: [W.leadIntake, W.clientOnboard],
    caseStudies: [CS.contractor, CS.marketing],
    decisions: [D.whatFirst, D.delegation],
    local: [L.vaughan],
    cta: "planner",
  },
};
